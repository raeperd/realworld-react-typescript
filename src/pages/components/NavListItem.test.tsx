import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { HashRouter, Router } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import { NavButtonListItem, NavLinkListItem } from './NavListItem';

describe('NavLinkListItem', () => {
  test('when render NavLinkListItem expect children', () => {
    const { getByText } = renderWithRouter(<NavLinkListItem to="/">{ITEM_TEXT}</NavLinkListItem>);

    expect(getByText(ITEM_TEXT)).toBeInTheDocument();
  });

  test('when click NavLinkListItem expect history pushed', () => {
    const history = createMemoryHistory();
    const { getByText } = renderWithHistory(
      <NavLinkListItem to="/link">{ITEM_TEXT}</NavLinkListItem>, history,
    );

    fireEvent.click(getByText(ITEM_TEXT));

    expect(history.location.pathname).toBe('/link');
  });
});

describe('NavButtonListItem', () => {
  test('when render NavButtonListItem expect children', () => {
    const { getByText } = renderWithRouter(
      <NavButtonListItem activated={false} onClick={jest.fn()}>{ITEM_TEXT}</NavButtonListItem>,
    );

    expect(getByText(ITEM_TEXT)).toBeInTheDocument();
  });

  test('when click expect onClick function called', () => {
    const onClickMocked = jest.fn();
    const { getByText } = renderWithRouter(
      <NavButtonListItem activated={false} onClick={onClickMocked}>{ITEM_TEXT}</NavButtonListItem>,
    );

    fireEvent.click(getByText(ITEM_TEXT));

    expect(onClickMocked).toHaveBeenCalledTimes(1);
  });
});

const renderWithRouter = (children: React.ReactNode) => (
  render(<HashRouter>{children}</HashRouter>)
);

const renderWithHistory = (children: React.ReactNode, history: History) => (
  render(<Router history={history}>{children}</Router>)
);

const ITEM_TEXT = 'NAV_LINK_ITEM_TEXT';
