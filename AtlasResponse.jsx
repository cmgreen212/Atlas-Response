import { useState, useEffect, useRef } from "react";

const LogoSVG = () => (
  <svg width="38" height="38" viewBox="0 0 100 100" fill="none">
    <defs><radialGradient id="rg" cx="50%" cy="45%" r="55%"><stop offset="0%" stopColor="#e8943a" stopOpacity="0.9"/><stop offset="60%" stopColor="#e8943a" stopOpacity="0.3"/><stop offset="100%" stopColor="#0c1c32" stopOpacity="0"/></radialGradient></defs>
    <polygon points="50,4 62,14 58,28 50,22 42,28 38,14" fill="#e8943a" opacity="0.95"/>
    <circle cx="50" cy="52" r="30" stroke="#4eaee8" strokeWidth="1.2" fill="none" opacity="0.5"/>
    <ellipse cx="50" cy="52" rx="18" ry="30" stroke="#4eaee8" strokeWidth="0.8" fill="none" opacity="0.35"/>
    <line x1="20" y1="52" x2="80" y2="52" stroke="#4eaee8" strokeWidth="0.8" opacity="0.3"/>
    <line x1="23" y1="38" x2="77" y2="38" stroke="#4eaee8" strokeWidth="0.6" opacity="0.25"/>
    <line x1="23" y1="66" x2="77" y2="66" stroke="#4eaee8" strokeWidth="0.6" opacity="0.25"/>
    <path d="M 20,52 A 30,30 0 0,1 50,22 L 58,28 A 22,22 0 0,0 28,52 Z" fill="url(#rg)" opacity="0.85"/>
    <polygon points="55,18 62,14 70,30 63,34" fill="#e8943a" opacity="0.7"/>
  </svg>
);

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => el.classList.add("visible"), delay); obs.unobserve(el); } }, { threshold: 0.05 });
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className="reveal">{children}</div>;
}

function ScrollBar() {
  const ref = useRef(null);
  useEffect(() => {
    const fn = () => { const h = document.documentElement.scrollHeight - window.innerHeight; if (ref.current) ref.current.style.width = (h > 0 ? window.scrollY / h * 100 : 0) + "%"; };
    window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div style={{position:"fixed",top:0,left:0,right:0,height:2,zIndex:200,background:"rgba(255,255,255,.04)"}}><div ref={ref} style={{height:"100%",width:0,background:"linear-gradient(90deg,#e8943a,#f0b429)",transition:"width .1s"}}/></div>;
}

function Nav({ page, go }) {
  const ref = useRef(null);
  useEffect(() => {
    const fn = () => ref.current?.classList.toggle("scrolled", window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav ref={ref} className="site-nav">
      <button className="nav-logo" onClick={() => go("home")}><LogoSVG /><span>ATLAS <em>RESPONSE</em></span></button>
      <ul className="nav-links">
        {[["home","Home"],["fleet","Fleet"],["about","About"],["operations","Operations"],["for-hospitals","For Hospitals"],["investors","Investors"],["why-florida","Why Florida"],["phase-a","Phase A"],["partners","Partners"],["contact","Contact"]].map(([k,l]) => (
          <li key={k}><button className={`nav-btn${page===k?" active":""}`} onClick={() => go(k)}>{l}</button></li>
        ))}
      </ul>
      <button className="nav-cta" onClick={() => go("request-briefing")}>Request Briefing</button>
    </nav>
  );
}

function Footer({ go }) {
  return (
    <footer className="site-footer">
      <div className="footer-logo">ATLAS <em>RESPONSE</em></div>
      <div className="footer-links">
        {[["home","Home"],["fleet","Fleet"],["about","About"],["operations","Operations"],["for-hospitals","For Hospitals"],["investors","Investors"],["briefing","Briefing"],["why-florida","Why Florida"],["phase-a","Phase A"],["partners","Partners"],["contact","Contact"],["legal","Legal"],["request-briefing","Request Briefing"]].map(([k,l]) => (
          <button key={k} className="footer-btn" onClick={() => go(k)}>{l}</button>
        ))}
      </div>
      <div className="footer-legal">© 2026 Atlas Response, Inc. · Lakeland, FL · Confidential</div>
    </footer>
  );
}

// ── HOME ────────────────────────────────────────────────────────────────────
function HomePage({ go }) {
  const compRef = useRef(null);
  const [barsOn, setBarsOn] = useState(false);
  useEffect(() => {
    const el = compRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setBarsOn(true); obs.disconnect(); }
    }, {threshold: 0.15});
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <div>
      {/* ── HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-grid"/>
          <div className="scanline"/>
          <div className="radar-wrap">
            <svg viewBox="0 0 560 560" fill="none">
              <defs>
                <radialGradient id="sweepGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e8943a" stopOpacity="0.18"/>
                  <stop offset="100%" stopColor="#e8943a" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <circle className="rr" r="260" cx="280" cy="280"/>
              <circle className="rr" r="200" cx="280" cy="280"/>
              <circle className="rr" r="140" cx="280" cy="280"/>
              <circle className="rr" r="80"  cx="280" cy="280"/>
              <circle className="rr-accent" r="260" cx="280" cy="280"/>
              <line className="rr" x1="280" y1="20"  x2="280" y2="540"/>
              <line className="rr" x1="20"  y1="280" x2="540" y2="280"/>
              <g className="radar-sweep">
                <path d="M280 280 L280 20 A260 260 0 0 1 540 280 Z" fill="url(#sweepGrad)"/>
              </g>
              <circle cx="340" cy="180" r="3" fill="#e8943a" opacity="0.6"/>
              <circle cx="200" cy="320" r="2" fill="#4eaee8" opacity="0.5"/>
            </svg>
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-eyebrow">Where Response Is Mission</div>
          <div className="hero-badges">
            <span className="badge">FAA Part 135 Certification Pathway · Medical &amp; Emergency Logistics</span>
            <span className="badge">HQ: North Combee Rd, Lakeland, FL</span>
            <span className="badge">Heavy payload uncrewed aircraft</span>
            <span className="badge">HIPAA-out-of-scope by architecture</span>
          </div>
          <h1 className="hero-title">
            Where<br/><span className="accent">Response</span><br/><span className="outline">Is Mission</span>
          </h1>
          <p className="hero-sub">
            Atlas Response operates heavy-payload uncrewed aircraft for time-critical medical and emergency logistics — carrying what lightweight drone networks can't: <strong>organs, active perfusion systems, blood suites, and emergency medical equipment.</strong>
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => go("request-briefing")}>Request Mission Briefing</button>
            <button className="btn-ghost" onClick={() => go("briefing")}>Learn More</button>
          </div>
        </div>
        <div className="hero-stats">
          {[{v:"$90M",l:"Series A Raise"},{v:"600 lbs",l:"Max Payload"},{v:"150 NM",l:"Phase A Radius"},{v:"Part 135",l:"FAA Target Cert"}].map((s,i) => (
            <div key={i} className="stat-item">
              <div className="stat-val">{s.v}</div>
              <div className="stat-label">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="scroll-hint"><div className="scroll-line"/>Scroll</div>
      </section>

      {/* ── MISSION */}
      <section id="mission" style={{borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="section-inner">
          <div className="mission-grid">
            <div className="mission-text">
              <Reveal><div className="section-label">Our Mission</div></Reveal>
              <Reveal delay={80}><h2 className="section-title">Built for the Cargo<br/>No One Else <span className="accent">Can Carry</span></h2></Reveal>
              <Reveal delay={160}>
                <p>Every year, life-critical medical cargo loses time to ground traffic, charter delays, and equipment constraints. Traditional transport systems weren't designed for the precision, reliability, and chain-of-custody integrity that modern healthcare logistics demand.</p>
                <p>Transport delays and logistics failures remain a meaningful contributor to organ non-utilization — not from shortage of supply alone, but from the limits of today's logistics infrastructure.</p>
                <div className="mission-callout">Atlas Response closes that gap — with uncrewed aircraft and standardized payload systems built for heavy, regulated medical logistics.</div>
                <p>We move what matters most: active perfusion systems, organ procurement equipment, blood &amp; biologics, and emergency medical devices — at a weight class the industry has largely ignored.</p>
                <p className="small-note">Organ and logistics references on this site are directional. Detailed sourcing will be provided in investor and partner briefing materials.</p>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <div className="capability-list">
                {[
                  {n:"01",t:"Organ Transport",d:"Support for active perfusion workflows and time-critical transfers — reducing exposure to ground delays and protecting viability windows."},
                  {n:"02",t:"Blood & Biologics",d:"Temperature-integrity transport with logging for blood products and biologics across variable ambient conditions."},
                  {n:"03",t:"Emergency Medical Logistics",d:"Rapid deployment of high-value devices and trauma supplies to disaster zones and remote facilities when minutes count."},
                  {n:"04",t:"Government & Defense",d:"Mission-aligned logistics support for agencies requiring risk reduction, forward deployment, and scalable response capacity."},
                ].map((c,i) => (
                  <div key={i} className="cap-item">
                    <div className="cap-number">{c.n}</div>
                    <div className="cap-body"><div className="cap-title">{c.t}</div><div className="cap-desc">{c.d}</div></div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHY NOW */}
      <section id="whynow" style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <Reveal><div className="section-label">Market Opportunity</div></Reveal>
          <Reveal delay={80}><h2 className="section-title">A Gap Nobody <span className="accent">Has Filled</span></h2></Reveal>
          <div className="whynow-grid" style={{marginTop:40}}>
            <div className="whynow-stat-stack">
              {[
                {v:"Heavy",   l:"A major logistics gap exists between lightweight drone delivery and crewed air charter — especially for mission-critical payloads."},
                {v:"4–10 lb", l:"Typical payload range for many existing medical drone operators — well below the weight of perfusion platforms, blood suites, and emergency equipment."},
                {v:"Now",     l:"Part 135 pathways for uncrewed carriers are defined, and the first serious operator window is narrow."},
              ].map((s,i) => (
                <Reveal key={i} delay={i*80}>
                  <div className="big-stat"><div className="big-stat-val">{s.v}</div><div className="big-stat-label">{s.l}</div></div>
                </Reveal>
              ))}
              <p style={{fontSize:11,color:"var(--dim)",fontFamily:"'Courier New',monospace",lineHeight:1.6,paddingTop:16}}>NOTE: Statistics and competitor specifications shown here are directional and will be fully sourced in investor and partner briefing materials.</p>
            </div>
            <div className="whynow-points">
              {[
                {icon:"⚖️",t:"Regulatory Window Is Open",                   d:"The FAA framework for certificated uncrewed air carrier operations is maturing, enabling disciplined operators to build durable authority, not just prototypes."},
                {icon:"🏥",t:"No Mature Competitor at Heavy Payload",        d:"The market is crowded at lightweight payloads. The 100–600 lb mission profile — where many hospital logistics needs live — remains underserved."},
                {icon:"🔬",t:"Medical Technology Demands Matching Logistics", d:"Advanced systems improve care — but they also raise the bar for transport reliability, handling discipline, and time integrity."},
                {icon:"📍",t:"Florida Is a High-Leverage Launch Market",     d:"Central Florida offers dense hospital corridors, major transplant centers, year-round operability, and the right geography for a disciplined launch market."},
              ].map((p,i) => (
                <Reveal key={i} delay={i*60}>
                  <div className="whynow-point">
                    <div className="whynow-icon">{p.icon}</div>
                    <div><div className="whynow-point-title">{p.t}</div><div className="whynow-point-desc">{p.d}</div></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PAYLOAD */}
      <section id="payload" style={{borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="section-inner">
          <Reveal><div className="section-label">Payload Capability</div></Reveal>
          <Reveal delay={80}><h2 className="section-title">The Weight Class <span className="accent">No One Occupies</span></h2></Reveal>
          <Reveal delay={120}><p style={{fontSize:16,color:"var(--muted)",lineHeight:1.85,maxWidth:680,marginBottom:48}}>Current medical drone delivery is optimized for small parcels. Atlas Response is built for heavy, regulated payloads with chain-of-custody discipline.</p></Reveal>
          <div className="payload-cards">
            {[
              {icon:"🫀",t:"Active Perfusion Workflows",sub:"Typical: 100–200+ lbs (system + support)",  d:"Designed to support time-critical, high-value clinical workflows that require stable handling and reliable delivery windows."},
              {icon:"🫁",t:"OCS-Class Systems",          sub:"Typical: 100–300 lbs (config-dependent)",  d:"Atlas targets payload profiles that include device systems, solutions, and accessory kits — beyond the capabilities of lightweight drone networks.",featured:true},
              {icon:"🩸",t:"Blood & Biologics Suite",    sub:"Up to 200+ lbs (packout-dependent)",       d:"Temperature integrity + logging for blood products and biologics, scalable from urgent single-unit transfers to depot-to-network runs."},
            ].map((c,i) => (
              <Reveal key={i} delay={i*80}>
                <div className={`payload-card${c.featured?" featured":""}`}>
                  <div style={{fontSize:28,marginBottom:16}}>{c.icon}</div>
                  <div className="p-title">{c.t}</div>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:10,color:"var(--accent)",letterSpacing:1,marginBottom:14}}>{c.sub}</div>
                  <p style={{fontSize:14,color:"var(--muted)",lineHeight:1.75}}>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div ref={compRef} style={{marginTop:64}}>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:2,color:"var(--sky)",textTransform:"uppercase",marginBottom:24}}>Payload Capacity Comparison — Medical Drone Industry vs. Atlas Response</div>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {[
                {name:"Atlas Response",lbs:"600 lbs",pct:100,  atlas:true},
                {name:"Wing",          lbs:"10 lbs", pct:1.67},
                {name:"Matternet",     lbs:"4.5 lbs",pct:0.75},
                {name:"Zipline",       lbs:"4 lbs",  pct:0.67},
              ].map((b,i) => (
                <div key={i} className="comp-bar-group">
                  <div className="comp-bar-header"><span className="comp-name">{b.name}</span><span className="comp-val">{b.lbs}</span></div>
                  <div className="comp-track">
                    <div className={`comp-fill${b.atlas?" atlas":""}`} style={{width:barsOn?`${b.pct}%`:"0%",minWidth:barsOn&&!b.atlas?4:0}}/>
                  </div>
                </div>
              ))}
            </div>
            <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.75,marginTop:24,maxWidth:640}}>Every current competitor is constrained below the payload threshold for active perfusion systems, multi-organ procurement kits, and full blood suites. Atlas Response is purpose-built for the payloads that matter.</p>
          </div>
          <div style={{marginTop:80,borderTop:"1px solid rgba(255,255,255,.04)",paddingTop:64}}>
            <Reveal><div className="section-label">Standardized Payload System</div></Reveal>
            <Reveal delay={80}><h2 className="section-title">The Atlas <span className="accent">Universal Pod</span></h2></Reveal>
            <div className="pod-grid" style={{marginTop:40}}>
              <div className="pod-text">
                <Reveal delay={100}>
                  <p>Heavy-payload operations aren't just an aircraft problem — they're a payload handling problem. Every other operator solves it aircraft by aircraft: custom interiors, one-off mounts, re-engineered airframes just to carry an OCS machine.</p>
                  <p>Atlas Response takes a different approach. The aircraft is a dumb lifter. It carries a standardized pod interface — known weight, known dimensions, known attachment points. The medical intelligence lives in the pod itself: temperature control, vibration isolation, chain-of-custody access, condition logging.</p>
                  <p><strong>Load any compliant configuration, fly any mission.</strong> Think ISO shipping containers. Ships, trucks, and cranes don't need to know what's inside — they interface with the standard. The Universal Pod is that standard for heavy medical drone cargo.</p>
                  <p>Pods remain sealed from origin to destination. Atlas personnel never access the contents — only the sending and receiving parties handle the cargo. This protects patient privacy, HIPAA alignment, and medical liability boundaries by design, not policy.</p>
                </Reveal>
                <Reveal delay={160}>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:1,background:"var(--rim)",marginTop:32}}>
                    {[
                      {k:"Aircraft Agnostic",  d:"Swap aircraft platforms as the market evolves — medical infrastructure stays intact."},
                      {k:"No Custom Airframes",d:"OCS systems, blood suites, and trauma kits load into the pod — not bolted to the aircraft."},
                      {k:"Repeatable Process", d:"Every mission uses the same certified loading procedure — auditable, consistent, SLA-ready."},
                      {k:"Durable Moat",       d:"A pod standard is hard to replicate. Competitors must rebuild from scratch — we've already built the infrastructure."},
                    ].map((m,i) => (
                      <div key={i} style={{background:"var(--panel)",padding:"20px 22px"}}>
                        <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,color:"var(--accent)",textTransform:"uppercase",marginBottom:8}}>{m.k}</div>
                        <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.7}}>{m.d}</div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
              <Reveal delay={80}>
                <div className="pod-spec">
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:2,color:"var(--sky)",textTransform:"uppercase",marginBottom:20}}>Pod concept specs (Phase A)</div>
                  {[
                    {k:"Primary design target",v:"4× device-class bays"},
                    {k:"Isolation",            v:"Vibration reduction"},
                    {k:"Security",             v:"Chain-of-custody ready"},
                    {k:"Access model",         v:"Sealed origin → destination"},
                    {k:"Compliance",           v:"HIPAA-aligned by design"},
                    {k:"Operations",           v:"Rapid swap workflow"},
                    {k:"Telemetry option",     v:"Cargo condition logging"},
                  ].map((s,i) => (
                    <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",padding:"12px 0",borderBottom:"1px solid var(--rim)"}}>
                      <span className="spec-k">{s.k}</span><span className="spec-v">{s.v}</span>
                    </div>
                  ))}
                  <p style={{fontSize:11,color:"var(--dim)",fontFamily:"'Courier New',monospace",lineHeight:1.6,marginTop:16}}>Pod configuration and bay sizing are finalized after aircraft selection to ensure CG/handling compliance.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── OPERATIONS */}
      <section id="ops" style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <div style={{textAlign:"center",maxWidth:760,margin:"0 auto 56px"}}>
            <Reveal><div className="section-label" style={{justifyContent:"center"}}>Operations Model</div></Reveal>
            <Reveal delay={80}><h2 className="section-title">Designed for Authority, <span className="accent">Not Hype</span></h2></Reveal>
            <Reveal delay={120}><p style={{fontSize:16,color:"var(--muted)",lineHeight:1.85}}>Atlas is built around regulatory discipline, chain-of-custody integrity, and mission reliability — engineered for medical-grade operations, not consumer delivery metrics.</p></Reveal>
          </div>
          <Reveal delay={80}><div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:2,color:"var(--sky)",textTransform:"uppercase",textAlign:"center",marginBottom:8}}>How a Mission Moves</div></Reveal>
          <div className="mission-flow">
            {[
              {n:"01",t:"Request Intake", d:"ROC validates mission priority, route profile, and destination handoff requirements."},
              {n:"02",t:"Prep & Custody", d:"Payload verification, documentation, and handoff controls are completed."},
              {n:"03",t:"Launch",         d:"Mission enters active monitoring under Atlas procedures and telemetry supervision."},
              {n:"04",t:"Handoff",        d:"Controlled transfer at destination with confirmation and timestamped receipt."},
              {n:"05",t:"Reporting",      d:"Post-mission documentation, status summary, and audit-trail support."},
            ].map((s,i) => (
              <Reveal key={i} delay={i*80}>
                <div className="flow-step">
                  <div className="flow-num">{s.n}</div>
                  <div className="flow-title">{s.t}</div>
                  <div className="flow-desc">{s.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"var(--rim)",marginTop:56}}>
            {[
              {n:"01",t:"FAA Part 135 Pathway",      d:"Targeting certificated carrier operations — building durable authority, procedures, and compliance infrastructure."},
              {n:"02",t:"Chain of Custody Protocol", d:"Documented custody controls aligned to partner requirements — designed to support clinical and agency compliance."},
              {n:"03",t:"Real-Time Telemetry",       d:"Continuous aircraft monitoring with the option to extend telemetry into cargo condition logging and reporting."},
              {n:"04",t:"Temperature Integrity",     d:"Temperature management and logging for biologics payloads across ambient conditions and mission durations."},
              {n:"05",t:"Multi-Corridor Network",    d:"Hospital-to-hospital, depot distribution, airport bridging, and forward deployment — one network, multiple missions."},
              {n:"06",t:"Scalable Fleet Model",      d:"Fleet growth tied to contracted demand and SLAs — scaling capacity with operational discipline."},
            ].map((c,i) => (
              <Reveal key={i} delay={i*60}>
                <div className="ops-card">
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:10,color:"var(--accent)",letterSpacing:1,marginBottom:14}}>{c.n}</div>
                  <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:18,color:"var(--white)",marginBottom:10}}>{c.t}</div>
                  <div style={{fontSize:14,color:"var(--muted)",lineHeight:1.75}}>{c.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHASE A */}
      <section id="phase-a" style={{borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="section-inner">
          <Reveal><div className="section-label">Phase A Buildout</div></Reveal>
          <Reveal delay={80}><h2 className="section-title">What the <span className="accent">$90M Series A</span> Funds</h2></Reveal>
          <Reveal delay={120}><p style={{fontSize:16,color:"var(--muted)",lineHeight:1.85,maxWidth:760,marginBottom:56}}>Phase A is infrastructure-first: 30-acre campus on North Combee Road, 6 Remote Pilot Stations, a 4-aircraft fleet, and a 36-month FAA Part 135 certification runway. First revenue operations commence at approximately Month 30.</p></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,marginBottom:56}}>
            {[
              {icon:"📍",t:"Land Acquisition",        sub:"North Combee Road, Lakeland, FL · $5M · T2",     d:"30-acre site pre-selected. Due diligence complete. BPC-2 zoning confirmed. Land acquisition closes in Tranche 2 (Months 3–9) concurrent with civil engineering and OEM LOI execution."},
              {icon:"🏢",t:"30-Acre Campus",          sub:"North Combee Road · Lakeland, FL · BPC-2 Zoning", d:"Administration building, maintenance and airworthiness facility, payload processing center, training wing, and LH2 fuel infrastructure. Pre-selected site — due diligence complete. $33.5M campus construction budget."},
              {icon:"🖥️",t:"6 Remote Pilot Stations",sub:"RPS-01 through RPS-06 · I-4 corridor coverage",   d:"Primary ROC co-located at Lakeland HQ. Six Remote Pilot Stations distributed across the I-4 corridor provide full BVLOS coverage. FAA Part 135 application submitted in T3 (Month 9–18)."},
            ].map((c,i) => (
              <Reveal key={i} delay={i*80}>
                <div style={{background:"var(--panel)",borderTop:"2px solid var(--accent)",padding:28}}>
                  <div style={{fontSize:24,marginBottom:14}}>{c.icon}</div>
                  <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:19,color:"var(--white)",marginBottom:6}}>{c.t}</div>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:9,color:"var(--sky)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:14}}>{c.sub}</div>
                  <p style={{fontSize:14,color:"var(--muted)",lineHeight:1.75}}>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:2,color:"var(--sky)",textTransform:"uppercase",marginBottom:20}}>Phase A Infrastructure Scope</div></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"var(--rim)"}}>
            {[
              {k:"FACILITIES",       v:"30-Acre Campus", d:"Admin building, maintenance facility, payload processing, training wing, LH2 fuel on leased parcel. North Combee Rd · BPC-2 zoning · $33.5M build."},
              {k:"FLEET",            v:"4 Aircraft",     d:"3× Aergility HAULER (primary) + 1× Sabrewing Rhaegal RG-1 (reserve/surge). OEM selection finalized post-fundraise by DO/CP/DOM."},
              {k:"COMMAND & CONTROL",v:"6 ROC Stations", d:"RPS-01 through RPS-06 distributed across the I-4 corridor. Primary ROC at Lakeland HQ. Full BVLOS coverage for Phase A operational radius."},
            ].map((c,i) => (
              <Reveal key={i} delay={i*60}>
                <div style={{background:"var(--panel)",padding:"28px 26px"}}>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,color:"var(--muted)",textTransform:"uppercase",marginBottom:8}}>{c.k}</div>
                  <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:22,color:"var(--accent)",marginBottom:10}}>{c.v}</div>
                  <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.75}}>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={80}><p style={{fontSize:13,color:"var(--dim)",fontFamily:"'Courier New',monospace",lineHeight:1.7,marginTop:20}}>Fleet capacity supports approximately 3,300 annual missions at full utilization. Phase A base case: 1,200 missions in Y3 (launch year), scaling to 2,300 in Y5. ~86% contribution margin.</p></Reveal>
        </div>
      </section>

      {/* ── NETWORK CORRIDORS */}
      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <Reveal><div className="section-label">Network Operations</div></Reveal>
          <Reveal delay={80}><h2 className="section-title">Every Corridor <span className="accent">That Matters</span></h2></Reveal>
          <Reveal delay={120}><p style={{fontSize:16,color:"var(--muted)",lineHeight:1.85,maxWidth:720,marginBottom:48}}>Atlas doesn't just connect two points — it bridges the full medical logistics network. At heavy payload, we can support hospital-to-hospital transfers, depot distribution, airport bridging, and disaster staging workflows.</p></Reveal>
          <div className="route-cards">
            {[
              {cls:"route-orange",n:"01",t:"Hospital → Hospital",          d:"Direct transfers of organs, tissue, and critical devices between transplant centers and trauma facilities where minutes matter.",                            payload:"Typical payload: device-class systems, tissue packs, surgical kits"},
              {cls:"route-blue",  n:"02",t:"Depot / OPO → Network",        d:"Distribution from OPOs, blood banks, and depots to hospitals on scheduled or on-demand routes, enabling SLA-based network coverage.",                   payload:"Typical payload: blood products, biologics, high-value implants"},
              {cls:"route-green", n:"03",t:"Airport Bridge — Last Mile",   d:"Bridge commercial air arrivals to transplant centers faster than ground, reducing delay and protecting time integrity.",                                  payload:"Typical payload: procured organs, time-critical biologics"},
              {cls:"route-amber", n:"04",t:"Forward Deploy — Mass Casualty",d:"Deploy blood and trauma supplies to disaster staging areas and incident command sites when ground access is compromised.",                              payload:"Typical payload: PRBCs, plasma, trauma surgical supply"},
            ].map((c,i) => (
              <Reveal key={i} delay={i*60}>
                <div className={`route-card ${c.cls}`}>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,color:"var(--muted)",textTransform:"uppercase",marginBottom:12}}>{c.n}</div>
                  <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:18,color:"var(--white)",marginBottom:12}}>{c.t}</div>
                  <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.75,marginBottom:14}}>{c.d}</p>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:9,color:"var(--dim)",letterSpacing:.5}}>{c.payload}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STRATEGIC POSITION */}
      <section style={{borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="section-inner">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"start"}}>
            <div>
              <Reveal><div className="section-label">Strategic Position</div></Reveal>
              <Reveal delay={80}><h2 className="section-title">Central Florida <span className="accent">Operations Hub</span></h2></Reveal>
              <Reveal delay={160}>
                <p style={{fontSize:16,color:"var(--muted)",lineHeight:1.85,marginBottom:16}}>Atlas Response's Phase A headquarters is located at North Combee Road, Lakeland, Florida — a 30-acre, BPC-2 zoned site pre-selected along the I-4 corridor. Site due diligence is complete. Land acquisition closes in Tranche 2.</p>
                <p style={{fontSize:16,color:"var(--muted)",lineHeight:1.85,marginBottom:28}}>The campus positions Atlas equidistant from Tampa, Orlando, and Daytona Beach, covering all three metro hospital networks within the 150 NM operational radius.</p>
                <div style={{fontFamily:"'Courier New',monospace",fontSize:10,color:"var(--sky)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:8}}>North Combee Road, Lakeland, FL — Phase A HQ</div>
                <p style={{fontSize:13,color:"var(--dim)",lineHeight:1.7}}>30 acres · BPC-2 zoning confirmed · Pre-selected site with completed due diligence. $5M land acquisition in T2. $33.5M campus construction. Positioned at the geographic center of the I-4 corridor.</p>
              </Reveal>
            </div>
            <Reveal delay={80}>
              <div style={{background:"var(--panel)",border:"1px solid var(--steel)",padding:32}}>
                <div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:2,color:"var(--sky)",textTransform:"uppercase",marginBottom:24}}>I-4 Corridor — Phase A Coverage</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"var(--rim)",marginBottom:24}}>
                  {[
                    {k:"Site Size",     v:"30 Acres"},
                    {k:"Zoning",        v:"BPC-2"},
                    {k:"ROC Stations",  v:"6 (RPS 01–06)"},
                    {k:"Fleet",         v:"4 Aircraft"},
                    {k:"Cert Timeline", v:"36 Months"},
                    {k:"Site Status",   v:"Diligence Complete"},
                  ].map((s,i) => (
                    <div key={i} style={{background:"var(--deep)",padding:"16px 18px"}}>
                      <div style={{fontFamily:"'Courier New',monospace",fontSize:9,color:"var(--dim)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:6}}>{s.k}</div>
                      <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:18,color:"var(--white)"}}>{s.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:"var(--deep)",border:"1px solid var(--steel)",padding:20,textAlign:"center"}}>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,color:"var(--muted)",marginBottom:14,textTransform:"uppercase"}}>I-4 Corridor</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    {[{l:"TAMPA",c:"var(--muted)"},{l:"ATLAS HQ\nLAKELAND",c:"var(--accent)"},{l:"ORLANDO",c:"var(--muted)"}].map((city,i) => (
                      <div key={i} style={{textAlign:"center"}}>
                        <div style={{fontFamily:"'Courier New',monospace",fontSize:8,color:city.c,letterSpacing:1,whiteSpace:"pre-line",lineHeight:1.4}}>{city.l}</div>
                        {i===1 && <div style={{width:8,height:8,background:"var(--accent)",borderRadius:"50%",margin:"6px auto 0"}}/>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── FLEET ───────────────────────────────────────────────────────────────────
function FleetPage({ go }) {
  return (
    <div>
      <section style={{minHeight:"68vh",position:"relative",display:"flex",alignItems:"center",padding:"0 52px",overflow:"hidden",background:"linear-gradient(160deg,var(--deep) 0%,var(--navy) 100%)"}}>
        <div className="hero-grid"/><div className="scanline"/>
        <div style={{position:"relative",zIndex:2,maxWidth:1400,width:"100%",margin:"0 auto",paddingTop:100}}>
          <Reveal><div className="eyebrow-label">Fleet · MARS Framework</div></Reveal>
          <Reveal delay={80}><h1 className="hero-title" style={{fontSize:"clamp(46px,7vw,84px)"}}>Heavy Payload.<br/><span style={{color:"var(--accent)"}}>Mission Ready.</span></h1></Reveal>
          <Reveal delay={160}><p style={{fontSize:"clamp(15px,1.3vw,17px)",lineHeight:1.8,color:"var(--muted)",maxWidth:620}}>The MARS framework — Mission Aircraft Reservation Structure — pairs primary aircraft with dedicated reserve coverage so every contracted mission has guaranteed capacity.</p></Reveal>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="section-inner">
          <Reveal><div className="section-label">MARS Framework</div></Reveal>
          <Reveal delay={80}><h2 className="section-title">Mission Aircraft <span className="accent">Reservation Structure</span></h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,marginTop:40}}>
            {[{n:"01",c:"var(--accent)",t:"Primary Aircraft",d:"Two Aergility HAULER platforms per corridor — permanently reserved for contracted medical missions, never shared with non-medical cargo or opportunistic scheduling."},
              {n:"02",c:"var(--sky)",t:"Reserve Coverage",d:"One dedicated reserve HAULER per corridor, maintained at flight-ready status. If a primary is grounded, the reserve activates within the SLA window — no gaps in contracted service."},
              {n:"03",c:"var(--green)",t:"Heavy Lift Complement",d:"Sabrewing Rhaegal RG-1 for extended-range and high-capacity coverage — organ transport requiring longer corridors or heavier payload configurations beyond the HAULER mission profile."}
            ].map((c,i) => (
              <Reveal key={i} delay={i*80}>
                <div style={{background:"var(--panel)",borderTop:`2px solid ${c.c}`,padding:28}}>
                  <div className="mono-tag">{c.n}</div>
                  <div className="card-title">{c.t}</div>
                  <p className="card-body">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <Reveal><div className="section-label acc">Aircraft Profiles</div></Reveal>
          <Reveal delay={80}><h2 className="section-title">The <span className="accent">Atlas Fleet</span></h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginTop:40}}>
            {[{tag:"Primary Platform · ×2 + ×1 reserve",tagColor:"var(--accent)",name:"Aergility HAULER",sub:"VTOL · Heavy Payload · BVLOS",specs:[{l:"Max Payload",v:"600 lbs",a:true},{l:"Range",v:"100+ NM"},{l:"Cruise Speed",v:"80+ knots"},{l:"Configuration",v:"VTOL"},{l:"Cert Path",v:"Part 135"},{l:"Custody",v:"Universal Pod"}],border:"var(--accent)"},
              {tag:"Heavy Lift Complement · Long Corridor",tagColor:"var(--sky)",name:"Sabrewing Rhaegal RG-1",sub:"Fixed Wing · Extended Range",specs:[{l:"Max Payload",v:"500+ lbs",s:true},{l:"Range",v:"200+ NM"},{l:"Cruise Speed",v:"200+ knots"},{l:"Configuration",v:"Fixed Wing"},{l:"Cert Path",v:"Part 135"},{l:"Deployment",v:"Phase A"}],border:"var(--sky)"}
            ].map((ac,i) => (
              <Reveal key={i} delay={i*80}>
                <div style={{background:"var(--panel)",border:"1px solid var(--steel)",borderTop:`2px solid ${ac.border}`,overflow:"hidden"}}>
                  <div style={{padding:"28px 28px 20px",borderBottom:"1px solid var(--steel)"}}>
                    <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:ac.tagColor,marginBottom:8}}>{ac.tag}</div>
                    <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:28,color:"var(--white)",marginBottom:4}}>{ac.name}</div>
                    <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:"var(--muted)"}}>{ac.sub}</div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"var(--steel)"}}>
                    {ac.specs.map((r,j) => (
                      <div key={j} style={{background:"var(--panel)",padding:"14px 16px"}}>
                        <div className="mono-small" style={{marginBottom:4}}>{r.l}</div>
                        <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:16,color:r.a?"var(--accent)":r.s?"var(--sky)":"var(--white)"}}>{r.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="section-inner">
          <Reveal><div className="section-label">Payload Gap</div></Reveal>
          <Reveal delay={80}><h2 className="section-title">The <span className="accent">60× Gap</span></h2></Reveal>
          <Reveal delay={160}><p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",maxWidth:680,marginBottom:40}}>Every existing uncrewed medical delivery network operates at 4–10 lbs. Atlas operates at 600 lbs. This is not incremental improvement — it is a fundamentally different capability class addressing the payloads that actually matter in medical logistics.</p></Reveal>
          <div style={{display:"flex",flexDirection:"column",gap:1,background:"var(--rim)",border:"1px solid var(--rim)"}}>
            {[{name:"Zipline",lbs:4,pct:0.67},{name:"Matternet",lbs:4.5,pct:0.75},{name:"Wing",lbs:10,pct:1.67},{name:"Percepto",lbs:35,pct:5.83},{name:"Atlas HAULER",lbs:600,pct:100,accent:true}].map((r,i) => <BarRow key={i} {...r}/>)}
          </div>
          <div style={{marginTop:16,fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,color:"var(--dim)"}}>PAYLOAD IN LBS // PHASE A CONFIGURATION</div>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:40,flexWrap:"wrap"}}>
          <div>
            <h2 className="section-title" style={{fontSize:"clamp(24px,2.5vw,36px)",marginBottom:10}}>Fleet Details in the <span className="accent">Investor Brief</span></h2>
            <p style={{fontSize:15,color:"var(--muted)",lineHeight:1.8,maxWidth:560}}>OEM selection criteria, MARS deployment rationale, and Universal Pod custody model are covered in the full Phase A investor brief.</p>
          </div>
          <button className="btn-primary" onClick={() => go("investors")}>View Investor Details</button>
        </div>
      </section>
    </div>
  );
}

