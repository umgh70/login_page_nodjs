const express = require('express')
const router = express.Router()
const User = require('./../models/user')
const {check, validationResult}=require('express-validator')
//let users= require('./../users')


 // //query
// router.get('/', (req,res)=>{
//     res.send('Hello world!')
//     console.log(req.query)
// })
// //params
// router.get('/:username', (req,res)=>{
//     res.send('Hello world!')
//     console.log(req.params)
// })

//restfulAPI(get)
// router.get('/',(req,res)=>{
//     res.status(200).json({
//        data : users ,
//        success : true  
//     })
// })

router.get('/',async(req,res)=>{
    let users = await   User.find({})
    res.render('users',{msg : "users", users: users})
})

////params
router.get('/:id', async(req,res)=>{
    let user = await User.findOne({_id:req.params.id})
    // let user = users.find( user =>{
    //     if(user.id == req.params.id)
    //         return user
    // })
    // res.status(200).json({
    //     data : user ,
    //     success : true  
    //  })
    return res.render('user', {user:user})
})

//restfulAPI(post)
router.post('/',
    [
        check("email",'email is incorrect').isEmail(),
        check("password",'pass must be has 5 charecter at least').isLength({min:5})
    ],
    async (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
           // return res.status(422).json({errors: errors.array()})
            return res.redirect('/user')
        }

        console.log(req.body);
        let newUser =new User({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password:req.body.password
        })
        await newUser.save()
        //users.push(req.body)
        return res.redirect('/user')
        // res.status(200).json({
        //     data : "user was added successfuly" ,
        //     success : true  
        // })
})

//restfulAPI(put)
router.put('/:id',async(req,res)=>{
    await User.updateMany({_id:req.params.id},{$set:req.body})
    // users = users.map(user=>{
    //     if(user.id == req.params.id){
    //         return req.body
    //     }
    //     else{
    //         return use r
    //     }
    // })
    // res.status(200).json({
    //     data : "user was updated successfuly" ,
    //     success : true  
    // })
    return res.redirect('/user')
})

//restfulAPI(put)
router.delete('/:id',async (req,res)=>{
    await User.deleteOne({_id:req.params.id})
    // users = users.filter(user=>{
    //     if(user.id != req.params.id){
    //         return user
    //     }
    // })
    // res.status(200).json({
    //     data : "user was deleted successfuly" ,
    //     success : true  
    // })
    //console.log(users);
    return res.redirect('/user')
})

module.exports = router