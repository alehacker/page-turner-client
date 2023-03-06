import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../services/authService";
import axios from "axios";
import { API } from "../services/apiUrl";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {

   const [isLoading, setIsLoading] = useState(false);
   const [user, setUser] = useState(null);
   const [message, setMessage] = useState('');

   const [ books, setBooks ] = useState(null);
   const [ book, setBook ] = useState(null);

   const [ bookclubs, setBookClubs ] = useState([])
   const [ bookClub, setBookClub ] = useState(null)

   const setTimedMessage = (newMessage) => {
      setMessage(newMessage);
      setTimeout(() => {
         setMessage('')
      }, 4000)
   }
  
   const getBooks = (search) => {
      if (!books) {
         console.log("Calling API")
         axios.get(API + search )
         .then((response) => {
            setBooks(response.data)
         })
         .catch((err) => {
            console.log(err)
         })
      }
   }

   const noBooks = (bookId) => {
      axios.get(API)
      .then((response) => {
         let foundbooks = response.data
         setBooks(foundbooks)
         let thisBook = foundbooks.find((book) => book.id  === bookId)
         setBooks(thisBook)
      })
      .catch((err) => {
         console.log(err)
      })
   }

   const findBook = (bookId) => {
      if (!books) {
        noBooks(bookId)
      } else {
        let thisBook = books.find((book) => book.id === bookId)
        setBook(thisBook)
      }
   }

  const getBookClubs = () => {
    get('/bookclubs')
    .then((results) => {
      setBookClubs(results.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const getBookClub = (_id) => {
    get(`/bookclubs/bookclub-detail/${_id}`)
      .then((results) => {
        setBookClub(results.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getBookDetails = (bookId) => {
    get(`/books/${bookId}/book-details`)
      .then((results) => {
        setBook(results.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getAllBookClubs = () => {
    get('/bookclubs')
      .then((results) => {
        setBookClubs(results.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

   return (
        <LoadingContext.Provider value={{ isLoading, message, setUser, user, setIsLoading, setMessage, setTimedMessage, getBooks, findBook, getBookDetails, getBookClubs, getAllBookClubs, getBookClub }}>
          {children}
        </LoadingContext.Provider>
   );
}

export { LoadingContext, LoadingProvider }
