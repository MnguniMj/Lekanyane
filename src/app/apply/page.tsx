"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  Typography,
  Button,
  Input,
  Textarea,
  Select,
  Option,
  Card,
  CardBody,
  Checkbox,
} from "@material-tailwind/react";
import {
  ChevronRightIcon,
  HomeIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { addApplicant } from "@/lib/applicants";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  contactMethod: string;
  membershipType: string;
  additionalInfo: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  address: "",
  contactMethod: "phone",
  membershipType: "individual",
  additionalInfo: "",
  consent: false,
};

const RED = "#B83232";
const RED_DARK = "#9A2828";
const RED_LIGHT = "#FEF2F2";
const NAVY = "#0F172A";

export default function ApplyPage() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = e.target;
    const name = target.name as keyof FormState;
    let value: string | boolean;
    if ("type" in target && target.type === "checkbox") {
      value = (target as HTMLInputElement).checked;
    } else {
      value = (target as HTMLInputElement | HTMLTextAreaElement).value;
    }
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) {
      setErrors((er) => ({ ...er, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: keyof FormState, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) {
      setErrors((er) => ({ ...er, [name]: undefined }));
    }
  };

  const handleBooleanChange = (name: keyof FormState, value: boolean) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) {
      setErrors((er) => ({ ...er, [name]: undefined }));
    }
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!values.firstName.trim()) {
      next.firstName = "Please enter your first name.";
    }
    if (!values.lastName.trim()) {
      next.lastName = "Please enter your last name.";
    }
    if (!values.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.phone.trim()) {
      next.phone = "Please enter your phone number.";
    } else if (!/^[+()\-\s\d]{6,}$/.test(values.phone.trim())) {
      next.phone = "Please enter a valid phone number.";
    }
    if (!values.consent) {
      next.consent = "Please confirm and accept the consent checkbox.";
    }
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setIsLoading(true);
    try {
      addApplicant({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        dateOfBirth: values.dateOfBirth,
        address: values.address,
        contactMethod: values.contactMethod as "phone" | "email",
        membershipType: values.membershipType as "individual" | "other",
        additionalInfo: values.additionalInfo,
        consent: values.consent,
      });
    } catch {
      /* prototype persistence is best-effort */
    }
    await new Promise((r) => setTimeout(r, 1400));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const inputClassName = (field: keyof FormState) =>
    `!border-t-gray-200 !border-l-gray-200 !border-r-gray-200 ${
      errors[field]
        ? "!border-b-red-500 focus:!border-b-red-600"
        : "!border-b-gray-400 focus:!border-b-[#B83232]"
    }`;

  const helperText = (field: keyof FormState, message?: string) => {
    if (errors[field]) return errors[field];
    return message || "";
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-sm mb-6 text-gray-500">
          <Link
            href="/"
            className="inline-flex items-center gap-1 hover:text-gray-900 transition-colors"
          >
            <HomeIcon className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <ChevronRightIcon className="h-4 w-4" />
          <span className="text-gray-800 font-medium">
            Apply for Membership
          </span>
        </div>

        <div className="text-center mb-10">
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-2 uppercase tracking-widest font-medium"
            style={{ color: RED }}
          >
            Join Lekanyane
          </Typography>
          <Typography variant="h2" color="blue-gray" className="mb-3">
            Apply for Membership
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto max-w-2xl !text-gray-500"
          >
            Take the first step towards a stronger financial future with
            Lekanyane.
          </Typography>
        </div>

        {isSubmitted ? (
          <Card shadow={true} className="border border-gray-100 rounded-2xl">
            <CardBody className="p-8 md:p-14 flex flex-col items-center text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: RED_LIGHT }}
              >
                <CheckCircleIcon className="h-10 w-10" style={{ color: RED }} />
              </div>
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-2 uppercase tracking-widest font-medium"
                style={{ color: RED }}
              >
                Application Submitted
              </Typography>
              <Typography variant="h3" color="blue-gray" className="mb-4">
                Thank you for your interest in Lekanyane.
              </Typography>
              <Typography
                variant="lead"
                className="mb-10 max-w-xl !text-gray-500"
              >
                Your membership application has been received. Our team will
                review your information and contact you using the details
                provided.
              </Typography>
              <Link href="/">
                <Button
                  color="gray"
                  size="lg"
                  className={`!bg-[${RED}] !text-white hover:!bg-[${RED_DARK}] !px-10 !border-0`}
                  style={{ backgroundColor: RED }}
                >
                  Back to Home
                </Button>
              </Link>
            </CardBody>
          </Card>
        ) : (
          <Card shadow={true} className="border border-gray-100 rounded-2xl">
            <CardBody className="p-6 md:p-10 lg:p-12">
              <div className="mb-8 pb-6 border-b border-gray-100">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  Membership Application
                </Typography>
                <Typography variant="paragraph" className="!text-gray-500">
                  Please provide your details below and our team will contact
                  you regarding your membership application.
                </Typography>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-10">
                <section>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mb-5 font-semibold"
                  >
                    Personal Information
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Input
                        size="lg"
                        label="First Name *"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        className={inputClassName("firstName")}
                        crossOrigin={undefined}
                      />
                      {helperText("firstName") && (
                        <Typography
                          variant="small"
                          className="mt-1 ml-1 !text-red-600"
                          color="red"
                        >
                          {helperText("firstName")}
                        </Typography>
                      )}
                    </div>
                    <div>
                      <Input
                        size="lg"
                        label="Last Name *"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        className={inputClassName("lastName")}
                        crossOrigin={undefined}
                      />
                      {helperText("lastName") && (
                        <Typography
                          variant="small"
                          className="mt-1 ml-1 !text-red-600"
                          color="red"
                        >
                          {helperText("lastName")}
                        </Typography>
                      )}
                    </div>
                    <div>
                      <Input
                        size="lg"
                        label="Email Address *"
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        className={inputClassName("email")}
                        crossOrigin={undefined}
                      />
                      {helperText("email") && (
                        <Typography
                          variant="small"
                          className="mt-1 ml-1 !text-red-600"
                          color="red"
                        >
                          {helperText("email")}
                        </Typography>
                      )}
                    </div>
                    <div>
                      <Input
                        size="lg"
                        label="Phone Number *"
                        type="tel"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        className={inputClassName("phone")}
                        crossOrigin={undefined}
                      />
                      {helperText("phone") && (
                        <Typography
                          variant="small"
                          className="mt-1 ml-1 !text-red-600"
                          color="red"
                        >
                          {helperText("phone")}
                        </Typography>
                      )}
                    </div>
                  </div>
                </section>

                <section>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mb-5 font-semibold"
                  >
                    Additional Information
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Input
                        size="lg"
                        label="Date of Birth"
                        type="date"
                        name="dateOfBirth"
                        value={values.dateOfBirth}
                        onChange={handleChange}
                        className="!border-t-gray-200 !border-l-gray-200 !border-r-gray-200 !border-b-gray-400 focus:!border-b-[#B83232]"
                        crossOrigin={undefined}
                      />
                    </div>
                    <div>
                      <Select
                        size="lg"
                        label="Preferred Contact Method"
                        name="contactMethod"
                        value={values.contactMethod}
                        onChange={(val) =>
                          handleSelectChange("contactMethod", val ?? "phone")
                        }
                      >
                        <Option value="phone">Phone</Option>
                        <Option value="email">Email</Option>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Input
                      size="lg"
                      label="Residential Address"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      className="!border-t-gray-200 !border-l-gray-200 !border-r-gray-200 !border-b-gray-400 focus:!border-b-[#B83232]"
                      crossOrigin={undefined}
                    />
                  </div>
                </section>

                <section>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mb-5 font-semibold"
                  >
                    Membership
                  </Typography>
                  <div className="max-w-lg">
                    <Select
                      size="lg"
                      label="Membership Type"
                      name="membershipType"
                      value={values.membershipType}
                      onChange={(val) =>
                        handleSelectChange(
                          "membershipType",
                          val ?? "individual",
                        )
                      }
                    >
                      <Option value="individual">Individual Membership</Option>
                      <Option value="other">Other Membership</Option>
                    </Select>
                  </div>
                </section>

                <section>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mb-5 font-semibold"
                  >
                    Message
                  </Typography>
                  <div>
                    <Textarea
                      size="lg"
                      label="Additional Information"
                      name="additionalInfo"
                      value={values.additionalInfo}
                      onChange={handleChange}
                      placeholder="Is there anything you would like us to know?"
                      className="!border-t-gray-200 !border-l-gray-200 !border-r-gray-200 !border-b-gray-400 focus:!border-b-[#B83232]"
                    />
                  </div>
                </section>

                <section>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="consent"
                      name="consent"
                      checked={values.consent}
                      onChange={(checked) =>
                        handleBooleanChange("consent", Boolean(checked))
                      }
                      className={`!border-gray-400 ${
                        errors.consent ? "!border-red-500" : ""
                      }`}
                      ripple={true}
                      crossOrigin={undefined}
                    />
                    <label
                      htmlFor="consent"
                      className="text-sm font-normal text-gray-700 cursor-pointer select-none pt-1"
                    >
                      I confirm that the information provided is accurate and I
                      agree to be contacted regarding my membership application.
                    </label>
                  </div>
                  {helperText("consent") && (
                    <Typography
                      variant="small"
                      className="mt-1 ml-1 !text-red-600"
                      color="red"
                    >
                      {helperText("consent")}
                    </Typography>
                  )}
                </section>

                <div className="pt-4 flex flex-col md:flex-row justify-end gap-3">
                  <Link href="/">
                    <Button
                      variant="outlined"
                      color="gray"
                      size="lg"
                      className="!px-8 w-full md:w-auto"
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    color="gray"
                    size="lg"
                    disabled={isLoading}
                    className="!px-10 w-full md:w-auto !border-0"
                    style={{
                      backgroundColor: isLoading ? RED_DARK : RED,
                    }}
                  >
                    {isLoading ? (
                      <span className="inline-flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Submitting…
                      </span>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}
