import About from "./components/About/about.index";
import Features from "./components/Features/features.index";
import Hero from "./components/Hero/hero.index";

export default async function Home() {
  return (
      <div className="h-full">
          <Hero />
          <About />
          <Features />
      </div>
    )
}
