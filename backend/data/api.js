import fs from 'fs';
import path from 'path';

function getEmailConfig() {
  const jsonData = fs.readFileSync(path.join(__dirname, 'apidb.json'));
  return JSON.parse(jsonData).email;
}

export { getEmailConfig };

