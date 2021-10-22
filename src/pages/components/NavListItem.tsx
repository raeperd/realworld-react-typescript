import { NavLink } from 'react-router-dom';
import React from 'react';

export const NavLinkListItem = ({ to, children }: { to: string, children: string }) => (
  <NavListItem>
    <NavLink
      className={(isActive) => (isActive ? CLASS_NAME_NAV_LINK : `${CLASS_NAME_NAV_LINK} active`)}
      exact
      to={to}
    >
      {children}
    </NavLink>
  </NavListItem>
);

export const NavButtonListItem = ({ activated, onClick, children }:
  {activated: boolean, onClick: () => void, children: string}) => {
  const className = activated ? CLASS_NAME_ACTIVE_NAV_LINK : CLASS_NAME_NAV_LINK;
  return (
    <NavListItem>
      <button type="button" className={className} onClick={onClick}>
        {children}
      </button>
    </NavListItem>
  );
};

const NavListItem = ({ children }: {children: React.ReactElement}) => (
  <li className="nav-item">
    {children}
  </li>
);

const CLASS_NAME_NAV_LINK = 'nav-link';
const CLASS_NAME_ACTIVE_NAV_LINK = `${CLASS_NAME_NAV_LINK} active`;
