export const getAddressFromLS = () => {
  return localStorage.getItem('tracker-cam-address') || '';
};

export const setAddressInLS = value => {
  localStorage.setItem('tracker-cam-address', value);
};