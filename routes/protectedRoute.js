
const express = require('express');
const { checkRole } = require('../middlewares/roleMiddleware');  
const router = express.Router();


router.get('/admin-only', checkRole('admin'), (req, res) => {
    res.status(200).json({ message: 'Welcome Admin' });
});


router.get('/company-only', checkRole('company'), (req, res) => {
    res.status(200).json({ message: 'Welcome Company' });
});

module.exports = router;
