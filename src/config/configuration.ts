export default () => {
  return {
    port: parseInt(process.env.PORT, 10) || 4000,
    baseURL: process.env.BASE_URL || 'http://localhost:4000',
  };
};
