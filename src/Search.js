import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book';

class Search extends Component {
    state = {
        query: '',
        result: []
    }
    updateQuery = (event) => {
        const inputData = event.target.value
        this.setState({query: inputData})

        if (inputData) {
            BooksAPI.search(inputData).then(res => {
                if (('error' in res)) {
                    this.setState(currentState => ({
                        result: []
                    }))
                } else {
                    const bookData = res.map((book) => ({
                        id: book.id,
                        title: book.title,
                        authors: book.authors,
                        cover: 'imageLinks' in book ? book.imageLinks.thumbnail : '',
                        shelf: book.shelf
                    }))
                      
                    this.setState(currentState => ({
                        result: bookData
                    }))
                }
            });
        } else {
            this.setState(currentState => ({
                result: []
            }))
        }
    }

    getBookShelf = (bookId) => {
        const books = this.props.books.filter((book) => book.id === bookId)
        return books.length > 0 ? books[0].shelf : 'none'
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            value={this.state.query}
                            onChange={this.updateQuery}
                            placeholder="Search by title or author"
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {this.state.result
                        .map((book) => (
                            <li key={book.id}>
                                <Book 
                                    id={book.id}
                                    title={book.title}
                                    authors={book.authors}
                                    cover={book.cover}
                                    shelf={this.getBookShelf(book.id)}
                                    onUpdateShelf={this.props.onUpdateShelf}
                                />
                            </li>
                        )
                    )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;