import axiosClient from './axiosClient';
import { User } from './authentication';

export function updateUser(userUpdateParam: UserUpdateParam): Promise<User> {
  return axiosClient.put<User>('/users', { user: { ...userUpdateParam } })
    .then((response) => response.data);
}

export interface UserUpdateParam extends Partial<User> {
  password?: string
}
