import type {
  MetaFunction,
  // FormProps,
} from 'remix';
import {
  useCatch,
  useFetcher,
  useParams,
} from 'remix';

import type { FieldGroup } from '~/utils/types';

import { FieldGroupLoaderData } from './load-data/$fieldGroupIdx';


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

// type LoaderData = {
//   fieldGroup: FieldGroup;
//   fieldGroupIndex: number;
//   nextFieldGroupPage: number | undefined;
//   prevFieldGroupPage: number | undefined;
// };

// export const meta: MetaFunction = ({
//   data,
// }: {
//   data: LoaderData | undefined
// }) => {
//   if (!data) {
//     return {
//       title: 'No Category',
//       description: 'No Form Category Found',
//     };
//   }
//   const {
//     fieldGroup,
//   } = data;
//   return {
//     title: `${fieldGroup.formName} | "${fieldGroup.label}"`,
//     description: `Enjoy the "${fieldGroup.formName}" and much more`,
//   };
// };

export default function NonEscalatorFormDisplayRoute() {
  // const [slideAnimationDirection, setSlideAnimationDirection] = useSlideAnimation();
  // const [currentPageIdx, setCurrentPageIdx] = useState(0);
  // const [runFetcher, setRunFetcher] = useState(false);
  // const [fieldGroup, setFieldGroup] = useState<FieldGroup>();
  const ref = useRef();
  const fetcher = useFetcher<FieldGroupLoaderData>();

  useEffect(() => {
    console.log({ fetcher });
    if (fetcher.state === 'idle' && fetcher.type === 'init') {
      fetcher.load(`/non-escalator-relationship/load-data/0`);
    }
  }, [fetcher]);
  // useEffect(() => {
  //   // if (fetcher.type === 'done') {
  //   //   ref.current;
  //   // }
  //   // fetcher.submit(data);
  //   fetcher.load(`/non-escalator-relationship/${currentPageIdx}`);
  // }, [fetcher]);

  // console.log({ fetcher });

  function onClickButton(direction: 'prev' | 'next') {
    if (direction === 'next') {
      invariant(ref.current, 'ref is not attached');
      invariant(fetcher.data, 'fetcher.data is not defined in onClick');
      const currentPageIdx = fetcher.data.fieldGroupIndex;
      fetcher.submit(ref.current, { method: 'post', action: `/non-escalator-relationship/update-data/${currentPageIdx}` });
      fetcher.load(`/non-escalator-relationship/load-data/${currentPageIdx + 1}`);


      // setSlideAnimationDirection('left');

      // invariant(fetcher.data, 'fetcher data needs to be loaded before calling onClickButton');
      // fetcher.load(`/non-escalator-relationship/${fetcher.data.fieldGroupIndex}`);
    } else {
      // setSlideAnimationDirection('right');
      invariant(ref.current, 'ref is not attached');
      invariant(fetcher.data, 'fetcher.data is not defined in onClick');
      const currentPageIdx = fetcher.data.fieldGroupIndex;
      fetcher.submit(ref.current, { method: 'post', action: `/non-escalator-relationship/update-data/${currentPageIdx}` });
      fetcher.load(`/non-escalator-relationship/load-data/${currentPageIdx - 1}`);


      // invariant(fetcher.data, 'fetcher data needs to be loaded before calling onClickButton');

      // fetcher.load(`/non-escalator-relationship/${fetcher.data.fieldGroupIndex}`);
    }
  }

  return (
    <>
      {fetcher.data && fetcher.state != 'loading' && fetcher.state != 'submitting' ? (
      // <PageTransition slideDirection={slideAnimationDirection}>
        <GridWrapper>
          <div className="flex flex-col gap-2 justify-center items-center w-full">
            <Title>Non Escalator Form</Title>
            <h2 className="text-2xl text-center text-neutral-lighter">
              {fetcher.data.fieldGroup.label}
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
                <FieldsLayout fieldGroup={fetcher.data.fieldGroup} />
                <div className="flex gap-6 justify-between w-full">
                  {fetcher.data.hasPrevFieldGroup && (
                    <div className="mr-auto">
                      <RoundedButton
                        type="submit"
                        // name="redirectToPage"
                        // value={fetcher.data.prevFieldGroupPage}
                        onClick={() => onClickButton('prev')}
                      >
                        Previous
                      </RoundedButton>
                    </div>
                  )}
                  {fetcher.data.hasNextFieldGroup? (
              <div className="ml-auto">
                <RoundedButton
                  type="submit"
                  // name="redirectToPage"
                  // value={fetcher.data.nextFieldGroupPage}
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
              <div>

              </div>

            </div>
          </fetcher.Form>
        </GridWrapper>
      // </PageTransition>
    ): (
      <div>LOADING DATA</div>
    )}
    </>
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
