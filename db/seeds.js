import mongoose from 'mongoose'
import 'dotenv/config'

// Models
import Player from '../models/player.js'
import User from '../models/user.js'
import Loaction from '../models/location.js'
import teamNameAdjective from '../models/teamNameAdjective.js'
import teamNameNoun from '../models/teamNameNoun.js'

// Data
import userData from './data/users.js'
import playerData from './data/players.js'
import locationData from './data/locations.js'
import teamNameAdjectiveData from './data/teamNameAdjectives.js'
import teamNameNounData from './data/teamNameNouns.js'

// Seed database
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.dbURI)
    console.log('🚀🌏 Database connected')

    // Drop current database
    await mongoose.connection.db.dropDatabase()
    console.log('🔨 Database dropped')

    // Players
    await Player.create(playerData)

    // Team Name Adjetives
    await teamNameAdjective.create(teamNameAdjectiveData)

    // Team Name Nouns
    await teamNameNoun.create(teamNameNounData)

    // Location
    await Loaction.create(locationData)

    // Create users
    await User.create(userData)

    // Close connection to mongodb
    await mongoose.connection.close()
    console.log('👋🏽 Connection closed')
  } catch (err) {
    console.log('🚨 Something went wrong...')
    console.log(err)
    await mongoose.connection.close()
    console.log('👋🏽 Connection closed')
  }
}

seedDatabase()