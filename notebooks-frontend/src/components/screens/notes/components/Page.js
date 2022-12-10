import React, { useContext, useRef} from 'react'
import NoteContext from '../../../../context/NoteContext'
import '../css/page.css'
import '../css/createPage.css'
import { toast } from 'react-toastify'
import NotebookContext from '../../../../context/NotebookContext'

function Page(props) {
    const context = useContext(NoteContext)
    const { NoteTitle, editNote, color, setColor, show, setShow, editNoteVal, NoteDescription, deleteNote, setNoteDescription, setEditNoteVal, setNoteTitle,link,letsShare } = context

    const Context = useContext(NotebookContext)
    const { loading,setLoading } = Context;
    let date = new Date(props.date)
    date = date.toString()
    let arr = date.split(" ")
    let month = arr[1]
    let day = arr[2]
    const closeRef = useRef(null)

    const toggleClick = (data) => {
        const { title, description, _id } = data
        setEditNoteVal({ title, description, id: _id })
        setNoteTitle(title)
        setNoteDescription(description)
        setColor(data.color)

    }

    const toggleSubmit = () => {
        setLoading(true)        
        // eslint-disable-next-line
        if (!NoteTitle.length == 0) {
            const { id } = editNoteVal
            editNote({ title: NoteTitle, description: NoteDescription, id })
            setShow(false)
            closeRef.current.click()

        } else {
            toast.error(`Note Title cannot be blank`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
        }
    }


    const letsCopy = (which) => {
        try {
            
            if (which === 'URL') {
                navigator.clipboard.writeText(link)
            }
            else {
                navigator.clipboard.writeText(`<iframe src=${link} style="border:none;width:100%"></iframe>`)
            }
            toast.success(`Link Copied Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
        });
    } catch (error) {
        toast.error(`Could not copy text`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
    });
        
    }
    }

    return (
        <>
            <div className='pageBody' style={{ backgroundColor: `${props.color}` }}>
                <div style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#staticBackdrop01" onClick={() => { toggleClick(props.data) }} className="content">
                    <h6>{props.title}</h6>
                    <p>{props.description}</p>
                </div>
                <div className="operations">
                    <span data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onClick={() => { toggleClick(props.data) }} className="material-icons" >edit</span>

                    {/* <span onClick={() => { toggleClick(props.data) }} data-bs-toggle="modal" data-bs-target="#staticBackdrop01" className="material-icons">visibility</span> */}

                    {/* <span onClick={() => { toggleClick(props.data) }} data-bs-toggle="modal" data-bs-target="#staticBackdrop01" className="material-icons">insert_link</span> */}
                    <i class="fas fa-link material-icons" onClick={() => { letsShare(props.id) }} data-bs-toggle="modal" data-bs-target="#sharenote"></i>
                    <span className="material-icons" onClick={() => { deleteNote(props.id) }}>delete</span>
                </div>
                <div className="updatedDate">
                    {month}{" "}{day}
                </div>
            </div>

            {/* share note */}
            <div class="modal fade" id="sharenote" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Share Note</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="card mb-3">
                                <div class="card-header">
                                    Sharable URL
                                    <i onClick={() => { letsCopy('URL') }} style={{ paddingLeft: "9px", cursor: 'pointer' }} class="fas fa-copy"></i>
                                </div>
                                <div class="card-body">
                                  {  loading && <div className="loader"></div>}
                                {// eslint-disable-next-line
                                    <a target="_blank" href={link} class="card-text">{link}</a>}
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header">
                                    Embedded Code
                                    <i onClick={() => { letsCopy('Code') }} style={{ paddingLeft: "9px", cursor: 'pointer' }} class="fas fa-copy"></i>
                                </div>
                                <div class="card-body">
                                    <code class="card-text"> {`<iframe src=${link} style="border:none;width:100%"></iframe> `}</code>
                                </div>
                            </div>

                            {/* <iframe src='http://localhost:5000/api/notes/sharenote/61adeb7da980d8205e8742fc/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub3RlIjp7InVzZXIiOiI2MWFkZTkwYmE5ODBkODIwNWU4NzQyYjciLCJpZCI6IjYxYWRlYjdkYTk4MGQ4MjA1ZTg3NDJmYyJ9LCJpYXQiOjE2MzkwNDY5MjV9.VAMXVgnhfbaNzwdi_83g-i5bUL55xd3gQ1EsBiw-BNU' style={{ border: "none", width: "100%" }}></iframe> */}
                        </div>
                        {/* <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Understood</button>
                        </div> */}
                    </div>
                </div>
            </div>


            {/* view note */}
            <div className="modal fade" style={{ overflowY: "hidden" }} id="staticBackdrop01" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div style={{ backgroundColor: `${color}` }} className="costomModal modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div style={{ backgroundColor: `${color}` }} className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">{NoteTitle}</h5>
                            <span className="mx-3 material-icons" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">edit</span>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <textarea style={{ height: '82vh', backgroundColor: `${color}` }} value={NoteDescription} disabled className="modal-body"></textarea>
                    </div>
                </div>
            </div>

            {/* Edit Note */}
            <div className="modal fade" style={{ overflowY: "hidden" }} id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div style={{ backgroundColor: `${color}` }} className="costomModal modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div style={{ backgroundColor: `${color}` }} className="modal-header">

                            <div className="input-box d-flex">
                                <input value={NoteTitle} onChange={(e) => { setNoteTitle(e.target.value) }} type="text" className="titletoedit  form-control" placeholder="Untitled" />

                                <div style={{ backgroundColor: `${color}` }} onClick={() => { !show ? setShow(true) : setShow(false) }} className="colorBox" ></div>

                                <div className={`${show ? 'visible open' : 'd-none'}`}>
                                    <div onClick={() => { setShow(false); setColor('rgb(255,156,0)') }} style={{ backgroundColor: 'rgb(255,156,0)' }} class="dropdown-item colors"></div>
                                    <div onClick={() => { setShow(false); setColor('rgb(179,181,182)') }} style={{ backgroundColor: 'rgb(179,181,182)' }} class="dropdown-item colors"></div>
                                    <div onClick={() => { setShow(false); setColor('rgb(0,150,168)') }} style={{ backgroundColor: 'rgb(0,150,168)' }} class="dropdown-item colors"></div>
                                    <div onClick={() => { setShow(false); setColor('rgb(212,224,227)') }} style={{ backgroundColor: 'rgb(212,224,227)' }} class="dropdown-item colors"></div>
                                    <div onClick={() => { setShow(false); setColor('#ff8585e0') }} style={{ backgroundColor: '#ff8585e0' }} class="dropdown-item colors"></div>
                                    <div onClick={() => { setShow(false); setColor('#fff') }} style={{ backgroundColor: '#fff' }} class="dropdown-item colors"></div>
                                    <div onClick={() => { setShow(false); setColor('rgb(255,217,33)') }} style={{ backgroundColor: 'rgb(255,217,33)' }} class="dropdown-item colors"></div>
                                    <div onClick={() => { setShow(false); setColor('rgb(254,128,129)') }} style={{ backgroundColor: 'rgb(254,128,129)' }} class="dropdown-item colors"></div>
                                    <div onClick={() => { setShow(false); setColor('rgb(104,176,50)') }} style={{ backgroundColor: 'rgb(104,176,50)' }} class="dropdown-item colors"></div>
                                </div>

                            </div>
                            {/* <div className={`position-fixed bottom-0 end-0 p-3 ${isEmpty ? "visible" : "invisible"}`} style={{ zIndex: '11' }}>
                                <div id="liveToast">
                                    <div className="toast-header">
                                        <small className="me-auto">
                                            <label style={{ color: "red", marginRight: '14px' }} className={`form-label d-flex my-2 `}><span className="material-icons mx-2">error_outline</span><span>Note Title cannot be blank</span> </label>
                                        </small>
                                    </div>
                                </div>
                            </div> */}


                            <button ref={closeRef} type="button" className="btn-close d-none" data-bs-dismiss="modal" aria-label="Close"></button>
                            <span className="material-icons" style={{ fontSize: '2.2rem' }} onClick={toggleSubmit}>done</span>

                        </div>
                        <textarea style={{ height: '82vh', backgroundColor: `${color}` }} value={NoteDescription} onChange={(e) => { setNoteDescription(e.target.value) }} className="form-control"></textarea>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
