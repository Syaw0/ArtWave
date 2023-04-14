import Head from "next/head";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import LoginPage from "src/shared/components/pages/login/loginPage";
import { makeStore } from "src/shared/infra/store/login/loginStore";

const Login = () => {
  return (
    <>
      <Head>
        <title>ArtWave🌊-Login</title>
        <meta name="description" content="ArtWave Login Page." />
      </Head>

      <Provider store={makeStore({})}>
        <SnackbarProvider maxSnack={3}>
          <LoginPage />
        </SnackbarProvider>
      </Provider>
    </>
  );
};

export default Login;
