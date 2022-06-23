import '../styles/global.css'

import "tailwindcss/tailwind.css";


export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
 
      <Component {...pageProps} />

  )
}