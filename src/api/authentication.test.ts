import { AxiosResponse } from 'axios';
import axios from './axiosClient';
import { getCurrentUserOrNull, login, saveUser, signUp, User } from './authentication';

jest.mock('./axiosClient');
const axiosMocked = axios as jest.Mocked<typeof axios>;

describe('login', () => {
  test('when login expect post with url', () => {
    axiosMocked.post.mockResolvedValue(axiosResponse);

    return login(userMock.email, 'password')
      .then(() => {
        expect(axiosMocked.post).toBeCalledWith('/users/login', expect.anything());
      });
  });
});

describe('signUp', () => {
  test('when signUp expect post with url', () => {
    axiosMocked.post.mockResolvedValue(axiosResponse);

    return signUp({ email: userMock.email, username: userMock.username, password: '' })
      .then(() => {
        expect(axiosMocked.post).toBeCalledWith('/users', expect.anything());
      });
  });
});

describe('saveUser', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  test('when save user expect getCurrentUserOrNull return not null', () => {
    expect(getCurrentUserOrNull()).toBeNull();

    saveUser(userMock);

    expect(getCurrentUserOrNull()).not.toBeNull();
  });
});

const userMock: User = {
  email: 'user@gmail.com',
  username: 'name',
  token: 'token',
  bio: null,
  image: null,
};

const axiosResponse: AxiosResponse = {
  data: userMock,
  status: 200,
  statusText: '',
  headers: undefined,
  config: {},
};
