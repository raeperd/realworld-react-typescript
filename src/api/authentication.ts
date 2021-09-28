import axios from './axiosClient';

export const login = (email: string, password: string) => (
  axios.post<User>('/users/login', { user: { email, password } }))
  .then((response) => response.data);

export const signUp = ({ email, username, password }: SignUpParam) => (
  axios.post<User>('/users', { user: { email, username, password } })
    .then((response) => response.data)
);

export const saveUser = (user: User) => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
};

export const getCurrentUserOrNull = () => {
  const userOrNull = window.localStorage.getItem(USER_KEY);
  if (userOrNull === null) {
    return null;
  }
  return JSON.parse(userOrNull) as User;
};

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
