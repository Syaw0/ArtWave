import { Avatar, Typography } from "@mui/material";
import style from "./comment.module.css";
import Link from "next/link";

const CommentCard = ({
  artist,
  commentId,
  parentComment,
  publishDate,
  text,
}: ArtworkComment) => {
  console.log(publishDate);
  let time = new Date().getTime() - new Date(publishDate).getTime();
  let unit = "second";
  time = time / 1000;
  if (time / 60 > 0) {
    time /= 60;
    unit = "min";
  }
  if (time / 60 < 0) {
    time /= 60;
    unit = "hour";
  }
  return (
    <div className={style.con}>
      <Avatar src={artist.artistProfile} className={style.avatar} />
      <div className={style.right}>
        <Link href={`/artist/${artist.artistId}`}>
          <Typography variant="body2" className={style.name}>
            {artist.artistName == "" ? "unNamed" : artist.artistName}
          </Typography>
        </Link>
        <Typography className={style.text}>{text}</Typography>
        <Typography variant="caption" className={style.date}>
          {time.toFixed()} {unit}
        </Typography>
      </div>
    </div>
  );
};

export default CommentCard;
