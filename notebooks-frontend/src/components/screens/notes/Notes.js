import React, { useContext, useEffect } from 'react'
import NotebookContext from '../../../context/NotebookContext'
import NoteContext from '../../../context/NoteContext'
import Footer from '../../common/Footer'
import Headers from '../../common/Headers'
import PageHeader from '../../common/PageHeader'
import Sidebar from '../../common/Sidebar'
import NotesColl from './components/NotesColl'
function Notes() {
    const Context = useContext(NotebookContext)
    const {notebookTitle} = Context;
    const context = useContext(NoteContext)
    const {getNotes} = context;
    let pathname = window.location.pathname;
    pathname = pathname.split('/')
    const title = pathname[3].replaceAll("%20"," ")
useEffect(() => {
    getNotes()
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
                        <PageHeader header={notebookTitle===''?title:notebookTitle} />
                            <div className="notebookColl">
                                <NotesColl/>
                            </div>
                        <Footer/>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Notes
