module.exports = (plop) => {
  plop.setGenerator('entity', {
    description: 'Create an entity',
    prompts: [
      {
        type: 'list',
        name: 'entityType',
        message: 'Choose entity type',
        choices: ['component', 'hook', 'page', 'type', 'interface', 'enum']
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter entity name'
      }
    ],
    actions: (data) => {
      if (data.entityType === 'component') {
        return [
          {
            type: 'add',
            path: 'components/{{pascalCase name}}/{{pascalCase name}}.tsx',
            templateFile: 'plop-templates/Component/Component.tsx.hbs'
          },
          {
            type: 'add',
            path: 'components/{{pascalCase name}}/test.tsx',
            templateFile: 'plop-templates/Component/test.tsx.hbs'
          },
          {
            type: 'add',
            path: 'components/{{pascalCase name}}/index.ts',
            templateFile: 'plop-templates/Component/index.ts.hbs'
          },
          {
            type: 'append',
            path: 'components/index.ts',
            separator: '',
            templateFile: 'plop-templates/Component/exportAll.ts.hbs'
          }
        ]
      } else if (data.entityType === 'hook') {
        return [
          {
            type: 'add',
            path: 'hooks/{{camelCase name}}.ts',
            templateFile: 'plop-templates/Hook/Hook.ts.hbs'
          },
          {
            type: 'append',
            path: 'hooks/index.ts',
            separator: '',
            templateFile: 'plop-templates/Hook/exportAll.ts.hbs'
          }
        ]
      } else if (data.entityType === 'page') {
        return [
          {
            type: 'add',
            path: 'pages/{{kebabCase name}}.tsx',
            templateFile: 'plop-templates/Page/Page.tsx.hbs'
          }
        ]
      } else if (data.entityType === 'type') {
        return [
          {
            type: 'add',
            path: 'types/T{{pascalCase name}}.ts',
            templateFile: 'plop-templates/Type/Type.ts.hbs'
          },
          {
            type: 'append',
            path: 'types/index.ts',
            separator: '',
            templateFile: 'plop-templates/Type/exportAll.ts.hbs'
          }
        ]
      } else if (data.entityType === 'interface') {
        return [
          {
            type: 'add',
            path: 'types/I{{pascalCase name}}.ts',
            templateFile: 'plop-templates/Interface/Interface.ts.hbs'
          },
          {
            type: 'append',
            path: 'types/index.ts',
            separator: '',
            templateFile: 'plop-templates/Interface/exportAll.ts.hbs'
          }
        ]
      } else if (data.entityType === 'enum') {
        return [
          {
            type: 'add',
            path: 'types/E{{pascalCase name}}.ts',
            templateFile: 'plop-templates/Enum/Enum.ts.hbs'
          },
          {
            type: 'append',
            path: 'types/index.ts',
            separator: '',
            templateFile: 'plop-templates/Enum/exportAll.ts.hbs'
          }
        ]
      }
    }
  })
}
