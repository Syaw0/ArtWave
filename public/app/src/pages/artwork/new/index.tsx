import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import NewArtworkPage from "src/shared/components/pages/newArtwork/newArtwork";
import { makeStore } from "src/shared/infra/store/newArtwork/newArtworkStore";
import { artistRepo } from "../../../../../../src/modules/artist/repo/artistRepo";
import { ArtistMapper } from "../../../../../../src/modules/artist/mapper/artistMapper";

const NewArtwork = (props: NewArtworkPageProps) => {
  return (
    <>
      <Head>
        <title>new artwork</title>
        <meta name="description" content={`new artwork Page.`} />
      </Head>

      <Provider store={makeStore(props)}>
        <NewArtworkPage />
      </Provider>
    </>
  );
};

export default NewArtwork;

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<NewArtworkPageProps>
> => {
  const props: NewArtworkPageProps = {
    isLogin: false,
    loggedArtist: {
      artistBiography: "",
      artistEmail: "",
      artistId: "",
      artistName: "",
      artistProfile: "",
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
  return { props };
};
