const omitKeyFromObj = (key: string, obj: Record<string, unknown>) => {
  const { [key]: _, ...rest } = obj;
  return rest;
};

export default omitKeyFromObj;
