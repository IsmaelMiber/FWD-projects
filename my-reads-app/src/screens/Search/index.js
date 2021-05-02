import React from "react";
import connector from "../../HOCs/connector";
import { search } from "../../BooksAPI";
import Book from "../../components/Book";

class Search extends React.Component {
  state = {
    searchText: "",
    books: [],
    error: "",
  };

  getSearchRelatedBooks = async (query) => {
    const { books: myBooks } = this.props.state;

    const response = await search(query);

    if (response && response.length > 0) {
      const books = response.map((book) => {
        const isExistInMyBooks = myBooks.find((myBook) => myBook.id == book.id);
        if (isExistInMyBooks) {
          return isExistInMyBooks;
        }
        return book;
      });

      this.setState({ books, error: "" });
    } else {
      this.setState({ books: [], error: "No Books Founded for your search." });
    }
  };

  onChange = (event) => {
    const { value } = event.target;
    this.setState({ searchText: value });
    if (value != "") {
      this.getSearchRelatedBooks(value);
    } else {
      this.setState({ searchText: "", books: [], error: "" });
    }
  };

  onChangeShelf = (id, newShelf) => {
    const { books } = this.state;
    const newBooks = books.map((book) => {
      if (book.id == id) {
        return { ...book, shelf: newShelf };
      }
      return book;
    });

    this.setState({ books: newBooks });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={() => this.props.history.goBack()}
          >
            Close
          </button>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.searchText}
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.error ? <h2>{this.state.error}</h2> : null}
            {this.state.books.map((book) => {
              return (
                <li key={book.id}>
                  <Book info={book} onChangeShelf={this.onChangeShelf} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default connector(Search);
