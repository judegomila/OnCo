import type { TechnologyInput } from "@/lib/schema";
import { HEREDITARY_TEST_IDS_2026 } from "./hereditary-gaps-2026-11";

const asOf = "2026-09-04";
const W = (s: string) => `https://en.wikipedia.org/wiki/${s}`;

export const technologies: TechnologyInput[] = [
  // ======================= IMAGING =======================
  {
    id: "ct", machineFamily: "imaging", aka: ["CT scan", "computed tomography", "CAT scan", "CT scanning", "contrast-enhanced CT"], related: ["photon-counting-ct", "dual-energy-spectral-ct", "x-ray-radiography-fluoroscopy", "intraoperative-mri-ct"], kind: "technology", name: "CT (computed tomography)", sections: ["imaging"], status: "standard-of-care", asOf, since: 1971, wikipedia: W("CT_scan"),
    tldr: "A CT scan is a fast 3D X-ray that shows the size and shape of tumours and whether they have spread.",
    summary: "Computed tomography rotates an X-ray source and detector around the body and reconstructs the measured attenuation into cross-sectional images, with iodinated contrast highlighting vasculature. In use since 1971, it is the workhorse of staging and response assessment and the standard measurement tool for RECIST. It is fast, ubiquitous, offers sub-millimetre resolution and is excellent for lung, liver, bone and lymph nodes. Its limits are that it shows anatomy only, so it cannot distinguish scar from live tumour or give biological information, it has limited soft-tissue contrast, it performs poorly for brain, marrow and small peritoneal disease, and it delivers ionising radiation. Photon-counting CT improves resolution at lower dose, while PET/CT and MRI fill the gaps in biology and soft tissue. CT is the quick 3D X-ray that most cancer decisions are measured against.",
    principle: "A rotating X-ray source and detector measure attenuation, which is reconstructed into cross-sectional images. Iodinated contrast highlights vasculature.",
    strengths: ["Fast, ubiquitous", "Sub-millimetre resolution", "Standard for RECIST response"],
    limitations: ["Anatomic only; cannot distinguish scar from live tumour", "Radiation dose", "Poor for brain, marrow, and small peritoneal disease"],
    terms: ["recist"], links: [{ label: "Wikipedia", url: W("CT_scan") }], companies: ["nucleo-research", "onc-ai", "quantum-surgical", "xact-robotics", "siemens-healthineers", "ge-healthcare", "philips", "canon-medical", "united-imaging", "fujifilm"],
  },
  {
    id: "mri", machineFamily: "imaging", trials: ["takahashi-pci", "nct06262139"], related: ["mri-field-strengths", "intraoperative-mri-ct"], kind: "technology", name: "MRI", sections: ["imaging"], status: "standard-of-care", asOf: "2026-11-12", since: 1977, wikipedia: W("Magnetic_resonance_imaging"),
    tldr: "Magnetic resonance imaging uses a magnetic field and radio waves for tissue images, including selected high-risk breast screening. Enhancement and volume do not directly count living cancer cells.",
    summary: "Magnetic resonance imaging (MRI) records tissue-dependent signals using a magnetic field and radiofrequency pulses. In contrast-enhanced breast MRI, intravenous gadolinium changes those signals. Dynamic contrast-enhanced imaging (DCE) acquires images before and at specified times after contrast. Enhancement depends on delivery, vascular and tissue distribution, and acquisition; its shape, distribution and time course help interpretation. Benign tissue can enhance too.\n\nMRI can describe regional extent and changes during treatment. A change in contrast signal does not establish pathological complete response (pCR), which concerns examined tissue. Residual disease can be inconspicuous, while nonmalignant tissue and treatment changes can enhance. Image-derived lengths and volumes need their own acquisition and calculation definitions.",
    principle: "Magnetic fields and radiofrequency pulses produce tissue-dependent signals; specified sequences and contrast timing determine the image contrast.",
    strengths: ["No ionising X-rays","Regional soft-tissue morphology and contrast patterns","Repeated acquisition can describe contrast time courses"],
    limitations: ["Slow and expensive", "Motion artefacts", "Gadolinium concerns in renal impairment"], links: [{ label: "Wikipedia", url: W("Magnetic_resonance_imaging") },
    {"label":"ACR/RSNA: breast MRI","url":"https://www.radiologyinfo.org/en/info/breastmr"},
    {"label":"Ray et al., 2018: background parenchymal enhancement","url":"https://pubmed.ncbi.nlm.nih.gov/29072981/"},
    {"label":"UCLA: non-mass enhancement","url":"https://www.uclahealth.org/departments/radiology/education/breast-imaging-teaching-resources/birads/breast-mri-findings-non-mass-enhancement-nme"},
    {"label":"Li et al., 2016: enhancement thresholds and FTV","url":"https://pubmed.ncbi.nlm.nih.gov/28066808/"},
    {"label":"Hylton et al., 2016: ACRIN 6657/I-SPY 1 FTV and recurrence-free survival","url":"https://pubmed.ncbi.nlm.nih.gov/26624971/"}
  ], journals: ["cancer-imaging", "radiology-imaging-cancer"], companies: ["adialante", "monteris-medical", "siemens-healthineers", "ge-healthcare", "philips", "canon-medical", "united-imaging", "fujifilm", "imagion-biosystems"],

  notes: [
    "Think of a contrast marker passing through a landscape. A brighter region records how that examination sees the marker and tissue, not a label attached to every cancer cell. Background parenchymal enhancement (BPE) is enhancement of normal fibroglandular breast tissue, described as minimal, mild, moderate or marked. It is separate from the amount of fibroglandular tissue and from mammographic density. Non-mass enhancement (NME) describes enhancement without a mass or focus, distinguishable from the background; benign, high-risk and malignant processes can overlap in that appearance. Neither a bright area nor an NME label supplies histology.",
    "Functional tumour volume (FTV) in research is a calculated volume of voxels inside a selected region that meet specified enhancement and processing rules. Changing thresholds, postcontrast time, region, software or registration can change which voxels qualify. Li and colleagues studied enhancement thresholds and recurrence-free survival in a particular breast cohort. DCE names an acquisition, BPE describes background, NME describes morphology, and FTV names a calculation. They are not four estimates of one quantity, and the word functional does not turn the calculated volume into an amount of viable tumour.",
    "A fictional report gives a 60 mm NME span and an FTV of 0.6 mL. Both can be correct: one is a length across an enhancement pattern, the other a three-dimensional selected-voxel volume. A symbolic grid of qualifying and nonqualifying squares supplies no voxel dimensions or complete segmentation with which to recalculate 0.6 mL. Ask for the region, thresholds, acquisition time and software before comparing calculations. Neither number establishes invasive extent, viable-cell number or tissue pCR, and neither needs to be declared wrong because the units differ.",
    "In ACRIN 6657/I-SPY 1, Hylton and colleagues analysed MRI-derived FTV and recurrence-free survival in 162 women with tumours at least 3 cm receiving neoadjuvant chemotherapy. The reported association concerns that cohort and calculation. It is neither a personal recurrence calculator nor a randomised demonstration that changing treatment in response to FTV improves outcomes.",
    "The measurement starts with the prescribed body region and imaging protocol, without removing a tissue specimen. Record the breast and finding, morphology and enhancement, dates and comparison scan, and whether a reported number is length in mm or cm or volume in cubic centimetres or mL. Motion or misregistration can alter a calculation. An FTV of zero means no volume met that calculation's qualifying rule; it does not establish zero microscopic disease. A negative regional examination cannot exclude disease throughout the body. Tissue and imaging answer different questions, each within its sampling limits."
  ]
},
  {
    id: "ultrasound", machineFamily: "imaging", trials: ["nct06693375"], related: ["ultrasound-elastography-ceus"], companies: ["ge-healthcare", "philips", "siemens-healthineers", "canon-medical", "fujifilm", "mindray", "imgt", "nanoecho", "beamworks"], kind: "technology", name: "Ultrasound", sections: ["imaging"], status: "standard-of-care", asOf: "2026-11-12", wikipedia: W("Medical_ultrasound"),
    tldr: "Diagnostic ultrasound uses returning sound waves to make images of a selected region and can guide a needle. An image or measured diameter does not establish the cell type or exclude all cancer.",
    summary: "Diagnostic ultrasound sends high-frequency sound pulses through a transducer and reconstructs images from returning echoes. Gel helps transmit sound between probe and skin. Echo timing and strength, the selected plane and examination settings contribute to the displayed structures; moving the probe changes the view. It uses no ionising X-rays. This diagnostic use is distinct from therapeutic ultrasound.\n\nBreast ultrasound can examine a focal breast or nodal finding, distinguish fluid-containing from solid findings, and guide a needle towards a target. Shape, orientation, margins, internal echoes and posterior behaviour are interpreted together. A simple cyst, a complex finding and a solid finding are not interchangeable diagnoses. Sampling adds tissue evidence; the live image guides the procedure but does not replace examination of the sample.",
    principle: "Pulse-echo of high-frequency sound; reflection at tissue interfaces builds the image. Doppler shows blood flow.",
    strengths: ["Real-time, portable, no radiation", "Ideal biopsy guidance"],
    limitations: ["Operator dependent", "Cannot see through bone or air"],
    cancers: ["tnbc", "breast-hr-positive", "thyroid", "pancreatic"], links: [{ label: "Wikipedia", url: W("Medical_ultrasound") },
    {"label":"ACR/RSNA: breast ultrasound","url":"https://www.radiologyinfo.org/en/info/breastus"},
    {"label":"NIBIB: diagnostic, Doppler and therapeutic ultrasound","url":"https://www.nibib.nih.gov/science-education/science-topics/ultrasound"}
  ],

  notes: [
    "The room-echo analogy explains the observation: a beam travels into tissue and returns from boundaries. Under a common assumed sound speed, a later return is placed deeper than an earlier one. That relationship does not identify cell type. A selected image plane is neither a histological section nor a survey of the whole body. Grayscale images primarily describe echo patterns; Doppler uses frequency changes from movement to describe blood-flow direction or speed. Its displayed colours depend on the mode and settings, rather than staining malignant cells. Flow is not itself proof of malignant activity.",
    "Not every cancer, calcification or MRI finding has an ultrasound counterpart. DCIS can appear as mammographic calcifications without a visible ultrasound mass. A missing correlate is not proof that the other finding is absent or benign. After treatment, a residual ultrasound finding can include tumour, treatment change or both. Diameter is a dimension of that finding, not a viable-cell count or a test for all-body eradication. Imaging and tissue results should be reconciled with the limits of both observations.",
    "Keep the examined region, side and location, depth, recorded axes, dimensions in mm or cm, examination date and comparison date. No tissue is removed by the imaging examination itself. Probe angle, compression, settings, boundary choice and imaging plane can affect a measured diameter; using the same machine name does not establish comparable measurements. A small difference between scans can include measurement variation. Neither darkness nor a smaller diameter establishes histology, molecular subtype or a pathological response.",
    "In a fictional course, the longest reported dimension is 18 mm on one dated examination and 15 mm on another. The printed length difference is 3 mm, or one-sixth of 18 mm. It is not a measured one-sixth reduction in cancer cells: axes, planes, compression, settings and selected boundaries may differ, and a linear dimension is not volume. A smaller finding can be useful information without proving tissue pCR. Keep the actual examination dates and use tissue evidence for the sampled pathological question."
  ]
},
  {
    id: "mammography", machineFamily: "imaging", related: ["ai-mammography-screening", "x-ray-radiography-fluoroscopy"], kind: "technology", name: "Mammography & tomosynthesis", sections: ["imaging", "early-detection"], status: "standard-of-care", asOf: "2026-11-12", wikipedia: W("Mammography"),
    tldr: "Mammography uses low-dose X-rays to show breast patterns such as masses and calcifications. Tomosynthesis reconstructs images from several angles; its sections are computed images, not tissue slides.",
    summary: "Mammography records how X-rays pass through a positioned, compressed breast. Fat and fibroglandular tissue contribute different image appearances. Compression reduces tissue overlap, thickness and motion. Standard digital mammography produces projection images; digital breast tomosynthesis acquires multiple angles and reconstructs thin sections. These computed sections are different from tissue that has been physically removed, prepared and stained.\n\nScreening asks about cancer in people without symptoms; a diagnostic examination investigates symptoms or an imaging finding and may use additional views. Neither label establishes that cancer is present. Masses and calcium deposits are findings whose pattern and distribution matter. A calcification is not itself proof of malignancy or a measure of viable cancer after treatment. A biopsy adds examination of sampled tissue.",
    principle: "Low-energy X-rays compress and image the breast; tomosynthesis acquires multiple angles and reconstructs slices.",
    strengths: ["Proven mortality benefit", "Cheap and scalable"],
    limitations: ["Reduced sensitivity in dense breasts", "Overdiagnosis of indolent lesions"],
    cancers: ["tnbc", "breast-hr-positive", "breast-her2-positive"],
    technologies: ["radiology-ai-screening"], people: ["kris-hallenga", "betty-ford", "nancy-brinker"], trials: ["tmist"], links: [{ label: "Wikipedia", url: W("Mammography") },
    {"label":"ACR/RSNA: mammography and tomosynthesis","url":"https://www.radiologyinfo.org/en/info/mammo"},
    {"label":"NCI: mammograms","url":"https://www.cancer.gov/types/breast/screening/mammograms"},
    {"label":"NCI: dense breasts","url":"https://www.cancer.gov/types/breast/breast-changes/dense-breasts"},
    {"label":"ACR/RSNA: breast imaging reports","url":"https://www.radiologyinfo.org/en/info/article-breast-imaging-report"}
  ], journals: ["journal-of-breast-imaging"], companies: ["kheiron-medical-technologies", "therapixel", "vara", "volpara-health", "hologic", "ge-healthcare", "siemens-healthineers", "fujifilm"],

  notes: [
    "Imagine viewing a stack of translucent layers: features at different depths can overlap in a projection. Mammography measures X-ray transmission, not reflected sound. Tomosynthesis uses several projections to reconstruct sections and reduce the effect of overlap; it does not stain cells or guarantee that every lesion becomes visible. A schematic with overlapping shapes and separated reconstructed sections illustrates the geometry, without identifying any shape as cancer. A prepared stained tissue section supplies a different, sampled observation.",
    "Breast density describes the relative fibroglandular appearance and amount compared with fat, not the fraction occupied by cancer. Dense tissue can mask a finding. Overlap, positioning and lesion type also limit detection. Keep the density description, prior examinations, dates and comparable views alongside the finding. BI-RADS organises imaging findings and assessment; it does not replace pathological diagnosis or establish cancer stage. A negative examination does not set a universal threshold below which microscopic or distant disease is absent.",
    "The imaging examination removes no tissue. Retain the positioned breast and named finding, morphology, distribution, assessment and comparison dates. A measured span in mm or cm is a length, not a three-dimensional volume or number of cells. Matching an image with the sampled pathology helps answer the finding's question but does not remove imaging blind spots or tissue-sampling limits.",
    "A fictional mammogram reports 24 mm of calcifications and no definite mass. It records a calcification span under that examination, not 24 mm of proven invasive or viable cancer. Calcium pattern, distribution, comparison and assessment remain relevant; absence of a mass does not establish benignity. An exact ultrasound counterpart is not guaranteed. The useful question is what the finding and any sampled tissue establish together, rather than converting the span into a cancer-cell amount."
  ]
},
  {
    id: "pet", machineFamily: "imaging", aka: ["PET scan", "positron emission tomography", "PET scanning", "PET imaging"], trials: ["nct05381103", "nct06084806", "nct03444844", "nct07615101", "nct06754085", "nct06369831", "nct04724369", "nct07691775", "nct07649122", "nct06474806"], drugs: ["choline-c11"], dependsOn: ["nuclear-medicine-hardware", "pet-tracer-manufacturing"], kind: "technology", name: "PET (positron emission tomography)", sections: ["imaging"], status: "standard-of-care", asOf: "2026-11-12", since: 1975, wikipedia: W("Positron_emission_tomography"),
    tldr: "Positron emission tomography shows the distribution of a named radioactive tracer. What the signal means depends on the tracer, normal physiology, disease and examination conditions.",
    summary: "Positron emission tomography (PET) detects photons produced when a positron emitted by a tracer annihilates with an electron. Detected photon pairs inform reconstruction of the activity distribution. The tracer molecule and its handling in the body determine the biological question; PET is not a label that marks every cancer cell. Anatomical imaging can help locate and interpret the distribution.\n\nNormal tissues and inflammatory processes can accumulate some tracers, while some malignant lesions produce little detectable signal. The field imaged, background, lesion size, acquisition, reconstruction and tracer biology limit detection. Whole-body terminology does not establish a microscopic disease census. Uptake measurements have a named tracer, time, unit and calculation; they are not percentages of malignant cells.",
    principle: "Positron emission and electron annihilation produce photon pairs used to reconstruct radiotracer activity; the tracer and examination protocol determine interpretation.",
    strengths: ["Whole-body biology in one scan", "Quantitative", "Any target with a ligand can in principle be imaged"],
    limitations: ["Resolution ~4 mm", "Tracer supply and cost", "Inflammation confounds FDG"],
    technologies: ["fdg-pet", "psma-pet", "fapi-pet", "trop2-pet", "her2-pet", "immuno-pet", "parp-pet"], related: ["molecular-imaging-roadmap"], links: [{ label: "Wikipedia", url: W("Positron_emission_tomography") },
    {"label":"NIBIB: nuclear medicine and PET","url":"https://www.nibib.nih.gov/science-education/science-topics/nuclear-medicine"},
    {"label":"Boellaard et al., 2015: EANM FDG PET/CT version 2.0","url":"https://pubmed.ncbi.nlm.nih.gov/25452219/"}
  ], companies: ["alpha-9-oncology", "evergreen-theragnostics", "juniper-biosciences", "curasight", "lumina-pharmaceuticals"],
  },
  {
    id: "pet-ct", machineFamily: "imaging", trials: ["nct03444844", "nct07615101", "nct06754085", "nct06369831", "nct07691775", "nct07649122"], dependsOn: ["pet", "ct"], companies: ["siemens-healthineers", "ge-healthcare", "philips", "united-imaging", "canon-medical"], kind: "technology", name: "PET/CT", sections: ["imaging"], status: "standard-of-care", asOf: "2026-11-12", since: 2001, wikipedia: W("PET-CT"),
    tldr: "PET/CT combines a named tracer-distribution image with X-ray anatomy. Uptake, anatomy and the scan conditions are interpreted together; a hot spot does not by itself identify malignant cells.",
    summary: "PET/CT combines positron emission tomography with computed tomography. PET reconstructs radiotracer activity; CT adds anatomical information and can support attenuation correction. Registration helps relate the two, without guaranteeing an exact match in moving tissues. A low-dose CT used for localisation and attenuation correction is not automatically a full diagnostic CT with its own acquisition and contrast protocol.\n\nTracer identity remains part of the scan identity. 18F-FDG concerns glucose handling, whereas an antibody or other target-directed tracer asks a different question. Normal physiology, inflammation and malignancy can contribute uptake. Structural and activity findings can also disagree. Interpretation retains anatomy, history, preparation, comparison images and, where indicated, tissue evidence.",
    principle: "Sequential PET and CT acquisition on one gantry; CT provides attenuation correction and anatomic localisation.",
    strengths: ["Anatomy plus biology", "Standard for lymphoma, lung, melanoma, head and neck staging"],
    limitations: ["CT radiation added to PET dose"],
    technologies: ["pet", "ct"], drugs: ["fludeoxyglucose-f18"], related: ["molecular-imaging-roadmap", "spect-ct", "biology-guided-radiotherapy"], links: [{ label: "Wikipedia", url: W("PET-CT") },
    {"label":"ACR/RSNA: PET/CT","url":"https://www.radiologyinfo.org/en/info/pet"},
    {"label":"Boellaard et al., 2015: EANM FDG PET/CT version 2.0","url":"https://pubmed.ncbi.nlm.nih.gov/25452219/"},
    {"label":"Boellaard et al., 2025: EANM FDG PET/CT version 3.0, identity only","url":"https://doi.org/10.1016/j.eanmj.2025.100006"}
  ], journals: ["cancer-imaging", "radiology-imaging-cancer"],

  notes: [
    "Think of two maps placed together: tracer distribution and X-ray anatomy. In a fictional drawing, a large and a small region start with comparable tracer concentration, but the small region's signal spreads into surrounding reconstructed space. Partial-volume effects can lower its apparent peak. The uncalibrated sketch is not an uptake simulation and cannot recover the original activity, count cells or identify malignancy. A lower-looking peak therefore does not prove less tracer was originally present. Lesion size, surrounding activity and tracer biology matter alongside resolution.",
    "Check the actual field imaged. EANM's 2015 version 2.0 calls skull-base-to-mid-thigh coverage torso imaging; it is not literally every body part. Even wider coverage cannot detect every microscopic deposit. Keep the administered tracer, imaged region and acquisition time with the report. Administered activity in megabecquerels (MBq) and activity concentration such as kilobecquerels per millilitre (kBq/mL) describe different quantities. Neither is a count of cancer cells.",
    "A standardised uptake value (SUV) normalises a measured activity concentration using administered activity and a stated body-size measure. SUL uses lean body mass; SUVmax is a voxel maximum, while SUVmean averages a defined region. These values are not percentages of target-positive or malignant cells. PERCIST uses specified SUL-based response measurements; that framework does not make all SUV summaries interchangeable. Keep uptake time, FDG glucose, calibration, reconstruction and region selection. Raw numbers from different tracers or protocols do not supply a controlled biological comparison or a universal malignancy cutoff.",
    "In a fictional example, a node is avid after inflammation in the region it drains. The report establishes uptake under the named tracer and conditions. Inflammation is an alternative explanation; uptake alone cannot decide between that and malignancy. Anatomy, timing, clinical history, earlier examinations and any appropriate sampled tissue add different evidence. Conversely, a non-avid node is not a negative tissue examination. A fall in SUV is a fall in that uptake measure, not automatically the same proportional reduction in cancer cells.",
    "The technical definitions here draw on the read passages of EANM's 2015 FDG PET/CT guideline, version 2.0. A 2025 version 3.0 is registered under DOI 10.1016/j.eanmj.2025.100006. Its full text could not be read, so the older definitions are not presented as a complete account of that revision. This source-version distinction also prevents a generic PET/CT description from substituting for a product's current acquisition instructions."
  ]
},
  {
    id: "pet-mri", machineFamily: "imaging", dependsOn: ["pet", "mri"], related: ["mri-field-strengths"], companies: ["siemens-healthineers", "ge-healthcare", "united-imaging"], kind: "technology", name: "PET/MRI", sections: ["imaging"], status: "established", asOf, since: 2010, wikipedia: W("PET-MRI"),
    tldr: "PET combined with MRI instead of CT, giving biology plus the best soft-tissue detail, at lower radiation dose.",
    summary: "PET/MRI acquires PET and MRI simultaneously or sequentially using MR-compatible detectors, pairing PET's biological signal with MRI's superior soft-tissue contrast instead of CT. Because MRI adds no ionising radiation, the combined dose is lower than PET/CT, which is why it is valuable in paediatrics and in patients who need repeated scans. It is also used in brain tumours, prostate and pelvic cancers, where MRI already outperforms CT for local staging. In clinical use since 2010, it remains limited by cost, the small number of scanners and long acquisition times, and attenuation correction is harder than with CT because MRI does not directly measure tissue density. Whether the added detail changes management enough to justify the expense is still debated outside those niches. It is PET plus the best soft-tissue pictures, at lower radiation dose but with fewer machines available.",
    principle: "PET and MRI are acquired simultaneously or sequentially with MR-compatible detectors.",
    strengths: ["Lower radiation", "Superior soft tissue"],
    limitations: ["Expensive, few scanners", "Long acquisition"],
    technologies: ["pet", "mri"], links: [{ label: "Wikipedia", url: W("PET-MRI") }],
  },
  {
    id: "fdg-pet", dependsOn: ["pet-ct"], kind: "technology", name: "FDG PET", sections: ["imaging"], status: "standard-of-care", asOf: "2026-11-12", wikipedia: W("Fludeoxyglucose_(18F)"),
    tldr: "FDG PET images the distribution of a radioactive glucose analogue. Normal tissues, inflammation and some cancers can take it up, so a bright area is not a diagnosis of cancer.",
    summary: "Fluorine-18 fluorodeoxyglucose (18F-FDG) is a radioactive glucose analogue used in PET. Its distribution reflects tracer delivery and glucose handling under the examination conditions, rather than a direct count of living cancer cells. Normal physiological uptake and inflammation can contribute signal, and some cancer deposits are not conspicuous.\n\nInterpretation keeps the clinical question, lesion size and background, blood glucose, preparation, uptake time, scanner calibration and reconstruction. A non-avid lesion is not negative histology. The method's usefulness and response criteria belong to a specified cancer and setting, rather than a universal availability or all-cancer claim.",
    principle: "FDG is taken up via GLUT transporters and trapped after phosphorylation by hexokinase.",
    strengths: ["Universal availability", "Decades of validation"],
    limitations: ["Non-specific: infection and inflammation are also hot", "Brain background", "Poor in indolent tumours"],
    technologies: ["pet"],
    terms: ["suv"], drugs: ["fludeoxyglucose-f18"], related: ["pet-adapted-her2-deescalation", "idea-metabolic-vulnerability-mapping"], links: [{ label: "Wikipedia", url: W("Fludeoxyglucose_(18F)") },
    {"label":"Boellaard et al., 2015: EANM FDG PET/CT version 2.0","url":"https://pubmed.ncbi.nlm.nih.gov/25452219/"},
    {"label":"ACR/RSNA: PET/CT","url":"https://www.radiologyinfo.org/en/info/pet"}
  ],
  },
  {
    id: "psma-pet", tags: ["precision"], trials: ["pop-rt"], drugs: ["choline-c11"], dependsOn: ["pet-ct", "radiopharmacy-network"], kind: "technology", name: "PSMA PET", sections: ["imaging", "radiopharma"], status: "standard-of-care", asOf, since: 2020,
    tldr: "A prostate-cancer-specific PET scan that finds spread far earlier than CT or bone scan, and tells you whether a matched radioactive drug will work.",
    summary: "PSMA PET uses small-molecule urea-based ligands that bind the active site of prostate-specific membrane antigen and are internalised, labelled with 68Ga or 18F. Approved agents are 68Ga-PSMA-11 (Illuccix, Locametz), 18F-DCFPyL (Pylarify, with Pylarify TruVu approved in March 2026) and 18F-rhPSMA-7.3 (Posluma). In clinical use since 2020, it is standard for initial staging of high-risk disease and for biochemical recurrence, where it detects disease at PSA below 0.5 ng/mL, far earlier than CT or bone scan. It is also the theranostic gatekeeper: a PSMA-positive scan is required to select patients for 177Lu-PSMA-617, as in VISION and PSMAfore. Around 10% of patients have PSMA-negative disease, and uptake in ganglia and salivary glands can be mistaken for tumour. It finds spread early and predicts whether the matched radioactive drug will work.",
    principle: "Small-molecule urea-based ligands bind PSMA's active site and are internalised.",
    strengths: ["Detects recurrence at PSA <0.5 ng/mL", "Theranostic gatekeeper"],
    limitations: ["PSMA-negative disease in ~10%", "Uptake in ganglia, salivary glands"],
    technologies: ["pet", "radioligand-therapy"],
    targets: ["psma"],
    cancers: ["prostate"], companies: ["clarity-pharmaceuticals", "juniper-biosciences", "antelope-surgical-solutions", "c-ray-therapeutics"], links: [{ label: "VISION: lutetium-177 PSMA-617 radioligand therapy extends survival in advanced prostate cancer (New England Journal of Medicine 2021)", url: "https://doi.org/10.1056/NEJMoa2107322" }, { label: "ClinicalTrials.gov NCT03392428: TheraP (ANZUP 1603)", url: "https://clinicaltrials.gov/study/NCT03392428" }],
  },
  {
    id: "fapi-pet", companies: ["chengdu-new-radiomedicine-technology"], kind: "technology", name: "FAPI PET", sections: ["imaging"], status: "phase-3", asOf, since: 2018, wikipedia: W("Fibroblast_activation_protein,_alpha"),
    tldr: "FAPI PET is a PET scan that lights up the scaffolding around almost any solid tumour, including cancers the standard sugar scan misses.",
    summary: "Quinoline-based FAP inhibitors (FAPI-04, FAPI-46, FAPI-74) labelled with 68Ga or 18F image cancer-associated fibroblasts. Superior to FDG in pancreatic, gastric, HCC, and peritoneal disease in head-to-head series. Registrational trials for 68Ga-FAPI-46 and 18F-FAPI-74 (Sofie) are underway. Pairs with FAP-targeted radioligands.",
    principle: "Small molecule binds FAP on stromal fibroblasts; rapid uptake, low background, minimal brain and liver signal.",
    strengths: ["Pan-cancer, high contrast", "No fasting needed", "Sees desmoplastic tumours FDG misses"],
    limitations: ["Also uptake in fibrosis, healing, arthritis", "Reports stroma not tumour cells", "Not yet approved"],
    technologies: ["pet"],
    targets: ["fap"],
    cancers: ["pancreatic", "gastric", "hcc", "tnbc"], links: [{ label: "Wikipedia", url: W("Fibroblast_activation_protein,_alpha") }],
  },
  {
    id: "trop2-pet", kind: "technology", name: "TROP2 PET", sections: ["imaging", "adcs"], status: "phase-1",  since: 2023,
    tldr: "An experimental PET scan that shows whether a tumour carries the TROP2 protein, so doctors could pick the right ADC before giving it.",
    summary: "89Zr-labelled anti-TROP2 antibodies and 68Ga/18F-labelled TROP2 nanobodies and peptides (Fudan University, Peking Union, others) have been imaged in first-in-human studies in breast, lung, and pancreatic cancer. The goal is non-invasive, whole-body, heterogeneity-aware selection and monitoring for sacituzumab govitecan, datopotamab deruxtecan, and sacituzumab tirumotecan, where IHC has been an unreliable predictor.",
    principle: "A radiolabelled TROP2 binder is imaged; antibody tracers image at 3-6 days with 89Zr, nanobodies within 1-2 hours with 68Ga/18F.",
    strengths: ["Whole-body target map", "Could resolve intratumoural heterogeneity", "Repeatable on progression"],
    limitations: ["Early stage; no validated SUV cut-off", "Antibody tracers are slow; nanobodies have renal uptake", "Unclear whether expression level predicts ADC response"],
    technologies: ["pet", "adc", "immuno-pet"],
    targets: ["trop2"],
    cancers: ["tnbc", "nsclc", "breast-hr-positive"],
    drugs: ["sacituzumab-govitecan", "datopotamab-deruxtecan", "sacituzumab-tirumotecan"],
    tags: ["frontier"],
    asOf: "2026-10-06",
    links: [{"label": "ClinicalTrials.gov NCT07753499", "url": "https://clinicaltrials.gov/study/NCT07753499"}],
    notes: ["NCT07753499 studies 68Ga-MY6349 PET/CT in recurrent or metastatic thyroid cancer, comparing diagnostic performance with 68Ga-FAPI PET/CT. On October 6, 2026 the registry lists recruiting, 120 planned participants, an estimated August 1, 2026 start and estimated December 31, 2026 primary completion; last updated August 7, 2026. This is an interventional diagnostic study with phase not applicable, not a phase 1 therapy trial. No registry results are posted and diagnostic performance or ADC-response prediction is not established."],
  },
  {
    id: "her2-pet", links: [{ label: "Gebhart et al., ZEPHIR: molecular imaging of heterogeneity in advanced HER2-positive breast cancer with 89Zr-trastuzumab PET (Annals of Oncology 2016)", url: "https://doi.org/10.1093/annonc/mdv577" }], kind: "technology", name: "HER2 PET", sections: ["imaging", "adcs"], status: "phase-2", asOf, since: 2010,
    tldr: "HER2 PET is a PET scan using radiolabelled trastuzumab or smaller HER2 binders to map HER2 across all metastases at once.",
    summary: "HER2 PET images HER2 across every metastasis at once using a radiolabelled HER2 binder, either 89Zr-trastuzumab or smaller 68Ga- and 18F-labelled affibodies and nanobodies such as 68Ga-ABY-025 and 18F-GE-226. The result is a whole-body receptor map rather than a single biopsy, which matters because HER2 expression varies between lesions. The ZEPHIR and IMPACT trials studied these tracers, and uptake was predictive of response to T-DM1. It is most useful in heterogeneous HER2-low disease, where one biopsy may be unrepresentative and HER2-directed ADCs now have indications. Studied since 2010, it is not yet approved; trials have been small, and full-antibody tracers need days between injection and imaging, which smaller binders aim to shorten. It shows how much HER2 each tumour deposit carries without a needle.",
    principle: "Radiolabelled HER2 binder; whole-body receptor map.",
    strengths: ["Captures inter-lesion heterogeneity", "Non-invasive re-assessment"],
    limitations: ["Not approved; small trials", "Antibody tracers need days"],
    technologies: ["pet", "immuno-pet"],
    targets: ["her2"],
    cancers: ["breast-her2-positive", "breast-hr-positive", "gastric"],
  },
  {
    id: "immuno-pet", companies: ["var2-pharmaceuticals", "nanolattix"], dependsOn: ["pet-ct", "monoclonal-antibody"], kind: "technology", name: "Immuno-PET", sections: ["imaging", "immunotherapy"], status: "phase-2", asOf: "2026-11-12",
    tldr: "Immuno-PET uses a radiolabelled antibody or an antibody-derived binder to image its distribution. Uptake depends on access, binding and clearance as well as the target; clinical usefulness needs separate evidence.",
    summary: "Immuno-PET uses radiolabelled antibodies or antibody-derived binders. Full immunoglobulin G (IgG), antigen-binding fragments (Fab), minibodies and single-domain nanobodies differ in size and pharmacokinetics. The format can affect penetration, clearance, retention and normal-organ background; there is no universal best format. A label makes the binder traceable, not a perfect detector of every target site.\n\nThe radionuclide must suit the product's imaging time course. Dijkers' 89Zr-trastuzumab study examined a full antibody over several days; Keyaerts' 68Ga-HER2 nanobody study imaged at earlier times. These are product-specific examples. Antibody imaging can concern a tumour-associated target or immune cells. CD8 binder imaging belongs here; granzyme-B peptide or peptidomimetic imaging is a different tracer class and has its own record.",
    principle: "A positron-emitting label is incorporated into an antibody-derived tracer with chemistry appropriate to that product; serial distribution depends on the binder, label, administered mass and time.",
    strengths: ["Images target and immune infiltrate non-invasively", "Any antibody can be turned into a tracer"],
    limitations: ["Slow kinetics for full antibodies", "Cost of 89Zr"],
    technologies: ["pet"],
    targets: ["trop2", "her2", "pd1", "pdl1"], links: [{ label: "Bensch et al., 89Zr-atezolizumab imaging as a non-invasive approach to assess clinical response to PD-L1 blockade (Nature Medicine 2018)", url: "https://doi.org/10.1038/s41591-018-0255-8" },
    {"label":"Dijkers et al., 2010: 89Zr-trastuzumab feasibility in metastatic breast cancer","url":"https://pubmed.ncbi.nlm.nih.gov/20357763/"},
    {"label":"Keyaerts et al., 2016: phase 1 68Ga-HER2 nanobody study","url":"https://pubmed.ncbi.nlm.nih.gov/26449837/"},
    {"label":"Farwell et al., 2022: CD8 minibody first-in-human study","url":"https://pubmed.ncbi.nlm.nih.gov/34413145/"},
    {"label":"Kist de Ruijter et al., 2022: whole-body CD8 PET","url":"https://pubmed.ncbi.nlm.nih.gov/36471036/"}
  ],

  related: ["granzyme-b-pet"],
  notes: [
    "Imagine sending a labelled binding tool into the body. Some remains in blood, some reaches accessible sites, and some fails to bind or clears. Delivery, access, target binding, competition, clearance and retention all affect the image. Therapeutic or unlabelled antibody can compete for the same target or alter distribution and background. A smaller signal after same-target treatment is therefore not, by itself, target loss. A conceptual labelled/unlabelled-binder drawing supplies these alternatives, not uptake values.",
    "Dijkers and colleagues studied 14 people with HER2-positive metastatic breast cancer using 89Zr-trastuzumab, with different antibody masses and scan times. The study addressed feasibility, biodistribution and visualisation, not universal treatment selection. Keyaerts and colleagues studied 20 women with primary or metastatic breast cancer scored HER2 IHC 2+ or 3+ using a 68Ga-HER2 nanobody in a phase 1 safety, distribution and dosimetry study. Tumour targeting and no observed adverse reactions in that small study do not establish general safety, individual benefit or an interchangeable imaging schedule.",
    "Bensch and colleagues imaged 22 patients across three tumour types with 89Zr-atezolizumab before PD-L1 blockade. Uptake varied within and between patients and included high signal in lymphoid tissues and inflammation. Associations with treatment response were exploratory. Imaging an accessible PD-L1-associated distribution does not isolate malignant cells, convert uptake into an expression percentage or prove that a scan-directed treatment choice improves outcomes.",
    "CD8 imaging traces a labelled CD8-binding construct, not the total number of tumour-killing cells. Farwell's phase 1 study included 15 patients: tumour uptake appeared in 10, including 7 of 8 receiving immunotherapy. Lymphoid and normal-organ distribution were also part of the observation. The paper appeared online in 2021 and in print in 2022. Kist de Ruijter's 38-person phase 1/2 study found heterogeneous 89Zr-CD8 tracer uptake, associations with tissue CD8 and inflamed versus desert patterns, and an exploratory association between higher baseline uptake and survival. On-treatment lesion-uptake changes did not simply track response. These mixed-cancer studies do not establish antigen recognition, cell killing or a validated stop/switch strategy for breast cancer.",
    "An interpretable tracer record retains the exact binder and format, isotope, protein mass in micrograms or mg, administered activity in MBq and time after injection. Background in blood and normal organs, lesion size and clearance affect interpretation. One image cannot isolate every delivery, binding and retention contribution, quantify receptor occupancy or supply a therapeutic absorbed dose. Protein mass is not a target-positive cell fraction, and uptake is not an expression percentage.",
    "In a fictional course, uptake is lower after an antibody against the same target. Before declaring that the target disappeared, compare tracer and therapeutic exposure, labelled and unlabelled mass, image timing, blood background, delivery, access and clearance. Competition is one explanation among several. A controlled binding experiment or suitable sampled tissue would answer a different, more specific question, each with its own limits. The image alone neither assigns all signal to cancer nor chooses a treatment."
  ]
},
  {
    id: "parp-pet", links: [{ label: "Makvandi et al., A PET imaging agent for evaluating PARP-1 expression in ovarian cancer (Journal of Clinical Investigation 2018)", url: "https://doi.org/10.1172/JCI97992" }], kind: "technology", name: "PARP PET", sections: ["imaging"], status: "phase-2", asOf,
    tldr: "A PET tracer that measures how much of the DNA repair enzyme PARP a tumour has, to predict response to PARP inhibitors.",
    summary: "PARP PET uses radiolabelled analogues of the PARP inhibitors olaparib and rucaparib, such as 18F-FluorThanatrace (FTT, Penn) and 18F-PARPi (MSK), which bind PARP1 in the nucleus and so measure both expression of the enzyme and drug engagement at the target. The rationale is that genomic HRD tests read a permanent scar, whereas a PARP tracer reports the tumour's current state. Trials in ovarian, breast and head-and-neck cancer test whether uptake predicts benefit from PARP inhibitors beyond BRCA and HRD status, and whether a fall in uptake on treatment confirms target engagement. It offers a direct pharmacodynamic readout that complements genomic HRD, but remains at the research stage and is available at only a few academic sites. It is a scan that measures how much of the DNA repair enzyme a tumour has, to predict whether a PARP inhibitor will work.",
    principle: "Radiolabelled olaparib or rucaparib analogues bind PARP1 in the nucleus.",
    strengths: ["Direct pharmacodynamic readout", "Complements genomic HRD"],
    limitations: ["Research stage", "Limited to a few academic sites"],
    technologies: ["pet"],
    targets: ["parp"],
    cancers: ["ovarian", "tnbc"],
  },
  {
    id: "spect", machineFamily: "imaging", dependsOn: ["nuclear-medicine-hardware", "radionuclide-generators-kits"], related: ["radioligand-dosimetry", "spect-ct"], kind: "technology", name: "SPECT & bone scan", sections: ["imaging"], status: "standard-of-care", asOf, wikipedia: W("Single-photon_emission_computed_tomography"),
    tldr: "SPECT and the bone scan are an older type of nuclear scan, still used for bone metastases and to check where a radioactive drug went after treatment.",
    summary: "SPECT uses gamma cameras to detect single photons from isotopes such as 99mTc, 111In and 177Lu, rotating around the patient to reconstruct a 3D distribution. The 99mTc-MDP bone scan is its most familiar oncology use, detecting skeletal metastases through increased bone turnover, although PSMA PET is displacing it in prostate cancer. Its growing role is in theranostics: SPECT/CT after 177Lu therapy shows where the radioligand went and enables post-treatment dosimetry, a key enabler of personalised radioligand dosing. It is cheap and widespread, but its resolution and sensitivity are lower than PET, and standardising dosimetry protocols across centres remains work in progress. SPECT is the older nuclear scan still used for bone metastases and for checking where a radioactive drug ended up.",
    principle: "Gamma cameras detect single photons from 99mTc, 111In, 177Lu; rotating acquisition reconstructs 3D distribution.",
    strengths: ["Cheap, widespread", "Dosimetry for radioligand therapy"],
    limitations: ["Lower resolution and sensitivity than PET"],
    technologies: ["radioligand-therapy"], links: [{ label: "Wikipedia", url: W("Single-photon_emission_computed_tomography") }], companies: ["atomic-alchemy", "ge-healthcare", "siemens-healthineers", "mediso"],
  },
  {
    id: "whole-body-mri", links: [{ label: "NICE NG35: myeloma diagnosis and management (whole-body MRI as first-line imaging)", url: "https://www.nice.org.uk/guidance/ng35" }], kind: "technology", name: "Whole-body MRI", sections: ["imaging", "early-detection"], status: "established", asOf,
    tldr: "Whole-body MRI is an MRI of the entire body without radiation, used to find spread in myeloma and to screen people with high inherited cancer risk.",
    summary: "Whole-body MRI acquires multiple stations of MRI, including diffusion-weighted imaging, and stitches them into a single view of the entire body without radiation. It is standard in multiple myeloma under IMWG criteria because of its sensitivity to bone marrow disease, and for surveillance in Li-Fraumeni syndrome, where the absence of radiation matters for people scanned for life. It is being evaluated for response assessment in metastatic prostate and breast cancer through the MET-RADS framework, since bone metastases are hard to measure on CT. Strengths are repeatability and marrow sensitivity; the main limitations are long scan times and incidental findings in screening use. Commercial 'full-body scan' services for average-risk people are controversial for that reason. It is a radiation-free scan of the whole body, most valuable in myeloma and in people with high inherited cancer risk.",
    principle: "Multi-station MRI with diffusion-weighted imaging stitched into a whole-body view.",
    strengths: ["No radiation, so repeatable", "Bone marrow sensitivity"],
    limitations: ["Long scan", "Incidental findings in screening use"],
    technologies: ["mri"],
    cancers: ["multiple-myeloma", "prostate"], companies: ["adialante"],
  },
  {
    id: "radiology-ai-screening", dependsOn: ["ai-compute-platforms"], kind: "technology", name: "AI in radiology", sections: ["imaging", "ai-computation"], status: "established", asOf, wikipedia: W("Artificial_intelligence_in_healthcare"),
    tldr: "Software that reads scans alongside radiologists, catching cancers earlier and predicting who is at risk.",
    summary: "Hundreds of FDA-cleared radiology AI devices exist; oncology use cases include mammography reading (Transpara, Lunit INSIGHT, MASAI trial in Sweden showed 29% more cancers detected with 44% less workload), lung nodule detection and malignancy scoring (Sybil, Optellum), prostate MRI, and risk models (Mirai). Foundation models linking images with text are emerging.",
    principle: "Deep convolutional and transformer networks trained on labelled imaging; increasingly self-supervised on large unlabelled corpora.",
    strengths: ["Scales expert reading", "Reduces workload and inter-reader variability"],
    limitations: ["Dataset shift across scanners and populations", "Regulatory lag for adaptive models"],
    technologies: ["mammography", "ct", "mri"], related: ["ai-oncology-clinic", "radiogenomics", "tumour-doubling-time", "ai-radiology-triage"], links: [{ label: "Wikipedia", url: W("Artificial_intelligence_in_healthcare") }], companies: ["kheiron-medical-technologies", "nucleo-research", "therapixel", "vara", "volpara-health", "v5med", "beamworks"],
  },
  {
    id: "optical-imaging", machineFamily: "imaging", kind: "technology", name: "Optical & fluorescence imaging", sections: ["imaging", "surgery"], status: "established", asOf, wikipedia: W("Fluorescence_image-guided_surgery"),
    tldr: "Dyes that glow under special light, so surgeons can see tumour edges and nerves in the operating theatre.",
    summary: "Indocyanine green for lymphatic mapping and perfusion; 5-ALA (Gleolan) for glioma resection; pafolacianine (Cytalux, folate-receptor targeted) for ovarian and lung cancer; pegulicianine (Lumisight) for breast lumpectomy margin assessment. Targeted near-infrared probes against EGFR, CEA, and PSMA are in trials.",
    principle: "Fluorophores excited by visible or near-infrared light; camera systems overlay fluorescence onto the surgical view.",
    strengths: ["Real-time intraoperative", "Reduces positive margins"],
    limitations: ["Penetration depth of millimetres", "Needs dedicated camera systems"], links: [{ label: "Wikipedia", url: W("Fluorescence_image-guided_surgery") }], companies: ["bikanta", "nearwave", "perimeter-medical-imaging-ai", "vergent-bioscience", "dermasensor-inc"],
  },

  // ======================= DIAGNOSTICS =======================
  {
    id: "histopathology-ihc", kind: "technology", name: "Histopathology & immunohistochemistry", sections: ["diagnostics"], status: "standard-of-care", asOf, wikipedia: W("Immunohistochemistry"),
    tldr: "Histopathology means looking at cancer cells under a microscope, and immunohistochemistry stains them for specific proteins. Together they are still the foundation of every diagnosis.",
    summary: "H&E morphology assigns histologic type and grade; IHC panels define lineage and biomarkers (ER, PR, HER2, Ki-67, PD-L1, ALK, MMR proteins). HER2 IHC scoring now matters at the low end (HER2-low, HER2-ultralow) because of T-DXd. Tumour-infiltrating lymphocyte (TIL) scoring on H&E is becoming a stratification tool in TNBC.",
    principle: "Formalin-fixed paraffin-embedded tissue sectioned, stained, and interpreted by a pathologist; antibody-based chromogenic detection of proteins.",
    strengths: ["Cheap, fast, universal", "Companion diagnostic for most targeted drugs"],
    limitations: ["Subjective scoring", "Single-site sampling misses heterogeneity"],
    terms: ["ihc", "her2-low", "tils"], links: [{ label: "Wikipedia", url: W("Immunohistochemistry") }], journals: ["analytical-cellular-pathology", "cancer-cytopathology", "head-and-neck-pathology", "pathology-and-oncology-research"], companies: ["cyted-health", "digistain", "histowiz", "ibex-medical-analytics"],
  },
  {
    id: "cgp", tags: ["precision"], keyPapers: ["paper-shiva-off-label-targeted-therapy-lancet-oncol-2015", "paper-marquart-genome-driven-oncology-benefit-jama-oncol-2018"], dependsOn: ["ngs-bioinformatics-software", "variant-knowledgebases"], kind: "technology", name: "Comprehensive genomic profiling", sections: ["diagnostics"], status: "standard-of-care", asOf, wikipedia: W("Cancer_genome_sequencing"),
    tldr: "Sequencing hundreds of cancer genes at once from a biopsy to find the mutations a drug can target.",
    summary: "Targeted NGS panels of 300-600 genes (FoundationOne CDx, MSK-IMPACT, Tempus xT, Caris MI Profile, Guardant360 from blood) report mutations, copy number, fusions, TMB, and MSI. Guideline-recommended in advanced NSCLC, colorectal, breast, prostate, and most metastatic cancers. Adding RNA sequencing catches fusions DNA misses.",
    principle: "Hybrid-capture or amplicon enrichment of target genes followed by short-read sequencing; bioinformatic variant calling and annotation against knowledge bases like OncoKB.",
    strengths: ["One test, all actionable alterations", "Trial matching"],
    limitations: ["Tissue quantity", "VUS interpretation", "2-3 week turnaround"],
    terms: ["ngs", "tmb", "msi", "vus"],
    companies: ["foundation-medicine", "tempus", "caris", "guardant-health", "strata-oncology", "billiontoone", "cambridge-cancer-genomics", "data-driven-bioscience", "fidocure", "inivata", "lucence", "omanta", "oncobox", "yemaachi-biotech", "valius", "belay-diagnostics", "oncodna", "protean-biodiagnostics", "epistamai-biotech", "predicta-biosciences"], institutions: ["hartwig-medical-foundation"], people: ["razelle-kurzrock"], links: [{ label: "Wikipedia", url: W("Cancer_genome_sequencing") }], journals: ["cancer-genetics", "cancer-genomics-and-proteomics", "genes-chromosomes-and-cancer", "nar-cancer"],
  },
  {
    "notes":["A targeted panel reads selected regions; whole-exome enrichment focuses mainly on protein-coding exons, while whole-genome sequencing samples a broader DNA territory. Breadth and usable local depth differ. A broader assay does not automatically supply adequate depth, reliable structural calls or a useful vaccine target. Check the platform, preparation, validated regions and alteration classes before interpreting a negative result."],
    id: "wes-wgs", dependsOn: ["ngs-bioinformatics-software"], kind: "technology", name: "Whole-exome & whole-genome sequencing", sections: ["diagnostics", "drug-discovery"], status: "established", "asOf":"2026-11-11", wikipedia: W("Whole_genome_sequencing"),
    tldr: "Exome sequencing targets mostly protein-coding exons; genome sequencing samples DNA more broadly. Both have coverage and detection limits.",
    summary: "With suitable preparation and analysis, WGS can reveal structural variants, mutational signatures (HRD, APOBEC, tobacco), whole-genome doubling, and non-coding drivers. Used by national programmes (Genomics England, Hartwig) and for neoantigen prediction in personalised vaccines. Suitable long-read sequencing (PacBio, Oxford Nanopore) can help resolve complex rearrangements and methylation in one run.",
    principle: "An exome workflow enriches selected exonic regions, while a genome workflow samples a much broader DNA territory. Pairing with normal DNA, depth and variant callers depend on the assay.",
    strengths: ["Broader sequence sampling than a selected gene panel","Can support copy-number, structural and signature analyses with a suitable workflow"],
    limitations: ["Coverage and detection differ by region and alteration class","Depth, input quality, cost and interpretation depend on the protocol"],
    terms: ["mutational-signature", "hrd"], companies: ["valius", "c2i-genomics", "haystack-oncology", "isabl"], related: ["idea-ecdna-targeting", "clonal-evolution-models", "evolutionary-game-theory-cancer", "goldie-coldman-model", "metastasis-seeding-models"], links: [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Whole_genome_sequencing"},{"label":"MedlinePlus Genetics: exome and genome sequencing scope","url":"https://medlineplus.gov/genetics/understanding/testing/sequencing/"},{"label":"Jones et al.: targeted versus exome workflows and call validation (2015)","url":"https://pubmed.ncbi.nlm.nih.gov/25877891/"}],
  },
  {
    id: "rna-seq", related: [
  "gene-expression-prognostic-assays"
], kind: "technology", name: "RNA sequencing & expression profiling", sections: ["diagnostics"], status: "established", asOf: "2026-11-10", wikipedia: W("RNA-Seq"),
    tldr: "RNA sequencing measures captured RNA messages and, with a suitable library and analysis, can examine transcript joins.",
    summary: "RNA normally carries and helps process cellular messages. Sequencing captures part of that RNA information through a defined preparation and analysis. Pooled abundance, transcript structure and cell origin are separate questions. A supported RNA join does not automatically establish a DNA rearrangement, functional protein or treatment benefit.",
    principle: "A common workflow reverse-transcribes RNA to complementary DNA for sequencing. Other chemistries, including probe-based counting, require their own interpretation of the captured signal.",
    strengths: [
  "Captured transcript abundance with defined comparison rules",
  "Fusion and splice evidence when the library and analysis cover the join"
],
    limitations: [
  "Preparation and RNA integrity affect recovery",
  "Bulk signal mixes cell sources",
  "RNA evidence does not directly measure protein function"
],
    terms: ["gene-fusion", "pam50"], links: [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/RNA-Seq"
  },
  {
    "label": "Deep RNA sequencing analysis of readthrough gene fusions in human prostate adenocarcinoma and reference samples.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/21261984/"
  },
  {
    "label": "Anchored multiplex PCR for targeted next-generation sequencing.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25384085/"
  },
  {
    "label": "A new view of transcriptome complexity and regulation through the lens of local splicing variations.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/26829591/"
  },
  {
    "label": "Accuracy assessment of fusion transcript detection via read-mapping and de novo fusion transcript assembly-based methods.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31639029/"
  },
  {
    "label": "10x fixed RNA probe chemistry, Cell Ranger 7.2",
    "url": "https://www.10xgenomics.com/support/software/cell-ranger/7.2/getting-started/cr-flex-what-is-frp"
  }
], companies: ["blank-bio", "cofactor-genomics", "data-driven-bioscience", "exai-bio", "insight-molecular-diagnostics", "isabl", "lucence", "oncobox"],

"notes": [
  "RNA abundance and RNA structure are distinct measurements. Gene-level totals can conceal splice products. Some workflows sequence synthetic probes rather than original transcript-derived material; their counts cannot establish arbitrary fusion or splice sequences. Sources: Conesa et al., methods review, https://doi.org/10.1186/s13059-016-0881-8; official fixed RNA profiling chemistry, https://www.10xgenomics.com/support/software/cell-ranger/7.2/getting-started/cr-flex-what-is-frp.",
  "An RNA join does not by itself establish a DNA rearrangement. Readthrough messages were observed in prostate tumour and reference samples. Authenticate independent sequence support and evaluate the genomic mechanism, protein consequence and clinical significance separately. Source: Nacu et al., 2011, https://pubmed.ncbi.nlm.nih.gov/21261984/.",
  "Splice junctions join transcript regions and many are normal; a fusion transcript has sequence from different genes; an RNA junction does not establish the DNA mechanism; neighbouring-gene readthrough occurs in tumour and reference tissue.",
  "A split read maps across the junction; a spanning pair places two ends on opposite sides leaving the insert unsequenced; amplified copies are not independent molecules; benchmark thresholds are not clinical cutoffs.",
  "PSI is an inclusion estimate for a defined event and denominator; local junction evidence does not reconstruct a full transcript; unfinished nuclear RNA with introns is not automatically pathological intron retention.",
  "Whole-transcriptome, short-end counting and targeted panels recover different information; anchored multiplex PCR searches from a targeted gene end toward an unknown partner and was tested in FFPE in the original method, which does not validate later panels.",
  "Fixed-RNA probe-ligation counts are not unrestricted fusion or splice sequence evidence.",
  "Failure to detect a join is informative only within coverage and sensitivity; RNA support leaves DNA mechanism, protein effect and drug benefit as separate tests.",
  "Fictional teaching exercise: A candidate A-B junction supported by three identical amplified reads cannot be called confirmed DNA rearrangement or effective target.",
  "Use protocol-compatible RNA and record aliquot consumption, integrity, reference/transcript versions, partners, junction coordinates and independent read/molecule support. State the event denominator for splice fractions. Low expression, uncovered joins, degradation, similar sequence and preparation/assembly artefacts constrain detection. Validate support thresholds, event classes and confirmation for the exact panel and specimen; a caller name supplies no clinical validation."
]
},
  {
    id: "single-cell-spatial", dependsOn: ["spatial-biology-instruments"], kind: "technology", name: "Single-cell & spatial profiling", sections: ["diagnostics", "drug-discovery"], status: "emerging", asOf: "2026-11-12", wikipedia: W("Spatial_transcriptomics"),
    tldr: "Bulk, cell or nucleus profiling, and spatial RNA methods attach measurements to different units and retain different context.",
    summary: "Bulk RNA pools a specimen; cell or nucleus profiling separates recovered profiles; spatial methods retain capture positions or decoded molecule coordinates. Spots can contain several cells, and segmentation or imputation adds inference. Split aliquots and adjacent sections are not the same cells. Recovery, measured genes, physical resolution, replication and intended use determine which question each method can address.",
    principle: "RNA is captured with barcodes per cell or per spatial location, or read by imaging-based in situ hybridisation for hundreds to thousands of genes.",
    strengths: [
  "Profiles recovered cellular heterogeneity",
  "Retains spatial context in compatible workflows"
],
    limitations: [
  "Preparation, recovery and analysis affect results",
  "Clinical utility requires evidence for the intended use"
], companies: ["valius", "elucidate-bio", "immunai", "mission-bio", "nucleai", "origin-bio"], related: [
  "idea-immune-exclusion-drivers",
  "spatial-proximity-metrics"
], links: [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Spatial_transcriptomics"
  },
  {
    "label": "RNA imaging. Spatially resolved, highly multiplexed RNA profiling in single cells.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25858977/"
  },
  {
    "label": "Cell type-specific gene expression differences in complex tissues.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/20208531/"
  },
  {
    "label": "Visualization and analysis of gene expression in tissue sections by spatial transcriptomics.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/27365449/"
  },
  {
    "label": "Confronting false discoveries in single-cell differential expression.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/34584091/"
  },
  {
    "label": "Single-nucleus and single-cell transcriptomes compared in matched cortical cell types.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/30586455/"
  },
  {
  "label": "Multiplex digital spatial profiling of proteins and RNA in fixed tissue.",
  "url": "https://pubmed.ncbi.nlm.nih.gov/32393914/"
},
  {
  "label": "Highly multiplexed immunofluorescence imaging of human tissues and tumors using t-CyCIF and conventional optical microscopes.",
  "url": "https://pubmed.ncbi.nlm.nih.gov/29993362/"
},
  {
  "label": "Spatial analyses of immune cell infiltration in cancer: current methods and future directions: A report of the International Immuno-Oncology Biomarker Working Group on Breast Cancer.",
  "url": "https://pubmed.ncbi.nlm.nih.gov/37608771/"
}
],

"notes": [
  "Bulk RNA reports pooled abundance, cell or nucleus profiling reports recovered profiles, and spatial measurement attaches observations to tissue positions. A capture position can contain multiple cells. Directly observed RNA, cell assignments and model-imputed expression are distinct outputs. The original positional capture study examined mouse brain and human breast cancer tissue. Source: https://pubmed.ncbi.nlm.nih.gov/27365449/.",
  "Fictional comparison exercise: 60 immune-assigned profiles among 300 recovered nuclei is 20% of recovered profiles. It does not establish 20% tissue area or original cell abundance. Split aliquots and adjacent sections are not the same cells. Biological replication and recovery bias still constrain cross-method comparisons. Source for biological-replicate requirements: https://pubmed.ncbi.nlm.nih.gov/34584091/.",
  "The axis that differs is the measured unit and the context still attached: pooled specimen, recovered cell or nucleus profile, or capture position or decoded molecule coordinates.",
  "Estimating cell sources from a bulk mixture needs assumptions and references and is not direct counting.",
  "Single-cell uses barcodes; whole cells capture nuclear and cytoplasmic RNA while nuclei mainly nuclear RNA; dissociation and filtering affect recovery; profile-based identity is an assignment, not proof of malignancy.",
  "A spatial capture spot or bin can contain several cells; imaging locates decoded molecules but segmentation affects cell-level reading; observed molecule, assigned cell and imputed value are different outputs.",
  "Adjacent sections or split aliquots are not the same cells; two libraries from one portion are technical repeats of one biological specimen.",
  "Cells from one specimen are not independent biological replicates.",
  "Fictional teaching exercise: Of 300 recovered nuclei, 60 immune is 20% of recovered nuclei, not a tissue-area or original-cell fraction.",
  "Budget finite tissue, aliquots and sections for each compatible preparation. Report counts or normalised abundance per pool, recovered cell/nucleus or spatial unit, with physical resolution, measured genes and cell-boundary rules. Quality criteria, recovery, processing/imaging/analysis cost and controls vary by assay. Independent specimens support biological comparisons; attractive maps and technical repeats do not provide clinical validation.",
  "OnCo reading inference: finer spatial resolution does not automatically provide broader measured-gene coverage or more complete recovery. A missing RNA count can reflect preparation or detection limits; an inferred cell source or protein activity is a different kind of output.",
  "Two independent choices shape a spatial assay: which molecule is measured, and which area is sampled. Antibody-based imaging detects selected proteins through fluorescent or metal tags; RNA probes and barcoded capture detect selected transcripts or captured RNA. A protein-targeting question needs evidence about the protein on the relevant cells. Transcription alone does not establish protein abundance or cell-surface localisation. These maps describe the sampled preparation, rather than every part of a tumour.",
  "Choose the molecular layer and sampling design together. Broad RNA measurement can support discovery of genes, cell states and pathways before selecting a smaller marker panel. Regional digital spatial profiling compares compartments selected by an operator and can measure protein or RNA, but a pooled regional count does not identify which individual cells carry the signal. Imaging across a complete chosen field can reveal borders, neighbourhoods and rare cells outside a predefined compartment; the imaged field still need not cover the whole slide. Report who selected the regions and by what rule.",
  "Cell-level interpretation requires justified cell boundaries and cell-type calls. It is not a prerequisite for every spatial output: pooled regions and capture spots can be analysed without assigning every signal to a cell. Tissue-section examples also do not define every possible spatial experiment. Chen and colleagues demonstrated MERFISH imaging of 100 to 1,000 selected RNA species as individual molecules in cultured human fibroblasts. Molecule localisation and assignment to cells remain distinct steps. Validate each antibody or probe, registration and relevant cell assignments for the actual preparation; spatial resolution and gene or protein coverage remain separate properties.",
  "In a fictional comparison, a 40-marker panel lacking the relevant target cannot answer the target question that a suitable six-marker panel can address. With one spare tissue section and a question about target-bearing cancer cells near T cells, use validated protein detection for the target, cancer cells and T cells over a justified area, with appropriate controls and cell assignments. Regional RNA alone would not establish which cells carry that protein. Budget the finite section before choosing the assay; changing the question after tissue is used does not recover the material.",
  "A multiplex research panel and a validated clinical receptor or PD-L1 immunohistochemistry assay have different evidence requirements. Marker count, a detailed image and a reproducible measurement do not confer treatment-selection validity. Check the exact assay, scoring rule, population and intended use rather than transferring the status of a clinical single-marker assay to a different research panel."
]
},
  {
    id: "liquid-biopsy", tags: ["precision"], keyPapers: ["paper-razavi-cfdna-variant-sources-clonal-haematopoiesis-nat-med-2019", "paper-bettegowda-ctdna-early-late-stage-stm-2014", "paper-esmo-ctdna-assay-recommendations-ann-oncol-2022"], trials: ["nct07510828"], related: ["ctdna-tests", "cellsearch-ctc-count", "parsortix-ctc-harvest", "serum-tumour-markers", "cea-surveillance-colorectal", "multitarget-stool-rna-test"], dependsOn: ["cgp", "ngs-bioinformatics-software", "preanalytics-sample-stabilisation"], kind: "technology", name: "Liquid biopsy (ctDNA)", sections: ["diagnostics"], status: "standard-of-care", asOf, wikipedia: W("Liquid_biopsy"),
    tldr: "A blood test that reads fragments of DNA shed by the tumour, so you can genotype or monitor cancer without a needle in the tumour.",
    summary: "Circulating tumour DNA assays (Guardant360 CDx, FoundationOne Liquid CDx) are approved companion diagnostics for EGFR, PIK3CA, ESR1, and others. Used when tissue is insufficient, to track resistance mutations (EGFR T790M, ESR1), and to follow clonal dynamics. Fragmentomics and methylation extend it to tumour-agnostic detection.",
    principle: "Cell-free DNA extracted from plasma; deep NGS with error suppression detects variants at <0.1% allele fraction.",
    strengths: ["Minimally invasive, repeatable", "Whole-body clonal picture"],
    limitations: ["Low shedding in some tumours (brain, early-stage)", "Clonal haematopoiesis false positives"],
    terms: ["ctdna", "vaf"],
    companies: ["guardant-health", "foundation-medicine", "natera", "adela", "aoa-dx", "billiontoone", "biodesix", "c2i-genomics", "cambridge-cancer-genomics", "clearnote-health", "delee", "elypta", "exai-bio", "haystack-oncology", "helio-genomics", "inivata", "insight-molecular-diagnostics", "lucence", "naveris", "nonagen-bioscience", "nucleix", "numen", "universal-dx", "volitionrx", "x-zell", "belay-diagnostics", "cnside-diagnostics", "rgcc-international", "predicta-biosciences", "senticell", "cosomil", "screencell", "mercy-bioanalytics"],
    technologies: ["mrd-testing", "mced"], links: [{ label: "Wikipedia", url: W("Liquid_biopsy") }],
  },
  {
    id: "mrd-testing", tags: ["precision"], keyPapers: ["paper-abbosh-tracerx-ctdna-relapse-nature-2023", "paper-zviran-whole-genome-cfdna-residual-disease-nat-med-2020", "paper-esmo-ctdna-assay-recommendations-ann-oncol-2022"], dependsOn: ["liquid-biopsy", "ngs-bioinformatics-software"], kind: "technology", name: "MRD / molecular residual disease testing", sections: ["diagnostics"], status: "established", asOf: "2026-11-12", wikipedia: W("Minimal_residual_disease"),
    tldr: "Residual-disease testing looks for a qualifying disease signal after treatment in a specified sample. Some studies detect a signal before clinical recurrence, but the timing and detection rate depend on the assay and setting.",
    summary: "Residual-disease testing asks whether a qualifying disease signal is present after treatment in a specified sample. For solid tumours, plasma assays can look for selected tumour-associated DNA features, with results interpreted under their specimen, input, target and calling rules. Analytical detection, clinical detection in a population and recurrence association are different performance questions. A valid negative does not establish absence of every cancer cell.\n\nClinical usefulness belongs to a defined strategy: the cancer setting, assay, timing, triggering result, action and comparator. Evidence for genotyping, an approved indication or a strategy in another cancer does not automatically settle an early-breast-cancer question. The dated trial examples below retain their studied populations. More frequent detection, molecular clearance or favourable prognosis in treated negative groups does not by itself show improved patient outcomes or safe treatment omission.",
    principle: "Patient-specific variant panel designed from tumour sequencing, tracked at very high depth in plasma.",
    strengths: ["Months of lead time over imaging", "Enables escalation and de-escalation trials"],
    limitations: ["Sensitivity limited by cfDNA quantity", "Lead time without proven intervention causes anxiety"],
    terms: ["mrd", "ctdna"],
    companies: ["natera", "exact-sciences", "guardant-health", "adela", "billiontoone", "c2i-genomics", "haystack-oncology", "inivata", "isabl", "mission-bio", "naveris", "teiko", "pairidex", "neogenomics", "personalis", "foundation-medicine", "quest-diagnostics", "labcorp", "myriad-genetics", "veracyte", "tempus"],
    drugs: ["signatera", "guardant-reveal", "radar-mrd", "oncodetect", "next-personal", "foundationone-mrd", "haystack-mrd", "labcorp-plasma-detect", "precise-mrd", "truemrd", "tempus-xm-mrd", "navdx", "clonoseq"],
    trials: ["imvigor011", "dynamic"],
    cancers: ["colorectal", "urothelial", "tnbc", "nsclc", "multiple-myeloma"], related: [
  "ctdna-tests",
  "idea-dtc-colonisation-determinants",
  "idea-dormancy-maintenance-therapy",
  "eclipse-subclone-ctdna",
  "genome-wide-ctdna-mutation-integration",
  "saferseqs",
  "ctdna-monitoring-lead-time"
], links: [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Minimal_residual_disease"
  },
  {
    "label": "Comparison of tumor‐informed and tumor‐naïve sequencing assays for ctDNA detection in breast cancer",
    "url": "https://doi.org/10.15252/emmm.202216505"
  },
  {
    "label": "Assessment of Molecular Relapse Detection in Early-Stage Breast Cancer",
    "url": "https://doi.org/10.1001/jamaoncol.2019.1838"
  },
  {
    "label": "Genome-wide cell-free DNA mutational integration enables ultra-sensitive cancer monitoring",
    "url": "https://doi.org/10.1038/s41591-020-0915-3"
  },
  {
    "label": "FDA: statistical guidance for diagnostic-test studies (March 2007)",
    "url": "https://www.fda.gov/media/71147/download"
  },
  {
    "label": "Powles et al.: ctDNA-guided adjuvant atezolizumab in muscle-invasive bladder cancer (IMvigor011, 2025)",
    "url": "https://doi.org/10.1056/NEJMoa2511885"
  },
  {
    "label": "FDA: ctDNA for curative-intent solid tumour drug development (November 2024)",
    "url": "https://www.fda.gov/media/183874/download"
  }
,
    {"label":"FDA: surrogate endpoint resources and context of use","url":"https://www.fda.gov/drugs/development-resources/surrogate-endpoint-resources-drug-and-biologic-development"},
    {"label":"NCI: screening statistics and lead-time bias","url":"https://www.cancer.gov/about-cancer/screening/research/what-screening-statistics-mean"}
  ], notes: [
  "In a fictional model, an evaluated aliquot supplies 4,500 independent amplifiable opportunities at one locus, each with a target-allele probability of 1 in 10,000. The expected target count is 0.45. If target counts follow a Poisson distribution, the chance of no target is exp(-0.45), 63.8%. Twenty independent loci with the same opportunity count and probability give an expected total of 9 and exp(-9), 0.012%, for none. Independence, equal recovery and one retained target being sufficient are assumptions of this model. These are not measured clinical false-negative rates. A tumour-DNA fraction cannot simply replace the target-allele probability without assumptions about copy number, variant multiplicity and which tumour clones carry the variant. More reads cannot recover an original molecule absent from the aliquot.",
  "A worked limit: for multiplex PCR across 21 to 47 patient-specific structural variants on 4,500 amplifiable copies, the theoretical limit is 1 / (4,500 x variants), which is 1 in 211,500, or 4.7 parts per million, at 47 variants. The 4.7 parts per million detection rested on a single mutant molecule, and one sample not detected at 4,500 copies was detected at 7.9 parts per million when re-assayed with 27,000 copies (Santonja 2023). Whole-genome sequencing of cfDNA integrates thousands of mutations and reached tumour-fraction sensitivity as low as 10 to the minus 5 (Zviran 2020).",
  "What a lead-time figure here means: in García-Murillas 2019 ctDNA detection preceded clinical relapse by a median of 10.7 months in the combined cohort of 144, with the estimator and evaluable intervals needing distinction from the full cohort size. Distant extracranial relapse was detected in 22 of 23 patients and brain-only relapse in 1 of 6. Medians from different cohorts, schedules and confirmation rules cannot rank assays, and an earlier signal does not show that acting on it extends life.",
  "Analytical detection and clinical sensitivity answer different questions. FDA diagnostic-test guidance dated March 2007 defines clinical sensitivity by the proportion testing positive among people who have the specified condition, judged against the reference standard in the intended-use population. In a residual-disease study, disease definition, follow-up, draw schedule, evaluable samples and recurrence sites shape that denominator. An analytical limit measured in prepared material does not supply that clinical proportion, and a negative test does not establish absence of cancer.",
  "Clinical evidence belongs to a defined strategy. In the IMvigor011 randomised trial, 250 eligible patients with ctDNA-positive muscle-invasive bladder cancer after cystectomy received atezolizumab or placebo; disease-free and overall survival favoured atezolizumab (Powles 2025). This is evidence for that population and strategy, not for every positive residual-disease test, every cancer, or an arbitrary treatment change. Analytical detection, risk association, treatment-strategy benefit and a validated surrogate endpoint are different claims."
,
    "Read the evidence in stages. Analytical detection concerns the specified signal under stated test conditions, not detection in every person or draw. An association with recurrence is prognostic information, not evidence that a different treatment helps. Clinical assessment and localisation can establish a disease setting without proving sensitivity to a new drug. A guided intervention then needs evidence for its own strategy and comparator, including recurrence or survival, toxicity, quality of life, anxiety from uncertain results and unnecessary procedures. FDA's nonbinding November 2024 drug-development guidance describes separate proposed uses and asks for randomised trials to evaluate escalation or de-escalation strategies.",
    "Put the action into a complete sentence: for a stated population, using this assay at this time, this qualifying result triggers this action, supported by this strategy evidence. Confirming a low signal, arranging appropriate evaluation, entering a protocol and starting a drug are different actions. A negative result has an action question too: people with favourable outcomes may have received the very treatment someone proposes omitting. Omission safety requires evidence in the matched population and course. Routine follow-up after treatment is a separate clinical plan; an experimental blood-testing schedule does not automatically replace it.",
    "In a fictional proposal, detectable blood after surgery is associated with recurrence, and Drug Q is proposed whenever the signal appears. An observational association has not tested that strategy, even if Drug Q works in another stage or cancer. The proposed study needs the assay rule, any confirmation, disease-extent assessment and safety review before treatment. Finding radiographically detectable disease changes a molecular-only intervention question. A falling blood signal is not automatically a validated substitute for recurrence, survival or quality of life; keep the comparator and adequate follow-up.",
    "A fictional trial randomises assay-positive people to a new strategy or usual care and measures recurrence and harms from the same enrolment point. If its population and methods fit the claim, that comparison tests an action more directly than a series showing that positive tests precede recurrence. Measured lead time is a gap between defined detection events in the study's sampling schedule. Moving the diagnosis clock earlier can lengthen measured survival without delaying death, so extra lead time alone is not benefit. Read the uncertainty, applicability and harms rather than treating a positive signal as proof of a useful intervention."
  ],
  },
  {
    id: "mced", tags: ["precision", "evidence:insufficient"], related: ["ctdna-tests"], dependsOn: ["liquid-biopsy"], kind: "technology", name: "Multi-cancer early detection (MCED)", sections: ["early-detection", "diagnostics"], status: "phase-3", asOf: "2026-11-03",
    aka: ["Multi-cancer detection (MCD)", "Multi-cancer early detection blood test", "Pan-cancer screening blood test"],
    tldr: "A single blood (or urine) test meant to look for many cancers at once, including ones with no screening today. About 36 such tests are sold or in study worldwide; none has yet been shown in a randomised trial to reduce cancer deaths, and the one randomised result so far did not reduce late-stage diagnoses.",
    summary: "What exists. OnCo's census of 29 October 2026, extended on 3 November 2026 for China, Hong Kong, Taiwan and India, found 36 multi-cancer tests that are sold, in clinical validation or published, in the United States, Europe and Asia, reading cell-free DNA methylation (Galleri, Shield MCD, Avantect, OverC, PanSeer, CancerFind, and from China INSPECTOR, TOTEM, GutSeer and AnchorDx's Aurora), DNA fragment patterns or whole genomes (SPOT-MAS, SeekInCare, ai-CANCERCH, Berry Oncology's HIFI), proteins (OneTest, OncoSeek, Novelna), methylation with proteins (Cancerguard), sugar molecules in urine and blood (Elypta), circulating tumour cells (Trucheck), platelet RNA (thromboSeq), infrared spectra (Dxcover), nucleosomes (Nu.Q), amino acids (AminoIndex), serum metabolites (OncoVeryx, India), an embryonic gene in blood (HrC, India), chemicals in urine (TOBY) and even worms' sense of smell (N-NOSE). The tests sold to the public are laboratory-developed tests or CE- or UKCA-marked products; no multi-cancer screening test had been approved by the FDA, China's NMPA or Japan's PMDA by 29 October 2026, and a CE mark is a conformity mark, not evidence that screening helps. GRAIL's Galleri is furthest: a premarket approval application filed on 29 January 2026 and an FDA advisory panel vote of seven to two in favour on 23 September 2026, with no FDA decision yet. Several others hold FDA Breakthrough Device designations (Shield MCD, OverC, SPOT-MAS 10, TOBY's urine test in April 2026 and Natera's assay in October 2026), which speed review but are not approvals. US Medicare coverage of FDA-authorised multi-cancer tests begins on 1 January 2029 under Public Law 119-75.\n\nWhat the evidence shows. Almost all published performance comes from case-control studies of people already diagnosed, which overstate how a test performs in screening. Where tests have been run prospectively in people without symptoms, about one in a hundred to two hundred tests is positive and 40 to 60 in 100 positives are cancer (PATHFINDER 2: 60.3%; NHS-Galleri: 45.8 to 58.0%; K-DETEK with SPOT-MAS: 39.5%), and Galleri found about a quarter to two fifths of the cancers diagnosed within a year (26.7 to 37.2% per round in NHS-Galleri, 39.3% in PATHFINDER 2). Sensitivity for stage I cancer, where finding cancer early matters most, is about one in six for Galleri (16.8% in CCGA) and Cancerguard's development classifier (15.4%).\n\nWhat it has not shown. The first randomised result is in: NHS-Galleri, 142,250 people in England, found no reduction in stage III or IV cancers after three yearly rounds (incidence rate ratio 1.03; 95% CI 0.92 to 1.14; Sasieni, NEJM 2026), with a secondary stage IV ratio of 0.86 (0.74 to 1.00). No multi-cancer test has been shown in a randomised trial to reduce cancer deaths. The NCI's randomised Vanguard study (Shield MCD and Avantect against usual care, 24,000 people) is testing how a definitive trial could be run. Until then a negative result does not replace bowel, breast, cervical or lung screening, and a positive result is the start of tests, not a diagnosis.",
    principle: "Machine learning classifies cell-free DNA methylation, fragmentation, mutations, proteins or other blood and urine signals, usually with a predicted organ of origin.",
    strengths: ["Covers cancers with no screening test (pancreatic, ovarian, liver)", "One blood draw", "Prospective positive predictive values of about 40 to 60% in people without symptoms"],
    limitations: ["Low sensitivity for stage I cancer", "No reduction in late-stage cancer in the only randomised trial so far; mortality benefit untested", "Diagnostic work-up after a false positive", "Case-control figures overstate screening performance"],
    notes: ["Evidence grade insufficient for the class claim that multi-cancer blood tests reduce cancer deaths: no randomised trial has reported mortality, and NHS-Galleri, the only randomised trial to report, did not meet its late-stage endpoint. Individual tests are graded on their own records; Galleri is graded no-benefit for late-stage diagnosis on the NHS-Galleri result.", "Single-cancer blood tests are context, not multi-cancer tests: Shield and SimpleScreen for colorectal cancer, FirstLook Lung, HelioLiver, the EpiCheck tests and Mercy BioAnalytics' ovarian test.", "Second pass, 3 November 2026, for China, Hong Kong, Taiwan and India, FDA Breakthrough designations and CE marks. Added: HIFI (Berry Oncology), Aurora (AnchorDx), INSPECTOR (Geneplus), TOTEM (Genecast), GutSeer (Singlera), OncoVeryx (PredOmix, India), HrC (Epigeneres, India), Natera's assay and TOBY's urine test; OneTest's algorithm turned out to have been built on Taiwanese check-up data. Searched and not found: a named multi-cancer product with published or announced figures from Haplox or BGI, a test developed in Hong Kong or Taiwan (Shield MCD, SPOT-MAS and Lucence's test are sold there but developed elsewhere), and any NMPA approval of a multi-cancer test (OverC's 2023 NMPA breakthrough designation is the only Chinese regulatory step found).", "Not searched or not reachable on 3 November 2026: the Chinese Clinical Trial Registry (ChiCTR) and the NMPA database, which refuse scripted access, so Chinese studies registered only there are missing; India's CTRI was not searched beyond the one number a paper gave (CTRI/2023/03/050316); EUDAMED was not searched for CE-IVDR certificates, and a web sweep found no new CE-marked multi-cancer test; Europe PMC was unavailable, so the second pass searched PubMed."],
    terms: ["ppv", "stage-shift", "screening", "cfdna"],
    companies: ["grail", "exact-sciences", "guardant-health", "clearnote-health", "harbinger-health", "adela", "elypta", "exai-bio", "numen", "owlstone-medical", "volitionrx", "carrum-health", "delfi-diagnostics", "freenome", "burning-rock", "singlera", "seekin", "gene-solutions", "datar-cancer-genetics", "hirotsu-bio-science", "imbdx", "gc-genome", "mirxes", "novelna", "dxcover", "zyagnum", "2020-biolabs", "natera", "berry-oncology", "anchordx", "geneplus", "genecast", "predomix", "epigeneres", "lucence"],
    trials: ["nhs-galleri", "pathfinder-2", "vanguard-study", "pathfinder", "ccga", "strive-grail", "reflection-galleri", "reach-galleri-medicare", "galleri-community-research-program", "galleri-unintentional-weight-loss", "inform-galleri", "sentinel-galleri-veterans", "discover-galleri-symptomatic", "oc-lead", "ascend-cancerseek", "falcon-registry", "regenerate-pancreatic-genetics-mced", "alliance-a212102-mced-reference-set", "mayo-mcd-cohort", "clearnote-multi-cancer-epigenomics", "inova-burn-pit-screening", "inova-firefighter-screening", "mdacc-mced-decision-aid", "dartmouth-mced-information-trial", "predict-overc", "thunder-overc", "prevent-overc", "promise-cams", "prescient-cams", "perceive-1", "perceive-2", "fusion-singlera", "inspire-singlera", "lev87a", "lev93a", "vincere-firefighters-mced", "core-hh", "procares", "camperr", "cadence-mirxes", "pan-owlstone", "k-detek", "k-accelerate", "profound-mced", "prosight-mced", "profuture-mced", "nqmd-cs", "jinling-cohort", "wuhan-pan-cancer-methylation-pcr", "beijing-metabolomics-multi-cancer", "decipher-gastro", "yonsei-mced-wgs", "yonsei-mced-wgs-2", "yonsei-multi-cancer-mrd", "methylscape-co", "exopert-emerald", "pantum-detect-max-healthcare", "pantumpet", "xijing-cfdna-seven-cancers", "exai-oncrna-prospective", "guide-gutseer"],
    keyPapers: ["paper-nhs-galleri-primary-nejm-2026", "paper-nhs-galleri-performance-nat-med-2026", "paper-pathfinder-2-nat-med-2026", "paper-nhs-galleri-design-cancers-2022", "paper-pathfinder-lancet-2023", "paper-klein-ccga3-mced-validation-ann-oncol-2021", "paper-liu-ccga2-methylation-ann-oncol-2020", "paper-symplify-lancet-oncol-2023", "paper-detect-a-science-2020", "paper-cohen-cancerseek-multi-analyte-blood-test-science-2018", "paper-cancerguard-mp-classifier-cebp-2026", "paper-cristiano-delfi-fragmentomes-nature-2019", "paper-gao-thunder-ann-oncol-2023", "paper-spot-mas-k-detek-bmc-med-2025", "paper-bao-fragmentomics-nat-med-2025", "paper-bratulic-gagome-pnas-2022", "paper-thromboseq-cancer-cell-2022", "paper-hinestrosa-ev-protein-commun-med-2022", "paper-inspector-geneplus-cancer-commun-2025", "paper-gutseer-guide-mol-cancer-2025", "paper-totem-genecast-bmc-cancer-2024", "paper-predomix-metabolome-cancer-rep-2024", "paper-onetest-algorithm-taiwan-cancers-2020"],
    drugs: ["galleri", "cancerguard", "shield-mcd", "avantect-mcd", "harbinger-resolve", "cancerseek", "onetest", "novelna-protein-test", "adela-mced", "gagome-mced-test", "carcimun-test", "dxcover-cancer-liquid-biopsy", "pantum-detect", "nu-q-cancer", "thromboseq", "epipangi-dx", "overc-mcdbt", "panseer", "oncoseek", "seekincare", "spot-mas", "trucheck-intelli", "anpac-cda", "n-nose", "cancerfind", "ai-cancerch", "aminoindex-cancer-screening", "shield", "natera-mced", "toby-urine-mced", "hifi-pan-cancer-screening", "anchordx-aurora", "inspector-mced", "totem-genecast", "gutseer", "oncoveryx", "hrc-test"], links: [{ label: "NHS-Galleri primary endpoint: no reduction in stage III or IV cancer (NEJM 2026)", url: "https://doi.org/10.1056/NEJMoa2505723" }, { label: "PATHFINDER 2 (Nature Medicine 2026)", url: "https://doi.org/10.1038/s41591-026-04618-w" }, { label: "NCI selects two assays for the Vanguard Study", url: "https://prevention.cancer.gov/news-and-events/news/nci-selects-two-assays-vanguard-study-multi-cancer-detection-tests" }, { label: "DETECT-A: a blood test plus PET-CT found treatable cancers in 10,000 women with no symptoms (Science 2020)", url: "https://doi.org/10.1126/science.abb9601" }, { label: "NHS-Galleri: design of the largest randomised trial of a multi-cancer blood test (Cancers 2022)", url: "https://doi.org/10.3390/cancers14194818" }, { label: "NHS-Galleri: test performance across three annual rounds (Nature Medicine 2026)", url: "https://doi.org/10.1038/s41591-026-04652-8" }],
  },
  {
    id: "digital-pathology-ai", dependsOn: ["whole-slide-scanners", "ai-compute-platforms"], kind: "technology", name: "Digital pathology & AI", sections: ["diagnostics", "ai-computation"], status: "established", asOf, wikipedia: W("Digital_pathology"),
    tldr: "Scanning microscope slides and letting software measure things a pathologist cannot see, including predictions of who will benefit from a treatment.",
    summary: "Whole-slide imaging, scanning glass slides into gigapixel digital images, is now routine in large pathology laboratories. FDA-cleared tools: Paige Prostate (detection), ArteraAI Prostate (2025, first prognostic and predictive AI) and ArteraAI Breast (May 2026, risk stratification in early HR+/HER2- breast cancer). Foundation models (Virchow, UNI, CONCH, Prov-GigaPath) predict molecular status (MSI, HRD, HER2) from H&E alone.",
    principle: "Gigapixel whole-slide images; tile-level self-supervised encoders aggregated to slide-level predictions.",
    strengths: ["Cheap biomarker from routine slides", "Consistent scoring (Ki-67, TILs, HER2)"],
    limitations: ["Scanner and stain domain shift", "Explainability", "Regulatory pathways for updates"],
    companies: ["artera", "paige", "pathai", "ataraxis-ai", "digistain", "histowiz", "ibex-medical-analytics", "imagene-ai", "nucleai", "perimeter-medical-imaging-ai", "valar-labs", "x-zell", "strand-ai", "acurion", "imagenomix", "moonlight-ai", "spotlight-pathology"],
    drugs: ["artera-ai-prostate", "artera-ai-breast"], related: ["ai-pathology-to-adt", "ai-oncology-clinic"], links: [{ label: "Wikipedia", url: W("Digital_pathology") }], journals: ["analytical-cellular-pathology"],
  },
  {
    notes:["An invalid, failed or inadequate test is not a valid negative biomarker result. The specimen and assay must meet the relevant acceptance criteria. U.S. CLIA control rules require applicable control results to be acceptable before patient results are reported. Whether to repeat a measurement or use another specimen depends on the actual test and laboratory criteria."],
    id: "companion-diagnostic", related: ["hrd-genomic-scar-scores","rad51-foci-assay","dpyd-genotyping","fes-pet","cellsearch-ctc-count","serum-tumour-markers","laboratory-certification-test-authorization","companion-diagnostic-term","analytical-vs-clinical-validation"], kind: "technology", name: "Companion diagnostics", sections: ["diagnostics"], status: "standard-of-care", asOf: "2026-11-09", wikipedia: W("Companion_diagnostic"),
    tldr: "A companion diagnostic supplies information needed for a corresponding medicine to be used safely and effectively. Its labeling defines the intended use of the result.",
    summary: "FDA describes companion diagnostics as devices that supply essential information for a corresponding treatment. Their roles can include identifying likely benefit, increased risk of serious adverse effects or a specified monitoring need. The treatment label and diagnostic labeling retain the relevant disease, specimen, biomarker and decision rule. Some devices have documented group labeling for specified oncology therapies. Similar analyte names do not establish assay interchangeability, and a label-matched result does not guarantee individual benefit or complete clinical suitability.",
    principle: "Evaluate a specified diagnostic result within the corresponding device and treatment labeling.",
    strengths: ["Connects a defined test use to treatment information","Makes labeling and measurement context checkable"],
    limitations: ["Intended use is product- and context-specific","A result alone does not establish individual benefit","Different assays are not interchangeable without supporting evidence"],
    terms: ["cps", "her2-low"], links: [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Companion_diagnostic"},{"label":"FDA: companion diagnostics","url":"https://www.fda.gov/medical-devices/in-vitro-diagnostics/companion-diagnostics"},{"label":"FDA: authorized companion diagnostic devices and intended uses","url":"https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-fda-authorized-companion-diagnostic-devices-in-vitro-and-imaging-tools"},{"label":"FDA: in vitro companion diagnostic devices","url":"https://www.fda.gov/media/81309/download"},{"label":"FDA: labeling diagnostics for a group of oncology therapies","url":"https://www.fda.gov/media/120340/download"},{"label":"42 CFR 493.1256(f): acceptable controls before reporting patient results","url":"https://www.ecfr.gov/current/title-42/section-493.1256"},{"label":"GovInfo: published 2025 control-procedure rule, independently read","url":"https://www.govinfo.gov/content/pkg/CFR-2025-title42-vol5/pdf/CFR-2025-title42-vol5-sec493-1256.pdf"}], companies: ["acrivon-therapeutics", "ataraxis-ai", "cofactor-genomics", "ibex-medical-analytics", "imagene-ai", "insight-molecular-diagnostics", "nonagen-bioscience", "oncohost", "signatur-biosciences", "valar-labs"],
  },
  {
    id: "hrd-testing", related: ["hrd-genomic-scar-scores", "rad51-foci-assay", "stride-dna-break-detection"], links: [{ label: "PAOLA-1: olaparib added to bevacizumab maintenance in newly diagnosed ovarian cancer, with benefit confined to HRD-positive tumours (New England Journal of Medicine 2019)", url: "https://doi.org/10.1056/NEJMoa1911361" }], kind: "technology", name: "HRD & BRCA testing", sections: ["diagnostics"], status: "standard-of-care", asOf,
    tldr: "Tests that reveal whether a tumour has a broken DNA repair system, which predicts response to PARP inhibitors and platinum.",
    summary: "HRD and BRCA testing identifies tumours whose homologous recombination DNA repair is defective and therefore vulnerable to PARP inhibitors and platinum. It combines germline and somatic BRCA1/2 sequencing with genomic-scar scores such as the myChoice CDx genomic instability score and FoundationOne LOH, which sum loss of heterozygosity, telomeric allelic imbalance and large-scale transitions into one measure. This extends PARP-inhibitor benefit beyond BRCA carriers. The scar, however, is permanent: it persists even after reversion mutations restore repair and resistance emerges, and the thresholds defining HRD-positive are still debated. Functional assays such as RAD51 foci and mutational signature 3 are emerging alternatives that may capture current repair status. These tests reveal whether a tumour's DNA repair is broken, which predicts response to PARP inhibitors and platinum.",
    principle: "Loss of heterozygosity, telomeric allelic imbalance, and large-scale transitions summed into a genomic instability score.",
    strengths: ["Extends PARP-inhibitor benefit beyond BRCA carriers"],
    limitations: ["Scar is permanent even after resistance emerges", "Threshold debates"],
    targets: ["brca", "parp"],
    terms: ["hrd"],
  },
  {
    id: "germline-testing", kind: "technology", name: "Germline (hereditary) testing", sections: ["diagnostics", "prevention"], status: "standard-of-care", asOf: "2026-11-11", wikipedia: W("Genetic_testing"),
    tldr: "Germline testing looks for constitutional DNA variants that may explain inherited susceptibility. The result needs interpretation alongside the test coverage and personal and family history.",
    summary: "Germline testing examines DNA from an appropriate non-tumour specimen, often blood or saliva, for constitutional variants. Many are inherited; a constitutional change can also arise newly. Tumour sequencing can reveal a finding that needs germline confirmation, but it does not establish its origin. A multigene panel and a targeted test for a known family variant answer different questions.\n\nTesting includes consent, review of personal and family history, specimen collection, laboratory analysis and interpretation. A pathogenic or likely pathogenic finding may inform care and testing of relatives. It does not guarantee that cancer will occur or that a particular treatment will work. A variant of uncertain significance is not a pathogenic result and should not direct clinical management. A negative result must be interpreted against the genes and variant types the assay could detect and whether a causative family variant is already known.",
    principle: "NGS of blood or saliva DNA identifies pathogenic germline variants.",
    strengths: ["Actionable for patient and relatives", "Cheap"],
    limitations: ["VUS burden", "Uptake and counselling capacity"],
    targets: ["brca", "tp53"],
    cancers: ["tnbc", "ovarian", "prostate", "pancreatic", "colorectal"], related: ["germline-to-parp"], links: [{ label: "Wikipedia", url: W("Genetic_testing") },
{
  "label": "nci genetic testing",
  "url": "https://www.cancer.gov/about-cancer/causes-prevention/genetics/genetic-testing-fact-sheet"
},
{
  "label": "nci brca",
  "url": "https://www.cancer.gov/about-cancer/causes-prevention/genetics/brca-fact-sheet"
},
{
  "label": "Bedrosian I et al. (2024): Germline Testing in Patients With Breast Cancer: ASCO-Society of Surgical Oncology Guideline",
  "url": "https://pubmed.ncbi.nlm.nih.gov/38175972/"
},
{
  "label": "Richards S et al. (2015): Standards and guidelines for the interpretation of sequence variants: a joint consensus recommendation of the American College of Medical Genetics and Genomics and the Association for Molecular Pathology",
  "url": "https://pubmed.ncbi.nlm.nih.gov/25741868/"
}
], journals: ["familial-cancer"], companies: ["outcomes4me", "yemaachi-biotech", "fulgent-genetics", "invitae"],
    // The named germline hereditary cancer tests (gap census round, 4 November 2026).
    drugs: [...HEREDITARY_TEST_IDS_2026],


"notes": [
  "Consider two fictional negative reports. In one family, a harmful BRCA1 variant is already known and a suitable assay excludes that specific variant in the person tested. This is a true negative for that family finding, not a guarantee against all cancer. In another family, several relatives have had cancer but no causative family variant is known and a panel finds none. That result can be uninformative: family history can remain relevant without proving that a hidden mutation exists. A larger panel can add uncertain findings rather than a clearer explanation. Cascade testing means testing relatives for a confirmed family finding with their own consent and interpretation.",
  "Detection and interpretation are separate. The laboratory searches the regions and types of changes its method covers, then classifies a detected variant using evidence such as population frequency, segregation within families and functional studies. The ACMG/AMP framework uses pathogenic, likely pathogenic, uncertain significance, likely benign and benign categories; classifications can change as evidence develops. A VUS does not measure how severe an existing cancer is. That framework concerns Mendelian variant interpretation, not a complete rule for somatic drug selection.",
  "Keep the specimen, assay/version, genes and regions, covered variant types, reference sequence, exact variant, classification and limitations together. Blood, saliva or a cheek sample does not ordinarily require a tumour block, although the submitted aliquot is used for analysis. Sample adequacy, circumstances affecting whether a specimen represents constitutional DNA, untested regions or change types, and interpretation uncertainty can limit the answer. There is no universal percentage that means hereditary risk and no single positive cutoff shared by all assays.",
  "Testing can have implications for relatives and for privacy, insurance and the wish to know. Discuss these alongside consent and the possible results. A report describes what was tested and found; it is not a complete record of a family or a measurement of the tumour's present repair function. Tumour-only findings, constitutional origin and treatment eligibility need their own evidence. A harmful constitutional variant does not specify whether or when cancer will occur."
]
},
  {
    id: "functional-drug-testing", related: [
  "functional-precision-medicine-haematology",
  "bh3-profiling",
  "parsortix-ctc-harvest",
  "ex-vivo-tumour-fragments",
  "single-cell-mass-assays",
  "functional-model-selection"
], kind: "technology", name: "Functional (ex vivo) drug testing", sections: ["diagnostics", "drug-discovery"], status: "emerging", asOf: "2026-11-10", wikipedia: W("Precision_medicine"),
    tldr: "Functional drug testing measures a defined response to medicines in collected living material under laboratory conditions.",
    summary: "Functional drug testing exposes a defined living preparation to medicines and measures a specified response. Preparations may use dissociated cells, expanded organoids or short-term tissue cultures. Feasibility, outcome agreement and benefit from using a result to choose care are separate questions and must be tied to the actual assay version, cancer, treatment and setting.",
    principle: "Compare defined exposures with matched controls in a characterised viable preparation; attribute the endpoint to the relevant population.",
    strengths: ["Tests a drug-response hypothesis directly in a defined preparation","Can compare several exposures when material permits"],
    limitations: ["Preparation, viability, sampling and turnaround affect feasibility","Missing components can leave a drug mechanism untested","Outcome association alone does not establish clinical utility"],
    technologies: ["organoids"], links: [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Precision_medicine"
  },
  {
    "label": "Functional model interpretation: primary evidence",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4887336/"
  },
  {
    "label": "Breast-slice assay version and handling",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10542784/"
  },
  {
    "label": "Promega CellTiter-Glo: ATP readout and cellular-content limitations",
    "url": "https://www.promega.com/-/media/files/resources/protocols/technical-bulletins/0/celltiter-glo-luminescent-cell-viability-assay-protocol.pdf"
  },
  {
    "label": "Restivo et al. 2022: protocol-specific recovery from slow-frozen tumour tissue",
    "url": "https://doi.org/10.1038/s42003-022-04025-0"
  }
], companies: [
  "certis-oncology-solutions",
  "known-medicine",
  "notable-labs",
  "origin-bio",
  "zpredicta",
  "kernis-health",
  "palitra-bio",
  "valius",
  "specicare",
  "storemytumor",
  "travera",
  "first-ascent-biomedical",
  "kiyatec",
  "sagemedic",
  "kyan-technologies",
  "cancertain",
  "2curex",
  "oncosyne"
], notes: [
  "Specimen and assay card. Record donor/site/time, living preparation, transport and processing, initial composition, culture history, assay version, concentrations, exposure duration, replicates and control range. Fixed tissue cannot supply living cells; whether previously frozen material can supply the required viable preparation must be demonstrated for that protocol. Input suitability and recovery must be demonstrated for the method. Testing and endpoint processing use finite material. Output needs units, denominator, normalisation and uncertainty; acceptance criteria must be defined for the actual method. Name whether the preparation is dissociated cells, a fresh fragment or an expanded organoid. Mixed samples include normal neighbours, and expansion can change the represented populations.",
  "Handling evidence is method-specific. Ladan and colleagues collected breast tissue in their specified medium, cut 300 micrometre slices and assessed morphology, proliferation and apoptosis after three-day exposure. This is not a general transport or storage protocol for all screens. Growth-rate methods show why baseline counts and control division affect interpretation. Retain failures and exclusions; failed preparation is not clinical resistance. Sources: https://pmc.ncbi.nlm.nih.gov/articles/PMC10542784/ ; https://pmc.ncbi.nlm.nih.gov/articles/PMC4887336/ Medium, drug access and exposure duration can change the result. Mechanism-relevant controls test whether the claimed interaction can occur; absent required cells or unrealistic exposures can make an experiment uninformative even when a numerical response is available. A laboratory concentration is not a safe human dose.",
  "Fictional example. A well has half the metabolic signal but the same identified viable tumour-cell endpoint count as control. This establishes a changed proxy, not half the cells killed; endpoint equality also does not reconstruct every division and death. Separate death, target engagement, safe human dosing and clinical benefit remain questions. This is an arithmetic and interpretation exercise, not observed patient data. Possible readouts include cell number, metabolism, mass, growth and death. Adenosine triphosphate (ATP) is a cellular energy molecule measured by some luminescence assays. Promega's primary assay guidance states that cellular ATP content varies with cell type and physiology and can alter the relation between cell number and light output. A lower ATP signal can therefore reflect fewer cells or a per-cell change, rather than a counted death fraction. Source: https://www.promega.com/-/media/files/resources/protocols/technical-bulletins/0/celltiter-glo-luminescent-cell-viability-assay-protocol.pdf",
  "Restivo and colleagues generated organoids from matched fresh and slow-frozen colorectal tumour tissue from two patients with stage IV disease. Their specified slow-freezing protocol used a cryoprotectant to preserve living material, and the frozen-derived cultures took longer to form than the fresh-derived cultures. This is evidence of recovery under that protocol, not equivalence of all fresh, snap-frozen and viable-cryopreserved samples or a guaranteed turnaround. The handling history, recovery, malignant identity and assay quality need checking for the intended experiment. Preserved molecular material alone does not establish a recoverable living model. Source: https://doi.org/10.1038/s42003-022-04025-0"
],
"institutions": [
  "cure-first"
]
},
  {
    id: "organoids", related: ["immune-tumour-coculture-models", "tumour-spheroid-models"], keyPapers: ["paper-sato-lgr5-organoids-nature-2009"], kind: "technology", name: "Patient-derived organoids", sections: ["drug-discovery"], status: "established", asOf: "2026-11-10", wikipedia: W("Organoid"),
    tldr: "Patient-derived tumour organoids are cultures that self-organise selected tissue features and support defined laboratory experiments.",
    summary: "Patient-derived tumour organoids are cultures established from a patient's tumour tissue that can be expanded for repeated laboratory experiments when establishment succeeds. They are one member of the broader organoid family defined on the organoid record; establishment selects cells, malignant identity must be checked against the source specimen, and conventional epithelial cultures usually lack immune and supporting populations. Mechanism and drug-response results from them do not by themselves establish clinical utility.",
    principle: "Culture viable source cells in a specified environment, then verify the selected tissue features and assay response.",
    strengths: ["Material for repeated controlled experiments when establishment succeeds","Can represent selected source-tumour features"],
    limitations: ["Selection, normal-cell overgrowth and culture changes require checks","Conventional preparations do not recreate complete host physiology","Patient prediction and clinical utility need intended-use evidence"], links: [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Organoid"},{"label":"Functional model interpretation: primary evidence","url":"https://pubmed.ncbi.nlm.nih.gov/30550791/"},{"label":"Organoid establishment and identity","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC10598932/"},{"label":"Dijkstra tumour identity and overgrowth checks","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC6558289/"},{"label":"Organoid definition, composition and measurement boundaries","url":"https://onco.cc/terms/organoid/"},{"label":"Sachs et al. 2018: breast organoid biobank","url":"https://doi.org/10.1016/j.cell.2017.11.010"},{"label":"Bertotti et al. 2011: xenopatient HER2 study","url":"https://doi.org/10.1158/2159-8290.CD-11-0109"},{"label":"Calon et al. 2015: stromal cross-talk study","url":"https://doi.org/10.1038/ng.3225"}], companies: [
  "known-medicine",
  "zpredicta",
  "kernis-health",
  "specicare",
  "kiyatec",
  "sagemedic",
  "2curex",
  "orakl-oncology",
  "oncosyne",
  "signet-therapeutics",
  "aummune",
  "cellesce"
], notes: ["Patient-derived organoids can provide expandable material for repeated experiments when establishment succeeds. They are one part of the broader organoid family. The organoid definition holds the shared construction, consumption, quality-control and readout explanation; the technology record concerns their use as a research resource. A successful culture still needs malignant-cell identity and intended-use checks. Sources: https://doi.org/10.1016/j.cell.2017.11.010 ; https://doi.org/10.1016/j.cell.2018.11.021"],
"institutions": [
  "cure-first"
]
},
  {
    id: "pdx-models", related: ["genetically-engineered-mouse-models", "humanised-mouse-models"], kind: "technology", name: "Patient-derived xenografts", sections: ["drug-discovery"], status: "established", asOf: "2026-11-10", wikipedia: W("Patient_derived_xenograft"),
    tldr: "A patient-derived xenograft is patient tumour material grown in another species, commonly a mouse, for experiments under whole-animal exposure.",
    summary: "A patient-derived xenograft starts with patient tumour material implanted into another species, commonly an immunodeficient mouse. It can retain relevant tumour features within a different host, while engraftment selects populations and mouse-derived support can replace human stroma and vessels. Whole-animal dosing includes mouse exposure and metabolism, not human physiology. Humanised models add selected components whose identity, compatibility and persistence need checking. Fidelity and patient prediction are question- and method-specific.",
    principle: "Establish a graft, characterise source and host compartments, then compare a defined intervention using an explicit growth endpoint.",
    strengths: ["Tumour experiments under whole-animal exposure","Can assess selected source-tumour features over time"],
    limitations: [
  "Engraftment can fail and favours some tumours: Hidalgo describes a general impression that more aggressive tumours engraft more often (for example hormone-receptor-negative more than hormone-sensitive breast tumours), so collections can over-represent them; take rate varies by tumour type",
  "Mouse support, metabolism and immunity differ from human care",
  "Establishment and testing can take months"
], links: [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Patient_derived_xenograft"},{"label":"Functional model interpretation: primary evidence","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC3553601/"},{"label":"PDX review: timing and selection","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC4167608/"},{"label":"PDX establishment and response series","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC5834154/"},{"label":"Copy-number conservation and method","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC7808565/"},{"label":"NCI Patient-Derived Models Repository: identity and quality","url":"https://dctd.cancer.gov/drug-discovery-development/reagents-materials/pdmr/models"},{"label":"Yang et al. 2026: specialised humanised immune-stroma model","url":"https://doi.org/10.1007/s00262-026-04349-4"},{"label":"Ben-David et al. 2017: PDX evolution","url":"https://pubmed.ncbi.nlm.nih.gov/28991255/"}], companies: ["certis-oncology-solutions"], notes: ["Timing and denominators. Hidalgo's 2014 review described four to eight months to a study-ready model; it is a historical review estimate, not a laboratory guarantee. Izumchenko's series reported 578 successful grafts from 1,163 implanted specimens, described as 49 percent, and a mean 16 weeks from engraftment to drug exposure, with substantial variation. That clock is not the whole biopsy-to-decision interval. Keep submitted, established and interpretable donor models separate. Arithmetic check by OnCo: 578 divided by 1,163 is approximately 49.7 percent; the paper itself states 49 percent. Retain the counts and distinguish the reported percentage from this calculation. Sources: https://pmc.ncbi.nlm.nih.gov/articles/PMC4167608/ ; https://pmc.ncbi.nlm.nih.gov/articles/PMC5834154/","Fidelity is measured, not assumed. Record histology, lineage and relevant molecular features against the source, host strain, site and passage, and species assignment for the mechanism. Ben-David reported mouse-specific copy-number evolution in studied datasets; Woo's direct-DNA analyses reported conservation and showed that measurement method matters. Neither establishes perfect preservation nor inevitable complete divergence for every model. Sources: https://pubmed.ncbi.nlm.nih.gov/28991255/ ; https://pmc.ncbi.nlm.nih.gov/articles/PMC7808565/ Engraftment is establishment of growth after implantation; passage transfers an established graft to another host. Reduced growth relative to a control is different from regression below a stated starting burden. Matching molecular features does not validate every drug prediction.","Assay card. Viable material, establishment, passage and animal experiments consume finite material. Report burden or volume with units, baseline and observation clock, exposure and comparator animals, and donor versus animal counts. Failed engraftment and excluded experiments remain visible. Human-specific binding to tumour cells does not establish activity on mouse stromal targets. A graft tested later in a dish has a different experimental setting. Source: https://pmc.ncbi.nlm.nih.gov/articles/PMC3553601/","A fictional example separates denominators: ten donor specimens are submitted, four establish grafts, three yield an interpretable drug experiment and two meet its response criterion. Establishment is 4/10; response among interpretable donor models is 2/3, not a patient-response rate. A human-specific antibody binding a retained tumour receptor also does not establish binding to mouse-derived vessel targets required by a proposed mechanism.","NCI's model repository uses lineage identity, pathology and human/mouse-content checks and notes that some models evolve with passage. Its procedures and material types are repository-specific. Yang's 2026 primary abstract describes adding patient-derived tumour and mesenchymal cells, human endothelial cells and humanised marrow to a specialised immune-stroma PDX. This is evidence for a defined added-component model, not complete reconstruction of human immunity. Sources: https://dctd.cancer.gov/drug-discovery-development/reagents-materials/pdmr/models ; https://doi.org/10.1007/s00262-026-04349-4"]},
  {
    id: "proteomics", kind: "technology", name: "Proteomics & phosphoproteomics", sections: ["diagnostics", "drug-discovery"], status: "emerging", asOf, wikipedia: W("Proteomics"),
    tldr: "Measuring the proteins in a tumour, which is what drugs actually hit, rather than the genes that encode them.",
    summary: "Proteomics measures the proteins and phosphorylation sites in a tumour directly, using liquid chromatography tandem mass spectrometry with isobaric labelling to quantify thousands of proteins and phosphosites at once. Mass-spectrometry proteomics (CPTAC) reveals pathway activity and ADC target abundance that transcript levels do not predict, since RNA and protein levels often disagree. Quantitative IHC and mass-spec assays of HER2 and TROP2 aim to improve ADC patient selection by measuring the actual antigen the drug binds rather than a proxy. Throughput and standardisation remain the barriers to routine clinical use, and it is still open whether protein-level selection will outperform established IHC scoring in trials. For a newcomer, proteomics measures what drugs actually hit, the proteins, rather than the genes that encode them.",
    principle: "Liquid chromatography tandem mass spectrometry with isobaric labelling quantifies proteins and phosphosites.",
    strengths: ["Direct measurement of drug targets and signalling"],
    limitations: ["Throughput and standardisation"], companies: ["elucidate-bio", "acrivon-therapeutics", "biodesix", "helio-genomics", "nonagen-bioscience", "omanta", "oncohost"], links: [{ label: "Wikipedia", url: W("Proteomics") }],
  },
  {
    id: "methylation-profiling", related: ["cfdna-methylation-testing", "cns-tumour-methylation-classifier"], kind: "technology", name: "DNA methylation profiling", sections: ["diagnostics", "early-detection"], status: "established", asOf, wikipedia: W("DNA_methylation"),
    tldr: "Reading chemical tags on DNA that reveal a cell's identity, used to classify brain tumours and to detect cancer in blood.",
    summary: "DNA methylation profiling reads the chemical marks on cytosines that record a cell's identity, using bisulfite or enzymatic conversion followed by arrays or sequencing, with classifiers trained on reference cohorts. The Heidelberg/DKFZ methylation classifier is standard for CNS tumour diagnosis (WHO 2021) because methylation retains cell-of-origin memory even when histology is ambiguous. Methylation in cfDNA underlies Galleri and tissue-of-origin prediction, since it is a stable analyte in blood. Nanopore sequencing gives intraoperative methylation classification in under an hour, allowing the surgical plan to change during the operation. The main limitation is dependence on the reference cohort, so rare or under-represented tumour types can be misclassified. The simple version is that methylation is a cell's identity badge, readable in tissue or blood.",
    principle: "Bisulfite or enzymatic conversion, arrays or sequencing; classifiers trained on reference cohorts.",
    strengths: ["Cell-of-origin memory", "Stable analyte in blood"],
    limitations: ["Reference cohort dependence"],
    technologies: ["mced"],
    cancers: ["glioblastoma"], links: [{ label: "Wikipedia", url: W("DNA_methylation") }], companies: ["adela", "clear-gene", "clearnote-health", "helio-genomics", "nucleix", "universal-dx"],
  },

  // ======================= SURGERY =======================
  {
    id: "robotic-surgery", machineFamily: "surgical", tags: ["precision"], related: ["surgical-robot-platforms"], kind: "technology", name: "Robotic & minimally invasive surgery", sections: ["surgery"], status: "standard-of-care", asOf, wikipedia: W("Robot-assisted_surgery"),
    tldr: "Surgeons operate through small incisions using robotic arms with tremor-free precision and 3D vision.",
    summary: "Robotic prostatectomy, hysterectomy, colectomy, and increasingly lung and pancreatic resections. Oncologic equivalence to open surgery is established in most sites (with the notable exception of early cervical cancer, LACC trial). Faster recovery; cost is the trade-off. Intuitive dominates; Medtronic Hugo, CMR Versius, and single-port systems compete.",
    principle: "Tele-manipulated instruments move with wristed motion through laparoscopic ports.",
    strengths: ["Precision, shorter stay", "Enables complex minimally invasive resections"],
    limitations: ["Cost", "Loss of haptic feedback", "Not superior for every indication"],
    companies: ["intuitive-surgical", "monteris-medical", "quantum-surgical", "xact-robotics", "medtronic", "cmr-surgical", "virtuoso-surgical"], terms: ["colectomy"], links: [{ label: "Wikipedia", url: W("Robot-assisted_surgery") }],
  },
  {
    id: "fluorescence-guided-surgery", machineFamily: "surgical", trials: ["nct07276789"], tags: ["precision"], kind: "technology", name: "Fluorescence-guided surgery", sections: ["surgery", "imaging"], status: "established", asOf, wikipedia: W("Fluorescence_image-guided_surgery"),
    tldr: "Injecting a dye that makes tumour glow so the surgeon can see exactly where to cut.",
    summary: "In fluorescence-guided surgery a tumour-selective fluorophore accumulates in the tumour and is imaged with near-infrared camera systems, so the surgeon can see disease that is invisible under white light. 5-ALA in glioma increases complete resection rates; pafolacianine (Cytalux) finds occult ovarian and lung lesions; pegulicianine (Lumisight, 2024) detects residual breast cancer in the lumpectomy cavity. The clinical payoff is fewer positive margins and re-operations. Targeted probes against EGFR, PSMA, and CEA are in phase 2-3 and would extend the approach to more tumour types. The limitation is millimetre depth penetration, so the dye shows surface disease and cannot see deep into tissue. The simple version is that a dye makes the tumour glow so the surgeon knows exactly where to cut.",
    principle: "A tumour-selective fluorophore accumulates in the tumour and is imaged with near-infrared camera systems.",
    strengths: ["Fewer positive margins and re-operations"],
    limitations: ["Millimetre depth penetration"],
    technologies: ["optical-imaging"], links: [{ label: "Wikipedia", url: W("Fluorescence_image-guided_surgery") }], companies: ["vergent-bioscience", "photonamic", "blaze-bioscience", "antelope-surgical-solutions", "fluoguide"],
  },
  {
    id: "sentinel-node", machineFamily: "surgical", tags: ["precision"], drugs: ["technetium-sulfur-colloid"], kind: "technology", name: "Sentinel lymph node biopsy", sections: ["surgery"], status: "standard-of-care", asOf:"2026-11-09", wikipedia: W("Sentinel_lymph_node"),
    tldr: "Sentinel lymph node biopsy identifies and samples the first draining node or nodes to assess spread. The sampled result does not describe every node or prove whole-body absence.",
    summary: "A tracer and mapping method identify one or more first-draining lymph nodes, which are removed for pathological examination. The procedure and sampled tissue result are different records. Technique, pretreatment findings and treatment timing affect interpretation; sentinel-node biopsy is not a guarantee that every involved node was found.\n\nZ0011 and AMAROS tested specified surgery-first treatment strategies after positive sentinel findings. Their populations and accompanying radiation matter. Residual positive sentinel nodes after neoadjuvant treatment are a different question, studied by A011202. Avoid turning these comparisons into a universal rule that every positive node needs dissection or that no further axillary treatment is ever needed.",
    principle: "Tracer (radiocolloid, blue dye, ICG, magnetic) injected at tumour identifies draining node.",
    strengths: ["Avoids lymphoedema from full dissection"],
    limitations: ["False negatives in ~5-10%"],
    cancers: ["tnbc", "breast-hr-positive", "melanoma"], links: [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Sentinel_lymph_node"},{"label":"NCI: breast surgery and nodal procedures","url":"https://www.cancer.gov/types/breast/treatment/surgery"},{"label":"Z0011 ten-year report","url":"https://pubmed.ncbi.nlm.nih.gov/28898379/"},{"label":"AMAROS original report","url":"https://pubmed.ncbi.nlm.nih.gov/25439688/"},{"label":"A011202 registry: residual-node-positive setting","url":"https://clinicaltrials.gov/study/NCT01901094"}],
  },
  {
    keyPapers:["paper-booster-ablation-immunotherapy-2025"],
    notes:["BOOSTER studied ablation added to continuing immunotherapy in selected advanced lung cancer with limited residual disease after response. It was not an SBRT trial or a comparison in every metastatic setting. Cryo-versus-heating comparisons within that small trial were exploratory rather than a randomised test of the two modalities.","Record the method, applicator settings such as power in watts, exposure time, measured temperature in degrees Celsius where relevant, and three-dimensional zone or margin measurements with the imaging method and assessment time. A generator setting or one sensor does not measure exposure everywhere or count viable cells."],
    id: "thermal-ablation", machineFamily: "ablation", related: ["cryoablation-systems", "microwave-rf-ablation"], kind: "technology", name: "Thermal ablation (RFA, microwave, cryo)", sections: ["surgery"], status: "standard-of-care", asOf:"2026-11-09", wikipedia: W("Radiofrequency_ablation"),
    tldr: "Thermal ablation uses an applicator to heat or freeze selected tissue. Safe coverage and later local control need assessment beyond placing the device.",
    summary: "Image-guided thermal ablation includes radiofrequency current, microwave fields and cryoablation. The applicator changes tissue temperature; injury depends on exposure through space and time. Chemical ablation and membrane-disrupting electrical approaches belong to a broader ablation category and should be named separately. These methods differ from ionising radiation.\n\nPlanning considers access, the target and intended margin, blood flow and nearby structures. Neither a central reading nor a visible treatment zone proves lethal exposure throughout the target. A study’s lesion-size rule is not a universal physical ceiling. Treatment can injure normal tissue and may require further procedures; outpatient treatment, preserved function and unlimited repeatability are not guaranteed.\n\nThe reporting consensus separates technical coverage, technique efficacy at a defined follow-up and later local progression. The method, assessment, retreatments and complications belong with each result. Local control or symptom relief does not establish eradication of disease elsewhere or a systemic immune benefit.",
    principle: "An applicator transfers heat into tissue or extracts it. The spatial and temporal exposure, tissue properties and blood flow influence the resulting injury.",
    strengths: ["Can treat a selected site without removing the whole organ","Image guidance supports access and assessment of the treatment zone"],
    limitations: ["Access, geometry and nearby normal structures can limit coverage","Blood flow and device/tissue properties affect exposure","Imaging and later assessment are needed; visible coverage alone is insufficient"],
    cancers: ["hcc", "rcc", "colorectal"], links: [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Radiofrequency_ablation"},{"label":"NICE NG151: colorectal cancer, recommendations","url":"https://www.nice.org.uk/guidance/ng151/chapter/Recommendations"},{"label":"International ablation terminology and reporting consensus, 2014","url":"https://pubmed.ncbi.nlm.nih.gov/25442132/"},{"label":"ACR/RSNA: thermal ablation, treatment reach and risks","url":"https://www.radiologyinfo.org/en/info/thermal-ablation-therapy"},{"label":"BOOSTER primary report, 2025","url":"https://pubmed.ncbi.nlm.nih.gov/41213939/"}], companies: ["monteris-medical", "quantum-surgical", "xact-robotics", "medtronic", "johnson-johnson", "boston-scientific", "angiodynamics", "icecure-medical", "optheras"],
  },
  {
    id: "hifu-histotripsy", machineFamily: "ablation", institutions: ["uclh", "sunnybrook-odette"], kind: "technology", name: "Focused ultrasound & histotripsy", sections: ["surgery", "devices"], status: "established", asOf, wikipedia: W("High-intensity_focused_ultrasound"),
    tldr: "Destroying tumours from outside the body with tightly focused sound waves, using either heat or microscopic bubbles.",
    summary: "Focused ultrasound uses an extracorporeal transducer to concentrate acoustic energy inside the body, either heating tissue to coagulation (HIFU) or, in histotripsy, driving cavitation that mechanically fractionates the tumour without heat. HIFU is approved for prostate cancer focal therapy and uterine fibroids. Histotripsy (HistoSonics Edison, FDA 2023) mechanically liquefies liver tumours, with early evidence of immune activation, and trials extend to kidney and pancreas. The approach is completely non-invasive and uses no ionising radiation. Its constraints are the acoustic window, since ribs and bowel gas block the beam, and the fact that long-term oncologic data are limited, so durability of tumour control is the open question. The simple version is that tightly focused sound waves destroy a tumour from outside the body.",
    principle: "Extracorporeal transducer focuses acoustic energy; thermal coagulation (HIFU) or cavitation-driven mechanical fractionation (histotripsy).",
    strengths: ["Completely non-invasive", "No ionising radiation"],
    limitations: ["Acoustic window (ribs, bowel gas)", "Long-term oncologic data limited"],
    companies: ["histosonics", "insightec", "profound-medical", "imgt"],
    cancers: ["hcc", "prostate", "pancreatic"], links: [{ label: "Wikipedia", url: W("High-intensity_focused_ultrasound") }],
  },
  {
    id: "irreversible-electroporation", machineFamily: "ablation", trials: ["nct03899636"], companies: ["angiodynamics"], kind: "technology", name: "Irreversible electroporation (NanoKnife)", sections: ["surgery", "devices"], status: "established", asOf, wikipedia: W("Irreversible_electroporation"),
    tldr: "Irreversible electroporation uses short high-voltage pulses that punch permanent holes in tumour cells while sparing nearby vessels and ducts.",
    summary: "Irreversible electroporation delivers microsecond high-voltage pulses between needle electrodes, permanently disrupting cell membranes while leaving collagenous structures such as vessels and ducts intact. This non-thermal mechanism is why it is used in locally advanced pancreatic cancer wrapped around vessels, where heat-based ablation would be unsafe, and in focal prostate therapy (FDA 2024 for prostate). The procedure requires general anaesthesia with muscle paralysis and cardiac synchronisation, because the pulses can trigger contractions and arrhythmia. Randomised data remain limited, so its survival benefit in pancreatic cancer is not yet established. The simple version is that electrical pulses punch permanent holes in tumour cells while sparing the pipes running through them.",
    principle: "Microsecond electrical pulses between needle electrodes disrupt membranes irreversibly.",
    strengths: ["Safe next to vessels and bile ducts"],
    limitations: ["General anaesthesia with paralysis; cardiac synchronisation", "Limited randomised data"],
    cancers: ["pancreatic", "prostate"], links: [{ label: "Wikipedia", url: W("Irreversible_electroporation") }],
  },

  // ======================= RADIATION =======================
  {
    id: "imrt-igrt", tags: ["precision"], keyPapers: ["paper-van-herk-ptv-margin-recipe-ijrobp-2000", "paper-de-crevoisier-daily-weekly-igrt-ijrobp-2018"], trials: ["start-b", "prime-ii", "import-low", "nsabp-b39", "nrg-cc001", "catnon", "int-0116", "cao-aro-aio-94", "rapido", "rtog-9601", "horrad", "pop-rt", "eortc-22922", "ma-20", "dbcg-82bc", "rtog-9402", "eortc-26951", "eortc-22033"], dependsOn: ["treatment-planning-systems", "ct", "in-vivo-dosimetry"], related: ["fractionation-repopulation-models", "total-body-irradiation", "tumour-control-probability-models", "c-arm-linac", "ring-gantry-linac", "tomotherapy", "proton-vs-imrt"], kind: "technology", name: "IMRT / IGRT (modern external beam)", sections: ["radiation"], status: "standard-of-care", asOf: "2026-09-17",
    tldr: "IMRT and IGRT shape the radiation beam to the tumour's outline from multiple angles and check the patient's position with a scan before every session, so surrounding organs receive less dose. Fewer, larger doses are now standard in breast and prostate cancer, but a low-dose bath still spreads across normal tissue.",
    summary: "Intensity-modulated and volumetric arc therapy shape the radiation dose using multi-leaf collimators that vary beam intensity from multiple angles around the patient, while image guidance with cone-beam CT verifies patient position before each fraction. Together they are the default for most curative radiotherapy, giving conformal dose to the tumour with fewer side effects. Hypofractionation, meaning fewer, larger doses, is now standard in breast and prostate cancer and saves patients many visits. The remaining drawbacks are the low-dose bath spread across normal tissue from many beam angles and the need for motion management in moving targets. Adaptive replanning and MR-guidance are the next step, adjusting the plan to daily anatomy. Photons are low-LET and have RBE 1 by definition. Hypofractionation with IMRT is an alpha/beta bet; choosing protons instead of IMRT is an LET/RBE bet. The simple version is radiation sculpted to the tumour and checked with imaging every day.",
    principle: "Multi-leaf collimators modulate beam intensity from many angles; cone-beam CT verifies position before each fraction.",
    strengths: ["Conformal dose, fewer side effects", "Hypofractionation saves visits"],
    limitations: ["Low-dose bath to normal tissue", "Motion management"],
    terms: ["alpha-beta-ratio", "linear-energy-transfer", "relative-biological-effectiveness"],
    links: [{ label: "ADRIATIC: durvalumab after chemoradiotherapy for limited-stage small-cell lung cancer (New England Journal of Medicine 2024)", url: "https://doi.org/10.1056/NEJMoa2404873" }, { label: "PACIFIC: a year of durvalumab after chemoradiotherapy for stage III lung cancer (New England Journal of Medicine 2017)", url: "https://doi.org/10.1056/NEJMoa1709937" }], journals: ["cancer-radiotherapie", "clinical-oncology-rcr", "practical-radiation-oncology", "radiation-oncology", "seminars-in-radiation-oncology", "strahlentherapie-und-onkologie"], companies: ["intraop-medical", "radformation", "varian", "elekta"],
  },
  {
    id: "sbrt", tags: ["precision"], trials: ["chisel", "jcog0403"], dependsOn: ["imrt-igrt"], kind: "technology", name: "SBRT / SABR (stereotactic radiotherapy)", sections: ["radiation"], status: "standard-of-care", asOf:"2026-11-09", wikipedia: W("Stereotactic_radiosurgery"),
    tldr: "Stereotactic body radiotherapy delivers a high dose per treatment to a defined body target using specialised localisation and verification. A short schedule alone does not identify it or establish safety.",
    summary: "Stereotactic body radiotherapy, also called SABR, uses specialised localisation, planning, positioning, image guidance and delivery to give a high dose per fraction to a body target outside the brain. A small number of visits does not establish that this delivery package was used. A biologically effective dose calculation compares modelled effects under assumptions; it does not document stereotactic localisation, motion management or verification. Modern non-stereotactic radiotherapy can also use imaging, conformal beams and motion assessment.\n\nThe target, motion, dose distribution, positioning uncertainty, prior overlapping radiation and normal-organ constraints determine the coverage problem. Dose falls through space rather than stopping at a drawn line. There is no universal one-centimetre safe boundary, lesion-size ceiling or prescription that applies to every organ. Planned exposure, verified delivery, local control and toxicity need their own measurements.\n\nA 2010 prospective study concerned medically inoperable peripheral early-stage lung cancer and measured local control, distant failure and toxicity. That setting does not validate treatment of every central lesion or organ. CURB and NRG-BR002 tested different metastatic settings and comparisons. Local control, added progression-free or overall survival, symptom relief and an immune response are separate outcomes.",
    principle: "Stereotactic localisation and specialised delivery concentrate high dose per fraction around a defined target, with explicit motion, dosimetric and quality checks.",
    strengths: ["Can concentrate target treatment into a short course","Conformal planning can limit exposure to nearby tissues"],
    limitations: ["Normal tissues still receive radiation and can be injured","Motion, prior radiation and organ-specific constraints affect feasibility","A delivery label does not establish added survival or systemic immune benefit"],
    terms: ["oligometastatic", "abscopal-effect"], people: ["david-palma"], related: ["idea-ferroptosis-persisters", "sabr-oligometastases", "cyberknife", "gamma-knife", "zap-x"], links: [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Stereotactic_radiosurgery"},{"label":"NICE NG122: lung cancer, management","url":"https://www.nice.org.uk/guidance/ng122/chapter/Management"},{"label":"Cancer Research UK: coping with breathlessness when you have lung cancer","url":"https://www.cancerresearchuk.org/about-cancer/lung-cancer/living-with/coping-with-breathlessness"},{"label":"NCI: external-beam planning, positioning and delivery","url":"https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy/external-beam"},{"label":"ASTRO 2022 safety white paper: technical, dosimetric and quality requirements","url":"https://pubmed.ncbi.nlm.nih.gov/35283342/"},{"label":"Timmerman: peripheral early-stage inoperable lung study, 2010","url":"https://pubmed.ncbi.nlm.nih.gov/20233825/"},{"label":"CURB: oligoprogression, 2024","url":"https://pubmed.ncbi.nlm.nih.gov/38104577/"},{"label":"NRG-BR002: limited metastatic breast cancer, 2026","url":"https://pubmed.ncbi.nlm.nih.gov/42842849/"},{"label":"IAEA 2013: BED is a linear-quadratic model calculation, Appendix XI","url":"https://www-pub.iaea.org/MTCD/Publications/PDF/Pub1556_web.pdf"}], journals: ["cancer-radiotherapie", "clinical-oncology-rcr", "practical-radiation-oncology", "radiation-oncology", "seminars-in-radiation-oncology", "strahlentherapie-und-onkologie"], companies: ["xcision-medical-systems"],
  },
  {
    id: "proton-therapy", machineFamily: "particle", tags: ["precision"], dependsOn: ["treatment-planning-systems", "ct", "in-vivo-dosimetry"], related: ["intensity-modulated-proton-therapy", "proton-therapy-systems", "proton-vs-imrt", "idea-bio2-let-rbe-ab-selects-protons"], kind: "technology", name: "Proton therapy", sections: ["radiation"], status: "established", asOf: "2026-09-17", wikipedia: W("Proton_therapy"),
    tldr: "Radiation using protons, which stop inside the tumour instead of passing through, so tissue behind it gets no dose.",
    summary: "Proton therapy exploits the Bragg peak: protons deposit maximum energy at a depth set by their energy and then stop, so there is no exit dose, and pencil-beam scanning paints the tumour layer by layer. This lowers the integral dose to normal tissue and reduces second cancers in children, which is why it is established for paediatric tumours, skull-base and spine tumours, and re-irradiation. Clinical dose is reported at a constant relative biological effectiveness of 1.1; linear energy transfer, and therefore RBE, rises at the distal edge, so that convention can under- or over-state biological dose to a late-responding organ sitting just beyond the target. Whether that window, plus the tissue's alpha/beta ratio, is large enough to beat modern IMRT in adults is the open question (PARTIQoL, RADCOMP, NRG oesophagus and lung). Range uncertainty and cost remain. Compact single-room systems (Mevion, IBA Proteus One) expand access. The simple version is that protons stop inside the tumour, so tissue behind it is spared.",
    principle: "Bragg peak: protons deposit maximum energy at a depth set by their energy, with no exit dose. Pencil-beam scanning paints the tumour.",
    strengths: ["No exit dose; lower integral dose", "Reduced second cancers in children"],
    limitations: ["Cost", "Range uncertainty", "Limited randomised evidence in adults", "Constant RBE 1.1 is a convention; variable RBE at the distal edge is unverified in the clinic"],
    terms: ["bragg-peak", "relative-biological-effectiveness", "linear-energy-transfer", "alpha-beta-ratio"],
    technologies: ["linear-quadratic-model", "imrt-igrt"],
    trials: ["partiqol", "radcomp"],
    keyPapers: ["paper-paganetti-proton-rbe-ijrobp-2014", "paper-liao-proton-vs-imrt-nsclc-jco-2018"],
    companies: ["iba", "mevion", "varian", "hitachi", "sumitomo-heavy-industries", "protom"], links: [{ label: "Wikipedia", url: W("Proton_therapy") }, { label: "Paganetti, RBE values for proton beam therapy (IJROBP 2014)", url: "https://doi.org/10.1016/j.ijrobp.2014.07.001" }],
  },
  {
    id: "carbon-ion", machineFamily: "particle", institutions: ["kanagawa-cancer-center"], related: ["carbon-ion-synchrotrons"], companies: ["toshiba-energy-systems", "hitachi"], kind: "technology", name: "Carbon-ion therapy", sections: ["radiation"], status: "established", asOf: "2026-09-17",
    tldr: "Heavier charged particles that kill even radiation-resistant tumours, available at only a handful of centres worldwide.",
    summary: "Carbon-ion therapy uses carbon nuclei that deposit high-LET tracks and clustered DNA damage at a sharp Bragg peak. Relative biological effectiveness is typically around 2 to 3 and is model-dependent (local effect model, microdosimetric kinetic model). The oxygen enhancement ratio falls toward 1, which is the argument in hypoxic, radioresistant tumours (sarcoma, chordoma, adenoid cystic carcinoma, pancreas). About 15 centres operate worldwide (Japan, Germany, Italy, China, Austria); Mayo Clinic Jacksonville is building the first US centre. Randomised comparisons with protons or photons are scarce. The simple version is that heavier charged particles can kill tumours that ordinary radiation cannot, but only a handful of centres can deliver them.",
    principle: "Carbon nuclei deposit dense ionisation tracks causing clustered DNA damage with a sharp Bragg peak.",
    strengths: ["Effective in radioresistant tumours"],
    limitations: ["Very few facilities", "Cost"],
    terms: ["linear-energy-transfer", "relative-biological-effectiveness", "bragg-peak", "oxygen-enhancement-ratio", "alpha-beta-ratio"],
    technologies: ["proton-therapy", "linear-quadratic-model"],
    cancers: ["sarcoma", "pancreatic"], links: [{ label: "Malouff et al., Carbon ion therapy: a modern review of an emerging technology (Frontiers in Oncology 2020)", url: "https://doi.org/10.3389/fonc.2020.00082" }],
  },
  {
    id: "brachytherapy", related: ["ldr-seed-brachytherapy", "brachytherapy-afterloaders"], kind: "technology", name: "Brachytherapy", sections: ["radiation"], status: "standard-of-care", asOf, wikipedia: W("Brachytherapy"),
    tldr: "Brachytherapy places a radioactive source directly inside or next to the tumour.",
    summary: "Brachytherapy places sealed radioactive sources (192Ir, 125I, 103Pd) directly inside or next to the tumour, so the dose falls off steeply from within and gives the highest conformality of any radiotherapy technique. It is a mandatory, curative component of cervical cancer treatment, is used in prostate cancer as LDR seed implants or HDR, and is applied in breast (partial-breast), skin, and eye, where plaque brachytherapy treats uveal melanoma. Treatment courses are short compared with external beam. The approach is invasive, requiring an implant procedure, and expertise is declining in some regions even where the evidence is strongest, which is a concern in cervical cancer. The simple version is that the radiation source is put inside the tumour rather than beamed in from outside.",
    principle: "Sealed sources (192Ir, 125I, 103Pd) deliver steep dose fall-off from within.",
    strengths: ["Highest conformality", "Short treatment"],
    limitations: ["Invasive", "Declining expertise in some regions"],
    cancers: ["cervical", "prostate", "melanoma"], links: [{ label: "Wikipedia", url: W("Brachytherapy") }], companies: ["empyrean-medical-systems", "gt-medical-technologies", "elekta", "varian", "eckert-ziegler"],
  },
  {
    id: "mr-linac", machineFamily: "radiotherapy", tags: ["precision"], dependsOn: ["mri", "imrt-igrt"], institutions: ["umc-utrecht", "nki", "amsterdam-umc", "the-christie", "royal-marsden", "md-anderson", "tum-munich", "heidelberg-nct", "uw-carbone", "wustl-siteman", "ucla-jonsson", "sunnybrook-odette"], related: ["ring-gantry-linac", "biology-guided-radiotherapy", "mr-and-biology-guided-radiotherapy-roadmap"], kind: "technology", name: "MR-guided adaptive radiotherapy", sections: ["radiation"], status: "established", asOf: "2026-11-04",
    tldr: "An MR-linac is a radiation machine with an MRI scanner built in, so images taken during setup let the plan be re-optimised in minutes to that day's anatomy. It allows tighter margins and higher doses in pancreatic and prostate cancer, but treatment is slow and costly, and whether daily adaptation improves cure rates rather than only toxicity is unproven.",
    summary: "An MR-linac integrates an MRI scanner into the treatment machine, acquiring images during setup and delivery so the plan can be re-optimised in minutes to the anatomy of that day. Elekta Unity and ViewRay MRIdian enable daily online adaptation and gating on soft-tissue targets such as pancreas, prostate, and liver, allowing tighter margins and dose escalation in pancreas. The MIRAGE trial showed reduced toxicity in prostate SBRT with MR guidance. Biology-guided radiotherapy (RefleXion, PET-guided) is a parallel approach that tracks the tumour's metabolic signal instead. Slow throughput and cost are the practical limits, and whether daily adaptation improves cure rates rather than only toxicity is still being tested. The simple version is a radiation machine with an MRI inside it.\n\nIn the FDA record ViewRay's first system, combining MRI with cobalt-60 sources, was cleared in May 2012 (K111862); the MRIdian Linac in February 2017 (K162393) and a redesigned version in December 2021 (K212958); and Elekta Unity, a 7 MV linac rotating around a 1.5 tesla MRI, in December 2018 (K182076). ViewRay filed for Chapter 11 in July 2023; ViewRay Systems, established on 6 February 2024 after acquiring ViewRay's assets, designs, makes and sells the MRIdian A3i.",
    principle: "Integrated MRI acquires images during setup and delivery; plan re-optimised in minutes.",
    strengths: ["Tighter margins, dose escalation in pancreas"],
    limitations: ["Slow throughput", "Cost"],
    companies: ["elekta", "reflexion", "viewray", "philips"],
    cancers: ["pancreatic", "prostate"], aka: ["MR-linac", "Elekta Unity", "MRIdian", "MRIdian A3i", "ViewRay System"], links: [{ label: "FDA 510(k) K111862: ViewRay System, MRI with cobalt-60 (2012)", url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K111862" }, { label: "FDA 510(k) K162393: MRIdian Linac (2017)", url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K162393" }, { label: "FDA 510(k) K212958: MRIdian Linac (2021)", url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K212958" }, { label: "FDA 510(k) K182076: Elekta Unity (2018)", url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K182076" }, { label: "ViewRay Systems: investors", url: "https://viewraysystems.com/investors/" }, { label: "MIRAGE: MRI-guided versus CT-guided stereotactic body radiotherapy for prostate cancer (JAMA Oncology 2023)", url: "https://doi.org/10.1001/jamaoncol.2022.6558" }],
  },
  {
    id: "flash-rt", machineFamily: "radiotherapy", kind: "technology", name: "FLASH radiotherapy", sections: ["radiation"], status: "phase-1", asOf, wikipedia: W("FLASH_radiotherapy"),
    tldr: "Delivering an entire dose in under a second, which in animals spares healthy tissue while still killing the tumour.",
    summary: "FLASH radiotherapy delivers the entire dose in milliseconds rather than minutes, at ultra-high dose rates above 40 Gy/s, and in preclinical models this spares normal tissue while killing the tumour equally well. First-in-human trials (FAST-01/02 with protons, Varian; electron trials in Lausanne) show feasibility. The mechanism, proposed as oxygen depletion or radical recombination, is debated, and the clinical effect is unproven. If real, the effect could widen the therapeutic window dramatically, but hardware constraints make it hard to reach deep tumours with current machines. The simple version is that giving radiation in a fraction of a second may protect healthy tissue, and human trials are only now testing whether that holds.",
    principle: "Dose delivered in milliseconds rather than minutes; differential normal-tissue sparing.",
    strengths: ["Potential to widen therapeutic window dramatically"],
    limitations: ["Unproven in humans", "Hardware constraints for deep tumours"],
    companies: ["varian", "empyrean-medical-systems", "intraop-medical"],
    tags: ["frontier", "precision"], keyPapers: ["paper-favaudon-flash-mice-sci-transl-med-2014"], links: [{ label: "Wikipedia", url: W("FLASH_radiotherapy") }],
  },
  {
    notes:["Radioactive activity is a decay rate in becquerels; absorbed dose is deposited energy per mass in gray. A single bright image is not time-integrated exposure. Dosimetry combines suitable activity measurements or models over time with tissue geometry and emission properties. Neither the targeting-molecule mass nor the administered activity alone specifies tumor dose.","Radioimmunotherapy uses an antibody carrier. The broader radiopharmaceutical category also includes organ-seeking products without a separate targeting ligand. Not every attachment uses a metal chelator. Alpha and beta emissions have different path and energy-deposition properties; neither label alone ranks safety or effectiveness. Daughter redistribution and microscopic geometry can matter.",
"Radiation can deposit energy beyond the cell carrying the radioactive product, so chemical-payload uptake into each neighbouring cell is not the same requirement. Binding and internalisation can affect retention, but the complete carrier's distribution, biological removal, radionuclide decay and tissue geometry still determine delivery. A diagnostic tracer image is not a measured therapeutic absorbed dose, and resistance to a chemotherapy payload does not itself establish radiation sensitivity or safe organ exposure.",
"Sgouros's 2020 review labels its table values approximate emission range in tissue: 0.62 mm for lutetium-177 beta emission, and 0.05 to 0.08 mm for the listed radium-223, actinium-225 and thorium-227 alpha emitters. That column does not identify the values as mean or maximum ranges, so they should not silently be relabelled as either or used as exact treatment boundaries. The isotope and range convention matter; one beta or alpha number is not a value for every radionuclide. FDA's 2019 radiopharmaceutical guidance separately defines physical, biological and effective half-life and time-integrated activity."
],
    id: "radioligand-therapy", dependsOn: ["therapy-isotope-supply-chain", "radiopharmacy-network", "medical-cyclotrons-synthesis-modules", "pet-ct", "radioligand-dosimetry"], kind: "technology", name: "Radioligand therapy (beta emitters)", sections: ["radiopharma", "radiation"], status: "approved", asOf:"2026-11-11", since: 2018, wikipedia: W("Radioligand_therapy"),
    tldr: "A target-binding molecule carries a radionuclide whose emissions deposit radiation in tissue. Distribution and retention help determine tumor and normal-organ exposure.",
    summary: "Lutetium-177 therapies deliver beta-particle radiation through target-binding molecules. VISION tested PSMA-targeted treatment added to protocol-permitted standard care in selected, previously treated metastatic castration-resistant prostate cancer. NETTER-1 tested lutetium-177-dotatate in progressive, somatostatin-receptor-positive midgut neuroendocrine tumors. Their clinical results belong to those populations and products, rather than every tumor expressing the target. Small molecules, peptides and antibodies have different distribution and clearance even when directed at a shared target.",
    principle: "Where the complete radioactive product travels, how long it remains and which emissions reach tissue jointly determine radiation delivery.",
    strengths: ["Targeted delivery of radiation through an accessible molecular feature","Emitted particles can reach neighboring cells"],
    limitations: ["Kidney, marrow and other normal-tissue exposure can limit treatment","A positive scan alone does not establish absorbed dose or clinical benefit","Results from one radionuclide or carrier do not establish equivalence of another"],
    technologies: ["psma-pet", "spect", "targeted-alpha-therapy"],
    targets: ["psma", "sstr2", "fap"],
    drugs: ["pluvicto", "lutathera"],
    cancers: ["prostate", "neuroendocrine"], companies: ["clarity-pharmaceuticals", "abdera-therapeutics", "alpha-9-oncology", "ariceum-therapeutics", "artbio", "atomic-alchemy", "evergreen-theragnostics", "mariana-oncology", "nucleus-radiopharma", "point-biopharma", "precirix", "radionetics-oncology", "ratio-therapeutics", "relit-biosciences", "monopar", "actithera", "blue-earth-therapeutics", "radiomer-therapeutics", "nuclide-therapeutics", "skopos-bio", "chengdu-new-radiomedicine-technology", "curasight", "antelope-surgical-solutions", "peptidream", "full-life-technologies", "lumina-pharmaceuticals", "pentixapharm", "nuclidium", "matrisome-bio"], links: [{"label":"FDA: nonclinical development of oncology therapeutic radiopharmaceuticals (2019)","url":"https://www.fda.gov/media/129547/download"},{"label":"MIRD pamphlet 22: alpha-particle radiobiology and dosimetry (2010)","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC5680544/"},{"label":"EPA: activity, absorbed dose and their units","url":"https://www.epa.gov/radiation/radiation-terms-and-units"},{"label":"Sartor et al.: VISION, primary randomized trial report (2021)","url":"https://pubmed.ncbi.nlm.nih.gov/34161051/"},{"label":"Strosberg et al.: NETTER-1, primary randomized trial report (2017)","url":"https://pubmed.ncbi.nlm.nih.gov/28076709/"},
{
  "label": "Sgouros et al.: radiopharmaceutical properties and approximate-range table (2020 review)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/32728208/"
}
], journals: ["cancer-biotherapy-and-radiopharmaceuticals"],
  },
  {
    id: "targeted-alpha-therapy", trials: ["nct05720130"], dependsOn: ["therapy-isotope-supply-chain", "radiopharmacy-network", "radioligand-dosimetry"], related: ["astatine-211-alpha-therapy"], kind: "technology", name: "Targeted alpha therapy", sections: ["radiopharma"], status: "phase-3", asOf, wikipedia: W("Targeted_alpha-particle_therapy"),
    tldr: "Like radioligand therapy but with alpha particles: far more destructive over a much shorter range, so single cells can be killed with less collateral damage.",
    summary: "Actinium-225 and lead-212 agents (225Ac-PSMA-617, 225Ac-DOTATATE/RYZ101, 212Pb-DOTAMTATE/AlphaMedix, 225Ac-FAP) are in phase 3. Radium-223 (Xofigo) is the only approved alpha emitter, for bone metastases. Isotope supply (TerraPower, Orano, ITM) is the binding constraint. Alpha therapy after beta failure produces responses in PSMA-refractory disease.",
    principle: "Alpha particles (4-9 MeV, <100 µm range) cause clustered double-strand breaks independent of oxygen and cell cycle.",
    strengths: ["Overcomes beta resistance", "Kills micrometastases with minimal crossfire"],
    limitations: ["Ac-225 supply", "Daughter-nuclide redistribution (salivary, renal toxicity)", "Dosimetry difficult"],
    technologies: ["radioligand-therapy"],
    targets: ["psma", "sstr2", "fap"],
    companies: ["terrapower-isotopes", "orano-med", "itm", "rayzebio", "fusion-pharma", "abdera-therapeutics", "actinium-pharmaceuticals", "alpha-9-oncology", "ariceum-therapeutics", "artbio", "convergent-therapeutics", "ratio-therapeutics", "pantera", "blue-earth-therapeutics", "peptidream", "full-life-technologies", "c-ray-therapeutics"],
    tags: ["frontier"], links: [{ label: "Wikipedia", url: W("Targeted_alpha-particle_therapy") }],
  },
  {
    notes:["Crossfire means radiation from one location reaching nearby cells. It is distinct from a diffusible chemical payload and does not require the same release chemistry. Neither crossfire nor an immune-effect hypothesis establishes clinical benefit after ADC resistance."],
    id: "radioimmunotherapy", dependsOn: ["monoclonal-antibody", "therapy-isotope-supply-chain"], kind: "technology", name: "Radio-antibody & radio-ADC", sections: ["radiopharma", "adcs"], status: "phase-2", asOf:"2026-11-08", wikipedia: W("Radioimmunotherapy"),
    tldr: "Radioimmunotherapy uses an antibody or antibody fragment to carry a radionuclide. Its radiation delivery and safety depend on the complete labeled product.",
    summary: "An antibody provides recognition while the radionuclide provides radiation. This differs from releasing a small-molecule cytotoxic drug after intracellular processing. Attachment chemistry depends on the isotope and product; a chelator is not required for every radionuclide. In a historical phase 2 study, lutetium-177-J591 targeted PSMA in men with metastatic castration-resistant prostate cancer and produced substantial hematologic toxicity. That disease-specific experience does not establish current approval, breast-cancer efficacy or the suitability of every ADC antigen for radioimmunotherapy.",
    principle: "The labeled antibody’s distribution and retention, radionuclide emissions and tissue geometry determine where radiation is deposited.",
    strengths: ["Can deliver radiation with an antibody recognition route","Particles can reach cells beyond the bound target cell"],
    limitations: ["Circulating and normal-organ radioactivity can cause toxicity","Target expression alone does not establish sufficient tumor dose","Antibody and small-ligand kinetics are not interchangeable"],
    technologies: ["adc", "targeted-alpha-therapy"],
    targets: ["psma", "cd33", "dll3", "her2"],
    tags: ["frontier"], related: ["idea-alpha-after-adc"], links: [{"label":"FDA: nonclinical development of oncology therapeutic radiopharmaceuticals (2019)","url":"https://www.fda.gov/media/129547/download"},{"label":"MIRD pamphlet 22: alpha-particle radiobiology and dosimetry (2010)","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC5680544/"},{"label":"Tagawa et al.: lutetium-177-J591 phase 2 study in metastatic castration-resistant prostate cancer (2013)","url":"https://pubmed.ncbi.nlm.nih.gov/23714732/"}], journals: ["cancer-biotherapy-and-radiopharmaceuticals"], companies: ["abdera-therapeutics", "actinium-pharmaceuticals", "convergent-therapeutics", "tagworks-pharmaceuticals"],
  },
  {
    id: "bnct", machineFamily: "particle", trials: ["nct07795034"], kind: "technology", name: "Boron neutron capture therapy", sections: ["radiation"], status: "approved", asOf, wikipedia: W("Neutron_capture_therapy_of_cancer"),
    tldr: "In boron neutron capture therapy a boron drug accumulates in tumour cells, then a neutron beam makes only those cells explode from inside.",
    summary: "Boron neutron capture therapy relies on a boron drug that accumulates in tumour cells: 10B captures thermal neutrons and fissions into alpha and lithium particles with a range of about 10 micrometres, so the damage is confined to the cell that took up the boron. It is approved in Japan (2020) for recurrent head and neck cancer using accelerator-based neutron sources (Sumitomo) and borofalan (10B). Trials extend to glioma and melanoma. The selectivity is cellular-level in principle, but in practice the boron delivery agent limits tumour selectivity, and very few facilities exist. The simple version is that a boron drug marks the tumour cells and a neutron beam then makes only those cells explode from inside.",
    principle: "10B captures thermal neutrons and fissions into alpha and lithium particles with ~10 µm range.",
    strengths: ["Cellular-level selectivity"],
    limitations: ["Boron delivery agent limits tumour selectivity", "Few facilities"],
    cancers: ["head-and-neck", "glioblastoma"], links: [{ label: "Wikipedia", url: W("Neutron_capture_therapy_of_cancer") }],
  },

  // ======================= CHEMOTHERAPY =======================
  {
    id: "cytotoxic-chemotherapy", drugs: ["raltitrexed", "vindesine", "alitretinoin", "estramustine", "floxuridine", "streptozocin", "teniposide", "altretamine", "plicamycin", "amsacrine", "uracil-mustard", "mitobronitol", "pipobroman", "doxifluridine", "plitidepsin"], kind: "technology", name: "Cytotoxic chemotherapy", sections: ["chemotherapy"], status: "standard-of-care", asOf: "2026-11-11", since: 1946, wikipedia: W("Chemotherapy"),
    tldr: "Cytotoxic chemotherapy can kill cancer cells or stop their growth by disturbing cell processes. Healthy cells can be affected too, and each drug and regimen needs its own evidence.",
    summary: "Cytotoxic chemotherapy includes medicines acting on DNA attachments and topoisomerase complexes, nucleotide metabolism and RNA, or microtubule dynamics. It is broader than damaging the DNA of rapidly dividing cells. Tumour response depends on the medicine, its exposure and the cell response; a molecular disturbance does not by itself establish completed cell death.\n\nThese medicines can be used to cure some cancers, reduce recurrence risk, control disease or ease symptoms. The named regimen and clinical setting determine the evidence. The glossary explains the mechanism families and how to distinguish a laboratory growth effect from killing or clinical benefit.",
    principle: "A defined drug exposure can disturb DNA, RNA, metabolism or microtubules; subsequent growth arrest, recovery or death depends on the drug and biological setting.",
    strengths: [
  "Clinical evidence supports curative, recurrence-reducing or symptom-relieving regimens in specified settings"
],
    limitations: [
  "Healthy-tissue effects and tolerated exposure differ by medicine and regimen",
  "Delivery, activation, transport and cell response can affect activity"
],
    terms: ["efflux-pump"], companies: ["lupin", "intas", "shasqi", "telik", "vion-pharmaceuticals", "filamon", "quetzal-therapeutics", "thena-biotech", "fulgent-genetics", "inhatarget-therapeutics", "bryet", "crism-therapeutics", "panther-therapeutics"], trials: ["euramos-1", "gefitinib-chemo-tmh"], related: ["genomic-assay-to-chemo-omission", "body-surface-area-dosing", "log-kill-hypothesis"], links: [...([{ label: "Wikipedia", url: W("Chemotherapy") }]), ...[
  {
    "label": "NCI: chemotherapy uses, cycles and adverse effects",
    "url": "https://www.cancer.gov/about-cancer/treatment/types/chemotherapy"
  },
  {
    "label": "Paclitaxel label: interphase and mitotic microtubule functions",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=15ca4829-8fee-45f9-b4bc-b31c15732cd6"
  },
  {
    "label": "Fluorouracil label: nucleotide and RNA effects",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b268684b-487f-4716-a2e8-6e6d3e117b14"
  }
]], journals: ["cancer-chemotherapy-and-pharmacology", "gan-to-kagaku-ryoho"],
  },
  {
    id: "platinum", kind: "technology", name: "Platinum agents", sections: ["chemotherapy"], status: "standard-of-care", asOf: "2026-11-11", wikipedia: W("Platinum-based_antineoplastic"),
    tldr: "Platinum medicines can attach to DNA and link sites together. The resulting injury, healthy-tissue effects and treatment benefit depend on the drug, exposure and cancer setting.",
    summary: "Cisplatin, carboplatin and oxaliplatin are metal-containing medicines. Platinum can coordinate to DNA bases, forming attachments called adducts, including links within one strand or between strands. An experiment with one product does not establish the lesion mixture or formation rate for every platinum medicine. They are sometimes grouped as alkylating-like medicines, but platinum coordination is different from transferring a carbon-containing alkyl group.\n\nDNA attachments can disturb DNA function and lead to further damage, yet they do not by themselves establish apoptosis or clinical sensitivity. Uptake, removal, repair and cell survival mechanisms matter. A historical repair scar or the name of a repair gene cannot alone establish present response to a particular platinum regimen.",
    principle: "Platinum coordination to DNA bases can form adducts and cross-links; downstream injury and response depend on exposure and cellular handling.",
    strengths: [
  "Clinical activity is established for specified platinum medicines and regimens"
],
    limitations: [
  "Kidney, hearing, nerve and blood-cell effects differ by product and regimen",
  "A repair biomarker or DNA-adduct measurement alone does not establish treatment benefit"
],
    targets: ["brca"],
    cancers: ["tnbc", "ovarian", "nsclc", "urothelial", "head-and-neck"], related: ["platinum-plus-hrd"], links: [...([{ label: "Wikipedia", url: W("Platinum-based_antineoplastic") }]), ...[
  {
    "label": "Kohn, Drugs Against Cancer chapter 3: platinum coordination",
    "url": "https://discover.nci.nih.gov/kohn/book/drugs_against_cancer_chapter3_v221004be3.pdf"
  },
  {
    "label": "Coste et al., defined cisplatin interstrand DNA cross-link structure (1999)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/10101191/"
  },
  {
    "label": "Huang et al., cisplatin interstrand cross-link structure (1995)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/8525382/"
  },
  {
    "label": "Calvert et al., renal-function-based carboplatin dosage (1989)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/2681557/"
  }
]],

"notes": [
  "A single-base attachment, a link between bases on the same strand and a link between opposite strands are different from a double-strand break. The first three attach to bases while the sugar-phosphate backbones remain continuous; the last severs both backbones. G denotes guanine and C denotes cytosine in the schematic DNA. The paired platinum drawings omit ligands and atomic geometry and do not show lesion proportions. Structural studies of defined cisplatin interstrand cross-links support base connectivity in selected DNA sequences, not every product’s mixture or a patient response.",
  "Calvert and colleagues developed a renal-function-based carboplatin dosing approach in adults. Target exposure, the area under the concentration-time curve, can be expressed in mg·min/mL; the administered amount is in milligrams. Kidney function enters that calculation. Neither those units nor the original study supply one target for every combination or justify exchanging cisplatin and carboplatin dose for dose. Their efficacy and adverse-effect evidence belongs to the actual product and regimen.",
  "In a fictional experiment, more platinum-DNA adducts after treatment show more measured attachments under that assay’s conditions. They do not prove that cells died, that recovery failed, or that treatment benefits a person. Check the active species, exposure, sampling time, repair and survival readouts, and then the clinical comparison. This is a reading rule, not a diagnostic cutoff."
]
},
  {
    id: "topoisomerase-inhibitors", kind: "technology", name: "Topoisomerase-I inhibitors (and ADC payloads)", sections: ["chemotherapy", "adcs"], status: "standard-of-care", asOf: "2026-11-11", wikipedia: W("Topoisomerase_inhibitor"),
    tldr: "These medicines can trap an enzyme on DNA while it is making a temporary cut. This can cause further damage during copying, but the exact drug, exposure and cell response determine what follows.",
    summary: "Camptothecin-class topoisomerase I poisons stabilise an enzyme-DNA cleavage complex and slow resealing of a temporary single-strand nick. A replication fork encountering the trapped complex can create a double-strand break. This is different from simply removing topoisomerase I or treating every inhibitor as an identical chemical.\n\nIrinotecan is converted to SN-38; topotecan is administered as an active drug. SN-38, exatecan and DXd are distinct chemicals, and deruxtecan refers to a linker-payload component. Conjugates carrying related TOP1 cargoes can differ in targeting, loading, release, exposure, resistance and harms. A shared mechanism does not establish family-wide permeability, a safety advantage or benefit after another conjugate.",
    principle: "Camptothecin-class poisons stabilise TOP1-DNA cleavage complexes; replication-associated injury and cell response determine subsequent recovery or death.",
    strengths: [
  "Some TOP1-carrying conjugates have clinical evidence and approvals in specified disease and prior-treatment settings"
],
    limitations: [
  "TOP1 mutations, transport and cell-response mechanisms can affect different products differently",
  "Lung injury, neutropenia and diarrhoea warnings are product- and population-specific"
],
    technologies: ["adc"],
    terms: ["payload", "bystander-effect"], links: [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Topoisomerase_inhibitor"
  },
  {
    "label": "Pommier, camptothecin-class TOP1 poisons (2006)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/16990856/"
  },
  {
    "label": "Pommier et al., topoisomerase poisoning (2010)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/20534341/"
  },
  {
    "label": "Murai et al., SLFN11 and ATR-independent stressed-fork responses (2018)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29395061/"
  },
  {
    "label": "Zoppoli et al., SLFN11 and several DNA-damaging drug classes (2012)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22927417/"
  },
  {
    "label": "Abelman et al., selected TOP1 mutations and conjugate resistance (2025)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/39745368/"
  },
  {
    "label": "Innocenti et al., UGT1A1 and irinotecan neutropenia (2004)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/15007088/"
  },
  {
    "label": "Sacituzumab govitecan label: UGT1A1 and adverse effects",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=57a597d2-03f0-472e-b148-016d7169169d"
  },
  {
    "label": "Trastuzumab deruxtecan label: lung warning",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6"
  },
  {
    "label": "Datopotamab deruxtecan label: lung warning",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2950227c-6230-4ca4-a135-46e44d9424a0"
  },
  {
    "label": "Weng et al., exatecan-conjugate combination models (2023)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/36693125/"
  },
  {
    "label": "Cole et al., paediatric adavosertib-irinotecan phase 1 trial (2020)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31857431/"
  }
], companies: ["dantari", "pheon-therapeutics", "profoundbio", "sunesis", "crescent-biopharma", "kivu-bioscience", "fulgent-genetics", "crism-therapeutics"],

"notes": [
  "ATR checkpoint activity, homologous-recombination repair and SLFN11-associated replication responses are mechanisms studied after TOP1 damage. They are not mutually exclusive branches that guarantee survival or death. Murai’s experiments found that SLFN11 could block stressed replication forks independently of ATR. Zoppoli compared gene expression with four TOP1 inhibitors across the NCI-60 panel and used siRNA silencing to test the cell-death and cell-cycle response. That work also linked SLFN11 to response to other DNA-damaging drug categories, including TOP2 poisons, alkylators and DNA-synthesis inhibitors, so switching away from TOP1 does not automatically bypass this dependency. Specific response-pathway combinations need their own evidence: Weng tested PARP and ATR combinations with exatecan conjugates in preclinical models, while Cole’s phase 1 study tested the WEE1 inhibitor adavosertib with irinotecan in children and adolescents with relapsed solid or central-nervous-system tumours. Those studies do not establish an adult breast-cancer treatment rule.",
  "Abelman and colleagues reported TOP1 mutations at progression in 4 of 31 people with metastatic breast cancer treated with a TOP1 conjugate, compared with 3 of 420 people without prior conjugate exposure. The observed variants were S57C, R364H, W401C and G359E. Three mutant proteins tested in their laboratory had reduced enzymatic activity and covalent DNA binding and resisted SN-38 and DXd. These selected cohort and functional results do not establish that any TOP1 sequence change predicts the same response, that all later conjugates fail, or that a redesigned cargo covers every mutant.",
  "Host drug handling is a separate question. In Innocenti’s 66-person irinotecan study using 350 mg/m² every three weeks, cycle-one grade 4 neutropenia occurred in 3 of 6 people homozygous for the reduced-function promoter allele and in 0 of 29 with the reference genotype; this was one irinotecan regimen. The current sacituzumab govitecan label reports grade 3 or 4 neutropenia in 57% of 138 UGT1A1*28 homozygotes, 48% of 531 heterozygotes and 41% of 533 reference homozygotes, among 1,202 genotyped recipients. These denominators and products cannot be exchanged, and genotype is not a tumour-response test.",
  "The current trastuzumab deruxtecan label has a boxed interstitial-lung-disease warning; datopotamab deruxtecan has an interstitial-lung-disease warning outside its box. Sacituzumab govitecan’s different warning structure does not establish a comparative lung-injury rate. Compare product, disease population, exposure, adverse-event definition and follow-up before comparing percentages; a TOP1 mechanism alone supplies none of them.",
  "For an experimental claim, name the exact free or released drug, concentration range and duration, then distinguish cell survival, regrowth, TOP1 expression or sequence, DNA-damage markers such as gamma-H2AX, SLFN11 and efflux measurements. A damage marker is not completed death, a protein level is not a cleavage-complex assay, and an exploratory association is not a validated clinical selection rule. TOP2 poisons stabilise a different enzyme’s double-strand-cut intermediate; the enzyme names alone do not select a subsequent medicine."
]
},
  {
    id: "hipec", machineFamily: "ablation", kind: "technology", name: "HIPEC / PIPAC (intraperitoneal chemotherapy)", sections: ["chemotherapy", "surgery"], status: "established", asOf, wikipedia: W("Hyperthermic_intraperitoneal_chemotherapy"),
    tldr: "Washing the abdominal cavity with heated chemotherapy during surgery to kill microscopic peritoneal deposits.",
    summary: "HIPEC exposes the peritoneal cavity directly to chemotherapy heated to 41-43 °C during cytoreductive surgery, achieving high local drug concentration and enhanced penetration into microscopic deposits. A survival benefit was shown in ovarian cancer at interval debulking (OVHIPEC-1) and in pseudomyxoma, but the result was negative in colorectal cancer (PRODIGE 7 for oxaliplatin HIPEC), so the evidence is mixed and indication-specific. PIPAC, pressurised intraperitoneal aerosol chemotherapy, is a palliative laparoscopic alternative for patients who are not candidates for full cytoreduction. Morbidity is substantial and outcomes depend on centre expertise. The simple version is a heated chemotherapy wash of the abdomen during surgery, which helps in some cancers and not others.",
    principle: "Direct peritoneal exposure at 41-43 °C enhances drug penetration.",
    strengths: ["High local concentration"],
    limitations: ["Morbidity, centre expertise", "Mixed trial results"],
    cancers: ["ovarian", "colorectal", "gastric", "peritoneal-mesothelioma"], links: [{ label: "Wikipedia", url: W("Hyperthermic_intraperitoneal_chemotherapy") }],
  },

  // ======================= TARGETED THERAPY =======================
  {
    id: "kinase-inhibitors", drugs: ["fostamatinib", "olmutinib"], related: ["gamma-secretase-inhibitors", "hedgehog-inhibitors", "her2-tyrosine-kinase-inhibitors", "pi3k-akt-mtor-inhibitors"], kind: "technology", name: "Small-molecule kinase inhibitors", sections: ["targeted-therapy"], status: "standard-of-care", asOf, since: 2001, wikipedia: W("Tyrosine_kinase_inhibitor"),
    tldr: "Pills that block the specific enzyme a cancer relies on. Imatinib in 2001 proved a cancer could be switched off by design.",
    summary: "Over 80 approved kinase inhibitors: EGFR (osimertinib), ALK (lorlatinib), BRAF/MEK, KRAS G12C, RET, NTRK, MET, FGFR, BTK, JAK, CDK4/6, PI3K/AKT, VEGFR, FLT3, KIT. Resistance through gatekeeper mutations, bypass pathways, and lineage change drives successive generations. Allosteric, covalent, and macrocyclic designs extend the reach.",
    principle: "ATP-competitive or allosteric binding to the kinase domain blocks phosphotransfer.",
    strengths: ["Oral, outpatient", "Dramatic responses in oncogene-addicted cancers"],
    limitations: ["Near-universal resistance in metastatic disease", "Off-target toxicities"],
    targets: ["egfr", "alk", "braf", "kras", "ret", "ntrk", "met", "fgfr2", "kit", "flt3", "cdk4-6", "pik3ca", "akt"],
    terms: ["oncogene-addiction", "resistance", "small-molecule"], trials: ["gefitinib-chemo-tmh"], links: [{ label: "Wikipedia", url: W("Tyrosine_kinase_inhibitor") }], companies: ["acrivon-therapeutics", "alixia", "altay-therapeutics", "blueprint-medicines", "cogent-biosciences", "enliven-therapeutics", "erasca", "fidocure", "harmonic-discovery", "ideaya-biosciences", "nested-therapeutics", "oric-pharmaceuticals", "prelude-therapeutics", "relay-therapeutics", "reverie-labs", "scorpion-therapeutics", "tyra-biosciences", "velorum-therapeutics", "zentalis-pharmaceuticals", "basilea", "denovo-biopharma", "arog-pharmaceuticals", "cyclacel", "edgewood-oncology", "kymathera", "antares-therapeutics", "alaw-therapeutics", "blossomhill-therapeutics", "voronoi", "accsalus-biosciences", "eilean-therapeutics", "pasithea-therapeutics", "technogenesys", "lomond-therapeutics", "mekanistic-therapeutics", "nobo-medicine", "oncodesign-precision-medicine"],
  },
  {
    notes:["FDA Q6B separates protein quantity, biological activity and quality characterization. Identity, purity, aggregation, heterogeneity and stability tests address different attributes. A potency result needs a defined assay and reference; protein mass alone does not measure the same quantity. These manufacturing measurements do not replace clinical evidence."],
    id: "monoclonal-antibody", trials: ["notable-trial"], dependsOn: ["monoclonal-antibody-manufacturing"], related: ["cd40-agonists", "cd47-blockade"], kind: "technology", name: "Monoclonal antibodies", sections: ["targeted-therapy", "immunotherapy"], status: "standard-of-care", asOf:"2026-11-08", since: 1997, wikipedia: W("Monoclonal_antibody_therapy"),
    tldr: "A monoclonal antibody is a manufactured protein with a defined recognition design. Its other functional parts and the target biology determine what follows binding.",
    summary: "Monoclonal does not by itself mean patient-specific or physically identical molecules in every detail. A therapeutic preparation can contain characterized molecular variants, including different sugar modifications. Recognition can be used to block an interaction, recruit immune effectors, carry a drug or radionuclide, or bridge cells, depending on the complete product. A shared target name does not establish the same epitope or action. Binding, functional activity, exposure and clinical benefit answer different questions.",
    principle: "A defined recognition region makes contact; the assembled product and biological setting determine the tested effect.",
    strengths: ["Defined molecular recognition can support different therapeutic mechanisms"],
    limitations: ["Healthy tissue can share the recognized target","Human or humanized sequence does not establish freedom from adverse effects","Identity or binding alone does not establish potency or clinical benefit"],
    terms: ["adcc", "fc-effector"], companies: ["morphosys", "alentis-therapeutics", "bicara-therapeutics", "bighat-biosciences", "inhibrx", "ose-immunotherapeutics", "tradewind-bioscience", "peregrine-avid", "stipple-bio", "ottimo-pharma", "novelty-nobility", "damora-therapeutics", "mabquest", "chiome-bioscience", "ascendo-biotechnology", "epsilogen", "allterum-therapeutics", "domain-therapeutics", "pheast-therapeutics", "zumutor-biologics", "biotroy-therapeutics", "biond-biologics", "solstice-oncology", "immunoah", "pilatus-biosciences", "solu-therapeutics", "abcellera"], links: [{"label":"NCI: monoclonal antibodies and distinct immune actions","url":"https://www.cancer.gov/about-cancer/treatment/types/immunotherapy/monoclonal-antibodies"},{"label":"FDA Q6B: characterization, molecular heterogeneity and biological activity","url":"https://www.fda.gov/media/71510/download"},{"label":"Li et al.: one recognition format can alter trafficking and activity in models (2016)","url":"https://pubmed.ncbi.nlm.nih.gov/26766593/"}],
  },
  {
    notes:["Specificity counts what is recognized; valency counts binding sites. Two different epitopes on the same antigen can provide two specificities. Added sites do not necessarily add a new specificity, and one molecule is different from separately dosed antibodies.","FDA guidance distinguishes products that bridge two cells from products whose functions do not require that bridge. Some mechanisms require both target interactions at the same time; others do not. Do not assume that every bispecific recruits T cells or that every target pair acts as an AND gate.","The manufacturing evaluation includes molecular identity, correct pairing, aggregation, fragments, stability and biological potency. Affinity, binding kinetics, avidity, target distribution and exposure belong to the actual format. Two successful binding assays do not by themselves demonstrate the intended combined function."],
    id: "bispecific-antibody", dependsOn: ["monoclonal-antibody-manufacturing"], related: ["trispecific-antibodies"], kind: "technology", name: "Bispecific antibodies", sections: ["targeted-therapy", "immunotherapy"], status: "approved", asOf:"2026-11-08",  wikipedia: W("Bispecific_monoclonal_antibody"),
    tldr: "A bispecific antibody has two binding specificities. They can recognize different antigens or different parts of one antigen; the finished molecule can have more than two binding sites.",
    summary: "Bispecific describes recognition, rather than one required shape or biological action. Some molecules bridge a target cell to an immune effector. Others engage two targets or two epitopes without bridging two cells. Antibody fragments, IgG-based structures and added binding domains can arrange these specificities differently. A T-cell engager is one functional use; a conjugated payload is another product feature.\n\nTwo specificities do not establish that both targets are reached together, that binding produces killing, or that a molecule improves on a comparison treatment. Function, exposure, manufacturing quality and harms need evidence for the actual product and indication. A class containing approved drugs does not make every bispecific design an approved therapy.",
    principle: "Describe each recognition site, its epitope and copy number, then test whether simultaneous binding is needed for the intended effect in the relevant biological setting.",
    strengths: ["Can place two recognition functions within a defined molecule","Different formats can be tested for a particular intended mechanism"],
    limitations: ["Binding-site geometry and exposure can change function","Healthy tissues can carry either recognized target","Additional specificities do not establish greater benefit or freedom from harm"],
    technologies: ["t-cell-engager", "bispecific-adc"],
    drugs: ["amivantamab", "zanidatamab", "zenocutuzumab", "ivonescimab"], companies: ["xencor", "amunix-pharmaceuticals", "bicara-therapeutics", "compass-therapeutics", "cullinan-therapeutics", "igm-biosciences", "janux-therapeutics", "marengo-therapeutics", "xilio-therapeutics", "ranata-therapeutics", "harbour-biomed", "third-arc-bio", "indupro-therapeutics", "ottimo-pharma", "crescent-biopharma", "clasp-therapeutics", "epibiologics", "mestag-therapeutics", "juri-biosciences", "ltz-therapeutics", "cartography-biosciences", "cdr-life", "instil-bio", "duboce-biopharmaceuticals", "hemogenyx-pharmaceuticals", "rondo-therapeutics", "immunoah", "normunity"], links: [{"label":"FDA: Bispecific Antibody Development Programs guidance (2021), definitions, format, function and quality considerations","url":"https://www.fda.gov/media/123313/download"}],
  },
  {
    id: "parp-inhibitor", companies: ["synnovation-therapeutics", "scibrunch-therapeutics", "acerand-therapeutics", "moma-therapeutics", "duke-street-bio"], kind: "technology", name: "PARP inhibitors", sections: ["targeted-therapy"], status: "approved", asOf: "2026-11-12", since: 2014, wikipedia: W("PARP_inhibitor"),
    tldr: "These medicines disrupt DNA repair processes. Some also retain repair proteins on DNA; a repair-gene finding alone does not establish that they will help.",
    summary: "PARP inhibitors reduce PARP enzyme activity and can stabilise PARP complexes on damaged DNA. Catalytic output, DNA-associated occupancy, repair capacity and cell survival are different measurements. Experimental sensitivity depends on the current cellular repair state, and repair-restoring changes can contribute to resistance. Clinical eligibility depends on the particular medicine, cancer setting, previous treatment and required companion test; a shared mechanism is not a shared indication.",
    principle: "Catalytic inhibition reduces PAR signalling; some inhibitors also stabilise DNA-associated PARP complexes. Protein obstacles and replication gaps are studied mechanisms, with effects dependent on repair state, exposure and the experimental or clinical setting.",
    strengths: ["Oral medicines with defined, setting-specific approved uses","Catalytic and DNA-retention effects can be studied separately"],
    limitations: ["Blood-cell toxicity and other harms depend on product and exposure","Repair-restoring changes can contribute to resistance","Laboratory trapping potency does not rank clinical benefit"],
    targets: ["parp", "brca"],
    terms: ["synthetic-lethality"],
    drugs: ["olaparib", "niraparib", "talazoparib"],
    cancers: ["ovarian", "tnbc", "breast-hr-positive", "prostate", "pancreatic"], links: [{ label: "Wikipedia", url: W("PARP_inhibitor") },
    {"label":"Farmer et al.: PARP inhibition in BRCA-deficient experimental systems (2005)","url":"https://pubmed.ncbi.nlm.nih.gov/15829967/"},
    {"label":"Murai et al.: differential PARP trapping by inhibitors (2012)","url":"https://pubmed.ncbi.nlm.nih.gov/23118055/"},
    {"label":"Murai et al.: BMN673/talazoparib trapping comparisons (2014)","url":"https://pubmed.ncbi.nlm.nih.gov/24356813/"},
    {"label":"Cong et al.: replication gaps in PARP-inhibitor model sensitivity (2021)","url":"https://pubmed.ncbi.nlm.nih.gov/34216544/"},
    {"label":"Waks et al.: repair restoration in selected resistant breast cancers (2020)","url":"https://pubmed.ncbi.nlm.nih.gov/32245699/"},
    {"label":"NCI: validated PAR pharmacodynamic assay","url":"https://dctd.cancer.gov/drug-discovery-development/assays/pharmacodynamic-biomarker-assays/additional"},
    {"label":"Lynparza U.S. prescribing information: July 2025 effective version","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=741ff3e3-dc1a-45a6-84e5-2481b27131aa"}
  ],

  notes: [
    "PARP means poly(ADP-ribose) polymerase, a protein family involved in cellular signalling and repair. PARP1 is one representative. At damaged DNA it can build signals on proteins from chains of the chemical unit ADP-ribose, called poly(ADP-ribose), or PAR. Catalytic inhibition reduces this output. Some inhibitors can also stabilise DNA-associated PARP complexes, often called trapping. A repair-worker analogy separates a reduced call for help from a worker remaining in a doorway; proteins and medicines have no purpose, and the cell has more than one response route.",
    "Murai 2012 compared niraparib, olaparib and veliparib in defined cellular and biochemical systems: niraparib and olaparib trapped PARP-DNA complexes more strongly than veliparib, despite catalytic inhibition being a different comparison. Murai 2014 compared BMN673, now talazoparib, with olaparib and rucaparib. In damaged-DNA cell assays, 0.1 micromolar BMN673 produced a trapping signal comparable to 10 micromolar olaparib, about a 100-fold concentration difference; the purified DNA-binding assay gave a different, roughly 40-fold comparison. Similar catalytic effects did not imply similar trapping. Strongest among compounds tested in 2014 is not a ranking of clinical benefit, tolerated exposure or personal treatment choices.",
    "A DNA-associated protein obstacle can challenge copying without every encounter becoming a measured collision, double-strand break or cell death. Farmer 2005 demonstrated increased sensitivity to PARP inhibition in experimental BRCA-deficient systems. Cong 2021 studied single-stranded replication gaps in cellular models: gap suppression tracked resistance or resensitisation, while restoring fork protection did not always restore resistance in the tested models. Obstacle and gap explanations can coexist, but their relative contribution in a patient's tumour is not established by these experiments. A repair-gene variant alone does not reproduce the functional losses tested in a synthetic-lethal experiment.",
    "Two schematic pictures ask different questions. Matched snapshots of DNA-bound PARP1 with a longer or shorter PAR chain illustrate catalytic output; a generic inhibitor in the catalytic pocket does not measure binding duration. A second picture places approaching copying machinery behind a retained PARP1 complex, with visible separation; it does not show an observed collision, literal backbone conformation or a measured effect size. Reduced catalytic activity and DNA retention can occur together. The arrows therefore lead to further context-dependent measurements, rather than two independent proofs of a clinical mechanism or a drug ranking.",
    "Enzyme assays and PAR immunoassays report catalytic activity or its product. NCI's PAR assay measures PAR levels in specified biospecimens; chromatin-associated PARP measurements instead investigate DNA retention under specified conditions. Repair readouts and survival/regrowth experiments add other information. Murai's experiments used defined cell lines, DNA damage and drug concentrations, so neither a reduced metabolic or ATP signal alone nor a picture establishes irreversible death or its cause. Matched genetic perturbations and appropriate controls are needed to distinguish reduced growth, reduced metabolism and loss of long-term survival.",
    "Waks's selected resistant breast cancer cohort illustrates why historical repair markers and current repair can diverge: four definite or putative BRCA reversion cases acquired RAD51 foci, and other proposed routes included 53BP1 loss and MRE11A amplification. The 53BP1-loss case lacked enough tissue for direct functional confirmation. A historical scar or sequence hypothesis cannot establish a present PARP vulnerability, and this small cohort does not supply an all-patient resistance rule. Biological plausibility, a qualifying label indication and a trial place are separate requirements.",
    "For example, the U.S. olaparib label effective July 2025 specifies adjuvant treatment of adults with deleterious or suspected-deleterious germline BRCA-mutated, HER2-negative high-risk early breast cancer after neoadjuvant or adjuvant chemotherapy, selected with an approved companion diagnostic. A tumour-only BRCA result or high scar score cannot replace the germline and disease-setting requirements. That indication does not establish that a different PARP inhibitor, a different setting or a plausible mechanism has the same approval or access conditions.",
    "In a fictional comparison, compounds A and B inhibit PARP catalytic activity similarly, but A retains more PARP on DNA in a culture assay. The conclusion is an assay-specific trapping difference. Useful exposure, survival, safety, resistance and clinical outcomes still need evidence. More trapping in that system does not establish a better treatment, and neither an old scar nor a repair-gene name identifies which effect matters in the current tumour."
  ],
  related: [
    "dna-damage-response-inhibitors"
  ]
},
  {
    id: "cdk46-inhibitor", companies: ["alaw-therapeutics"], keyPapers: ["paper-sherr-roberts-cdk-inhibitors-genesdev-1999"], kind: "technology", name: "CDK4/6 inhibitors", sections: ["targeted-therapy", "hormonal"], status: "approved", asOf: "2026-11-12", since: 2015, wikipedia: W("CDK_inhibitor"),
    tldr: "Pills that stop the cell-division engine, added to hormone therapy for the most common type of breast cancer.",
    summary: "Palbociclib, ribociclib, abemaciclib with endocrine therapy: PFS roughly doubled and, for ribociclib and abemaciclib, overall survival improved in advanced HR+/HER2- disease. Ribociclib (NATALEE) and abemaciclib (monarchE) are approved as adjuvant therapy for high-risk early disease. 2026: palbociclib approved as maintenance in HR+/HER2+ disease (PATINA).",
    principle: "Block RB phosphorylation, arresting cells in G1.",
    strengths: ["Oral, well tolerated", "Adjuvant survival benefit"],
    limitations: ["Neutropenia, diarrhoea (abemaciclib), QT (ribociclib)", "Resistance via RB loss, CDK2, cyclin E"],
    targets: ["cdk4-6", "estrogen-receptor"],
    drugs: ["palbociclib", "ribociclib", "abemaciclib"],
    cancers: ["breast-hr-positive"], related: [
  "oral-serd-plus-cdk46-after-esr1",
  "cdk46-plus-endocrine",
  "cdk-inhibitors"
], links: [{ label: "Wikipedia", url: W("CDK_inhibitor") }],
  },
  {
    id: "kras-inhibitors", kind: "technology", name: "KRAS & RAS inhibitors", sections: ["targeted-therapy"], status: "approved", asOf, since: 2021, wikipedia: W("KRAS"),
    tldr: "Drugs against the most common cancer gene, considered impossible to target until sotorasib in 2021.",
    summary: "Covalent G12C inhibitors (sotorasib, adagrasib, divarasib, olomorasib) work in NSCLC and, with cetuximab, in colorectal cancer. Non-covalent G12D inhibitors (zoldonrasib, MRTX1133) and pan-RAS(ON) tri-complex inhibitors (daraxonrasib RMC-6236, in phase 3 RASolute 302 in second-line pancreatic cancer) aim at pancreatic cancer, where KRAS is near-universal. Degraders and vaccines (ELI-002) follow.",
    principle: "Inhibitors bind covalently to the mutant cysteine in the switch-II pocket (G12C), or form a cyclophilin-A-mediated tri-complex that blocks effector binding (RAS(ON) inhibitors).",
    strengths: ["First drugs for a 40-year-old target"],
    limitations: ["Modest durability as monotherapy", "Adaptive RTK feedback requires combinations"],
    targets: ["kras", "egfr"],
    drugs: ["sotorasib", "adagrasib", "daraxonrasib"],
    cancers: ["nsclc", "colorectal", "pancreatic"],
    companies: ["amgen", "bms", "revolution-medicines", "bridgebio-oncology-therapeutics", "erasca", "kumquat-biosciences", "treeline-biosciences", "blossomhill-therapeutics", "scibrunch-therapeutics", "paq-therapeutics", "alterome-therapeutics"], links: [{ label: "Wikipedia", url: W("KRAS") }],
  },
  {
    id: "protac-degrader", kind: "technology", name: "PROTACs & molecular glues (targeted protein degradation)", sections: ["targeted-therapy"], status: "approved", asOf, since: 2026, wikipedia: W("Proteolysis_targeting_chimera"),
    tldr: "Instead of blocking a protein, these drugs tag it for the cell's own garbage disposal, removing it entirely.",
    summary: "Vepdegestrant (Veppanu, Arvinas/Pfizer), an oral ER PROTAC, became the first approved PROTAC in 2026 for ESR1-mutant HR+ breast cancer (VERITAC-2). Molecular glues (lenalidomide, pomalidomide, and next-generation CELMoDs iberdomide, mezigdomide) are established in myeloma. Degraders of AR, BTK, BCL6, KRAS, IKZF1/3, and the 'undruggable' transcription factors are in the clinic. Degrader-antibody conjugates deliver them selectively.",
    principle: "Bifunctional molecule recruits an E3 ubiquitin ligase (cereblon, VHL) to the target, causing ubiquitination and proteasomal destruction.",
    strengths: ["Event-driven (catalytic), removes scaffolding functions", "Reaches non-enzymatic targets"],
    limitations: ["Large molecules with poor oral bioavailability (PROTACs)", "Hook effect", "E3 ligase expression varies"],
    targets: ["estrogen-receptor", "androgen-receptor", "kras"],
    drugs: ["vepdegestrant"],
    companies: ["arvinas", "pfizer", "bms", "amphista-therapeutics", "boundless-bio", "captor-therapeutics", "cullgen", "firefly-bio", "foghorn-therapeutics", "neomorph", "orum-therapeutics", "photys-therapeutics", "plexium", "prelude-therapeutics", "proxygen", "treeline-biosciences", "triana-biomedicines", "breakthru-medicine", "parabilis-medicines", "epibiologics", "ubix-therapeutics", "paq-therapeutics", "larkspur-biosciences", "auron-therapeutics", "seed-therapeutics"],
    technologies: ["degrader-antibody-conjugate"], related: ["idea-senolytics-after-chemo", "stablix", "dt2216"], links: [{ label: "Wikipedia", url: W("Proteolysis_targeting_chimera") }],
  },
  {
    id: "antisense-sirna", companies: ["stitchpoint-bio", "isarna-therapeutics", "ionis"], kind: "technology", name: "Oligonucleotide therapeutics", sections: ["targeted-therapy"], status: "phase-2", asOf, wikipedia: W("Antisense_therapy"),
    tldr: "Oligonucleotide therapeutics are short synthetic strands of genetic code that silence a specific cancer gene.",
    summary: "Oligonucleotide therapeutics are short synthetic nucleic acid strands that base-pair to a target mRNA and induce RNase H cleavage (antisense) or RISC-mediated degradation (siRNA), silencing a gene at the transcript level. In principle any gene is targetable, including undruggable transcription factors. Antisense and siRNA drugs are established outside oncology; in cancer, delivery to tumours is the barrier, since existing chemistries concentrate in the liver. Antibody-oligonucleotide conjugates and lipid nanoparticle delivery are in early trials, with targets including KRAS, STAT3, and MYC. Whether enough drug can reach solid tumours to silence a driver is the open question. The simple version is a synthetic strand of genetic code that switches off one cancer gene, if it can be delivered.",
    principle: "Base-pairing to mRNA induces RNase H cleavage or RISC-mediated degradation.",
    strengths: ["Any gene is in principle targetable"],
    limitations: ["Delivery beyond liver"],
    tags: ["frontier"], links: [{ label: "Wikipedia", url: W("Antisense_therapy") }],
  },
  {
    id: "synthetic-lethality-approaches", trials: ["nct06395519"], kind: "technology", name: "Synthetic lethality approaches", sections: ["targeted-therapy", "drug-discovery"], status: "approved", asOf: "2026-11-11", wikipedia: W("Synthetic_lethality"),
    tldr: "Finding a second gene that a cancer needs only because its first gene is broken, then hitting the second one.",
    summary: "PARP inhibition in BRCA loss is the proven case. Next: PRMT5 inhibitors (MTAP-deleted tumours, ~15% of cancers; AMG 193, MRTX1719 in phase 2/3), WRN inhibitors (MSI-high), POLQ inhibitors (HRD), and WEE1/ATR in TP53-mutant and CCNE1-amplified tumours. CRISPR screens (DepMap) systematically map these dependencies.",
    principle: "Genetic interaction where loss of both genes, but neither alone, is lethal.",
    strengths: ["Targets tumour-suppressor loss, which conventional drugs cannot", "Large therapeutic window"],
    limitations: ["Context dependence; resistance via reversion"],
    targets: ["parp", "brca", "atr", "wee1", "tp53"],
    terms: ["synthetic-lethality"], links: [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Synthetic_lethality"
  },
  {
    "label": "Hay et al., normal Brca2-deficient intestinal epithelium deleted by PARP inhibition (2005)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/16287996/"
  }
], companies: ["amphista-therapeutics", "foghorn-therapeutics", "ideaya-biosciences", "nimbus-therapeutics", "plexium", "repare-therapeutics", "tango-therapeutics", "synnovation-therapeutics", "danatlas-pharmaceuticals", "avelos-therapeutics", "anticancer-bioscience", "accent-therapeutics", "moma-therapeutics", "858-therapeutics", "duke-street-bio", "fushi-biotechnology", "blacksmith-medicines"],

"notes": [
  "A wide therapeutic window is a design hope for each candidate pair, not a property shown for all of them: in mice, normal Brca2-deficient intestinal epithelium was highly sensitive to PARP inhibition (Hay et al.). A candidate needs lethality of the pair with each single loss tolerated, death shown by a validated assay and not only fewer cells, independent perturbations, and a rescue or restoration test, with the limits of each stated."
]
},
  {
    id: "antiangiogenic", related: ["angiogenesis-models", "tumour-mechanics-models"], kind: "technology", name: "Anti-angiogenic therapy", sections: ["targeted-therapy"], status: "standard-of-care", asOf, since: 2004, wikipedia: W("Angiogenesis_inhibitor"),
    tldr: "Anti-angiogenic therapy cuts off the tumour's blood supply; it is now mostly used to help immunotherapy work better.",
    summary: "Anti-angiogenic therapy blocks VEGF signalling, which normalises the tumour vasculature and reduces immunosuppressive myeloid cells rather than simply starving the tumour. The drugs include bevacizumab, ramucirumab, and VEGFR TKIs. Alone they extend PFS modestly, with a small single-agent benefit; with PD-1 blockade they are standard in RCC, HCC (atezolizumab-bevacizumab), and endometrial cancer (lenvatinib-pembrolizumab). PD-1×VEGF bispecifics are the consolidation of this idea into a single molecule. Hypertension, bleeding, and proteinuria are the class toxicities. The simple version is that these drugs cut off the tumour's blood supply, and their main modern role is helping immunotherapy work better.",
    principle: "Blockade of VEGF signalling normalises vasculature and reduces immunosuppressive myeloid cells.",
    strengths: ["Broad, combinable"],
    limitations: ["Hypertension, bleeding, proteinuria", "Small single-agent benefit"],
    targets: ["vegf"],
    cancers: ["rcc", "hcc", "colorectal", "endometrial"], links: [{ label: "Wikipedia", url: W("Angiogenesis_inhibitor") }], companies: ["compass-therapeutics"],
  },

  // ======================= ADC =======================
  {
    notes:["The treatment and diagnostic labels retain product-specific indications and testing requirements. A companion diagnostic validated for one drug or intended use is not automatically interchangeable with another. Keep the study population, comparator and prior exposure with any clinical result; a binding result or shared antigen name does not transfer benefit.",
"Follow the complete construct through separate measurements. Controlled binding to viable cells tests an accessible recognition feature; fixed-tissue staining alone does not. A trafficking assay must distinguish surface-bound from internal material. Measuring the relevant released payload or catabolite at its site of action tests a later step, and a payload-appropriate functional readout and survival over time answer further questions. A fluorescent antibody-associated tag can remain detectable without demonstrating that active drug reached that compartment. Keep assay sensitivity, time, concentration, cellular denominator and controls with each result; no one of these measurements establishes delivery throughout a tumour or clinical benefit.",
"In a fictional model, a tissue stain names protein M and controlled live-cell tests show antibody binding. Four proposed products still need different experiments: a blocking antibody needs a relevant signal and survival readout; a conjugate needs active-material delivery and a response to that material; an engager needs useful T cells, target-negative and no-T-cell controls, and completed target-cell killing; a radiolabelled product needs distribution over time and tumour and normal-organ dosimetry. The observed binding does not supply those unmeasured results. A model can also omit normal tissues, immune cells, spatial variation or clinically achievable exposure.",
"Choosing a surface address involves its measured amount, accessible normal-tissue distribution, behaviour with the actual format and variation within and between lesions. One positive core at one date cannot survey the whole tumour. A static receptor count and a manufactured loading ratio do not alone determine cumulative delivery across receptor turnover, repeated encounters and release over time. ADC uptake and processing are construct-specific; antibody retention can matter to radiation delivery, and engager contact geometry and useful effectors matter to immune recruitment. No universal antigen-density cutoff or low-density format ranking follows from a platform name. Damelin's 2015 survey found a broad range of normal- and tumour-tissue expression among the ADC targets studied and could not formalise optimal target parameters within that set. It does not show that useful target selection is impossible.",
"A change of format is a new product hypothesis. If an ADC binds M but yields little active material after uptake, an M-directed engager might avoid that particular processing requirement. It still needs its own binding and contact-geometry measurements, useful effector access and function, normal-tissue testing and clinical evidence. Earlier antibody or ADC tolerability does not establish the safety of a different action. Bystander delivery and two-address designs are possible responses to heterogeneous expression, not guaranteed coverage or an exhaustive list of solutions.",
"Compare requirements rather than rank formats. Trastuzumab can inhibit proliferation and recruit antibody-dependent cellular cytotoxicity; the related HER2 antibody in trastuzumab deruxtecan carries a TOP1-inhibitor payload. An ADC and a surface T-cell engager differ in processing versus productive contact with useful effectors. An engager recruits responders, whereas a CAR-T product supplies engineered living cells with their own survival, expansion and trafficking. A radioligand's carrier distribution and radiation deposition differ from chemical-payload delivery. Sharing an address does not equalise any of these actions, exposure histories or normal-tissue risks. With a clinical claim, record disease, biomarker definition, prior care, comparator, endpoint, follow-up and harms alongside the actual product; access or eligibility cannot supply an unmeasured efficacy comparison.",
"Four U.S. breast-cancer label examples separate address from payload: sacituzumab govitecan pairs TROP2 with SN-38, datopotamab deruxtecan pairs TROP2 with DXd, trastuzumab deruxtecan pairs HER2 with DXd, and trastuzumab emtansine pairs HER2 with DM1. SN-38 and DXd inhibit TOP1; DM1 acts on microtubules. Their indication and testing requirements differ, including the HER2-positive uses of T-DM1 and specified lower-expression uses of T-DXd. Changing the address or payload changes a design feature, not a measured probability of response. These examples are not an exhaustive U.S. or worldwide approval inventory."
],
    id: "adc", dependsOn: ["monoclonal-antibody", "adc-cdmo-manufacturing", "high-potency-payload-synthesis", "site-specific-conjugation", "sterile-fill-finish"], kind: "technology", name: "Antibody-drug conjugate (ADC)", sections: ["adcs"], status: "approved",  since: 2000, wikipedia: W("Antibody-drug_conjugate"),
    tldr: "An antibody-drug conjugate links a target-binding antibody to an active drug. Binding, delivery, release and drug action each matter, and normal tissues can also be exposed.",
    summary: "The antibody recognizes an accessible antigen; the attachment chemistry and linker affect stability and release; the payload acts through its own molecular mechanism. Cytotoxic examples include TOP1 inhibitors, tubulin inhibitors and DNA-damaging agents. Uptake and lysosomal processing are important for many constructs, while some linkers also release drug outside cells. A surface antigen can be a delivery address without being a driver the tumor depends on. The dose, mean loading, loading distribution, released species and exposure must be interpreted for the finished product. There is no universal fold improvement in the therapeutic window.",
    principle: "Binding can support delivery, but uptake, processing, access to the payload’s target and cellular response require separate evidence.",
    strengths: ["Can deliver an active drug through a selected molecular address","Some constructs kill neighboring target-negative cells in defined models"],
    limitations: ["Normal-tissue exposure and product-specific lung, blood-cell, nerve or eye toxicity remain possible","Antigen, trafficking, release, efflux and cell-response changes can cause resistance","Binding or an expression score alone does not establish benefit"],
    generation: "Attachment chemistry, payload and delivery format vary across products",
    technologies: ["topoisomerase-inhibitors", "bispecific-adc", "dual-payload-adc", "degrader-antibody-conjugate", "immune-stimulating-adc", "masked-adc", "site-specific-conjugation", "radioimmunotherapy"],
    targets: ["trop2", "her2", "her3", "nectin4", "b7h3", "cldn18-2", "folr1", "tissue-factor", "cdh6", "met", "cd19", "bcma", "cd33", "cd123", "ror1"],
    terms: ["payload","linker","dar","bystander-effect","ild","adc-analytes-and-exposure","chk1-inhibitor-payloads","parp-inhibitor-payloads"], companies: ["celldex", "tubulis", "adcendo", "alentis-therapeutics", "bighat-biosciences", "callio-therapeutics", "cytomx-therapeutics", "dantari", "emergence-therapeutics", "enlaza-therapeutics", "firefly-bio", "ideaya-biosciences", "iksuda-therapeutics", "mablink-bioscience", "myricx-bio", "mythic-therapeutics", "nbe-therapeutics", "orum-therapeutics", "pheon-therapeutics", "profoundbio", "tallac-therapeutics", "valink-therapeutics", "neok-bio", "sidewinder-therapeutics", "adcytherix", "stipple-bio", "indupro-therapeutics", "crescent-biopharma", "kivu-bioscience", "disco-pharmaceuticals", "angiex", "novelty-nobility", "intocell", "tagworks-pharmaceuticals", "axcynsis-therapeutics", "oncusp-therapeutics", "primelink-biotherapeutics", "dem-biopharma", "var2-pharmaceuticals", "biolojic-design", "phrontline-biopharma", "nanolattix", "solve-therapeutics", "advesya", "dauntless-biotherapeutics"], trials: ["aaml0531", "luminosity", "nct07299747", "nct06797999", "nct06842498", "nct07354711", "nct07258407", "nct06464055"], related: [...(["idea-efflux-agnostic", "idea-neoadjuvant-adc-io", "db-1305", "ibi130", "9mw2921", "bat8008", "avzo-103", "ibi3014", "bhv-1510", "vbc103"]), ...["antibody-tumor-penetration"]], links: [{"label":"FDA: clinical pharmacology considerations for cytotoxic antibody-drug conjugates (2024)","url":"https://www.fda.gov/media/155997/download"},{"label":"Goldenberg et al.: sacituzumab govitecan and gradual SN-38 release (2015)","url":"https://pubmed.ncbi.nlm.nih.gov/26101915/"},{"label":"Tomabechi et al.: lysosomal transport of a T-DM1 catabolite (2022)","url":"https://pubmed.ncbi.nlm.nih.gov/36741448/"},{"label":"Ogitani et al.: released-species permeability and local bystander killing in models (2016)","url":"https://pubmed.ncbi.nlm.nih.gov/27166974/"},{"label":"Rampa et al.: acquired ADC resistance and payload switching in breast cancer models (2026)","url":"https://pubmed.ncbi.nlm.nih.gov/41591991/"},{"label":"FDA: companion diagnostics and corresponding therapeutic uses","url":"https://www.fda.gov/medical-devices/in-vitro-diagnostics/companion-diagnostics"},
{
  "label": "Damelin et al.: target selection across the ADCs studied in 2015",
  "url": "https://pubmed.ncbi.nlm.nih.gov/25585957/"
},
{
  "label": "KIMMTRAK U.S. label: gp100 peptide-HLA-A*02:01/CD3 recognition and indication",
  "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=24a49f57-d2fc-4ffe-9eb1-fe0460c6b067"
},
{
  "label": "HERCEPTIN U.S. label: proliferation inhibition and antibody-dependent cellular cytotoxicity",
  "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=492dbdb2-077e-4064-bff3-372d6af0a7a2"
},
{
  "label": "KADCYLA U.S. label: HER2-positive indications, DM1 and intracellular catabolites",
  "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=23f3c1f4-0fc8-4804-a9e3-04cf25dd302e"
},
{
  "label": "TRODELVY U.S. prescribing information",
  "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=57a597d2-03f0-472e-b148-016d7169169d"
},
{
  "label": "ENHERTU U.S. prescribing information",
  "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6"
},
{
  "label": "DATROWAY U.S. prescribing information",
  "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2950227c-6230-4ca4-a135-46e44d9424a0"
}
],

    asOf: "2026-11-11",
  },
  {
    aka:["bispecific ADC","bispecific antibody-drug conjugate","bispecific antibody-drug conjugates","bsADC"],
    notes:["A bispecific ADC is distinct from a T-cell engager and from a dual-payload ADC. Measure each recognition interaction, tissue expression, uptake, processing and function; a single target score is not a universal eligibility rule. The clinical-program records retain study-specific evidence. A trial against chemotherapy does not by itself measure the added contribution of the bispecific format over a matched conventional ADC.",
"A second recognition feature is one way to investigate delivery, not the only one. Changes to a linker, released species, carrier properties or exposure can also change which cells receive active material. A new binding design must be tested as a finished product rather than inheriting the original binder's behaviour. A favourable result with one target pair does not establish a universal low-density advantage or prove that no other design could address the observed failure."
],
    id: "bispecific-adc", dependsOn: ["adc", "bispecific-antibody"], links: [{"label":"ClinicalTrials.gov NCT06382142: BL-B01D1-307","url":"https://clinicaltrials.gov/study/NCT06382142"},{"label":"ClinicalTrials.gov NCT06304974: PANKU-Esophagus01 (BL-B01D1-305)","url":"https://clinicaltrials.gov/study/NCT06304974"},{"label":"BCG033 PTK7-by-TROP2 conjugates: preclinical AACR abstract (2024)","url":"https://doi.org/10.1158/1538-7445.am2024-2616"},{"label":"Li et al.: biparatopic HER2 conjugate in preclinical models (2016)","url":"https://pubmed.ncbi.nlm.nih.gov/26766593/"},{"label":"Andreev et al.: HER2 and prolactin-receptor trafficking experiments (2017)","url":"https://pubmed.ncbi.nlm.nih.gov/28108597/"},
{
  "label": "Lyon et al.: drug-linker design changes conjugate hydrophobicity and exposure (2015)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/26076429/"
}
], kind: "technology", name: "Bispecific ADC", sections: ["adcs"], status: "phase-3",  since: 2023, generation: "4th (next-gen)",
    tldr: "A bispecific antibody-drug conjugate uses two recognition features to deliver a payload. Its design can change delivery; phase 3 testing still evaluates the complete drug.",
    summary: "Different-antigen designs recognize two proteins; biparatopic designs recognize distinct epitopes on one protein. Depending on the molecule and cell, the design may favor binding to either target, combined binding, receptor clustering or transport through an internalizing partner. A biparatopic HER2 conjugate carrying a tubulysin derivative promoted clustering and lysosomal trafficking in preclinical models. A separate HER2-by-prolactin-receptor study increased uptake and cell killing by linking a slower-trafficking target to a rapidly internalized partner. These experiments do not isolate a universal clinical advantage of two-target binding. Clinical examples need their own evidence: the registry identifies izalontamab brengitecan (EGFR-by-HER3) in the phase 3 BL-B01D1-307/PANKU-Breast02 study of previously treated advanced triple-negative breast cancer against chemotherapy. That design does not isolate the added contribution of the bispecific format over another ADC.",
    principle: "Recognition geometry, avidity, target distribution and intracellular trafficking must be tested for the complete construct.",
    strengths: ["Can alter recognition or intracellular delivery in suitable designs","Offers a way to test heterogeneous target expression"],
    limitations: ["Healthy cells may express one or both targets","Two binding specificities do not establish two payload mechanisms","Selectivity, loading, release and toxicity require construct-specific evidence"],
    technologies: ["adc", "bispecific-antibody"],
    targets: ["egfr", "her3", "met", "nectin4", "trop2", "her2", "b7h3", "pdl1"],
    drugs: ["izalontamab-brengitecan", "tilatamig-samrotecan", "ak146d1"],
    companies: ["systimmune", "bms", "astrazeneca", "akeso", "avenzo", "valink-therapeutics", "neok-bio", "sidewinder-therapeutics", "indupro-therapeutics", "disco-pharmaceuticals", "axcynsis-therapeutics", "primelink-biotherapeutics", "phrontline-biopharma"],
    cancers: ["tnbc", "nsclc", "esophageal", "urothelial"],
    tags: ["frontier"],

    asOf: "2026-11-11",

    related: ["bcg033"],
  },
  {
    id: "dual-payload-adc", links: [{"label": "Yamazaki et al., Antibody-drug conjugates with dual payloads for combating breast tumour heterogeneity and drug resistance (Nature Communications 2021)", "url": "https://doi.org/10.1038/s41467-021-23793-7"}, {"label": "Publisher abstract", "url": "https://doi.org/10.1158/1538-7445.am2026-6928"}, {"label": "Publisher abstract", "url": "https://doi.org/10.1158/1535-7163.targ-25-a124"}, {"label": "Publisher abstract", "url": "https://doi.org/10.1158/1538-7445.am2026-4438"}, {"label": "Publisher abstract", "url": "https://doi.org/10.1158/1557-3265.d32026-a014"},
{
  "label": "Yamazaki et al.: a dual-payload conjugate versus single-drug variants in mouse models (2021)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/34112795/"
}
], kind: "technology", name: "Dual-payload ADC", sections: ["adcs"], status: "phase-1",  generation: "4th (next-gen)",
    tldr: "A dual-payload antibody-drug conjugate carries two different active cargoes on one antibody. The cargoes can share a mechanism or act through different mechanisms.",
    summary: "Programs from Sutro, Mersana, Tavotek/Adcoris (ACR335, TOP1 inhibitor + non-TOP1/non-tubulin, DAR 4+4, phase 1 in 2026), and others place two payloads with distinct mechanisms on one antibody. Rationale: TOP1-payload cross-resistance after T-DXd, sacituzumab, or Dato-DXd. Also 'dual-mechanism' ADCs pairing a cytotoxic with an immune agonist.",
    principle: "Orthogonal site-specific conjugation chemistries attach two payload classes at defined positions.",
    strengths: ["Delays resistance", "Combination therapy without additive antibody dose"],
    limitations: ["Manufacturing", "Two toxicity profiles in one molecule"],
    technologies: ["adc", "site-specific-conjugation"],
    tags: ["frontier"], companies: ["callio-therapeutics", "axcynsis-therapeutics", "primelink-biotherapeutics", "phrontline-biopharma"],

    asOf: "2026-11-11",

    related: ["catb-101", "cbb-120", "ctph-03", "can020"],

"notes": [
  "Yamazaki and colleagues in 2021 compared a specified HER2-directed dual-drug conjugate with single-drug variants in xenograft models of heterogeneous HER2 expression and elevated resistance. The dual construct improved the measured treatment effect and survival in those mouse models. This supports that construct and comparison, not a promise that a tumour cannot resist two payloads or proof of benefit in people.",
  "In a fictional Company C proposal, resistant-line and mouse activity with no treated patients leaves several questions open. Measure each payload's identity, loading, release and effective exposure; attaching two drugs does not guarantee two active intracellular doses. Compare relevant single-payload products and assess combined harm, rather than comparing only with no treatment. Shared uptake, export or cellular tolerance can still protect against both. No low probability of joint resistance follows merely from counting two mechanisms."
]
},
  {
    id: "degrader-antibody-conjugate", dependsOn: ["adc", "protac-degrader"], links: [{ label: "The first PROTAC: a chimeric molecule that tags a protein for destruction (PNAS 2001)", url: "https://doi.org/10.1073/pnas.141230798" }], kind: "technology", name: "Degrader-antibody conjugate (DAC)", sections: ["adcs", "targeted-therapy"], status: "phase-1", asOf, generation: "4th (next-gen)",
    tldr: "An ADC that delivers a protein-destroying molecule instead of chemotherapy, hitting targets inside the cell that were previously unreachable.",
    summary: "A degrader-antibody conjugate is an ADC whose payload is a molecular glue or PROTAC rather than a cytotoxic: the antibody delivers it to the tumour cell and intracellular release triggers targeted protein degradation. Programmes include Orum Therapeutics (ORM-5029, a HER2-directed GSPT1 degrader; ORM-6151, CD33), Genentech (BRD4 degrader conjugates), and others. The design solves the delivery and bioavailability problems of PROTACs and lets a non-cytotoxic, non-genotoxic mechanism be targeted to the tumour, reaching intracellular targets via antibody selectivity. The trade-off is that potency per molecule is lower than for cytotoxics, and the field is early clinical, so it is not yet known whether degradation can match chemotherapy payloads in efficacy. The simple version is an ADC that destroys a specific protein inside the cancer cell instead of poisoning it.",
    principle: "Antibody delivers a molecular glue or PROTAC payload; intracellular release triggers targeted degradation.",
    strengths: ["Non-genotoxic payload", "Intracellular targets via antibody selectivity"],
    limitations: ["Potency per molecule lower than cytotoxics", "Early stage"],
    technologies: ["adc", "protac-degrader"],
    tags: ["frontier"], companies: ["cullgen", "firefly-bio", "orum-therapeutics", "prelude-therapeutics"],
  },
  {
    id: "immune-stimulating-adc", links: [{ label: "Ackerman et al., Immune-stimulating antibody conjugates elicit robust myeloid activation and durable antitumour immunity (Nature Cancer 2020)", url: "https://doi.org/10.1038/s43018-020-00136-x" }], kind: "technology", name: "Immune-stimulating antibody conjugate (ISAC)", sections: ["adcs", "immunotherapy"], status: "phase-1", asOf, generation: "4th (next-gen)",
    tldr: "An immune-stimulating antibody conjugate (ISAC) is an ADC whose payload wakes up the immune system inside the tumour rather than poisoning the cell.",
    summary: "An immune-stimulating antibody conjugate delivers an innate immune agonist, rather than a cytotoxic, to tumour-resident myeloid cells, aiming to convert immunologically cold tumours into hot ones. TLR7/8 agonist conjugates (Bolt's BDC-1001 against HER2; Silverback) and STING agonist conjugates (Mersana XMT-2056, Takeda TAK-500) are the leading examples. In principle the approach could produce durable immune memory and combine naturally with checkpoint inhibitors. Early results have been modest, with weak single-agent activity so far; dose-limiting systemic cytokine release and the need for antigen-presenting-cell engagement are the challenges. The simple version is an ADC whose payload wakes up the immune system inside the tumour, an idea still waiting for convincing clinical proof.",
    principle: "Antibody-targeted delivery of innate immune agonists to tumour-resident myeloid cells.",
    strengths: ["Durable immune memory in principle", "Combinable with checkpoint inhibitors"],
    limitations: ["Weak single-agent activity so far"],
    technologies: ["adc", "sting-agonist"],
    tags: ["frontier"], companies: ["nbe-therapeutics", "tallac-therapeutics"],
  },
  {
    id: "masked-adc", aka: ["probody drug conjugate", "Probody ADC", "protease-activated ADC", "conditionally activated ADC", "masked antibody-drug conjugate"], links: [{ label: "Autio et al., Probody therapeutics: an emerging class of therapies designed to enhance on-target effects with reduced off-tumour toxicity (Clinical Cancer Research 2020)", url: "https://doi.org/10.1158/1078-0432.CCR-19-1457" }], kind: "technology", name: "Masked / conditionally active ADC", sections: ["adcs"], status: "phase-2", asOf, generation: "4th (next-gen)",
    tldr: "An ADC wearing a mask that only comes off inside the tumour, so it ignores the same protein on healthy tissue.",
    summary: "Probody platform (CytomX; praluzatamab ravtansine CD166, CX-2051 EpCAM with TOP1 payload showing responses in colorectal cancer in 2025) and protease-activated designs allow targeting of antigens that are also expressed at high levels on normal tissue (EGFR, EpCAM, CD71). Also 'tumour microenvironment-activated' linkers cleaved by extracellular proteases.",
    principle: "Peptide mask blocks antigen binding until cleaved by tumour-enriched proteases (MMPs, uPA, legumain).",
    strengths: ["Unlocks targets previously too toxic", "Wider therapeutic index"],
    limitations: ["Incomplete masking; protease heterogeneity"],
    technologies: ["adc"],
    tags: ["frontier"], companies: ["cytomx-therapeutics", "synsorybio"],
  },
  {
    notes:["Protease cleavage, hydrolysis or reduction can release a payload from appropriate cleavable linkers. Noncleavable designs rely on antibody breakdown and can leave an active linker-bearing catabolite. HIC, mass spectrometry, attachment-site mapping and stability assays answer different characterization questions; an average DAR or the name of a platform does not establish equivalence."],
    id: "site-specific-conjugation", kind: "technology", name: "Site-specific conjugation & linker chemistry", sections: ["adcs", "drug-discovery"], status: "established", asOf:"2026-11-08", wikipedia: W("Bioconjugation"),
    tldr: "Attachment sites, loading and linker chemistry shape the finished conjugate. More controlled manufacture can help, but safety and effectiveness require evidence for that product.",
    summary: "Conventional attachment to available lysines or reduced cysteines can produce mixtures of attachment sites and loading states. Engineered sites and other selective chemistries aim to control these features. In one engineered-cysteine study, a near-homogeneous anti-MUC16 conjugate retained mouse antitumor activity and was tolerated at higher doses in rats and monkeys than its conventional comparator. That result supports a design strategy, not a guarantee of identical loading or improved human outcomes for every site-specific product. Hydrophilic drug-linker designs have also reduced accelerated clearance in studied high-loading constructs.",
    principle: "Attachment site, site occupancy, linker chemistry and released chemical species are separate properties of the complete conjugate.",
    strengths: ["More control of attachment and loading in suitable designs","Can support defined single- or multiple-payload constructs"],
    limitations: ["Loading distribution and impurities still require measurement","Stability, aggregation, exposure and safety remain product-specific"],
    technologies: ["adc"],
    terms: ["dar", "linker"], companies: ["tubulis", "enlaza-therapeutics", "bright-peak-therapeutics"], links: [{"label":"Junutula et al.: engineered-cysteine conjugation and animal therapeutic index (2008)","url":"https://pubmed.ncbi.nlm.nih.gov/18641636/"},{"label":"Lyon et al.: hydrophobicity, loading and conjugate pharmacokinetics (2015)","url":"https://pubmed.ncbi.nlm.nih.gov/26076429/"},{"label":"Hamblett et al.: drug loading in one anti-CD30 conjugate, cell and mouse experiments (2004)","url":"https://pubmed.ncbi.nlm.nih.gov/15501986/"},{"label":"Goldenberg et al.: sacituzumab govitecan and gradual SN-38 release (2015)","url":"https://pubmed.ncbi.nlm.nih.gov/26101915/"},{"label":"Tomabechi et al.: lysosomal transport of a T-DM1 catabolite (2022)","url":"https://pubmed.ncbi.nlm.nih.gov/36741448/"}],
  },
  {
    id: "peptide-drug-conjugate", companies: ["conjustar-biologics", "peptidream", "proteinqure", "aptamer-sciences", "jiaray-group", "twostep-therapeutics"], links: [{ label: "Cooper et al., Peptides as a platform for targeted therapeutics for cancer: peptide-drug conjugates (Chemical Society Reviews 2021)", url: "https://doi.org/10.1039/D0CS00556H" }], kind: "technology", name: "Peptide-drug & small-molecule-drug conjugates", sections: ["adcs"], status: "approved", asOf,
    tldr: "Like an ADC but with a small targeting peptide instead of an antibody, so it penetrates tumours faster and is cheaper to make.",
    summary: "Peptide-drug conjugates replace the antibody of an ADC with a short or bicyclic peptide that binds the target, giving rapid tumour penetration and renal clearance, with a short half-life that reduces systemic exposure and cheaper synthesis. Examples include melflufen (Pepaxto, withdrawn in the US), lutetium radioligands (technically peptide-radionuclide conjugates), and clinical-stage PDCs such as BT8009 zelenectide pevedotin, a Nectin-4 Bicycle toxin conjugate, and CBX-12, an exatecan-SMDC. Bicycle's zelenectide pevedotin is in phase 2/3 in urothelial cancer. The same short half-life that limits toxicity also limits tumour exposure, and renal toxicity is a class concern. The simple version is an ADC with a small peptide as the address label, faster to penetrate tumours and cheaper to make.",
    principle: "Short peptide or bicyclic peptide binds the target; short half-life reduces systemic exposure.",
    strengths: ["Rapid penetration, renal clearance", "Cheaper synthesis"],
    limitations: ["Short half-life limits tumour exposure", "Renal toxicity"],
    technologies: ["adc"],
    targets: ["nectin4"],
  },

  // ======================= IMMUNOTHERAPY =======================
  {
    id: "checkpoint-inhibitor", dependsOn: ["monoclonal-antibody"], related: ["tigit-blockade", "tim3-blockade",
    "immune-checkpoint",
    "intratumoral-immunotherapy",
    "vaccines-and-oncolytic-viruses"
  ], keyPapers: ["paper-ribas-wolchok-checkpoint-blockade-science-2018", "paper-chen-mellman-cancer-immunity-cycle-immunity-2013"], kind: "technology", name: "Immune checkpoint inhibitors", sections: ["immunotherapy"], status: "standard-of-care", asOf: "2026-11-12", since: 2011, wikipedia: W("Checkpoint_inhibitor"),
    tldr: "Checkpoint inhibitors block specified immune-regulatory interactions. They can support cancer-directed activity and can also cause immune-related injury; benefit depends on the cancer, regimen and setting.",
    summary: "Anti-CTLA-4 (ipilimumab), anti-PD-1 (pembrolizumab, nivolumab, cemiplimab, dostarlimab, toripalimab, tislelizumab), anti-PD-L1 (atezolizumab, durvalumab, avelumab), anti-LAG-3 (relatlimab). Approved across >20 tumour types. The U.S. tumour-agnostic pembrolizumab indication covers adult and paediatric patients with unresectable or metastatic MSI-H or dMMR solid tumours, determined by an FDA-authorised test, that have progressed following prior treatment and who have no satisfactory alternative treatment options. The separate colorectal indication covers unresectable or metastatic MSI-H or dMMR colorectal cancer determined by an FDA-authorised test, without that prior-treatment restriction. For the U.S. tumour-agnostic pembrolizumab indication, TMB-H means at least 13 mutations per megabase, determined by an FDA-authorised test, in adult and paediatric patients with unresectable or metastatic solid tumours that have progressed following prior treatment and who have no satisfactory alternative treatment options. Moving earlier: neoadjuvant/perioperative in melanoma, NSCLC, TNBC (KEYNOTE-522), bladder, and MSI-H colorectal (where dostarlimab produced 100% complete responses in rectal cancer without surgery). Immune-related adverse events are the cost.",
    principle: "Interrupt a specified inhibitory receptor-ligand interaction; effective cancer recognition, access, function and clinical benefit remain separate questions.",
    strengths: ["Durable, sometimes curative responses", "Broad applicability"],
    limitations: ["Most patients do not respond", "Autoimmune toxicity", "Biomarkers are imperfect"],
    targets: ["pd1", "pdl1", "ctla4", "lag3", "tigit"],
    drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "relatlimab-nivolumab", "dostarlimab", "cemiplimab"],
    terms: ["cps", "tmb", "msi", "irae"], people: ["lieping-chen"], trials: ["rationale-302"], links: [...([{ label: "Wikipedia", url: W("Checkpoint_inhibitor") }]), ...[{"label":"FDA, 16 October 2026: updated tumour-agnostic TMB-H indication","url":"https://www.fda.gov/drugs/cancer-approvals/fda-grants-traditional-approval-pembrolizumab-or-pembrolizumab-and-berahyaluronidase-alfa-pmph"},{"label":"KEYTRUDA current prescribing information, sections 1.8, 1.9, 1.18 and 2.1","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9333c79b-d487-4538-a9f0-71b91a02b287"}],
    {"label":"Qureshi et al.: CTLA-4 captures CD80 and CD86 (2011)","url":"https://pubmed.ncbi.nlm.nih.gov/21474713/"},
    {"label":"Hui et al.: PD-1, Shp2 and preferential CD28 dephosphorylation (2017)","url":"https://pubmed.ncbi.nlm.nih.gov/28280247/"},
    {"label":"Buchbinder and Desai: CTLA-4 and PD-1 pathway emphases (2016)","url":"https://pubmed.ncbi.nlm.nih.gov/26558876/"},
    {"label":"Schmid et al.: final KEYNOTE-522 overall survival (2024)","url":"https://pubmed.ncbi.nlm.nih.gov/39282906/"},
    {"label":"Cortes et al.: KEYNOTE-355 overall survival (2022)","url":"https://pubmed.ncbi.nlm.nih.gov/35857659/"},
    {"label":"U.S. Tecentriq label: PD-L1 mechanism via openFDA","url":"https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22TECENTRIQ%22"},
    {"label":"NCI: checkpoint inhibitors and immune-related injury","url":"https://www.cancer.gov/about-cancer/treatment/types/immunotherapy/checkpoint-inhibitors"}
  ], journals: ["cancer-immunology-immunotherapy", "journal-of-immunotherapy", "oncoimmunology"], companies: ["compass-therapeutics", "eris-biotech", "onc-ai", "ose-immunotherapeutics", "persephone-biosciences", "xilio-therapeutics", "mabquest", "ascendo-biotechnology", "bright-peak-therapeutics", "pheast-therapeutics", "zumutor-biologics", "biond-biologics", "solstice-oncology"],

  notes: [
    "Checkpoint antibodies interrupt specified inhibitory contacts. PD-1 is a receptor with two partners, PD-L1 and PD-L2; PD-L1 is a distinct molecule found on cancer and non-cancer cells. The pembrolizumab label describes blockade of PD-1 binding to both ligands. Atezolizumab instead binds PD-L1 and blocks its PD-1 and B7.1 interactions; directly blocking PD-L1 does not directly block the separate PD-1/PD-L2 contact. These target-specific descriptions are more precise than treating all checkpoint drugs as one switch.",
    "The pathways also differ inside and between cells. Hui's 2017 biochemical reconstitution and intact-cell experiments found that PD-1-recruited Shp2 preferentially dephosphorylated CD28 over the T-cell receptor, not that CD28 was the only possible affected signal. CTLA-4 and CD28 share CD80 and CD86. Qureshi's human and mouse cell experiments showed CTLA-4 capture and removal of these ligands from an opposing cell, reducing available costimulation. Contact and capture cartoons show these distinct receptor jobs; their molecule counts and positions are schematic, not a complete mechanism or a clinical comparison of blocking antibodies.",
    "CTLA-4 is often emphasised during priming in lymphoid sites and PD-1 during ongoing responses in tissues. These are overlapping emphases, not exclusive addresses: CD28-related regulation can also matter later. LAG-3, TIM-3 and TIGIT have their own biology rather than being interchangeable versions of PD-1. A regulator identified in an experimental model does not establish benefit from blocking it in another population; each intervention needs its own evidence.",
    "KEYNOTE-522 randomised 1,174 people with previously untreated stage II or III triple-negative breast cancer to pembrolizumab or placebo with chemotherapy before surgery, followed by continuation of the assigned antibody or placebo after surgery. At a median follow-up of 75.1 months, estimated 60-month overall survival was 86.6 per cent versus 81.7 per cent. Enrolment did not require PD-L1 positivity. The trial compared the whole perioperative regimen and was not designed to isolate the contribution of each treatment phase. These group results do not predict one person's outcome.",
    "KEYNOTE-355 studied 847 people with previously untreated locally recurrent inoperable or metastatic triple-negative breast cancer. In the PD-L1 combined-positive-score-at-least-10 subgroup, pembrolizumab plus chemotherapy gave median overall survival of 23.0 months versus 16.1 with placebo plus chemotherapy, with a death hazard ratio of 0.73. A median divides a study group in half; it is not an individual forecast. The October 2026 U.S. pembrolizumab label has no PD-L1 qualifier for its high-risk early-stage TNBC regimen, while its advanced TNBC indications with chemotherapy or sacituzumab govitecan specify CPS at least 10 and an FDA-authorised test. The sacituzumab combination is a separate labelled regimen, not the KEYNOTE-355 comparison. Population, regimen, scoring context and evidence must stay together.",
    "Checkpoint blockade changes an inhibitory interaction; it does not install a new recognition receptor or reconstruct required HLA machinery that has been genetically lost. That last statement concerns missing machinery, not a claim that checkpoint treatment can never affect regulated HLA expression. Recognition, access and cell state remain separate dependencies. Vaccines, engineered cell receptors and cytokines change different inputs, and a plausible combination still needs regimen-specific benefit and safety evidence.",
    "In a fictional sample containing PD-1-positive T cells, staining does not identify every cell's target, functional state or capacity to respond to an antibody. It does not show that all those cells are exhausted or that a drug will awaken all of them. Similarly, interrupting inhibition cannot alone solve a missing target-display component. Checkpoint biology, drug action, marker measurement and prediction of clinical benefit are separate claims.",
    "The multiple-controls analogy has two possible branches: interrupting regulation can support useful cancer-directed activity and can also injure healthy tissue. Neither outcome is guaranteed for a person. Normal checkpoint regulation helps limit immune injury, and immune-related adverse events can involve several organs. Assess activity, durability and harms in the relevant population rather than equating more immune activity with exclusively tumour-directed benefit."
  ]
},
  {
    aka:["T-cell engager","T cell engager","TCE","TCEs","bispecific T-cell engager","BiTE","soluble TCR engager","TCR-mimic engager"], notes:["An antibody-derived TCR mimic recognizes a peptide-HLA complex using an antibody scaffold. A soluble TCR/CD3 engager instead uses a TCR-derived recognition scaffold attached to a recruiting arm. TCR-T administers cells carrying receptor chains. Target recognition, molecular scaffold and administered object are separate axes; a mimic can be part of an engager without becoming a TCR protein.","Liddy studied soluble TCR/CD3 ImmTAC proteins in experimental systems. Dao studied an antibody-derived WT1/HLA-A*02:01/CD3 engager in cells and mice. Their results do not establish clinical benefit for every scaffold, HLA allele or cancer. Recruiting another T cell does not require that cell’s native receptor to recognize the target, but does not remove the target arm’s HLA restriction.","The KIMMTRAK label identifies tebentafusp as a soluble gp100 peptide-HLA/CD3 protein for HLA-A*02:01-positive adults with unresectable or metastatic uveal melanoma. This is a named clinical protein example, not an engineered-cell product or evidence that other peptide-HLA binders share its indication or outcomes.","Binding to supplied peptide-HLA reagent can bypass natural processing and display. Source-protein expression or a compatible genotype alone is not a functional target assay. For a research claim, compare naturally presenting targets, irrelevant peptides, the wrong HLA allele, antigen-negative targets, suitable effector cells, no-effector conditions and healthy tissues. Labeled clinical selection tests remain a separate clinical-use rule. Record the peptide sequence, HLA allele, display method and its detection or recovery limits; no universal target-density cutoff follows from the format name.","The Mack construct joined two single-chain Fv fragments with a peptide linker in one compact protein; this is different from an IgG architecture with an Fc region. The FDA tarlatamab application describes DLL3/CD3 binding domains combined with an IgG Fc region in a half-life-extended BiTE. Thus BiTE, Fc-containing and half-life-extended are not three exclusive buckets. Fc design, binding geometry, affinity, target density, distribution and measured exposure still belong to the specific molecule. The Giffin cell, mouse and nonhuman-primate study does not define a universal human schedule.","Compare recognition, T-cell activation, proliferation, target death, cytokine release and protein exposure at named times. Record effector source/state, target density, effector-to-target ratio, dose or concentration and denominator; include target-negative and no-effector controls. A granule or cytokine signal does not substitute for completed target-cell death or clinical benefit. Cytokines in a culture are a measured laboratory endpoint, not a diagnosis of clinical cytokine-release syndrome.","Bluemel compared epitope positions and antigen sizes in engineered cell systems. Constructs with similar target-binding affinity differed in target-cell lysis, supporting functional testing of the actual geometry rather than ranking every molecule by affinity alone. In the solitomab phase 1 solid-tumor study, dose-limiting diarrhea and liver abnormalities constrained dose escalation; an accessible target and a binding bridge did not by themselves establish a useful therapeutic window.","Compared with administered CAR-T or TCR-T cells, a protein engager recruits effectors rather than supplying engineered responders. Protein mass/concentration and viable-cell dose have different units; clearance differs from cell survival, expansion and trafficking. A shared target name does not establish matched epitope, affinity, contact geometry, exposure, controllability or safety.","The 2025 FDA tarlatamab decision followed the randomized DeLLphi-304 comparison after platinum-based treatment in SCLC. Its survival finding belongs to that drug and setting. The cited blinatumomab consolidation and teclistamab combination/monotherapy decisions likewise retain their own settings; none is a class-wide treatment-sequencing rule.",
"Stopping a protein infusion and reversing an injury are different outcomes. In Kebenko's 2018 phase 1 solitomab study of 65 patients with refractory solid tumours, the reported half-life was 4.5 hours. Diarrhoea limited dosing; one grade 3 event progressed to grade 5 after solitomab discontinuation. That observation shows why short measured protein exposure does not guarantee immediate reversal of toxicity. It is one product and study, not a rate or a safety rule for all engagers. Living engineered cells have their own expansion, persistence and trafficking, rather than sharing this protein's clearance clock."
],
    id: "t-cell-engager", dependsOn: ["bispecific-antibody"], related: ["nk-cell-engagers","car-t","tcr-t","cellular-kinetics-and-persistence"], kind: "technology", name: "T-cell engagers (bispecific)", sections: ["immunotherapy"], status: "approved", asOf:"2026-11-11",  wikipedia: W("Bi-specific_T-cell_engager"),
    tldr: "T-cell engagers are proteins that bind a specified target and recruit T cells, often through CD3. A binding bridge does not by itself establish completed killing.",
    summary: "A dosed T-cell engager supplies a protein connecting target recognition to an available T cell. It does not itself install receptor instructions or supply engineered living responders. Product design can use antibody-derived binding fragments or a soluble TCR recognition domain; some target arms require a particular peptide-HLA complex. Compact BiTE designs, Fc-containing architectures and half-life extension describe features that can overlap rather than mutually exclusive treatment categories.\n\nClinical examples include blinatumomab in B-cell precursor acute lymphoblastic leukemia, teclistamab in multiple myeloma and tarlatamab in extensive-stage small-cell lung cancer. Their actual labels define different settings, combinations, prior treatments and harms. Tebentafusp is a peptide-HLA-directed soluble TCR/CD3 protein with its own allele- and disease-specific use. Neither a common platform name nor binding in a laboratory establishes eligibility or comparative benefit.",
    principle: "A specified target-binding region and T-cell-recruiting region promote encounters. CD3 recruitment can bypass the recruited cell’s own antigen specificity; a peptide-HLA-binding target arm still retains its peptide and HLA requirements.",
    strengths: ["Established clinical uses for particular products in defined settings","Protein exposure can be adjusted through a specified dosing regimen"],
    limitations: ["Productive encounters need accessible targets and functional effectors","Healthy-tissue recognition, cytokine release and neurologic harms need product-specific evidence","Stopping administration does not instantly clear protein or reverse an effect already triggered"],
    technologies: ["bispecific-antibody"],
    targets: ["cd3", "cd19", "cd20", "bcma", "gprc5d", "dll3", "gp100", "psma"],
    drugs: ["tarlatamab", "teclistamab", "glofitamab", "tebentafusp", "blinatumomab"],
    terms: ["crs"], companies: ["xencor", "amunix-pharmaceuticals", "cullinan-therapeutics", "cytomx-therapeutics", "enlaza-therapeutics", "harpoon-therapeutics", "igm-biosciences", "janux-therapeutics", "marengo-therapeutics", "cytospire-therapeutics", "third-arc-bio", "clasp-therapeutics", "disco-pharmaceuticals", "excalipoint-therapeutics", "juri-biosciences", "chiome-bioscience", "cartography-biosciences", "cdr-life", "vitruviae", "crossbow-therapeutics", "duboce-biopharmaceuticals", "shine-on-biomedical", "normunity"], links: [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Bi-specific_T-cell_engager"},{"label":"Liddy et al.: soluble TCR/CD3 ImmTAC constructs (2012)","url":"https://pubmed.ncbi.nlm.nih.gov/22561687/"},{"label":"Dao et al.: antibody-derived WT1 peptide-HLA/CD3 engager (2015)","url":"https://pubmed.ncbi.nlm.nih.gov/26389576/"},{"label":"Giffin et al.: defined AMG 757 preclinical and exposure models (2021)","url":"https://pubmed.ncbi.nlm.nih.gov/33203642/"},{"label":"KIMMTRAK label: peptide-HLA/CD3 protein, intended use and pharmacology","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=24a49f57-d2fc-4ffe-9eb1-fe0460c6b067"},{"label":"FDA tarlatamab application correspondence: BiTE binding domains with an IgG Fc region","url":"https://www.accessdata.fda.gov/drugsatfda_docs/nda/2024/761344Orig1s000AdminCorres.pdf"},{"label":"FDA: tarlatamab traditional approval, DeLLphi-304 and warnings (2025)","url":"https://www.fda.gov/drugs/cancer-approvals/fda-grants-traditional-approval-tarlatamab-dlle-extensive-stage-small-cell-lung-cancer"},{"label":"FDA: the specified blinatumomab consolidation use in B-cell precursor ALL (2024)","url":"https://www.fda.gov/drugs/cancer-approvals/fda-approves-blinatumomab-consolidation-cd19-positive-philadelphia-chromosome-negative-b-cell"},{"label":"FDA: teclistamab combination and monotherapy use scopes (2026)","url":"https://www.fda.gov/drugs/cancer-approvals/fda-approves-teclistamab-combination-daratumumab-hyaluronidase-fihj-relapsed-or-refractory-multiple"},{"label":"Mack et al.: two single-chain Fv fragments in a compact experimental T-cell engager (1995)","url":"https://pubmed.ncbi.nlm.nih.gov/7624362/"},{"label":"Bluemel et al.: epitope distance and antigen size in BiTE-directed cell lysis (2010)","url":"https://pubmed.ncbi.nlm.nih.gov/20309546/"},{"label":"Kebenko et al.: solitomab phase 1 study in refractory solid tumors (2018)","url":"https://pubmed.ncbi.nlm.nih.gov/30221040/"}],
  },
  {
    "notes":["These vaccines aim to recruit or amplify T cells with receptors that can recognise the selected peptide together with HLA. Innate sensing and the specific adaptive response interact, but are different observations. Antigen in a supporting context can select matching cells to activate and increase in number; vaccination does not normally rewrite the receptor genes of each mature cell. A useful matching population may have been rare before treatment.","Priming is initial activation of a naive T cell, with dendritic-cell display and supporting signals contributing. A cell translating vaccine RNA can present antigen it makes, while cross-presentation places externally acquired antigen on class I HLA. Successful priming and later tumour attack remain separate. The responding cells must reach the tumour, find an appropriate displayed target and retain useful function. These are dependencies, not a guaranteed or strictly timed chain. A shared processing defect can limit several targets; adding source sequences does not automatically remove it. Useful killing and durable benefit need their own outcome measurements.","In a fictional study, peptide-reactive cells increase in sampled blood after vaccination. This supports a response in that compartment, not entry into the tumour, recognition of naturally processed antigen or prevention of recurrence. Repeating the blood measurement cannot settle the missing tumour-recognition or clinical comparison. Rare or unavailable matching cells, unsuitable delivery, poor display or supporting signals, and later access or functional barriers call for different measurements.","Consider invented, compatible blood reports. Before dosing, clone Q is not detected by an assay that cannot reliably detect it below 0.1% of sampled receptor units. After dosing, Q represents 1%. This is first detection in these samples and is consistent with enrichment. Non-detection did not prove absence from the blood, much less the whole body. There is no measured baseline for an exact observed fold change, and compatible absolute-cell counts are needed to infer expansion rather than only a frequency change.","A separate peptide-stimulation test of the fictional cell mixture responds, but does not link that response to Q. It therefore does not assign specificity to Q or demonstrate recognition of the natural tumour. Likewise, a tenfold rise in a sampled receptor sequence reports increased representation, rather than proving a newly created receptor, absolute cell expansion, tumour killing or benefit. The 0.1%, 1% and tenfold examples are invented teaching premises with comparable sampling and methods, not patient results or clinical thresholds.","Target number, formulation, combination and timing belong to the particular product. The V940 sponsor description specifies up to 34 encoded neoantigens; Rojas and colleagues used autogene cevumeran with up to 20 in their pancreatic study. Neither number is a universal selection score or manufacturing rule. Tolerability and added benefit require evidence for the actual regimen and population; a personalised sequence does not itself establish low toxicity.","TNBC-MERIT illustrates why immune-response denominators retain their assay. The 2026 report evaluated 14 participants after standard treatment for early triple-negative breast cancer. Overnight peptide-stimulated PBMC ELISpot detected responses in 12 of the 14. Eight had enough remaining cells for additional testing after 1.5 weeks of culture and stimulation of separated CD4 and CD8 cells. Every participant had a response by at least one ELISpot approach, which is a different observation from the direct-assay 12 of 14. Culture can change the number and state of responders and the specimen represented. These immune results in a noncomparative intravenous RNA-lipoplex study do not isolate recurrence-prevention benefit.","The protocol specifies dose, route, cadence, duration, combinations, safety monitoring and stopping rules. Batch release does not establish a safe dose or beneficial schedule. There is no general chemotherapy off-week, checkpoint-overlap or concurrent-targeted-drug rule for every cancer vaccine: mechanistic compatibility is a question for study in the actual regimen and population. Use controls, an informative baseline where appropriate, and a prespecified sampling plan. A comparison record names specimen compartment and time, preparation, stimulus or reagent, input-cell denominator, background controls and a prespecified response rule. A percentage within a CD8 gate, spots per million PBMCs and relative receptor frequency describe different quantities. Technical repeats from one sample are not reproducibility across people. Choosing a different test after seeing the result can favour a positive story, so retain the original response rule and any changed conditions. Safety requires systematic adverse-event collection rather than inference from an immune-response curve."],
    id: "neoantigen-mrna-vaccine", dependsOn: ["wes-wgs", "rna-seq", "plasmid-dna-manufacturing", "sterile-fill-finish"], kind: "technology", name: "Personalised neoantigen (mRNA) vaccines", sections: ["immunotherapy"], status: "phase-3", "asOf":"2026-11-12", since: 2017, wikipedia: W("Cancer_vaccine"),
    tldr: "A vaccine made for one patient, encoding the unique mutations in their own tumour, to train the immune system to hunt it.",
    summary: "Personalised neoantigen mRNA vaccines encode selected tumour-derived sequences to support antigen-directed immunity. Credible source sequence, delivery, peptide display, T-cell recognition and clinical benefit are separate questions.\n\nMerck and Moderna reported in August 2026 that intismeran autogene (V940/mRNA-4157) with pembrolizumab met recurrence-free and distant-metastasis-free survival endpoints in INTerpath-001 in completely resected stage IIB-IV melanoma. This is the companies' interim report about a combination and population, rather than a finding about every cancer vaccine or a regulatory approval.\n\nRojas and colleagues' 2023 pancreatic phase 1 study treated 16 people with atezolizumab and autogene cevumeran, followed by chemotherapy in 15. The association between an immune response and recurrence-free survival does not isolate the vaccine's causal contribution. A phase 2 resected-pancreatic study, NCT05968326, is active but not recruiting in its registry record.\n\nOther named V940 records have different stages: NCT06077760 in lung cancer is phase 3, NCT06307431 in renal cancer is phase 2, and NCT06305767 in bladder cancer is phase 1/2. The cutaneous squamous-cell study NCT06295809 is terminated for business reasons; that status is not an efficacy result. These are individual registry examples, not an exhaustive trial inventory.",
    principle: "A protocol selects tumour-derived sequences and encodes them in an RNA product. Delivery, presentation and priming then require testing. Target count, formulation, route and combinations are product-specific rather than universal features of the platform.",
    strengths: ["Patient-specific antigen selection","Immune responses and clinical outcomes can be measured separately"],
    limitations: ["Prediction does not establish natural presentation or recognition","Manufacturing time, dose, combinations and toxicity depend on the product and protocol","Immune response does not establish clinical benefit"],
    drugs: ["intismeran-autogene", "autogene-cevumeran"],
    companies: ["moderna", "merck", "biontech", "roche-genentech", "gritstone", "serova", "curevac", "evaxion", "gamgee", "geneos-therapeutics", "kernal-biologics", "nykode-therapeutics", "tarebio", "transgene", "echo-immune", "invoke-bio", "ubivac", "breakbio"], institutions: ["jaime-leandro-foundation"],
    trials: ["interpath-001", "nct07002203"],
    cancers: ["melanoma", "pancreatic", "nsclc", "rcc"],
    terms: ["neoantigen"], related: ["idea-neoantigen-immunogenicity-rules","neoantigen-candidate-selection"], links: [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Cancer_vaccine"},{"label":"NCI: how cancer treatment vaccines work","url":"https://www.cancer.gov/about-cancer/treatment/types/immunotherapy/cancer-treatment-vaccines"},{"label":"OpenStax: T-cell selection and clonal expansion","url":"https://openstax.org/books/anatomy-and-physiology-2e/pages/21-3-the-adaptive-immune-response-t-lymphocytes-and-their-functional-types"},{"label":"Kranz et al.: systemic RNA delivery and antigen-specific responses (2016)","url":"https://pubmed.ncbi.nlm.nih.gov/27281205/"},{"label":"Douek et al.: measured adult thymic output and age (1998)","url":"https://pubmed.ncbi.nlm.nih.gov/9872319/"},{"label":"Rojas et al.: pancreatic phase 1 combination and immune-response association (2023)","url":"https://pubmed.ncbi.nlm.nih.gov/37165196/"},{"label":"Merck and Moderna: company-reported INTerpath-001 interim endpoints (19 August 2026)","url":"https://news.modernatx.com/merck-and-moderna-announce-phase-3-interpath-001-trial-of-intismeran-plus-keytruda-met-endpoints-of-rfs-and-dmfs-in-melanoma"},{"label":"INTerpath-001: registry design and endpoints","url":"https://clinicaltrials.gov/study/NCT05933577"},{"label":"Autogene cevumeran: phase 2 resected-pancreatic study","url":"https://clinicaltrials.gov/study/NCT05968326"},{"label":"V940-002: phase 3 lung-cancer study","url":"https://clinicaltrials.gov/study/NCT06077760"},{"label":"V940-004: phase 2 renal-cancer study","url":"https://clinicaltrials.gov/study/NCT06307431"},{"label":"V940-005: phase 1/2 bladder-cancer study","url":"https://clinicaltrials.gov/study/NCT06305767"},{"label":"V940-007: terminated cutaneous squamous-cell study","url":"https://clinicaltrials.gov/study/NCT06295809"},{"label":"Sahin et al.: TNBC-MERIT product, manufacture and immune monitoring (2026)","url":"https://doi.org/10.1038/s41586-025-10004-2"},{"label":"FDA: clinical considerations for therapeutic cancer vaccines (October 2011)","url":"https://www.fda.gov/media/82312/download"}],
  },
  {
    id: "shared-antigen-vaccine", links: [{ label: "First trial of a vaccine against the shared neoantigens of mismatch-repair-deficient cancers (Clinical Cancer Research 2020)", url: "https://doi.org/10.1158/1078-0432.CCR-19-3517" }, { label: "ClinicalTrials.gov NCT05726864: AMPLIFY-7P", url: "https://clinicaltrials.gov/study/NCT05726864" },
    {"label":"NCI: antigen sources for cancer treatment vaccines","url":"https://www.cancer.gov/about-cancer/treatment/types/immunotherapy/cancer-treatment-vaccines"},
    {"label":"Ott et al.: a personal selection delivered as long peptides (2017)","url":"https://pubmed.ncbi.nlm.nih.gov/28678778/"}
  ], kind: "technology", name: "Off-the-shelf cancer vaccines", sections: ["immunotherapy"], status: "phase-3", asOf: "2026-11-12",
    tldr: "Off-the-shelf cancer vaccines target antigens shared across patients, such as mutant KRAS or HER2 peptides, so they are made in advance rather than per person. Sipuleucel-T is still the only approved therapeutic cancer vaccine in the US; tolerance to self-antigens and weak past results hold them back.",
    summary: "KRAS-directed vaccines (ELI-002 7P, Elicio; mRNA-5671), shared neoantigen vaccines (Gritstone SLATE, discontinued), HER2 peptide vaccines, and tumour-lysate approaches. Sipuleucel-T (2010) remains the only approved therapeutic cancer vaccine in the US; BCG for bladder cancer is the oldest immunotherapy.",
    principle: "Supply selected shared cancer-associated targets or instructions for making them in a specified vaccine design; antigen selection, delivery platform and manufacturing personalisation are separate attributes.",
    strengths: ["Scalable, immediate"],
    limitations: ["Tolerance to self-antigens; weak historical results"],
    targets: ["kras"],
    cancers: ["pancreatic", "colorectal", "prostate"], companies: ["gritstone", "adventris-pharmaceuticals", "curevac", "evaxion", "guardian-bio", "io-biotech", "mendus", "nykode-therapeutics", "ose-immunotherapeutics", "tarebio", "infinitopes", "brenus-pharma", "epitopea", "therorna", "chimigen-bio", "expres2ion-biotechnologies"], related: ["idea-splice-neoantigens",
    "vaccine-adjuvants",
    "vaccines-and-oncolytic-viruses"
  ],

  notes: [
    "Shared antigen selection describes a target found across people; it does not alone specify peptide, RNA, vector or cellular delivery, or guarantee an identical finished product for every person. Shared tumour-associated antigens and recurring mutation-derived targets are different sources. A personalised selection can include a shared target. Presence of a target sequence also does not establish natural peptide display on every cancer cell or a useful immune response."
  ]
},
  {
    id: "oncolytic-virus", trials: ["nct07006077"], aka: ["Oncolytic virus", "Oncolytic virotherapy"], dependsOn: ["viral-vector-manufacturing"], kind: "technology", name: "Oncolytic viruses", sections: ["immunotherapy"], status: "approved", asOf: "2026-11-12", since: 2015, wikipedia: W("Oncolytic_virus"),
    tldr: "Oncolytic viruses can infect and injure susceptible tumour cells and may support an immune response. Useful tumour recognition, clinical benefit and safety depend on the product and setting.",
    summary: "A healthy cell that detects a virus mounts an interferon response: it slows its own machinery, calls the immune system and kills itself before the virus spreads. Many cancer cells have already broken parts of that response, because it also restrains growth, and a virus can exploit the break. Stojdl and colleagues showed this directly in 2000 with vesicular stomatitis virus, which killed human tumour lines at interferon doses that fully protected normal cells. Coffey and colleagues showed in 1998 that reovirus needs an activated Ras pathway, which many cancers supply. Martuza and colleagues had already built the first engineered version in 1991, a herpes virus with thymidine kinase deleted so it could only replicate where the host cell supplied the missing function.\n\nFour replicating oncolytic viruses have an approval somewhere. H101 (Oncorine) in China from 2005, on a 160-patient randomised trial reporting response rate and no survival data. Talimogene laherparepvec (Imlygic, HSV-1) from 2015 in melanoma: durable response rate 16.3 per cent against 2.1 per cent for granulocyte-macrophage colony-stimulating factor, with a median overall survival difference of 23.3 against 18.9 months that did not reach significance. Teserpaturev (G47 delta, Delytact) conditionally approved in Japan in 2021 on a single-arm trial of 19 patients with recurrent glioblastoma. Vusolimogene oderparepvec (Tudriqev, RP1), an HSV-1 carrying GM-CSF and a fusogenic protein, given accelerated approval with nivolumab for anti-PD-1-failed melanoma on 6 August 2026, on a 140-patient single-arm cohort with a 32.9 per cent response rate in which uninjected lesions responded too.\n\nTwo products often counted in the class are not replicating viruses at all. Nadofaragene firadenovec (Adstiladrin) is a replication-deficient adenovirus that delivers the interferon alfa-2b gene to the bladder lining, and aglatimagene besadenovec (CAN-2409) is a replication-defective adenovirus delivering a prodrug-converting enzyme. They are gene delivery, not oncolysis, and the distinction matters when reading claims about the class. Cretostimogene grenadenorepvec, which does replicate, reported a 75 per cent complete response rate in BCG-unresponsive bladder cancer with carcinoma in situ in a single-arm phase 3 trial.\n\nThe randomised record is poor. Adding talimogene laherparepvec to pembrolizumab in melanoma (MASTERKEY-265) did not improve progression-free or overall survival. Toca 5 in recurrent high-grade glioma and PHOCUS in liver cancer were both negative, PHOCUS worse than its control. The unsolved problems are the ones named in 2012: delivery to tumours that cannot be injected, pre-existing and rapidly rising neutralising antibody, the conflict between letting the virus spread and wanting an immune response, and manufacturing yield.",
    principle: "Use specified viral properties or engineered changes to investigate tumour-cell infection, replication and injury, with possible immune effects. Released material and antiviral activity do not by themselves establish effective antitumour vaccination.",
    strengths: ["Provides a route to investigate direct viral injury alongside immune effects","Can make tumour material available in place","Local and uninjected-lesion effects can be measured separately"],
    limitations: ["Delivery, replication and immune effects differ between products","An injected response does not establish systemic immune control","Infection, local injury and systemic harms remain product-specific","Clinical outcome claims need the actual regimen, population and comparator"],
    drugs: ["vusolimogene-oderparepvec", "talimogene-laherparepvec", "nadofaragene-firadenovec", "cretostimogene", "h101-oncolytic-adenovirus", "olvimulogene-nanivacirepvec", "aglatimagene-besadenovec"],
    companies: ["replimune", "amgen", "candel-therapeutics", "humane-genomics", "kopra-bio", "transgene", "minuteman-therapeutics", "adze-biotechnology", "accession-therapeutics", "viromissile", "neuregen-therapeutics", "kalivir-immunotherapeutics", "genemedicine", "jecho", "psivac", "virogin-biotech", "dnatrix"],
    people: ["robert-martuza", "stephen-russell", "john-bell", "tomoki-todo", "beata-halassy", "dubravko-forcic", "howard-kaufman", "evanthia-galanis"],
    keyPapers: ["paper-stojdl-vsv-interferon-defect-natmed-2000", "paper-coffey-reovirus-ras-science-1998", "paper-martuza-engineered-hsv-glioma-science-1991", "paper-bischoff-onyx-015-science-1996", "paper-kelly-russell-oncolytic-history-moltherapy-2007", "paper-russell-peng-bell-oncolytic-virotherapy-natbiotech-2012", "paper-shalhout-oncolytic-progress-challenges-natrevclinonc-2023", "paper-andtbacka-optim-talimogene-jco-2015", "paper-todo-g47delta-glioblastoma-natmed-2022", "paper-xia-h101-head-neck-aizheng-2004", "paper-wong-ignyte-rp1-nivolumab-jco-2025", "paper-russell-mv-nis-myeloma-mayo-2014", "paper-cloughesy-toca5-glioma-jamaoncol-2020", "paper-abou-alfa-phocus-pexa-vec-liver-cancer-2024", "paper-hietanen-rigvir-echovirus-viruses-2022", "paper-bourgeois-daigneault-neoadjuvant-ovt-tnbc-scitranslmed-2018", "paper-halassy-self-experiment-ovt-vaccines-2024", "paper-pugh-self-experimentation-publication-jme-2026"],
    cancers: ["melanoma", "urothelial", "glioblastoma", "hcc", "multiple-myeloma"],
    links: [{ label: "Wikipedia", url: W("Oncolytic_virus") }, { label: "Oncolytic virotherapy on OnCo: history, approvals, engineering and failures", url: "https://onco.cc/virotherapy/" },
    {"label":"FDA Imlygic label: mechanism uncertainty, local indication and infection precautions","url":"https://www.fda.gov/media/94129/download"},
    {"label":"Chesney et al.: randomised T-VEC plus ipilimumab phase II trial (2018)","url":"https://pubmed.ncbi.nlm.nih.gov/28981385/"},
    {"label":"NCI: historical 2018 oncolytic-virus explanation","url":"https://www.cancer.gov/news-events/cancer-currents-blog/2018/oncolytic-viruses-to-treat-cancer"},
    {"label":"Ott et al.: separate antigen-processing and tumour-recognition tests (2017)","url":"https://pubmed.ncbi.nlm.nih.gov/28678778/"}
  ], journals: ["cancer-gene-therapy"],

  notes: [
    "Oncolytic viruses use viral activity to injure susceptible tumour cells and may also support immune effects. Natural viral properties and engineered changes can alter replication or add signalling proteins; different platforms have different entry, replication and immune requirements. A replication-vehicle analogy does not establish universal tumour targeting or healthy-cell sparing. Infection, productive replication, injury, released tumour material and useful antigen presentation are distinct steps. Replication alone is not successful vaccination, and this treatment purpose differs from preventing an infection.",
    "Talimogene laherparepvec is a modified herpes simplex virus type 1 product. The U.S. label describes modification for tumour replication and GM-CSF production, tumour lysis and a possible antitumour immune response, while stating that the exact mechanism is unknown. Its specified use is local treatment of unresectable cutaneous, subcutaneous and nodal melanoma lesions recurrent after surgery; improved overall survival and visceral-metastasis effects have not been established. Herpetic infection, local wound complications and other adverse effects remain possible, so injection is not proof of confinement or normal-cell safety.",
    "Chesney's randomised phase II trial compared talimogene laherparepvec plus ipilimumab with ipilimumab alone in 198 people with advanced unresectable melanoma. Investigator-assessed objective response was 39 per cent versus 18 per cent; grade 3 or greater adverse events occurred in 45 versus 35 per cent. This comparison concerns that combination, population and response endpoint. It is separate from the virus's labelled local indication and does not establish survival benefit, an immune mechanism for every response or efficacy in breast cancer.",
    "A modified-HSV teaching cartoon can separate conditional entry into a susceptible cell, replication and injury, and release of new particles and tumour material. The particles are not the same as released tumour antigen, and the symbol counts are not measured yields. The drawing supplies no literal entry route, nuclear-versus-cytoplasmic replication or assembly map. Its cell boundaries and interiors are schematic, and no whole-body benefit or universal selectivity follows from the image.",
    "Antiviral and tumour-targeted responses concern different antigens. In a two-test teaching example, the same T-cell sample is offered a viral-target test and a tumour-target test, with separate class-I HLA holders, peptides and symbolic receptors. HLA compatibility and verified presentation are conditions to check. The receptor shapes establish neither molecular binding nor a shared clone, and released material is not automatically processed into the displayed peptide. Question marks supply no response result. Clearing viral targets does not establish recognition of uninfected cancer cells.",
    "Suitable tests distinguish verified compatible presentation, irrelevant-peptide or background responses, antigen-negative targets and a positive assay control. Added peptide can bypass natural processing. Reactivity to that peptide does not by itself establish recognition of naturally presenting uninfected tumour cells, tissue access or killing. Ott's melanoma experiments illustrate the distinction by testing peptide-loaded cells, antigen-encoding presenting cells and autologous tumour cells separately; their results do not fill in the unanswered viral-versus-tumour cartoon.",
    "Suppose a fictional study reports viral entry and cancer-cell death plus immune cells reactive to a viral protein. It shows viral activity and an antiviral response under the tested conditions. Naturally processed tumour recognition and useful cancer control remain separate questions. Measure infected-tissue effects, antitumour immunity and clinical outcomes over time; an injected-lesion response does not establish exposure or control elsewhere, and systemic co-treatment complicates attribution.",
    "The NCI's 2018 explanation describes early research on viral killing, immune effects and combinations. Trial plans and statuses in that historical account describe that time, rather than present access. Current availability depends on the particular product, indication, jurisdiction and trial record. Historical class background cannot establish a current treatment opportunity."
  ],
  related: [
    "intratumoral-immunotherapy",
    "in-situ-vaccination",
    "vaccines-and-oncolytic-viruses"
  ]
},
  {
    id: "cytokine-therapy", drugs: ["lenograstim", "peginterferon-alfa-2b", "oprelvekin"], related: ["immunocytokines",
    "intratumoral-immunotherapy",
    "vaccine-adjuvants",
    "cytokine",
    "interferons"
  ], kind: "technology", name: "Cytokines & engineered cytokines", sections: ["immunotherapy"], status: "approved", asOf: "2026-11-12", wikipedia: W("Cytokine"),
    tldr: "Cytokine therapy supplies immune-signalling proteins or cells that produce them. Effects depend on the molecule, receiving cells and exposure, with benefits and harms specific to the regimen.",
    summary: "High-dose IL-2 and interferon-alpha are historic. Engineered IL-2 (bempegaldesleukin failed), IL-15 superagonists (nogapendekin alfa/Anktiva, approved 2024 with BCG in bladder cancer), IL-12 (tavokinogene, intratumoural), and tumour-targeted immunocytokines are the modern forms. IL-2 remains part of TIL therapy regimens.",
    principle: "Deliver a specified signalling protein, or support its production, to change responses in cells with the relevant receptor system; measure useful effects and harms under the actual exposure conditions.",
    strengths: ["Potent immune expansion"],
    limitations: ["Useful and unwanted responses depend on molecule, formulation, receptor and cell state","Local production does not guarantee confined exposure","Immune-cell expansion alone does not establish cancer control"],
    cancers: ["urothelial", "melanoma", "rcc"], links: [{ label: "Wikipedia", url: W("Cytokine") },
    {"label":"NCI: cytokines and haematopoietic growth-factor support","url":"https://www.cancer.gov/about-cancer/treatment/types/immunotherapy/immune-system-modulators"},
    {"label":"Boyman et al.: selective IL-2-antibody complexes in mice (2006)","url":"https://pubmed.ncbi.nlm.nih.gov/16484453/"},
    {"label":"Nicola: cytokine receptor pleiotropy and redundancy (1994)","url":"https://pubmed.ncbi.nlm.nih.gov/7696967/"},
    {"label":"Lazear et al.: shared and distinct interferon functions (2019)","url":"https://pubmed.ncbi.nlm.nih.gov/30995506/"},
    {"label":"Zhang et al.: inducible IL-12 TILs, serum exposure and toxicity (2015)","url":"https://pubmed.ncbi.nlm.nih.gov/25695689/"},
    {"label":"Proleukin U.S. prescribing information: indications and boxed warnings","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f3c516ad-d405-4fbe-af6a-962080dbfa7d"}
  ], companies: ["amunix-pharmaceuticals", "asher-bio", "geneos-therapeutics", "granza-bio", "strand-therapeutics", "synsorybio", "werewolf-therapeutics", "xilio-therapeutics", "nammi-therapeutics", "neuregen-therapeutics", "siren-biotechnology", "stamford-pharmaceuticals", "trutino-biosciences", "ileukon-therapeutics", "saros-therapeutics"],

  notes: [
    "A cytokine is a signalling protein, and cytokine treatment supplies the protein or causes cells to produce it. The response depends on the molecule, the receiving receptor system, the cell's previous state and its exposure. A neighbourhood-message analogy is useful only to this extent: receiving a signal does not give a cell the correct cancer target or a literal instruction to fight it. IL-2 can influence lymphocyte growth and activity; interferons have different receptors and effects, so one cytokine name cannot stand for every immune signal.",
    "IL-2 can support regulatory T cells as well as other responding lymphocytes. Boyman and colleagues showed in mice that different IL-2-antibody complexes preferentially expanded different T-cell populations, including CD8 cells or CD4 regulatory T cells. The formulation changed the biological effect. Receptor composition, sensitivity and cell state therefore matter when studying a cytokine design; these mouse experiments do not establish human cancer benefit from every complex or from a larger dose.",
    "Circulating protein, local formulations and engineered cytokine-producing cells are different exposure strategies. A local origin does not guarantee local confinement: the signal can reach the circulation and persist elsewhere. In Zhang's 2015 dose-escalation study, 33 people with metastatic melanoma received transferred tumour-infiltrating cells engineered with inducible IL-12. Higher cell doses were associated with high serum IL-12 and interferon gamma and serious liver, fever and circulatory toxicities. The finding concerns that construct and regimen; it does not establish the safety or harm of every armoured cell product.",
    "The U.S. Proleukin prescribing information specifies aldesleukin for adults with metastatic renal cell carcinoma or metastatic melanoma. Its boxed warning includes potentially fatal capillary leak and requires administration in a hospital with an intensive-care facility. These are medicine-specific indications and precautions, not an indication or toxicity rate for all cytokines. Mechanistic plausibility or a diagnosis alone does not select a cytokine regimen.",
    "Haematopoietic growth factors support blood-cell production. For example, G-CSF used to reduce infection risk from low white-cell counts during cancer treatment is supportive care; that use does not by itself establish direct cancer killing. Endogenous cytokine biology, measuring a signal and administering a therapy are different activities. More activation is not automatically more useful immunity, and secretion by an engineered cell is not proof of confined exposure.",
    "A fictional spatial comparison has two equal-sized compartments with cytokine concentrations of 0 and 20 picograms per millilitre, while another has 10 and 10. Both means are 10, but the spatial patterns differ. A whole-sample mean cannot establish directed chemotaxis, which concerns movement in relation to a chemical pattern, an appropriate receiver and a route the cell can traverse. This simplified drawing neither measures migration nor states a requirement for every kind of cell movement.",
    "Measure exposure, receptor signalling, absolute cell number, cell state, functional activity and tumour outcomes separately. A larger sampled cell population can reflect more division, less loss or redistribution into the sampled compartment. A blood count does not by itself describe the tumour. Likewise, a high cytokine concentration or inflammation does not establish efficacy: persistence of useful activity and adverse effects need their own measurements.",
    "For a cytokine design, follow the molecule, formulation and route to tissue exposure, receptor and cell state, useful and unwanted responses, and then clinical outcomes and harms. This is a set of conditional questions. Antigen material, a recognition receptor and cytokine support perform different jobs: adding cytokine-producing armouring does not itself supply cancer specificity or a route into the tumour. The actual combination and disease setting need evidence.",
    "Suppose a fictional cytokine study reports more circulating T cells after treatment but no measurement of their targets or tumour recognition. The count changed, but the result does not identify which populations changed, whether division, survival or redistribution caused it, or whether those cells can recognise and affect the cancer. Functional testing, clinical outcomes, durability and safety remain separate questions."
  ]
},
  {
    id: "sting-agonist", kind: "technology", name: "STING & innate immune agonists", sections: ["immunotherapy"], status: "phase-2", asOf, wikipedia: W("Stimulator_of_interferon_genes"),
    tldr: "Drugs that trigger the cell's built-in 'virus alarm' inside tumours to summon immune cells.",
    summary: "STING agonists are cyclic dinucleotide or non-nucleotide molecules that activate the STING to TBK1 to IRF3 axis, driving type I interferon and summoning immune cells into the tumour. In models this converts cold tumours, but intratumoural STING agonists (ADU-S100, MK-1454) disappointed in the clinic. Systemic and antibody-conjugated versions (TAK-500, XMT-2056), TLR9 agonists (vidutolimod), and CD40 agonists (sotigalimab) continue in trials as the next attempts. The cGAS-STING pathway also mediates the immune effects of radiation and ADCs, which is why the biology remains important even where the drugs have not worked. Weak clinical activity to date is the central open problem. The simple version is a drug that sets off the cell's built-in virus alarm inside the tumour.",
    principle: "Cyclic dinucleotide or non-nucleotide agonists activate STING → TBK1 → IRF3 → type I interferon.",
    strengths: ["Converts cold tumours in models"],
    limitations: ["Weak clinical activity to date"],
    pathways: ["cgas-sting"],
    tags: ["frontier"], links: [{ label: "Wikipedia", url: W("Stimulator_of_interferon_genes") }],
  },

  // ======================= CELL THERAPY =======================
  {
    notes:[
  "Generation labels describe common signaling architectures. First-generation constructs use an activation domain, often CD3 zeta; second-generation designs add one costimulatory region; third-generation designs combine two. Fourth-generation and later labels vary across authors. More domains do not establish better patient outcomes. The full binder, spacer, anchor, signaling arrangement and cell preparation still matter.",
  "CD28 and 4-1BB are borrowed intracellular signaling regions, not separately administered receptors. Kawalekar compared metabolic and memory features in defined human-cell experiments. Ramos co-infused two specified second- and third-generation products in lymphoma; different expansion and persistence did not isolate comparative clinical benefit. Neither study ranks all products by signaling-domain name.",
  "Binding, surface CAR expression, activation, proliferation and completed target-cell killing are distinct readouts. Compare otherwise matched constructs, target-positive and target-negative cells, healthy-tissue targets and unstimulated activity. Hudecek found that particular IgG-derived spacers could support killing in a dish yet impair activity in mouse models through Fc interactions.",
  "A peptide-HLA target is an exception to blanket HLA-independent descriptions. Rafiq tested a WT1 peptide presented by HLA-A*02:01 in cell and mouse models; this was a proof of concept, not evidence that every intracellular protein or every HLA type is addressable by that construct.",
  "A 2024 preprint used a pooled signaling-domain library, repeated stimulation and single-cell sequencing to study how domain arrangement affected T-cell states over time. Its membrane-proximal-domain findings are construct-and-assay observations, not a clinical ranking of domains or a validation of pooled-screen hits as treatments.",
  "FDA initiated boxed-warning changes in 2024 for the risk of T-cell malignancies after the then-approved BCMA- or CD19-directed autologous CAR T-cell products. Its communication calls for lifelong monitoring for secondary malignancies. This is a scoped regulatory warning, not a claim that every type of engineered immune cell has the same risk.",
  "In June 2025, FDA eliminated REMS requirements for the named autologous CAR T-cell products in its notice. Product warnings and safety monitoring continued. The manufacturer postmarketing observational studies with 15-year follow-up described in that notice are different from the lifelong patient-monitoring statement in the earlier safety communication.",
  "A receptor-bearing cell, its genetic instructions and its receptor protein are different objects. For a protein-coding instruction, DNA is transcribed into RNA, and a ribosome translates usable messenger RNA into protein. Delivered messenger RNA starts at the translation step. Folding and transport to the membrane still have to occur before a surface receptor can bind its target. In this schematic sequence, simplified shapes and an arrow from recognition toward a response do not show that every cell expressed the receptor or completed killing.",
  "Kymriah’s product description illustrates why borrowed parts do not identify the whole product. Its CD19-binding region is a murine-derived single-chain antibody fragment, followed by a CD8-derived hinge and transmembrane region and the internal 4-1BB/CD137 and CD3-zeta signalling domains. CD8 here names the origin of structural segments, not a claim that the infused preparation contains only CD8 T cells. The label describes enrichment for T cells and permits other cell populations. Autologous source, domain names and architecture do not transfer Kymriah’s clinical results to another construct.",
  "Suppose two fictional CARs differ only in their hinge: both bind purified antigen, but only one kills antigen-bearing cells. Compare surface expression and the geometry of cell contact before concluding that affinity is the problem. Likewise, DNA-positive cells without killing leave RNA production, receptor folding and trafficking, actual binding and signalling as separate possible failure points. Hudecek’s R11 ROR1 experiments illustrate a product-specific constraint: a long spacer enabled recognition of its membrane-proximal epitope, while changes that reduced Fc-receptor binding improved activity in the tested mice. Longer is not a universal design rule. Treat the transmembrane segment as part of the finished construct: assess assembly, surface expression and interactions rather than presume it is a neutral anchor. Unstimulated signalling and responses to repeated target encounters also need separate assessment.",
  "In a fictional population of 100 cancer cells, 80 display target X and 20 do not. Killing the X-positive 80 leaves 20 survivors; ten times as many effector cells does not create X on them. For two targets, suppose 20 cells carry both X and Y, 60 carry X only, ten Y only and ten neither. An idealised either-target rule covers 90 cells, whereas a both-target rule covers 20. These are recognition-coverage calculations, not measured killing or healthy-tissue selectivity. Expression thresholds, tissue access and cell function still matter.",
  "TNBC describes a breast-cancer subtype, not one universal receptor target. A research programme, a positive stain or a named cell platform does not establish a treatment indication or rank safe recognition strategies. The cited TROP2 work supplies preclinical observations, and the ROR1 phase-I report supplies limited activity and infiltration observations in its actual mixed population. These studies do not supply a comparative clinical-benefit estimate for every antigen-directed product in TNBC. Individual labels and clinical studies define their own disease, regimen and eligibility scope.",
  "Kawalekar’s defined human-CAR experiments linked 4-1BB signalling to outgrowth of CD8 central-memory cells with greater respiratory capacity, fatty-acid oxidation and mitochondrial biogenesis. CD28-containing CARs produced effector-memory cells with a gene-expression pattern consistent with greater glycolysis. These are construct-and-system observations, not a ranking of clinical speed, persistence or safety by domain name. Other receptor parts, preparation, starting-cell state, target and disease setting remain relevant. Ramos simultaneously infused separately tracked second- and third-generation products. Their different expansion and persistence did not let a shared tumour response isolate either product’s clinical contribution."
], related:[
  "cellular-kinetics-and-persistence",
  "logic-gated-therapeutics",
  "muc1"
],
    id: "car-t", institutions: ["fact-cellular-therapy"], trials: ["nct07036250", "nct05759728", "nct07103668", "nct07523555", "nct06055439", "nct05652920"], aka: ["CAR-T", "CAR T cells", "CAR T-cell therapy", "Chimeric antigen receptor T cells"], dependsOn: ["apheresis-starting-material", "viral-vector-manufacturing", "cell-therapy-cold-chain", "cell-therapy-release-testing", "cell-therapy-orchestration-software"], kind: "technology", name: "CAR-T cell therapy", sections: ["cell-therapy"], status: "approved", asOf:"2026-11-12", since: 2017, wikipedia: W("Chimeric_antigen_receptor_T_cell"),
    tldr: "CAR-T therapy uses T cells carrying an engineered receptor. Approved products treat selected blood cancers, with product-specific eligibility and safety requirements.",
    summary: "CAR-T cell therapy uses T cells carrying a chimeric antigen receptor to recognize a target. FDA-approved products include CD19- and BCMA-directed CAR-T cells for selected blood cancers, including B-cell leukemias, lymphomas and multiple myeloma. The individual product label defines the treatment setting and eligibility. A common autologous approach collects a person’s T cells, engineers and expands them outside the body, then infuses them back; conditioning and follow-up depend on the protocol.\n\nA common antibody-derived CAR joins an external binding region, a hinge or spacer, a membrane anchor and intracellular signaling domains. The receptor is a protein; its encoding instructions and the living cell carrying it are different objects. Approved products and experimental constructs differ in cell source, receptor, manufacturing and clinical setting. Product labels and trial records define their actual uses; a platform name does not establish eligibility or benefit.\n\nIn early work, Gross, Waks and Eshhar joined antibody-variable regions to T-cell receptor components in 1989. Eshhar and colleagues subsequently tested single-chain antibody-binding regions joined to gamma or zeta signaling chains in 1993. These experimental designs helped separate recognition from the signaling machinery attached to it.\n\nFDA-approved examples include tisagenlecleucel, axicabtagene ciloleucel, lisocabtagene maraleucel, brexucabtagene autoleucel, obecabtagene autoleucel, idecabtagene vicleucel and ciltacabtagene autoleucel. Their labeled diseases, treatment settings and eligibility differ; the individual product records retain those distinctions.",
    principle: "A common CAR presents a binder outside the cell and signaling domains inside it, connected through a spacer and transmembrane region. Conventional surface-antigen recognition can bypass peptide-HLA presentation; specialized peptide-HLA-targeting CARs retain the relevant HLA and antigen-processing requirements.",
    strengths: ["Antigen-directed recognition in engineered T cells","Established uses for specific products in selected blood cancers"],
    limitations: ["Shared healthy-tissue targets and inflammatory, neurologic or blood-count harms","Manufacturing, access and cost depend on the product and setting","Antigen heterogeneity, cell state, tissue access and local inhibition"],
    targets: ["cd19", "bcma", "cldn18-2", "gpc3", "gprc5d", "cd70", "mesothelin"],
    drugs: ["ciltacabtagene-autoleucel","axicabtagene-ciloleucel","satricabtagene-autoleucel","tisagenlecleucel","lisocabtagene-maraleucel","brexucabtagene-autoleucel","obecabtagene-autoleucel","idecabtagene-vicleucel"],
    terms: ["crs", "icans"],
    technologies: ["in-vivo-car-t", "allogeneic-cell-therapy", "armored-car"], companies: ["cellogen", "adicet-bio", "allotera-therapeutics", "arcellx", "cargo-therapeutics", "century-therapeutics", "imugene", "leah-labs", "lyell-immunopharma", "modulari-t", "poseida-therapeutics", "tmunity-therapeutics", "cartesian-therapeutics", "vor-biopharma", "cartx-therapeutics", "juventas-cell-therapy", "dispatch-bio", "link-cell-therapies", "tikva-allocell", "brainchild-bio", "leucid-bio", "arovella-therapeutics", "avencell-therapeutics", "outpace-bio", "utc-therapeutics", "march-biosciences", "gyala-therapeutics", "triarm-therapeutics", "genomefrontier-therapeutics", "ticaros", "cero-therapeutics", "hemogenyx-pharmaceuticals", "vittoria-biotherapeutics", "arce-therapeutics", "moonlight-bio", "advesya", "famicordtx", "t-maximum-pharmaceutical", "mabswitch"], people: ["zelig-eshhar"], keyPapers: ["paper-gross-eshhar-chimeric-receptor-pnas-1989"], links: [
  {"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Chimeric_antigen_receptor_T_cell"},
  {"label":"Gross, Waks and Eshhar, the first chimeric antigen receptor (PNAS 1989)","url":"https://doi.org/10.1073/pnas.86.24.10024"},
  {"label":"Sotillo et al., Cancer Discov 2015: acquired mutations and alternative splicing of CD19 enable resistance to CART-19","url":"https://doi.org/10.1158/2159-8290.CD-15-1020"},
  {"label":"Deng et al., Nat Med 2020: single-cell features of the axicabtagene ciloleucel infusion product that track efficacy and toxicity in 24 patients","url":"https://doi.org/10.1038/s41591-020-1061-7"},
  {"label":"FDA: CAR T-cell product design, testing and clinical pharmacology guidance (2024)","url":"https://www.fda.gov/media/156896/download"},
  {"label":"NCI: T-cell transfer therapy and harms","url":"https://www.cancer.gov/about-cancer/treatment/types/immunotherapy/t-cell-transfer-therapy"},
  {"label":"Eshhar et al.: single-chain binding and signaling receptors (1993)","url":"https://pubmed.ncbi.nlm.nih.gov/8421711/"},
  {"label":"Hudecek et al.: spacer composition, Fc interactions and mouse-model activity (2015)","url":"https://pubmed.ncbi.nlm.nih.gov/25212991/"},
  {"label":"Kawalekar et al.: costimulatory domains and human T-cell metabolism (2016)","url":"https://pubmed.ncbi.nlm.nih.gov/26885860/"},
  {"label":"Ramos et al.: co-infused second- and third-generation constructs (2018)","url":"https://pubmed.ncbi.nlm.nih.gov/30309819/"},
  {"label":"Rafiq et al.: WT1 peptide-HLA-targeting CAR proof of concept (2017)","url":"https://pubmed.ncbi.nlm.nih.gov/27924074/"},
  {"label":"CAR signaling-domain library, pooled screening and single-cell analysis (2024 preprint)","url":"https://doi.org/10.1101/2024.02.26.582129"},
  {"label":"FDA: approved cellular and gene therapy products","url":"https://www.fda.gov/vaccines-blood-biologics/cellular-gene-therapy-products/approved-cellular-and-gene-therapy-products"},
  {"label":"FDA: elimination of REMS for named autologous CAR T-cell products (2025)","url":"https://www.fda.gov/news-events/press-announcements/fda-eliminates-risk-evaluation-and-mitigation-strategies-rems-autologous-chimeric-antigen-receptor"},
  {"label":"FDA: boxed-warning changes for T-cell malignancy risk (2024)","url":"https://www.fda.gov/vaccines-blood-biologics/safety-availability-biologics/fda-requires-boxed-warning-t-cell-malignancies-following-treatment-bcma-directed-or-cd19-directed"},
  {
  "label": "NCI: CAR T Cells, Engineering Patients’ Immune Cells",
  "url": "https://www.cancer.gov/about-cancer/treatment/research/car-t-cells"
},
  {
  "label": "FDA Kymriah prescribing information, section 11",
  "url": "https://www.fda.gov/media/107296/download"
},
  {
  "label": "Precision Tumor Recognition by T Cells With Combinatorial Antigen-Sensing Circuits. (2016)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/26830879/"
},
  {
  "label": "Combinatorial antigen recognition with balanced signaling promotes selective tumor eradication by engineered T cells. (2013)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/23242161/"
},
  {
  "label": "Preclinical evaluation of antitumor activity and toxicity of TROP2-specific CAR-T cells for treatment of triple-negative breast cancer. (2025)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/40903191/"
},
  {
  "label": "Phase I Study of ROR1-Specific CAR-T Cells in Advanced Hematopoietic and Epithelial Malignancies. (2025)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/39466024/"
}
],
  },
  {
    notes:[
  "Pfeiffer generated human CD19 CAR T cells with a CD8-targeted lentiviral vector in humanized mouse experiments. B-cell depletion and signs consistent with cytokine release syndrome were observed. This was a preclinical study, not a human clinical response report or evidence for freedom from inflammatory toxicity.",
  "Rurik used targeted mRNA lipid nanoparticles to generate transient CAR T cells in a mouse cardiac-injury model. It demonstrates a delivery/expression approach in that setting; it does not establish cancer efficacy, human safety or an interchangeable regimen for other delivery formats.",
  "The INT2104 registry NCT06539338 identifies a phase 1 B-cell-cancer study in the dated source check. A trial design or registry listing does not supply efficacy results, prove local slot availability or validate a platform-wide claim about conditioning.",
  "A prepared carrier can engineer the recipient's own cells. Vector or nanoparticle dose, ongoing delivery, newly generated cells, cell proliferation and receptor persistence should be measured separately. Stopping carrier administration need not immediately end the activity of cells already engineered.",
  "The cited preclinical results do not by themselves establish a fixed cost reduction, universal absence of lymphodepletion or automatic repeat-dose feasibility. Evaluate the actual process, monitoring and protocol rather than treating these as inherent benefits of all in vivo products.",
  "Ex vivo describes engineering outside the body followed by administration of a cell product. In vivo engineering administers an instruction-carrying product and generates modified cells inside the body; it is not the same as testing an ex vivo product in an animal. Location, recipient versus donor origin and transient versus stable genetic fate are separate attributes.",
  "In a fictional sampled population of 200 cells, 60 show the stated receptor measurement: 60/200 is 30% of that sampled population at that time. It does not specify a whole-body engineered-cell count, the administered carrier dose, tissue distribution, durable expression or killing. Sequence detection, expression, abundance and biological function need their own measurements.",
  "Hunter's 2025 study used targeted mRNA nanoparticles in healthy-donor and autoimmune patient cell samples, humanised mice and cynomolgus monkeys. Tumour control in mice and B-cell depletion in monkeys are not human treatment outcomes. Quality testing of the administered carrier also cannot sample every subsequently engineered cell or tissue; relevant biodistribution, expression, kinetics and safety evidence is still needed.",
  "Pfeiffer’s CD8-targeted lentiviral experiment used immunodeficient NSG mice engrafted with activated human blood mononuclear cells, with separate Raji-lymphoma conditions. Seven days after vector administration, CAR-positive cells represented 30 to 50 per cent of CD8 cells in peritoneal fluid, 10 to 35 per cent in spleen and 5 to 30 per cent in blood; fewer than 0.5 per cent of CD8-negative cells entered the CAR-positive gate. Vehicle and reporter-vector controls, CD19-cell depletion and the starting target-cell population mattered. These later fractions combine delivery with survival and antigen-driven expansion; they are not pure entry efficiencies, whole-body exclusivity or human efficacy results.",
  "A fictional 48-hour sample contains receptor expression in 60 of 200 viable T cells and five of 100 non-T cells. That is 30 per cent of T cells and five per cent of non-T cells; about 92 per cent of all expressing cells are T cells (60 of 65). None of these denominators establishes exclusive delivery. Compare matched carrier/receptor controls, antigen-positive and antigen-negative targets and relevant healthy cells. Sampling time, cell recovery and viable gates stay attached; a culture sample does not enumerate every tissue.",
  "A carrier delivers a genetic payload. Transduction is vector-mediated gene transfer; integration places DNA in a chromosome; expression produces an encoded RNA or protein. These are different events. Follow the causal chain in separate steps: administered carrier, distribution and cell contact, entry and usable cargo release, expression in identified cells, survival or expansion and movement, then recognition and effects in tumour and healthy tissue. Fluorescent uptake need not mean useful expression, and detecting two components somewhere in a sample does not show that the same cells express both. A carrier-lot aliquot, a timed blood sample and a tissue biopsy answer different questions. Sequence copies, viable receptor-positive fractions and controlled killing cannot substitute for one another or supply a universal release threshold. A carrier name does not determine its administration route. FDA’s CAR T-cell guidance focuses on ex vivo products; its principles do not by themselves validate a release specification for an in vivo carrier.",
  "Consider a complete fictional evidence packet, not a real therapy. Carrier P is a T-cell-directed lipid nanoparticle containing mRNA for CAR-X, which recognises extracellular epitope E on antigen X, and a separate supportive receptor R activated by trigger D. R does not add a cancer target, and P has no cell-elimination mechanism. One human T-cell donor supplies the culture work and selected human components of the mouse model. All functional experiments use lot A; lots B and C have identity data only. The matched cellular comparator uses the same carrier, CAR-X and total RNA without R, with D-present, D-absent and D-alone controls only where specified.",
  "In the fictional packet’s mixed-cell culture at 24 hours, 1,000 sampled viable cells include 100 T cells. RNA is detected in 60 T cells and 240 other cells; surface CAR in 50 T cells and 150 others; 40 T cells express both CAR and R. Unexposed controls are negative. CAR-positive T cells are 50/100, or 50 per cent of T cells, but T cells are 50/200, or 25 per cent of all CAR-positive cells. CAR-positive cells are 200/1,000, or 20 per cent of the whole sample; dual-positive T cells are 40/100, or 40 per cent of T cells. RNA, surface protein and coexpression are different readouts, and none measures killing or body-wide distribution.",
  "In a second fictional card, wells start with 100 target cells. At 48 hours, mean killing is 80 per cent for P with D, 55 per cent for P without D and 50 per cent for the matched CAR-X cells lacking R with or without D. Antigen-X-knockout targets and unengineered T cells with D give five per cent. The matched comparisons support an R/D-associated contribution in this donor’s assay, while the knockout and D controls test alternatives. Three wells are technical replicates from one donor, not three donors; no uncertainty interval is supplied. Tumour entry, general benefit and human safety remain different questions.",
  "The fictional healthy-epithelial-organoid card measures survival at 48 hours with D in both arms: 90 per cent with P-generated T cells and 95 per cent with matched CAR-X cells lacking R. There are two organoid donors and one T-cell donor. The five-percentage-point difference needs uncertainty and an interpretation of harm; no acceptable threshold is supplied. It neither tests every healthy tissue nor defines a clinical safety window. Expression, binding, cell injury in culture and organ injury in people are different observations.",
  "The fictional mouse card compares administered carrier P with empty carrier, with D in both arms and six mice per arm. One selected day-seven blood sample has 120 dual-positive cells among 200 T cells, or 60 per cent; this is not the six-mouse denominator, and two treated biopsies contain few engineered cells. Mean tumour volume is stated as 100 cubic millimetres at baseline, then 300 for P and 1,000 for control at day 28. P is 70 per cent smaller than control but three times the stated baseline: reduced growth, not regression below baseline or cure. Later follow-up, spread and causes of poor entry are missing. Without a matched CAR-X-without-R mouse arm, the comparison cannot isolate R’s contribution or establish every animal’s outcome.",
  "Matching the fictional payload identities of lots A, B and C does not transfer lot A’s functional results to B and C. These are three lots, not three independent cell donors; potency and post-storage performance need relevant measurements. Likewise, at 24 hours after D withdrawal the fictional support signal falls from 100 to 20 relative units versus 100 with continued D, an 80 per cent signal reduction, while 90 of 100 tracked cells remain. Those are three technical wells from the same donor. The result does not demonstrate cell elimination, absent CAR recognition or reversal of injury.",
  "The fictional packet contains no human study, so it has no clinical response or adverse-event denominator. An absent dataset is not a zero-per-cent rate, and target cells killed in culture are not people with a study-defined objective response. For each card, state the claim earned, the claim not earned and the next measurement, carrying product, specimen, comparator, donor or participant denominator, time and uncertainty. Do not fill one product’s missing evidence with another’s success. On a logarithmic axis, 100, 1,000 and 10,000 are tenfold steps rather than equal additive changes. Early human activity, comparative benefit and transfer to another product remain distinct evidence levels.",
  "Tuerxunyiming’s 2026 work provides another model-specific example. An engineered Sindbis-envelope lentiviral system delivered a CD19 CAR in NPG mice carrying human blood mononuclear cells and Raji lymphoma. The experiment compared repeated vector administration with infusion of cells engineered in culture, using selected mice with measured human T-cell engraftment. Tumour control and CAR-positive blood fractions were different readouts; the in vivo-generated group had a lower CAR-positive fraction than the infused-cell group. These are human-cell/mouse experiments, not treatment of people or proof of exclusive delivery in every tissue."
], related:[
  "cellular-kinetics-and-persistence",
  "ex-vivo-cell-expansion",
  "chain-of-identity-and-custody",
  "targeted-lnps",
  "lipid-nanoparticle",
  "lentiviral-vector",
  "aav-vector",
  "transposon"
],
    id: "in-vivo-car-t", links: [
  {"label":"Pfeiffer et al., In vivo generation of human CD19-CAR T cells results in B-cell depletion and signs of cytokine release syndrome (EMBO Molecular Medicine 2018)","url":"https://doi.org/10.15252/emmm.201809158"},
  {"label":"Rurik et al.: targeted mRNA nanoparticles in a mouse cardiac-injury model (2022)","url":"https://pubmed.ncbi.nlm.nih.gov/34990237/"},
  {"label":"ClinicalTrials.gov: INT2104 phase 1 oncology design, not an outcome report","url":"https://clinicaltrials.gov/study/NCT06539338"},
  {"label":"FDA: CAR T-cell development guidance, January 2024","url":"https://www.fda.gov/media/156896/download"},
  {"label":"Hunter et al., 2025: human-cell, humanised-mouse and monkey experiments","url":"https://pubmed.ncbi.nlm.nih.gov/40536974/"},
  {
  "label": "In vivo generation of human CD19-CAR T cells results in B-cell depletion and signs of cytokine release syndrome. (2018)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/30224381/"
},
  {
  "label": "A targeting lentiviral vector for generation of CAR-T cells in vivo. (2026)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/41844687/"
}
], kind: "technology", name: "In vivo CAR-T", sections: ["cell-therapy"], status: "phase-1", asOf:"2026-11-12", since: 2024,
    tldr: "An in vivo delivery product carries receptor-encoding instructions into cells inside the body. Its dose is different from the later number and activity of engineered cells.",
    summary: "Targeted delivery can supply CAR-encoding instructions to cells inside the body, using formats such as a viral vector or an mRNA lipid nanoparticle. This changes where engineering happens; it does not mean the active cells are donor-derived. Delivery targeting, cancer-antigen recognition, generated-cell abundance, receptor duration and useful function are separate questions. Conditioning, repeat dosing, safety and total cost belong to a specified product and protocol rather than to the in vivo label.",
    principle: "Deliver encoding instructions into a defined cell population in the body, then measure which cells are engineered, where they go, how long expression lasts and what those cells do.",
    strengths: ["Investigates an alternative to administering cells engineered outside the body","May reduce some separate ex vivo manufacturing steps in a specified process"],
    limitations: ["Cell targeting, off-target engineering and immune responses require measurement","Instruction dose does not specify final cell number or functional exposure","Conditioning, repeat dosing and cost are product- and protocol-specific"],
    technologies: ["car-t"],
    companies: ["abbvie", "adicet-bio", "capstan-therapeutics", "kelonia-therapeutics", "kernal-biologics", "strand-therapeutics", "azalea-therapeutics", "stylus-medicine", "vivacta-bio", "utc-therapeutics", "starna-therapeutics", "gigamune"],
    tags: ["frontier"],
  },
  {
    aka:["TIL therapy","tumor-infiltrating lymphocyte therapy","tumour-infiltrating lymphocyte therapy","TIL transfer"], notes:["Simoni studied human lung and colorectal tumor infiltrates and found CD8 T cells recognizing viral epitopes unrelated to the cancer. Tumor location did not establish tumor specificity. Its CD39 observations belong to those sampled populations, not a universal marker rule that proves the specificity of every manufactured cell.","Conventional alpha-beta T cells recognize peptide-HLA targets. A mixed TIL product can contain multiple specificities, but breadth must be tested against relevant naturally presenting targets and lesions. Polyclonality does not guarantee freedom from antigen/presentation escape or other resistance.","Record input tissue, culture/selection conditions, viable-cell yield, identity and the final receptor mixture. An expanding bystander clone can increase total yield while reducing the proportion with useful tumor recognition. A receptor repertoire measured before culture is not automatically the infusion product’s repertoire.","A pathology infiltration estimate describes a tissue feature under a specified scoring rule; it is not the viable-cell count recovered for manufacture, a dose, or proof of tumor reactivity. Functional studies need target material, HLA/antigen controls, suitable effectors, timing, units and readout context. Binding, target death and clinical outcome remain different endpoints.","Rohaan randomized patients with advanced melanoma to a specified TIL regimen or ipilimumab. In the reported intention-to-treat population, median progression-free survival was 7.2 versus 3.1 months. The TIL arm included lymphodepleting chemotherapy and high-dose IL-2; grade 3 or higher events in that arm were mainly chemotherapy-related myelosuppression. This comparison concerns the whole regimen and is not the lifileucel registration dataset or an isolated test of cells alone.","FDA’s Amtagvi source describes an autologous tumor-derived product and a defined previously treated melanoma use. The label requires conditioning and post-infusion IL-2 and carries serious regimen warnings. A manufacturing success, a registry listing or a positive cellular assay is not an independent clinical-benefit claim for another process or cancer. Its label lists the specific mechanism of action as unknown. General TIL recognition biology does not establish which clones or components explain an individual response.","The NCT05727904 registry identifies TILVANCE-301 as a randomized phase 3 study in untreated advanced melanoma, with a lifileucel/conditioning/IL-2 regimen plus pembrolizumab compared with pembrolizumab. The registry description does not supply an efficacy result or local availability for a participant.","TIL describes tissue origin, while added receptor or other genetic engineering describes an additional property. Experimental engineering can overlap that origin category; neither name implies the other. Tumor entry before collection also does not guarantee trafficking or useful persistence after transfer."], related:["tcr-t","car-t","cellular-kinetics-and-persistence"],
    id: "til-therapy", dependsOn: ["cell-therapy-cold-chain", "cell-therapy-release-testing", "cytokine-therapy"], kind: "technology", name: "TIL therapy", sections: ["cell-therapy"], status: "approved", asOf:"2026-11-08", since: 2024, wikipedia: W("Tumor-infiltrating_lymphocytes"),
    tldr: "TIL therapy expands lymphocytes collected from a tumor and returns a prepared cell product. Tissue origin, culture yield and useful tumor recognition are different claims.",
    summary: "Tumor-infiltrating lymphocyte therapy starts with cells collected from tumor tissue, commonly using their existing T-cell receptors. Infiltration does not prove that every cell recognizes the cancer. Culture and selection can change which clones become abundant; final viable-cell yield, recognition breadth and useful function need their own evidence. Manufacturing, conditioning, cytokine support and follow-up form a complete regimen with separate contributions and harms.\n\nLifileucel (Amtagvi) received accelerated FDA approval in 2024 for specified previously treated unresectable or metastatic melanoma. Its label defines the prior-treatment conditions and regimen. TILVANCE-301 is a phase 3 advanced-melanoma study of a lifileucel regimen with pembrolizumab versus pembrolizumab. Neither a registry design nor clinical evidence from one TIL process establishes benefit for every tumor or manufacturing method.",
    principle: "Recover tumor-derived lymphocytes, expand or select them through a specified process, characterize the final cells and evaluate the complete treatment regimen in its disease setting.",
    strengths: ["Can investigate multiple naturally occurring recognition specificities","Clinical evidence exists for specified melanoma products and regimens"],
    limitations: ["Usable tissue and suitable manufacture are required","Bystander cells and culture selection can limit useful recognition","Conditioning, cytokine support, cell infusion and follow-up have their own risks and access requirements"],
    drugs: ["lifileucel"],
    companies: ["iovance", "obsidian-therapeutics", "turnstone-biologics", "geek-gene", "sinorda", "instil-bio", "beijing-xunsheng-biomedical", "attachbio"],
    cancers: ["melanoma", "nsclc", "cervical", "advanced-melanoma"], institutions: ["sheba"], people: ["michal-besser", "jacob-schachter"], keyPapers: ["paper-besser-til-melanoma-intent-to-treat-ccr-2013"], links: [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Tumor-infiltrating_lymphocytes"},{"label":"Besser et al., intent-to-treat analysis of TIL therapy at Sheba (Clin Cancer Res 2013)","url":"https://doi.org/10.1158/1078-0432.ccr-13-0380"},{"label":"NCI: T-cell transfer therapy, collection, engineering and regimen harms","url":"https://www.cancer.gov/about-cancer/treatment/types/immunotherapy/t-cell-transfer-therapy"},{"label":"Simoni et al.: bystander CD8 T cells in human tumor infiltrates (2018)","url":"https://pubmed.ncbi.nlm.nih.gov/29769722/"},{"label":"Rohaan et al.: specified TIL regimen versus ipilimumab in advanced melanoma (2022)","url":"https://pubmed.ncbi.nlm.nih.gov/36477031/"},{"label":"FDA: AMTAGVI product, accelerated indication and supporting documents","url":"https://www.fda.gov/vaccines-blood-biologics/approved-blood-products/amtagvi"},{"label":"AMTAGVI label: tumor-derived cells and the complete regimen","url":"https://www.fda.gov/media/176417/download"},{"label":"ClinicalTrials.gov NCT05727904: TILVANCE-301 design and melanoma setting","url":"https://clinicaltrials.gov/study/NCT05727904"}],
  },
  {
    aka:["TCR-T","TCR T cells","TCR-engineered T cells","engineered T-cell receptor therapy"], notes:[
  "Morgan transferred receptor genes into autologous lymphocytes in a metastatic-melanoma study. Introducing selected recognition instructions differs from expanding a tumor-derived population with its existing receptors. Viral transduction describes a delivery method, not the definition of every receptor-engineering process.",
  "The conventional receptor uses paired alpha and beta chains alongside the CD3 complex. Cloning selected receptor coding sequences means copying instructions; one sequenced chain does not establish a complete functional receptor or its specificity. Expression and assembly in the finished cells require evaluation. The Dong structural study distinguishes recognition chains from associated signaling components. Bendle showed in mouse models that introduced and endogenous chains could form self-reactive mixed receptors; vector and cell-population changes reduced that model risk. This does not supply a clinical risk rate for every TCR-T product.",
  "Protein expression and HLA typing lie upstream of the displayed ligand. Antigen/HLA loss or impaired presentation can remove one recognition route; retaining another allele does not rescue a receptor requiring the lost allele. A different receptor using a retained allele needs its own specificity and functional evidence.",
  "In research, test paired receptor expression and naturally presenting targets, with relevant antigen/HLA removal and restoration, irrelevant peptides, unmodified effectors and healthy tissue. Multimer or peptide-loaded reagent binding is different from natural processing, target-cell death or patient benefit. This research validation is distinct from the approved product’s clinical testing rule.",
  "Cameron investigated fatal cardiac toxicity with one affinity-enhanced MAGE-A3 receptor and identified a cross-reactive Titin peptide presented by HLA-A*01 as the most likely cause. Earlier screening had not detected the hazard. This was a different receptor from the MAGE-A4 product Tecelra; stronger binding does not establish improved specificity or safety for either a new construct or an entire family.",
  "The June 2026 Tecelra label names HLA-A*02:01P, -A*02:02P, -A*02:03P and -A*02:06P and a MAGE-A4 tumor test in its indication, with a separate HLA-A*02:05P contraindication. The approval letter documents the adult conversion and pediatric expansion. These are product-specific regulatory scopes, not a general rule for every TCR-T.",
  "Conventional surface-antigen CARs and peptide-HLA-directed receptors have different recognition requirements, but peptide-HLA CARs also exist. The WT1/HLA-A*24:02 CAR study is a preclinical counterexample to saying all intracellular source antigens are unreachable by any CAR. A format change does not supply a missing required peptide-HLA complex.",
  "For a soluble TCR/CD3 protein, the dosed molecule supplies recognition and recruits available T cells. TCR-T instead supplies receptor-bearing living cells. Protein exposure, cell trafficking/persistence and useful target-dependent function need separate measurements; neither format wins by definition.",
  "In a fictional target cell, HLA allele A is lost while B remains. An A-restricted receptor loses that route; a B-restricted receptor still needs its own peptide to be processed and displayed. B2M is the shared light chain for many class-I complexes, whereas class-II HLA uses different alpha and beta chains. Neither one lost allele nor a change in interferon-induced display establishes complete loss of baseline presentation. Test the required allele, antigen and display conditions with matched viable targets rather than infer recognition from the HLA label. A conventional surface-antigen CAR has another dependency, and reduced class I alone does not guarantee NK-cell killing."
], related:["t-cell-engager","car-t","cellular-kinetics-and-persistence"],
    id: "tcr-t", dependsOn: ["apheresis-starting-material", "viral-vector-manufacturing", "cell-therapy-cold-chain", "cell-therapy-release-testing"], links: [
  {"label":"ClinicalTrials.gov NCT03967223: IGNYTE-ESO","url":"https://clinicaltrials.gov/study/NCT03967223"},
  {"label":"Morgan et al.: receptor gene transfer in metastatic melanoma (2006)","url":"https://pubmed.ncbi.nlm.nih.gov/16946036/"},
  {"label":"Cameron et al.: Titin cross-reactivity of one MAGE-A3 receptor (2013)","url":"https://pubmed.ncbi.nlm.nih.gov/23926201/"},
  {"label":"Dong et al.: human TCR-CD3 complex assembly (2019 abstract)","url":"https://pubmed.ncbi.nlm.nih.gov/31461748/"},
  {"label":"WT1/HLA-A*24:02 CAR study in experimental models (2018)","url":"https://pubmed.ncbi.nlm.nih.gov/30045840/"},
  {"label":"Liddy et al.: soluble TCR/CD3 experimental proteins (2012)","url":"https://pubmed.ncbi.nlm.nih.gov/22561687/"},
  {"label":"TECELRA label, revised June 2026: indication, contraindication and receptor design","url":"https://www.fda.gov/media/180565/download"},
  {"label":"FDA June 17, 2026 TECELRA conversion/expansion letter","url":"https://www.fda.gov/media/193220/download"},
  {"label":"FDA: CAR T-cell product-development guidance, including related engineered lymphocytes (2024)","url":"https://www.fda.gov/media/156896/download"},
  {"label":"Bendle et al.: mixed introduced/endogenous TCR chains and autoimmunity in mouse models (2010)","url":"https://pubmed.ncbi.nlm.nih.gov/20400962/"},
  {
  "label": "UniProt P61769, reviewed human B2M",
  "url": "https://www.uniprot.org/uniprotkb/P61769/entry"
},
  {
  "label": "UniProt P01903, reviewed human HLA-DRA",
  "url": "https://www.uniprot.org/uniprotkb/P01903/entry"
}
], kind: "technology", name: "TCR-T cell therapy", sections: ["cell-therapy"], status: "approved", asOf:"2026-11-12", since: 2024,
    tldr: "TCR-T supplies living T cells carrying a selected receptor that recognizes a specified peptide with its presenting HLA molecule. A source-protein name alone does not establish that target.",
    summary: "Conventional alpha-beta TCR-T introduces selected paired receptor-chain instructions into therapeutic T cells. The receptor recognizes a displayed peptide-HLA complex, rather than entering the tumor cell to bind the whole source protein. Natural processing, the required HLA allele, surface display, receptor expression and useful cell function remain different questions. This differs from administering a soluble TCR/CD3 protein that recruits other T cells.\n\nAfamitresgene autoleucel (Tecelra) is an approved TCR-T example. FDA initially approved it in 2024 and converted the specified adult use to traditional approval in June 2026, extending the indication to patients aged 12 and older. Its synovial-sarcoma indication retains prior-chemotherapy, selected HLA and MAGE-A4 testing requirements. The full label also contains exclusions and safety requirements; a broad HLA-A*02 label is not a complete eligibility rule.",
    principle: "Selected alpha-beta recognition chains operate with the cell’s CD3 signaling machinery. The intended target is the particular naturally displayed peptide-HLA complex, not genotype, RNA abundance or source protein alone.",
    strengths: ["Can investigate targets derived from intracellular proteins through peptide-HLA display","A selected receptor can confer recognition on engineered cells in defined settings"],
    limitations: ["Allele and antigen-processing/display dependencies can limit recognition","Cross-reactivity, healthy-tissue recognition and whole-regimen harms require evaluation","Receptor-positive cells still need appropriate state, tissue access and function"],
    targets: ["mage-a4", "gp100", "kras", "tp53"],
    drugs: ["afamitresgene-autoleucel"],
    cancers: ["sarcoma", "melanoma"], companies: ["affini-t-therapeutics", "neogene-therapeutics", "invocata", "alaunos", "medigene", "anocca", "captain-t-cell", "neowise-biotechnology", "zelluna", "outpace-bio"],
  },
  {
    notes:["In the 11-patient Liu study, cord-blood CD19 CAR-NK cells also encoded IL-15 and inducible caspase-9. No cytokine release syndrome, neurotoxicity or graft-versus-host disease was observed in that cohort, and low-level cells remained detectable for at least 12 months. This is neither proof of zero risk nor evidence for a uniformly short lifespan across CAR-NK platforms.","NK-92 is a continuously growing cell line, not a donor primary-cell preparation. Tang used CD33-CAR NK-92 cells irradiated with 10 Gy before infusion in an early AML study. Irradiation to limit proliferation makes its persistence question different from that of a cytokine-supported cord-blood product; the irradiation dose is not a universal CAR-NK treatment dose.","Reduced HLA display can reduce some inhibitory NK inputs, but activating signals, NK education and the actual cell-target pair still matter. CAR recognition, native NK activity and missing-self recognition are different inputs. An NK cell is not a natural killer T cell, and absence of a conventional TCR does not remove every compatibility, rejection or product-contamination concern.","Compare matched engineered and unmodified effector cells with target-positive and target-negative cells; retain donor/source, cell ratio and observation time. Attribution to a native receptor needs an independent perturbation with controls for changes in other ligands and target-cell viability. Binding, cytokine or granule release, viable-cell abundance and completed killing should not be substituted for one another.","Klichinsky engineered human macrophages and studied antigen-specific phagocytosis, inflammatory changes and tumor effects in cell and mouse models. These results describe a macrophage construct and those models; they do not establish a clinical efficacy or persistence ranking against CAR-NK or CAR-T."],
    id: "car-nk-macrophage", aka: ["CAR-NK", "CAR-NK cells", "CAR-macrophage"], dependsOn: ["viral-vector-manufacturing", "cell-therapy-release-testing"], related: ["nk-cell-therapy","trop2-car-il15-cord-blood-nk","nk-cell","cellular-kinetics-and-persistence","armored-car"], links: [{"label":"Liu et al., CAR-transduced natural killer cells in CD19-positive lymphoid tumours (NEJM 2020)","url":"https://doi.org/10.1056/NEJMoa1910607"},{"label":"Klichinsky et al., Human chimeric antigen receptor macrophages for cancer immunotherapy (Nature Biotechnology 2020)","url":"https://doi.org/10.1038/s41587-020-0462-y"},{"label":"Tang et al.: irradiated CD33-CAR NK-92 cells in an early AML study (2018)","url":"https://pubmed.ncbi.nlm.nih.gov/30034945/"},{"label":"Karre et al.: reduced self-MHC and rejection in mouse lymphoma models (1986)","url":"https://pubmed.ncbi.nlm.nih.gov/3951539/"},{"label":"FDA: CAR T-cell product design, testing and clinical pharmacology guidance (2024)","url":"https://www.fda.gov/media/156896/download"}], kind: "technology", name: "CAR-NK & CAR-macrophage", sections: ["cell-therapy"], status: "phase-1",
    tldr: "CAR-NK cells and CAR-macrophages add recognition receptors to different innate immune-cell families. Their native functions, starting materials and engineered support still matter.",
    summary: "A CAR adds a recognition input rather than replacing the effector cell. NK cells retain activating and inhibitory receptor inputs; macrophages have different functions, including phagocytosis and antigen handling. Donor blood, cord blood, pluripotent-cell-derived products and NK cell lines are distinct starting materials. Product-specific manufacture, expansion, persistence, tissue access, compatibility and harms need their own evidence. A small favorable blood-cancer study does not rank every NK product as safer than every T-cell product or establish solid-tumor benefit.",
    principle: "Add a specified CAR to an NK cell or macrophage and evaluate the receptor together with the cell family, source, engineering and native responses.",
    strengths: ["Different native effector functions can be investigated alongside CAR recognition","Some NK products have shown allogeneic feasibility in defined early studies"],
    limitations: ["Persistence depends on source and engineered support","Host rejection, inflammatory harms and manufacturing quality remain product-specific questions","Cell and mouse results do not establish clinical benefit in solid tumors"],
    technologies: ["car-t", "allogeneic-cell-therapy"],
    tags: ["frontier"], companies: ["indapta-therapeutics", "onk-therapeutics", "liberate-bio"],

    asOf: "2026-11-08",
  },
  {
    notes:["Disrupting TRAC can reduce endogenous alpha-beta T-cell receptor activity in a specified T-cell product. HLA changes address different recognition pathways. Broad loss of class I HLA can also expose cells to natural-killer-cell rejection. CD52 disruption has a distinct role in allowing an engineered product to resist an anti-CD52 conditioning antibody. These modifications are not interchangeable and are not required in every allogeneic cell type.","Qasim's 2017 report described two infants given donor CAR T cells edited at TRAC and CD52, with lymphodepletion including an anti-CD52 antibody and subsequent allogeneic transplantation. Benjamin's 2020 report combined early cohorts of seven children and fourteen adults; graft-versus-host disease, cytokine release syndrome, infections and treatment-related deaths were reported. A source or edit label does not eliminate clinical risks. These are small, uncontrolled reports, and their participant counts must not be added to later overlapping CALM analyses.","Dupouy's 2022 analysis concerns twenty-five adults in CALM, not a separate additional cohort to sum with earlier CALM recipients. Nine batches from six donors were infused. Blood transgene kinetics, flow cytometry, donor/product characteristics and conditioning exposure were examined separately. Associations between alemtuzumab exposure and expansion do not establish a randomised conditioning comparison or a universal need for deeper lymphodepletion.","Chen's 2024 report includes cell and mouse experiments plus nine treated people. Six recipients received B2M/TRAC-disrupted cells without observed in-body expansion or antitumour response; three received HLA-A/HLA-B/TRAC-disrupted cells and had early MRD-negative responses. These groups were small and differently prepared, not a randomised test of editing alone. No observed graft-versus-host disease in nine recipients is not proof of zero risk or durable benefit.","Chen's paper calls the study phase 1, whereas the captured NCT03229876 registry record has phase NA and overall status suspended, with a last posted update of 24 July 2023. This source/version discrepancy is retained; the paper is not evidence that treatment is currently available.","Persistence is a measured outcome, not a fixed property of donor origin. Blood detection differs from distribution across tissues and useful cell function; conditioning before a later transplant can end observation of a product. Availability also requires the intended source, construct version, lot, dose and recipient relationships to remain traceable."], related:["chain-of-identity-and-custody","cell-manufacturing-outcomes","in-vivo-car-t"],
    id: "allogeneic-cell-therapy", dependsOn: ["allogeneic-cell-banking", "cell-therapy-cold-chain", "cell-therapy-release-testing"], links: [{"label":"Depil et al., 'Off-the-shelf' allogeneic CAR T cells: development and challenges (Nature Reviews Drug Discovery 2020)","url":"https://doi.org/10.1038/s41573-019-0051-2"},{"label":"FDA: CAR T-cell development guidance, January 2024","url":"https://www.fda.gov/media/156896/download"},{"label":"Qasim et al., 2017: two-infant donor CAR T-cell report","url":"https://pubmed.ncbi.nlm.nih.gov/28123068/"},{"label":"Benjamin et al., 2020: early UCART19 child and adult cohorts","url":"https://pubmed.ncbi.nlm.nih.gov/33308471/"},{"label":"Dupouy et al., 2022: adult CALM cellular kinetics and manufacturing context","url":"https://pubmed.ncbi.nlm.nih.gov/36970059/"},{"label":"Chen et al., 2024: distinct edits, laboratory models and nine recipients","url":"https://pubmed.ncbi.nlm.nih.gov/38231412/"},{"label":"ClinicalTrials.gov: NCT03229876, dated registry state differs from publication wording","url":"https://clinicaltrials.gov/study/NCT03229876"}], kind: "technology", name: "Allogeneic (off-the-shelf) cell therapy", sections: ["cell-therapy"], status: "emerging", asOf:"2026-11-09",
    tldr: "Allogeneic cell therapy uses cells from someone other than the recipient. A banked product may avoid collecting the recipient's cells, but treatment still requires a suitable product and clinical preparation.",
    summary: "Autologous cells come from the intended recipient; allogeneic cells come from another person. This source distinction is separate from whether engineering occurs outside or inside the body and from whether a cell product or a carrier is administered. Donor-cell manufacture can provide inventory for later recipients, but usable supply, quality disposition, matching requirements, preparation and clinical eligibility still govern access. Donor immune cells can attack recipient tissues, while the recipient's immune system can reject donor cells. The relevant mechanisms depend on cell type, construct, edits, conditioning and setting.",
    principle: "Keep cell source, engineering location, administered material and each direction of immune recognition distinct; evaluate the actual construct and clinical cohort.",
    strengths: ["Can manufacture and bank donor-derived cells ahead of an individual recipient's treatment","Investigates supply from a source other than the recipient's own collection"],
    limitations: ["Gene editing does not guarantee absence of graft-versus-host disease or rejection","Conditioning, infections, toxicity and persistence require product-specific evidence","Banked inventory does not establish immediate availability, eligibility or clinical benefit"],
    technologies: ["car-t"],
    targets: ["cd70", "cd19"], companies: ["adicet-bio", "allotera-therapeutics", "century-therapeutics", "guardian-bio", "imugene", "indapta-therapeutics", "mendus", "onk-therapeutics", "orca-bio", "poseida-therapeutics", "captain-t-cell", "tikva-allocell", "senti-biosciences", "zelluna", "arovella-therapeutics", "avencell-therapeutics", "brightpath-biotherapeutics", "t-maximum-pharmaceutical", "edigene"],
  },
  {
    aka:["armored CAR","armoured CAR","CAR armoring","TRUCKs","T cells redirected for universal cytokine-mediated killing"], notes:["TRUCKs is commonly expanded as T cells redirected for universal cytokine-mediated killing. Early CAR-triggered IL-12 experiments recruited macrophage-dependent activity against antigen-loss cells in tumor models; this did not change the CAR binder itself. Universal is part of the name, not a result of universal cancer killing.","The TRUCK framework describes NFAT-responsive inducible IL-12 expression. NFAT can also respond to physiological T-cell receptor stimulation, so activation-responsive is not automatically CAR-exclusive or tumor-exclusive. Induction, secretion, distribution and systemic effects must each be measured.","Liu studied one cord-blood CD19 CAR-NK product combining interleukin-15 support and an inducible caspase-9 switch. Its outcomes do not isolate the effect of interleukin-15. Narayan tested a PSMA CAR with a dominant-negative TGF-beta receptor in a prostate-cancer phase 1 study; a fatal event occurred with severe cytokine release syndrome and concurrent sepsis. Resistance to one signal was not resistance to every inhibitory pathway or every harm.","Inducible production does not establish confinement. In a separate melanoma study, NFAT-driven IL-12-producing TILs were associated with high serum cytokines and serious systemic toxicity. Those cells were TILs, not the same CAR construct as the earlier TRUCK model.","Use otherwise matched cells with and without the added function, with relevant suppressive signals, repeated stimulation and healthy-tissue targets. Cytokine concentration, viable-cell abundance and killing at a specified time answer different questions. Greater expansion alone does not establish a wider safety window."], related:["logic-gated-therapeutics","cellular-kinetics-and-persistence","endogenous-promoter-payload-control","synthetic-cytokine-receptors"],
    id: "armored-car", dependsOn: ["car-t"], links: [{"label":"ClinicalTrials.gov NCT03373097: GD2-CART01 (Bambino Gesù phase 1/2)","url":"https://clinicaltrials.gov/study/NCT03373097"},{"label":"FDA: CAR T-cell product design, testing and clinical pharmacology guidance (2024)","url":"https://www.fda.gov/media/156896/download"},{"label":"Liu et al.: one cord-blood CAR-NK construct in lymphoid tumors (2020)","url":"https://doi.org/10.1056/NEJMoa1910607"},{"label":"Chmielewski et al.: inducible IL-12 and macrophage recruitment in tumor models (2011)","url":"https://pubmed.ncbi.nlm.nih.gov/21742772/"},{"label":"Chmielewski and Abken: TRUCK terminology and NFAT control (2012 review)","url":"https://pubmed.ncbi.nlm.nih.gov/22274776/"},{"label":"Narayan et al.: TGF-beta-insensitive PSMA CAR T-cell phase 1 study (2022)","url":"https://pubmed.ncbi.nlm.nih.gov/35314843/"},{"label":"Zhang et al.: inducible IL-12 TIL study and systemic toxicity (2015)","url":"https://pubmed.ncbi.nlm.nih.gov/25695689/"},{"label":"Chen et al.: endogenous-locus control of cytokine payloads in preclinical models (2025)","url":"https://pubmed.ncbi.nlm.nih.gov/40604285/"}], kind: "technology", name: "Armoured, logic-gated & next-gen CARs", sections: ["cell-therapy"], status: "phase-1", asOf:"2026-11-09",
    tldr: "Armored immune cells add a specified function, such as cytokine support or a changed response to an inhibitory signal. Each added function brings its own activity and safety questions.",
    summary: "Armoring adds functions beyond a basic recognition receptor. Designs include continuous, activation-induced or surface-held cytokine support and modifications to particular inhibitory responses. A dominant-negative TGF-beta receptor is a receptor variant that interferes with signaling; it is different from deleting a receptor gene. Recognition logic and cell-elimination switches are separate design choices. None guarantees access to every tumor, coverage of antigen-negative cells or protection of healthy tissue.",
    principle: "Specify the added gene or receptor, the cells carrying it, when and where it is expressed, and the response it is intended to change. Test its contribution alongside the behavior and harms of the complete product.",
    strengths: ["Experimental ways to address a specified inhibitory signal or add supportive activity"],
    limitations: ["Local triggering does not establish local-only exposure","Added functions may also increase harmful activity","Component effects and whole-product clinical outcomes need separate evidence"],
    technologies: ["car-t"],
    tags: ["frontier"], companies: ["modulari-t", "tmunity-therapeutics", "link-cell-therapies", "avencell-therapeutics", "outpace-bio", "utc-therapeutics", "moonlight-bio"],
  },

  // ======================= HORMONAL =======================
  {
    id: "endocrine-therapy", kind: "technology", name: "Endocrine therapy (SERMs, AIs, SERDs)", sections: ["hormonal"], status: "standard-of-care", asOf, since: 1977, wikipedia: W("Hormonal_therapy_(oncology)"),
    tldr: "Pills that block or remove oestrogen signalling, the mainstay of treatment for hormone-driven breast cancer for 50 years.",
    summary: "Tamoxifen (SERM), aromatase inhibitors (letrozole, anastrozole, exemestane), fulvestrant (injectable SERD), oral SERDs (elacestrant, imlunestrant approved 2025, camizestrant), and the PROTAC vepdegestrant (2026). Ovarian function suppression (goserelin) for premenopausal women. Five to ten years of adjuvant therapy halves recurrence; adherence is a major real-world problem.",
    principle: "Compete for ER (SERM), deplete oestrogen (AI), or degrade ER (SERD, PROTAC).",
    strengths: ["Oral, effective, cheap (generics)"],
    limitations: ["ESR1 mutations; menopausal symptoms, bone loss, adherence"],
    targets: ["estrogen-receptor"],
    drugs: ["vepdegestrant", "elacestrant", "abarelix", "aminoglutethimide", "diethylstilbestrol", "fluoxymesterone", "histrelin", "buserelin", "formestane"],
    cancers: ["breast-hr-positive"],
    technologies: ["protac-degrader", "cdk46-inhibitor"], related: ["pi3k-pathway-plus-endocrine", "cdk46-plus-endocrine"], links: [{ label: "Wikipedia", url: W("Hormonal_therapy_(oncology)") }],
  },
  {
    id: "androgen-deprivation", trials: ["hero"], kind: "technology", name: "Androgen deprivation & AR pathway inhibitors", sections: ["hormonal"], status: "standard-of-care", asOf, since: 1941, wikipedia: W("Androgen_deprivation_therapy"),
    tldr: "Androgen deprivation lowers testosterone or blocks its receptor, and has been the foundation of prostate cancer treatment since 1941 (Nobel Prize 1966).",
    summary: "GnRH agonists/antagonists (leuprolide, relugolix) plus AR pathway inhibitors (abiraterone, enzalutamide, apalutamide, darolutamide) as triplet or doublet therapy in metastatic hormone-sensitive disease. Combined with PARP inhibitors in HRR-mutant, with capivasertib in PTEN-deficient (2026), and with 177Lu-PSMA in castration-resistant disease.",
    principle: "Suppress ligand or block AR; resistance via AR amplification, splice variants, and lineage plasticity.",
    strengths: ["Prolonged disease control"],
    limitations: ["Metabolic and bone toxicity; castration resistance inevitable in metastatic disease"],
    targets: ["androgen-receptor"],
    cancers: ["prostate"], related: ["ai-pathology-to-adt"], links: [{ label: "Wikipedia", url: W("Androgen_deprivation_therapy") }],
  },

  // ======================= EPIGENETIC =======================
  {
    id: "epigenetic-drugs", related: ["idh-inhibitors", "kat6-inhibitors", "lsd1-inhibitors"], kind: "technology", name: "Epigenetic drugs (HDAC, DNMT, EZH2, IDH, menin, BET)", sections: ["epigenetics"], status: "approved", asOf, wikipedia: W("Epigenetic_therapy"),
    tldr: "Drugs that change how genes are switched on and off without changing the DNA itself.",
    summary: "Azacitidine/decitabine (DNMT) in MDS/AML, HDAC inhibitors in T-cell lymphoma, tazemetostat (EZH2; withdrawn worldwide March 2026 over secondary blood cancers), ivosidenib/vorasidenib (IDH), revumenib/ziftomenib (menin), and BET inhibitors (pelabresib in myelofibrosis). Solid tumour activity is limited so far except for IDH and EZH2 in defined subsets; combinations to re-sensitise to immunotherapy or hormone therapy are the hope.",
    principle: "Inhibit writers, erasers, or readers of DNA and histone marks, or scaffold proteins that tether them.",
    strengths: ["Differentiation rather than cytotoxicity", "Defined genetic subsets respond"],
    limitations: ["Broad effects; modest solid tumour activity"],
    targets: ["idh", "menin", "ezh2"],
    cancers: ["aml", "glioblastoma", "sarcoma"], companies: ["morphosys", "amphista-therapeutics", "foghorn-therapeutics", "oric-pharmaceuticals", "proxygen", "treeline-biosciences", "aptadir-therapeutics", "zhejiang-wenda-pharma", "tolremo-therapeutics"], links: [{ label: "Wikipedia", url: W("Epigenetic_therapy") }],
  },

  // ======================= SUPPORTIVE =======================
  {
    id: "scalp-cooling", machineFamily: "chemo-supportive", kind: "technology", name: "Scalp cooling (cold caps: DigniCap, Paxman)", aka: ["Cold cap", "Scalp hypothermia", "DigniCap", "Paxman Scalp Cooling System", "Amma", "DigniCap Delta", "Eva Scalp Cooling System", "Paxman Orbis"], sections: ["rejuvenation", "supportive-care", "chemotherapy", "devices"], status: "established", asOf: "2026-11-04", since: 2015, wikipedia: W("Scalp_cooling"), tags: ["complementary", "supportive-care", "evidence:strong", "hair-loss"],
    tldr: "A tightly fitted cap chilled to a few degrees above freezing, worn before, during and after each chemotherapy infusion, narrows the blood vessels of the scalp so less drug reaches the hair roots. In a randomised trial about half of women on taxane-based chemotherapy kept most of their hair, compared with none who went without.",
    summary: "Two machine-cooled systems are FDA-cleared: DigniCap (Dignitana; cleared December 2015 for breast cancer and extended to solid tumours in July 2017) and Paxman Scalp Cooling System (cleared April 2017 for breast cancer, extended to solid tumours in June 2018); manual gel caps (Penguin, Chemo Cold Caps, Arctic) that are swapped from dry ice every 20 to 30 minutes are the older, cheaper alternative. In the SCALP randomised trial (Nangia et al., JAMA 2017) 50.5% of women with early breast cancer using Paxman kept at least half their hair after four cycles of taxane, anthracycline or combined chemotherapy versus 0% of controls; the DigniCap cohort study (Rugo et al., JAMA 2017) reported 66.3% hair preservation on non-anthracycline taxane regimens.\n\nEfficacy depends on the regimen: best with weekly or three-weekly paclitaxel and docetaxel alone, intermediate with docetaxel-cyclophosphamide, and poorest with anthracycline-containing regimens such as AC or EC followed by taxane, where preservation rates in trials were low. It is not used in haematological malignancies because of the theoretical risk of scalp metastases, though a systematic review of more than 1,900 breast cancer patients found scalp metastases in about 0.6% with cooling, similar to the rate without. The cap adds around 30 minutes before and 60 to 90 minutes after each infusion to the chair time; headache, chills and scalp discomfort are common but mild. Cost and reimbursement are the main barriers: the NHS provides it in many but not all units, often funded by charities such as Walk the Walk, and US coverage varies with charities (HairToStay, the Rapunzel Project) subsidising fees or lending manual caps.\n\nSeven devices hold FDA authorisation under the scalp-cooling product code PMC (21 CFR 878.4360): DigniCap (De Novo DEN150010, 2015), Paxman (K163484, 2017), both extended to solid tumours (2017, 2018), DigniCap Delta (2019), Cooler Heads' portable Amma (K211526, 2021), indicated for home use, and Stemtech's Eva (K252289, November 2025). Dignitana became part of the Paxman Group in June 2025. Manual frozen-gel caps have no clearance under this code and have their own record. Shorter post-infusion cooling keeps most of the benefit with taxanes, which bears on chair time.",
    principle: "Cooling the scalp to around 18 to 22 degrees Celsius vasoconstricts scalp vessels, reducing blood flow and drug delivery to the follicle by a large fraction during the peak plasma phase, and lowers follicular metabolic rate so dividing matrix cells take up less drug.",
    strengths: ["Randomised evidence of hair preservation in about half of taxane-treated women", "FDA-cleared devices; no scalp metastasis excess in systematic review", "Meaningful reduction in one of the most feared side effects"],
    limitations: ["Much less effective with anthracyclines and not offered in haematological cancers", "Adds one to two hours to each chemotherapy visit; cold discomfort", "Cost and inconsistent NHS and insurer coverage"],
    cancers: ["breast-hr-positive", "tnbc", "breast-her2-positive", "ovarian", "prostate"], companies: ["paxman", "dignitana", "cooler-heads-care", "stemtech-medical-devices"], drugs: ["paclitaxel", "docetaxel", "cabazitaxel", "doxorubicin", "cyclophosphamide"], technologies: ["cytotoxic-chemotherapy", "frozen-gloves-compression-taxane", "oral-cryotherapy-mucositis", "minoxidil-chemotherapy-alopecia", "wigs-cranial-prosthesis"], keyPapers: ["paper-scalp-trial-jama-2017"], bottlenecks: ["b-toxicity-qol"], related: ["idea-moon-hair-preservation-for-all", "manual-cold-caps", "limb-cryocompression-devices", "oncology-infusion-chairs", "chemo-chair-comfort-devices-roadmap", "idea-mach-cooling-off-the-chair"],
    trials: ["scalp-trial", "dignicap-cohort-trial"], links: [{ label: "FDA De Novo DEN150010: DigniCap System (2015)", url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/denovo.cfm?id=DEN150010" }, { label: "FDA 510(k) K163484: Paxman Scalp Cooler (2017)", url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K163484" }, { label: "FDA 510(k) K211526: Cooler Heads portable scalp cooling system (2021)", url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K211526" }, { label: "FDA 510(k) K252289: Eva Scalp Cooling System (2025)", url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K252289" }, { label: "Lugtenberg et al., 20 versus 45 minutes of post-infusion cooling (Support Care Cancer 2022)", url: "https://doi.org/10.1007/s00520-022-07090-7" }, { label: "SCALP randomised trial (JAMA 2017)", url: "https://doi.org/10.1001/jama.2016.20939" }, { label: "DigniCap cohort with concurrent controls (JAMA 2017)", url: "https://doi.org/10.1001/jama.2016.21038" }, { label: "Scalp cooling and scalp metastases: systematic review and meta-analysis (Breast Cancer Res Treat 2017)", url: "https://doi.org/10.1007/s10549-017-4185-9" }, { label: "Paxman Scalp Cooling", url: "https://paxmanscalpcooling.com/" }, { label: "DigniCap", url: "https://www.dignicap.com/" }, { label: "Macmillan: scalp cooling", url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/hair-loss" }],
  },
  {
    id: "cardio-oncology", related: ["cardiac-biomarker-monitoring", "strain-echocardiography-gls", "cardiotoxicity-surveillance-recovery", "anthracycline-cardioprotection"], kind: "technology", name: "Cardio-oncology", sections: ["supportive-care", "rejuvenation"], status: "established", asOf,
    tldr: "Cardio-oncology builds heart risk assessment, monitoring and prevention into cancer care so patients can finish curative treatment without trading cancer for heart failure. It targets anthracycline and trastuzumab damage, checkpoint-inhibitor myocarditis and radiation heart disease using echocardiography, troponin tests and protective drugs; specialist clinics are concentrated in large centres.",
    summary: "Cardio-oncology integrates risk stratification, surveillance, and prevention of heart damage into cancer care, so that patients can complete curative therapy without trading cancer for heart failure. The problems it addresses include anthracycline and trastuzumab cardiotoxicity, checkpoint-inhibitor myocarditis, TKI hypertension and QT prolongation, and radiation heart disease. Tools are baseline and serial echocardiography with strain imaging, troponin and BNP monitoring, and cardioprotective drugs such as dexrazoxane, ACE inhibitors, and statins. As survivors live longer, cardiovascular disease becomes a leading competing cause of death, which is why the field has grown. Workforce and access are the limitations, since specialist clinics are concentrated in large centres. The simple version is protecting the heart while the cancer is being treated.",
    principle: "Risk stratification, surveillance, and prevention integrated into oncology care.",
    strengths: ["Enables completion of curative therapy"],
    limitations: ["Workforce and access"], trials: ["ccss"], links: [{ label: "ClinicalTrials.gov NCT01120353: Childhood Cancer Survivor Study (CCSS)", url: "https://clinicaltrials.gov/study/NCT01120353" }],
  },
  {
    id: "exercise-oncology", links: [{ label: "CHALLENGE: a structured exercise programme after chemotherapy improves survival in colon cancer (New England Journal of Medicine 2025)", url: "https://doi.org/10.1056/NEJMoa2502760" }, { label: "ClinicalTrials.gov NCT02750826: BWEL (Breast Cancer Weight Loss, Alliance A011401)", url: "https://clinicaltrials.gov/study/NCT02750826" }], kind: "technology", name: "Exercise & lifestyle oncology", sections: ["supportive-care", "prevention", "nutrition-lifestyle", "rejuvenation"], status: "established", asOf,
    tldr: "Structured exercise during and after treatment, which the CHALLENGE trial showed improves survival in colon cancer.",
    summary: "The CHALLENGE trial (NEJM 2025) randomised colon cancer survivors to a structured exercise programme and showed improved disease-free and overall survival, the first level-1 evidence that exercise changes cancer outcomes. Exercise also reduces fatigue, cardiotoxicity, and chemotherapy-induced neuropathy.",
    principle: "Aerobic and resistance training modulate insulin, inflammation, and immune function.",
    strengths: ["Cheap, safe, patient-controlled"],
    limitations: ["Delivery and adherence at scale"],
    cancers: ["colorectal", "tnbc", "breast-hr-positive"], companies: ["osara-health", "perci-health", "outperform-cancer"],
  },
  {
    id: "geriatric-assessment", related: ["g8-geriatric-screening", "ct-body-composition-sarcopenia"], links: [{ label: "GAP70+: a geriatric assessment before chemotherapy cut serious toxicity in older adults by a fifth (The Lancet 2021)", url: "https://doi.org/10.1016/S0140-6736(21)01789-X" }], kind: "technology", name: "Geriatric assessment", sections: ["supportive-care"], status: "established", asOf,
    tldr: "Geriatric assessment is a structured check of an older patient's fitness, memory, and support that predicts treatment tolerance better than age.",
    summary: "Geriatric assessment scores validated domains, including function, comorbidity, cognition, nutrition, and social support, to predict how an older patient will tolerate treatment and to guide dose and regimen choice, which age alone does poorly. The GAP70+ and GAIN trials showed that geriatric-assessment-guided management reduces severe chemotherapy toxicity by roughly 20% without compromising survival. ASCO recommends it for all patients aged 65 or over receiving chemotherapy. It reduces harm and improves shared decision-making, giving patients a clearer picture of what treatment will cost them. Time and uptake are the barriers, since the assessment adds clinic work that many services have not resourced. The simple version is a structured fitness check that tells the oncologist how much treatment an older person can safely take.",
    principle: "Validated domains (function, comorbidity, cognition, nutrition, social support) inform dose and regimen choice.",
    strengths: ["Reduces harm, improves shared decision-making"],
    limitations: ["Time and uptake"], journals: ["journal-of-geriatric-oncology"],
  },

  // ======================= AI & COMPUTATION =======================
  {
    id: "pathology-foundation-model", dependsOn: ["digital-pathology-ai", "ai-compute-platforms"], links: [{ label: "Chen et al., Towards a general-purpose foundation model for computational pathology (Nature Medicine 2024)", url: "https://doi.org/10.1038/s41591-024-02857-3" }, { label: "Vorontsov et al., A foundation model for clinical-grade computational pathology (Nature Medicine 2024)", url: "https://doi.org/10.1038/s41591-024-03141-0" }], kind: "technology", name: "Pathology & radiology foundation models", sections: ["ai-computation"], status: "emerging", asOf,
    tldr: "Pathology and radiology foundation models are AI networks pretrained without labels on over a million slides or scans (Virchow used 1.5 million), then adapted with small task heads to predict mutations, prognosis or treatment response from routine images. They power the FDA-cleared ArteraAI tools, but validation across hospitals and how regulators treat general-purpose models remain unsettled.",
    summary: "Virchow (Paige/MSK, 1.5M slides), UNI and CONCH (Harvard), Prov-GigaPath (Microsoft/Providence), PLUTO, and radiology models (Merlin, RadFM). They predict molecular alterations, prognosis, and treatment response from routine H&E and CT, and power the FDA-cleared ArteraAI tools. Multimodal patient-level models integrating genomics, imaging, and notes are in development (e.g., CanSim-style efforts, Tempus, Owkin).",
    principle: "Self-supervised pretraining (DINOv2, contrastive) on unlabelled images; frozen encoder plus small task heads.",
    strengths: ["Data-efficient adaptation", "Discover morphology-genotype links"],
    limitations: ["Validation across sites", "Regulatory treatment of general-purpose models"],
    technologies: ["digital-pathology-ai", "radiology-ai-screening"],
    companies: ["paige", "artera", "owkin", "tempus", "ataraxis-ai", "imagene-ai", "strand-ai"],
    tags: ["frontier"], related: ["pluto", "merlin-ct", "radfm"],
  },
  {
    id: "ai-trial-matching", links: [{ label: "Unger: most patients never get the chance to join a cancer trial, and when offered, half say yes (JNCI: Journal of the National Cancer Institute 2019)", url: "https://doi.org/10.1093/jnci/djy221" }], kind: "technology", name: "AI trial matching & clinical decision support", sections: ["ai-computation"], status: "established", asOf,
    tldr: "Software, increasingly LLM-based, that reads a patient's record and finds trials or guideline options they qualify for.",
    summary: "AI trial matching software extracts structured data from the electronic health record, matches it against parsed eligibility criteria, and ranks trials or guideline options a patient may qualify for. The problem it targets is that only around 5-8% of adult cancer patients enter trials, partly because matching is manual. Tools include TrialGPT (NIH), Tempus TIME, Massive Bio, Deep 6 AI, and hospital-built LLM matchers, and molecular tumour boards use OncoKB and CIViC annotation for variant interpretation. The approach scales expert knowledge and could reduce disparities in trial access, but hallucination risk and the need for validation are live concerns, and eligibility criteria are often ambiguous even to humans. Evidence of increased enrolment is emerging but not yet definitive. The simple version is software that reads a patient's record and finds the trials they could join.",
    principle: "Structured data are extracted from the EHR, matched against parsed eligibility criteria, and ranked.",
    strengths: ["Scales expert knowledge", "Reduces disparities in trial access"],
    limitations: ["Hallucination risk; validation", "Eligibility criteria are ambiguous"], people: ["razelle-kurzrock"], companies: ["navexio", "deep-6-ai", "outcomes4me", "triomics", "yuga-bio", "picnic-health", "antidote", "mytomorrows", "klineo", "galen", "opencancerai", "sagely-health", "radical-health", "trican-health"],
  },
  {
    id: "ai-drug-design", kind: "technology", name: "AI-driven drug & target discovery", sections: ["ai-computation", "drug-discovery"], status: "phase-2", asOf, wikipedia: W("Drug_design"),
    tldr: "Using machine learning to pick targets, design molecules and antibodies, and predict which ADC will work.",
    summary: "AlphaFold-enabled structure prediction, generative small-molecule design (Insilico, Recursion/Exscientia, Isomorphic), de novo antibody design (Absci, Generate, Nabla), and multi-omic target identification (DualityBio's DB-1329 CDCP1 ADC was AI-nominated). First AI-designed oncology molecules are in phase 2; none approved yet.",
    principle: "Deep learning over sequence, structure, and omics; active learning with wet-lab loops.",
    strengths: ["Speed of design cycles", "Novel target hypotheses"],
    limitations: ["Clinical validation lag", "Biology, not chemistry, is the usual failure point"],
    tags: ["frontier"], companies: ["genesis-molecular-ai", "iambic-therapeutics", "algen-biotechnologies", "aqemia", "bighat-biosciences", "blank-bio", "certis-oncology-solutions", "cytoreason", "evaxion", "harmonic-discovery", "iktos", "immunai", "lila-sciences", "nested-therapeutics", "nimbus-therapeutics", "relay-therapeutics", "resistancebio", "reverie-labs", "serinus-biosciences", "turbine", "valo-health", "amply-discovery", "big-picture-bio", "cure51", "manas-ai", "orakl-oncology", "charm-therapeutics", "signet-therapeutics", "accsalus-biosciences", "stonewise", "eisbach-bio", "proteinqure", "biolojic-design", "dewpoint-therapeutics", "ensem-therapeutics", "schrodinger", "numerion-labs", "benevolentai"], links: [{ label: "Wikipedia", url: W("Drug_design") }],
  },
  {
    id: "crispr-screens", related: ["cancer-cell-line-encyclopedias", "immune-tumour-coculture-models"], aka: ["genome-wide CRISPR screens", "genome-scale CRISPR knockout screens", "pooled CRISPR screens", "CRISPR knockout screens"], kind: "technology", name: "CRISPR functional genomics", sections: ["drug-discovery"], status: "established", asOf: "2026-11-10",
    tldr: "CRISPR screens test how genetic perturbations change cellular fitness or another measured phenotype in defined models.",
    summary: "In pooled CRISPR knockout screens, guide sequences track perturbed populations over time. Relative enrichment or depletion supports a fitness effect under the experimental conditions, including proliferation and survival. Guide delivery and editing efficiency, representation, unintended effects and copy-number-dependent cutting can confound interpretation. Independent perturbations and appropriate follow-up strengthen on-target attribution. Knockout and drug inhibition differ in extent, activity and duration, so a genetic hit does not establish a clinically useful drug.",
    principle: "Track guide representation or a specified phenotype after genetic perturbation, then evaluate controls and context before inferring gene function.",
    strengths: ["Systematic interrogation of genetic effects under stated conditions"],
    limitations: ["Editing and guide performance vary","Copy-number cutting effects and culture context can confound fitness","Genetic effects do not establish drug selectivity or clinical utility"],
    technologies: ["synthetic-lethality-approaches"], links: [{"label":"Defining a Cancer Dependency Map: which genes each cancer cell line cannot live without (Cell 2017)","url":"https://doi.org/10.1016/j.cell.2017.06.010"},{"label":"Shalem et al. 2014, Science: genome-scale CRISPR-Cas9 knockout screening in human cells","url":"https://doi.org/10.1126/science.1247005"},{"label":"Wang et al. 2014, Science: genetic screens in human cells using the CRISPR-Cas9 system","url":"https://doi.org/10.1126/science.1246981"},{"label":"Functional model interpretation: primary evidence","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC5709193/"},{"label":"Chronos primary method","url":"https://doi.org/10.1186/s13059-021-02540-7"},{"label":"Mou et al. 2017: exon skipping after editing","url":"https://doi.org/10.1186/s13059-017-1237-8"},{"label":"El-Brolosy et al. 2019: scoped genetic compensation","url":"https://doi.org/10.1038/s41586-019-1064-z"}], companies: ["algen-biotechnologies", "tango-therapeutics", "light-horse-therapeutics"], notes: ["Assay card. Input: enough viable cells to maintain guide representation through delivery, culture and replicate sampling; culture and sequencing consume material. Output: guide counts, log2 fold changes or analysis-specific gene-effect scores, not response probabilities. Retain library, model, screen duration, replicates, quality criteria, analysis version and data release. Non-targeting controls, reference essential genes and concordance across guides assess performance; poor delivery or low representation can leave a screen uninterpretable. Source: https://pmc.ncbi.nlm.nih.gov/articles/PMC3972032/ ; https://pmc.ncbi.nlm.nih.gov/articles/PMC4089965/ CRISPR stands for clustered regularly interspaced short palindromic repeats. A guide RNA directs Cas9 to a DNA sequence; repair after cutting can disrupt gene function. The intended target does not guarantee removal of every functional copy in every cell. Measure the edit and its consequence, rather than equate a barcode with complete knockout.","On-target follow-up is a reading rule: check the edit and functional consequence, reproduce the effect with independent guides or another suitable perturbation, and test whether restoration of the relevant function reverses the phenotype where feasible. Rescue has its own expression and construct controls; failed rescue alone is not proof against the target. This is a causal-comparison framework, not a claim that every published screen performed all these experiments. Responses can include compensation, alternative protein forms or changes in cellular state. Mou reported exon skipping and exon deletions after CRISPR editing, while El-Brolosy studied mutant-mRNA-dependent transcriptional adaptation in zebrafish and mouse models. These bounded findings explain why the resulting RNA, protein and phenotype need checking; they do not establish a universal frequency of compensation. Sources: https://doi.org/10.1186/s13059-017-1237-8 ; https://doi.org/10.1038/s41586-019-1064-z","Analysis scope. CERES estimates genetic effects while accounting for copy-number cutting effects. Chronos models perturbed population dynamics and was compared with other methods on two pan-cancer datasets and a longitudinal screen. Its reported control separation and bias advantages belong to those comparisons; correction does not make a poor experiment valid. Sources: https://pmc.ncbi.nlm.nih.gov/articles/PMC5709193/ ; https://doi.org/10.1186/s13059-021-02540-7 Cutting several amplified copies can impair growth through DNA damage independently of losing the targeted gene function. In a fictional barcode example, a guide falling from 100 to 20 reads per 10,000 reads has decreased in relative representation; it does not mean that 80 cells died. Proliferation, survival, editing and cutting effects need the separate checks described here.","Some dependencies are shared broadly and others enriched in a particular lineage or genomic context. A gene needed by normal cells may limit therapeutic selectivity. Knockout can remove a protein, whereas a drug may inhibit only one activity partly or temporarily. Guide abundance after perturbation is not RNA expression, and a negative gene-effect score follows the analysis convention rather than guaranteeing drug sensitivity. No screen alone establishes normal-tissue safety. In a fictional amplified-region example, a strong depletion signal becomes small after cutting-toxicity correction; the original rank alone cannot nominate an inhibitor. Source: https://pmc.ncbi.nlm.nih.gov/articles/PMC5709193/"]},

  // ======================= PREVENTION =======================
  {
    id: "hpv-vaccine", kind: "technology", name: "HPV & HBV vaccination", sections: ["prevention"], status: "standard-of-care", asOf, wikipedia: W("HPV_vaccine"),
    tldr: "Vaccines that prevent the viral infections behind cervical, throat, anal, and liver cancers. The most effective anti-cancer intervention ever created.",
    summary: "HPV and HBV vaccines are virus-like particle vaccines that induce neutralising antibodies, preventing the persistent oncogenic infections that cause cervical, throat, anal, and liver cancers. Gardasil 9 prevents around 90% of cervical cancers, and Scotland and Sweden report near-zero cervical cancer in fully vaccinated cohorts. The WHO targets cervical cancer elimination through its 90-70-90 goals for vaccination, screening, and treatment, and HBV vaccination has reduced liver cancer incidence in Taiwan and elsewhere. Single-dose HPV schedules expand coverage where multi-dose programmes are hard to deliver, and the vaccines are cheap at scale. Coverage gaps and vaccine hesitancy are the remaining obstacles. The simple version is that these vaccines prevent cancer outright, making them the most effective anti-cancer intervention ever created.",
    principle: "Virus-like particle vaccines induce neutralising antibodies preventing persistent oncogenic infection.",
    strengths: ["Prevents cancer outright", "Cheap at scale"],
    limitations: ["Coverage gaps, vaccine hesitancy"],
    cancers: ["cervical", "head-and-neck", "hcc"], related: ["cure-paths"], links: [{ label: "Wikipedia", url: W("HPV_vaccine") }], journals: ["tumour-virus-research"],
  },
  {
    id: "chemoprevention", companies: ["cancer-prevention-pharmaceuticals", "scirouter"], kind: "technology", name: "Chemoprevention & risk-reducing surgery", sections: ["prevention"], status: "standard-of-care", asOf, wikipedia: W("Chemoprophylaxis"),
    tldr: "Drugs or surgery for people at high inherited risk, before any cancer appears.",
    summary: "Tamoxifen/raloxifene/anastrozole halve breast cancer incidence in high-risk women (uptake is low). Aspirin reduces colorectal cancer in Lynch syndrome (CAPP2). Risk-reducing mastectomy and salpingo-oophorectomy in BRCA carriers; opportunistic salpingectomy for the general population. Prophylactic gastrectomy in CDH1 carriers.",
    principle: "Remove the at-risk tissue or block the hormonal/inflammatory driver of carcinogenesis.",
    strengths: ["Large absolute risk reduction in carriers"],
    limitations: ["Side effects deter uptake; surgery is irreversible"],
    targets: ["brca", "estrogen-receptor"],
    cancers: ["tnbc", "breast-hr-positive", "ovarian", "colorectal", "gastric"], related: ["cure-paths"], links: [{ label: "Wikipedia", url: W("Chemoprophylaxis") }], journals: ["cancer-prevention-research", "european-journal-of-cancer-prevention"],
  },

  // ======================= DEVICES =======================
  {
    id: "ttfields", machineFamily: "ablation", related: ["cryoablation-systems", "microwave-rf-ablation"], kind: "technology", name: "Tumour treating fields (TTFields)", sections: ["devices"], status: "approved", asOf, since: 2011, wikipedia: W("Tumor_treating_fields"),
    tldr: "Wearable electrodes that deliver alternating electric fields disrupting cancer cell division.",
    summary: "Optune approved in glioblastoma (EF-14), mesothelioma, and NSCLC after platinum (LUNAR, 2024). Optune Pax approved in Q1 2026 with chemotherapy for locally advanced pancreatic cancer (PANOVA-3), the first approval specific to that setting in nearly 30 years. Mechanism and magnitude of benefit remain debated.",
    principle: "Low-intensity, intermediate-frequency (100-300 kHz) alternating fields interfere with mitotic spindle assembly and cytokinesis.",
    strengths: ["Non-invasive, minimal systemic toxicity", "Combinable with any drug"],
    limitations: ["18+ hours/day wear", "Skin irritation", "Sceptical reception of some trial designs"],
    companies: ["novocure"],
    drugs: ["optune"],
    cancers: ["glioblastoma", "pancreatic", "nsclc", "mesothelioma"], links: [{ label: "Wikipedia", url: W("Tumor_treating_fields") }],
  },
  {
    id: "photoimmunotherapy", machineFamily: "ablation", trials: ["nct05374915"], kind: "technology", name: "Photoimmunotherapy & photodynamic therapy", sections: ["devices", "immunotherapy"], status: "approved", asOf, wikipedia: W("Photoimmunotherapy"),
    tldr: "An antibody carries a light-sensitive dye to the tumour; shining near-infrared light then bursts the cells.",
    summary: "Photoimmunotherapy conjugates the IR700 dye to an antibody; under 690 nm near-infrared light the dye undergoes a photochemical reaction that ruptures the cell membrane and causes immunogenic cell death, so only antibody-bound cells in the illuminated field are killed. Cetuximab sarotalocan (Akalux, Rakuten Medical), targeting EGFR, is approved in Japan (2020) for recurrent head and neck cancer, and a US phase 3 is ongoing. Classical photodynamic therapy with porfimer or ALA is used for skin, oesophageal, and bile-duct lesions. The treatment is highly selective, repeatable, and immunogenic. Light penetration limits it to accessible tumours, although fibre-optic delivery extends its reach. The simple version is that an antibody carries a light-sensitive dye to the tumour and shining light then bursts the cells.",
    principle: "IR700 dye conjugated to antibody undergoes photochemical reaction under 690 nm light, causing membrane rupture and immunogenic cell death.",
    strengths: ["Highly selective, repeatable", "Immunogenic"],
    limitations: ["Light penetration limits to accessible tumours"],
    targets: ["egfr"],
    cancers: ["head-and-neck"], links: [{ label: "Wikipedia", url: W("Photoimmunotherapy") }],
  },
  {
    id: "hyperthermia", machineFamily: "ablation", companies: ["eight-medical", "new-phase"], kind: "technology", name: "Hyperthermia", sections: ["devices", "radiation"], status: "established", asOf, wikipedia: W("Hyperthermia_therapy"),
    tldr: "Hyperthermia heats tumours to 40-43 °C to make radiation and chemotherapy work better.",
    summary: "Hyperthermia heats tumours to 40-43 °C, which impairs DNA repair and increases perfusion and drug delivery, making radiation and chemotherapy more effective without adding their toxicity. Regional and deep hyperthermia improve outcomes with radiotherapy in cervical cancer, recurrent breast cancer, and soft-tissue sarcoma (EORTC 62961). Magnetic nanoparticle hyperthermia (NanoTherm) is approved in Europe for glioblastoma. Despite this evidence it is underused outside Germany and the Netherlands, because the equipment and expertise are scarce and the technique sits awkwardly between radiotherapy and medical oncology. The simple version is that warming a tumour makes standard treatments work better, and the main barrier is access rather than evidence.",
    principle: "Heat impairs DNA repair and increases perfusion and drug delivery.",
    strengths: ["Radiosensitiser without added toxicity"],
    limitations: ["Equipment and expertise scarce"],
    cancers: ["cervical", "sarcoma", "extremity-soft-tissue-sarcoma", "glioblastoma"], links: [{ label: "Wikipedia", url: W("Hyperthermia_therapy") }], journals: ["international-journal-of-hyperthermia"],
  },

  // ======================= Areas from the Prometheus technology map that OnCo lacked (15 Sept 2026) =======================
  {
    id: "spatial-transcriptomics", related: ["htan"], companies: ["navignostics", "vicinity-bio"], dependsOn: ["spatial-biology-instruments", "rna-seq"], kind: "technology", name: "Spatial transcriptomics", sections: ["diagnostics","drug-discovery"], status: "emerging", asOf: "2026-11-10", wikipedia: W("Spatial_transcriptomics"),
    tldr: "These methods measure RNA signals while keeping information about position in a tissue section. A measured spot, an estimated cell boundary and an imputed value are different kinds of evidence.",
    summary: "Spatial transcriptomics measures RNA signals while retaining information about where they came from in a tissue section. Sequencing capture and imaging-based detection use different measurement units. A third approach, region-of-interest profiling such as digital spatial profiling, releases oligonucleotide tags only from regions an operator chooses; the method paper describes regions covering 1 to about 5,000 cells and panels of up to 44 proteins, or 1,412 genes with sequencing readout, on formalin-fixed tissue (Merritt and colleagues, 2020), so the result depends on how the regions were selected. The original sequencing-based method placed sections on arrays of positionally barcoded primers and kept two-dimensional position (Ståhl and colleagues, 2016); a capture spot is a positional barcode and can span several cells. MERFISH imaged 100 to 1,000 RNA species chosen by probe design (Chen and colleagues, 2015), a targeted gene set and not every transcript. Assigning molecules to cells depends on estimated cell boundaries: many methods approximate cell positions from nuclear stains, and distinguishing the boundaries of individual cells is challenging and can hamper downstream analysis; Baysor was developed to optimise boundaries from transcript composition and cell morphology (Petukhov and colleagues, 2022). Gene values imputed by aligning single-cell data to a spatial map, as Tangram does (shown in mouse brain; Biancalani and colleagues, 2021), are model outputs and not extra RNA molecules detected by the spatial assay.",
    principle: "Tissue sections are either overlaid on barcoded capture arrays whose oligonucleotides record position before sequencing, or hybridised with fluorescent probes read out over many imaging rounds with combinatorial barcodes.",
    strengths: ["Keeps position, which single-cell sequencing discards","Reveals immune exclusion, niches and cell neighbourhoods","Works on archived formalin-fixed tissue on newer platforms"],
    limitations: [
  "Costly and data-heavy, mostly research use",
  "A capture unit may contain contributions from more than one cell",
  "Assigning molecules to cells relies on estimated cell boundaries",
  "A section samples part of a tumour, and adjacent sections do not contain identical cells",
  "Genes imputed from a single-cell reference are model estimates, not measurements",
  "Region-of-interest profiling depends on which regions are chosen",
  "No agreed clinical assay yet"
],
    technologies: ["single-cell-spatial","digital-pathology-ai"],
    links: [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Spatial_transcriptomics"
  },
  {
    "label": "Stahl et al., Visualization and analysis of gene expression in tissue sections by spatial transcriptomics (Science 2016)",
    "url": "https://doi.org/10.1126/science.aaf2403"
  },
  {
    "label": "Merritt et al., Multiplex digital spatial profiling of proteins and RNA in fixed tissue (Nature Biotechnology 2020)",
    "url": "https://doi.org/10.1038/s41587-020-0472-9"
  },
  {
    "label": "Chen et al., Spatially resolved, highly multiplexed RNA profiling in single cells (Science 2015)",
    "url": "https://doi.org/10.1126/science.aaa6090"
  },
  {
    "label": "Petukhov et al., Cell segmentation in imaging-based spatial transcriptomics (Nature Biotechnology 2022)",
    "url": "https://doi.org/10.1038/s41587-021-01044-w"
  },
  {
    "label": "Biancalani et al., Deep learning and alignment of spatially resolved single-cell transcriptomes with Tangram (Nature Methods 2021)",
    "url": "https://doi.org/10.1038/s41592-021-01264-7"
  }
],

"terms": [],
"provenance": {
  "editedBy": "OnCo systematic education audit, round 3 (spatial and computational content): Crossref and Europe PMC identity checks, abstracts and selected full texts read",
  "editedOn": "2026-11-09",
  "note": "Added from Stahl 2016 (PMID 27365449), Merritt 2020 (PMID 32393914), Chen 2015 (PMID 25858977), Petukhov 2022 (PMID 34650268) and Biancalani 2021 (PMID 34711971): DOI and PMID resolved and matched on title, authors and year; numbers read in the abstracts. The Xenium segmentation documentation cited by the lesson could not be fetched (HTTP 429) and is not used."
},
"notes": [
  "Assay card for spatial transcriptomics (a reading guide, not a score). Measures and how: RNA with coordinates, by preparing a section, capturing or probing RNA, sequencing or imaging, decoding, registering positions and reporting the assignment rules. Input and tissue cost: protocol-compatible frozen or fixed sections; sectioning and molecular preparation consume allocated material, some workflows alter or destroy the assayed section, and re-scoring existing data consumes no new tissue. Output and units: gene counts per spot, bin or assigned cell, and decoded molecule coordinates, often in micrometres, with physical dimensions, normalisation and observed-versus-imputed labels kept. Thresholds: assay-specific gene or probe coverage, capture and decoding quality, background and segmentation criteria; no universal high-expression or neighbourhood cutoff. Failure modes: poor RNA, incomplete probe coverage, low capture, image-registration errors, inaccurate segmentation, spillover and unsuitable reference models. Limits: no automatic single-cell identity, complete transcriptome, whole-tumour representation, proven interaction or clinical selection rule. Validation tier: many workflows are research methods, so check analytical and intended-use validation for the exact assay and model; resolution claims and regulatory status are separate questions.",
  "Figure reading (fictional geometry, no platform scale): a capture spot is one barcode that can pool several cells. Imaging decodes six RNA coordinates, three for gene G and three for gene H (3 + 3 = 6), and these are coordinates, not cell labels. Moving the estimated cell masks changes which cell a coordinate is assigned to while the RNA stays fixed. Gene R is absent from the G and H panel, so a model-inferred R value is not an observed molecule, and RNA position is not protein or function."
]
},
  {
    id: "imaging-mass-cytometry", companies: ["navignostics", "ionpath"], kind: "technology", name: "Imaging mass cytometry", sections: ["diagnostics"], status: "emerging", asOf: "2026-11-12", wikipedia: W("Mass_cytometry"),
    tldr: "A way to stain a tumour slice for dozens of proteins at once using metal-tagged antibodies read by a mass spectrometer, giving a detailed map of which cells are where.",
    summary: "Imaging mass cytometry (Standard BioTools Hyperion) and multiplexed ion beam imaging (MIBI) label antibodies with rare-earth metal isotopes instead of fluorophores, then ablate the tissue pixel by pixel and read the metals by mass spectrometry. Forty or more markers can be measured on one section without spectral overlap, letting researchers phenotype immune and tumour cells in place and quantify their spatial relationships.",
    principle: "Metal-isotope-tagged antibodies bind the section; a laser or ion beam vaporises each pixel and time-of-flight mass spectrometry counts the isotopes, building one image per marker.",
    strengths: ["Forty-plus markers on one section","No autofluorescence or spectral overlap","Quantitative per-cell protein levels"],
    limitations: ["Slow acquisition and small fields of view","Expensive instruments","Research use only"],
    technologies: ["single-cell-spatial"],
    links: [
  { label: "Wikipedia", url: W("Mass_cytometry") },
  {
  "label": "Highly multiplexed imaging of tumor tissues with subcellular resolution by mass cytometry.",
  "url": "https://pubmed.ncbi.nlm.nih.gov/24584193/"
},
  {
  "label": "A Structured Tumor-Immune Microenvironment in Triple Negative Breast Cancer Revealed by Multiplexed Ion Beam Imaging.",
  "url": "https://pubmed.ncbi.nlm.nih.gov/30193111/"
},
  {
  "label": "Highly multiplexed immunofluorescence imaging of human tissues and tumors using t-CyCIF and conventional optical microscopes.",
  "url": "https://pubmed.ncbi.nlm.nih.gov/29993362/"
}
],

    notes: [
  "Historical method examples establish what was measured in those experiments. Giesen and colleagues reported simultaneous imaging of 32 proteins and protein modifications at subcellular resolution in human breast-cancer samples in 2014, using metal-tagged antibodies and high-resolution laser ablation coupled to mass cytometry. Ablation consumes the sampled area. The 32-marker example is not a present instrument ceiling, and Lin and colleagues' 2018 t-CyCIF study used conventional optical microscopes for up to 60-plex images of formalin-fixed, paraffin-embedded specimens. Each example retains its method, molecular layer and preparation.",
  "Keren and colleagues used multiplexed ion-beam imaging to measure 36 proteins in 41 triple-negative breast-cancer patients in 2018. Their image processing included cell segmentation, and spatial analysis distinguished immune-mixed from compartmentalised tumours. Organised border structures and compartmentalisation were linked to survival in this cohort. These observations neither establish that adjacent cells are functionally interacting nor constitute a trial selecting treatment by the pattern."
],
    related: [
  "spatial-proximity-metrics"
],
  },
  {
    id: "multiplex-immunofluorescence", companies: ["navignostics", "vicinity-bio", "strand-ai"], kind: "technology", name: "Multiplex immunofluorescence", sections: ["diagnostics"], status: "established", asOf: "2026-11-10", wikipedia: W("Immunofluorescence"),
    tldr: "This approach measures several protein markers in a tissue section, in one or more imaging cycles. Image analysis then estimates cells, counts and distances under defined rules.",
    summary: "Multiplex immunofluorescence measures selected protein-marker signals in a tissue section, using one or several imaging cycles. Cyclic methods build a high-plex image of one section by repeating staining, imaging and signal removal and then registering the cycles: t-CyCIF produced up to 60-plex images of formalin-fixed specimens and showed that antigenicity changes with cycle number (Lin and colleagues, 2018), and IBEX imaged more than 65 parameters in one section by iterative staining and chemical bleaching (Radtke and colleagues, 2020). A six-institution study of a six-plex PD-1 and PD-L1 panel, imaged with a locked-down image analysis algorithm, reported average intersite concordance of cell densities of R squared 0.75 in breast carcinoma and 0.72 in non-small cell lung cancer tissue microarrays (Taube and colleagues, 2021); that is reproducibility for one specified panel and workflow, not for multiplex immunofluorescence in general. A cell phenotype is a rule-based call from the measured panel, a density needs a stated denominator, and a distance needs a stated definition (cell centre or cell boundary).",
    principle: "Sequential antibody staining with fluorescent tyramide deposition, antibody stripping between rounds, and spectral unmixing to separate channels.",
    strengths: ["Uses standard pathology sections","Captures cell-to-cell proximity","Better predictor of immunotherapy response than single-marker IHC in pooled studies"],
    limitations: [
  "Panel design and validation are laborious",
  "Inter-laboratory standardisation incomplete",
  "Cell calls depend on estimated cell boundaries, and repeated cycles can change signal or tissue retention",
  "Closeness of an immune cell to a cancer cell does not show recognition or killing",
  "A virtual or computationally predicted marker map is a prediction, not performed staining",
  "Clinical use needs evidence for the specific panel, analysis and intended decision"
],
    technologies: ["digital-pathology-ai"],
    links: [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Immunofluorescence"
  },
  {
    "label": "Lin et al., Highly multiplexed immunofluorescence imaging of human tissues and tumors using t-CyCIF and conventional optical microscopes (eLife 2018)",
    "url": "https://doi.org/10.7554/eLife.31657"
  },
  {
    "label": "Radtke et al., IBEX: A versatile multiplex optical imaging approach for deep phenotyping and spatial analysis of cells in complex tissues (PNAS 2020)",
    "url": "https://doi.org/10.1073/pnas.2018488117"
  },
  {
    "label": "Taube et al., Multi-institutional TSA-amplified Multiplexed Immunofluorescence Reproducibility Evaluation (MITRE) Study (Journal for ImmunoTherapy of Cancer 2021)",
    "url": "https://doi.org/10.1136/jitc-2020-002197"
  }
],

"terms": [],
"provenance": {
  "editedBy": "OnCo systematic education audit, round 3 (spatial and computational content): Crossref and Europe PMC identity checks, abstracts and selected full texts read",
  "editedOn": "2026-11-09",
  "note": "Added from Lin 2018 (PMID 29993362, full text PMC6075866 read for the cycle-number and staining-order experiment), Radtke 2020 (PMID 33376221) and Taube 2021 (PMID 34266881, results read in the abstract and full text PMC8286792): DOI and PMID resolved and matched on title, authors and year. The existing meta-analysis sentence on checkpoint-inhibitor prediction was not re-verified in this batch and is unchanged."
},
"notes": [
  "Assay card for multiplex immunofluorescence (a reading guide, not a score). Input and tissue cost: a compatible fixed or frozen section; staining uses material and may involve repeated processing, and the section does not preserve viable cells for a killing assay. Output and units: marker images, fluorescence intensity in assay-dependent units, cell counts, cells per square millimetre, cell fractions and defined distances in micrometres. Controls: marker-positive and marker-negative material, comparison with validated single-marker staining, channel or spectral controls, background assessment, cycle alignment and boundary overlays. Thresholds: panel-specific marker and phenotype rules locked before the intended comparison and tested for reproducibility. Failure modes: autofluorescence, overlapping signals, nonspecific antibodies, staining-order effects, tissue loss, alignment errors and incorrect cell boundaries. Cannot establish: all proteins, live-cell behaviour, antigen specificity, actual killing or universal treatment eligibility. Validation: specific to the panel, staining, imaging, analysis and intended use.",
  "Figure reading (fictional, no cutoff): channels A and B are measured, registered marker images; the overlay adds estimated cell masks. Centre-to-centre distance includes the cell interiors, while boundary-to-boundary distance spans only the gap, so the two rulers give different numbers for the same pair. Proximity under either rule is not contact, recognition or killing."
]
},
  {
    id: "ai-pathology-scoring", related: ["ai-mitosis-detection"], tags: ["precision"], companies: ["vicinity-bio", "acurion", "imagenomix"], dependsOn: ["digital-pathology-ai"], kind: "technology", name: "AI scoring of biomarkers and grade on pathology slides", sections: ["diagnostics","ai-computation"], status: "approved", asOf, since: 2021, wikipedia: W("Digital_pathology"),
    tldr: "Software that reads digitised biopsy slides to detect cancer, grade it, and score biomarkers such as HER2, PD-L1 and Ki-67 more consistently than the eye alone.",
    summary: "Deep-learning models trained on whole-slide images now detect prostate cancer in biopsies (Paige Prostate, the first FDA-authorised AI pathology tool, 2021), assist Gleason grading, count mitoses, and quantify immunohistochemistry such as HER2, PD-L1 and Ki-67, where pathologist agreement is known to be poor at the decision thresholds. Newer models infer molecular states, such as microsatellite instability, directly from routine H&E slides.",
    principle: "Convolutional or transformer networks trained on annotated whole-slide images produce per-region probabilities that are aggregated into detections, grades or scores presented to the pathologist.",
    strengths: ["Reduces scoring variability at treatment thresholds","Triages slides and flags missed foci","Can infer molecular features from H&E alone"],
    limitations: ["Performance depends on scanner and stain domain","Regulatory clearance is product by product","Pathologist remains responsible for the diagnosis"],
    technologies: ["digital-pathology-ai","tmb-testing"], cancers: ["prostate","breast-her2-positive","nsclc"],
    links: [{ label: "Wikipedia", url: W("Digital_pathology") }],
  },
  {
    id: "radiomics", related: ["quantitative-imaging-biomarkers", "ct-body-composition-sarcopenia"], kind: "technology", name: "Radiomics", sections: ["imaging","ai-computation"], status: "emerging", asOf, wikipedia: W("Radiomics"),
    tldr: "Turning ordinary CT, MRI and PET scans into hundreds of measured features of shape and texture that computers relate to tumour biology and outcome.",
    summary: "Radiomics, a term coined in 2012, extracts quantitative descriptors of intensity, shape and texture from medical images and links them to diagnosis, prognosis or treatment response. Radiogenomics goes a step further by relating imaging phenotypes to tumour mutations and expression. Reproducibility across scanners and protocols has been the main obstacle, addressed by the Image Biomarker Standardisation Initiative and by deep-learning models trained end to end.",
    principle: "Segment the tumour, compute standardised feature sets or learned representations, then fit predictive models validated on external cohorts.",
    strengths: ["Uses images already acquired in routine care","Whole-tumour and longitudinal view without a biopsy","Can complement genomics where tissue is scarce"],
    limitations: ["Features vary with scanner and reconstruction","Many published signatures fail external validation","Few prospective trials"],
    technologies: ["low-dose-ct-screening"],
    links: [{ label: "Wikipedia", url: W("Radiomics") }],
  },
  {
    id: "ctc-capture", related: ["cellsearch-ctc-count", "parsortix-ctc-harvest"], companies: ["menarini-silicon-biosystems", "angle-plc", "cnside-diagnostics", "rgcc-international", "cancertain", "cytoastra", "screencell", "rarecyte", "cansera", "cellsbin"], kind: "technology", name: "Circulating tumour cell capture", sections: ["diagnostics","early-detection"], status: "approved", asOf: "2026-11-10", since: 2004, wikipedia: W("Circulating_tumor_cell"),
    tldr: "Fishing whole cancer cells out of a blood sample to count them or study them; the count is prognostic in breast, prostate and colorectal cancer.",
    summary: "Circulating tumour cells (CTCs) are rare cells shed by tumours into blood, roughly one per billion blood cells. The CellSearch system, cleared by the FDA in 2004, enriches them by EpCAM antibody capture and counts them; higher counts predict shorter survival in metastatic breast, prostate and colorectal cancer. Microfluidic and size-based methods capture EpCAM-negative cells, and single CTC sequencing and culture are used in research; CTC counts have not yet changed treatment in randomised trials.",
    principle: "Immunomagnetic or microfluidic enrichment of cells by surface antigen, size or deformability, followed by staining and enumeration or molecular analysis.",
    strengths: ["Whole cells allow protein, RNA and functional study","Prognostic in several metastatic cancers","Repeatable from blood"],
    limitations: ["Very rare cells, low yield","Antibody capture misses cells that have lost EpCAM","Changing therapy on CTC counts has not improved outcomes in trials"],
    technologies: ["liquid-biopsy"], cancers: ["breast-hr-positive","prostate","colorectal"],
    links: [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Circulating_tumor_cell"
  },
  {
    "label": "Circulating Tumor Cells, Disease Progression, and Survival in Metastatic Breast Cancer",
    "url": "https://doi.org/10.1056/NEJMoa040766"
  },
  {
    "label": "Circulating Tumor Cells and Response to Chemotherapy in Metastatic Breast Cancer: SWOG S0500",
    "url": "https://doi.org/10.1200/JCO.2014.56.2561"
  },
  {
    "label": "Tumor Cells Circulate in the Peripheral Blood of All Major Carcinomas but not in Healthy Subjects or Patients With Nonmalignant Diseases",
    "url": "https://doi.org/10.1158/1078-0432.CCR-04-0378"
  },
  {
    "label": "Yu et al.: epithelial and mesenchymal composition of circulating breast tumour cells (2013)",
    "url": "https://doi.org/10.1126/science.1228522"
  }
], notes: [
  "A count is a recovery under rules: enrichment concentrates candidate cells before identification, and each method selects. One established epithelial method captures with EpCAM, then checks cell shape, a nucleus, cytokeratin and absence of CD45, which is one operational definition and not a universal rule for all circulating tumour cells or tumour types. Physical methods select by size or deformability and remove or retain different cells, so marker independence is not unbiased recovery. A negative capture, such as zero qualifying cells in 7.5 mL, does not show that no tumour cells circulate and does not predict a ctDNA result, because free DNA fragments are a separate analyte.",
  "Scale and scope: in the CellSearch system, 1 of 344 healthy or non-malignant-disease subjects (0.3%) had two or more cells per 7.5 mL, against 36% of 2,183 samples from 964 people with metastatic carcinoma, with detection of two or more cells in 57% of prostate, 37% of breast, 30% of colorectal and 20% of lung cancer samples (Allard 2004). Spiked-cell recovery averaged at least 85% over 5 to 1,142 cells. These describe that device and population.",
  "Prognosis is not utility: in a prospective study of 177 people with metastatic breast cancer, a baseline count of 5 or more per 7.5 mL in the training set went with a median progression-free survival of 2.7 months against 7.0 (Cristofanilli 2004). In SWOG S0500, of 595 evaluable patients 123 with persistently raised counts were randomised to continue or change chemotherapy, and median overall survival was 10.7 and 12.5 months (P = .98), so that early-switch strategy did not extend survival (Smerage 2014). That bounds one strategy and neither validates nor excludes other uses of the count.",
  "Epithelial-to-mesenchymal transition (EMT) describes changes in cell state and marker expression. Yu and colleagues reported epithelial and mesenchymal changes in circulating breast tumour cells and associations with progression (2013). As a measurement inference, enrichment requiring an epithelial marker can under-represent cells with little of that marker; physical capture has different selection effects. Neither route is a census of all circulating tumour cells. The study does not establish one marker profile for every patient or every time point.",
  "A recovered candidate cell needs identification under the assay rules before it becomes a reported count. Record the blood volume, collection time relative to treatment, processing time, tube and transport conditions, recovery and staining controls, and how ambiguous images or failed preparations were handled. As a reading rule, a cell counted after fixation is not thereby shown to be alive or capable of forming a metastasis. Protein staining, RNA or DNA analysis, and culture are separate downstream measurements with their own material requirements; a count does not automatically supply a genome, a viable culture, the lesion that shed the cell or evidence that changing treatment helps."
],
  },
  {
    id: "cfdna-methylation-testing", dependsOn: ["liquid-biopsy", "methylation-profiling"], kind: "technology", name: "Cell-free DNA methylation tests", sections: ["early-detection","diagnostics"], status: "approved", asOf: "2026-11-10", since: 2024, wikipedia: W("Cell-free_fetal_DNA"),
    tldr: "Blood tests that read chemical marks on fragments of DNA shed by tumours; the marks tell cancer DNA from normal DNA and hint at where the cancer is.",
    summary: "Cancer cells carry characteristic DNA methylation patterns that survive in the cell-free DNA shed into blood. Methylation-based tests use bisulfite or enzymatic conversion followed by targeted sequencing to detect a cancer signal and predict its tissue of origin; the multi-cancer early detection test Galleri works this way, and Guardant's Shield, the first blood test approved by the FDA for colorectal cancer screening in 2024, combines methylation with other cfDNA signals. Methylation also underpins some minimal residual disease assays.",
    principle: "Extract cfDNA from plasma, convert unmethylated cytosines, sequence targeted regions, and classify methylation patterns against reference tumour and normal profiles.",
    strengths: ["Tissue-agnostic cancer signal","Can point to the tissue of origin","Approved use in colorectal screening"],
    limitations: ["Sensitivity for early-stage cancers is modest","False positives and unclear follow-up pathways","Outcome benefit of multi-cancer screening still under trial"],
    drugs: ["galleri"], technologies: ["liquid-biopsy","mced","methylation-profiling"], cancers: ["colorectal"],
    links: [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Cell-free_fetal_DNA"
  },
  {
    "label": "Comprehensive human cell-type methylation atlas reveals origins of circulating cell-free DNA in health and disease",
    "url": "https://doi.org/10.1038/s41467-018-07466-6"
  }
], notes: [
  "How the read works: DNA methylation adds chemical marks to DNA bases without changing sequence, and many assays examine methylated cytosines next to guanines (CpG sites), using chemical or enzymatic conversion or other technologies. Normal cell types carry their own methylation patterns, so a mark is not a cancer label. Deconvolution estimates how much each reference cell type contributes to a mixture: a methylation atlas of 25 tissues and cell types attributed healthy-donor plasma cfDNA to white blood cells (55%), erythrocyte progenitors (30%), vascular endothelial cells (10%) and hepatocytes (1%), and its contributions also matched sepsis and islet transplantation (Moss 2018).",
  "Scope: a classifier assigns a score or category and a deconvolution assigns source fractions, and both depend on the reference set, the model and the cut-off. Because tissue injury also adds normal DNA from an organ, an inferred organ contribution alone is not proof of cancer. A model validated in one population, collection protocol and assay version does not transfer automatically, and a score is not necessarily a calibrated probability.",
  "A reference atlas is a collection of profiles from known cell or tissue sources against which a mixture is compared. As a model-reading rule, a source absent from the reference set cannot be assumed absent from the specimen: the model may leave it unresolved or attribute it imperfectly to represented sources. Keep the methylated-site fraction, estimated source fraction and classifier score distinct. Known-source mixtures, process and batch controls, and evaluation in the intended specimen and population test different parts of that inference."
],
  },
  {
    id: "gene-expression-prognostic-assays", companies: ["raiz-diagnostics"], kind: "technology", name: "Gene-expression prognostic assays", sections: ["diagnostics"], status: "approved", asOf, wikipedia: W("Gene_expression_profiling_in_cancer"),
    tldr: "Tests that measure a set of genes in a removed tumour to estimate how likely it is to come back, so patients with low scores can safely skip chemotherapy.",
    summary: "Multigene expression assays run on resected tumour tissue estimate recurrence risk and, for some, chemotherapy benefit. Oncotype DX (21 genes) and MammaPrint (70 genes) are the best known in breast cancer, where the TAILORx and MINDACT trials showed that most women with low scores gain nothing from chemotherapy; Prolaris and Decipher serve the same purpose in prostate cancer. They are recommended in major guidelines and reimbursed in many systems.",
    principle: "RNA is extracted from fixed tumour tissue and the expression of a fixed gene panel is measured by RT-PCR or microarray and combined into a validated risk score.",
    strengths: ["Prospective trial evidence for de-escalating chemotherapy","Standard of care in early hormone-positive breast cancer","Adds to clinical and pathological factors"],
    limitations: ["Cost and turnaround","Validated mainly in specific subtypes and stages","Scores near thresholds remain hard to act on"],
    drugs: ["oncotype-dx","mammaprint","prolaris"], cancers: ["breast-hr-positive","prostate"],
    links: [{ label: "Wikipedia", url: W("Gene_expression_profiling_in_cancer") }],
  },
  {
    id: "oncology-pharmacogenomics", related: ["dpyd-genotyping", "ugt1a1-genotyping", "tpmt-nudt15-genotyping"], kind: "technology", name: "Pharmacogenomic testing before chemotherapy", sections: ["diagnostics","chemotherapy","supportive-care"], status: "established", asOf: "2026-10-20", tags: ["precision"], wikipedia: W("Pharmacogenomics"),
    tldr: "Testing a patient's inherited genes before certain chemotherapies to spot people who cannot break the drug down and would suffer severe, sometimes fatal, side effects.",
    summary: "Germline variants alter how patients handle several cancer drugs. DPYD variants reduce dihydropyrimidine dehydrogenase and cause severe toxicity with fluorouracil and capecitabine; UGT1A1*28 raises irinotecan toxicity; TPMT and NUDT15 variants make thiopurines dangerous. Pre-treatment DPYD testing is required or recommended across much of Europe and by the NHS, and dose reduction guided by genotype has been shown to cut severe toxicity; matched comparisons of survival in DPYD and UGT1A1 carriers given reduced doses have not found it shortened overall.",
    principle: "Genotype defined variants from blood or saliva and adjust starting doses according to consortium guidelines such as those of the Clinical Pharmacogenetics Implementation Consortium.",
    strengths: ["Prevents severe and fatal toxicity","Cheap, once-per-lifetime test","Guideline-backed dose tables"],
    limitations: ["Covers only known variants and ancestries unevenly","Turnaround can delay treatment","Uptake outside Europe remains patchy"],
    drugs: ["fluorouracil","capecitabine","irinotecan"],
    links: [{ label: "Wikipedia", url: W("Pharmacogenomics") }],
  },
  {
    id: "ai-mammography-screening", machineFamily: "imaging", dependsOn: ["mammography", "ai-compute-platforms"], kind: "technology", name: "AI-assisted mammography screening", sections: ["early-detection","ai-computation"], status: "approved", asOf, wikipedia: W("Mammography"),
    tldr: "Software that reads screening mammograms alongside or before radiologists, catching more cancers and cutting the reading workload in large trials.",
    summary: "Deep-learning readers for mammography have regulatory clearance in Europe and the United States and are being tested as a replacement for one of the two human readers used in European screening programmes. The Swedish MASAI randomised trial found AI-supported screening detected more cancers with a lower reading workload, and the Danish and German programmes have reported similar results in practice. Risk-prediction models from the same images are being studied to personalise screening intervals.",
    principle: "Convolutional networks trained on millions of mammograms produce a suspicion score per breast; low-scoring exams go to single reading and high-scoring ones are flagged for human review or recall.",
    strengths: ["Higher cancer detection in randomised and real-world studies","Large reduction in radiologist workload","Consistent performance across sites"],
    limitations: ["Long-term effect on interval cancers and mortality still being measured","Regulatory and liability frameworks vary","Risk of over-detection needs monitoring"],
    technologies: ["dermoscopy-ai"], cancers: ["breast-hr-positive","breast-her2-positive","tnbc"],
    links: [{ label: "Wikipedia", url: W("Mammography") }],
  },
  {
    id: "ai-endoscopy-detection", machineFamily: "endoscopy", companies: ["maia-labs"], kind: "technology", name: "AI polyp detection in colonoscopy", sections: ["early-detection","ai-computation"], status: "approved", asOf, since: 2021, wikipedia: W("Colonoscopy"),
    tldr: "Real-time software that highlights polyps on the colonoscopy screen, helping doctors find more of the growths that could become bowel cancer.",
    summary: "Computer-aided detection systems such as GI Genius (Medtronic, FDA authorised 2021) analyse the live video during colonoscopy and draw a box around suspected polyps. Randomised trials show higher adenoma detection rates, mainly of small lesions, while the effect on interval cancer remains to be shown; computer-aided characterisation aims to tell benign from precancerous polyps to avoid unnecessary removal.",
    principle: "A neural network runs on each video frame and marks regions whose appearance matches polyps in training data, with adjustable sensitivity.",
    strengths: ["Higher adenoma detection in randomised trials","Works with existing scopes","Reduces miss rates between endoscopists"],
    limitations: ["More small polyps found, more resections and pathology","Unproven effect on cancer incidence and mortality","False alarms slow procedures"],
    technologies: ["colorectal-screening"], cancers: ["colorectal"],
    links: [{ label: "Wikipedia", url: W("Colonoscopy") }],
  },
  {
    id: "cns-tumour-methylation-classifier", kind: "technology", name: "Methylation classifier for brain tumours", sections: ["diagnostics"], status: "established", asOf, since: 2018, wikipedia: W("DNA_methylation"),
    tldr: "A test that reads the methylation pattern of a brain tumour's DNA and matches it to a reference library, giving a more reliable diagnosis than the microscope alone.",
    summary: "Brain tumour diagnosis by microscopy is notoriously inconsistent. In 2018 the Heidelberg group published a machine-learning classifier that assigns tumours to one of more than eighty methylation classes from a genome-wide methylation array, reclassifying a meaningful share of cases and revealing new entities. The approach is now embedded in the WHO classification of central nervous system tumours and used in reference neuropathology centres.",
    principle: "DNA methylation is measured on an array, and a random-forest classifier trained on thousands of reference tumours returns the best-matching class with a calibrated score.",
    strengths: ["Reproducible, objective diagnosis","Detects rare and new entities","Works on small or archived samples"],
    limitations: ["Array cost and turnaround","Unclassifiable cases remain","Requires reference-centre expertise"],
    technologies: ["methylation-profiling"], cancers: ["glioblastoma","brain-tumours","childhood-cancers"],
    links: [{ label: "Wikipedia", url: W("DNA_methylation") }],
  },
  {
    id: "clonal-evolution-tracking", kind: "technology", name: "Tumour clonal evolution tracking", sections: ["drug-discovery","diagnostics"], status: "emerging", asOf, wikipedia: W("Somatic_evolution_in_cancer"),
    tldr: "Sequencing several parts of a tumour, or blood over time, to draw its family tree of mutations and see which branches drive relapse and resistance.",
    summary: "Multi-region and longitudinal sequencing reconstruct a tumour's subclonal architecture and phylogeny. Studies such as TRACERx in lung cancer showed that chromosomal instability and subclonal expansion predict relapse, and that circulating tumour DNA can track which clones survive treatment. The concepts of truncal versus branch mutations shape target selection: a drug against a truncal mutation hits every cell, one against a branch mutation hits only a subclone.",
    principle: "Sequence multiple tumour regions or serial plasma samples, cluster mutations by cellular fraction, and build phylogenetic trees that order events and quantify heterogeneity.",
    strengths: ["Explains resistance and relapse mechanistically","Distinguishes truncal targets from subclonal ones","Now feasible from blood over time"],
    limitations: ["Sampling still misses clones","Analysis methods vary","Not yet a clinical test"],
    technologies: ["liquid-biopsy","mrd-testing"], cancers: ["nsclc"],
    links: [{ label: "Wikipedia", url: W("Somatic_evolution_in_cancer") }],
  },
  {
    id: "tigit-blockade", kind: "technology", name: "TIGIT blockade", sections: ["immunotherapy"], status: "phase-3", asOf, wikipedia: W("TIGIT"),
    tldr: "Antibodies against TIGIT, a brake on T cells and natural killer cells, tested alongside PD-L1 drugs; the biggest lung cancer trials so far have failed.",
    summary: "TIGIT is an inhibitory receptor on T and natural killer cells that competes with the activating receptor CD226 for the ligand CD155. Tiragolumab (Roche) reached phase 3 with atezolizumab after promising phase 2 results in lung cancer, but the SKYSCRAPER programme did not improve survival, and several rivals paused development. Fc-active and Fc-silent antibodies, and combinations in other tumours, are still being tested.",
    principle: "Monoclonal antibodies bind TIGIT to stop it engaging CD155, freeing CD226 co-stimulation; Fc-active versions may also deplete regulatory T cells.",
    strengths: ["Complements PD-1/PD-L1 blockade mechanistically","Well tolerated in trials"],
    limitations: ["Phase 3 lung cancer trials negative","Benefit, if any, confined to undefined subgroups","Fc-format questions unresolved"],
    targets: ["tigit"], drugs: ["tiragolumab"], cancers: ["nsclc"],
    links: [{ label: "Wikipedia", url: W("TIGIT") }],
  },
  {
    id: "lag3-blockade", kind: "technology", name: "LAG-3 blockade", sections: ["immunotherapy"], status: "approved", asOf, since: 2022, wikipedia: W("LAG3"),
    tldr: "Antibodies against LAG-3, another brake on tired T cells; relatlimab plus nivolumab became the first approved LAG-3 combination for melanoma in 2022.",
    summary: "Lymphocyte activation gene 3 (LAG-3) is a checkpoint expressed on exhausted T cells that binds MHC class II and fibrinogen-like protein 1. The fixed-dose combination of relatlimab and nivolumab (Opdualag) roughly doubled progression-free survival compared with nivolumab alone in untreated advanced melanoma in the RELATIVITY-047 trial and was approved by the FDA in 2022, the first new checkpoint class since PD-1. Trials in lung, colorectal and other cancers continue, with mixed results.",
    principle: "Antibodies block LAG-3 binding to its ligands so exhausted T cells regain function, usually combined with PD-1 blockade because the two pathways co-inhibit.",
    strengths: ["First new approved checkpoint class after CTLA-4 and PD-1","Adds efficacy without the toxicity of CTLA-4 combinations"],
    limitations: ["Benefit shown mainly in melanoma so far","No validated predictive biomarker","Overall survival gain modest"],
    targets: ["lag3"], drugs: ["nivolumab"], cancers: ["melanoma"],
    links: [{ label: "Wikipedia", url: W("LAG3") }],
  },
  {
    id: "tim3-blockade", kind: "technology", name: "TIM-3 blockade", sections: ["immunotherapy"], status: "phase-2", asOf, wikipedia: W("HAVCR2"),
    tldr: "Antibodies against TIM-3, a checkpoint on exhausted T cells and myeloid cells, tested mostly with PD-1 drugs and in blood cancers.",
    summary: "T-cell immunoglobulin and mucin domain 3 (TIM-3, gene HAVCR2) marks the most exhausted T cells and is also expressed on leukaemic stem cells and myeloid cells. Antibodies such as sabatolimab and cobolimab have been tested with PD-1 blockade in solid tumours and with hypomethylating agents in myelodysplastic syndromes and acute myeloid leukaemia; the STIMULUS programme in MDS did not meet its endpoints, and development is concentrated in combination settings.",
    principle: "Antibodies block TIM-3 binding to galectin-9, phosphatidylserine and CEACAM1, restoring T-cell and innate immune function.",
    strengths: ["Targets both adaptive and innate immune brakes","Expressed on leukaemic stem cells"],
    limitations: ["Phase 3 MDS trials negative","Solid tumour activity modest so far"],
    targets: ["tim3"], drugs: ["cobolimab"], cancers: ["mds","aml","nsclc"],
    links: [{ label: "Wikipedia", url: W("HAVCR2") }],
  },
  {
    id: "cd47-blockade", companies: ["apmonia-therapeutics"], kind: "technology", name: "CD47 and SIRP-alpha blockade", sections: ["immunotherapy"], status: "phase-2", asOf, wikipedia: W("CD47"),
    tldr: "Drugs that remove the 'don't eat me' signal cancer cells show to macrophages, so the immune system's scavenger cells can engulf them; the lead programme was halted for safety.",
    summary: "CD47 on tumour cells binds SIRP-alpha on macrophages and stops them engulfing the cell. Antibodies and fusion proteins that block the axis (magrolimab, evorpacept and others) boost antibody-dependent phagocytosis, especially with rituximab or azacitidine. Magrolimab's phase 3 programme in myelodysplastic syndromes and acute myeloid leukaemia was stopped in 2024 after excess deaths, but SIRP-alpha-directed agents and bispecifics continue in lymphoma and solid tumours.",
    principle: "Blocking CD47 or SIRP-alpha removes the inhibitory signal so macrophages phagocytose opsonised tumour cells; agents are engineered to spare red cells, which also express CD47.",
    strengths: ["Engages macrophages, a different arm from T-cell checkpoints","Synergy with therapeutic antibodies"],
    limitations: ["Anaemia from red cell CD47","Magrolimab programme stopped for safety","No approval yet"],
    targets: ["cd47"], drugs: ["magrolimab","evorpacept"], cancers: ["mds","aml","dlbcl"],
    links: [{ label: "Wikipedia", url: W("CD47") }],
  },
  {
    id: "cd40-agonists", kind: "technology", name: "CD40 agonist antibodies", sections: ["immunotherapy"], status: "phase-2", asOf, wikipedia: W("CD40_(protein)"),
    tldr: "Antibodies that switch on CD40 on dendritic cells and macrophages to kick-start an immune response against tumours that checkpoint drugs alone cannot reach.",
    summary: "CD40 is a co-stimulatory receptor on antigen-presenting cells; its activation licenses dendritic cells to prime T cells and can reprogramme tumour macrophages. Agonist antibodies such as sotigalimab and mitazalimab have been tested with chemotherapy in pancreatic cancer and with checkpoint inhibitors, with encouraging response rates but no randomised win yet. Dose-limiting cytokine release and liver toxicity have constrained systemic dosing, prompting tumour-conditional and intratumoural designs.",
    principle: "Antibodies cluster CD40 on antigen-presenting cells, mimicking CD40 ligand from helper T cells and driving dendritic cell maturation and macrophage activation.",
    strengths: ["Acts upstream of T-cell priming","Can remodel the stroma of poorly immunogenic tumours"],
    limitations: ["Cytokine release and hepatotoxicity","Randomised evidence lacking"],
    cancers: ["pancreatic","melanoma"],
    links: [{ label: "Wikipedia", url: W("CD40_(protein)") }],
  },
  {
    id: "immunocytokines", companies: ["egle-therapeutics", "nammi-therapeutics", "bright-peak-therapeutics"], kind: "technology", name: "Immunocytokines (antibody-cytokine fusions)", sections: ["immunotherapy"], status: "phase-3", asOf, wikipedia: W("Cytokine"),
    tldr: "Cytokines such as interleukin-2 or TNF fused to an antibody that homes to the tumour, aiming to concentrate the immune boost where it is needed and spare the rest of the body.",
    summary: "Systemic interleukin-2 and interferon were among the first cancer immunotherapies but were limited by severe toxicity. Immunocytokines fuse a cytokine to a tumour-targeting antibody or fragment so that it accumulates in tumour tissue; examples include L19-IL2 and L19-TNF (Philogen), which reached phase 3 in melanoma and soft tissue sarcoma, and engineered IL-2 and IL-12 variants with reduced systemic activity. Results have been mixed and no product is approved.",
    principle: "A cytokine domain is fused to an antibody against a tumour-associated antigen or stromal marker, delivering local immune activation after systemic dosing.",
    strengths: ["Localises potent cytokines to tumour","Combines with checkpoint blockade and chemotherapy"],
    limitations: ["Cytokines still leak systemically","Complex manufacturing","No approvals despite decades of work"],
    cancers: ["melanoma","sarcoma"],
    links: [{ label: "Wikipedia", url: W("Cytokine") }],
  },
  {
    id: "nk-cell-engagers", kind: "technology", name: "NK cell engagers", sections: ["immunotherapy"], status: "phase-1", asOf, wikipedia: W("Natural_killer_cell"),
    tldr: "Bispecific or trispecific antibodies that hold a natural killer cell against a tumour cell and switch it on, an alternative to T-cell engagers with potentially milder side effects.",
    summary: "Natural killer (NK) cell engagers bind an activating receptor on NK cells (CD16, NKG2D or NKp46) and a tumour antigen, often with an added interleukin-15 domain to sustain the cells. Programmes from Innate Pharma, Affimed and others are in early trials in lymphoma, leukaemia and solid tumours. Because NK cells release fewer inflammatory cytokines than T cells, the format promises less cytokine release syndrome, though clinical proof is limited.",
    principle: "Multispecific antibody scaffolds crosslink NK activating receptors with a tumour antigen, triggering degranulation and cytokine release against the bound target cell.",
    strengths: ["Innate cells kill without antigen presentation","Potentially lower cytokine release than T-cell engagers","Off-the-shelf biologic"],
    limitations: ["Early clinical stage","NK cells are scarce and short-lived in tumours"],
    technologies: ["t-cell-engager","bispecific-antibody"],
    links: [{ label: "Wikipedia", url: W("Natural_killer_cell") }],
  },
  {
    id: "trispecific-antibodies", companies: ["excalipoint-therapeutics", "chiome-bioscience", "vitruviae", "shine-on-biomedical"], kind: "technology", name: "Trispecific antibodies", sections: ["immunotherapy"], status: "phase-1", asOf, wikipedia: W("Bispecific_monoclonal_antibody"),
    tldr: "Antibodies engineered to bind three things at once, for example a tumour antigen, a T-cell activator and a co-stimulatory signal, to make a stronger or more selective immune attack.",
    summary: "Trispecific antibodies extend the bispecific T-cell engager concept with a third binding arm: a co-stimulatory receptor such as CD28 to strengthen T-cell activation, a second tumour antigen to prevent escape, or a half-life-extending domain. Early trials in myeloma, lymphoma and solid tumours are under way, and the format is also used in NK cell engagers. Complexity in manufacturing and the risk of excessive activation are the main challenges.",
    principle: "Three binding domains are assembled on one engineered antibody scaffold so that binding to the tumour cell clusters two immune signals on the same effector cell.",
    strengths: ["Co-stimulation may deepen and prolong responses","Dual tumour antigens reduce antigen escape"],
    limitations: ["Early stage","Manufacturing complexity","Potential for over-activation and toxicity"],
    technologies: ["bispecific-antibody","t-cell-engager"], cancers: ["multiple-myeloma"],
    links: [{ label: "Wikipedia", url: W("Bispecific_monoclonal_antibody") }],
  },
  {
    id: "dendritic-cell-vaccines", terms: ["dendritic-cell-cross-presentation"], trials: ["nct07146672", "nct05261750"], aka: ["Dendritic cell vaccine", "DC vaccine"], institutions: ["immunocine"], companies: ["argos-therapeutics", "medigene", "tricision-biotherapeutics"], dependsOn: ["apheresis-starting-material", "cell-therapy-release-testing"], kind: "technology", name: "Dendritic cell vaccines", sections: ["immunotherapy"], status: "approved", asOf, since: 2010, wikipedia: W("Sipuleucel-T"),
    tldr: "Vaccines made from a patient's own antigen-presenting cells loaded with tumour proteins; sipuleucel-T for prostate cancer was the first approved, and newer versions are tested in brain and other cancers.",
    summary: "Dendritic cells present antigens to T cells. Sipuleucel-T, approved in 2010 for metastatic castration-resistant prostate cancer, loads the patient's antigen-presenting cells with a prostatic acid phosphatase fusion protein and reinfuses them, prolonging survival modestly. Later dendritic cell vaccines pulsed with tumour lysate or RNA have reached phase 3 in glioblastoma and are combined with checkpoint inhibitors, while off-the-shelf approaches try to target dendritic cells inside the body.",
    principle: "Leukapheresis harvests monocytes, which are matured into dendritic cells, loaded with antigen and reinfused to prime tumour-specific T cells.",
    strengths: ["Proven survival benefit in prostate cancer","Personalised, low toxicity"],
    limitations: ["Costly, individual manufacturing","Modest response rates as single agents"],
    drugs: ["sipuleucel-t"], targets: ["pap"], cancers: ["prostate","glioblastoma"],
    links: [{ label: "Wikipedia", url: W("Sipuleucel-T") }],
  },
  {
    id: "bacterial-vector-vaccines", companies: ["loki-therapeutics"], kind: "technology", name: "Bacterial vector cancer vaccines", sections: ["immunotherapy"], status: "phase-2", asOf, wikipedia: W("Cancer_vaccine"),
    tldr: "Weakened bacteria such as Listeria engineered to carry tumour antigens, using the body's strong response to infection to train T cells against cancer.",
    summary: "Live attenuated Listeria monocytogenes and other bacteria naturally infect antigen-presenting cells and trigger powerful innate and T-cell responses. Engineered strains secreting tumour antigens (Advaxis's ADXS-HPV against HPV E7 in cervical cancer, and strains targeting mesothelin or neoantigens) reached phase 2 and 3 trials; results were disappointing and the approach is now concentrated in combination studies and personalised designs. Related work uses engineered bacteria to deliver payloads inside tumours.",
    principle: "Attenuated bacteria expressing a tumour antigen fused to an immunogenic bacterial protein are infused, infect dendritic cells and present the antigen with strong innate danger signals.",
    strengths: ["Potent innate adjuvant effect","Manufacturable and off the shelf"],
    limitations: ["Phase 3 failure in cervical cancer","Infection risk in immunosuppressed patients"],
    cancers: ["cervical","pancreatic"],
    links: [{ label: "Wikipedia", url: W("Cancer_vaccine") }],
  },
  {
    id: "gamma-delta-t-cell-therapy", trials: ["nct06150885"], companies: ["cartx-therapeutics"], kind: "technology", name: "Gamma-delta T cell therapy", sections: ["cell-therapy"], status: "phase-1", asOf, wikipedia: W("Gamma_delta_T_cell"),
    tldr: "Cell therapies built from a rare T-cell type that recognises stressed cancer cells without needing tissue matching, making them candidates for off-the-shelf products.",
    summary: "Gamma-delta T cells recognise stress ligands and phosphoantigens on tumour cells independently of HLA, so donor cells can be given without matching and without causing graft-versus-host disease. Companies expand the Vδ1 or Vδ2 subsets from healthy donors, sometimes adding a CAR, and early trials in leukaemia, lymphoma and solid tumours are under way. Persistence after infusion and manufacturing scale are the main hurdles.",
    principle: "Donor gamma-delta T cells are expanded ex vivo with phosphoantigens or cytokines, optionally engineered with a chimeric antigen receptor, and infused as an allogeneic product.",
    strengths: ["HLA-independent recognition, no graft-versus-host disease","Off-the-shelf potential","Innate-like killing of stressed cells"],
    limitations: ["Short persistence","Early clinical stage","Expansion yields vary between donors"],
    technologies: ["allogeneic-cell-therapy","car-t"], cancers: ["aml"],
    links: [{ label: "Wikipedia", url: W("Gamma_delta_T_cell") }],
  },
  {
    notes:["The cord-blood CAR-NK construct reported by Liu combined anti-CD19 recognition, IL-15 and inducible caspase-9. Its low-level detection for at least 12 months is a counterexample to assigning all CAR-NK cells a short lifespan. Detectability still does not by itself prove continuing useful function.","Irradiated NK-92 line products and nonirradiated primary-cell preparations answer different manufacturing and persistence questions. Tang reported 10 Gy irradiation for the studied CD33-CAR NK-92 preparation; that is a source-specific processing detail, not a universal protocol.","A comparison intended to isolate CAR-dependent killing needs matched effector cells without the CAR and otherwise matched targets with and without the antigen. Native NK inhibition and activation can change the result even when CAR binding is retained. HLA loss alone does not establish a favorable therapeutic response."], related:["car-nk-macrophage","nk-cell","cellular-kinetics-and-persistence"],
    id: "nk-cell-therapy", companies: ["senti-biosciences", "zelluna", "celularity"], trials: ["nct04616209", "nct06687681", "nct06730009"], dependsOn: ["cell-therapy-cold-chain", "cell-therapy-release-testing"], kind: "technology", name: "NK cell therapy and CAR-NK", sections: ["cell-therapy"], status: "phase-2", asOf:"2026-11-08", wikipedia: W("Natural_killer_cell"),
    tldr: "NK-cell therapies use natural killer cells, with or without an added CAR. Cell source and engineering determine what must be tested for persistence, compatibility, activity and harms.",
    summary: "Natural killer cells integrate activating and inhibitory signals and can be prepared from different starting materials. Some products use donor or cord-blood cells; others use pluripotent-cell-derived cells or cell lines. A CAR supplies an additional recognition route, while cytokines or other engineering can alter subsequent behavior. Early clinical observations belong to the actual source, construct, conditioning and population studied. They do not establish universal compatibility, negligible inflammatory risk or uniformly poor persistence.",
    principle: "Define the starting cells, expansion and engineering process, conditioning and administered viable cells; then measure native and CAR-associated activity in the intended context.",
    strengths: ["Potential for prepared allogeneic products in specified platforms","Native effector functions can complement engineered recognition under tested conditions"],
    limitations: ["Host rejection, tissue access and inhibitory signals may limit activity","Persistence and repeat-dosing questions vary by product","Clinical benefit and safety require construct- and setting-specific studies"],
    technologies: ["car-t","allogeneic-cell-therapy"], cancers: ["dlbcl","aml"],
    links: [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Natural_killer_cell"},{"label":"Liu et al.: one cord-blood CAR-NK construct in lymphoid tumors (2020)","url":"https://doi.org/10.1056/NEJMoa1910607"},{"label":"Tang et al.: irradiated CD33-CAR NK-92 cells in an early AML study (2018)","url":"https://pubmed.ncbi.nlm.nih.gov/30034945/"},{"label":"Karre et al.: reduced self-MHC and rejection in mouse lymphoma models (1986)","url":"https://pubmed.ncbi.nlm.nih.gov/3951539/"},{"label":"FDA: CAR T-cell product design, testing and clinical pharmacology guidance (2024)","url":"https://www.fda.gov/media/156896/download"}],
  },
  {
    id: "virus-specific-t-cells", companies: ["tikva-allocell"], kind: "technology", name: "Virus-specific T cells", sections: ["cell-therapy"], status: "approved", asOf, since: 2022, wikipedia: W("Tabelecleucel"),
    tldr: "Off-the-shelf T cells from healthy donors that recognise Epstein-Barr virus, used to treat virus-driven lymphomas after transplant; tabelecleucel was approved in Europe in 2022.",
    summary: "Some cancers are driven by viruses whose proteins make excellent T-cell targets. Banks of donor T cells selected for Epstein-Barr virus specificity and matched on HLA can be given off the shelf; tabelecleucel (Ebvallo) was approved in the European Union in 2022 for EBV-positive post-transplant lymphoproliferative disease that has failed other treatment. Similar products target cytomegalovirus and adenovirus after transplant, and EBV-directed cells are tested in nasopharyngeal carcinoma.",
    principle: "Donor T cells are expanded against viral antigens, banked by HLA type, and selected for each patient to share at least one restricting allele, then infused without lymphodepletion.",
    strengths: ["Off the shelf with rapid access","Very low toxicity","Approved in Europe"],
    limitations: ["Only virus-associated cancers","HLA matching still required","Not approved in the United States"],
    technologies: ["allogeneic-cell-therapy"], cancers: ["dlbcl","nasopharyngeal"],
    links: [{ label: "Wikipedia", url: W("Tabelecleucel") }],
  },
  {
    id: "lu177-radioligand-therapy", companies: ["blue-earth-therapeutics"], trials: ["nct06184035", "nct05547061", "nct06139575", "nct05706129"], aka: ["177Lu", "Lu-177", "Lutetium-177"], dependsOn: ["radioligand-therapy", "therapy-isotope-supply-chain"], kind: "technology", name: "Lutetium-177 radioligand therapy", sections: ["radiopharma"], status: "approved", asOf, since: 2018, wikipedia: W("Lutetium-177"),
    tldr: "Cancer-seeking molecules carrying the radioactive metal lutetium-177, which delivers short-range radiation to tumours it binds; approved for neuroendocrine tumours and prostate cancer.",
    summary: "Lutetium-177 emits beta particles with a range of a few millimetres and gamma rays that allow imaging, making it the workhorse isotope of radioligand therapy. Lutathera (Lu-177 dotatate, approved 2018) targets somatostatin receptors on neuroendocrine tumours, and Pluvicto (Lu-177 PSMA-617, approved 2022) targets PSMA on prostate cancer; both improved outcomes in randomised trials. Supply of no-carrier-added lutetium, dosimetry and combinations with earlier lines of therapy are the current frontiers.",
    principle: "A peptide or small molecule with high affinity for a tumour receptor is chelated to Lu-177 and infused; bound molecules irradiate the cell and its neighbours over the isotope's 6.6-day half-life.",
    strengths: ["Randomised survival benefit in two diseases","Companion PET imaging selects patients","Tolerable toxicity profile"],
    limitations: ["Isotope supply and logistics","Marrow and kidney dose limits","Resistance and heterogeneous uptake"],
    drugs: ["pluvicto","lutathera"], targets: ["psma","sstr2"], technologies: ["radioligand-therapy","therapy-isotope-supply-chain"], cancers: ["prostate","neuroendocrine"],
    links: [{ label: "Wikipedia", url: W("Lutetium-177") }],
  },
  {
    id: "astatine-211-alpha-therapy", companies: ["nuclearmedix"], dependsOn: ["targeted-alpha-therapy", "medical-cyclotrons-synthesis-modules"], kind: "technology", name: "Astatine-211 alpha therapy", sections: ["radiopharma"], status: "phase-1", asOf, wikipedia: W("Astatine"),
    tldr: "A rare alpha-emitting halogen that can be attached to antibodies and small molecules like iodine, tested in leukaemia conditioning and brain and ovarian cancer.",
    summary: "Astatine-211 is an alpha emitter with a 7.2-hour half-life that behaves chemically like iodine, so it can label antibodies and small molecules by radiohalogenation. Its short range and high energy suit micrometastatic and disseminated disease; academic programmes in Gothenburg, Seattle and Japan have tested At-211 antibodies in ovarian cancer and as anti-CD45 conditioning before transplant, and At-211 PSMA and MABG agents are in early trials. Production requires a cyclotron with alpha beams, limiting supply to a few centres.",
    principle: "At-211 is produced by bombarding bismuth with alpha particles, labelled to a targeting molecule, and delivers high linear-energy-transfer alpha particles over a few cell diameters.",
    strengths: ["Alpha emission kills with few decays and overcomes resistance","Iodine-like chemistry fits existing tracers","Short half-life limits residual dose"],
    limitations: ["Very limited production capacity","Short half-life constrains logistics","Early clinical stage"],
    technologies: ["targeted-alpha-therapy","radioligand-therapy"], cancers: ["ovarian","aml","prostate"],
    links: [{ label: "Wikipedia", url: W("Astatine") }],
  },
  {
    notes:["Physical decay, biological clearance and radioactive daughters all affect interpretation. Alpha-emitter dosimetry may need additional microscopic considerations. FDA’s cited document addresses nonclinical development; it is not a universal clinical dosing protocol or evidence of a jurisdiction-wide reimbursement requirement.",
    "Absorbed dose in gray (Gy) is energy deposited per tissue mass, with 1 Gy equal to 1 joule per kilogram. Administered activity in MBq measures radioactive decays per time, not energy absorbed. A single uptake image or SUV is neither quantity. Dose estimation needs an appropriate time-activity model, emissions and energy-deposition assumptions for the relevant tissue. Equal early uptake can precede different retention. The tested diagnostic tracer cannot supply a different therapeutic product's dose merely because both bind the same target."
  ],
    id: "radioligand-dosimetry", dependsOn: ["spect"], kind: "technology", name: "Radioligand dosimetry", sections: ["radiopharma","imaging"], status: "established", asOf:"2026-11-12", wikipedia: W("Dosimetry"),
    tldr: "Radioligand dosimetry estimates radiation deposited in tumors and normal tissues from where radioactivity goes and how it changes with time.",
    summary: "Calibrated activity measurements, often from suitable serial SPECT or PET imaging, inform a time-activity model. Time-integrated decays, emission properties, tissue mass and spatial assumptions then inform absorbed dose. Equal uptake on an early scan can be followed by different retention and different doses. Administered activity is an input, not a substitute for patient- or tissue-level dosimetry. The estimates can support evaluation of dosing strategies, but improved outcomes from a particular adaptation require their own evidence.",
    principle: "Estimate activity through time in specified source regions, then calculate the energy deposited in relevant target regions with explicit assumptions.",
    strengths: ["Makes tumor and normal-tissue exposure explicit","Can evaluate why the same administered activity produces different dose estimates"],
    limitations: ["Calibration, time sampling and segmentation affect estimates","Organ averages can miss uneven microscopic exposure","Method-specific dose estimates do not establish a universal clinical threshold"],
    technologies: ["radioligand-therapy","lu177-radioligand-therapy"],
    links: [{"label":"MIRD pamphlet 22: alpha-particle radiobiology and dosimetry (2010)","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC5680544/"},{"label":"EPA: activity, absorbed dose and their units","url":"https://www.epa.gov/radiation/radiation-terms-and-units"},{"label":"FDA: nonclinical development of oncology therapeutic radiopharmaceuticals (2019)","url":"https://www.fda.gov/media/129547/download"}],
  },
  {
    id: "menin-inhibitors", companies: ["charm-therapeutics"], kind: "technology", name: "Menin inhibitors", sections: ["targeted-therapy"], status: "approved", asOf, since: 2024, wikipedia: W("Menin"),
    tldr: "Pills that break the interaction between menin and the KMT2A protein that acute leukaemias with KMT2A rearrangements or NPM1 mutations depend on; revumenib was the first approved, in 2024.",
    summary: "About one in ten acute leukaemias carries a KMT2A (MLL) rearrangement and around a third of adult acute myeloid leukaemia has an NPM1 mutation; both rely on menin binding KMT2A to keep leukaemia genes switched on. Revumenib (Revuforj) was approved in 2024 for relapsed or refractory KMT2A-rearranged acute leukaemia, with ziftomenib following in NPM1-mutant disease; differentiation syndrome is the class toxicity and MEN1 mutations cause resistance. Combinations with venetoclax and azacitidine are in trials.",
    principle: "Small molecules occupy the KMT2A-binding pocket of menin, displacing the complex from chromatin and forcing leukaemic blasts to differentiate.",
    strengths: ["First targeted drugs for KMT2A-rearranged leukaemia","Oral, with responses in heavily pretreated patients"],
    limitations: ["Differentiation syndrome and QT prolongation","Acquired MEN1 mutations cause resistance"],
    targets: ["menin"], drugs: ["revumenib","ziftomenib"], cancers: ["aml","all-leukemia"],
    links: [{ label: "Wikipedia", url: W("Menin") }],
  },
  {
    id: "bcl2-inhibitors", companies: ["lomond-therapeutics"], kind: "technology", name: "BCL-2 inhibitors", sections: ["targeted-therapy"], status: "approved", asOf, since: 2016, wikipedia: W("Venetoclax"),
    tldr: "Drugs that switch off BCL-2, the protein that lets cancer cells refuse to die; venetoclax transformed treatment of chronic lymphocytic leukaemia and acute myeloid leukaemia.",
    summary: "BCL-2 blocks the mitochondrial pathway of apoptosis. Venetoclax, a BH3 mimetic approved in 2016, produces deep remissions in chronic lymphocytic leukaemia in fixed-duration combinations with obinutuzumab or BTK inhibitors, and with azacitidine it became standard for older patients with acute myeloid leukaemia. Second-generation inhibitors such as sonrotoclax aim for greater selectivity, and BCL-XL and MCL-1 inhibitors target the related proteins that mediate resistance.",
    principle: "Small molecules mimic BH3-only proteins, binding BCL-2's groove so that BAX and BAK are released to trigger mitochondrial apoptosis.",
    strengths: ["Deep, durable responses and fixed-duration treatment in CLL","Standard of care in unfit AML","Oral"],
    limitations: ["Tumour lysis syndrome requires ramp-up","Neutropenia","Resistance through BCL-2 mutation or MCL-1 upregulation"],
    targets: ["bcl2"], drugs: ["venetoclax","sonrotoclax"], cancers: ["cll","aml"],
    links: [{ label: "Wikipedia", url: W("Venetoclax") }],
  },
  {
    id: "idh-inhibitors", kind: "technology", name: "IDH inhibitors", sections: ["targeted-therapy"], status: "approved", asOf, since: 2018, wikipedia: W("Isocitrate_dehydrogenase"),
    tldr: "Pills that block mutant IDH1 or IDH2 enzymes, which flood cells with a metabolite that blocks maturation; approved in leukaemia, bile duct cancer and low-grade glioma.",
    summary: "Mutations in isocitrate dehydrogenase 1 and 2 produce the oncometabolite 2-hydroxyglutarate, which blocks cell differentiation through epigenetic enzymes. Enasidenib (IDH2, 2017) and ivosidenib (IDH1, 2018) were approved in acute myeloid leukaemia, ivosidenib later in cholangiocarcinoma, olutasidenib in AML, and vorasidenib, which penetrates the brain, delayed progression of IDH-mutant low-grade glioma and was approved in 2024. Differentiation syndrome and resistance through second-site mutations are the class issues.",
    principle: "Allosteric inhibitors lock the mutant enzyme in an inactive state, lowering 2-hydroxyglutarate and restoring differentiation.",
    strengths: ["Oral, well tolerated","First targeted therapy for IDH-mutant glioma","Approved across leukaemia and solid tumours"],
    limitations: ["Differentiation syndrome","Isoform switching and second-site resistance","Responses in solid tumours are cytostatic"],
    drugs: ["ivosidenib","enasidenib","olutasidenib","vorasidenib"], cancers: ["aml","cholangiocarcinoma","glioblastoma","chondrosarcoma"],
    links: [{ label: "Wikipedia", url: W("Isocitrate_dehydrogenase") }],
  },
  {
    id: "pi3k-akt-mtor-inhibitors", companies: ["mei-pharma", "kymathera", "synnovation-therapeutics", "terremoto-biosciences", "torqur", "sapu-nano", "stelexis-biosciences", "alterome-therapeutics", "mekanistic-therapeutics", "ensem-therapeutics"], kind: "technology", name: "PI3K, AKT and mTOR inhibitors", sections: ["targeted-therapy"], status: "approved", asOf: "2026-11-12", since: 2009, wikipedia: W("PI3K/AKT/mTOR_pathway"),
    tldr: "Drugs against one of the most commonly mutated growth pathways in cancer, now used with hormone therapy in breast cancer and in kidney and neuroendocrine tumours, with high blood sugar as the shared side effect.",
    summary: "The PI3K-AKT-mTOR pathway is altered in a large share of tumours. Rapalogues (everolimus, temsirolimus) were approved first, for kidney cancer and later breast and neuroendocrine tumours. Alpelisib (PIK3CA-mutant breast cancer, 2019), capivasertib (an AKT inhibitor, 2023) and inavolisib (a PI3K-alpha degrader-like inhibitor, 2024) followed in hormone receptor-positive breast cancer with fulvestrant. Hyperglycaemia, rash and stomatitis limit dosing, and mutant-selective PI3K-alpha inhibitors aim to spare wild-type enzyme.",
    principle: "ATP-competitive or allosteric inhibitors block PI3K catalytic subunits, AKT or mTORC1, cutting the survival and growth signalling downstream of receptor tyrosine kinases and PIK3CA mutations.",
    strengths: ["Approved in several diseases","Combination with endocrine therapy extends control in breast cancer","Biomarker-selected use"],
    limitations: ["Hyperglycaemia and rash limit doses","Feedback activation blunts single-agent effect","Modest survival gains"],
    targets: ["pik3ca","akt","mtor"], drugs: ["everolimus","temsirolimus","alpelisib","capivasertib","inavolisib"], cancers: ["breast-hr-positive","rcc"],
    links: [
  { label: "Wikipedia", url: W("PI3K/AKT/mTOR_pathway") },
  {
  "label": "UniProt P42336: reviewed human PIK3CA function",
  "url": "https://www.uniprot.org/uniprotkb/P42336/entry"
},
  {
  "label": "UniProt P60484: reviewed human PTEN function",
  "url": "https://www.uniprot.org/uniprotkb/P60484/entry"
},
  {
  "label": "UniProt P42345: reviewed human mTOR function",
  "url": "https://www.uniprot.org/uniprotkb/P42345/entry"
},
  {
  "label": "NCI Drug Dictionary: capivasertib",
  "url": "https://www.cancer.gov/publications/dictionaries/cancer-drug/def/capivasertib"
},
  {
  "label": "PIQRAY prescribing information, section 12.1",
  "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b20b4e18-7a4b-4500-a08f-06c6dab0ee5b"
},
  {
  "label": "NCI Drug Dictionary: everolimus",
  "url": "https://www.cancer.gov/publications/dictionaries/cancer-drug/def/everolimus"
},
  {
  "label": "mTOR inhibition induces upstream receptor tyrosine kinase signaling and activates Akt.",
  "url": "https://pubmed.ncbi.nlm.nih.gov/16452206/"
},
  {
  "label": "FDA: capivasertib with fulvestrant, November 2023 approval",
  "url": "https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-capivasertib-fulvestrant-breast-cancer"
},
  {
  "label": "Capivasertib plus paclitaxel as first-line treatment for metastatic triple-negative breast cancer: results from the randomised, global phase III CAPItello-290 trial.",
  "url": "https://pubmed.ncbi.nlm.nih.gov/41422862/"
}
],

    notes: [
  "PI3K, AKT and mTOR name different parts of a signalling network. In the selected membrane route, PI3K adds a phosphate to the lipid PIP2 to make PIP3; PTEN removes the relevant phosphate and opposes that lipid signal. PIP3 helps recruit proteins including AKT to the membrane. AKT, also called protein kinase B, phosphorylates proteins, and its connection to mTORC1 includes intermediate regulators. mTOR participates in the distinct mTORC1 and mTORC2 complexes. A diagram showing this route leaves other branches out.",
  "Alpelisib has inhibitory activity predominantly against PI3K-alpha; capivasertib inhibits AKT isoforms; the rapamycin derivative everolimus acts through a complex that inhibits mTOR. Isoforms are related forms of a protein, and an inhibitor profile must identify which forms or complexes the compound affects. Binding mode, selectivity and achieved exposure differ between products. Blocking a neighbouring node is not the same intervention, even when the network diagram puts the names beside each other.",
  "O'Reilly and colleagues found that mTOR inhibition relieved feedback inhibition and increased AKT activation in studied cancer cell lines and patient tumour samples. The indirect return path in a network sketch represents a feedback brake, not a direct physical wire or every branch. In a fictional experiment, reduced downstream output with a higher AKT phosphosite signal is compatible with network compensation. Those two measurements alone do not prove that this loop caused the change, that every tumour rebounds or that the drug missed its target; they also do not measure net survival benefit.",
  "The FDA's November 2023 capivasertib approval is a defined historical example: capivasertib with fulvestrant for adults with hormone-receptor-positive, HER2-negative locally advanced or metastatic breast cancer carrying a PIK3CA, AKT1 or PTEN alteration detected by an FDA-approved test. It required progression after an endocrine-based regimen in the metastatic setting, or recurrence on or within 12 months of completing adjuvant therapy. These disease, test, combination and prior-treatment conditions do not become a triple-negative breast-cancer indication from a pathway alteration alone.",
  "CAPItello-290 tested capivasertib plus paclitaxel against placebo plus paclitaxel as first-line treatment for metastatic triple-negative breast cancer. In the 812-patient phase III trial, the overall-survival primary endpoints were not met in either the overall population or the PIK3CA/AKT1/PTEN-altered population. Median overall survival was 17.7 versus 18.0 months overall and 20.4 months in both altered-population arms. Secondary progression-free survival results favoured the combination, but do not reverse the negative primary survival finding.",
  "Name the phosphosite, substrate, specimen, comparator and time when interpreting a signalling assay. A PTEN DNA alteration, RNA amount, protein stain and enzyme-function result measure different layers. A drug-dependent change in AKT phosphorylation is not a universal meter of all AKT activity; examine the relevant substrate effects too. Nanomolar, or nM, states concentration; normalised phosphoprotein signal, growth and death are distinct outputs. Engagement is different from dependence, and clinical interpretation needs the disease, assay and endpoint used in the treatment evidence.",
  "If a fictional report finds a PIK3CA variant, it does not follow that any AKT inhibitor will work. Establish the variant's functional effect, actual drug and exposure, disease setting, assay and clinical evidence before claiming sensitivity or eligibility. Likewise, a model hypothesis about DNA repair or immune effects is not proof that every PI3K or AKT inhibitor improves a PARP-inhibitor or immunotherapy combination. State the proposed mechanism, the particular node being perturbed and the outcome tested in that treatment setting."
],
    related: [
  "pi3k-akt-mtor",
  "pten-loss"
],
  },
  {
    id: "mdm2-inhibitors", companies: ["lamassu-biotech"], kind: "technology", name: "MDM2 inhibitors", sections: ["targeted-therapy"], status: "phase-3", asOf, wikipedia: W("Mdm2"),
    tldr: "Drugs that stop MDM2 destroying p53, reawakening the cell's guardian protein in tumours where p53 is intact but suppressed, such as some sarcomas and leukaemias.",
    summary: "MDM2 tags the tumour suppressor p53 for degradation, and MDM2 amplification is the hallmark of liposarcoma and other tumours that keep wild-type p53. Small molecules that block the MDM2-p53 interaction (idasanutlin, milademetan, navtemadlin, brigimadlin) restore p53 and cause cell-cycle arrest and death. Trials in acute myeloid leukaemia and liposarcoma have shown activity but also thrombocytopenia and gastrointestinal toxicity, and no agent is approved; combinations and intermittent dosing are being tested.",
    principle: "Inhibitors occupy the p53-binding pocket of MDM2, stabilising p53 so it can trigger apoptosis or senescence in cells with wild-type TP53.",
    strengths: ["Reactivates a non-mutated tumour suppressor","Biomarker-defined populations"],
    limitations: ["Thrombocytopenia and gut toxicity","Only in TP53 wild-type tumours","No approval after several phase 3 trials"],
    targets: ["mdm2"], cancers: ["aml","sarcoma","retroperitoneal-sarcoma"],
    links: [{ label: "Wikipedia", url: W("Mdm2") }],
  },
  {
    id: "her2-tyrosine-kinase-inhibitors", companies: ["voronoi"], kind: "technology", name: "HER2 tyrosine kinase inhibitors", sections: ["targeted-therapy"], status: "approved", asOf, since: 2007, wikipedia: W("Tucatinib"),
    tldr: "Small pills that block HER2 from inside the cell, complementing antibody drugs; tucatinib is notable for working against brain metastases.",
    summary: "Lapatinib (2007), neratinib (2017) and tucatinib (2020) are oral kinase inhibitors of HER2, with lapatinib and neratinib also hitting EGFR. Tucatinib, more selective and so less prone to diarrhoea and rash, improved survival with trastuzumab and capecitabine in the HER2CLIMB trial including patients with brain metastases, and gained a colorectal cancer indication in 2023. Neratinib is used as extended adjuvant therapy after trastuzumab.",
    principle: "ATP-competitive inhibitors bind the intracellular kinase domain of HER2, blocking downstream signalling even when antibodies cannot reach the tumour, such as behind the blood-brain barrier.",
    strengths: ["Oral","Activity against brain metastases","Combine with antibodies and chemotherapy"],
    limitations: ["Diarrhoea, especially with neratinib and lapatinib","Resistance through HER2 mutations and pathway bypass"],
    targets: ["her2"], drugs: ["tucatinib","neratinib","lapatinib"], cancers: ["breast-her2-positive","colorectal"],
    links: [{ label: "Wikipedia", url: W("Tucatinib") }],
  },
  {
    id: "oral-serds", kind: "technology", name: "Oral SERDs", sections: ["hormonal","targeted-therapy"], status: "approved", asOf, since: 2023, wikipedia: W("Selective_estrogen_receptor_degrader"),
    tldr: "Oral drugs that destroy the oestrogen receptor rather than just blocking it, working even when the receptor has mutated to escape older hormone therapies.",
    summary: "Fulvestrant, the first selective oestrogen receptor degrader, needs monthly injections and has poor bioavailability. Oral SERDs (elacestrant, approved in 2023 for ESR1-mutant advanced breast cancer, followed by imlunestrant, camizestrant, giredestrant and the PROTAC degrader vepdegestrant in late trials) degrade the receptor and keep working against ESR1 mutations that arise after aromatase inhibitors. Trials are moving them earlier, guided by circulating tumour DNA detection of ESR1 mutation.",
    principle: "Ligand-like molecules bind the oestrogen receptor and induce a conformation that is ubiquitinated and degraded, removing the receptor even when mutated.",
    strengths: ["Oral","Active against ESR1-mutant disease","ctDNA-guided switching strategies"],
    limitations: ["Benefit concentrated in ESR1-mutant patients","Nausea and fatigue","Several candidates failed in unselected populations"],
    drugs: ["elacestrant","imlunestrant","camizestrant","vepdegestrant","giredestrant"], technologies: ["endocrine-therapy"], cancers: ["breast-hr-positive"],
    links: [{ label: "Wikipedia", url: W("Selective_estrogen_receptor_degrader") }],
  },
  {
    id: "hedgehog-inhibitors", kind: "technology", name: "Hedgehog pathway inhibitors", sections: ["targeted-therapy"], status: "approved", asOf, since: 2012, wikipedia: W("Hedgehog_signaling_pathway"),
    tldr: "Pills that block a developmental signalling pathway hijacked by basal cell skin cancer, shrinking tumours that cannot be operated on; also used in some leukaemia.",
    summary: "Nearly all basal cell carcinomas have mutations activating the Hedgehog pathway through PTCH1 or SMO. Vismodegib (2012) and sonidegib (2015) inhibit SMO and produce responses in locally advanced and metastatic basal cell carcinoma, though muscle cramps, taste loss and hair loss lead many patients to stop. Glasdegib (2018) is approved with low-dose cytarabine in acute myeloid leukaemia. Resistance arises through SMO mutations and downstream activation.",
    principle: "Small molecules bind the transmembrane protein Smoothened, stopping activation of GLI transcription factors that drive proliferation.",
    strengths: ["High response rates in advanced basal cell carcinoma","Oral","Neoadjuvant and intermittent regimens reduce toxicity"],
    limitations: ["Cramps, dysgeusia and alopecia cause discontinuation","Teratogenic","Acquired SMO resistance"],
    targets: ["hedgehog"], drugs: ["vismodegib","sonidegib","glasdegib"], cancers: ["basal-cell-carcinoma","aml","locally-advanced-bcc"],
    links: [{ label: "Wikipedia", url: W("Hedgehog_signaling_pathway") }],
  },
  {
    id: "gamma-secretase-inhibitors", kind: "technology", name: "Gamma-secretase inhibitors", sections: ["targeted-therapy"], status: "approved", asOf, since: 2023, wikipedia: W("Gamma_secretase"),
    tldr: "Drugs that block the enzyme that activates Notch signalling; nirogacestat became the first approved, in 2023, for desmoid tumours, a rare but destructive growth of connective tissue.",
    summary: "Gamma-secretase cleaves Notch receptors to release their active fragment. Inhibitors developed originally for Alzheimer's disease were repurposed for Notch-driven cancers; nirogacestat (Ogsiveo) reduced progression and pain in desmoid tumours in the DeFi trial and was approved by the FDA in 2023. Gamma-secretase inhibition also boosts BCMA on myeloma cells, so it is combined with BCMA-directed CAR-T and bispecifics, and T-cell acute lymphoblastic leukaemia remains a target despite gut toxicity.",
    principle: "Small molecules inhibit the presenilin catalytic site of gamma-secretase, preventing Notch intracellular domain release and Notch target gene transcription.",
    strengths: ["First approved therapy for desmoid tumours","Increases BCMA density for myeloma immunotherapies"],
    limitations: ["Diarrhoea and ovarian toxicity","Notch inhibition affects normal gut and immune cells"],
    targets: ["gamma-secretase"], drugs: ["nirogacestat"], cancers: ["sarcoma","multiple-myeloma"],
    links: [{ label: "Wikipedia", url: W("Gamma_secretase") }],
  },
  {
    id: "celmods", kind: "technology", name: "Cereblon E3 ligase modulators (CELMoDs)", sections: ["targeted-therapy"], status: "phase-3", asOf, wikipedia: W("Cereblon"),
    tldr: "Next-generation relatives of lenalidomide that make the cell's disposal machinery destroy the myeloma proteins Ikaros and Aiolos more completely, working after older drugs fail.",
    summary: "Thalidomide, lenalidomide and pomalidomide act by binding cereblon and redirecting it to degrade Ikaros and Aiolos. Cereblon E3 ligase modulators (iberdomide, mezigdomide) bind cereblon more tightly and degrade these targets faster and more deeply, producing responses in myeloma refractory to lenalidomide and pomalidomide in phase 1 and 2 trials; phase 3 trials with dexamethasone and antibodies are under way. Neutropenia is the main toxicity.",
    principle: "Molecular glues bind cereblon and reshape its surface so that transcription factors Ikaros and Aiolos are ubiquitinated and degraded, killing plasma cells and stimulating T cells.",
    strengths: ["Active after lenalidomide and pomalidomide failure","Oral","Immune-stimulating effects add to antibody partners"],
    limitations: ["Neutropenia","Not yet approved","Resistance through cereblon loss"],
    targets: ["cereblon"], drugs: ["iberdomide","mezigdomide"], cancers: ["multiple-myeloma"],
    links: [{ label: "Wikipedia", url: W("Cereblon") }],
  },
  {
    id: "lsd1-inhibitors", kind: "technology", name: "LSD1 inhibitors", sections: ["targeted-therapy","epigenetics"], status: "phase-2", asOf, wikipedia: W("KDM1A"),
    tldr: "Drugs against the histone demethylase LSD1, which keeps blood and neuroendocrine cancer cells from maturing; being tested in myelofibrosis, leukaemia and small cell lung cancer.",
    summary: "Lysine-specific demethylase 1 (LSD1, gene KDM1A) removes methyl marks from histone H3 and supports the undifferentiated state of acute myeloid leukaemia blasts and small cell lung cancer cells. Inhibitors such as bomedemstat, iadademstat and pulrodemstat have shown differentiation responses and platelet-lowering effects, leading to trials in essential thrombocythaemia and myelofibrosis as well as combination studies in AML and small cell lung cancer. Thrombocytopenia is the on-target dose-limiting effect.",
    principle: "Irreversible or reversible inhibitors block LSD1's demethylase activity and its scaffolding role with GFI1, releasing differentiation programmes.",
    strengths: ["Differentiation rather than cytotoxicity","Activity in myeloproliferative neoplasms"],
    limitations: ["Thrombocytopenia","No approval yet","Single-agent solid tumour activity limited"],
    drugs: ["bomedemstat"], technologies: ["epigenetic-drugs"], cancers: ["aml","sclc","myeloproliferative-neoplasms"],
    links: [{ label: "Wikipedia", url: W("KDM1A") }],
  },
  {
    notes:["An attached checkpoint inhibitor is a distinct payload design. The AACR 2026 A003 abstract describes single-payload ATR-inhibitor conjugates, including TROP2-directed constructs, and reports isogenic repair-state comparisons and xenografts. The separate CHK1 abstract describes an engineered trastuzumab conjugate. These are preclinical conference reports, not human efficacy or marrow-safety results. A separately administered ATR or CHK1 inhibitor is a combination regimen rather than attached cargo.","Downstream DNA-damage or phosphorylation changes support a response in the stated model, not direct target engagement by themselves. Appropriate target, repair-state and exposure controls help distinguish delivery, inhibitor activity and cell susceptibility. Changing from a TOP1 payload does not guarantee bypass of a shared delivery or resistance defect."],
    id: "atr-chk1-inhibitors", kind: "technology", name: "ATR and CHK1 inhibitors", sections: ["targeted-therapy"], status: "phase-2", asOf:"2026-11-08", wikipedia: W("Ataxia_telangiectasia_and_Rad3_related"),
    tldr: "ATR and CHK1 inhibitors interfere with checkpoint responses to stressed DNA replication. Researchers test whether particular tumors depend on those responses enough to create a treatment window.",
    summary: "ATR and downstream checkpoint signaling help cells respond when replication is stressed. Repair defects or other tumor features can increase dependence in specific models, but a gene name or stress marker alone does not establish patient benefit. A phase 1 camonsertib study enrolled selected advanced solid tumors with predicted sensitizing repair-gene alterations; a separate small prexasertib pilot studied previously treated BRCA-wild-type triple-negative breast cancer. These are different drugs, populations and designs. Blood-cell toxicity remained important, and neither study validates every proposed repair-defect biomarker.",
    principle: "Inhibiting checkpoint signaling can impair a stressed cell’s response; exposure, repair state and other cellular processes determine whether that produces death.",
    strengths: ["Tests a repair- or replication-stress dependence hypothesis","Can be studied with DNA-damaging treatments using appropriate safety controls"],
    limitations: ["Blood-cell toxicity can limit exposure","Biomarker and combination results belong to the tested drug, population and regimen"],
    targets: ["atr"], technologies: ["synthetic-lethality-approaches","parp-inhibitor"], cancers: ["ovarian", "nsclc", "clear-cell-ovarian-cancer"],
    links: [{"label":"Yap et al.: camonsertib phase 1 study in selected repair-deficient advanced solid tumors (2023)","url":"https://pubmed.ncbi.nlm.nih.gov/37277454/"},{"label":"Gatti-Mays et al.: prexasertib single-arm TNBC pilot (2020)","url":"https://pubmed.ncbi.nlm.nih.gov/32510664/"},{"label":"Duplessis et al.: single-payload ATR-inhibitor conjugates, AACR D3 2026 abstract A003","url":"https://doi.org/10.1158/1557-3265.d32026-a003"},{"label":"Halazonetis et al.: CHK1-inhibitor conjugate, AACR 2026 abstract 1714","url":"https://doi.org/10.1158/1538-7445.am2026-1714"}],
  },
  {
    id: "kat6-inhibitors", kind: "technology", name: "KAT6 inhibitors", sections: ["targeted-therapy","epigenetics"], status: "phase-3", asOf, wikipedia: W("KAT6A"),
    tldr: "First-in-class drugs against the histone acetyltransferases KAT6A and KAT6B, in late trials for hormone receptor-positive breast cancer that has stopped responding to endocrine therapy.",
    summary: "KAT6A is amplified in a subset of breast cancers and cooperates with the oestrogen receptor to drive gene expression. Inhibitors of KAT6A and KAT6B (PF-07248144, now in phase 3 with fulvestrant, and others) induce senescence in oestrogen receptor-positive breast cancer cells and produced durable responses in heavily pretreated patients in early trials, with dysgeusia and neutropenia as the main side effects. The class is also being explored in prostate cancer and lymphoma.",
    principle: "Small molecules bind the acetyl-CoA site of KAT6A/B, blocking histone H3 acetylation at oestrogen receptor target genes and triggering senescence.",
    strengths: ["New mechanism in endocrine-resistant breast cancer","Oral","Combines with fulvestrant and CDK4/6 inhibitors"],
    limitations: ["Dysgeusia and neutropenia","No approval yet"],
    technologies: ["epigenetic-drugs","endocrine-therapy"], cancers: ["breast-hr-positive"],
    links: [{ label: "Wikipedia", url: W("KAT6A") }],
  },
  {
    id: "genetically-engineered-mouse-models", kind: "technology", name: "Genetically engineered mouse models", sections: ["drug-discovery"], status: "established", asOf, wikipedia: W("Genetically_modified_mouse"),
    tldr: "Mice carrying the same mutations as human cancers so that tumours arise in the right tissue with an intact immune system; the KPC pancreatic model is the best known.",
    summary: "Genetically engineered mouse models (GEMMs) use tissue-specific promoters and inducible systems to switch on oncogenes such as Kras and delete tumour suppressors such as Trp53 or Pten, so tumours develop in situ with a native stroma and immune system. The KPC pancreatic cancer model, Kras-driven lung models and Pten-null prostate models are used to study tumour evolution, immunotherapy and prevention, and CRISPR now speeds model creation. They are slow, expensive and less genetically diverse than human tumours.",
    principle: "Cre-lox or inducible recombination activates or deletes cancer genes in a chosen cell type, producing autochthonous tumours over weeks to months.",
    strengths: ["Intact immune system and native microenvironment","Tumour initiation and evolution can be studied","Test prevention and early detection"],
    limitations: ["Slow and costly","Few driver mutations compared with human tumours","Mouse-specific biology"],
    technologies: ["pdx-models","organoids"], cancers: ["pancreatic","nsclc","prostate"],
    links: [{ label: "Wikipedia", url: W("Genetically_modified_mouse") }],
  },
  {
    id: "humanised-mouse-models", kind: "technology", name: "Humanised mouse models", sections: ["drug-discovery"], status: "established", asOf, wikipedia: W("Humanized_mouse"),
    tldr: "Immunodeficient mice given a human immune system from stem cells, so human immunotherapies and CAR-T cells can be tested against human tumours in a living animal.",
    summary: "Immunodeficient strains such as NSG and NOG accept human cells. Engrafting human CD34-positive haematopoietic stem cells or peripheral blood cells gives the mice a partly human immune system, which allows patient-derived tumours to be studied with human checkpoint inhibitors, bispecifics and cell therapies. Incomplete immune development, graft-versus-host disease with mature cells and high cost limit their use, and newer strains express human cytokines to improve myeloid and NK cell reconstitution.",
    principle: "Immunodeficient mice are irradiated and engrafted with human haematopoietic stem cells or lymphocytes, then implanted with human tumour cells or patient-derived xenografts.",
    strengths: ["Human immune-tumour interaction in vivo","Test agents that do not cross-react with mouse targets"],
    limitations: ["Incomplete immune reconstitution","Graft-versus-host disease","Expensive and variable"],
    technologies: ["pdx-models","car-t"],
    links: [{ label: "Wikipedia", url: W("Humanized_mouse") }],
  },
  {
    id: "cancer-cell-line-encyclopedias", kind: "technology", name: "Cancer cell line encyclopedias and dependency maps", sections: ["drug-discovery","ai-computation"], status: "established", asOf: "2026-11-10", wikipedia: W("Immortalised_cell_line"),
    tldr: "Public collections pair cancer cell-line molecular profiles with drug-response or genetic-screen measurements for use as research references.",
    summary: "The Cancer Cell Line Encyclopedia reported expression, copy-number and sequencing data from 947 human cancer cell lines, with profiles for 24 anticancer drugs across 479 of them (Barretina 2012). Tsherniak's Cancer Dependency Map analysed 501 RNA-interference loss-of-function screens, and Meyers reported CRISPR-Cas9 screens across 342 lines. These are distinct measurements and datasets, not a universal ground truth for patient response.",
    principle: "Molecular profiles, drug-response assays and genetic screens describe different properties of identified cultured populations.",
    strengths: ["Public reference data for research and benchmarking","Comparisons across characterised models"],
    limitations: ["Culture and sample selection affect representation","Genetic fitness and drug response are distinct measurements","Patient-level transportability requires separate validation"],
    technologies: ["synthetic-lethality-approaches","organoids"], targets: ["wrn","prmt5-mtap"],
    links: [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Immortalised_cell_line"},{"label":"Functional model interpretation: primary evidence","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC5709193/"},{"label":"Cancer-line strain variation","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC6522222/"},{"label":"Barretina et al. 2012: Cancer Cell Line Encyclopedia","url":"https://doi.org/10.1038/nature11003"},{"label":"Tsherniak et al. 2017: Cancer Dependency Map","url":"https://doi.org/10.1016/j.cell.2017.06.010"}], notes: ["Resource card. Retain the cell-line strain and identity, culture and screen metadata, assay endpoint, library, algorithm and release. A reference dataset is not universal ground truth for patient response. Fitness depletion can result from slower division or reduced survival; independent lines and independent patients define different sampling units. Sources: https://pmc.ncbi.nlm.nih.gov/articles/PMC6522222/ ; https://pmc.ncbi.nlm.nih.gov/articles/PMC5709193/"]},
  {
    id: "tumour-on-chip", companies: ["mimetas"], kind: "technology", name: "Tumour-on-a-chip", sections: ["drug-discovery"], status: "emerging", asOf: "2026-11-10", wikipedia: W("Organ-on-a-chip"),
    tldr: "A tumour-on-chip is an engineered culture device for studying selected tumour interactions under specified physical and biological conditions.",
    summary: "Chip devices can control selected cells, matrix, interfaces, transport or mechanical conditions. Their composition varies: channels do not automatically supply endothelium or immune cells. Huh's lung model separated alveolar and vascular compartments and imposed mechanical strain; Hassell studied lung cancer in defined engineered environments. Jenkins placed immune-containing organotypic spheroids in a collagen microfluidic compartment. These are capabilities of particular systems, not universal chip properties or validation for personal treatment selection.",
    principle: "Characterise the chosen geometry, components and conditions, then measure the response with matched controls.",
    strengths: ["Control over selected physical and biological interactions","Can examine transport or mechanical effects in a defined setting"],
    limitations: ["Geometry, composition and exposure require measurement","Material and delivery effects can confound biological interpretation","Does not reproduce whole-body physiology or establish clinical utility"],
    technologies: ["organoids","pdx-models"],
    links: [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Organ-on-a-chip"},{"label":"Functional model interpretation: primary evidence","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC5809290/"},{"label":"Primary lung-chip geometry","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC8335790/"},{"label":"Hassell et al. 2017: physical cues in lung cancer chips","url":"https://doi.org/10.1016/j.celrep.2017.09.043"},{"label":"Huh et al. 2010: primary lung-chip study","url":"https://pubmed.ncbi.nlm.nih.gov/20576885/"}], notes: ["Geometry and exposure. A porous interface, a perfused channel and a tissue compartment are separate features. In Huh's design, a membrane separated epithelial and endothelial layers and vacuum channels imposed deformation. Jenkins used collagen containing spheroids in a central channel. These geometries must not be silently interchanged. A fictional one-micromolar inlet illustrates a reading rule: concentration at an inlet is not a measurement at each cell. Sources: https://pmc.ncbi.nlm.nih.gov/articles/PMC8335790/ ; https://pmc.ncbi.nlm.nih.gov/articles/PMC5809290/ One micromolar means one micromole per litre; it is the nominal inlet value in this example, not a measured cellular exposure.","Model and assay card. Record viable cell/tissue sources, matrix, channel geometry, material, flow or exchange conditions, barrier performance, loading losses and quality window. Preparation, loading and endpoint assays use finite material. Report the actual endpoint and units: attributed counts or death, permeability, cytokine concentration or motion, with time and denominator. Verify initial composition, baseline survival and local exposure; incompatible materials, unequal delivery and poor barriers can confound results. Device and assay acceptance criteria are method-specific. A chip may combine bioprinting, organoids or co-culture without recreating complete circulation. Microfluidics controls fluid in small channels. Perfusion supplies fluid through a system; it does not itself recreate human circulation or prove a functional vascular lining. Immune cells, if present, still need recognition and attribution controls. A tumour-on-chip is a living experimental device, whereas an in-silico model computes predictions. A device without the required immune cells cannot test their checkpoint interaction. Cells can alter the engineered environment, so both the design and its measured biological state matter; added detail alone does not establish better prediction.","In Hassell's defined lung-cancer chip systems, breathing-related physical cues affected growth, invasion and responses to tyrosine kinase inhibitors. This is a context-dependent experimental finding, not a claim that every chip reproduces a whole organ or predicts all cancers. Jenkins described spheroids retaining autologous immune and stromal components in a collagen channel, with components and windows tied to that protocol. Sources: https://doi.org/10.1016/j.celrep.2017.09.043 ; https://pmc.ncbi.nlm.nih.gov/articles/PMC5809290/"],
"related": [
  "bioprinting"
]
},
];
