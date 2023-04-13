/* eslint-disable react-hooks/exhaustive-deps */
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLatestArtworks } from "src/modules/artwork/redux/getLatestArtworks";
import { getPopularArtworks } from "src/modules/artwork/redux/getPopularArtworks";
import { useHomeStore } from "src/shared/infra/store/home/homeStoreHooks";
import ArtworkHolder from "../../artworkHolder/artworkHolder";
import Navbar from "../../navbar/navbar";
import style from "./homePage.module.css";

const HomePage = () => {
  const { artist, artworks, isLogin } = useHomeStore((s) => s);
  const [selectValue, setSelectValue] = useState("Latest");
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectValue == "Latest") {
      getLatest();
    } else {
      getPopular();
    }
  }, [selectValue]);

  const getLatest = async () => {
    await getLatestArtworks(dispatch, "home/updateArtworksList");
  };

  const getPopular = async () => {
    await getPopularArtworks(dispatch, "home/updateArtworksList");
  };

  const selectChangeHandler = (e: SelectChangeEvent<string>) => {
    setSelectValue(e.target.value);
  };

  return (
    <div className={style.con}>
      <Navbar isLogin={isLogin} loggedArtist={artist} />
      <div className={style.selectHolder}>
        <Select
          color="primary"
          value={selectValue}
          onChange={selectChangeHandler}
        >
          <MenuItem value={"Latest"}>Latest</MenuItem>
          <MenuItem value={"Papular"}>Popular</MenuItem>
        </Select>
      </div>
      <ArtworkHolder artworks={artworks} />
    </div>
  );
};

export default HomePage;
