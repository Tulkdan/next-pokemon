import { Html, Head, Main, NextScript } from 'next/document'
import HeaderComponent from '../src/components/Header'
import Footer from '../src/components/Footer'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div className="flex justify-center">
          <HeaderComponent />
        </div>

        <Main />
        <NextScript />

        <Footer />
      </body>
    </Html>
  )
}
