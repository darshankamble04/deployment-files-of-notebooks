import React, { useContext, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import NotebookContext from '../../../../context/NotebookContext'
import NoteContext from '../../../../context/NoteContext'
import '../css/createPage.css'

function CreatePage() {
    const context = useContext(NoteContext)
    const { NoteTitle, setNoteTitle, color, setColor, NoteDescription, setNoteDescription, addNote ,show , setShow} = context

    const Context = useContext(NotebookContext)
    const { setLoading } = Context;

    const toggleClick = () => {
        setNoteTitle('')
        setNoteDescription('')
    }

    const closeRef = useRef(null)

    useEffect(() => {
        setNoteTitle('')
        setNoteDescription('')
        // eslint-disable-next-line
    }, [])

    const toggleDone = () => {
        // eslint-disable-next-line
        if (!NoteTitle.length == 0) {
            setLoading(true)
            addNote({ title: NoteTitle, description: NoteDescription })
            closeRef.current.click()
            setNoteTitle(' ')
            setNoteDescription(' ')
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
    console.log(color)
    return (
        <>

            <div onClick={toggleClick} data-bs-toggle="modal" data-bs-target="#staticBackdrop3" className="card col-6 col-md-4 dottedpageOuter">
                <div className="card-body">
                    <div className="center d-flex flex-column">
                        <span className="material-icons">
                            add_circle_outline
                        </span>
                        <span className="createn">Create Note</span>
                    </div>
                </div>
            </div>

            <div className="modal fade" style={{ overflowY: "hidden" }} id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div style={{ backgroundColor: `${color}` }} className="costomModal modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div style={{ backgroundColor: `${color}` }} className="modal-header">
                            {/* <h5 className="modal-title" id="staticBackdropLabel">{props.task} Note</h5> */}
                            {/* NOTETITLE------------------------------- */}
                            <div className="input-box d-flex">
                                <input value={NoteTitle} onChange={(e) => { setNoteTitle(e.target.value) }} type="text" className="titletoedit  form-control" placeholder="Untitled" />

                               <div style={{ backgroundColor: `${color}` }} onClick={()=>{!show?setShow(true):setShow(false)}} className="colorBox" ></div>

    <div className={`${show?'visible open':'d-none'}`}>
            <div onClick={()=>{setShow(false); setColor('rgb(255,156,0)')}} style={{ backgroundColor: 'rgb(255,156,0)' }} class="dropdown-item colors"></div>
            <div onClick={()=>{setShow(false); setColor('rgb(179,181,182)')}} style={{ backgroundColor: 'rgb(179,181,182)' }} class="dropdown-item colors"></div>
            <div onClick={()=>{setShow(false); setColor('rgb(0,150,168)')}} style={{ backgroundColor: 'rgb(0,150,168)' }} class="dropdown-item colors"></div>
            <div onClick={()=>{setShow(false); setColor('rgb(212,224,227)')}} style={{ backgroundColor: 'rgb(212,224,227)' }} class="dropdown-item colors"></div>
            <div onClick={()=>{setShow(false); setColor('#ff8585e0')}} style={{ backgroundColor: '#ff8585e0' }} class="dropdown-item colors"></div>
            <div onClick={()=>{setShow(false); setColor('#fff')}} style={{ backgroundColor: '#fff' }} class="dropdown-item colors"></div>
            <div onClick={()=>{setShow(false); setColor('rgb(255,217,33)')}} style={{ backgroundColor: 'rgb(255,217,33)' }} class="dropdown-item colors"></div>
            <div onClick={()=>{setShow(false); setColor('rgb(254,128,129)')}} style={{ backgroundColor: 'rgb(254,128,129)' }} class="dropdown-item colors"></div>
            <div onClick={()=>{setShow(false); setColor('rgb(104,176,50)')}} style={{ backgroundColor: 'rgb(104,176,50)' }} class="dropdown-item colors"></div>
    </div>                               
                            
                            </div>
                            {/* BOOTSTRAP TOAST */}
                            {/* <div style={{ backgroundColor: `${color}`,zIndex: '11' }} className={`position-fixed bottom-0 end-0 p-3 ${isEmpty ? "visible" : "invisible"}`} >
                                <div id="liveToast">
                                    <div className="toast-header">
                                        <small className="me-auto">
                                            <label style={{ color: "red", marginRight: '14px' }} className={`form-label d-flex my-2 `}><span className="material-icons mx-2">error_outline</span><span>Note Title cannot be blank</span> </label>
                                        </small>
                                    </div>
                                </div>
                            </div> */}

                            <div className="d-flex rightModalHeader align-items-center">
                                {/* <button type="button" onClick={toggleClick} className="btn btn-primary"> Add Note </button> */}
                                <span className={`material-icons mx-2 
                                ${ // eslint-disable-next-line
                                    'visible'} `}
                                    style={{ fontSize: '2rem' }} onClick={toggleDone}>done</span>

                                <button ref={closeRef} type="button" className={`btn-close mx-2 `} data-bs-dismiss="modal" aria-label="Close"></button>

                            </div>
                        </div>
                        <textarea style={{ height: '82vh', backgroundColor: `${color}` }} value={NoteDescription} onChange={(e) => { setNoteDescription(e.target.value) }} />

                    </div>
                </div>
            </div>

        </>
    )
}

export default CreatePage