function BarRow({ name, lbs, pct, accent }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); obs.unobserve(el); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{background:"var(--panel)",padding:"16px 24px",display:"grid",gridTemplateColumns:"160px 1fr 80px",gap:20,alignItems:"center"}}>
      <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:16,color:accent?"var(--accent)":"var(--white)"}}>{name}</div>
      <div style={{background:"var(--steel)",height:8,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct}%`,background:accent?"var(--accent)":"var(--dim)",transformOrigin:"left",transform:on?"scaleX(1)":"scaleX(0)",transition:"transform 1.4s cubic-bezier(.4,0,.2,1)"}}/>
      </div>
      <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:accent?"var(--accent)":"var(--muted)",textAlign:"right"}}>{lbs} lbs</div>
    </div>
  );
}

// ── INVESTORS ───────────────────────────────────────────────────────────────
function InvestorsPage({ go }) {
  return (
    <div>
      <section style={{minHeight:"72vh",position:"relative",display:"flex",alignItems:"center",padding:"0 52px",overflow:"hidden",background:"linear-gradient(160deg,var(--deep) 0%,var(--navy) 100%)"}}>
        <div className="hero-grid"/><div className="scanline"/>
        <div style={{position:"relative",zIndex:2,maxWidth:1400,width:"100%",margin:"0 auto",paddingTop:100}}>
          <Reveal><div className="eyebrow-label">Series A · $90M</div></Reveal>
          <Reveal delay={80}><h1 className="hero-title" style={{fontSize:"clamp(46px,7vw,84px)"}}>The Infrastructure<br/>Advantage Is<br/><span style={{color:"var(--accent)"}}>Permanent.</span></h1></Reveal>
          <Reveal delay={160}><p style={{fontSize:"clamp(15px,1.3vw,17px)",lineHeight:1.8,color:"var(--muted)",maxWidth:620}}>A $90M Series A funds a 30-acre Lakeland campus, dual hangars, ROC-A, and 36-month FAA Part 135 certification runway. First revenue at approximately Month 30.</p></Reveal>
        </div>
      </section>

      {/* SNAPSHOT */}
      <section style={{borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="section-inner">
          <Reveal><div className="section-label acc">Series A Snapshot</div></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"var(--rim)",border:"1px solid var(--rim)",marginTop:32}}>
            {[{l:"Raise",v:"$90M",a:true},{l:"Structure",v:"SAFE / Equity"},{l:"Cert Window",v:"36 Months"},{l:"First Revenue",v:"~Month 30",s:true},{l:"Phase A Site",v:"30 Acres, Lakeland"},{l:"HQ Zoning",v:"BPC-2 Confirmed"},{l:"Phase B Trigger",v:"7-Gate Board Approval"},{l:"Network Target",v:"National"}].map((c,i) => (
              <div key={i} style={{background:"var(--panel)",padding:"22px 20px"}}>
                <div className="mono-small" style={{marginBottom:6}}>{c.l}</div>
                <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(14px,1.4vw,18px)",lineHeight:1.2,color:c.a?"var(--accent)":c.s?"var(--sky)":"var(--white)"}}>{c.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THESIS */}
      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"start"}}>
          <div>
            <Reveal><div className="section-label">Investment Thesis</div></Reveal>
            <Reveal delay={80}><h2 className="section-title">The Case for <span className="accent">Atlas</span></h2></Reveal>
            <Reveal delay={160}>
              <p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",marginBottom:16}}>Atlas Response is the only company building a <strong style={{color:"var(--white)",fontWeight:400}}>FAA Part 135–certified heavy-payload uncrewed medical logistics network</strong>. The certification moat is a regulatory clock that started counting — and cannot be sped up by any competitor's capital.</p>
              <p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",marginBottom:16}}>The $90M Series A is infrastructure-first: real aviation assets, real campus, real certification pathway. Not a software bet or a concept fleet — an operational foundation that capital cannot replicate on a compressed timeline.</p>
              <div className="callout">Zero certified uncrewed medical logistics networks operate in the United States today. Atlas Response is building the first. The FAA Part 135 certification timeline is 36 months — every day of lead time is permanent competitive distance that capital cannot compress.</div>
            </Reveal>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {[{n:"01",t:"Regulatory Moat",d:"FAA Part 135 certification takes 36 months. No amount of capital accelerates the regulatory clock. Atlas begins this process on Day 1 of the Series A."},
              {n:"02",t:"Payload Class Gap",d:"Zipline: 4 lbs. Matternet: 4.5 lbs. Wing: 10 lbs. Atlas: 600 lbs. No certified competitor operates at the payload threshold required for organs, perfusion systems, or surgical devices."},
              {n:"03",t:"Market Density",d:"The I-4 corridor has 40+ major hospitals, 8 transplant programs, and 6M+ population within 150 NM of the Lakeland campus. No comparable density exists outside the Northeast Corridor."},
              {n:"04",t:"Infrastructure-First Model",d:"Phase A builds the permanent operational base — campus, hangars, ROC-A, training wing — before broad fleet deployment. Physical credibility that concept fleets cannot match."}
            ].map((p,i) => (
              <Reveal key={i} delay={i*60}>
                <div style={{background:"var(--panel)",border:"1px solid var(--steel)",borderLeft:"2px solid var(--accent)",padding:"20px 24px"}}>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--accent)",marginBottom:8}}>{p.n}</div>
                  <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:17,color:"var(--white)",marginBottom:8}}>{p.t}</div>
                  <p style={{fontSize:13,lineHeight:1.7,color:"var(--muted)"}}>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* USE OF FUNDS */}
      <section style={{borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="section-inner">
          <Reveal><div className="section-label">Use of Funds</div></Reveal>
          <Reveal delay={80}><h2 className="section-title">$90M <span className="accent">Capital Allocation</span></h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,marginTop:40}}>
            <div style={{background:"var(--panel)",border:"1px solid var(--steel)",overflow:"hidden"}}>
              <div style={{padding:"18px 22px",borderBottom:"1px solid var(--steel)",fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:18}}>Phase A Capital Deployment</div>
              <table>
                <thead><tr><th>Category</th><th>Amount</th><th>% of Raise</th></tr></thead>
                <tbody>
                  {[["Site Acquisition (30 ac, Lakeland)","$5M","5.6%"],["Administration Building","$8.5M","9.4%"],["Hangar 1 + Training Wing","$13M","14.4%"],["Hangar 2 — Fleet Operations","$9M","10.0%"],["ROC-A (6 pilot stations)","$3M","3.3%"],["Fleet — Initial Aircraft","$18M","20.0%"],["Dual Fuel Pads + Site Infra","$3M","3.3%"],["Runway Capital — 36-Month Cert","$22M","24.4%"],["Working Capital Reserve","$8.5M","9.4%"]].map(([c,a,p],i) => (
                    <tr key={i}><td>{c}</td><td style={{color:"var(--accent)",fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700}}>{a}</td><td style={{color:"var(--muted)"}}>{p}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {[{l:"Site & Infrastructure",pct:33,v:"$29.5M",c:"var(--accent)"},
                {l:"Fleet Acquisition",pct:20,v:"$18M",c:"var(--sky)"},
                {l:"Certification Runway",pct:24,v:"$22M",c:"var(--amber)"},
                {l:"Working Capital",pct:9,v:"$8.5M",c:"var(--green)"},
                {l:"Other Operational",pct:14,v:"$12M",c:"var(--muted)"}
              ].map((r,i) => <AllocBar key={i} {...r}/>)}
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <Reveal><div className="section-label">36-Month Roadmap</div></Reveal>
          <Reveal delay={80}><h2 className="section-title">Certification <span className="accent">Timeline</span></h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:1,background:"var(--rim)",border:"1px solid var(--rim)",marginTop:40}}>
            {[{m:"M0",t:"Series A Close",d:"Tranche 1 release. Executive hiring begins. OEM LOI executed.",c:"var(--accent)"},
              {m:"M3",t:"Site + Ops Hire",d:"Land acquisition closes. Director of Operations, Chief Pilot, Director of Maintenance hired.",c:"var(--accent)"},
              {m:"M9",t:"Construction Start",d:"Hangar 1 + Admin building break ground. ROC-A design finalized.",c:"var(--amber)"},
              {m:"M18",t:"Fleet Delivery",d:"Initial HAULER aircraft delivered. ROC-A operational. Training wing active.",c:"var(--amber)"},
              {m:"M24",t:"Part 135 Filing",d:"FAA Part 135 certification application filed. Revenue contract pipeline active.",c:"var(--sky)"},
              {m:"M30",t:"First Revenue",d:"First certified revenue missions. Hospital partner SLAs active. Phase B gate criteria begin.",c:"var(--green)"}
            ].map((ms,i) => (
              <Reveal key={i} delay={i*60}>
                <div style={{background:"var(--panel)",padding:24}}>
                  <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:28,color:ms.c,marginBottom:6}}>{ms.m}</div>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--muted)",marginBottom:8}}>{ms.t}</div>
                  <p style={{fontSize:12,lineHeight:1.65,color:"var(--muted)"}}>{ms.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="section-inner" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:40,flexWrap:"wrap"}}>
          <div>
            <div className="section-label acc" style={{marginBottom:12}}>Investor Next Step</div>
            <h2 className="section-title" style={{fontSize:"clamp(24px,2.5vw,36px)",marginBottom:10}}>Request the Full <span className="accent">Phase A Brief</span></h2>
            <p style={{fontSize:15,color:"var(--muted)",lineHeight:1.8,maxWidth:560}}>Full financial model, micro hub strategy, Phase B trigger criteria, and the complete moat analysis. Available to accredited investors and qualified institutional partners.</p>
          </div>
          <button className="btn-primary" onClick={() => go("request-briefing")}>Request Investor Briefing</button>
        </div>
      </section>
    </div>
  );
}

function AllocBar({ l, pct, v, c }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); obs.unobserve(el); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <span style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:1,textTransform:"uppercase",color:"var(--muted)"}}>{l}</span>
        <span style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:16,color:c}}>{v}</span>
      </div>
      <div style={{height:6,background:"var(--steel)",overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct}%`,background:c,transformOrigin:"left",transform:on?"scaleX(1)":"scaleX(0)",transition:"transform 1.2s cubic-bezier(.4,0,.2,1)"}}/>
      </div>
    </div>
  );
}

