import User from '../models/user.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

// check username, validatePassword

export const registerUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    console.log(newUser)
    return res.status(202).json({ message: `Welcome ${newUser.username}` })
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

export const loginUser = async (req, res) => {
  // console.log(process.env.secret)
  try {
    const userToLogin = await User.findOne({ email: req.body.email })
    console.log('User to login ->', userToLogin)
    console.log('Password is a match: ', userToLogin.validatePassword(req.body.password))
    if (!userToLogin || !userToLogin.validatePassword(req.body.password)){
      throw new Error()
    }
    const token = jwt.sign({ sub: userToLogin._id }, process.env.secret, { expiresIn: '7 days' })
    // console.log('TOKEN ->', token)
    return res.status(200).json({
      message: `Welcome back ${userToLogin.username}`,
      token
    })
  } catch (err) {
    console.log(err)
    return res.status(422).json({ message: 'Unauthorised' })
  }
}