
import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import BookClubList from "./BookClubList";

const HomePage = () => {
   return (
      <div>
         <div className="flex flex-col items-center justify-center mt-10 md:flex-row">
            <div className="max-w-lg mb-5 md:max-w-xl md:mb-0">
               <img
                  className="w-full h-auto"
                  src="/images/book-clubs-940x529.jpg"
                  alt="Book Clubs"
               />
            </div>
            <div className="flex flex-col justify-between mt-5 md:ml-10 md:mt-0">
               <h4 className="mb-2 text-xl font-bold text-green-700 text-opacity-75">
                  Wherever you are, find your people
               </h4>
               <p className="mb-5 text-base text-green-700 text-opacity-75">
                  Find, create and organize your bookclubs here!
               </p>
               <div>
               <Link to={'/bookclubs'}>
                  <button className="px-4 py-2 my-4 mr-2 font-bold text-white bg-green-700 rounded hover:bg-green-500">
                        Find Book Clubs
                  </button>
               </Link>
               <Link to={'/books'}>
                  <button className="px-4 py-2 font-bold text-white bg-green-700 rounded hover:bg-green-500">
                        Search Books
                  </button>
               </Link>
               </div>
            </div>
         </div>
         <div className="flex flex-col items-center justify-center mt-10 md:flex-row">
            <div className="mt-5 md:mt-0">
               <BookClubList />
            </div>
         </div>
      </div>
   );
};

export default HomePage;
