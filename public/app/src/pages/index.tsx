import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { artistRepo } from "../../../../src/modules/artist/repo/artistRepo";
import { ArtistMapper } from "../../../../src/modules/artist/mapper/artistMapper";
import { artworkRepo } from "../../../../src/modules/artwork/repo/artworkRepo";
import { ArtworkMapper } from "../../../../src/modules/artwork/mapper/artworkMapper";
import HomePage from "src/shared/components/pages/home/homePage";
import { Provider } from "react-redux";
import { makeStore } from "src/shared/infra/store/home/homeStore";

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
  res,
}): Promise<GetServerSidePropsResult<HomePageProps>> => {
  // actually we must check the login credential with
  // auth service (cookies) and pass isLogin and other information for now
  // i used fake data
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
