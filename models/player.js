import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  favouriteTeam: { type: String, required: true },
  position: { type: String, required: true },
  fitness: { type: Number, required: true },
  rating: { type: Number, required: true }
})

export default mongoose.model('Player', playerSchema)