import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = { children: React.ReactNode; className?: string };

const Layout = ({ children, className }: LayoutProps) => (
  <>
    <Header />
    <main className={className}>{children}</main>
    <Footer />
  </>
);

export default Layout;
