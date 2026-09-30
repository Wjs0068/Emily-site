// Development-only fallback content. Production access is gated in src/lib/sanity/content.ts.
// These values must never be treated as owner-approved merely because they render locally.
export const navigation = [
  { label: 'Services', href: '/services/' },
  { label: 'Portfolio', href: '/portfolio/' },
  { label: 'About', href: '/about/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Journal', href: '/journal/' },
] as const;

export const packages = [
  {
    name: 'The Intimate',
    summary: 'A beautifully paced morning shared with the people closest to you.',
    price: '$1,750',
    partySize: 'Bride + up to 4 additional hair services',
    features: [
      'Bridal preview',
      'Two-hour bridal appointment',
      'Customized wedding-morning timeline',
      'Styling guidance from preview to wedding day',
    ],
  },
  {
    name: 'The Signature',
    summary: 'More room in the morning without sacrificing time, care, or attention.',
    price: '$2,300',
    partySize: 'Bride + up to 6 additional hair services',
    features: [
      'Bridal preview',
      'Two-hour bridal appointment',
      'Second artist included',
      'Customized timeline and styling guidance',
    ],
  },
  {
    name: 'The Full Party',
    summary: 'A seamless, unrushed styling experience designed for a larger group.',
    price: '$2,950',
    partySize: 'Bride + up to 8 additional hair services',
    features: [
      'Bridal preview',
      'Two-hour bridal appointment',
      'Second artist included',
      'Customized timeline and styling guidance',
    ],
  },
] as const;

export const addons = [
  {
    name: 'A second style',
    price: 'Custom quote',
    description:
      'A planned restyle for brides choosing an all-down or half-up look, especially in warmer weather.',
  },
  {
    name: 'Another guest',
    price: '$200',
    description: 'Add one more hair service when the schedule and artist coverage allow it.',
  },
  {
    name: 'Clip-in extension rental',
    price: '$175',
    description:
      'Extra length and fullness selected to support soft waves, dimension, and lasting shape.',
  },
] as const;

export const processSteps = [
  {
    number: '01',
    title: 'Tell me about your day',
    body: 'Share your date, venue, party size, and the feeling you want for your wedding morning.',
  },
  {
    number: '02',
    title: 'Reserve your date',
    body: 'After availability is confirmed, your proposal and agreement make the details clear.',
  },
  {
    number: '03',
    title: 'Shape the vision',
    body: 'At your bridal preview, we refine the texture, balance, and details until the style feels like you.',
  },
  {
    number: '04',
    title: 'Settle into the morning',
    body: 'A thoughtful timeline and collaborative styling keep the room calm while every look comes together.',
  },
] as const;

export const testimonials = [
  {
    quote:
      "I seriously trust Emily with my life! I've never seen someone do such magic work on my hair. She is so gifted and definitely in the right industry!",
    clientName: 'Kailey',
  },
  {
    quote:
      "I can't even put into words how confident Emily made me feel on my wedding day. Emily is so talented.",
    clientName: 'Caley',
  },
] as const;

// TODO(content): Resolve these against owner-approved contracts before Sanity launch.
export const unresolvedContentDecisions = [
  '$1,600 FAQ minimum versus the current $1,750 package floor',
  'The retired "classic package" name versus The Intimate',
  'Seven-service contract cap versus current package capacities',
  'Included second artists versus the separate $250 assistant fee',
  'Additional-guest capacity and staffing rules',
  'Consistent use of "bridal preview" instead of "trial"',
  'Travel calculation, rounding, tolls, and parking',
  'Current $250 retainer terms',
  'Current 2027 availability',
] as const;

export type FaqCategory = {
  title: string;
  introduction: string;
  items: Array<{
    question: string;
    answer: string;
    needsOwnerConfirmation?: true;
  }>;
};

