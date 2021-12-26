import jwt from 'jsonwebtoken'
import 'dotenv/config'
import User from '../models/user.js'

// dotenv.config()

export const secureRoute = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error('Missing headers')
    // console.log(req.headers.authorization)
    const token = req.headers.authorization.replace('Bearer ', '')
    // console.log('Token ->', token)
    const payload = jwt.verify(token, process.env.secret)
    // console.log('jwt verified')
    const userToVerify = await User.findById(payload.sub)
    // console.log('user found by id')
    if (!userToVerify) throw new Error('User not found')
    console.log('there is a user with this id')
    req.currentUser = userToVerify
    // console.log('the current user is the same as user to verify')
    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'Unauthorised' })
  }
}