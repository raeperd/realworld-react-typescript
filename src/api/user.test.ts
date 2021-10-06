import { AxiosResponse } from 'axios';
import axios from './axiosClient';
import { User } from './authentication';
import { updateUser } from './user';

jest.mock('./axiosClient');
const axiosMocked = axios as jest.Mocked<typeof axios>;

describe('updateUser', () => {
  test('when updateUser expect put with url', () => {
    axiosMocked.put.mockResolvedValueOnce(axiosResponse);

    return updateUser({ password: '' })
      .then(() => {
        expect(axiosMocked.put).toBeCalledWith('/users', { user: { password: '' } });
      });
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
