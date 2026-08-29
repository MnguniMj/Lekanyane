"use client";

import { Typography } from "@material-tailwind/react";
import EventContentCard from "@/components/event-content-card";

const RESOURCE_CONTENT = [
  {
    title: "Smart Saving Habits for a Better Tomorrow",
    des: "Discover simple and effective saving habits that can help you achieve your financial goals and build a secure future.",
    category: "Financial Education",
    img: "/image/blog-1.svg",
  },
  {
    title: "How to Apply for a Lekanyane Loan",
    des: "Learn about the loan application process and the steps involved in accessing financial support through Lekanyane.",
    category: "Loans & Finance",
    img: "/image/blog2.svg",
  },
  {
    title: "Growing Together",
    des: "Discover how responsible saving, borrowing and financial planning can help members work towards a stronger financial future.",
    category: "Member Success",
    img: "/image/blog3.svg",
  },
];

export function EventContent() {
  return (
    <section id="resources" className="py-8 px-8 lg:py-20">
      <div className="w-full flex mb-16 flex-col items-center">
        <Typography
          variant="h6"
          color="blue-gray"
          className="mb-2 font-medium uppercase tracking-widest"
          style={{ color: "#B83232" }}
        >
          Financial Resources
        </Typography>
        <Typography variant="h3" color="blue-gray" className="mb-3">
          Financial Tips & Resources
        </Typography>
        <Typography
          variant="lead"
          className="max-w-3xl text-center font-normal !text-gray-500"
        >
          Stay informed with practical financial tips, savings guidance and
          useful information to help you make better financial decisions.
        </Typography>
      </div>
      <div className="mx-auto container">
        {RESOURCE_CONTENT.map((props, idx) => (
          <EventContentCard key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}

export default EventContent;
