import "./App.css";
import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import BookClubDetails from "./pages/BookClubDetails";
import BookClubList from "./pages/BookClubList";
import BookDetails from "./pages/BookDetails";
import CreateBookClub from "./pages/CreateBookClub";
import Login from "./pages/Login";
import OtherUserProfilePage from "./pages/OtherUserProfile";
import UserProfile from "./pages/UserProfile";
import SearchBook from "./pages/SearchBook";
import SignUp from "./pages/SignUp";
import EditProfilePage from "./pages/EditProfile";
import EditBookClubPage from "./pages/EditBookClub";



function App() {
   const getToken = () => {
      return localStorage.getItem("authToken")
    }
    const LoggedIn = () => {
      return getToken() ? <Outlet /> : <Navigate to="/" />;
    };
   
    const NotLoggedIn = () => {
      return !getToken() ? <Outlet /> : <Navigate to="/" />;
    };

   
    return (
      <div className="flex flex-col items-center">
            
            <Navbar />
            
            <div className="w-full md:w-3/4 lg:w-1/2">
               <Routes>
               
                  <Route path="/" element={<HomePage />}></Route>
                  <Route path="/books" element={<SearchBook />}></Route>
                  <Route path="/book-details/:bookId" element={<BookDetails />} />
                  <Route path="/bookclubs" element={<BookClubList />}></Route>
                  

                  <Route element={<LoggedIn />}>
                  
                  <Route path="/edit-bookclub/:bookclubId/:userId" element={<EditBookClubPage />} ></Route>
                  <Route path="/create-bookclub/:userId" element={<CreateBookClub />}></Route>
                     
                  <Route path="/bookclub-details/:bookclubId" element={<BookClubDetails title="Book Club Details" />}></Route>
                  <Route path="/add-bookclub/:bookclubId/:userId" element={<BookClubDetails title="Book Club Added" />}></Route>
                  {/* <Route path="/delete-bookclub/:bookclubId/:userId" element={<BookClubDetails title="Delete Book Club" />}></Route> */}
                  
                  
                  {/* Dobule check this is the right component to deal with adding a book */}
                  <Route path="/profile-edit/:userId" element={<EditProfilePage />} />
                  <Route path="/profile/:userId" element={<UserProfile />} />
                  <Route path="/other-profile/:userId" element={<OtherUserProfilePage />} />

                  </Route>
                        
                  <Route element={<NotLoggedIn />}>     
                     <Route path="/signup" element={<SignUp />}></Route>
                     <Route path="/login" element={<Login />}></Route>
                  </Route>
                  
               </Routes>
            </div>

            <Footer/>
        </div>
    );
}

export default App;
