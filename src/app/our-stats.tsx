"use client";

import { Typography } from "@material-tailwind/react";
import StatsCard from "@/components/stats-card";

const STATS = [
  {
    count: "2,500+",
    title: "Active Members",
  },
  {
    count: "M10M+",
    title: "Total Savings",
  },
  {
    count: "1,200+",
    title: "Loans Granted",
  },
  {
    count: "10+",
    title: "Years of Service",
  },
];

export function OurStats() {
  return (
    <section className="container mx-auto grid gap-10 px-8 py-44 lg:grid-cols-1 lg:gap-20 xl:grid-cols-2 xl:place-items-center">
      <div>
        <Typography
          variant="h6"
          color="blue-gray"
          className="mb-6 font-medium uppercase tracking-widest"
          style={{ color: "#B83232" }}
        >
          Our Impact
        </Typography>
        <Typography
          className="text-5xl font-bold leading-tight lg:w-3/4"
          color="blue-gray"
        >
          Growing Together
        </Typography>
        <Typography
          variant="lead"
          className="mt-3 w-full !text-gray-500 lg:w-9/12"
        >
          Through saving, borrowing and financial support, we are working to
          help our members build stronger and more secure financial futures.
        </Typography>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-8 gap-x-28">
          {STATS.map((props, key) => (
            <StatsCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurStats;
