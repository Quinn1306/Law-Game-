export interface Option {
  id: string
  text: string
  correct: boolean
}

export interface Question {
  id: string
  section: 'A' | 'B'
  sectionTitle: string
  question: string
  options: Option[]
  explanation: string
  legalBasis: string
  timeLimit: number
}

const questions: Question[] = [
  // ── Section A: Pre-Omnibus Law ──────────────────────────────────────
  {
    id: 'q1',
    section: 'A',
    sectionTitle: 'Pre-Omnibus Law',
    question:
      'Before Omnibus I, which companies were required to publish a sustainability report under the CSRD?',
    options: [
      {
        id: 'a',
        text: 'Large undertakings exceeding two of three criteria: balance sheet >EUR 25m, turnover >EUR 50m, or >250 employees (~50,000 companies)',
        correct: true,
      },
      {
        id: 'b',
        text: 'Only companies with >1,000 employees AND >EUR 450m net turnover (~5,000–6,000 companies)',
        correct: false,
      },
      {
        id: 'c',
        text: 'Only listed companies with >500 employees, regardless of turnover',
        correct: false,
      },
      {
        id: 'd',
        text: 'All EU companies with annual turnover exceeding EUR 100m',
        correct: false,
      },
    ],
    explanation:
      'The pre-Omnibus CSRD captured all "large undertakings" under Art. 3(4) of Directive 2013/34/EU — companies exceeding two of three thresholds (balance sheet >EUR 25m, net turnover >EUR 50m, >250 employees). This brought approximately 50,000 companies into scope. Option B describes the pre-Omnibus CSDDD scope, not the CSRD.',
    legalBasis:
      'Art. 19a(1), Directive 2013/34/EU (consolidated 28.05.2024); Art. 3(4), Directive 2013/34/EU',
    timeLimit: 30,
  },
  {
    id: 'q2',
    section: 'A',
    sectionTitle: 'Pre-Omnibus Law',
    question:
      'Under Art. 19a(2)(a)(iii) CSRD, what was a company required to do regarding a 1.5°C-compatible transition plan?',
    options: [
      {
        id: 'a',
        text: 'Disclose any existing plans for 1.5°C compatibility — CSRD did NOT require a plan to exist',
        correct: true,
      },
      {
        id: 'b',
        text: 'Implement a legally binding 1.5°C transition plan within three years of first reporting',
        correct: false,
      },
      {
        id: 'c',
        text: 'Obtain board approval for a 1.5°C pathway before filing the sustainability report',
        correct: false,
      },
      {
        id: 'd',
        text: 'Submit a transition plan to the European Securities and Markets Authority for regulatory approval',
        correct: false,
      },
    ],
    explanation:
      'Art. 19a(2)(a)(iii) required companies to disclose information about "any plans" compatible with limiting global warming to 1.5°C. Critically, this is a disclosure obligation only — companies were required to disclose whether such a plan exists, but CSRD did not require one to exist. A company with no transition plan would simply disclose that fact.',
    legalBasis:
      'Art. 19a(2)(a)(iii), Directive 2013/34/EU (consolidated 28.05.2024)',
    timeLimit: 30,
  },
  {
    id: 'q3',
    section: 'A',
    sectionTitle: 'Pre-Omnibus Law',
    question: 'Before Omnibus I, which companies fell within the CSDDD scope?',
    options: [
      {
        id: 'a',
        text: 'Companies with >1,000 employees AND >EUR 450m net worldwide turnover (~5,000–6,000 companies)',
        correct: true,
      },
      {
        id: 'b',
        text: 'Companies with >500 employees AND >EUR 150m turnover — the same threshold as CSRD',
        correct: false,
      },
      {
        id: 'c',
        text: 'All large undertakings in CSRD scope (~50,000 companies) automatically',
        correct: false,
      },
      {
        id: 'd',
        text: 'Companies with >250 employees AND >EUR 50m turnover operating in high-risk sectors',
        correct: false,
      },
    ],
    explanation:
      'The pre-Omnibus CSDDD applied to companies with more than 1,000 employees AND more than EUR 450m net worldwide turnover — approximately 5,000–6,000 companies across the EU. This was a substantially narrower scope than the CSRD. The CSRD and CSDDD used independent scope thresholds, not a single shared definition.',
    legalBasis:
      'Art. 2(1), Directive (EU) 2024/1760 (pre-Omnibus CSDDD)',
    timeLimit: 30,
  },
  {
    id: 'q4',
    section: 'A',
    sectionTitle: 'Pre-Omnibus Law',
    question:
      'Under Art. 22(2) CSDDD, what did the "deeming provision" provide for companies in both CSRD and CSDDD scope?',
    options: [
      {
        id: 'a',
        text: 'CSRD reporting satisfied the ADOPTION obligation for transition plans only — the CSDDD implementation obligation remained separate',
        correct: true,
      },
      {
        id: 'b',
        text: 'CSRD sustainability reporting fully satisfied all CSDDD obligations, including implementation and monitoring',
        correct: false,
      },
      {
        id: 'c',
        text: 'CSDDD reporting automatically satisfied the CSRD sustainability reporting obligations',
        correct: false,
      },
      {
        id: 'd',
        text: 'Companies could defer CSDDD obligations for up to five years if they had already filed a CSRD report',
        correct: false,
      },
    ],
    explanation:
      'Art. 22(2) CSDDD contained a deeming provision: for companies also subject to CSRD, complying with CSRD\'s transition plan disclosure satisfied the CSDDD\'s transition plan adoption obligation. However, this was limited — it only addressed adoption. The CSDDD obligation to implement the plan (Art. 22(1)) remained entirely independent and was not satisfied by CSRD reporting.',
    legalBasis:
      'Art. 22(1)–(2), Directive (EU) 2024/1760 (pre-Omnibus CSDDD)',
    timeLimit: 30,
  },
  {
    id: 'q5',
    section: 'A',
    sectionTitle: 'Pre-Omnibus Law',
    question:
      'Under Art. 16(2) CSDDD, what reporting arrangement applied to dual-scope companies (in both CSRD and CSDDD scope)?',
    options: [
      {
        id: 'a',
        text: 'The CSRD sustainability report satisfied both the CSRD disclosure obligation AND the CSDDD annual due diligence statement obligation',
        correct: true,
      },
      {
        id: 'b',
        text: 'Separate reports were mandatory — CSRD and CSDDD reporting could not be combined under any circumstances',
        correct: false,
      },
      {
        id: 'c',
        text: 'The CSDDD annual statement replaced the CSRD sustainability report for dual-scope companies',
        correct: false,
      },
      {
        id: 'd',
        text: 'Art. 16(2) applied only to the first three years of CSDDD applicability; separate reports were required thereafter',
        correct: false,
      },
    ],
    explanation:
      'Art. 16(2) CSDDD provided a consolidation mechanism for dual-scope companies. Where a company was required to publish a CSRD sustainability report, that report also satisfied the CSDDD obligation to publish an annual due diligence statement under Art. 16(1). This avoided duplication for the estimated 5,000–6,000 companies in both frameworks.',
    legalBasis:
      'Art. 16(1)–(2), Directive (EU) 2024/1760 (pre-Omnibus CSDDD)',
    timeLimit: 30,
  },
  {
    id: 'q6',
    section: 'A',
    sectionTitle: 'Pre-Omnibus Law',
    question:
      'Under Art. 29(1) CSDDD, what was the pre-Omnibus civil liability standard?',
    options: [
      {
        id: 'a',
        text: 'Harmonised EU standard: intentional or negligent failure to comply with due diligence obligations + causation = civil liability across all Member States',
        correct: true,
      },
      {
        id: 'b',
        text: 'Liability was determined entirely by national host-state law — Art. 29(1) contained no substantive EU standard',
        correct: false,
      },
      {
        id: 'c',
        text: 'Strict liability: proof of causation was not required; breach of CSDDD obligations alone was sufficient',
        correct: false,
      },
      {
        id: 'd',
        text: 'Only individual affected workers had standing to bring claims; NGOs and representative bodies could not',
        correct: false,
      },
    ],
    explanation:
      'Pre-Omnibus Art. 29(1) CSDDD created a harmonised EU-level civil liability standard. It required proof of: (1) an intentional or negligent failure to comply with due diligence obligations, AND (2) causation of adverse impacts. This applied uniformly across all Member States, eliminating fragmentation. Art. 29(3)(d) also expressly granted standing to representative bodies and NGOs.',
    legalBasis:
      'Art. 29(1), (3)(d), Directive (EU) 2024/1760 (pre-Omnibus CSDDD)',
    timeLimit: 30,
  },

  // ── Section B: Post-Omnibus Law ─────────────────────────────────────
  {
    id: 'q7',
    section: 'B',
    sectionTitle: 'Post-Omnibus Law',
    question:
      'After Omnibus I entered into force on 18 March 2026, what is the revised CSRD scope?',
    options: [
      {
        id: 'a',
        text: 'BOTH >EUR 450m net turnover AND >1,000 employees required — approximately 5,000 companies',
        correct: true,
      },
      {
        id: 'b',
        text: 'EITHER >EUR 450m turnover OR >1,000 employees (whichever threshold is first reached)',
        correct: false,
      },
      {
        id: 'c',
        text: 'Large undertakings exceeding 2 of 3 original criteria — no change from pre-Omnibus',
        correct: false,
      },
      {
        id: 'd',
        text: '>EUR 1.5bn turnover AND >5,000 employees — the same thresholds as post-Omnibus CSDDD',
        correct: false,
      },
    ],
    explanation:
      'Omnibus I significantly narrowed the CSRD scope. The post-Omnibus CSRD now requires BOTH more than EUR 450m net turnover AND more than 1,000 employees. This is a cumulative "AND" test — meeting only one threshold is insufficient. This reduced the scope from approximately 50,000 companies to approximately 5,000, a 90% reduction.',
    legalBasis:
      'Art. 19a(1) as amended by Art. 1(14), Directive (EU) 2026/470 (Omnibus I); Directive 2013/34/EU consolidated 18.03.2026',
    timeLimit: 30,
  },
  {
    id: 'q8',
    section: 'B',
    sectionTitle: 'Post-Omnibus Law',
    question:
      'After Omnibus I, what is the revised CSDDD scope threshold?',
    options: [
      {
        id: 'a',
        text: 'BOTH >5,000 employees AND >EUR 1.5bn net worldwide turnover — approximately 900–1,000 companies',
        correct: true,
      },
      {
        id: 'b',
        text: '>1,000 employees AND >EUR 450m turnover — unchanged from the pre-Omnibus threshold',
        correct: false,
      },
      {
        id: 'c',
        text: 'EITHER >2,500 employees OR >EUR 500m turnover — a narrowed but alternative-threshold test',
        correct: false,
      },
      {
        id: 'd',
        text: '>10,000 employees AND >EUR 2.5bn turnover — limited to only the largest multinationals',
        correct: false,
      },
    ],
    explanation:
      'Omnibus I raised the CSDDD thresholds dramatically. The post-Omnibus CSDDD requires BOTH more than 5,000 employees AND more than EUR 1.5bn net worldwide turnover. This narrowed scope from approximately 5,000–6,000 companies to approximately 900–1,000 companies — an 80–85% reduction. Only the largest EU companies remain subject to due diligence obligations.',
    legalBasis:
      'Art. 2(1) as amended by Art. 4(2), Directive (EU) 2026/470 (Omnibus I); Directive (EU) 2024/1760 consolidated 18.03.2026',
    timeLimit: 30,
  },
  {
    id: 'q9',
    section: 'B',
    sectionTitle: 'Post-Omnibus Law',
    question:
      'What happened to Art. 22 CSDDD (transition plan obligations) under Omnibus I?',
    options: [
      {
        id: 'a',
        text: 'Deleted in its entirety — no CSDDD obligation to adopt, implement, or update a transition plan remains',
        correct: true,
      },
      {
        id: 'b',
        text: 'Amended to allow a five-year grace period before transition plan implementation becomes mandatory',
        correct: false,
      },
      {
        id: 'c',
        text: 'Restructured into Art. 22a (adoption) and Art. 22b (monitoring) with a three-year implementation window',
        correct: false,
      },
      {
        id: 'd',
        text: 'Retained with reduced scope — only companies with >10,000 employees must implement transition plans',
        correct: false,
      },
    ],
    explanation:
      'Art. 22 CSDDD was deleted in its entirety by Art. 4(16) of Directive (EU) 2026/470. There is no longer any CSDDD obligation to adopt, implement, or update a transition plan. This creates the "Transition Plan Gap": companies must still disclose transition plans under CSRD Art. 19a(2)(a)(iii), but have no EU legal obligation to implement them under CSDDD.',
    legalBasis:
      'Art. 4(16), Directive (EU) 2026/470 (Omnibus I) deleting Art. 22, Directive (EU) 2024/1760',
    timeLimit: 30,
  },
  {
    id: 'q10',
    section: 'B',
    sectionTitle: 'Post-Omnibus Law',
    question:
      'After Omnibus I, what remains of Art. 29 CSDDD on civil liability?',
    options: [
      {
        id: 'a',
        text: 'Art. 29(1) harmonised EU liability standard deleted. Only Art. 29(2) retained: guarantees full compensation where national law independently establishes liability',
        correct: true,
      },
      {
        id: 'b',
        text: 'Art. 29 deleted in its entirety — no civil liability framework of any kind remains under CSDDD',
        correct: false,
      },
      {
        id: 'c',
        text: 'Art. 29(1) retained but narrowed to intentional breaches only; negligent failures no longer trigger EU-level liability',
        correct: false,
      },
      {
        id: 'd',
        text: 'Art. 29 fully retained — enforcement discretion was moved to Member States but the substantive standard is unchanged',
        correct: false,
      },
    ],
    explanation:
      'Omnibus I deleted Art. 29(1) — the harmonised EU civil liability standard — and Art. 29(3)(d) — representative actions by NGOs and trade unions. What remains is Art. 29(2): a provision guaranteeing the right to full compensation where national law establishes liability. Crucially, Art. 29(2) does not itself create liability. Civil liability is now determined entirely by national law, primarily under Rome II Art. 4(1).',
    legalBasis:
      'Art. 4(22), Directive (EU) 2026/470 (Omnibus I) deleting Art. 29(1), (3)(d); Art. 29(2) retained, Directive (EU) 2024/1760 consolidated 18.03.2026',
    timeLimit: 30,
  },
  {
    id: 'q11',
    section: 'B',
    sectionTitle: 'Post-Omnibus Law',
    question:
      'EuroMed AG is a German manufacturer with 1,200 employees and EUR 500m annual turnover. Under post-Omnibus law, which obligations apply?',
    options: [
      {
        id: 'a',
        text: 'CSRD only — EuroMed AG is inside the post-Omnibus CSRD scope but outside the post-Omnibus CSDDD scope',
        correct: true,
      },
      {
        id: 'b',
        text: 'Both CSRD and CSDDD — EuroMed AG meets both sets of post-Omnibus thresholds',
        correct: false,
      },
      {
        id: 'c',
        text: 'Neither CSRD nor CSDDD — EuroMed AG falls below both post-Omnibus thresholds',
        correct: false,
      },
      {
        id: 'd',
        text: 'CSDDD only — EuroMed AG meets the post-Omnibus CSDDD threshold but not the CSRD threshold',
        correct: false,
      },
    ],
    explanation:
      'CSRD: EuroMed AG has >1,000 employees (1,200) AND >EUR 450m turnover (EUR 500m) — meets both post-Omnibus CSRD thresholds. CSRD applies. CSDDD: EuroMed AG does NOT have >5,000 employees (only 1,200) — fails the post-Omnibus CSDDD employee threshold. CSDDD does not apply. This creates the Scope Gap: EuroMed AG must disclose supply chain adverse impacts under CSRD Art. 19a(2)(f)(ii) but has no CSDDD obligation to address them.',
    legalBasis:
      'Art. 19a(1) as amended, Directive 2013/34/EU consolidated 18.03.2026; Art. 2(1) as amended, Directive (EU) 2024/1760 consolidated 18.03.2026',
    timeLimit: 30,
  },
  {
    id: 'q12',
    section: 'B',
    sectionTitle: 'Post-Omnibus Law',
    question:
      'Under post-Omnibus Art. 15 CSDDD, how often must in-scope companies review and update their due diligence measures?',
    options: [
      {
        id: 'a',
        text: 'Every 5 years, or sooner following significant changes — reduced from the pre-Omnibus 12-month cycle',
        correct: true,
      },
      {
        id: 'b',
        text: 'Every 12 months — unchanged from the pre-Omnibus monitoring obligation',
        correct: false,
      },
      {
        id: 'c',
        text: 'Every 3 years — a new intermediate standard introduced by Omnibus I',
        correct: false,
      },
      {
        id: 'd',
        text: 'Every 24 months, or more frequently if significant adverse impacts are identified',
        correct: false,
      },
    ],
    explanation:
      'Omnibus I reduced the CSDDD monitoring cycle from every 12 months to every 5 years (while retaining a trigger for significant changes). This substantially reduced the ongoing compliance burden for in-scope companies. The change reflects the broader Omnibus I objective of reducing administrative costs while maintaining the core due diligence framework.',
    legalBasis:
      'Art. 15 as amended by Art. 4(11), Directive (EU) 2026/470 (Omnibus I); Directive (EU) 2024/1760 consolidated 18.03.2026',
    timeLimit: 30,
  },
]

export default questions
