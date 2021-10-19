import React from 'react';
import Book from './Book';

const BookShelf = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books
            .filter((book) => book.shelf === props.shelf)
            .map((book) => (
              <li key={book.id}>
                <Book
                  id={book.id}
                  title={book.title}
                  authors={book.authors}
                  cover={book.cover}
                  shelf={book.shelf}
                  onUpdateShelf={props.onUpdateShelf}
                />
              </li>
            )
            )}
        </ol>
      </div>
    </div>
  )
}

export default BookShelf;
