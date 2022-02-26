import React from 'react';
import SelectMenu from './SelectMenu';
import FormInput from './Input';
import Label from './Label';

import type { FieldGroup, Field } from '~/utils/types';

export type FieldGroupLayoutProps = {
  fieldGroup: FieldGroup;
}

export default function FieldsLayout({
  fieldGroup,
}: FieldGroupLayoutProps) {
  const { fields } = fieldGroup;

  function getField({
    id,
    label,
    type,
    defaultValue,
    valueOptions,
    value,
    tooltipText,
  }: Field): React.ReactNode {
    switch (type) {
      case 'selectField': {
        // TODO: Should not or to N/A
        defaultValue = defaultValue ? defaultValue : 'N/A';
        const initialValue = value ? value : defaultValue;
        return (
          <div className="flex flex-col gap-3">
            <Label label={label} tooltipText={tooltipText ? tooltipText : undefined} />
            <SelectMenu
              name={id}
              // TODO: valueOptions is never null/undefined
              options={valueOptions}
              // TODO: initialValue needs to be checked to line up with valueOptions
              initialValue={initialValue}
            />
          </div>
        );
      }
      case 'inputField': {
        return (
          <FormInput
            wasSubmitted={false}
            getFieldError={() => null}
            type={'text'}
            name={id}
            placeholder={label}
          />
        );
      }
    }
  }

  return (
    <>
      {fields && fields.map((field) => (
        <div key={field.id}>
          {getField(field)}
        </div>
      ))}
    </>
  );
}
