/* eslint-disable @next/next/no-img-element */
import { Typography } from "@mui/material";
import style from "./underDeveloping.module.css";

const UnderDeveloping = () => {
  return (
    <div className={style.con}>
      <div>
        <Typography variant="h6">UnderDeveloping</Typography>
        <img src="/underDevelop.gif" alt="underDeveloping" />
      </div>
    </div>
  );
};

export default UnderDeveloping;
