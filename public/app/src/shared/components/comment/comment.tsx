import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import style from "./comment.module.css";
import Link from "next/link";
import { Delete, MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { removeComment } from "src/modules/artwork/redux/removeComment";
import { useDispatch } from "react-redux";

interface CommentCard extends ArtworkComment {
  isArtistsComment: boolean;
}

const CommentCard = ({
  artist,
  commentId,
  publishDate,
  text,
  artworkId,
  isArtistsComment,
}: CommentCard) => {
  const dispatch = useDispatch();
  let time = new Date().getTime() - new Date(publishDate).getTime();
  let unit = "second";
  time = time / 1000;
  if (time / 60 > 1) {
    time /= 60;
    unit = "min";
  }
  if (time / 60 > 1) {
    time /= 60;
    unit = "hour";
  }

  const deleteComment = async () => {
    setAnchor(null);
    await removeComment(
      dispatch,
      "artworkId/updateArtwork",
      commentId,
      artworkId
    );
  };

  const [anchor, setAnchor] = useState<any>(null);
  const open = Boolean(anchor);
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
      {isArtistsComment && (
        <IconButton
          onClick={(e) => setAnchor(e.currentTarget)}
          className={style.moreIcon}
        >
          <MoreVert />
        </IconButton>
      )}
      <Menu open={open} anchorEl={anchor} onClose={() => setAnchor(null)}>
        <MenuItem onClick={deleteComment}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>Remove Comment</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CommentCard;
