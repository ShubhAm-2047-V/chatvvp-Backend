const express = require('express');
const router = express.Router();
const { 
  searchNotes, 
  explainNote, 
  aiChat, 
  getYoutubeVideos,
  getStudentHistory 
} = require('../controllers/studentController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// All student routes are protected and restricted to students
router.use(protect);
router.use(authorize('student'));

// @route   GET /api/student/search
router.get('/search', searchNotes);

// @route   GET /api/student/youtube
router.get('/youtube', getYoutubeVideos);

// @route   POST /api/student/explain
router.post('/explain', explainNote);

// @route   POST /api/student/chat
router.post('/chat', aiChat);

// @route   GET /api/student/history
router.get('/history', getStudentHistory);

module.exports = router;
