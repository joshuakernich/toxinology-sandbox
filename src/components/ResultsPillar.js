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
    "id": 5729,
    "oid": "SN0768",
    "orgclass": "SN",
    "orgid": "SN005729",
    "orgtype": "Animal",
    "family_id": 377,
    "family": "Homalopsidae",
    "genus_id": 1853,
    "genus": "Fordonia",
    "species": "leucobalia",
    "species_identifier": "",
    "subspecies": null,
    "common_names": "White-Bellied Mangrove Snake , Crab Eating Water Snake , Whitebelly Water Snake",
    "region_code": "77",
    "region": "Australia and Southeast Asia",
    "countries": "Australia, Bangladesh, Brunei, Cambodia, Indonesia, India, Laos, Malaysia, Myanmar, Philippines, Papua New Guinea, Singapore, Thailand, Vietnam",
    "distribution": "Widely distributed throughout SE Asia to Australia and New Guinea : India ( West Bengal ), Bangladesh, Myanmar, Peninsula Malaysia, Thailand, Cambodia, Laos, Vietnam, Singapore, Indonesia ( Java, Sumatra, Kalimantan, Ambon, Timor, Ceram ), West Malaysia ( Sabah and Sarawak ), probably Brunei, New Guinea ( Papua ( Western Province : Daru and Bobo Islands, Pahoturi, Binaturi, Oriomo, Fly and Aramia Rivers. Gulf Province : Moka and Turama Rivers. Central Province and NCD : Porebada, Port Moresby, Napa Napa and Ela Beach ) and Irian Jaya ), Philipine Islands, Nicobar Islands and coastal northern Australia ( Northern Territory, northern Queensland and northern Western Australia ).",
    "map_image_small": "SNMS0768.gif",
    "map_image_large": "SNML0768.gif",
    "map_image_thumb": "SNMT0768.gif",
    "local_names": "",
    "ord": "",
    "phylum": "",
    "subclass": "",
    "suborder": "",
    "subfamily_id": null,
    "subfamily": null,
    "class": "",
    "venomous_or_poisonous": "Venomous",
    "clinical_significance": null,
    "incomplete_record": null,
    "approx_dry_bite": "Non-venomous, so essentially all bites should be \"dry\".",
    "cause_of_death": "",
    "children": null,
    "clinical_photos": "",
    "comments": "",
    "dangerousness": null,
    "dangerousness_index": null,
    "detail_coagulopathy": "Insufficient clinical reports to know, but unlikely to occur",
    "detail_haemorrhagins": "Insufficient clinical reports to know, but unlikely to occur",
    "detail_local_effects": "Insufficient clinical reports to know, but most likely no local effects, possibly, at most, minor local pain & swelling only",
    "detail_myotoxicity": "Insufficient clinical reports to know, but unlikely to occur",
    "detail_necrosis": "Insufficient clinical reports to know, but unlikely to occur",
    "detail_nephrotoxicity": "Insufficient clinical reports to know, but unlikely to occur",
    "detail_neurotoxicity": "Insufficient clinical reports to know, but unlikely to occur",
    "detail_other": "Insufficient clinical reports to know",
    "detail_prognosis": "No case reports suggesting any medically significant effects, either local or systemic. Harmless non-venomous snake.",
    "elderly": null,
    "general_cardiotoxicity": "Insufficient clinical reports to know, but unlikely to occur",
    "general_coagulopathy_and_haemorrhages": "Insufficient clinical reports to know, but unlikely to occur",
    "general_general_system_effects": "Insufficient clinical reports to know, but systemic effects not expected",
    "general_local_effects": "Insufficient clinical reports to know, but most likely no local effects, possibly, at most, minor local pain & swelling only",
    "general_local_necrosis": "Insufficient clinical reports to know, but local necrosis most unlikely",
    "general_myotoxicity": "Insufficient clinical reports to know, but unlikely to occur",
    "general_neurotoxic_excitability": "",
    "general_neurotoxic_paralysis": "Insufficient clinical reports to know, but unlikely to occur",
    "general_other": "Insufficient clinical reports to know",
    "general_rate_of_envenoming": "Non-venomous, so essentially all bites should be \"dry\".",
    "general_renal_damage": "Insufficient clinical reports to know, but unlikely to occur",
    "general_untreated_lethality_rate": "No lethal potential, non-venomous bite",
    "general_venom_anticoagulants": "Non-venomous",
    "general_venom_cardiotoxins": "Non-venomous",
    "general_venom_haemorrhagins": "Non-venomous",
    "general_venom_myotoxins": "Non-venomous",
    "general_venom_necrotoxins": "Non-venomous",
    "general_venom_nephrotoxins": "Non-venomous",
    "general_venom_neurotoxins": "Non-venomous",
    "general_venom_other": "Non-venomous",
    "general_venom_procoagulants": "Non-venomous",
    "immediate_effects": "",
    "specific_clinical_effects": "These snakes, currently considered non-front-fanged colubroids, lack defined hollow fangs (though may have enlarged mid- or posterior enlarged teeth that may or may not have grooves), but possess low pressure secretory glands that are variably termed, \"Duvernoy's glands\" (distinct from the venom glands in front fanged venomous snakes), or as 'venom glands'. This species is not currently known to cause harmful effects in bitten humans.\r\n\r\nLike any bite, including bites by humans, bites by these snakes may result in local oedema, pain, trauma from teeth punctures and potentially secondary infection and the clinical effects associated with this complication. Further, exposure to a series of bites over time, or to snake body fluids, faeces or shed skins in captive specimens, could at least theoretically, result in sensitisation of the immune system, such that subsequent bites might cause more marked local or possibly even some systemic effects, of an immune aetiology. These non-specific and non-toxin effects may appear similar to known effects of venoms following a bite by a known venomous snake, but their presence in a bite by this species should not be taken as significant evidence of the presence of 'venom' in the oral/Duvernoy's secretions produced by this species.\r\n\r\nAt this point in time we do not know the full content and potential effects in humans of contents of oral/Duvernoy's secretions in this species of snake, therefore we cannot state, with certainty, whether or not secretions harmful to humans are present. We can state that any evidence to date indicates such secretions harmful to humans are not evident. However, a prolonged bite, where significantly more oral secretions may be inoculated, might possibly result in more significant effects, on a simple dose basis.\r\n\r\nTherefore bites by this species should be managed as for any standard animal bite, not with an expectation of a local or systemic venom effect, but more vigilance in assessment if the bite was prolonged.",
    "key_diagnostic_features": "Either no effects or minimal local pain & swelling only. No systemic effects.",
    "neurotoxic_other_effects": "",
    "pregnancy": null,
    "prognosis": null,
    "reference": "",
    "status": "",
    "untreated_lethality": "Not likely to cause significant effects; non-lethal",
    "venom_activity": "",
    "case_summary": null,
    "poison": null,
    "first_aid": "FAD-51",
    "infraspecific_epithet": null,
    "descr": "First aid for bites by non-front-fanged colubroid snakes likely to cause either no effects or only mild local effects.",
    "habitat": "Coastal estuary mouths, mud flats, intertidal channels and mangrove swamps. Has been found out to sea far from shore. Occasionally found upstream in freshwater.",
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
    "follow_up": "Tell patients about possibility of secondary infection and symptoms of this, advising them to return if symptoms develop.",
    "route": null,
    "time_elapsed": null,
    "gastrointestinal": null,
    "mouth_throat": null,
    "cardiotoxin": "N",
    "haemostasis_and_bleeding": "N",
    "haematologic_rbc": "N",
    "haematologic_wbc": "N",
    "haematologic_platelet": "N",
    "musculoskeletal": null,
    "myotoxic": "N",
    "neurotoxic_paralytic": "N",
    "neurotoxic_excitatory": "N",
    "neurological": null,
    "dermatological": "N",
    "localised": "N",
    "necrotoxin": "N",
    "cardiovascular": "N",
    "respiratory": "N",
    "angio_oedema_or_allergic": "N",
    "venom_spit_ophthalmia": "N",
    "anterior_pituitary_haemorrhage": "N",
    "other": "N",
    "general_system": "N",
    "renal": "N",
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
    "com_myotoxic_effects": null,
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
    "breeding": "Viviparous with about 6 to 15 young born per litter. Young measure about 16 to 20 cm in length at birth.",
    "dentition": "Opisthoglyphous dentition with about  6 to 8 small maxillary teeth followed by an interspace and two enlarged, grooved teeth, 10 to 13, short, blunt subequal, widely spaced mandibular teeth.",
    "organism_type_biology": null,
    "habits": "Mainly nocturnal and aquatic in brackish waters and sometimes found inhabiting crab holes. Inoffensive disposition, preferring to escape if disturbed.",
    "hemipenis": "",
    "juveniles": "",
    "lethality": "",
    "prey": "Feeds almost entirely on crabs but will occasionally eat other crustaceans and fish.",
    "sexual_dimorphism": "Males : Ventrals 142 to 150 and subcaudals 30 to 41. Females : Ventrals 144 to 150 and subcaudals 28 to 41.",
    "image_no": 1,
    "image": "SNP07681.jpg",
    "image_thumb": "SNPT07681.jpg",
    "image_caption": "Fordonia leucobalia ( White Bellied Mangrove Snake )  Daru [ Original photo copyright © David Williams ]",
    "adult_length": "0.50 m",
    "coloration_markings": "Dorsal surface body colour is quite variable ranging from pale grey or pale yellowish brown with scattered, small, dark brown, or grey to blackish spots to dark brown or dark grey to blackish with scattered, small, pale cream, grey or whitish spots. Head dorsum is similar to dorsal surface body colour, often more densely dark spotted ( pale ground colour ) or less densely pale spotted or absent ( dark ground colour ). Labials often paler and whitish. Ventral surface ( and usually lower most dorsal scale rows ) is white, off white, yellowish or pinkish, either immaculate or with scattered, small black spots. Subcaudal surface is usually more greyish and sometimes with a small dark median stripe.",
    "short_descr": "",
    "distinguishing_features": "",
    "fish_code": "",
    "other_comments": "",
    "size": "",
    "status_notes": "Complete Genus",
    "anals_category": 1,
    "anals_detail": "divided, some specimens have a few single subcaudals.",
    "general_shape": "Small in length, cylindrical, moderately stout bodied snake with a short tail. Can grow to a maximum of about 0.95 metres. Head is broad and short and very slightly distinct from neck. Snout is tapered and bluntly rounded. Eyes are small in size with round pupils. Nostrils valvular and positioned on top of snout. Dorsal scales are smooth. Vertebral row with enlarged scales. In some specimens a few posterior ventrals may be divided.",
    "head_scales": "The usual 9 supracephalic head shields, rostral broader than high, nasals separated by an internasal, nostril with a lunate slit with nasal cleft extending from nostril to prefrontal, loreal usually absent, 2 postoculars, single preocular in contact with nasal and 2nd supralabial, parietals well developed, temporals 1 + 3 or 2 + 3, usually 5 supralabials ( 2nd and 3rd or only 3rd in contact with eye, 4th the largest and squarish, 5th horizontally elongate ) and usually 3 infralabials in contact with anterior chin shields. This is the only terrestrial or semi terrestrial New Guinea non-Elapid lacking a loreal scale.",
    "max_mid_body_rows": "29",
    "max_subcaudals": "45",
    "max_ventrals": "160",
    "min_mid_body_rows": "23",
    "min_subcaudals": "24",
    "min_ventrals": "130",
    "modal_mid_body_rows": "25 or 27",
    "abs_lymph": "Most likely normal",
    "adverse_av_reaction_mngt": "Not applicable",
    "antivenom_dosage": "Not applicable",
    "antivenom_key": "",
    "antivenom_reactions": "Not applicable",
    "antivenom_therapy": "No antivenom available",
    "apao2": "Most likely normal",
    "aptt": "Mostly normal",
    "cardiotoxin_effects_mngt": "No cardiotoxic effects likely",
    "ck": "Most likely normal",
    "creatinine": "Most likely normal",
    "fdpxdp": "Most likely normal",
    "fibrinogen": "Most likely normal",
    "first_aid_text": "Clean wound",
    "general_approach_to_mngt": "While most cases will be minor, not requiring admission, some cases will be more severe, requiring admission and treatment, so assess carefully before early discharge.",
    "general_systemic_effects_mngt": "Symptomatic care only",
    "haematologic_effects_mngt": "Haematologic effects not likely",
    "haematologic_other_effects_mngt": "Not applicable",
    "hb": "Most likely normal",
    "immediate_effects_mngt": "Reassurance & symptomatic care only",
    "important_laboratory_test": "For cases with significant local effects, consider basic coagulation testing. While coagulopathy has not been reported to date, experience with a few other Colubrid snakes suggests that coagulopathy might be possible in a case with marked local envenoming.",
    "k": "Most likely normal",
    "local_effects_mngt": "Clean wound",
    "myotoxic_effects_mngt": "Myotoxicity not likely",
    "necrotoxin_effects_mngt": "Local necrosis unlikely",
    "neurotoxic_excitatory_effects_mngt": "Excitatory neurotoxic effects not likely",
    "neurotoxic_other_effects_mngt": "Not applicable",
    "neurotoxic_paralytic_effects_mngt": "Paralytic effects not likely",
    "other_issues_in_trmt": "Not applicable",
    "other_specific_effects_mngt": "Ensure tetanus immunisation",
    "platelets": "Most likely normal",
    "pt_inr": "Mostly normal",
    "renal_effects_mngt": "Renal damage unlikely",
    "treatment_key": "Bites by this species are not expected to cause medically significant effects and the only risk, probably small, is local secondary infection. Patients presenting with bites by these snakes do not require medical attention, other than to check for infection and ensure tetanus immune status. Patients should be advised to return if local symptoms develop, suggesting secondary infection.",
    "treatment_summary": "Bites by this species are not expected to cause medically significant effects and no specific treatment is available, in particular no antivenom. Treatment is based on symptomatic and secondary treatment. Antibiotics should only be used if clinically indicated in cases where local infection is apparent, or non-sterile interference with the wound is evident, and preferably after swabs for culture/sensitivity have been taken, to ensure targeting of the organism is appropriate. In all cases tetanus immunisation status should be assured.\r\n\r\nIf the patient develops any evidence of systemic effects, not explained by secondary problems such as infection or allergic reactions, then further targeted investigations may be warranted, together with reconsideration of the diagnosis and the identity of the snake (was a potentially dangerous known venomous species misidentified as this harmless species?).\r\n\r\nLike any bite, including bites by humans, bites by these snakes may result in local oedema, pain, trauma from teeth punctures and potentially secondary infection and the clinical effects associated with this complication. Further, exposure to a series of bites over time could, at least theoretically, result in sensitisation of the immune system, such that subsequent bites might cause more marked local or possibly even some systemic effects, of an immune aetiology. These non-specific and non-toxin effects may appear similar to known effects of venoms following a bite by a known venomous snake, but their presence in a bite by this species should not be taken as significant evidence of the presence of 'venom' in the oral/Duvernoy's secretions produced by this species and should not redirect management away from appropriate symptomatic and secondary treatments.",
    "urea": "Most likely normal",
    "wbct": "Most likely normal",
    "wcc": "Most likely normal",
    "antivenom_studies": "",
    "average_venom_qty": "",
    "cardiotoxins": "",
    "component_ld50": "",
    "cross_reactivity": "",
    "crude_venom": "",
    "haematological_haemorrhagins": "",
    "maximum_venom_qty": "",
    "myotoxins": "",
    "necrotoxins": "",
    "nephrotoxins": "",
    "neurotoxins_channel_toxins": "",
    "other_ld50_estimates": "",
    "other_studies": null,
    "other_toxins": "",
    "preferred_ld50_estimate": "",
    "venom_components": "",
    "code": "FAD-51",
    "photo": "",
    "details": "1. After ensuring the patient and onlookers have moved out of range of further strikes by the snake, the bitten person should be reassured and persuaded to lie down and remain still. Many will be terrified, fearing sudden death and, in this mood, they may behave irrationally or even hysterically. The basis for reassurance is the fact that many venomous bites do not result in envenoming, the relatively slow progression to severe envenoming (hours following elapid bites, days following viper bites) and the effectiveness of modern medical treatment. \r\n2. The bite wound should not be tampered with in any way. Wiping it once with a damp cloth to remove surface venom is unlikely to do much harm (or good) but the wound must not be massaged. \r\n3. All rings or other jewellery on the bitten limb, especially on fingers, should be removed, as they may act as tourniquets if oedema develops.  \r\n4. The bitten limb should be immobilised as effectively as possible using an extemporised splint or sling. \r\n5. If there is any impairment of vital functions, such as problems with respiration, airway, circulation, heart function, these must be supported as a priority. In particular, for bites causing flaccid paralysis, including respiratory paralysis, both airway and respiration may be impaired, requiring urgent and prolonged treatment, which may include the mouth to mask (mouth to mouth) technique of expired air transfer. Seek urgent medical attention.\r\n6. Do not use Tourniquets, cut, suck or scarify the wound or apply chemicals or electric shock.\r\n7. Avoid peroral intake, absolutely no alcohol. No sedatives outside hospital. If there will be considerable delay before reaching medical aid, measured in several hours to days, then give clear fluids by mouth to prevent dehydration.\r\n8. If the offending snake has been killed it should be brought with the patient for identification (only relevant in areas where there are more than one naturally occurring venomous snake species), but be careful to avoid touching the head, as even a dead snake can envenom. No attempt should be made to pursue the snake into the undergrowth as this will risk further bites. \r\n9. The snakebite victim should be transported as quickly and as passively as possible to the nearest place where they can be seen by a medically-trained person (health station, dispensary, clinic or hospital). The bitten limb must not be exercised as muscular contraction will promote systemic absorption of venom.  If no motor vehicle or boat is available, the patient can be carried on a stretcher or hurdle, on the pillion or crossbar of a bicycle or on someone's back. \r\n10. Most traditional, and many of the more recently fashionable, first aid measures are useless and potentially dangerous. These include local cauterization, incision, excision, amputation, suction by mouth, vacuum pump or syringe, combined incision and suction (\"venom-ex\" apparatus), injection or instillation of compounds such as potassium permanganate, phenol (carbolic soap) and trypsin, application of electric shocks or ice (cryotherapy), use of traditional herbal, folk and other remedies including the ingestion of emetic plant products and parts of the snake, multiple incisions, tattooing and so on.",
    "photo_thumbnail": null
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

