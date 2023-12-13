import React from "react";
import Link from 'next/link';
import Button from "./Button";
import { capitalizeFirstLetter } from "./CapitalizeFirstLetter";

interface SongProps {
    _id: number;
    name: string;
    composer: string;
    // price: string;
    file: string;
    audioFiles: string[];
    category: string;
    instruments: string[];
    href: string;
}

const Product: React.FC<SongProps> = ({ name, composer, category, instruments, href }) => {
    const formattedInstruments = instruments.map(capitalizeFirstLetter).join(', '); // Join instruments with a comma

    return (
        <Link className="bg-zinc-300 rounded drop-shadow-md p-5 min-h-fit w-full min-w-[330px] hover:opacity-70 hover:drop-shadow-xl duration-500 group flex flex-col justify-between" href={href}>
            <div>
                <h3>{name}</h3>
                {/* <p className="text-center text-2xl">{price}</p> */}
                <p>{composer}</p>
                <p>Category: {category}</p>
                <p>Instruments: {formattedInstruments}</p> {/* Display instruments with commas */}
            </div>
            <Button linkTitle={"Visit"} center></Button>
        </Link>
    );
};

export default Product;