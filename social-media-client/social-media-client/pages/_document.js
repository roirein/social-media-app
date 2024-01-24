import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true}/>
        <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;800&family=Lato:wght@300&family=Roboto+Condensed:wght@300&family=Roboto:wght@100;500&display=swap" rel="stylesheet"/>
      </Head>
      <body style={{
        margin: 0,
        padding: 0,
        height:"100%",
        overflow: 'hidden'
      }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
