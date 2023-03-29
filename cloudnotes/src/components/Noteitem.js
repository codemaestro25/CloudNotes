import React, { useContext } from 'react'

import noteContext from '../Context/NoteContext';


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const { note, updateNote, theme , showAlert} = props;
    return (
        <div className='col-md-3 '>
            <div className={`card border rounded-3 border ${theme==='light'?'' : 'border-primary'} my-3`}>

                <div className= {`card-body border border ${theme==='light'?'' : 'border-primary'} rounded bg-${theme==='light'?'light':'dark'} text-${theme==='light'?'dark':'light'}`}>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ left: '90%',  zIndex: '1',marginInline:'-26px'}}>
           {note.tags}</span>
                    <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-solid fa-file-pen mx-3" onClick={()=>{updateNote(note)}}></i>
                    <i className="fa-solid fa-trash" onClick={()=>{showAlert("Note deleted ... phewww","warning");
                        return deleteNote(note._id)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    
                </div>
            </div>
        </div>
    )
}

export default Noteitem
