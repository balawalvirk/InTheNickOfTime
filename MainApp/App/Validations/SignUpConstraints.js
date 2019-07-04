let SignUpConstraints = {
  name: {
    presence: true,
    length: {
      minimum: 6,
      message: "must be at least 6 characters"
    }
  },
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
  },
  confirmPassword: {
    equality: "password"
  }
};

export default SignUpConstraints;