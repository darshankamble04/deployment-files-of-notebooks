import React, { useContext } from 'react'
import NotebookContext from '../../../../context/NotebookContext'
import '../css/createNotebook.css'
import NotebookModal from './NotebookModal'
// import ImageUploading from 'react-images-uploading';

function CreateNotebook(props) {
    const context = useContext(NotebookContext)
    const {getNcus,setIsEditToggle} = context


   
    return (
        <>
            
            <div onClick={()=>{getNcus();setIsEditToggle(0)}} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className="outlineC ">
                <img className="spiralC" src="https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/SPIRAL.svg" alt="" />
                <div className="dotsC"></div>
                <div className="center d-flex flex-column">
                    <span className="material-icons">add_circle_outline</span>
                    <span className="createn">Create Notebook</span>
                </div>
            </div>

            {/* <NotebookModal action="Crecate"/> */}
            <NotebookModal action="Create" />



        </>
    )
}

export default CreateNotebook
