import Player from '../models/Player.js'

export const getAllPlayers = async (_req, res) => {
  const players = await Player.find()
  console.log('Get Players ->', players)
  return res.status(200).json(players)
}

// GET /players/:id
// Return a single player based on their ID
export const getSinglePlayer = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    const player = await Player.findById(id)
    return res.status(200).json(player)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'Player not found', errors: err })
  }
}

// POST /players
// Create a new player
export const createPlayer = async (req, res) => {
  console.log('current user ->', req,currentUser)
  try {
    console.log(req.currentUser._id)
    const playerWithOwner = { ...req.body, owner: req.currentUser._id }
    console.log('playerWithOwner', playerWithOwner)
    req.status(201).json(playerToAdd)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

// PUT /players/:id
// Update a player
export const updatePlayer = async (req, res) => {
  const { id } = req.params
  try {
    const playerToUpdate = await Player.findById(id)
    if (!playerToUpdate) throw new Error()
    if (!playerToUpdate.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    console.log(playerToUpdate)
    await playerToUpdate.update(req.body)
    return res.status(202).json(playerToUpdate)
  } catch (err) {
    console.log('Player not updated')
    console.log(err)
    return res.status(404).json(err)
  }
}

// DELETE /players/:id
// Delete a player from the collection
export const deletePlayer = async (req, res) => {
  const { id } = req.params
  try {
    const playerToDelete = await Player.findById(id)
    if (!playerToDelete) throw new Error('Player not found')
    if (!playerToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    await playerToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    console.log('Player has not been deleted')
    console.log(err)
    return res.status(404).json({ message: 'Player not found', errors: err.message })
  }
}