export const getAddressFromLS = () => {
  return localStorage.getItem('tracker-cam-address') || '';
};

export const setAddressInLS = value => {
  localStorage.setItem('tracker-cam-address', value);
};

export const savePointsInLs = points => {
  localStorage.setItem('tracker-points', JSON.stringify(points));
};

export const getPointsFromLs = () => {
  const points = localStorage.getItem('tracker-points');
  if (!points) {
    return [];
  }
  return JSON.parse(points);
};