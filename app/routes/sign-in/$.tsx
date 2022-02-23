import { SignIn } from '@clerk/remix';
import { LinksFunction } from 'remix';

import styles from '~/styles/sign-in.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export default function Posts() {
  return (
    <div className="bg-neutral-black">
      <SignIn routing={'path'} path={'/sign-in'} />
    </div>
  );
}
