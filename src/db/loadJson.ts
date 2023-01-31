import { readFile } from 'fs/promises';

const loadJson = async (path: string) => {
  const users = await readFile(path, 'utf8');
  return JSON.parse(users);
};

export default loadJson;
