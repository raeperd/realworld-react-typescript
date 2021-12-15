import axiosClient from './axiosClient';
import { User, UserResponseDTO } from './authentication';

export function updateUser(userUpdateParam: UserUpdateParam): Promise<User> {
  return axiosClient.put<UserResponseDTO>('/users', { user: { ...userUpdateParam } })
    .then((response) => response.data.user);
}

export function followUser(username: string): Promise<Profile> {
  return axiosClient.post<ProfileResponseDTO>(`/profiles/${username}/follow`)
    .then((response) => response.data.profile);
}

export interface UserUpdateParam extends Partial<User> {
  password?: string
}

interface ProfileResponseDTO {
  profile: Profile
}

export interface Profile extends Pick<User, 'username' | 'bio' | 'image'> {
  following: boolean
}
