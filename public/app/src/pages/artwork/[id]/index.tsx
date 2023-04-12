import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import ArtworkIdPage from "src/shared/components/pages/artworkId/artworkId";
import { makeStore } from "src/shared/infra/store/artworkId/artworkIdStoreHooks";
import { artistRepo } from "../../../../../../src/modules/artist/repo/artistRepo";
import { ArtistMapper } from "../../../../../../src/modules/artist/mapper/artistMapper";
import { artworkRepo } from "../../../../../../src/modules/artwork/repo/artworkRepo";
import { ArtworkMapper } from "../../../../../../src/modules/artwork/mapper/artworkMapper";

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

  const artist = await artistRepo.findByEmail("siaw@gmail.com");
  if (artist == null) {
    props.isLogin = false;
  } else {
    props.isLogin = true;
  }
  const artistDTO = ArtistMapper.toDTO(artist);
  props.loggedArtist = artistDTO;

  try {
    const artwork = await artworkRepo.findOneArtwork(params.id as string);
    props.artwork = await ArtworkMapper.toDTO(artwork);

    const isArtistLikeArtwork = await artworkRepo.isArtistLikeArtwork(
      artist.artistId,
      artwork.artworkId
    );
    props.isArtistLikeArtwork = isArtistLikeArtwork;

    const more = await artworkRepo.findMoreArtwork(
      artwork.artworkId,
      artist.artistId
    );
    props.more = await Promise.all(more.map((a) => ArtworkMapper.toDTO(a)));
  } catch (err) {
    return e404;
  }
  return { props };
};
