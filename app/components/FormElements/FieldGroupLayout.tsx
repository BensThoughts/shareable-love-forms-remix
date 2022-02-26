
export default function Blank() {
  return (
    <div>
    </div>
  );
}
// import type { FormProps } from 'remix'
// import { FieldGroupLoaderData } from '~/routes/non-escalator-relationship/$fieldGroupIdx'
// import { FieldGroup } from '~/utils/types'
// import GridWrapper from '../GridWrapper'
// import RoundedButton from '../RoundedButton'
// import Title from '../Title'
// import FieldsLayout from './FieldsLayout';

// type FieldGroupLayoutProps = {
//   Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>>;
//   data: FieldGroupLoaderData;
//   state: 'submitting' | 'loading' | 'idle';
//   type: 'loaderSubmission' | 'actionReload' | 'normalLoad' | 'done';
//   fieldGroup?: FieldGroup;
//   onClickButton()
// }

// export default function FieldGroupLayout({
//   Form,
//   data,
//   state,
//   type,
// }: FieldGroupLayoutProps) {

//   function onClickButton(direction: 'prev' | 'next') {
//     if (direction === 'next') {

//     }

//   }
// return (
//   <GridWrapper>
//   <div className="flex flex-col gap-2 justify-center items-center w-full">
//     <Title>Non Escalator Form</Title>
//     <h2 className="text-2xl text-center text-neutral-lighter">
//       {data.fieldGroup.label}
//     </h2>
//   </div>
//   <Form
//     // ref={ref}
//     method="post"
//     action='/non-escalator-relationship/update-data'
//     onSubmit={(event) => event.preventDefault()}
//   >
//     <div className="flex flex-col gap-20 items-center">
//       <div className="flex flex-col gap-y-12 justify-center items-center">
//         <FieldsLayout fieldGroup={data.fieldGroup} />
//         <div className="flex gap-6 justify-between w-full">
//           {data.hasPrevFieldGroup && (
//             <div className="mr-auto">
//               <RoundedButton
//                 type="submit"
//                 // name="redirectToPage"
//                 // value={fetcher.data.prevFieldGroupPage}
//                 onClick={() => onClickButton('prev')}
//               >
//                 Previous
//               </RoundedButton>
//             </div>
//           )}
//           {fetcher.data.nextFieldGroupPage ? (
//       <div className="ml-auto">
//         <RoundedButton
//           type="submit"
//           // name="redirectToPage"
//           // value={fetcher.data.nextFieldGroupPage}
//           onClick={() => onClickButton('next')}
//         >
//             Next
//         </RoundedButton>
//       </div>
//     ) : (
//       <div className="ml-auto">
//         <RoundedButton
//           type="submit"
//           name="redirectToPage"
//           value={'finished-form'}
//         >
//           Submit
//         </RoundedButton>
//       </div>
//     )}
//         </div>
//       </div>
//       <div>

//       </div>

//     </div>
//   </Form>
// </GridWrappe>
// )
// }
