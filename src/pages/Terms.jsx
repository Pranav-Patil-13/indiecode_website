import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import './LegalPage.css';

export default function Terms({ onNavigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Master Services Agreement & Standard Commercial Terms — indiecode';
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
          <h1 className="minimal-legal-title">Terms & Conditions</h1>
        </header>

        <div className="minimal-legal-body">
          {/* Section 1 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">1. Preamble & Binding Master Services Framework</h2>
            <p className="minimal-legal-text">
              These Master Services Terms and Commercial Operating Conditions (&quot;Terms&quot;, &quot;Agreement&quot;, or &quot;Master Framework&quot;) constitute a legally enforceable, binding covenant entered into by and between <strong>indiecode Software Solutions Private Entities, Subsidiaries, and Affiliates</strong> (&quot;indiecode&quot;, &quot;Agency&quot;, &quot;We&quot;, &quot;Us&quot;, or &quot;Service Provider&quot;) and the commercial entity, corporation, enterprise partnership, startup, venture fund, or natural person (&quot;Client&quot;, &quot;Customer&quot;, &quot;You&quot;, or &quot;Contracting Entity&quot;) commissioning, subscribing to, or utilizing custom digital engineering, software architecture, UI/UX design, cloud infrastructure, AI automation, or advisory services.
            </p>
            <p className="minimal-legal-text">
              By countersigning an official Statement of Work (&quot;SOW&quot;), issuing an approved Purchase Order (&quot;PO&quot;), authorizing sprint kickoffs, remitting advance milestone retainers, or receiving digital deliverables from our engineers, the Client unconditionally affirms that it possesses full corporate authority and legal standing to bind itself to every term, stipulation, obligation, limitation, indemnity, and dispute resolution protocol contained herein.
            </p>
          </section>

          {/* Section 2 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">2. Formulation of Statements of Work (SOW) & Agile Sprint Architecture</h2>
            <p className="minimal-legal-text">
              Every distinct engineering engagement shall be memorialized in one or more sequentially numbered Statements of Work (&quot;SOW&quot;) or sprint work packages executed by authorized representatives of both parties. Each SOW shall incorporate these Master Terms by explicit reference:
            </p>
            <ul className="minimal-legal-list">
              <li><strong>Technical Architecture & Deliverable Specifications:</strong> Explicit definition of target software platforms, programmatic runtime environments (e.g. Node.js, Python, Go, React, iOS, Android), database engines, third-party API dependencies, and structural acceptance criteria.</li>
              <li><strong>Sprint Decomposition & Timeline Milestones:</strong> Division of the project scope into iterative Agile sprints (nominally 1 to 2 weeks per sprint cycle), containing predetermined milestone review checkpoints and deployable build targets.</li>
              <li><strong>Assumption Boundaries & Dependency Matrix:</strong> Documented prerequisites regarding third-party software licensing, external API availability, data migration integrity, and client infrastructure provisioning.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">3. Change Management Protocols & Scope Variance (Change Orders)</h2>
            <p className="minimal-legal-text">
              Software engineering inherently involves architectural evolution. If either party identifies a requirement for functional modifications, supplemental features, architectural redesigns, or integration adaptations not explicitly itemized in the governing SOW (&quot;Out-of-Scope Work&quot;), the following protocol is mandatory:
            </p>
            <ul className="minimal-legal-list">
              <li>indiecode shall formulate a detailed written Change Order specifying the anticipated technical impact, necessary architectural adjustments, sprint timeline adjustments, and compensatory cost calculations (calculated on either a blended engineering rate basis or fixed-price delta).</li>
              <li>No Out-of-Scope Work shall commence until both parties execute the Change Order in writing. Until such execution, indiecode shall continue execution under the baseline SOW timeline without penalty for non-execution of unapproved requests.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">4. Complete Intellectual Property Assignment & Transfer Conditions</h2>
            <p className="minimal-legal-text">
              We operate under an absolute, client-first intellectual property transfer doctrine governed by strict financial milestone completion:
            </p>
            <ul className="minimal-legal-list">
              <li><strong>Condition Precedent (Financial Settlement):</strong> Conditioned strictly upon full, final, and irreversible receipt of all invoiced fees, milestone settlements, reimbursable expenses, and applicable taxes due under the corresponding SOW, indiecode irrevocably assigns, transfers, and conveys to Client 100% of all global right, title, and interest in and to the custom software code, compiled binaries, database schemas, API contracts, UI/UX visual Figma files, graphics, and architectural documentation created expressly for Client (&quot;Work Product&quot;).</li>
              <li><strong>Pre-Existing Developer Frameworks & Reusable Libraries:</strong> indiecode retains sole ownership of its proprietary pre-existing software tools, boilerplate utility packages, design system foundational tokens, algorithmic libraries, and internal scripts created prior to or independently of the engagement (&quot;Background IP&quot;). indiecode grants to Client a perpetual, irrevocable, worldwide, royalty-free, non-exclusive license to use, execute, modify, compile, and distribute any Background IP embedded within the Work Product solely as an integral component of the deliverable.</li>
              <li><strong>Open-Source Compliance:</strong> Custom software delivered by indiecode may incorporate standard third-party open-source software (OSS) licensed under permissive regimes (such as MIT, Apache 2.0, BSD-2/3-Clause, ISC). Client acknowledges that OSS components remain subject to their respective upstream licenses.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">5. Client Cooperation, Dependency Governance & Acceptance Testing (UAT)</h2>
            <p className="minimal-legal-text">
              High-velocity software delivery mandates close operational synchronization. Client acknowledges and agrees to fulfill the following operational duties:
            </p>
            <ul className="minimal-legal-list">
              <li><strong>Designation of Authorized Product Owner:</strong> Client shall designate in writing a single primary Technical Product Owner with unilateral corporate authority to approve sprint designs, clarify requirements, evaluate pull requests, and formally sign off on milestone deliverables.</li>
              <li><strong>Provision of Credentials & Assets:</strong> Client shall furnish all required brand vectors, copy, third-party API tokens (e.g. OpenAI, Stripe, AWS credentials, payment gateways, ERP endpoints), staging server permissions, and test datasets within three (3) business days of project kickoff or request.</li>
              <li><strong>User Acceptance Testing (UAT) Window:</strong> Upon delivery of a milestone build to the designated staging environment, Client shall have a window of five (5) business days (&quot;Review Period&quot;) to conduct functional testing against documented SOW acceptance criteria. If Client discovers material non-conformities, it must submit a consolidated, itemized defect log. If Client fails to deliver a written defect log or utilizes the build in a live production environment within the Review Period, the milestone build shall be deemed irrevocably accepted and approved.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">6. Financial Consideration, Invoicing Cadence, Retainers & Late Settlements</h2>
            <p className="minimal-legal-text">
              All commercial engagements are governed by rigid payment schedules:
            </p>
            <ul className="minimal-legal-list">
              <li><strong>Milestone Billing Schedules:</strong> Unless specified otherwise in an SOW, projects are billed on structured milestone allocations (e.g., 30% advance initial mobilization fee, 40% intermediate beta/UAT milestone, 30% production deployment and Git repository handover).</li>
              <li><strong>Net Invoicing Terms:</strong> Invoices are payable in full within fourteen (14) calendar days of electronic transmission via standard international bank wire transfer, Automated Clearing House (ACH), or authorized merchant gateway.</li>
              <li><strong>Late Payment Penalties & Work Stoppage:</strong> Any invoice undisputed in good faith that remains outstanding beyond its due date shall accrue late interest at the rate of one and one-half percent (1.5%) per month (18% per annum) or the maximum legal rate permissible by law, whichever is lower. indiecode reserves the unilateral right to suspend sprint work, revoke access to staging servers, and withhold final Git repository transfers during any period of payment delinquency exceeding seven (7) business days.</li>
              <li><strong>Taxes:</strong> All quoted fees are exclusive of applicable Indian Goods and Services Tax (GST), value-added taxes (VAT), withholding levies, cross-border remittance fees, or international wire transaction surcharges, which shall be borne solely by Client.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">7. 30-Day Post-Deployment Defect Warranty & Service Level Commitments</h2>
            <p className="minimal-legal-text">
              indiecode stands unequivocally behind the quality, reliability, and precision of its software engineering:
            </p>
            <ul className="minimal-legal-list">
              <li><strong>Warranty Scope:</strong> For a period of thirty (30) calendar days commencing immediately upon formal production launch or client sign-off (&quot;Warranty Period&quot;), indiecode warrants that the delivered custom software will operate substantially in conformance with the approved SOW specifications and remain free from critical reproducible software bugs, database race conditions, and severe logic defects.</li>
              <li><strong>Remediation SLA:</strong> Upon receipt of a verified defect report during the Warranty Period, indiecode shall expend commercial best efforts to diagnose, patch, test, and deploy a hotfix without additional cost to Client.</li>
              <li><strong>Exclusions from Warranty:</strong> The warranty is voided and inapplicable to defects arising from: (a) unauthorized modifications or code tampering by Client or third-party developers; (b) breaking changes, deprecations, or outages in external third-party APIs (e.g. AWS, Stripe, OpenAI, Google Cloud); (c) server environment changes executed without indiecode supervision; or (d) cyber-attacks, DDoS floods, and credential stuffing vectors targeting Client infrastructure.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">8. Mutual Confidentiality, Trade Secrets & Non-Disclosure (NDA)</h2>
            <p className="minimal-legal-text">
              Both parties agree that all technical architecture diagrams, proprietary source code, algorithms, business strategies, pricing structures, client lists, and operational documents exchanged during the engagement constitute &quot;Confidential Information&quot;:
            </p>
            <ul className="minimal-legal-list">
              <li>The receiving party shall maintain strict confidentiality using the same degree of care it uses to protect its own confidential assets of like nature, but no less than a reasonable standard of care.</li>
              <li>Confidential Information shall not be disclosed to any third party except to employees, vetted subcontractors, legal counsel, and financial auditors who have a strict need-to-know and are bound by written non-disclosure covenants no less restrictive than those herein.</li>
              <li>These confidentiality obligations shall survive the termination or expiration of this Agreement for a period of five (5) years, except for trade secrets and proprietary source code which shall remain protected in perpetuity.</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">9. Warranties Disclaimer & Statutory Exclusions</h2>
            <p className="minimal-legal-text">
              EXCEPT FOR THE EXPRESS 30-DAY DEFECT WARRANTY ARTICULATED IN SECTION 7, ALL DELIVERABLES, ARCHITECTURAL DESIGNS, SOURCE CODE, STAGING ENVIRONMENTS, AND ADVISORY SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS.
            </p>
            <p className="minimal-legal-text">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, INDIECODE DISCLAIMS ALL OTHER WARRANTIES, EXPRESS, IMPLIED, STATUTORY, OR COLLATERAL, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR COMMERCIAL PURPOSE, UNINTERRUPTED ERROR-FREE RUNTIME, TITLE, AND NON-INFRINGEMENT.
            </p>
          </section>

          {/* Section 10 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">10. Strict Limitation of Liability & Consequential Damages Waiver</h2>
            <p className="minimal-legal-text">
              UNDER NO LEGAL THEORY—WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, INDEMNITY, BREACH OF STATUTORY DUTY, OR OTHERWISE—SHALL INDIECODE, ITS FOUNDERS, DIRECTORS, EMPLOYEES, AFFILIATES, OR SUBCONTRACTORS BE LIABLE TO CLIENT OR ANY THIRD PARTY FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE, EXEMPLARY, OR MULTIPLIED DAMAGES.
            </p>
            <p className="minimal-legal-text">
              THIS EXCLUSION ENCOMPASSES ALL CLAIMS FOR LOSS OF BUSINESS PROFITS, LOSS OF REVENUE, LOSS OF GOODWILL, LOSS OR CORRUPTION OF ENTERPRISE DATA, SYSTEM DOWNTIME COSTS, PROCUREMENT COSTS OF SUBSTITUTE SOFTWARE, OR BUSINESS INTERRUPTION, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH LOSSES IN ADVANCE.
            </p>
            <p className="minimal-legal-text">
              IN ALL CIRCUMSTANCES, INDIECODE&apos;S AGGREGATE, CUMULATIVE FINANCIAL LIABILITY UNDER OR ARISING OUT OF ANY ENGAGEMENT, SOW, OR THIS MASTER AGREEMENT SHALL BE STRICTLY LIMITED TO AND SHALL NOT EXCEED THE TOTAL NET SERVICE FEES ACTUALLY PAID BY CLIENT TO INDIECODE UNDER THE SPECIFIC SOW GIVING RISE TO THE CLAIM DURING THE THREE (3) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO LIABILITY.
            </p>
          </section>

          {/* Section 11 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">11. Indemnification Obligations</h2>
            <p className="minimal-legal-text">
              Client shall defend, indemnify, and hold harmless indiecode, its officers, directors, engineers, and agents against any third-party claims, lawsuits, administrative penalties, losses, damages, liabilities, and reasonable legal fees arising out of or relating to:
            </p>
            <ul className="minimal-legal-list">
              <li>Any intellectual property infringement claim alleging that materials, APIs, database content, logos, or specifications furnished by Client infringe or misappropriate third-party patents, copyrights, or trade secrets.</li>
              <li>Client&apos;s commercial deployment, marketing, or operation of the software in regulated industries (e.g. healthcare, fintech, securities, gaming) in violation of applicable laws or consumer privacy rights.</li>
              <li>Any breach by Client of its representations, warranties, or payment covenants under this Agreement.</li>
            </ul>
          </section>

          {/* Section 12 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">12. Term, Suspension & Termination Protocols</h2>
            <p className="minimal-legal-text">
              This Agreement takes effect upon client engagement and remains in force until terminated under one of the following mechanisms:
            </p>
            <ul className="minimal-legal-list">
              <li><strong>Termination for Convenience:</strong> Either party may terminate an ongoing SOW for convenience upon delivering thirty (30) calendar days advance written notice to the other party. Upon receipt of such notice, Client shall immediately pay indiecode for all sprint milestones completed, work-in-progress pro-rated on an hourly basis, and non-cancellable third-party commitments incurred up to the date of termination.</li>
              <li><strong>Termination for Material Cause:</strong> Either party may terminate immediately upon written notice if the other party commits a material breach of this Agreement and fails to cure such breach within fourteen (14) calendar days of receiving written notification of the breach.</li>
              <li><strong>Insolvency & Bankruptcy:</strong> Either party may terminate immediately if the other party becomes insolvent, enters receivership, makes an assignment for the benefit of creditors, or files for bankruptcy protection.</li>
              <li><strong>Effects of Termination:</strong> Upon termination and final financial settlement, indiecode will deliver all completed code, Git repositories, and design assets developed up to the termination timestamp.</li>
            </ul>
          </section>

          {/* Section 13 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">13. Non-Solicitation of Engineering Talent</h2>
            <p className="minimal-legal-text">
              During the term of any active engagement and for a period of twelve (12) months immediately following the completion or termination of services, Client shall not directly or indirectly recruit, solicit, hire, engage as a contractor, or entice away any software engineer, designer, system architect, or employee of indiecode who was assigned to or contributed to Client&apos;s project, without the prior express written authorization of indiecode and the payment of an agreed placement compensation fee equivalent to thirty percent (30%) of the candidate&apos;s first-year annualized gross compensation.
            </p>
          </section>

          {/* Section 14 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">14. Force Majeure Exclusions</h2>
            <p className="minimal-legal-text">
              Neither party shall be held liable, in breach, or in default for any failure or delay in the performance of its contractual obligations (excluding monetary payment obligations) resulting from acts of God, global network backbone outages, widespread subsea cable disruptions, cloud provider catastrophic outages (AWS, Cloudflare, Azure, GCP), civil unrest, labor disputes, warfare, pandemics, governmental sanctions, or unforeseen regulatory embargoes beyond the reasonable control of the affected party.
            </p>
          </section>

          {/* Section 15 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">15. Governing Law, Exclusive Jurisdiction & Dispute Arbitration</h2>
            <p className="minimal-legal-text">
              This Agreement, all Statements of Work, and all claims or disputes arising out of or in connection with the commercial relationship between indiecode and Client shall be governed by, interpreted, and construed exclusively in accordance with the substantive laws of the <strong>Republic of India</strong>, without giving effect to any principles of conflicts of law.
            </p>
            <p className="minimal-legal-text">
              The parties mutually agree that any legal action, suit, arbitration, or judicial proceeding arising out of this Agreement shall be instituted exclusively in the competent courts located within <strong>Nashik, Maharashtra, India</strong>, and each party irrevocably submits to the sole and exclusive personal and subject-matter jurisdiction of such courts.
            </p>
          </section>

          {/* Section 16 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">16. Severability, Entire Agreement & Execution Authority</h2>
            <p className="minimal-legal-text">
              These Terms, together with all executed Statements of Work and Change Orders, constitute the entire, definitive agreement between the parties regarding the subject matter hereof, superseding all prior oral discussions, email proposals, representations, or draft agreements.
            </p>
            <p className="minimal-legal-text">
              If any provision of this Agreement is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such invalidity shall not affect any other provision, and this Agreement shall be reformed and construed as if such invalid provision had never been contained herein.
            </p>
          </section>

          {/* Section 17 */}
          <section className="minimal-legal-section">
            <h2 className="minimal-section-title">17. Official Legal Notices & Corporate Nexus</h2>
            <p className="minimal-legal-text">
              All formal contractual notices, Master Services Agreement requests, or legal notices under this Agreement shall be transmitted in writing via registered electronic mail to:
            </p>
            <p className="minimal-legal-text">
              <strong>indiecode Software Solutions Private Entity</strong><br />
              Attn: Office of the General Counsel & Commercial Director<br />
              Headquarters: Nashik, Maharashtra, Postal Code 422001, India<br />
              Official Electronic Mail: <strong>hello@indiecode.in</strong><br />
              Commercial Telephone Helpline: <strong>+91 91563 67501</strong><br />
              Official Web Portal: <strong>https://indiecode.in</strong>
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
