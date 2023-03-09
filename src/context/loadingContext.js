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

   const setTimedMessage = (newMessage) => {
      setMessage(newMessage);
      setTimeout(() => {
         setMessage('')
      }, 4000)
   }
  
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
      //   try {
      //     const response = await axios.get(API + search);
      //     console.log('response -->', response)
      //     setBooks(response)
      //    //  return response.data.items;
      //   } catch (err) {
      // //     console.log(err);
      // //   }
      // }
    };
   // const getBooks = async (search) => {
   //    if (!books) {
   //      try {
   //        const response = await axios.get(API + search);
   //        console.log('response -->', response)
   //        setBooks(response)
   //       //  return response.data.items;
   //      } catch (err) {
   //        console.log(err);
   //      }
   //    }
   //  };  /delete-bookclub/:bookclubId/:userId

   const onDeleteClick = (bookclubId) => {
      get(`/bookClubs/delete-bookclub/${bookclubId}/${user.id}`)
        .then((response) => {
         console.log('deleted bookclub', response.data)
         let index = bookClubs.indexOf(response.data)
         let newBookClubs = bookClubs.splice(index, 1)
         setBookClubs(newBookClubs)
        })
        .catch((err) => {
          console.log('Error Deleting BookClub');
        });
   };
   

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
      console.log('all bookclubs', results.data)
      setBookClubs(results.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

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

  const getBookDetails = (bookId) => {

      axios.get(API + `/${bookId}`)
         .then((results) => {
            console.log("This is the found book:" , results.data.items[0])
            setBook(results.data.items[0])
         })
         .catch((err) => {
            console.log(err)
         })

      // if (!books) {

      //    // get(`/books/${bookId}/book-details`)
      //    //   .then((results) => {
      //    //     setBook(results.data)
      //    //   })
      //    //   .catch((err) => {
      //    //     console.log(err)
      //    //   })
      // } else {
      //    let thisBook = books.find((book) => book.id === bookId)
      //    console.log("This Book", thisBook)
      //    setBook(thisBook)
      // }
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
      <LoadingContext.Provider value={ {onDeleteClick,  books, book, setBooks, setBook, bookClubs, bookClub, setBookClub, setBookClubs, isLoading, message, setUser, user, setIsLoading, setMessage, setTimedMessage, getBooks, findBook, getBookDetails, getBookClubs, getAllBookClubs, getBookClub }}>
         {children}
      </LoadingContext.Provider>
   );
}

export { LoadingContext, LoadingProvider }
