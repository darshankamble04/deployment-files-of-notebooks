// import React from 'react'
// import '../../css/alert.css'
// function Alert(props) {
//     return (
//         <div className="costomAlert">
//            <div class="alert alert-dark alert-dismissible fade show" role="alert">
//                 {props.msg}
//                 <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//             </div>
//         </div>
//     )
// }

// export default Alert


import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Alert(){
    const notify = () => toast("Wow so easy!");

    return (
    <div>
      <div>
            <h1>some error occure</h1>
        </div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </div>
  );
}
export default Alert ;