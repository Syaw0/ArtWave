import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import SearchPage from "src/shared/components/pages/search/searchPage";
import { makeStore } from "src/shared/infra/store/search/searchStore";
import { ArtistMapper } from "../../../../../src/modules/artist/mapper/artistMapper";
import { artistRepo } from "../../../../../src/modules/artist/repo/artistRepo";
import { ArtworkMapper } from "../../../../../src/modules/artwork/mapper/artworkMapper";
import { artworkRepo } from "../../../../../src/modules/artwork/repo/artworkRepo";
import { artistAuthService } from "src/modules/artist/services/artistAuthService";
import { authenticationService } from "../../../../../src/modules/artist/service";

const Search = (props: SearchPageProps) => {
  return (
    <>
      <Head>
        <title>ArtWave 🌊</title>
        <meta name="description" content="ArtWave Search Page." />
      </Head>
      <Provider store={makeStore(props)}>
        <SearchPage />
      </Provider>
    </>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}): Promise<GetServerSidePropsResult<SearchPageProps>> => {
  const props: SearchPageProps = {
    isLogin: false,
    artist: {
      artistBiography: "",
      artistEmail: "",
      artistId: "",
      artistName: "",
      artistProfile: "",
      artistSubscribe: [],
      artistSubscribers: [],
    },
    searchQuery: "",
    artworks: [],
  };
  const isLogged = artistAuthService.isArtistLoggedIn(req.cookies);
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

    const artist = await artistRepo.findByEmail(email);
    if (artist == null) {
      props.isLogin = false;
    } else {
      props.isLogin = true;
    }
    const artistDTO = ArtistMapper.toDTO(artist);
    props.artist = artistDTO;
  }

  if (query.q == null) {
    props.artworks = [];
  } else {
    props.searchQuery = query.q as string;
    try {
      const artworks = await artworkRepo.search(query.q as string);
      const artworksDTO = await Promise.all(
        artworks.map(async (a) => await ArtworkMapper.toDTO(a))
      );
      props.artworks = artworksDTO;
    } catch (err) {
      props.artworks = [];
    }
  }

  return { props };
};
