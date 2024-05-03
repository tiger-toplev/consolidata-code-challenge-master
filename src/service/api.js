import axios from 'axios';

const apiBaseUrl = 'https://us-central1-react-firebase-form-challenge.cloudfunctions.net';

export const saveFormData = async (data) => {
  return axios.post(apiBaseUrl + '/saveFormData', data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const getFormStructure = async () => {
  return axios.get(apiBaseUrl + '/getFormStructure', {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
};
