import { useState, useContext, useNavigate } from "react";
import { LoadingContext, LoadingProvider } from "../context/loadingContext";
import { AuthContext } from "../context/authContext";
import { post, get  } from "../services/authService";
import { API } from "../services/apiUrl";

function BookDetails (bookId) {
 const { getBookDetails, getBooks } = useContext(LoadingProvider)
 
 const thisBook = getBookDetails(bookId)


  return (
   <div>
      <h2>{thisBook.volumeInfo.title}</h2>
      <p>Author(s): {thisBook.volumeInfo.authors.join(', ')}</p>
      <p>Publisher: {thisBook.volumeInfo.publisher}</p>
      <p>Publication Date: {thisBook.volumeInfo.publishedDate}</p>
      <p>Page Count: {thisBook.volumeInfo.pageCount}</p>
      <p>Description: {thisBook.volumeInfo.description}</p>
      <img src={thisBook.volumeInfo.imageLinks.thumbnail} alt="Book cover" />
 </div>
  )
}

export default BookDetails
