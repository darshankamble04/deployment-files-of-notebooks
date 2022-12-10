const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");
const { containeranalysis_v1alpha1 } = require("googleapis");
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'notebooks.darshankamble@gmail.com',
      pass: process.env.PASSWORD
    }
  });

// ROUTE:01 [A] user createuser using : POST ('/api/auth/createuser') with email verification
router.post('/createuser',
    [
        body('email', 'Please Enter A Valid Email').isEmail()
    ],
    async (req, res) => {
        console.log(process.env.PASSWORD)
        // Any errors return Bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Cheack weather the user with this email exists already
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ error: "User With This Email Is Already Exits!" })
            };

            const salt = await bcrypt.genSalt(10);
            const seqpassword = await bcrypt.hash(req.body.password, salt)
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: seqpassword,
                auth: false
            });
            const payload = ({
                user: {
                    email: user.email,
                    id: user.id
                }
            })

            const secret = process.env.UNIQUE_KEY + user.password;
            const token = jwt.sign(payload, secret, { expiresIn: '15m' });
            const link = `http://${req.headers.host}${req.baseUrl}/verifyuser/${user.id}/${token}`

            const mailOptions = {
              from: 'notebooks.darshankamble@gmail.com',
              to: user.email,
              subject: 'Notes Yard : Account Activation',
              text: 'Veryfy your account :',
              html: `<p>Hii User!
                        <br>
                        <br>
                            You registered an account on <a style="color:blue;" href='https://notebooks-darshankamble.herokuapp.com/' >notebooks</a>, before being able to use your account you need to verify that this is your email address by  <a style="color:blue;" href='${link}' >clicking here</a>
                        <br>
                        <br>
                        Kind Regards,<br>
                        Darshan Kamble
                    </p>`,
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
                res.send({ success: false, msg: 'Some error occured' })
              } else {
                console.log('Email sent: ' + info.response);
                res.send({ success: true, msg: 'link has been send successfully!' })
              }
            });

        } catch (error) {
            res.status(500).send("Internal server error!")
        }
    })

// 01 [A] verify email && make authentication true  
router.get('/verifyuser/:id/:token', async (req, res) => {
    const { id, token } = req.params
    try {
        let user = await User.findOne({ _id: req.params.id })
        const secret = process.env.UNIQUE_KEY + user.password;
        const data = jwt.verify(token, secret);
        user.auth = true
        await User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true })

        res.render('conformation')

    } catch (error) {
        res.render('onerror')
    }
})

// CONTACT US 
router.post('/contactus', async (req, res) => {

        try {
            // Cheack weather the user with this email exists already
            let user = await User.findOne({ email: req.body.email })
            if (!user) {
                return res.status(400).json({ error: "Invalid Email Id!" })
            };
            const mailOptions = {
              from: 'notebooks.darshankamble@gmail.com',
              to: 'darshankamble7371@gmail.com',
              subject: `${req.body.title}`,
              text: '',
              html: `<p>Hii i'am ${req.body.name} my email id is ${req.body.email}
                    <br>
                    <br>
                    ${req.body.description}
                    <br>
                    <br>
                    From ,<br>
                    Contact us
                    </p>`,
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
                res.send({ error: 'Some error occured' })
              } else {
                console.log('Email sent: ' + info.response);
                res.send({ success: true, msg: 'Your Response has been send successfully!' })
              }
            });

        } catch (error) {
            console.log(error)
            res.status(500).send("Internal server error!")
        }
    })


