// 모든 key 값이 falsy인 경우 false 반환, 값이 존재하면 true
export const hasValue = (obj) => {
  return obj === null
    ? false
    : Object.entries(obj).every(
        ([_, value]) =>
          !(
            value === '' ||
            value === 0 ||
            (Array.isArray(value) && value.length === 0)
          )
      );
};
