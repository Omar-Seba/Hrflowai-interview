export function handleError(errorCode: number) {
  switch (errorCode) {
    case 400:
      return "Invalid Keys Format";
    case 401:
      return "Invalid Secret Key";
    case 404:
      return "Not Found";
    case 500:
    default:
      return "Unknown Error";
  }
}
