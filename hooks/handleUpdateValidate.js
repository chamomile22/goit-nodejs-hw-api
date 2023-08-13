function handleUpdateValidate(next) {
  this.options.runValidators = true;
  next();
}

module.exports = handleUpdateValidate;
