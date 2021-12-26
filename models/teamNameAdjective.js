import mongoose from 'mongoose'

const teamNameAdjectiveSchema = new mongoose.Schema({
  adjective: { type: String, required: true }
})

export default mongoose.model('TeamNameAdjective', teamNameAdjectiveSchema)