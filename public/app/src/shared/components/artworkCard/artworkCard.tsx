/* eslint-disable @next/next/no-img-element */
import { Favorite } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material";
import style from "./artworkCard.module.css";

const ArtworkCard = ({
  imageSource,
  artistProfile,
  artistName,
  votes,
  artworkName,
}: ArtworkCardProps) => {
  return (
    <div className={style.con}>
      <img alt={artworkName} className={style.img} src={imageSource} />
      <div className={style.info}>
        <div className={style.avatarAndName}>
          <Avatar src={artistProfile} />
          <Typography variant="body1">{artistName}</Typography>
        </div>
        <div className={style.votes}>
          <Typography variant="body1">{votes.length}</Typography>
          <Favorite fontSize="small" sx={{ opacity: "70%", ml: 0.5 }} />
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
