import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import './LegalPage.css';

export default function PrivacyPolicy({ onNavigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Comprehensive Privacy Policy & Data Processing Disclosures — indiecode';
  }, []);

  return (
    <div className="minimal-legal-root">
      {/* Minimal Top Nav */}
      <nav className="minimal-legal-nav">
        <div className="minimal-legal-nav-inner">
          <button 
            type="button" 
            className="minimal-legal-brand"
            onClick={() => onNavigate('/')}
            aria-label="indiecode home"
          >
            <img src="/logo.png" alt="indiecode" />
            <span>indiecode</span>
          </button>

          <button 
            type="button" 
            className="minimal-legal-back" 
            onClick={() => onNavigate('/')}
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>
        </div>
      </nav>

      {/* Main Single Column Editorial Body */}
      <main className="minimal-legal-container">
        <header className="minimal-legal-header">
          <h1 className="minimal-legal-title">Privacy Policy</h1>
        </header>

        <div className="minimal-legal-body">
          {/* Section 1 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">1. Statutory Identification & Global Regulatory Preamble</h2>
            <p className="minimal-legal-text">
              This overarching, multi-jurisdictional Privacy Policy and Data Governance Disclosure (&quot;Policy&quot;, &quot;Disclosure&quot;, or &quot;Agreement&quot;) sets forth the comprehensive, strict, and unyielding principles under which <strong>indiecode Software Solutions Private Entities and Affiliates</strong> (&quot;indiecode&quot;, &quot;the Firm&quot;, &quot;We&quot;, &quot;Us&quot;, &quot;Our&quot;, &quot;Data Controller&quot;, or &quot;Data Processor&quot; where context dictates) captures, processes, indexes, aggregates, encrypts, pseudonymizes, transmits, archives, and disposes of personal, proprietary, institutional, telemetric, and structural data points.
            </p>
            <p className="minimal-legal-text">
              By accessing any top-level domain, subdomain, content delivery node, application programming interface (API) endpoint, staging environment, automated deployment webhook, communication channel, client repository, or physical premises maintained by indiecode (collectively, the &quot;Digital Infrastructure&quot; or &quot;Services&quot;), you (&quot;User&quot;, &quot;Client&quot;, &quot;Data Subject&quot;, &quot;Enterprise Partner&quot;, &quot;Contractor&quot;, &quot;Authorized Representative&quot;, or &quot;Visitor&quot;) unconditionally acknowledge that you have reviewed, comprehended, scrutinized, and assented to every covenant, stipulation, taxonomy, and operational caveat delineated herein. If you do not unreservedly agree with every paragraph, subsection, clause, and sub-clause of this instrument, your sole and exclusive legal recourse is to immediately terminate all active network sockets, clear local browser cookies and storage allocations, revoke authenticated tokens, and cease all interaction with the Digital Infrastructure.
            </p>
          </section>

          {/* Section 2 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">2. Granular Classification of Ingested Information Vectors</h2>
            <p className="minimal-legal-text">
              In accordance with international data governance standards including Regulation (EU) 2016/679 (General Data Protection Regulation / GDPR), the Digital Personal Data Protection Act (DPDPA 2023, India), the California Consumer Privacy Act as amended by the California Privacy Rights Act (CCPA/CPRA), the UK Data Protection Act 2018, and Singapore Personal Data Protection Act (PDPA), we enumerate all potential data vectors:
            </p>
            
            <p className="minimal-legal-text"><strong>2.1. Voluntarily Disclosed Direct Telemetry:</strong></p>
            <ul className="minimal-legal-list">
              <li><strong>Natural Person Identifiers:</strong> Legal given name, middle nomenclature, family surname, honorifics, corporate titles, functional roles within enterprise hierarchies, department classifications, and direct managerial reporting structures.</li>
              <li><strong>Electronic Communication Points:</strong> Corporate primary email addresses, secondary routing aliases, dedicated billing endpoints, direct telephone numbers, voice-over-IP (VoIP) handles, secure instant messaging identifiers (Slack, Discord, Microsoft Teams, Signal, WhatsApp for Business), and physical office suite coordinates.</li>
              <li><strong>Commercial Entity Metadata:</strong> Registered enterprise trade names, business incorporation identification numbers (CIN/GSTIN/VAT/EIN/DUNS), corporate domiciles, statutory jurisdictions, ultimate beneficial ownership (UBO) declarations, capitalization ranges, and executive delegation documentation.</li>
              <li><strong>Engineering Discovery & Technical Specifications:</strong> Architectural schematics, Entity-Relationship Diagrams (ERDs), technical requirement documents (TRDs), product backlog exports, Figma/Sketch canvas tokens, Swagger/OpenAPI specifications, database collation configurations, network topology charts, latency tolerances, expected concurrent transactions per second (TPS), and third-party vendor dependency registries.</li>
            </ul>

            <p className="minimal-legal-text"><strong>2.2. Passively Harvested Machine & Network Telemetry:</strong></p>
            <ul className="minimal-legal-list">
              <li><strong>Network Layer Disclosures:</strong> Originating IPv4 and IPv6 network addresses, autonomous system numbers (ASN), Internet Service Provider (ISP) routing hubs, Border Gateway Protocol (BGP) route hops, reverse DNS lookups, round-trip packet times (RTT), and TCP window size allocations.</li>
              <li><strong>Client-Side Hardware & Runtime Environment:</strong> User-Agent string breakdowns, browser engine rendering versions (Blink, Gecko, WebKit), hardware-accelerated WebGL vendor and renderer hashes, screen resolution bit-depths, sub-pixel device ratios, audio context frequency response fingerprinters, installed system font enumeration vectors, canvas drawing entropy, system CPU core counts, device memory bounds, and battery state API listeners where permissible.</li>
              <li><strong>Session Navigation & Behavioral Chronology:</strong> Timestamped epoch timestamps (millisecond precision), mouse cursor coordinate vectors, scroll depth velocity metrics, DOM element focus-blur transitions, HTTP referrer chains, requested URI path parameters, payload byte transfer metrics, and edge CDN cache hit/miss statuses.</li>
            </ul>

            <p className="minimal-legal-text"><strong>2.3. Project Artifacts, Repositories, and Cryptographic Credentials:</strong></p>
            <ul className="minimal-legal-list">
              <li>Cryptographic public keys (SSH, GPG), repository commit metadata, author email strings, commit epoch timestamps, Git ref hashes, pull request review discussions, continuous integration/continuous deployment (CI/CD) console logs, artifact checksums (SHA-256 / SHA-512), and encrypted environment configuration keys stored within zero-knowledge vault boundaries.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">3. Legal Bases for Processing under Multi-National Frameworks</h2>
            <p className="minimal-legal-text">
              We process each category of data strictly on legitimate grounds established under Article 6 and Article 9 of the GDPR, Section 4-7 of the India DPDPA, and applicable state regulations:
            </p>
            <ul className="minimal-legal-list">
              <li><strong>Contractual Performance (Art. 6(1)(b) GDPR):</strong> Processing is mandatory to execute preliminary feasibility audits, formulate Statements of Work (SOW), structure Agile sprint cycles, provision staging clusters, deploy production artifacts, execute code review pipelines, and maintain Service Level Agreements (SLAs).</li>
              <li><strong>Legitimate Interests (Art. 6(1)(f) GDPR):</strong> Protecting digital network perimeters against distributed denial-of-service (DDoS) attacks, brute-force authentication vectors, SQL injection probes, unauthorized endpoint enumeration, intellectual property theft, code decompilation, and internal threat tracking.</li>
              <li><strong>Statutory & Regulatory Obligations (Art. 6(1)(c) GDPR):</strong> Adherence to statutory financial audits, corporate tax disclosures, goods and services tax (GST) returns, cross-border remittance verifications, export control compliance, anti-money laundering (AML) protocols, and lawful court subpoenas issued by competent judicial authorities.</li>
              <li><strong>Explicit & Informed Consent (Art. 6(1)(a) GDPR):</strong> Explicit, granular opt-in consent for non-essential technical cookies, promotional communications, technical whitepaper distribution, or invitations to proprietary engineering webinars.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">4. Deep Architecture: Data Flow, Storage, and Cryptographic Safeguards</h2>
            <p className="minimal-legal-text">
              indiecode maintains an exhaustive, end-to-end security architecture engineered in adherence with National Institute of Standards and Technology (NIST) Special Publication 800-53, ISO/IEC 27001:2022 controls, and SOC2 Trust Services Principles:
            </p>
            <ul className="minimal-legal-list">
              <li><strong>In-Transit Cryptography:</strong> All incoming and outgoing data transmissions across public and private wide-area networks (WANs) mandate Transport Layer Security (TLS) protocol version 1.3 (with fallback strictly restricted to TLS 1.2 using ephemeral Diffie-Hellman cipher suites with Perfect Forward Secrecy / PFS). We enforce HTTP Strict Transport Security (HSTS) with a `max-age` directive of 31,536,000 seconds, complete with `includeSubDomains` and preloading flags.</li>
              <li><strong>At-Rest Cryptography:</strong> Persistent data volumes, database tables, WAL archives, and cloud block storage arrays are encrypted utilizing the Advanced Encryption Standard with 256-bit keys (AES-256-GCM / XTS-AES-256). Key management is orchestrated through Hardware Security Modules (HSM) featuring FIPS 140-3 Level 3 compliance and automated annual cryptographic key rotations.</li>
              <li><strong>Principle of Least Privilege (PoLP) & RBAC:</strong> Internal access to production database replicas, client Git branches, and staging infrastructure is restricted based on mathematically defined Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC) policies. Zero persistent root or global administrative credentials exist; all administrative elevation requires multi-party approval and ephemeral, short-lived session tokens expiring within 60 minutes.</li>
              <li><strong>Ephemeral Memory & Secret Isolation:</strong> Ingestion pipelines run in isolated stateless container runtimes (OCI compliant). Environment secrets, database passwords, and third-party API keys are dynamically injected into volatile RAM at runtime via encrypted secret vaults and are purged upon task termination, leaving zero residual traces on local magnetic or solid-state disk media.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">5. Comprehensive Sub-Processor & Third-Party Infrastructure Matrix</h2>
            <p className="minimal-legal-text">
              To deliver high-availability software architectures, we delegate specific processing tasks to audited, enterprise-grade sub-processors under strict Data Processing Agreements (DPAs) incorporating standard contractual clauses:
            </p>
            <ul className="minimal-legal-list">
              <li><strong>Edge Routing & Content Delivery:</strong> Cloudflare, Inc. (San Francisco, CA, USA) — Global reverse proxy, Web Application Firewall (WAF), automated TLS termination, and DDoS rate-limiting layer.</li>
              <li><strong>Serverless & Compute Runtime:</strong> Vercel Inc. (San Francisco, CA, USA) & Amazon Web Services, Inc. (Seattle, WA, USA) — Ephemeral edge compute execution, static asset replication, microservice orchestration, and elastic container compute.</li>
              <li><strong>Transactional Communication & Notification Engines:</strong> Resend, Inc. (San Francisco, CA, USA) & Twilio Inc. (San Francisco, CA, USA) — Inbound contact lead routing, automated delivery of technical audit summaries, and programmatic server alert dispatching.</li>
              <li><strong>Database & Object Storage Services:</strong> Supabase Inc. (Singapore/USA) & Amazon S3 (AWS US-East, EU-Central, AP-South regions) — Multi-AZ replicated transactional database hosting, encrypted document cold storage, and immutable append-only audit logging.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">6. Cross-Border Data Transmutation & Jurisdictional Transfers</h2>
            <p className="minimal-legal-text">
              Given the decentralized, global nature of modern cloud software engineering, data processed by indiecode may be stored, replicated, parsed, or accessed across servers located in the Republic of India, the European Economic Area (EEA), the United States of America, the United Kingdom, and the Republic of Singapore.
            </p>
            <p className="minimal-legal-text">
              Where personal data originating from the EEA, Switzerland, or the UK is transferred to jurisdictions lacking an adequacy decision under GDPR Article 45, indiecode implements Standard Contractual Clauses (SCCs) approved by the European Commission, supplemented by mandatory Transfer Impact Assessments (TIAs) and additional technical safeguards (such as double-envelope encryption where key escrow remains exclusively within sovereign EEA boundaries).
            </p>
          </section>

          {/* Section 7 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">7. Data Lifecycle, Archival Standards, and Destruction Protocols</h2>
            <p className="minimal-legal-text">
              We enforce strict data minimization and retention policies across every operational cluster:
            </p>
            <ul className="minimal-legal-list">
              <li><strong>Prospect & Lead Inquiries:</strong> Contact form submissions, project feasibility notes, and preliminary email exchanges that do not culminate in an executed Statement of Work within one hundred and eighty (180) calendar days are flagged for archival and permanently deleted after three hundred and sixty-five (365) calendar days.</li>
              <li><strong>Active Client Code Repositories:</strong> Staged repositories, ephemeral preview environments, and testing database instances are terminated within thirty (30) calendar days of formal project sign-off and milestone closure. Master production code is transferred 100% to client-controlled repositories, after which indiecode maintains only non-executable encrypted reference archives if explicitly mandated by the governing SOW.</li>
              <li><strong>Server Access Logs & Audit Trails:</strong> Raw HTTP access logs, load balancer connection logs, and security telemetry are retained for a rolling window of ninety (90) calendar days for anomaly detection and forensics, after which they are systematically overwritten.</li>
              <li><strong>Cryptographic Sanitization:</strong> When electronic media or storage blocks are retired, indiecode follows NIST SP 800-88 Revision 1 Guidelines for Media Sanitization (Cryptographic Erase / Multi-Pass Overwrite) to ensure zero physical or logical data reconstruction is possible.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">8. Comprehensive Catalog of Data Subject Rights</h2>
            <p className="minimal-legal-text">
              Under applicable global privacy legislations, you possess expansive statutory rights that you may exercise free of charge, subject to identity verification protocols:
            </p>
            <ul className="minimal-legal-list">
              <li><strong>Right of Access (Art. 15 GDPR):</strong> You have the unalienable right to obtain confirmation as to whether personal data concerning you is being processed, and where that is the case, receive a comprehensive copy of all stored records along with full metadata on processing purposes and recipients.</li>
              <li><strong>Right to Rectification (Art. 16 GDPR):</strong> You may demand the immediate correction of inaccurate, erroneous, or out-of-date personal identifiers and the completion of incomplete data profiles.</li>
              <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;, Art. 17 GDPR):</strong> You may formally demand the permanent logical and physical purge of your personal data from our active systems, backup rotation pipelines, and third-party processing queues, subject to statutory tax and legal retention holds.</li>
              <li><strong>Right to Restriction of Processing (Art. 18 GDPR):</strong> You have the right to demand the freezing of processing activities while disputes concerning accuracy or lawful basis are verified.</li>
              <li><strong>Right to Data Portability (Art. 20 GDPR):</strong> You may request your data in a structured, commonly used, machine-readable format (e.g., JSON, CSV) and have the right to transmit that data to another controller without hindrance.</li>
              <li><strong>Right to Object & Automated Profiling Opt-Out (Art. 21, 22 GDPR):</strong> You possess the absolute right to object at any time to processing predicated on legitimate interests or direct marketing. indiecode does not utilize automated algorithms or artificial intelligence to execute profiling with legal or significant effects without explicit human review.</li>
              <li><strong>Right to Withdraw Consent:</strong> Where processing relies on consent, you may withdraw your consent at any time with immediate effect for all future processing cycles.</li>
              <li><strong>Right to Lodge a Complaint with a Supervisory Authority:</strong> You have the statutory right to file a formal complaint with the relevant Data Protection Authority (e.g., Data Protection Board of India, CNIL in France, ICO in the UK, BfDI in Germany, or the Federal Trade Commission in the USA).</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">9. Cookies, Local Storage & Telemetry Dissociation Framework</h2>
            <p className="minimal-legal-text">
              Our website adheres to a zero-invasive-tracking philosophy. We do not integrate third-party behavioral advertising networks, retargeting pixels, fingerprinting canvas scripts, or social media data trackers.
            </p>
            <p className="minimal-legal-text">
              We exclusively employ essential first-party HTTP cookies and browser LocalStorage objects strictly required for cryptographic session state persistence, CSRF (Cross-Site Request Forgery) protection tokens, theme preference caching, and rate-limiting integrity verification. These functional tokens carry zero capability to track your browsing behaviors across external third-party domains.
            </p>
          </section>

          {/* Section 10 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">10. Children&apos;s Online Privacy Protection & Minor Data Prohibition</h2>
            <p className="minimal-legal-text">
              Our Digital Infrastructure and custom engineering services are strictly formulated and intended exclusively for enterprise entities, business professionals, and individuals aged eighteen (18) years or older. We do not knowingly solicit, collect, process, or maintain personal information from minors or individuals under the age of eighteen (18) (or the applicable age of digital majority in your jurisdiction).
            </p>
            <p className="minimal-legal-text">
              In the event we discover that an individual under the statutory age threshold has transmitted personal information through any contact endpoint, we will immediately initiate expedited cryptographic erasure protocols to purge all corresponding data records from our active tables and backup archives.
            </p>
          </section>

          {/* Section 11 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">11. Mandatory Data Breach Notification Protocols</h2>
            <p className="minimal-legal-text">
              In the extraordinarily improbable event of a security compromise, unauthorized physical intrusion, credential leak, or logical failure resulting in the accidental or unlawful destruction, loss, alteration, unauthorized disclosure of, or access to personal data (&quot;Personal Data Breach&quot;), indiecode maintains a rigorous Incident Response Plan (IRP):
            </p>
            <ul className="minimal-legal-list">
              <li><strong>Supervisory Notification:</strong> We shall notify the competent supervisory authorities without undue delay and, where feasible, not later than seventy-two (72) hours after having become aware of the breach, in accordance with Article 33 of the GDPR and relevant Indian emergency response guidelines (CERT-In).</li>
              <li><strong>Affected Subject Communication:</strong> Where the breach is likely to result in a high risk to the rights and freedoms of natural persons or corporate entities, indiecode shall communicate the nature of the breach, the name of the Data Protection Officer, likely consequences, and remediation measures directly to all impacted clients without undue delay.</li>
            </ul>
          </section>

          {/* Section 12 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">12. Architectural Amendments, Version Control, and Unilateral Updates</h2>
            <p className="minimal-legal-text">
              indiecode reserves the absolute, unfettered right to revise, update, supplement, amend, or overhaul this Privacy Policy at our sole discretion at any time to reflect advancements in technology standards, judicial precedents, statutory enactments, or changes in internal operational pipelines.
            </p>
            <p className="minimal-legal-text">
              Any amendments will become effective immediately upon the publication of the revised document displaying an updated &quot;Effective Date&quot; and revision marker on this URL. Your continued interaction with the Services following the posting of modifications constitutes your binding acceptance of the revised terms in their entirety. We advise periodic review of this document to stay informed of our data stewardship practices.
            </p>
          </section>

          {/* Section 13 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">13. Data Governance Authority & Formal Contact Nexus</h2>
            <p className="minimal-legal-text">
              To exercise your statutory data subject rights, submit Data Protection Impact Assessment (DPIA) inquiries, request signed Data Processing Addenda (DPA), or communicate with our Data Governance Council, please direct formal communications to our dedicated office:
            </p>
            <p className="minimal-legal-text">
              <strong>indiecode Software Solutions Private Entity</strong><br />
              Attn: Office of the Data Protection Officer & Legal Secretariat<br />
              Headquarters: Nashik, Maharashtra, Postal Code 422001, Republic of India<br />
              Official Compliance Communications: <strong>hello@indiecode.in</strong><br />
              Statutory Telephone Helpline: <strong>+91 91563 67501</strong><br />
              Enterprise Verification Portal: <strong>https://indiecode.in</strong>
            </p>
          </section>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="minimal-legal-footer">
        <div className="minimal-legal-footer-inner">
          <span className="minimal-legal-copy">&copy; {new Date().getFullYear()} indiecode Software Solutions. All rights reserved.</span>
          <div className="minimal-legal-links">
            <button type="button" className="minimal-footer-btn" onClick={() => onNavigate('/')}>Home</button>
            <button type="button" className="minimal-footer-btn" onClick={() => onNavigate('/blog')}>Blog</button>
            <button type="button" className="minimal-footer-btn" onClick={() => onNavigate('/privacy')}>Privacy</button>
            <button type="button" className="minimal-footer-btn" onClick={() => onNavigate('/terms')}>Terms</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
