import Navbar from "./components/navbar";
import About from "./components/sections/About/about.index";
import Features from "./components/sections/Features/features.index";
import Hero from "./components/sections/Hero/hero.index";

export default async function Home() {
  return (
    <div className="h-full">
      <Navbar />

      <Hero />
      <About />
      <Features />
    </div>
  );
}
