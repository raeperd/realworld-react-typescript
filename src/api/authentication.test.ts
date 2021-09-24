/* eslint-disable @typescript-eslint/ban-types */
import { AxiosResponse } from 'axios';
import axios from './axiosClient';
import { login, User } from './authentication';

jest.mock('./axiosClient');
const axiosMocked = axios as jest.Mocked<typeof axios>;

describe('login', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  test('when login expect post with url', () => {
    axiosMocked.post.mockResolvedValue(axiosResponse);

    return login(userMock.email, 'password')
      .then(() => {
        expect(axiosMocked.post.mock.calls[0][0]).toBe('/users/login');
      });
  });

  test('when login expect user saved', () => {
    axiosMocked.post.mockResolvedValue(axiosResponse);
    expect(window.localStorage.getItem('user-key')).toBe(null);

    return login(userMock.email, 'password')
      .then(() => {
        expect(window.localStorage.getItem('user-key')).toBe(JSON.stringify(userMock));
      });
  });
});

const userMock: User = {
  email: 'user@gmail.com',
  username: 'name',
  token: 'token',
  bio: 'bio',
};

const axiosResponse: AxiosResponse = {
  data: userMock,
  status: 200,
  statusText: '',
  headers: undefined,
  config: {},
};
