import { Button, TextField, Typography } from "@mui/material";
import style from "./loginPage.module.css";
import { useLoginStore } from "src/shared/infra/store/login/loginStoreHooks";
import CheckInputs from "./checkInputs/checkInputs";
import CheckToken from "./checkToken/checkToken";

const LoginPage = () => {
  const { phase } = useLoginStore((s) => s);
  return (
    <div className={style.con}>
      <div className={style.left}>
        <Typography className={style.logo} variant="h6">
          ArtWave 🌊
        </Typography>
        <Typography fontWeight={"900"} className={style.subText} variant="h4">
          The Art World 🖼
        </Typography>
      </div>
      <div className={style.middle}>
        <Typography variant="h6" className={style.middleText}>
          ArtWave 🌊
        </Typography>
      </div>
      <div className={style.right}>
        {phase === "checkInputs" && <CheckInputs />}
        {phase === "checkToken" && <CheckToken />}
      </div>
    </div>
  );
};

export default LoginPage;
