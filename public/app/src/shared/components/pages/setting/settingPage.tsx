import { useSettingStore } from "src/shared/infra/store/setting/settingStoreHooks";
import style from "./settingPage.module.css";
import Navbar from "../../navbar/navbar";
import { Avatar, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Lock, Person, Settings } from "@mui/icons-material";
import ProfileSetting from "./profile/profileSetting";
import { apiConfig } from "src/config/apiConfig";
import UnderDeveloping from "./underDeveloping";

const SettingPage = () => {
  const { isLogin, loggedArtist } = useSettingStore((s) => s);
  const [tabIndex, setTabIndex] = useState(1);
  const [tabOrientation, setTabOrientation] = useState("vertical");
  useEffect(() => {
    const resizeEvent = () => {
      if (window.innerWidth > 700) {
        return setTabOrientation("vertical");
      }
      return setTabOrientation("horizontal");
    };
    window.addEventListener("resize", resizeEvent);
    resizeEvent();
    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  return (
    <div className={style.con}>
      <Navbar isLogin={isLogin} loggedArtist={loggedArtist} />

      <div className={style.top}>
        <Avatar
          src={`${apiConfig.baseUrl}${loggedArtist.artistProfile}`}
          className={style.avatar}
        />
        <div className={style.name}>
          <Typography>
            {loggedArtist.artistName == ""
              ? "UnNamed"
              : loggedArtist.artistName}
          </Typography>

          <Typography>
            {tabIndex == 0 && "/ General"}
            {tabIndex == 1 && "/ Profile"}
            {tabIndex == 2 && "/ Authenticate"}
          </Typography>
        </div>
      </div>

      <div className={style.tabHolder}>
        <div className={style.tabsHold}>
          <Tabs
            variant="scrollable"
            sx={{
              borderBottom: tabOrientation == "vertical" ? 0 : 1,
              borderRight: tabOrientation == "vertical" ? 1 : 0,
              borderColor: "divider",
            }}
            onChange={(e, v) => setTabIndex(v)}
            value={tabIndex}
            orientation={tabOrientation as any}
          >
            <Tab
              sx={{ justifyContent: "flex-start", alignItems: "center" }}
              iconPosition="start"
              icon={<Settings />}
              label="General"
            />
            <Tab
              sx={{ justifyContent: "flex-start", alignItems: "center" }}
              iconPosition="start"
              icon={<Person />}
              label="Profile"
            />
            <Tab
              sx={{ justifyContent: "flex-start", alignItems: "center" }}
              iconPosition="start"
              icon={<Lock />}
              label="Authenticate"
            />
          </Tabs>
        </div>
        <Divider orientation="vertical" />
        {tabIndex == 0 && <UnderDeveloping />}
        {tabIndex == 1 && <ProfileSetting loggedArtist={loggedArtist} />}
        {tabIndex == 2 && <UnderDeveloping />}
      </div>
    </div>
  );
};

export default SettingPage;
