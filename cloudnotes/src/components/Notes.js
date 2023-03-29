import noteContext from '../Context/NoteContext';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const {theme, showAlert} = props; //destructuring
    useEffect(() => {
        if(localStorage.getItem('token')){
        getNotes();
        }
        else{
            navigate('/login');
            showAlert("We need your credentials for your notes mate","info")
        }
        // eslint-disable-next-line
    }, []); //empty array to call only once

    //fucntion to edit (update) note

    const ref = useRef(null);//for edit button
    const refClose = useRef(null);// forclosing the modal on clicking the update button

    const [note, setNote] = useState({id:'',etitle:'', edescription:'',etags:''})

    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value});
    }
    
    const handleOnClick = ()=>{
        editNote(note.id, note.etitle, note.edescription, note.etags);
refClose.current.click();
props.showAlert("You requested, we updated!","success")
    }

    //function for editing the note
    const updateNote = (currentNote) => {
        ref.current.click();
        // ref.toggle(); //if modal is hidden then show it , if its visible then hide it
        
    setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etags:currentNote.tags})
    }
    return (
        <>

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            {/* ref is used to remotely access this button by clicking some different controls */}

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" onChange={onChange} value={note.etitle}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea className="form-control" id="edescription" name="edescription" rows="3" onChange={onChange} value={note.edescription}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etags" className="form-label">Tags</label>
                                    <input type="text" className="form-control" id="etags" name="etags" onChange={onChange} value={note.etags}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleOnClick}disabled = {note.etitle.length<1 || note.edescription.length<1}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

{/* displaying the note cards */}
            <div className={`row my-3 text-${theme==='light'?'black':'white'}`}>
                <h2>Your Notes</h2>
                <div className="container mx-2">
                {notes.length===0 && 'No Notes To Display '}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} theme={theme} showAlert={showAlert} />;
                })}
            </div>
        </>
    )
}

export default Notes
