import axios from 'axios';

export default async (options = {}) => {
  const response = await axios(options);

  return {
    body: response.data,
    statusCode: response.status,
    statusText: response.statusText,
  };
};
