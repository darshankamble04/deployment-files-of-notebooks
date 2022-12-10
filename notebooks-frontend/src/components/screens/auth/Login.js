import React, { useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NotebookContext from '../../../context/NotebookContext'
import Footer from '../../common/Footer'
import Headers from '../../common/Headers'
import Sidebar from '../../common/Sidebar'
import './css/style.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const go = useNavigate(null)
    const clicked = useRef(null)
    const context = useContext(NotebookContext)
    const { credentials, setCredentials } = context

    const webUrl = process.env.REACT_APP_WebUrl;

    const toggleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const toggleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await fetch(`/api/auth/login`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        })
        const json = await response.json()
        if (json.auth) {
            localStorage.setItem('token', json.token)
            toast.success(`Signed Successfully! Welcome Back Sir`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
            go("/mynotebooks")
        } else if (json.notAuth) {
            toast.error(`${json.msg}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
        } else {
            toast.warn(`Invalid credentials`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
            setCredentials({ email: '', password: '' })
            
        }
    } catch (error) {
        toast.error(`You're Offline`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          });
    }

    }

    return (
        <>
            <div>
                <Headers />
            </div>
            <div className="d-flex setHeight">
                <Sidebar />
                <div className="d-flex flex-column">
                    <main className="mainContent d-flex flex-column" style={{ overflowY: 'hidden' }}>
                        <div className="notebookColl d-flex flex-column justify-content-between">
                            <div className="container loginOutline" style={{ minHeight: "72vh" }}>
                                <form action="#">
                                    <div className="title">Login</div>
                                    <div className="input-box underline">
                                        <input value={credentials.email} name="email" onChange={(e) => { toggleChange(e) }} type="text" placeholder="Enter Your Email" required />
                                        <div className="underline"></div>
                                    </div>
                                    <div className="input-box">
                                        <input value={credentials.password} name="password" onChange={(e) => { toggleChange(e) }} type="password" placeholder="Enter Your Password" required />
                                        <div className="underline"></div>
                                        <div className="option3"><Link to='/forgotpassword'>Forgot Password?</Link></div>
                                    </div>
                                    <div style={{ marginTop: '30px' }} className="d-flex align-items-center justify-content-between">
                                        <div className="input-box button">
                                            <input ref={clicked} onClick={(e) => { toggleSubmit(e) }} type="submit" name="" value="Continue" />
                                        </div>
                                        {/* <div className="option">or</div> */}
                                        <div className="google">
                                            {/* <GoogleLogin
                                onClick={setGoogleLogin(true)}
                                clientId="73289997498-ldv2fbop9ck81a1renoih54hbqejpii7.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                            >
                                <Link to="#">Sign in With Google</Link>
                            </GoogleLogin> */}
                                        </div>
                                    </div>
                                </form>
                                <div className="option2">New User? <Link to='/register' className="">Register</Link></div>
                            </div>
                            <Footer />
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Login
