import React, { useContext, useEffect } from 'react'
import CreateNotebook from './CreateNotebook'
import Notebook from './Notebook'
import NotebookContext from '../../../../context/NotebookContext'

function NotebookColl() {
    const Context = useContext(NotebookContext)
    const { notebooks, getNotebooks, SearchKey } = Context
    useEffect(() => {
        getNotebooks()
        // eslint-disable-next-line
    }, [])
    const outline = document.getElementsByClassName("outline").length
    return (
        <>
            {/*  THESE ARE PLACE HOLDERS OF NOOKBOOOKS  rough.txt 18 line*/}

            
            <div className="d-flex bookArrange" >
                <div id="bookArrange" className="d-flex w-90" style={{ flexWrap: "wrap" }}>
                    {// eslint-disable-next-line
                        notebooks && notebooks?.map((e) => {
                            if (SearchKey !== "") {
                                const title = e.notebookTitle.toLowerCase()
                                if (title.includes(SearchKey)) {
                                    return <Notebook key={e._id} id={e._id} data={e} title={e.notebookTitle} cover={e.notebookCover} />
                                }
                            } else {
                                return <Notebook key={e._id} id={e._id} data={e} title={e.notebookTitle} cover={e.notebookCover} />
                            }
                        })
                    }

                    {
                        SearchKey === "" ? <CreateNotebook  /> : ""
                    }
                    {
                        SearchKey !== "" && outline === 0 ? <h4 className="notFound">Notebook not found</h4> : ""
                    }

                </div>
            </div>
        </>
    )
}

export default NotebookColl
