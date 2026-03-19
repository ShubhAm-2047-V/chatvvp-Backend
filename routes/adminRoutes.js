const express = require('express');
const router = express.Router();
const multer = require('multer');
const { 
  uploadUsersExcel, 
  createManualUser, 
  getAddedTeachers, 
  toggleBlockUser, 
  updateUser, 
  deleteUser 
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// Multer storage in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @route   POST /api/admin/upload-excel
// @access  Private/Admin
router.post(
  '/upload-excel',
  protect,
  authorize('admin'),
  upload.single('file'),
  uploadUsersExcel
);

// @route   POST /api/admin/create-user
// @access  Private/Admin
router.post(
  '/create-user',
  protect,
  authorize('admin'),
  createManualUser
);

// @route   GET /api/admin/added-teachers
// @access  Private/Admin
router.get(
  '/added-teachers',
  protect,
  authorize('admin'),
  getAddedTeachers
);

// @route   PATCH /api/admin/toggle-block/:id
// @access  Private/Admin
router.patch(
  '/toggle-block/:id',
  protect,
  authorize('admin'),
  toggleBlockUser
);

// @route   PUT /api/admin/update-user/:id
// @access  Private/Admin
router.put(
  '/update-user/:id',
  protect,
  authorize('admin'),
  updateUser
);

// @route   DELETE /api/admin/delete-user/:id
// @access  Private/Admin
router.delete(
  '/delete-user/:id',
  protect,
  authorize('admin'),
  deleteUser
);

module.exports = router;
