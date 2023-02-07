import { h } from 'preact';
import style from './shared.css';
import ContentPillar from './ContentPillar';
import OrganismPillar from './OrganismPillar';
import LoadModal from './LoadModal';
import Pill from './Pill';
import Result from './Result';
import { Br1, Br2 } from './Br';
import { useLayoutEffect, useState, useRef } from 'preact/hooks';

const ResultsPillar = ({isSearching, results, resultPills, toBack}) => {

  const sample = {
    "id": 6182,
    "oid": "SN0521",
    "orgclass": "SN",
    "orgid": "SN006182",
    "orgtype": "Animal",
    "family_id": 372,
    "family": "Elapidae",
    "genus_id": 1661,
    "genus": "Pseudechis",
    "species": "australis",
    "species_identifier": "SNE-73/PeAus",
    "subspecies": null,
    "common_names": "Mulga Snake , King Brown Snake",
    "region_code": "71",
    "region": "Australia",
    "countries": "Australia",
    "distribution": "Australia (Widespread across mainland Australia) : Western Australia (except SW coast), Northern Territory (including Melville and Groodt Eylandt), Queensland, northern and central South Australia, New South Wales (except east coast and Murray River Basin).",
    "map_image_small": "SNMS0521.gif",
    "map_image_large": "SNML0521.gif",
    "map_image_thumb": "SNMT0521.gif",
    "local_names": "",
    "ord": "",
    "phylum": "",
    "subclass": "",
    "suborder": "",
    "subfamily_id": 9,
    "subfamily": "Elapinae",
    "class": "",
    "venomous_or_poisonous": "Venomous",
    "clinical_significance": null,
    "incomplete_record": null,
    "approx_dry_bite": "10-20%",
    "cause_of_death": "",
    "children": null,
    "clinical_photos": "",
    "comments": "Snakes included in this group are Australian Elapid snakes (especially species in the following Genera; Acanthophis, Austrelaps, Hoplocephalus, Notechis, Oxyuranus, Pseudechis, Pseudonaja, Tropidechis), sea snakes, kraits (Bungarus spp.), coral snakes (from Americas and Asia; Micrurus, Micruroides, Maticora, Calliophis), mambas (Dendroaspis spp.), shield nose snakes (Aspidelaps spp.), African garter snakes (Elapsoidea spp.), selected cobras, such as Philippines cobra (Naja philippinensis), forest cobra (Naja melanoleuca), Egyptian cobra (Naja haje), Cape cobra (Naja nivea), water cobra (Boulengerina spp.), oxus cobra (Naja oxiana), black desert cobra (Walterinnesia aegyptia). King cobras (Ophiophagus hannah), though capable of causing local tissue injury at the bite site, are likely to cause paralysis which may prove lethal if untreated, therefore these snakes should also be included in the above grouping.",
    "dangerousness": null,
    "dangerousness_index": null,
    "detail_coagulopathy": "Coagulopathy is uncommon, is of the pure anticoagulant type, with a low incidence of major bleeding",
    "detail_haemorrhagins": "Pathologic bleeding not likely to occur",
    "detail_local_effects": "The bitten area is usually painful & moderately to markedly swollen & this may extend up the bitten limb",
    "detail_myotoxicity": "Myolysis is common & may be moderate to severe, with potential for renal failure & hyperkalaemia",
    "detail_necrosis": "Local necrosis around the bite site is rarely reported and is usually minor",
    "detail_nephrotoxicity": "Uncommon, but may be moderate to severe, potential renal failure",
    "detail_neurotoxicity": "Neurotoxicity is rarely reported after bites by this species and is usually minor, mostly ptosis only",
    "detail_other": "No other clinically important effects are noted",
    "detail_prognosis": "Fatal outcome common in untreated severe cases",
    "elderly": null,
    "general_cardiotoxicity": "Uncommon, secondary to myolysis-induced hyperkalaemia",
    "general_coagulopathy_and_haemorrhages": "Uncommon to rare, but may be moderate to severe coagulopathy",
    "general_general_system_effects": "Variable non-specific effects which may include headache, nausea, vomiting, abdominal pain, diarrhoea, dizziness, collapse or convulsions",
    "general_local_effects": "Local pain, swelling & bruising",
    "general_local_necrosis": "Rarely occurs, minor only",
    "general_myotoxicity": "Very common, major clinical effect, usually moderate to severe",
    "general_neurotoxic_excitability": "",
    "general_neurotoxic_paralysis": "Rarely reported, usually minor",
    "general_other": "Not likely to occur",
    "general_rate_of_envenoming": "40-60%",
    "general_renal_damage": "Recognised complication, usually secondary to myolysis",
    "general_untreated_lethality_rate": "30-40%",
    "general_venom_anticoagulants": "Direct coagulation inhibitor",
    "general_venom_cardiotoxins": "Not present",
    "general_venom_haemorrhagins": "Not present",
    "general_venom_myotoxins": "Systemic myotoxins present",
    "general_venom_necrotoxins": "Not present",
    "general_venom_nephrotoxins": "Secondary nephrotoxicity only",
    "general_venom_neurotoxins": "Possibly present but not clinically significant",
    "general_venom_other": "Not present or not significant",
    "general_venom_procoagulants": "Not present",
    "immediate_effects": "",
    "specific_clinical_effects": "Bites by the mulga snake (king brown), though probably common, at least in the northern half of Australia, are only rarely reported, so a rate of envenoming is not known, but based on size and experience with related species, is probably at least 30%, possibly much higher. These are large snakes, with moderate sized fangs and plenty of venom, more than any other Australian snake on average milking. However, the venom is less toxic than some other Australian snakes and deaths are rarely recorded.\r\n\r\nA typical mulga snake bite is associated with moderate to marked local pain and often extensive swelling that may be severe and extend beyond the bitten limb. Obvious swelling is evident in most significant bites by 3 hrs after the bite. Local bruising and erythema may occur but more often is absent, but sero sanguinous oozing from the bite site is common. Local necrosis is rare and has mostly occurred after use of inappropriate first aid.\r\n\r\nGeneral symptoms of systemic envenoming include headache, nausea, vomiting, abdominal pain, diarrhoea, collapse, possibly convulsions. \r\n\r\nThe hallmark features of mulga snake envenoming are the local swelling and systemic myolysis. Anticoagulant coagulopathy can also occur, but is less common and usually only mild.\r\n\r\nThe myolysis will usually be apparent in the first few hours, as muscle pain, tenderness, weakness, associated with dark red or brown/black urine, a sign of myoglobinuria. The CK levels can be extreme, occasionally exceeding 1,500,000 IU/l. There may be secondary renal damage or failure, though this is not constant, but is especially concerning if there is also hyperkalaemia, as it increases the chance of potentially lethal cardiotoxicity. Peak symptoms and CK may not be reached until 2-3 days after the bite, with only slow resolution thereafter. There is an exceptional single case of multiple bites by a mulga snake resulting in severe myolysis and compartment syndrome in the bitten limb (an arm), with consequent necrosis, secondary infection, gangrene and amputation of the arm (information from Prof. B. Currie).\r\n\r\nThe coagulopathy, not always present and mostly mild, is pure anticoagulant, characterized by prolonged to grossly prolonged INR/PT, less prolongation of aPTT, normal fibrinogen and no or minimal elevation of FDP/d-dimer and a normal platelet count. Spontaneous bleeding is rare. Lethal haemorrhages have not been reported. The coagulopathy reverses quickly with antivenom therapy.\r\n\r\nClassic flaccid paralysis does not occur with mulga snake bites, but there are sporadic reports of ptosis associated with more severe bites. It is unclear if this is a neurotoxic or myotoxic effect.",
    "key_diagnostic_features": "Local pain & swelling + myolysis ± anticoagulant coagulopathy ± renal failure",
    "neurotoxic_other_effects": "",
    "pregnancy": null,
    "prognosis": null,
    "reference": "White J. (1987) A review of 105 cases of suspected snakebite in South Australia. In : Progress in Plant and Animal Toxins. Eds. Gopalakrishnakone P. and Tan C.K..  Venom and Toxin Research Group, National Singapore Univ., Singapore, pp 15-18.\r\n\r\nWalpole B.G. (1996) Letters : Suspected snakebite in children : a study of 156 patients over 10 years.  Med. J. Aust., Vol. 165, p 173.\r\n\r\nWhite J. (1998) Envenoming and antivenom use in Australia. Toxicon, Vol. 36(11), pp 1483-1492.\r\n\r\nWhite J. (1980) Ophidian envenomation a South Australian perspective. Records of the Adelaide Children's Hospital, Vol. 2(3), pp 311-421.\r\n\r\nRowlands J.B., Mastaglia F.L., Kakulas B.A., Hainsworth D. (1969) Clinical and pathological aspects of a fatal case of mulga ( Pseudechis australis ) snakebite. Med. J. Aust., Vol. 1, No. 5, pp 226-230.\r\n\r\nCampbell C.H. (1969) Fatal case of mulga ( Pseudechis australis ) snakebite. Med. J. Aust., Vol. 1, p 426.\r\n\r\nCampbell C.H. (1969) Clinical aspects of snake bite in the Pacific Area. Toxicon, Vol. 7, pp 25-28.\r\n\r\nCampbell C.H. (1967) Antivenene in the treatment of Australian and Papuan snake bite. Med. J. Aust., July 15, pp 106-110.\r\n\r\nVines A.  (1978)  Severe local reaction to bite of King Brown snake. Med. J. Aust., June 17, p 657.\r\n\r\n",
    "status": "Checked",
    "untreated_lethality": "34%",
    "venom_activity": "Myotoxin, Anticoagulant, Nephrotoxin ?",
    "case_summary": null,
    "poison": null,
    "first_aid": "FAD-41",
    "infraspecific_epithet": null,
    "descr": "First aid for bites by Elapid snakes which do not cause significant injury at the bite site (see Comments for partial listing), but which may have the potential to cause significant general (systemic) effects, such as paralysis, muscle damage, or bleeding.",
    "habitat": "Found in almost all Australian mainland habitats from the wettest tropical forests to the driest interior deserts. Does not inhabit swamps, alpine regions, the cooler southern fringes, Tasmania or the wetter southeastern coast, slopes, plains and ranges of Australia. Found in savanna and savanna woodlands of New Guinea.",
    "odor": null,
    "toxin_classification": null,
    "toxins": null,
    "toxic_portion": null,
    "lethal_dose": null,
    "toxic_dose": null,
    "clinical_effects_overview": null,
    "primary_clinical_effects": null,
    "nicotinic_effects": null,
    "atropine_effects": null,
    "gastrointestinal_effects": null,
    "cardiovascular_effects": null,
    "hallucinogenic_effects": null,
    "genitourinary_effects": null,
    "hepatic_effects": null,
    "respiratory_effects": null,
    "haematologic_effects": null,
    "cns_effects": null,
    "neurological_effects": null,
    "psychiatric_effects": null,
    "musculoskeletal_effects": null,
    "metabolic_effects": null,
    "dermatologic_effects": null,
    "allergic_effects": null,
    "other_effects": null,
    "major_risks": null,
    "lethality_cause": null,
    "ref": "",
    "diagnosis": null,
    "laboratory_tests": null,
    "treatment_overview": null,
    "treatment_general": null,
    "antidotes": null,
    "complications": null,
    "follow_up": "Follow up all cases given antivenom therapy, checking particularly for serum sickness",
    "route": null,
    "time_elapsed": null,
    "gastrointestinal": null,
    "mouth_throat": null,
    "cardiotoxin": "Y",
    "haemostasis_and_bleeding": "Y",
    "haematologic_rbc": "N",
    "haematologic_wbc": "N",
    "haematologic_platelet": "N",
    "musculoskeletal": null,
    "myotoxic": "Y",
    "neurotoxic_paralytic": "Y",
    "neurotoxic_excitatory": "N",
    "neurological": null,
    "dermatological": "N",
    "localised": "Y",
    "necrotoxin": "Y",
    "cardiovascular": "N",
    "respiratory": "N",
    "angio_oedema_or_allergic": "N",
    "venom_spit_ophthalmia": "N",
    "anterior_pituitary_haemorrhage": "N",
    "other": "N",
    "general_system": "Y",
    "renal": "Y",
    "kidney": null,
    "purple_urine": null,
    "hallucinogenic": null,
    "hepatic": null,
    "metabolic": null,
    "com_cardiotoxin_effects": null,
    "com_general_systemic_effects": null,
    "com_haemostasis_and_bleeding_effects": null,
    "com_haematologic_rbc_effects": null,
    "com_haematologic_wbc_effects": null,
    "com_haematologic_platelet_effects": null,
    "com_local_effects": null,
    "com_myotoxic_effects": "Myolysis possible (CK>1500 IU/l)",
    "com_necrotoxin_effects": null,
    "com_neurotoxic_excitatory_effects": null,
    "com_neurotoxic_paralytic_effects": null,
    "com_dermatological_effects": null,
    "com_cardiovascular_effects": null,
    "com_respiratory_effects": null,
    "com_angio_oedema_or_allergic_effects": null,
    "com_venom_spit_ophthalmia_effects": null,
    "com_anterior_pituitary_haemorrhage_effects": null,
    "com_other_effects": null,
    "com_renal_effects": null,
    "breeding": "Mates in October and November in the southern portions of its range and somewhat a-seasonal in the northern portions (perhaps related to the distinct wet and dry seasons). Oviparous, about 9 or 10 (range of 4 to 19) eggs laid in December and January (southern portions of the range).",
    "dentition": "Front fangs located at anterior end of maxillary bone (proteroglyphous). Fang length approximately 6.5 mm.",
    "organism_type_biology": null,
    "habits": "Mainly a diurnal and terrestrial forager in cooler weather and southern portions of its range and crepuscular or nocturnal in hotter weather and northern portions of its range. Shelters in abandoned animal burrows, deep soil cracks, under logs, under large rocks, in rock cavities and crevices. Disposition seems to vary by region. Southern specimens tend to be quite shy and only bite if provoked, whereas some northern specimens are quite excitable and may bite if approached.",
    "hemipenis": "",
    "juveniles": "",
    "lethality": "",
    "prey": "Feeds on a diverse range of prey including many lizard species ( particularly skinks and agamids ), snakes, small mammals ( particularly mice ), frogs, birds and eggs.",
    "sexual_dimorphism": "Males grow larger than females.",
    "image_no": 1,
    "image": "SNP05211.jpg",
    "image_thumb": "SNPT05211.jpg",
    "image_caption": "Pseudechis australis  ( Mulga Snake )  [ Original photo copyright © Dr Julian White ]",
    "adult_length": "2.00 m",
    "coloration_markings": "Dorsal surface body colour is light to dark brown, reddish brown, coppery brown, dark olive brown or blackish brown. The individual scales often have darker edging or darker tips forming a reticulated pattern. Northern specimens have very little or no darker edging on scales and are generally lighter in colour. Southern specimens have more darker edging (which may completely cover the scale) and are generally darker in colour. Tail is  usually darker than the body. Head dorsum is usually uniform in colour and similar to dorsal surface body colour. Iris is reddish brown with a thickish orange rim around the pupil. Ventral surface colour is most often cream, yellow or yellowish green.",
    "short_descr": "",
    "distinguishing_features": "",
    "fish_code": "",
    "other_comments": "",
    "size": "",
    "status_notes": "",
    "anals_category": 1,
    "anals_detail": "mixed, single anteriorly-divided posteriorly",
    "general_shape": "Large in length, moderately slender and moderately robust snake with a medium length tail. Can reach a maximum total length of over 2.70 metres. Head is broad, with a rounded snout, somewhat bulbous cheeks in large specimens and  barely distinct from robust neck. The brow ridge is medium to long. Eyes are medium in size with round pupils. Head and body scales are semi-glossy to glossy.",
    "head_scales": "The usual 9 supracephalic head shields, rostral wider than high, frontal small about as wide as supraoculars and slightly longer than supraoculars,  preocular in contact with single nasal, suboculars absent, 2 postoculars, temporals 2 + 2 (lower anterior temporal largest and most often not in contact with postoculars resulting in a 1 + 3 formula), 6 supralabials (3rd and 4th in contact with eye) and 6 infralabials.",
    "max_mid_body_rows": "19",
    "max_subcaudals": "75",
    "max_ventrals": "225",
    "min_mid_body_rows": "17",
    "min_subcaudals": "50",
    "min_ventrals": "185",
    "modal_mid_body_rows": "17",
    "abs_lymph": "Lymphopenia",
    "adverse_av_reaction_mngt": "See standard guidelines on antivenom pages of this site",
    "antivenom_dosage": "Refer to dosage schedule for relevant antivenoms listed on this site",
    "antivenom_key": "SAuCSL09,SAuCSL12",
    "antivenom_reactions": "Full range possible; see relevant section in antivenom pages",
    "antivenom_therapy": "Antivenom is the key treatment for systemic envenoming. Multiple doses may be required.",
    "apao2": "Normal",
    "aptt": "Potentially prolonged",
    "cardiotoxin_effects_mngt": "Monitor for secondary cardiotoxicity due to hyperkalaemia induced by myolysis",
    "ck": "Potentially grossly elevated",
    "creatinine": "Secondary renal failure",
    "fdpxdp": "Normal",
    "fibrinogen": "Normal",
    "first_aid_text": "Keep victim still, apply pressure immobilisation bandage & splint, do not wash bite area, transport to medical care",
    "general_approach_to_mngt": "All cases should be treated as urgent & potentially lethal. Rapid assessment & commencement of treatment including appropriate antivenom (if indicated & available) is mandatory. Admit all cases.",
    "general_systemic_effects_mngt": "Symptomatic care + IV fluids (as required)",
    "haematologic_effects_mngt": "Give appropriate antivenom at first sign of significant coagulopathy or pathologic bleeding, monitor coagulation, be prepared to give further doses",
    "haematologic_other_effects_mngt": "Not applicable",
    "hb": "Normal",
    "immediate_effects_mngt": "Establish IV line, IV fluids, secure airway, maintain respiration if imperiled, treat hypotension (if present), do not clean wound until venom detection performed",
    "important_laboratory_test": "Coagulation (WBCT or PT/INR, aPTT, fibrinogen, FDP/XDP); FBC/CBP (platelets, Hb, WCC, absolute lymphocyte count); renal function (creatinine, urea); CK; electrolytes (K, Na, Cl, Glucose).\r\n\r\n(*** fibrinogen level is only useful if it can be reliably measured to very low levels; many labs are unable to do this or may use indirect measurement and in this setting fibrinogen is not a useful test and could be omitted)",
    "k": "Potential secondary elevation",
    "local_effects_mngt": "Do not clean wound",
    "myotoxic_effects_mngt": "Ensure good renal flow (adequate IV fluids),  consider appropriate antivenom, consider alkalinising urine, watch for secondary renal damage & hyperkalaemia",
    "necrotoxin_effects_mngt": "Local necrosis unlikely",
    "neurotoxic_excitatory_effects_mngt": "Excitatory neurotoxic effects not likely",
    "neurotoxic_other_effects_mngt": "Not applicable",
    "neurotoxic_paralytic_effects_mngt": "Paralytic effects not likely or only mild (eg ptosis only)",
    "other_issues_in_trmt": "Not applicable",
    "other_specific_effects_mngt": "Ensure tetanus immunisation, after any coagulopathy reversed",
    "platelets": "Normal",
    "pt_inr": "Potentially prolonged",
    "renal_effects_mngt": "Monitor renal function & output, consider IV fluid load, treat renal failure as required",
    "treatment_key": "Mulga snake bites have a high potential for major envenoming and require urgent assessment. For all cases with significant systemic effects (especially myolysis, anticoagulant coagulopathy) give antivenom.",
    "treatment_summary": "Bites by mulga snakes are characterized by local pain, swelling and systemic myolysis, occasionally anticoagulant coagulopathy, and secondary renal failure. Rarely, there may be evidence of mild paralysis, usually limited to ptosis only. Probably most bites will develop at least some systemic envenoming, so many cases will require antivenom therapy. Admit all cases of definite or suspected bites.\r\n\r\nOn presentation, establish a good IV line, commence IV fluids, take bloods for initial tests (\"extended coagulation tests\" = PT/INR, aPTT, fibrinogen level***, FDP/XDP, platelet count; CK, urea, creatinine, WCC, K+), perform venom detection on the bite site (if uncertain of identity of snake). (*** fibrinogen level is only useful if it can be reliably measured to very low levels; many labs are unable to do this or may use indirect measurement and in this setting fibrinogen is not a useful test and could be omitted)Unless contraindicated by pre-existing medical conditions, give an IV fluid load (1L over 2-3 hrs in an adult; volume determined by weight in a child), then keep well hydrated thereafter (100-150 mL/hr in an adult), while carefully watching for fluid overload, monitoring fluid input and output. If a first aid bandage is in place over the bitten limb, leave on until the blood tests, venom detection and full examination are complete and results available. To perform venom detection cut away the bandage immediately over the bite area, to swab for venom. Keep the cut-away bandages, in case they are needed later for venom detection.\r\n\r\nIf the patient presents with envenoming clearly established, or blood tests show evidence of systemic envenoming (high and/or rising CK, less commonly an anticoagulant coagulopathy, with prolonged PT/INR, aPTT, but normal fibrinogen level and normal or barely elevated FDP/XDP), then commence antivenom therapy prior to removal of first aid. Initial dose should be 1 vial of CSL Black Snake AV IV (only in severe cases would >1 vial be needed initially), diluted up to 1:10 (less in children, to avoid volume overload), with adrenaline ready to treat anaphylaxis, should this occur.\r\n\r\nRepeat blood tests 3 hrs after completion of initial dose of antivenom therapy, to determine if myolysis has been arrested (no further or minimal rise in CK) and any coagulopathy reversed (PT/INR and aPTT falling towards normal). If the CK has continued to climb dramatically, consider giving further antivenom. If the 3hr tests suggest improvement then wait 2-3 hrs and retest. If there is continued improvement, it is likely no further antivenom will be needed. If, however, there has been no improvement or worsening, give further antivenom. The role of antivenom in reversing myolysis is controversial, but given the potential lethality of severe myolysis, further antivenom therapy should always be considered.\r\n\r\nFor cases where initial blood tests show no sign of either myolysis (CK) or anticoagulant coagulopathy, no antivenom is required at this stage, but repeat tests 2-3 hrs and 5-6 hrs later and if these show developing envenoming, treat with antivenom, as discussed earlier.\r\n\r\nFor cases with myolysis, CK may rise to very high levels, >100,000 IU/L. This is accompanied by muscle pain, tenderness and weakness in most cases. There will also be gross myoglobinuria (red to black urine) and the risk of renal failure. Hyperkalaemia can develop secondary to myolysis and is more severe if there is secondary renal failure. It can cause cardiotoxicity and is potentially lethal and may be difficult to treat.\r\n\r\nThe anticoagulant coagulopathy is only rarely associated with significant bleeding and in most cases will be rapidly and completely reversed by antivenom therapy. It is distinguished from the defibrination commonly seen with bites by some other Australian snakes (brown snakes, tiger snakes, taipans etc) by the normal fibrinogen level and absence of high levels of FDP/XDP.\r\n\r\nMulga snake bites commonly develop both local pain and swelling. The latter may be quite extensive, but local necrosis is rare. The swelling may take several days to > week to settle fully and may look like cellulitis. If there is a strong suspicion of secondary infection with cellulitis, then antibiotic therapy, initially IV, is required, but in most cases of mulga snake bites, antibiotics are not required. Tetanus immunisation status should always be checked and a booster given when indicated, but not until any coagulopathy has been reversed.\r\n\r\n",
    "urea": "Secondary renal failure",
    "wbct": "Possibly prolonged",
    "wcc": "Leukocytosis",
    "antivenom_studies": "",
    "average_venom_qty": "180 mg ( dry weight  of milked venom ), Meier and White (1995) ( Ref : R000001 ).\r\n\r\n150 to 300 mg ( dry weight ), Minton (1974) ( Ref : R000504 ).",
    "cardiotoxins": "",
    "component_ld50": "Mulgatoxin A  LD50  ip (mice) = 0.2 mg / kg. \r\nLeonardi et al (1979) ( Ref : R000053 ).\r\n\r\nP. australis VIII-A LD50  sc (mice) = 7.7 mg / kg. Mebs and Samejima (1980) ( Ref : R000024 ).\r\n\r\nPa-10A  LD50  iv (mice) = 0.10 mg / kg. Nishida et al (1985) ( Ref : R000054 ).\r\n\r\nPa-11  LD50  iv (mice) = 0.23 mg / kg. Nishida et al (1985) ( Ref : R000054 ).\r\n\r\nPa-13  LD50  iv (mice) = 7.4 mg / kg ( not lethal ). Nishida et al (1985) ( Ref : R000054 ).\r\n\r\nPa-1G  LD50  iv (mice) = 0.13 mg / kg. Takasaki et al (1990) ( Ref : R000622 ).\r\n\r\nPa-3  LD50  iv (mice) = 0.21 mg / kg. Takasaki et al (1990) ( Ref : R000622 ).\r\n\r\nPa-5  LD50  iv (mice) = 0.09 mg / kg. Takasaki et al (1990) ( Ref : R000622 ).\r\n\r\nPa-8  LD50  iv (mice) = 0.11 mg / kg. Takasaki et al (1990) ( Ref : R000622 ).\r\n\r\nPa-9C  LD50  iv (mice) = 4.7 mg / kg. Takasaki et al (1990) ( Ref : R000622 ).\r\n\r\nPa-10A  LD50  iv (mice) = 0.18 mg / kg. Takasaki et al (1990) ( Ref : R000622 ).\r\n\r\nPa-10F  LD50  iv (mice) = 0.28 mg / kg. Takasaki et al (1990) ( Ref : R000622 ).\r\n\r\nPa-11  LD50  iv (mice) = 0.24 mg / kg. Takasaki et al (1990) ( Ref : R000622 ).\r\n\r\nPa-12A  LD50  iv (mice) = 0.23 mg / kg. Takasaki et al (1990) ( Ref : R000622 ).\r\n\r\nPa-12B  LD50  iv (mice) = 0.43 mg / kg. Takasaki et al (1990) ( Ref : R000622 ).\r\n\r\nPa-12C  LD50  iv (mice) = 0.22 mg / kg. Takasaki et al (1990) ( Ref : R000622 ).\r\n\r\nPa-13  LD50  iv (mice) = 6.8 mg / kg. Takasaki et al (1990) ( Ref : R000622 ).\r\n\r\nPa-15  LD50  iv (mice) = 3.4 mg / kg. Takasaki et al (1990) ( Ref : R000622 ).",
    "cross_reactivity": "",
    "crude_venom": "Crude venom : Produced a concentration dependent and progressive inhibition of directly and indirectly evoked twitches of mouse hemidiaphragm. 2, 5 and 10 µg / ml produced complete blockade of directly evoked twitches after 87 ± 26, 66 ± 28 and 56 ± 13 mins respectively and twitches elicited by indirect stimulation were blocked after 43 ± 4, 34 ± 2 and 21 ± 2 mins respectively. It also progressively inhibited twitch responses of chick biventer cervicis muscle evoked by nerve stimulation. 2, 5 and 10 µg / ml produced 90% blockade in 127 ± 12, 41 ± 8 and 26 ± 6 mins respectively. The venom caused severe muscle damage and necrosis in both chick and mouse skeletal muscle proportional to the venom dose. Muscle degeneration was characterised by disorganized myofibrils, dilatation of the sarcoplasmic reticulum and swollen or broken down mitochondria. A depletion and decrease in population of storage vesicles in the neuromuscular junction was also reported. Chen et al (1994) ( Ref : R000747).",
    "haematological_haemorrhagins": "Kellaway and Thompson (1930) ( Ref : R000057 ) carried out extensive animal testing of venom and reported a marked delay in coagulation time and demonstrated haemolytic activity.  \r\n\r\nPa-serpin-1 and Pa-serpin-2 : Masci et al (1989) ( Ref : R000056 ) isolated and characterised two different single chain polypeptide coagulation inhibitors Pa-serpin-1 ( Mol. Wt. 18,000 ) and Pa-serpin-2 ( Mol. Wt. 27,000 ). Both block the generation of Factor Xa and the action of Factor Xa on prothrombin. They have no haemolytic or neurotoxic activity. \r\n\r\nMPSA : Sharpe et al (1989) ( Ref : R000055 ) reported direct haemolytic and anticoagulant activity.",
    "maximum_venom_qty": "600 mg ( dry weight  of milked venom ), Meier and White (1995) ( Ref : R000001 )",
    "myotoxins": "Mulgatoxin A : Leonardi et al (1979) ( Ref : R000053 ) isolated this strong myotoxin. It has a single polypeptide chain of 122 AA residues cross linked by seven disulfide bridges and a Mol. Wt. of 13,000. Mulgatoxin A causes myoglobinuria and skeletal muscle damage both in vitro and in vivo, but no evidence of damage is seen in cardiac or smooth muscle. Leonardi et al (1979) ( Ref : R000053 ).\r\n\r\nPa-11 and Pa-13 : Nishida et al (1985) ( Ref : R000054 ) isolated these two PLA2's of 118 AA residues and 7 disulfide bridges, Mol. Wts. 12,951 and 13,197, isoelectric points pI= 10.5 and 10.0 respectively. Only Pa-11 was shown to be lethal to mice. Specific enzymatic activities were 2520 and 85 µmoles free fatty acids / min / mg protein respectively.\r\n\r\nPa-10A, Pa-11 and Pa-13 : Using chick biventer cervicis and mouse diaphragm, Rowan et al (1989)  ( Ref : R000085 ) reported that Pa-10A and Pa-11 reduced responses to indirect stimulation and responses to direct stimulation were affected more slowly. Pa-13 was far less potent. All resulted in muscle paralysis by reducing ACh release and directly blocking muscle fibre contractility.\r\n\r\nP. australis VIII-A [ Pa VIII-A ] : Mebs and Samejima (1980) ( Ref : R000024 ) isolated the 122 AA single polypeptide chain with seven disulfide bridges. It caused myoglobinuria when injected subcutaneously in mice at a dose of 5.0 mg / kg. Sutherland and Campbell (1980) ( Ref : R000058 ) confirmed the myolytic toxicity in monkeys.\r\n\r\nMPSA : Sharpe et al (1989) ( Ref : R000055 ) isolated the 119 AA  single polypeptide chain with seven disulfide bridges, Mol. Wt. of 13,000 and reported direct myotoxic, haemolytic and anticoagulant activity.\r\n\r\nPA myotoxin ( Myoglobinuria inducing toxin ) : Mol. Wt. approx. 13,500, similar to Pa VIII-A. Myoglobinuria was observed in mice one hour post injection into calf muscle ( 4.5 mg / kg  im ). Severe necrosis was observed as early as 30 minutes post injection. Light microscopy revealed hypercontraction of muscle fibres with delta lesions and vacuolation. Infiltration of muscle fibres with macrophages was observed at 3 hours, peaking at 12 to 48 hours. The kidney showed myoglobin casts in both proximal and distal tubules, collecting ducts and loops of Henle. They concluded the myotoxin probably acts on the Z-disc structures and causes renal damage due to \"myoglobin cast nephropathy\". Electron microscopy revealed disruption of the sarcolemma with dissolution and degeneration of the Z-band. Degeneration of I-band was followed by degeneration of the A-band. Ponraj and Gopalakrishnakone (1995) ( Ref : R000795 ).",
    "necrotoxins": "",
    "nephrotoxins": "",
    "neurotoxins_channel_toxins": "Kellaway and Thompson (1930) ( Ref : R000057 ) found no evidence of neurotoxicity in extensive animal testing.",
    "other_ld50_estimates": "1.91 mg / kg  sc ( mice, bovine serum albumin ), Broad et al (1979) ( Ref : R000006 ).\r\n\r\n0.30 mg / kg  iv ( mice ), Minton (1974) ( Ref : R000504 ).\r\n\r\n1.5 mg / kg  sc ( mice ), Minton (1974) ( Ref : R000504 ).",
    "other_studies": null,
    "other_toxins": "",
    "preferred_ld50_estimate": "2.38 mg / kg  sc ( mice ), Meier and White (1995) ( Ref : R000001 )",
    "venom_components": "1.  Mulgatoxin A ( myotoxin with PLA2 activity ) isolated by Leonardi et al (1979) ( Ref : R000053 ). \r\n\r\n2.  P. australis VIII-A ( myotoxin with PLA2 activity ) [ Syn : Pa VIII-A ] isolated by Mebs and Samejima (1980) ( Ref : R000024 ). \r\n\r\n3.  Pa-10A, Pa-11 and Pa-13 PLA2's isolated by Nishida et al (1985) ( Ref : R000054 ).\r\n\r\n4.  MSPA isolated by Sharpe et al (1989) ( Ref : R000055 ). \r\n\r\n5.  Pa-serpin-1 and Pa-serpin-2 ( coagulation inhibitors ) isolated by Masci et al (1989) ( Ref : R000056 ).\r\n\r\n6.  13 PLA2 enzymes ( including those isolated by Nishida et al listed above ) : \r\n\r\nPa-1G ( mixture of Pa-1Ga and Pa-1Gb ) : Mol. Wt. 12, 500 ( Native ), 12,800 ( Denatured ), 117 AA residues, isoelectric point pI = 6.4, PLA2 activity 10,500 µmoles fatty acid released / min / mg. Takasaki et al (1990) ( Ref : R000622 ) and Takasaki et al (1990) ( Ref : R000623 ). Pa-1G blocked directly elicited mouse hemidiaphragm twitch responses and indirectly elicited mouse and chick nerve muscle preparation twitch responses. The toxin acts primarily postsynaptically to depress muscle contractility. Geh et al (1992) ( Ref : R000708 ). Pa-1G was shown to have depressive effects on neuromuscular function. Transmission release tudies were carried out on mouse triangularis sterni preparations to assess the presynaptic / postsynaptic effects of the toxin on neuromuscular transmission. These experiments demonstrated that Pa-1G had postsynaptic activity by causing a reduction in muscle fibre resting membrane potential. Fatehi et al (2002) ( Ref : R001001 ).\r\n\r\nPa-3 ( mixture of Pa-3a and Pa-3b ) : Mol. Wt. 12, 500 ( Native ), 13,200 ( Denatured ), 118 AA residues, isoelectric point pI = 7.5, PLA2 activity 8,480 µmoles fatty acid released / min / mg. Takasaki et al (1990) ( Ref : R000622 ) and Takasaki et al (1990) ( Ref : R000623 ). Reduced responses to chick biventer cervicis preparation to nerve stimulation and to exogenously applied acetycholine, carbachol and KCl in a time and concentration dependent manner. Also blocked twitches of mouse hemidiaphragm preparation evoked by nerve and by direct muscle stimulation. Reduced postsynaptic sensitivity to acetycholine and carbachol. It also reduced the amplitude and quantal content of end plate potentials indicating a presynaptic effect to decrease the release of acetycholine. However, myotoxicity would appear the predominant effect of this toxin. Fatehi et al (1994) ( Ref : R000766 ).\r\n\r\nPa-5 ( mixture of approx. 35 % Pa-5a and 65% Pa-5b ) : Mol. Wt. 13,000 ( Native ), 12,800 ( Denatured ), 118 AA residues, isoelectric point pI = 8.4, PLA2 activity 7,380 µmoles fatty acid released / min / mg. Takasaki et al (1990) ( Ref : R000622 ) and Takasaki et al (1990) ( Ref : R000623 ). Pa-1G blocked directly elicited mouse hemidiaphragm twitch responses and indirectly elicited mouse and chick nerve muscle preparation twitch responses. The toxin acts primarily postsynaptically to depress muscle contractility. Geh et al (1992) ( Ref : R000708 ).\r\n\r\nPa-8 : Mol. Wt. 13,000 ( Native ), 12,800 ( Denatured ), 118 AA residues, isoelectric point pI = 9.2, PLA2 activity 8,750 µmoles fatty acid released / min / mg. Takasaki et al (1990) ( Ref : R000622 ) and Takasaki et al (1990) ( Ref : R000623 ). Reduced responses to chick biventer cervicis preparation to nerve stimulation and to exogenously applied acetycholine, carbachol and KCl in a time and concentration dependent manner. Also blocked twitches of mouse hemidiaphragm preparation evoked by nerve and by direct muscle stimulation. Reduced postsynaptic sensitivity to acetycholine and carbachol. It also reduced the amplitude and quantal content of end plate potentials indicating a presynaptic effect to decrease the release of acetycholine. In vivo study demonstrated myotoxic effects with degeneration of mouse and rat skeletal muscle fibres. However, myotoxicity would appear the predominant effect of this toxin. Fatehi et al (1994) ( Ref : R000766 ).\r\n\r\nPa-9C : Mol. Wt. 13,000 ( Native ), 13,200 ( Denatured ), 118 AA residues, isoelectric point pI = 9.8, PLA2 activity 557 µmoles fatty acid released / min / mg. Takasaki et al (1990) ( Ref : R000622 ) and Takasaki et al (1990) ( Ref : R000623 ). Reduced responses to chick biventer cervicis preparation to nerve stimulation and to exogenously applied acetycholine, carbachol and KCl in a time and concentration dependent manner. Also blocked twitches of mouse hemidiaphragm preparation evoked by nerve and by direct muscle stimulation. Reduced postsynaptic sensitivity to acetycholine and carbachol. It also reduced the amplitude and quantal content of end plate potentials indicating a presynaptic effect to decrease the release of acetycholine. However, myotoxicity would appear the predominant effect of this toxin. Fatehi et al (1994) ( Ref : R000766 ).\r\n\r\nPa-10A : Mol. Wt. 12,500 ( Native ), 13,200 ( Denatured ), 118 AA residues, isoelectric point pI = 10.2, PLA2 activity 4,160 µmoles fatty acid released / min / mg. Takasaki et al (1990) ( Ref : R000622 ) and Takasaki et al (1990) ( Ref : R000623 ).\r\n\r\nPa-10F : Mol. Wt. 13,000 ( Native ), 12,800 ( Denatured ), isoelectric point pI = 10.5, PLA2 activity 3,480 µmoles fatty acid released / min / mg. Takasaki et al (1990) ( Ref : R000622 ) and Takasaki et al (1990) ( Ref : R000623 ). Reduced responses to chick biventer cervicis preparation to nerve stimulation and to exogenously applied acetycholine, carbachol and KCl in a time and concentration dependent manner. Also blocked twitches of mouse hemidiaphragm preparation evoked by nerve and by direct muscle stimulation. Reduced postsynaptic sensitivity to acetycholine and carbachol. It also reduced the amplitude and quantal content of end plate potentials indicating a presynaptic effect to decrease the release of acetycholine. In vivo study demonstrated myotoxic effects with degeneration of mouse and rat skeletal muscle fibres. However, myotoxicity would appear the predominant effect of this toxin. Fatehi et al (1994) ( Ref : R000766 ).\r\n\r\nPa-11 : Mol. Wt. 13,000 ( Native ), 13,200 ( Denatured ), 118 AA residues, isoelectric point pI = 10.5, PLA2 activity 2,820 µmoles fatty acid released / min / mg. Takasaki et al (1990) ( Ref : R000622 ) and Takasaki et al (1990) ( Ref : R000623 ).\r\n\r\nPa-12A : Mol. Wt. 13,000 ( Native ), 13,200 ( Denatured ), 118 AA residues, isoelectric point pI > 10.5, PLA2 activity 2,400 µmoles fatty acid released / min / mg. Takasaki et al (1990) ( Ref : R000622 ) and Takasaki et al (1990) ( Ref : R000623 ).\r\n\r\nPa-12B : Mol. Wt. 13,000 ( Native ), 12,800 ( Denatured ), isoelectric point pI > 10.5, PLA2 activity 2,130 µmoles fatty acid released / min / mg. Takasaki et al (1990) ( Ref : R000622 ) and Takasaki et al (1990) ( Ref : R000623 ). Reduced responses to chick biventer cervicis preparation to nerve stimulation and to exogenously applied acetycholine, carbachol and KCl in a time and concentration dependent manner. Also blocked twitches of mouse hemidiaphragm preparation evoked by nerve and by direct muscle stimulation. Reduced postsynaptic sensitivity to acetycholine and carbachol. It also reduced the amplitude and quantal content of end plate potentials indicating a presynaptic effect to decrease the release of acetycholine. However, myotoxicity would appear the predominant effect of this toxin. Fatehi et al (1994) ( Ref : R000766 ).\r\n\r\nPa-12C : Mol. Wt. 13,000 ( Native ), 13,200 ( Denatured ), 118 AA residues, isoelectric point pI > 10.5, PLA2 activity 1,640 µmoles fatty acid released / min / mg. Takasaki et al (1990) ( Ref : R000622 ) and Takasaki et al (1990) ( Ref : R000623 ). Pa-1G blocked directly elicited mouse hemidiaphragm twitch responses and indirectly elicited mouse and chick nerve muscle preparation twitch responses. The toxin acts primarily postsynaptically to depress muscle contractility. Geh et al (1992) ( Ref : R000708 ).\r\n\r\nPa-13 : Mol. Wt. 12,000 ( Native ), 13,200 ( Denatured ), 118 AA residues, isoelectric point pI = 10.1, PLA2 activity 75 µmoles fatty acid released / min / mg. Takasaki et al (1990) ( Ref : R000622 ) and Takasaki et al (1990) ( Ref : R000623 ).\r\n\r\nPa-15 ( mixture of Pa-15a and Pa-15b ) : Mol. Wt. 12,000 ( Native ), 13,200 ( Denatured ), 118 AA residues, isoelectric point pI = 10.3, PLA2 activity 85 µmoles fatty acid released / min / mg. Takasaki et al (1990) ( Ref : R000622 ) and Takasaki et al (1990) ( Ref : R000623 ). Pa-1G blocked directly elicited mouse hemidiaphragm twitch responses and indirectly elicited mouse and chick nerve muscle preparation twitch responses. The toxin acts primarily postsynaptically to depress muscle contractility. Geh et al (1992) ( Ref : R000708 ).\r\n\r\n7.  PA myotoxin ( Myoglobinuria inducing toxin ). Ponraj and Gopalakrishnakone (1995) ( Ref : R000795 ).",
    "code": "FAD-41",
    "photo": "FAD06.jpg",
    "details": "1. After ensuring the patient and onlookers have moved out of range of further strikes by the snake, the bitten person should be reassured and persuaded to lie down and remain still. Many will be terrified, fearing sudden death and, in this mood, they may behave irrationally or even hysterically. The basis for reassurance is the fact that many venomous bites do not result in envenoming, the relatively slow progression to severe envenoming (hours following elapid bites, days following viper bites) and the effectiveness of modern medical treatment. \r\n2. The bite wound should not be tampered with in any way. Wiping it once with a damp cloth to remove surface venom is unlikely to do much harm (or good) but the wound must not be massaged. For Australian snakes only, do not wash or clean the wound in any way, as this may interfere with later venom detection once in a hospital.\r\n3. All rings or other jewellery on the bitten limb, especially on fingers, should be removed, as they may act as tourniquets if oedema develops.  \r\n4. If the bite is on a limb, a broad bandage (even torn strips of clothing or pantyhose) should be applied over the bitten area at moderate pressure (as for a sprain; not so tight circulation is impaired), then extended to cover as much of the bitten limb as possible, including fingers or toes, going over the top of clothing rather than risking excessive limb movement by removing clothing. The bitten limb should then be immobilised as effectively as possible using an extemporised splint or sling.  \r\n5. If there is any impairment of vital functions, such as problems with respiration, airway, circulation, heart function, these must be supported as a priority. In particular, for bites causing flaccid paralysis, including respiratory paralysis, both airway and respiration may be impaired, requiring urgent and prolonged treatment, which may include the mouth to mask (mouth to mouth) technique of expired air transfer. Seek urgent medical attention.\r\n6. Do not use Tourniquets, cut, suck or scarify the wound or apply chemicals or electric shock.\r\n7. Avoid peroral intake, absolutely no alcohol. No sedatives outside hospital. If there will be considerable delay before reaching medical aid, measured in several hours to days, then give clear fluids by mouth to prevent dehydration.\r\n8. If the offending snake has been killed it should be brought with the patient for identification (only relevant in areas where there are more than one naturally occurring venomous snake species), but be careful to avoid touching the head, as even a dead snake can envenom. No attempt should be made to pursue the snake into the undergrowth as this will risk further bites.\r\n9. The snakebite victim should be transported as quickly and as passively as possible to the nearest place where they can be seen by a medically-trained person (health station, dispensary, clinic or hospital). The bitten limb must not be exercised as muscular contraction will promote systemic absorption of venom.  If no motor vehicle or boat is available, the patient can be carried on a stretcher or hurdle, on the pillion or crossbar of a bicycle or on someone's back. \r\n10. Most traditional, and many of the more recently fashionable, first aid measures are useless and potentially dangerous. These include local cauterization, incision, excision, amputation, suction by mouth, vacuum pump or syringe, combined incision and suction (\"venom-ex\" apparatus), injection or instillation of compounds such as potassium permanganate, phenol (carbolic soap) and trypsin, application of electric shocks or ice (cryotherapy), use of traditional herbal, folk and other remedies including the ingestion of emetic plant products and parts of the snake, multiple incisions, tattooing and so on.",
    "photo_thumbnail": "FADT06.jpg"
}

  const [organism, setOrganism] = useState(sample);
  
  console.log(isSearching);

  // A list of strings
  const pills = useRef([]); 
  // PF: this doesn't need to be a state, we will update the 
  // pills whenever results are changed. It does need to be a 
  // ref to maintain it between renders. 

  // This is the current state of the pills. We need this to invoke 
  // a re-render. We could combine this with the pills.
  const [pillFilter, setPillFilter] = useState([]);
  // PF: I choose not to because managing display data and state 
  // data is problematic

  useLayoutEffect(() => {
    // PF TODO: have to have discussion with JK. To decide how we 
    // display both of these lists, it's a complex problem.
    const getKeywordsFromResults = () => {
      if (!results) return [];

      // this may be a different state from the results declared in a
      // higher level context
      const joinedResults = [...results.exclusive, ...results.unexclusive];
      
      // PF TODO: find out what pills to show?
    };

    // the only time this should update is when we're updating results
    const newPills = getKeywordsFromResults();
    
    const isDifferent = !!pills.current.find((pill, index) => pill != newPills[index]);

    // check if the current and the new are different
    if (isDifferent) {
      pills.current = newPills;

      // set the pill filter to empty, whenever the results change?
      setPillFilter([]);
    }
  }, [results]);

  const joinedResults = results && [...results.exclusive, ...results.unexclusive];

  const showResultList = () =>{
    setOrganism(undefined);
  }

  const showResult = (result) =>{
    setOrganism(result);
  }

  console.log(`Populating results`, joinedResults);

  return <resultsPillar>
    { !organism ? <ContentPillar>
      {joinedResults && <h1>{joinedResults.length} Results</h1>}
      <Br1/>

      { resultPills?.map(value => <Pill>{ value }</Pill>) }
      <Br1/>
      
      <div class={style.resultlist}>
      { joinedResults?.map(result => <Result current={result} onClick={() => showResult(result)}></Result>) }
      </div>
      { isSearching?<LoadModal />:undefined }
    </ContentPillar>
    : <OrganismPillar current={organism} onBack={showResultList} /> }
  </resultsPillar>
};

export default ResultsPillar;

