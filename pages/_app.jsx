import Head from "next/head";
import "/styles/globals.css";

export default function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>Frontend Mentor | Fall Limited Edition Sneakers</title>
        <meta name="description" content="These low-profile sneakers are your perfect casual wear companion. Featuring a	durable rubber outer sole, they’ll withstand everything the weather can offer." />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
