import React from "react";

import cms from "./cms.png";
import dashboard from "./dashboard.png";
import Feature from "./feature";
import Section from "../Section";

const features = [
  {
    title: "Built-in CMS",
    description: "Edit your folio whenever you want",
    src: cms,
    cols: 3,
  },
  {
    title: "Built-in Dashboard",
    description: "See your folio success",
    src: dashboard,
    cols: 3,
  },
  {
    title: "SEO Optimization",
    description: "Easy to find by search engines",
    cols: 2,
  },
  { title: "Customization", cols: 4 },
];
export default function Features() {
  return (
    <Section className="py-12">
      <div className="flex flex-col gap-12 text-center">
        <div>
          <h3 className="font-black text-gray-3 text-5xl">
            THE BEST PORTFOLIO CREATOR
          </h3>
          <p className="text-gray-2 font-semibold text-2xl">
            Everything you need to show your skills, all on a single platform.
          </p>
        </div>
      <div className="grid grid-cols-6 place-content-between gap-6">
        {features.map((feature) => (
          <Feature {...feature} key={feature.title} />
        ))}
      </div>
      </div>
    </Section>
  );
}
