import Head from "next/head";
import { GetServerSideProps } from "next";

export default function Home() {
  return (
    <>
      <Head>
        <title>ArtWave 🌊</title>
        <meta name="description" content="ArtWave Home Page." />
      </Head>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  console.log("hey");
  return { props: {} };
};
