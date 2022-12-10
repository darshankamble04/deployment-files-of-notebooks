import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import NotebookContext from '../../../context/NotebookContext'
import Footer from '../../common/Footer'
import Headers from '../../common/Headers'
import Sidebar from '../../common/Sidebar'
import './css/style.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPass() {
    const [credentials, setCredentials] = useState({})
    const toggleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const Context = useContext(NotebookContext)
    const { setLoading} = Context

    const webUrl = process.env.REACT_APP_WebUrl;

    const toggleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            
            // setCredentials({email:credentials.email,password:credentials.password})
            
            const response = await fetch(`/api/auth/forgotpassword`, {
                // const response = await fetch(`/api/auth/forgotpassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: credentials.email, newpassword: credentials.newpassword }),
            })
            const json = await response.json()
            if (json.success) {
                toast.success(`Verification Link Has Been Send On Your Register Email Id! Verify Yourself`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme:'light'
                });
            }else{
                toast.error(`${json.msg}`, {
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
            setLoading(false)
            
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
                                    <div className="title">Forgot Password</div>
                                    <div className="input-box underline">
                                        <input value={credentials.email} name="email" onChange={(e) => { toggleChange(e) }} type="text" placeholder="Enter Your Email" required />
                                        <div className="underline"></div>
                                        <div style={{ color: "red" }} className={`form-text ${!credentials.email === undefined ? "visible" : "invisible"}`}>Email cannot be blank!</div>
                                    </div>
                                    <div className="input-box">
                                        <input value={credentials.newpassword} name="newpassword" onChange={(e) => { toggleChange(e) }} type="password" placeholder="Enter Your new Password" required />
                                        <div className="underline"></div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="input-box button">
                                            <input onClick={(e) => { toggleSubmit(e) }} type="submit" name="" value="Send Request" />
                                        </div>
                                    </div>
                                </form>
                                <div className="option2">I Remember? <Link to='/login' className="">Login</Link></div>
                            </div>
                            <Footer />
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default ForgotPass
