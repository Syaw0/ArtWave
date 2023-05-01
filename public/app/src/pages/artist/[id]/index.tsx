import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import ArtistIdPage from "src/shared/components/pages/artistId/artistIdPage";
import { makeStore } from "src/shared/infra/store/artistId/artistIdStore";
import { artistRepo } from "../../../../../../src/modules/artist/repo/artistRepo";
import { ArtistMapper } from "../../../../../../src/modules/artist/mapper/artistMapper";
import { artworkRepo } from "../../../../../../src/modules/artwork/repo/artworkRepo";
import { ArtworkMapper } from "../../../../../../src/modules/artwork/mapper/artworkMapper";
import { artistAuthService } from "src/modules/artist/services/artistAuthService";

const ArtistId = (props: ArtistIdPageProps) => {
  return (
    <>
      <Head>
        <title>
          {props.artist.artistName == ""
            ? "ArtWave 🌊"
            : props.artist.artistName}
        </title>
        <meta name="description" content={`${props.artist.artistName} Page.`} />
      </Head>

      <Provider store={makeStore(props)}>
        <ArtistIdPage />
      </Provider>
    </>
  );
};

export default ArtistId;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}): Promise<GetServerSidePropsResult<ArtistIdPageProps>> => {
  const e404 = {
    redirect: { destination: "/404", permanent: false },
  };
  if (params == null || params.id == null) {
    return { redirect: { destination: "/404", permanent: false } };
  }

  const props: ArtistIdPageProps = {
    isLogin: false,
    loggedArtist: {
      artistBiography: "",
      artistEmail: "",
      artistId: "",
      artistName: "",
      artistProfile: "",
      artistSubscribe: [],
      artistSubscribers: [],
    },
    artist: {
      artistBiography: "",
      artistEmail: "",
      artistId: "",
      artistName: "",
      artistProfile: "",
      artistSubscribe: [],
      artistSubscribers: [],
    },
    artistArtworks: [],
    artistVoted: [],
    isFollowed: false,
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
    props.loggedArtist = artistDTO;
  }

  try {
    const artist = await artistRepo.findById(params.id as string);
    if (artist == null) {
      return e404;
    }
    props.artist = ArtistMapper.toDTO(artist);

    const artistArtworks = await artworkRepo.findArtistArtworks(
      artist.artistId
    );

    props.artistArtworks = await Promise.all(
      artistArtworks.map((a) => ArtworkMapper.toDTO(a))
    );

    const artistLikes = await artworkRepo.getArtistLikes(artist.artistId);
    props.artistVoted = await Promise.all(
      artistLikes.map((a) => ArtworkMapper.toDTO(a))
    );
    props.isFollowed =
      props.loggedArtist.artistSubscribe.filter(
        (s) => s === props.artist.artistId
      ).length != 0;
  } catch (err) {
    return e404;
  }
  return {
    props,
  };
};
