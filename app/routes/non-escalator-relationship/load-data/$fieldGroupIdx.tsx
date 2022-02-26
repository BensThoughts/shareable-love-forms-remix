import { LoaderFunction } from 'remix';
import type { Field, FieldGroup } from '~/utils/types';
import {
  // requireClerkUserId,
  requireUserId,
} from '~/utils/db/session.server';
import { db } from '~/utils/db/db.server';


export type FieldGroupLoaderData = {
  fieldGroup: FieldGroup;
  fieldGroupIndex: number;
  hasNextFieldGroup: boolean;
  hasPrevFieldGroup: boolean;
  // nextFieldGroupPage: number | undefined;
  // prevFieldGroupPage: number | undefined;
};


export const loader: LoaderFunction = async ({
  request,
  params,
}) => {
  console.log('LOADER IN FIELD GROUP IDX ROUTE');
  // const userId = await requireUserId(request);
  // const clerkUserId = await requireClerkUserId(request);
  const userId = await requireUserId(request);

  // TODO: extract? convert fieldGroupPage to a number
  const { fieldGroupIdx } = params;
  const fieldGroupIdxNum = Number(fieldGroupIdx);
  if (isNaN(fieldGroupIdxNum)) {
    throw new Response('Not a valid page number', {
      status: 404,
    });
  }

  const formState = await db.formState.findUnique({
    where: {
      name: 'Non Escalator Form',
    },
    include: {
      fieldGroups: {
        include: {
          fields: {
            include: {
              fieldValuesForUsers: {
                where: {
                  // clerkUserId,
                  userId,
                },
                select: {
                  value: true,
                },
              },
            },
          },
        },
      },
    },
  });
  if (!formState) {
    throw new Response('Not a valid form', {
      status: 404,
    });
  }

  const fieldGroupLength = formState.fieldGroups.length;

  if (
    fieldGroupIdxNum > fieldGroupLength ||
    fieldGroupIdxNum < 0 ||
    fieldGroupIdxNum > fieldGroupLength - 1
  ) {
    throw new Response('Not a valid form page', {
      status: 404,
    });
  }

  const hasNextFieldGroup = fieldGroupIdxNum === fieldGroupLength - 1 ? false : true;
  const hasPrevFieldGroup = fieldGroupIdxNum === 0 ? false : true;

  // const nextFieldGroupPage = fieldGroupPageNum === fieldGroupLength ? undefined : fieldGroupIdxNum + 1;
  // const prevFieldGroupPage = fieldGroupPageNum === 1 ? undefined : fieldGroupPageNum - 1;

  // const fieldGroupIndex = fieldGroupPageNum - 1;

  const fieldGroup = formState.fieldGroups[fieldGroupIdxNum];

  const fields = fieldGroup.fields.map(({
    id,
    label,
    type,
    defaultValue,
    valueOptions,
    tooltipText,
    fieldValuesForUsers,
  }): Field => {
    return {
      id,
      label,
      type,
      valueOptions,
      tooltipText: tooltipText ? tooltipText : undefined,
      defaultValue: defaultValue ? defaultValue : undefined,
      value: fieldValuesForUsers[0] ? fieldValuesForUsers[0].value : undefined,
    };
  });


  const data: FieldGroupLoaderData = {
    fieldGroup: {
      label: fieldGroup.label,
      formName: fieldGroup.formName,
      fields,
    },
    fieldGroupIndex: fieldGroupIdxNum,
    hasNextFieldGroup,
    hasPrevFieldGroup,
    // nextFieldGroupPage,
    // prevFieldGroupPage,
    // fieldGroup: formState.fieldGroups[currentIdx]
  };
  console.log('RETURNING DATA');
  return data;
};

export default function NonEscalatorLoadDataRoute() {
  return (
    <div>No Javascript in Load-Data</div>
  );
}
