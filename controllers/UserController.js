const prisma = require("../prisma/client");
const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        res.status(200).send({
            success: true,
            message: 'Get all users',
            data: users,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}

const updateUsers = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: 'Validation error',
            errors: errors.array(),
        });
    }

    try {
        const updateData = {
            name: req.body.name,
            email: req.body.email,
        };

        if (req.file) {
            updateData.photo = req.file.filename;
        }

        const user = await prisma.user.update({
            where: {
                id: Number(req.params.id),
            },
            data: updateData,
        });

        res.status(200).send({
            success: true,
            message: 'Update user successfully',
            data: user,
        });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}

const deleteUsers = async (req, res) => {
    try {
        // Step 1: Find the user by ID
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        // Step 2: Delete the photo from the file system if it exists
        if (user.photo) {
            const photoPath = path.join(__dirname, '../uploads', user.photo);
            fs.unlink(photoPath, (err) => {
                if (err) {
                    console.error('Failed to delete photo:', err);
                }
            });
        }

        // Step 3: Delete the user from the database
        await prisma.user.delete({
            where: {
                id: Number(req.params.id),
            },
        });

        res.status(200).send({
            success: true,
            message: 'User and photo deleted successfully',
        });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
};

module.exports = { getUsers, updateUsers, deleteUsers };