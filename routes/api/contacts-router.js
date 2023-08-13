const express = require("express");
const {	contactsController } = require("../../controllers/index");
const { validateBody } = require("../../decorators/index");
const {authenticate, isValidId} = require("../../middlewares/index");
const {	contactsSchemas} = require("../../schemas/index");

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", isValidId, contactsController.getContact);

contactsRouter.post("/", validateBody(contactsSchemas.contactAddSchema), contactsController.addNewContact);

contactsRouter.delete("/:contactId", isValidId, contactsController.deleteContact);

contactsRouter.put(
	"/:contactId",
	validateBody(contactsSchemas.contactAddSchema),
	isValidId,
	contactsController.updateContactById
);

contactsRouter.patch(
	"/:contactId/favorite",
	validateBody(contactsSchemas.contactUpdateFavoriteSchema),
	isValidId,
	contactsController.updateFavorite
);

module.exports = contactsRouter;
