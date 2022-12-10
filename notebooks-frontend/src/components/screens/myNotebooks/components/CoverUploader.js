import React, { useContext, useEffect, useRef, useState } from 'react'
import NotebookContext from '../../../../context/NotebookContext';
import NotebookCover from './NotebookCover';

function CoverUploader(props) {
    const Context = useContext(NotebookContext)
    const { setnotebookCover, notebookCover, ncus,addNcus } = Context;

    const [isImgUpoloaded, setIsImgUpoloaded] = useState(1)
    const [imgUrl, SetImgUrl] = useState("")
    const webUrl = process.env.REACT_APP_WebUrl;
    const [isLoading, setIsLoading] = useState(0)

    // const initialUrls = []
    // const [ncus, setNcus] = useState(initialUrls)
    const autoClick = useRef(null)

    // CODE FOOR IMG UPLOADER
    const imageInput = document.querySelector("#imageInput")

    const handelClick = async (event) => {
        event.preventDefault()
        setIsLoading(1)
        const file = imageInput.files[0]
        console.log(file)
        console.log(imageInput)
        console.log(imageInput.files)

        // get secure url from our server
        const { url } = await fetch(`${webUrl}/s3Url`).then(res => res.json())
        console.log(url)

        // post the image direclty to the s3 bucket
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: file
        })

        const imageUrl = url.split('?')[0]
        console.log(imageUrl)
        SetImgUrl(imageUrl)

        console.log(imgUrl)
        setIsImgUpoloaded(1)
        addNcus(imageUrl);
        setIsLoading(0)
        // post requst to my server to store any extra data
        // imageInput.files[0] = undefined;


    }
    // END

    useEffect(() => {
setIsLoading(0)

    }, [])


    return (
        <>
            {/*   */}
            <form onSubmit={(e) => { handelClick(e) }} className={`coverImg text-center imgUploderBox d-center`}>
                <span onClick={() => { autoClick.current.click() }} style={{ paddingTop: "5px" }} className="c-pointer imgUploaderText " >Custom cover</span>

                <input ref={autoClick} onChange={(e) => { setIsImgUpoloaded(0); console.log(e) }} style={{ position: "absolute", top: "-30px" }} id="imageInput" type="file" accept="image/*" />

                {/* <button className=btn btn-primary imgUploadBtn addNotebookbtn type="button" disabled> */}
                    {/* Loading... */}
                {/* </button> */}

                <button disabled={isImgUpoloaded} type="submit" className='imgUploadBtn addNotebookbtn'>
                    <span style={{width: "1rem",height: "1rem"}} class={`spinner-border spinner-border-sm" role="status ${isLoading?"":"d-none"}`} aria-hidden="true"></span>
                   {" "}  Upload
                </button>
            </form>

            {/* {imgUrl!=="" && <NotebookCover url={imgUrl} notebookCover={notebookCover} setnotebookCover={setnotebookCover} />} */}
            {/* <img src={imgUrl} alt="" /> */}

            {
                ncus !== undefined && ncus.map((e) => {
                    return (<NotebookCover url={e} notebookCover={notebookCover} setnotebookCover={setnotebookCover} />)
                })
            }
        </>
    )
}

export default CoverUploader