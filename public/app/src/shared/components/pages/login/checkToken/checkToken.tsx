import { Button, TextField, Typography } from "@mui/material";
import style from "../loginPage.module.css";
import { ChangeEvent, useState } from "react";
import { checkLoginToken } from "src/modules/artist/redux/checkLoginToken";
import { useLoginStore } from "src/shared/infra/store/login/loginStoreHooks";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

const CheckToken = () => {
  const { email } = useLoginStore((s) => s);
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const startCheck = async () => {
    if (token.trim() === "") return setError(true);
    const result = await checkLoginToken(email, token);
    if (!result.status) {
      enqueueSnackbar(result.message, { variant: "error" });
    } else {
      enqueueSnackbar(result.message, { variant: "success" });
      router.replace("/");
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setToken(e.currentTarget.value);
  };
  return (
    <>
      <Typography className={style.headText} variant="h6">
        Token sended to the email 🔒
      </Typography>

      <div className={style.inputsHolder}>
        <TextField
          value={token}
          error={error}
          onChange={handleChange}
          label="Token"
          variant="outlined"
          placeholder="Enter the Token"
        />
      </div>
      <div className={style.buttonHolder}>
        <Button onClick={startCheck} variant="contained">
          Check
        </Button>
      </div>
    </>
  );
};

export default CheckToken;
