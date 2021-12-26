import express from 'express'
import { getAllPlayers, getSinglePlayer, createPlayer, updatePlayer, deletePlayer } from '../controllers/players.js'
import { getSingleUser } from '../controllers/users.js'
import { registerUser, loginUser } from '../controllers/auth.js'
import { secureRoute } from './secureRoute.js'
import { getAllLocations, getSingleLocation, createLocation, updateLocation, deleteLocation } from '../controllers/locations.js'
const router = express.Router()

router.route('/players')
  .get(getAllPlayers)
  .post(secureRoute, createPlayer)

router.route('/players/:id')
  .get(getSinglePlayer)
  .put(secureRoute, updatePlayer)
  .delete(secureRoute, deletePlayer)

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

router.route('/users/:id')
  .get(getSingleUser)

router.route('/locations')
  .get(getAllLocations)
  .post(secureRoute, createLocation)

router.route('/locations/:id')
  .get(getSingleLocation)
  .put(secureRoute, updateLocation)
  .delete(secureRoute, deleteLocation)

export default router