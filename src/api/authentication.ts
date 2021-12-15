import axios from './axiosClient';

export function login(email: string, password: string): Promise<User> {
  return axios.post<UserResponseDTO>('/users/login', { user: { email, password } })
    .then((response) => response.data.user);
}

export function signUp({ email, username, password }: SignUpParam): Promise<User> {
  return axios.post<UserResponseDTO>('/users', { user: { email, username, password } })
    .then((response) => response.data.user);
}

export function saveUser(user: User): User {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export function getCurrentUserOrNull(): User | null {
  const userOrNull = window.localStorage.getItem(USER_KEY);
  if (userOrNull === null) {
    return null;
  }
  return JSON.parse(userOrNull) as User;
}

export interface UserResponseDTO {
  user: User
}

export interface User {
    email: string,
    username: string,
    token: string,
    bio: string | null,
    image: string | null
}

export interface SignUpParam {
  email: string,
  username: string,
  password: string
}

const USER_KEY = 'user-key';
