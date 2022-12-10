import React, { useContext, useEffect } from 'react'
import '../../css/sidebar.css'
import { Link,useLocation } from 'react-router-dom'
import NotebookContext from '../../context/NotebookContext'

function Sidebar() {
    const location = useLocation(null)
    const Context = useContext(NotebookContext);
    const {addclasses,setAddclasses} = Context;
    useEffect(() => {
        setAddclasses(true)
         // eslint-disable-next-line
    }, [])
    return (
        <div className={`sidebar ${addclasses ? "d-none" : "d-flex"}`}>
            <div className="d-flex flex-column">
                <Link to="/"  className={`sidebarLabel ${location.pathname === '/'? 'sidebarLabelSelected':''}`}>
                    {/* <span class="mx-2 material-icons">home</span> */}
                    <span className="dk99">Home</span>
                </Link>
{localStorage.getItem('token')?
            <div className="d-flex flex-column">
                <Link to="/mynotebooks" className={`sidebarLabel ${location.pathname === '/mynotebooks'? 'sidebarLabelSelected':''}`}>
                    {/* <img className="mx-2" src={notebookIcon} alt="" /> */}
                    <span className="dk99" >Notebooks</span>
                </Link>
                <Link to='/allnotes' className={`sidebarLabel ${location.pathname === '/allnotes'? 'sidebarLabelSelected':''}`}>
                    {/* <img className="mx-2" src={notesIcon} alt="" /> */}
                    <span className="dk99">All Notes</span>
                </Link>
                <Link to="/allbookmarkednotebooks" className={`sidebarLabel ${location.pathname === '/allbookmarkednotebooks'? 'sidebarLabelSelected':''}`}>
                    {/* <span class="mx-2 material-icons">bookmark</span> */}
                    <span className="dk99">Bookmarks</span>
                </Link>
            </div>
:
            <div className="d-flex flex-column">
                <Link to='/register' className={`sidebarLabel ${location.pathname === '/register'? 'sidebarLabelSelected':''}`}>
                    {/* <img className="mx-2" src={notesIcon} alt="" /> */}
                    <span className="dk99">Register</span>
                </Link>
                <Link to='/login' className={`sidebarLabel ${location.pathname === '/login'? 'sidebarLabelSelected':''}`}>
                    {/* <img className="mx-2" src={notesIcon} alt="" /> */}
                    <span className="dk99">Login</span>
                </Link>
            </div>
            }
            </div>
            <div>
            {localStorage.getItem('token')?
                <Link to="/contactus" className={`sidebarLabel ${location.pathname === '/contactus'? 'sidebarLabelSelected':''}`}>
                    {/* <span class="mx-2 material-icons">contact_support</span> */}
                    <span className="dk99">Contact Us</span>
                </Link>:""}
                <Link to="/aboutus" className={`sidebarLabel ${location.pathname === '/aboutus'? 'sidebarLabelSelected':''}`}>
                    {/* <span class="mx-2 material-icons">domain</span> */}
                    {/* <span style={{fontWeight:'600'}} class="material-icons">logout</span> */}
                    <span className="dk99">About Us</span>
                </Link>
                {/* <label className={`sidebarLabel ${location.pathname === '/'? 'sidebarLabelSelected':''}`}>
                    <img className="mx-2" src={logoutIcon} alt="" />
                    <span style={{fontWeight:'600'}} class="material-icons">logout</span>
                    <span>Logout</span>
                </label> */}
            </div>
        </div>
    )
}

export default Sidebar
