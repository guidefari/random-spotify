import { getUsersPlaylists } from '../../lib/spotify';
import { getSession } from 'next-auth/react';
const fs = require('fs');

const stringsss: string[] = []
let looping = true

const handler = async (req, res) => {
  const {
    token: { accessToken, sub },
  } = await getSession({ req });


  await getBatch({refresh_token: accessToken, user_id: sub})

  if (!looping) return res.status(200).json(stringsss);
};

export default handler;


const getBatch = async ({offset, refresh_token, user_id, next_url}: PlaylistInput): Promise<PlaylistResponse> => {
  const response = (await getUsersPlaylists({refresh_token, user_id, offset, next_url}))
  const stuffToClean: PlaylistResponse = await response.json()
  const clean = await cleanShitUp(stuffToClean)
  stringsss.push(...clean)
  if(stuffToClean.next) {
    await getBatch({refresh_token, user_id, next_url: stuffToClean.next})
    return
  }

  looping = false
  return
}

const cleanShitUp = async (stuff: PlaylistResponse) => {
  return stuff.items.map((item) => item.href)
}

export type PlaylistInput = {
  refresh_token: string
  user_id: string
  offset?: number
  next_url?: string
}

type ExternalUrls = {
  spotify: string;
};

type Image = {
  height: number | null;
  url: string;
  width: number | null;
};

type Owner = {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
};

type Tracks = {
  href: string;
  total: number;
};

type PlaylistItem = {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
};

export type PlaylistResponse = {
  href: string;
  items: PlaylistItem[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};