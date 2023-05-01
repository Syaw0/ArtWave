/* eslint-disable @next/next/no-img-element */
import { useArtworkIdStore } from "src/shared/infra/store/artworkId/artworkIdStore";
import style from "./artworkId.module.css";
import Navbar from "../../navbar/navbar";
import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  Chat,
  Favorite,
  FavoriteBorderOutlined,
  Info,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { like } from "src/modules/artwork/redux/like";
import { useRouter } from "next/router";
import { unlike } from "src/modules/artwork/redux/unlike";
import ArtworkHolder from "../../artworkHolder/artworkHolder";
import Link from "next/link";
import { useState } from "react";
import CommentCard from "../../comment/comment";
import { comment } from "src/modules/artwork/redux/comment";
import { apiConfig } from "src/config/apiConfig";

const ArtworkIdPage = () => {
  const { isLogin, artwork, loggedArtist, isArtistLikeArtwork, more } =
    useArtworkIdStore((s) => s);
  const [drawer, setDrawer] = useState(false);
  const [dialog, setDialog] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [commentText, setCommentText] = useState("");
  const likeArtwork = async () => {
    if (!isLogin) {
      return router.replace("/login");
    }
    await like(
      dispatch,
      "artworkId/like",
      loggedArtist.artistId,
      artwork.artworkId
    );
  };

  const unlikeArtwork = async () => {
    if (!isLogin) {
      return router.replace("/login");
    }
    await unlike(
      dispatch,
      "artworkId/unlike",
      loggedArtist.artistId,
      artwork.artworkId
    );
  };

  const sendComment = async () => {
    if (!isLogin) {
      return router.replace("/login");
    }
    if (commentText.trim() == "") return;
    await comment(
      dispatch,
      "artworkId/updateArtwork",
      loggedArtist.artistId,
      artwork.artworkId,
      commentText
    );
    setCommentText("");
  };
  console.log(!isArtistLikeArtwork && !isLogin ? "hello" : "bye");
  return (
    <div className={style.con}>
      <Navbar isLogin={isLogin} loggedArtist={loggedArtist} />
      <div className={style.artworkHolder}>
        <div className={style.artworkTop}>
          <div className={style.artworkTopLeft}>
            <Avatar
              className={style.avatar}
              src={`${apiConfig.baseUrl}${artwork.artworkOwner.artistProfile}`}
            />
            <div className={style.artworkInfo}>
              <Typography variant="h6">{artwork.artworkName}</Typography>
              <Typography className={style.artworkArtistName} variant="caption">
                {artwork.artworkOwner.artistName == ""
                  ? "unNamed"
                  : artwork.artworkOwner.artistName}
              </Typography>
            </div>
          </div>
          <div className={style.artworkTopRight}>
            {!isArtistLikeArtwork ? (
              <Chip
                icon={<FavoriteBorderOutlined fontSize="small" />}
                onClick={likeArtwork}
                variant={"outlined"}
                color="primary"
                label={"Like"}
              />
            ) : (
              <Chip
                icon={<Favorite fontSize="small" />}
                onClick={unlikeArtwork}
                variant={"filled"}
                color="primary"
                label={"Liked"}
              />
            )}
          </div>
        </div>

        <img
          className={style.artworkImg}
          src={artwork.artworkImage}
          alt={artwork.artworkName}
        />

        <div className={style.bottomBar}>
          <IconButton
            onClick={isArtistLikeArtwork ? unlikeArtwork : likeArtwork}
            color={isArtistLikeArtwork ? "primary" : "default"}
          >
            <Favorite />
          </IconButton>
          <IconButton color="default" onClick={() => setDrawer(true)}>
            <Chat />
          </IconButton>

          <IconButton color="default" onClick={() => setDialog(true)}>
            <Info />
          </IconButton>
        </div>
        <Divider className={style.bottomBar} />

        <Typography className={style.artworkText}>
          {artwork.artworkText}
        </Typography>

        <div className={style.bottomAvatarHolder}>
          <div>
            <Avatar
              src={`${apiConfig.baseUrl}${artwork.artworkOwner.artistProfile}`}
              className={style.bottomAvatar}
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {artwork.artworkOwner.artistName == ""
                ? "unNamed"
                : artwork.artworkOwner.artistName}
            </Typography>
          </div>
        </div>

        {more.length != 0 && (
          <div className={style.more}>
            <div className={style.moreTop}>
              <Typography variant="h6">
                More on{" "}
                {artwork.artworkOwner.artistName == ""
                  ? "unNamed"
                  : artwork.artworkOwner.artistName}
              </Typography>

              <Link href={`/artist/${artwork.artworkOwner.artistId}`}>
                <Button size="small">View Profile</Button>
              </Link>
            </div>
            <ArtworkHolder
              className={style.moreImgHolder}
              artworks={more.slice(0, 4)}
              hideBottom
            />
          </div>
        )}
      </div>

      <div className={style.float}>
        <Avatar src={`${apiConfig.baseUrl}${loggedArtist.artistProfile}`} />
        <div className={style.floatItems}>
          <IconButton
            onClick={isArtistLikeArtwork ? unlikeArtwork : likeArtwork}
            color={isArtistLikeArtwork ? "primary" : "default"}
          >
            <Favorite />
          </IconButton>
          <IconButton color="default" onClick={() => setDrawer(true)}>
            <Chat />
          </IconButton>

          <IconButton color="default" onClick={() => setDialog(true)}>
            <Info />
          </IconButton>
        </div>
      </div>

      <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)}>
        <div className={style.drawer}>
          <div className={style.drawerTop}>
            <span>
              <IconButton
                onClick={isArtistLikeArtwork ? unlikeArtwork : likeArtwork}
                color={isArtistLikeArtwork ? "primary" : "default"}
              >
                <Favorite />
              </IconButton>
              <IconButton color="default" onClick={() => setDrawer(false)}>
                <Chat />
              </IconButton>
            </span>
            <Button
              onClick={() => setDialog(true)}
              variant="outlined"
              color="info"
              startIcon={<Info />}
            >
              Info
            </Button>
          </div>
          <Typography variant="h6" className={style.text}>
            Feedback
          </Typography>

          <TextField
            value={commentText}
            onChange={(e) => setCommentText(e.currentTarget.value)}
            fullWidth
            multiline
            rows={4}
            placeholder="what do you think about this artwork...?"
          />
          <div className={style.sendBtnHolder}>
            <Button onClick={sendComment}>Send</Button>
          </div>

          <Divider />

          <div className={style.commentsHolder}>
            {artwork.artworkComments.map((comment) => {
              return (
                <CommentCard
                  isArtistsComment={
                    artwork.artworkOwner.artistId === loggedArtist.artistId ||
                    loggedArtist.artistId === comment.artist.artistId
                  }
                  key={comment.commentId}
                  {...comment}
                />
              );
            })}
          </div>
        </div>
      </Drawer>

      <Dialog
        className={style.dialog}
        open={dialog}
        onClose={() => setDialog(false)}
      >
        <DialogTitle>Artwork Detail</DialogTitle>
        <DialogContentText>
          Posted On {new Date(artwork.artworkPublishDate).toDateString()}
        </DialogContentText>

        <div className={style.information}>
          <div className={style.infos}>
            <Typography>Likes</Typography>
            <Typography>{artwork.artworkVotes.length}</Typography>
          </div>

          <div className={style.infos}>
            <Typography>comments</Typography>
            <Typography>{artwork.artworkComments.length}</Typography>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ArtworkIdPage;
