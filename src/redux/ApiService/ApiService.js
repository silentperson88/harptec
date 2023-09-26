/* eslint-disable  */

import axios from "axios";

// Axios API Service
const ApiService = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default ApiService;
