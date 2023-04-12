/* eslint-disable @next/next/no-img-element */
import { useArtworkIdStore } from "src/shared/infra/store/artworkId/artworkIdStore";
import style from "./artworkId.module.css";
import Navbar from "../../navbar/navbar";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  IconButton,
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

const ArtworkIdPage = () => {
  const { isLogin, artwork, loggedArtist, isArtistLikeArtwork, more } =
    useArtworkIdStore((s) => s);
  const dispatch = useDispatch();
  const router = useRouter();
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

  return (
    <div className={style.con}>
      <Navbar isLogin={isLogin} profileImage={loggedArtist.artistProfile} />
      <div className={style.artworkHolder}>
        <div className={style.artworkTop}>
          <div className={style.artworkTopLeft}>
            <Avatar
              className={style.avatar}
              src={artwork.artworkOwner.artistProfile}
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
            {!isArtistLikeArtwork && isLogin ? (
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
          <IconButton color="default">
            <Chat />
          </IconButton>

          <IconButton color="default">
            <Info />
          </IconButton>
        </div>

        <Divider />

        <Typography className={style.artworkText}>
          {artwork.artworkText}
        </Typography>

        <div className={style.bottomAvatarHolder}>
          <div>
            <Avatar
              src={artwork.artworkOwner.artistProfile}
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
        <Avatar src={artwork.artworkOwner.artistProfile} />
        <div className={style.floatItems}>
          <IconButton
            onClick={isArtistLikeArtwork ? unlikeArtwork : likeArtwork}
            color={isArtistLikeArtwork ? "primary" : "default"}
          >
            <Favorite />
          </IconButton>
          <IconButton color="default">
            <Chat />
          </IconButton>

          <IconButton color="default">
            <Info />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ArtworkIdPage;