// Migrated from the audited Wix inventory. Flagged answers intentionally avoid disputed specifics.
export const faqCategories: FaqCategory[] = [
  {
    title: 'Booking',
    introduction: 'Starting the conversation and reserving your wedding date.',
    items: [
      {
        question: 'How far in advance should I book?',
        answer:
          'Reach out once your date and getting-ready location are known. Popular Saturdays tend to fill first, but availability is reviewed personally for every inquiry.',
        needsOwnerConfirmation: true,
      },
      {
        question: 'How do I secure my date?',
        answer:
          'Begin with an inquiry. If your date is available, your proposal will identify the agreement and retainer required to reserve it.',
        needsOwnerConfirmation: true,
      },
      {
        question: 'Can I change my contract?',
        answer:
          'Ask as soon as your party changes. Additions depend on timing and artist availability, while the terms in your signed agreement govern removals and deadlines.',
        needsOwnerConfirmation: true,
      },
      {
        question: 'Do you have a booking minimum?',
        answer:
          'The current bridal collections begin with The Intimate. Your location, service count, timing, and staffing needs are reviewed before the applicable investment is confirmed in your proposal.',
        needsOwnerConfirmation: true,
      },
    ],
  },
  {
    title: 'Services & Pricing',
    introduction: 'How collections, additions, and artist coverage are handled.',
    items: [
      {
        question: 'Do you offer clip-in extensions?',
        answer:
          'Yes. Clip-in extension rental is currently offered as an add-on and can support extra length, fullness, and lasting shape. Emily will help determine whether it suits your chosen style.',
      },
      {
        question: 'When does an assistant fee apply?',
        answer:
          'Artist coverage is based on your party size and wedding-morning timeline. Any additional staffing and its cost will be identified clearly in your proposal before you reserve.',
        needsOwnerConfirmation: true,
      },
      {
        question: 'Do you have a minimum service requirement?',
        answer:
          'The Intimate is the smallest collection currently published. Emily will confirm the right collection after reviewing your date, location, and requested services.',
        needsOwnerConfirmation: true,
      },
      {
        question: 'What age is considered a flower girl service?',
        answer:
          'Age definitions, style scope, timing, and pricing for flower girls are confirmed in your proposal so the service fits the child and the wedding-day schedule.',
        needsOwnerConfirmation: true,
      },
    ],
  },
  {
    title: 'Bridal Preview',
    introduction: 'A focused appointment for shaping and refining your direction.',
    items: [
      {
        question: 'Can I schedule a preview before booking?',
        answer:
          'Bridal previews are part of the booked experience and are scheduled after your wedding date has been reserved.',
        needsOwnerConfirmation: true,
      },
      {
        question: 'How many looks can I see during my preview?',
        answer:
          'The appointment is designed to refine one cohesive direction. The number of variations possible depends on the styles, your hair, and the time needed to shape each detail.',
        needsOwnerConfirmation: true,
      },
      {
        question: 'Is the bridal preview included?',
        answer: 'Yes. A bridal preview is included in each currently published bridal collection.',
      },
      {
        question: 'Is a bridal preview required?',
        answer:
          'A preview is strongly recommended because it creates time to test proportion, texture, and finishing details before the wedding morning. Ask Emily about your circumstances when you inquire.',
        needsOwnerConfirmation: true,
      },
      {
        question: 'Where does my bridal preview take place?',
        answer:
          'The current appointment location and arrival details are shared directly with booked clients.',
        needsOwnerConfirmation: true,
      },
      {
        question: 'Can my mom or bridesmaid schedule a preview?',
        answer:
          'Additional previews may be possible for contracted party members when the schedule allows. Availability and pricing are confirmed directly.',
        needsOwnerConfirmation: true,
      },
    ],
  },
  {
    title: 'Travel',
    introduction: 'On-location service for Denver and celebrations across Colorado.',
    items: [
      {
        question: 'Do you have a travel fee?',
        answer:
          'Travel is quoted after your getting-ready location is confirmed. Your proposal will make any travel, parking, lodging, or timing considerations clear.',
        needsOwnerConfirmation: true,
      },
    ],
  },
  {
    title: 'Wedding Day',
    introduction: 'What supports a calm, well-paced morning.',
    items: [
      {
        question: 'How is the wedding-morning schedule created?',
        answer:
          'Emily builds the styling timeline around your services, artist coverage, photography plans, and the time everyone needs to get dressed without rushing.',
      },
    ],
  },
];

