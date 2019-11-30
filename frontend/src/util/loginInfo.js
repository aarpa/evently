let loggedInUser;


export const setLoggedInUser = (userId) => {
  loggedInUser = userId;
}


export const getLoggedInUser = () => {
  return loggedInUser;
}

