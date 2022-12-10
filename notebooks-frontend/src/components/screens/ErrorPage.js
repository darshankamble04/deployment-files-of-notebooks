import React from 'react'
import Headers from '../common/Headers'
import Sidebar from '../common/Sidebar'

function ErrorPage() {
    return (
        <>
            <div>
                <Headers />
            </div>
            <div className="d-flex setHeight">
                <Sidebar />
                <div className="d-flex flex-column overflow-hidden">
                    <main className="mainContent d-flex flex-column">
                        <div id="wrapper">
                            <img src="https://i.imgur.com/qIufhof.png" alt='error' />
                            <div id="info">
                                <h3>This page could not be found</h3> 
                            </div>
                        </div >
                    </main>
                </div>
            </div>
        </>
    )
}

export default ErrorPage
