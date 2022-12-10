import React,{useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';

function UserProfile() {
    const location = useLocation()
    const [userData, setUserData] = useState({name:'your name',email:'email@gmail.com'})

    const webUrl = process.env.REACT_APP_WebUrl;

    const getUser = async () => {
        try{
        const response = await fetch(`${webUrl}/api/auth/getuser`, {

          method: 'POST',
          headers: {
            "auth-token": localStorage.getItem("token")
          },
        })
        const json = await response.json()
        setUserData({name:json.name,email:json.email})
    }
    catch(error){
        toast.error(`You're Offline`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme:'light'
        });
    }
}

const logout =()=>{
    localStorage.removeItem('token')
    toast.success(`Logout Successfully`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:'light'
    });

      }
    useEffect(() => {
        getUser()
        // eslint-disable-next-line 
    }, [])

    const PROFILE_IMG = localStorage.getItem('PROFILE_IMG')
    return (
        <>
            <div className="offcanvas offcanvas-end canvas " tabIndex="-1" id="offcanvasRight5" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header userBackground">
                    <h5 id="offcanvasRightLabel">My Profile</h5>

                    {/* <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button> */}
                    <span type="button" className="material-icons closeBtn" data-bs-dismiss="offcanvas" aria-label="Close">close</span>
                </div>
            

                <div className="offcanvas-body text-align-center">
                    <img className="userImg" src={PROFILE_IMG?PROFILE_IMG:"https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette.png"} alt="" />
                    <div className="usersName">{userData.name ==null?"your name":userData.name}</div>
                    <div className="usersEmail">{userData.email ==null?"email@gmail.com":userData.email}</div>

                    <div className="d-grid gap-2 userAction">
                        {localStorage.getItem('token') ?
                            <div className="d-flex flex-column flex-center newUserShow">
                                    <Link to='/resetpassword' className="btn btn-secondary" style={{color:'#fff'}}>Reset Password?</Link>
                                <Link to='/login' type="button" onClick={logout} className={`btn btn-danger justify-content-center d-flex my-2`}  style={{backgroundColor:'#a40e26'}}>
                                    <span style={{ marginRight: '3px' }}>Logout</span>
                                    <span className="material-icons">logout</span>
                                </Link>
                            </div>
                            :
                            <form className="d-flex newUserShow">
                                <Link to='/register' type="button" className={`btn btn-warning justify-content-center d-flex ${location.pathname === "/register" ? 'active' : ""}`} style={{width: '46%'}} >Signup</Link>

                                <Link to='/login' type="button" className={`btn btn-warning justify-content-center mx-2 d-flex ${location.pathname === "/login" ? 'active' : ""}`}  style={{width: '46%'}}>Signin</Link>
                            </form>

                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile
