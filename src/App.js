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
 
 updateShelf = (book, shelf) => {
  //  BooksAPI.update(book, shelf);
  //  BooksAPI.getAll().then((books) => {
  //   this.setState({books})
  // })
  BooksAPI.update(book, shelf).then(() => {
    book.shelf = shelf;
    this.setState( state => ({books: state.books.filter(b => b.id !== book.id).concat([book])}))
  })
}
 

  render() {
    // const {query} = this.state
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList 
            books={this.state.books}
            updateShelf = {this.updateShelf}
            // updateShelf={(book, shelf) => this.updateShelf(book, shelf)}
            />)}/>
        <Route exact path="/search" render={() => (
          <Search 
            updateShelf = {this.updateShelf}
            books={this.state.books}
            // updateShelf={(book, shelf) => this.updateShelf(book, shelf)}
            />)}/>

      </div>
    )
  }
} 

export default BooksApp
