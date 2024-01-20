import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
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
