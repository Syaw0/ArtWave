import { useArtistIdStore } from "src/shared/infra/store/artistId/artistIdStoreHooks";
import style from "./artistIdPage.module.css";
import Navbar from "../../navbar/navbar";
import { Avatar, Button, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ArtworkHolder from "../../artworkHolder/artworkHolder";
import Link from "next/link";
import { apiConfig } from "src/config/apiConfig";

const ArtistIdPage = () => {
  const { artist, artistArtworks, artistVoted, isLogin, loggedArtist } =
    useArtistIdStore((s) => s);

  const [tabIndex, setTabIndex] = useState(0);
  useEffect(() => {
    const q = new URL(location.toString()).searchParams.get("tab");
    console.log(q);
    if (q != null && q == "1") {
      setTabIndex(1);
    } else {
      setTabIndex(0);
    }
  }, []);
  return (
    <div className={style.con}>
      <Navbar isLogin={isLogin} loggedArtist={loggedArtist} />

      <div className={style.top}>
        <Avatar
          className={style.avatar}
          src={`${apiConfig.baseUrl}${artist.artistProfile}`}
        />
        <div className={style.info}>
          <Typography variant="body1">
            {artist.artistName == "" ? "UnNamed" : artist.artistName}
          </Typography>
          {artist.artistId === loggedArtist.artistId && (
            <Link href={"/setting"}>
              <Button variant="text" size="small">
                Edit Profile
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className={style.tabHolder}>
        <div className={style.tabsHold}>
          <Tabs
            sx={{ borderBottom: 1, borderColor: "divider" }}
            onChange={(e, v) => setTabIndex(v)}
            value={tabIndex}
          >
            <Tab label="Artworks" />
            <Tab label="Likes" />
          </Tabs>
        </div>
        {tabIndex == 0 && (
          <ArtworkHolder hideBottom artworks={artistArtworks} />
        )}
        {tabIndex == 1 && <ArtworkHolder hideBottom artworks={artistVoted} />}
      </div>
    </div>
  );
};

export default ArtistIdPage;
