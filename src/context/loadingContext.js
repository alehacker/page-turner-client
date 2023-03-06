import { useState, createContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

   const getBooks = () => {

      if (!books) {
         console.log("Calling API")
         axios.get(API + search ) // This should be the link to search the books in the api
         .then((response) => {
            setBooks(response.data)
         })
         .catch((err) => {
            console.log(err)
         })
      }
   }

   const noBooks = (bookId) => {
      axios.get(API) // This should be the link to search the books in the api
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
//I need to finish this context, to find all the bookclubs and the bookdetails.
   return (
        <LoadingContext.Provider value={{ countries, country, posts, post, isLoading, message, setUser, user, setPost, setPosts, setCountries, setCountry, setIsLoading, setMessage, setTimedMessage, getCountries, findCountry, getPosts, getPost }}>
          {children}
        </LoadingContext.Provider>
   );
}

export { LoadingContext, LoadingProvider }