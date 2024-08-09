import axios from "axios";

const BASE_URL = "/api";  // Thay vì "http://35.206.223.219"
const API_CONFIGS = {
  main: "/main-service/api",
  auth: "/auth-service/api/user",
  admin: "",
  search: "/search-service/api",
};

const createApiInstance = (serviceName) => {
  return axios.create({
    baseURL: `${BASE_URL}${API_CONFIGS[serviceName]}`,
    timeout: 300000, // 5 minutes
  });
};

const apiInstances = {
  mainApi: createApiInstance("main"),
  authApi: createApiInstance("auth"),
  adminApi: createApiInstance("admin"),
  searchApi: createApiInstance("search"),
};

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("accessToken");
  }
  return null;
};

const refreshAccessToken = async () => {
  if (typeof window === 'undefined') {
    throw new Error("Cannot refresh token on server side.");
  }

  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token available.");
  }

  try {
    const response = await apiInstances.authApi.post("/auth/refresh", { token: refreshToken });
    if (response.status === 200 && response.data.payload) {
      const newAccessToken = response.data.payload;
      localStorage.setItem("accessToken", newAccessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
      return newAccessToken;
    } else {
      throw new Error("Invalid response while refreshing token.");
    }
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};

const addAuthHeader = (config) => {
  const publicEndpoints = [
    "/auth/refresh",
    "/auth/reset-password",
    "/auth/login",
    "/auth/signup",
    "/auth/check-otp",
  ];

  if (publicEndpoints.some((endpoint) => config.url.endsWith(endpoint))) {
    return config;
  }

  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

Object.values(apiInstances).forEach((api) => {
  api.interceptors.request.use(addAuthHeader);
});

const responseInterceptor = async (error) => {
  if (!error.response) {
    return Promise.reject(error);
  }

  const { status, config } = error.response;

  if (status === 404) {
    console.log("Resource not found.");
    return Promise.reject(error);
  }

  if (status === 403 && !config._retry) {
    config._retry = true;
    try {
      const newAccessToken = await refreshAccessToken();
      config.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return axios(config);
    } catch (refreshError) {
      console.error("Token refresh failed:", refreshError);
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};

Object.values(apiInstances).forEach((api) => {
  api.interceptors.response.use((response) => response, responseInterceptor);
});

export const { mainApi, authApi, adminApi, searchApi } = apiInstances;