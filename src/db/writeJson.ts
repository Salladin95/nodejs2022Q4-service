import { writeFile } from 'fs/promises';

const writeJson = async (path: string, content: string) => {
  await writeFile(path, content);
};

export default writeJson;
