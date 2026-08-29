import Image from "next/image";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import {
  BookOpenIcon,
  BanknotesIcon,
  UsersIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";

interface ResourceCardProps {
  title: string;
  des: string;
  category: string;
  img: string;
}

const getIconForCategory = (category: string) => {
  switch (category) {
    case "Financial Education":
      return BookOpenIcon;
    case "Loans & Finance":
      return BanknotesIcon;
    case "Member Success":
      return UsersIcon;
    default:
      return LightBulbIcon;
  }
};

export function EventContentCard({
  title,
  des,
  category,
  img,
}: ResourceCardProps) {
  const IconComponent = getIconForCategory(category);
  return (
    <Card
      color="transparent"
      shadow={false}
      className="lg:!flex-row mb-10 lg:items-end"
    >
      <CardHeader
        floated={false}
        shadow={false}
        className="h-[32rem] max-w-[28rem] shrink-0"
      >
        <Image
          width={768}
          height={768}
          src={img}
          alt={title}
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="col-span-full lg:col-span-3">
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#FEF2F2" }}
          >
            <IconComponent className="h-4 w-4" style={{ color: "#B83232" }} />
          </div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-0 font-medium"
            style={{ color: "#B83232" }}
          >
            {category}
          </Typography>
        </div>
        <Typography variant="h2" color="blue-gray" className="mb-4 font-medium">
          {title}
        </Typography>
        <Typography className="mb-8 md:w-8/12 font-medium !text-gray-500">
          {des}
        </Typography>
        <a
          href="#resources"
          className="inline-flex items-center gap-2 text-sm font-medium"
          style={{ color: "#B83232" }}
        >
          Read Article
          <span>→</span>
        </a>
      </CardBody>
    </Card>
  );
}

export default EventContentCard;
