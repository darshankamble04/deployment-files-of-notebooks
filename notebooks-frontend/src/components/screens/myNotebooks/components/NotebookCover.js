import React, { useContext } from 'react'
import NotebookContext from '../../../../context/NotebookContext';

function NotebookCover(props) {
    const {url} = props
    const Context = useContext(NotebookContext)
    const { setnotebookCover, notebookCover } = Context;
  return (
    <div className={`coverImg ${notebookCover===url?"addAfter":""}`} onClick={()=>{setnotebookCover(url)}} style={{ background: `url(${url})` }}></div>
  )
}

export default NotebookCover