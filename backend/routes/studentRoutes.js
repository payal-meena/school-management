import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();

// Create a new student
router.post('/', async (req,res) => {
    try {
        const student = new Student(req.body);
        const saved = await student.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: error.message });
    }
});

// Read All Students
router.get('/', async (req,res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: error.message});
    }
});

// Read Single Student
router.get('/:id', async (req,res) => {
    try {
        const student = await Student.findById(req.params.id);
        if(!student) {
            return res.status(404).json({ message: 'Student not found!'});
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Update Student
router.put('/:id', async (req,res) => {
    try {
        const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true });
        if(!updated) {
            return res.status(404).json({ message: 'Student not found! '});
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Student
router.delete('/:id', async (req,res) => {
    try {
        const deleted = await Student.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Student not found!'});
        }
        res.status(200).json({ message: 'Student deleted successfully!'});
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
})

export default router;