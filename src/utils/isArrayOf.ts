const isArrayOf =
  <T>(guard: (dataT: unknown) => dataT is T) =>
  (data: unknown): data is T[] => {
    if (data instanceof Array && data.every((item) => guard(item))) {
      return true;
    }
    return false;
  };

export default isArrayOf;
