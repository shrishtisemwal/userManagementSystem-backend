const bcrypt = require('bcrypt');
const UserManager = require('../data/managers/users');

/**
 * Create a new user
 */
module.exports.createUserProfile = async (req, res) => {
    try {
        if (!req.body.payload) {
            return res.status(406).json({ success: false, message: 'Request data missing!' });
        }

        let params = req.body.payload;

        if(!params.email || !params.first_name || !params.password) {
            return res.status(406).json({ success: false, message: 'Request data missing!' });
        }

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
        await UserManager.createUserProfile(payload);

        res.status(200).json({ success: true, message: 'User Profile created successfully' });
    } catch (error) {
        res.status(406).json({ success: false, message: error.message });
    }
};

//Update user
module.exports.updateUserProfile = async (req, res) => {
    try {
        if (!req.body.payload) {
            return res.status(406).json({ success: false, message: 'Request data missing!' });
        }

        let params = req.body.payload;

        if (!params.id) {
            return res.status(406).json({ success: false, message: 'User ID is data required' });
        }

        const existingUser = await UserManager.getUserDetails({ _id: params.id });
        if (!existingUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        let payload = {
            first_name: params.first_name ? params.first_name : existingUser.first_name,
            last_name: params.last_name ? params.last_name : existingUser.last_name,
            is_active: params.is_active ? params.is_active : existingUser.is_active
        }

        await UserManager.updateUserDetails({ _id: params.id }, payload);

        res.status(200).json({ success: true, message: 'User Profile updated successfully' });
    } catch (error) {
        res.status(406).json({ success: false, message: error.message });
    }
};

// ==================== DELETE USER ====================
module.exports.deleteUserProfile = async (req, res) => {
    try {
        if (!req.body.payload) {
            return res.status(406).json({ success: false, message: 'Request data missing!' });
        }

        let params = req.body.payload;

        if (!params.id) {
            return res.status(406).json({ success: false, message: 'User ID is data required' });
        }

        const existingUser = await UserManager.getUserDetails({ _id: params.id });
        if (!existingUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        await UserManager.deleteUser({ _id: params.id });

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// ==================== LIST USERS ====================
module.exports.getUserList = async (req, res) => {
    try {


        let userList = await UserManager.getUserList({});

        res.status(200).json({ success: true, userList });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// ==================== GET USER DETAIL ====================
module.exports.getUserDetail = async (req, res) => {
    try {
        if (!req.query.payload) {
            return res.status(406).json({ success: false, message: 'Request data missing!' });
        }

        let params = req.query.payload ? JSON.parse(req.query.payload) : {};

        if (!params.id) {
            return res.status(406).json({ success: false, message: 'User ID is data required' });
        }

        const existingUser = await UserManager.getUserDetails({ _id: params.id });
        if (!existingUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: existingUser });
    } catch (error) {
        res.status(406).json({ success: false, message: error.message });
    }
};

// ==================== LOGIN USER ====================
module.exports.loginUser = async (req, res) => {
    try {
        if (!req.body.payload) {
            return res.status(406).json({ success: false, message: 'Request data missing' });
        }

        let params = req.body.payload;

        if (!params.email || !params.password) {
            return res.status(406).json({ success: false, message: 'Email and password required' });
        }

        const user = await UserManager.getUserDetails({ email: params.email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not registered with the given email' });
        }

       const passwordHash = bcrypt.hashSync(params.password, user.salt);
        if (passwordHash !== user.password) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        if (!user.is_active) {
            return res.status(403).json({ success: false, message: 'Account is deactivated' });
        }

        res.status(200).json({success: true, message: 'Login successful'});
    } catch (error) {
        res.status(406).json({ success: false, message: error.message });
    }
};
