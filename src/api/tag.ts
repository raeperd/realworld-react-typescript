import axios from './axiosClient';

// eslint-disable-next-line import/prefer-default-export
export function getTags(): Promise<string[]> {
  return axios.get<MultipleTagResponseDTO>('/tags')
    .then((response) => response.data.tags);
}

interface MultipleTagResponseDTO {
  tags: string[]
}
