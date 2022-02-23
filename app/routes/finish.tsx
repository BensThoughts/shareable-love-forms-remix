import { ActionFunction, redirect } from 'remix';
import { requireUserId } from '~/utils/db/session.server';
import { db } from '~/utils/db/db.server';

export const action: ActionFunction = async ({
  request,
}) => {
  const userId = await requireUserId(request);

  try {
    await db.clerkUser.upsert({
      where: {
        id: userId,
      },
      create: {
        id: userId,
      },
      update: {
        id: userId,
      },
    });
  } catch (e) {
    redirect('/sign-in', 500);
  };

  redirect('/');
};
