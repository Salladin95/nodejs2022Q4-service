export default function () {
  return {
    port: parseInt(process.env.PORT, 10) || 4000,
    baseURL: process.env.BASE_URL || `http://localhost:${this.port}`,
  };
}
