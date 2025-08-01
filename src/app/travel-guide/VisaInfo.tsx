"use client";

import "./styles/VisaInfo.css";

const VisaInfo = () => {
  return (
    <div className="visa-guide-container">
      {/* Hero Section */}
      <section className="visa-guide-section">
        <div className="visa-guide-overlay">
          <div className="visa-guide-content">
            <h1 className="visa-guide-title">Nepal Visa Guide 2025</h1>
            <p className="visa-guide-subtitle">
              Complete visa information for tourists visiting the Himalayas
            </p>
          </div>
        </div>
      </section>

      <div className="main-visa-content">
        {/* Who Needs a Visa */}
        <section className="visa-section">
          <div className="visa-section-header">
            <h2 className="visa-section-title">Who Needs a Visa?</h2>
            <div className="visa-section-title-underline"></div>
          </div>
          
          <div className="visa-requirement-grid">
            <div className="visa-card exempt-card">
              <div className="visa-card-header">
                <div className="visa-card-icon exempt-icon">🛡️</div>
                <h3>Visa Exempt</h3>
              </div>
              <div className="visa-card-content">
                <div className="highlight-badge">Indian Nationals</div>
                <ul className="feature-list">
                  <li>No visa required for entry</li>
                  <li>Stay up to 6 months with valid passport</li>
                  <li>Must enter through designated checkpoints</li>
                </ul>
              </div>
            </div>

            <div className="visa-card required-card">
              <div className="visa-card-header">
                <div className="visa-card-icon required-icon">📋</div>
                <h3>Visa Required</h3>
              </div>
              <div className="visa-card-content">
                <div className="highlight-badge">All Other Nationalities</div>
                <ul className="feature-list">
                  <li>Tourist visa required for entry</li>
                  <li>Available as Visa-on-Arrival or e-Visa</li>
                  <li>Some restrictions may apply</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Visa on Arrival Locations */}
        <section className="visa-section">
          <div className="visa-section-header">
            <h2 className="visa-section-title">Visa-on-Arrival Locations</h2>
            <div className="visa-section-title-underline"></div>
          </div>

          <div className="location-grid">
            <div className="location-card">
              <div className="location-header">
                <div className="location-icon">✈️</div>
                <h3>International Airports</h3>
              </div>
              <div className="location-list">
                <div className="location-item">
                  <span className="location-dot"></span>
                  Tribhuvan International Airport (Kathmandu)
                </div>
                <div className="location-item">
                  <span className="location-dot"></span>
                  Gautam Buddha Airport (Bhairahawa)
                </div>
                <div className="location-item">
                  <span className="location-dot"></span>
                  Pokhara Regional International Airport
                </div>
              </div>
            </div>

            <div className="location-card">
              <div className="location-header">
                <div className="location-icon">🚗</div>
                <h3>Land Border Crossings</h3>
              </div>
              <div className="location-list">
                <div className="border-section">
                  <h4>From India:</h4>
                  <div className="border-items">
                    <span className="border-item">Kakadvitta</span>
                    <span className="border-item">Birgunj</span>
                    <span className="border-item">Belahiya</span>
                    <span className="border-item">Nepalgunj</span>
                    <span className="border-item">Dhangadi</span>
                    <span className="border-item">Mahendranagar</span>
                  </div>
                </div>
                <div className="border-section">
                  <h4>From Tibet/China:</h4>
                  <div className="border-items">
                    <span className="border-item">Kodari</span>
                    <span className="border-item">Rasuwa Gadhi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visa Types and Fees */}
        <section className="visa-section">
          <div className="visa-section-header">
            <h2 className="visa-section-title">Tourist Visa Types & Fees</h2>
            <div className="visa-section-title-underline"></div>
            <p className="visa-section-subtitle">All fees are in USD and subject to change</p>
          </div>

          <div className="visa-types-grid">
            <div className="visa-type-card">
              <div className="visa-duration">15 Days</div>
              <div className="visa-price">$30</div>
              <div className="visa-features">
                <span className="feature-badge">Multiple Entry</span>
                <p>Perfect for short visits</p>
              </div>
            </div>

            <div className="visa-type-card popular-card">
              <div className="popular-ribbon">Most Popular</div>
              <div className="visa-duration">30 Days</div>
              <div className="visa-price">$50</div>
              <div className="visa-features">
                <span className="feature-badge featured">Multiple Entry</span>
                <p>Ideal for most tourists</p>
              </div>
            </div>

            <div className="visa-type-card">
              <div className="visa-duration">90 Days</div>
              <div className="visa-price">$125</div>
              <div className="visa-features">
                <span className="feature-badge">Multiple Entry</span>
                <p>For extended stays</p>
              </div>
            </div>
          </div>
        </section>

        {/* Extension Policy */}
        <section className="visa-section">
          <div className="visa-section-header">
            <h2 className="visa-section-title">Visa Extension Policy</h2>
            <div className="visa-section-title-underline"></div>
          </div>

          <div className="extension-grid">
            <div className="extension-card">
              <div className="extension-header">
                <div className="extension-icon">⏰</div>
                <h3>Extension Details</h3>
              </div>
              <div className="extension-content">
                <div className="detail-row">
                  <span className="detail-label">Maximum stay:</span>
                  <span className="detail-value">150 days per year</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Extension fee:</span>
                  <span className="detail-value">$3 USD per day</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Processing time:</span>
                  <span className="detail-value">Same day (before 1 PM)</span>
                </div>
                <div className="detail-row location-detail">
                  <span className="detail-label">Where to extend:</span>
                  <span className="detail-value">Department of Immigration, Kalikasthan, Kathmandu</span>
                </div>
              </div>
            </div>

            <div className="extension-card">
              <div className="extension-header">
                <div className="extension-icon">⚠️</div>
                <h3>Important Notes</h3>
              </div>
              <div className="extension-content">
                <ul className="warning-list">
                  <li className="warning-item">
                    <span className="warning-dot green"></span>
                    Extensions must be done before visa expires
                  </li>
                  <li className="warning-item">
                    <span className="warning-dot red"></span>
                    Overstay penalty: $5 USD per day
                  </li>
                  <li className="warning-item">
                    <span className="warning-dot blue"></span>
                    Regional immigration offices available in major cities
                  </li>
                  <li className="warning-item">
                    <span className="warning-dot orange"></span>
                    Online extension applications available for some cases
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Passport Requirements */}
        <section className="visa-section">
          <div className="visa-section-header">
            <h2 className="visa-section-title">Passport Requirements</h2>
            <div className="visa-section-title-underline"></div>
          </div>

          <div className="requirements-grid">
            <div className="requirement-card">
              <div className="requirement-icon">📅</div>
              <h3>Validity</h3>
              <p>Passport must be valid for at least <strong>6 months</strong> from entry date</p>
            </div>
            <div className="requirement-card">
              <div className="requirement-icon">📄</div>
              <h3>Blank Pages</h3>
              <p>At least <strong>2 blank pages</strong> required for visa stamps</p>
            </div>
            <div className="requirement-card">
              <div className="requirement-icon">✅</div>
              <h3>Condition</h3>
              <p>Passport should be in good condition without damage or alterations</p>
            </div>
            <div className="requirement-card">
              <div className="requirement-icon">📸</div>
              <h3>Photos</h3>
              <p><strong>1 passport-sized photo</strong> required (color, recent)</p>
            </div>
          </div>
        </section>

        {/* Travel Advisory */}
        <section className="visa-section advisory-section">
          <div className="visa-section-header">
            <h2 className="visa-section-title">Important Travel Advisory</h2>
            <div className="visa-section-title-underline"></div>
          </div>

          <div className="advisory-grid">
            <div className="advisory-card warning-card">
              <div className="advisory-header">
                <div className="advisory-icon">🚨</div>
                <h3>Avoid Airport Brokers</h3>
              </div>
              <ul className="advisory-list">
                <li>Do not use unofficial agents or brokers at the airport</li>
                <li>Apply for visa directly at official counters</li>
                <li>Brokers may charge excessive fees or provide invalid documents</li>
                <li>Official visa counters are clearly marked and staffed by immigration officers</li>
              </ul>
            </div>

            <div className="advisory-card tips-card">
              <div className="advisory-header">
                <div className="advisory-icon">💡</div>
                <h3>Helpful Tips</h3>
              </div>
              <ul className="advisory-list">
                <li>Carry exact change in USD for visa fees</li>
                <li>Complete visa application form online beforehand to save time</li>
                <li>Keep copies of important documents</li>
                <li>Check current visa fees before travel as they may change</li>
                <li>Consider applying for e-Visa online before arrival</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Official Information */}
        <section className="visa-section official-section">
          <div className="visa-section-header">
            <h2 className="visa-section-title">Official Information</h2>
            <div className="visa-section-title-underline white"></div>
          </div>
          
          <div className="official-content">
            <p className="official-text">
              For the most up-to-date and official visa information, please visit the{" "}
              <a
                href="https://www.immigration.gov.np"
                target="_blank"
                rel="noopener noreferrer"
                className="official-link"
              >
                Nepal Department of Immigration
              </a>{" "}
              official website.
            </p>
            
            <div className="disclaimer">
              <p>
                <strong>Disclaimer:</strong> Visa requirements and fees are subject to change. 
                Always verify current information with official sources before traveling.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VisaInfo;