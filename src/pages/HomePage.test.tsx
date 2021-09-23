import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import HomePage from './HomePage';

test('when render expect Banner to be in the document', () => {
  render(<HomePage />);

  expect(screen.getByText('A place to share your knowledge.')).toBeInTheDocument();
});

test('when render expect SideBar to be in the document', () => {
  render(<HomePage />);

  expect(screen.getByText('Popular Tags')).toBeInTheDocument();
});

describe('HomeFeedToggle', () => {
  test('when render expect HomeFeedToggle to be in the document', () => {
    render(<HomePage />);

    expect(screen.getByText('Your Feed')).toBeInTheDocument();
    expect(screen.getByText('Global Feed')).toBeInTheDocument();
  });

  test('when render expect Global Feed is focused', () => {
    render(<HomePage />);

    expect('Global Feed').toBeActivatedNavItem();
    expect('Your Feed').toBeDisabledNavItem();
  });

  test('when click button expect activated feed changed', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('Your Feed'));

    expect('Global Feed').toBeDisabledNavItem();
    expect('Your Feed').toBeActivatedNavItem();
  });
});

test('when render expect HomeArticlePreview to be in the document', () => {
  render(<HomePage />);

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
        return successed(`${received} is NavItem disabled`);
      case 'nav-link disabled':
        return failed(`${received} is NavItem activated`);
      default:
        return failed(`${received} is not NavItem`);
    }
  },
  toBeDisabledNavItem(received: 'Your Feed' | 'Global Feed') {
    switch (screen.getByText(received).className) {
      case 'nav-link disabled':
        return successed(`${received} is NavItem disabled`);
      case 'nav-link active':
        return failed(`${received} is NavItem activated`);
      default:
        return failed(`${received} is not NavItem`);
    }
  },
});

const failed = (message: string) => jestMatchedResult(message, false);

const successed = (message: string) => jestMatchedResult(message, true);

const jestMatchedResult = (message: string, isPassed: boolean) => ({
  message: () => message,
  pass: isPassed,
});
