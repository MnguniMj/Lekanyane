import { Typography, Button, IconButton } from "@material-tailwind/react";

const LINKS = ["Home", "About Us", "Services", "FAQs", "Contact"];
const LINK_HREFS = ["#home", "#about", "#services", "#faq", "#contact"];

export function Footer() {
  return (
    <footer className="pb-5 p-10 md:pt-10">
      <div className="container flex flex-col mx-auto">
        <div
          id="join"
          className="flex !w-full py-10 mb-5 md:mb-20 flex-col justify-center !items-center max-w-6xl mx-auto rounded-2xl p-5"
          style={{ backgroundColor: "#0F172A" }}
        >
          <Typography
            className="text-2xl md:text-3xl text-center font-bold"
            color="white"
          >
            Join Lekanyane Today
          </Typography>
          <Typography
            color="white"
            className="md:w-7/12 text-center my-3 !text-base !text-white/80"
          >
            Take the first step towards a stronger financial future.
          </Typography>
          <div className="flex w-full md:w-fit gap-3 mt-2 flex-col md:flex-row">
            <a href="/apply">
              <Button
                color="gray"
                size="md"
                className="!bg-[#B83232] !text-white hover:!bg-[#9A2828] !px-8 !border-0"
              >
                Become a Member
              </Button>
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center !justify-between">
          <Typography
            as="a"
            href="#home"
            variant="h6"
            className="text-gray-900"
          >
            Lekanyane
          </Typography>
          <ul className="flex justify-center my-4 md:my-0 w-max mx-auto items-center gap-4">
            {LINKS.map((link, index) => (
              <li key={index}>
                <Typography
                  as="a"
                  href={LINK_HREFS[index]}
                  variant="small"
                  color="white"
                  className="font-normal !text-gray-700 hover:!text-gray-900 transition-colors"
                >
                  {link}
                </Typography>
              </li>
            ))}
          </ul>
          <div className="flex w-fit justify-center gap-2">
            <IconButton size="sm" color="gray" variant="text">
              <i className="fa-brands fa-twitter text-lg" />
            </IconButton>
            <IconButton size="sm" color="gray" variant="text">
              <i className="fa-brands fa-facebook text-lg" />
            </IconButton>
            <IconButton size="sm" color="gray" variant="text">
              <i className="fa-brands fa-instagram text-lg" />
            </IconButton>
            <IconButton size="sm" color="gray" variant="text">
              <i className="fa-brands fa-linkedin text-lg" />
            </IconButton>
          </div>
        </div>
        <Typography
          color="blue-gray"
          className="text-center mt-12 font-normal !text-gray-700"
        >
          &copy; 2026 Lekanyane. All rights reserved.
        </Typography>
        <p className="text-center font-normal !text-gray-700 mt-2">
          Distributed by{" "}
          <a
            className="text-green-700 font-semibold"
            href="https://themewagon.com"
            target="_blank"
          >
            ThemeWagon
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
