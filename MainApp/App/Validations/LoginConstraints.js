let LoginConstraints = {
  email: {
    presence: {allowEmpty: false},
    email: true,
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: "must be at least 6 characters"
    }
  }
};

export default LoginConstraints;