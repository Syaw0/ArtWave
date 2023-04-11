/* eslint-disable @next/next/no-img-element */
import { Favorite } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material";
import Link from "next/link";
import style from "./artworkCard.module.css";

const ArtworkCard = ({
  artworkImage,
  artistProfile,
  artistName,
  artworkVotes,
  artworkName,
  artworkId,
  artworkOwner,
  hideBottom = false,
}: ArtworkCardProps) => {
  return (
    <div className={style.con}>
      <Link href={`/artwork/${artworkId}`}>
        <img alt={artworkName} className={style.img} src={artworkImage} />
      </Link>
      {hideBottom == false && (
        <div className={style.info}>
          <Link href={`/artist/${artworkOwner.artistId}`}>
            <div className={style.avatarAndName}>
              <Avatar src={artistProfile} />
              <Typography variant="body1">{artistName}</Typography>
            </div>
          </Link>
          <div className={style.votes}>
            <Typography variant="body1">{artworkVotes.length}</Typography>
            <Favorite fontSize="small" sx={{ opacity: "70%", ml: 0.5 }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtworkCard;
