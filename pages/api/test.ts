// pages/api/env-html.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('process.env.SPOTIFY_CLIENT_SECRET,:', process.env.SPOTIFY_CLIENT_SECRET)
console.log('process.env.SPOTIFY_CLIENT_ID:', process.env.SPOTIFY_CLIENT_ID)
// TIL this don't work.
const { MY_ENV_VARIABLE } = process.env;
  if (!MY_ENV_VARIABLE) {
    res.status(500).end('Environment variable not found');
    return;
  }

  res.setHeader('Content-Type', 'text/html');
  res.end(`<div>${MY_ENV_VARIABLE}</div>`);
}