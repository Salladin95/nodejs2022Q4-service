const omitKeyFromObj = <T>(key: keyof T, obj: T) => {
  const newObj = { ...obj };
  delete newObj[key];
  return newObj;
};

export default omitKeyFromObj;
