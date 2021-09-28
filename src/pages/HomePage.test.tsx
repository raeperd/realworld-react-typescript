import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import HomePage from './HomePage';
import { User } from '../api/authentication';

test('when render expect Banner to be in the document', () => {
  const { getByText } = render(<HomePage userLoggedIn={null} />);

  expect(getByText('A place to share your knowledge.')).toBeInTheDocument();
});

test('when render expect SideBar to be in the document', () => {
  const { getByText } = render(<HomePage userLoggedIn={null} />);

  expect(getByText('Popular Tags')).toBeInTheDocument();
});

describe('HomeFeedToggle', () => {
  test('when render without logged in expect no Your Feed', () => {
    const { queryByText } = render(<HomePage userLoggedIn={null} />);

    expect(queryByText('Your Feed')).not.toBeInTheDocument();
  });

  test('when render expect Global Feed is focused', () => {
    render(<HomePage userLoggedIn={null} />);

    expect('Global Feed').toBeActivatedNavItem();
  });

  test('when render with user expect Your Feed to be in the document', () => {
    render(<HomePage userLoggedIn={userMocked} />);

    expect('Your Feed').toBeDisabledNavItem();
    expect('Global Feed').toBeActivatedNavItem();
  });

  test('when click button expect activated feed changed', () => {
    const { getByText } = render(<HomePage userLoggedIn={userMocked} />);
    fireEvent.click(getByText('Your Feed'));

    expect('Global Feed').toBeDisabledNavItem();
    expect('Your Feed').toBeActivatedNavItem();
  });
});

test('when render expect HomeArticlePreview to be in the document', () => {
  render(<HomePage userLoggedIn={null} />);

  expect(screen.getAllByText('Read more...')[0]).toBeInTheDocument();
});

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
    namespace jest {
        interface Matchers<R> {
            toBeActivatedNavItem(): R;
            toBeDisabledNavItem(): R;
        }
    }
}

expect.extend({
  toBeActivatedNavItem(received: 'Your Feed' | 'Global Feed') {
    switch (screen.getByText(received).className) {
      case 'nav-link active':
        return succeed(`${received} is NavItem disabled`);
      case 'nav-link':
        return failed(`${received} is NavItem activated`);
      default:
        return failed(`${received} is not NavItem`);
    }
  },
  toBeDisabledNavItem(received: 'Your Feed' | 'Global Feed') {
    switch (screen.getByText(received).className) {
      case 'nav-link':
        return succeed(`${received} is NavItem disabled`);
      case 'nav-link active':
        return failed(`${received} is NavItem activated`);
      default:
        return failed(`${received} is not NavItem`);
    }
  },
});

const failed = (message: string) => jestMatchedResult(message, false);
const succeed = (message: string) => jestMatchedResult(message, true);

const jestMatchedResult = (message: string, isPassed: boolean) => ({
  message: () => message,
  pass: isPassed,
});

const userMocked: User = {
  email: '',
  username: '',
  bio: '',
  token: '',
  image: null,
};
