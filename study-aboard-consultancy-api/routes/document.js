const express = require('express');
const router = express.Router();
const { Document, Student } = require('../models');
const Joi = require('joi');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config();

// Initialize multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Azure Blob Storage setup
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient('studydocumentpdfs');

// Joi validation schema for document upload
const documentSchema = Joi.object({
  student_id: Joi.number().integer().required(),
  document_category: Joi.string().required(),
  document_type: Joi.string().required(),
  notes: Joi.string().optional(),
  admin_remarks: Joi.string().optional(),
  status: Joi.string().optional(),
});

// Document upload route
router.post('/upload-document', upload.single('file'), async (req, res) => {
  try {
    // Validate the request body against the schema
    const { error, value } = documentSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const student = await Student.findOne({ where: { student_id: value.student_id } });
    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    const blockBlobClient = containerClient.getBlockBlobClient(req.file.originalname);
    const uploadBlobResponse = await blockBlobClient.uploadFile(req.file.path);

    // Get the URL of the uploaded file
    const documentUrl = blockBlobClient.url;

    // Create the document record in the database
    const documentData = {
      ...value,
      document_url: documentUrl,
      document_name: req.file.originalname,
      document_created_at: new Date(),
    };

    const document = await Document.create(documentData);
    res.status(201).json(document);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
