import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import axios from 'axios';
import Image from 'next/image';

interface Song {
    _id: number;
    name: string;
    composer: string;
    arranger: string;
    year: string;
    price: number;
    imagePath: string;
}

export default function Page() {
    const router = useRouter();
    const { id } = router.query;
    const [song, setSong] = useState<Song | null>(null);

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const response = await axios.get(`/api/music/${id}`);
                setSong(response.data.song);
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
        const existingCartItems = localStorage.getItem('cartItems');
        const cartItems: Song[] = existingCartItems ? JSON.parse(existingCartItems) : [];

        // Check if the song is already in the cart
        const isAlreadyInCart = cartItems.some((item: Song) => item._id === song._id);

        if (!isAlreadyInCart) {
            // Add the song to the cart items list
            cartItems.push(song);

            // Update the cart items in localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            alert(`${song.name} added to cart!`);
        } else {
            alert(`${song.name} is already in the cart!`);
        }
    };

    return (
        <Layout>
            <main className="flex flex-col items-center p-16">
                <h2>{song.name}</h2>
                <Image src={"/productImages/" + song.imagePath} alt={song.name} width={300} height={300}>

                </Image>
                <div>
                    <p className='text-xl font-bold'>{song.price}</p>
                    <p>Composer: {song.composer}</p>
                    <p>Arranger: {song.arranger}</p>
                    <p>Year: {song.year}</p>
                    <Button linkTitle="Add to Cart" onClickEvent={addToCart} href="/cart" />
                </div>

                <span className='w-96 h-px bg-slate-800 my-2 block mx-auto'></span>
                <Button linkTitle="Shop for More" href="/shop" />
            </main>
        </Layout>
    );
}