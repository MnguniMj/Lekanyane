export type ApplicantStatus = "Pending" | "Accepted" | "Rejected";

export type ContactMethod = "phone" | "email";
export type MembershipType = "individual" | "other";

export interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  contactMethod: ContactMethod;
  membershipType: MembershipType;
  additionalInfo: string;
  consent: boolean;
  status: ApplicantStatus;
  submittedAt: string;
  reviewedAt?: string;
}

const STORAGE_KEY = "lekanyane_applicants_v1";

export const getApplicants = (): Applicant[] => {
  if (typeof window === "undefined") return seedApplicants;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(seedApplicants)
      );
      return seedApplicants;
    }
    const parsed = JSON.parse(raw) as Applicant[];
    return Array.isArray(parsed) ? parsed : seedApplicants;
  } catch {
    return seedApplicants;
  }
};

export const saveApplicants = (list: Applicant[]): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // noop
  }
};

export const addApplicant = (
  data: Omit<Applicant, "id" | "status" | "submittedAt">
): Applicant => {
  const list = getApplicants();
  const applicant: Applicant = {
    ...data,
    id: "APP-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    status: "Pending",
    submittedAt: new Date().toISOString(),
  };
  saveApplicants([applicant, ...list]);
  return applicant;
};

export const updateStatus = (
  id: string,
  status: ApplicantStatus
): Applicant[] => {
  const list = getApplicants();
  const next = list.map((a) =>
    a.id === id
      ? {
          ...a,
          status,
          reviewedAt: new Date().toISOString(),
        }
      : a
  );
  saveApplicants(next);
  return next;
};

export const formatDate = (iso: string): string => {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

const now = new Date();
const daysAgo = (d: number) =>
  new Date(now.getTime() - d * 24 * 60 * 60 * 1000).toISOString();

const seedApplicants: Applicant[] = [
  {
    id: "APP-SEED01",
    firstName: "Thabo",
    lastName: "Mokoena",
    email: "thabo.mokoena@example.com",
    phone: "+266 5000 0001",
    dateOfBirth: "1988-04-12",
    address: "Maseru, Lesotho",
    contactMethod: "phone",
    membershipType: "individual",
    additionalInfo: "Interested in a savings plan for my children's education.",
    consent: true,
    status: "Pending",
    submittedAt: daysAgo(0),
  },
  {
    id: "APP-SEED02",
    firstName: "Lerato",
    lastName: "Khoarane",
    email: "lerato.k@example.com",
    phone: "+266 5000 0002",
    dateOfBirth: "1992-09-23",
    address: "Hlotse, Leribe",
    contactMethod: "email",
    membershipType: "individual",
    additionalInfo: "Would like to understand loan products after joining.",
    consent: true,
    status: "Pending",
    submittedAt: daysAgo(1),
  },
  {
    id: "APP-SEED03",
    firstName: "Mampho",
    lastName: "Ramabanta",
    email: "mampho.r@example.com",
    phone: "+266 5000 0003",
    dateOfBirth: "1980-01-05",
    address: "Mafeteng",
    contactMethod: "phone",
    membershipType: "other",
    additionalInfo: "Applying on behalf of a small family group.",
    consent: true,
    status: "Accepted",
    submittedAt: daysAgo(4),
    reviewedAt: daysAgo(3),
  },
  {
    id: "APP-SEED04",
    firstName: "Tseliso",
    lastName: "Lephoto",
    email: "tseliso.l@example.com",
    phone: "+266 5000 0004",
    dateOfBirth: "",
    address: "Butha-Buthe",
    contactMethod: "email",
    membershipType: "individual",
    additionalInfo: "",
    consent: true,
    status: "Rejected",
    submittedAt: daysAgo(6),
    reviewedAt: daysAgo(5),
  },
];
