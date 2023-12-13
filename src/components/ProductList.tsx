import React, { useEffect, useState } from "react";
import SingleProduct from "./Product";
import axios from 'axios';
import formatPrice from "./FormatPrice";
import { capitalizeFirstLetter } from "./CapitalizeFirstLetter";

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
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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

  if (searchTerm.trim() !== '') {
    const searchTermLowerCase = searchTerm.toLowerCase();
    filteredSongs = filteredSongs.filter(song =>
      song.name.toLowerCase().includes(searchTermLowerCase) ||
      song.composer.toLowerCase().includes(searchTermLowerCase) || // Check composer
      song.instruments.some(
        instrument => instrument.toLowerCase().includes(searchTermLowerCase)
      ) ||// Check instruments array 
      song.category.toLowerCase().includes(searchTermLowerCase) // Check category
      // Add more fields if needed (e.g., instruments, href, etc.)
    );
  }

  const [sortDirection, setSortDirection] = useState<boolean>(true);

  const handleSortToggle = () => {
    setSortDirection(prevDirection => !prevDirection);
  };

  // Sort logic
  let sortedSongs = [...filteredSongs];

  if (selectedSort === 'name_asc' || selectedSort === 'name_desc') {
    sortedSongs.sort((a, b) => {
      const compareResult = a.name.localeCompare(b.name);
      return sortDirection ? compareResult : -compareResult; // Toggle between A-Z and Z-A
    });
  }

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(songs.map((song) => song.category)))];

  // Get unique instruments
  const instruments = Array.from(new Set(songs.flatMap((song) => song.instruments)));

  return (
    <div className="flex flex-col">
              <div className="search-bar text-center m-3">
          <label htmlFor="searchInput">Search: </label>
          <input
            type="text"
            className="border rounded px-2 py-1"
            id="searchInput"
            value={searchTerm}
            onChange={handleSearch}
          />
          </div>
      <div className="flex flex-col md:flex-row justify-center gap-5">
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
                className="cursor-pointer"
                type="checkbox"
                id={instrument}
                value={instrument}
                onChange={handleInstrumentChange}
                checked={selectedInstruments.includes(instrument)}
              />
              <label htmlFor={instrument} className="cursor-pointer">{capitalizeFirstLetter(instrument)}</label>
            </div>
          ))}
        </div>

        <div className="sort-options text-center m-3">
          <label htmlFor="sortToggle" className="group hover:cursor-pointer">Sort by Name: </label>
          <button
            className="hover:cursor-pointer rounded bg-slate-800 text-white px-3 hover:bg-slate-600 group-hover:bg-slate-600"
            id="sortToggle"
            onClick={handleSortToggle}
          >
            {sortDirection ? 'A-Z' : 'Z-A'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-5 mx-auto text-center">
        {sortedSongs.map((song) => (
          <SingleProduct
            name={song.name}
            category={song.category}
            key={song._id}
            href={`songs/${song._id}`}
            // price={formatPrice(song.price)}
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