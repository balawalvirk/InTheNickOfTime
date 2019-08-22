let SignUpConstraints = {
  first_name: {
    presence: true,
  },
  last_name: {
    presence: true,
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
  },
  phoneNumber: {
    presence: true,
  },
};

export default SignUpConstraints;