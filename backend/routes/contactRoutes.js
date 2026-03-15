const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");

const {
  createContact,
  getContacts,
  updateContact,
  deleteContact
} = require("../controllers/contactController");

router.post("/", createContact);

router.get("/", authMiddleware, getContacts);

router.put("/:id", authMiddleware, updateContact);

router.delete("/:id", authMiddleware, deleteContact);

module.exports = router;
