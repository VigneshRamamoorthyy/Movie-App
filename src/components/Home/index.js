import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import BookItem from "../BookItem";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "INPROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Home = () => {
  const [bookListDetails, setBookListDetails] = useState([]);
  const [searchInputText, setSearchInputText] = useState("");
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const getBooksDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const apiUrl = `https://openlibrary.org/search.json?q=${searchInputText}`;

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        const booksDetails = data.docs;

        const filteredBooks = booksDetails.filter((eachBook) =>
          eachBook.title.toLowerCase().includes(searchInputText.toLowerCase())
        );

        const formattedData = filteredBooks.map((eachBook) => ({
          title: eachBook.title,
          authorKey: eachBook.author_key ? eachBook.author_key.join(", ") : "Unknown",
          author: eachBook.author_name || ["Unknown"],
          language: eachBook.language || ["Unknown"],
          publishedDate: eachBook.publish_date || ["Unknown"],
          publishedPlace: eachBook.publish_place || ["Unknown"],
        }));

        setBookListDetails(formattedData);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure);
      console.error("Error fetching book details:", error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchInputText(event.target.value);
  };

  const onClickSearchButton = () => {
    getBooksDetails();
  };

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <p>Loading...</p>;
      case apiStatusConstants.failure:
        return <p>Something went wrong. Please try again.</p>;
      case apiStatusConstants.success:
        if (bookListDetails.length === 0) {
          return <p>No books found</p>;
        }
        return (
          <ul className="movie-lists">
            {bookListDetails.map((eachBook) => (
              <BookItem key={eachBook.authorKey} book={eachBook} />
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="home-container">
      <div className="responsive-container">
        <div className="search-input-button-container">
          <input
            className="search-input-field"
            type="search"
            placeholder="Search"
            onChange={onChangeSearchInput}
            value={searchInputText}
          />
          <button
            className="search-button"
            data-testid="searchButton"
            onClick={onClickSearchButton}
          >
            <IoIosSearch size={20} />
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Home;
