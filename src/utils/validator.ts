import {body} from 'express-validator';

export const validateRegisterDroneInput = [
    body('model').notEmpty().withMessage("Model is required")
    .isIn(['Lightweight','Middleweight','Cruiserweight','Heavyweight']),
    body('weightLimit').notEmpty().withMessage("Weight is required")
    .isInt().withMessage('Weight must be an integer')
    .toInt()
    .isInt({ max: 500 }).withMessage('Weight must be less than or equal to 500kg'),
    body('batteryCapacityLevel').notEmpty().withMessage("Battery Capacity Level is required")
    .isInt().withMessage('Battery Capacity Level must be an integer')
    .toInt()
    .isInt({ max: 100 }).withMessage('Battery Capacity Level must be less than or equal to 100%'),
]

export const validateLoadDroneInput = [
    body('name').notEmpty().withMessage("Model is required")
    .matches(/^[a-zA-Z0-9_-]+$/).withMessage('Name must contain only letters, numbers, _ and -'),
    body('weight').notEmpty().withMessage("Weight is required")
    .isInt().withMessage('Weight must be an integer'),
    body('code').notEmpty().withMessage("Code is required")
    .matches(/^[A-Z0-9_]+$/).withMessage('Name must contain Upper case letters, numbers and underscores'),
]