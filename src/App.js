import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './Components/BookList'
import {Route} from 'react-router-dom'
import Search from './Components/Search'

class BooksApp extends Component {
  state = {
    books: [],
  }

 //get all books before the component loads
 componentDidMount() {
   BooksAPI.getAll().then((books) => {
     this.setState({books})
   })
 }
 
 //update shelves of desired books
 updateShelf = (book, shelf) => {
  BooksAPI.update(book, shelf).then(() => {
    book.shelf = shelf;
    this.setState( state => ({books: state.books.filter(b => b.id !== book.id).concat([book])}))
  })
}
 
  render() {
    
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList 
            books={this.state.books}
            updateShelf = {this.updateShelf}
          />)}
        />
        <Route exact path="/search" render={() => (
          <Search 
            updateShelf = {this.updateShelf}
            books={this.state.books}
          />)}
        />

      </div>
    )
  }
} 

export default BooksApp
