import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  street: { type: String, required: true },
  town: { type: String, required: true },
  postcode: {type: String, required: true },
  gmap: { type: String, required: true }
})

export default mongoose.model('Location', locationSchema)