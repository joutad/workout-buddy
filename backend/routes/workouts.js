const express = require('express')
const Workout = require('../models/workoutModel')
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController')

const router = express.Router()

//GET all workouts
router.get('/', getWorkouts)

//GET a single workout
router.get('/:id', getWorkout)

//POST a single workout
router.post('/', createWorkout)

//DELETE a single workout
router.delete('/:id', deleteWorkout)

//UPDATE a single workout
router.patch('/:id', updateWorkout)

router.get('/hello', () => {})

module.exports = router