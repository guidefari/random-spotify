import { PlaylistInput, PlaylistResponse } from "../pages/api/playlists";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';

type AccessTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

const getAccessToken = async (refresh_token: string): Promise<AccessTokenResponse> => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

export const getUsersPlaylists = async ({refresh_token, user_id, offset = 0, next_url}: PlaylistInput) => {
  const {access_token} = await getAccessToken(refresh_token);
  const url = next_url ?? `https://api.spotify.com/v1/users/${user_id}/playlists?limit=50&offset=${offset}`
  
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
