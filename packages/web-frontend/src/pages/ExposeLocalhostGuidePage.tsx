import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MarketingLayout from '../components/MarketingLayout';
import { useMetadata } from '../hooks/useMetadata';
import { pageMetadata } from '../metadata';
import './MarketingPages.css';

const ExposeLocalhostGuidePage: React.FC = () => {
  useMetadata(pageMetadata.exposeLocalhostGuide);

  return (
    <MarketingLayout>
      <div className="marketing-page">
        <div className="container">
          <div className="marketing-header">
            <h1 className="hero-title">How to Expose Localhost to the Internet</h1>
            <p className="hero-subtitle">
              Make your local development server accessible from anywhere with a secure public HTTPS
              URL.
            </p>
          </div>

          <section className="guide-section">
            <div className="prose-section">
              <h2>Why Expose Localhost?</h2>
              <p>
                When you're developing on <code>http://localhost:3000</code>, your server is only
                accessible on your local machine. Sometimes you need to make it publicly accessible:
              </p>
              <ul className="doc-list">
                <li>
                  <strong>Test webhooks</strong> from Stripe, GitHub, Shopify, and other services
                </li>
                <li>
                  <strong>Share demos</strong> with clients or teammates without deploying
                </li>
                <li>
                  <strong>Test on mobile devices</strong> that aren't on your local network
                </li>
                <li>
                  <strong>Collaborate remotely</strong> on features that need real-time testing
                </li>
                <li>
                  <strong>Debug integrations</strong> with third-party APIs and services
                </li>
              </ul>

              <h2>The Fastest Way: Use a Localhost Tunnel</h2>
              <p>
                A localhost tunnel creates a secure bridge from a public HTTPS URL to your local
                development server. It's the industry-standard solution used by millions of developers.
              </p>

              <div className="guide-steps">
                <div className="guide-step">
                  <div className="guide-step-number">1</div>
                  <div className="guide-step-content">
                    <h3>Install ducky</h3>
                    <div className="code-demo">
                      <div className="code-header">
                        <span className="code-dot"></span>
                        <span className="code-dot"></span>
                        <span className="code-dot"></span>
                      </div>
                      <pre className="code-content">
                        <code>{'$ npm install -g @ducky.wtf/cli'}</code>
                      </pre>
                    </div>
                    <p>
                      One-time setup. The CLI works on Windows, macOS, and Linux. Requires Node.js 18+.
                    </p>
                  </div>
                </div>

                <div className="guide-step">
                  <div className="guide-step-number">2</div>
                  <div className="guide-step-content">
                    <h3>Start your local server</h3>
                    <div className="code-demo">
                      <div className="code-header">
                        <span className="code-dot"></span>
                        <span className="code-dot"></span>
                        <span className="code-dot"></span>
                      </div>
                      <pre className="code-content">
                        <code>
                          {'# Node.js / Express\n'}
                          {'$ npm run dev\n'}
                          {'Server listening on http://localhost:3000\n\n'}
                          {'# Or Python / Flask\n'}
                          {'$ flask run\n'}
                          {'Running on http://localhost:5000\n\n'}
                          {'# Or any framework/language on any port'}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="guide-step">
                  <div className="guide-step-number">3</div>
                  <div className="guide-step-content">
                    <h3>Expose localhost to the internet</h3>
                    <div className="code-demo">
                      <div className="code-header">
                        <span className="code-dot"></span>
                        <span className="code-dot"></span>
                        <span className="code-dot"></span>
                      </div>
                      <pre className="code-content">
                        <code>
                          {'$ '}
                          <span className="code-primary">ducky</span>
                          {' http 3000\n\n'}
                          {'✓ Tunnel established\n'}
                          {'  https://abc123.'}
                          <span className="code-primary">ducky.wtf</span>
                          {' → http://localhost:3000\n\n'}
                          {'Now accessible from anywhere!'}
                        </code>
                      </pre>
                    </div>
                    <p>
                      Your localhost is now accessible at the public URL. Share it with anyone, anywhere
                      in the world. No configuration required.
                    </p>
                  </div>
                </div>
              </div>

              <h2>How It Works</h2>
              <p>
                ducky creates a secure WebSocket connection from your machine to the ducky.wtf tunnel
                server. When someone visits your public URL:
              </p>
              <ol className="doc-list">
                <li>Request arrives at ducky.wtf edge server</li>
                <li>Server forwards the request over WebSocket to your CLI</li>
                <li>CLI sends request to your localhost:3000</li>
                <li>Response travels back through the tunnel to the visitor</li>
              </ol>
              <p>
                Everything is outbound-only from your machine. No firewall changes, no router
                configuration, no open ports required.
              </p>

              <h2>Common Use Cases</h2>

              <div className="provider-guides">
                <div className="provider-guide-card">
                  <h3>Expose React/Next.js Development Server</h3>
                  <div className="code-demo">
                    <pre className="code-content">
                      <code>
                        {'# Terminal 1: Start your dev server\n'}
                        {'$ npm run dev\n'}
                        {'Local: http://localhost:3000\n\n'}
                        {'# Terminal 2: Expose to internet\n'}
                        {'$ ducky http 3000\n'}
                        {'Public: https://abc123.ducky.wtf'}
                      </code>
                    </pre>
                  </div>
                  <p>Share your work-in-progress with designers, clients, or teammates.</p>
                </div>

                <div className="provider-guide-card">
                  <h3>Expose Python/Flask API</h3>
                  <div className="code-demo">
                    <pre className="code-content">
                      <code>
                        {'# Terminal 1: Start Flask\n'}
                        {'$ flask run\n'}
                        {'Running on http://localhost:5000\n\n'}
                        {'# Terminal 2: Expose to internet\n'}
                        {'$ ducky http 5000\n'}
                        {'Public: https://xyz789.ducky.wtf'}
                      </code>
                    </pre>
                  </div>
                  <p>Test your API from mobile apps, third-party services, or remote teammates.</p>
                </div>

                <div className="provider-guide-card">
                  <h3>Expose Docker Container</h3>
                  <div className="code-demo">
                    <pre className="code-content">
                      <code>
                        {'# Start container with port mapping\n'}
                        {'$ docker run -p 8080:80 my-app\n\n'}
                        {'# Expose to internet\n'}
                        {'$ ducky http 8080\n'}
                        {'Public: https://docker123.ducky.wtf'}
                      </code>
                    </pre>
                  </div>
                  <p>Share your containerized application for testing and demos.</p>
                </div>
              </div>

              <h2>Expose Localhost on Specific IP/Port</h2>
              <p>If your server binds to a specific IP address or non-localhost interface:</p>
              <div className="code-demo">
                <pre className="code-content">
                  <code>
                    {'# Expose specific IP:port\n'}
                    {'$ ducky http 192.168.1.100:8080\n\n'}
                    {'# Expose localhost on non-standard port\n'}
                    {'$ ducky http localhost:8888'}
                  </code>
                </pre>
              </div>

              <h2>Permanent URLs vs Random URLs</h2>
              <p>
                <strong>Free tier:</strong> You get a random URL each time you start a tunnel (e.g.,{' '}
                <code>https://abc123.ducky.wtf</code>, <code>https://xyz789.ducky.wtf</code>). Perfect
                for testing and one-off demos.
              </p>
              <p>
                <strong>Pro tier ($7/month):</strong> You get a static URL that never changes (e.g.,{' '}
                <code>https://myapp.ducky.wtf</code>). Ideal for webhooks, integrations, and demos that
                need persistent configuration.
              </p>
              <div className="code-demo">
                <pre className="code-content">
                  <code>
                    {'# Login to get static URL\n'}
                    {'$ ducky login\n'}
                    {'✓ Magic link sent to your email\n\n'}
                    {'# Upgrade to Pro in dashboard, then:\n'}
                    {'$ ducky http 3000\n'}
                    {'✓ https://myapp.ducky.wtf → localhost:3000'}
                  </code>
                </pre>
              </div>

              <h2>Security Considerations</h2>
              <ul className="doc-list">
                <li>
                  <strong>HTTPS by default:</strong> All tunnels use HTTPS with automatic TLS
                  certificates
                </li>
                <li>
                  <strong>Rate limiting:</strong> Built-in protection against abuse (1000 req/min per
                  tunnel)
                </li>
                <li>
                  <strong>Token-based auth:</strong> Each tunnel requires a valid auth token
                </li>
                <li>
                  <strong>Temporary exposure:</strong> Tunnel closes when CLI stops - no permanent
                  exposure
                </li>
                <li>
                  <strong>Don't expose sensitive data:</strong> Only expose development/staging servers,
                  never production databases or admin panels
                </li>
              </ul>

              <h2>Alternative Solutions</h2>
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Pros</th>
                    <th>Cons</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>ducky (recommended)</strong>
                    </td>
                    <td>Unlimited bandwidth, instant setup, no warnings</td>
                    <td>HTTP/WebSocket only</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ngrok</strong>
                    </td>
                    <td>Mature, TCP support</td>
                    <td>1GB limit, interstitial warnings, requires signup</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Port forwarding</strong>
                    </td>
                    <td>Free, direct access</td>
                    <td>Complex router config, security risks, not HTTPS</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Deploy to staging</strong>
                    </td>
                    <td>Production-like environment</td>
                    <td>Slow feedback loop, costs money</td>
                  </tr>
                </tbody>
              </table>

              <h2>Next Steps</h2>
              <ul className="doc-list">
                <li>
                  <Link to="/guides/webhook-testing">Learn how to test webhooks locally</Link>
                </li>
                <li>
                  <Link to="/docs/cli">Explore CLI commands and flags</Link>
                </li>
                <li>
                  <Link to="/pricing">Get static URLs with Pro</Link> ($7/month)
                </li>
                <li>
                  <Link to="/why-ducky">See why developers choose ducky</Link>
                </li>
              </ul>
            </div>
          </section>

          <section className="cta-section-alt">
            <h2 className="section-title">Expose Localhost in 30 Seconds</h2>
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

export default ExposeLocalhostGuidePage;
