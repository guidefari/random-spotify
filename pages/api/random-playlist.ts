
import getConfig from 'next/config';


const handler = async (req, res) => {
    try {
        const response = await fetch('/api/playlists');
        if (response.ok) {
            const data = await response.json();
            return res.status(200).json(data)
        } else {
            throw new Error('Failed to fetch playlists');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export default handler;