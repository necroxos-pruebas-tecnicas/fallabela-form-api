import { CreateFormDto } from '../../dto';

export const CREATE_DTO_FORM_MOCK: CreateFormDto = {
  name: 'Example form',
  description: 'This is an description for example form.',
  fields: [
    {
      name: 'input',
      label: 'Example of input',
      type: 'text',
      required: false,
      values: [],
    },
    {
      name: 'selector',
      label: 'Example of selector',
      type: 'select',
      required: true,
      values: ['Yes', 'No'],
      defaultValue: 'Yes',
    },
  ],
};

export const CREATE_PRISMA_FORM_MOCK = {
  data: {
    name: CREATE_DTO_FORM_MOCK.name,
    description: CREATE_DTO_FORM_MOCK.description,
    fields: {
      create: CREATE_DTO_FORM_MOCK.fields.map((field) => ({
        name: field.name,
        label: field.label,
        type: field.type,
        required: field.required,
        defaultValue: field.defaultValue,
        ...(field.values && {
          values: {
            create: field.values.map((value) => ({
              value: value,
            })),
          },
        }),
      })),
    },
  },
};

export const RESPONSE_FORM_MOCK: any = {
  id: 'FROM-QWERTY',
  name: CREATE_DTO_FORM_MOCK.name,
  description: CREATE_DTO_FORM_MOCK.description,
  fields: CREATE_DTO_FORM_MOCK.fields.map((field) => ({
    name: field.name,
    label: field.label,
    type: field.type,
    required: field.required,
    defaultValue: field.defaultValue || undefined,
    ...(field.values && { values: field.values }),
  })),
};
