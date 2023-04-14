import Head from "next/head";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import SignupPage from "src/shared/components/pages/signup/signupPage";
import { makeStore } from "src/shared/infra/store/signup/signupStore";

const Signup = () => {
  return (
    <>
      <Head>
        <title>ArtWave🌊-Signup</title>
        <meta name="description" content="ArtWave Signup Page." />
      </Head>

      <Provider store={makeStore({})}>
        <SnackbarProvider maxSnack={3}>
          <SignupPage />
        </SnackbarProvider>
      </Provider>
    </>
  );
};

export default Signup;
