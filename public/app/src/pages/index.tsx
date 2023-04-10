import Head from "next/head";
import style from "../styles/pageStyles/home.module.css";
import { GetServerSideProps } from "next";
import Navbar from "src/shared/components/navbar/navbar";
import ArtworkHolder from "src/shared/components/artworkHolder/artworkHolder";
import { artworks } from "src/shared/fakeData";

export default function Home() {
  return (
    <>
      <Head>
        <title>ArtWave 🌊</title>
        <meta name="description" content="ArtWave Home Page." />
      </Head>

      <div className={style.con}>
        <Navbar isLogin={true} profileImage={null} />
        <ArtworkHolder artworks={artworks} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  console.log("hey");
  return { props: {} };
};