// ── BRIEFING ─────────────────────────────────────────────────────────────────
function BriefingPage({ go }) {
  return (
    <div style={{fontFamily:"'Courier New',Courier,monospace"}}>
      {/* HERO — full viewport, animated grid, scanlines */}
      <section style={{minHeight:"100vh",position:"relative",display:"flex",alignItems:"center",padding:"0 52px",overflow:"hidden",background:"var(--navy)"}}>
        <div className="hero-grid-anim"/>
        <div className="scanline"/>
        <div className="sweep"/>
        <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:999,background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.03) 2px,rgba(0,0,0,.03) 4px)"}}/>
        <div style={{position:"relative",zIndex:2,maxWidth:1400,width:"100%",margin:"0 auto",paddingTop:100}}>
          <Reveal>
            <div style={{fontSize:8,letterSpacing:4,textTransform:"uppercase",color:"var(--sky)",marginBottom:32,display:"flex",alignItems:"center",gap:12}}>
              <span style={{display:"block",width:20,height:1,background:"var(--sky)"}}/>ATLAS RESPONSE // DOC-ID: AR-SA-001 // PHASE A MISSION BRIEFING // 2026
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(52px,8vw,104px)",lineHeight:.9,marginBottom:28}}>
              THE PHASE A<br/><span style={{color:"var(--accent)"}}>MISSION BRIEF</span><br/>IS WAITING.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{fontFamily:"Georgia,serif",fontSize:"clamp(14px,1.2vw,17px)",lineHeight:1.85,color:"var(--muted)",maxWidth:560,marginBottom:48}}>
              A $90M Series A investment funds the operational blueprint for a <strong style={{color:"var(--white)",fontFamily:"'Courier New',monospace",fontWeight:400}}>$200M+ national medical logistics network</strong> — starting with a 36-month FAA Part 135 certification runway that no competitor can fast-follow.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div style={{display:"flex",flexDirection:"column",gap:0,marginBottom:48,maxWidth:480}}>
              {["Series A financial structure + valuation","36-month FAA certification roadmap","30-acre Lakeland campus + ROC-A specs","Capital allocation breakdown (by category)","Florida network + micro hub strategy","The impenetrable moat — in full","Phase A → B → C expansion blueprint"].map((item,i) => (
                <div key={i} style={{display:"flex",alignItems:"center",gap:16,padding:"14px 0",borderBottom:"1px solid rgba(255,255,255,.04)",fontSize:11,letterSpacing:1.5,textTransform:"uppercase",color:"var(--muted)"}}>
                  <span style={{color:"var(--accent)",fontSize:10,letterSpacing:2}}>//</span>{item}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={320}>
            <button className="btn-primary" onClick={() => go("request-briefing")}>Request Mission Briefing</button>
          </Reveal>
        </div>
      </section>

      {/* DATA GRID */}
      <section style={{borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="section-inner">
          <Reveal><div className="section-label" style={{fontFamily:"'Courier New',monospace"}}>Series A Data</div></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"var(--rim)",border:"1px solid var(--rim)",marginTop:32}}>
            {[{l:"Raise Target",v:"$90M",a:true},{l:"Structure",v:"SAFE / Equity"},{l:"Cert Window",v:"36 Months"},{l:"First Revenue",v:"Month 30",s:true},{l:"Campus Size",v:"30 Acres"},{l:"Zoning",v:"BPC-2"},{l:"Payload Class",v:"600 lbs",a:true},{l:"Competitor Payload",v:"4–10 lbs"},{l:"Phase A Radius",v:"150 NM"},{l:"MSA Population",v:"6M+"},{l:"Hospital Networks",v:"40+",s:true},{l:"Transplant Programs",v:"8"}].map((c,i) => (
              <div key={i} style={{background:"var(--panel)",padding:"20px 22px"}}>
                <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--dim)",marginBottom:6}}>{c.l}</div>
                <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(18px,2vw,28px)",lineHeight:1,color:c.a?"var(--accent)":c.s?"var(--sky)":"var(--white)"}}>{c.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALLOCATION BARS */}
      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <Reveal><div className="section-label acc" style={{fontFamily:"'Courier New',monospace"}}>Capital Allocation</div></Reveal>
          <Reveal delay={80}><h2 className="section-title" style={{fontFamily:"'Arial Narrow',Impact,sans-serif"}}>$90M <span className="accent">Deployment</span></h2></Reveal>
          <div style={{display:"flex",flexDirection:"column",gap:20,marginTop:40,maxWidth:800}}>
            {[{l:"Site & Infrastructure",pct:33,v:"$29.5M",c:"var(--accent)"},
              {l:"Fleet Acquisition",pct:20,v:"$18M",c:"var(--sky)"},
              {l:"Certification Runway (36-Month)",pct:24,v:"$22M",c:"var(--amber)"},
              {l:"Working Capital Reserve",pct:9,v:"$8.5M",c:"var(--green)"},
              {l:"Other Operational",pct:14,v:"$12M",c:"var(--muted)"}
            ].map((r,i) => <AllocBar key={i} {...r}/>)}
          </div>
        </div>
      </section>

      {/* THE MOAT */}
      <section style={{borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="section-inner">
          <Reveal><div className="section-label" style={{fontFamily:"'Courier New',monospace"}}>The Moat</div></Reveal>
          <Reveal delay={80}>
            <div style={{background:"var(--panel2)",border:"1px solid var(--rim)",borderTop:"3px solid var(--accent)",padding:"40px 44px",marginTop:32}}>
              <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(28px,3.5vw,48px)",lineHeight:.95,marginBottom:20}}>
                Zero.<br/><span style={{color:"var(--muted)",fontSize:"0.55em",fontWeight:400,letterSpacing:1}}>Certified uncrewed medical logistics networks in the U.S. today.</span>
              </div>
              <p style={{fontFamily:"Georgia,serif",fontSize:17,lineHeight:1.85,color:"var(--muted)",maxWidth:720}}>
                Atlas Response is building the first. The FAA Part 135 certification timeline is 36 months — every day of lead time is <strong style={{color:"var(--white)",fontWeight:400}}>permanent competitive distance</strong> that capital cannot compress. The moat is not a product feature. It is a regulatory clock that started counting on Day 1 of the Series A.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:40,flexWrap:"wrap"}}>
          <div>
            <h2 className="section-title" style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontSize:"clamp(24px,2.5vw,36px)",marginBottom:10}}>Ready for the <span className="accent">Full Brief?</span></h2>
            <p style={{fontFamily:"Georgia,serif",fontSize:15,color:"var(--muted)",lineHeight:1.8,maxWidth:560}}>Submit your request. The full Phase A Mission Briefing will be delivered to your inbox within minutes.</p>
          </div>
          <button className="btn-primary" onClick={() => go("request-briefing")}>Request Mission Briefing</button>
        </div>
      </section>
    </div>
  );
}

// ── WHY FLORIDA ──────────────────────────────────────────────────────────────
function WhyFloridaPage({ go }) {
  return (
    <div>
      <section style={{minHeight:"88vh",display:"flex",alignItems:"flex-end",padding:"0 52px 80px",position:"relative",overflow:"hidden"}}>
        <div className="hero-grid"/>
        <div style={{position:"absolute",right:"5%",top:"15%",width:600,height:600,background:"radial-gradient(ellipse,rgba(232,148,58,.05) 0%,transparent 60%)",pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:1,maxWidth:1160,margin:"0 auto",width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"end",paddingTop:120}}>
          <div>
            <Reveal><div className="eyebrow-label">Phase A Launch State · Proving Ground</div></Reveal>
            <Reveal delay={80}><h1 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(56px,9vw,120px)",lineHeight:.88,marginBottom:28}}>WHY<br/><span style={{color:"var(--accent)",fontStyle:"normal"}}>FLORIDA.</span></h1></Reveal>
            <Reveal delay={160}><p style={{fontSize:"clamp(15px,1.3vw,17px)",lineHeight:1.8,color:"var(--muted)",maxWidth:460}}>No other state combines hospital density, I-4 corridor geography, BPC-2 zoned HQ site, hurricane exposure, and aviation infrastructure that makes Florida the ideal first market for Atlas Response.</p></Reveal>
            <Reveal delay={240}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"var(--rim)",border:"1px solid var(--rim)",marginTop:36}}>
                {[{v:"6M+",l:"Corridor Pop."},{v:"40+",l:"Major Hospitals",a:true},{v:"365",l:"Flyable Days/yr",s:true}].map((c,i) => (
                  <div key={i} style={{background:"var(--panel)",padding:"18px 16px"}}>
                    <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(22px,2.5vw,34px)",color:c.a?"var(--accent)":c.s?"var(--sky)":"var(--white)",marginBottom:4}}>{c.v}</div>
                    <div className="mono-small">{c.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"var(--rim)"}}>
              {[{l:"Tampa",nm:"45 nm",d:"Tampa General · BayCare · St. Joseph's"},{l:"Orlando",nm:"55 nm",d:"AdventHealth · Orlando Health · Nemours"},{l:"Daytona Beach",nm:"65 nm",d:"AdventHealth Daytona · Halifax"},{l:"Gainesville",nm:"90 nm",d:"UF Health Shands"},{l:"Jacksonville",nm:"135 nm",d:"Mayo Clinic · UF Health · Baptist"},{l:"West Palm Beach",nm:"135 nm",d:"JFK Medical · Good Samaritan"}].map((r,i) => (
                <div key={i} style={{background:"var(--panel)",padding:"14px 16px"}}>
                  <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:16,color:"var(--white)",marginBottom:2}}>{r.l}</div>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:10,color:"var(--sky)",marginBottom:4}}>{r.nm}</div>
                  <div style={{fontSize:11,color:"var(--muted)",lineHeight:1.5}}>{r.d}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOSPITAL TABLE */}
      <section style={{borderTop:"1px solid var(--steel)"}}>
        <div className="section-inner">
          <Reveal><div className="section-label">I-4 Corridor</div></Reveal>
          <Reveal delay={80}><h2 className="section-title">Highest-Density Medical <span className="accent">Logistics Market</span></h2></Reveal>
          <Reveal delay={160}>
            <div style={{background:"var(--panel)",border:"1px solid var(--steel)",overflow:"hidden",marginTop:40}}>
              <table>
                <thead><tr><th>Hospital System</th><th>Relevance to Atlas</th><th>Payload Class</th></tr></thead>
                <tbody>
                  {[["AdventHealth","27-hospital network","Organ transplant programs; blood logistics; multi-campus coverage","Organs · Blood"],["Tampa General","Level I Trauma","Solid organ transplant — heart, lung, kidney, liver; major receiving hub","Organs · Devices"],["Orlando Health","Level I Trauma","Blood bank; organ coordination; major receiving hub for I-4 east","Organs · Blood"],["Moffitt Cancer Center","NCI-Designated","Cellular therapy logistics; platelet and blood product time-sensitivity","Cellular · Blood"],["BayCare Health","15 hospitals","Pharmaceutical and blood distribution across Tampa Bay network","Blood · Pharma"],["HCA Florida","Statewide","Largest FL hospital operator; network-level time-critical transport","Multi-class"],["Nemours Children's","Pediatric Specialty","NICU blood product logistics; pediatric organ coordination","Blood · Organs"]].map(([name,tag,rel,payload],i) => (
                    <tr key={i}>
                      <td><div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:15}}>{name}</div><div style={{fontFamily:"'Courier New',monospace",fontSize:9,color:"var(--sky)",marginTop:3}}>{tag}</div></td>
                      <td style={{color:"var(--muted)"}}>{rel}</td>
                      <td style={{fontFamily:"'Courier New',monospace",fontSize:11,color:"var(--accent)"}}>{payload}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY NOW */}
      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <Reveal><div className="section-label acc">Market Timing</div></Reveal>
          <Reveal delay={80}><h2 className="section-title">Why Florida.<br/><span className="accent">Why Now.</span></h2></Reveal>
          <Reveal delay={160}>
            <div style={{background:"var(--panel2)",border:"1px solid var(--rim)",borderLeft:"3px solid var(--accent)",padding:"36px 40px",marginBottom:40}}>
              <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(44px,6vw,80px)",color:"var(--accent)",lineHeight:1,marginBottom:8}}>Zero.</div>
              <p style={{fontSize:"clamp(15px,1.4vw,17px)",lineHeight:1.7,color:"var(--muted)",maxWidth:580}}>Certified uncrewed medical logistics networks operating in the United States. <strong style={{color:"var(--white)",fontWeight:400}}>Atlas Response is building the first.</strong></p>
            </div>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"var(--rim)",border:"1px solid var(--rim)"}}>
            {[{icon:"⚖️",t:"Regulatory Window Is Open",d:"The FAA Part 135 pathway for uncrewed carriers is defined. Florida's regulatory climate — including a designated FAA UAS test site — is more favorable than any comparable state market."},
              {icon:"🏥",t:"No Mature Competitor at Heavy Payload",d:"Zipline (4 lbs), Matternet (4.5 lbs), Wing (10 lbs) — all constrained below the threshold for perfused organs and surgical devices. Atlas targets 600 lbs. No certified competitor operates in this class."},
              {icon:"🌤️",t:"Year-Round BVLOS Operability",d:"Florida averages 233+ sunny days per year. The I-4 corridor has no seasonal grounding risk that constrains northern markets. 365 flyable days per year is a structural operational advantage."},
              {icon:"📍",t:"Geometric Efficiency",d:"Lakeland is equidistant from Tampa, Orlando, and Daytona Beach — the three anchor hospital markets. No other HQ location achieves this radius efficiency within a single operational corridor."}
            ].map((p,i) => (
              <Reveal key={i} delay={i*60}>
                <div style={{background:"var(--panel)",padding:28}}>
                  <div style={{fontSize:22,marginBottom:12}}>{p.icon}</div>
                  <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:19,color:"var(--white)",marginBottom:8}}>{p.t}</div>
                  <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.7}}>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PHASE B HUB SEQUENCE */}
      <section style={{borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="section-inner">
          <Reveal><div className="section-label">Phase B Expansion</div></Reveal>
          <Reveal delay={80}><h2 className="section-title">Florida Hub <span className="sky">Activation Sequence</span></h2></Reveal>
          <Reveal delay={160}><p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",maxWidth:640,marginBottom:40}}>Phase B hubs activate sequentially — not simultaneously — following Phase A gate criteria. Each hub must achieve 6 months of stable revenue operations before the next hub may break ground.</p></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"var(--rim)",border:"1px solid var(--rim)"}}>
            {[{phase:"Phase A · Active",color:"var(--accent)",city:"Lakeland",pop:"HQ · 500K MSA",hospitals:["AdventHealth Lakeland","Lakeland Regional Medical","BayCare Lakeland","Watson Clinic"],capital:"$90M Series A",active:true},
              {phase:"Phase B-1 · Next",color:"var(--sky)",city:"Orlando",pop:"3.3M MSA",hospitals:["AdventHealth Orlando","Orlando Health","Nemours Children's","UF Health Orlando"],capital:"~$28M est.",trigger:"Phase A ≥70% Y4 mission vol + all 7 gates"},
              {phase:"Phase B-2",color:"var(--muted)",city:"Jacksonville",pop:"1.6M MSA",hospitals:["Mayo Clinic Florida","Baptist Health","UF Health Jacksonville","Ascension St. Vincent's"],capital:"~$22M est.",trigger:"B-1 ≥6 months stable revenue"},
              {phase:"Phase B-3",color:"var(--muted)",city:"Miami",pop:"6.2M MSA",hospitals:["Jackson Memorial","Cleveland Clinic Florida","Baptist Health South FL","Memorial Healthcare"],capital:"~$34M est.",trigger:"B-2 ≥6 months stable revenue"}
            ].map((h,i) => (
              <Reveal key={i} delay={i*60}>
                <div style={{background:h.active?"var(--panel2)":"var(--panel)",borderTop:`2px solid ${h.color}`,padding:24,height:"100%"}}>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:h.color,marginBottom:8}}>{h.phase}</div>
                  <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:26,color:"var(--white)",marginBottom:4}}>{h.city}</div>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:10,color:"var(--muted)",marginBottom:14}}>{h.pop}</div>
                  <div style={{display:"flex",flexDirection:"column",gap:0}}>
                    {h.hospitals.map((hosp,j) => (
                      <div key={j} style={{fontFamily:"'Courier New',monospace",fontSize:10,color:"var(--muted)",padding:"5px 0",borderBottom:"1px solid var(--steel)"}}>{hosp}</div>
                    ))}
                  </div>
                  <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:16,color:h.color,marginTop:14}}>{h.capital}</div>
                  {h.trigger && <div style={{fontFamily:"'Courier New',monospace",fontSize:9,color:"var(--dim)",letterSpacing:.5,lineHeight:1.6,borderTop:"1px solid var(--steel)",paddingTop:12,marginTop:8}}>{h.trigger}</div>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS */}
      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"start"}}>
          <div>
            <Reveal><div className="section-label acc">Phase A Campus</div></Reveal>
            <Reveal delay={80}><h2 className="section-title">North Combee Road,<br/><span className="accent">Lakeland, FL</span></h2></Reveal>
            <Reveal delay={160}>
              <p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",marginBottom:16}}>The 30-acre site on North Combee Road positions Atlas Response at the geographic centroid of the I-4 corridor — maximizing reach to Tampa, Orlando, and Daytona Beach hospital networks within the 150 NM operational radius.</p>
              <p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)"}}>BPC-2 zoning supports aviation-adjacent facilities without conditional use variances — eliminating a 6–12 month permitting risk from the build schedule. Due diligence complete. Environmental preliminary review complete.</p>
            </Reveal>
          </div>
          <Reveal delay={80}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"var(--rim)"}}>
              {[{l:"Address",v:"North Combee Road"},{l:"Site Size",v:"30 Acres"},{l:"Zoning",v:"BPC-2",a:true},{l:"Land Cost",v:"$5M (Tranche 2)"},{l:"Construction",v:"$33.5M (T3)"},{l:"Airspace",v:"LAANC-eligible"},{l:"Due Diligence",v:"Complete",g:true},{l:"Environmental",v:"Prelim. Complete",g:true},{l:"Site Status",v:"Pre-Selected",g:true},{l:"Proximity Tampa",v:"45 NM"},{l:"Proximity Orlando",v:"55 NM"},{l:"Proximity Jax",v:"135 NM"}].map((r,i) => (
                <div key={i} style={{background:"var(--panel)",padding:"14px 16px"}}>
                  <div className="mono-small" style={{marginBottom:4}}>{r.l}</div>
                  <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:15,color:r.a?"var(--accent)":r.g?"var(--green)":"var(--white)"}}>{r.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="section-inner" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:40,flexWrap:"wrap"}}>
          <p style={{fontFamily:"Georgia,serif",fontStyle:"italic",fontSize:"clamp(16px,1.8vw,20px)",color:"var(--white)",fontWeight:300,lineHeight:1.55,maxWidth:560}}>"Florida is the proving ground. The density, the weather, the regulatory complexity — every challenge is deliberate. Because if Atlas works here, it works anywhere."</p>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <button className="btn-primary" onClick={() => go("request-briefing")}>Request Mission Briefing</button>
            <button className="btn-ghost" onClick={() => go("investors")}>View Series A Details →</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── PARTNERS ─────────────────────────────────────────────────────────────────
