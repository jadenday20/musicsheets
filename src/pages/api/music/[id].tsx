import type { NextApiRequest, NextApiResponse } from 'next';
import { getMusicById, } from '@/lib/mongo/music';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        // Fetch music details from the database based on the ID
        const music = await getMusicById(id); // Replace with your database query method

        if (!music) {
            return res.status(404).json({ message: 'Music not found' });
        }

        res.status(200).json(music);
    } catch (error) {
        console.error('Error fetching music:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}