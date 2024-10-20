// utils/auth.ts
export const isUserLoggedIn = (): boolean => {
    // Check if there's a token in localStorage (or cookies/sessionStorage)
    const token = localStorage.getItem("token");
  
    // Return true if the token exists, indicating the user is logged in
    return !!token;
  };
  