import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import ArtworkIdPage from "src/shared/components/pages/artworkId/artworkId";
import { makeStore } from "src/shared/infra/store/artworkId/artworkIdStoreHooks";
import { artistRepo } from "../../../../../../src/modules/artist/repo/artistRepo";
import { ArtistMapper } from "../../../../../../src/modules/artist/mapper/artistMapper";
import { artworkRepo } from "../../../../../../src/modules/artwork/repo/artworkRepo";
import { ArtworkMapper } from "../../../../../../src/modules/artwork/mapper/artworkMapper";
import { artistAuthService } from "src/modules/artist/services/artistAuthService";

const ArtworkId = (props: ArtworkIdPageProps) => {
  return (
    <>
      <Head>
        <title>{props.artwork.artworkName}</title>
        <meta
          name="description"
          content={`${props.artwork.artworkName} Page.`}
        />
      </Head>

      <Provider store={makeStore(props)}>
        <ArtworkIdPage />
      </Provider>
    </>
  );
};

export default ArtworkId;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}): Promise<GetServerSidePropsResult<ArtworkIdPageProps>> => {
  const e404 = {
    redirect: { destination: "/404", permanent: false },
  };
  if (params == null || params.id == null) {
    return e404;
  }

  const props: ArtworkIdPageProps = {
    isLogin: false,
    isArtistLikeArtwork: false,
    more: [],
    loggedArtist: {
      artistBiography: "",
      artistEmail: "",
      artistId: "",
      artistName: "",
      artistProfile: "",
    },
    artwork: {
      artworkPublishDate: "",
      artworkComments: [],
      artworkVotes: [],
      artworkId: "",
      artworkText: "",
      artworkImage: "",
      artworkName: "",
      artworkOwner: {
        artistBiography: "",
        artistEmail: "",
        artistId: "",
        artistName: "",
        artistProfile: "",
      },
    },
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
    const artwork = await artworkRepo.findOneArtwork(params.id as string);
    props.artwork = await ArtworkMapper.toDTO(artwork);
    if (artist != null) {
      const isArtistLikeArtwork = await artworkRepo.isArtistLikeArtwork(
        artist.artistId,
        artwork.artworkId
      );
      props.isArtistLikeArtwork = isArtistLikeArtwork;
    }
    const more = await artworkRepo.findMoreArtwork(
      artwork.artworkId,
      artwork.owner
    );
    props.more = await Promise.all(more.map((a) => ArtworkMapper.toDTO(a)));
  } catch (err) {
    return e404;
  }
  return { props };
};
