import type { Prisma, FieldValuesForUsers } from '@prisma/client';
import type { ActionFunction } from 'remix';
// import { redirect } from 'remix';
// import invariant from 'tiny-invariant';
import {
  requireUserId,
  // requireClerkUserId
} from '~/utils/db/session.server';
import { db } from '~/utils/db/db.server';


export type UpdateDataActionData = {
  ok: boolean;
}

export const action: ActionFunction = async ({
  request,
}) => {
  const form = await request.formData();
  const userId = await requireUserId(request);
  // const clerkUserId = await requireClerkUserId(request);

  // const redirectToPage = form.get('redirectToPage');
  // invariant(redirectToPage, 'No page to redirect to');
  // form.delete('redirectToPage');
  // const redirectTo = `/non-escalator-relationship/${redirectToPage.toString()}`;

  const batchTransactions: Prisma.Prisma__FieldValuesForUsersClient<FieldValuesForUsers>[] = [];
  for (const pair of form.entries()) {
    const fieldId = pair[0];
    const value = pair[1].toString();
    const data = {
      userId,
      // clerkUserId,
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
            // fieldId_userId: {
            //   fieldId,
            //   userId,
            // },
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

  const actionData: UpdateDataActionData = {
    ok: true,
  };

  return actionData;
  // return redirect(`${redirectTo}`);
};

export default function NonEscalatorUpdateData() {
  return (
    <div>No Javascript Update-Data</div>
  );
}
