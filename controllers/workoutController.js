const workoutModel = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req,res) =>
{
    const user_id = req.user._id
    const workout = await workoutModel.find({user_id}).sort({createdAt : -1})
    res.status(200).json(workout)
}

// get a single workout

const getWorkout = async (req,res) =>
{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error : "No such id" })
    }

    const workout = await workoutModel.findById(id)

    if(!workout)
    {
        return res.status(404).json({msg : "Check your id"})
    }

    res.status(200).json(workout)
}

// create new workout

const createWorkout = async (req,res) =>
{
    const {title,load,reps} = req.body

    let emptyFields = []

    if(!title) {
      emptyFields.push('title')
    }
    if(!load) {
      emptyFields.push('load')
    }
    if(!reps) {
      emptyFields.push('reps')
    }
    if(emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try
    {
        const user_id = req.user._id
        const workout = await workoutModel.create({title,load,reps,user_id})
        res.status(200).json(workout)
    }catch(error)
    {
        res.status(400).json({msg : error.message})
    }
}
// delete a workout
const deleteWorkout = async (req,res) =>
{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error : "No such id" })
    }

    const workout = await workoutModel.findByIdAndDelete(id)

    if(!workout)
    {
        return res.status(404).json({msg : "Check your id"})
    }

    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req,res) =>
{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error : "No such id" })
    }

    const workout = await workoutModel.findByIdAndUpdate({_id : id},req.body,{new:true , runValidators: true})

    if(!workout)
    {
        return res.status(404).json({msg : "Check your id"})
    }

    res.status(200).json(workout)
}

module.exports = {getWorkouts,getWorkout,createWorkout,deleteWorkout,updateWorkout}