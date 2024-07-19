import React, { useState, useEffect } from "react";
import "./index.css";

const BookItem = (props) => {
  const { title, author, language, publishedDate, publishedPlace } = props;
  console.log(props);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        setImageUrl(data.message);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="book-item">
      <img src={imageUrl} alt="Random dog" className="random-dog-img" />
      <h1 className="book-header">{title}</h1>
      <div className="book-content-container">
        <p className="book-header">Author:</p>
        <p className="book-value">{author ? author.join(", ") : "Unknown"}</p>
      </div>
      <div className="book-content-container">
        <p className="book-header">Language:</p>
        <p className="book-value">
          {language ? language.join(", ") : "Unknown"}
        </p>
      </div>
      <div className="book-content-container">
        <p className="book-header">Published Date:</p>
        <p className="book-value">
          {publishedDate ? publishedDate.join(", ") : "Unknown"}
        </p>
      </div>
      <div className="book-content-container">
        <p className="book-header">Published Place:</p>
        <p className="book-value">
          {publishedPlace ? publishedPlace.join(", ") : "Unknown"}
        </p>
      </div>
    </div>
  );
};

export default BookItem;
