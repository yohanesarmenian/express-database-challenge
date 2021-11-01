const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

const User = require('../models/users.model')
// const Biodata = require('../models/biodata.model')
const History = require('../models/history.model')

const { APP_SECRET } = process.env;

const createToken = (id) => {
  return jwt.sign({ id }, 
    APP_SECRET, 
    { expiresIn: "7 days" }
  )}

const viewRegister = async (req, res, next) => {
   return res.render('register')
}

const viewLogin = (req, res) => {
    return res.render("login")
}

const viewDashboard = async (req, res) => {
    const users = await User.findAll()
    // const biodata = await Biodata.findAll() 
    
    return res.render("dashboard", {
        users})
}

// const viewBiodata = async (req, res) => {
//     const biodata = await Biodata.findAll() 

//     return res.render("biodata", {
//         biodata
//     })
// }
  
//   const createBiodata = async (req, res) => {
//     const { 
//         fullname, 
//         rank } = req.body
  
//     await Biodata.create({
//         fullname,
//         rank
//     })
  
//     return res.status(301).redirect('/dashboard')
//   }

const viewHistory = (req, res) => {
    return res.render("history");
} 

const createHistory = async (req, res) => {
    const { 
        totalplay, 
        win,
        draw,
        lose} = req.body
  
    await History.create({
        totalplay, 
        win,
        draw,
        lose
    })
  
    return res.status(301).redirect('/dashboard')
  }

const creatRegister = async (req, res, next) => {
    try {
        const {
            username,
            email,
            password
        } = req.body
    
        if (!email) {
            throw {
                message: 'email not valid !',
                code: 400,
                error: 'bad request'
            }
        }
    
        if (!password || password.lenght < 8) {
            throw {
                message: 'password not valid, must be 8 character !',
                code: 400,
                error: 'bad request'
            }
        }
        
        const isExist = await User.findOne({
            where: {
                email //email === email 
            }
        }) 
    
        if (isExist) {
            throw {
                message: 'user already exist',
                code: 400,
                error: 'conflict'
            }
        }
    
        const hashedPassword = bcrypt.hashSync(password, 12)
    
        await User.create({ //const user = 
            username,
            email,
            password: hashedPassword
        })
        
        // const token = await createToken(user.id)

        return res.status(301).redirect('/login')

        // const users = await User.findAll()
        
        // return res.render('dashboard', {
        //     users
        // })
        
        // return res.status(200).json({
        //     message: 'success create user !',
        //     data: user
        // })

    } catch (error) {
        next(error)
    }
}
    
const createLogin = async (req, res, next) => {
    try {
        const { 
            username,
            password } = req.body
            
        if (!username) {
        throw {
            message: `username must be valid`,
            code: 400,
            error: `bad request`,
        }
        }
    
        if (!password || password.length < 8) {
        throw {
            message: `password not valid, must be 8 character !`,
            code: 400,
            error: `bad request`,
        }
        }
    
        const isExist = await User.findOne({
        where: {
            username,
        },
        })
    
        if (!isExist) {
        throw {
            message: `User Not Found`,
            code: 404,
            error: `bad request`,
        }
        }
    
        const isMatch = await bcrypt.compare(password, isExist.password)
    
        if (!isMatch) {
        throw {
            message: `Wrong Password`,
            code: 404,
            error: `bad request`,
        };
        }
    
        const token = await createToken(isExist.id)
    
        return res.status(301).redirect('/dashboard')
    } catch (error) {
        next(error)
    }
}


module.exports = {
    viewRegister,
    creatRegister,
    viewLogin,
    viewDashboard,
    // viewBiodata,
    viewHistory,
    createLogin,
    // createBiodata,
    createHistory
}