function PartnersPage({ go }) {
  return (
    <div>
      <section style={{padding:"150px 52px 88px",background:"linear-gradient(160deg,var(--deep) 0%,var(--navy) 100%)",position:"relative",overflow:"hidden"}}>
        <div className="hero-grid"/>
        <div style={{position:"relative",zIndex:1,maxWidth:1400,margin:"0 auto"}}>
          <Reveal><div className="eyebrow-label">Partner Overview</div></Reveal>
          <Reveal delay={80}><h1 className="hero-title" style={{fontSize:"clamp(48px,7vw,84px)"}}>Built on <span style={{color:"var(--accent)"}}>Partnership</span> —<br/>OEM, Hospitals &amp; Networks</h1></Reveal>
          <Reveal delay={160}><p style={{fontSize:"clamp(15px,1.3vw,17px)",lineHeight:1.8,color:"var(--muted)",maxWidth:660}}>Atlas Response is designed to become the heavy-payload logistics layer between hospitals, depots, airport arrivals, and emergency staging environments. We focus on operational discipline, repeatability, and chain-of-custody integrity.</p></Reveal>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="section-inner" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"start"}}>
          <div>
            <Reveal><div className="section-label acc">Why Atlas</div></Reveal>
            <Reveal delay={80}><h2 className="section-title">A Partner Model Built Around <span className="accent">Reliability</span></h2></Reveal>
            <Reveal delay={160}>
              <p style={{fontSize:15,lineHeight:1.85,color:"var(--muted)",marginBottom:16}}>Atlas is not pursuing a consumer delivery model. Our operating structure is aligned to the needs of transplant centers, blood and biologics networks, emergency response organizations, and institutional procurement partners that need predictable performance and formal accountability.</p>
              <p style={{fontSize:15,lineHeight:1.85,color:"var(--muted)",marginBottom:16}}>We aim to support mission categories that current lightweight delivery networks cannot handle: active perfusion systems, blood suites, biologics, trauma supply, and high-value medical devices.</p>
              <div className="callout" style={{fontSize:15}}>Pods remain sealed from origin to destination. Atlas personnel never access the contents — protecting patient privacy, HIPAA alignment, and medical liability boundaries by design.</div>
            </Reveal>
          </div>
          <Reveal delay={80}>
            <div style={{background:"var(--panel)",border:"1px solid var(--steel)",padding:28}}>
              <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--muted)",marginBottom:16}}>Partner Priorities</div>
              {[{t:"Chain-of-custody integrity",d:"Documented custody transfer from origin to destination with full audit trail."},
                {t:"Operational transparency",d:"Mission status, telemetry visibility, and post-mission reporting available to partners."},
                {t:"Heavy-payload readiness",d:"Support for device-class and regulated medical payloads beyond lightweight network range."},
                {t:"Formal SLA framework",d:"Designed for contracted service level agreements, not one-off transport requests."}
              ].map((item,i) => (
                <div key={i} style={{padding:"16px 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                  <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:17,color:"var(--white)",marginBottom:4}}>{item.t}</div>
                  <p style={{fontSize:13,lineHeight:1.7,color:"var(--muted)"}}>{item.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <Reveal><div className="section-label">Who We Serve</div></Reveal>
          <Reveal delay={80}><h2 className="section-title">Priority <span className="accent">Partner Categories</span></h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20,marginTop:40}}>
            {[{n:"00 — OEM Aircraft Partner",c:"var(--amber)",t:"Platform & Airworthiness",d:"Atlas's foundational partnership. The OEM delivers a certified, flight-ready platform to Atlas specifications and bears the airworthiness burden. Selection post-hire, aligned to the Part 135 certification pathway."},
              {n:"01 — Transplant & OPO",c:"var(--accent)",t:"Organ & Perfusion Transport",d:"Time-critical organ, perfusion-system, and procurement support between donor sites, airport bridges, and recipient centers. Tampa General, Orlando Health, AdventHealth, LifeLink Foundation."},
              {n:"02 — Blood & Biologics",c:"var(--sky)",t:"Blood Banks & Hospital Networks",d:"Scheduled and urgent transport of blood products, biologics, and emergency supply. OneBlood, regional blood centers, and multi-facility health systems across Florida."},
              {n:"03 — Government & Response",c:"var(--green)",t:"Agencies & Emergency Operations",d:"Forward deployment of medical cargo where road access is degraded or crewed transport is inefficient or high-risk. State agencies, FEMA, and incident command environments."}
            ].map((p,i) => (
              <Reveal key={i} delay={i*60}>
                <div style={{background:"var(--panel)",borderTop:`2px solid ${p.c}`,padding:28}}>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:p.c,marginBottom:8}}>{p.n}</div>
                  <div className="card-title">{p.t}</div>
                  <p className="card-body">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="section-inner">
          <Reveal><div className="section-label">Mission Types</div></Reveal>
          <Reveal delay={80}><h2 className="section-title">How Atlas Supports <span className="accent">Partner Workflows</span></h2></Reveal>
          <Reveal delay={160}>
            <div style={{background:"var(--panel)",border:"1px solid var(--steel)",overflow:"hidden",marginTop:40}}>
              <table>
                <thead><tr><th>Partner Type</th><th>Typical Mission</th><th>Value to Partner</th></tr></thead>
                <tbody>
                  {[["Hospital system","Inter-facility device or organ transfer","Reduced delay, documented chain-of-custody"],["OPO / transplant center","Airport bridge or direct hospital corridor","Improved logistics control and time integrity"],["Blood bank / depot","Depot-to-hospital scheduled distribution","SLA-ready, repeatable mission execution"],["Pharmaceutical / biologics","Temperature-sensitive supply transport","Condition logging, sealed custody, compliance trail"],["Government / emergency ops","Forward medical deployment to staging","Rapid access into constrained environments"],["OEM manufacturer","Platform delivery + airworthiness certification","Flight-ready aircraft aligned to Part 135 pathway"]].map(([pt,tm,v],i) => (
                    <tr key={i}><td>{pt}</td><td style={{color:"var(--muted)"}}>{tm}</td><td style={{color:"var(--muted)"}}>{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:40,flexWrap:"wrap"}}>
          <div>
            <div className="section-label acc" style={{marginBottom:12}}>Next Step</div>
            <h2 className="section-title" style={{fontSize:"clamp(24px,2.5vw,36px)",marginBottom:10}}>Request a Partner <span className="accent">Briefing</span></h2>
            <p style={{fontSize:15,lineHeight:1.8,color:"var(--muted)",maxWidth:560}}>We're building Phase A infrastructure in Lakeland, Florida and engaging early institutional partners who want to help shape corridor deployment and service-level requirements.</p>
          </div>
          <button className="btn-primary" onClick={() => go("request-briefing")}>Request Mission Briefing</button>
        </div>
      </section>
    </div>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
function ContactPage({ go }) {
  const [partnerSent, setPartnerSent] = useState(false);
  const [careerSent, setCareerSent] = useState(false);
  const [pressSent, setPressSent] = useState(false);

  return (
    <div>
      <section style={{minHeight:"72vh",position:"relative",display:"flex",alignItems:"center",padding:"0 52px",overflow:"hidden"}}>
        <div className="hero-grid"/><div className="scanline"/>
        <div style={{position:"relative",zIndex:2,maxWidth:1400,width:"100%",margin:"0 auto",paddingTop:100,display:"grid",gridTemplateColumns:"1.1fr .9fr",gap:80,alignItems:"center"}}>
          <Reveal>
            <div className="eyebrow-label">Contact Atlas Response</div>
            <h1 className="hero-title" style={{fontSize:"clamp(40px,5.5vw,68px)"}}>Partnerships,<br/>Careers &amp;<br/><span style={{color:"var(--accent)"}}>Press Inquiries.</span></h1>
            <p style={{fontSize:16,lineHeight:1.8,color:"var(--muted)",maxWidth:520,marginTop:16}}>Atlas Response works with hospitals, transplant programs, health systems, public agencies, aircraft partners, and infrastructure providers building a faster, safer, and more reliable network for time-critical medical transport.</p>
          </Reveal>
          <div style={{display:"flex",flexDirection:"column",gap:0,border:"1px solid var(--steel)"}}>
            {[{id:"#partnerships",label:"Partnerships",t:"Hospital & Institutional Partners",d:"Hospitals, OEMs, infrastructure, logistics, and public-sector coordination."},
              {id:"#careers",label:"Careers",t:"Join the Mission",d:"Mission-driven operators, builders, regulatory specialists, and systems talent."},
              {id:"#press",label:"Press & Media",t:"Media Kit & Press Inquiries",d:"Interviews, speaking requests, background information, and brand resources."}
            ].map((c,i) => (
              <a key={i} href={c.id} style={{background:"var(--panel)",padding:"22px 24px",borderBottom:"1px solid var(--steel)",transition:"background .2s",display:"block"}} onMouseEnter={e=>e.currentTarget.style.background="var(--panel2)"} onMouseLeave={e=>e.currentTarget.style.background="var(--panel)"}>
                <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--accent)",marginBottom:6}}>{c.label}</div>
                <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:16,color:"var(--white)",marginBottom:4}}>{c.t}</div>
                <div style={{fontSize:13,color:"var(--muted)"}}>{c.d}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIPS */}
      <section id="partnerships" style={{borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="section-inner" style={{display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:52,alignItems:"start"}}>
          <div>
            <Reveal><div className="section-label acc">Partnerships</div></Reveal>
            <Reveal delay={80}><h2 className="section-title">Partnership<br/><span className="accent">Intake Form</span></h2></Reveal>
            <Reveal delay={160}><p style={{fontSize:15,lineHeight:1.8,color:"var(--muted)",marginBottom:24}}>We welcome inquiries from hospitals, health systems, transplant programs, public agencies, aircraft partners, and infrastructure providers aligned with the Atlas Response mission.</p></Reveal>
            <Reveal delay={200}>
              <div style={{position:"relative",background:"var(--panel)",border:"1px solid var(--steel)",padding:"36px 32px"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,var(--accent),var(--amber))"}}/>
                {partnerSent ? (
                  <div style={{textAlign:"center",padding:"40px 0"}}>
                    <div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:3,color:"var(--sky)",marginBottom:18}}>INQUIRY RECEIVED</div>
                    <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:28,color:"var(--white)",marginBottom:12}}>Partnership Request Submitted</div>
                    <p style={{color:"var(--muted)",fontSize:14,lineHeight:1.8}}>We'll be in touch within two business days.<br/><span style={{color:"var(--accent)"}}>Atlas Response</span> — Where Response Is Mission.</p>
                  </div>
                ) : (
                  <form onSubmit={e => { e.preventDefault(); setPartnerSent(true); }}>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                      {[{l:"Full Name",t:"text",p:"Your name"},{l:"Organization",t:"text",p:"Organization name"},{l:"Title",t:"text",p:"Your title"},{l:"Work Email",t:"email",p:"name@organization.com"}].map((f,i) => (
                        <div key={i} className="form-field"><label>{f.l}</label><input type={f.t} placeholder={f.p} required/></div>
                      ))}
                      <div className="form-field">
                        <label>Organization Type</label>
                        <select required defaultValue="">
                          <option value="" disabled>Select type</option>
                          {["Hospital / Health System","Transplant Program","Government / Public Agency","Aircraft OEM","Infrastructure / Energy","Medical Logistics / Cold Chain","Technology / Integration","Other"].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div className="form-field">
                        <label>Area of Interest</label>
                        <select required defaultValue="">
                          <option value="" disabled>Select interest</option>
                          {["Clinical logistics","Organ transport","Blood transport","Emergency response","Infrastructure partnership","Aircraft integration","Strategic partnership","Other"].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div className="form-field" style={{gridColumn:"1/-1"}}><label>What challenge are you trying to solve?</label><textarea placeholder="Describe the operational, clinical, or logistics problem you are evaluating." required/></div>
                      <div style={{gridColumn:"1/-1",display:"flex",gap:14,alignItems:"center",paddingTop:8}}>
                        <button type="submit" style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:13,letterSpacing:2.5,textTransform:"uppercase",color:"var(--navy)",background:"var(--accent)",border:"none",padding:"13px 28px",clipPath:"polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",cursor:"pointer",transition:"background .2s"}} onMouseEnter={e=>e.target.style.background="var(--amber)"} onMouseLeave={e=>e.target.style.background="var(--accent)"}>Submit Inquiry →</button>
                        <span style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:1,color:"var(--dim)"}}>We respond within two business days.</span>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:24}}>
            {[{label:"Who We Work With",items:["Hospitals and health systems","Transplant centers and related stakeholders","Medical logistics and cold-chain providers","Aircraft OEMs and autonomy partners","Infrastructure, energy, and vertiport partners","Emergency management and public-sector agencies"]},
              {label:"Response Posture",title:"Institutional & Mission-Aligned",desc:"We communicate with operational discipline and a long-term view. Every partnership conversation is treated as a strategic engagement — not a sales call."},
              {label:"Priority Use Cases",title:"Time-Critical Medical Logistics",desc:"Integration planning, strategic ecosystem partnerships, and healthcare system coordination across the I-4 corridor and beyond."}
            ].map((box,i) => (
              <div key={i} style={{background:"var(--panel)",border:"1px solid var(--steel)",padding:28}}>
                <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--muted)",marginBottom:16}}>{box.label}</div>
                {box.items ? box.items.map((item,j) => (
                  <div key={j} style={{fontSize:13,color:"var(--muted)",padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,.05)",display:"flex",alignItems:"center",gap:10}}>
                    <span style={{width:4,height:4,background:"var(--accent)",borderRadius:"50%",flexShrink:0,display:"inline-block"}}/>
                    {item}
                  </div>
                )) : (<><div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:17,color:"var(--white)",marginBottom:8}}>{box.title}</div><p style={{fontSize:13,lineHeight:1.7,color:"var(--muted)"}}>{box.desc}</p></>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section id="careers" style={{background:"var(--deep)",borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="section-inner" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:52,alignItems:"start"}}>
          <div>
            <Reveal><div className="section-label">Careers</div></Reveal>
            <Reveal delay={80}><h2 className="section-title">Join the<br/><span className="sky">Mission</span></h2></Reveal>
            <Reveal delay={160}>
              <p style={{fontSize:15,lineHeight:1.85,color:"var(--muted)",marginBottom:16}}>Atlas Response is building an institutional-grade medical aviation and logistics platform. We are interested in <strong style={{color:"var(--white)",fontWeight:400}}>disciplined, mission-driven professionals</strong> across operations, aviation, safety, logistics, engineering, and regulatory affairs.</p>
              <p style={{fontSize:15,lineHeight:1.85,color:"var(--muted)",marginBottom:24}}>We are not yet hiring at scale — but we are building a talent network of people who believe in what we are building.</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"var(--rim)",border:"1px solid var(--rim)"}}>
                {["Flight Operations","Remote Aircraft Ops","Safety / Compliance","Maintenance / Tech Ops","Healthcare Logistics","Regulatory / Certification","Software / Systems","Mission Coordination","Corporate / Support"].map((area,i) => (
                  <div key={i} style={{background:"var(--panel)",padding:"12px 16px",fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:1,color:"var(--muted)",textTransform:"uppercase",transition:"background .2s,color .2s"}} onMouseEnter={e=>{e.currentTarget.style.background="var(--panel2)";e.currentTarget.style.color="var(--white)"}} onMouseLeave={e=>{e.currentTarget.style.background="var(--panel)";e.currentTarget.style.color="var(--muted)"}}>{area}</div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={80}>
            <div style={{position:"relative",background:"var(--panel)",border:"1px solid var(--steel)",padding:"36px 32px"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,var(--accent),var(--amber))"}}/>
              {careerSent ? (
                <div style={{textAlign:"center",padding:"40px 0"}}>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:3,color:"var(--sky)",marginBottom:18}}>SUBMISSION RECEIVED</div>
                  <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:26,color:"var(--white)",marginBottom:12}}>Added to Talent Network</div>
                  <p style={{color:"var(--muted)",fontSize:14,lineHeight:1.8}}>We'll reach out when there is a relevant opportunity.</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setCareerSent(true); }}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                    {[{l:"Name",t:"text",p:"Your name"},{l:"Email",t:"email",p:"name@email.com"},{l:"Location",t:"text",p:"City, State"},{l:"LinkedIn / Resume URL",t:"url",p:"Profile link"}].map((f,i) => (
                      <div key={i} className="form-field"><label>{f.l}</label><input type={f.t} placeholder={f.p}/></div>
                    ))}
                    <div className="form-field" style={{gridColumn:"1/-1"}}>
                      <label>Area of Interest</label>
                      <select required defaultValue=""><option value="" disabled>Select area</option>{["Flight operations","Remote aircraft operations","Safety / compliance","Maintenance / technical operations","Healthcare logistics","Regulatory / certification","Software / systems integration","Mission coordination","Corporate / support functions"].map(o => <option key={o}>{o}</option>)}</select>
                    </div>
                    <div className="form-field" style={{gridColumn:"1/-1"}}><label>Why Atlas Response?</label><textarea placeholder="Tell us why our mission and operating model resonate with you." required/></div>
                    <div style={{gridColumn:"1/-1"}}>
                      <button type="submit" style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:13,letterSpacing:2.5,textTransform:"uppercase",color:"var(--navy)",background:"var(--accent)",border:"none",padding:"13px 28px",clipPath:"polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",cursor:"pointer"}}>Join Talent Network →</button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRESS */}
      <section id="press" style={{borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="section-inner" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:52,alignItems:"start"}}>
          <div>
            <Reveal><div className="section-label">Press & Media</div></Reveal>
            <Reveal delay={80}><h2 className="section-title">Press &amp;<br/><span className="accent">Media Kit</span></h2></Reveal>
            <Reveal delay={160}><p style={{fontSize:15,lineHeight:1.85,color:"var(--muted)",marginBottom:24}}>For interviews, speaking requests, background information, or media coordination, submit a press inquiry. We aim to respond within one business day for time-sensitive requests.</p></Reveal>
            <Reveal delay={200}>
              <div style={{position:"relative",background:"var(--panel)",border:"1px solid var(--steel)",padding:"36px 32px"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,var(--accent),var(--amber))"}}/>
                {pressSent ? (
                  <div style={{textAlign:"center",padding:"40px 0"}}>
                    <div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:3,color:"var(--sky)",marginBottom:18}}>REQUEST RECEIVED</div>
                    <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:26,color:"var(--white)",marginBottom:12}}>Press Inquiry Submitted</div>
                    <p style={{color:"var(--muted)",fontSize:14,lineHeight:1.8}}>We'll respond within one business day for time-sensitive requests.</p>
                  </div>
                ) : (
                  <form onSubmit={e => { e.preventDefault(); setPressSent(true); }}>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                      {[{l:"Name",t:"text",p:"Reporter or contact name"},{l:"Outlet / Organization",t:"text",p:"Publication or organization"},{l:"Email",t:"email",p:"name@outlet.com"},{l:"Deadline (if applicable)",t:"text",p:"Date / time"}].map((f,i) => (
                        <div key={i} className="form-field"><label>{f.l}</label><input type={f.t} placeholder={f.p} required={i<3}/></div>
                      ))}
                      <div className="form-field" style={{gridColumn:"1/-1"}}><label>Topic / Request</label><input type="text" placeholder="Interview, background, speaking request, etc." required/></div>
                      <div className="form-field" style={{gridColumn:"1/-1"}}><label>Message</label><textarea placeholder="Share your request, publication timeline, and specific materials needed." required/></div>
                      <div style={{gridColumn:"1/-1"}}>
                        <button type="submit" style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:13,letterSpacing:2.5,textTransform:"uppercase",color:"var(--navy)",background:"var(--accent)",border:"none",padding:"13px 28px",clipPath:"polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",cursor:"pointer"}}>Contact Press Team →</button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:24}}>
            <Reveal delay={80}>
              <div style={{background:"var(--panel)",border:"1px solid var(--steel)",padding:28}}>
                <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--muted)",marginBottom:16}}>Media Kit Includes</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"var(--rim)",border:"1px solid var(--rim)"}}>
                  {["Company boilerplate","Mission & vision summary","Founder / leadership bios","Approved logo files","Brand usage guidance","Select concept visuals"].map((item,i) => (
                    <div key={i} style={{background:"var(--panel)",padding:"12px 14px",fontSize:13,color:"var(--muted)",transition:"background .2s,color .2s"}} onMouseEnter={e=>{e.currentTarget.style.background="var(--panel2)";e.currentTarget.style.color="var(--white)"}} onMouseLeave={e=>{e.currentTarget.style.background="var(--panel)";e.currentTarget.style.color="var(--muted)"}}>{item}</div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div style={{background:"var(--panel)",border:"1px solid var(--steel)",padding:28}}>
                <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--muted)",marginBottom:12}}>Coverage Areas</div>
                <p style={{fontSize:14,lineHeight:1.75,color:"var(--muted)"}}>Atlas Response is relevant to coverage of <strong style={{color:"var(--white)",fontWeight:400}}>advanced air mobility, medical logistics, drone regulation, FAA Part 135 certification, hospital operations, organ procurement, and Florida's aerospace economy.</strong></p>
                <div style={{marginTop:16,borderTop:"1px solid var(--steel)",paddingTop:16}}>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--dim)",marginBottom:8}}>Events & Speaking</div>
                  <p style={{fontSize:13,lineHeight:1.65,color:"var(--muted)"}}>Christopher Green, Founder & CEO, is available for select speaking engagements, panels, and media appearances aligned with Atlas Response's mission and launch timeline.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── REQUEST BRIEFING ──────────────────────────────────────────────────────────
function RequestBriefingPage({ go }) {
  const [form, setForm] = useState({firstName:"", lastName:"", email:"", company:"", role:"", investmentFocus:""});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const HUBSPOT_PORTAL_ID = "27341170";
  const HUBSPOT_FORM_ID = "68ba60bf-e90d-4e2a-9fb2-35f2d84d4ecc";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [
              { name: "firstname", value: form.firstName },
              { name: "lastname", value: form.lastName },
              { name: "email", value: form.email },
              { name: "company", value: form.company },
              { name: "jobtitle", value: form.role },
              { name: "investment_focus", value: form.investmentFocus },
            ],
            context: {
              pageUri: window.location.href,
              pageName: "Atlas Response — Request Briefing",
            },
          }),
        }
      );
      if (!res.ok) throw new Error("Submission failed");
      setSent(true);
      setTimeout(() => go && go("access-granted"), 1500);
    } catch (err) {
      setError("Something went wrong. Please try again or email invest@atlasresponse.com");
      setSubmitting(false);
    }
  };
  return (
    <div style={{minHeight:"100vh",display:"grid",gridTemplateColumns:"1fr 1fr",position:"relative",paddingTop:72}}>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,backgroundImage:"linear-gradient(rgba(78,174,232,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(78,174,232,.03) 1px,transparent 1px)",backgroundSize:"50px 50px"}}/>

      {/* LEFT */}
      <div style={{padding:"80px 56px",borderRight:"1px solid var(--rim)",display:"flex",flexDirection:"column",justifyContent:"center",position:"relative",zIndex:1}}>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:8,letterSpacing:4,textTransform:"uppercase",color:"var(--dim)",marginBottom:40}}>DOC-ID: AR-SA-001 // PHASE A MISSION BRIEFING // 2026</div>
        <h1 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(34px,4vw,54px)",lineHeight:.95,marginBottom:28}}>The Phase A<br/><span style={{color:"var(--accent)"}}>Mission Brief</span><br/>Is Waiting.</h1>
        <p style={{fontFamily:"Georgia,serif",fontSize:14,lineHeight:1.85,color:"var(--muted)",marginBottom:40,maxWidth:440}}>A $90M Series A investment funds the operational blueprint for a <strong style={{color:"var(--white)",fontFamily:"'Courier New',monospace",fontWeight:400}}>$200M+ national medical logistics network</strong> — starting with a 36-month FAA Part 135 certification runway that no competitor can fast-follow.</p>
        <div style={{display:"flex",flexDirection:"column",gap:0,marginBottom:48}}>
          {["Series A financial structure + valuation","36-month FAA certification roadmap","30-acre Lakeland campus + ROC-A specs","Capital allocation breakdown (by category)","Florida network + micro hub strategy","The impenetrable moat — in full","Phase A → B → C expansion blueprint"].map((item,i) => (
            <div key={i} style={{display:"flex",alignItems:"center",gap:16,padding:"13px 0",borderBottom:"1px solid rgba(255,255,255,.04)",fontFamily:"'Courier New',monospace",fontSize:11,letterSpacing:1.5,textTransform:"uppercase",color:"var(--muted)"}}>
              <span style={{color:"var(--accent)",fontSize:10,letterSpacing:2,flexShrink:0}}>//</span>{item}
            </div>
          ))}
        </div>
        <div style={{display:"inline-flex",alignItems:"center",gap:10,border:"1px solid rgba(232,148,58,.2)",padding:"10px 16px",fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:3,textTransform:"uppercase",color:"var(--dim)",width:"fit-content"}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:"var(--accent)",animation:"pulse 2s infinite",display:"inline-block"}}/>
          Briefing delivered to your inbox within minutes
        </div>
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
      </div>

      {/* RIGHT */}
      <div style={{padding:"80px 56px",display:"flex",flexDirection:"column",justifyContent:"center",background:"rgba(11,25,41,.4)",position:"relative",zIndex:1}}>
        {sent ? (
          <div style={{textAlign:"center",padding:"60px 20px"}}>
            <div style={{fontSize:48,marginBottom:24}}>✓</div>
            <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:32,color:"var(--green)",marginBottom:16}}>Request Received</div>
            <p style={{fontFamily:"Georgia,serif",fontSize:14,lineHeight:1.8,color:"var(--muted)",maxWidth:380,margin:"0 auto 28px"}}>Your Phase A Mission Briefing is being prepared and will be dispatched to your inbox within minutes. An Atlas Response team member may follow up directly.</p>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:3,textTransform:"uppercase",border:"1px solid var(--rim)",padding:"8px 16px",display:"inline-block",color:"var(--dim)"}}>Atlas Response — Where Response Is Mission.</div>
          </div>
        ) : (
          <>
            <div style={{marginBottom:36}}>
              <div style={{fontFamily:"'Courier New',monospace",fontSize:8,letterSpacing:4,textTransform:"uppercase",color:"var(--sky)",marginBottom:12,display:"flex",alignItems:"center",gap:10}}>
                <span style={{display:"block",width:20,height:1,background:"var(--sky)"}}/>Investor Access Request
              </div>
              <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:28,color:"var(--white)",lineHeight:1.1,marginBottom:8}}>Request the Full<br/>Mission Briefing</div>
              <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:"var(--muted)"}}>Complete the form below. Your briefing will be delivered to your inbox within minutes.</div>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
                <div className="form-field"><label style={{fontFamily:"'Courier New',monospace",fontSize:8,letterSpacing:3,textTransform:"uppercase",color:"var(--dim)"}}>First Name *</label><input type="text" name="firstName" placeholder="Jane" value={form.firstName} onChange={handleInputChange} required style={{background:"var(--steel)",border:"1px solid var(--rim)",color:"var(--white)",fontFamily:"'Courier New',monospace",fontSize:13,padding:"13px 16px",outline:"none",width:"100%",transition:"border-color .2s"}} onFocus={e=>e.target.style.borderColor="rgba(232,148,58,.5)"} onBlur={e=>e.target.style.borderColor="var(--rim)"}/></div>
                <div className="form-field"><label style={{fontFamily:"'Courier New',monospace",fontSize:8,letterSpacing:3,textTransform:"uppercase",color:"var(--dim)"}}>Last Name *</label><input type="text" name="lastName" placeholder="Smith" value={form.lastName} onChange={handleInputChange} required style={{background:"var(--steel)",border:"1px solid var(--rim)",color:"var(--white)",fontFamily:"'Courier New',monospace",fontSize:13,padding:"13px 16px",outline:"none",width:"100%",transition:"border-color .2s"}} onFocus={e=>e.target.style.borderColor="rgba(232,148,58,.5)"} onBlur={e=>e.target.style.borderColor="var(--rim)"}/></div>
              </div>
              <div className="form-field" style={{marginBottom:16}}><label style={{fontFamily:"'Courier New',monospace",fontSize:8,letterSpacing:3,textTransform:"uppercase",color:"var(--dim)"}}>Email Address *</label><input type="email" name="email" placeholder="jane@example.com" value={form.email} onChange={handleInputChange} required style={{background:"var(--steel)",border:"1px solid var(--rim)",color:"var(--white)",fontFamily:"'Courier New',monospace",fontSize:13,padding:"13px 16px",outline:"none",width:"100%",transition:"border-color .2s"}} onFocus={e=>e.target.style.borderColor="rgba(232,148,58,.5)"} onBlur={e=>e.target.style.borderColor="var(--rim)"}/></div>
              <div className="form-field" style={{marginBottom:16}}><label style={{fontFamily:"'Courier New',monospace",fontSize:8,letterSpacing:3,textTransform:"uppercase",color:"var(--dim)"}}>Company / Fund</label><input type="text" name="company" placeholder="Weatherford Capital" value={form.company} onChange={handleInputChange} style={{background:"var(--steel)",border:"1px solid var(--rim)",color:"var(--white)",fontFamily:"'Courier New',monospace",fontSize:13,padding:"13px 16px",outline:"none",width:"100%",transition:"border-color .2s"}} onFocus={e=>e.target.style.borderColor="rgba(232,148,58,.5)"} onBlur={e=>e.target.style.borderColor="var(--rim)"}/></div>
              <div className="form-field" style={{marginBottom:16}}><label style={{fontFamily:"'Courier New',monospace",fontSize:8,letterSpacing:3,textTransform:"uppercase",color:"var(--dim)"}}>Role / Title</label><input type="text" name="role" placeholder="Managing Partner" value={form.role} onChange={handleInputChange} style={{background:"var(--steel)",border:"1px solid var(--rim)",color:"var(--white)",fontFamily:"'Courier New',monospace",fontSize:13,padding:"13px 16px",outline:"none",width:"100%",transition:"border-color .2s"}} onFocus={e=>e.target.style.borderColor="rgba(232,148,58,.5)"} onBlur={e=>e.target.style.borderColor="var(--rim)"}/></div>
              <div className="form-field" style={{marginBottom:20}}>
                <label style={{fontFamily:"'Courier New',monospace",fontSize:8,letterSpacing:3,textTransform:"uppercase",color:"var(--dim)"}}>Investment Focus *</label>
                <select name="investmentFocus" value={form.investmentFocus} onChange={handleInputChange} required style={{background:"var(--steel)",border:"1px solid var(--rim)",color:"var(--white)",fontFamily:"'Courier New',monospace",fontSize:13,padding:"13px 16px",outline:"none",width:"100%",appearance:"none",cursor:"pointer"}}>
                  <option value="">Select focus area</option>
                  {["Aviation","Healthcare","Infrastructure","Defense/Aerospace","Other"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              {error && <div style={{color:"var(--red)",fontSize:13,marginBottom:16,fontFamily:"'Courier New',monospace"}}>{error}</div>}
              <button type="submit" disabled={submitting} style={{width:"100%",background:submitting?"var(--dim)":"var(--accent)",color:"var(--navy)",border:"none",fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:13,letterSpacing:4,textTransform:"uppercase",padding:18,cursor:submitting?"not-allowed":"pointer",transition:"background .2s",marginBottom:16,opacity:submitting?0.6:1}} onMouseEnter={e=>!submitting && (e.target.style.background="var(--amber)")} onMouseLeave={e=>!submitting && (e.target.style.background="var(--accent)")}>{submitting?"Submitting...":"Request Mission Briefing →"}</button>
              <div style={{fontFamily:"'Courier New',monospace",fontSize:9,lineHeight:1.6,color:"var(--dim)",borderTop:"1px solid rgba(255,255,255,.04)",paddingTop:16}}>By submitting this form you confirm you are an accredited investor or institutional representative. This briefing contains forward-looking statements and is intended for qualified recipients only. Atlas Response will not share your information with third parties.</div>
            </form>
          </>
        )}
      </div>

      <footer style={{gridColumn:"1/-1",background:"var(--navy)",borderTop:"1px solid rgba(255,255,255,.04)",padding:"24px 56px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:1}}>
        <div>
          <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:13,letterSpacing:4,textTransform:"uppercase"}}><span>ATLAS </span><span style={{color:"var(--accent)"}}>RESPONSE</span></div>
          <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,color:"var(--dim)",marginTop:4}}>Where Response Is Mission</div>
        </div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:9,color:"var(--dim)"}}>© 2026 Atlas Response. Distribution restricted.</div>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// GLOBAL STYLES + APP
