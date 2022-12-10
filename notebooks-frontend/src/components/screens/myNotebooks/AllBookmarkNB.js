import React, { useContext, useEffect } from 'react'
import NotebookContext from '../../../context/NotebookContext'
import Footer from '../../common/Footer'
import Headers from '../../common/Headers'
import PageHeader from '../../common/PageHeader'
import Sidebar from '../../common/Sidebar'
import Notebook from './components/Notebook'
import './css/myNotebooks.css'
import './css/notebook.css'

function AllBookmarkNB() {
    const Context = useContext(NotebookContext)
    const {getBookmarkedNotebooks,SearchKey,bookmarkedNotebooks} = Context

    useEffect(() => {
        getBookmarkedNotebooks()
        // eslint-disable-next-line
    }, [])
    const outline= document.getElementsByClassName("outline").length
    return (
        <>
            <div>
                <Headers />
            </div>
            <div className="d-flex setHeight">
                <Sidebar />
                <div className="d-flex flex-column">
                    <main className="mainContent d-flex flex-column">
                        <PageHeader header="Bookmarks" />
                        <div className="notebookColl d-flex flex-column justify-content-between ">
                            <div className="d-flex bookArrange" >
                                <div className="d-flex w-90" style={{ flexWrap: "wrap" }}>
                                    {// eslint-disable-next-line
                                    bookmarkedNotebooks.map((e) => {
                                         if (SearchKey !== "") {
                                            const title = e.notebookTitle.toLowerCase()
                                            if (title.includes(SearchKey)) {
                                                return <Notebook key={e._id} id={e._id} data={e} title={e.notebookTitle} cover={e.notebookCover} />
                                            }
                                        } else {
                                            return <Notebook key={e._id} id={e._id} data={e} title={e.notebookTitle} cover={e.notebookCover} />
                                        }
                                    })}

{
                          SearchKey !== "" && outline===0?<h4 className="notFound">Notebook not found</h4>:""
                     }
                                </div>
                            </div>
                        <Footer />
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default AllBookmarkNB
