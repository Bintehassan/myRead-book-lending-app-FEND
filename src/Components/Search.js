import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class Search extends Component {
    state = {
        query: '',
        bookQuery: []
    }

updateQuery = (query) => {
    this.setState({query: query})
    // let bookQuery = []
    if (query) {
      BooksAPI.search(query).then((bookQuery) => {
          if(bookQuery.error) {
            this.setState({bookQuery: [] })
            }
          else { 
            this.setState({bookQuery: bookQuery})
            }
        
        })
        
             
     
    }
    else {
        this.setState({bookQuery: [] })
      }
}

    render() 
    {
        const {query} = this.state;
        // const {updateShelf} = this.props;
        return ( 
            <div className = "search-books">
                <div className = "search-books-bar" >
                    <Link className = "close-search" to = "/" >Close</Link>
                    <div className = "search-books-input-wrapper" >
                        <input 
                            type = "text"
                            placeholder = "Search by title or author"
                            value = {query}
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
                                // id = {book.id}
                                // shelf = {book.shelf}
                                // authors = {book.authors}
                                // title = {book.title}
                                // imageLinks = {book.imageLinks}
                                // updateShelf = {updateShelf}
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