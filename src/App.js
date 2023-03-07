import "./App.css";
import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
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
    return (
      <div className="flex flex-col items-center">
            <Navbar />
            <div className="w-full md:w-3/4 lg:w-1/2">
               <Routes>
                  <Route path="/" element={<HomePage />}></Route>
                  <Route path="/books" element={<SearchBook />}></Route>
                  <Route path="/book-details/:bookId" element={<BookDetails />} />
                  <Route path="/bookclubs" element={<BookClubList />}></Route>
                  <Route
                     path="/edit-bookclub/:bookclubId/:userId"
                     element={<EditBookClubPage />}
                  ></Route>
                  <Route
                     path="/create-bookclub/:userId"
                     element={<CreateBookClub />}
                  ></Route>
                  <Route
                     path="/bookclubs/:bookclubId"
                     element={<BookClubDetails />}
                  ></Route>{" "}
                  {/* Dobule check this is the right component to deal with adding a book */}
                  <Route
                     path="/profile-edit/:userId"
                     element={<EditProfilePage />}
                  />
                  <Route path="/profile/:userId" element={<UserProfile />} />
                  <Route
                     path="/other-profile/:userId"
                     element={<OtherUserProfilePage />}
                  />
                  <Route path="/signup" element={<SignUp />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                  {/* I'm not sure what Route should I create to display <BookDetails />  */}
               </Routes>
            </div>
        </div>
    );
}

export default App;
