import Head from 'next/head'
import '../styles/globals.css'
import '../styles/bootstrap.min.css'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />

        <title>Online Youtube Video Downloader</title>
        <meta name="description" content="Online video downloader by instantyoutubevideodownloader is a fast and safe software allowing to download videos from the Internet in unlimited numbers. Our online video download service is secure, easy to use, and free!" />

        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no"
          name="viewport" />

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2935950303761162"
          crossorigin="anonymous"></script>

      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
