export const boardKeys = (process.env.REACT_APP_BOARD_KEYS ?? "").split(",");
const apiKey = process.env.REACT_APP_API_KEY;

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": apiKey ?? "",
    "X-USER-EMAIL": "",
  },
};
