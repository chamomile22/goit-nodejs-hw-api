const handleSaveError = (error, data, next) => {
	error.status = 400;
	next();
};

function handleUpdateValidate(next) {
	this.options.runValidators = true;
	next();
}

module.exports = { handleSaveError, handleUpdateValidate };
