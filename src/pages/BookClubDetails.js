import { useState, useContext, useNavigate } from "react";
import { LoadingContext, LoadingProvider } from "../context/loadingContext";
import { AuthContext } from "../context/authContext";
import { post, get  } from "../services/authService";
import { API } from "../services/apiUrl";


function BookClubDetails() {

   
  return (
    <div>BookClubDetails</div>
  )
}

export default BookClubDetails