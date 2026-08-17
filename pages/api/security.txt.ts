import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = path.join(process.cwd(), 'public', '.well-known', 'security.txt');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(fileContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read security.txt file' });
  }
}
