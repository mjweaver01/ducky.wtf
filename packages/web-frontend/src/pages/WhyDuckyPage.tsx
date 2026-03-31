import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, Zap, Shield, Globe, Terminal } from 'lucide-react';
import MarketingLayout from '../components/MarketingLayout';
import { useMetadata } from '../hooks/useMetadata';
import { pageMetadata } from '../metadata';
import './MarketingPages.css';

const WhyDuckyPage: React.FC = () => {
  useMetadata(pageMetadata.whyDucky);

  return (
    <MarketingLayout>
      <div className="marketing-page">
        <div className="container">
          <div className="marketing-header">
            <h1 className="hero-title">Why ducky?</h1>
            <p className="hero-subtitle">
              Looking for a localhost tunneling solution? Here's how ducky compares to ngrok and
              other popular options.
            </p>
          </div>

          <section className="comparison-section">
            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>ducky (Free)</th>
                    <th>ngrok (Free)</th>
                    <th>ducky (Pro)</th>
                    <th>ngrok (Paid)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Bandwidth Limit</td>
                    <td>
                      <Check size={20} className="icon-success" /> Unlimited
                    </td>
                    <td>
                      <X size={20} className="icon-error" /> 1 GB/month
                    </td>
                    <td>
                      <Check size={20} className="icon-success" /> Unlimited
                    </td>
                    <td>
                      <Check size={20} className="icon-success" /> Unlimited
                    </td>
                  </tr>
                  <tr>
                    <td>Interstitial Warnings</td>
                    <td>
                      <Check size={20} className="icon-success" /> None
                    </td>
                    <td>
                      <X size={20} className="icon-error" /> Yes (HTML traffic)
                    </td>
                    <td>
                      <Check size={20} className="icon-success" /> None
                    </td>
                    <td>
                      <Check size={20} className="icon-success" /> None
                    </td>
                  </tr>
                  <tr>
                    <td>Account Required</td>
                    <td>
                      <Check size={20} className="icon-success" /> Optional
                    </td>
                    <td>
                      <X size={20} className="icon-error" /> Yes
                    </td>
                    <td>
                      <Check size={20} className="icon-success" /> Yes
                    </td>
                    <td>
                      <X size={20} className="icon-error" /> Yes
                    </td>
                  </tr>
                  <tr>
                    <td>Static URLs</td>
                    <td>
                      <X size={20} className="icon-error" /> Random each session
                    </td>
                    <td>
                      <X size={20} className="icon-error" /> Random each session
                    </td>
                    <td>
                      <Check size={20} className="icon-success" /> Same URL always
                    </td>
                    <td>
                      <Check size={20} className="icon-success" /> Same URL always
                    </td>
                  </tr>
                  <tr>
                    <td>Custom Subdomains</td>
                    <td>
                      <X size={20} className="icon-error" /> No
                    </td>
                    <td>
                      <X size={20} className="icon-error" /> No
                    </td>
                    <td>
                      <Check size={20} className="icon-success" /> Yes
                    </td>
                    <td>
                      <Check size={20} className="icon-success" /> Yes
                    </td>
                  </tr>
                  <tr>
                    <td>Custom Domains</td>
                    <td>
                      <X size={20} className="icon-error" /> No
                    </td>
                    <td>
                      <X size={20} className="icon-error" /> No
                    </td>
                    <td>
                      <X size={20} className="icon-error" /> Enterprise only
                    </td>
                    <td>
                      <Check size={20} className="icon-success" /> Yes
                    </td>
                  </tr>
                  <tr>
                    <td>WebSocket Support</td>
                    <td>
                      <Check size={20} className="icon-success" /> Yes
                    </td>
                    <td>
                      <Check size={20} className="icon-success" /> Yes
                    </td>
                    <td>
                      <Check size={20} className="icon-success" /> Yes
                    </td>
                    <td>
                      <Check size={20} className="icon-success" /> Yes
                    </td>
                  </tr>
                  <tr>
                    <td>Authentication</td>
                    <td>Anonymous token (auto)</td>
                    <td>Authtoken required</td>
                    <td>Magic link email</td>
                    <td>Password + 2FA</td>
                  </tr>
                  <tr>
                    <td>Pricing (Paid)</td>
                    <td>-</td>
                    <td>-</td>
                    <td>$7/mo or $70/yr</td>
                    <td>$8/mo or $96/yr</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="why-section">
            <h2 className="section-title">What Makes ducky Different?</h2>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <Zap size={32} />
                </div>
                <h3>True Anonymous Tunneling</h3>
                <p>
                  No account needed to start. Run <code>ducky http 3000</code> and get a public URL
                  instantly. No signup forms, no authtoken configuration, no barriers.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Shield size={32} />
                </div>
                <h3>No Interstitial Warnings</h3>
                <p>
                  ducky never shows warning pages to your visitors. Your demos and webhook tests work
                  cleanly without interruption - no friction for you or your users.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Globe size={32} />
                </div>
                <h3>Unlimited Bandwidth</h3>
                <p>
                  No monthly caps on the free tier. Test, demo, and develop as much as you need without
                  worrying about hitting bandwidth limits or surprise charges.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Terminal size={32} />
                </div>
                <h3>Developer-Run & Independent</h3>
                <p>
                  Built by a solo developer trying to make the internet a little easier to use. No
                  corporate constraints, just a focus on developer experience and simplicity.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Check size={32} />
                </div>
                <h3>Open Source & Self-Hostable</h3>
                <p>
                  Full stack is MIT licensed and available on GitHub. Self-host on your own
                  infrastructure, or use our hosted service. Your choice, your control.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <ArrowRight size={32} />
                </div>
                <h3>Simple, Fair Pricing</h3>
                <p>
                  Free forever with unlimited bandwidth. Need static URLs? Just $7/month - no hidden
                  fees, no usage charges, no surprises. Cancel anytime.
                </p>
              </div>
            </div>
          </section>

          <section className="use-cases-section">
            <h2 className="section-title">Perfect for All Tunneling Use Cases</h2>
            <div className="use-cases-grid">
              <div className="use-case-item">
                <h3>Webhook Testing</h3>
                <p>
                  Test Stripe, Shopify, GitHub, and Discord webhooks locally without deploying. Get
                  a public HTTPS URL instantly.
                </p>
              </div>
              <div className="use-case-item">
                <h3>Share Local Demos</h3>
                <p>
                  Show clients your work-in-progress without deploying. Share a link to your
                  localhost and get instant feedback.
                </p>
              </div>
              <div className="use-case-item">
                <h3>Mobile Testing</h3>
                <p>
                  Test your local website on real mobile devices. Access localhost from any device
                  on any network.
                </p>
              </div>
              <div className="use-case-item">
                <h3>API Development</h3>
                <p>
                  Share your local API with teammates or third-party services for integration
                  testing and collaboration.
                </p>
              </div>
            </div>
          </section>

          <section className="getting-started-section">
            <h2 className="section-title">Get Started in 30 Seconds</h2>
            <div className="code-demo" style={{ maxWidth: '700px', margin: '0 auto 32px' }}>
              <div className="code-header">
                <span className="code-dot"></span>
                <span className="code-dot"></span>
                <span className="code-dot"></span>
              </div>
              <pre className="code-content">
                <code>
                  {'$ npm install -g '}
                  <span className="code-primary">@ducky.wtf/cli</span>
                  {'\n\n$ '}
                  <span className="code-primary">ducky</span>
                  {' http 3000\n\n'}✓ Tunnel established
                  {'\n  https://abc123.'}
                  <span className="code-primary">ducky.wtf</span>
                  {' → http://localhost:3000\n\n'}
                  {'No signup required. No configuration. Just works.'}
                </code>
              </pre>
            </div>

            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-primary btn-large">
                Start Free
                <ArrowRight size={20} />
              </Link>
              <Link to="/docs" className="btn btn-secondary btn-large">
                View Documentation
              </Link>
            </div>
          </section>

          <section className="faq-section">
            <h2 className="section-title">Frequently Asked Questions</h2>

            <div className="faq-grid">
              <div className="faq-item">
                <h3>Does ducky work the same way as other tunneling tools?</h3>
                <p>
                  No account needed to start. Run <code>ducky http 3000</code> and get a public URL
                  instantly. Other popular tools require signup and authtoken configuration even for
                  basic usage.
                </p>
              </div>

              <div className="faq-item">
                <h3>Is ducky really unlimited on the free tier?</h3>
                <p>
                  Yes. The free tier has no bandwidth caps and no request limits. You can tunnel as
                  much traffic as you need for development and testing. The only limitation is that
                  you get a random URL each time you connect (upgrade to Pro for static URLs).
                </p>
              </div>

              <div className="faq-item">
                <h3>Does ducky show interstitial warning pages?</h3>
                <p>
                  No. ducky never displays warning pages to your visitors. All traffic passes
                  through cleanly without interruption, making it perfect for demos and webhook
                  testing.
                </p>
              </div>

              <div className="faq-item">
                <h3>Is ducky better than other tunneling solutions?</h3>
                <p>
                  ducky Free offers unlimited bandwidth and no interstitial warnings, making it more
                  generous than many alternatives. Pro is $7/month with static URLs and custom
                  subdomains. Both offer similar core features at comparable pricing to
                  alternatives.
                </p>
              </div>

              <div className="faq-item">
                <h3>Can I migrate from other tunneling tools?</h3>
                <p>
                  Yes, it's instant. Uninstall your current tool, install ducky CLI, and run{' '}
                  <code>ducky http 3000</code>. The workflow is simple and familiar if you've used
                  other tunneling solutions.
                </p>
              </div>

              <div className="faq-item">
                <h3>Can I use ducky without creating an account?</h3>
                <p>
                  Yes. Simply install the CLI and run <code>ducky http 3000</code>. The CLI
                  automatically creates an anonymous token for you. No email, no signup, no
                  configuration required.
                </p>
              </div>

              <div className="faq-item">
                <h3>Does ducky support TCP tunnels?</h3>
                <p>
                  Currently, ducky focuses on HTTP and WebSocket tunnels, which covers the vast
                  majority of development use cases (webhooks, demos, API testing). TCP tunnel
                  support may be added in the future based on demand.
                </p>
              </div>

              <div className="faq-item">
                <h3>Can I self-host ducky?</h3>
                <p>
                  Yes! The entire stack is open source (MIT license) and designed to be self-hosted.
                  Deploy the tunnel server, API, and dashboard to Railway, Render, or your own
                  infrastructure. Full deployment guides are included in the repository.
                </p>
              </div>
            </div>
          </section>

          <section className="cta-section-alt">
            <h2 className="section-title">Ready to Get Started?</h2>
            <p className="section-description">
              Join developers using ducky for a simpler, unlimited tunneling experience.
            </p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-primary btn-large">
                Get Started Free
                <ArrowRight size={20} />
              </Link>
              <Link to="/pricing" className="btn btn-secondary btn-large">
                View Pricing
              </Link>
            </div>
          </section>
        </div>
      </div>
    </MarketingLayout>
  );
};

export default WhyDuckyPage;
