import { required, email, minLength, between } from "vuelidate/lib/validators";
export default {
  email: {
    required,
    email
  },
  password: {
    required
  },
  cpassword: {
    required
  },
  name: {
    required,
    minLength: minLength(2)
  },
  age: {
    between: between(20, 30)
  }
};
