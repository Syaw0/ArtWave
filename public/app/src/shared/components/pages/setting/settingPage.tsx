import { useSettingStore } from "src/shared/infra/store/setting/settingStoreHooks";
import style from "./settingPage.module.css";
import Navbar from "../../navbar/navbar";
import { Avatar, Typography } from "@mui/material";

const SettingPage = () => {
  const { isLogin, loggedArtist } = useSettingStore((s) => s);

  return (
    <div className={style.con}>
      <Navbar isLogin={isLogin} loggedArtist={loggedArtist} />

      <div className={style.top}>
        <Avatar src={loggedArtist.artistProfile} className={style.avatar} />
        <div>
          <Typography>
            {loggedArtist.artistName == ""
              ? "UnNamed"
              : loggedArtist.artistName}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
