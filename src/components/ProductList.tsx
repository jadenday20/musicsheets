import React, { useEffect, useState } from "react";
import SingleProduct from "./Product";
import axios from 'axios';
import formatPrice from "./FormatPrice";

interface Song {
    _id: number;
    name: string;
    composer: string;
    price: number;
    file: string;
    audioFiles: string[];
    category: string;
    instruments: string[];
    href: string;
    // music: any;
}
export default function Products() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    async function fetchSongs() {
      try {
        const response = await axios.get<{ music: Song[] }>('/api/music');
        setSongs(response.data.music);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    }

    fetchSongs();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  // Filter logic
  const filteredSongs = selectedCategory === 'All'
    ? songs
    : songs.filter((song) => song.category === selectedCategory);

  // Get unique categories
  const categories = Array.from(new Set(songs.map((song) => song.category)));

  // Add 'All' option to categories
  categories.unshift('All');

  return (
    <div className="flex flex-col">
      <div className="filter-options text-center m-3">
        <label htmlFor="categoryFilter">Filter by Category: </label>
        <select
          className="hover:cursor-pointer"
          id="categoryFilter"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-5 mx-auto text-center">
        {filteredSongs.map((song) => (
          <SingleProduct
            name={song.name}
            category={song.category}
            key={song._id}
            href={`songs/${song._id}`}
            price={formatPrice(song.price)}
            _id={song._id}
            composer={song.composer}
            file={song.file}
            audioFiles={song.audioFiles}
            instruments={song.instruments}
          />
        ))}
      </div>
    </div>
  );
}