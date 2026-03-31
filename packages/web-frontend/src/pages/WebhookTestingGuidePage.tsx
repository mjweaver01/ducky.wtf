import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import MarketingLayout from '../components/MarketingLayout';
import { useMetadata } from '../hooks/useMetadata';
import { pageMetadata } from '../metadata';
import './MarketingPages.css';

const WebhookTestingGuidePage: React.FC = () => {
  useMetadata(pageMetadata.webhookTestingGuide);

  return (
    <MarketingLayout>
      <div className="marketing-page">
        <div className="container">
          <div className="marketing-header">
            <h1 className="hero-title">How to Test Webhooks Locally in 2026</h1>
            <p className="hero-subtitle">
              A complete guide to testing Stripe, GitHub, Shopify, and other webhooks on localhost
              using secure tunnels.
            </p>
          </div>

          <section className="guide-section">
            <div className="prose-section">
              <h2>The Problem: External Services Can't Reach Localhost</h2>
              <p>
                When you're developing locally at <code>http://localhost:3000</code>, external services
                like Stripe, GitHub, Shopify, Discord, and Twilio cannot reach your server to send
                webhook events. Your local machine is behind a router's NAT (Network Address Translation)
                and isn't accessible from the public internet.
              </p>
              <p>
                This creates a frustrating development workflow: you can't test webhook integrations
                without deploying your code to a staging server every time you make a change.
              </p>

              <h2>The Solution: Secure Localhost Tunneling</h2>
              <p>
                A localhost tunnel creates a secure bridge from a public HTTPS URL to your local
                development server. When a webhook provider sends an event to your public URL, it's
                instantly forwarded to your localhost, letting you test webhooks in real-time without
                deploying.
              </p>

              <h2>Quick Start: Test Webhooks in 30 Seconds</h2>

              <div className="guide-steps">
                <div className="guide-step">
                  <div className="guide-step-number">1</div>
                  <div className="guide-step-content">
                    <h3>Install the ducky CLI</h3>
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
                          {'$ npm run dev\n'}
                          {'Server running on http://localhost:3000'}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="guide-step">
                  <div className="guide-step-number">3</div>
                  <div className="guide-step-content">
                    <h3>Create a public tunnel</h3>
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
                          {' http 3000\n\n'}✓ Tunnel established
                          {'\n  https://abc123.'}
                          <span className="code-primary">ducky.wtf</span>
                          {' → http://localhost:3000'}
                        </code>
                      </pre>
                    </div>
                    <p style={{ marginTop: '12px' }}>
                      No signup required! The CLI automatically creates an anonymous token for you.
                    </p>
                  </div>
                </div>

                <div className="guide-step">
                  <div className="guide-step-number">4</div>
                  <div className="guide-step-content">
                    <h3>Configure your webhook provider</h3>
                    <p>
                      Copy your public URL (<code>https://abc123.ducky.wtf</code>) and paste it into
                      your webhook provider's configuration. Add your webhook endpoint path (e.g.,{' '}
                      <code>/webhooks/stripe</code>).
                    </p>
                  </div>
                </div>
              </div>

              <h2>Provider-Specific Guides</h2>
              <div className="provider-guides">
                <div className="provider-guide-card">
                  <h3>Testing Stripe Webhooks Locally</h3>
                  <div className="code-demo">
                    <pre className="code-content">
                      <code>
                        {'# Start your local server\n'}
                        {'$ npm run dev  # runs on localhost:3000\n\n'}
                        {'# In another terminal, start the tunnel\n'}
                        {'$ ducky http 3000\n'}
                        {'✓ https://abc123.ducky.wtf → localhost:3000\n\n'}
                        {'# Configure in Stripe Dashboard:\n'}
                        {'# Developers → Webhooks → Add endpoint\n'}
                        {'# Endpoint URL: https://abc123.ducky.wtf/webhooks/stripe'}
                      </code>
                    </pre>
                  </div>
                  <p>
                    <strong>Pro tip:</strong> For production-ready webhook testing, upgrade to ducky Pro
                    to get a static URL that never changes. This way, you configure your Stripe webhook
                    URL once and it works forever — no need to update it every time you restart your
                    tunnel.
                  </p>
                </div>

                <div className="provider-guide-card">
                  <h3>Testing GitHub Webhooks Locally</h3>
                  <div className="code-demo">
                    <pre className="code-content">
                      <code>
                        {'# Start tunnel to your local GitHub webhook handler\n'}
                        {'$ ducky http 4000\n'}
                        {'✓ https://xyz789.ducky.wtf → localhost:4000\n\n'}
                        {'# Configure in GitHub:\n'}
                        {'# Repo → Settings → Webhooks → Add webhook\n'}
                        {'# Payload URL: https://xyz789.ducky.wtf/github/webhook\n'}
                        {'# Content type: application/json'}
                      </code>
                    </pre>
                  </div>
                  <p>
                    Test push events, pull requests, and issue comments locally without deploying. Your
                    tunnel forwards GitHub's webhook POST requests directly to your localhost.
                  </p>
                </div>

                <div className="provider-guide-card">
                  <h3>Testing Shopify Webhooks Locally</h3>
                  <div className="code-demo">
                    <pre className="code-content">
                      <code>
                        {'$ ducky http 3000\n'}
                        {'✓ https://shop123.ducky.wtf → localhost:3000\n\n'}
                        {'# Shopify Admin:\n'}
                        {'# Settings → Notifications → Webhooks → Create webhook\n'}
                        {'# URL: https://shop123.ducky.wtf/webhooks/orders'}
                      </code>
                    </pre>
                  </div>
                  <p>
                    Test order creation, fulfillment, and inventory updates locally. Perfect for
                    Shopify app development and custom integration testing.
                  </p>
                </div>

                <div className="provider-guide-card">
                  <h3>Testing Discord Webhooks Locally</h3>
                  <div className="code-demo">
                    <pre className="code-content">
                      <code>
                        {'$ ducky http 8080\n'}
                        {'✓ https://bot456.ducky.wtf → localhost:8080\n\n'}
                        {'# Discord Developer Portal:\n'}
                        {'# Your App → General → Interactions Endpoint URL\n'}
                        {'# https://bot456.ducky.wtf/discord/interactions'}
                      </code>
                    </pre>
                  </div>
                  <p>Test Discord bot interactions and slash commands locally before deploying.</p>
                </div>
              </div>

              <h2>Why Use ducky for Webhook Testing?</h2>
              <div className="features-grid" style={{ marginTop: '32px' }}>
                <div className="feature-card">
                  <div className="feature-icon">
                    <Zap size={32} />
                  </div>
                  <h3>Instant Setup</h3>
                  <p>
                    No account required to start. Run one command and get a public HTTPS URL
                    immediately. No configuration files, no auth token setup.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <CheckCircle size={32} />
                  </div>
                  <h3>No Interstitial Warnings</h3>
                  <p>
                    Unlike ngrok's free tier, ducky never shows warning pages to webhook providers. Your
                    requests pass through cleanly without interruption.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <Terminal size={32} />
                  </div>
                  <h3>See Every Request</h3>
                  <p>
                    View webhook payloads, headers, and timing in your terminal. Debug webhook issues
                    instantly with full request visibility.
                  </p>
                </div>
              </div>

              <h2>Best Practices for Webhook Testing</h2>
              <ul className="doc-list">
                <li>
                  <strong>Use static URLs for persistent webhooks:</strong> Upgrade to ducky Pro ($7/mo)
                  to get a static URL that never changes. Configure your webhook once and it works every
                  time you connect.
                </li>
                <li>
                  <strong>Validate webhook signatures:</strong> Always verify webhook signatures in your
                  local code to match production behavior. Test with real payloads from your provider's
                  test mode.
                </li>
                <li>
                  <strong>Handle retries gracefully:</strong> Webhook providers retry failed requests.
                  Test your retry logic by intentionally returning error codes.
                </li>
                <li>
                  <strong>Keep tunnels open during testing:</strong> Leave your tunnel running while you
                  trigger test events in your provider's dashboard. The tunnel forwards events in
                  real-time.
                </li>
                <li>
                  <strong>Log everything locally:</strong> Add detailed logging to your webhook handlers
                  to debug payload structure and timing issues.
                </li>
              </ul>

              <h2>Comparison: ducky vs Other Solutions</h2>
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Solution</th>
                    <th>Pros</th>
                    <th>Cons</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>ducky</strong>
                    </td>
                    <td>Unlimited bandwidth, no warnings, instant anonymous use</td>
                    <td>HTTP/WebSocket only (no TCP/UDP)</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ngrok</strong>
                    </td>
                    <td>Feature-rich, TCP support, mature ecosystem</td>
                    <td>1GB limit on free tier, interstitial warnings, requires signup</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Cloudflare Tunnel</strong>
                    </td>
                    <td>Free, DDoS protection, reliable infrastructure</td>
                    <td>Complex YAML config, requires Cloudflare DNS</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Provider CLIs</strong>
                      <br />
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        (stripe listen, etc.)
                      </span>
                    </td>
                    <td>Native integration, easy to use</td>
                    <td>Single provider only, not a general solution</td>
                  </tr>
                </tbody>
              </table>

              <h2>Common Issues and Solutions</h2>
              <div className="faq-grid" style={{ marginTop: '32px' }}>
                <div className="faq-item">
                  <h3 className="faq-question">Webhook returns 404 Not Found</h3>
                  <p className="faq-answer">
                    Check that your local server is running and the endpoint path is correct. The tunnel
                    URL + path (e.g., <code>https://abc123.ducky.wtf/webhooks/stripe</code>) should
                    match your local route (e.g., <code>localhost:3000/webhooks/stripe</code>).
                  </p>
                </div>

                <div className="faq-item">
                  <h3 className="faq-question">Webhook times out</h3>
                  <p className="faq-answer">
                    Ensure your local server responds within 5-10 seconds (most providers have strict
                    timeouts). If processing takes longer, return a 200 OK immediately and process
                    asynchronously.
                  </p>
                </div>

                <div className="faq-item">
                  <h3 className="faq-question">Signature verification fails</h3>
                  <p className="faq-answer">
                    Make sure you're using the correct webhook secret from your provider's dashboard.
                    Verify that your signature validation code matches the provider's documentation
                    exactly.
                  </p>
                </div>

                <div className="faq-item">
                  <h3 className="faq-question">Random URL changes every restart</h3>
                  <p className="faq-answer">
                    On the free tier, you get a new random URL each session. Upgrade to ducky Pro to get
                    a static URL that stays the same forever — perfect for webhooks that need persistent
                    configuration.
                  </p>
                </div>
              </div>

              <h2>Advanced: WebSocket Testing</h2>
              <p>
                ducky also supports WebSocket connections through the tunnel. Test real-time features
                like live chat, multiplayer games, or collaborative editing:
              </p>
              <div className="code-demo">
                <pre className="code-content">
                  <code>
                    {'# Start WebSocket server on localhost:8080\n'}
                    {'$ node websocket-server.js\n\n'}
                    {'# Create tunnel\n'}
                    {'$ ducky http 8080\n'}
                    {'✓ https://ws123.ducky.wtf → localhost:8080\n\n'}
                    {'# Connect from anywhere:\n'}
                    {'const ws = new WebSocket(\'wss://ws123.ducky.wtf\');'}
                  </code>
                </pre>
              </div>

              <h2>Next Steps</h2>
              <ul className="doc-list">
                <li>
                  <Link to="/pricing">Upgrade to Pro</Link> for static URLs that never change
                </li>
                <li>
                  <Link to="/docs/cli">Read the CLI reference</Link> for advanced configuration
                </li>
                <li>
                  <Link to="/docs/api">Explore the API</Link> for programmatic tunnel management
                </li>
                <li>
                  <Link to="/why-ducky">See why developers choose ducky</Link>
                </li>
              </ul>
            </div>
          </section>

          <section className="cta-section-alt">
            <h2 className="section-title">Ready to Test Webhooks Locally?</h2>
            <p className="section-description">Install the CLI and start tunneling in 30 seconds</p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-primary btn-large">
                Get Started Free
                <ArrowRight size={20} />
              </Link>
              <Link to="/docs" className="btn btn-secondary btn-large">
                View Documentation
              </Link>
            </div>
          </section>
        </div>
      </div>
    </MarketingLayout>
  );
};

export default WebhookTestingGuidePage;
