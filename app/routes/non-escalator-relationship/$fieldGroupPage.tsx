import { LoaderFunction, ActionFunction, MetaFunction, Form } from 'remix';
import {
  useLoaderData,
  useCatch,
  useParams,
  redirect,
} from 'remix';
import { db } from '~/utils/db/db.server';
import {
  requireUserId,
  // getUserId,
} from '~/utils/db/session.server';

import type { Field, FieldGroup } from '~/utils/types';


import FieldGroupLayout from '~/components/FormElements/FieldGroupLayout';
import RoundedButton from '~/components/RoundedButton';
// import SelectMenu from '~/components/FormElements/SelectMenu';
import invariant from 'tiny-invariant';
import GridWrapper from '~/components/GridWrapper';
import { FieldValuesForUsers, Prisma } from '@prisma/client';
import Title from '~/components/Title';

type LoaderData = {
  fieldGroup: FieldGroup;
  fieldGroupIndex: number;
  nextFieldGroupPage: number | undefined;
  prevFieldGroupPage: number | undefined;
};

export const meta: MetaFunction = ({
  data,
}: {
  data: LoaderData | undefined
}) => {
  if (!data) {
    return {
      title: 'No Category',
      description: 'No Form Category Found',
    };
  }
  const {
    fieldGroup,
  } = data;
  return {
    title: `${fieldGroup.formName} | "${fieldGroup.label}"`,
    description: `Enjoy the "${fieldGroup.formName}" and much more`,
  };
};

export const loader: LoaderFunction = async ({
  request,
  params,
}) => {
  console.log('LOADER IN PARAM ROUTE');
  const userId = await requireUserId(request, '/login');

  // TODO: extract? convert fieldGroupPage to a number
  const { fieldGroupPage } = params;
  const fieldGroupPageNum = Number(fieldGroupPage);
  if (isNaN(fieldGroupPageNum)) {
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
    fieldGroupPageNum > fieldGroupLength ||
    fieldGroupPageNum < 1 ||
    fieldGroupPageNum > fieldGroupLength
  ) {
    throw new Response('Not a valid form page', {
      status: 404,
    });
  }

  const nextFieldGroupPage = fieldGroupPageNum === fieldGroupLength ? undefined : fieldGroupPageNum + 1;
  const prevFieldGroupPage = fieldGroupPageNum === 1 ? undefined : fieldGroupPageNum - 1;

  const fieldGroupIndex = fieldGroupPageNum - 1;

  const fieldGroup = formState.fieldGroups[fieldGroupIndex];

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


  const data: LoaderData = {
    fieldGroup: {
      label: fieldGroup.label,
      formName: fieldGroup.formName,
      fields,
    },
    fieldGroupIndex,
    nextFieldGroupPage,
    prevFieldGroupPage,
    // fieldGroup: formState.fieldGroups[currentIdx]
  };
  return data;
};

// type ActionData = {
//   formError?: string;
//   fieldErrors?: {
//     name: string | undefined,
//     content: string | undefined,
//   };
//   fields?: {
//     name: string;
//     content: string;
//   };
// };

// const badRequest = (data: ActionData) => json(data, { status: 400 });


export const action: ActionFunction = async ({
  request,
}) => {
  const form = await request.formData();
  const userId = await requireUserId(request, '/login');

  const redirectToPage = form.get('redirectToPage');
  invariant(redirectToPage, 'No page to redirect to');
  form.delete('redirectToPage');
  const redirectTo = `/non-escalator-relationship/${redirectToPage.toString()}`;


  const batchTransactions: Prisma.Prisma__FieldValuesForUsersClient<FieldValuesForUsers>[] = [];
  for (const pair of form.entries()) {
    const fieldId = pair[0];
    const value = pair[1].toString();
    const data = {
      userId,
      fieldId,
      value,
    };
    batchTransactions.push(
        db.fieldValuesForUsers.upsert({
          where: {
            fieldId_userId: {
              fieldId,
              userId,
            },
          },
          update: data,
          create: data,
        }),
    );
  }

  try {
    await db.$transaction(batchTransactions);
  } catch (e) {
    throw new Response('Error updating database', {
      status: 500,
    });
  }

  return redirect(`${redirectTo}`);
};

export default function FieldGroupRoute() {
  const {
    fieldGroup,
    nextFieldGroupPage,
    prevFieldGroupPage,
  } = useLoaderData<LoaderData>();
  return (
    <GridWrapper>
      <div className="flex flex-col gap-2 justify-center items-center w-full">
        <Title>Non Escalator Form</Title>
        <h2 className="text-2xl text-center text-neutral-lighter">
          {fieldGroup.label}
        </h2>
      </div>
      <Form method="post">
        <div className="flex flex-col gap-20 items-center">
          <div className="flex flex-col gap-y-12 justify-center items-center">
            <FieldGroupLayout fieldGroup={fieldGroup} />
            <div className="flex gap-6 justify-between w-full">
              {prevFieldGroupPage && (
                <div className="mr-auto">
                  <RoundedButton
                    type="submit"
                    name="redirectToPage"
                    value={prevFieldGroupPage}
                  >
                  Previous
                  </RoundedButton>
                </div>
              )}
              {nextFieldGroupPage ? (
              <div className="ml-auto">
                <RoundedButton
                  type="submit"
                  name="redirectToPage"
                  value={nextFieldGroupPage}
                >
                  Next
                </RoundedButton>
              </div>
            ) : (
              <div className="ml-auto">
                <RoundedButton
                  type="submit"
                  name="redirectToPage"
                  value={'finished-form'}
                >
                  Submit
                </RoundedButton>
              </div>
            )}
            </div>
          </div>
          <div>

          </div>

        </div>
      </Form>
    </GridWrapper>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  switch (caught.status) {
    case 404: {
      return (
        <div className="error-container">
          Huh? What the heck is {params.fieldGroupPage}?
        </div>
      );
    }
    case 401: {
      return (
        <div className="error-container">
          Sorry, but {params.fieldGroupPage} is not your joke.
        </div>
      );
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}

export function ErrorBoundary() {
  const { fieldGroupPage } = useParams();
  return (
    <div className="error-container">
      {`There was an error loading form page by the id ${fieldGroupPage}. Sorry.`}
    </div>
  );
}


// {fieldGroup.fields.map(({
//   id,
//   valueOptions,
//   defaultValue,
//   fieldValuesForUsers,
// }) => {
//   console.log({ fieldValuesForUsers });
//   defaultValue = defaultValue ? defaultValue : 'N/A';
//   const initialValue = fieldValuesForUsers[0].value ? fieldValuesForUsers[0].value : defaultValue;
//   return (
//   <SelectMenu
//     key={id}
//     options={valueOptions}
//     initialValue={initialValue}
//     name={id}
//   />
//   );
// })}

// const values = Array.from(form.entries());
// const batchTransactions = values.map((field) => {
//     const fieldId = field[0];
//     const value = field[1].toString();
//     const data = {
//       userId,
//       fieldId,
//       value,
//     }
//     return db.fieldValuesForUsers.upsert({
//       where: {
//         fieldId_userId: {
//           fieldId,
//           userId,
//         }
//       },
//       update: data,
//       create: data,
//     });
//   })
