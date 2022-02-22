export type Field = {
  id: string;
  label: string;
  type: 'selectField' | 'inputField';
  defaultValue?: string;
  valueOptions: string[]; // | [];
  value?: string;
  tooltipText?: string;
}

export type FieldGroup = {
  formName: string;
  label: string;
  fields: Field[]; // | [];
}