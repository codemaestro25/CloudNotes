import React, { useContext, useState } from 'react'
import noteContext from '../Context/NoteContext';




const AddNotes = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const {theme} = props; //destructuring

  const [note, setNote] = useState({ title: "", description: "", tags: "general" })
  const handleOnClick = (e) => {
    e.preventDefault(); //so that page doesnt reload
    addNote(note.title, note.description, note.tags);
    props.showAlert("Here goes one more note","info");
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <div className={`container my-3 text-${theme==='light'?'black':'white'}`} >
        <h1>{`Hey ${localStorage.getItem('username')}, Add Notes`}</h1>
        <form className='my-3 ' onSubmit={handleOnClick} >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <div className="input-group has-validation">
              <input type="text" className="form-control" id="title" name="title" onChange={onChange} required />
              <div id="titleFeedback" className="invalid-feedback">
                Sorry Mate! Title Cannot be Empty.
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name="description" rows="3" onChange={onChange} required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label">Tags</label>
            <input type="text" className="form-control" id="tags" name="tags" onChange={onChange}/>
          </div>
          <button type="submit" className="btn btn-primary"  disabled = {note.title.length<1 || note.description.length<1}>Add Note</button>
        </form>
      </div>
    </div>
  );
}

export default AddNotes;
