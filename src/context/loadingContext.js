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

   const [ bookClubs, setBookClubs ] = useState(null)
   const [ bookClub, setBookClub ] = useState(null)

   const navigate = useNavigate()

   const setTimedMessage = (newMessage) => {
      setMessage(newMessage);
      setTimeout(() => {
         setMessage('')
      }, 4000)
   }

   //   *** getBooks gets all the books from the Google Books API  *** //

   const getBooks = (search) => {
      // if (!books) {
         axios.get(API + search)
         .then((results) => {
            // let newArray = [...books]
            // books.push(results.data.items)
            console.log("RESULTS", results.data.items)
            setBooks(results.data.items)
         })
         .catch((err) => {
            console.log(err)
         })
   }

   const getIndex = (array, thisId) => {
      return array.findIndex((element) => element._id === thisId) 
  }


   //   *** onDeleteClick deletes a bookClub. ***   //
   const onDeleteClick = (bookclubId) => {
      console.log("User deleting", user)
      get(`/bookclubs/delete-bookclub/${bookclubId}/${user._id}`)
        .then((response) => {
         let newClubs = [...bookClubs]
         newClubs.splice(getIndex(newClubs, bookclubId), 1)
         console.log('deleted bookclub', response.data)
         // let index = bookClubs.indexOf(response.data)
         // let newBookClubs = bookClubs.splice(index, 1)
         setBookClubs(newClubs)
         let updatedUser = Object.assign({}, user)
         
         updatedUser.bookClubs = updatedUser.bookClubs.filter((club) => club._id !== response.data._id)
         setUser(updatedUser)
         navigate(`/profile/${user._id}`)
        })
        .catch((err) => {
          console.log('Error Deleting BookClub', err);
        });
   };

   //   *** onJoinClick adds a bookclub to the user's bookClubs array. ***   //
   const onJoinClick = (bookclubId) =>{
      console.log(" ---> UserId Joining Club", user._id)
      console.log(" ---> ClubId User wants to join", bookclubId)

      post(`/bookclubs/add-bookclub/${bookclubId}/${user._id}`)
      .then((response) =>{
         console.log('This USER joined a club', response.data)
         setUser(response.data)
         navigate(`/profile/${user._id}`)
      })
      .catch((err) =>{
         console.log(err)
      })

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
   // *** findBook finds a book from mongodb  *** //
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
      console.log('all bookclubs', results.data)
      setBookClubs(results.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }
   // ** getBookClub gets the bookclubdetails from mongodb  *** //
  const getBookClub = (id) => {
    get(`/bookclubs/bookclub-details/${id}`)
      .then((results) => {
         console.log('the bookclub -->', results.data)
        setBookClub(results.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
   // ** getBookDetails gets the bookdetails from Google Books API  *** //
  const getBookDetails = (bookId) => {
      axios.get(API + `/${bookId}`)
         .then((results) => {
            console.log("This is the found book:" , results.data.items[0])
            setBook(results.data.items[0])
         })
         .catch((err) => {
            console.log(err)
         })
  }
// ** getMongoBookDetails gets the bookdetails from mongodb  *** //
  const getMongoBookDetails = (bookId) =>{
   get(`/books//book-details/${bookId}`)
      .then((results) =>{
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
         <LoadingContext.Provider value={ {getMongoBookDetails, onJoinClick, onDeleteClick,  books, book, setBooks, setBook, bookClubs, bookClub, setBookClub, setBookClubs, isLoading, message, setUser, user, setIsLoading, setMessage, setTimedMessage, getBooks, findBook, getBookDetails, getBookClubs, getAllBookClubs, getBookClub }}>
            {children}
         </LoadingContext.Provider>
      );
   }


export { LoadingContext, LoadingProvider }
