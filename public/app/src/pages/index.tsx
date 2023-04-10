import Head from "next/head";
import style from "../styles/pageStyles/home.module.css";
import { GetServerSideProps } from "next";
import Navbar from "src/shared/components/navbar/navbar";
import ArtworkHolder from "src/shared/components/artworkHolder/artworkHolder";

const artworkLinks = [
  "https://az333960.vo.msecnd.net/images-4/a-group-of-danish-artists-in-rome-constantin-hansen-1837-3713eb83.jpg",
  "https://az334033.vo.msecnd.net/images-1/italian-landscape-with-umbrella-pines-hendrik-voogd-1807-201aa20f.jpg",
  "https://az333960.vo.msecnd.net/images-6/mischief-and-repose-john-william-godward-1895-1-9fe80739.jpg",
  "https://az333960.vo.msecnd.net/images-3/view-of-the-arch-of-constantine-with-the-colosseum-canaletto-1742-75d2bfa1.jpg",
  "https://az333959.vo.msecnd.net/images-8/green-wheat-fields-auvers-vincent-van-gogh-1890-0e6db666.jpg",
  "https://az334033.vo.msecnd.net/images-5/still-life-with-flowers-in-a-glass-vase-jan-davidsz-de-heem-1650-611b5523.jpg",
  "https://az334034.vo.msecnd.net/images-9/picking-flowers-pierre-auguste-renoir-1875-58ac4d31.jpg",
  "https://az334033.vo.msecnd.net/images-0/sunflowers-possibly-jerusalem-artichoke-hannah-borger-overbeck-1915-646d4cdf.jpg",
  "https://az333959.vo.msecnd.net/images-5/the-railway-edouard-manet-1873-15eced0e.jpg",
  "https://az334034.vo.msecnd.net/images-1/fruit-piece-jan-van-huysum-1722-69136002.jpg",
];

export default function Home() {
  return (
    <>
      <Head>
        <title>ArtWave 🌊</title>
        <meta name="description" content="ArtWave Home Page." />
      </Head>

      <div className={style.con}>
        <Navbar isLogin={true} profileImage={null} />
        <ArtworkHolder artworks={artworkLinks} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  console.log("hey");
  return { props: {} };
};
