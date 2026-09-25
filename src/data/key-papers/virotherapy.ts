import type { PaperInput } from "@/lib/schema";

/**
 * Oncolytic virotherapy: the papers the field rests on, from the interferon biology that explains
 * why a virus can prefer a cancer cell, through the first engineered viruses, the trials that
 * produced the approvals, the randomised trials that failed, and the self-experiment published in
 * 2024. Every record was checked against Europe PMC on the asOf date: the DOI, the PubMed id, the
 * author list and every number quoted in `findings` were read from the indexed abstract or the
 * open-access full text, not from a summary of it.
 *
 * Papers the corpus already held are not repeated here. MASTERKEY-265 is
 * `paper-chesney-j-clin-oncol`, the nadofaragene firadenovec trial is
 * `paper-nadofaragene-firadenovec-lancet-oncol-2021`, and the CAN-2409 prostate trial is
 * `paper-nct01436968-lancet-oncol-2026`.
 */
const asOf = "2026-09-25";
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (d: string, label = "Full text (DOI)") => ({ label, url: `https://doi.org/${d}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });
const epmc = (pmid: string) => ({ label: "Europe PMC", url: `https://europepmc.org/article/MED/${pmid}` });

export const papersVirotherapy: PaperInput[] = [
  // ---------------------------------------------------------------- Why a virus prefers a cancer cell
  p({
    id: "paper-stojdl-vsv-interferon-defect-natmed-2000",
    name: "Stojdl 2000: cancer cells that stopped answering interferon cannot stop a virus either",
    tldr: "A normal cell warned by interferon shuts a virus down; many cancer cells have broken that alarm to grow, and this paper showed a common animal virus exploits exactly that break.",
    summary: "Interferons bind cell-surface receptors and set off a signalling cascade that produces both an antiviral state and growth-inhibitory or apoptotic signals. Many cancers acquire mutations in that pathway, which frees them from interferon's growth control. Stojdl and colleagues in John Bell's laboratory argued that the same cells must therefore have given up their antiviral defence, and tested it with vesicular stomatitis virus, an enveloped negative-sense RNA virus that is exquisitely sensitive to interferon.\n\nVesicular stomatitis virus replicated in and killed a range of human tumour cell lines at interferon doses that completely protected normal human primary cultures. A single intratumoural injection reduced tumour burden in nude mice carrying human melanoma xenografts. This is the mechanistic argument the whole field uses in plain words: the virus is not clever, the cancer cell is defenceless.",
    journal: "Nature Medicine", year: 2000, doi: "10.1038/77558", pmid: "10888934",
    authors: "Stojdl DF, Lichty B, Knowles S, et al.", paperType: "basic",
    findings: [
      "Vesicular stomatitis virus replicated in and killed a variety of human tumour cell lines at interferon doses that fully protected normal human primary cell cultures.",
      "A single intratumoural injection reduced tumour burden in nude mice bearing subcutaneous human melanoma xenografts.",
      "The selectivity came from the tumour cells' defective interferon response, not from any engineering of the virus.",
    ],
    whatItMeans: "This is the reason oncolytic virotherapy is a strategy rather than an accident. Cancer cells frequently disable the interferon response because it restrains their growth, and the same break leaves them unable to mount the antiviral response a healthy neighbour mounts. Everything later in the field, including the choice of which virus to use and which gene to delete, is an attempt to widen that gap.",
    caveats: [
      "Cell lines and immunodeficient mice. Nude mice lack T cells, so the model measures direct viral killing and cannot show the immune contribution that matters most in patients.",
      "Interferon-pathway defects vary enormously between tumours and are not routinely measured before treatment, so there is still no test that says which patient's cancer is susceptible.",
      "Wild-type vesicular stomatitis virus is neurotoxic in animals by direct routes into the nervous system, which is why the clinical versions are attenuated.",
    ],
    links: [doi("10.1038/77558", "Nat Med 2000"), pubmed("10888934"), epmc("10888934")],
    technologies: ["oncolytic-virus"], sections: ["immunotherapy"], people: ["john-bell"], journals: ["nature-medicine"],
  }),
  p({
    id: "paper-coffey-reovirus-ras-science-1998",
    name: "Coffey 1998: reovirus grows in cells with an activated Ras pathway, which describes a great many cancers",
    tldr: "A common gut virus that does almost nothing in healthy adults turned out to need a switched-on growth pathway to replicate, and that switch is stuck on in a large share of human cancers.",
    summary: "Human reovirus requires an activated Ras signalling pathway to infect cultured cells. Coffey and colleagues tested whether that dependence could be used against tumours. A single intratumoural injection caused regression in 65 to 80 per cent of severe combined immunodeficient mice bearing tumours from v-erbB-transformed murine NIH 3T3 cells or human U87 glioblastoma cells. In immunocompetent C3H mice bearing tumours from ras-transformed C3H-10T1/2 cells, regression also occurred but needed a series of injections.\n\nThis is the second of the two classic selectivity arguments, alongside the interferon defect: a naturally occurring, essentially harmless virus whose replication requirement happens to be a hallmark of transformed cells. It became the basis of pelareorep, the reovirus product that has been in clinical trials for more than two decades.",
    journal: "Science", year: 1998, doi: "10.1126/science.282.5392.1332", pmid: "9812900",
    authors: "Coffey MC, Strong JE, Forsyth PA, Lee PW", paperType: "basic",
    findings: [
      "Human reovirus requires an activated Ras signalling pathway to infect cultured cells.",
      "A single intratumoural injection caused tumour regression in 65 to 80 per cent of severe combined immunodeficient mice bearing v-erbB-transformed murine or human U87 glioblastoma tumours.",
      "In immunocompetent C3H mice with ras-transformed tumours regression also occurred, but only after a series of injections rather than one.",
    ],
    whatItMeans: "Selectivity does not have to be engineered. A wild virus can already prefer cancer cells if its replication depends on something the cancer has turned on. The difference between one injection in an immunodeficient mouse and a series in an immunocompetent one is the first clear signal in the literature that the host immune response both helps and hinders, which is still the central tension of the field.",
    caveats: [
      "Ras pathway activation is common but is not measured before treatment in the reovirus trials, so the selectivity argument has never been tested as a biomarker in patients.",
      "Rodent tumour models greatly overstate what intratumoural virus achieves in human tumours, which are larger, older and more fibrous.",
      "Pelareorep, the product built on this work, has run for more than twenty years without a positive randomised phase 3 result.",
    ],
    links: [doi("10.1126/science.282.5392.1332", "Science 1998"), pubmed("9812900")],
    technologies: ["oncolytic-virus"], sections: ["immunotherapy"], journals: ["science"],
  }),

  // ---------------------------------------------------------------- The engineering
  p({
    id: "paper-martuza-engineered-hsv-glioma-science-1991",
    name: "Martuza 1991: the first genetically engineered virus built to treat a cancer",
    tldr: "A herpes virus was deliberately crippled so that it could only multiply in dividing cells, injected into human brain tumours growing in mice, and it made the mice live longer.",
    summary: "Malignant gliomas are the commonest malignant brain tumours and are almost always fatal. Martuza and colleagues tested dlsptk, a thymidine-kinase-negative mutant of herpes simplex virus type 1 attenuated for neurovirulence, as a treatment. In cell culture it killed two long-term human glioma lines and three short-term human glioma cell populations. In nude mice with implanted subcutaneous and subrenal U87 human gliomas, injection into the tumour inhibited growth; in mice with intracranial U87 gliomas it prolonged survival.\n\nDeleting viral thymidine kinase makes the virus depend on the host cell's own nucleotide pool, which dividing tumour cells supply and resting brain cells do not. That is the first worked example of the move the whole field now makes: take out a viral gene whose job the cancer cell will do for it.",
    journal: "Science", year: 1991, doi: "10.1126/science.1851332", pmid: "1851332",
    authors: "Martuza RL, Malick A, Markert JM, Ruffner KL, Coen DM", paperType: "basic",
    findings: [
      "A thymidine-kinase-negative herpes simplex virus type 1 mutant (dlsptk), attenuated for neurovirulence, killed two long-term and three short-term human glioma cell populations in culture.",
      "Injection into subcutaneous and subrenal U87 human gliomas in nude mice inhibited tumour growth.",
      "Injection into intracranial U87 gliomas in nude mice prolonged survival.",
    ],
    whatItMeans: "This paper turned oncolytic virotherapy from a century of case reports into an engineering discipline. Every approved product descends from the same idea: delete a viral gene that a normal cell would have to supply and a cancer cell already supplies in excess. Talimogene laherparepvec and teserpaturev are both herpes viruses in this line.",
    caveats: [
      "Thymidine kinase deletion also removes the virus's sensitivity to aciclovir and ganciclovir, which are the safety net if an infection runs away. Later constructs deleted different genes partly for that reason.",
      "Nude mice have no T cells, so the experiment measures direct lysis only.",
      "A human glioma grown in a mouse flank or brain is a poor model of the infiltrating disease in a patient, and three decades later glioblastoma remains almost as lethal.",
    ],
    links: [doi("10.1126/science.1851332", "Science 1991"), pubmed("1851332")],
    technologies: ["oncolytic-virus"], cancers: ["glioblastoma"], sections: ["immunotherapy"], people: ["robert-martuza"], journals: ["science"],
  }),
  p({
    id: "paper-bischoff-onyx-015-science-1996",
    name: "Bischoff 1996: the adenovirus that was said to replicate only where p53 was lost",
    tldr: "An adenovirus missing the gene that disables the cell's main tumour suppressor appeared to grow only in cancer cells that had already lost that suppressor, a claim that launched the field's first big clinical programme and was later shown to be the wrong explanation.",
    summary: "Adenovirus E1B encodes a 55-kilodalton protein that inactivates p53. Bischoff and colleagues showed that a mutant adenovirus lacking it replicated in and lysed p53-deficient human tumour cells but not cells with functional p53, and that putting the 55-kilodalton protein back into the latter made them susceptible. Injection into p53-deficient human cervical carcinomas in nude mice significantly reduced tumour size and completely regressed 60 per cent of tumours.\n\nThe virus became ONYX-015, the most heavily studied oncolytic virus of the 1990s, and later, with a nearly identical design, the Chinese product H101. The tidy mechanism did not survive: O'Shea and colleagues showed in 2004 that selectivity tracks late viral RNA export rather than p53 status, which is why ONYX-015 activity in trials never sorted by p53.",
    journal: "Science", year: 1996, doi: "10.1126/science.274.5286.373", pmid: "8832876",
    authors: "Bischoff JR, Kirn DH, Williams A, et al.", paperType: "basic",
    findings: [
      "An adenovirus not expressing the E1B 55-kilodalton protein replicated in and lysed p53-deficient human tumour cells but not cells with functional p53.",
      "Ectopic expression of the 55-kilodalton E1B protein in p53-functional cells made them susceptible to the mutant virus.",
      "Injection into p53-deficient human cervical carcinomas in nude mice reduced tumour size significantly and caused complete regression of 60 per cent of tumours.",
    ],
    whatItMeans: "This is the paper that made oncolytic viruses look like precision medicine: a named genetic lesion, a virus built to exploit it, a biomarker to select patients. None of that held. It is the field's most useful cautionary tale, because the drug went into large trials on a mechanism that turned out to be wrong, and the selectivity that does exist has never been reducible to one gene.",
    caveats: [
      "The p53 explanation was overturned. O'Shea and colleagues showed in Cancer Cell in 2004 that late viral RNA export, not p53 inactivation, determines the selectivity of this mutant.",
      "Clinical response to ONYX-015 did not track p53 status in the trials that looked, so the biomarker never worked.",
      "Nude-mouse xenografts of a cervical carcinoma line, with the virus injected directly into an accessible tumour.",
    ],
    links: [doi("10.1126/science.274.5286.373", "Science 1996"), pubmed("8832876"), doi("10.1016/j.ccr.2004.11.012", "O'Shea 2004, the correction to the mechanism (Cancer Cell)")],
    technologies: ["oncolytic-virus"], targets: ["tp53"], people: ["frank-mccormick"], sections: ["immunotherapy"], journals: ["science"],
  }),

  // ---------------------------------------------------------------- The history
  p({
    id: "paper-kelly-russell-oncolytic-history-moltherapy-2007",
    name: "Kelly and Russell 2007: a century of trying to treat cancer with viruses, and why it kept stopping",
    tldr: "The idea that a virus might shrink a tumour is more than a hundred years old; this history explains the early attempts, why they were abandoned, and what changed.",
    summary: "Kelly and Russell trace oncolytic virotherapy from the first recognition of viruses at the turn of the nineteenth century. Early case reports described cancers regressing during naturally acquired virus infections. That prompted clinical trials in which body fluids containing human or animal viruses were used to transmit infections to patients with cancer. Most often the host immune system arrested the virus and the tumour was unaffected; sometimes, in immunosuppressed patients, the infection persisted and the tumour regressed, but the damage to normal tissues was unacceptable.\n\nThrough the 1950s and 1960s researchers tried to force the evolution of viruses with greater tumour specificity by serial passage. Success was limited and many left the field. Reverse genetics brought it back, by allowing viruses to be designed rather than selected. The authors note that penetrating host immune defences, the problem that stopped the first era, remains the unsolved one.",
    journal: "Molecular Therapy", year: 2007, doi: "10.1038/sj.mt.6300108", pmid: "17299401",
    authors: "Kelly E, Russell SJ", paperType: "review",
    findings: [
      "Early clinical attempts transmitted human or animal viruses to patients using infected body fluids, with no way to control dose or purity.",
      "Tumour regressions were seen mainly in immunosuppressed patients, in whom the infection persisted; the same persistence produced unacceptable damage to normal tissue.",
      "Serial passage through the 1950s and 1960s failed to produce reliably tumour-specific viruses, and much of the field was abandoned.",
      "Reverse genetics, which allows a virus to be designed rather than selected, is what brought the field back.",
    ],
    whatItMeans: "The history is the argument against treating any single dramatic case as proof. For a century, striking individual regressions coexisted with a complete failure to build a reliable treatment, because the same immune response that is needed to kill the tumour also clears the virus. That tension has not been resolved; it has only been engineered around.",
    caveats: [
      "A narrative review, not a systematic one. Early case reports were uncontrolled and often published without histological confirmation.",
      "The virus preparations of the first era were uncharacterised, so the historical safety record cannot be read across to modern clinical-grade products.",
    ],
    links: [doi("10.1038/sj.mt.6300108", "Mol Ther 2007"), pubmed("17299401")],
    technologies: ["oncolytic-virus"], people: ["stephen-russell"], sections: ["immunotherapy"],
  }),
  p({
    id: "paper-russell-peng-bell-oncolytic-virotherapy-natbiotech-2012",
    name: "Russell, Peng and Bell 2012: the field states its own problems",
    tldr: "The review that set the modern agenda for cancer-killing viruses, and named the four things that had to be solved.",
    summary: "Russell, Peng and Bell review oncolytic virotherapy as replication-competent viruses used to destroy cancers. They summarise preclinical proof of feasibility for a single-shot cure, drugs that accelerate spread of virus within a tumour, strategies to maximise the immunotherapeutic action of the virus, and clinical confirmation of a critical concentration of virus in the blood below which vascular delivery and intratumoural replication do not happen.\n\nThe value of the paper is that it states the field's problems rather than its promise: choosing between a proliferating number of platforms and engineered derivatives, transiently suppressing and then unleashing the immune system so that both virus spread and antitumour immunity are maximised, building preclinical models that mean something, and manufacturing virus at yields orders of magnitude higher than were then possible. Every one of those four remains open.",
    journal: "Nature Biotechnology", year: 2012, doi: "10.1038/nbt.2287", pmid: "22781695",
    authors: "Russell SJ, Peng KW, Bell JC", paperType: "review",
    findings: [
      "Vascular delivery and intratumoural replication depend on exceeding a threshold concentration of virus in the blood, confirmed clinically.",
      "The immune response has to be suppressed transiently to let the virus spread, then unleashed to produce antitumour immunity; the two requirements conflict.",
      "Manufacturing yields needed to rise by orders of magnitude for intravenous dosing to be practical.",
      "The number of oncolytic platforms and engineered derivatives had already outgrown the field's ability to test them properly.",
    ],
    whatItMeans: "Read against what happened next, this review is a fair scorecard. The immune timing problem, the delivery threshold and the manufacturing yield are still the reasons most programmes fail, and the proliferation of platforms the authors warned about is still the reason the field has many products and few randomised wins.",
    caveats: [
      "A review, so the numbers in it belong to the studies it cites rather than to this paper.",
      "Written before the 2015 approval of talimogene laherparepvec and before the randomised failures that followed, so its optimism about combination with checkpoint blockade has not been borne out.",
    ],
    links: [doi("10.1038/nbt.2287", "Nat Biotechnol 2012"), pubmed("22781695")],
    technologies: ["oncolytic-virus"], people: ["stephen-russell", "john-bell"], sections: ["immunotherapy"], journals: ["nature-biotechnology"],
  }),
  p({
    id: "paper-shalhout-oncolytic-progress-challenges-natrevclinonc-2023",
    name: "Shalhout 2023: what the approved oncolytic viruses actually do in practice",
    tldr: "A review of where cancer-killing viruses stand in the clinic, written around the accumulated experience of the one product that is widely approved.",
    summary: "Shalhout, Miller, Emerick and Kaufman review oncolytic viruses as a class: selective replication in tumour cells, delivery of several transgene payloads, induction of immunogenic cell death, promotion of antitumour immunity, and a safety profile that largely does not overlap with other cancer therapeutics. They note that four oncolytic viruses and one non-oncolytic virus had been approved for cancer globally, while talimogene laherparepvec remained the only widely approved therapy, indicated for recurrent melanoma after initial surgery and first approved in 2015.\n\nThe review is written as practical guidance on using these agents rather than as advocacy, and sets out the preclinical, clinical and regulatory obstacles that have limited their development. Howard Kaufman, one of the authors, was a lead investigator of the trial that produced the first approval.",
    journal: "Nature Reviews Clinical Oncology", year: 2023, doi: "10.1038/s41571-022-00719-w", pmid: "36631681",
    authors: "Shalhout SZ, Miller DM, Emerick KS, Kaufman HL", paperType: "review",
    findings: [
      "Four oncolytic viruses and one non-oncolytic virus had been approved for cancer somewhere in the world; only talimogene laherparepvec was widely approved.",
      "The class safety profile largely does not overlap with that of other cancer therapeutics, which is the main argument for combination.",
      "The obstacles named are preclinical model quality, clinical trial design and regulation, not a lack of candidate viruses.",
    ],
    whatItMeans: "The honest summary of the field after its first approval: a tolerable class of agents, a large number of candidates, and one product in routine use in one disease. The distinction the review keeps making, between viruses that replicate in the tumour and viruses used only to deliver a gene, is the distinction most coverage of this field drops.",
    caveats: [
      "A narrative review by authors with commercial and trial involvement in the field; the conflict-of-interest statement should be read with it.",
      "Approval counts change, and the review does not include the products approved since it was written.",
    ],
    links: [doi("10.1038/s41571-022-00719-w", "Nat Rev Clin Oncol 2023"), pubmed("36631681")],
    technologies: ["oncolytic-virus"], drugs: ["talimogene-laherparepvec"], people: ["howard-kaufman"], sections: ["immunotherapy"], journals: ["nature-reviews-clinical-oncology"],
  }),

  // ---------------------------------------------------------------- The approvals and the evidence behind them
  p({
    id: "paper-andtbacka-optim-talimogene-jco-2015",
    name: "OPTiM: the trial that made talimogene laherparepvec the first approved oncolytic virus",
    tldr: "Injecting an engineered herpes virus into melanoma lesions produced lasting shrinkage in about one patient in six, compared with one in fifty on the control drug, but it did not clearly help people live longer.",
    summary: "Open-label phase 3 trial randomising 436 patients with unresectable stage IIIB to IV melanoma 2:1 to talimogene laherparepvec injected into lesions or subcutaneous granulocyte-macrophage colony-stimulating factor. The primary endpoint was durable response rate, defined as an objective response lasting continuously for at least six months, judged by independent assessment.\n\nDurable response rate was 16.3 per cent with talimogene laherparepvec against 2.1 per cent with the control, odds ratio 8.9. Overall response rate was 26.4 per cent against 5.7 per cent. Median overall survival was 23.3 months against 18.9 months, hazard ratio 0.79, p = 0.051, which did not meet significance. Benefit concentrated in stage IIIB, IIIC and IVM1a disease and in patients who had not been treated before. The commonest adverse events were fatigue, chills and fever; the only grade 3 or 4 event in at least 2 per cent of treated patients was cellulitis.\n\nThe gap between the response result and the survival result is the single most important fact about this field. It is a licensing trial built on a response endpoint whose survival comparison did not reach significance, against a comparator that is not a modern melanoma treatment.",
    journal: "Journal of Clinical Oncology", year: 2015, doi: "10.1200/JCO.2014.58.3377", pmid: "26014293",
    authors: "Andtbacka RH, Kaufman HL, Collichio F, et al.", paperType: "rct", participants: 436, changedPractice: true,
    findings: [
      "Durable response rate 16.3 per cent (95% CI 12.1 to 20.5) with talimogene laherparepvec versus 2.1 per cent (95% CI 0 to 4.5) with granulocyte-macrophage colony-stimulating factor; odds ratio 8.9, p < 0.001.",
      "Overall response rate 26.4 per cent versus 5.7 per cent.",
      "Median overall survival 23.3 months versus 18.9 months; hazard ratio 0.79 (95% CI 0.62 to 1.00), p = 0.051, not statistically significant.",
      "Effect was largest in stage IIIB, IIIC and IVM1a disease and in treatment-naive patients.",
      "Cellulitis was the only grade 3 or 4 adverse event occurring in at least 2 per cent of treated patients, at 2.1 per cent; no fatal treatment-related events.",
    ],
    whatItMeans: "This is the approval that created the class, and it is also the clearest example of how the class is oversold. A durable response rate eight times the comparator is a real local effect on injectable lesions. The survival comparison did not reach significance, and the comparator was granulocyte-macrophage colony-stimulating factor rather than a checkpoint inhibitor, which by 2015 was already the standard. A reader told that a virus improves survival in melanoma is being told something this trial did not show.",
    caveats: [
      "The comparator arm received granulocyte-macrophage colony-stimulating factor, which is not a standard melanoma treatment; the trial predates the routine use of anti-PD-1 therapy.",
      "Overall survival did not reach statistical significance (p = 0.051).",
      "Open-label, and response assessment in injected lesions is hard to blind.",
      "Requires lesions that can be injected, which restricts use to accessible skin, subcutaneous and nodal disease.",
    ],
    links: [doi("10.1200/JCO.2014.58.3377", "JCO 2015"), pubmed("26014293")],
    technologies: ["oncolytic-virus"], drugs: ["talimogene-laherparepvec"], cancers: ["melanoma", "advanced-melanoma"], companies: ["amgen"], people: ["howard-kaufman"],
    related: ["paper-chesney-j-clin-oncol"], sections: ["immunotherapy"], journals: ["jco"],
  }),
  p({
    id: "paper-todo-g47delta-glioblastoma-natmed-2022",
    name: "Todo 2022: the triple-mutated herpes virus that became Japan's first approved oncolytic virus",
    tldr: "Nineteen people with a brain tumour that had come back after radiotherapy and chemotherapy were given repeated injections of an engineered herpes virus, and more of them were alive at one year than expected.",
    summary: "Investigator-initiated, single-arm phase 2 trial of G47 delta, a triple-mutated third-generation oncolytic herpes simplex virus type 1, in 19 adults with residual or recurrent supratentorial glioblastoma after radiotherapy and temozolomide. The virus was given into the tumour, repeatedly, for up to six doses.\n\nThe primary endpoint, one-year survival after starting G47 delta, was 84.2 per cent (95% CI 60.4 to 96.6; 16 of 19). The prespecified endpoint was met and the trial stopped early. Median overall survival was 20.2 months from starting G47 delta and 28.8 months from the initial surgery. Fever was the commonest related adverse event, in 17 of 19. Imaging repeatedly showed the target lesion enlarging with clearing of contrast enhancement after each dose, a pattern characteristic of this therapy, so the best overall response over two years was partial response in one patient and stable disease in 18. Biopsies showed increasing tumour-infiltrating CD4-positive and CD8-positive lymphocytes with persistently low Foxp3-positive cells. The result led to approval of G47 delta in Japan.",
    journal: "Nature Medicine", year: 2022, doi: "10.1038/s41591-022-01897-x", pmid: "35864254",
    authors: "Todo T, Ito H, Ino Y, et al.", paperType: "rct", participants: 19, changedPractice: true,
    findings: [
      "One-year survival after starting G47 delta was 84.2 per cent (95% CI 60.4 to 96.6), 16 of 19 patients; the prespecified endpoint was met and the trial ended early.",
      "Median overall survival 20.2 months from starting treatment and 28.8 months from the initial surgery.",
      "Best overall response over two years was partial response in one patient and stable disease in 18; the tumour typically enlarged on imaging after each dose while contrast enhancement cleared.",
      "Fever was the commonest related adverse event, in 17 of 19 patients, followed by vomiting, nausea, lymphocytopenia and leukopenia.",
      "Biopsies showed increasing CD4-positive and CD8-positive tumour-infiltrating lymphocytes with persistently low numbers of Foxp3-positive cells.",
    ],
    whatItMeans: "This is the evidence behind a national approval, and it is 19 patients in a single arm. The survival figure is genuinely higher than historical expectation in recurrent glioblastoma, and the biopsy findings support the immune mechanism. It is not a randomised comparison, and the imaging pattern means the usual response criteria cannot be used, which makes an uncontrolled result harder rather than easier to interpret.",
    caveats: [
      "Single-arm, 19 patients; the comparison is with historical expectation, not a control group.",
      "The characteristic enlargement with contrast clearing means standard response criteria do not describe what the treatment does, so almost every patient is recorded as stable disease.",
      "Approval in Japan was conditional and time-limited under the country's scheme for regenerative and gene therapies, so confirmation is still required.",
    ],
    links: [doi("10.1038/s41591-022-01897-x", "Nat Med 2022"), pubmed("35864254")],
    technologies: ["oncolytic-virus"], cancers: ["glioblastoma"], people: ["tomoki-todo"], sections: ["immunotherapy"], journals: ["nature-medicine"],
  }),
  p({
    id: "paper-xia-h101-head-neck-aizheng-2004",
    name: "Xia 2004: the randomised trial behind China's approval of the oncolytic adenovirus H101",
    tldr: "Adding injections of an engineered adenovirus to chemotherapy roughly doubled the proportion of head and neck or oesophageal cancers that shrank, but the trial reported no survival figures.",
    summary: "Phase 3 randomised trial of intratumoural H101, an E1B-55 kilodalton gene-deleted replication-selective adenovirus of essentially the same design as ONYX-015, added to cisplatin-based chemotherapy in squamous cell cancer of the head and neck or oesophagus. 160 patients were recruited. Patients with no history of, or sensitivity to, cisplatin and fluorouracil received that regimen; those who had not responded to it received doxorubicin and fluorouracil. Each group was randomised to receive intratumoural H101, at 5.0 x 10^11 to 1.5 x 10^12 viral particles per day for five consecutive days every three weeks, or not.\n\nAmong 123 evaluable patients, overall response rate with cisplatin and fluorouracil plus H101 was 78.8 per cent (41 of 52) against 39.6 per cent (21 of 53) for that chemotherapy alone. The differences between the combined virus arms and the chemotherapy-alone arms were significant. The main side effects were fever in 45.7 per cent, injection-site reaction in 28.3 per cent and influenza-like symptoms in 9.8 per cent. H101 was approved in China in 2005 and marketed as Oncorine, making it the first oncolytic virus approved anywhere.",
    journal: "Ai Zheng (Chinese Journal of Cancer)", year: 2004, pmid: "15601557",
    authors: "Xia ZJ, Chang JH, Zhang L, et al.", paperType: "rct", participants: 160, changedPractice: true,
    findings: [
      "Overall response rate 78.8 per cent (41 of 52) with cisplatin, fluorouracil and H101 versus 39.6 per cent (21 of 53) with cisplatin and fluorouracil alone (p = 0.000 as reported).",
      "In the doxorubicin and fluorouracil groups, response was 50.0 per cent (7 of 14) with H101 and 50.0 per cent (2 of 4) without, on numbers too small to compare.",
      "Commonest side effects were fever (45.7 per cent), injection-site reaction (28.3 per cent) and influenza-like symptoms (9.8 per cent).",
      "The report gives response rates only; no overall or progression-free survival result is presented.",
    ],
    whatItMeans: "The world's first approval of an oncolytic virus rests on a response-rate trial of 160 patients with no survival endpoint, an uneven randomisation across two chemotherapy backbones, and 37 patients excluded from the efficacy analysis. Tumour shrinkage after injecting something into a tumour is the easiest result to obtain in this field and the least informative. H101 has never been approved outside China.",
    caveats: [
      "No survival data. Response rate in an open-label trial with injected lesions is a weak endpoint.",
      "123 of 160 recruited patients were analysed, without a described intention-to-treat analysis.",
      "The doxorubicin and fluorouracil comparison has four patients in the control arm.",
      "Published in Chinese in a national journal, with no DOI, and never replicated in a registrational trial outside China.",
    ],
    links: [pubmed("15601557"), epmc("15601557")],
    technologies: ["oncolytic-virus"], sections: ["immunotherapy"],
  }),
  p({
    id: "paper-wong-ignyte-rp1-nivolumab-jco-2025",
    name: "IGNYTE: an engineered herpes virus with nivolumab in melanoma that had already failed anti-PD-1 therapy",
    tldr: "In melanoma that had already stopped responding to immunotherapy, injecting an engineered herpes virus alongside nivolumab shrank tumours in about a third of patients, including tumours that were never injected.",
    summary: "Registrational cohort of 140 patients with advanced melanoma and confirmed progression on anti-PD-1 therapy given as the last prior treatment for at least eight weeks. Vusolimogene oderparepvec, a herpes simplex virus type 1-based oncolytic immunotherapy, was given into tumours for up to eight doses of up to 10 mL, with nivolumab for up to two years. The objective response rate was assessed by independent central review.\n\nConfirmed objective response rate was 32.9 per cent (95% CI 25.2 to 41.3), with complete response in 15.0 per cent. Responses occurred with similar frequency, depth, duration and timing in injected and uninjected lesions, including visceral ones, which is the evidence for a systemic effect rather than a local one. Median duration of response was 33.7 months. Overall survival was 75.3 per cent at one year and 63.3 per cent at two. Treatment-related adverse events were grade 1 or 2 in 77.1 per cent, grade 3 in 9.3 per cent and grade 4 in 3.6 per cent, with no grade 5 events. 65.7 per cent had primary resistance to anti-PD-1 therapy and 46.4 per cent had received both anti-PD-1 and anti-CTLA-4 therapy.",
    journal: "Journal of Clinical Oncology", year: 2025, doi: "10.1200/JCO-25-01346", pmid: "40627813",
    authors: "Wong MK, Milhem MM, Sacco JJ, et al.", paperType: "rct", participants: 140, changedPractice: true,
    findings: [
      "Confirmed objective response rate 32.9 per cent (95% CI 25.2 to 41.3) by independent central review, with 15.0 per cent complete responses.",
      "Responses occurred with similar frequency, depth, duration and kinetics in uninjected lesions, including visceral lesions, as in injected ones.",
      "Median duration of response 33.7 months (95% CI 14.1 to not reached).",
      "Overall survival 75.3 per cent at one year and 63.3 per cent at two years.",
      "Treatment-related adverse events: 77.1 per cent grade 1 or 2, 9.3 per cent grade 3, 3.6 per cent grade 4, no grade 5.",
    ],
    whatItMeans: "The uninjected-lesion responses are the most important result any oncolytic virus trial has produced, because they are the first strong clinical evidence that the mechanism is systemic immunity rather than local lysis. The caution is the same as always: this is a single-arm cohort in a population with no standard option, and the randomised confirmatory trial has not read out.",
    caveats: [
      "Single-arm, so the contribution of nivolumab alone in anti-PD-1-failed melanoma cannot be separated out; some patients respond to re-challenge.",
      "Accelerated approval rests on response rate; the randomised IGNYTE-3 trial has to confirm it.",
      "Still requires injectable lesions, so the population is selected for accessible disease.",
    ],
    links: [doi("10.1200/JCO-25-01346", "JCO 2025"), pubmed("40627813")],
    technologies: ["oncolytic-virus"], drugs: ["vusolimogene-oderparepvec", "nivolumab"], cancers: ["melanoma", "advanced-melanoma"], companies: ["replimune"], sections: ["immunotherapy"], journals: ["jco"],
  }),
  p({
    id: "paper-russell-mv-nis-myeloma-mayo-2014",
    name: "Russell 2014: a measles virus given into the vein put one patient's myeloma into complete remission",
    tldr: "Two people with drug-resistant myeloma were given an enormous dose of engineered measles virus into a vein; both responded and one went into a lasting complete remission.",
    summary: "MV-NIS is an engineered measles virus that is selectively destructive to myeloma plasma cells and carries the sodium iodide symporter gene, so that where the virus is replicating can be imaged non-invasively with radioiodine. Two measles-seronegative patients with relapsing, drug-refractory myeloma and multiple glucose-avid plasmacytomas were given a single intravenous infusion of 10^11 tissue culture infectious doses.\n\nBoth responded, with reduction in M protein and resolution of bone marrow plasmacytosis, and one had a durable complete remission at all disease sites. Symporter-mediated radioiodine uptake in virus-infected plasmacytomas documented that the virus had reached and was replicating in the tumours. Toxicities resolved within the first week.\n\nThe two patients were selected for being measles-seronegative, which almost nobody is, and the dose is at the edge of what can be manufactured. That is the paper's real content: proof that intravenous oncolytic virotherapy can work, and a demonstration of exactly why it usually cannot.",
    journal: "Mayo Clinic Proceedings", year: 2014, doi: "10.1016/j.mayocp.2014.04.003", pmid: "24835528",
    authors: "Russell SJ, Federspiel MJ, Peng KW, et al.", paperType: "translational", participants: 2,
    findings: [
      "Two measles-seronegative patients with relapsing drug-refractory myeloma received a single intravenous infusion of 10^11 tissue culture infectious doses of MV-NIS.",
      "Both responded with reduction in M protein and resolution of bone marrow plasmacytosis; one had a durable complete remission at all disease sites.",
      "Sodium iodide symporter-mediated radioiodine imaging documented virus replication inside the plasmacytomas, confirming tumour targeting.",
      "Toxicities resolved within the first week after therapy.",
    ],
    whatItMeans: "This is the case most often cited to argue that oncolytic viruses can cure. It should be cited with its conditions: two patients, both chosen because they had no pre-existing measles antibodies, and a dose so large that manufacturing it is itself a research problem. It proves the biology is real and simultaneously explains why the approach has not generalised.",
    caveats: [
      "Two patients, one durable remission. This is a case report, not evidence of efficacy.",
      "Both patients were measles-seronegative, which excludes nearly everyone vaccinated or previously infected; pre-existing neutralising antibody is the main barrier to intravenous delivery.",
      "The dose, 10^11 infectious units, is at the limit of what current manufacturing can supply.",
      "Later trials of MV-NIS in larger, unselected populations have not reproduced this result.",
    ],
    links: [doi("10.1016/j.mayocp.2014.04.003", "Mayo Clin Proc 2014"), pubmed("24835528")],
    technologies: ["oncolytic-virus"], cancers: ["multiple-myeloma"], people: ["stephen-russell", "evanthia-galanis"], sections: ["immunotherapy"],
  }),

  // ---------------------------------------------------------------- The failures
  p({
    id: "paper-cloughesy-toca5-glioma-jamaoncol-2020",
    name: "Toca 5: a virus plus a prodrug in recurrent brain cancer, tested properly, and it did not work",
    tldr: "Four hundred people with a brain tumour that had come back were randomly given either a virus-delivered enzyme plus a pill it converts into chemotherapy, or standard treatment; survival was the same.",
    summary: "Randomised, open-label phase 2/3 trial at 58 centres in the United States, Canada, Israel and South Korea. 403 patients having resection for a first or second recurrence of glioblastoma or anaplastic astrocytoma were randomised 1:1 to vocimagene amiretrorepvec, a retroviral replicating vector injected into the resection cavity wall, followed by cycles of oral flucytosine starting six weeks after surgery, or to investigator's choice of lomustine, temozolomide or bevacizumab.\n\nMedian overall survival was 11.10 months with the virus and prodrug and 12.22 months with standard of care, hazard ratio 1.06 (95% CI 0.83 to 1.35), p = 0.62. No secondary endpoint showed a significant difference. Adverse event rates were similar.\n\nThe design was the best case for the approach: the virus is injected under direct vision into the cavity where the tumour was, the prodrug converts to fluorouracil only where the virus has spread, and the trial was properly randomised and adequately sized. It still failed.",
    journal: "JAMA Oncology", year: 2020, doi: "10.1001/jamaoncol.2020.3161", pmid: "33119048",
    authors: "Cloughesy TF, Petrecca K, Walbert T, et al.", paperType: "rct", participants: 403, changedPractice: false,
    findings: [
      "Median overall survival 11.10 months with vocimagene amiretrorepvec and flucytosine versus 12.22 months with standard of care; hazard ratio 1.06 (95% CI 0.83 to 1.35), p = 0.62.",
      "No secondary endpoint, including durable response rate and 12-month overall survival, showed a significant difference.",
      "Adverse event rates were similar between the arms.",
      "271 deaths among 403 randomised patients at a median follow-up of 22.8 months.",
    ],
    whatItMeans: "The clearest randomised refutation in the field. Phase 1 data had looked encouraging, the delivery problem was solved by surgical access, and the killing mechanism was a well-understood chemotherapy released in place. None of it translated. Any claim that oncolytic virotherapy works in glioma has to be read against this trial.",
    caveats: [
      "Open-label, and the control arm was a choice of three agents, none of them strong in recurrent high-grade glioma.",
      "Vocimagene amiretrorepvec is a replicating retroviral vector delivering a prodrug-converting enzyme rather than a directly lytic virus, so the result does not transfer straightforwardly to lytic platforms.",
      "Phase 1 results that prompted the trial came from a selected population.",
    ],
    links: [doi("10.1001/jamaoncol.2020.3161", "JAMA Oncol 2020"), pubmed("33119048"), { label: "ClinicalTrials.gov NCT02414165", url: "https://clinicaltrials.gov/study/NCT02414165" }],
    technologies: ["oncolytic-virus"], cancers: ["glioblastoma"], people: ["timothy-cloughesy"], sections: ["immunotherapy"], journals: ["jama-oncology"],
  }),
  p({
    id: "paper-abou-alfa-phocus-pexa-vec-liver-cancer-2024",
    name: "PHOCUS: an oncolytic vaccinia virus before sorafenib in liver cancer did worse than sorafenib alone",
    tldr: "Adding injections of an engineered pox virus before standard liver cancer treatment did not help and the results were worse than the control arm, so the trial was stopped early.",
    summary: "Randomised, open-label phase 3 trial at 142 sites in 16 countries of pexastimogene devacirepvec, an oncolytic and immunotherapeutic vaccinia virus, injected into the tumour and followed by sorafenib, against sorafenib alone, in advanced hepatocellular carcinoma with no prior systemic treatment. 459 patients were randomised between December 2015 and the interim analysis in August 2019.\n\nAt the interim analysis median overall survival was 12.7 months with the sequence and 14.0 months with sorafenib alone, which led to early termination. Median time to progression was 2.0 months against 4.2 months. Objective response was 19.2 per cent against 20.9 per cent and disease control 50.0 per cent against 57.3 per cent. Serious adverse events occurred in 53.7 per cent against 35.5 per cent, liver failure being the commonest in both arms.\n\nEarlier phase 2 work had reported a dose-related survival difference after intratumoural injection of the same virus, which is the reason the phase 3 was run.",
    journal: "Liver Cancer", year: 2024, doi: "10.1159/000533650", pmid: "38756145",
    authors: "Abou-Alfa GK, Galle PR, Chao Y, et al.", paperType: "rct", participants: 459, changedPractice: false,
    findings: [
      "Median overall survival 12.7 months (95% CI 9.89 to 14.95) with pexastimogene devacirepvec then sorafenib versus 14.0 months (95% CI 11.01 to 18.00) with sorafenib alone; the trial was terminated early.",
      "Median time to progression 2.0 months versus 4.2 months.",
      "Objective response 19.2 per cent versus 20.9 per cent; disease control 50.0 per cent versus 57.3 per cent.",
      "Serious adverse events in 53.7 per cent versus 35.5 per cent, liver failure commonest in both arms.",
    ],
    whatItMeans: "A phase 2 signal that looked like a survival benefit, tested in 459 patients, turned out to be nothing, and delaying effective systemic treatment to give the virus first made outcomes worse. The authors' own conclusion is that the arrival of checkpoint inhibitors should direct any further development of oncolytic virus strategies, which is a polite way of saying this design is finished.",
    caveats: [
      "Open-label, and the sequential design confounds the virus with the delay in starting sorafenib.",
      "Sorafenib alone was standard when the trial started but was superseded during it, so the control arm is no longer current practice.",
      "Reported at interim analysis after early termination, so the final dataset is smaller than planned.",
    ],
    links: [doi("10.1159/000533650", "Liver Cancer 2024"), pubmed("38756145")],
    technologies: ["oncolytic-virus"], cancers: ["hcc"], sections: ["immunotherapy"],
  }),
  p({
    id: "paper-hietanen-rigvir-echovirus-viruses-2022",
    name: "Hietanen 2022: the marketed oncolytic virus Rigvir was no more oncolytic than any other echovirus isolate",
    tldr: "A virus sold for years as a cancer treatment in Latvia was sequenced and tested against ordinary strains of the same virus, and it killed cancer cells no better, and infected healthy cells too.",
    summary: "Rigvir was a cell-adapted enterovirus derived from an echovirus 7 isolate, registered in Latvia and promoted internationally as an oncolytic virotherapy, particularly for melanoma. Hietanen and colleagues sequenced Rigvir and five other echovirus 7 isolates, analysed the genomes, and ran cell infectivity assays on eight cell lines including both cancer and non-cancer lines.\n\nPhylogenetically Rigvir sat in its own clade at the root, most distant from the other isolates, and carried nine unique capsid mutations, six of them at surface-exposed residues, one at the contact interface with decay-accelerating factor. Functionally, the infectivity assays showed no discernible difference in oncolytic effect between Rigvir, the Wallace prototype and four other echovirus 7 isolates, and Rigvir also infected non-cancer cell lines. The authors conclude that the claim of Rigvir being an effective treatment against multiple cancers is not warranted by the evidence presented, and that neither the bioinformatics nor the cell work reveals a mechanism.",
    journal: "Viruses", year: 2022, doi: "10.3390/v14030525", pmid: "35336934",
    authors: "Hietanen E, Koivu MKA, Susi P", paperType: "basic",
    findings: [
      "Rigvir showed no discernible difference in oncolytic effect from the Wallace prototype or four other echovirus 7 isolates across eight cell lines.",
      "Rigvir infected non-cancer cell lines as well as cancer lines, contradicting the claim that it is oncotropic.",
      "Phylogenetic analysis placed Rigvir in its own clade at the root of the tree, most distant from the other echovirus 7 isolates studied.",
      "Nine unique capsid mutations were found, six at surface-exposed residues, one at the contact interface with decay-accelerating factor.",
      "No mechanism for the claimed oncolytic and oncotropic behaviour emerged from either the sequence analysis or the infectivity work.",
    ],
    whatItMeans: "Rigvir is the field's clearest case of a product sold far ahead of its evidence: a national registration, international marketing to patients, and no randomised trial. This is the laboratory work that should have been done first. It is here because a field that produces striking single cases attracts exactly this, and readers deserve to know that an approval somewhere in the world is not the same as evidence.",
    caveats: [
      "Cell culture work, which cannot by itself disprove a clinical effect; the point is that no adequate clinical evidence exists either.",
      "The manufacturer disputed the findings in a published comment, to which the authors replied; both exchanges are in the same journal.",
      "Rigvir is not a genetically engineered oncolytic virus and does not represent the mainstream of the field.",
    ],
    links: [doi("10.3390/v14030525", "Viruses 2022"), pubmed("35336934"), doi("10.3390/v14092078", "Authors' reply to the manufacturer's comment")],
    technologies: ["oncolytic-virus"], cancers: ["melanoma"], sections: ["immunotherapy"],
  }),

  // ---------------------------------------------------------------- Neoadjuvant rationale and the self-experiment
  p({
    id: "paper-bourgeois-daigneault-neoadjuvant-ovt-tnbc-scitranslmed-2018",
    name: "Bourgeois-Daigneault 2018: giving the virus before surgery, not after everything else has failed",
    tldr: "In mice with triple-negative breast cancer, treating with a cancer-killing virus before the tumour was removed made checkpoint immunotherapy work afterwards, which it otherwise did not.",
    summary: "Triple-negative breast cancer has few treatment options and immune checkpoint inhibitors have had limited success in it. Because checkpoint inhibitors work best where anticancer immunity already exists, and oncolytic viruses induce anticancer immunity, Bourgeois-Daigneault and colleagues tested the virus as a way of creating the conditions for the checkpoint inhibitor.\n\nIn a model designed to mimic the course of treatment for a woman newly diagnosed with triple-negative breast cancer, early oncolytic virus treatment combined with surgical resection produced long-term benefit, and sensitised otherwise refractory tumours to checkpoint blockade, preventing relapse in most treated animals. The authors proposed testing this in the window between diagnosis and surgery.\n\nThis is the published rationale for the neoadjuvant use of oncolytic virotherapy, and it is the argument the 2024 self-experiment case report cites for its own design.",
    journal: "Science Translational Medicine", year: 2018, doi: "10.1126/scitranslmed.aao1641", pmid: "29298865",
    authors: "Bourgeois-Daigneault MC, Roy DG, Aitken AS, et al.", paperType: "basic",
    findings: [
      "Oncolytic virus treatment given early, with surgical resection, produced long-term benefit in a model mimicking the treatment course of newly diagnosed triple-negative breast cancer.",
      "The virus sensitised tumours otherwise refractory to immune checkpoint blockade, preventing relapse in most treated animals.",
      "The proposed clinical translation is the window of opportunity between diagnosis and surgery, rather than the late metastatic setting where oncolytic viruses are usually tested.",
    ],
    whatItMeans: "The field's standing explanation for its own poor clinical record is that it has been tested in the wrong patients: people with widely metastatic, heavily pretreated disease and exhausted immune systems. This paper is the preclinical case for testing it in the opposite situation, in early disease before surgery, where an immune response can still be built.",
    caveats: [
      "Mouse models of triple-negative breast cancer, which have repeatedly predicted immunotherapy benefits that did not appear in patients.",
      "The neoadjuvant hypothesis remains untested in a randomised trial in breast cancer.",
      "Sensitising to checkpoint blockade in mice has a poor track record of translating; the randomised combination trial in melanoma was negative.",
    ],
    links: [doi("10.1126/scitranslmed.aao1641", "Sci Transl Med 2018"), pubmed("29298865")],
    technologies: ["oncolytic-virus"], cancers: ["tnbc"], sections: ["immunotherapy"], journals: ["science-translational-medicine"],
  }),
  p({
    id: "paper-halassy-self-experiment-ovt-vaccines-2024",
    name: "The self-experiment: a virologist treated her own recurrent breast cancer with two viruses she made in her own laboratory",
    tldr: "A virologist whose breast cancer had come back and grown into the chest muscle injected it herself with a measles vaccine strain and then a second virus, the tumour shrank enough to be removed by simple surgery, and she was free of recurrence more than three years later.",
    summary: "Case report of a 50-year-old woman with locally recurrent, muscle-invasive breast cancer who was also a virologist, and who treated the tumour herself with intratumoural injections of research-grade virus preparations made in her own laboratory before having any other treatment for the recurrence.\n\nThe history: multifocal invasive ductal triple-negative breast cancer diagnosed in 2016, treated with mastectomy and adjuvant chemotherapy; a small local recurrence excised in 2018, leaving a seroma under 1 cm that was monitored; by 2020 that had become a 2 cm solid, hard, inflamed nodule. Magnetic resonance imaging, positron emission tomography with computed tomography and two independent ultrasound estimates all gave a volume of 2.47 plus or minus 0.06 cm3, with invasion into the pectoral muscle and infiltration of the skin, and no evidence of metastatic or nodal disease. A baseline core biopsy showed the tumour had changed phenotype from triple-negative to HER2 3+.\n\nThe protocol: seven injections of an Edmonston-Zagreb measles vaccine strain at three to four day intervals over three weeks, then three injections of a vesicular stomatitis virus Indiana strain separated by two weeks and one week, then surgical excision. Two months after excision, one subcutaneous dose of measles virus was given around the surgical suture. Totals were 7.89 log CCID50 of measles virus and 9.07 log CCID50 of vesicular stomatitis virus, given multifocally in 1 to 2 mL. Neither virus had been engineered to improve its oncolytic properties; the preparations were clarified cell culture supernatants grown in MRC-5 and Vero cells, not purified from host-cell nucleic acid and protein.\n\nThe outcome: the tumour transiently swelled to 4.28 cm3 by day 8 and to 2.17 cm3 on day 41 after the first vesicular stomatitis virus dose, then shrank; the excised tumour measured 0.91 cm3 pathologically. It was confined to the subcutis with no skin or muscle infiltration, in contrast to baseline. Lymphocyte infiltration rose from 10 to 45 per cent, CD20-positive B cells from 10 to 70 per cent, CD8-positive T cells from 30 to 60 per cent, macrophage infiltration increased, and PD-L1 became detectable in a tumour that had been PD-L1 negative. Neutralising antibody titres to both viruses were low but measurable at baseline and rose a hundredfold. The only systemic adverse event was fever and rigors twelve hours after the first vesicular stomatitis virus dose, resolving over three days; injections were painful at first. Because the excised tumour was HER2 3+ she completed one year of adjuvant trastuzumab, and was recurrence-free 45 months after surgery, against previous recurrence intervals of 22 and 21 months.\n\nOn ethics, the authors state that as a case of self-experimentation it does not require ethics committee review, that the patient was fully informed and consented, and that her oncologists agreed to monitor and to intervene with conventional therapy if there were adverse effects or progression. Their conclusion states plainly that self-medicating with oncolytic viruses should not be the first approach to a diagnosed cancer, and asks instead for formal clinical trials of the neoadjuvant setting. The senior author disclosed becoming a consultant to Vyriad in 2021, and a European patent application covering the subject matter.",
    journal: "Vaccines", year: 2024, doi: "10.3390/vaccines12090958", pmid: "39339989",
    authors: "Forcic D, Mrsic K, Peric-Balja M, Kurtovic T, Ramic S, Silovski T, Pedisic I, Milas I, Halassy B", paperType: "observational", participants: 1, changedPractice: false,
    findings: [
      "Seven intratumoural doses of an Edmonston-Zagreb measles vaccine strain over three weeks, then three doses of a vesicular stomatitis virus Indiana strain, totalling 7.89 log CCID50 of measles virus and 9.07 log CCID50 of vesicular stomatitis virus.",
      "Tumour volume fell from 2.47 plus or minus 0.06 cm3 at baseline, by four independent imaging estimates, to 0.91 cm3 measured pathologically in the excised specimen, after transient swelling to 4.28 cm3 on day 8.",
      "The excised tumour was confined to the subcutis with no skin or pectoral muscle infiltration, in contrast to the baseline imaging, so a simple non-invasive resection was possible.",
      "Lymphocyte infiltration rose from 10 to 45 per cent; CD20-positive B cells from 10 to 70 per cent; CD8-positive T cells from 30 to 60 per cent; macrophage infiltration increased; PD-L1 became detectable in a previously PD-L1-negative tumour.",
      "Neutralising antibody titres against both viruses were low but measurable at baseline and rose a hundredfold during treatment.",
      "The only systemic adverse event was fever and rigors twelve hours after the first vesicular stomatitis virus dose, resolving over three days.",
      "The tumour had changed phenotype from triple-negative at first diagnosis to HER2 3+ on the baseline biopsy, so one year of adjuvant trastuzumab was given after surgery; the patient was recurrence-free 45 months after surgery.",
    ],
    whatItMeans: "One person, one tumour, one report, and it is not evidence that anyone should treat themselves. What it does contribute is unusually well documented: serial imaging through the course, a baseline biopsy and an excised specimen scored by the same pathology department, antibody titres, and a named protocol with doses. The design choices are the interesting part. Two different viruses in sequence to stay ahead of the antiviral antibody response, frequent dosing to keep infectious virus concentrated in the tumour, and the neoadjuvant setting rather than the late metastatic setting in which oncolytic viruses are normally tested. The result also cannot be attributed to the viruses alone: the tumour was surgically removed and a year of trastuzumab followed, and the phenotype change to HER2 3+ is itself a plausible reason the disease behaved differently this time.",
    caveats: [
      "A single case, uncontrolled, in a patient with exceptional expertise and access; it establishes nothing about efficacy.",
      "The tumour was excised and one year of trastuzumab followed, so the 45-month recurrence-free interval cannot be attributed to the viruses.",
      "The tumour had converted from triple-negative to HER2 3+, a change that by itself alters both prognosis and treatment options.",
      "The virus preparations were research grade, unpurified clarified cell-culture supernatants containing host-cell nucleic acid and protein, so the biological agent was not the virus alone.",
      "Neither virus was engineered for tumour selectivity; wild-type vesicular stomatitis virus is considered potentially neurotoxic in humans and the authors call for neurotoxicity studies before any development.",
      "The authors' own conclusion states that self-medication with oncolytic viruses should not be a first approach to a diagnosed cancer.",
      "Declared interests: the senior author became a consultant to Vyriad in 2021 and the work is the subject of a European patent application.",
    ],
    links: [doi("10.3390/vaccines12090958", "Vaccines 2024 (open access)"), pubmed("39339989"), epmc("39339989"), { label: "Europe PMC full text", url: "https://europepmc.org/articles/PMC11435696" }],
    technologies: ["oncolytic-virus"], cancers: ["tnbc", "breast-her2-positive"], people: ["beata-halassy", "dubravko-forcic"],
    related: ["paper-pugh-self-experimentation-publication-jme-2026", "paper-bourgeois-daigneault-neoadjuvant-ovt-tnbc-scitranslmed-2018"],
    drugs: ["trastuzumab"], sections: ["immunotherapy"],
  }),
  p({
    id: "paper-pugh-self-experimentation-publication-jme-2026",
    name: "Pugh 2026: should a journal publish a scientist's experiment on herself?",
    tldr: "Three ethicists work through whether it was right to publish the virologist's case, separating the question of whether she should have done it from whether the result should have been printed.",
    summary: "Pugh, Wilkinson and Savulescu take the 2024 self-experimentation case report as their worked example and separate two questions that are usually run together: the performance question, whether it is ethical to experiment on oneself, and the publication question, whether it is ethical to publish the findings as research. They note that the case report's authors reported difficulty publishing because of concerns raised about the ethics of self-experimentation.\n\nThey argue that self-experimentation is not inherently unethical, and equally that there is no reason in principle to exempt it from ethical evaluation. Applying respect for autonomy, reasonable risk and prevention of harm to others, they conclude that publication of this particular report can be morally justified: the self-experimenter understood the choice, the viruses had a good safety profile, and the authors were explicit about the limited generalisability and that self-medication should not be a first approach. They note that live viruses do carry shedding and transmission risk to others, and that publication carries the separate risk of tempting other patients towards unconventional therapies before standard ones.\n\nThey recommend case-by-case assessment by ethics committees and journal editors rather than a blanket rule, encourage self-experimenters to seek review where publication is foreseeable, and give a decision algorithm. They set the case in a long history that includes Werner Forssmann and Barry Marshall, who both later received Nobel prizes, and scientists who died of their own experiments.",
    journal: "Journal of Medical Ethics", year: 2026, doi: "10.1136/jme-2025-110730", pmid: "40930709",
    authors: "Pugh J, Wilkinson D, Savulescu J", paperType: "review",
    findings: [
      "The performance question and the publication question are distinct: liberal norms of non-interference may govern whether a person may experiment on themselves, but not whether the result should be published as research.",
      "Self-experimentation is not inherently unethical, and is not in principle exempt from ethical evaluation either.",
      "Live oncolytic viruses expose others to shedding and unintentional transmission risk, which is a genuine harm-to-others consideration, mitigable by storage, handling and administration protocols.",
      "Publication can tempt other patients towards unconventional therapy ahead of standard treatment, which is a reason for authors to state limits explicitly, as these authors did.",
      "The authors conclude that publishing this report was morally justifiable, and propose a decision algorithm for editors facing similar submissions.",
    ],
    whatItMeans: "The reason this case matters beyond one tumour is that it forced journals to decide a question they had avoided. The answer these authors give is not permission: it is that each case needs assessing against the values ethics committees exist to protect, and that a self-experimenter who expects to publish should seek review beforehand. For a reader the practical point is the one both papers make, that a published case is a record of what happened to one person and not an instruction.",
    caveats: [
      "A normative ethics paper, not empirical research; the decision algorithm is a proposal and has no formal standing.",
      "It analyses a case in which the self-experimenter was a professional virologist with laboratory access, and the authors are explicit that the reasoning does not extend to amateur self-experimentation.",
      "One declared interest: a bioethics consultancy and advisory roles are disclosed by one author.",
    ],
    links: [doi("10.1136/jme-2025-110730", "J Med Ethics 2026 (open access)"), pubmed("40930709"), { label: "Europe PMC full text", url: "https://europepmc.org/articles/PMC7618749" }],
    technologies: ["oncolytic-virus"], people: ["beata-halassy"], related: ["paper-halassy-self-experiment-ovt-vaccines-2024"], sections: ["immunotherapy"],
  }),
];
