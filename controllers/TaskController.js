const express = require('express');

const prisma = require("../prisma/client");

const { validationResult } = require('express-validator');

const getTasks = async (req, res) => {
    try {
        const tasks = await prisma.tugas.findMany();

        res.status(200).send({
            success: true,
            message: 'Get all tasks',
            data: tasks,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}

const getTasksById = async (req, res) => {
    try {
        const task = await prisma.tugas.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });

        if (!task) {
            return res.status(404).send({
                success: false,
                message: 'Task not found',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Get task by id',
            data: task,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}

const createTasks = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: 'Validation error',
            errors: errors.array(),
        });
    }

    try {
        const task = await prisma.tugas.create({
            data: {
                name: req.body.name,
                proyekId: parseInt(req.body.proyekId, 10),
                status: req.body.status,
                info: req.body.info,
                userId: parseInt(req.body.userId, 10),
            },
        });

        res.status(201).send({
            success: true,
            message: 'Task created',
            data: task,
        });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}

const updateTasks = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: 'Validation error',
            errors: errors.array(),
        });
    }

    try {

        const task = await prisma.tugas.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                name: req.body.name,
                proyekId: parseInt(req.body.proyekId, 10),
                status: req.body.status,
                info: req.body.info,
                userId: parseInt(req.body.userId, 10),
            },
        });

        res.status(200).send({
            success: true,
            message: 'Task updated',
            data: task,
        });
    }
    catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}

const deleteTasks = async (req, res) => {
    try {
        await prisma.tugas.delete({
            where: {
                id: Number(req.params.id),
            },
        });

        res.status(200).send({
            success: true,
            message: 'Task deleted',
        });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}

module.exports = { getTasks, getTasksById, createTasks, updateTasks, deleteTasks };