import Location from '../models/location.js'

export const getAllLocations = async (req, res) => {
  const locations = await Location.find()
  console.log('Get Locations ->', locations)
  return res.status(200).json(locations)
}

// GET /locations/:id
// Return a location location based on it's ID
export const getSingleLocation = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    const location = await Location.findById(id)
    return res.status(200).json(location)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'Location not found', errors: err })
  }
}

// POST /locations
// Create a new location
export const createLocation = async (req, res) => {
  console.log('current user ->', req,currentUser)
  try {
    console.log(req.currentUser._id)
    const locationWithOwner = { ...req.body, owner: req.currentUser._id }
    console.log('locationWithOwner', locationWithOwner)
    req.status(201).json(locationToAdd)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

// PUT /locations/:id
// Update a location
export const updateLocation = async (req, res) => {
  const { id } = req.params
  try {
    const locationToUpdate = await Location.findById(id)
    if (!locationToUpdate) throw new Error()
    if (!locationToUpdate.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    console.log(locationToUpdate)
    await locationToUpdate.update(req.body)
    return res.status(202).json(locationToUpdate)
  } catch (err) {
    console.log('Location not updated')
    console.log(err)
    return res.status(404).json(err)
  }
}

// DELETE /locations/:id
// Delete a location from the collection
export const deleteLocation = async (req, res) => {
  const { id } = req.params
  try {
    const locationToDelete = await Location.findById(id)
    if (!locationToDelete) throw new Error('Location not found')
    if (!locationToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    await locationToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    console.log('Location has not been deleted')
    console.log(err)
    return res.status(404).json({ message: 'Location not found', errors: err.message })
  }
}