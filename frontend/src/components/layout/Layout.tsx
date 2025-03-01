import Footer from "./Footer";
import Navbar from "./Navbar";


export default function Layout({children}:{ children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh] w-ful">{children}</div>
      <Footer />
    </div>
  );
}
