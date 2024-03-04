import Layout from "../components/Layout";

const NotFound = () => (
  <Layout>
    <h1
      className="text-muted"
      style={{ textAlign: "center", marginTop: 200, fontSize: 48 }}
    >
      404
    </h1>
    <h2 style={{ textAlign: "center", marginTop: 16 }}>
      OOOOOOOPS! Page is not found...
    </h2>
  </Layout>
);
export default NotFound;
