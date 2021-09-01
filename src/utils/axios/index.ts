import axios, {AxiosResponse} from 'axios';
import {StatusCodes} from 'http-status-codes';
import localStorage from '../helpers/storage/StorageNative';

const USER_TOKENS = 'USER_TOKENS';
const Environment = require('../../../environment');
const baseURL = `${Environment.BASE_URL}`;
const defaultAxiosSetup = {
  baseURL,
  headers: {'Content-Type': 'application/json'},
};

const axiosInstance = axios.create(defaultAxiosSetup);

axiosInstance.interceptors.request.use(
  function (config) {
    const tokens = localStorage.getItem(USER_TOKENS);

    const token = !!tokens ? tokens : null;
    if (token) {
      let bearerToken = `Bearer ${token}`;

      //remove quotes from string
      bearerToken = bearerToken.replace(/['"]+/g, '');
      config.headers['Authorization'] = bearerToken;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  },
);
axiosInstance.interceptors.response.use(
  function (
    response: AxiosResponse<any>,
  ): AxiosResponse<any> | Promise<AxiosResponse<any>> {
    // If the request succeeds, we don't have to do anything and just return the response
    return response;
  },
  function (error) {
    const errorMessage = error.message;
    if (errorMessage === StatusCodes.UNAUTHORIZED) {
      // console.log("token expired");
      return resetTokenAndReattemptRequest(error);
    }
    let e = {
      message: !!errorMessage ? errorMessage : 'apiIsNotReachable',
    };
    throw e;
    // If the error is due to other reasons, we just throw it back to axios
    // return Promise.reject"dasdasdasdas");
  },
);

let isAlreadyFetchingAccessToken = false;

// This is the list of waiting requests that will retry after the JWT refresh complete
let subscribers = [];

const resetTokenAndReattemptRequest = async error => {
  try {
    const {response: errorMessage} = error;
    const resetToken = localStorage.getItem(USER_TOKENS);
    if (!resetToken) {
      return Promise.reject(error);
    }
    /* Proceed to the token refresh procedure
    We create a new Promise that will retry the request,
    clone all the request configuration from the failed
    request in the error object. */
    const retryOriginalRequest = new Promise(resolve => {
      /* We need to add the request retry to the queue
    since there another request that already attempt to
    refresh the token */
      // console.log("retrying");
      addSubscriber(token => {
        errorMessage.config.headers.Authorization = 'Bearer ' + token;
        resolve(axios(errorMessage.config));
      });
    });
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;

      const response = await axios.post(`${baseURL}/Token/CreateToken`, {
        headers: {'Content-Type': 'application/json'},
      });
      if (!response.data) {
        return Promise.reject(error);
      }
      // console.log("token refreshed");
      // if (response.data.statusCode === StatusCodes.OK) {
      localStorage.setItem(USER_TOKENS, {...response.data.body});
      // }
      //   TokenUtils.saveRefreshToken(newToken); // save the newly refreshed token for other requests to use
      isAlreadyFetchingAccessToken = false;
      onAccessTokenFetched();
    }
    return retryOriginalRequest;
  } catch (err) {
    return Promise.reject(err);
  }
};

function onAccessTokenFetched() {
  const access_token = localStorage.getItem(USER_TOKENS);
  // When the refresh is successful, we start retrying the requests one by one and empty the queue
  subscribers.forEach(callback => callback(access_token));
  subscribers = [];
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

export const publicAxiosInstance = axios.create(defaultAxiosSetup);

publicAxiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

publicAxiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  function () {
    let e = {
      message: 'apiIsNotReachable',
    };
    throw e;
  },
);

export default axiosInstance;
