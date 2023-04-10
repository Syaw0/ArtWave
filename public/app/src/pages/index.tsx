import Head from "next/head";
import style from "../styles/pageStyles/home.module.css";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Navbar from "src/shared/components/navbar/navbar";
import ArtworkHolder from "src/shared/components/artworkHolder/artworkHolder";
import { artworks } from "src/shared/fakeData";
import { artistRepo } from "../../../../src/modules/artist/repo/artistRepo";
import { ArtistMapper } from "../../../../src/modules/artist/mapper/artistMapper";
import { artworkRepo } from "../../../../src/modules/artwork/repo/artworkRepo";
import { ArtworkMapper } from "../../../../src/modules/artwork/mapper/artworkMapper";

interface HomePageProps {
  isLogin: boolean;
  artist: any;
  artworks: any;
}

export default function Home({ isLogin, artist, artworks }: HomePageProps) {
  return (
    <>
      <Head>
        <title>ArtWave 🌊</title>
        <meta name="description" content="ArtWave Home Page." />
      </Head>

      <div className={style.con}>
        <Navbar isLogin={isLogin} profileImage={artist.artistProfile} />
        <ArtworkHolder artworks={artworks} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}): Promise<GetServerSidePropsResult<HomePageProps>> => {
  // actually we must check the login credential with
  // auth service (cookies) and pass isLogin and other information for now
  // i used fake data
  const props: HomePageProps = {
    isLogin: false,
    artist: {},
    artworks: {},
  };
  const artist = await artistRepo.findByEmail("siaw@gmail.com");
  if (artist == null) {
    props.isLogin = false;
  } else {
    props.isLogin = true;
  }
  const artistDTO = ArtistMapper.toDTO(artist);
  props.artist = artistDTO;

  const artworks = await artworkRepo.findLatestArtworks();
  const artworksDTO = await Promise.all(
    artworks.map(async (a) => await ArtworkMapper.toDTO(a))
  );
  props.artworks = artworksDTO;

  return { props };
};
