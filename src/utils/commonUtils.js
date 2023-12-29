// 모든 key 값이 falsy인 경우 false 반환, 값이 존재하면 true
export const hasValue = (obj) => {
  return Object.entries(obj).every(([_, value]) => {
    if (
      value === null ||
      value === '' ||
      value === 0 ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return false;
    }
    return true;
  });
};
