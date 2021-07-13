const express = require("express");
const router = express.Router();

const Meeting = require('../../models/Meeting')

router.post('/create',(req,res)=>{
    const {}
    var newMeet = {mid:id}
    const Meet = new Meeting(newMeet)
    Meet.save().then(()=>{
        // res.redirect(linkpass); link pass krna hoga
    })

})
router.post('/create',(req,res)=>{
    const {m}
})

// router.get(/meeting)