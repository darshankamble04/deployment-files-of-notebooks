const express = require("express")
const router = express.Router();
const Notes = require("../models/Notes");
const isToken = require ("../middleware/fetchuser");
const jwt = require('jsonwebtoken');


// ROUTE :01 Get all the notebooks using : GET ("./api/notebooks/fetchallnotes/:id") login required 

router.get('/fetchusernotes' , isToken, async (req,res)=>{
    try {
        const notes = await Notes.find({user:req.user.id})
        
        res.json(notes)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }
})
// ROUTE :01 Get all the notebooks using : GET ("./api/notebooks/fetchallnotes/:id") login required 

router.get('/:id/fetchallnotes' , isToken, async (req,res)=>{
    try {
        const notes = await Notes.find({ $and: [ {user:req.user.id}, {notebook:req.params.id} ] })
        
        res.json(notes)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }
})

// ROUTE :02 Add a new notebooks using : POST ("./api/notebooks/addnotebooks") login required 

router.post('/:id/addnote',isToken, async (req,res)=>{
    const { title, description, color ,date} = req.body
    try {
        const user = req.user.id
        const notebook = req.params.id
        const note = await Notes.create({title, description, color,user,notebook,date})
        res.json(note)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }
})

const UNIQUE_KEY = 'Darshan9970';

// SHARE A NOTE 
router.post('/sharenote/:id',isToken, async (req,res)=>{
    try {
        let note = await Notes.findById(req.params.id);
        // const payload = await ({
        //     note: {
        //         user:note.user,
        //         id: note.id
        //     }
        // })
        // const secret = UNIQUE_KEY + req.params.id;
        // const token = await jwt.sign(payload, secret );
        const link = `http://${req.headers.host}${req.baseUrl}/sharenote/${req.params.id}`
        res.json(link)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }
})
// get of share note
router.get('/sharenote/:id', async (req, res) => {
    const {token } = req.params
    try {
        let note = await Notes.findOne({ _id: req.params.id })
        // const secret = UNIQUE_KEY + req.params.id;
        // const data = jwt.verify(token, secret);
        // await User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true })

        // res.render('conformation')
        res.render("sharedNote", {
            title:note.title ,
            description: note.description
        });

    } catch (error) {
        res.render('onerror')
    }
})

// ROUTE :03 update the existing Notebook using : PUT ("./api/notebooks/updatenotebook") login required 
router.put('/updatenote/:id',isToken, async (req,res)=>{
    const { title, description, color } = req.body
    try {
        // Create newNote object
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (color) { newNote.color = color }

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);

        // For security 
        if (!note) { return res.status(404).send("Not found") }

        note =await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})

        res.json(note)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }
})

// ROUTE :04 Delete the existing Notebook using : PUT ("./api/notebooks/updatenotebook") login required 
router.delete('/deletenote/:id',isToken, async (req,res)=>{
    try {
       // Find the note to be updated and update it
       let note = await Notes.findById(req.params.id);

       // For security 
       if (!note) { return res.status(404).send("Not found") }

       note = await Notes.findByIdAndDelete(req.params.id)
       res.json({ "Success": "Your note is successfully deleted!!", "note": note })
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }
})

module.exports = router;