const isArrayOf =
  <T>(guard: (dataT: unknown) => dataT is T) =>
    (data: unknown): data is T[] => {
      if (data instanceof Array) {
        if (data.length === 0) {
          return true;
        } else {
          return data.every((item) => guard(item));
        }
      }
      return false;
    };

export default isArrayOf;
