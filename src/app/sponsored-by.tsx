"use client";

import { Typography } from "@material-tailwind/react";
import {
  ShieldCheckIcon,
  UsersIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  HandRaisedIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

const TRUST_ITEMS = [
  {
    icon: ShieldCheckIcon,
    label: "Secure Savings",
  },
  {
    icon: UsersIcon,
    label: "Member Owned",
  },
  {
    icon: BanknotesIcon,
    label: "Affordable Loans",
  },
  {
    icon: BuildingLibraryIcon,
    label: "Community Driven",
  },
  {
    icon: HandRaisedIcon,
    label: "Responsible Lending",
  },
  {
    icon: HeartIcon,
    label: "People First",
  },
];

export function SponsoredBy() {
  return (
    <section className="py-8 px-8 lg:py-20">
      <div className="container mx-auto text-center">
        <Typography
          variant="h6"
          color="blue-gray"
          className="mb-3 tracking-widest uppercase font-medium"
          style={{ color: "#B83232" }}
        >
          Why You Can Trust Us
        </Typography>
        <Typography variant="h3" color="blue-gray" className="mb-4">
          Trusted Financial Partner
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto mb-12 max-w-2xl w-full text-center font-normal !text-gray-500"
        >
          Lekanyane is built on principles of trust, transparency, and
          shared prosperity. As a member-owned cooperative, our members come
          first in everything we do.
        </Typography>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {TRUST_ITEMS.map(({ icon: Icon, label }, key) => (
            <div key={key} className="flex flex-col items-center gap-2">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#FEF2F2" }}
              >
                <Icon className="h-7 w-7" style={{ color: "#B83232" }} />
              </div>
              <Typography
                variant="small"
                className="font-medium text-blue-gray-700"
              >
                {label}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SponsoredBy;
