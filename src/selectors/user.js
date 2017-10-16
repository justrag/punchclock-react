const getUserEmail = state => state.account.email;
export const getUserLogin = state => {
  const email = getUserEmail(state);
  if (!!email) return email.split('@')[0];
  else return false;
};
export const getUserToken = state => state.account.token;
export const isUserLoading = state => state.loading;
