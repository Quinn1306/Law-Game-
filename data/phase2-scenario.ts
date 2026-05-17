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
    tension: 'CSRD mandates disclosure of environmental adverse impacts in the value chain regardless of CSDDD scope. EuroMed AG must disclose environmental harms it has no EU obligation to investigate, prevent or remedy.',
    legalContext:
      'Pre-Omnibus: CSRD captured ~50,000 companies (large undertakings exceeding two of three size criteria). CSDDD captured ~5,000–6,000 companies (>1,000 employees AND >EUR 450m turnover). Companies between the thresholds had CSRD disclosure obligations about supply chain adverse impacts but no CSDDD due diligence obligations. Post-Omnibus: CSRD captures ~5,000 companies (>1,000 employees AND >EUR 450m). CSDDD captures ~900–1,000 companies (>5,000 employees AND >EUR 1.5bn). EuroMed AG (1,200 employees, EUR 500m) is in CSRD scope but outside CSDDD scope. Art. 19a(2)(f)(ii) CSRD requires disclosure of value chain adverse environmental impacts regardless of CSDDD scope. CSDDD Arts. 8, 10, and 11 do not apply to EuroMed AG.',
    situation:
      'A European environmental NGO that monitors corporate supply chain impacts has written to EuroMed AG. The letter states that EuroMed AG\'s 2025 CSRD report disclosed that its Tier 2 supplier in Bangladesh has been discharging toxic waste into a local river, contaminating the water supply of surrounding communities. The NGO asks: (1) what steps is EuroMed AG legally required to take to address this environmental damage; and (2) what legal framework governs EuroMed AG\'s obligations regarding the affected communities. You are advising EuroMed AG\'s legal team on how to respond.',
    situationRole: 'General Counsel, EuroMed AG',
    entryNode: 'node-2.1',
    nodes: {
      'node-2.1': {
        id: 'node-2.1',
        label: 'Node 2.1',
        question:
          'The board asks: what are EuroMed AG\'s legal obligations to investigate and address the environmental damage disclosed in its CSRD report?',
        options: [
          {
            id: '2.1-A',
            text: 'EuroMed AG must investigate and address the conditions under the CSDDD due diligence obligations — it is in scope because it disclosed the impacts in its CSRD report.',
            nextNode: 'node-2.2A',
          },
          {
            id: '2.1-B',
            text: 'EuroMed AG has no CSDDD due diligence obligations — it is outside the post-Omnibus CSDDD scope. Its only EU obligation is to accurately disclose what it knows under the CSRD.',
            nextNode: 'node-2.2B',
          },
          {
            id: '2.1-C',
            text: 'EuroMed AG\'s obligations depend on whether the Tier 2 supplier is a \'business partner\' within the chain of activities — which requires a threshold analysis.',
            nextNode: 'node-2.2C',
          },
        ],
      },
      'node-2.2A': {
        id: 'node-2.2A',
        label: 'Node 2.2A — Path A',
        question:
          'You advise that CSRD disclosure of adverse impacts triggers CSDDD due diligence obligations. The NGO asks for confirmation that EuroMed AG must take prevention and remediation steps.',
        options: [
          {
            id: '2.2A-i',
            text: 'Confirm to the NGO that EuroMed AG has CSDDD due diligence obligations and will investigate and address the environmental damage.',
            nextNode: 'outcome-2A-i',
          },
          {
            id: '2.2A-ii',
            text: 'Reconsider — the advice may be based on a confusion between the old and new CSDDD scope.',
            nextNode: 'outcome-2A-ii',
          },
        ],
      },
      'node-2.2B': {
        id: 'node-2.2B',
        label: 'Node 2.2B — Path B',
        question:
          'You correctly identify that EuroMed AG is outside CSDDD scope. The NGO asks: if EuroMed AG has no legal obligation to address this environmental damage, why does its CSRD report disclose it in such detail?',
        options: [
          {
            id: '2.2B-i',
            text: 'Explain that the CSRD requires disclosure of value chain adverse impacts regardless of whether the company is required to address them — this is the scope gap created by Omnibus I.',
            nextNode: 'outcome-2B-i',
          },
          {
            id: '2.2B-ii',
            text: 'Advise the NGO that the disclosure was voluntary and that EuroMed AG has no obligations of any kind regarding the Tier 2 supplier.',
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
            text: 'The Tier 2 supplier is upstream in the chain of activities under Art. 3(1)(g) CSDDD, so CSDDD obligations extend to it — meaning EuroMed AG does have due diligence obligations.',
            nextNode: 'outcome-2C-i',
          },
          {
            id: '2.2C-ii',
            text: 'The chain of activities analysis is relevant to which business partners are covered by CSDDD obligations — but EuroMed AG first needs to establish whether it is in CSDDD scope at all, which it is not.',
            nextNode: 'outcome-2C-ii',
          },
        ],
      },
      'outcome-2A-i': {
        id: 'outcome-2A-i',
        type: 'outcome',
        label: 'Outcome 2A-i',
        quality: 'incorrect',
        qualityLabel: 'Legally Incorrect — High Risk',
        legalPosition:
          'This advice is wrong and creates significant legal and reputational risk for EuroMed AG. The CSDDD scope after Omnibus I requires more than 5,000 employees AND more than EUR 1.5 billion net worldwide turnover (Art. 2(1)(a) as replaced by Directive (EU) 2026/470). EuroMed AG has 1,200 employees and EUR 500m turnover. It is outside CSDDD scope. CSRD disclosure of adverse impacts does not bring a company into CSDDD scope. The two instruments have entirely independent scope thresholds. Advising EuroMed AG that it has CSDDD obligations it does not have exposes the company to unnecessary compliance costs and creates a false representation to the NGO that could bind the company to commitments it cannot subsequently resile from.',
        whyItMatters:
          'The error here illustrates a critical point about how CSRD disclosure relates to CSDDD scope. Disclosure of adverse impacts under the CSRD does not bring a company into CSDDD scope. A company discloses under the CSRD because it meets the Art. 19a(1) threshold. It falls within CSDDD scope only if it meets the Art. 2(1)(a) threshold. These are different legal tests applied independently. The fact that a company has disclosed supply chain adverse impacts is irrelevant to whether it is a company covered by the CSDDD.',
        legalBasis:
          'Art. 2(1)(a) as replaced by Art. 4(2)(a)(i), Directive (EU) 2026/470: >5,000 employees AND >EUR 1.5bn turnover required; EuroMed AG does not meet either threshold',
        nextNode: 'final-sl2',
      },
      'outcome-2A-ii': {
        id: 'outcome-2A-ii',
        type: 'outcome',
        label: 'Outcome 2A-ii',
        quality: 'correction',
        qualityLabel: 'Self-Correction — Appropriate Professional Response',
        legalPosition:
          'Recognising that the initial advice may be based on a confusion between the pre-Omnibus and post-Omnibus CSDDD scope is the correct professional response. The pre-Omnibus CSDDD threshold was >1,000 employees AND >EUR 450m (which EuroMed AG met). The post-Omnibus threshold is >5,000 employees AND >EUR 1.5bn (which EuroMed AG does not meet). A legal adviser who identifies a potential error in their own analysis and corrects it before it reaches the client is acting professionally and preventing serious harm. The corrected advice is in Path B.',
        whyItMatters:
          'Professional self-correction before giving wrong advice to a client is an important skill in EU regulatory practice. In an area that has changed as rapidly as corporate sustainability law, the risk of applying outdated thresholds is high. The pre-Omnibus CSDDD threshold would have caught EuroMed AG — which is why the confusion is plausible. But Directive (EU) 2026/470 raised both thresholds significantly. A legal professional advising on CSDDD scope must verify the current thresholds against the post-Omnibus consolidated text.',
        legalBasis:
          'Art. 2(1)(a) as replaced by Art. 4(2)(a)(i), Directive (EU) 2026/470; Art. 2(1)(a), Directive (EU) 2024/1760 (original)',
        nextNode: 'final-sl2',
      },
      'outcome-2B-i': {
        id: 'outcome-2B-i',
        type: 'outcome',
        label: 'Outcome 2B-i',
        quality: 'best',
        qualityLabel: 'Legally Accurate — Best Outcome',
        legalPosition:
          'This is the correct advice. Art. 19a(2)(f)(ii) of Directive 2013/34/EU requires CSRD-scope companies to disclose the principal actual or potential adverse impacts connected with their value chain, including supply chain. This obligation applies to EuroMed AG regardless of whether it is in CSDDD scope. The CSRD and CSDDD have independent scope thresholds. EuroMed AG is required to disclose what it knows about supply chain environmental conditions. It is not required by EU law to investigate, prevent or remediate those conditions because it is outside CSDDD scope. This is the structural tension: the disclosure obligation extends to all CSRD-scope companies but the action obligations only reach the approximately 900–1,000 companies in CSDDD scope. The convergence trajectory that was expected to close this gap has been reversed by Omnibus I — both thresholds were raised, widening rather than narrowing the gap.',
        whyItMatters:
          'This outcome identifies the core of Tension 2: the post-Omnibus framework creates a structural mismatch between disclosure obligations and action obligations. Before Omnibus I, the CSDDD was expected to expand toward the CSRD population through phased scope increases — Art. 36 CSDDD contained a review clause requiring the Commission to assess whether thresholds should be revised. Omnibus I moved in the opposite direction, raising both thresholds. The scope gap is now larger in proportional terms, not smaller. Companies like EuroMed AG must disclose supply chain adverse impacts they have no obligation to investigate or address. The CSRD report becomes a record of known harms rather than a record of addressed harms.',
        legalBasis:
          'Art. 19a(2)(f)(ii), Directive 2013/34/EU consolidated 18.03.2026 — unchanged; Art. 2(1)(a) as replaced: EuroMed AG outside CSDDD scope; Arts. 8, 10 and 11, Directive (EU) 2024/1760: due diligence obligations only apply to CSDDD-scope companies; Art. 36, Directive (EU) 2024/1760: convergence review clause unchanged but operating from higher baseline',
        nextNode: 'final-sl2',
      },
      'outcome-2B-ii': {
        id: 'outcome-2B-ii',
        type: 'outcome',
        label: 'Outcome 2B-ii',
        quality: 'incorrect',
        qualityLabel: 'Legally Inaccurate',
        legalPosition:
          'This advice is wrong on the facts. The disclosure in EuroMed AG\'s CSRD report was not voluntary — it was required by Art. 19a(2)(f)(ii) of Directive 2013/34/EU, which mandates disclosure of principal actual or potential adverse impacts in the value chain for all CSRD-scope companies. EuroMed AG had no choice but to disclose what it knew about the Tier 2 supplier\'s environmental impacts. Advising the NGO that the disclosure was voluntary misrepresents the legal framework and could damage EuroMed AG\'s credibility if the NGO investigates further. It also fails to advise EuroMed AG accurately about its continuing CSRD disclosure obligations in future reports.',
        whyItMatters:
          'The characterisation of CSRD disclosure as voluntary demonstrates a fundamental error. Art. 19a(2)(f)(ii) imposes a mandatory legal obligation to disclose principal actual or potential adverse impacts in the value chain for all CSRD-scope companies. EuroMed AG had no choice about whether to disclose the environmental impacts — it was legally required to do so. The distinction matters because it affects the credibility of the company\'s position with the NGO, with investors, and with supervisory authorities.',
        legalBasis:
          'Art. 19a(2)(f)(ii), Directive 2013/34/EU consolidated 18.03.2026: mandatory disclosure of value chain adverse impacts for CSRD-scope companies',
        nextNode: 'final-sl2',
      },
      'outcome-2C-i': {
        id: 'outcome-2C-i',
        type: 'outcome',
        label: 'Outcome 2C-i',
        quality: 'incorrect',
        qualityLabel: 'Legally Incorrect — Scope vs Coverage Confusion',
        legalPosition:
          'This advice confuses two separate legal questions: whether EuroMed AG is within CSDDD scope (a company-level threshold question) and whether a particular supplier would be covered by CSDDD due diligence if EuroMed AG were in scope (a coverage question). Art. 3(1)(g) CSDDD defines the chain of activities and is relevant to the second question. But it is irrelevant to the first. EuroMed AG must meet the Art. 2(1)(a) scope thresholds (>5,000 employees AND >EUR 1.5bn turnover) before any CSDDD obligations arise at all. It does not meet those thresholds. Whether the Tier 2 supplier is upstream in the chain of activities under Art. 3(1)(g) is therefore a question EuroMed AG does not need to answer.',
        whyItMatters:
          'The confusion between scope and coverage is analytically important and arises frequently in practice. Scope determines whether the CSDDD applies to a company at all — it is determined by Art. 2(1)(a) thresholds applied to the company itself. Coverage determines which business partners and activities fall within the due diligence obligations of a company already in scope — it is determined by Art. 3(1)(g). These are sequential questions. A company must be in scope before coverage becomes relevant.',
        legalBasis:
          'Art. 2(1)(a) as replaced: scope threshold must be met first; Art. 3(1)(g), Directive (EU) 2024/1760 (unchanged): relevant only to companies already in CSDDD scope',
        nextNode: 'final-sl2',
      },
      'outcome-2C-ii': {
        id: 'outcome-2C-ii',
        type: 'outcome',
        label: 'Outcome 2C-ii',
        quality: 'best',
        qualityLabel: 'Legally Accurate — Correct Sequencing',
        legalPosition:
          'This advice correctly sequences the legal analysis. The first question is always whether the company meets the CSDDD scope thresholds. EuroMed AG does not (1,200 employees, EUR 500m turnover — far below the post-Omnibus Art. 2(1)(a) thresholds of >5,000 employees AND >EUR 1.5bn turnover). If EuroMed AG were in CSDDD scope, the chain of activities analysis under Art. 3(1)(g) would then become relevant to determine which business partners are covered. A Tier 2 upstream supplier involved in the production of goods for EuroMed AG would fall within the upstream chain of activities under Art. 3(1)(g)(i). But that analysis only matters for companies already in CSDDD scope. EuroMed AG is not. The correct advice is therefore: EuroMed AG is outside CSDDD scope; it has CSRD disclosure obligations only.',
        whyItMatters:
          'Correct legal sequencing is a fundamental skill in regulatory law. The principle is: always establish whether the regulatory instrument applies to the entity before analysing the instrument\'s substantive requirements. In CSDDD analysis the sequence is: (1) does the company meet the Art. 2(1)(a) scope thresholds; (2) if yes, which business partners and activities fall within the chain of activities under Art. 3(1)(g); (3) if a specific business partner is within the chain, what due diligence steps are required under Arts. 8–16. Applying step (2) or (3) analysis to a company that fails step (1) is a waste of resources and risks creating incorrect legal advice.',
        legalBasis:
          'Art. 2(1)(a) as replaced: scope threshold analysis must precede coverage analysis; Art. 3(1)(g)(i), Directive (EU) 2024/1760 (unchanged): upstream chain of activities includes manufacture and supply',
        nextNode: 'final-sl2',
      },
    },
    finalResult: {
      id: 'final-sl2',
      required:
        'EuroMed AG MUST disclose principal actual or potential adverse environmental impacts in its value chain — including the toxic waste discharge by its Bangladesh supplier — under Art. 19a(2)(f)(ii) CSRD. This obligation applies regardless of CSDDD scope and is mandatory, not voluntary. EuroMed AG must also describe its due diligence process under Art. 19a(2)(f)(i) and accurately report on supply chain conditions in every future sustainability statement.',
      notRequired:
        'Investigate, prevent, or remediate the environmental damage caused by the Bangladesh supplier. CSDDD Arts. 8, 10, and 11 do not apply. EuroMed AG has 1,200 employees and EUR 500m turnover — well below the post-Omnibus CSDDD thresholds of >5,000 employees AND >EUR 1.5bn. EuroMed AG has no EU legal obligation to take any steps in response to the NGO\'s letter beyond accurate disclosure in future sustainability statements.',
      structuralTension:
        'EuroMed AG must publicly disclose supply chain adverse environmental impacts it has no EU legal obligation to investigate or address. The CSRD report becomes a record of known harms rather than a record of addressed harms. The convergence trajectory that was expected to close this gap — Art. 36 CSDDD\'s review clause — has been reversed by Omnibus I. Both thresholds were raised, widening rather than narrowing the gap between disclosure obligations and action obligations.',
    },
  },

  // ── Sub-Level 3: Civil Liability Fragmentation ──────────────────────
  {
    id: 'sl3',
    title: 'Sub-Level 3: Civil Liability Fragmentation',
    tension: 'Art. 29(1) CSDDD harmonised liability standard deleted by Omnibus I. EuroMed AG simultaneously lost CSDDD scope. Rome II Art. 4(1) directs environmental harm claims to host-state law. 27 national systems now govern supply chain civil liability.',
    legalContext:
      'Pre-Omnibus: Art. 29(1) CSDDD established a harmonised EU civil liability standard — a company could be held liable where it intentionally or negligently failed to comply with Arts. 10 and 11 and that failure caused damage. Art. 29(3)(d) granted standing to representative bodies including NGOs. Art. 29(7) made national liability rules apply as overriding mandatory provisions under Rome II. Post-Omnibus: Art. 29(1) deleted by Art. 4(20)(a), Art. 29(3)(d) deleted by Art. 4(20)(c), and Art. 29(7) deleted by Art. 4(20)(f) — all Directive (EU) 2026/470, effective 18 March 2026. What remains: Art. 29(2) — a "full compensation" guarantee conditional on national law first establishing liability. Important: EuroMed AG was within pre-Omnibus CSDDD scope (it met the original 1,000 employee / EUR 450m threshold). It lost CSDDD scope on 18 March 2026 when Omnibus I raised the threshold to 5,000 employees / EUR 1.5bn. Omnibus I therefore created the civil liability gap for EuroMed AG in two simultaneous ways: it removed EuroMed AG from CSDDD scope (so Arts. 10 and 11 no longer apply), and it deleted Art. 29(1) (so even CSDDD-scope companies no longer face a harmonised EU liability standard).',
    situation:
      'A Bangladeshi community member living near EuroMed AG\'s Tier 2 supplier facility has suffered documented harm — a serious illness caused by long-term consumption of water contaminated by the toxic discharge disclosed in EuroMed AG\'s 2025 CSRD report. A European environmental law NGO contacts EuroMed AG\'s legal team, stating it intends to bring a claim on behalf of the victim against EuroMed AG. It asks what legal framework applies and what the victim\'s prospects are. You are advising EuroMed AG\'s legal team on how to assess the legal position.',
    situationRole: 'Head of Litigation, EuroMed AG',
    entryNode: 'node-3.1',
    nodes: {
      'node-3.1': {
        id: 'node-3.1',
        label: 'Node 3.1',
        question:
          'The environmental NGO asks: what is the applicable legal framework for a civil claim against EuroMed AG for failure to address supply chain environmental harms?',
        options: [
          {
            id: '3.1-A',
            text: 'The harmonised CSDDD civil liability standard in Art. 29(1) applies — the victim can bring a claim based on EuroMed AG\'s failure to comply with CSDDD due diligence obligations.',
            nextNode: 'node-3.2A',
          },
          {
            id: '3.1-B',
            text: 'Art. 29(1) CSDDD has been deleted. Civil liability is governed by national law as determined under Rome II (Regulation (EC) 864/2007). Whether a claim succeeds depends on which national law applies and what that law provides.',
            nextNode: 'node-3.2B',
          },
          {
            id: '3.1-C',
            text: 'The victim\'s claim is based on EuroMed AG\'s CSRD disclosure, which confirmed awareness of the environmental damage — this creates a basis for claim under EU disclosure law.',
            nextNode: 'node-3.2C',
          },
        ],
      },
      'node-3.2A': {
        id: 'node-3.2A',
        label: 'Node 3.2A — Path A',
        question:
          'You advise that Art. 29(1) CSDDD still applies. The environmental NGO asks you to confirm the conditions for liability and the limitation period.',
        options: [
          {
            id: '3.2A-i',
            text: 'Confirm the three conditions under Art. 29(1): intentional or negligent failure, causation, and damage to protected legal interests. Confirm the five-year limitation period under Art. 29(3)(a).',
            nextNode: 'outcome-3A-i',
          },
          {
            id: '3.2A-ii',
            text: 'Reconsider the advice — Art. 29(1) may no longer be in force.',
            nextNode: 'outcome-3A-ii',
          },
        ],
      },
      'node-3.2B': {
        id: 'node-3.2B',
        label: 'Node 3.2B — Path B',
        question:
          'You correctly identify that the applicable framework is national law under Rome II. The environmental NGO asks: which national law applies and what does Art. 29(2) CSDDD provide?',
        options: [
          {
            id: '3.2B-i',
            text: 'Art. 29(2) CSDDD guarantees the victim full compensation once liability is established under applicable national law, and Rome II will designate the applicable national law.',
            nextNode: 'outcome-3B-i',
          },
          {
            id: '3.2B-ii',
            text: 'Art. 29(2) CSDDD only guarantees full compensation where national law already establishes liability — the NGO must first identify which national law applies under Rome II and whether that law imposes liability for supply chain environmental failures.',
            nextNode: 'outcome-3B-ii',
          },
        ],
      },
      'node-3.2C': {
        id: 'node-3.2C',
        label: 'Node 3.2C — Path C',
        question:
          'You advise that CSRD disclosure creates a legal basis for the claim. The environmental NGO asks you to explain how CSRD disclosure law creates civil liability.',
        options: [
          {
            id: '3.2C-i',
            text: 'Confirm that CSRD disclosure of awareness of adverse impacts creates an EU-level duty of care that supports a civil claim.',
            nextNode: 'outcome-3C-i',
          },
          {
            id: '3.2C-ii',
            text: 'Reconsider — the CSRD is a disclosure instrument and does not create civil liability. The advice needs to be corrected.',
            nextNode: 'outcome-3C-ii',
          },
        ],
      },
      'outcome-3A-i': {
        id: 'outcome-3A-i',
        type: 'outcome',
        label: 'Outcome 3A-i',
        quality: 'incorrect',
        qualityLabel: 'Legally Incorrect — Serious Error',
        legalPosition:
          'This advice is seriously wrong on two grounds. First, Art. 29(1) CSDDD was deleted in its entirety by Art. 4(20)(a) of Directive (EU) 2026/470, which entered into force on 18 March 2026. It no longer exists. The conditions for liability — intentional or negligent failure under Arts. 10 and 11, causation, protected legal interests — were the pre-Omnibus standard but are no longer operative EU law. The five-year limitation period in Art. 29(3)(a) is also deleted. Second, and separately, EuroMed AG lost CSDDD scope on 18 March 2026 when the threshold was raised to 5,000 employees / EUR 1.5bn turnover. Even if Art. 29(1) had survived, EuroMed AG would no longer be subject to Arts. 10 and 11 — which Art. 29(1) required to be breached. Both the liability standard and the underlying obligations it attached to have been removed simultaneously for EuroMed AG.',
        whyItMatters:
          'This outcome demonstrates the highest-risk error type in EU regulatory practice: advising on a legal provision that no longer exists. Art. 29(1) CSDDD was deleted on 18 March 2026. The three conditions for liability, the five-year limitation period, and the representative actions right were all part of that deleted provision or deleted alongside it. In a rapidly changing legislative environment, updating knowledge of what has been deleted is as important as knowing what was added.',
        legalBasis:
          'Art. 29(1) deleted by Art. 4(20)(a), Directive (EU) 2026/470; Art. 29(3)(a) limitation period also deleted; Art. 2(1)(a) as replaced: EuroMed AG no longer in CSDDD scope from 18 March 2026',
        nextNode: 'final-sl3',
      },
      'outcome-3A-ii': {
        id: 'outcome-3A-ii',
        type: 'outcome',
        label: 'Outcome 3A-ii',
        quality: 'correction',
        qualityLabel: 'Self-Correction — Appropriate Professional Response',
        legalPosition:
          'Identifying that Art. 29(1) may no longer be in force and reconsidering before confirming incorrect advice is the appropriate professional response. Art. 29(1) was deleted by Art. 4(20)(a) of Directive (EU) 2026/470. Additionally, EuroMed AG lost CSDDD scope on 18 March 2026. The correct analysis is in Path B.',
        whyItMatters:
          'Recognising that advice may be based on deleted law and reconsidering before confirming it is exactly the professional standard required. In EU corporate sustainability law post-Omnibus I, the risk of relying on pre-March 2026 knowledge is significant because multiple provisions were deleted simultaneously: Art. 22 (transition plans), Art. 29(1) (civil liability standard), Art. 29(3)(d) (representative actions), and Art. 29(7) (Rome II override). A legal adviser working in this area after 18 March 2026 must verify each provision against the post-Omnibus consolidated text.',
        legalBasis:
          'Art. 29(1) deleted by Art. 4(20)(a), Directive (EU) 2026/470; Art. 2(1)(a) as replaced by Art. 4(2)(a)(i), Directive (EU) 2026/470',
        nextNode: 'final-sl3',
      },
      'outcome-3B-i': {
        id: 'outcome-3B-i',
        type: 'outcome',
        label: 'Outcome 3B-i',
        quality: 'partial',
        qualityLabel: 'Partially Correct but Misleading',
        legalPosition:
          'The description of Art. 29(2) is accurate: it provides that where a company is held liable pursuant to national law, victims have a right to full compensation without overcompensation. However, describing this as a "guarantee" of full compensation overstates its practical significance. Art. 29(2) is only triggered once national law establishes liability — it does not create an independent right to compensation. The critical question, which this advice does not adequately address, is whether the applicable national law (as determined by Rome II) imposes any liability for supply chain due diligence failures at all. Under Rome II Art. 4(1), the applicable law for a tort claim is typically the law of the country where the damage occurred — in this case, Bangladeshi law. Bangladesh does not have a mandatory supply chain due diligence law equivalent to the pre-Omnibus CSDDD. There may be no liability under Bangladeshi law, in which case Art. 29(2) is entirely inoperative.',
        whyItMatters:
          'Art. 29(2) as it now stands is a guarantee of remedy quality, not a guarantee of liability. The deletion of Art. 29(7) — which would have overridden Rome II to point to EU law — means the lex loci damni rule applies in full. For supply chain claims involving environmental contamination in the Global South, this typically means the applicable law is a developing country\'s legal system. Telling a claimant that EU law "guarantees" compensation creates false expectations about a right that may never be engaged.',
        legalBasis:
          'Art. 29(2) as replaced by Art. 4(20)(b), Directive (EU) 2026/470: full compensation only where national law establishes liability; Art. 4(1), Regulation (EC) 864/2007 (Rome II); Art. 4(20)(f), Directive (EU) 2026/470 deleting Art. 29(7)',
        nextNode: 'final-sl3',
      },
      'outcome-3B-ii': {
        id: 'outcome-3B-ii',
        type: 'outcome',
        label: 'Outcome 3B-ii',
        quality: 'best',
        qualityLabel: 'Legally Accurate and Complete — Best Outcome',
        legalPosition:
          'This is the most accurate and complete advice. The current legal position has three layers. First: Art. 29(1) CSDDD has been deleted. There is no harmonised EU liability standard. Second: the applicable law for civil claims arising from supply chain environmental failures is determined by Rome II Art. 4(1) lex loci damni — the damage occurred in Bangladesh, so Bangladeshi law governs liability, unless the parties share a common habitual residence or a closer connection exists. Third: Art. 29(2) provides that where national law establishes liability, victims have a right to full compensation without overcompensation. But Art. 29(2) is conditional on national law first establishing liability. Whether Bangladeshi law imposes liability for supply chain environmental failures is uncertain. The NGO faces materially different prospects depending on the applicable national law. This is the civil liability fragmentation the deletion of Art. 29(1) creates: 27 national regimes, no minimum standard.',
        whyItMatters:
          'This outcome captures the full architecture of Tension 3. Post-Omnibus, civil liability for supply chain due diligence failures is fragmented across 27 national legal systems at three levels. First, applicable law: Rome II Art. 4(1) directs to the law of the country where damage occurred, which in supply chain environmental cases typically means a developing country\'s legal system — this is precisely why Art. 29(7) existed as an overriding mandatory provision. Second, substantive standard: each national law has its own duty of care, causation rules, and defences. Third, procedural: limitation periods, standing, and representative actions all vary. Art. 29(2)\'s conditional guarantee is a remedy rule, not a liability creation mechanism.',
        legalBasis:
          'Art. 29(1) deleted by Art. 4(20)(a); Art. 29(2) as replaced by Art. 4(20)(b); Art. 29(3)(d) deleted by Art. 4(20)(c); Art. 29(7) deleted by Art. 4(20)(f) — all Directive (EU) 2026/470; Art. 4(1), Regulation (EC) 864/2007 (Rome II); Rühl (2021) SSRN 3708196; Rühl (2022) SSRN 4024604',
        nextNode: 'final-sl3',
      },
      'outcome-3C-i': {
        id: 'outcome-3C-i',
        type: 'outcome',
        label: 'Outcome 3C-i',
        quality: 'incorrect',
        qualityLabel: 'Legally Incorrect — Fundamental Error',
        legalPosition:
          'This advice reflects a fundamental misunderstanding of the CSRD. The CSRD is a disclosure instrument. It imposes reporting obligations. It does not create civil liability, a duty of care, or any cause of action. There is no provision of EU law that converts CSRD disclosure of awareness of adverse environmental impacts into a legal basis for a civil claim against the disclosing company. The CSRD disclosure is relevant as evidence — it may support an argument that EuroMed AG had knowledge of the contamination, which could be relevant in a claim under applicable national law. But it does not itself create liability.',
        whyItMatters:
          'The CSRD is a disclosure instrument. It imposes obligations to report; it does not create causes of action. Article 19a(2)(f) requires disclosure of the due diligence process and adverse impacts — it creates an obligation toward the supervisory authority and the public. It does not create a right of action for individuals harmed by the disclosed impacts. This was the entire purpose of Art. 29(1) CSDDD — to provide that separate legal basis. Without it, disclosure and liability are structurally decoupled.',
        legalBasis:
          'Art. 19a(2)(f), Directive 2013/34/EU consolidated 18.03.2026: disclosure obligation only, no civil liability created; no provision of EU law converts CSRD disclosure into a cause of action',
        nextNode: 'final-sl3',
      },
      'outcome-3C-ii': {
        id: 'outcome-3C-ii',
        type: 'outcome',
        label: 'Outcome 3C-ii',
        quality: 'correction',
        qualityLabel: 'Correct Self-Correction',
        legalPosition:
          'Recognising the error and correcting the advice before confirming it is the appropriate response. The CSRD is a disclosure instrument and does not create civil liability. However, the disclosure is not legally irrelevant. EuroMed AG\'s CSRD disclosure of awareness of the environmental conditions could be used as evidence in a claim under applicable national law — for example to establish that EuroMed AG knew of the toxic discharge risk. But the legal basis for any claim must come from national law as determined under Rome II, not from the CSRD itself. The corrected advice is in Path B.',
        whyItMatters:
          'Even though the CSRD does not create liability, the disclosure is not legally irrelevant. EuroMed AG\'s 2025 sustainability statement is an independently assured public document that records the company\'s knowledge of the environmental contamination as of the reporting date. In a national law claim — for example under German tort law if Rome II pointed to German law — this document could be used as evidence that EuroMed AG had actual knowledge of the risk, which might be relevant to establishing negligence. The CSRD creates the evidentiary record; national law determines whether that record founds a liability claim.',
        legalBasis:
          'Art. 19a(2)(f), Directive 2013/34/EU consolidated 18.03.2026: disclosure obligation not a liability rule; Regulation (EC) 864/2007: national law governs liability',
        nextNode: 'final-sl3',
      },
    },
    finalResult: {
      id: 'final-sl3',
      required:
        'The applicable framework is national law under Rome II. Under Rome II Art. 4(1) lex loci damni, the damage occurred in Bangladesh, so Bangladeshi law governs liability. EuroMed AG\'s CSRD sustainability statement serves as an independently assured evidentiary record of the company\'s knowledge of the environmental contamination — usable in national law proceedings but not itself a source of liability. If Bangladeshi law establishes liability, Art. 29(2) CSDDD guarantees full compensation as a conditional remedy.',
      notRequired:
        'Rely on any EU-level civil liability standard. Art. 29(1) CSDDD — the harmonised standard — was deleted by Art. 4(20)(a) of Directive (EU) 2026/470, effective 18 March 2026. Additionally, EuroMed AG lost CSDDD scope on 18 March 2026 — Arts. 10 and 11 (which Art. 29(1) required to be breached) no longer apply to EuroMed AG. Art. 29(3)(d) (representative actions), Art. 29(7) (Rome II override), and the five-year limitation period were also deleted. The CSRD does not create any cause of action.',
      structuralTension:
        'The victim\'s claim must navigate 27 national legal systems with no EU minimum standard. Under Rome II Art. 4(1), the applicable law is the law of the country where the damage occurred — Bangladesh. Bangladeshi law may not recognise a cause of action for failures of EU-standard due diligence. Art. 29(7) existed precisely to override this outcome. Its deletion means the CSRD disclosure record survives — the company\'s knowledge of the environmental harm is publicly documented — but the EU legal infrastructure that would allow that record to found a claim does not. The public record and the legal remedy have been structurally decoupled.',
    },
  },
]

export default scenario
