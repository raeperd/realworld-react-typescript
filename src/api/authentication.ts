import axios from './axiosClient';

export async function login(email: string, password: string): Promise<User> {
  return axios.post<User>('/users/login', { user: { email, password } })
    .then((response) => {
      saveUser(response.data);
      return response.data;
    });
}

export interface User {
    email: string,
    username: string,
    token: string,
    bio: string
}

const saveUser = (user: User) => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const USER_KEY = 'user-key';
