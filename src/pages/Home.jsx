import { useEffect, useState } from "react";
import { LoadingScreen } from "../components/LoadingScreen";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Tracks } from "../components/Tracks";
import { Sponsors } from "../components/Sponsors";
import { Prizes } from "../components/Prizes";
import { Timeline } from "../components/Timeline";
import { FAQ } from "../components/FAQ";
import { Team } from "../components/Team";
import { Footer } from "../components/Footer";
import { RegistrationModal } from "../components/RegistrationModal";
import InteractionFluidLayer from "../components/CursorFog";
import { Toaster } from "../components/ui/sonner";

const Home = () => {
  const [ready, setReady] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      if (document.fonts) {
        await document.fonts.ready;
      }
      await new Promise((r) => requestAnimationFrame(r));

      const criticalImages = ["/images/GTH.png"];
      await Promise.all(
        criticalImages.map(
          (src) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
              img.onerror = resolve;
            })
        )
      );

      setReady(true);
    }

    prepareApp();
  }, []);

  return (
    <div className="App relative z-10">
      <div className="noise-overlay" />
      <LoadingScreen ready={ready} />

      {ready && (
        <>
          <InteractionFluidLayer />
          <Header />

          <main>
            <Hero onRegisterClick={() => setIsRegistrationOpen(true)} />
            <About />
            <Tracks />
            <Sponsors />
            <Prizes />
            <Timeline />
            <FAQ />
            <Team />
            <Footer onRegisterClick={() => setIsRegistrationOpen(true)} />
          </main>

          <RegistrationModal
            isOpen={isRegistrationOpen}
            onClose={() => setIsRegistrationOpen(false)}
          />

          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1A0B2E",
                border: "1px solid rgba(124, 58, 237, 0.3)",
                color: "#F3F4F6",
              },
            }}
          />
        </>
      )}
    </div>
  );
};

export default Home;
