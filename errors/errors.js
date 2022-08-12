class ObjectNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ObjectNotFoundError';
    if (!this.message) {
      this.message = 'Object not found.';
    }
  }
}

module.exports = {
  ObjectNotFoundError,
};
