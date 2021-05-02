import React from "react";
import "../../App.css";
import connector from "../../HOCs/connector";
import BookShelf from "../../components/BookShelf";
import { CURRENTLY_READING, WANT_TO_READ, READ } from "../../helpers";

function Home(props) {
  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf type={CURRENTLY_READING} />
            <BookShelf type={WANT_TO_READ} />
            <BookShelf type={READ} />
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => props.history.push("/search")}>
            Add a book
          </button>
        </div>
      </div>
    </div>
  );
}

export default connector(Home);
