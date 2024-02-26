const httpStatusCodes = {
  HTTP_200_OK: { code: 200, message: "OK" },
  HTTP_201_CREATED: { code: 201, message: "Created" },
  HTTP_204_NO_CONTENT: { code: 204, message: "No Content" },
  HTTP_400_BAD_REQUEST: { code: 400, message: "Bad Request" },
  HTTP_401_UNAUTHORIZED: { code: 401, message: "Unauthorized" },
  HTTP_403_FORBIDDEN: { code: 403, message: "Forbidden" },
  HTTP_404_NOT_FOUND: { code: 404, message: "Not Found" },
  HTTP_405_METHOD_NOT_ALLOWED: { code: 405, message: "Method Not Allowed" },
  HTTP_409_CONFLICT: { code: 409, message: "Conflict" },
  HTTP_422_UNPROCESSABLE_CONTENT: { code: 422, message: "Unprocessable Content" },
  HTTP_500_INTERNAL_SERVER_ERROR: { code: 500, message: "Internal Server Error" },
  HTTP_501_NOT_IMPLEMENTED: { code: 501, message: "Not Implemented" },
  HTTP_503_SERVICE_UNAVAILABLE: { code: 503, message: "Service Unavailable" }
};

export default httpStatusCodes;