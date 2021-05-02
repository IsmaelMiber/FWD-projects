import React from "react";
import Navigator from "../Navigator";
import { update, getAll } from "../../BooksAPI";
import { NONE } from "../../helpers";

const INITIAL_STATE = {
  books: [],
  currentlyReading: [],
  wantToRead: [],
  read: [],
  update: () => undefined,
  updateBookStatus: () => undefined,
  addBook: () => undefined,
};

export const Store = React.createContext(INITIAL_STATE);

export default class Provider extends React.Component {
  constructor(props) {
    super(props);

    this.update = (sliceState) => {
      this.setState((currentState) => ({
        ...sliceState,
      }));
    };

    this.state = {
      ...INITIAL_STATE,
      update: this.update,
      updateBookStatus: this.updateBookStatus,
      addBook: this.addBook,
      deleteBook: this.deleteBook,
    };
  }

  addBook = (book) => {
    const { books } = this.state;
    const newBooks = [...books, book];
    this.update({ books: newBooks });
    update(book.id, book.shelf);
  };

  deleteBook = (id) => {
    const { books } = this.state;
    const updatedBooks = books.filter((book) => book.id != id);
    this.update({ books: updatedBooks });
    update(id, NONE);
  };

  updateBookStatus = ({ id, selectedType }) => {
    const { books } = this.state;
    const updatedBooks = books.map((book) => {
      if (book.id == id) {
        return { ...book, shelf: selectedType };
      }
      return book;
    });

    this.update({ books: updatedBooks });
    update(id, selectedType);
  };

  async getBooks() {
    try {
      const books = await getAll();
      if (books.length > 0) {
        this.state.update({ books });
      } else {
        this.setState({ error: books });
      }
    } catch (error) {
      console.log(error);
      this.setState({ error });
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  componentDidUpdate(prevProps, prevState) {
    const prevBooks = prevState.books;
    const currentBooks = this.state.books;

    if (prevBooks != currentBooks) {
      const shelfs = { currentlyReading: [], wantToRead: [], read: [] };

      for (let book of currentBooks) {
        const { shelf } = book;
        shelfs[shelf].push(book);
      }

      this.state.update(shelfs);
    }
  }

  render() {
    return (
      <Store.Provider value={this.state}>
        <Navigator />
      </Store.Provider>
    );
  }
}
