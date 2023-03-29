import { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {

  const host = 'http://localhost:5000'; // the host variable for backend connection
  const initialNote = [];

  const [notes, setNotes] = useState(initialNote);


  // function to fetch all notes
  const getNotes = async () => {
    //API call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json);//for testing purpose
    setNotes(json); // setting the cards in the front end by fetching the actual data from the backend
  }


  //function to add a note
  const addNote = async (title, description, tags) => {

    //API call using fetch API syntax

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tags })
    });

    const note = await response.json();
    const newNotes = JSON.parse(JSON.stringify(note))
  
    setNotes(notes.concat(newNotes)); // adds an element in the map array
  }
  //function to delete a note
  const deleteNote = async (id) => {

    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    // const json = response.json();
    // console.log(json);



    
    const newNotes = notes.filter((note) => { return note._id !== id });
    // filter function takes an arrow function as an argument
    // the above statement says that if only those note._id which are not equal to paramater 'id' will stay ; otherwise the note._id which matches the parameter id will get filtered i.e. deleted

    setNotes(newNotes);
  }


  //function to edit a note
  const editNote = async (id, title, description, tags) => {
    //API call
    //fetch API
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tags })
    });

    // const json = await response.json(); // for getting the response in testing

const newNotes = JSON.parse(JSON.stringify(notes))

    // Logic for editing in frontend
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].tags = tags;
        newNotes[index].description = description;
        break;
      }
    }
    setNotes(newNotes);
  }


  return (
    // below we export the all functions
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState;