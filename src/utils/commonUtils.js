// 모든 key 값이 falsy인 경우 false 반환, 값이 존재하면 true
export const hasValue = (obj) => {
  if (obj === null) {
    return false;
  }

  for (const key in obj) {
    if (obj[key]) {
      return true;
    }
  }
  return false;
};
