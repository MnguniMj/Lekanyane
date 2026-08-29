"use client";

import React from "react";
import {
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const FAQS = [
  {
    title: "How do I register for Lekanyane?",
    desc: "To become a member, complete the membership registration process and provide the required information and documentation. Our team will guide you through the process.",
  },
  {
    title: "What are the requirements to join?",
    desc: "Membership requirements may include identification documents, registration information and an initial contribution. Specific requirements can be updated according to Lekanyane's policies.",
  },
  {
    title: "Can I apply for a loan as a new member?",
    desc: "Loan eligibility depends on Lekanyane's membership requirements, savings history and applicable lending policies. Members can contact us to understand the requirements for their specific situation.",
  },
  {
    title: "How does the savings and loan process work?",
    desc: "Members contribute regularly to their savings and may become eligible for loans according to Lekanyane's policies. Loan applications are assessed before approval, and approved loans are repaid according to the agreed repayment schedule.",
  },
  {
    title: "What are the interest rates on loans?",
    desc: "Interest rates and repayment terms depend on the specific loan product and Lekanyane's current policies. Members should contact us for the latest rates and terms.",
  },
];

export function Faq() {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <section id="faq" className="py-8 px-8 lg:py-20">
      <div className="container mx-auto">
        <div className="text-center">
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-2 font-medium uppercase tracking-widest"
            style={{ color: "#B83232" }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography variant="h3" color="blue-gray" className="mb-3">
            We&apos;re Here to Help
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto mb-24 lg:w-3/5 !text-gray-500"
          >
            Find answers to common questions about membership, savings, loans
            and how Lekanyane works.
          </Typography>
        </div>

        <div className="mx-auto lg:max-w-screen-lg lg:px-20">
          {FAQS.map(({ title, desc }, key) => (
            <Accordion
              key={key}
              open={open === key + 1}
              onClick={() => handleOpen(key + 1)}
            >
              <AccordionHeader className="text-left text-gray-900">
                {title}
              </AccordionHeader>
              <AccordionBody>
                <Typography
                  color="blue-gray"
                  className="font-normal text-gray-500"
                >
                  {desc}
                </Typography>
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
