import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoadingContext } from '../context/loadingContext';

const SearchBook = () => {
  const { books, setBooks, getBooks, message } = useContext(LoadingContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    getBooks(searchTerm)
    
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  }
  
//   useEffect(() => {
//    console.log('the books', books)
//   }, [books]);

  return (
    <div className="flex flex-col items-center justify-between mt-5 md:ml-10 md:mt-0" >
      <form  className="flex flex-col items-center justify-between mt-8 md:ml-10 md:mt-0" onSubmit={handleSubmit}>
      <label className="mt-8 text-lg font-bold text-green-700 text-opacity-75">Search</label>
        <input type="text" value={searchTerm} onChange={handleSearchTermChange} className="px-4 py-2 border border-green-700 border-opacity-50" placeholder='Search Book...' />
        <button className="w-1/2 px-4 py-2 my-4 mr-2 font-bold text-white bg-green-700 bg-opacity-75 rounded hover:bg-green-500" type="submit" >Search</button>
      </form>
      {console.log("BOOKS", books)}

      <ul className="grid grid-cols-4 gap-4 mb-4">
        {books ? books.map((book) => {
   
         
         console.log('book==>', book)
         return(
          <li key={book.id} className="p-4 border border-gray-300 rounded-md">
          <Link to={`/book-details/${book.id}`} className="text-green-700 hover:text-green-500 focus:text-green-500" >
            <h3 className="text-lg font-bold">{book.volumeInfo.title}</h3>        
          </Link>
          {book.volumeInfo.imageLinks?.thumbnail ? 
            <img src={book.volumeInfo.imageLinks?.thumbnail} alt="Book cover" className="w-48 h-auto mb-2"/>
      
            : <p className="mt-2">Image not available</p>
         }
          </li>
         )}): <p> </p>}
      </ul>
      {message && <p className="text-white bg-green-700 bg-opacity-75 error">{message}</p>}
    </div>
  );

 
}

export default SearchBook;


{/* <div className="flex flex-col items-center justify-center w-full mt-10 md:flex-row">

<div className="max-w-lg mb-5 md:max-w-xl md:mb-0">
   <img
      className="w-full h-auto"
      src="/images/peoplereading.jpg"
      alt="Book Clubs"
   />
</div>
<div className="flex flex-col items-center justify-between mt-5 space-y-4 md:ml-10 md:mt-0">
   <h1 className="mb-2 text-xl font-bold text-green-700 text-opacity-75"> Sign Up </h1>
   
      <form className="flex flex-col justify-between mt-5 md:ml-10 md:mt-0" onSubmit={handleSubmit} >

         <label className="text-green-700 text-opacity-75" >First Name</label>
         <input type='text' name="firstName" value={newUser.firstName} onChange={handleChange} className="px-4 py-2 border border-green-700 border-opacity-50"></input>
         
         <label className="text-green-700 text-opacity-75">Last Name</label>
         <input type='text' name="lastName" value={newUser.lastName} onChange={handleChange} className="px-4 py-2 border border-green-700 border-opacity-50"></input>

         <label className="text-green-700 text-opacity-75">Email</label>
         <input type='email' name="email" value={newUser.email} onChange={handleChange} className="px-4 py-2 border border-green-700 border-opacity-50"></input>

         <label className="text-green-700 text-opacity-75">Password</label>
         <input type='password' name="password" value={newUser.password} onChange={handleChange} className="px-4 py-2 border border-green-700 border-opacity-50"></input>
         
         <label className="text-green-700 text-opacity-75">Profile Image</label>
         <input type='file' name="profileImage" value={newUser.profileImage} onChange={handleChange} accept=".jpg, .jpeg, .png, .pdf" className="px-4 py-2 border border-green-700 border-opacity-50"></input>

         <button className="px-4 py-2 my-4 mr-2 font-bold text-white bg-green-700 bg-opacity-75 rounded hover:bg-green-500" type="submit"  >Sign Up</button>
      </form>
</div>
</div> */}