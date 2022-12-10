import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NotebookState from './context/NotebookState';
import NoteState from './context/NoteState';

ReactDOM.render(
  <React.StrictMode>
    <NotebookState>
      <NoteState>
        <App />
      </NoteState>
    </NotebookState>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// https://notebooksbackend-darshankamble.herokuapp.com
// http://localhost:5000
// https://notebooks-kambledarshan.herokuapp.com