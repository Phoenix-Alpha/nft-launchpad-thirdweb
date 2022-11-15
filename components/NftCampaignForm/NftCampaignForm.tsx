import classNames from 'classnames'
import { Form, Formik } from 'formik'
import { FC, memo } from 'react'

import { Button, FormField, FormFieldError } from '@/components'
import { useNftCampaignForm } from '@/hooks'

export interface INftCampaignFormProps {}

export const NftCampaignForm: FC<INftCampaignFormProps> = memo(() => {
  const { initialValues, validationSchema, formResponse, handleSubmit } =
    useNftCampaignForm()

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form noValidate>
          <div className="mb-4 text-left">
            <FormField name="name" type="text" label="Name" />
            <FormFieldError name="name" />
          </div>

          <div className="mb-4 text-left">
            <FormField name="description" type="text" label="Description" />
            <FormFieldError name="description" />
          </div>

          <div className="mb-4 text-left">
            <FormField name="quantity" type="text" label="Quantity" />
            <FormFieldError name="quantity" />
          </div>

          <div className="mb-4 text-left">
            <FormField name="price" type="text" label="Price(MATIC)" />
            <FormFieldError name="price" />
          </div>

          <div className="mb-4 flex flex-col items-center text-left">
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Create NFT Collection
            </Button>

            {formResponse.message && (
              <div
                className={classNames('mt-2', {
                  'text-gray-500': !formResponse.error,
                  'text-red-500': formResponse.error
                })}
              >
                {formResponse.message}
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
})

NftCampaignForm.displayName = 'NftCampaignForm'

export default NftCampaignForm
