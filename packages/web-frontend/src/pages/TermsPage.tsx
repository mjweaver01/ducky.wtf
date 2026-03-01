import React from 'react';
import MarketingLayout from '../components/MarketingLayout';
import './MarketingPages.css';

const LAST_UPDATED = 'February 1, 2026';

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using ducky ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. These terms apply to all users, including visitors, free-tier users, and paying customers.`,
  },
  {
    title: '2. Description of Service',
    body: `ducky provides a tunneling service that allows users to expose local servers to the internet via secure, encrypted tunnels. The Service includes a CLI tool, a web dashboard, and a REST API. Features available to you depend on your current subscription plan.`,
  },
  {
    title: '3. Account Registration',
    body: `To use the Service you must create an account with a valid email address and a secure password. You are responsible for maintaining the confidentiality of your account credentials. You must promptly notify us of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these Terms.`,
  },
  {
    title: '4. Acceptable Use',
    body: `You agree not to use ducky to: (a) transmit illegal content or facilitate illegal activity; (b) infringe on the intellectual property rights of others; (c) distribute malware, spam, or phishing content; (d) conduct denial-of-service attacks against any host; (e) scrape or abuse third-party services at scale; (f) circumvent rate limits or other technical controls. We reserve the right to immediately suspend tunnels that violate these rules.`,
  },
  {
    title: '5. Payment and Billing',
    body: `Paid plans are billed monthly or annually in advance. All fees are non-refundable except where required by law. We may change pricing with 30 days' written notice. Failure to pay may result in suspension or downgrade to the Free plan. You are responsible for all applicable taxes.`,
  },
  {
    title: '6. Data and Privacy',
    body: `We collect the minimum data necessary to operate the Service. We do not inspect, store, or log the content of your tunnel traffic beyond what is required for operational purposes (e.g., error logs, request metadata for analytics). Please see our Privacy Policy for full details on how we handle your data.`,
  },
  {
    title: '7. Uptime and Service Levels',
    body: `We strive for high availability but do not guarantee uninterrupted service on Free or Pro plans. Business plans are covered by our 99.9% uptime SLA as described in the plan documentation. Scheduled maintenance windows are excluded from SLA calculations.`,
  },
  {
    title: '8. Intellectual Property',
    body: `ducky and its associated trademarks, logos, and software are owned by us and are protected by applicable intellectual property laws. Your use of the Service does not grant you any ownership rights. You retain full ownership of any data you transmit through the Service.`,
  },
  {
    title: '9. Disclaimer of Warranties',
    body: `THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE ERROR-FREE OR UNINTERRUPTED.`,
  },
  {
    title: '10. Limitation of Liability',
    body: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING FROM OR RELATED TO THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE MONTHS PRECEDING THE CLAIM. WE SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES.`,
  },
  {
    title: '11. Termination',
    body: `Either party may terminate the account at any time. We may suspend or terminate your account immediately if you violate these Terms. Upon termination, your right to use the Service ceases. Provisions that by their nature should survive termination (including intellectual property, disclaimers, and limitations of liability) will do so.`,
  },
  {
    title: '12. Changes to These Terms',
    body: `We may update these Terms from time to time. We will notify you by email or by posting a notice in the dashboard at least 14 days before material changes take effect. Continued use of the Service after the effective date constitutes acceptance of the updated Terms.`,
  },
  {
    title: '13. Contact',
    body: `Questions about these Terms? Reach us at legal@ducky.wtf.`,
  },
];

const TermsPage: React.FC = () => {
  return (
    <MarketingLayout>
      <section className="marketing-hero">
        <div className="container">
          <div className="marketing-hero-content">
            <h1 className="marketing-hero-title">Terms of Service</h1>
            <p className="marketing-hero-subtitle">Last updated: {LAST_UPDATED}</p>
          </div>
        </div>
      </section>

      <section className="marketing-section">
        <div className="container">
          <div className="legal-content">
            <p className="legal-intro">
              Please read these Terms of Service carefully before using ducky. These terms govern
              your access to and use of our tunneling service, website, CLI tool, and API.
            </p>
            {sections.map((section) => (
              <div key={section.title} className="legal-section">
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
};

export default TermsPage;
