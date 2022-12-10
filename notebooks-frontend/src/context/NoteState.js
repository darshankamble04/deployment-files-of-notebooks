import React, { useContext, useState } from "react"
import NotebookContext from "./NotebookContext";
import NoteContext from './NoteContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NoteState(props) {

    // BACKEND HOSTED URL :
    const webUrl = process.env.REACT_APP_WebUrl;
const Context = useContext(NotebookContext)
const { setLoading} = Context;

    const [notes, setNotes] = useState([])
    const [userNotes, setUserNotes] = useState([])
    const [noteVal, setNoteVal] = useState({ eid: '', etitle: '', edescription: '', etag: '' })
    

    // GET NOTE user specified :~
    // API
    const getuserNotes = async () => {
        try {
            
            setLoading(true)
            const response = await fetch(`${webUrl}/api/notes/fetchusernotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem("token")
            },
        })
        const json = await response.json()
        setUserNotes(json)
        setLoading(false)
    } catch (error) {
       console.error(error)
    }
    }
    // GET NOTE :~
    // API
    const getNotes = async () => {
        try {
            
            setLoading(true)
            let pathname = window.location.pathname;
        pathname = pathname.split('/')
        
        const response = await fetch(`${webUrl}/api/notes/${pathname[2]}/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem("token")
            },
        })
        const json = await response.json()
        setNotes(json)
        setLoading(false)
        
    } catch (error) {
       console.error(error)
    }
}
    const [color, setColor] = useState("rgb(179, 181, 182)")

    // ADD NOTE :~
    const addNote = async (e) => {
        try {
            
            const { title, description } = e;
            let pathname = window.location.pathname;
        pathname = pathname.split('/')
        let date = new Date()
        // API
        await fetch(`${webUrl}/api/notes/${pathname[2]}/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description,color,date }),
        })
        getNotes()
        getuserNotes()
        toast.success('Bingo! New Note Have Been Created Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme:'light'
        });
    } catch (error) {
        console.error(error)
    }
    }
    
    // DELETE NOTE  :~
    const deleteNote = async (id) => {
        try {
            
            // API
            await fetch(`${webUrl}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem("token")
            },
        })
        
        // CLIENT SIDE SCRIPTING
        const updatedNotes = notes.filter((e) => { return e._id !== id })
        setNotes(updatedNotes)
        getNotes()
        getuserNotes()
        toast.warn('Note Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme:'light'
        });
        
    } catch (error) {
        toast.error(`You're Offline`, {
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

    // EDIT NOTE  :~
    const editNote = async (e) => {
        const { title, description,id} = e
        try {
            
            // API
            await fetch(`${webUrl}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description,color}),
        })
        getNotes()
        getuserNotes()
        toast.success('Bingo! Your Note Content Have Been Updated Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme:'light'
        });
        
    } catch (error) {
    }
    }
    const [link, setLink] = useState('')

    const letsShare = async (id) => {
        try {
            
            setLoading(true)
            const response = await fetch(`${webUrl}/api/notes/sharenote/${id}`, {
            // const response = await fetch(`/api/auth/forgotpassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
            // body: JSON.stringify({email: credentials.email, newpassword: credentials.newpassword }),
        })
        const json = await response.json()
        setLink(json)
        setLoading(false)
    } catch (error) {
        toast.error(`You're Offline`, {
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

    const [editNoteVal, setEditNoteVal] = useState({ title: '', description: '', id: '' })

    const [NoteTitle, setNoteTitle] = useState('')
    const [NoteDescription, setNoteDescription] = useState('')

    const [notebookCover, setnotebookCover] = useState(Math.round(15 * Math.random()))
    const [notebookTitle, setnotebookTitle] = useState(" ")


    const [show , setShow] = useState(false)




    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes,editNoteVal, setEditNoteVal,  noteVal, setNoteVal ,NoteTitle, setNoteTitle,NoteDescription, setNoteDescription ,getuserNotes,userNotes,notebookCover, setnotebookCover,notebookTitle, setnotebookTitle,color, setColor,show , setShow,letsShare,link, setLink}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;