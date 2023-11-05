import Section from "@/app/(Home)/Section/section.index";
import image from "../../image.jpg";
import Image from "next/image";
export default function Hero() {
  return (
    <Section className=" h-screen hero-bg">
      <div className="flex flex-col justify-between h-full gap-8 pt-24">
        <div className= "flex flex-col items-center text-center md:text-7xl text-4xl font-black text-gray-3 ">
          <h3>Create Your Professional</h3>
          <span className="text-primary">Portfolio For Free.</span>
        </div>
        <div className="grow ">
          <div className="relative h-full">
        <Image alt="Image" fill src={image} className="object-cover object-top rounded-t-3xl shadow-3xl"></Image>
        </div>
      
        </div>
      </div>
    </Section>
  );
}
