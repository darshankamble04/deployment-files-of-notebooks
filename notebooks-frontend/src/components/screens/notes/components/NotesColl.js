import React, { useContext, useEffect } from 'react'
import NotebookContext from '../../../../context/NotebookContext'
import NoteContext from '../../../../context/NoteContext'
import CreatePage from './CreatePage'
import Page from './Page'

function NotesColl() {
    const context = useContext(NotebookContext)
    const {SearchKey} = context;
    const Context = useContext(NoteContext)
    const {notes,getNotes} = Context
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])

    const pageBody= document.getElementsByClassName("pageBody").length
    return (
        <>
            <div className="d-flex bookArrange" >
                <div className="d-flex W-90" style={{ flexWrap: "wrap" }}>
                    
                {// eslint-disable-next-line
                notes.map((e)=>{
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
                        SearchKey === "" ? <CreatePage/>:""
                     }
                     {
                          SearchKey !== "" && pageBody===0?<h4 className="notFound">Notes not found</h4>:""
                     }
                </div>
            </div>
        </>
    )
}

export default NotesColl
