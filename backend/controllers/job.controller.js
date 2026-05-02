const { Job } = require('../models/job.model');
const { validateJob, validateUpdateJob } = require('../validations/job.validation');
const mongoose = require('mongoose');
const createJob = async (req, res) => {
    const { error } = validateJob(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    try {
        const job = new Job({
            ...req.body,
            user: req.user.id
        });

        const result = await job.save();
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ user: req.user.id });
        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const getJob = async (req, res) => {
    try {
        const job = await Job.findOne({ _id: req.params.id, user: req.user.id });
        if (!job) {
            return res.status(404).send({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const getJobStats = async (req, res) => {
    try {
        // Convertir l'ID utilisateur en ObjectId si nécessaire
        const userId = new mongoose.Types.ObjectId(req.user.id);
        
        const stats = await Job.aggregate([
            // Filtrer les jobs par l'utilisateur actuel
            { $match: { user: userId } },
            // Grouper les jobs par statut et compter
            { 
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            },
            // Projeter les résultats pour un format plus propre
            { 
                $project: {
                    status: '$_id',
                    count: 1,
                    _id: 0
                }
            }
        ]);

        // Initialiser les comptes à zéro pour chaque statut
        const statsMap = {
            pending: 0,
            interview: 0,
            declined: 0
        };

        // Remplir les comptes avec les résultats de l'agrégation
        stats.forEach(stat => {
            if (statsMap.hasOwnProperty(stat.status)) {
                statsMap[stat.status] = stat.count;
            }
        });

        // Debug : afficher les statistiques dans la console
        console.log('Job Stats:', statsMap);
        console.log('Raw aggregation result:', stats);

        res.status(200).json(statsMap);
    } catch (error) {
        console.error('Error in getJobStats:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const updateJob = async (req, res) => {
    const { error } = validateUpdateJob(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    try {
        const job = await Job.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!job) {
            return res.status(404).send({ message: 'Job not found' });
        }

        res.status(200).json(job);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const deleteJob = async (req, res) => {
    try {
        const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!job) {
            return res.status(404).send({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

module.exports = { createJob, getJobs, getJob, updateJob, deleteJob, getJobStats };
