import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  useLocation,
  ScrollRestoration,
  LoaderFunction,
  useLoaderData,
  Link,
} from 'remix';
import type { MetaFunction, LinksFunction } from 'remix';

import tailwindcssUrl from '~/styles/tailwind.css';
import Footer, { links as footerLinks } from './components/Layout/Footer';
import Navbar from './components/Layout/Navbar';
import { AnimatePresence } from 'framer-motion';
import SlideAnimationProvider from './utils/context/SlideAnimationContext';

import { ClerkProvider, SignedOut, UserButton } from '@clerk/remix';
import { rootAuthLoader, WithClerkState } from '@clerk/remix/ssr.server';
// import globalCssUrl from '~/styles/global.css';

export const meta: MetaFunction = () => {
  return { title: 'New Remix App' };
};

export const links: LinksFunction = () => {
  return [
    // {
    //   rel: 'stylesheet',
    //   href: globalCssUrl,
    // },
    ...footerLinks(),
    {
      rel: 'stylesheet',
      href: tailwindcssUrl,
    },
  ];
};

export const loader: LoaderFunction = (args) =>
  rootAuthLoader(
      args,
      () => {
        // const { userId, sessionId, getToken } = auth;
        // console.log({
        //   userId,
        //   sessionId,
        //   getToken,
        // });
        return `Hello from the root loader :)`;
      },
      // {
      //   loadUser: true,
      // },
  );

function Document({
  children,
  title = 'Shareable Love Forms',
}: {
  children: React.ReactNode,
  title?: string,
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        {typeof document === 'undefined'
          ? '__STYLES__'
          : null}
      </head>
      <body>
        <Scripts />

        {children}
        <ScrollRestoration />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();
  // const { clerkState } = useLoaderData<WithClerkState<string>>();
  return (
    <Document>
      {/* <ClerkProvider frontendApi={'clerk.grown.garfish-35.lcl.dev'} clerkState={clerkState}> */}

      <Navbar className="h-14" />
      <div className="page-wrapper">
        <div className="content-wrap">

          <main className="overflow-hidden z-0 mt-20 mb-16 max-h-full">
            <SlideAnimationProvider>
              <AnimatePresence
                exitBeforeEnter={true}
                initial={false}
                // onExitComplete={() => window.scrollTo(0, 0)}
              >
                <Outlet key={location.pathname} />
              </AnimatePresence>
            </SlideAnimationProvider>
          </main>

        </div>
        <div className="footer-wrap">
          <Footer className="h-16" />
        </div>
      </div>
      {/* </ClerkProvider> */}
    </Document>
  );
}

