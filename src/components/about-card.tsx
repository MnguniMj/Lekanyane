import { Card, CardBody, Typography, Button } from "@material-tailwind/react";

interface AboutCardProp {
  title: string;
  subTitle: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}

export function AboutCard({
  title,
  description,
  subTitle,
  buttonText = "Learn More",
  buttonHref = "#services",
}: AboutCardProp) {
  return (
    <Card shadow={false}>
      <CardBody className="min-h-[453px] h-full p-5 flex flex-col justify-center items-center rounded-2xl bg-gray-900">
        <Typography
          variant="h6"
          color="white"
          className="mb-4 text-center"
          style={{ color: "#E5E7EB" }}
        >
          {subTitle}
        </Typography>
        <Typography variant="h4" className="text-center" color="white">
          {title}
        </Typography>
        <Typography
          color="white"
          className="mt-2 mb-10 text-base w-full lg:w-8/12 text-center font-normal !text-white/80"
        >
          {description}
        </Typography>
        <a href={buttonHref}>
          <Button
            color="gray"
            className="!bg-[#B83232] !text-white hover:!bg-[#9A2828] !border-0"
            size="sm"
          >
            {buttonText}
          </Button>
        </a>
      </CardBody>
    </Card>
  );
}

export default AboutCard;
