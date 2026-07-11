import Header from "@/components/Header";
import Footer from "@/sections/Footer";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const sections = [
  {
    title: "Information We Collect",
    intro:
      "When you fill out a contact form, enquiry form, or lead generation form, we may collect:",
    bullets: [
      "Full Name",
      "Email Address",
      "Mobile Number",
      "Company Name (if applicable)",
      "Job Title (if applicable)",
      "City/Location",
      "Budget Preference",
      "Buying Purpose",
      "Property Preferences",
      "Any additional information voluntarily provided by you",
    ],
    secondaryIntro: "We may also collect technical information such as:",
    secondaryBullets: [
      "IP Address",
      "Browser Type",
      "Device Information",
      "Website Activity",
      "Cookies and Analytics Data",
    ],
  },
  {
    title: "How We Use Your Information",
    intro: "Your information may be used to:",
    bullets: [
      "Respond to your property enquiries.",
      "Share project details, brochures, floor plans, pricing and payment plans.",
      "Schedule site visits.",
      "Provide updates regarding new launches and special offers.",
      "Contact you through phone calls, SMS, WhatsApp, email or other communication channels.",
      "Improve our website, marketing campaigns and customer experience.",
      "Measure advertising performance and optimize our campaigns.",
    ],
  },
  {
    title: "Advertising & Marketing",
    intro: "We may use advertising technologies such as:",
    bullets: [
      "Google Ads",
      "Google Analytics",
      "Meta Pixel",
      "LinkedIn Insight Tag",
      "Conversion Tracking Tools",
    ],
    outro:
      "These technologies help us understand user behaviour and improve our advertising performance.",
  },
  {
    title: "Information Sharing",
    paragraphs: [
      "We do not sell, rent or trade your personal information.",
      "Your information may only be shared with:",
    ],
    bullets: [
      "Authorized sales representatives",
      "Business partners associated with the project",
      "Technology and marketing service providers",
      "Government authorities when legally required",
    ],
    outro:
      "All third parties are required to maintain confidentiality of your information.",
  },
  {
    title: "Data Security",
    paragraphs: [
      "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, misuse, disclosure, alteration, or destruction.",
      "While we strive to use commercially acceptable means to protect your information, no method of internet transmission is completely secure.",
    ],
  },
  {
    title: "Cookies",
    intro: "Our website may use cookies to:",
    bullets: [
      "Improve website performance",
      "Remember user preferences",
      "Analyze website traffic",
      "Deliver relevant advertisements",
    ],
    outro:
      "You may disable cookies through your browser settings at any time.",
  },
  {
    title: "Your Consent",
    intro:
      "By submitting your information through our website, landing pages, or advertisements, you expressly consent to:",
    bullets: [
      "Collection of your personal information.",
      "Contact via Phone Call.",
      "SMS.",
      "WhatsApp.",
      "Email.",
      "Marketing Communications related to our real estate projects and services.",
    ],
    outro:
      "You may opt out of marketing communications at any time by contacting us.",
  },
  {
    title: "Third-Party Links",
    paragraphs: [
      "Our website may contain links to third-party websites. We are not responsible for their privacy practices or content.",
    ],
  },
  {
    title: "Changes to This Privacy Policy",
    paragraphs: [
      "We reserve the right to update this Privacy Policy at any time. Any changes will be published on this page along with the updated effective date.",
    ],
  },
  {
    title: "Contact Us",
    contact: true,
  },
  {
    title: "Consent Statement (For Lead Forms)",
    paragraphs: [
      'By clicking "Submit", you agree that Lumora Estates may collect and process your personal information in accordance with this Privacy Policy. You also consent to receive calls, SMS, WhatsApp messages, and emails regarding property information, offers, project updates, and related services.',
    ],
    highlight: true,
  },
];

const bodyText =
  "text-greenTheme font-poppins font-medium text-[15px] sm:text-base leading-[1.75]";

const BulletList = ({ items }) => (
  <ul className="space-y-2.5 mt-3">
    {items.map((item) => (
      <li
        key={item}
        className={`flex items-start gap-3 ${bodyText}`}
      >
        <span className="mt-[9px] w-2 h-2 rounded-full bg-mainText flex-shrink-0" />
        <span className="font-poppins">{item}</span>
      </li>
    ))}
  </ul>
);

