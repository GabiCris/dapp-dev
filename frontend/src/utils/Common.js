// //return the user data from the session storage
// export const getUser = () => {
//   const userStr = sessionStorage.getItem('user');
//   if (userStr) return JSON.parse(userStr);
//   else return null;
// }
 
// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}

export const getUserView = () => {
  return sessionStorage.getItem('userView') || null;
}
 
// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userView');
  window.location.reload(false);
//   sessionStorage.removeItem('user');
}
 
// set the token and user from the session storage
export const setUserSession = (token, userView) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('userView', userView);
//   sessionStorage.setItem('user', JSON.stringify(user));
}