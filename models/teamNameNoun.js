import mongoose from 'mongoose'

const teamNameNounSchema = new mongoose.Schema({
  noun: { type: String, required: true }
})

export default mongoose.model('TeamNameNoun', teamNameNounSchema)