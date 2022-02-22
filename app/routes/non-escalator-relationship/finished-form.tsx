import { LoaderFunction } from 'remix';
import { requireUserId } from '~/utils/db/session.server';
import { db } from '~/utils/db/db.server';

type LoaderData = {

}

const loader: LoaderFunction = async ({
  request,
}) => {
  const userId = await requireUserId(request, '/login');
};


export default function FinishedFormRoute() {

}
