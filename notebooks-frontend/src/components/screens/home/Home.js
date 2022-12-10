import React from 'react'
import { Link } from 'react-router-dom'
// import Footer from '../../common/Footer'
import Headers from '../../common/Headers'
import Sidebar from '../../common/Sidebar'
import './css/home.css'

function Home() {
    return (
        <>
            <div>
                <Headers />
            </div>
            <div className="d-flex setHeight">
                <Sidebar />
                <div className="d-flex flex-column overflow-hidden">
                    {/* <PageHeader /> */}
                    <main style={{overflow:'hidden'}} className="mainContent d-flex flex-column">
                        <div>
                            <section id="box" class="d-flex flex-column justify-content-end align-items-center">
                                <div>
                                    <div class="box-item active">
                                        <div class="box-container">
                                            <h2 >Welcome to Notebooks</h2>
                                            <p>Experience the beautifully simple note taking app on the web today.</p>
                                            <div className="d-flex">
                                            {localStorage.getItem('token')?
                                                <Link to="/mynotebooks" class="box-btn">Let's Create Notebooks &#8594;</Link>
                                                :
                                                <div className="d-flex">
                                            <Link to="/register" class="box-btn">SignUp</Link>
                                            <Link to="/login" class="box-btn">SignIn</Link>
                                            </div>
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <svg class="box-waves" viewBox="0 24 150 28 " preserveAspectRatio="none">
                                    <defs><path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" /></defs>
                                    <g class="wave1"><use href="#wave-path" x="50" y="3" fill="rgba(255,255,255, .1)" /></g>
                                    <g class="wave2"><use href="#wave-path" x="50" y="0" fill="rgba(255,255,255, .2)" /></g>
                                    <g class="wave3"><use href="#wave-path" x="50" y="9" fill="#fff" /></g>
                                </svg>
                            </section>
                           
                        </div>
                        {/* <Footer/> */}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Home
