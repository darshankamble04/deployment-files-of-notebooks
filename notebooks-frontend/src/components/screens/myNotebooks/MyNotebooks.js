import React, { useContext, useEffect } from 'react'
import NotebookContext from '../../../context/NotebookContext'
import Footer from '../../common/Footer'
import Headers from '../../common/Headers'
import PageHeader from '../../common/PageHeader'
import Sidebar from '../../common/Sidebar'
import NotebookColl from './components/NotebookColl'
import './css/myNotebooks.css'
import './css/notebook.css'
function MyNotebooks() {
    const Context = useContext(NotebookContext);
    const {getNotebooks} =Context;
    useEffect(() => {
        getNotebooks()
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
                    <main className="mainContent d-flex flex-column">
                        <PageHeader header="Notebooks" />
                            <div className="notebookColl">
                                <NotebookColl/>
                            </div>
                        <Footer/>
                    </main>
                </div>
            </div>
        </>
    )
}

export default MyNotebooks
