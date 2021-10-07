import axios from 'axios';
import { getCurrentUserOrNull } from './authentication';

const BASE_URL = 'https://conduit.productionready.io/api';

axios.interceptors.request.use((config) => {
  const user = getCurrentUserOrNull();
  if (user) {
    config.headers.Authorization = `Token ${user.token}`;
  }
  return config;
});

export default axios.create({ baseURL: BASE_URL });
