import React, { useState } from "react"
import NotebookContext from "./NotebookContext"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const NotebookState = (props) => {

  const webUrl = process.env.REACT_APP_WebUrl;

  const initialNotebooks = [];
  const [notebooks, setNotebooks] = useState(initialNotebooks);
  const [bookmarkedNotebooks, setBookmarkedNotebooks] = useState(initialNotebooks)
  const [loading, setLoading] = useState(false)

  // Get Notebooks :
  const getNotebooks = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${webUrl}/api/notebooks/fetchallnotebooks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        },
      })
      const json = await response.json()
      setNotebooks(json)
      setLoading(true)
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

  // Getbookmarked Notebooks :
  const getBookmarkedNotebooks = async () => {
    try {

      setLoading(true)
      const response = await fetch(`${webUrl}/api/notebooks/bookmarkednotebooks/:id`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        },
      })
      const json = await response.json()
      setBookmarkedNotebooks(json)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  // add Notebooks :
  const addNotebooks = async (e) => {
    const { notebookTitle, notebookCover } = e;
    try {

      // API
      const response = await fetch(`${webUrl}/api/notebooks/addnotebooks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ notebookTitle, notebookCover }),
      })
      const json = await response.json()
      setNotebooks(notebooks.concat(json))
      getNotebooks()
      toast.success('Bingo! New Notebook Have Been Created Successfully', {
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
      console.error(error)
    }

  }

  // CHANGE THIS 👉 IMP 


  const [eData, setEData] = useState({ enotebookTitle: '', eid: '', enotebookCover: '' })
  const [notebookCover, setnotebookCover] = useState()
  const [notebookTitle, setnotebookTitle] = useState("")
  const [id, setId] = useState("")

  // update Notebooks :
  const updateNotebooks = async (e) => {
    const { notebookTitle, notebookCover, id } = e;
    try {

      // API
      await fetch(`${webUrl}/api/notebooks/updatenotebook/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ notebookTitle, notebookCover }),
      })
      getNotebooks()
      toast.success('Bingo! Your Notebook Content Have Been Updated Successfully', {
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
     console.error(error)
    }
  }

  // add bookmark Notebooks :
  const addbookmark = async (id) => {
    try {

      // API
      await fetch(`${webUrl}/api/notebooks/addbookmark/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        },
      })
      getNotebooks()
      getBookmarkedNotebooks()
      toast.success('Bookmark Added!', {
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
     console.error(error)
    }
  }

  // remove bookmark Notebooks :
  const removebookmark = async (id) => {
    try {

      // API
      await fetch(`${webUrl}/api/notebooks/removebookmark/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        },
      })
      getNotebooks()
      getBookmarkedNotebooks()
      toast.warn('Bookmark Removed!', {
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

  // Delete Notebooks :
  const deleteNotebooks = async (id) => {
    try {

      // API
      await fetch(`${webUrl}/api/notebooks/deletenotebook/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        },
      })
      getNotebooks()
      toast.warn('Notebook Deleted!', {
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
     console.error(error)
    }
  }

  const [credentials, setCredentials] = useState({})
  const [addclasses, setAddclasses] = useState(false)
  const [SearchKey, setSearchKey] = useState('')
  
  const initialUrls = []
  const [ncus, setNcus] = useState(initialUrls)

  const getNcus = async () => {
    try {
        //   setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_WebUrl}/api/auth/getncu`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
        })
        const json = await response.json()
        setNcus(json.notebookcoverurl)
        console.log(json)
        setnotebookCover(json.notebookcoverurl[0])
        //   setLoading(false)

    } catch (error) {
        console.error(error)
    }
}

const addNcus = async (e) => {
  try {
      //   setLoading(true)
      await fetch(`${process.env.REACT_APP_WebUrl}/api/auth/addncu`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem("token")
          },
          body: JSON.stringify({ notebookcoverurl: e }),
      })
      getNcus();
      //   const json = await response.json()
      //   setNcus(json)
      //   setLoading(false)

  } catch (error) {
      console.error(error)
  }
}
const [isEditToggle, setIsEditToggle] = useState(0)



  // credentials, setCredentials,googleLogin, setGoogleLogin,isEmpty, setIsEmpty,countid, setId,loading, Setloading

  //  esetdata, edata, setnotebookCover, notebookCover, notebookTitle, setnotebookTitle

  return (
    <NotebookContext.Provider value={{ notebooks, setNotebooks, getNotebooks, addNotebooks, updateNotebooks, eData, setEData, deleteNotebooks, setnotebookCover, notebookCover, notebookTitle, setnotebookTitle, id, setId, addbookmark, removebookmark, getBookmarkedNotebooks, loading, setLoading, credentials, setCredentials,addclasses, setAddclasses ,SearchKey, setSearchKey,bookmarkedNotebooks, setBookmarkedNotebooks ,getNcus,addNcus ,ncus,isEditToggle, setIsEditToggle}}>
      {props.children}
    </NotebookContext.Provider>
  )
}

export default NotebookState;
