"use client";

import { IconButton, Button, Typography } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

function Hero() {
  return (
    <div
      id="home"
      className="relative min-h-screen w-full bg-[url('/image/event.jpeg')] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 h-full w-full bg-black/50" />
      <div className="grid min-h-screen px-8">
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
          <Typography
            variant="h6"
            color="white"
            className="mb-3 tracking-widest uppercase"
            style={{ color: "#FFFFFF" }}
          >
            Save • Borrow • Grow
          </Typography>
          <Typography variant="h1" color="white" className="lg:max-w-3xl mb-4">
            Lekanyane
          </Typography>
          <Typography variant="h3" color="white" className="mb-6 font-normal">
            Your Trusted Partner in Financial Growth
          </Typography>
          <Typography
            variant="lead"
            color="white"
            className="mt-1 mb-12 w-full md:max-w-full lg:max-w-2xl !text-white/85"
          >
            A member-focused financial cooperative helping individuals and
            families build a stronger financial future through saving,
            responsible borrowing and community support.
          </Typography>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="/apply">
              <Button
                color="gray"
                className="!bg-[#B83232] !text-white hover:!bg-[#9A2828] !px-8 !border-0"
                size="lg"
              >
                Join Lekanyane
              </Button>
            </a>
            <a href="#about">
              <Button
                variant="outlined"
                color="white"
                size="lg"
                className="flex items-center gap-2"
              >
                <InformationCircleIcon className="h-5 w-5" />
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
