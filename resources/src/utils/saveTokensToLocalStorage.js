
export function saveTokensToLocalStorage(expiresIn, accessToken, refreshToken) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('expiresIn', expiresIn);
  localStorage.setItem('refreshToken', refreshToken);
}
