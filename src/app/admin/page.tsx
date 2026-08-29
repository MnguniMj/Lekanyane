"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardBody,
  Input,
  Chip,
} from "@material-tailwind/react";
import {
  HomeIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CakeIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowPathIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import {
  Applicant,
  ApplicantStatus,
  getApplicants,
  updateStatus,
  formatDate,
} from "@/lib/applicants";
import { getSession, logout as clearAdminSession } from "@/lib/auth";

const RED = "#B83232";
const RED_DARK = "#9A2828";
const NAVY = "#0F172A";
const NAVY_3 = "#1F2937";

interface NavItem {
  label: string;
  icon: any;
  href: string;
  active: boolean;
  needsConfirm?: boolean;
}

const SIDEBAR: NavItem[] = [
  { label: "Dashboard", icon: ChartBarIcon, href: "/admin", active: true },
  {
    label: "Applicants",
    icon: UsersIcon,
    href: "/admin#applicants",
    active: true,
  },
  {
    label: "Website",
    icon: HomeIcon,
    href: "/",
    active: false,
    needsConfirm: true,
  },
  {
    label: "FAQs",
    icon: QuestionMarkCircleIcon,
    href: "/#faq",
    active: false,
    needsConfirm: true,
  },
  {
    label: "Settings",
    icon: Cog6ToothIcon,
    href: "/admin#settings",
    active: false,
  },
];

type FilterKey = "All" | ApplicantStatus;

export default function AdminPage() {
  const router = useRouter();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [seedKey, setSeedKey] = useState(0);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState<string | null>(null);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace("/admin/login");
      return;
    }
    setUsername(session.username);
    setSessionChecked(true);
    setApplicants(getApplicants());
  }, [router, seedKey]);

  const handleLogout = () => {
    clearAdminSession();
    router.replace("/admin/login");
  };

  const requestNavigateToWebsite = (target: string) => {
    setConfirmTarget(target);
    setConfirmOpen(true);
  };

  const handleConfirmContinue = () => {
    if (!confirmTarget) {
      setConfirmOpen(false);
      return;
    }
    clearAdminSession();
    router.push(confirmTarget);
    setConfirmOpen(false);
    setConfirmTarget(null);
  };

  const handleConfirmCancel = () => {
    setConfirmOpen(false);
    setConfirmTarget(null);
  };

  const handleStatus = async (id: string, status: ApplicantStatus) => {
    setBusy(id + "-" + status);
    await new Promise((r) => setTimeout(r, 350));
    const next = updateStatus(id, status);
    setApplicants(next);
    setBusy(null);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return applicants.filter((a) => {
      const matchStatus = filter === "All" ? true : a.status === filter;
      const matchQuery = !q
        ? true
        : [
            a.firstName,
            a.lastName,
            a.email,
            a.phone,
            a.id,
            a.address,
            a.membershipType,
          ]
            .join(" ")
            .toLowerCase()
            .includes(q);
      return matchStatus && matchQuery;
    });
  }, [applicants, query, filter]);

  const counts = useMemo(() => {
    const total = applicants.length;
    const pending = applicants.filter((a) => a.status === "Pending").length;
    const accepted = applicants.filter((a) => a.status === "Accepted").length;
    const rejected = applicants.filter((a) => a.status === "Rejected").length;
    return { total, pending, accepted, rejected };
  }, [applicants]);

  if (!sessionChecked) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <svg
            className="animate-spin h-5 w-5"
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
          <span className="text-sm">Loading…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="flex">
        {/* SIDEBAR */}
        <aside
          className="fixed top-0 left-0 z-30 min-h-screen border-r border-gray-800 text-white transition-all"
          style={{
            backgroundColor: NAVY,
            width: sidebarOpen ? 250 : 76,
          }}
        >
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
            <div className="flex items-center gap-3 overflow-hidden">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: RED }}
              >
                <span className="text-white font-bold">L</span>
              </div>
              {sidebarOpen && (
                <div className="whitespace-nowrap">
                  <div className="text-sm font-semibold text-white">
                    Lekanyane
                  </div>
                  <div className="text-[11px] uppercase tracking-widest text-gray-400">
                    Admin
                  </div>
                </div>
              )}
            </div>
          </div>

          <nav className="px-3 py-4 space-y-1">
            {SIDEBAR.map((item) => {
              const Icon = item.icon;
              const baseCls = `group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors text-left ${
                item.active
                  ? "bg-white/10 text-white"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`;
              if (item.needsConfirm) {
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => requestNavigateToWebsite(item.href)}
                    className={baseCls}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {sidebarOpen && <span>{item.label}</span>}
                  </button>
                );
              }
              return (
                <Link key={item.label} href={item.href} className={baseCls}>
                  <Icon className="h-5 w-5 shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-4 w-full px-3">
            <button
              type="button"
              onClick={() => setSidebarOpen((v) => !v)}
              className="w-full flex items-center justify-center gap-2 rounded-md px-3 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {sidebarOpen ? (
                <>
                  <ChevronDoubleLeftIcon className="h-4 w-4" />
                  <span>Collapse</span>
                </>
              ) : (
                <ChevronDoubleRightIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <div
          className="flex-1 min-h-screen"
          style={{ marginLeft: sidebarOpen ? 250 : 76 }}
        >
          <header className="h-16 border-b border-gray-200 bg-white sticky top-0 z-20 flex items-center justify-between px-6">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                placeholder=""
                onResize={() => {}}
                onResizeCapture={() => {}}
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
                className="!text-gray-500 text-xs uppercase tracking-widest"
              >
                Admin Console
              </Typography>
              <Typography
                variant="h6"
                color="blue-gray"
                placeholder=""
                onResize={() => {}}
                onResizeCapture={() => {}}
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
                className="!font-semibold"
              >
                Dashboard
              </Typography>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => requestNavigateToWebsite("/")}
                className="hidden md:inline-flex text-sm text-gray-600 hover:text-gray-900"
              >
                View Site
              </button>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                  style={{ backgroundColor: NAVY_3 }}
                >
                  {username ? username[0].toUpperCase() : "A"}
                </div>
                <span className="truncate max-w-[120px]">{username}</span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-white transition-colors"
                style={{ backgroundColor: RED }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = RED_DARK)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = RED)
                }
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </header>

          <main className="p-6 space-y-6">
            {/* STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <StatCard
                label="Total Applicants"
                value={counts.total}
                icon={UsersIcon}
                tone="navy"
                subtitle="All membership applications"
              />
              <StatCard
                label="Pending"
                value={counts.pending}
                icon={ClockIcon}
                tone="amber"
                subtitle="Awaiting review"
              />
              <StatCard
                label="Accepted"
                value={counts.accepted}
                icon={CheckCircleIcon}
                tone="green"
                subtitle="Memberships approved"
              />
              <StatCard
                label="Rejected"
                value={counts.rejected}
                icon={XCircleIcon}
                tone="red"
                subtitle="Applications declined"
              />
            </div>

            {/* APPLICANTS */}
            <Card
              shadow={false}
              id="applicants"
              placeholder=""
              onResize={() => {}}
              onResizeCapture={() => {}}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
              className="border border-gray-200"
            >
              <CardBody
                placeholder=""
                onResize={() => {}}
                onResizeCapture={() => {}}
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
                className="p-0"
              >
                <div className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100">
                  <div>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      placeholder=""
                      onResize={() => {}}
                      onResizeCapture={() => {}}
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                      className="!font-semibold"
                    >
                      Applicants
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      placeholder=""
                      onResize={() => {}}
                      onResizeCapture={() => {}}
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                      className="mt-1 !text-gray-500"
                    >
                      Review and manage membership applications
                    </Typography>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                      <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search applicants..."
                        size="md"
                        shrink={false}
                        onResize={() => {}}
                        onResizeCapture={() => {}}
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                        crossOrigin={undefined}
                        className="!pl-9 !border-t-gray-200 !border-l-gray-200 !border-r-gray-200 !border-b-gray-300 focus:!border-b-[#B83232]"
                      />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {(
                        [
                          "All",
                          "Pending",
                          "Accepted",
                          "Rejected",
                        ] as FilterKey[]
                      ).map((f) => (
                        <button
                          key={f}
                          onClick={() => setFilter(f)}
                          className={`text-xs font-medium px-3 py-2 rounded-md border transition-colors ${
                            filter === f
                              ? "bg-gray-900 text-white border-gray-900"
                              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>

                    <Button
                      size="sm"
                      color="gray"
                      onClick={() => setSeedKey((k) => k + 1)}
                      placeholder=""
                      onResize={() => {}}
                      onResizeCapture={() => {}}
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                      className="!bg-white !border !border-gray-300 !text-gray-700 hover:!bg-gray-50"
                    >
                      <ArrowPathIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm text-gray-700">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-100">
                      <tr>
                        <th className="px-5 py-3 font-medium">Applicant</th>
                        <th className="px-5 py-3 font-medium">Contact</th>
                        <th className="px-5 py-3 font-medium">Membership</th>
                        <th className="px-5 py-3 font-medium">Submitted</th>
                        <th className="px-5 py-3 font-medium">Status</th>
                        <th className="px-5 py-3 font-medium text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filtered.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-5 py-12 text-center">
                            <Typography
                              variant="lead"
                              color="blue-gray"
                              placeholder=""
                              onResize={() => {}}
                              onResizeCapture={() => {}}
                              onPointerEnterCapture={() => {}}
                              onPointerLeaveCapture={() => {}}
                              className="!text-gray-400"
                            >
                              No applicants found.
                            </Typography>
                          </td>
                        </tr>
                      )}
                      {filtered.map((a) => {
                        const expanded = expandedId === a.id;
                        return (
                          <React.Fragment key={a.id}>
                            <tr className="hover:bg-gray-50/60 align-middle">
                              <td className="px-5 py-4">
                                <button
                                  onClick={() =>
                                    setExpandedId(expanded ? null : a.id)
                                  }
                                  className="flex items-center gap-3 text-left w-full"
                                >
                                  <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0"
                                    style={{ backgroundColor: NAVY_3 }}
                                  >
                                    {(a.firstName[0] || "").toUpperCase()}
                                    {(a.lastName[0] || "").toUpperCase()}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="font-semibold text-gray-900 truncate">
                                      {a.firstName} {a.lastName}
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">
                                      {a.id}
                                    </div>
                                  </div>
                                  <span className="text-gray-400 ml-1">
                                    {expanded ? (
                                      <ChevronUpIcon className="h-4 w-4" />
                                    ) : (
                                      <ChevronDownIcon className="h-4 w-4" />
                                    )}
                                  </span>
                                </button>
                              </td>
                              <td className="px-5 py-4">
                                <div className="flex flex-col gap-0.5">
                                  <div className="flex items-center gap-1.5 text-gray-700 truncate">
                                    <EnvelopeIcon className="h-3.5 w-3.5 text-gray-400" />
                                    <span className="truncate">{a.email}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-gray-600">
                                    <PhoneIcon className="h-3.5 w-3.5 text-gray-400" />
                                    <span>{a.phone}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4 capitalize text-gray-700">
                                <div>{a.membershipType}</div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                  Pref: {a.contactMethod}
                                </div>
                              </td>
                              <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                                <div>{formatDate(a.submittedAt)}</div>
                                {a.reviewedAt && (
                                  <div className="text-xs text-gray-400">
                                    Reviewed {formatDate(a.reviewedAt)}
                                  </div>
                                )}
                              </td>
                              <td className="px-5 py-4">
                                <StatusBadge status={a.status} />
                              </td>
                              <td className="px-5 py-4">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    disabled={
                                      a.status === "Accepted" ||
                                      busy === a.id + "-Accepted"
                                    }
                                    onClick={() =>
                                      handleStatus(a.id, "Accepted")
                                    }
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    style={{ backgroundColor: "#16A34A" }}
                                  >
                                    <CheckCircleIcon className="h-3.5 w-3.5" />
                                    Accept
                                  </button>
                                  <button
                                    disabled={
                                      a.status === "Rejected" ||
                                      busy === a.id + "-Rejected"
                                    }
                                    onClick={() =>
                                      handleStatus(a.id, "Rejected")
                                    }
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    style={{ backgroundColor: RED }}
                                  >
                                    <XCircleIcon className="h-3.5 w-3.5" />
                                    Reject
                                  </button>
                                </div>
                              </td>
                            </tr>
                            {expanded && (
                              <tr className="bg-gray-50/70">
                                <td colSpan={6} className="px-5 py-5">
                                  <ApplicantDetails applicant={a} />
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </main>
        </div>
      </div>

      {/* Confirm dialog: leaving admin site */}
      {confirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          onClick={handleConfirmCancel}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden
          />
          <div
            className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200 p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#FEF2F2" }}
              >
                <ArrowRightOnRectangleIcon
                  className="h-6 w-6"
                  style={{ color: RED }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Leaving the Admin Console
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                  You are about to navigate to the main Lekanyane website.
                  Leaving the admin area will end your current session and you
                  will be signed out.
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  To return to the admin dashboard later, you will need to sign
                  in again with your username and password.
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmContinue}
                className="inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium text-white transition-colors"
                style={{ backgroundColor: RED }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = RED_DARK)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = RED)
                }
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  tone,
  subtitle,
}: {
  label: string;
  value: number;
  icon: any;
  tone: "navy" | "amber" | "green" | "red";
  subtitle: string;
}) {
  const tones: Record<typeof tone, string> = {
    navy: NAVY,
    amber: "#D97706",
    green: "#16A34A",
    red: RED,
  };
  const bgTones: Record<typeof tone, string> = {
    navy: "#EEF2FF",
    amber: "#FFFBEB",
    green: "#F0FDF4",
    red: "#FEF2F2",
  };
  return (
    <Card
      shadow={false}
      placeholder=""
      onResize={() => {}}
      onResizeCapture={() => {}}
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
      className="border border-gray-200 rounded-xl"
    >
      <CardBody
        placeholder=""
        onResize={() => {}}
        onResizeCapture={() => {}}
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
        className="p-5 flex items-start justify-between gap-3"
      >
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            placeholder=""
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            className="!text-gray-500 uppercase tracking-wider"
          >
            {label}
          </Typography>
          <Typography
            variant="h3"
            color="blue-gray"
            placeholder=""
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            className="!font-bold mt-1"
          >
            {value}
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            placeholder=""
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            className="mt-1 !text-gray-500"
          >
            {subtitle}
          </Typography>
        </div>
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: bgTones[tone] }}
        >
          <Icon className="h-5 w-5" style={{ color: tones[tone] }} />
        </div>
      </CardBody>
    </Card>
  );
}

function StatusBadge({ status }: { status: ApplicantStatus }) {
  if (status === "Pending") {
    return (
      <Chip
        size="sm"
        variant="ghost"
        value={
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="h-3 w-3" /> Pending
          </span>
        }
        className="!rounded-full !bg-amber-50 !text-amber-700 !border !border-amber-200"
      />
    );
  }
  if (status === "Accepted") {
    return (
      <Chip
        size="sm"
        variant="ghost"
        value={
          <span className="inline-flex items-center gap-1">
            <CheckCircleIcon className="h-3 w-3" /> Accepted
          </span>
        }
        className="!rounded-full !bg-green-50 !text-green-700 !border !border-green-200"
      />
    );
  }
  return (
    <Chip
      size="sm"
      variant="ghost"
      value={
        <span className="inline-flex items-center gap-1">
          <XCircleIcon className="h-3 w-3" /> Rejected
        </span>
      }
      className="!rounded-full !bg-red-50 !text-red-700 !border !border-red-200"
    />
  );
}

function ApplicantDetails({ applicant }: { applicant: Applicant }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div className="p-4 rounded-xl bg-white border border-gray-200">
        <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">
          Personal Information
        </div>
        <div className="space-y-2.5 text-sm">
          <Row
            label="Full name"
            value={`${applicant.firstName} ${applicant.lastName}`}
          />
          <Row label="Application ID" value={applicant.id} />
          <Row
            label="Date of Birth"
            value={applicant.dateOfBirth || "—"}
            icon={CakeIcon}
          />
          <Row
            label="Address"
            value={applicant.address || "—"}
            icon={MapPinIcon}
          />
        </div>
      </div>
      <div className="p-4 rounded-xl bg-white border border-gray-200">
        <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">
          Contact
        </div>
        <div className="space-y-2.5 text-sm">
          <Row label="Email" value={applicant.email} icon={EnvelopeIcon} />
          <Row label="Phone" value={applicant.phone} icon={PhoneIcon} />
          <Row
            label="Preferred"
            value={applicant.contactMethod === "phone" ? "Phone call" : "Email"}
          />
          <Row
            label="Membership"
            value={
              applicant.membershipType === "individual"
                ? "Individual Membership"
                : "Other Membership"
            }
          />
        </div>
      </div>
      <div className="p-4 rounded-xl bg-white border border-gray-200">
        <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">
          Additional
        </div>
        <div className="space-y-2.5 text-sm">
          <Row
            label="Consent"
            value={applicant.consent ? "Provided" : "Not provided"}
          />
          <Row label="Submitted" value={formatDate(applicant.submittedAt)} />
          <Row
            label="Reviewed"
            value={
              applicant.reviewedAt ? formatDate(applicant.reviewedAt) : "—"
            }
          />
          <div>
            <div className="text-xs text-gray-500 mb-1">
              Additional Information
            </div>
            <div className="text-gray-800 bg-gray-50 p-3 rounded-md border border-gray-200 min-h-[60px] whitespace-pre-wrap">
              {applicant.additionalInfo || "—"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: any;
}) {
  return (
    <div className="flex items-start gap-2">
      {Icon && <Icon className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />}
      <div className="flex-1 min-w-0">
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-gray-900 truncate">{value}</div>
      </div>
    </div>
  );
}
