const express = require('express');
const { createJob, getJobs, getJob, updateJob, deleteJob, getJobStats } = require('../controllers/job.controller');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/', auth, createJob);
router.get('/', auth, getJobs);
router.get('/stats', auth, getJobStats); 
router.get('/:id', auth, getJob);
router.patch('/:id', auth, updateJob);
router.delete('/:id', auth, deleteJob);

module.exports = router;
