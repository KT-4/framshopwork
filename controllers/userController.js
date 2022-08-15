const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const  mongoose = require('mongoose')


const userRegistration = async (req,res) => {
    const {firstname,lastname,email,password,password_confirmation} = req.body

    const user = await UserModel.findOne({email:email})
    if(user){
     res.send({"status":"failed","message":"Email already exists"})
    }else{
        if(firstname && lastname && email && password && password_confirmation){
            if(password === password_confirmation){
              try{
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password,salt)

               const doc = new UserModel({
                  firstname:firstname,
                  lastname:lastname,
                  email:email,
                  password:hashPassword
               })
               await doc.save()
              res.status(201).send({"status":"Success","message":"Register successfully..."})
              }catch(error){
                 console.log(error)
                 res.send({"status":"failed","message":"Unable to register..."})
              }
            }else{
               res.send({"status":"failed","message":"Password and Confirmation Password Dosn't match..."})
            }
        }else{
           res.send({"status":"failed","message":"All fields are required..."})
        }
    }
}

const userLogin = async (req,res) =>{
    try{
        const {email,password} = req.body

        if(email && password){
          const user = await UserModel.findOne({email:email})
          if(user != null){
            const isMatch = await bcrypt.compare(password,user.password)
            if((user.email === email) && isMatch){
               res.send({"status":"success","message":"Login SuccessFully..."})
            }else{
                res.send({"status":"failed","message":"Email or Password dosen't match"})
            }
          }else{
            res.send({"status":"failed","message":"User Not Registered..."})
          }
        }else{
            res.send({"status":"failed","message":"UserName and password are required..."})
        }
    }catch(error){
        res.send({"status":"failed","message":"Unable to failed..."})
    }
}

module.exports = {userRegistration,userLogin}