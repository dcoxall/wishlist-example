import React from 'react';
import { StateBook } from './App';
import Book from './Book';

export interface Props {
  books: Array<StateBook>;
  onRemoveFromWishlist: (book: StateBook) => unknown;
}

const Wishlist: React.FC<Props> = ({ books, onRemoveFromWishlist }) => {
  return (
    <section className="wishlist">
      <h2>Wishlist</h2>
      {
        books.map(book => {
          return <Book
            key={ book.id }
            id={ book.id }
            coverId={ book.coverId }
            title={ book.title }
            authorName={ book.authorName }
            onRemoveFromWishlist={ onRemoveFromWishlist.bind(null, book) }
          />;
        })
      }
    </section>
  );
};

export default Wishlist;
