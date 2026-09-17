import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MobileCTA from '../components/layout/MobileCTA';
import Hero from '../components/sections/Hero';
import Testimonials from '../components/sections/Testimonials';
import Included from '../components/sections/Included';
import FinalCTA from '../components/sections/FinalCTA';

/* Conversion sequence: identify → see how Edgar explains → real proof →
   the offer → apply.
     Hero (clips + CTA) · Student results · What's included · Final CTA.
   The standalone "how I teach" section is temporarily folded into the hero
   (its three clips act as the VSL); re-add <Teaching /> to restore it. */
const Home = () => {
  useEffect(() => {
    document.title = 'OFS Private Mentorship | Work 1:1 with Edgar Alvarez';
  }, []);

  return (
    <div className="ofs-has-mobilebar" style={{ background: '#070808', minHeight: '100vh' }} data-testid="application-home">
      <Header />
      <main>
        <Hero />          {/* dark  — headline + clips + apply */}
        <Testimonials />  {/* dark  — student results */}
        <Included />      {/* blue  — what's included */}
        <FinalCTA />      {/* dark  — the close */}
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
};

export default Home;
