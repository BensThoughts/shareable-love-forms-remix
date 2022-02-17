import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction, LinksFunction } from "remix";

import tailwindcssUrl from '~/styles/tailwind.css';
import Footer, {links as footerLinks} from './components/Layout/Footer';
import Navbar from './components/Layout/Navbar';
// import globalCssUrl from '~/styles/global.css';

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
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
    }
  ]
}

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
        {typeof document === "undefined"
          ? "__STYLES__"
          : null}
      </head>
      <body>
        {children}
        {/* <ScrollRestoration /> */}
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Navbar className="h-14" />
      <div className="page-wrapper">
        <div className="content-wrap">
          <main className="overflow-hidden z-0 mt-20 mb-16 max-h-full">
            <Outlet />
          </main>
        </div>
        <div className="footer-wrap">
          <Footer className="h-16" />
        </div>
      </div>
    </Document>
  )
}
