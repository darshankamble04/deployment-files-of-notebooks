import './App.css';
import '../src/css/utils.css';
import Home from './components/screens/home/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MyNotebooks from './components/screens/myNotebooks/MyNotebooks';
import Notes from './components/screens/notes/Notes';
import Register from './components/screens/auth/Register';
import Login from './components/screens/auth/Login';
import ResetPass from './components/screens/auth/ResetPass';
import ForgotPass from './components/screens/auth/ForgotPass';
import AllBookmarkNB from './components/screens/myNotebooks/AllBookmarkNB';
import AllNotes from './components/screens/notes/AllNotes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactUs from './components/screens/ContactUs';
import AboutUs from './components/screens/AboutUs/AboutUs';
// import ErrorPage from './components/screens/ErrorPage';
function App() {
  return (
    <>
        
          <Router>
            <Routes>

              <Route Exact path="/" element={<Home />}></Route>
              <Route Exact path="/mynotebooks" element={<MyNotebooks />}></Route>
              <Route Exact path="/mynotebooks/:id/:name" element={<Notes />}></Route>
              <Route Exact path="/allnotes" element={<AllNotes />}></Route>
              <Route Exact path="/contactus" element={<ContactUs />}></Route>
              <Route Exact path="/aboutus" element={<AboutUs />}></Route>
              <Route Exact path="/register" element={<Register />}></Route>
              <Route Exact path="/login" element={<Login />}></Route>
              <Route Exact path="/resetpassword" element={<ResetPass />}></Route>
              <Route Exact path="/forgotpassword" element={<ForgotPass />}></Route>
              <Route Exact path="/allbookmarkednotebooks" element={<AllBookmarkNB />}></Route>

            </Routes>
          </Router>

          <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
    </>
  );
}

export default App;
