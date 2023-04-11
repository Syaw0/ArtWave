import { useArtworkIdStore } from "src/shared/infra/store/artworkId/artworkIdStore";
import style from "./artworkId.module.css";
import Navbar from "../../navbar/navbar";

const ArtworkIdPage = () => {
  const { isLogin, artwork, loggedArtist } = useArtworkIdStore((s) => s);

  return (
    <div className={style.con}>
      <Navbar isLogin={isLogin} profileImage={loggedArtist.artistProfile} />
    </div>
  );
};

export default ArtworkIdPage;
