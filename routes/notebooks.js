const express = require("express")
const router = express.Router();
const Notebooks = require("../models/Notebooks");
const Notes = require("../models/Notes");
const User = require("../models/User")
const isToken = require ("../middleware/fetchuser");

// ROUTE :01 Get all the notebooks using : GET ("./api/notebooks/fetchallnotebooks") login required 

router.get('/fetchallnotebooks' , isToken, async (req,res)=>{
    try {
        const notebooks = await Notebooks.find({user:req.user.id})
        res.json(notebooks)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }
})
// ROUTE :01[b] Get all the notebooks using : GET ("./api/notebooks/fetchallnotebooks") login required 

router.get('/bookmarkednotebooks/:id' , isToken, async (req,res)=>{
    try {
        const notebooks = await Notebooks.find({ $and: [ {user:req.user.id}, {bookmark:true} ]})
        res.json(notebooks)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }
})

// ROUTE :02 Add a new notebooks using : POST ("./api/notebooks/addnotebooks") login required 

router.post('/addnotebooks',isToken, async (req,res)=>{
    const {notebookTitle,notebookCover} = req.body
    try {
        const user = req.user.id
        const notebook = await Notebooks.create({notebookTitle,notebookCover,user})
        res.send({notebook})
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }
})

// ROUTE :03 update the existing Notebook using : PUT ("./api/notebooks/updatenotebook") login required 
router.put('/updatenotebook/:id',isToken, async (req,res)=>{
    const {notebookTitle,notebookCover} = req.body
    try {
        const newNotebook = {}
        if(notebookTitle){newNotebook.notebookTitle = notebookTitle}
        if(notebookCover){newNotebook.notebookCover = notebookCover}

        // find the notebook to be updated and update it
        let notebook = await Notebooks.findById(req.params.id)

        // For Security
        if (!notebook) { return res.status(404).send("Not found") }

        notebook =await Notebooks.findByIdAndUpdate(req.params.id,{$set:newNotebook},{new:true})

        res.json(notebook)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }
})

// ROUTE :03[b] Bookmark the existing Notebook using : PUT ("./api/notebooks/updatenotebook") login required 
router.put('/addbookmark/:id',isToken, async (req,res)=>{
    try {
        // find the notebook to be updated and update it
        let notebook = await Notebooks.findById(req.params.id)
        // For Security
        if (!notebook) { return res.status(404).send("Not found") }
        
        notebook.bookmark = true;
        notebook =await Notebooks.findByIdAndUpdate(req.params.id,{$set:notebook},{new:true})

        res.json(notebook)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }
})

// ROUTE :03[c] removeBookmark the existing Notebook using : PUT ("./api/notebooks/updatenotebook") login required 
router.put('/removebookmark/:id',isToken, async (req,res)=>{
    try {
        // find the notebook to be updated and update it
        let notebook = await Notebooks.findById(req.params.id)
        // For Security
        if (!notebook) { return res.status(404).send("Not found") }
        
        notebook.bookmark = false;
        notebook =await Notebooks.findByIdAndUpdate(req.params.id,{$set:notebook},{new:true})

        res.json(notebook)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }
})

// ROUTE :04 Delete the existing Notebook using : PUT ("./api/notebooks/updatenotebook") login required 
router.delete('/deletenotebook/:id',isToken, async (req,res)=>{
    try {
        // find the notebook to be updated and update it
        let notebook = await Notebooks.findById(req.params.id)
        let note = await Notes.find({ notebook:req.params.id })
        if (note) { 
            note.map(async(e)=>{
            let a = e._id.toString()
            await Notes.findOneAndDelete(a)
        })
    }
        // For Security
        if (!notebook) { return res.status(404).send("Not found") }
        notebook =await Notebooks.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Your notebook is successfully deleted!!", "notebook": notebook })
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }
})

module.exports = router;