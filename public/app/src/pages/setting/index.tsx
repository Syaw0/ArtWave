import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { artistRepo } from "../../../../../src/modules/artist/repo/artistRepo";
import { ArtistMapper } from "../../../../../src/modules/artist/mapper/artistMapper";
import { Provider } from "react-redux";
import { makeStore } from "src/shared/infra/store/setting/settingStore";
import SettingPage from "src/shared/components/pages/setting/settingPage";
import { artistAuthService } from "src/modules/artist/services/artistAuthService";
import { authenticationService } from "../../../../../src/modules/artist/service";

const Setting = (props: SettingPageProps) => {
  return (
    <>
      <Head>
        <title>ArtWave🌊-Setting</title>
        <meta name="description" content="ArtWave Setting Page." />
      </Head>
      <Provider store={makeStore(props)}>
        <SettingPage />
      </Provider>
    </>
  );
};
export default Setting;

export const getServerSideProps: GetServerSideProps = async ({
  req,
}): Promise<GetServerSidePropsResult<SettingPageProps>> => {
  const props: SettingPageProps = {
    isLogin: false,
    loggedArtist: {
      artistBiography: "",
      artistEmail: "",
      artistId: "",
      artistName: "",
      artistProfile: "",
    },
  };

  const isLogged = artistAuthService.isArtistLoggedIn(req.cookies);
  console.log(isLogged);
  if (!isLogged) {
    props.isLogin = false;
  } else {
    const refresh = req.cookies.refresh as string;
    const isRefreshTokenExist = await authenticationService.isRefreshTokenExist(
      refresh
    );
    if (!isRefreshTokenExist) {
      props.isLogin = false;
    } else {
      props.isLogin = true;
    }
    const email = await authenticationService.getEmailFromRefreshToken(refresh);

    const artist = await artistRepo.findByEmail(email);
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
