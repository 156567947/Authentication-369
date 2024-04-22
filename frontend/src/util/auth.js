import { redirect } from "react-router-dom";
export function getToken() {
  return localStorage.getItem("token");
}
export function tokenLoader() {
  return getToken();
}

export function checkAuthLoader() {
  const token = getToken();
  if (!token) {
    return redirect("/auth");
  }
}
