import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import NotebookContext from '../../context/NotebookContext'
import Footer from '../common/Footer'
import Headers from '../common/Headers'
import Sidebar from '../common/Sidebar'

function ContactUs() {
    // const [notMatch, setnotMatch] = useState(false)
    const context = useContext(NotebookContext)
    const {setLoading } = context

    const [credentials, setCredentials] = useState({title:'',description:''})
    const [userData, setUserData] = useState({name:'your name',email:'email@gmail.com'})

    const webUrl = process.env.REACT_APP_WebUrl;

    
    const getUser = async () => {
        try{
        const response = await fetch(`/api/auth/getuser`, {

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

    const toggleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const toggleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            // setCredentials({email:credentials.email,password:credentials.password})

            const response = await fetch(`${webUrl}/api/auth/contactus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: userData.name, email: userData.email, title: credentials.title,description:credentials.description }),
            })
            const json = await response.json()
            if (json.error) {
                toast.error(`${json.error}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme:'light'
                });
                setCredentials({})
            }
            if (json.success) {
                toast.success(`Message Send Successfully`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme:'light'
                });
                setCredentials({title:'',description:''})
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

      useEffect(() => {
        getUser()
        // eslint-disable-next-line
      }, [])
    return (
        <>
        <div>
            <Headers />
        </div>
        <div className="d-flex setHeight">
            <Sidebar />
            <div className="d-flex flex-column">
                <main className="mainContent d-flex flex-column" style={{overflowY:'hidden'}}>
                    <div className="notebookColl d-flex flex-column justify-content-between">
                            <div className="container loginOutline" style={{minHeight: "72vh"}}>
                            <form action="#" className="contactUs">
                        <div className="title">Contact Us</div>
                        <div className="input-box underline">
                            <input value={userData.name} name="name" disabled type="text" placeholder="Enter Your Name" required />
                            <div className="underline"></div>
                            {/* <div style={{ color: "red" }} className={`form-text`}>{(credentials.name == undefined || credentials.name.length<4) ?"Name contain at least 4 charactors":""}</div> */}
                        </div>
                        <div className="input-box underline">
                            <input value={userData.email} name="email" disabled type="text" placeholder="Enter Your Email" required />
                            <div className="underline"></div>
                            {/* <div style={{ color: "red" }} className={`form-text`} >{credentials.email? validator.isEmail(credentials.email)?"Enter a valid email id":"":""}</div> */}
                        </div>
                        <div className="input-box border-bottom">
                            <input value={credentials.title} name="title" onChange={(e) => { toggleChange(e) }} type="text" placeholder="Title *" required />
                            {/* <div className="underline"></div> */}
                            {/* <div style={{ color: "red" }} className={`form-text ${notMatch ? "visible" : "invisible"}`}>Password doesn't match!</div> */}

                        </div>
                        <div className="input-box description border-bottom ">
                            <textarea value={credentials.description} style={{maxHeight:"130px",height:"130px",width:'100%'}} name="description" onChange={(e) => { toggleChange(e) }} type="text" placeholder="Description *" required />
                            {/* <div className="underline"></div> */}
                            {/* <div style={{ color: "red" }} className={`form-text ${notMatch ? "visible" : "invisible"}`}>Password doesn't match!</div> */}
                        </div>
                        <div style={{paddingTop:'4.5rem'}} className="d-flex align-items-center justify-content-between">
                            <div className="input-box button">
                                <input onClick={(e) => { toggleSubmit(e) }} type="submit" name="" value="Submit" />
                            </div>
                            
                        </div>
                    </form>
                            </div>
                    <Footer />
                    </div>
                </main>
            </div>
        </div>
    </>
    )
}

export default ContactUs
