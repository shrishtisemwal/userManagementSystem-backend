const bcrypt = require('bcrypt');
const UserManager = require('../data/managers/users');

/**
 * Create a new user
 */
module.exports.createUserProfile = async (req, res) => {
    try {
        console.log("req", req.body);
        if (!req.body.payload) {
            return res.status(406).json({ success: false, message: 'Request data missing!' });
        }


        let params = req.body.payload;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(params.email)) {
            return res.status(422).json({ success: false, message: 'Invalid email format.' });
        }

        const existingUser = await UserManager.getUserDetails({ email: params.email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Email already exists' });
        }

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(params.password, salt);

        const payload = {
            first_name: params.first_name?.trim(),
            last_name: params.last_name,
            email: params.email?.toLowerCase(),
            salt: salt,
            password: passwordHash,
            is_active: true
        };
        // Create user via manager
        await UserManager.createUserProfile(payload);

        res.status(201).json({ success: true, message: 'User Profile created successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