export type JournalBlock =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; image: 'detail' | 'portrait'; alt: string; caption?: string };

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  featuredImage: 'styling' | 'updo' | 'waves';
  body: JournalBlock[];
  relatedSlugs: string[];
  isDevelopmentSample: true;
};

export const journalPosts: JournalPost[] = [
  {
    slug: 'planning-a-calm-wedding-morning',
    title: 'Sample: Planning a calm wedding morning',
    excerpt:
      'Development-only editorial copy used to test article rhythm, headings, imagery, and related content.',
    author: 'Development sample, not Emily',
    publishedAt: '2026-08-14',
    updatedAt: '2026-09-18',
    category: 'Wedding Morning',
    featuredImage: 'styling',
    body: [
      {
        type: 'paragraph',
        text: 'This sample article exists only to demonstrate the journal layout. Its wording is not owner-approved advice and should be replaced before launch.',
      },
      { type: 'heading', level: 2, text: 'Begin with the shape of the morning' },
      {
        type: 'paragraph',
        text: 'A useful plan accounts for the people receiving services, the getting-ready space, photography timing, and the moment everyone needs to be dressed.',
      },
      {
        type: 'image',
        image: 'detail',
        alt: 'Close view of a textured bridal updo in progress',
        caption: 'Development image placement using approved migrated photography.',
      },
      { type: 'heading', level: 3, text: 'Leave room for transitions' },
      {
        type: 'paragraph',
        text: 'This placeholder section tests a shorter subsection beneath an H2 and the reading measure on small screens.',
      },
    ],
    relatedSlugs: ['what-to-bring-to-a-bridal-preview', 'choosing-a-romantic-bridal-style'],
    isDevelopmentSample: true,
  },
  {
    slug: 'what-to-bring-to-a-bridal-preview',
    title: 'Sample: What to bring to a bridal preview',
    excerpt:
      'A development post for testing preview-focused journal content and inline editorial photography.',
    author: 'Development sample, not Emily',
    publishedAt: '2026-07-22',
    category: 'Bridal Preview',
    featuredImage: 'updo',
    body: [
      {
        type: 'paragraph',
        text: 'This is sample development content, not final guidance from Emily. It demonstrates the intended article hierarchy only.',
      },
      { type: 'heading', level: 2, text: 'Collect references with a point of view' },
      {
        type: 'paragraph',
        text: 'A small set of references can help surface the texture, shape, and feeling a bride is drawn to without prescribing a finished answer.',
      },
      {
        type: 'image',
        image: 'portrait',
        alt: 'Bride showing the movement in softly curled long hair',
        caption: 'Development image placement using approved migrated photography.',
      },
      { type: 'heading', level: 3, text: 'Notice the common thread' },
      {
        type: 'paragraph',
        text: 'This placeholder passage tests how supporting copy wraps beneath a compact subheading.',
      },
    ],
    relatedSlugs: ['planning-a-calm-wedding-morning', 'choosing-a-romantic-bridal-style'],
    isDevelopmentSample: true,
  },
  {
    slug: 'choosing-a-romantic-bridal-style',
    title: 'Sample: Choosing a romantic bridal style',
    excerpt:
      'Development-only copy for previewing a visual article about softness, movement, and personal style.',
    author: 'Development sample, not Emily',
    publishedAt: '2026-06-05',
    category: 'Style Notes',
    featuredImage: 'waves',
    body: [
      {
        type: 'paragraph',
        text: 'This sample is present for route and layout testing. It does not represent a published recommendation from Emily.',
      },
      { type: 'heading', level: 2, text: 'Look for feeling before labels' },
      {
        type: 'paragraph',
        text: 'The intended article design gives longer thoughts a narrow, readable measure and lets approved imagery punctuate the story.',
      },
      { type: 'heading', level: 3, text: 'Balance softness and structure' },
      {
        type: 'paragraph',
        text: 'This final placeholder subsection exists to exercise H3 hierarchy, dates, breadcrumbs, and related links.',
      },
    ],
    relatedSlugs: ['what-to-bring-to-a-bridal-preview', 'planning-a-calm-wedding-morning'],
    isDevelopmentSample: true,
  },
];
