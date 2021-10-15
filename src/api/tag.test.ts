import axios from './axiosClient';
import { axiosResponseWithData } from './article.test';
import { getTags } from './tag';

jest.mock('./axiosClient');
const axiosMocked = axios as jest.Mocked<typeof axios>;

describe('getTags', () => {
  test('when getTags expect get with url', () => {
    axiosMocked.get.mockResolvedValueOnce(axiosResponseWithData({ tags: [''] }));

    return getTags()
      .then(() => { expect(axiosMocked.get).toBeCalledWith('/tags'); });
  });

  test('when getTags expect return tags', () => {
    axiosMocked.get.mockResolvedValueOnce(axiosResponseWithData({ tags: TAGS_MOCKED }));

    return getTags()
      .then((response) => expect(response).toStrictEqual(TAGS_MOCKED));
  });
});

const TAGS_MOCKED = ['typescript', 'react'];
