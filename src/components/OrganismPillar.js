import { h } from 'preact';
import style from './shared.css';
import ContentPillar from './ContentPillar';
import Gallery from './Gallery';
import Pill from './Pill';
import { Br1, Br2 } from './Br';
import api from '../services/api';
import { useEffect, useState, useRef } from 'preact/hooks';

const Callout = ({...props}) => {
  return <calloutCountainer>
    {props.children}
  </calloutCountainer>
}

const Collapsible = ({header,...props}) =>{

  const [open,setOpen] = useState(false);

  const toggle = ()=>{
    setOpen(!open);
  }

  return <collapsibleContainer empty={props.empty} open={open}>
    <h1 onclick={toggle}>{header}</h1>
    {open?<><Br2/>{props.children}</>:undefined}
  </collapsibleContainer>
}

const Columns = ({columns,...props}) => {
  return <columnContainer columns={columns?columns:undefined}>
    {props.children}
  </columnContainer>
}

const Grid = ({...props}) => {
  return <gridContainer>
    {props.children}
  </gridContainer>
}

export const getRiskCategory = (di) => {

  // where t is the upper threshold
  const categories = [
    {t:-1, d:'Unknown Risk'},
    {t:0, d:'No Risk'},
    {t:20, d:'Low Risk'},
    {t:40, d:'Mild Risk'},
    {t:70, d:'Moderate Risk'},
    {t:100, d:'High Risk'},
  ]

  let iCat = 0;
  while(di>categories[iCat].t) iCat++;

  return categories[iCat];
}

export const getRiskIndex = (diRAW) =>{
  return diRAW?diRAW.substring(2,diRAW.indexOf('.')):-1;
}
 
