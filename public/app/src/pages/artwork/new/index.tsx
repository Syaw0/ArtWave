import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import NewArtworkPage from "src/shared/components/pages/newArtwork/newArtwork";
import { makeStore } from "src/shared/infra/store/newArtwork/newArtworkStore";
import { artistRepo } from "../../../../../../src/modules/artist/repo/artistRepo";
import { ArtistMapper } from "../../../../../../src/modules/artist/mapper/artistMapper";
import { artistAuthService } from "src/modules/artist/services/artistAuthService";

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

export const getServerSideProps: GetServerSideProps = async ({
  req,
}): Promise<GetServerSidePropsResult<NewArtworkPageProps>> => {
  const loginRedirect = {
    redirect: { destination: "/login", permanent: false },
  };
  const props: NewArtworkPageProps = {
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
  };

  const isLogged = artistAuthService.isArtistLoggedIn(req.cookies);
  let artist;
  if (!isLogged) {
    props.isLogin = false;
    return loginRedirect;
  } else {
    const refresh = req.cookies.refresh as string;
    const isRefreshTokenExist = await artistAuthService.isRefreshTokenExist(
      refresh
    );
    if (!isRefreshTokenExist) {
      props.isLogin = false;
      return loginRedirect;
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
  return { props };
};
