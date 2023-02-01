import { readFile } from 'fs/promises';

const loadJson = async (path: string) => {
  const json = await readFile(path, 'utf8');
  return json;
};

export default loadJson;
