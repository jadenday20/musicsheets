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
  const [selectedSort, setSelectedSort] = useState<string>('name_asc'); // Set default sort order to A-Z

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

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(e.target.value);
  };

  // Filter logic
  const filteredSongs = selectedCategory === 'All'
    ? songs
    : songs.filter((song) => song.category === selectedCategory);

  // Sort logic
  let sortedSongs = [...filteredSongs]; // Create a copy of filteredSongs to avoid mutating state directly

  if (selectedSort === 'name_asc') {
    sortedSongs.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name ascending
  } else if (selectedSort === 'name_desc') {
    sortedSongs.sort((a, b) => b.name.localeCompare(a.name)); // Sort by name descending
  } else if (selectedSort === 'price_asc') {
    sortedSongs.sort((a, b) => {
      if (a.price === b.price) {
        return a.name.localeCompare(b.name); // If prices are equal, sort by name
      }
      return a.price - b.price; // Sort by price ascending
    });
  } else if (selectedSort === 'price_desc') {
    sortedSongs.sort((a, b) => {
      if (a.price === b.price) {
        return a.name.localeCompare(b.name); // If prices are equal, sort by name
      }
      return b.price - a.price; // Sort by price descending
    });
  }
  // Add more sorting options as needed...

  // Get unique categories
  const categories = Array.from(new Set(songs.map((song) => song.category)));
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

      <div className="sort-options text-center m-3">
        <label htmlFor="sortFilter">Sort by: </label>
        <select
          className="hover:cursor-pointer"
          id="sortFilter"
          value={selectedSort}
          onChange={handleSortChange}
        >
          <option value="name_asc">Name (A-Z)</option>
          <option value="name_desc">Name (Z-A)</option>
          <option value="price_asc">Price (Low-High)</option>
          <option value="price_desc">Price (High-Low)</option>
          {/* Add more sorting options here */}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-5 mx-auto text-center">
        {sortedSongs.map((song) => (
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