import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import { LoadingContext} from "../context/loadingContext";
import { AuthContext } from "../context/authContext";
import { post, get  } from "../services/authService";
import { API } from "../services/apiUrl";

function BookDetails () {
const navigate = useNavigate()
 const { authenticateUser } = useContext(AuthContext)
 const { getBookDetails, getBooks, book, user, findBook, setUser } = useContext(LoadingContext)

 const { bookId } = useParams()

 const handleSubmit = (e) => {
   e.preventDefault()
   post(`/books/add-book/${bookId}`, book)
   .then((response) =>{
      setUser(response.data)
      console.log('Here is the new bookCollection', response.data)
      navigate(`/profile/${user._id}`)
   })
   .catch((err) =>{
      console.log(err)
   })
  
 };



 useEffect(() => {
   getBookDetails(bookId)
 }, [])


  return (
   <div className="p-4 mt-5 text-green-700 text-opacity-75 bg-white rounded-lg shadow-lg">
      {book ? 
      <>
         {console.log("BOOK AT COMPONENT", book)}
      <h1  className="mb-2 text-2xl font-bold">Book Details</h1>
      <h2  className="mb-2 text-lg font-semibold">{book.volumeInfo.title}</h2>
      <p className="mb-1">Author(s): {book.volumeInfo.authors.join(', ')}</p>
      <p className="mb-1">Publisher: {book.volumeInfo.publisher}</p>
      <p className="mb-1">Publication Date: {book.volumeInfo.publishedDate}</p>
      <p className="mb-1">Page Count: {book.volumeInfo.pageCount}</p>
      <p className="mb-2">Description: {book.volumeInfo.description}</p><br></br>
      {book.volumeInfo.imageLinks?.thumbnail ? 
      <img src={book.volumeInfo.imageLinks?.thumbnail} alt="Book cover" className="w-48 h-auto mb-2"/>
      
      : <p className="mb-2">Image not available</p>
      }
      <button className="px-4 py-2 my-4 mr-2 font-bold text-white bg-green-700 bg-opacity-75 rounded hover:bg-green-500" type="submit" onClick={handleSubmit}>Add To Your Collection</button>
      
      </>
      
      :
      <h4>Loading...</h4>
      }
 </div>
  )
}

export default BookDetails