// ROUTE:01 [B] user createuser using : POST ('/api/auth/createuserbyemail')  without email verification
router.post('/createuserbyemail', async (req, res) => {

    try {
        // Cheack weather the user with this email exists already
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "user with this email is already exits!" })
        };

        const salt = await bcrypt.genSalt(10);
        const seqpassword = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: seqpassword,
            auth: true
        });
        const payload = await ({
            user: {
                email: user.email,
                id: user.id
            }
        })
        const secret = process.env.UNIQUE_KEY
        const token = await jwt.sign(payload, secret);
        res.send({ auth: true, token })
        // FUNC TO SEND EMAIL :

          
          const mailOptions = {
              from: 'NO REPLY📧 <notebooks.darshankamble@gmail.com>',
            to: user.email,
            subject: 'Notes Yard : Account Created',
            text: '',
            html: `<p>Hii User!
                <br>
                <h1>Welcome to Notes Yard</h1>
                <h4>Experience the beautifully simple note-taking app on the web today.</h4>
                <br>
                <br>
                We're glad you're here! 
                You are successfully created an account on && notes yard &&,build your first notebook on the cloud which access from anywhere.<br>
                We don't sell your info. We don't do ads. Our business model ensures our ability to act in your best interest while storing and securing your data.
                <br>
                <br>
                Kind Regards,<br>
                Darshan Kamble
                </p>`,
            };
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
                res.send({ success: false, msg: 'Some error occured' })
              } else {
                console.log('Email sent: ' + info.response);
                res.send({ success: true, msg: 'link has been send successfully!' })
              }
            });

    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }
})


// ROUTE:02 user login using : POST ('/api/auth/login')
router.post('/login', [
    body('email', 'Please Enter A Valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    // Any errors return Bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body
    try {
        // Cheack weather the user with this email exists
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Please enter a valid credentials!" })
        };

        const passCompare = await bcrypt.compare(password, user.password)
        if (!passCompare) {
            return res.status(400).json({ error: "Please enter valid credentials" });
        }
        if (!user.auth) {
            return res.send({ notAuth: true , msg: 'Please Verify Your Email Id ' })
        };
        console.log({ login: true, use1r: user })
        const payload = await ({
            id: user.id
        })
        const token = await jwt.sign(payload, process.env.UNIQUE_KEY);
        console.log(token)
        res.send({ auth: true, token })
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }
})


// ROUTE:02 user login using : POST ('/api/auth/login')
router.post('/resetpassword', async (req, res) => {

    const { email, newpassword, password } = req.body
    try {
        if(email==="test99@gmail.com"){
            res.send({ success: false, msg: "You can't reset password of test user " })

        }

        // Cheack weather the user with this email exists
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({success: false, error: "Please Enter A Valid Credentials!" })
        };
        if (user.password === newpassword) {
            return res.status(400).json({success: false, error: "Please Enter A New Password!" })
        };

        const passCompare = await bcrypt.compare(password, user.password)
        if (!passCompare) {
            return res.status(400).json({success: false, error: "Please enter valid credentials" });
        }

        console.log({ login: true, user: user })
        const payload = await ({
            email: user.email,
            id: user.id,
            newpassword: newpassword
        })
        const secret = process.env.UNIQUE_KEY + user.email + user.password;
        const token = await jwt.sign(payload, secret, { expiresIn: '10m' });
        const link = `http://localhost:5000/api/auth/resetpassword/${user.id}/${token}`
        const mailOptions = {
            from: 'notebooks.darshankamble@gmail.com',
            to: user.email,
            subject: 'Notes Yard : Reset Password ',
            text: 'Reset Password :',
            html: `<p>Hii User!
                  <br>
                  <br>
                  Reset your password? If you requested a password reset for your Notes Yard account, use the confirmation  <a style="color:blue;" href='${link}' >clicking here</a> to complete the process. If you didn't make this request, ignore this email.
                  <br>
                  <br>
                  Kind Regards,<br>
                  Darshan Kamble
                  </p>`,
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              res.send({ success: false, msg: 'Some Error Occured' })
            } else {
              console.log('Email sent: ' + info.response);
              res.send({ success: true, msg: 'link has been send successfully!' })
            }
          });
        // res.send({ success: true, msg: 'link has been send successfully!' })

    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }
})

