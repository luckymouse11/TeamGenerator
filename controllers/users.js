import User from '../models/user.js'

export const getMyProfile = async (req, res) => {
  try {
    const user = await (await User.findById(req.currentUser._id)).populate('players')
    if (!user) throw new Error('User not found')
    return res.status(200).json(user)
  } catch (err) {
    console.log('Could not get user profile')
    console.log(err.message)
    return res.status(404).json({ message: err.message })
  }
}

export const getSingleUser = async (req, res) => {
  const { id } = req.params
  try {
    const singleProfile = await User.findById(id).populate('players')
    return res.status(200).json(singleProfile)
  } catch (err) {
    console.log('Could not find profile')
    console.log(err.message)
    return res.status(404).json({ message: err.message })
  }
}