"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Input,
  Card,
  CardBody,
} from "@material-tailwind/react";
import {
  LockClosedIcon,
  UserIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import { login, getSession } from "@/lib/auth";

const RED = "#B83232";
const RED_DARK = "#9A2828";
const NAVY = "#0F172A";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [redirectTried, setRedirectTried] = useState(false);

  // If already logged in, bounce to dashboard
  useEffect(() => {
    if (redirectTried) return;
    const session = getSession();
    if (session) {
      setRedirectTried(true);
      router.replace("/admin");
    }
  }, [router, redirectTried]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const fe: typeof fieldErrors = {};
    if (!username.trim()) fe.username = "Please enter your username.";
    if (!password) fe.password = "Please enter your password.";
    if (Object.keys(fe).length > 0) {
      setFieldErrors(fe);
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const result = login(username, password);
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    const next = searchParams?.get("next") || "/admin";
    router.replace(next);
  };

  const inputCls = (field: "username" | "password") =>
    `!border-t-gray-200 !border-l-gray-200 !border-r-gray-200 ${
      fieldErrors[field]
        ? "!border-b-red-500 focus:!border-b-red-600"
        : "!border-b-gray-400 focus:!border-b-[#B83232]"
    }`;

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start px-4 pt-6 pb-12"
      style={{
        background: `linear-gradient(135deg, ${NAVY} 0%, #1F2A44 100%)`,
      }}
    >
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to website
          </Link>
        </div>
      </div>
      <div className="w-full max-w-md flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: RED }}
            >
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <div className="text-left">
              <div className="text-white font-semibold text-lg leading-none">
                Lekanyane
              </div>
              <div className="text-white/60 text-[11px] uppercase tracking-widest">
                Admin Console
              </div>
            </div>
          </div>
          <Typography
            variant="h4"
            placeholder=""
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            className="!text-white !font-bold mb-2"
          >
            Sign in to Admin
          </Typography>
          <Typography
            variant="lead"
            placeholder=""
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            className="!text-white/60 !text-sm"
          >
            Secure access to manage membership applications.
          </Typography>
        </div>

        <Card
          shadow={true}
          placeholder=""
          onResize={() => {}}
          onResizeCapture={() => {}}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
          className="rounded-2xl border border-white/10"
        >
          <CardBody
            placeholder=""
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            className="p-6 md:p-8"
          >
            {error && (
              <div
                className="mb-5 p-3 rounded-md text-sm border"
                style={{
                  backgroundColor: "#FEF2F2",
                  color: "#991B1B",
                  borderColor: "#FECACA",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="block text-xs font-medium text-gray-700 mb-2"
                >
                  Username
                </label>
                <div className="relative">
                  <UserIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="username"
                    name="username"
                    size="lg"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (fieldErrors.username)
                        setFieldErrors((f) => ({ ...f, username: undefined }));
                      if (error) setError(null);
                    }}
                    placeholder="Enter your username"
                    crossOrigin={undefined}
                    onResize={() => {}}
                    onResizeCapture={() => {}}
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    shrink={false}
                    className={`!pl-10 ${inputCls("username")}`}
                  />
                </div>
                {fieldErrors.username && (
                  <Typography
                    variant="small"
                    placeholder=""
                    onResize={() => {}}
                    onResizeCapture={() => {}}
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    className="mt-1 ml-1 !text-red-600"
                    color="red"
                  >
                    {fieldErrors.username}
                  </Typography>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    size="lg"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldErrors.password)
                        setFieldErrors((f) => ({ ...f, password: undefined }));
                      if (error) setError(null);
                    }}
                    placeholder="Enter your password"
                    crossOrigin={undefined}
                    onResize={() => {}}
                    onResizeCapture={() => {}}
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    shrink={false}
                    className={`!pl-10 ${inputCls("password")}`}
                  />
                </div>
                {fieldErrors.password && (
                  <Typography
                    variant="small"
                    placeholder=""
                    onResize={() => {}}
                    onResizeCapture={() => {}}
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    className="mt-1 ml-1 !text-red-600"
                    color="red"
                  >
                    {fieldErrors.password}
                  </Typography>
                )}
              </div>

              <Button
                type="submit"
                color="gray"
                size="lg"
                disabled={loading}
                className="w-full !text-white !border-0"
                style={{
                  backgroundColor: loading ? RED_DARK : RED,
                }}
                placeholder=""
                onResize={() => {}}
                onResizeCapture={() => {}}
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
                fullWidth={true}
              >
                {loading ? (
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
                    Signing in…
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="pt-2 text-center text-xs text-gray-500">
                Demo credentials are hardcoded for this prototype.
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