// ═══════════════════════════════════════════════════════════════════════════
function GlobalStyles() {
  return (
    <style>{`
      :root{--navy:#060d18;--deep:#091525;--panel:#0c1c32;--panel2:#0f2240;--steel:#153050;--rim:#1e3d5c;--accent:#e8943a;--amber:#f0b429;--sky:#4eaee8;--white:#e8eef6;--muted:#6a8aaa;--dim:#334d6a;--green:#2ec87a;--red:#e05252;}
      *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
      html{scroll-behavior:smooth}body{background:var(--navy);color:var(--white);font-family:Georgia,'Times New Roman',serif;font-weight:300;overflow-x:hidden}
      a{text-decoration:none;color:inherit}button{cursor:pointer;font-family:inherit}
      :focus-visible{outline:2px solid rgba(78,174,232,.8);outline-offset:3px}
      .film-grain{position:fixed;inset:0;pointer-events:none;z-index:1000;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E");opacity:.6}
      .site-nav{position:fixed;top:2px;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:18px 52px;transition:background .4s,backdrop-filter .4s}
      .site-nav.scrolled{background:rgba(6,13,24,.94);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.04)}
      .nav-logo{display:flex;align-items:center;gap:14px;color:var(--white);font-family:'Arial Narrow',Impact,sans-serif;font-weight:700;font-size:17px;letter-spacing:3.5px;text-transform:uppercase;background:none;border:none;padding:0}
      .nav-logo svg{filter:drop-shadow(0 0 8px rgba(232,148,58,.3));transition:filter .3s}
      .nav-logo:hover svg{filter:drop-shadow(0 0 14px rgba(232,148,58,.55))}
      .nav-logo em{color:var(--accent);font-style:normal}
      .nav-links{display:flex;gap:28px;list-style:none}
      .nav-btn{font-family:'Courier New',monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);background:none;border:none;padding:0;transition:color .2s}
      .nav-btn:hover,.nav-btn.active{color:var(--white)}
      .nav-cta{font-family:'Arial Narrow',Impact,sans-serif;font-weight:600;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;color:var(--navy);background:var(--accent);padding:10px 22px;border:none;transition:background .2s,transform .2s;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)}
      .nav-cta:hover{background:var(--amber);transform:translateY(-1px)}
      .btn-primary{font-family:'Arial Narrow',Impact,sans-serif;font-weight:700;font-size:13px;letter-spacing:2.5px;text-transform:uppercase;background:var(--accent);color:var(--navy);padding:14px 32px;clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);transition:background .2s,transform .2s;display:inline-block;border:none}
      .btn-primary:hover{background:var(--amber);transform:translateY(-2px)}
      .btn-ghost{font-family:'Arial Narrow',Impact,sans-serif;font-weight:700;font-size:13px;letter-spacing:2.5px;text-transform:uppercase;color:var(--muted);background:transparent;border:1px solid var(--rim);padding:14px 32px;transition:border-color .2s,color .2s}
      .btn-ghost:hover{border-color:var(--sky);color:var(--sky)}
      .section-inner{max-width:1400px;margin:0 auto;padding:90px 52px}
      .section-label{font-family:'Courier New',monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--sky);margin-bottom:16px;display:flex;align-items:center;gap:12px}
      .section-label::before{content:'';display:block;width:24px;height:1px;background:var(--sky)}
      .section-label.acc{color:var(--accent)}.section-label.acc::before{background:var(--accent)}
      .section-title{font-family:'Arial Narrow',Impact,sans-serif;font-weight:700;font-size:clamp(28px,3.5vw,46px);line-height:1.05;margin-bottom:20px;letter-spacing:-.5px}
      .section-title .accent{color:var(--accent)}.section-title .sky{color:var(--sky)}.section-title .green{color:var(--green)}
      .hero-title{font-family:'Arial Narrow',Impact,sans-serif;font-weight:700;font-size:clamp(52px,8vw,108px);line-height:.9;letter-spacing:-1px;margin-bottom:28px}
      .eyebrow-label{font-family:'Courier New',monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--sky);margin-bottom:20px;display:flex;align-items:center;gap:12px}
      .eyebrow-label::before{content:'';display:block;width:32px;height:1px;background:var(--sky)}
      .mono-tag{font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--accent);margin-bottom:10px}
      .mono-small{font-family:'Courier New',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--muted)}
      .card-title{font-family:'Arial Narrow',Impact,sans-serif;font-weight:700;font-size:20px;color:var(--white);margin-bottom:8px}
      .card-body{font-size:14px;line-height:1.75;color:var(--muted)}
      .callout{border-left:2px solid var(--accent);padding:16px 20px;background:rgba(232,148,58,.04);font-size:17px;line-height:1.7;color:var(--white);margin:24px 0}
      .reveal{opacity:0;transform:translateY(24px);transition:opacity .65s ease,transform .65s ease}
      .reveal.visible{opacity:1;transform:translateY(0)}
      .hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(78,174,232,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(78,174,232,.04) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 70% 80% at 50% 50%,black 30%,transparent 80%)}
      .hero-grid-anim{position:absolute;inset:0;background-image:linear-gradient(rgba(78,174,232,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(78,174,232,.04) 1px,transparent 1px);background-size:60px 60px;animation:gridshift 8s linear infinite}
      @keyframes gridshift{0%{background-position:0 0}100%{background-position:60px 60px}}
      .scanline{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(78,174,232,.12),transparent);animation:scan 8s linear infinite}
      @keyframes scan{0%{top:0;opacity:0}10%{opacity:1}90%{opacity:1}100%{top:100%;opacity:0}}
      .sweep{position:absolute;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,transparent,rgba(232,148,58,.35),transparent);animation:sweepx 6s ease-in-out infinite}
      @keyframes sweepx{0%,100%{left:-2px;opacity:0}10%{opacity:1}90%{opacity:1}99.9%{left:100%;opacity:0}}
      table{width:100%;border-collapse:collapse}
      th{font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);padding:14px 18px;text-align:left;border-bottom:1px solid rgba(255,255,255,.06)}
      td{font-size:14px;line-height:1.7;color:var(--white);padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.06)}
      tr:last-child td{border-bottom:none}
      .form-field{display:flex;flex-direction:column;gap:8px}
      .form-field label{font-family:'Courier New',monospace;font-size:9.5px;letter-spacing:2px;color:var(--muted);text-transform:uppercase}
      .form-field input,.form-field select,.form-field textarea{background:rgba(255,255,255,.03);border:1px solid var(--rim);color:var(--white);padding:12px 16px;font-family:Georgia,'Times New Roman',serif;font-size:14px;transition:border-color .2s;outline:none;-webkit-appearance:none;appearance:none;width:100%}
      .form-field input:focus,.form-field select:focus,.form-field textarea:focus{border-color:rgba(232,148,58,.5)}
      .form-field textarea{resize:vertical;min-height:90px}
      .form-field select option{background:var(--panel)}
      .site-footer{background:var(--deep);border-top:1px solid rgba(255,255,255,.04);padding:32px 52px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}
      .footer-logo{font-family:'Arial Narrow',Impact,sans-serif;font-weight:700;font-size:14px;letter-spacing:3px;color:var(--white)}
      .footer-logo em{color:var(--accent);font-style:normal}
      .footer-links{display:flex;gap:24px;flex-wrap:wrap}
      .footer-btn{font-family:'Courier New',monospace;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--dim);background:none;border:none;transition:color .2s}
      .footer-btn:hover{color:var(--muted)}
      .footer-legal{font-family:'Courier New',monospace;font-size:9px;color:var(--dim);letter-spacing:.5px}
      .hero{min-height:100vh;position:relative;display:flex;align-items:center;padding:0 52px;overflow:hidden}
      .hero-content{position:relative;z-index:2;max-width:760px;padding-top:80px}
      h1.hero-title{font-family:'Arial Narrow','Arial Black',Impact,sans-serif;font-weight:700;font-size:clamp(62px,8vw,100px);line-height:.95;letter-spacing:-1px;margin-bottom:28px}
      h1.hero-title .accent{color:var(--accent)}
      h1.hero-title .outline{-webkit-text-stroke:1.5px rgba(232,148,58,.5);color:transparent}
      .hero-eyebrow{font-family:'Courier New',monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--sky);margin-bottom:18px;display:flex;align-items:center;gap:12px}
      .hero-eyebrow::before{content:'';display:block;width:32px;height:1px;background:var(--sky)}
      .hero-badges{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:22px}
      .badge{font-family:'Courier New',monospace;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);border:1px solid rgba(30,61,92,.9);background:rgba(12,28,50,.55);padding:6px 10px}
      .hero-sub{font-size:17px;line-height:1.75;color:var(--muted);max-width:560px;margin-bottom:44px}
      .hero-sub strong{color:var(--white);font-weight:400}
      .hero-actions{display:flex;gap:16px;flex-wrap:wrap}
      .hero-stats{position:absolute;right:52px;top:50%;transform:translateY(-50%);z-index:3;display:flex;flex-direction:column;border-left:1px solid var(--rim)}
      .stat-item{padding:24px 28px;border-bottom:1px solid var(--rim)}
      .stat-item:last-child{border-bottom:none}
      .stat-val{font-family:'Arial Narrow','Arial Black',Impact,sans-serif;font-weight:700;font-size:36px;line-height:1;color:var(--white);margin-bottom:6px}
      .stat-label{font-family:'Courier New',monospace;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted)}
      .radar-wrap{position:absolute;right:10%;top:50%;transform:translateY(-50%);width:560px;height:560px;pointer-events:none}
      .rr{fill:none;stroke:rgba(78,174,232,.07);stroke-width:1}
      .rr-accent{fill:none;stroke:rgba(232,148,58,.08);stroke-width:1;stroke-dasharray:4,6}
      @keyframes radarSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      .radar-sweep{animation:radarSpin 7s linear infinite;transform-origin:280px 280px}
      .scroll-hint{position:absolute;bottom:36px;left:52px;display:flex;align-items:center;gap:12px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:2px;color:var(--dim)}
      .scroll-line{width:1px;height:40px;background:linear-gradient(to bottom,var(--dim),transparent);animation:scrollPulse 2s ease-in-out infinite}
      @keyframes scrollPulse{0%,100%{opacity:.3}50%{opacity:1}}
      .mission-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start}
      .mission-text p{font-size:16px;line-height:1.85;color:var(--muted);margin-bottom:20px}
      .mission-text p strong{color:var(--white);font-weight:400}
      .mission-callout{border-left:2px solid var(--accent);padding:16px 20px;margin:28px 0;font-size:17px;line-height:1.7;color:var(--white);background:rgba(232,148,58,.04)}
      .small-note{font-family:'Courier New',monospace;font-size:11px;color:var(--dim);line-height:1.7;margin-top:16px}
      .capability-list{display:flex;flex-direction:column}
      .cap-item{display:flex;gap:20px;padding:20px 0;border-bottom:1px solid var(--rim)}
      .cap-item:last-child{border-bottom:none}
      .cap-number{font-family:'Courier New',monospace;font-size:11px;color:var(--accent);letter-spacing:1px;flex-shrink:0;padding-top:3px}
      .cap-body{flex:1}
      .cap-title{font-family:'Arial Narrow','Arial Black',Impact,sans-serif;font-weight:600;font-size:17px;letter-spacing:.5px;margin-bottom:6px}
      .cap-desc{font-size:14px;line-height:1.7;color:var(--muted)}
      .whynow-grid{display:grid;grid-template-columns:1fr 2fr;gap:80px;align-items:start}
      .big-stat{padding:32px 0;border-bottom:1px solid var(--rim)}
      .big-stat:last-child{border-bottom:none}
      .big-stat-val{font-family:'Arial Narrow','Arial Black',Impact,sans-serif;font-weight:700;font-size:52px;line-height:1;margin-bottom:8px;color:var(--accent)}
      .big-stat-label{font-size:14px;line-height:1.6;color:var(--muted)}
      .whynow-points{display:flex;flex-direction:column;gap:28px}
      .whynow-point{display:flex;gap:20px;padding:24px;background:var(--panel);border-left:2px solid var(--sky);transition:border-left-color .25s}
      .whynow-point:hover{border-left-color:var(--accent)}
      .whynow-icon{font-size:22px;flex-shrink:0;margin-top:2px}
      .whynow-point-title{font-family:'Arial Narrow','Arial Black',Impact,sans-serif;font-weight:700;font-size:17px;margin-bottom:6px}
      .whynow-point-desc{font-size:14px;line-height:1.7;color:var(--muted)}
      .payload-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
      .payload-card{background:var(--panel);padding:32px 28px;border-top:2px solid var(--rim);transition:border-top-color .25s,transform .25s}
      .payload-card:hover{transform:translateY(-4px)}
      .payload-card.featured{background:var(--panel2);border-top-color:var(--accent)}
      .p-title{font-family:'Arial Narrow','Arial Black',Impact,sans-serif;font-weight:700;font-size:20px;margin-bottom:10px}
      .comp-bar-group{margin-bottom:4px}
      .comp-bar-header{display:flex;justify-content:space-between;font-family:'Arial Narrow','Arial Black',Impact,sans-serif;font-size:14px;font-weight:500;margin-bottom:8px}
      .comp-name{color:var(--white)}
      .comp-val{color:var(--muted);font-family:'Courier New',monospace;font-size:12px}
      .comp-track{height:6px;background:var(--steel);overflow:hidden}
      .comp-fill{height:100%;width:0%;transition:width 1.5s cubic-bezier(.16,1,.3,1);background:var(--muted)}
      .comp-fill.atlas{background:linear-gradient(90deg,var(--accent),var(--amber))}
      .pod-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:80px;align-items:start}
      .pod-text p{font-size:15px;line-height:1.85;color:var(--muted);margin-bottom:18px}
      .pod-text p strong{color:var(--white);font-weight:400}
      .pod-spec{background:var(--panel);border:1px solid var(--steel);padding:28px 26px}
      .spec-k{font-family:'Courier New',monospace;font-size:9px;letter-spacing:1.5px;color:var(--dim);text-transform:uppercase}
      .spec-v{font-family:'Arial Narrow','Arial Black',Impact,sans-serif;font-weight:600;font-size:16px;color:var(--white);text-align:right}
      .mission-flow{margin:32px auto 0;max-width:1040px;display:flex;align-items:flex-start;justify-content:center}
      .flow-step{flex:1;display:flex;flex-direction:column;align-items:center;text-align:center;position:relative;padding:0 10px}
      .flow-step:not(:last-child)::after{content:'';position:absolute;top:27px;left:calc(50% + 34px);width:calc(100% - 68px);height:1px;background:linear-gradient(90deg,rgba(232,148,58,.45),rgba(78,174,232,.25))}
      .flow-num{width:54px;height:54px;border-radius:50%;background:var(--panel);border:1px solid var(--rim);display:flex;align-items:center;justify-content:center;font-family:'Courier New',monospace;font-size:13px;color:var(--sky);margin-bottom:14px;z-index:1;position:relative}
      .flow-title{font-family:'Arial Narrow','Arial Black',Impact,sans-serif;font-weight:700;font-size:15px;margin-bottom:8px}
      .flow-desc{font-size:12px;color:var(--muted);line-height:1.65}
      .ops-card{background:var(--panel);padding:32px 28px;transition:background .25s}
      .ops-card:hover{background:var(--panel2)}
      .route-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
      .route-card{background:var(--panel);border:1px solid var(--steel);padding:28px 24px;position:relative;transition:transform .25s,border-color .25s}
      .route-card:hover{transform:translateY(-4px)}
      .route-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px}
      .route-orange::before{background:var(--accent)}
      .route-blue::before{background:var(--sky)}
      .route-green::before{background:var(--green)}
      .route-amber::before{background:var(--amber)}
      .route-orange:hover{border-color:rgba(232,148,58,.4)}
      .route-blue:hover{border-color:rgba(78,174,232,.4)}
      .route-green:hover{border-color:rgba(46,200,122,.4)}
      .route-amber:hover{border-color:rgba(240,180,41,.4)}
      @media(max-width:900px){.site-nav{padding:14px 24px}.nav-links{display:none}.section-inner{padding:60px 24px}.site-footer{padding:24px;flex-direction:column;align-items:flex-start}.footer-links{display:none}}
    `}</style>
  );
}

