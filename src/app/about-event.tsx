"use client";

import { Typography } from "@material-tailwind/react";
import AboutCard from "@/components/about-card";

const SERVICE_INFO = [
  {
    title: "Savings Services",
    description:
      "Build a secure financial future with flexible and reliable savings solutions designed to help you reach your goals.",
    subTitle: "Save",
    buttonText: "Learn More",
    buttonHref: "#services",
  },
  {
    title: "Loan Services",
    description:
      "Access affordable financing for personal, family or business needs, with repayment options designed around our members.",
    subTitle: "Borrow",
    buttonText: "Learn More",
    buttonHref: "#services",
  },
];

export function AboutEvent() {
  return (
    <section
      id="about"
      className="container mx-auto flex flex-col items-center px-4 py-10"
    >
      <Typography
        variant="h6"
        color="blue-gray"
        className="text-center mb-2 uppercase tracking-widest font-medium"
        style={{ color: "#B83232" }}
      >
        About Lekanyane
      </Typography>
      <Typography variant="h3" className="text-center" color="blue-gray">
        Why Choose Us?
      </Typography>
      <Typography
        variant="lead"
        className="mt-2 lg:max-w-4xl mb-8 w-full text-center font-normal !text-gray-500"
      >
        Lekanyane is a member-based financial cooperative dedicated to helping
        individuals and families achieve their financial goals through saving,
        affordable loans and responsible financial management.
      </Typography>
      <div
        id="services"
        className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {SERVICE_INFO.map((props, idx) => (
          <AboutCard key={idx} {...props} />
        ))}
        <div className="md:col-span-2">
          <AboutCard
            title="Membership Benefits"
            subTitle="Grow"
            description="As a member, you gain access to financial services, support and opportunities designed to help you grow financially."
            buttonText="Join Today"
            buttonHref="/apply"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutEvent;
