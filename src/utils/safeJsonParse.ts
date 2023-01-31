const safeJsonParse =
  <T>(guard: (target: unknown) => target is T) =>
  (textForParse: string) => {
    try {
      const parsedText = JSON.parse(textForParse);
      if (!guard(parsedText)) {
        throw new Error();
      }
      return parsedText;
    } catch (err) {
      throw err;
    }
  };

export default safeJsonParse;
