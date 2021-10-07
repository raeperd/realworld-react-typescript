import axiosClient from './axiosClient';
import { User } from './authentication';

export const updateUser = (userUpdateParam: UserUpdateParam) => (
  axiosClient.put<User>('/users', { user: { ...userUpdateParam } })
    .then((response) => response.data)
);

export interface UserUpdateParam extends Partial<User> {
  password?: string
}
