import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class Search extends Component {
    state = {
        query: '',
        bookQuery: []
    }
//credit: https://github.com/kedevked
updateQuery = (query) => {
    this.setState({query:query})
    let bookQuery = []
    if (query) {
        BooksAPI.search(query).then((result) => {
            if (result.length) {
                bookQuery = result.map((book) => {
                    let index = this.props.books.findIndex(c => c.id === book.id)
                    if (index >= 0) {
                        return this.props.books[index]
                    }
                    else {
                        return book
                    }
                })
            }
            
            this.setState({bookQuery})
            
        })
    }
    else 
    {
        this.setState({bookQuery})
    }
}

    render() 
    {
        return ( 
            <div className = "search-books">
                <div className = "search-books-bar" >
                    <Link className = "close-search" to = "/" >Close</Link>
                    <div className = "search-books-input-wrapper" >
                        <input 
                            type = "text"
                            placeholder = "Search by title or author"
                            value = {this.state.query || ""}
                            onChange = {(event) => this.updateQuery(event.target.value)}/>
                    </div> 
                </div> 
                <div className = "search-books-results" >
                    <ol className = "books-grid" > {
                        this.state.bookQuery.map((bookQuery) => {
                            let shelf = "none";

                            this.props.books.map(book => (
                                book.id === bookQuery.id ? shelf = book.shelf : ''
                            ))
                            return(
                            <li key={bookQuery.id}>
                                <Book
                                book = {bookQuery}
                                updateShelf = {this.props.updateShelf}
                                currentShelf = {shelf}
                                />
                            </li>
                            );
                                                             
                    })
                    }
                    </ol>
                </div>
            </div>
        )
    }

}

export default Search