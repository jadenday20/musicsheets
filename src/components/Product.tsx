import React from "react";
import Link from 'next/link';
import Button from "./Button";

interface SongProps {
    _id: number;
    name: string;
    composer: string;
    price: string;
    file: string;
    audioFiles: string[];
    category: string;
    instruments: string[];
    href: string;
}

const Product: React.FC<SongProps> = ({ name, composer, price, category, instruments, href }) => {
    return (
        <Link className="bg-zinc-300 rounded drop-shadow-md p-5 min-h-fit w-full min-w-[330px] hover:opacity-70 hover:drop-shadow-xl duration-500 group" href={href}>
            <h3>{name}</h3>
            <p className="text-center text-2xl">{price}</p>
            <p>{composer}</p>
            <p>Category: {category}</p>
            <p>Instruments: {instruments}</p>
            <Button linkTitle={"Visit"} center></Button>
        </Link>
    );
};

export default Product;