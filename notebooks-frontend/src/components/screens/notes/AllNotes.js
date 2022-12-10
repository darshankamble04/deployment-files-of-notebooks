import React, { useContext, useEffect } from 'react'
import NotebookContext from '../../../context/NotebookContext'
import NoteContext from '../../../context/NoteContext'
import Footer from '../../common/Footer'
import Headers from '../../common/Headers'
import PageHeader from '../../common/PageHeader'
import Sidebar from '../../common/Sidebar'
import Page from './components/Page'
function AllNotes() {
    const context = useContext(NotebookContext)
    const {SearchKey} = context;
    const Context = useContext(NoteContext)
    const {userNotes, getuserNotes } = Context
    useEffect(() => {
        getuserNotes()
        // eslint-disable-next-line
    }, [])
    const pageBody= document.getElementsByClassName("pageBody").length
    return (
        <>
            <div>
                <Headers />
            </div>
            <div className="d-flex setHeight">
                <Sidebar />
                <div className="d-flex flex-column">
                    <main className="mainContent d-flex flex-column">
                        <PageHeader header="All Notes" />
                        <div className="notebookColl">
                            <div className="d-flex bookArrange" >
                                <div className="d-flex W-90" style={{flexWrap: "wrap" }}>
                                    {// eslint-disable-next-line
                                    userNotes.map((e) => {
                                        if (SearchKey !== "") {
                                            const title = e.title.toLowerCase()
                                            const description = e.description.toLowerCase()
                                            if (title.includes(SearchKey) || description.includes(SearchKey)) {
                                                return <Page key={e._id} id={e._id} data={e} color={e.color} date={e.date } title={e.title} description={e.description} />
                                            }
                                        } else {
                                                return <Page key={e._id} id={e._id} data={e} color={e.color} date={e.date } title={e.title} description={e.description} />
                                        }
                                    })}
                                    {
                          SearchKey !== "" && pageBody===0?<h4 className="notFound">Notes not found</h4>:""
                     }
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </main>
                </div>
            </div>

        </>
    )
}

export default AllNotes
