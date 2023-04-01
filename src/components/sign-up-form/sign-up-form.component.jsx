import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, confirmPassword, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    //confirm pass matches
    if (password !== confirmPassword) return;

    //create user doc
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      const userDocRef = await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h2>Don't have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="y our name"
          name="displayName"
          type="text"
          required
          onChange={handleChange}
          value={displayName}
        />
        <FormInput
          label="email"
          name="email"
          type="email"
          required
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label="password"
          name="password"
          type="password"
          required
          onChange={handleChange}
          value={password}
        />
        <FormInput
          label="confirm password"
          name="confirmPassword"
          type="password"
          required
          onChange={handleChange}
          value={confirmPassword}
        />

        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
