import axios from './axiosClient';

export async function login(email: string, password: string): Promise<User> {
  return axios.post<User>('/users/login', { user: { email, password } })
    .then((response) => saveUser(response.data));
}

export async function signUp({ email, username, password }: SignUpParam): Promise<User> {
  return axios.post<User>('/users', { user: { email, username, password } })
    .then((response) => saveUser(response.data));
}

export interface User {
    email: string,
    username: string,
    token: string,
    bio: string
}

export interface SignUpParam {
  email: string,
  username: string,
  password: string
}

const saveUser = (user: User) => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
};

const USER_KEY = 'user-key';
