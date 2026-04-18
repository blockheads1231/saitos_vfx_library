// pages/_app.jsx
import 'nextra-theme-docs/style.css'
import { useMDXComponents } from 'nextra-theme-docs'

export { useMDXComponents }

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}