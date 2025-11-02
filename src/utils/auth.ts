export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const setAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};

export const checkIsSignedIn = () => {
  return !!getAccessToken();
};

export const getUserId = () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return null;
  }

  const parsedToken = JSON.parse(atob(accessToken.split(".")[1]));
  const parsedUserId = parsedToken.sub;

  return Number(parsedUserId);
};
