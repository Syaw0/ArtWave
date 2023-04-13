import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { artistRepo } from "../../../../../src/modules/artist/repo/artistRepo";
import { ArtistMapper } from "../../../../../src/modules/artist/mapper/artistMapper";
import { Provider } from "react-redux";
import { makeStore } from "src/shared/infra/store/setting/settingStore";
import SettingPage from "src/shared/components/pages/setting/settingPage";

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

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<SettingPageProps>
> => {
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
