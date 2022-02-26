import {
  useLoaderData,
  useNavigate,
  // FormProps,
} from 'remix';
import {
  useCatch,
  useFetcher,
  useParams,
} from 'remix';


import FieldsLayout from '~/components/FormElements/FieldsLayout';
import RoundedButton from '~/components/RoundedButton';
// import SelectMenu from '~/components/FormElements/SelectMenu';
import GridWrapper from '~/components/GridWrapper';
import Title from '~/components/Title';
// import useSlideAnimation from '~/utils/hooks/useSlideAnimation';
// import PageTransition from '~/components/Layout/PageTransition';
import {
  useEffect,
  useRef,
} from 'react';
import invariant from 'tiny-invariant';

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

export default function NonEscalatorFormDisplayRoute() {
  // const [slideAnimationDirection, setSlideAnimationDirection] = useSlideAnimation();
  // const { fieldGroupIdx } = useParams();
  // const fieldGroupIdxNum = Number(fieldGroupIdx);
  // if (isNaN(fieldGroupIdxNum)) {
  //   throw new Response('Not a valid page number', {
  //     status: 404,
  //   });
  // }

  const navigate = useNavigate();

  const ref = useRef();
  const fetcher = useFetcher<FieldGroupLoaderData>();
  const {
    fieldGroup,
    fieldGroupIndex,
    hasNextFieldGroup,
    hasPrevFieldGroup,
  } = useLoaderData<FieldGroupLoaderData>();

  // useEffect(() => {
  //   console.log({ fetcher });
  //   if (fetcher.state === 'idle' && fetcher.type === 'init') {
  //     fetcher.load(`/non-escalator-relationship/load-data/${fieldGroupIdxNum}`);
  //   }
  // }, [fetcher]);

  function onClickButton(direction: 'prev' | 'next') {
    if (direction === 'next') {
      // setSlideAnimationDirection('left');
      invariant(ref.current, 'ref is not attached');
      // invariant(fieldGroupIndex, 'fieldGroupIdx is not defined');
      fetcher.submit(ref.current, { method: 'post', action: `/non-escalator-relationship/update-data/${fieldGroupIndex}` });
      navigate(`/non-escalator-relationship/${fieldGroupIndex + 1}`);
    } else {
      // setSlideAnimationDirection('right');
      invariant(ref.current, 'ref is not attached');
      // invariant(fieldGroupIndex, 'fieldGroupIdx is not defined');
      fetcher.submit(ref.current, { method: 'post', action: `/non-escalator-relationship/update-data/${fieldGroupIndex}` });
      navigate(`/non-escalator-relationship/${fieldGroupIndex - 1}`);
    }
  }

  return (
    <GridWrapper>
      <div className="flex flex-col gap-2 justify-center items-center w-full">
        <Title>Non Escalator Form</Title>
        <h2 className="text-2xl text-center text-neutral-lighter">
          {fieldGroup.label}
        </h2>
      </div>
      <fetcher.Form
        ref={ref}
        method="post"
        action='/non-escalator-relationship/update-data'
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="flex flex-col gap-20 items-center">
          <div className="flex flex-col gap-y-12 justify-center items-center">
            <FieldsLayout fieldGroup={fieldGroup} />
            <div className="flex gap-6 justify-between w-full">
              {hasPrevFieldGroup && (
                <div className="mr-auto">
                  <RoundedButton
                    type="submit"
                    onClick={() => onClickButton('prev')}
                  >
                        Previous
                  </RoundedButton>
                </div>
              )}
              {hasNextFieldGroup? (
                    <div className="ml-auto">
                      <RoundedButton
                        type="submit"
                        onClick={() => onClickButton('next')}
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
        </div>
      </fetcher.Form>
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
    case 500: {
      return (
        <div>
          {`Sorry there was an error loading form page ${params.fieldGroupPage}.
            db error: ${caught.status}: ${caught.statusText}:
            ${caught.data}
          `}
        </div>
      );
    }
    default: {
      console.log(`Unhandled Error: Status: ${caught.status}. Status Text: ${caught.statusText}. Data: `, caught.data);
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}

export function ErrorBoundary() {
  const { fieldGroupPage } = useParams();
  return (
    <div className="error-container">
      {`There was an error loading form page ${fieldGroupPage}. Sorry.`}
    </div>
  );
}
