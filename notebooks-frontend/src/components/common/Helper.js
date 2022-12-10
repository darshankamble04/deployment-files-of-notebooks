import React from 'react'
import CoverUploader from '../screens/myNotebooks/components/CoverUploader'
import NotebookCover from '../screens/myNotebooks/components/NotebookCover'


export const notebookCoverUrl = [
    "https://notebook-covers.s3.us-west-2.amazonaws.com/4k-wallpaper-architecture-background-black.jpg",
    "https://notebook-covers.s3.us-west-2.amazonaws.com/580964-avengers-minimal-logo-iphone-hd-4k-wallpaper-data-src-avengers-logo-wallpaper-hd-for-mobile-hd-wallpaper-background-download.jpg",
    "https://notebook-covers.s3.us-west-2.amazonaws.com/cover01.jpeg",
    "https://notebook-covers.s3.us-west-2.amazonaws.com/dictionaries-black-minimalism-quote-wallpaper-thumb.jpg",
    "https://notebook-covers.s3.us-west-2.amazonaws.com/digital-art-pattern-blue-background-minimalism-wallpaper-thumb.jpg",
    "https://notebook-covers.s3.us-west-2.amazonaws.com/download.png",
    "https://notebook-covers.s3.us-west-2.amazonaws.com/good+img2_edited.jpg",
    "https://notebook-covers.s3.us-west-2.amazonaws.com/images.jpeg",
    "https://notebook-covers.s3.us-west-2.amazonaws.com/minimalism-abstract-pattern-digital-art-wallpaper-thumb.jpg",
    "https://notebook-covers.s3.us-west-2.amazonaws.com/simple-background-digital-art-minimalism-wallpaper-thumb.jpg",
    "https://notebook-covers.s3.us-west-2.amazonaws.com/1467836.webp",
    "https://notebook-covers.s3.us-west-2.amazonaws.com/1756508.webp",
    "https://notebook-covers.s3.us-west-2.amazonaws.com/4306-iron-man-mask-desktop-wallpaper-62758-1920x1080px.jpg",
]


const CoverImgs = (props) => {

    return (
        <>
            <CoverUploader />
            {
                notebookCoverUrl.map((e) => {
                    return (<NotebookCover url={e}  />)
                })
            }

            {/* <div className={`coverImg ${notebookCover === notebookCoverUrl[0] ? "addAfter" : ""}`} onClick={() => { setnotebookCover(notebookCoverUrl[0]) }} style={{ background: `url(${notebookCoverUrl[0]})` }}></div> */}
        </>


    )
}
export default CoverImgs;