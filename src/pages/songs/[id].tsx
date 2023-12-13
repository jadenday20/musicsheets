import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import axios from 'axios';
import Image from 'next/image';
import formatPrice from '@/components/FormatPrice';

interface Song {
    _id: number;
    name: string;
    composer: string;
    price: number;
    file: string;
    audioFiles: string[];
    category: string;
    instruments: string[];
}

export default function Page() {
    const router = useRouter();
    const { id } = router.query;
    const [song, setSong] = useState<Song | null>(null);

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const response = await axios.get(`/api/music/${id}`);
                setSong(response.data.music);
            } catch (error) {
                console.error('Error fetching song:', error);
            }
        };

        if (id) {
            fetchSong();
        }
    }, [id]);

    if (!song) {
        return (
            <Layout>
                <h2>Loading...</h2>
                <p>Everything should be ready to go in just a minute.</p>
            </Layout>
        );
    }

    const addToCart = () => {
        // Retrieve existing cart items from localStorage or initialize an empty array
        const existingCartItems = localStorage.getItem('sheetMusicCartItems');
        const cartItems: Song[] = existingCartItems ? JSON.parse(existingCartItems) : [];

        // Check if the song is already in the cart
        const isAlreadyInCart = cartItems.some((item: Song) => item._id === song._id);

        if (!isAlreadyInCart) {
            // Add the song to the cart items list
            cartItems.push(song);

            // Update the cart items in localStorage
            localStorage.setItem('sheetMusicCartItems', JSON.stringify(cartItems));
            alert(`${song.name} added to cart!`);
        } else {
            alert(`${song.name} is already in the cart!`);
        }
    };

    return (
        <Layout>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className='w-96'>
                        <h2>{song.name}</h2>
                        <p className='text-xl font-bold'>{formatPrice(song.price)}</p>
                        <p>composer: {song.composer}</p>
                        <p>audioFiles: {song.audioFiles}</p>
                        <p>category: {song.category}</p>
                        <p>instruments: {song.instruments}</p>
                        <Button linkTitle="Add to Cart" onClickEvent={addToCart} href="/cart" />
                        
                    </div>
                    <iframe
                        src={`/sheet_music/${song.file}.pdf`}
                        title={song.name}
                        width="100%"
                        height="500px"
                        style={{ border: '1px solid #ccc' }}
                    ></iframe>
                </div>

                <span className='w-96 h-px bg-slate-800 my-2 block mx-auto'></span>
                <Button linkTitle="Shop for More" href="/shop" />

        </Layout>
    );
}