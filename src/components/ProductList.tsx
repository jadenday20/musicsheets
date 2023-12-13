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
}

export default function Products() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>('name_asc');

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

  const handleInstrumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const instrument = e.target.value;
    if (selectedInstruments.includes(instrument)) {
      setSelectedInstruments(prevInstruments =>
        prevInstruments.filter(item => item !== instrument)
      );
    } else {
      setSelectedInstruments(prevInstruments => [...prevInstruments, instrument]);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(e.target.value);
  };

  // Filter logic
  let filteredSongs = [...songs];

  if (selectedCategory !== 'All') {
    filteredSongs = filteredSongs.filter(song => song.category === selectedCategory);
  }

  if (selectedInstruments.length > 0) {
    filteredSongs = filteredSongs.filter(song =>
      selectedInstruments.every(instrument => song.instruments.includes(instrument))
    );
  }

  // Sort logic
  let sortedSongs = [...filteredSongs];

  // Sorting options (name or price)
  if (selectedSort === 'name_asc') {
    sortedSongs.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedSort === 'name_desc') {
    sortedSongs.sort((a, b) => b.name.localeCompare(a.name));
  } else if (selectedSort === 'price_asc') {
    sortedSongs.sort((a, b) => a.price - b.price);
  } else if (selectedSort === 'price_desc') {
    sortedSongs.sort((a, b) => b.price - a.price);
  }

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(songs.map((song) => song.category)))];

  // Get unique instruments
  const instruments = Array.from(new Set(songs.flatMap((song) => song.instruments)));

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

      <div className="filter-options text-center m-3">
        <label>Filter by Instruments: </label>
        {instruments.map((instrument, index) => (
          <div key={index} className="inline-block mx-2">
            <input
              type="checkbox"
              id={instrument}
              value={instrument}
              onChange={handleInstrumentChange}
              checked={selectedInstruments.includes(instrument)}
            />
            <label htmlFor={instrument}>{instrument}</label>
          </div>
        ))}
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
          <option value="price_asc">Price (Low to High)</option>
          <option value="price_desc">Price (High to Low)</option>
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