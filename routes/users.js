const router = require("express").Router()
const Users = require('../Users/users')

//Get Register
router.get('/register', (req, res)=> {res.render('register')})

//Get Login
router.get('/login', (req, res)=>{res.render('login')})

router.post('/register', (req, res) => {
    const { email, password, password2} = req.body
    let errors = []

    //Check required field
    if(!email || !password || !password2){
        errors.push({msg: 'Please fill in all field'})
    }

    //Check password match
    if(password !== password2){
        errors.push({msg: 'Passwords do not match'})
    }

    //Check password to be atleast six characters
    if(password.length < 6){
        errors.push({msg: 'Password must be at least six characters'})
    }

    if(errors.length > 0){
        res.render('register', {
            errors,
            email,
            password,
            password2
        })

    }else{
        res.redirect('/dashboard')
    }
})

module.exports = router