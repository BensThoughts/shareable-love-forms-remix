import { useUser } from '@clerk/remix';
// import { getAuth } from '@clerk/remix/ssr.server';
import { LoaderFunction, Outlet, useLoaderData } from 'remix';

export const loader: LoaderFunction = async ({ request }) => {
  // const { userId, sessionId, getToken } = await getAuth(request);
  // use auth ids to fetch data:
  const messages = ['hello', 'there'];
  return messages;
};

export default function ProfileRoute() {
  const { isSignedIn, isLoaded, user } = useUser();
  const data = useLoaderData();

  return (
    <div>
      <h1>Profile route</h1>
      <h2>Loader data:</h2>
      <pre>{JSON.stringify(data, null, 0)}</pre>
      <hr />
      <h2>User data:</h2>
      <pre>
        {JSON.stringify({ isLoaded, isSignedIn, user }, null, 1)} <br />
      </pre>
      <Outlet />
    </div>
  );
}
