import React, { useState, useContext, useEffect } from 'react'
import '../css/createNotebook.css'
import { Link } from 'react-router-dom'
import NotebookContext from '../../../../context/NotebookContext'
import NoteContext from '../../../../context/NoteContext'
import NotebookModal from './NotebookModal'

function Notebook(props) {
    const Context = useContext(NotebookContext)
    const { isEditToggle, setIsEditToggle, deleteNotebooks, addbookmark, removebookmark, setEData, setnotebookCover, setnotebookTitle, setId, setLoading ,getNcus} = Context;
    const context = useContext(NoteContext)
    const { userNotes, getuserNotes } = context
    const [onClickLoader, setOnClickLoader] = useState(false)

    const toggleEdit = (data) => {
        setEData({ enotebookTitle: data.notebookCover, eid: data._id, enotebookCover: data.notebookTitle })
        setnotebookCover(data.notebookCover)
        setnotebookTitle(data.notebookTitle)
        setId(data._id)
    }

    
    useEffect(() => {
        getuserNotes()
        // eslint-disable-next-line
    }, [])
    const toggleBookMarks = () => {
        if (props.data.bookmark) {
            removebookmark(props.id);
        } else {
            addbookmark(props.id);
            setLoading(true);
        }

    }
    let pathname = window.location.pathname;
    pathname = pathname.split('/')
    return (
        <>
            <Link onClick={() => { toggleEdit(props.data) }} to={`/mynotebooks/${props.id}/${props.title}`} className="outline " >
                <img className="spiral" src="https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/SPIRAL.svg" alt="" />
                <div className="inline" style={{ background: `url(${props.cover})` }}>
                    <div className="dots"></div>
                    <div className="NotebookName">
                        <div >{props.title}</div>
                        <div style={{ color: '#9e9e9e', fontSize: "0.7rem" }} >

                            {userNotes.filter((e) => { return e.notebook === props.id }).length === 0 || userNotes.filter((e) => { return e.notebook === props.id }).length === 1 ? "Note" : "Notes"}
                            {' '}
                            {userNotes.filter((e) => { return e.notebook === props.id }).length}

                        </div>

                        <button className={`box-btn2 btn ${onClickLoader ? "" : "d-none"}`}>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            {" "} Loading...
                        </button>

                    </div>
                    {/* Toggle Bookmark */}
                    <div className={`${props.data.bookmark ? "bookmarked slowDown1" : "invisible"}`}>
                        <span className={`material-icons ${props.data.bookmark ? "bookmarked slowDown2" : "invisible"}`}>bookmark</span>
                    </div>
                    <Link to={`/${pathname[1]}`} className="menu d-flex flex-column position-absolute">
                        <span onClick={() => { toggleEdit(props.data); getNcus() }} onMouseOver={()=>{setIsEditToggle(1)}} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight02" aria-controls="offcanvasRight" className="tooltip  material-icons" >edit
                            <span class="tooltiptext">Edit</span>
                        </span>

                        <span onClick={toggleBookMarks} className="tooltip material-icons " style={{ color: `${props.data.bookmark ? "red" : ""}` }}>bookmark
                            <span class="tooltiptext">Bookmark</span>
                        </span>

                        <span onClick={() => { setOnClickLoader(true); deleteNotebooks(props.id); setLoading(true); }} className="tooltip  material-icons">delete
                            <span class="tooltiptext">Delete</span>
                        </span>
                    </Link>
                </div>
            </Link>
            {/* Edit Notebook Modal */}    

            {isEditToggle===1 && <NotebookModal action="Edit" id={props.id} />}
            

        </>
    )
}

export default Notebook
