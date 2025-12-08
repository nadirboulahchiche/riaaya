import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Home from '../Components/Home';
import About from '../Components/About';
import Services from '../Components/Services';
import Doctors from '../Components/Doctors';
import Blogs from '../Components/Blogs';

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <div id="home"><Home /></div>
        <div id="about"><About /></div>
        <div id="services"><Services /></div>
        <div id="doctors"><Doctors /></div>
        <div id="blogs"><Blogs /></div>
      </main>
      <Footer />
    </>
  );
}
