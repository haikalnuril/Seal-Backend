//import express validator
const { body } = require('express-validator');

const validateTask = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 255 }).withMessage('Name must not exceed 255 characters'),
    
    body('status')
        .optional()
        .isIn(['pending', 'in-progress', 'completed'])
        .withMessage('Invalid status'),
    
    body('info')
        .notEmpty().withMessage('Info is required')
        .isLength({ min: 10 }).withMessage('Info must be at least 10 characters long'),
    
    body('userId')
        .isInt().withMessage('User ID must be an integer'),
    
    body('proyekId')
        .isInt().withMessage('Project ID must be an integer'),
];

module.exports = { validateTask };