// ── ABOUT ──────────────────────────────────────────────────────────────────────────────────
function AboutPage({ go }) {
  return (
    <div style={{background:"var(--navy)"}}>
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:72}}>
        <div className="section-inner" style={{maxWidth:"900px"}}>
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--sky)",marginBottom:18}}>About</div></Reveal>
          <Reveal delay={60}><h1 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(48px,5vw,72px)",lineHeight:.95,marginBottom:28}}>Building for <span style={{color:"var(--accent)"}}>Trust,</span> Not <span style={{color:"var(--accent)"}}>Hype.</span></h1></Reveal>
          <Reveal delay={120}><p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",marginBottom:24,maxWidth:700}}>Atlas Response was founded around a simple belief: critical medical logistics should not depend on outdated, fragmented transport options when time can directly affect patient outcomes.</p></Reveal>
          <Reveal delay={180}><p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",marginBottom:32,maxWidth:700}}>We are developing an institution-grade operating model that combines aviation, command-and-control infrastructure, healthcare workflow integration, and chain-of-custody visibility into one coordinated platform.</p></Reveal>
          <Reveal delay={240}><div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            <button onClick={() => go("operations")} style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:13,letterSpacing:2.5,textTransform:"uppercase",color:"var(--navy)",background:"var(--accent)",border:"none",padding:"13px 28px",clipPath:"polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",cursor:"pointer"}}>Operations Model →</button>
            <button onClick={() => go("for-hospitals")} style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:13,letterSpacing:2.5,textTransform:"uppercase",color:"var(--muted)",background:"transparent",border:"1px solid var(--rim)",padding:"13px 28px",cursor:"pointer"}}>For Hospitals</button>
          </div></Reveal>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--sky)",marginBottom:16}}>What We're Building</div></Reveal>
          <Reveal delay={80}><h2 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(34px,4vw,52px)",lineHeight:1.05,marginBottom:48}}>Four Core Pillars</h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:52}}>
            {[
              {num:"01",title:"Aviation Operations",desc:"FAA Part 135-certified uncrewed aircraft network operating heavy-payload missions across the I-4 corridor."},
              {num:"02",title:"Command & Control",desc:"A dedicated Remote Operations Center providing continuous mission oversight, weather monitoring, and flight supervision."},
              {num:"03",title:"Healthcare Integration",desc:"A portal and chain-of-custody platform designed to fit inside hospital operations without EHR integration."},
              {num:"04",title:"Chain-of-Custody",desc:"End-to-end mission logging, QR verification, environmental telemetry, and audit trails."}
            ].map((pillar,i) => (
              <Reveal key={i} delay={120+i*40}>
                <div style={{display:"flex",gap:20}}>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:11,color:"var(--accent)",letterSpacing:1,flexShrink:0}}>{pillar.num}</div>
                  <div>
                    <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:600,fontSize:17,marginBottom:10}}>{pillar.title}</div>
                    <p style={{fontSize:14,lineHeight:1.7,color:"var(--muted)"}}>{pillar.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="section-inner">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"start"}}>
            <Reveal><div>
              <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--sky)",marginBottom:16}}>Leadership</div>
              <h2 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:40,lineHeight:1.1,marginBottom:28}}>Founder & CEO</h2>
              <div style={{background:"var(--panel)",border:"1px solid var(--steel)",padding:32}}>
                <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:26,marginBottom:8}}>Christopher Green</div>
                <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--accent)",marginBottom:20}}>Founder & CEO</div>
                <p style={{fontSize:14,lineHeight:1.8,color:"var(--muted)"}}>Christopher Green founded Atlas Response to build a more advanced and dependable model for medical logistics — one designed around operational control, regulatory discipline, and healthcare system trust.</p>
              </div>
            </div></Reveal>
            <Reveal delay={80}><div>
              <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--sky)",marginBottom:16}}>Team Architecture</div>
              <h2 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:30,lineHeight:1.1,marginBottom:28}}>Multidisciplinary Leadership</h2>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"var(--rim)",border:"1px solid var(--rim)"}}>
                {["Director of Operations","Chief Pilot","Director of Maintenance","Safety & Compliance","ROC & Mission Systems","Healthcare Operations"].map((role,i) => (
                  <div key={i} style={{background:"var(--panel)",padding:"12px 14px",fontSize:13,color:"var(--muted)"}}>{role}</div>
                ))}
              </div>
            </div></Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── OPERATIONS ──────────────────────────────────────────────────────────────────────────────
