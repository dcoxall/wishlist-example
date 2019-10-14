import React, { useState, useRef, useEffect } from 'react';
import { throttle, find } from 'lodash';
import Book from './Book';
import { StateBook } from './App';
import './Search.css';

export interface Props {
  wishlistBooks: Array<StateBook>;
  onAddToWishlist: (book: StateBook) => unknown;
  onRemoveFromWishlist: (book: StateBook) => unknown;
}

interface OpenLibraryResponse {
  start: number;
  numFound: number;
  docs: Array<{
    title: string;
    key: string;
    author_name?: Array<string>;
    cover_i?: number;
  }>;
}

function onChangeHandler(fn: (value: string) => unknown, event: React.ChangeEvent<HTMLInputElement>) {
  fn(event.currentTarget.value);
}

function executeSearch(fn: (books: Array<StateBook>) => unknown, searchTerm: string) {
  if (!searchTerm) {
    fn([]);
  } else {
    fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}`)
      .then<OpenLibraryResponse>(res => res.json())
      .then<Array<StateBook>, Array<StateBook>>(res => {
        return res.docs.map(doc => {
          return {
            title: doc.title,
            id: doc.key,
            authorName: doc.author_name ? doc.author_name.join(' ') : undefined,
            coverId: doc.cover_i,
          };
        });
      })
      .then(fn)
      .catch(() => fn([]));
  }
}

const Search: React.FC<Props> = ({ wishlistBooks, onAddToWishlist, onRemoveFromWishlist }) => {
  const [currentSearchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Array<StateBook>>([]);
  const throttled = useRef(throttle(executeSearch.bind(null, setResults), 1000));

  useEffect(() => throttled.current(currentSearchTerm), [currentSearchTerm]);

  return (
    <main className="book-search">
      <h2>Search</h2>
      <div className="search-bar">
        <input
          value={ currentSearchTerm }
          onChange={ onChangeHandler.bind(null, setSearchTerm) }
          type="search"
          placeholder="Search title"
        />
      </div>
      <div className="results">
        {
          results.map(res => {
            const inWishlist = !!find(wishlistBooks, ['id', res.id]);
            return <Book
              key={ res.id }
              id={ res.id }
              coverId={ res.coverId }
              authorName={ res.authorName }
              title={ res.title }
              onAddToWishlist={ inWishlist ? undefined : onAddToWishlist.bind(null, res) }
              onRemoveFromWishlist={ inWishlist ? onRemoveFromWishlist.bind(null, res) : undefined }
            />;
          })
        }
      </div>
    </main>
  );
};

export default Search;
