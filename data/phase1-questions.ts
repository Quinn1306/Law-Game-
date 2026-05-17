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
        text: 'Large undertakings exceeding two of three criteria: balance sheet >EUR 25m, turnover >EUR 50m, or >250 employees',
        correct: true,
      },
      {
        id: 'b',
        text: 'Only companies with more than 1,000 employees and EUR 450 million net turnover',
        correct: false,
      },
    ],
    explanation:
      'The pre-Omnibus CSRD scope was set by Article 19a(1) as inserted into Directive 2013/34/EU by Directive (EU) 2022/2464. It captured all large undertakings as defined in Article 3(4) of the Accounting Directive, companies exceeding two of three size criteria. This captured approximately 50,000 companies across the EU. Option B describes the pre-Omnibus CSDDD scope, not the CSRD scope.',
    legalBasis:
      'Art. 19a(1), Directive 2013/34/EU consolidated 28.05.2024; Art. 3(4), Directive 2013/34/EU',
    timeLimit: 30,
  },
  {
    id: 'q2',
    section: 'A',
    sectionTitle: 'Pre-Omnibus Law',
    question:
      'Before Omnibus I, what did Article 19a(2)(a)(iii) of the Accounting Directive require companies to disclose regarding climate transition?',
    options: [
      {
        id: 'a',
        text: 'Any plans the company had to ensure its business model was compatible with limiting global warming to 1.5°C, including implementing actions',
        correct: true,
      },
      {
        id: 'b',
        text: 'The company was required to implement a transition plan compatible with the Paris Agreement',
        correct: false,
      },
    ],
    explanation:
      'Article 19a(2)(a)(iii) required disclosure of "the plans of the undertaking" for Paris-compatibility, a comply-or-explain disclosure obligation. It did not require companies to have a plan or to implement one. Option B describes what Article 22(1) of the pre-Omnibus CSDDD required, a separate and independent obligation to adopt and put into effect a transition plan.',
    legalBasis:
      'Art. 19a(2)(a)(iii), Directive 2013/34/EU consolidated 28.05.2024; Art. 22(1), Directive (EU) 2024/1760 (original)',
    timeLimit: 30,
  },
  {
    id: 'q3',
    section: 'A',
    sectionTitle: 'Pre-Omnibus Law',
    question: 'Before Omnibus I, which companies were required to comply with the CSDDD due diligence obligations?',
    options: [
      {
        id: 'a',
        text: 'EU companies with more than 1,000 employees on average AND net worldwide turnover of more than EUR 450 million',
        correct: true,
      },
      {
        id: 'b',
        text: 'All large undertakings under the Accounting Directive with more than 250 employees',
        correct: false,
      },
    ],
    explanation:
      'The pre-Omnibus CSDDD scope was set by Article 2(1)(a) of Directive (EU) 2024/1760. Both conditions had to be met simultaneously (AND, not OR). This captured approximately 5,000–6,000 companies, a much narrower population than the CSRD. Both conditions also had to be met for two consecutive financial years under Article 2(5).',
    legalBasis:
      'Art. 2(1)(a) and Art. 2(5), Directive (EU) 2024/1760 (original)',
    timeLimit: 30,
  },
  {
    id: 'q4',
    section: 'A',
    sectionTitle: 'Pre-Omnibus Law',
    question:
      'Before Omnibus I, what did the deeming provision in Article 22(2) CSDDD provide?',
    options: [
      {
        id: 'a',
        text: 'Companies that reported a transition plan under the CSRD were deemed to have satisfied the obligation to ADOPT a transition plan under the CSDDD, but were still required to put it into effect',
        correct: true,
      },
      {
        id: 'b',
        text: 'Companies that reported a transition plan under the CSRD were deemed to have satisfied all their CSDDD transition plan obligations including implementation',
        correct: false,
      },
    ],
    explanation:
      'Article 22(2) CSDDD expressly stated that CSRD reporters were deemed to have complied with the obligation to "adopt" a plan. But Article 22(1) separately required companies to "adopt AND put into effect" a plan. The deeming provision only addressed the adoption limb. The implementation obligation remained independent and could not be satisfied by CSRD reporting alone. Recital 73 of Directive (EU) 2024/1760 confirms this expressly.',
    legalBasis:
      'Art. 22(1) and (2), Directive (EU) 2024/1760 (original); Recital 73, Directive (EU) 2024/1760',
    timeLimit: 30,
  },
  {
    id: 'q5',
    section: 'A',
    sectionTitle: 'Pre-Omnibus Law',
    question:
      'Before Omnibus I, what did Article 16(2) CSDDD provide for companies already subject to CSRD reporting?',
    options: [
      {
        id: 'a',
        text: 'Companies subject to CSRD sustainability reporting were exempt from the separate CSDDD annual statement obligation, their CSRD report satisfied both instruments',
        correct: true,
      },
      {
        id: 'b',
        text: 'Companies subject to CSRD reporting had to publish an additional separate annual statement under the CSDDD',
        correct: false,
      },
    ],
    explanation:
      'Article 16(2) CSDDD provided that the obligation in Article 16(1), to publish an annual statement on due diligence matters, did not apply to companies subject to Articles 19a, 29a or 40a of Directive 2013/34/EU. For dual-scope companies, the CSRD sustainability report satisfied both the CSRD reporting obligation and the CSDDD communication obligation. Recitals 62 and 63 of Directive (EU) 2024/1760 confirm this was a deliberate design choice to avoid duplication.',
    legalBasis:
      'Art. 16(2), Directive (EU) 2024/1760 (original); Recitals 62 and 63, Directive (EU) 2024/1760',
    timeLimit: 30,
  },
  {
    id: 'q6',
    section: 'A',
    sectionTitle: 'Pre-Omnibus Law',
    question: 'Before Omnibus I, what did Article 29(1) CSDDD establish?',
    options: [
      {
        id: 'a',
        text: 'A harmonised EU civil liability standard: Member States had to ensure companies could be held liable for damage where the company intentionally or negligently failed to comply with due diligence obligations and that failure caused damage',
        correct: true,
      },
      {
        id: 'b',
        text: 'A right to full compensation for victims where national law already provided for civil liability',
        correct: false,
      },
    ],
    explanation:
      'Article 29(1) established the operative EU-level liability rule, setting the conditions under which companies could be held liable across all Member States. Option B describes what Article 29(2) provided, which was a supplementary guarantee of full compensation once liability was established. Article 29(1) was the harmonised substantive standard; Article 29(2) was the remedy. Both existed pre-Omnibus.',
    legalBasis:
      'Art. 29(1) and (2), Directive (EU) 2024/1760 (original)',
    timeLimit: 30,
  },

  // ── Section B: Post-Omnibus Law ─────────────────────────────────────
  {
    id: 'q7',
    section: 'B',
    sectionTitle: 'Post-Omnibus Law (Current Law)',
    question:
      'From financial years starting on or after 1 January 2027, which companies must publish a CSRD sustainability report?',
    options: [
      {
        id: 'a',
        text: 'Undertakings exceeding BOTH a net turnover of EUR 450 million AND an average of 1,000 employees',
        correct: true,
      },
      {
        id: 'b',
        text: 'All large undertakings exceeding two of three size criteria under Article 3(4) of the Accounting Directive',
        correct: false,
      },
    ],
    explanation:
      'Article 19a(1) of the Accounting Directive was replaced by Article 2(4)(a) of Directive (EU) 2026/470. The new threshold is a dual condition: both EUR 450 million net turnover AND 1,000 employees must be exceeded. Member States must transpose the new scope provisions by 19 March 2027. Article 3(4) (the large undertaking definition) was not amended, but it is now decoupled from sustainability reporting scope.',
    legalBasis:
      'Art. 19a(1) as replaced by Art. 2(4)(a), Directive (EU) 2026/470; Art. 3(4), Directive 2013/34/EU (unchanged); Art. 6(1), Directive (EU) 2026/470 (transposition deadline)',
    timeLimit: 30,
  },
  {
    id: 'q8',
    section: 'B',
    sectionTitle: 'Post-Omnibus Law (Current Law)',
    question:
      'From 26 July 2029, which companies are subject to CSDDD due diligence obligations?',
    options: [
      {
        id: 'a',
        text: 'EU companies with more than 5,000 employees on average AND net worldwide turnover of more than EUR 1.5 billion',
        correct: true,
      },
      {
        id: 'b',
        text: 'EU companies with more than 1,000 employees on average AND net worldwide turnover of more than EUR 450 million',
        correct: false,
      },
    ],
    explanation:
      'Article 2(1)(a) CSDDD was replaced by Article 4(2)(a)(i) of Directive (EU) 2026/470. Both the employee threshold (1,000 → 5,000) and the turnover threshold (EUR 450m → EUR 1.5bn) were raised. Both conditions must still be met simultaneously. Option B describes the pre-Omnibus threshold, which no longer applies. The unified application date for the CSDDD is 26 July 2029 under Article 37(1) as replaced by Article 4(22)(a) of Directive (EU) 2026/470.',
    legalBasis:
      'Art. 2(1)(a) as replaced by Art. 4(2)(a)(i), Directive (EU) 2026/470; Art. 37(1) as replaced by Art. 4(22)(a), Directive (EU) 2026/470',
    timeLimit: 30,
  },
  {
    id: 'q9',
    section: 'B',
    sectionTitle: 'Post-Omnibus Law (Current Law)',
    question:
      'Does Article 22 CSDDD (the transition plan obligation) still exist after Omnibus I?',
    options: [
      {
        id: 'a',
        text: 'No: Article 22 was deleted in its entirety by Directive (EU) 2026/470. There is no CSDDD obligation to adopt, implement or update a transition plan.',
        correct: true,
      },
      {
        id: 'b',
        text: 'Yes: Article 22 still requires companies to adopt a transition plan but no longer requires them to put it into effect',
        correct: false,
      },
    ],
    explanation:
      'Article 4(16) of Directive (EU) 2026/470 deleted Article 22 of Directive (EU) 2024/1760 in its entirety. There is no remaining CSDDD provision on transition plans. The only transition plan obligations currently in EU law are the disclosure obligations in Article 19a(2)(a)(iii) of the Accounting Directive, which require companies within CSRD scope to disclose any plans they have. Option B is incorrect: neither adoption nor implementation is required under the CSDDD any longer.',
    legalBasis:
      'Art. 4(16), Directive (EU) 2026/470; Art. 22, Directive (EU) 2024/1760 (deleted)',
    timeLimit: 30,
  },
  {
    id: 'q10',
    section: 'B',
    sectionTitle: 'Post-Omnibus Law (Current Law)',
    question:
      'What does Article 29 CSDDD currently provide regarding civil liability for due diligence failures?',
    options: [
      {
        id: 'a',
        text: 'Where a company is held liable under national law, victims have a right to full compensation. There is no EU-level rule establishing when liability arises, that is determined entirely by national law.',
        correct: true,
      },
      {
        id: 'b',
        text: 'The harmonised EU civil liability standard in Article 29(1) still applies, giving victims the right to claim where a company negligently failed its due diligence obligations',
        correct: false,
      },
    ],
    explanation:
      'Article 29(1), the operative EU civil liability rule, was deleted by Article 4(20)(a) of Directive (EU) 2026/470. What remains is Article 29(2): where a company is held liable under national law, victims have a right to full compensation without overcompensation. The EU no longer specifies when liability arises. That question is governed by national law, determined under Rome II (Regulation (EC) 864/2007). Article 29(3)(d) on representative actions and Article 29(7) on Rome II overriding mandatory provisions were also deleted.',
    legalBasis:
      'Art. 29(1) deleted by Art. 4(20)(a), Directive (EU) 2026/470; Art. 29(2) as replaced by Art. 4(20)(b), Directive (EU) 2026/470; Regulation (EC) 864/2007 (Rome II)',
    timeLimit: 30,
  },
  {
    id: 'q11',
    section: 'B',
    sectionTitle: 'Post-Omnibus Law (Current Law)',
    question:
      'EuroMed AG has 1,200 employees and EUR 500 million net worldwide turnover. From financial year 2027 onwards, which regulatory obligations apply to it?',
    options: [
      {
        id: 'a',
        text: 'CSRD reporting obligations only, EuroMed AG meets the Article 19a(1) threshold but not the Article 2(1)(a) CSDDD threshold',
        correct: true,
      },
      {
        id: 'b',
        text: 'Both CSRD reporting obligations and CSDDD due diligence obligations',
        correct: false,
      },
    ],
    explanation:
      'EuroMed AG exceeds both EUR 450m turnover AND 1,000 employees, so it falls within the post-Omnibus CSRD scope under Article 19a(1) as replaced. But it does not exceed 5,000 employees or EUR 1.5bn turnover, so it falls outside the post-Omnibus CSDDD scope under Article 2(1)(a) as replaced. EuroMed AG must publish a CSRD sustainability report. It has no CSDDD due diligence obligations. This is the core of the Scope Gap, it must disclose supply chain adverse impacts under the CSRD without any CSDDD obligation to address them.',
    legalBasis:
      'Art. 19a(1) as replaced, Directive 2013/34/EU; Art. 2(1)(a) as replaced, Directive (EU) 2024/1760',
    timeLimit: 30,
  },
  {
    id: 'q12',
    section: 'B',
    sectionTitle: 'Post-Omnibus Law (Current Law)',
    question:
      'What does Article 15 CSDDD currently require regarding monitoring of due diligence measures?',
    options: [
      {
        id: 'a',
        text: 'Companies must carry out periodic assessments of their due diligence measures at least every 5 years and after any significant change',
        correct: true,
      },
      {
        id: 'b',
        text: 'Companies must carry out periodic assessments of their due diligence measures at least every 12 months',
        correct: false,
      },
    ],
    explanation:
      'Article 15 was replaced in full by Article 4(11) of Directive (EU) 2026/470. The monitoring frequency was reduced from at least every 12 months (pre-Omnibus) to at least every 5 years. Assessments are also required without undue delay after a significant change and whenever there are reasonable grounds to believe measures are no longer adequate. Option B describes the pre-Omnibus monitoring obligation under the original Article 15.',
    legalBasis:
      'Art. 15 as replaced by Art. 4(11), Directive (EU) 2026/470',
    timeLimit: 30,
  },
  {
    id: 'q13',
    section: 'B',
    sectionTitle: 'Post-Omnibus Law (Current Law)',
    question:
      'After Omnibus I, is the scope gap between CSRD and CSDDD larger or smaller than it was before Omnibus I?',
    options: [
      {
        id: 'a',
        text: 'Larger, both scope thresholds were raised simultaneously, but the CSDDD threshold was raised more substantially, widening the gap between the two populations',
        correct: true,
      },
      {
        id: 'b',
        text: 'Smaller, Omnibus I was designed to bring the two frameworks closer together',
        correct: false,
      },
    ],
    explanation:
      'Before Omnibus I, the CSRD captured approximately 50,000 companies and the CSDDD captured approximately 5,000–6,000, a gap of approximately 44,000–45,000 companies. After Omnibus I, the CSRD captures approximately 5,000 companies and the CSDDD captures approximately 900–1,000, a gap of approximately 4,000–4,100. Both absolute numbers are smaller, but the proportional gap has widened. Crucially, the pre-Omnibus design anticipated the gap closing over time: Article 36 CSDDD required the Commission to review thresholds by 2030 with a view to expansion. Omnibus I moved in the opposite direction, raising both thresholds. The convergence trajectory has been reversed rather than realised. Article 36 survives unchanged but now operates from a substantially higher baseline.',
    legalBasis:
      'Art. 19a(1) as replaced, Directive 2013/34/EU; Art. 2(1)(a) as replaced, Directive (EU) 2024/1760; Art. 36, Directive (EU) 2024/1760 (unchanged); European Commission, COM(2025) 81 final, p 5',
    timeLimit: 30,
  },
]

export default questions
