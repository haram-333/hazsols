"use client";

import LegalDocumentLayout, {
  LegalSection,
} from "@/app/components/legal-document-layout";

const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: "information-collected",
    number: "01",
    title: "Information We Collect",
    paragraphs: [
      "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.",
    ],
    subsectionTitle: "Personal Information",
    bullets: [
      { text: "Name and contact information (email address, phone number)" },
      { text: "Company information and job title" },
      { text: "Project requirements and specifications" },
      {
        text: "Payment information (processed securely through third-party providers)",
      },
    ],
  },
  {
    id: "how-we-use",
    number: "02",
    title: "How We Use Your Information",
    paragraphs: ["We use the information we collect to:"],
    bullets: [
      { text: "Provide, maintain, and improve our services" },
      { text: "Process transactions and send related information" },
      { text: "Send technical notices, updates, and support messages" },
      { text: "Respond to your comments and questions" },
      { text: "Develop new products and services" },
    ],
  },
  {
    id: "information-sharing",
    number: "03",
    title: "Information Sharing and Disclosure",
    paragraphs: [
      "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:",
    ],
    bullets: [
      { text: "With your explicit consent" },
      { text: "To comply with legal obligations" },
      { text: "To protect our rights and prevent fraud" },
      {
        text: "With service providers who assist us in operating our business",
      },
    ],
  },
  {
    id: "data-security",
    number: "04",
    title: "Data Security",
    paragraphs: [
      "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:",
    ],
    bullets: [
      { text: "SSL encryption for data transmission" },
      { text: "Secure servers and databases" },
      { text: "Regular security audits and updates" },
      { text: "Limited access to personal information on a need-to-know basis" },
    ],
  },
  {
    id: "cookies",
    number: "05",
    title: "Cookies and Tracking Technologies",
    paragraphs: [
      "We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.",
    ],
  },
  {
    id: "third-party-services",
    number: "06",
    title: "Third-Party Services",
    paragraphs: [
      "Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.",
    ],
  },
  {
    id: "data-retention",
    number: "07",
    title: "Data Retention",
    paragraphs: [
      "We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.",
    ],
  },
  {
    id: "your-rights",
    number: "08",
    title: "Your Rights",
    paragraphs: ["You have the right to:"],
    bullets: [
      { text: "Access your personal information" },
      { text: "Correct inaccurate or incomplete information" },
      { text: "Request deletion of your personal information" },
      { text: "Object to processing of your personal information" },
      { text: "Data portability" },
    ],
  },
  {
    id: "childrens-privacy",
    number: "09",
    title: "Children's Privacy",
    paragraphs: [
      "Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.",
    ],
  },
  {
    id: "changes-to-policy",
    number: "10",
    title: "Changes to This Privacy Policy",
    paragraphs: [
      'We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.',
    ],
  },
  {
    id: "contact-us",
    number: "11",
    title: "Contact Us",
    paragraphs: [
      "If you have any questions about this Privacy Policy, please contact us directly at:",
    ],
    contactBox: {
      email: "hazsolssolution@gmail.com",
      phone: "+92 343 414 7056",
    },
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocumentLayout
      docType="privacy"
      eyebrow="Legal · Privacy"
      title="Privacy Policy"
      description="How HazSols collects, safeguards, and handles information shared when you visit our site or collaborate with our engineering team."
      sections={PRIVACY_SECTIONS}
    />
  );
}
