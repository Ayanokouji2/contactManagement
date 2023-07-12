const router = require("express").Router();
const validateToken = require("../MiddleWare/validateTokenHandler");
const {
    getContact,
    addContact,
    getContactById,
    deleteContact,
    updateContact,
} = require("../Controllers/contactController");

router.use(validateToken);
router
    .route("/")
    .get(getContact)
    .post(addContact);

router
    .route("/:id")
    .get(getContactById)
    .delete(deleteContact)
    .patch(updateContact);

module.exports = router;
