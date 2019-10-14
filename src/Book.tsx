import React from 'react';
import './Book.css';

export interface Props {
  id: string;
  coverId?: number;
  title: string;
  authorName?: string;
  onAddToWishlist?: VoidFunction;
  onRemoveFromWishlist?: VoidFunction;
}

const Book: React.FC<Props> = ({ title, coverId, authorName, onAddToWishlist, onRemoveFromWishlist }) => {
  const handleAddClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    if (onAddToWishlist) onAddToWishlist();
  };

  const handleRemoveClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    if (onRemoveFromWishlist) onRemoveFromWishlist();
  };

  const cover = coverId
    ? <div className="cover"><img alt={ title } src={ `https://covers.openlibrary.org/b/id/${coverId}-S.jpg` } /></div>
    : null;

  return (
    <article className="book">
      { cover }
      <h4>{ title }</h4>
      { authorName && <cite>{ authorName }</cite> }
      <div className="actions">
        { onAddToWishlist && <button className="add" onClick={ handleAddClick }>Save</button> }
        { onRemoveFromWishlist && <button className="remove" onClick={ handleRemoveClick }>Remove</button> }
      </div>
    </article>
  );
};

export default Book;
