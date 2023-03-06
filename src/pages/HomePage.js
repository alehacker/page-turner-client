
import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import BookClubList from "./BookClubList";

const HomePage = () => {
   return (
      <div>
         <div className="flex flex-col md:flex-row justify-center items-center mt-10">
            <div className="max-w-lg md:max-w-xl mb-5 md:mb-0">
               <img
                  className="w-full h-auto"
                  src="/images/book-clubs-940x529.jpg"
                  alt="Book Clubs"
               />
            </div>
            <div className="md:ml-10 mt-5 md:mt-0 flex flex-col justify-between">
               <h4 className="text-green-700 text-opacity-75 text-xl font-bold mb-2">
                  Wherever you are, find your people
               </h4>
               <p className="text-green-700 text-opacity-75 text-base mb-5">
                  Find, create and organize your bookclubs here!
               </p>
               <div>
                  <button className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mr-2 my-4">
                        Find Book Clubs
                  </button>
                  <button className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
                        Search Books
                  </button>
               </div>
            </div>
         </div>
         <div className="flex flex-col md:flex-row justify-center items-center mt-10">
            <div className="mt-5 md:mt-0">
               <BookClubList />
            </div>
         </div>
      </div>
   );
};

export default HomePage;
