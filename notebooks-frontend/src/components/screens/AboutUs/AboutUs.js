import React from 'react'
// import Footer from '../../common/Footer'
import Headers from '../../common/Headers'
import Sidebar from '../../common/Sidebar'
import Logo from '../../../assets/img/NoteBook Logo VIP.mp4'
// import logoImg from '../../../assets/img/NoteBook Logo img VIP.png'
// import { Link } from 'react-router-dom'
import './css/style.css'
function AboutUs() {
    return (
        <> 
            <div>
                <Headers />
            </div>
            <div className="d-flex setHeight">
                <Sidebar />
                <div className="d-flex flex-column overflow-hidden">
                    {/* <PageHeader /> */}
                    <main className="mainContent d-flex flex-column">
                        <div style={{textAlign:"center"}} className=" pt-3 container d-flex align-items-center flex-column">
                            <video style={{borderRadius:'50%'}} width="320" src={Logo} autoPlay loop></video>
                            {/* <img src={logoImg} alt="" /> */}
                            <h3 className="pt-4">Hi, I'am Darshan Kamble</h3>
                            <h6 className="pb-5">Computer Science | Student @ Dr. D. Y. Patil Institute of Technology, Pune</h6>
                            {/* <div className="d-flex">

                            <Link className="githubImg" to="/">
                            <svg id="github" viewBox="0 0 24 24" style={{fill: 'white', userSelect: 'auto'}}>
              <path d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z" style={{userSelect: "auto"}}></path></svg>
                            </Link>
                            <Link to="/" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" class="global-nav__logo" style={{userSelect: "auto"}}>
      <g style={{userSelect: "auto"}}>
        <path d="M34,2.5v29A2.5,2.5,0,0,1,31.5,34H2.5A2.5,2.5,0,0,1,0,31.5V2.5A2.5,2.5,0,0,1,2.5,0h29A2.5,2.5,0,0,1,34,2.5ZM10,13H5V29h5Zm.45-5.5A2.88,2.88,0,0,0,7.59,4.6H7.5a2.9,2.9,0,0,0,0,5.8h0a2.88,2.88,0,0,0,2.95-2.81ZM29,19.28c0-4.81-3.06-6.68-6.1-6.68a5.7,5.7,0,0,0-5.06,2.58H17.7V13H13V29h5V20.49a3.32,3.32,0,0,1,3-3.58h.19c1.59,0,2.77,1,2.77,3.52V29h5Z" fill="currentColor" style={{userSelect: "auto"}}></path>
      </g>
    </svg>
                            </Link>
                            </div> */}

                            <p style={{width:'80vw' ,background:""}}>
                            I’m Bachelors in Computer Science & Engineering. I am passionate about Web Development and Exploring new things. <br />
                            Now a days, people are addicted to binge watching and Snapchatting. I am geeky and I am addicted to Green Dots of GitHub.
                            </p>
                        </div>
                        {/* <Footer /> */}
                    </main>
                </div>
            </div>
        </>
    )
}

export default AboutUs