router.get('/resetpassword/:id/:token', async (req, res) => {
    const { token } = req.params;
    try {
        let user = await User.findOne({ _id: req.params.id })
        const secret = process.env.UNIQUE_KEY + user.email + user.password;
        const data = jwt.verify(token, secret);
        if (!req.params.id === data.id) {
            res.status(400).send("This is not a valid link!")
        }
        const salt = await bcrypt.genSalt(10);
        const seqpassword = await bcrypt.hash(data.newpassword, salt)
        user.password = seqpassword
        await User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true })

        res.render('conformation')
        
    } catch (error) {
        res.render('onerror')
    }
})

// ROUTE:02 user login using : POST ('/api/auth/login')
router.post('/forgotpassword', async (req, res) => {

    const { email, newpassword } = req.body
    try {
        if(email==="test99@gmail.com"){
            res.send({ success: false, msg: "You can't change password of test user " })

        }
        // Cheack weather the user with this email exists
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({success: false, msg: "Please Enter A Valid Credentials!" })
        };

        console.log({ login: true, use1r: user })
        const payload = await ({
            email: user.email,
            id: user.id,
            newpassword: newpassword
        })
        const secret = process.env.UNIQUE_KEY + user.email;
        const token = await jwt.sign(payload, secret, { expiresIn: '5m' });
        const link = `http://localhost:5000/api/auth/forgotpassword/${user.id}/${token}`
        // FUNC TO SEND EMAIL :
        const mailOptions = {
            from: 'NO REPLY📧 <notebooks.darshankamble@gmail.com>',
            to: user.email,
            subject: 'Notes Yard : Forgot Password Request',
            text: '',
            html: `<p>Hii User!
        <br>
        <br>
        Forgot your password?
        If you requested a password reset for your Notes Yard account, use the confirmation <a style="color:red;" href='${link}' >link</a> to complete the process. If you didn't make this request, ignore this email.
        <br>
        <br>
        Kind Regards,<br>
        Darshan Kamble
        </p>`,
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              res.send({ success: false, msg: 'Some Error Occured' })
            } else {
              res.send({ success: true, msg: 'link has been send successfully!' })
            }
          });
        // res.send({ success: true, msg: 'link has been send on your gmail account' })
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }
})


router.get('/forgotpassword/:id/:token', async (req, res) => {
    const { token } = req.params;
    try {
        let user = await User.findOne({ _id: req.params.id })
        const secret = process.env.UNIQUE_KEY + user.email;
        const data = jwt.verify(token, secret);
        if (!req.params.id === data.id) {
            res.status(400).send("This is not a valid link!")
        }
        const salt = await bcrypt.genSalt(10);
        const seqpassword = await bcrypt.hash(data.newpassword, salt)
        user.password = seqpassword
        await User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true })

        res.render('conformation')
        
    } catch (error) {
        res.render('onerror')
    }
})


// ROUTE:03 user login using : POST ('/api/auth/getuser')
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }
})


// ROUTE :05 TO UPDATE NOTEBOOK-COVER-URL ARRAY

router.get('/getncu',fetchuser, async (req, res) => {

    try {
        // Cheack weather the user with this email exists
        const userId = req.user.id;
        let user = await User.findById(userId).select("notebookcoverurl")
        res.send(user)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }
})

// ROUTE :05 TO UPDATE NOTEBOOK-COVER-URL ARRAY

router.put('/addncu',fetchuser, async (req, res) => {

    try {
        // Cheack weather the user with this email exists
        const userId = req.user.id;
        let user = await User.findById(userId).select("notebookcoverurl")
        user.notebookcoverurl.unshift(req.body.notebookcoverurl)
        user =await User.findByIdAndUpdate(userId,{$set:user},{new:true})
        console.log(user)
        // res.send({ success:true, notebookcoverurl:user.notebookcoverurl })
        
        res.send(user)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }
})


module.exports = router;