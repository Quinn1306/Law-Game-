export type OutcomeQuality =
  | 'best'
  | 'partial'
  | 'problematic'
  | 'incorrect'
  | 'correction'

export interface DecisionOption {
  id: string
  text: string
  nextNode: string
}

export interface DecisionNodeData {
  id: string
  type?: 'outcome' | 'final'
  label: string
  question?: string
  options?: DecisionOption[]
  quality?: OutcomeQuality
  qualityLabel?: string
  legalPosition?: string
  whyItMatters?: string
  legalBasis?: string
  nextNode?: string
}

export interface FinalResult {
  id: string
  required: string
  notRequired: string
  structuralTension: string
}

export interface Sublevel {
  id: string
  title: string
  tension: string
  legalContext: string
  situation: string
  situationRole: string
  entryNode: string
  nodes: Record<string, DecisionNodeData>
  finalResult: FinalResult
}

const scenario: Sublevel[] = [
  // ── Sub-Level 1: Transition Plan Gap ────────────────────────────────
  {
    id: 'sl1',
    title: 'Sub-Level 1: The Transition Plan Gap',
    tension: 'CSRD requires disclosure of transition plans. CSDDD Art. 22 deleted. EuroMed AG must disclose a plan it has no EU legal obligation to implement.',
    legalContext:
      'Pre-Omnibus: Art. 19a(2)(a)(iii) CSRD required disclosure of any plans for 1.5°C compatibility. Art. 22(1) CSDDD required adoption AND implementation of a transition plan. Post-Omnibus: Art. 22 CSDDD deleted in its entirety by Art. 4(16), Directive (EU) 2026/470 (entered into force 18 March 2026). The CSRD disclosure obligation is unchanged.',
    situation:
      'EuroMed AG\'s board has received a written question from a major institutional shareholder. The shareholder notes that EuroMed AG\'s latest sustainability report discloses a transition plan committing to a 40% reduction in Scope 1 and 2 GHG emissions by 2030. The shareholder asks: "Is EuroMed AG legally required to implement this transition plan? If it fails to meet its 2030 target, what is its EU legal exposure?"',
    situationRole: 'Head of Legal, EuroMed AG',
    entryNode: 'node-1.1',
    nodes: {
      'node-1.1': {
        id: 'node-1.1',
        label: 'Node 1.1',
        question:
          'The board asks for your initial assessment. Is EuroMed AG legally required to implement the transition plan it disclosed in its CSRD report?',
        options: [
          {
            id: '1.1-A',
            text: 'Yes — EuroMed AG is legally bound to implement the plan. CSRD disclosure creates a binding commitment, and failure to implement would breach the company\'s sustainability reporting obligations.',
            nextNode: 'node-1.2A',
          },
          {
            id: '1.1-B',
            text: 'No — EuroMed AG has no EU legal obligation to implement the plan. CSRD is a disclosure instrument only, and the CSDDD implementation obligation has been deleted by Omnibus I.',
            nextNode: 'node-1.2B',
          },
          {
            id: '1.1-C',
            text: 'It depends on which national law applies — some Member States may have implemented sustainability obligations beyond what EU law requires.',
            nextNode: 'node-1.2C',
          },
        ],
      },
      'node-1.2A': {
        id: 'node-1.2A',
        label: 'Node 1.2A — Path A',
        question:
          'You advise that CSRD disclosure creates a binding implementation obligation. The board\'s external counsel raises a challenge: what is the legal basis for the proposition that CSRD disclosure binds the company to performance?',
        options: [
          {
            id: '1.2A-i',
            text: 'CSRD Art. 19a contains an implied performance obligation — companies that disclose targets cannot fail to pursue them without sanction.',
            nextNode: 'outcome-1A-i',
          },
          {
            id: '1.2A-ii',
            text: 'On reflection, you recall that CSRD is a transparency instrument and Art. 22 CSDDD — which contained the implementation obligation — was deleted. Your initial assessment was incorrect.',
            nextNode: 'outcome-1A-ii',
          },
        ],
      },
      'node-1.2B': {
        id: 'node-1.2B',
        label: 'Node 1.2B — Path B',
        question:
          'You correctly advise no EU implementation obligation. The board then asks: does this mean EuroMed AG can simply disregard the transition plan entirely?',
        options: [
          {
            id: '1.2B-i',
            text: 'Yes — with no CSDDD implementation obligation, EuroMed AG faces no EU legal consequences for ignoring the plan it disclosed.',
            nextNode: 'outcome-1B-i',
          },
          {
            id: '1.2B-ii',
            text: 'No — while there is no EU obligation to implement the plan, EuroMed AG must continue to accurately disclose its transition plan and report progress. Non-implementation creates reputational risk and potential national law consequences, even without EU-level liability.',
            nextNode: 'outcome-1B-ii',
          },
        ],
      },
      'node-1.2C': {
        id: 'node-1.2C',
        label: 'Node 1.2C — Path C',
        question:
          'You identify national law as the starting point. The board asks you to clarify what the EU-level position is before turning to national law analysis.',
        options: [
          {
            id: '1.2C-i',
            text: 'EU law does not govern transition plan implementation at all — the analysis begins and ends with German law.',
            nextNode: 'outcome-1C-i',
          },
          {
            id: '1.2C-ii',
            text: 'The EU baseline is that CSRD requires disclosure but does not require implementation (Art. 22 CSDDD deleted). National law may add obligations on top of this EU floor — but the EU position must be established first.',
            nextNode: 'outcome-1C-ii',
          },
        ],
      },
      'outcome-1A-i': {
        id: 'outcome-1A-i',
        type: 'outcome',
        label: 'Outcome 1A-i',
        quality: 'incorrect',
        qualityLabel: 'Legally Incorrect — High Risk',
        legalPosition:
          'This advice is incorrect and creates significant legal and reputational risk. CSRD is a disclosure instrument only. Art. 19a creates obligations to report accurately — it does not create binding performance obligations. There is no "implied performance obligation" in CSRD. Advising the board that disclosure binds performance could cause the company to over-commit legally or, worse, to withhold accurate disclosures to avoid that false liability.',
        whyItMatters:
          'Mischaracterising CSRD as creating implied performance obligations is a fundamental error. It conflates transparency law with substantive obligations. A legal adviser who takes this position may cause the company to structure its CSRD disclosures defensively to avoid a liability that does not exist — potentially compromising the quality of sustainability reporting without any corresponding legal protection.',
        legalBasis:
          'Art. 19a(1), Directive 2013/34/EU (disclosure obligation only); Art. 22 CSDDD deleted by Art. 4(16), Directive (EU) 2026/470',
        nextNode: 'final-sl1',
      },
      'outcome-1A-ii': {
        id: 'outcome-1A-ii',
        type: 'outcome',
        label: 'Outcome 1A-ii',
        quality: 'correction',
        qualityLabel: 'Self-Correction — Appropriate Professional Response',
        legalPosition:
          'You correctly identified the error in your initial reasoning and self-corrected before providing final advice. The CSRD is a disclosure instrument. Art. 22 CSDDD — which contained the obligation to adopt and implement a transition plan — was deleted in its entirety by Omnibus I. No EU-level implementation obligation survives. Recognising an error and correcting it is the appropriate professional response.',
        whyItMatters:
          'Self-correction in legal advice is not a failure — it is a professional strength. The key risk in this scenario is an adviser who does not recognise the error and advises the board that CSRD disclosure creates binding performance obligations. That path leads to structurally incorrect advice with cascading consequences.',
        legalBasis:
          'Art. 22 CSDDD deleted by Art. 4(16), Directive (EU) 2026/470; Art. 19a(2)(a)(iii), Directive 2013/34/EU (unchanged)',
        nextNode: 'final-sl1',
      },
      'outcome-1B-i': {
        id: 'outcome-1B-i',
        type: 'outcome',
        label: 'Outcome 1B-i',
        quality: 'partial',
        qualityLabel: 'Partially Correct but Incomplete',
        legalPosition:
          'The legal core is accurate: there is no EU implementation obligation. However, the advice that EuroMed AG faces "no EU legal consequences" overstates the position. CSRD Art. 19a(2)(a)(iii) requires disclosure of transition plans AND Art. 19a(2)(b) requires reporting of GHG targets and progress. Non-implementation that is inaccurately disclosed — or not disclosed at all — would breach the CSRD reporting obligations. The absence of an implementation obligation is not a licence to misreport progress.',
        whyItMatters:
          'This outcome is the most common trap in the Transition Plan Gap analysis. Legal advisers correctly identify that Art. 22 was deleted, but then overshoot by advising that nothing remains. The disclosure obligations are unchanged and continue to bind the company. Accurate reporting of failure to implement is itself a legal obligation.',
        legalBasis:
          'Art. 19a(2)(a)(iii) and (b), Directive 2013/34/EU (unchanged); Art. 22 CSDDD deleted',
        nextNode: 'final-sl1',
      },
      'outcome-1B-ii': {
        id: 'outcome-1B-ii',
        type: 'outcome',
        label: 'Outcome 1B-ii',
        quality: 'best',
        qualityLabel: 'Legally Accurate and Complete — Best Outcome',
        legalPosition:
          'This is the most legally accurate and complete advice. EuroMed AG has no EU obligation to implement the transition plan under post-Omnibus law — Art. 22 CSDDD was deleted. However, EuroMed AG must continue to disclose the plan and accurately report progress against it under CSRD Arts. 19a(2)(a)(iii) and 19a(2)(b). Supervisory authorities can enforce accurate disclosure but cannot enforce performance. Commercial and reputational consequences of non-implementation exist independently of EU legal liability.',
        whyItMatters:
          'This outcome captures the full structure of the post-Omnibus Transition Plan Gap at three distinct levels: EU disclosure law (unchanged), CSDDD performance obligation (deleted), and non-legal accountability (reputational and investor pressure). This three-level analysis is the professional standard for advising on post-Omnibus sustainability obligations.',
        legalBasis:
          'Art. 19a(2)(a)(iii) and (b), Directive 2013/34/EU (unchanged); Art. 22 CSDDD deleted by Art. 4(16), Directive (EU) 2026/470; Art. 4(16), Directive (EU) 2026/470',
        nextNode: 'final-sl1',
      },
      'outcome-1C-i': {
        id: 'outcome-1C-i',
        type: 'outcome',
        label: 'Outcome 1C-i',
        quality: 'problematic',
        qualityLabel: 'Legally Problematic — Missing EU Baseline',
        legalPosition:
          'This approach starts from the wrong analytical point. EU law does govern transition plan disclosure — CSRD Art. 19a(2)(a)(iii) is a directly applicable obligation unchanged by Omnibus I. A national law analysis that ignores the EU-level obligation would be incomplete and potentially incorrect. German law operates within the EU framework, not as a replacement for it. An analysis beginning with German law without first establishing the EU floor risks missing the disclosure obligations that remain in force.',
        whyItMatters:
          'The methodological error here is sequencing. In EU-governed subject matter, the correct analytical order is: (1) what does EU law require, (2) what additional obligations does national law impose, (3) how do they interact. Skipping step 1 creates structural gaps in legal advice.',
        legalBasis:
          'Art. 19a(2)(a)(iii), Directive 2013/34/EU (unchanged); methodology: European Court of Justice consistent approach to EU/national law interaction',
        nextNode: 'final-sl1',
      },
      'outcome-1C-ii': {
        id: 'outcome-1C-ii',
        type: 'outcome',
        label: 'Outcome 1C-ii',
        quality: 'best',
        qualityLabel: 'Legally Accurate and Complete — Best Outcome',
        legalPosition:
          'This methodology is correct. The EU baseline must be established first: CSRD requires disclosure; CSDDD implementation obligation deleted. National law (here, German law) may add obligations on top of this floor — notably German corporate law on management board duties and potentially national transposition variations. The final advice integrates EU and national analysis.',
        whyItMatters:
          'The Path C-ii approach is methodologically sound and will be the standard in practice. For a German company, the German Umwelthaftungsgesetz, AktG fiduciary duties, and the national transposition of the CSRD all interact with the EU framework. Getting the EU baseline right is the precondition for accurate national law advice.',
        legalBasis:
          'Art. 19a(2)(a)(iii), Directive 2013/34/EU; Art. 22 deleted; national transposition varies — German CSRD transposition pending final implementation',
        nextNode: 'final-sl1',
      },
    },
    finalResult: {
      id: 'final-sl1',
      required:
        'EuroMed AG MUST disclose in its CSRD sustainability report: (1) any plans for 1.5°C GHG compatibility under Art. 19a(2)(a)(iii); and (2) GHG reduction targets and progress against them under Art. 19a(2)(b). Accurate disclosure of non-implementation is itself a legal obligation.',
      notRequired:
        'Implement the transition plan. Art. 22 CSDDD was deleted in its entirety by Art. 4(16) Directive (EU) 2026/470. There is no EU obligation to adopt, implement, update, or achieve the targets in a disclosed transition plan. Failure to achieve disclosed GHG targets does not create EU-level legal liability.',
      structuralTension:
        'EuroMed AG must publicly disclose a transition plan and report annually on progress against GHG targets — under obligations that remain fully in force. It has no EU legal obligation to execute those plans or achieve those targets. A company can lawfully disclose ambitious climate commitments, fail to pursue them, and have no EU legal liability — provided the failure is accurately disclosed. The CSRD creates the accountability mechanism. Omnibus I removed the enforcement mechanism.',
    },
  },

  // ── Sub-Level 2: Scope Gap ───────────────────────────────────────────
  {
    id: 'sl2',
    title: 'Sub-Level 2: The Scope Gap',
    tension: 'CSRD mandates disclosure of supply chain adverse impacts regardless of CSDDD scope. EuroMed AG must disclose harms it has no EU obligation to prevent or remedy.',
    legalContext:
      'Art. 19a(2)(f)(ii) CSRD requires companies to disclose material adverse impacts on people and the environment in their value chain — regardless of whether the company is within CSDDD scope. Post-Omnibus CSDDD applies only to companies with >5,000 employees AND >EUR 1.5bn turnover. EuroMed AG (1,200 employees, EUR 500m turnover) is outside CSDDD scope. CSDDD Arts. 8, 10, and 11 (identification, prevention, and remediation of adverse impacts) do not apply to EuroMed AG.',
    situation:
      'EuroMed AG\'s sustainability report discloses adverse labour conditions at a Tier 2 supplier in Bangladesh: a garment manufacturer where workers have reported excessive overtime, wage theft, and unsafe conditions. The disclosure was made under Art. 19a(2)(f)(ii) CSRD as a material adverse impact. EuroMed AG\'s Chief Sustainability Officer has received a letter from a Dutch NGO asking what EuroMed AG intends to do to address the conditions, stating that the company\'s own report demonstrates knowledge of the harm.',
    situationRole: 'General Counsel, EuroMed AG',
    entryNode: 'node-2.1',
    nodes: {
      'node-2.1': {
        id: 'node-2.1',
        label: 'Node 2.1',
        question:
          'The CSO asks for a legal assessment. What are EuroMed AG\'s legal obligations regarding the disclosed adverse conditions at its Tier 2 supplier?',
        options: [
          {
            id: '2.1-A',
            text: 'EuroMed AG has CSDDD due diligence obligations: the CSRD disclosure of the adverse impact triggers the investigation and prevention obligations under CSDDD Arts. 8 and 10.',
            nextNode: 'node-2.2A',
          },
          {
            id: '2.1-B',
            text: 'EuroMed AG has CSRD disclosure obligations only. It is outside CSDDD scope and the due diligence obligations (investigation, prevention, remediation) do not apply.',
            nextNode: 'node-2.2B',
          },
          {
            id: '2.1-C',
            text: 'It depends on whether the Bangladesh supplier falls within EuroMed AG\'s "chain of activities" — the CSDDD scope analysis depends on the nature of the business relationship.',
            nextNode: 'node-2.2C',
          },
        ],
      },
      'node-2.2A': {
        id: 'node-2.2A',
        label: 'Node 2.2A — Path A',
        question:
          'You advise that CSRD disclosure triggers CSDDD obligations. The CSO asks you to confirm which post-Omnibus CSDDD threshold EuroMed AG meets.',
        options: [
          {
            id: '2.2A-i',
            text: 'EuroMed AG meets the post-Omnibus CSDDD threshold of >1,000 employees AND >EUR 450m turnover.',
            nextNode: 'outcome-2A-i',
          },
          {
            id: '2.2A-ii',
            text: 'On reflection, the post-Omnibus CSDDD threshold is >5,000 employees AND >EUR 1.5bn turnover. EuroMed AG does not meet this threshold. The initial analysis was incorrect.',
            nextNode: 'outcome-2A-ii',
          },
        ],
      },
      'node-2.2B': {
        id: 'node-2.2B',
        label: 'Node 2.2B — Path B',
        question:
          'You correctly advise that EuroMed AG is outside CSDDD scope. The CSO asks whether the CSRD disclosure was therefore voluntary or mandatory.',
        options: [
          {
            id: '2.2B-i',
            text: 'The disclosure was voluntary — EuroMed AG chose to include it to demonstrate transparency, but was not legally required to.',
            nextNode: 'outcome-2B-i',
          },
          {
            id: '2.2B-ii',
            text: 'The disclosure was mandatory under Art. 19a(2)(f)(ii) CSRD. EuroMed AG was required to disclose material adverse impacts in its value chain regardless of CSDDD scope. The Scope Gap means the company discloses harms it is not required to address.',
            nextNode: 'outcome-2B-ii',
          },
        ],
      },
      'node-2.2C': {
        id: 'node-2.2C',
        label: 'Node 2.2C — Path C',
        question:
          'You focus on the "chain of activities" concept. How does this affect the scope analysis for EuroMed AG?',
        options: [
          {
            id: '2.2C-i',
            text: 'If the Bangladesh supplier falls within EuroMed AG\'s chain of activities, it brings EuroMed AG within CSDDD scope — the chain of activities analysis determines whether CSDDD applies.',
            nextNode: 'outcome-2C-i',
          },
          {
            id: '2.2C-ii',
            text: 'The "chain of activities" concept governs CSDDD coverage — which suppliers must be assessed once a company is in scope. It does not determine whether the company itself is in CSDDD scope. Scope is determined by employee/turnover thresholds. EuroMed AG fails those thresholds.',
            nextNode: 'outcome-2C-ii',
          },
        ],
      },
      'outcome-2A-i': {
        id: 'outcome-2A-i',
        type: 'outcome',
        label: 'Outcome 2A-i',
        quality: 'incorrect',
        qualityLabel: 'Legally Incorrect — Pre/Post-Omnibus Threshold Confusion',
        legalPosition:
          'This is incorrect on two levels. First, the threshold cited (>1,000 employees AND >EUR 450m) is the pre-Omnibus CSDDD threshold — it was replaced by Art. 4(2) Directive (EU) 2026/470 (>5,000 employees AND >EUR 1.5bn). Second, even on the pre-Omnibus threshold, advising that CSRD disclosure triggers CSDDD obligations conflates two separate legal frameworks with independent scope rules. CSDDD obligations are triggered by meeting the CSDDD scope threshold, not by CSRD disclosures.',
        whyItMatters:
          'This outcome shows two distinct errors appearing in sequence: a substantive error (CSRD triggers CSDDD) compounded by a threshold confusion (applying the pre-Omnibus rather than post-Omnibus CSDDD scope). Both errors would lead to incorrect advice that EuroMed AG faces obligations it does not have — potentially prompting unnecessary and costly due diligence interventions.',
        legalBasis:
          'Art. 4(2), Directive (EU) 2026/470 (Omnibus I); Art. 2(1), Directive (EU) 2024/1760 consolidated 18.03.2026',
        nextNode: 'final-sl2',
      },
      'outcome-2A-ii': {
        id: 'outcome-2A-ii',
        type: 'outcome',
        label: 'Outcome 2A-ii',
        quality: 'correction',
        qualityLabel: 'Self-Correction — Appropriate Professional Response',
        legalPosition:
          'You identified the threshold confusion and self-corrected. The post-Omnibus CSDDD threshold is >5,000 employees AND >EUR 1.5bn turnover. EuroMed AG (1,200 employees, EUR 500m turnover) is entirely outside CSDDD scope. The initial advice that CSRD disclosure triggers CSDDD obligations was doubly incorrect: wrong on scope AND wrong on the legal relationship between the two frameworks.',
        whyItMatters:
          'Threshold errors are among the most common and consequential mistakes in post-Omnibus compliance advice. Applying pre-Omnibus thresholds to post-Omnibus situations creates fictitious obligations. Self-correcting when this is identified is the right professional response.',
        legalBasis:
          'Art. 4(2), Directive (EU) 2026/470; Art. 2(1), Directive (EU) 2024/1760 consolidated 18.03.2026',
        nextNode: 'final-sl2',
      },
      'outcome-2B-i': {
        id: 'outcome-2B-i',
        type: 'outcome',
        label: 'Outcome 2B-i',
        quality: 'partial',
        qualityLabel: 'Partially Correct but Incomplete',
        legalPosition:
          'The scope analysis is correct — EuroMed AG has no CSDDD obligations. However, the characterisation of the disclosure as voluntary is incorrect. Art. 19a(2)(f)(ii) CSRD mandates disclosure of material adverse impacts in the value chain regardless of CSDDD scope. EuroMed AG was legally required to disclose the adverse conditions in Bangladesh. The disclosure was not a transparency choice — it was a statutory obligation.',
        whyItMatters:
          'Mischaracterising a mandatory disclosure as voluntary has significant practical consequences. It may cause the company to believe it could have chosen not to disclose — potentially influencing future disclosure decisions. It also fails to explain the structural tension: the company is required by law to report harms it is not required to address.',
        legalBasis:
          'Art. 19a(2)(f)(ii), Directive 2013/34/EU (mandatory disclosure of material value chain impacts)',
        nextNode: 'final-sl2',
      },
      'outcome-2B-ii': {
        id: 'outcome-2B-ii',
        type: 'outcome',
        label: 'Outcome 2B-ii',
        quality: 'best',
        qualityLabel: 'Legally Accurate and Complete — Best Outcome',
        legalPosition:
          'This advice correctly identifies the full legal structure. EuroMed AG is outside CSDDD scope and has no due diligence obligations regarding the Bangladesh supplier. The CSRD disclosure was mandatory — Art. 19a(2)(f)(ii) requires disclosure of material adverse impacts in the value chain. The result is the Scope Gap: EuroMed AG must disclose known supply chain harms; EU law does not require it to investigate, prevent, or remedy those harms.',
        whyItMatters:
          'The Scope Gap is the most practically significant structural tension in the post-Omnibus framework. Companies between the CSRD and CSDDD thresholds (like EuroMed AG) will produce CSRD reports that are, in effect, registers of known supply chain harms with no corresponding obligation to act. This advice correctly explains the legal position, which also has direct implications for the reputational risk the NGO letter creates.',
        legalBasis:
          'Art. 19a(2)(f)(ii), Directive 2013/34/EU (mandatory disclosure); Arts. 8, 10, 11, Directive (EU) 2024/1760 (not applicable — EuroMed AG outside CSDDD scope)',
        nextNode: 'final-sl2',
      },
      'outcome-2C-i': {
        id: 'outcome-2C-i',
        type: 'outcome',
        label: 'Outcome 2C-i',
        quality: 'incorrect',
        qualityLabel: 'Legally Incorrect — Scope vs Coverage Confusion',
        legalPosition:
          'This confuses CSDDD scope (which companies are subject to the Directive) with CSDDD coverage (which suppliers must be assessed by an in-scope company). The "chain of activities" concept in CSDDD Art. 3(g) defines the upstream and downstream operations that an in-scope company must assess. It does not determine whether the company itself is in scope. Company scope is determined by employee and turnover thresholds alone. A Tier 2 supplier in Bangladesh cannot bring EuroMed AG within CSDDD scope.',
        whyItMatters:
          'This is a structural error that would fundamentally misallocate compliance obligations. If coverage analysis could bring companies into CSDDD scope, any company with a large supply chain could face obligations regardless of their own size. This contradicts the text and purpose of CSDDD Art. 2.',
        legalBasis:
          'Art. 2(1) (scope thresholds), Art. 3(g) (chain of activities definition), Directive (EU) 2024/1760 consolidated 18.03.2026',
        nextNode: 'final-sl2',
      },
      'outcome-2C-ii': {
        id: 'outcome-2C-ii',
        type: 'outcome',
        label: 'Outcome 2C-ii',
        quality: 'best',
        qualityLabel: 'Legally Accurate and Complete — Best Outcome',
        legalPosition:
          'This correctly distinguishes scope from coverage. CSDDD scope (Art. 2) is determined by employee/turnover thresholds. Coverage (Art. 3(g) chain of activities) only becomes relevant for companies already within scope — it defines which supply chain relationships must be assessed. EuroMed AG fails the scope thresholds. The chain of activities question never arises. The analysis then correctly proceeds to the CSRD disclosure obligation.',
        whyItMatters:
          'The scope/coverage distinction is critical in post-Omnibus CSDDD advice. Many practitioners conflate them. A correct analysis prevents both over-compliance (assuming CSDDD obligations apply when they do not) and under-compliance (assuming CSRD disclosure obligations are optional because CSDDD does not apply).',
        legalBasis:
          'Art. 2(1), Art. 3(g), Directive (EU) 2024/1760 consolidated 18.03.2026; Art. 19a(2)(f)(ii), Directive 2013/34/EU',
        nextNode: 'final-sl2',
      },
    },
    finalResult: {
      id: 'final-sl2',
      required:
        'EuroMed AG MUST disclose material adverse impacts in its value chain — including the Bangladesh supplier conditions — under Art. 19a(2)(f)(ii) CSRD. This obligation applies regardless of CSDDD scope. The disclosure was not a transparency choice; it was a statutory obligation. EuroMed AG must continue to disclose these conditions accurately in future reports.',
      notRequired:
        'Investigate, prevent, or remediate the adverse labour conditions at the Bangladesh supplier. CSDDD Arts. 8, 10, and 11 (identification, prevention, and remediation of adverse impacts) do not apply. EuroMed AG has 1,200 employees and EUR 500m turnover — well below the post-Omnibus CSDDD thresholds of >5,000 employees AND >EUR 1.5bn. The CSRD disclosure obligation is independent of the CSDDD due diligence obligations.',
      structuralTension:
        'EuroMed AG\'s CSRD sustainability report is, in effect, a statutory register of known supply chain harms. The company is legally required to identify and disclose those harms. EU law does not require it to do anything about them. The Scope Gap means that for the ~5,000 companies between the CSRD and CSDDD thresholds, transparency obligations exist without corresponding action obligations. The disclosed conditions become evidence — usable in national law claims — without creating any EU-level obligation to prevent or remedy them.',
    },
  },

  // ── Sub-Level 3: Civil Liability Fragmentation ──────────────────────
  {
    id: 'sl3',
    title: 'Sub-Level 3: Civil Liability Fragmentation',
    tension: 'Art. 29(1) CSDDD harmonised liability standard deleted. Rome II Art. 4(1) directs claims to host-state law. 27 national systems now govern supply chain liability.',
    legalContext:
      'Pre-Omnibus Art. 29(1) CSDDD created a harmonised EU civil liability standard for CSDDD breaches. Art. 29(7) overrode Rome II to direct claims to EU Member State courts. Art. 29(3)(d) granted standing to representative bodies. Omnibus I deleted Art. 29(1), Art. 29(7), and Art. 29(3)(d). What remains: Art. 29(2) — a "full compensation" guarantee conditional on national law first establishing liability. Civil liability is now determined by national law, typically the law of the country where damage occurred under Rome II Art. 4(1).',
    situation:
      'A Bangladeshi garment worker was severely injured at the Tier 2 supplier disclosed in EuroMed AG\'s CSRD report. A Dutch trade union has filed a civil claim in the Amsterdam District Court on behalf of the worker. The claim argues that EuroMed AG\'s own CSRD report demonstrates it had knowledge of the unsafe conditions. EuroMed AG\'s litigation team asks you to identify the applicable legal framework for the liability analysis.',
    situationRole: 'Head of Litigation, EuroMed AG',
    entryNode: 'node-3.1',
    nodes: {
      'node-3.1': {
        id: 'node-3.1',
        label: 'Node 3.1',
        question:
          'What legal framework governs the civil liability analysis for the claim brought by the Dutch trade union on behalf of the Bangladeshi worker?',
        options: [
          {
            id: '3.1-A',
            text: 'Art. 29(1) CSDDD — the harmonised EU standard still applies. The Dutch court will assess intentional or negligent breach of CSDDD obligations + causation.',
            nextNode: 'node-3.2A',
          },
          {
            id: '3.1-B',
            text: 'National law under Rome II Regulation — Art. 29(1) was deleted. The applicable law is determined by Rome II, which typically directs to the law of the country where damage occurred.',
            nextNode: 'node-3.2B',
          },
          {
            id: '3.1-C',
            text: 'The CSRD disclosure creates a cause of action — EuroMed AG\'s own report demonstrates knowledge, which is sufficient to establish liability under Dutch tort law.',
            nextNode: 'node-3.2C',
          },
        ],
      },
      'node-3.2A': {
        id: 'node-3.2A',
        label: 'Node 3.2A — Path A',
        question:
          'You rely on Art. 29(1) CSDDD. Opposing counsel produces the Official Journal of the EU showing Directive (EU) 2026/470. What is your response?',
        options: [
          {
            id: '3.2A-i',
            text: 'Art. 29(1) entered into force before the claim arose — the pre-Omnibus standard should apply by analogy.',
            nextNode: 'outcome-3A-i',
          },
          {
            id: '3.2A-ii',
            text: 'You concede the point. Art. 29(1) was deleted by Art. 4(22) Directive (EU) 2026/470, effective 18 March 2026. The analysis must proceed under national law via Rome II.',
            nextNode: 'outcome-3A-ii',
          },
        ],
      },
      'node-3.2B': {
        id: 'node-3.2B',
        label: 'Node 3.2B — Path B',
        question:
          'You correctly identify Rome II as the gateway. Under Rome II Art. 4(1), which law applies to this claim?',
        options: [
          {
            id: '3.2B-i',
            text: 'Dutch law applies as the law of the forum — the claim was brought in Amsterdam and Art. 29(2) CSDDD guarantees full compensation under Dutch law.',
            nextNode: 'outcome-3B-i',
          },
          {
            id: '3.2B-ii',
            text: 'Bangladeshi law applies under Rome II Art. 4(1) lex loci damni — the damage occurred in Bangladesh. Art. 29(7) which would have redirected to EU Member State law was deleted. Art. 29(2) only provides full compensation where Bangladeshi law first establishes liability.',
            nextNode: 'outcome-3B-ii',
          },
        ],
      },
      'node-3.2C': {
        id: 'node-3.2C',
        label: 'Node 3.2C — Path C',
        question:
          'You argue CSRD disclosure creates a cause of action. The court asks you to identify the specific legal basis for this proposition.',
        options: [
          {
            id: '3.2C-i',
            text: 'CSRD Art. 19a creates an implicit civil liability mechanism — companies that disclose known harms are legally accountable for those harms under CSRD itself.',
            nextNode: 'outcome-3C-i',
          },
          {
            id: '3.2C-ii',
            text: 'You withdraw the argument. CSRD creates disclosure obligations only — it does not create causes of action. However, the CSRD disclosure can be used as evidence of knowledge in a claim brought under national tort law (as determined by Rome II).',
            nextNode: 'outcome-3C-ii',
          },
        ],
      },
      'outcome-3A-i': {
        id: 'outcome-3A-i',
        type: 'outcome',
        label: 'Outcome 3A-i',
        quality: 'incorrect',
        qualityLabel: 'Legally Incorrect — Applying Deleted Provision',
        legalPosition:
          'There is no legal basis for applying Art. 29(1) by analogy after its deletion. Directives do not operate on analogy principles after legislative amendment. Art. 4(22) Directive (EU) 2026/470 deleted Art. 29(1) with effect from 18 March 2026. The effective date of the claim is after this date. A Dutch court would apply the current law, not the pre-amendment version. This argument would almost certainly be rejected at first instance.',
        whyItMatters:
          'This error arises from wishful legal reasoning — applying a provision that no longer exists because the pre-amendment standard was more favourable to the client\'s position (here, the claimant). Courts apply current law. The deletion of Art. 29(1) has immediate effect for claims arising after 18 March 2026.',
        legalBasis:
          'Art. 4(22), Directive (EU) 2026/470 (Omnibus I), effective 18 March 2026; general principles of EU legislative amendment',
        nextNode: 'final-sl3',
      },
      'outcome-3A-ii': {
        id: 'outcome-3A-ii',
        type: 'outcome',
        label: 'Outcome 3A-ii',
        quality: 'correction',
        qualityLabel: 'Self-Correction — Appropriate Professional Response',
        legalPosition:
          'Conceding the point when confronted with clear legislative evidence is the correct professional response. Art. 29(1) was deleted. The analysis proceeds under Rome II. This self-correction, while appropriate, still leaves the full Rome II analysis to be completed — particularly which national law applies and what Art. 29(2) actually provides.',
        whyItMatters:
          'In adversarial litigation, maintaining an argument based on a deleted provision after it has been disproved wastes court time and damages counsel credibility. Prompt correction and redirection to the correct legal framework is professionally appropriate.',
        legalBasis:
          'Art. 4(22), Directive (EU) 2026/470; Regulation (EC) 864/2007 (Rome II), Art. 4(1)',
        nextNode: 'final-sl3',
      },
      'outcome-3B-i': {
        id: 'outcome-3B-i',
        type: 'outcome',
        label: 'Outcome 3B-i',
        quality: 'partial',
        qualityLabel: 'Partially Correct but Legally Imprecise',
        legalPosition:
          'The Rome II identification is correct — you are right that national law governs. However, two errors follow. First, Rome II Art. 4(1) directs to the law of the country where damage occurred (lex loci damni), which is Bangladesh, not the Netherlands. The forum is the Netherlands, but forum law does not apply under Art. 4(1) unless an exception is engaged. Second, Art. 29(2) CSDDD does not guarantee compensation under Dutch law — it guarantees full compensation as a remedy only where national law (here, Bangladeshi law) first establishes liability.',
        whyItMatters:
          'Forum = applicable law is the most common Rome II error in practice. It leads to fundamentally incorrect choice-of-law analysis. The deletion of Art. 29(7) (which would have directed claims to EU Member State courts) means the lex loci damni rule applies in full — and for supply chain claims, the damage almost always occurred in the Global South.',
        legalBasis:
          'Art. 4(1), Regulation (EC) 864/2007 (Rome II) — lex loci damni; Art. 29(2), Directive (EU) 2024/1760 consolidated 18.03.2026; Art. 4(22), Directive (EU) 2026/470 deleting Art. 29(7)',
        nextNode: 'final-sl3',
      },
      'outcome-3B-ii': {
        id: 'outcome-3B-ii',
        type: 'outcome',
        label: 'Outcome 3B-ii',
        quality: 'best',
        qualityLabel: 'Legally Accurate and Complete — Best Outcome',
        legalPosition:
          'This is the correct and complete analysis. Rome II Art. 4(1) lex loci damni rule applies — the damage occurred in Bangladesh, so Bangladeshi law governs liability. Art. 29(7) CSDDD, which would have overridden this to direct claims to EU Member State law, was deleted by Omnibus I. Art. 29(2) provides only a conditional guarantee: full compensation where Bangladeshi law first establishes liability. The claim must succeed under Bangladeshi tort law before Art. 29(2) becomes relevant.',
        whyItMatters:
          'This outcome fully captures the Civil Liability Fragmentation: 27 national systems now govern supply chain liability; the lex loci damni rule directs most supply chain harm claims to the law of host states in the Global South; and Art. 29(2) is a remedy guarantee, not a liability creation mechanism. This is the most practically significant structural consequence of Omnibus I for access to justice.',
        legalBasis:
          'Art. 4(1), Regulation (EC) 864/2007 (Rome II); Art. 29(2) retained, Art. 29(1), (3)(d), (7) deleted by Art. 4(22), Directive (EU) 2026/470; Rühl (2021) SSRN 3708196; Rühl (2022) SSRN 4024604',
        nextNode: 'final-sl3',
      },
      'outcome-3C-i': {
        id: 'outcome-3C-i',
        type: 'outcome',
        label: 'Outcome 3C-i',
        quality: 'incorrect',
        qualityLabel: 'Legally Incorrect — CSRD is Not a Liability Instrument',
        legalPosition:
          'There is no civil liability mechanism in CSRD. Directive 2013/34/EU creates reporting obligations — it does not create causes of action, substantive duties of care, or remedies. There is no basis in the Directive for an "implicit civil liability mechanism." This argument would be rejected at first instance and could expose litigation counsel to professional criticism.',
        whyItMatters:
          'Conflating transparency law (CSRD) with liability law is a fundamental category error. CSRD creates the evidentiary record — it does not generate the claim. The correct use of CSRD disclosure in litigation is as evidence of knowledge in a national tort claim, not as the cause of action itself.',
        legalBasis:
          'Directive 2013/34/EU (disclosure obligations only); CSRD Art. 19a creates no causes of action; cf. general principles of EU Directives: they bind Member States, not individuals directly, unless precisely and unconditionally formulated — CSRD does not meet this standard for private liability',
        nextNode: 'final-sl3',
      },
      'outcome-3C-ii': {
        id: 'outcome-3C-ii',
        type: 'outcome',
        label: 'Outcome 3C-ii',
        quality: 'best',
        qualityLabel: 'Legally Accurate and Complete — Best Outcome',
        legalPosition:
          'Correct on both points. CSRD creates no cause of action — withdrawing this argument is right. However, the CSRD disclosure demonstrating EuroMed AG\'s knowledge of the conditions is highly relevant as evidence in a national tort claim. Under Bangladeshi tort law (applicable via Rome II Art. 4(1)), the CSRD sustainability report could be used to establish knowledge as an element of a negligence claim. CSRD is the evidentiary bridge, not the legal foundation.',
        whyItMatters:
          'The CSRD-as-evidence role is an important practical consequence of the Scope Gap and Civil Liability Fragmentation. While CSRD does not create EU liability, the mandatory disclosure of supply chain harms creates a documentary record that supports national law claims. This is what remains of supply chain accountability in the post-Omnibus framework for companies below the CSDDD threshold.',
        legalBasis:
          'Art. 19a(2)(f)(ii), Directive 2013/34/EU (disclosure as evidence, not cause of action); Art. 4(1), Regulation (EC) 864/2007 (Rome II); national tort law principles (Bangladeshi law via lex loci damni)',
        nextNode: 'final-sl3',
      },
    },
    finalResult: {
      id: 'final-sl3',
      required:
        'The applicable law is determined by Rome II Art. 4(1) lex loci damni. Damage occurred in Bangladesh, so Bangladeshi law governs liability. The Dutch court applies Bangladeshi tort law. EuroMed AG\'s CSRD sustainability report can be used as evidence of knowledge of the adverse conditions in a Bangladeshi law negligence claim. If Bangladeshi law establishes liability, Art. 29(2) CSDDD then guarantees full compensation as a remedy.',
      notRequired:
        'There is no EU-level civil liability standard. Art. 29(1) CSDDD — the harmonised standard — was deleted by Art. 4(22) Directive (EU) 2026/470, effective 18 March 2026. Art. 29(7) — which redirected supply chain claims to EU Member State law — was also deleted. Art. 29(3)(d) — representative action standing — was deleted. CSRD creates no cause of action. The claim must be founded in and succeed under Bangladeshi national tort law.',
      structuralTension:
        'The deletion of Art. 29(1) and Art. 29(7) means that supply chain civil liability is now fragmented across 27 national legal systems. Rome II Art. 4(1) directs most supply chain harm claims to the law of host states in the Global South — jurisdictions with varying judicial capacity, enforcement infrastructure, and substantive tort standards. Art. 29(2)\'s "full compensation guarantee" is conditional: it only operates where national law (typically host-state law) first establishes liability. The harmonised EU standard has been replaced by a patchwork with no guaranteed minimum floor for claimants.',
    },
  },
]

export default scenario
