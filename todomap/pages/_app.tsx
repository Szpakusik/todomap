import { AppProps } from "next/app";
import "./global.scss";
import 'bootstrap/dist/css/bootstrap.min.css'

export default ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};