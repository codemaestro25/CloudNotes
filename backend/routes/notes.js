const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const router = express.Router();
const {body , validationResult} = require('express-validator');


//Route 1 - To fetch all notes of a user ; login required (fetchuser middleware used for that) ;
// api/notes/fetchallnotes 
router.get('/fetchallnotes', fetchuser, async(req, res)=>{
    try {
        
        const notes = await Notes.find({user: req.user.id})
        
            res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error ")
    }
})

//Route 2 - To add a new note ; login required

router.post('/addnote', fetchuser , async  (req, res)=>{
    try {
        const {title , description , tags} = req.body;
        const errors =  validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
    
        
    
        const note = new Notes({
            title , description , tags , user : req.user.id
        })
    
        const savedNotes = await note.save();
    
        return res.json(savedNotes)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error ")
    }
    

})


//Route 3 - update the note ; login require 
// api/notes/updatenote/:id
router.put('/updatenote/:id', fetchuser, async(req, res)=>{
    try{
    const {title , description , tags} = req.body;

    //creating a new note object

    const newNote = {}; // initially the new note will be blank 
    //if the user updates title and doesnt update the description for thatpurpose
    if(title){
        newNote.title = title ; // if title is being changed in the request body then add newNote title
    }
    
    if(description){
        newNote.description = description ; // if description is being changed in the request body then add newNote description
    }
    if(tags){
        newNote.tags = tags ; // if tags is being changed in the request body then add newNote tags
    }

    //finding the note to be updated
    let note = await Notes.findById(req.params.id); //always remember to add await with findBy... functions
    //req.params.id is the id of the note appended to the request url 
    if(!note){
        return res.status(404).send("Note not Found")
    }

    //verifying whether the authourised user is accessing the note or not

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Unauthourised access")
    }

    updatedNote = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})

    return res.send(updatedNote);
} catch (error) {
    console.error(error.message) ;
    return res.status(500).send("Internal Server Error");
 }


})

//Route 4 - Delete the note using DELETE : api/notes/deletenote

router.delete('/deletenote/:id', fetchuser, async (req, res)=>{

    try {
        
    
    const note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Note not found");
    }

    if(note.user.toString()!== req.user.id){
        return res.status(401).send("Unauthourized Access");
    }

    deletedNote = await Notes.findByIdAndDelete(req.params.id);

    return res.json({
        Message : "Note Delete Successfully",
        note : deletedNote
    })
}
    catch (error) {
       console.error(error.message) ;
       return res.status(500).send("Internal Server Error");
    }
})
module.exports = router;