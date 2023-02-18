const omitKeyFromObj = (key: string, obj: Record<string, unknown>) => {
  const newObj = { ...obj };
  delete newObj[key];
  return newObj;
};

export default omitKeyFromObj;
