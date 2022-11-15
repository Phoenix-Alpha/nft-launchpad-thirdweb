import { useSDK } from '@thirdweb-dev/react'
import { FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { IFormResponse } from 'types/IFormResponse'
import { useAccount } from 'wagmi'
import * as Yup from 'yup'

import { DEFAULT_REQUIRED_MESSAGE } from '@/configs/message'
import { PATHS } from '@/configs/misc'
import { IUseNftCampaignFormValues } from '@/types'
import { createCollection } from '@/utils/collection'

const initialValues: IUseNftCampaignFormValues = {
  name: '',
  description: '',
  quantity: 0,
  price: 0
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required(DEFAULT_REQUIRED_MESSAGE),
  description: Yup.string().required(DEFAULT_REQUIRED_MESSAGE),
  quantity: Yup.number().required(DEFAULT_REQUIRED_MESSAGE).min(1),
  price: Yup.number().required(DEFAULT_REQUIRED_MESSAGE)
})

export const useNftCampaignForm = () => {
  const router = useRouter()

  const { address } = useAccount()
  const thirdWebSDK = useSDK()

  const [formResponse, setFormResponse] = useState<IFormResponse>({
    error: false,
    message: ''
  })

  const generateMetaData = useCallback(
    (name: string, description: string, quantity: number) => {
      const metadatas = []
      for (let i = 0; i < quantity; i++) {
        metadatas.push({
          name: `${name} #${i + 1}`,
          description,
          image:
            'https://tailwindui.com/img/ecommerce-images/home-page-01-category-05.jpg'
        })
      }
      return metadatas
    },
    []
  )

  const handleSubmit = async (
    values: IUseNftCampaignFormValues,
    actions: FormikHelpers<IUseNftCampaignFormValues>
  ) => {
    actions.setSubmitting(true)

    setFormResponse({
      message: ''
    })

    try {
      if (address) {
        setFormResponse({
          message: 'Deploying contract...'
        })

        // Needs wallet confirm
        const contractAddress = await thirdWebSDK?.deployer.deploySignatureDrop(
          {
            name: values.name,
            description: values.description,
            primary_sale_recipient: address
          }
        )

        setFormResponse({
          message: 'Setting claim conditions...'
        })

        const signatureDrop = await thirdWebSDK?.getSignatureDrop(
          contractAddress as string
        )

        const presaleStartTime = new Date()
        // Needs wallet confirm
        signatureDrop?.claimConditions.set([
          {
            startTime: presaleStartTime,
            price: values.price
          }
        ])

        setFormResponse({
          message: 'Generating metadata and creating NFTs...'
        })

        const metadatas = generateMetaData(
          values.name,
          values.description,
          values.quantity
        )

        // Needs wallet confirm
        await signatureDrop?.createBatch(metadatas)

        await createCollection({
          name: values.name,
          description: values.description,
          address: contractAddress as string
        })

        setFormResponse({
          message: 'NFT collection created successfully!'
        })

        router.push(PATHS.BASE)
      }
    } catch (error) {
      console.log(error)
      setFormResponse({
        error: true,
        message: 'Something went wrong'
      })
    } finally {
      actions.setSubmitting(false)
    }
  }

  return { initialValues, validationSchema, formResponse, handleSubmit }
}
