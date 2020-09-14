import axios from 'axios';

const APIHandler = axios.create({
  baseURL: BACKEND_BASE,
});

export default APIHandler;
