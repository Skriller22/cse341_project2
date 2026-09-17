const {ObjectId} = require('mongodb');

const validateId = (req, res, next) => {
    const itemId = req.params.id;
    if (!ObjectId.isValid(itemId)) {
        return res.status(400).json({ error: 'Invalid item ID.' });
    }
    next();
};

const validateBody = (rules, { required = true } = {}) =>
    (req, res, next) => {
        for (const [field, rule] of Object.entries(rules)) {
            const value = req.body[field];

            if (required && value === undefined) {
                return res.status(400).json({
                    error: `${field} is required.`
                });
            }

            if (value === undefined) continue;

            if (rule.type && typeof value !== rule.type) {
                return res.status(400).json({
                    error: `${field} must be a ${rule.type}.`
                });
            }

            if (rule.pattern && !rule.pattern.test(value)) {
                return res.status(400).json({
                    error: `${field} has an invalid format.`
                });
            }

            if (rule.min !== undefined && value < rule.min) {
                return res.status(400).json({
                    error: `${field} must be at least ${rule.min}.`
                });
            }
        }

        next();
    };

module.exports = {
    validateId,
    validateBody
};