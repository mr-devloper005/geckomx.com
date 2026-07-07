import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Business discovery and useful resources',
      description: 'Explore verified details, practical insights, and useful resources on geckomx.com.',
      openGraphTitle: 'Business discovery and useful resources',
      openGraphDescription: 'Discover companies, insights, and resources through a polished discovery hub.',
      keywords: ['business discovery', 'resources', 'insights', 'geckomx'],
    },
    hero: {
      badge: 'Business insight and discovery hub',
      title: ['Built for modern discovery.', 'Powered by useful insight.'],
      description: 'Find companies, compare details, read practical insights, and discover resources that help people make better decisions.',
      primaryCta: { label: 'Browse insights', href: '/article' },
      secondaryCta: { label: 'Explore businesses', href: '/listing' },
      searchPlaceholder: 'Search businesses, insights, resources, and topics',
      focusLabel: 'Directory focus',
      featureCardBadge: 'live discovery rail',
      featureCardTitle: 'Fresh updates shape the homepage.',
      featureCardDescription: 'Recent business content and helpful resources stay visible without changing the platform data flow.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for business discovery, useful reading, and practical research.',
      paragraphs: [
        'This site brings together company details, useful reading, public pages, and structured resources so visitors can move naturally between different content types.',
        'Instead of separating companies, guides, and supporting resources into disconnected surfaces, the platform keeps them connected in one place with consistent navigation.',
        'Whether someone starts with a company page, a useful read, or a resource page, they can keep discovering related content without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Search-first homepage with a strong business and research focus.',
        'Connected sections for companies, public pages, and resources.',
        'Professional browsing rhythm designed for comparison and research.',
        'Lightweight interactions that keep the experience fast and readable.',
      ],
      primaryLink: { label: 'Browse insights', href: '/article' },
      secondaryLink: { label: 'See businesses', href: '/listing' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Explore companies, insights, public pages, and resources through one connected experience.',
      description: 'Move between company details, practical insights, public pages, and resources through one clearer visual system.',
      primaryCta: { label: 'Browse insights', href: '/article' },
      secondaryCta: { label: 'Add content', href: '/create' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'A calmer, clearer way to explore content.',
    description: `${slot4BrandConfig.siteName} is built to make long-form reading, visual discovery, and supporting resources feel like one unified experience.`,
    paragraphs: [
      'Instead of splitting everything into disconnected pages, the platform keeps related content easy to move through and easy to understand.',
      'Whether someone starts with an article, listing, image post, or resource page, they can continue exploring without losing context.',
    ],
    values: [
      {
        title: 'Reading-first experience',
        description: 'We prioritize clarity, pacing, and structure so people can read, browse, and discover without noise.',
      },
      {
        title: 'Connected content surfaces',
        description: 'Visual posts, resources, public pages, and useful updates stay connected so discovery feels natural across the site.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'We focus on clean navigation and clear page structure to help visitors find useful content faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'A support page that matches the product, not a generic contact form.',
    description: 'Tell us what you are trying to publish, fix, or launch. We will route it through the right lane instead of forcing every request into the same support bucket.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the hub',
      title: 'Find businesses, insights, public pages, and resources faster.',
      description: 'Use keywords, categories, and content types to discover useful posts from every active section of the site.',
      placeholder: 'Search by business, topic, category, or title',
    },
    resultsTitle: 'Latest searchable business content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new content.',
      description: 'Use your account to open the publishing workspace and create posts for the active sections of this site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for every active section.',
      description: 'Choose the content type, add details, and prepare a clean post with images, links, summary, and body content.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your publishing space.',
      description: 'Login to continue browsing, managing submissions, and creating new content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related reads',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related pages',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested reads',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
