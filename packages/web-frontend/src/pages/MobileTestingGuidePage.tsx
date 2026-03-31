import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MarketingLayout from '../components/MarketingLayout';
import { useMetadata } from '../hooks/useMetadata';
import { pageMetadata } from '../metadata';
import './MarketingPages.css';

const MobileTestingGuidePage: React.FC = () => {
  useMetadata(pageMetadata.mobileTestingGuide);

  return (
    <MarketingLayout>
      <div className="marketing-page">
        <div className="container">
          <div className="marketing-header">
            <h1 className="hero-title">Test Localhost on Mobile Devices</h1>
            <p className="hero-subtitle">
              Access your local development server from real iPhones, iPads, and Android devices
              instantly.
            </p>
          </div>

          <section className="guide-section">
            <div className="prose-section">
              <h2>Why Test on Real Mobile Devices?</h2>
              <p>
                Browser DevTools mobile emulation is helpful, but it can't replicate the real experience:
              </p>
              <ul className="doc-list">
                <li>
                  <strong>Touch interactions:</strong> Actual finger swipes, pinch-to-zoom, and gesture
                  behavior
                </li>
                <li>
                  <strong>Performance:</strong> Real CPU and memory constraints, not your dev machine's
                  specs
                </li>
                <li>
                  <strong>Browser differences:</strong> Safari iOS rendering differs from Chrome DevTools
                  emulation
                </li>
                <li>
                  <strong>Network conditions:</strong> Real mobile network latency and bandwidth
                </li>
                <li>
                  <strong>OS-specific features:</strong> Native scrolling, keyboard behavior, safe areas
                </li>
              </ul>

              <h2>The Challenge: Mobile Devices Can't Access Localhost</h2>
              <p>
                Your phone can't access <code>http://localhost:3000</code> because:
              </p>
              <ul className="doc-list">
                <li>
                  <code>localhost</code> on your phone refers to the phone itself, not your computer
                </li>
                <li>Your dev machine's local IP (192.168.x.x) only works on the same WiFi network</li>
                <li>Using IP addresses breaks HTTPS, service workers, and many modern web features</li>
              </ul>

              <h2>Solution: Public HTTPS URL with ducky</h2>

              <div className="guide-steps">
                <div className="guide-step">
                  <div className="guide-step-number">1</div>
                  <div className="guide-step-content">
                    <h3>Start your dev server</h3>
                    <div className="code-demo">
                      <pre className="code-content">
                        <code>
                          {'$ npm run dev\n'}
                          {'Local: http://localhost:3000'}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="guide-step">
                  <div className="guide-step-number">2</div>
                  <div className="guide-step-content">
                    <h3>Create public tunnel</h3>
                    <div className="code-demo">
                      <pre className="code-content">
                        <code>
                          {'$ ducky http 3000\n'}
                          {'✓ https://mobile123.ducky.wtf → localhost:3000'}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="guide-step">
                  <div className="guide-step-number">3</div>
                  <div className="guide-step-content">
                    <h3>Open on your phone</h3>
                    <p>
                      Open Safari or Chrome on your phone and visit{' '}
                      <code>https://mobile123.ducky.wtf</code>. Your local site loads instantly, with
                      full HTTPS.
                    </p>
                  </div>
                </div>

                <div className="guide-step">
                  <div className="guide-step-number">4</div>
                  <div className="guide-step-content">
                    <h3>Test and iterate</h3>
                    <p>
                      Make changes locally and refresh on your phone. With hot reload, changes appear
                      automatically. Test touch interactions, scrolling, and responsive layouts on real
                      hardware.
                    </p>
                  </div>
                </div>
              </div>

              <h2>Testing Scenarios</h2>

              <div className="provider-guides">
                <div className="provider-guide-card">
                  <h3>Responsive Design Testing</h3>
                  <p>
                    Test breakpoints, media queries, and responsive layouts on actual device sizes. Verify
                    touch target sizes and mobile-specific CSS.
                  </p>
                  <div className="code-demo">
                    <pre className="code-content">
                      <code>
                        {'# Expose your site\n'}
                        {'$ ducky http 3000\n\n'}
                        {'# Test on multiple devices:\n'}
                        {'iPhone: Open Safari → https://mobile123.ducky.wtf\n'}
                        {'Android: Open Chrome → https://mobile123.ducky.wtf\n'}
                        {'iPad: Test tablet layout\n'}
                        {'Desktop: Compare desktop view'}
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="provider-guide-card">
                  <h3>Progressive Web App (PWA) Testing</h3>
                  <p>
                    Test service workers, offline functionality, and "Add to Home Screen" behavior. PWAs
                    require HTTPS, which ducky provides automatically.
                  </p>
                  <div className="code-demo">
                    <pre className="code-content">
                      <code>
                        {'# Expose your PWA\n'}
                        {'$ ducky http 3000\n'}
                        {'✓ https://pwa123.ducky.wtf\n\n'}
                        {'# On mobile:\n'}
                        {'1. Open in Safari/Chrome\n'}
                        {'2. Add to Home Screen\n'}
                        {'3. Test offline mode\n'}
                        {'4. Test push notifications'}
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="provider-guide-card">
                  <h3>Performance Testing</h3>
                  <p>
                    Test real-world performance on actual mobile hardware. Check load times, animations,
                    and scrolling smoothness on lower-end devices.
                  </p>
                  <div className="code-demo">
                    <pre className="code-content">
                      <code>
                        {'# Test with network throttling:\n'}
                        {'Mobile Settings → Developer Options → \n'}
                        {'Network: 3G/4G simulation\n\n'}
                        {'# Or use Chrome DevTools:\n'}
                        {'chrome://inspect → [your-phone] → Network tab'}
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="provider-guide-card">
                  <h3>Browser-Specific Testing</h3>
                  <p>
                    Test Safari iOS quirks, Chrome Android differences, and mobile browser behavior. Some
                    CSS and JS features work differently on mobile browsers.
                  </p>
                  <ul className="doc-list" style={{ marginTop: '16px' }}>
                    <li>Safari iOS: Test position:fixed, viewport units, date inputs</li>
                    <li>Chrome Android: Test autofill, PWA features, address bar behavior</li>
                    <li>Samsung Internet: Test proprietary features and extensions</li>
                  </ul>
                </div>
              </div>

              <h2>QR Code for Easy Access</h2>
              <p>Generate a QR code of your tunnel URL for instant mobile access:</p>
              <div className="code-demo">
                <pre className="code-content">
                  <code>
                    {'# Install qrcode-terminal\n'}
                    {'$ npm install -g qrcode-terminal\n\n'}
                    {'# Generate QR code\n'}
                    {'$ qr https://mobile123.ducky.wtf\n\n'}
                    {'# Scan with your phone camera → opens immediately'}
                  </code>
                </pre>
              </div>

              <h2>Advantages Over Other Methods</h2>

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
                    <td>HTTPS, works anywhere, no network restrictions</td>
                    <td>Requires internet connection</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Local IP (192.168.x.x)</strong>
                    </td>
                    <td>Free, direct connection</td>
                    <td>Same WiFi only, no HTTPS, IP changes</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>BrowserStack/Sauce Labs</strong>
                    </td>
                    <td>Real devices, automated testing</td>
                    <td>Expensive ($39+/month), complex setup</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Deploy to staging</strong>
                    </td>
                    <td>Production-like environment</td>
                    <td>Slow iteration, costs money, requires CI/CD</td>
                  </tr>
                </tbody>
              </table>

              <h2>Security for Mobile Testing</h2>
              <ul className="doc-list">
                <li>
                  <strong>Use dev/test data only:</strong> Don't expose production databases or real user
                  data
                </li>
                <li>
                  <strong>Temporary exposure:</strong> Tunnel closes when you stop the CLI - no permanent
                  exposure
                </li>
                <li>
                  <strong>HTTPS by default:</strong> All traffic is encrypted, even on public WiFi
                </li>
                <li>
                  <strong>Random URLs:</strong> Free tier URLs are unpredictable - unlikely to be
                  discovered
                </li>
              </ul>

              <h2>Framework-Specific Examples</h2>

              <div className="code-demo">
                <pre className="code-content">
                  <code>
                    {'# React / Vite (port 5173)\n'}
                    {'$ ducky http 5173\n\n'}
                    {'# Next.js (port 3000)\n'}
                    {'$ ducky http 3000\n\n'}
                    {'# Vue / Vite (port 5173)\n'}
                    {'$ ducky http 5173\n\n'}
                    {'# Create React App (port 3000)\n'}
                    {'$ ducky http 3000\n\n'}
                    {'# Svelte / SvelteKit (port 5173)\n'}
                    {'$ ducky http 5173\n\n'}
                    {'# Angular (port 4200)\n'}
                    {'$ ducky http 4200'}
                  </code>
                </pre>
              </div>

              <h2>Next Steps</h2>
              <ul className="doc-list">
                <li>
                  <Link to="/guides/expose-localhost">Learn more about exposing localhost</Link>
                </li>
                <li>
                  <Link to="/guides/demo-sharing">Share demos with clients</Link>
                </li>
                <li>
                  <Link to="/pricing">Get static URLs for repeat testing</Link>
                </li>
              </ul>
            </div>
          </section>

          <section className="cta-section-alt">
            <h2 className="section-title">Test on Mobile in 30 Seconds</h2>
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

export default MobileTestingGuidePage;
