const contactModel = require("../Models/contactModel");
const asyncHandler = require("express-async-handler");
const getContact = asyncHandler(async (req, res) => {
    const allContact = await contactModel.find({ user_Id: req.user.id });
    res.status(200).json({
        message: "ALl the Contacts",
        Contacts: allContact,
    });
});

const addContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All the Fields are mandatory");
    }
    const createdContact = await contactModel.create({
        user_Id: req.user.id,
        name,
        email,
        phone,
    });
    res.status(201).json({
        message: "Contact has been added",
        User: createdContact,
    });
});

const getContactById = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json({
        message: `Contact has been found for Id : ${req.params.id}`,
        Contact: contact,
    });
});

const updateContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if (contact.user_Id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You are not allowed to change this Contact");
    }

    const updatedContact = await contactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json({
        message: `Contact has been updated for Id : ${req.params.id}`,
        Contact: updatedContact,
    });
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if (contact.user_Id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You are not allowed to change this Contact");
    }
    
    const deletedContact = await contactModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message: `Contact has been deleted for id : ${req.params.id}`,
        deletedContact,
    });
});

module.exports = {
    getContact,
    addContact,
    getContactById,
    updateContact,
    deleteContact,
};
