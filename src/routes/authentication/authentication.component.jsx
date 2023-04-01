import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import { redirect } from "react-router-dom";
import Button from "../../components/button/button.component";
import "./authentication.styles.scss";

const Authentication = () => {
  useEffect(() => {
    async function loadRedirectResult() {
      const response = await getRedirectResult(auth);

      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    }
    loadRedirectResult();
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div className="authentication-container">
      {/* <Button onClick={logGoogleUser}>Sign in with Google</Button>
      <Button buttonType="google" onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </Button> */}

      <SignInForm />
      <SignUpForm />
    </div>
  );
};
export default Authentication;
