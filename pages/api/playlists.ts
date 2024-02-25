import { getUsersPlaylists } from '../../lib/spotify';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const {
    token: { accessToken, sub },
  } = await getSession({ req });

  const results = await getSession({req})
  const response = await getUsersPlaylists(accessToken, sub);
  const well = await response.json()
  console.log('response:', well)
  const { items } = well


  return res.status(200).json({ items });
  // return res.status(200).json({  });
};

export default handler;
