const express = require('express')

//import prisma client
const prisma = require("../prisma/client");

const { validationResult } = require('express-validator');

const getProjects = async (req, res) => {
    try {
        const projects = await prisma.proyek.findMany();

        res.status(200).send({
            success: true,
            message: 'Get all projects',
            data: projects,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
};

const getProjectsById = async (req, res) => {
    try {
        const project = await prisma.proyek.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });

        if (!project) {
            return res.status(404).send({
                success: false,
                message: 'Project not found',
            });

        }
        
        res.status(200).send({
            success: true,
            message: 'Get project by id',
            data: project,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
};

const createProjects = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: 'Validation error',
            errors: errors.array(),
        });
    }

    try {
        const project = await prisma.proyek.create({
            data: {
                name: req.body.name,
                status: req.body.status,
                info: req.body.info,
            },
        });

        res.status(201).send({
            success: true,
            message: 'Project created successfully',
            data: project,
        });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
};

const updateProjects = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: 'Validation error',
            errors: errors.array(),
        });
    }

    try {
        const project = await prisma.proyek.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                name: req.body.name,
                status: req.body.status,
                info: req.body.info,
            },
        });

        res.status(200).send({
            success: true,
            message: 'Project updated successfully',
            data: project,
        });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
};

const deleteProjects = async (req, res) => {
    try {
        await prisma.proyek.delete({
            where: {
                id: Number(req.params.id),
            },
        });

        res.status(200).send({
            success: true,
            message: 'Project deleted successfully',
        });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}

module.exports = { getProjects, getProjectsById, createProjects, updateProjects, deleteProjects };