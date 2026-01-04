import Layout from "../components/Layout";
import "../styles/main.css"; // new global CSS

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
