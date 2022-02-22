import {
  // LoaderFunction,
  Outlet,
  // useLoaderData
} from 'remix';
import GridWrapper from '~/components/GridWrapper';
import Title from '~/components/Title';
// import invariant from 'tiny-invariant';
// import FieldGroupsProvider from '~/utils/context/FieldGroupCacheContext';
// import { db } from '~/utils/db/db.server';
// import { requireUserId } from '~/utils/db/session.server';
// import type { FieldGroup } from '~/utils/types';

// type LoaderData = {
//   fieldGroups: FieldGroup[]
// }

// export const loader: LoaderFunction = async ({
//   request,
//   params,
// }) => {
//   console.log('LOADER MAIN ROUTE');
//   const userId = await requireUserId(request, '/');
//   const formState = await db.formState.findUnique({
//     where: {
//       name: 'Non Escalator Form',
//     },
//     select: {
//       name: true,
//       fieldGroups: {
//         select: {
//           label: true,
//           formName: true,
//           fields: {
//             select: {
//               id: true,
//               label: true,
//               type: true,
//               defaultValue: true,
//               valueOptions: true,
//               tooltipText: true,
//               fieldValuesForUsers: {
//                 where: {
//                   userId,
//                 },
//                 select: {
//                   value: true,
//                 }
//               }
//             }
//           }
//         }
//       },
//     }
//   });
//   invariant(formState, 'Non Escalator Form not found in db');

//   const dbFieldGroups = formState.fieldGroups;

//   const fieldGroups: FieldGroup[] = dbFieldGroups.map(({
//     label,
//     formName,
//     fields,
//   }) => {
//     return {
//       label,
//       formName,
//       fields: {
//         ...fields.map(({
//           id,
//           label,
//           type,
//           tooltipText,
//           valueOptions,
//           defaultValue,
//           fieldValuesForUsers,
//         }) => {
//           return {
//             id,
//             label,
//             type,
//             valueOptions,
//             defaultValue: defaultValue ? defaultValue : undefined,
//             tooltipText: tooltipText ? tooltipText : undefined,
//             value: fieldValuesForUsers[0].value
//           }
//         })
//       }
//     }
//   })

//   return {
//     fieldGroups,
//   }
// }

export default function NonEscalatorRelationshipRoute() {
  // const { fieldGroups } = useLoaderData<LoaderData>();
  return (
    <GridWrapper className="mx-8">
      <div className="flex justify-center items-center w-full">
        <Title>Non Escalator Form</Title>
      </div>
      <Outlet />
    </GridWrapper>
    // <FieldGroupsProvider initialFieldGroups={fieldGroups}>
    // </FieldGroupsProvider>
  )
}