import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class Search extends Component {
    state = {
        query: '',
        bookQuery: []
    }
    // try not to use code from elsewhere
    search(query) {
        const search = this.currentSearch = BooksAPI.search(query).then((result) => {
            if(this.currentSearch === search) {
                this.setState({ bookQuery: result })
            }
        })
    }
    updateQuery = query => {
        this.currentSearch = null // only the latest keypress will execute search
        if(query) {
            this.search(query)
        } 
        this.setState({ 
            bookQuery: [],
            query
        })
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