function OperationsPage({ go }) {
  return (
    <div style={{background:"var(--navy)"}}>
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:72}}>
        <div className="section-inner" style={{maxWidth:"900px"}}>
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--sky)",marginBottom:18}}>Operations Model</div></Reveal>
          <Reveal delay={60}><h1 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(48px,5vw,72px)",lineHeight:.95,marginBottom:28}}>Built Like an <span style={{color:"var(--accent)"}}>Air Carrier,</span> Not a Tech Demo</h1></Reveal>
          <Reveal delay={120}><p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",marginBottom:28,maxWidth:700}}>Atlas Response is structured around FAA regulatory discipline, centralized ROC command, documented chain-of-custody, and zero PHI. Every system is designed to pass FAA scrutiny — and to carry the payloads that require it.</p></Reveal>
          <Reveal delay={180}><div style={{display:"flex",gap:20}}>
            <div style={{flex:"0 0 auto"}}>
              <div style={{fontSize:32,fontWeight:700,color:"var(--accent)"}}>6</div>
              <div style={{fontSize:12,color:"var(--muted)"}}>Remote pilot stations</div>
            </div>
            <div style={{flex:"0 0 auto"}}>
              <div style={{fontSize:32,fontWeight:700,color:"var(--accent)"}}>3</div>
              <div style={{fontSize:12,color:"var(--muted)"}}>Screens per station</div>
            </div>
            <div style={{flex:"0 0 auto"}}>
              <div style={{fontSize:32,fontWeight:700,color:"var(--accent)"}}>~9</div>
              <div style={{fontSize:12,color:"var(--muted)"}}>Daily missions (Phase A)</div>
            </div>
          </div></Reveal>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--sky)",marginBottom:16}}>Command Infrastructure</div></Reveal>
          <Reveal delay={80}><h2 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:44,lineHeight:1.05,marginBottom:40}}>The Remote Operations <span style={{color:"var(--accent)"}}>Center</span></h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80}}>
            <Reveal delay={120}><div>
              <p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",marginBottom:20}}>The ROC is the operational heart of Atlas Response. It provides continuous mission oversight, weather monitoring, flight supervision, and exception management for every mission.</p>
              <p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)"}}>This is not a dispatch center. It is a command center built on air carrier operations principles.</p>
              <div style={{marginTop:32,display:"flex",gap:16}}>
                <button onClick={() => go("network-map")} style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:13,letterSpacing:2.5,textTransform:"uppercase",color:"var(--navy)",background:"var(--accent)",border:"none",padding:"13px 28px",clipPath:"polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",cursor:"pointer"}}>Network Map →</button>
              </div>
            </div></Reveal>
            <Reveal delay={160}><div style={{background:"var(--panel)",border:"1px solid var(--steel)",padding:28}}>
              <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--dim)",marginBottom:20}}>ROC Capabilities</div>
              {["Continuous flight supervision","Weather and risk monitoring","Real-time mission tracking","Exception management","Pilot station coordination","Mission logging and audit","Chain-of-custody verification"].map((cap,i) => (
                <div key={i} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,.04)",fontSize:13,color:"var(--muted)"}}>
                  <span style={{color:"var(--accent)"}}>✓</span>{cap}
                </div>
              ))}
            </div></Reveal>
          </div>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)"}}>
        <div className="section-inner">
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--sky)",marginBottom:16}}>Operating Principles</div></Reveal>
          <Reveal delay={80}><h2 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:44,lineHeight:1.05,marginBottom:40}}>Discipline <span style={{color:"var(--accent)"}}>Designed</span> In</h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {[
              {title:"Two-Person Abort",desc:"Every mission has two pilot stations. Either can abort."},
              {title:"Zero PHI",desc:"We collect no patient information, no medical data."},
              {title:"Audit Trails",desc:"Every action logged, every handoff verified, every event traced."},
              {title:"FAA Compliance",desc:"Built for Part 135 certification from day one."},
              {title:"Weather Gating",desc:"Missions gated on real-time weather, not forecasts."},
              {title:"SLA Consistency",desc:"Same standards, same oversight, every mission."}
            ].map((principle,i) => (
              <Reveal key={i} delay={100+i*30}><div style={{background:"var(--panel)",border:"1px solid var(--steel)",padding:28,transition:"border-color .3s"}}>
                <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:16,marginBottom:12}}>{principle.title}</div>
                <p style={{fontSize:13,lineHeight:1.7,color:"var(--muted)"}}>{principle.desc}</p>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── FOR HOSPITALS ──────────────────────────────────────────────────────────────────────────
function ForHospitalsPage({ go }) {
  return (
    <div style={{background:"var(--navy)"}}>
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:72}}>
        <div className="section-inner" style={{maxWidth:"900px"}}>
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--sky)",marginBottom:18}}>For Healthcare Providers</div></Reveal>
          <Reveal delay={60}><h1 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(48px,5vw,72px)",lineHeight:.95,marginBottom:28}}>The Cost of <span style={{color:"var(--accent)"}}>Slow Logistics</span></h1></Reveal>
          <Reveal delay={120}><p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",marginBottom:24,maxWidth:700}}>Organ procurement windows are measured in hours. Specimen chains of custody cannot be interrupted. Medical urgencies do not wait for ground traffic.</p></Reveal>
          <Reveal delay={180}><p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",marginBottom:32,maxWidth:700}}>Atlas Response is built to solve the logistics problems that traditional transport cannot.</p></Reveal>
          <Reveal delay={240}><button onClick={() => go("operations")} style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:13,letterSpacing:2.5,textTransform:"uppercase",color:"var(--navy)",background:"var(--accent)",border:"none",padding:"13px 28px",clipPath:"polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",cursor:"pointer"}}>How It Works →</button></Reveal>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"start"}}>
            <Reveal><div>
              <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--sky)",marginBottom:16}}>What Hospitals Need</div>
              <h2 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:40,lineHeight:1.1,marginBottom:28}}>Dependable Medical Logistics</h2>
              <p style={{fontSize:15,lineHeight:1.85,color:"var(--muted)",marginBottom:20}}>Hospitals need a transport partner that:</p>
              <div style={{display:"flex",flexDirection:"column",gap:0}}>
                {[
                  "Integrates with your logistics workflows",
                  "Maintains chain-of-custody with audit trails",
                  "Delivers SLA-backed reliability",
                  "Requires no IT integration projects",
                  "Operates under FAA oversight",
                  "Preserves patient confidentiality (zero PHI collection)"
                ].map((item,i) => (
                  <div key={i} style={{display:"flex",gap:12,padding:"14px 0",borderBottom:"1px solid rgba(255,255,255,.04)",fontSize:14,color:"var(--muted)"}}>
                    <span style={{color:"var(--accent)",flexShrink:0}}>✓</span>{item}
                  </div>
                ))}
              </div>
            </div></Reveal>
            <Reveal delay={80}><div>
              <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--sky)",marginBottom:16}}>The Difference</div>
              <h2 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:30,lineHeight:1.1,marginBottom:28}}>How Atlas Changes the Equation</h2>
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                {[
                  {label:"Ground Transport",time:"2-4 hours",atlas:"25-45 min"},
                  {label:"Specimen Window",time:"Limited",atlas:"Preserved"},
                  {label:"Weather Risk",time:"High",atlas:"Mitigated"},
                  {label:"Chain-of-Custody",time:"Manual logs",atlas:"Digital audit trail"},
                  {label:"Regulatory Oversight",time:"None standard",atlas:"FAA Part 135"}
                ].map((comp,i) => (
                  <Reveal key={i} delay={120+i*30}><div style={{background:"var(--panel)",padding:16}}>
                    <div style={{fontSize:13,color:"var(--muted)",marginBottom:8}}>{comp.label}</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                      <div><div style={{fontSize:11,color:"var(--dim)"}}>Traditional</div><div style={{fontSize:13,color:"var(--muted)"}}>{comp.time}</div></div>
                      <div><div style={{fontSize:11,color:"var(--sky)"}}>Atlas</div><div style={{fontSize:13,color:"var(--white)"}}>{comp.atlas}</div></div>
                    </div>
                  </div></Reveal>
                ))}
              </div>
            </div></Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── HQ CAMPUS ──────────────────────────────────────────────────────────────────────────────
function HQCampusPage() {
  return (
    <div style={{background:"var(--navy)"}}>
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:72}}>
        <div className="section-inner" style={{maxWidth:"900px"}}>
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--sky)",marginBottom:18}}>HQ Campus</div></Reveal>
          <Reveal delay={60}><h1 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(48px,5vw,72px)",lineHeight:.95,marginBottom:28}}>30-Acre Lakeland <span style={{color:"var(--accent)"}}>Command Complex</span></h1></Reveal>
          <Reveal delay={120}><p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",marginBottom:32,maxWidth:700}}>Atlas Response headquarters in Lakeland, Florida will house the Remote Operations Center, flight control rooms, maintenance and hangar facilities, and command infrastructure purpose-built for medical air logistics at scale.</p></Reveal>
          <Reveal delay={180}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40}}>
            <div>
              <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:28,color:"var(--accent)",marginBottom:8}}>30 acres</div>
              <div style={{fontSize:14,color:"var(--muted)"}}>Purpose-built command complex</div>
            </div>
            <div>
              <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:28,color:"var(--accent)",marginBottom:8}}>Class C airspace</div>
              <div style={{fontSize:14,color:"var(--muted)"}}>Established aviation corridor</div>
            </div>
          </div></Reveal>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--sky)",marginBottom:16}}>Facility Components</div></Reveal>
          <Reveal delay={80}><h2 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:40,lineHeight:1.1,marginBottom:40}}>A Command Infrastructure Built to Scale</h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {[
              {title:"Remote Operations Center",items:["6 pilot control stations","3 screens per station","Real-time mission tracking","Weather & risk monitoring"]},
              {title:"Maintenance & Hangar",items:["Aircraft servicing","Maintenance management","Payload integration","Spare parts inventory"]},
              {title:"Corporate & Admin",items:["Executive offices","Operations planning","Safety & compliance","Regulatory affairs"]}
            ].map((section,i) => (
              <Reveal key={i} delay={100+i*40}><div style={{background:"var(--panel)",border:"1px solid var(--steel)",padding:28}}>
                <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:17,marginBottom:16}}>{section.title}</div>
                {section.items.map((item,j) => (
                  <div key={j} style={{fontSize:13,color:"var(--muted)",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>✓ {item}</div>
                ))}
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── LANDING NETWORK ────────────────────────────────────────────────────────────────────────
function LandingNetworkPage() {
  return (
    <div style={{background:"var(--navy)"}}>
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:72}}>
        <div className="section-inner" style={{maxWidth:"900px"}}>
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--sky)",marginBottom:18}}>Hospital Network</div></Reveal>
          <Reveal delay={60}><h1 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(48px,5vw,72px)",lineHeight:.95,marginBottom:28}}>Landing Points Across the <span style={{color:"var(--accent)"}}>I-4 Corridor</span></h1></Reveal>
          <Reveal delay={120}><p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",marginBottom:32,maxWidth:700}}>Phase A focuses on establishing landing infrastructure at major teaching hospitals and medical centers across central Florida, with expansion planned to Jacksonville, Miami, and Pensacola.</p></Reveal>
          <Reveal delay={180}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:24}}>
            {["Lakeland","Orlando","Tampa"].map((city,i) => (
              <div key={i} style={{background:"var(--panel)",border:"1px solid var(--steel)",padding:20,textAlign:"center"}}>
                <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:18,marginBottom:8}}>{city}</div>
                <div style={{fontSize:12,color:"var(--dim)"}}>Landing sites established</div>
              </div>
            ))}
          </div></Reveal>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--sky)",marginBottom:16}}>Coverage</div></Reveal>
          <Reveal delay={80}><h2 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:40,lineHeight:1.1,marginBottom:40}}>From Lakeland to the Region</h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"start"}}>
            <Reveal delay={120}><div>
              <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--dim)",marginBottom:20}}>Phase A Networks</div>
              {["Lakeland Regional","Tampa General","Orlando Health","UCF College of Medicine"].map((hosp,i) => (
                <div key={i} style={{fontSize:14,color:"var(--muted)",padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>✓ {hosp}</div>
              ))}
            </Reveal>
            <Reveal delay={160}><div>
              <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--dim)",marginBottom:20}}>Future Expansion</div>
              {["Jacksonville Medical Center","Miami-Dade Teaching Hospital","Pensacola Naval Medical Center","Additional regional partners"].map((hosp,i) => (
                <div key={i} style={{fontSize:14,color:"var(--muted)",padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>→ {hosp}</div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── NETWORK MAP ────────────────────────────────────────────────────────────────────────────
function NetworkMapPage() {
  return (
    <div style={{background:"var(--navy)"}}>
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:72}}>
        <div className="section-inner" style={{maxWidth:"900px"}}>
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--sky)",marginBottom:18}}>Operations Network</div></Reveal>
          <Reveal delay={60}><h1 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(48px,5vw,72px)",lineHeight:.95,marginBottom:28}}>Command & <span style={{color:"var(--accent)"}}>Network Map</span></h1></Reveal>
          <Reveal delay={120}><p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",marginBottom:32,maxWidth:700}}>A unified view of the Atlas Response operational network — from the Remote Operations Center in Lakeland to landing sites across central Florida and beyond.</p></Reveal>
          <Reveal delay={180}><div style={{background:"var(--panel)",border:"1px solid var(--steel)",padding:40,textAlign:"center",minHeight:300,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div>
              <div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:2,color:"var(--dim)",marginBottom:20}}>NETWORK TOPOLOGY</div>
              <div style={{fontSize:40,color:"var(--accent)",marginBottom:20}}>🛰</div>
              <div style={{fontSize:16,color:"var(--muted)"}}>Central Command Hub<br/>↓<br/>6 Regional Landing Sites<br/>↓<br/>Hospital Partner Network</div>
            </div>
          </div></Reveal>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--sky)",marginBottom:16}}>System Architecture</div></Reveal>
          <Reveal delay={80}><h2 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:40,lineHeight:1.1,marginBottom:40}}>Distributed Command, Unified Control</h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40}}>
            <Reveal delay={120}><div>
              <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:18,marginBottom:20}}>ROC (Lakeland)</div>
              {["Master flight control","Weather & airspace","Mission planning","Exception management","Audit & logging"].map((feat,i) => (
                <div key={i} style={{fontSize:13,color:"var(--muted)",padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>→ {feat}</div>
              ))}
            </Reveal>
            <Reveal delay={160}><div>
              <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:18,marginBottom:20}}>Landing Sites</div>
              {["Redundant communications","Local ground operations","Payload handling","Hospital interfaces","Portal & tracking"].map((feat,i) => (
                <div key={i} style={{fontSize:13,color:"var(--muted)",padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>→ {feat}</div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── OPERATIONAL TIMELINE ──────────────────────────────────────────────────────────────────
function OperationalTimelinePage() {
  return (
    <div style={{background:"var(--navy)"}}>
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:72}}>
        <div className="section-inner" style={{maxWidth:"900px"}}>
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--sky)",marginBottom:18}}>Timeline</div></Reveal>
          <Reveal delay={60}><h1 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(48px,5vw,72px)",lineHeight:.95,marginBottom:28}}>36-Month <span style={{color:"var(--accent)"}}>FAA Certification</span> Roadmap</h1></Reveal>
          <Reveal delay={120}><p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",marginBottom:32,maxWidth:700}}>Atlas Response follows a disciplined 36-month certification pathway designed to establish FAA Part 135 authority, operational readiness, and institutional credibility.</p></Reveal>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <div style={{display:"flex",flexDirection:"column",gap:0,border:"1px solid var(--steel)"}}>
            {[
              {phase:"Months 1-6",title:"Foundation & Regulatory",items:["Company formation","FAA pre-application meetings","Safety & compliance planning","Command center design","Team recruitment"]},
              {phase:"Months 7-18",title:"Development & Testing",items:["ROC build-out","Systems integration","Safety protocols","Flight testing","FAA Part 135 application"]},
              {phase:"Months 19-30",title:"Certification & Expansion",items:["FAA Part 135 approval","Initial operations","Staff training","Partner integrations","Network expansion"]},
              {phase:"Months 31-36",title:"Scale & Optimization",items:["Full network activation","Landing site expansion","SLA optimization","Operational excellence"]}
            ].map((phase,i) => (
              <Reveal key={i} delay={80+i*40}><div style={{display:"grid",gridTemplateColumns:"180px 1fr",borderBottom:i < 3 ? "1px solid var(--steel)" : "none"}}>
                <div style={{background:"var(--panel)",padding:24,borderRight:"1px solid var(--steel)"}}>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:"var(--accent)",marginBottom:6}}>{phase.phase}</div>
                  <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:16}}>{phase.title}</div>
                </div>
                <div style={{padding:24}}>
                  {phase.items.map((item,j) => (
                    <div key={j} style={{fontSize:13,color:"var(--muted)",padding:"8px 0",borderBottom:j < phase.items.length-1 ? "1px solid rgba(255,255,255,.04)" : "none"}}>✓ {item}</div>
                  ))}
                </div>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── PHASE A ────────────────────────────────────────────────────────────────────────────────
function PhaseAPage() {
  return (
    <div style={{background:"var(--navy)"}}>
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:72}}>
        <div className="section-inner" style={{maxWidth:"900px"}}>
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--sky)",marginBottom:18}}>Phase A</div></Reveal>
          <Reveal delay={60}><h1 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(48px,5vw,72px)",lineHeight:.95,marginBottom:28}}>Initial <span style={{color:"var(--accent)"}}>Buildout</span></h1></Reveal>
          <Reveal delay={120}><p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",marginBottom:32,maxWidth:700}}>Phase A establishes the operational, regulatory, and institutional foundation that Phase B requires. It is fully funded by Series A capital and runs across 36 months.</p></Reveal>
          <Reveal delay={180}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
            <div style={{background:"var(--panel)",border:"1px solid var(--steel)",padding:20}}>
              <div style={{fontSize:14,color:"var(--dim)",marginBottom:12}}>Investment</div>
              <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:28,color:"var(--accent)"}}>$90M</div>
            </div>
            <div style={{background:"var(--panel)",border:"1px solid var(--steel)",padding:20}}>
              <div style={{fontSize:14,color:"var(--dim)",marginBottom:12}}>Timeline</div>
              <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:28,color:"var(--accent)"}}>36 months</div>
            </div>
          </div></Reveal>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--sky)",marginBottom:16}}>Deliverables</div></Reveal>
          <Reveal delay={80}><h2 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:40,lineHeight:1.1,marginBottom:40}}>What Gets Built</h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40}}>
            {[
              {cat:"Operational Infrastructure",items:["30-acre Lakeland HQ","Remote Operations Center","Maintenance & hangar","Command & control systems"]},
              {cat:"Regulatory & Compliance",items:["FAA Part 135 certification","Safety management systems","Documentation & procedures","Compliance infrastructure"]},
              {cat:"Fleet & Systems",items:["Uncrewed aircraft procurement","Payload integration","Chain-of-custody platform","Mission management system"]},
              {cat:"Partnership & Market",items:["Hospital partner agreements","Landing site establishment","Portal & integration","Customer support model"]}
            ].map((section,i) => (
              <Reveal key={i} delay={100+i*40}><div>
                <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--dim)",marginBottom:16}}>{section.cat}</div>
                {section.items.map((item,j) => (
                  <div key={j} style={{fontSize:13,color:"var(--muted)",padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>✓ {item}</div>
                ))}
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── CAPITAL DEPLOYMENT ───────────────────────────────────────────────────────────────────
function CapitalDeploymentPage() {
  return (
    <div style={{background:"var(--navy)"}}>
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:72}}>
        <div className="section-inner" style={{maxWidth:"900px"}}>
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--sky)",marginBottom:18}}>Deployment</div></Reveal>
          <Reveal delay={60}><h1 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(48px,5vw,72px)",lineHeight:.95,marginBottom:28}}>Series A Capital <span style={{color:"var(--accent)"}}>Allocation</span></h1></Reveal>
          <Reveal delay={120}><p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",marginBottom:32,maxWidth:700}}>The $90M Series A investment is allocated across operational infrastructure, FAA certification, fleet acquisition, systems development, and team building.</p></Reveal>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--sky)",marginBottom:16}}>Allocation</div></Reveal>
          <Reveal delay={80}><h2 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:40,lineHeight:1.1,marginBottom:40}}>Where $90M is Deployed</h2></Reveal>
          <div style={{display:"flex",flexDirection:"column",gap:20}}>
            {[
              {category:"Operational Infrastructure",amount:"$28M",pct:31,desc:"HQ campus, ROC build-out, hangar, command systems"},
              {category:"Fleet & Systems",amount:"$22M",pct:24,desc:"Aircraft, payload integration, mission platform"},
              {category:"FAA Certification",amount:"$16M",pct:18,desc:"Regulatory, compliance, safety infrastructure"},
              {category:"Team & Operations",amount:"$14M",pct:16,desc:"Personnel, training, operational readiness"},
              {category:"Working Capital",amount:"$10M",pct:11,desc:"Legal, insurance, partner agreements"}
            ].map((item,i) => (
              <Reveal key={i} delay={100+i*30}><div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <div>
                    <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:16}}>{item.category}</div>
                    <div style={{fontSize:13,color:"var(--muted)"}}>{item.desc}</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:20,color:"var(--accent)"}}>{item.amount}</div>
                    <div style={{fontSize:12,color:"var(--dim)"}}>{item.pct}%</div>
                  </div>
                </div>
                <div style={{height:8,background:"var(--steel)",borderRadius:2,overflow:"hidden"}}>
                  <div style={{height:"100%",width:item.pct+"%",background:"linear-gradient(90deg,var(--accent),var(--amber))"}}/></div>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── FINANCIAL RUNWAY ──────────────────────────────────────────────────────────────────────
