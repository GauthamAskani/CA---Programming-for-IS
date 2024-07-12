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
        document_category: value.document_category
      }
    });

    if (existingDocument) {
      await existingDocument.destroy({ document_deleted_at: new Date() });
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
      await student.update({ student_document_status: 'true' });
    }

    res.status(201).json({ message: 'Document uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/student-documents/:student_id', async (req, res) => {
  try {
    const { student_id } = req.params;
    console.log('Student ID:', student_id);

    const documents = await Document.findAll({
      where: { student_id: student_id }
    });

    if (!documents.length) {
      return res.status(404).json({ error: 'No documents found for this student' });
    }

    const student = await Student.findOne({
      where: { student_id: student_id },
      attributes: ['student_document_status']
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({
      documents: documents,
      student_document_status: student.student_document_status
    });
  } catch (err) {
    console.error('Error fetching student documents:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/admin/all-documents', async (req, res) => {
  try {
    const documents = await Document.findAll({
      order: [['student_id', 'ASC']]
    });

    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const updateDocumentSchema = Joi.object({
  admin_remarks: Joi.string().optional(),
  status: Joi.string().optional()
});

router.put('/admin/update-document/:document_id', async (req, res) => {
  try {
    const { error, value } = updateDocumentSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { document_id } = req.params;

    const document = await Document.findOne({
      where: { document_id: document_id }
    });

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    await document.update(value);

    res.status(200).json({ message: 'Document updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
