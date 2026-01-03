import Layout from "../components/Layout";
import "../styles/globals.css"; // optional if using CSS

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
