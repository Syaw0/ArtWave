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
import style from "../loginPage.module.css";
import { useLoginStore } from "src/shared/infra/store/login/loginStoreHooks";
import { useDispatch } from "react-redux";
import { ChangeEvent, useState } from "react";
import {
  updateEmail,
  updatePassword,
} from "src/shared/infra/store/login/loginStore";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CheckInputs = () => {
  const { email, password } = useLoginStore((s) => s);
  const [error, setError] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    if (name === "email") {
      setError((s) => ({ ...s, email: false }));
      dispatch(updateEmail(value));
      return;
    }
    setError((s) => ({ ...s, password: false }));
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
    if (error) {
      return;
    }
  };
  return (
    <>
      <Typography className={style.headText} variant="h6">
        Sign in to your account 🔐
      </Typography>

      <div className={style.inputsHolder}>
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
          Login
        </Button>
      </div>
    </>
  );
};

export default CheckInputs;
