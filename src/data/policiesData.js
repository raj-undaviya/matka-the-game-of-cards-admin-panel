export const complianceRate = 88;

export const POLICY_VERSION_PAGE_SIZE = 10;

export const jurisdictions = [
  {
    id: "eu",
    flag: "🇪🇺",
    name: "European Union (GDPR)",
    subtitle: "Data Privacy & Portability",
    status: "compliant",
  },
  {
    id: "uk",
    flag: "🇬🇧",
    name: "United Kingdom (UKGC)",
    subtitle: "Gambling Commission Standards",
    status: "compliant",
  },
  {
    id: "us",
    flag: "🇺🇸",
    name: "United States (NJ DGE)",
    subtitle: "Division of Gaming Enforcement",
    status: "alert",
  },
];

export const restrictionControls = [
  {
    id: "age",
    label: "Mandatory Age Verification",
    description: "Require ID check before first deposit",
    enabled: true,
  },
  {
    id: "vpn",
    label: "VPN Block Enforcement",
    description: "Block anonymized proxy connections",
    enabled: true,
  },
  {
    id: "exclusion",
    label: "Self-Exclusion Global Sync",
    description: "Sync exclusion lists across jurisdictions",
    enabled: false,
  },
];

export const policyTabs = [
  { id: "terms", label: "Terms of Service" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "responsible", label: "Responsible Gaming" },
];

export const policyDocuments = {
  terms: {
    title: "General Terms and Conditions",
    lastSaved: "12m ago",
    sections: [
      {
        type: "paragraph",
        text: "Welcome to our gaming platform. By accessing or using our services, you agree to be bound by these Terms and Conditions. Please read them carefully before creating an account or placing any wagers.",
      },
      {
        type: "heading",
        text: "1. Eligibility",
      },
      {
        type: "paragraph",
        text: "You must be at least 18 years of age (or the minimum legal age in your jurisdiction) to use our platform. We reserve the right to request proof of age and identity at any time.",
      },
      {
        type: "heading",
        text: "2. Account Registration",
      },
      {
        type: "paragraph",
        text: "Each user may maintain only one account. Providing false information during registration may result in account suspension and forfeiture of funds in accordance with applicable regulations.",
      },
      {
        type: "callout",
        title: "Note",
        text: "Clause 2.4 was updated on May 12, 2024 to align with revised UKGC remote gambling requirements. All EU-region deployments must reflect this change before the next audit cycle.",
      },
      {
        type: "heading",
        text: "3. Responsible Gaming",
      },
      {
        type: "paragraph",
        text: "We provide deposit limits, session reminders, and self-exclusion tools. Players experiencing gambling-related harm are encouraged to contact our support team or national helpline services.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    lastSaved: "2h ago",
    sections: [
      {
        type: "paragraph",
        text: "This Privacy Policy describes how we collect, use, and protect your personal data in compliance with GDPR and applicable data protection laws.",
      },
      {
        type: "heading",
        text: "1. Data We Collect",
      },
      {
        type: "paragraph",
        text: "We collect account information, transaction history, device identifiers, and gameplay telemetry necessary to operate the platform securely.",
      },
    ],
  },
  responsible: {
    title: "Responsible Gaming Policy",
    lastSaved: "1d ago",
    sections: [
      {
        type: "paragraph",
        text: "Our commitment to responsible gaming includes proactive monitoring, player protection tools, and staff training on identifying problem gambling behaviors.",
      },
      {
        type: "heading",
        text: "1. Player Protection Tools",
      },
      {
        type: "paragraph",
        text: "Users can set daily, weekly, and monthly deposit limits. Cooling-off periods and permanent self-exclusion are available through account settings.",
      },
    ],
  },
};

export const policyVersionHistory = [
  {
    id: "v-1",
    version: "v4.2.0",
    document: "Terms of Service",
    updatedBy: "Sarah Jenkins",
    initials: "SJ",
    date: "May 12, 2024",
    summary: "Updated clause 2.4 for UKGC compliance",
  },
  {
    id: "v-2",
    version: "v4.1.2",
    document: "Privacy Policy",
    updatedBy: "Marcus Chen",
    initials: "MC",
    date: "Apr 28, 2024",
    summary: "GDPR data retention policy revision",
  },
  {
    id: "v-3",
    version: "v4.1.0",
    document: "Responsible Gaming",
    updatedBy: "Elena Vogt",
    initials: "EV",
    date: "Apr 15, 2024",
    summary: "Added self-exclusion global sync section",
  },
  {
    id: "v-4",
    version: "v4.0.8",
    document: "Terms of Service",
    updatedBy: "James Okonkwo",
    initials: "JO",
    date: "Mar 30, 2024",
    summary: "Minor wording fixes for US-NJ jurisdiction",
  },
];
