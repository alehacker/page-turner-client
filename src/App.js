
import './App.css';
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BookClubDetails from './pages/BookClubDetailsPage';
import BookClubList from './pages/BookClubListPage';
import BookDetails from './pages/BookDetailsPage';
import CreateBookClub from './pages/CreateBookClubPage';
import Login from './pages/LoginPage';
import OtherUserProfilePage from './pages/OtherUserProfilePage';
import ProfilePage from './pages/ProfilePage';
import SearchBook from './pages/SearchBookPage';
import SignUp from './pages/SignUpPage';
import EditProfilePage from './pages/EditProfilePage';
import EditBookClubPage from './pages/EditBookClubPage';


function App() {
  return (
    <div className="text-center sm:text-left md:flex">
      <Navbar />
      <Routes>
         <Route path='/' element={<HomePage />}></Route>
         <Route path='/books' element={<SearchBook />}></Route>
         <Route path='/bookclubs' element={<BookClubList />}></Route>
        
         <Route path='/edit-bookclub/:bookclubId/:userId' element={<EditBookClubPage />}></Route>
         <Route path='/create-bookclub/:userId' element={<CreateBookClub />}></Route>
         <Route path='/add-book/:bookId' element={<BookClubDetails />}></Route> {/* Dobule check this is the right component to deal with adding a book */}
         <Route path='/profile-edit/:userId' element={<EditProfilePage />} />
         <Route path='/profile/:userId' element={<ProfilePage />} />
         <Route path='/other-profile/:userId' element={<OtherUserProfilePage />} />
     
         <Route path='/signup' element={<SignUp />}></Route>
         <Route path='/login' element={<Login />}></Route>

      </Routes>
    </div>
  );
}

export default App;
