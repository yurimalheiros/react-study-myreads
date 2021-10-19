import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(res => {
      const bookData = res.map((book) => ({
        id: book.id,
        title: book.title,
        authors: book.authors.join(', '),
        cover: 'imageLinks' in book ? book.imageLinks.thumbnail : '',
        shelf: book.shelf
      }))
      
      this.setState(currentState => ({
        books: bookData
      }))
    });
  }

  updateShelf = (bookToUpdate, newShelf) => {
    BooksAPI.update(bookToUpdate, newShelf).then(res => {
      this.setState((currentState) => {
        if (currentState.books.map((book) => (book.id)).includes(bookToUpdate.id)) {
          return {
            books: currentState.books.map((book) => (book.id === bookToUpdate.id ? {...book, shelf: newShelf} : book))
          }
        } else {
          bookToUpdate = {...bookToUpdate, shelf: newShelf}
          
          return {
            books: currentState.books.concat(bookToUpdate)
          }
        }
      })
    });
  }

  render() {
    const shelves = [
      { title: 'Currently Reading', shelf: 'currentlyReading' },
      { title: 'Want To Read', shelf: 'wantToRead' },
      { title: 'Read', shelf: 'read' }
    ];

    return (
      <div className="app">
          
          <Route path='/search' render={() => (
            <Search books={this.state.books} onUpdateShelf={this.updateShelf} />
          )} />

          <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelves.map((shelf) => (
                  <BookShelf
                    title={shelf.title}
                    shelf={shelf.shelf}
                    books={this.state.books}
                    onUpdateShelf={this.updateShelf}
                  />
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link className="button"to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
