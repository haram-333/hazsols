"use client";

import LegalDocumentLayout, {
  LegalSection,
} from "@/app/components/legal-document-layout";

const TERMS_SECTIONS: LegalSection[] = [
  {
    id: "acceptance-of-terms",
    number: "01",
    title: "Acceptance of Terms",
    paragraphs: [
      "By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    ],
  },
  {
    id: "use-license",
    number: "02",
    title: "Use License",
    paragraphs: [
      "Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:",
    ],
    bullets: [
      { text: "modify or copy the materials" },
      {
        text: "use the materials for any commercial purpose or for any public display",
      },
      {
        text: "attempt to reverse engineer any software contained on the website",
      },
      {
        text: "remove any copyright or other proprietary notations from the materials",
      },
    ],
  },
  {
    id: "service-description",
    number: "03",
    title: "Service Description",
    paragraphs: ["We provide the following services:"],
    bullets: [
      {
        label: "Web Development",
        text: "Custom website and web application development",
      },
      {
        label: "Mobile App Development",
        text: "iOS and Android mobile application development",
      },
      {
        label: "AI & Machine Learning",
        text: "Artificial intelligence solutions and machine learning implementations",
      },
      {
        label: "Custom Software Development",
        text: "Tailored software solutions for specific business needs",
      },
    ],
  },
  {
    id: "payment-terms",
    number: "04",
    title: "Payment Terms",
    paragraphs: [
      "Payment terms will be specified in individual project agreements. Generally, we require:",
    ],
    bullets: [
      { text: "50% payment upfront for project initiation" },
      { text: "Remaining 50% upon project completion and delivery" },
      { text: "Payment methods accepted: Bank transfer, PayPal, Stripe" },
    ],
  },
  {
    id: "intellectual-property",
    number: "05",
    title: "Intellectual Property",
    paragraphs: [
      "All intellectual property rights in the work product created by us shall remain with the client upon full payment. We retain the right to use general knowledge, skills, and techniques gained during the project for future work.",
    ],
  },
  {
    id: "limitation-of-liability",
    number: "06",
    title: "Limitation of Liability",
    paragraphs: [
      "In no event shall our company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.",
    ],
  },
  {
    id: "termination",
    number: "07",
    title: "Termination",
    paragraphs: [
      "We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.",
    ],
  },
  {
    id: "changes-to-terms",
    number: "08",
    title: "Changes to Terms",
    paragraphs: [
      "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.",
    ],
  },
  {
    id: "contact-information",
    number: "09",
    title: "Contact Information",
    paragraphs: [
      "If you have any questions about these Terms and Conditions, please contact us directly at:",
    ],
    contactBox: {
      email: "hazsolssolution@gmail.com",
      phone: "+92 343 414 7056",
    },
  },
];

export default function TermsPage() {
  return (
    <LegalDocumentLayout
      docType="terms"
      eyebrow="Legal · Terms"
      title="Terms and Conditions"
      description="Clear engagement terms covering project scope, intellectual property ownership, payment milestones, and responsible service usage."
      sections={TERMS_SECTIONS}
    />
  );
}
