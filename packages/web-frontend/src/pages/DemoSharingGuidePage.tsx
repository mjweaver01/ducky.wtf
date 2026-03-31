import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, Eye, Monitor, Smartphone as SmartphoneIcon } from 'lucide-react';
import MarketingLayout from '../components/MarketingLayout';
import { useMetadata } from '../hooks/useMetadata';
import { pageMetadata } from '../metadata';
import './MarketingPages.css';

const DemoSharingGuidePage: React.FC = () => {
  useMetadata(pageMetadata.demoSharingGuide);

  return (
    <MarketingLayout>
      <div className="marketing-page">
        <div className="container">
          <div className="marketing-header">
            <h1 className="hero-title">Share Your Local Website for Demos</h1>
            <p className="hero-subtitle">
              Show clients your work-in-progress without deploying. Get instant feedback on local
              development.
            </p>
          </div>

          <section className="guide-section">
            <div className="prose-section">
              <h2>The Problem with Traditional Demo Workflows</h2>
              <p>
                As a developer, you want to share your work-in-progress with clients, designers, or
                teammates. Traditional approaches have friction:
              </p>
              <ul className="doc-list">
                <li>
                  <strong>Screen sharing:</strong> Requires scheduling a meeting, can't interact with
                  the site
                </li>
                <li>
                  <strong>Deploying to staging:</strong> Slow feedback loop, costs money, requires CI/CD
                  setup
                </li>
                <li>
                  <strong>Screenshots/videos:</strong> Static, can't test interactions or edge cases
                </li>
                <li>
                  <strong>Local network only:</strong> Requires VPN or being on the same WiFi
                </li>
              </ul>

              <h2>Better Solution: Instant Public URL</h2>
              <p>
                Share your local website instantly with a public HTTPS URL. Clients can click around,
                test features, and give feedback — all while you're still developing.
              </p>

              <div className="guide-steps">
                <div className="guide-step">
                  <div className="guide-step-number">1</div>
                  <div className="guide-step-content">
                    <h3>Start your development server</h3>
                    <div className="code-demo">
                      <pre className="code-content">
                        <code>
                          {'$ npm run dev\n'}
                          {'Vite dev server running at http://localhost:5173'}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="guide-step">
                  <div className="guide-step-number">2</div>
                  <div className="guide-step-content">
                    <h3>Create a public URL</h3>
                    <div className="code-demo">
                      <pre className="code-content">
                        <code>
                          {'$ ducky http 5173\n'}
                          {'✓ https://demo123.ducky.wtf → localhost:5173'}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="guide-step">
                  <div className="guide-step-number">3</div>
                  <div className="guide-step-content">
                    <h3>Share the link</h3>
                    <p>
                      Copy <code>https://demo123.ducky.wtf</code> and send it via email, Slack, or text.
                      Anyone can access your local website immediately.
                    </p>
                  </div>
                </div>

                <div className="guide-step">
                  <div className="guide-step-number">4</div>
                  <div className="guide-step-content">
                    <h3>Get instant feedback</h3>
                    <p>
                      Make changes locally and they appear instantly (with hot reload). Your client sees
                      updates in real-time as you develop.
                    </p>
                  </div>
                </div>
              </div>

              <h2>Use Cases</h2>

              <div className="features-grid" style={{ marginTop: '32px' }}>
                <div className="feature-card">
                  <div className="feature-icon">
                    <Users size={32} />
                  </div>
                  <h3>Client Demos</h3>
                  <p>
                    Show clients your work before deploying. Get feedback early and iterate quickly
                    without waiting for staging deployments.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <Eye size={32} />
                  </div>
                  <h3>Design Review</h3>
                  <p>
                    Share with designers to verify implementation. They can test interactions, check
                    responsive behavior, and approve changes.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <Monitor size={32} />
                  </div>
                  <h3>Team Collaboration</h3>
                  <p>
                    Remote teammates can test your feature branch before merging. Perfect for distributed
                    teams and async code review.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <SmartphoneIcon size={32} />
                  </div>
                  <h3>Cross-Device Testing</h3>
                  <p>
                    Test your site on real mobile devices, tablets, and different browsers without
                    deploying or being on the same network.
                  </p>
                </div>
              </div>

              <h2>Pro Tips for Demo Sharing</h2>

              <div className="faq-grid" style={{ marginTop: '32px' }}>
                <div className="faq-item">
                  <h3 className="faq-question">Use static URLs for repeat demos</h3>
                  <p className="faq-answer">
                    Free tier gives random URLs each session. Upgrade to Pro ($7/month) to get a static
                    URL like <code>https://myapp.ducky.wtf</code> that never changes. Share it once and
                    use it forever.
                  </p>
                </div>

                <div className="faq-item">
                  <h3 className="faq-question">Keep the tunnel running during demos</h3>
                  <p className="faq-answer">
                    Leave your CLI running while the client explores. They can click around, test forms,
                    and try features while you watch the terminal logs.
                  </p>
                </div>

                <div className="faq-item">
                  <h3 className="faq-question">Use hot reload for live updates</h3>
                  <p className="faq-answer">
                    With frameworks like Vite, Next.js, or Create React App, changes appear instantly.
                    Fix bugs during the demo and clients see updates in real-time.
                  </p>
                </div>

                <div className="faq-item">
                  <h3 className="faq-question">Seed demo data for realistic testing</h3>
                  <p className="faq-answer">
                    Populate your local database with realistic demo data. This makes demos more
                    compelling and helps clients visualize the final product.
                  </p>
                </div>
              </div>

              <h2>Why ducky for Demo Sharing?</h2>
              <ul className="doc-list">
                <li>
                  <strong>No interstitial warnings:</strong> Unlike ngrok free tier, ducky never shows
                  warning pages to your visitors
                </li>
                <li>
                  <strong>Unlimited bandwidth:</strong> No 1GB monthly cap - share as many demos as you
                  need
                </li>
                <li>
                  <strong>Instant setup:</strong> No account required, no configuration files, just run
                  one command
                </li>
                <li>
                  <strong>Professional URLs:</strong> Clean URLs like{' '}
                  <code>https://myapp.ducky.wtf</code> (Pro tier)
                </li>
              </ul>

              <h2>Next Steps</h2>
              <ul className="doc-list">
                <li>
                  <Link to="/guides/mobile-testing">Test your site on mobile devices</Link>
                </li>
                <li>
                  <Link to="/guides/webhook-testing">Learn webhook testing</Link>
                </li>
                <li>
                  <Link to="/pricing">Get static URLs with Pro</Link>
                </li>
              </ul>
            </div>
          </section>

          <section className="cta-section-alt">
            <h2 className="section-title">Start Sharing Demos Today</h2>
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-primary btn-large">
                Get Started Free
                <ArrowRight size={20} />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </MarketingLayout>
  );
};

export default DemoSharingGuidePage;
