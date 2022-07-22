const APIConstant = {
  // Common
  BASE_URL: "",
  HEADER_DEFAULT: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  TIMEOUT: 30000,

  //Fixed value

  // HTTP Status
  STT_OK: 200,
  STT_UNAUTHORIZED: 401,
  STT_FORBIDDEN: 403,
  STT_INTERNAL_SERVER: 500

  // Api
};

export default APIConstant;
