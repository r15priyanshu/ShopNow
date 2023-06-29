import axios from "axios";

export const BASE_URL = "http://localhost:9090";

export const PRODUCT_IMAGE_BASE_URL = "http://localhost:9090/pms/images/serveimage/";

export const myaxios = axios.create({ baseURL: BASE_URL });

export const CustomDateFormatterFunc = (date) => {
  const d = new Date(date);
  return `${d.getDate()}-${
    d.getMonth() + 1
  }-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
};

//Helpers for authentication and related activities
export const isLoggedIn = () => {
  return localStorage.getItem("loggedinuser");
};

//save the token as well as user in localStorage
export const SaveLoggedInUserDetails = (data) => {
  localStorage.setItem("loggedinuser", JSON.stringify(data));
};

//delete the token as well as user in localStorage
export const DeleteLoggedInUserDetails = () => {
  if (isLoggedIn()) localStorage.removeItem("loggedinuser");
};

//get user details from localStorage
export const GetLoggedInUserDetails = () => {
  if (isLoggedIn()) 
    return JSON.parse(localStorage.getItem("loggedinuser"));
  else
    return null;
};
