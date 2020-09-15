import axios from 'axios';

const APIHandler = axios.create({
  baseURL: BACKEND_BASE,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN',
});

export default APIHandler;
