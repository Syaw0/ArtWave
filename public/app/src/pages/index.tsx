import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { artistRepo } from "../../../../src/modules/artist/repo/artistRepo";
import { ArtistMapper } from "../../../../src/modules/artist/mapper/artistMapper";
import { artworkRepo } from "../../../../src/modules/artwork/repo/artworkRepo";
import { ArtworkMapper } from "../../../../src/modules/artwork/mapper/artworkMapper";
import HomePage from "src/shared/components/pages/home/homePage";
import { Provider } from "react-redux";
import { makeStore } from "src/shared/infra/store/home/homeStore";
import { artistAuthService } from "src/modules/artist/services/artistAuthService";

export default function Home(props: HomePageProps) {
  return (
    <>
      <Head>
        <title>ArtWave 🌊</title>
        <meta name="description" content="ArtWave Home Page." />
      </Head>

      <Provider store={makeStore(props)}>
        <HomePage />
      </Provider>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
}): Promise<GetServerSidePropsResult<HomePageProps>> => {
  const props: HomePageProps = {
    isLogin: false,
    artist: {
      artistBiography: "",
      artistEmail: "",
      artistId: "",
      artistName: "",
      artistProfile: "",
    },
    artworks: [],
  };
  const isLogged = artistAuthService.isArtistLoggedIn(req.cookies);
  let artist;
  if (!isLogged) {
    props.isLogin = false;
  } else {
    const refresh = req.cookies.refresh as string;
    const isRefreshTokenExist = await artistAuthService.isRefreshTokenExist(
      refresh
    );
    if (!isRefreshTokenExist) {
      props.isLogin = false;
    } else {
      props.isLogin = true;
    }
    const email = await artistAuthService.getEmailFromRefreshToken(refresh);

    artist = await artistRepo.findByEmail(email);
    if (artist == null) {
      props.isLogin = false;
    } else {
      props.isLogin = true;
    }
    const artistDTO = ArtistMapper.toDTO(artist);
    props.artist = artistDTO;
  }

  const artworks = await artworkRepo.findLatestArtworks();
  const artworksDTO = await Promise.all(
    artworks.map(async (a) => await ArtworkMapper.toDTO(a))
  );
  props.artworks = artworksDTO;

  return { props };
};