const OrganismPillar = ({ current, onBack }) => {

  const [currentDetails, setCurrentDetails] = useState(undefined);
  const [imgExpand, setImageExpand] = useState(undefined);

  const bucket = 
  {
    'SN':'http://www.toxinology.com/images/snakes/',
    'SC':'http://www.toxinology.com/images/scorpions/',
    'SP':'http://www.toxinology.com/images/spiders/',
    'PM':'http://www.toxinology.com/images/other_life/',
    'PP':'http://www.toxinology.com/images/other_life/',
    'TV':'http://www.toxinology.com/images/other_life/',
    'TI':'http://www.toxinology.com/images/other_life/',
    'MV':'http://www.toxinology.com/images/marine_life/',
    'MI':'http://www.toxinology.com/images/marine_life/',
  }

  useEffect(async () => {
    try {
      const creatureDetails = await api.getCreatureDetails(current.oid);

      console.log(`Got creatureDetails: `, creatureDetails);

      if(!creatureDetails.master) creatureDetails.master = {};
      if(!creatureDetails.first_aid) creatureDetails.first_aid = {};
      if(!creatureDetails.clinical) creatureDetails.clinical = {};
      if(!creatureDetails.diagnosis) creatureDetails.diagnosis = {};
      if(!creatureDetails.geninfo) creatureDetails.geninfo = {};
      if(!creatureDetails.taxonomy || !creatureDetails.taxonomy.genus) creatureDetails.taxonomy = creatureDetails.master;
      if(!creatureDetails.treatment) creatureDetails.treatment = {};
      if(!creatureDetails.venom) creatureDetails.venom = {};

      setCurrentDetails(creatureDetails);
    } catch (e) {
      console.error("Error getting creature details", e);
    }
  }, [ current ]);

  const getTaxonomyPills = () => {
    const taxonomy = ["kingdom", "phylum", "class", "order", "family", "subfamily"];
    const italicised = ["genus", "species"];
    return <>
      { taxonomy.map((key) => currentDetails.taxonomy[key] && <Pill class={key}><h3>{key}</h3>{currentDetails.taxonomy[key]}</Pill>) }
      { italicised.map((key) => currentDetails.taxonomy[key] && <Pill class={key}><h3>{key}</h3><i>{currentDetails.taxonomy[key]}</i></Pill>) }
      { currentDetails.master['subspecies']?<Pill><h3>subspecies</h3><i>{currentDetails.master['subspecies']}</i></Pill>:undefined }
    </>;
  };

  const getRiskPill = () => {

    const raw = currentDetails.clinical.dangerousness_index;
    const di = parseInt(raw?raw.substring(2,raw.indexOf('.')):-1);

    const category = getRiskCategory(di);

    return <Pill risk={category.d} type={'risk'}>
      <h3>{currentDetails.master.venomous_or_poisonous}</h3>
      <p>{category.d}</p>
      <p>{currentDetails.clinical.dangerousness}</p>
    </Pill>;
  }

  const getGallery = ( justMap ) => {

    const g = [];
    const b = bucket[currentDetails.master.orgclass];

    if(currentDetails.master.map_image_large) g.push({caption:'species map',url:b+currentDetails.master.map_image_large});

    if(!justMap) currentDetails.graphics.map( graphic => g.push({caption:graphic.image_caption,url:b+graphic.image}) );

    if(!g.length) return undefined;

    return <>
    <Gallery onImage={setImageExpand} gallery={g}/>
    <Br1/>
    </>;
  }

  const makePill = (header,...par) => {
    return<Pill>
      <h3>{header}</h3>
      { par.map( p => p?<p>{p}</p>:<p>No Data</p> ) }
    </Pill>
  }

  const makeSection = (header,raw) => {

    if(!raw) return undefined;

    return<>
      <h2>{header}</h2>
      <Br2/>
      {makeP(raw)}
      <Br1/>
    </>
  }

  const makeP = (raw) => {
    return raw?<p dangerouslySetInnerHTML={{__html: raw.toString().replace(/\n/g, "<br />")}} />:<p>No data</p>;
  }

  

  const makeList = (raw) => {
    if(!raw) return makeP(raw);
    const list = raw.split(/\n/g);
    //check for entry length greater than 1 to filter out blank lines
    return <ol>
      {list.map( entry => (entry.length > 1)?<li>{ entry.substr(entry.indexOf('.')+1) }</li>:undefined)}
    </ol>;
  }

  const getWhateverYouCan = (header,keys) => {
    return <Collapsible header={header}>{
      keys.map(keyMap => currentDetails[keyMap.key]?makeSection(keyMap.header,currentDetails[keyMap.key]):undefined)
    }</Collapsible>
  }

  const getAll = (header,data) => {
    return <Collapsible header={header}>
      {Object.keys(data).map(key => data[key]?makeSection(key,data[key]):undefined)}
    </Collapsible>
  }

  const getNames = () => {
    const binomial = currentDetails.taxonomy.genus+' '+currentDetails.taxonomy.species+(currentDetails.taxonomy.subspecies?' '+currentDetails.taxonomy.subspecies:'');
    return <>
      <h1>{currentDetails.master.common_names?currentDetails.master.common_names.replace(' , ',', '):<i>{binomial}</i>}</h1>
      <h3><i>{binomial}</i></h3>
    </>
  }

  const getClinicalColumns = () => {

    const keys = [
      {h:'Cardiotoxicity',        key:'general_cardiotoxicity'},
      {h:'Coagulopathy',          key:'general_coagulopathy_and_haemorrhages',key2:'detail_coagulopathy'},
      {h:'System Effects',        key:'general_general_system_effects'},
      {h:'Local Effects',         key:'general_local_effects',key2:'detail_local_effects'},
      {h:'Necrosis',              key:'general_local_necrosis',key2:'detail_necrosis'},
      {h:'Myotoxicity',           key:'general_myotoxicity'},
      {h:'Neurotoxic Paralysis',  key:'general_neurotoxic_paralysis'},
      //{h:'Rate of Envenoming',    key:'general_rate_of_envenoming'},
      {h:'Renal Damage',          key:'general_renal_damage'},
      {h:'Untreated Lethality',   key:'general_untreated_lethality_rate'},
      {h:'Venom Anticoagulants',  key:'general_venom_anticoagulants'},
      {h:'Venom Cardiotoxins',    key:'general_venom_cardiotoxins'},
      {h:'Venom Haemorrhagins',   key:'general_venom_haemorrhagins',key2:'detail_haemorrhagins'},
      {h:'Venom Myotoxins',       key:'general_venom_myotoxins',key2:'detail_myotoxicity'},
      {h:'Venom Necrotoxins',     key:'general_venom_necrotoxins'},
      {h:'Venom Nephrotoxins',    key:'general_venom_nephrotoxins', key2:'detail_nephrotoxicity'},
      {h:'Venom Neurotoxins',     key:'general_venom_neurotoxins', key2:'detail_neurotoxicity'},
      {h:'Venom Other',           key:'general_venom_other'},
      {h:'Venom Procoagulants',   key:'general_venom_procoagulants'},
      {h:'Other',                 key:'general_other', key2:'detail_other'},
    ]

    if(!currentDetails.clinical.general_local_effects) return undefined;

    //key2 may or may not be useful
    return <Columns>
      {keys.map( key => 
        <Pill>
        <h3>{key.h}</h3>
        <p>{currentDetails.clinical[key.key]}</p>
        {key.key2 && currentDetails.clinical[key.key2] != currentDetails.clinical[key.key] ?<p>{currentDetails.clinical[key.key2]}</p>:undefined}
        </Pill>
        )}
    </Columns>
  }

  const getVenom = () => {

    const header = currentDetails.master.venomous_or_poisonous == 'Venomous'?'Venom':'Toxin';

    if( !currentDetails.venom.venom_components && 
      !currentDetails.venom.crude_venom) return <Collapsible header={header} empty/>

    return <Collapsible header={header}>
        
        <h2>Venom Components</h2>
        {makeList(currentDetails.venom.venom_components)}


        {makeSection('Crude Venom',currentDetails.venom.crude_venom)}
        {makeSection('Average Venom Quantity',currentDetails.venom.average_venom_qty)}
        {makeSection('Maximum Venom Quantity',currentDetails.venom.maximum_venom_qty)}
        {makeSection('Cardiotoxins',currentDetails.venom.cardiotoxins)}
        {makeSection('Myotoxins',currentDetails.venom.myotoxins)}
        {makeSection('Necrotoxins',currentDetails.venom.necrotoxins)}
        {makeSection('Necrotoxins',currentDetails.venom.nephrotoxins)}
        {makeSection('Other Toxins',currentDetails.venom.other_toxins)}
        {makeSection('Neurotoxins Channel Toxins',currentDetails.venom.neurotoxins_channel_toxins)}
        {makeSection('Other ld50 Estimates',currentDetails.venom.other_ld50_estimates)}
        {makeSection('Preferred ld50 Estimate',currentDetails.venom.preferred_ld50_estimate)}
        {makeSection('Other Studies',currentDetails.venom.other_studies)}
        {makeSection('Component ld50',currentDetails.venom.component_ld50)}
        {makeSection('Cross Reactivity',currentDetails.venom.cross_reactivity)}
        {makeSection('Venom Activity',currentDetails.venom.venom_activity)}
        {makeSection('Haematological Haemorrhagins',currentDetails.venom.haematological_haemorrhagins)}
      </Collapsible>

  }

  const getDiagnosis = () => {

    const keys = [
      {h:'Direct Cardiotoxin Effect',            key:'cardiotoxin'},
      {h:'Abnormal Haemostasis and Bleeding',    key:'haemostasis_and_bleeding'},
      {h:'Effects on Red Blood Cells (potentially including haemolysis)',          key:'haematologic_rbc'},
      {h:'Effects on White Blood Cells (notably Leukocytosis and/or Lymphopenia)',        key:'haematologic_wbc'},
      {h:'Effects on Platelets (increase, decrease, change in platelet aggregation)',     key:'haematologic_platelet'},
      {h:'Myotoxic (local or systemic muscle damage)',                  key:'myotoxic'},
      {h:'Paralytic Neurotoxicity',      key:'neurotoxic_paralytic'},
      {h:'Excitatory Neurotoxicity',     key:'neurotoxic_excitatory'},
      {h:'Dermatological Effects',            key:'dermatological'},
      {h:'Localised Effects at bite/string/contact location',                 key:'localised'},
      {h:'Primary Necrotoxicity at bite/sting/contact location',                key:'necrotoxin'},
      {h:'Cardiovascular Effects',            key:'cardiovascular'},
      {h:'Respiratory Effects',               key:'respiratory'},
      {h:'Angio Oedema or Major Allergic Reaction',  key:'angio_oedema_or_allergic'},
      {h:'Venom Spit Ophthalmia',     key:'venom_spit_ophthalmia'},
      {h:'Anterior Pituitary Haemorrhage', key:'anterior_pituitary_haemorrhage'},
      {h:'Other',                     key:'other'},
      {h:'Non-specific General System Effects',            key:'general_system'},
      {h:'Renal Effects (primary or secondary)',                     key:'renal'},
    ]

    const keysLab = [
      {h:'Absolute Lymphopenia',key:'abs_lymph'},
      {h:'aPaO2',key:'apao2'},
      {h:'aPTT',key:'aptt'},
      {h:'Creatine Kinase (CK)',key:'ck'},
      {h:'Creatinine',key:'creatinine'},
      {h:'FDP/XDP/D-dimer',key:'fdpxdp'},
      {h:'Fibrinogen',key:'fibrinogen'},
      {h:'Haemoglobin (Hb)',key:'hb'},
      {h:'Potassium (K)',key:'k'},
      {h:'Platelets',key:'platelets'},
      {h:'PT/INR',key:'pt_inr'},
      {h:'Urea',key:'urea'},
      {h:'Whole Blood Clotting Time',key:'wbct'},
      {h:'White Cell Count (WCC)',key:'wcc'},
    ]

    if(!currentDetails.treatment.key_diagnostic_features && 
      !currentDetails.diagnosis.general_system ){
      return <Collapsible header="Diagnosis" empty/>
    }

    const YNU = {
      'Y':'Probable',
      'N':'Unlikely',
      'U':'Possilble',
    }



    return <Collapsible header="Diagnosis">
      {
        currentDetails.treatment.key_diagnostic_features?
        <><Callout>
        {makeP(currentDetails.treatment.key_diagnostic_features)}
        </Callout>
        <Br1/></>:undefined
      }

      { keys.filter( key => currentDetails.diagnosis[key.key] == 'Y').length?
      <>
        <h2>Likely Effects</h2>
        <ul>
        { keys.filter( key => currentDetails.diagnosis[key.key] == 'Y').map( key => <li>{key.h}</li> ) }
        </ul><Br2/>
      </>:undefined
      }

      {keys.filter( key => currentDetails.diagnosis[key.key] == 'U').length?
      <>
        <h2>Possible Effects</h2>
        <ul>
        { keys.filter( key => currentDetails.diagnosis[key.key] == 'U').map( key => <li>{key.h}</li> ) }
        </ul><Br2/>
      </>:undefined
      }

      {keys.filter( key => currentDetails.diagnosis[key.key] == 'N').length?
      <>
        <h2>Effects Unlikely to be observed</h2>
        <ul>
        { keys.filter( key => currentDetails.diagnosis[key.key] == 'N').map( key => <li>{key.h}</li> ) }
        </ul>
      </>:undefined
      }

      {
        currentDetails.treatment.abs_lymph?
        <>
        <Br1/>
        <h2>Lab Results</h2><Br2/>
        <Columns>
          {keysLab.map( key => makePill(key.h,currentDetails.treatment[key.key]))}
        </Columns>
        </>:undefined
      }
    </Collapsible>
  }  

  const getAntivenom = () => {

    const header = currentDetails.master.venomous_or_poisonous == 'Venomous'?'Antivenom':'Antitoxin';

    const antivenom = [
      {h:'Antivenom Therapy',key:'antivenom_therapy'},
      {h:'Antivenom Dosage',key:'antivenom_dosage'},
      {h:'Antivenom Reactions',key:'antivenom_reactions'},
      {h:'Adverse Antivenom Reaction Management',key:'adverse_av_reaction_mngt'},
      ]

    const keysMajor = [
      {h:'Description',key:'product_description'},
      {h:'Comments',key:'comments'},
      {h:'Recommended Dose',key:'recommended_dose'},
      {h:'Source Species',key:'source_species'},
      {h:'Coverage Species',key:'coverage_species'},
      {h:'Storage Type',key:'storage_type'},

    ]

    const keysMinor = [
      {h:"type",key:"type"},
      {h:"Status", key:"status"},
      {h:"Immunisation Host", key:"immunisation_host"},
      {h:"Administration Route", key:"administration_route"},
      {h:"Volume", key:"volume"},
      {h:"Initial Dose", key:"initial_dose_mnfr"},
      {h:"Local Cost", key:"local_cost"},
      {h:"Storage Life", key:"storage_life"},
      {h:"Language on Label", key:"languages_on_label"},
      {h:"Related Information", key:"related_information"},
      //{h:"", key:"aaa_old_key"},
      {h:"References", key:"ref"},
    ]

    if(!currentDetails.antivenoms.length &&
      !currentDetails.treatment.antivenom_therapy &&
      !currentDetails.venom.antivenom_studies){
      return <Collapsible header={header} empty/>
    }

    return <Collapsible header={header}>
     <Columns>
        {antivenom.map( key => makePill(key.h,currentDetails.treatment[key.key]))}
      </Columns>

      <Br1/>
      <h2>Known Antivenoms</h2>
      <h3>NOTE: Order of antivenoms is not indicitive of preference.</h3>
      <ul>
        {currentDetails.antivenoms.map( v => <li>
          <p>{v.name}</p>
          <h3>{v.id} by {v.manufacturer}</h3>
          <Br2/>

          {keysMajor.map( key => <>
            <h3>{key.h}</h3>
            <p>{v[key.key]}</p>
            <Br2/>
            </>
          )}
          
          <Columns>
          {keysMinor.map( key => makePill(key.h,v[key.key]))}
          </Columns>
          
        </li> )}
      </ul>
      

      <Br1/>
      {makeSection('Antivenom Studies',currentDetails.venom.antivenom_studies)}
    </Collapsible>
  }

  const getTreatment = () => {
    

    const keys = [
     
      {h:'Immediate Effects Management',key:'immediate_effects_mngt'},
      {h:'Approach to Management',key:'general_approach_to_mngt'},
      {h:'Follow Up',key:'follow_up'},
      {h:'Local Effects Management',key:'local_effects_mngt'},
      {h:'Systemic Effects Management',key:'general_systemic_effects_mngt'},
      
      
      {h:'Cardiotoxin Effects Management',key:'cardiotoxin_effects_mngt'},
      
      //{h:'First Aid Text',key:'first_aid_text'},
      
      
      
      {h:'Haematologic Effects Management',key:'haematologic_effects_mngt'},
      {h:'Haematologic Other Effects Management',key:'haematologic_other_effects_mngt'},
      
      
      {h:'Important Laboratory Test',key:'important_laboratory_test'},
      
      //{h:'Key Diagnostic Features',key:'key_diagnostic_features'},
      
      {h:'Myotoxic Effects Management',key:'myotoxic_effects_mngt'},
      {h:'Necrotoxin Effects Management',key:'necrotoxin_effects_mngt'},
      {h:'Neurotoxic Excitatory Effects Management',key:'neurotoxic_excitatory_effects_mngt'},
      {h:'Other Neurotoxic Effects Management',key:'neurotoxic_other_effects_mngt'},
      {h:'Neurotoxic Paralytic Effects Management',key:'neurotoxic_paralytic_effects_mngt'},
      {h:'Other Issues in Treatment',key:'other_issues_in_trmt'},
      {h:'Other Specific Effects Management',key:'other_specific_effects_mngt'},

      {h:'Renal Effects Management',key:'renal_effects_mngt'},
    ]

    if(!currentDetails.treatment.treatment_key){
      return <Collapsible header="Medical Treatment" empty/>
    }

    return <Collapsible header="Medical Treatment">
      <Callout>
        {makeP(currentDetails.treatment.treatment_key)}
      </Callout>
      <Br1/>
      { // sometimes the treatment_key and treatment_summary are identical
        currentDetails.treatment.treatment_key != currentDetails.treatment.treatment_summary ?
        <>
        {makeP(currentDetails.treatment.treatment_summary)}
        <Br1/>
        </>:undefined
      }
      
      
      <Br1/>
      <h2>Management in Detail</h2>
      <Br2/>
      <Columns>
        {keys.map( key => makePill(key.h,currentDetails.treatment[key.key]))}
      </Columns>
      <Br1/>
    </Collapsible>
  }

  const getFirstAid = () => {

    if(!currentDetails.treatment.first_aid_text && !currentDetails.first_aid.descr && !currentDetails.first_aid.details){
      return <Collapsible header="First Aid" empty/>
    }

    return <Collapsible header="First Aid">
          {currentDetails.treatment.first_aid_text?
          <>
            <Callout>
              {makeP(currentDetails.treatment.first_aid_text)}
            </Callout>
            <Br1/>
          </>:undefined
          }
          {makeP(currentDetails.first_aid.descr)}
          {makeList(currentDetails.first_aid.details)}
        </Collapsible>
  }

  const getClinicalEffects = () => {


  if( !currentDetails.clinical.detail_prognosis && 
      !currentDetails.clinical.specific_clinical_effects &&
      !currentDetails.clinical.children && 
      !currentDetails.clinical.pregnancy && 
      !currentDetails.clinical.elderly
    ) return <Collapsible header='Clinical Effects' empty/>

   return <Collapsible header='Clinical Effects'>
      {
        currentDetails.clinical.detail_prognosis?
        <>
          <Callout>
          {makeP(currentDetails.clinical.detail_prognosis)}
          </Callout>
        <Br1/>
        </>:undefined
      }
      
      {
        currentDetails.clinical.specific_clinical_effects?
        <>
        {makeP(currentDetails.clinical.specific_clinical_effects)}
        <Br1/>
        </>:undefined
      }
      
      <h2>Special Risk Groups</h2><Br2/>
      <Columns>
        {makePill('Children',currentDetails.clinical.children)}
        {makePill('Pregnancy',currentDetails.clinical.pregnancy)}
        {makePill('Elderly',currentDetails.clinical.elderly)}
      </Columns>
      <Br1/>
      <h2>Specific Effects Relating to Body Systems or Venom Types</h2><Br2/>
      {getClinicalColumns()}
    </Collapsible>
  }

  const getDescription = () => {

    if( !currentDetails.taxonomy.adult_length &&
      !currentDetails.taxonomy.general_shape &&
      !currentDetails.taxonomy.coloration_markings) return <Collapsible header="Description" empty/>

    return <Collapsible header="Description">
      <Columns>{makePill('Adult Length',currentDetails.taxonomy.adult_length)}</Columns>
      <Br2/>
      {makeP(currentDetails.taxonomy.general_shape)}
      <Br1/>
      {makeSection('Coloration & Markings',currentDetails.taxonomy.coloration_markings)}
      
      { currentDetails.master.orgclass == 'SN'?
        <>
        
        <h2>Head Scales</h2><Br2/>
        { currentDetails.taxonomy.family == 'Viperidae'?
        <Gallery onImage={setImageExpand} gallery={['../assets/diagrams/head-scales-iso.jpeg']}/>:undefined
        }

        { currentDetails.taxonomy.family == 'Elapidae'?
        <Gallery onImage={setImageExpand} gallery={['../assets/diagrams/head-scales-side.png']}/>:undefined
        }

        {makeP(currentDetails.taxonomy.head_scales)}
        <Br1/>
        <h2>Body Scales</h2><Br2/>
        <Gallery onImage={setImageExpand} gallery={['../assets/diagrams/scales-midbody.jpeg','../assets/diagrams/body-scales.jpeg']}/>
        <Columns>
          
          {makePill('Mid Body Scales',currentDetails.taxonomy.min_mid_body_rows+' ≥ '+currentDetails.taxonomy.max_mid_body_rows+' (usually '+currentDetails.taxonomy.modal_mid_body_rows+')')}
          {makePill('Subcaudal Scales',currentDetails.taxonomy.min_subcaudals+' ≥ '+currentDetails.taxonomy.max_subcaudals, currentDetails.taxonomy.anals_detail)}
          {makePill('Ventral Scales',currentDetails.taxonomy.min_ventrals+' ≥ '+currentDetails.taxonomy.max_ventrals)}
          {makePill('Anal Scale (Single or Divided)',currentDetails.taxonomy.anals_category==1?'Divided':'Single')}
        </Columns>
        </> : undefined
    }

    {makeSection('Biological Organism Type',currentDetails.geninfo.organism_type_biology)}
    {makeSection('Breeding',currentDetails.geninfo.breeding)}
    {makeSection('Dentition',currentDetails.geninfo.dentition)}
    {makeSection('Habits',currentDetails.geninfo.habits)}
    {makeSection('Hemipenis',currentDetails.geninfo.hemipenis)}
    {makeSection('Juveniles',currentDetails.geninfo.juveniles)}
    {makeSection('Lethality',currentDetails.geninfo.lethality)}
    {makeSection('Prey',currentDetails.geninfo.prey)}
    {makeSection('Sexual Dimorphism',currentDetails.geninfo.sexual_dimorphism)}
    </Collapsible>
  }

  const getDistributon = () => {
    return <Collapsible header='Distribution'>
      {getGallery(true)}
      <Columns columns={2}>
        {makePill('Region',currentDetails.master.region)}
        {makePill('Countries',currentDetails.master.countries)}
      </Columns>
      <Br1/>
      {makeP(currentDetails.master.distribution)}
      <Br1/>
      {makeSection('Habitat',currentDetails.geninfo.habitat)}
    </Collapsible>
  }

  const getReferences = () => {

    if(!currentDetails.taxonomy.ref) return <Collapsible header='References' empty/>

    return <Collapsible header='References'>
          {makeP(currentDetails.taxonomy.ref)}
          <Br1/>
          {makePill('Status Notes',currentDetails.taxonomy.status_notes)}
          <Br1/>
        </Collapsible>
  }

  const getRisk = () => {
    return <Columns columns={2}>
        { getRiskPill() }

        {
          currentDetails.clinical['approx_dry_bite']?
          <>
          <Pill><h3>Dry Bite</h3>{currentDetails.clinical['approx_dry_bite']}</Pill>
          <Pill><h3>Rate of Envenoming</h3>{currentDetails.clinical['general_rate_of_envenoming']}</Pill>
          </>:undefined
        }

      </Columns>   
  }

  const getCaseStudies = () => {

    if(!currentDetails.caseStudy) return <Collapsible header='Case Studies' empty/>

    return <Collapsible header='Case Studies'>
      {makeP(currentDetails.caseStudy.case_summary)}
    </Collapsible>
  }

  return <organismPillar>
    <scrollPillar>

    { !currentDetails ? 
      <ContentPillar>
        <button onClick={onBack} class={style.back}>Back to Results</button>
        <Br1/>
        <h1>Loading...</h1>
        <h2></h2>
      </ContentPillar> : 
      <ContentPillar>
        <button onClick={onBack} class={style.back}>Back to Results</button>
        <Br1/>
        { getNames() }
        <Br2/>
        { getTaxonomyPills() }
        <Br1/>
        { getGallery() }
        { getRisk() }
        <Br1/>
        {getFirstAid()}
        {getDiagnosis()}
        {getTreatment()}
        {getAntivenom()}
        {getClinicalEffects()}
        {getDescription()}
        {getDistributon()}
        {getVenom()}
        {getCaseStudies()}
        {getReferences()}
      </ContentPillar>
    }
    </scrollPillar>
    { imgExpand ?
      <imageExpandContainer onclick={()=> setImageExpand(undefined)}>
        <img src={imgExpand.url}></img>
        <captionContainer>{imgExpand.caption}</captionContainer>
      </imageExpandContainer>:undefined
    }
  </organismPillar>
};

export default OrganismPillar;