function FinancialRunwayPage() {
  return (
    <div style={{background:"var(--navy)"}}>
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:72}}>
        <div className="section-inner" style={{maxWidth:"900px"}}>
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--sky)",marginBottom:18}}>Financials</div></Reveal>
          <Reveal delay={60}><h1 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(48px,5vw,72px)",lineHeight:.95,marginBottom:28}}>Financial <span style={{color:"var(--accent)"}}>Runway Model</span></h1></Reveal>
          <Reveal delay={120}><p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",marginBottom:32,maxWidth:700}}>Atlas Response is capitalized for a 36-month path to operational profitability. The $90M Series A funds all critical infrastructure, regulatory certification, and go-to-market activities.</p></Reveal>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--sky)",marginBottom:16}}>Projection</div></Reveal>
          <Reveal delay={80}><h2 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:40,lineHeight:1.1,marginBottom:40}}>Path to Profitability</h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"start"}}>
            <Reveal delay={120}><div>
              <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--dim)",marginBottom:24}}>Timeline</div>
              {[
                {phase:"Months 1-12",status:"Foundation",color:"var(--dim)"},
                {phase:"Months 13-24",status:"Ramp-up",color:"var(--sky)"},
                {phase:"Months 25-36",status:"Scale & Profitability",color:"var(--green)"}
              ].map((item,i) => (
                <Reveal key={i} delay={140+i*30}><div style={{background:"var(--panel)",border:"1px solid var(--steel)",padding:20,marginBottom:16}}>
                  <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:item.color,marginBottom:8}}>{item.phase}</div>
                  <div style={{fontSize:14,color:"var(--muted)"}}>{item.status}</div>
                </div></Reveal>
              ))}
            </Reveal>
            <Reveal delay={160}><div>
              <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--dim)",marginBottom:24}}>Key Metrics</div>
              {[
                {metric:"Missions per day (Month 12)",value:"~3-4"},
                {metric:"Missions per day (Month 24)",value:"~8-12"},
                {metric:"Revenue per mission",value:"$8-15K"},
                {metric:"Breakeven operations",value:"Month 28-30"},
                {metric:"Unit economics",value:"Positive YoY"}
              ].map((item,i) => (
                <Reveal key={i} delay={160+i*30}><div style={{background:"var(--panel)",border:"1px solid var(--steel)",padding:16,marginBottom:12}}>
                  <div style={{fontSize:12,color:"var(--muted)",marginBottom:6}}>{item.metric}</div>
                  <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:16,color:"var(--accent)"}}>{item.value}</div>
                </div></Reveal>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── STAFFING MODEL ───────────────────────────────────────────────────────────────────────
function StaffingModelPage() {
  return (
    <div style={{background:"var(--navy)"}}>
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:72}}>
        <div className="section-inner" style={{maxWidth:"900px"}}>
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--sky)",marginBottom:18}}>Team</div></Reveal>
          <Reveal delay={60}><h1 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(48px,5vw,72px)",lineHeight:.95,marginBottom:28}}>Phase A <span style={{color:"var(--accent)"}}>Staffing Model</span></h1></Reveal>
          <Reveal delay={120}><p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",marginBottom:32,maxWidth:700}}>Atlas Response is built by disciplined, mission-driven professionals across operations, aviation, safety, compliance, and technology — hired and structured around operational readiness milestones.</p></Reveal>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--sky)",marginBottom:16}}>Team Structure</div></Reveal>
          <Reveal delay={80}><h2 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:40,lineHeight:1.1,marginBottom:40}}>Critical Path Roles</h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>
            {[
              {dept:"Operations & Aviation",roles:["Director of Operations","Chief Pilot / Chief Remote Pilot","Director of Maintenance","Safety & Compliance Officer"]},
              {dept:"Command & Control",roles:["ROC Director","Mission Control Supervisor","Flight Data Officer","Remote Pilot Station Operators (6)"]},
              {dept:"Corporate & Development",roles:["Chief Financial Officer","General Counsel","VP Business Development","VP Engineering"]},
              {dept:"Healthcare Operations",roles:["VP Customer Operations","Hospital Integration Manager","Chain-of-Custody Officer","Customer Support"]},
              {dept:"Support Functions",roles:["HR & Administration","Finance & Accounting","Legal & Compliance","IT & Systems"]},
              {dept:"Total Headcount",roles:["Month 6: ~12-15","Month 12: ~22-25","Month 24: ~35-40","Month 36: ~45-50"]}
            ].map((section,i) => (
              <Reveal key={i} delay={100+i*30}><div style={{background:"var(--panel)",border:"1px solid var(--steel)",padding:20}}>
                <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:15,marginBottom:16}}>{section.dept}</div>
                {section.roles.map((role,j) => (
                  <div key={j} style={{fontSize:12,color:"var(--muted)",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>→ {role}</div>
                ))}
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── MISSION FLOW ──────────────────────────────────────────────────────────────────────────
function MissionFlowPage() {
  return (
    <div style={{background:"var(--navy)"}}>
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:72}}>
        <div className="section-inner" style={{maxWidth:"900px"}}>
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--sky)",marginBottom:18}}>Operations</div></Reveal>
          <Reveal delay={60}><h1 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(48px,5vw,72px)",lineHeight:.95,marginBottom:28}}>Medical Logistics <span style={{color:"var(--accent)"}}>Mission Flow</span></h1></Reveal>
          <Reveal delay={120}><p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",marginBottom:32,maxWidth:700}}>Every mission follows a disciplined operational flow — from hospital request through payload pickup, flight execution, delivery, chain-of-custody verification, and mission logging.</p></Reveal>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--sky)",marginBottom:16}}>Workflow</div></Reveal>
          <Reveal delay={80}><h2 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:40,lineHeight:1.1,marginBottom:40}}>Mission Execution</h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:20,textAlign:"center"}}>
            {[
              {num:"1",title:"Request",desc:"Hospital requests logistics support via portal"},
              {num:"2",title:"Planning",desc:"ROC plans mission, checks weather, routes"},
              {num:"3",title:"Pickup",desc:"Payload collection with QR verification"},
              {num:"4",title:"Flight",desc:"Two-pilot station execution with telemetry"},
              {num:"5",title:"Delivery",desc:"Handoff & chain-of-custody logging"}
            ].map((step,i) => (
              <Reveal key={i} delay={100+i*30}><div style={{background:"var(--panel)",border:"1px solid var(--steel)",padding:20}}>
                <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:28,color:"var(--accent)",marginBottom:12}}>{step.num}</div>
                <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:14,marginBottom:8}}>{step.title}</div>
                <p style={{fontSize:12,color:"var(--muted)",lineHeight:1.6}}>{step.desc}</p>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── UNIVERSAL POD ──────────────────────────────────────────────────────────────────────────
function UniversalPodPage() {
  return (
    <div style={{background:"var(--navy)"}}>
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:72}}>
        <div className="section-inner" style={{maxWidth:"900px"}}>
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--sky)",marginBottom:18}}>Product</div></Reveal>
          <Reveal delay={60}><h1 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(48px,5vw,72px)",lineHeight:.95,marginBottom:28}}>Universal Payload <span style={{color:"var(--accent)"}}>Pod</span></h1></Reveal>
          <Reveal delay={120}><p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",marginBottom:32,maxWidth:700}}>A modular, standardized payload container designed for medical logistics. Supports organs, specimens, time-sensitive materials, and pharmaceuticals with environmental monitoring and secure closure.</p></Reveal>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--sky)",marginBottom:16}}>Specifications</div></Reveal>
          <Reveal delay={80}><h2 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:40,lineHeight:1.1,marginBottom:40}}>Designed for Medical Transport</h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"start"}}>
            <Reveal delay={120}><div>
              <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:18,marginBottom:20}}>Physical Design</div>
              {[
                {k:"Dimensions",v:"500mm x 350mm x 250mm"},
                {k:"Weight (empty)",v:"~6 kg"},
                {k:"Capacity",v:"Modular (2-25L volumes)"},
                {k:"Material",v:"Medical-grade polymer"},
                {k:"Closure",v:"Tamper-evident secure fasteners"}
              ].map((spec,i) => (
                <Reveal key={i} delay={140+i*20}><div style={{background:"var(--panel)",padding:12,marginBottom:8,display:"grid",gridTemplateColumns:"1fr 1fr"}}>
                  <div style={{fontSize:11,color:"var(--dim)"}}>{spec.k}</div>
                  <div style={{fontSize:12,color:"var(--white)",textAlign:"right"}}>{spec.v}</div>
                </div></Reveal>
              ))}
            </Reveal>
            <Reveal delay={160}><div>
              <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:18,marginBottom:20}}>Monitoring & Control</div>
              {[
                ["Temperature monitoring","±0.5°C accuracy"],
                ["Environmental telemetry","Pressure, humidity"],
                ["QR tracking","Unique pod ID & handler verification"],
                ["Secure locking","Two-stage verification"],
                ["Status alerts","Real-time mission updates"]
              ].map((item,i) => (
                <Reveal key={i} delay={180+i*20}><div style={{background:"var(--panel)",padding:12,marginBottom:8}}>
                  <div style={{fontSize:11,color:"var(--dim)",marginBottom:4}}>{item[0]}</div>
                  <div style={{fontSize:12,color:"var(--accent)"}}>{item[1]}</div>
                </div></Reveal>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── ACCESS GRANTED ──────────────────────────────────────────────────────────────────────────
function AccessGrantedPage() {
  return (
    <div style={{minHeight:"100vh",display:"grid",gridTemplateColumns:"1fr 1fr",position:"relative"}}>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,backgroundImage:"linear-gradient(rgba(78,174,232,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(78,174,232,.03) 1px,transparent 1px)",backgroundSize:"50px 50px"}}/>

      <div style={{padding:"80px 56px",borderRight:"1px solid var(--rim)",display:"flex",flexDirection:"column",justifyContent:"center",position:"relative",zIndex:1}}>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:8,letterSpacing:4,textTransform:"uppercase",color:"var(--dim)",marginBottom:40}}>ACCESS VERIFICATION</div>
        <h1 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:54,lineHeight:.95,marginBottom:28}}>Access <span style={{color:"var(--accent)"}}>Granted.</span></h1>
        <p style={{fontFamily:"Georgia,serif",fontSize:14,lineHeight:1.85,color:"var(--muted)",marginBottom:40,maxWidth:440}}>Your Phase A Mission Briefing is being prepared. Check your inbox within 5 minutes — it will be delivered with supporting documentation and an invitation to schedule a direct call with our team.</p>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{display:"flex",alignItems:"center",gap:12,fontFamily:"'Courier New',monospace",fontSize:11,color:"var(--muted)"}}>
            <span style={{color:"var(--green)",fontSize:16}}>✓</span> Briefing dispatched to your email
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12,fontFamily:"'Courier New',monospace",fontSize:11,color:"var(--muted)"}}>
            <span style={{color:"var(--green)",fontSize:16}}>✓</span> Supporting documents included
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12,fontFamily:"'Courier New',monospace",fontSize:11,color:"var(--muted)"}}>
            <span style={{color:"var(--green)",fontSize:16}}>✓</span> Team follow-up pending
          </div>
        </div>
      </div>

      <div style={{padding:"80px 56px",display:"flex",flexDirection:"column",justifyContent:"center",background:"rgba(11,25,41,.4)",position:"relative",zIndex:1,textAlign:"center"}}>
        <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:48,color:"var(--accent)",marginBottom:28}}>✓</div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:3,textTransform:"uppercase",color:"var(--sky)",marginBottom:16}}>Next Steps</div>
        <div style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:26,color:"var(--white)",marginBottom:28,lineHeight:1.2}}>Check Your Inbox</div>
        <p style={{fontFamily:"Georgia,serif",fontSize:14,lineHeight:1.8,color:"var(--muted)",maxWidth:380,margin:"0 auto 36px"}}>Your briefing contains the full Phase A investment thesis, financial structure, operational roadmap, and team architecture. Our team will reach out within one business day to schedule a call.</p>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:3,textTransform:"uppercase",border:"1px solid var(--rim)",padding:"8px 16px",display:"inline-block",color:"var(--dim)"}}>Atlas Response — Where Response Is Mission.</div>
      </div>
    </div>
  );
}

// ── LEGAL ──────────────────────────────────────────────────────────────────────────────────
function LegalPage() {
  return (
    <div style={{background:"var(--navy)"}}>
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:72}}>
        <div className="section-inner" style={{maxWidth:"900px"}}>
          <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"var(--sky)",marginBottom:18}}>Legal</div></Reveal>
          <Reveal delay={60}><h1 style={{fontFamily:"'Arial Narrow',Impact,sans-serif",fontWeight:700,fontSize:"clamp(48px,5vw,72px)",lineHeight:.95,marginBottom:28}}>Disclosure & <span style={{color:"var(--accent)"}}>Legal</span></h1></Reveal>
          <Reveal delay={120}><p style={{fontSize:16,lineHeight:1.85,color:"var(--muted)",marginBottom:32,maxWidth:700}}>This briefing and all related materials are provided to accredited investors and qualified recipients only. They contain forward-looking statements and proprietary information.</p></Reveal>
        </div>
      </section>

      <section style={{borderTop:"1px solid rgba(255,255,255,.04)",background:"var(--deep)"}}>
        <div className="section-inner">
          <div style={{maxWidth:800}}>
            <Reveal><div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--sky)",marginBottom:24}}>Disclaimer</div></Reveal>
            <Reveal delay={80}><div style={{fontSize:14,lineHeight:1.9,color:"var(--muted)",marginBottom:32}}>
              <p style={{marginBottom:16}}>This material contains forward-looking statements regarding Atlas Response's business plans, expected results, and other future events. These statements are based on current expectations and assumptions and are subject to risks and uncertainties that could cause actual results to differ materially.</p>
              <p style={{marginBottom:16}}>This briefing is confidential and intended solely for authorized recipients. It may not be reproduced, distributed, or transmitted to any third party without prior written consent from Atlas Response.</p>
              <p>Atlas Response does not warrant the accuracy or completeness of any information presented and disclaims liability for any reliance on this material.</p>
            </div></Reveal>
            <Reveal delay={160}><div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--sky)",marginBottom:24}}>Accredited Investor</div></Reveal>
            <Reveal delay={200}><div style={{fontSize:14,lineHeight:1.9,color:"var(--muted)"}}>
              <p>By accessing this briefing, you represent and warrant that you are an accredited investor as defined by applicable securities laws, or an authorized representative of an institutional investor.</p>
            </div></Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const go = (p) => { setPage(p); window.scrollTo(0, 0); };

  const showNav = page !== "request-briefing";
  const showFooter = page !== "request-briefing";

  return (
    <>
      <GlobalStyles />
      <div className="film-grain"/>
      <ScrollBar />
      {showNav && <Nav page={page} go={go} />}
      <main style={{paddingTop: showNav ? 0 : 0}}>
        {page === "home"             && <HomePage go={go} />}
        {page === "fleet"            && <FleetPage go={go} />}
        {page === "about"            && <AboutPage go={go} />}
        {page === "operations"       && <OperationsPage go={go} />}
        {page === "for-hospitals"    && <ForHospitalsPage go={go} />}
        {page === "hq-campus"        && <HQCampusPage go={go} />}
        {page === "landing-network"  && <LandingNetworkPage go={go} />}
        {page === "network-map"      && <NetworkMapPage go={go} />}
        {page === "operational-timeline" && <OperationalTimelinePage go={go} />}
        {page === "phase-a"          && <PhaseAPage go={go} />}
        {page === "universal-pod"    && <UniversalPodPage go={go} />}
        {page === "capital-deployment" && <CapitalDeploymentPage go={go} />}
        {page === "financial-runway" && <FinancialRunwayPage go={go} />}
        {page === "staffing-model"   && <StaffingModelPage go={go} />}
        {page === "mission-flow"     && <MissionFlowPage go={go} />}
        {page === "access-granted"   && <AccessGrantedPage go={go} />}
        {page === "legal"            && <LegalPage go={go} />}
        {page === "investors"        && <InvestorsPage go={go} />}
        {page === "briefing"         && <BriefingPage go={go} />}
        {page === "why-florida"      && <WhyFloridaPage go={go} />}
        {page === "partners"         && <PartnersPage go={go} />}
        {page === "contact"          && <ContactPage go={go} />}
        {page === "request-briefing" && <RequestBriefingPage go={go} />}
      </main>
      {showFooter && <Footer go={go} />}
    </>
  );
}
