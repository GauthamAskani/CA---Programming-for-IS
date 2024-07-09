const express = require('express');
const router = express.Router();
const { Document, Student } = require('../models');
const Joi = require('joi');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config();

const upload = multer({ dest: 'uploads/' });

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient('studydocumentpdfs');

const documentSchema = Joi.object({
  student_id: Joi.number().integer().required(),
  document_category: Joi.string().required(),
  document_type: Joi.string().required(),
  notes: Joi.string().optional(),
  admin_remarks: Joi.string().optional(),
  status: Joi.string().optional(),
});

const requiredDocuments = [
  '10THMARKSHEET', '12THMARKSHEET', 'TRANSCRIPT', 'DEGREECERTIFICATE',
  'CIRCULLAMVITAE', 'SOP', '1LOR', '2LOR', 'ENGLISHTESTSCORE', 'GARDUATIONSEMESTER'
];

router.post('/upload-document', upload.single('file'), async (req, res) => {
  try {
    const { error, value } = documentSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const student = await Student.findOne({ where: { student_id: value.student_id } });
    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    const existingDocument = await Document.findOne({
      where: {
        student_id: value.student_id,
        document_category: value.document_category,
        document_deleted_at: null
      }
    });

    if (existingDocument) {
      await existingDocument.update({ document_deleted_at: new Date() });
    }

    const blockBlobClient = containerClient.getBlockBlobClient(req.file.originalname);
    const uploadBlobResponse = await blockBlobClient.uploadFile(req.file.path);

    const documentUrl = blockBlobClient.url;

    const documentData = {
      ...value,
      document_url: documentUrl,
      document_name: req.file.originalname,
      document_created_at: new Date(),
    };

    await Document.create(documentData);

    const studentDocuments = await Document.findAll({
      where: {
        student_id: value.student_id,
        document_deleted_at: null
      }
    });

    const uploadedDocumentCategories = studentDocuments.map(doc => doc.document_category);
    const allRequiredDocumentsUploaded = requiredDocuments.every(doc => uploadedDocumentCategories.includes(doc));

    if (allRequiredDocumentsUploaded) {
      await student.update({ document_status: true });
    }

    res.status(201).json({ message: 'Document uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
