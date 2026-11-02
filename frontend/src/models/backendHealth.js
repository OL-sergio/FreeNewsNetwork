class BackendHealth {
  constructor(status, message, data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  toResponse() {
    if (this.data !== undefined) {
      return this.data;
    }

    return {
      status: this.status,
      message: this.message,
    };
  }
}

module.exports = BackendHealth;
