import { useState, useContext } from 'react';
import axios from 'axios';
import { LoadingContext } from '../context/loadingContext';

const SearchBook =() => {


   const [searchTerm, setSearchTerm] = useState('');

   const handleSubmit = (e) => {
      console.log(e)
   }

   const handleSearchTermChange = (event) => {
      setSearchTerm(event.target.value);
   }

   return (
      <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.volumeInfo.title}</li>
        ))}
      </ul>
    </div>
   )
}

export default SearchBook