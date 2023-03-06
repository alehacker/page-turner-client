import { useState, useContext } from 'react';
import { LoadingContext } from '../context/loadingContext';

const SearchBook = () => {
  const { books, setBooks, getBooks } = useContext(LoadingContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    getBooks(searchTerm);
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <form  className="md:ml-10 mt-5 md:mt-0 flex flex-col justify-between items-center" onSubmit={handleSubmit}>
      <label className="text-green-700 text-opacity-75">Search</label>
        <input type="text" value={searchTerm} onChange={handleSearchTermChange} className="border border-green-700 border-opacity-50 px-4 py-2" placeholder='search book' />
        <button className=" w-1/2 bg-green-700 bg-opacity-75 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mr-2 my-4" type="submit" >Search</button>
      </form>
      <ul>
        {books?.map((book) => (
          <li key={book.id}>{book.volumeInfo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBook;