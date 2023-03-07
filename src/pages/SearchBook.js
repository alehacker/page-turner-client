import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoadingContext } from '../context/loadingContext';

const SearchBook = () => {
  const { books, setBooks, getBooks } = useContext(LoadingContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    getBooks(searchTerm)
   //  .then((results) =>{
   //    console.log("Book result", results)
   //    setBooks(results)
   //  })
   //  .catch((err) =>{
   //    console.log(err)
   //  })
    
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  }
  
//   useEffect(() => {
//    console.log('the books', books)
//   }, [books]);

  return (
    <div>
      <form  className="flex flex-col items-center justify-between mt-5 md:ml-10 md:mt-0" onSubmit={handleSubmit}>
      <label className="text-green-700 text-opacity-75">Search</label>
        <input type="text" value={searchTerm} onChange={handleSearchTermChange} className="px-4 py-2 border border-green-700 border-opacity-50" placeholder='search book' />
        <button className="w-1/2 px-4 py-2 my-4 mr-2 font-bold text-white bg-green-700 bg-opacity-75 rounded hover:bg-green-500" type="submit" >Search</button>
      </form>
      {console.log("BOOKS", books)}

      <ul>
        {books ? books.map((book) => {
   
         
         console.log('book==>', book)
         return(
          <li key={book.id}>
          <Link to={`/book-details/${book.id}`} >
            <h3>{book.volumeInfo.title}</h3>        
          </Link>
          </li>
         )}): <p> </p>}
      </ul>
    </div>
  );
}

export default SearchBook;