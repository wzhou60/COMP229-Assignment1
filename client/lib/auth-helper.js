import { signout } from "./api-auth.js";
const auth = {

   /**
   * Checks if the user is authenticated (logged in)
   * Returns the stored JWT token if it exists, otherwise returns false
   */
  isAuthenticated() {
    if (typeof window == "undefined") return false;
    if (sessionStorage.getItem("jwt"))
      return JSON.parse(sessionStorage.getItem("jwt"));
    else return false;
  },

  /*
   * Stores the JWT token in sessionStorage after login
   * cb = callback function 
   */
  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      sessionStorage.setItem("jwt", JSON.stringify(jwt));
    cb();
  },

/*
   * Logs the user out:
   * - Removes JWT from sessionStorage
   * - Calls the server signout route
   * - Clears the cookie containing the token
   */
  clearJWT(cb) {
    if (typeof window !== "undefined") sessionStorage.removeItem("jwt");
    cb(); //optional
    signout().then((data) => {
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
  },
};
export default auth;
