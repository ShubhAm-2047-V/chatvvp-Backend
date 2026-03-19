const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadNote } = require('../controllers/teacherController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// Multer using memory storage for Cloudinary streaming
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDFs are allowed'), false);
    }
  }
});

// @route   POST /api/teacher/upload-note
// @access  Private (Teacher)
router.post(
  '/upload-note',
  protect,
  authorize('teacher'),
  upload.single('file'),
  uploadNote
);

// @route   POST /api/teacher/text-note
// @access  Private (Teacher)
router.post(
  '/text-note',
  protect,
  authorize('teacher'),
  require('../controllers/teacherController').createTextNote
);

// @route   GET /api/teacher/my-notes
// @access  Private (Teacher)
router.get(
  '/my-notes',
  protect,
  authorize('teacher'),
  require('../controllers/teacherController').getMyNotes
);

// @route   DELETE /api/teacher/my-notes/:id
// @access  Private (Teacher)
router.delete(
  '/my-notes/:id',
  protect,
  authorize('teacher'),
  require('../controllers/teacherController').deleteMyNote
);

module.exports = router;
