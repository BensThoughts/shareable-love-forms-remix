import {useState} from 'react';

// import ThemeToggle from '@app/components/ThemeToggle';
import MenuDrawer from '../MenuDrawer';
import IconButton from '../../IconButton';
// import MenuItem from './MenuItem';
import NavHider from './NavHider';

import {menuItems} from './menuItems';

import {
  MenuIcon,
  HeartIcon,
} from '@heroicons/react/solid';
import RemixLink from '~/components/RemixLink';
import RemixAnimatedLink from '~/components/RemixAnimatedLink';
import { LinksFunction } from 'remix';
import navbarCss from './navbar.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: navbarCss,
    }
  ];
}

type NavBarProps = {
  className?: string;
}

export default function Navbar({className, ...rest}: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MenuDrawer isOpen={isOpen} setIsOpen={setIsOpen} title="Menu">
        <div className="flex flex-col gap-4 justify-end content-between items-center pt-0 mt-7 w-full nav-links">
          {menuItems.map((menuItem) => (
            <RemixLink
              key={menuItem.href}
              to={menuItem.href}
              onClick={() => setIsOpen(false)}
              className="flex justify-center items-center w-full h-10 text-xl text-center hover:bg-primary text-neutral-white"
            >
              {menuItem.name}
            </RemixLink>
          ))}
        </div>
      </MenuDrawer>
      <NavHider>
        <div {...rest} className={`bg-neutral-dark bg-opacity-70 shadow-lg nav ${className ? className : ''}`}>

          {/* Medium+ Screens */}
          <div className="hidden md:flex md:justify-between md:items-center md:w-full md:h-full md:pt-0 md:mx-3">
            <div className="flex gap-x-4 items-center">
              <HeartIcon className="w-6 h-6 text-secondary" />
              <div className="flex gap-4 content-between items-center pt-0">
                {menuItems.map((menuItem) => (
                  <RemixAnimatedLink
                    key={menuItem.href}
                    to={menuItem.href}
                    className="text-neutral-white"
                  >
                    {menuItem.name}
                  </RemixAnimatedLink>
                ))}
              </div>
            </div>
          </div>

          {/* Small- Screens */}
          <div className="flex justify-between items-center mx-3 w-full md:hidden">

            {/* <ThemeToggle /> */}
            <IconButton onClick={() => setIsOpen(!isOpen)} className="mr-3 md:hidden" aria-label="navigation menu">
              <MenuIcon className="w-8 h-8 text-primary" />
            </IconButton>

          </div>
        </div>
      </NavHider>

    </>
  );
};
