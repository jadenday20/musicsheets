import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import axios from 'axios';
// import Image from 'next/image';
// import formatPrice from '@/components/FormatPrice';
import { capitalizeFirstLetter } from '@/components/CapitalizeFirstLetter';

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

    // const addToCart = () => {
    //     // Retrieve existing cart items from localStorage or initialize an empty array
    //     const existingCartItems = localStorage.getItem('sheetMusicCartItems');
    //     const cartItems: Song[] = existingCartItems ? JSON.parse(existingCartItems) : [];

    //     // Check if the song is already in the cart
    //     const isAlreadyInCart = cartItems.some((item: Song) => item._id === song._id);

    //     if (!isAlreadyInCart) {
    //         // Add the song to the cart items list
    //         cartItems.push(song);

    //         // Update the cart items in localStorage
    //         localStorage.setItem('sheetMusicCartItems', JSON.stringify(cartItems));
    //         alert(`${song.name} added to cart!`);
    //     } else {
    //         alert(`${song.name} is already in the cart!`);
    //     }
    // };

    const formattedInstruments = song.instruments.map(capitalizeFirstLetter).join(', ');

    return (
        <Layout>
            <div className='flex flex-col lg:flex-row gap-5'>
                <div className='w-96'>
                    <h2>{song.name}</h2>
                    {/* <p className='text-xl font-bold'>{formatPrice(song.price)}</p> */}
                    <p>Composer: {song.composer}</p>
                    <p>Category: {song.category}</p>
                    <p>Instruments: {formattedInstruments}</p>
    
                    {/* Audio Players */}
                    {song.audioFiles.length > 0 && (
                    <div>
                        <p>Audio Samples:</p>
                        <div className='ml-6 m-2'>
                            {song.audioFiles.map((audioFile, index) => {
                                const formattedAudioFileName = audioFile.replace(/[_-]/g, ' ');
                                return (
                                    <div key={index}>
                                        <p>{formattedAudioFileName}</p> {/* Display formatted audio file name */}
                                        <audio controls>
                                            <source src={`/audio_files/${audioFile}.m4a`} type='audio/mpeg' />
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
    
                    {/* <Button linkTitle="Add to Cart" onClickEvent={addToCart} href="/cart" /> */}
                    <Button
                        href={`/sheet_music/${song.file}.pdf`} // Replace with the correct audio file path
                        download={`${song.file}.pdf`} // Set the download attribute to specify the filename
                        className="download-button" linkTitle={'Download PDF'} openInNewTab>
                    </Button>
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
            <Button linkTitle="Find More Music" href="/music" />
        </Layout>
    );
}