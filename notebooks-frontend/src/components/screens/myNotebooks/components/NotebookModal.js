import React, { useState, useContext, useRef } from 'react'
import NotebookContext from '../../../../context/NotebookContext';
import CoverImgs, { notebookCoverUrl } from '../../../common/Helper';


function NotebookModal(props) {
    const autoClick = useRef(null)
    const [isEmpty, setIsEmpty] = useState(false)
    const Context = useContext(NotebookContext)
    const { updateNotebooks, setnotebookCover, notebookCover, notebookTitle, setnotebookTitle, id, setLoading ,addNotebooks,setIsEditToggle } = Context;

    const submitNotebook = (e) => {
        e.preventDefault()
        setLoading(true)
        // eslint-disable-next-line
        if (!notebookTitle.length == 0) {
            if (props.action === "Edit") {
                updateNotebooks({ notebookTitle, notebookCover, id })
                setnotebookTitle('')
                setIsEditToggle(0)
            }
            else if (props.action === "Create") {
                addNotebooks({ notebookTitle, notebookCover })
                setnotebookTitle('')
                setnotebookCover(notebookCoverUrl[Math.round(18 * Math.random())])

            }
            autoClick.current.click()
        } else {
            setIsEmpty(true)
        }
    }

    return (
        <div class="canvasC offcanvas offcanvas-end" tabindex="-1" id={props.action === "Edit" ? "offcanvasRight02" : "offcanvasRight"} aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h5 id="offcanvasRightLabel">{props.action} Notebook</h5>

                <span ref={autoClick} type="button" className="material-icons closeBtn" data-bs-dismiss="offcanvas" aria-label="Close">close</span>
            </div>
            <div className="offcanvas-body">
                <div className="mb-1 d-grid inputsN">
                    <form className="d-flex">

                        <div className="coverImg selectedImg" style={{ background: `url(${notebookCover === undefined ? notebookCoverUrl[Math.round(12 * Math.random())] : notebookCover})` }}></div>

                        <div className="d-flex flex-column" style={{ padding: "0 0 0 28px" }}>
                            <label className="form-label" id="notebookname">Notebook Name</label>
                            <input value={notebookTitle} type="text" className="form-control" placeholder="Untitled" onChange={(e) => { setnotebookTitle(e.target.value) }} required />
                            <div style={{ color: "red" }} className={`form-text ${isEmpty ? "visible" : "invisible"}`}>Notebook name cannot be blank </div>
                            <button onClick={(e) => { submitNotebook(e, props.id) }} className="addNotebookbtn">{props.action} Notebook</button>
                        </div>
                    </form>
                    <label className="form-label" style={{ width: 'max-content' }}>Notebook Cover</label>
                </div>

                <div className="coverImgs">
                    <CoverImgs />
                </div>
            </div>
        </div>
    )
}

export default NotebookModal