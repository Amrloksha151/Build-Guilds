export interface Organizer {
  id: string;
  name: string;
  description: string;
  logoAsset: string | null;
  url: string | null;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
}

export interface ActivityItem {
  icon: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface EventContent {
  event: {
    name: string;
    tagline: string;
    description: string;
    date: string | null;
    time: string | null;
    venue: {
      name: string | null;
      address: string | null;
      city: string;
      governorate: string;
      country: string;
      mapEmbedUrl: string | null;
    };
    registrationOpen: boolean;
    registrationUrl: string | null;
  };
  navigation: Array<{
    id: string;
    label: string;
  }>;
  sections: {
    schedule: {
      title: string;
      subtitle: string;
    };
    activities: {
      title: string;
      subtitle: string;
    };
    partners: {
      eyebrow: string;
      title: string;
      subtitle: string;
    };
    venue: {
      title: string;
      subtitle: string;
      mapPlaceholder: string;
    };
    faq: {
      title: string;
      subtitle: string;
    };
    fallbacks: {
      comingSoon: string;
      venueTBA: string;
      addressTBA: string;
    };
  };
  hero: {
    eyebrow: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  about: {
    title: string;
    intro: string;
    details: string;
    organizerFlowTitle: string;
    organizerSteps: string[];
  };
  organizers: Organizer[];
  schedule: ScheduleItem[];
  activities: ActivityItem[];
  defaultActivities: ActivityItem[];
  faq: FAQItem[];
  signup: {
    title: string;
    description: string;
    liveTitle: string;
    liveDescription: string;
    liveButtonLabel: string;
    invalidUrlDescription: string;
    notifyTitle: string;
    notifyDescription: string;
    buttonLabel: string;
    placeholder: string;
  };
  footer: {
    credit: string;
    links: Array<{
      label: string;
      href: string;
    }>;
  };
}
