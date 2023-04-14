const isProduction = process.env.NODE_ENV === "production";

const devApiConfig = {
  baseUrl: "http://localhost:5000/api/v1",
};

const prodApiConfig = {
  baseUrl: "http://localhost:5000/api/v1",
};

const apiConfig = isProduction ? prodApiConfig : devApiConfig;

export { apiConfig };