const SectionBlock = ({ section, index }) => (
  <article
    id={`section-${index + 1}`}
    className={`scroll-mt-28 ${
      section.highlight
        ? "bg-greenTheme border-2 border-mainText rounded-xl p-6 sm:p-8"
        : "border-b border-greenTheme/25 pb-8 last:border-b-0 last:pb-0"
    }`}
  >
    <div className="flex items-start gap-4 sm:gap-5">
      {!section.highlight && (
        <span className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-greenTheme text-mainText font-cinzel text-sm font-bold border-2 border-mainText flex-shrink-0 mt-0.5">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <h2
          className={`font-cinzel text-lg sm:text-xl font-semibold tracking-wide ${
            section.highlight ? "text-mainText" : "text-greenTheme"
          }`}
        >
          {section.title}
        </h2>

        {section.paragraphs?.map((para, i) => (
          <p
            key={i}
            className={`mt-3 ${section.highlight ? "text-white font-medium" : bodyText}`}
          >
            {para}
          </p>
        ))}

        {section.intro && (
          <p className={`mt-3 ${bodyText}`}>
            {section.intro}
          </p>
        )}

        {section.bullets && <BulletList items={section.bullets} />}

        {section.secondaryIntro && (
          <p className={`mt-5 ${bodyText}`}>
            {section.secondaryIntro}
          </p>
        )}

        {section.secondaryBullets && (
          <BulletList items={section.secondaryBullets} />
        )}

        {section.outro && (
          <p className={`mt-4 ${bodyText}`}>
            {section.outro}
          </p>
        )}

        {section.contact && (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="https://www.lumoraestates.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 p-4 rounded-lg bg-white border-2 border-greenTheme/20 hover:border-mainText transition-colors"
            >
              <svg
                className="w-5 h-5 text-mainText"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
                />
              </svg>
              <span className="text-xs uppercase tracking-wider text-mainText font-poppins font-semibold">
                Website
              </span>
              <span className="text-greenTheme font-poppins text-sm font-semibold group-hover:text-mainText transition-colors break-all">
                lumoraestates.com
              </span>
            </a>
            <a
              href="mailto:info@lumoraestates.com"
              className="group flex flex-col gap-2 p-4 rounded-lg bg-white border-2 border-greenTheme/20 hover:border-mainText transition-colors"
            >
              <svg
                className="w-5 h-5 text-mainText"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs uppercase tracking-wider text-mainText font-poppins font-semibold">
                Email
              </span>
              <span className="text-greenTheme font-poppins text-sm font-semibold group-hover:text-mainText transition-colors">
                info@lumoraestates.com
              </span>
            </a>
            <a
              href="tel:+919211730033"
              className="group flex flex-col gap-2 p-4 rounded-lg bg-white border-2 border-greenTheme/20 hover:border-mainText transition-colors"
            >
              <svg
                className="w-5 h-5 text-mainText"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-xs uppercase tracking-wider text-mainText font-poppins font-semibold">
                Phone
              </span>
              <span className="text-greenTheme font-poppins text-sm font-semibold group-hover:text-mainText transition-colors">
                +91 92117 30033
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  </article>
);

const PrivacyPolicy = () => {
  const tocItems = sections.filter((s) => !s.highlight);

  return (
    <>
      <Head>
        <title>Lumora - Privacy Policy</title>
        <meta
          name="description"
          content="Privacy Policy for Lumora Estates. Learn how we collect, use, store, and protect your personal information."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header lgScreen="lg:w-full" bgHeader="bg-greenTheme" />

      <main className="bg-greenTheme">
        {/* Hero */}
        <section className="relative pt-[72px] 450:pt-[88px] overflow-hidden">
          <Image
            fill
            sizes="100vw"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            src="/Footer-Pattern.png"
            alt=""
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-greenTheme via-greenTheme/95 to-greenTheme" />

          <div className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="max-w-6xl mx-auto">
              <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
                <ol className="flex items-center gap-2 text-sm font-poppins">
                  <li>
                    <Link
                      href="/"
                      className="text-mainText font-medium hover:text-white transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="text-mainText/50" aria-hidden="true">
                    /
                  </li>
                  <li className="text-white font-medium" aria-current="page">
                    Privacy Policy
                  </li>
                </ol>
              </nav>

              <div className="text-center max-w-2xl mx-auto">
                <p className="text-mainText font-poppins font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                  Legal
                </p>
                <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl text-mainText font-bold tracking-wide">
                  Privacy Policy
                </h1>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <span className="h-px w-12 bg-mainText" />
                  <p className="text-mainText font-poppins text-sm font-medium">
                    Effective July 07, 2026
                  </p>
                  <span className="h-px w-12 bg-mainText" />
                </div>
                <p className="mt-5 text-white font-athena text-base sm:text-lg leading-relaxed">
                  Your privacy matters to us. This policy explains how Lumora
                  Estates collects, uses, and protects your personal information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 -mt-2">
          <div className="max-w-6xl mx-auto">
            <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10 xl:gap-14">
              {/* Table of Contents — desktop sidebar */}
              <aside className="hidden lg:block">
                <nav
                  aria-label="Table of contents"
                  className="sticky top-28 bg-greenTheme rounded-xl border-2 border-mainText/40 p-5 shadow-md"
                >
                  <p className="font-cinzel text-mainText text-sm uppercase tracking-wider font-semibold mb-4">
                    On this page
                  </p>
                  <ul className="space-y-1">
                    {tocItems.map((item, i) => (
                      <li key={item.title}>
                        <a
                          href={`#section-${i + 1}`}
                          className="block py-1.5 px-2 -mx-2 rounded text-white font-medium hover:text-mainText hover:bg-white/10 font-poppins text-[13px] leading-snug transition-colors"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>

              {/* Main content card */}
              <div className="bg-creamBg rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
                {/* Intro banner */}
                <div className="bg-greenTheme px-6 sm:px-10 py-8 sm:py-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-mainText/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-mainText/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                  <div className="relative space-y-3 max-w-3xl">
                    <p className="text-white font-poppins font-medium text-[15px] sm:text-base leading-[1.75]">
                      At Lumora Estates, we are committed to protecting your
                      privacy and ensuring that your personal information is
                      handled securely and responsibly.
                    </p>
                    <p className="text-white/90 font-poppins font-medium text-[15px] sm:text-base leading-[1.75]">
                      This Privacy Policy explains how we collect, use, store, and
                      protect the information you provide when you visit our
                      website, submit a lead form, or interact with our
                      advertisements on platforms including Google, Meta
                      (Facebook &amp; Instagram), LinkedIn, and other digital
                      marketing channels.
                    </p>
                  </div>
                </div>

                {/* Sections */}
                <div className="px-6 sm:px-10 py-8 sm:py-12 space-y-8">
                  {sections.map((section, index) => (
                    <SectionBlock
                      key={section.title}
                      section={section}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
