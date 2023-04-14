import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import style from "../signupPage.module.css";
import { useDispatch } from "react-redux";
import { ChangeEvent, useState } from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useSignupStore } from "src/shared/infra/store/signup/signupStoreHooks";
import {
  changePhase,
  updateEmail,
  updateName,
  updatePassword,
} from "src/shared/infra/store/signup/signupStore";
import { checkSignup } from "src/modules/artist/redux/checkSignup";

const CheckInputs = () => {
  const { email, password, name } = useSignupStore((s) => s);
  const [error, setError] = useState({
    email: false,
    password: false,
    name: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setError((s) => ({ ...s, [name]: false }));
    if (name === "email") {
      dispatch(updateEmail(value));
      return;
    }
    if (name === "name") {
      return dispatch(updateName(value));
    }
    dispatch(updatePassword(value));
  };

  const handleClickShowPassword = () => {
    setShowPassword((s) => !s);
  };

  const startLogin = async () => {
    let error = false;
    if (email.trim() == "") {
      setError((s) => ({ ...s, email: true }));
      error = true;
    }
    if (password.trim() == "") {
      setError((s) => ({ ...s, password: true }));
      error = true;
    }
    if (name.trim() == "") {
      setError((s) => ({ ...s, name: true }));
      error = true;
    }
    if (error) {
      return;
    }

    const result = await checkSignup(email, password, name);
    console.log(result);
    if (!result.status) {
      enqueueSnackbar(String(result.message), { variant: "error" });
    } else {
      enqueueSnackbar(result.message, { variant: "success" });
      setTimeout(() => {
        dispatch(changePhase("checkToken"));
      }, 1500);
    }
  };
  return (
    <>
      <Typography className={style.headText} variant="h6">
        Join to our community 🤞🏻
      </Typography>

      <div className={style.inputsHolder}>
        <TextField
          value={name}
          error={error.name}
          name="name"
          onChange={handleInputChange}
          label="Name"
          variant="outlined"
        />
        <TextField
          value={email}
          error={error.email}
          name="email"
          onChange={handleInputChange}
          label="Email"
          type="email"
          variant="outlined"
        />
        <FormControl>
          <InputLabel error={error.password} htmlFor="password">
            Password
          </InputLabel>

          <OutlinedInput
            id="password"
            label="Password"
            value={password}
            name="password"
            error={error.password}
            onChange={handleInputChange}
            placeholder=""
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div className={style.buttonHolder}>
        <Button onClick={startLogin} variant="contained">
          Signup
        </Button>
      </div>
    </>
  );
};

export default CheckInputs;
