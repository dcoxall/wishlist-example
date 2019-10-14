import React, { useState } from 'react';
import { filter } from 'lodash';
import { Props as BookProps } from './Book';
import Search from './Search';
import Wishlist from './Wishlist';
import './App.css';

export type StateBook = Pick<BookProps, 'id' | 'title' | 'authorName' | 'coverId'>;

const App: React.FC = () => {
  const [wishlistItems, setWishlist] = useState([] as Array<StateBook>);

  const addToWishlist = (book: StateBook) => {
    setWishlist([...wishlistItems, book]);
  };

  const removeFromWishlist = (book: StateBook) => {
    setWishlist(filter(wishlistItems, item => item.id !== book.id ));
  };

  return (
    <div className="bookstore">
      <header>
        <div className="row">
          <h1>Bookstore</h1>
        </div>
      </header>
      <div className="row content">
        <Wishlist
          books={ wishlistItems }
          onRemoveFromWishlist={ removeFromWishlist }
        />
        <Search
          wishlistBooks={ wishlistItems }
          onAddToWishlist={ addToWishlist }
          onRemoveFromWishlist={ removeFromWishlist }
        />
      </div>
    </div>
  );
}

export default App;
