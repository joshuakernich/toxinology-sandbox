import { h } from 'preact';
import style from './shared.css';
import ContentPillar from './ContentPillar';
import Gallery from './Gallery';
import Pill from './Pill';
import { Br1, Br2 } from './Br';
import api from '../services/api';
import { useEffect, useState, useRef } from 'preact/hooks';

const Collapsible = ({header,...props}) =>{

  const [open,setOpen] = useState(false);

  const toggle = ()=>{
    setOpen(!open);
  }

  return <div class={style.collapsiblecontainer}>
  <hr/>
    <h1 onclick={toggle}>{header}</h1>
    
    {open?<><Br2/>{props.children}</>:undefined}
    
  </div>
}

const Columns = ({...props}) => {
  return <columnContainer>
    {props.children}
  </columnContainer>
}

const Grid = ({...props}) => {
  return <gridContainer>
    {props.children}
  </gridContainer>
}

const OrganismPillar = ({ current, onBack }) => {
  const [currentDetails, setCurrentDetails] = useState(undefined);

  const bucket = 
  {
    'SN':'http://www.toxinology.com/images/snakes/',
    'SC':'http://www.toxinology.com/images/scorpions/',
    'SP':'http://www.toxinology.com/images/spiders/',
    'PM':'http://www.toxinology.com/images/poisonous_mushrooms/',
    'PM':'http://www.toxinology.com/images/poisonous_plants/',
    'TV':'http://www.toxinology.com/images/other_life/',
    'TI':'http://www.toxinology.com/images/other_life/',
    'MV':'http://www.toxinology.com/images/marine_life/',
    'MI':'http://www.toxinology.com/images/marine_life/',
  }

  useEffect(async () => {
    try {
      const creatureDetails = await api.getCreatureDetails(current.oid);

      console.log(`Got creatureDetails: `, creatureDetails);

      setCurrentDetails(creatureDetails);
    } catch (e) {
      console.error("Error getting creature details", e);
    }
  }, [ current ]);

  const getTaxonomyPills = () => {
    const taxonomy = ["kingdom", "phylum", "class", "order", "family", "subfamily", "genus", "species"];
    return <>
      { taxonomy.map((key) => currentDetails.taxonomy[key] && <Pill class={key}><h3>{key}</h3>{currentDetails.taxonomy[key]}</Pill>) }
      { currentDetails.master['subspecies']?<Pill><h3>subspecies</h3>{currentDetails.master['subspecies']}</Pill>:undefined }
    </>;
  };

  const getRiskPill = () => {

    // t represents the upper threshold
    const categories = [
      {t:0, d:'Unknown Risk'},
      {t:1, d:'No Risk'},
      {t:20, d:'Low Risk'},
      {t:40, d:'Mild Risk'},
      {t:70, d:'Moderate Risk'},
      {t:100, d:'High Risk'},
    ]

    const raw = currentDetails.clinical.dangerousness_index;
    const di = parseInt(raw?raw.substring(2,raw.indexOf('.')):-1);

    let iCat = 0;
    while( di >= categories[iCat].t ) iCat++;

    return <Pill risk={categories[iCat].d} type={'risk'}><h3>{currentDetails.master.venomous_or_poisonous}</h3>{categories[iCat].d} | {currentDetails.clinical.dangerousness}</Pill>;
  }

  const getGallery = () => {

    const g = [];
    const b = bucket[currentDetails.master.orgclass];

    if(currentDetails.master.map_image_large) g.push(b+currentDetails.master.map_image_large);

    currentDetails.graphics.map( graphic => g.push(b+graphic.image) );

    console.log(g);

    return <Gallery gallery={g}/>;
  }

  const keys_distribution = [
    {key:'region', header:'Region'},
    {key:'countries', header:'Countries'},
    {key:'distribution', header:'Detailed Distribution'},
  ]

  const keys_first_aid = [

    //first aid
    {key:'first_aid_text', header:'First Aid (first_aid_text)'},
    {key:'descr', header:'First Aid (descr)'},
    {key:'details', header:'First Aid (details)'},
  ]

  const keys_treatment = [

    {key:"detail_prognosis", header:"Prognosis"},
    // treatment
    {key:'treatment_key', header:'Treatment Key'},
    {key:'treatment_summary', header:'Treatment Summary'},
    {key:'follow_up', header:'Follow Up'},

    // granular management stuff
    {key:'general_approach_to_mngt', header:'General Approach to Management'},
    {key:'local_effects_mngt', header:'Local Effects Management'},
    {key:'haematologic_effects_mngt', header:'Haematologic Effects Management'},
    {key:'haematologic_other_effects_mngt', header:'Haematologic Other Effects Management'},
    {key:'immediate_effects_mngt', header:'Immediate Effects Management'},
    {key:'myotoxic_effects_mngt', header:'Myotoxic Effects Management'},
    {key:'necrotoxin_effects_mngt', header:'Necrotoxic Effects Management'},
    {key:'neurotoxic_excitatory_effects_mngt', header:'Necrotoxic Excitatory Effects Management'},
    {key:'neurotoxic_other_effects_mngt', header:'Necrotoxic Other Effects Management'},
    {key:'neurotoxic_paralytic_effects_mngt', header:'Necrotoxic Paralytic Effects Management'},
    {key:'other_issues_in_trmt', header:'Other Issues in Treatment'},
    {key:'other_specific_effects_mngt', header:'Other Specific Effects Management'},
    
    //antivenom
    {key:'antivenom_therapy', header:'Antivenom Therapy'},
    {key:'antivenom_reactions', header:'Antivenom Reactions'},
  ]

  const keys_effects = [
    {key:'specific_clinical_effects', header:'Clinical Effects'},
    {key:'key_diagnostic_features', header:'Diagnostic Features'},

    {key:"detail_coagulopathy", header:"Coagulopathy"},
    {key:"detail_haemorrhagins", header:"Haemorrhagins"},
    {key:"detail_local_effects", header:"Local Effects"},
    {key:"detail_myotoxicity", header:"Myotoxicity"},
    {key:"detail_necrosis", header:"Necrosis"},
    {key:"detail_nephrotoxicity", header:"Nephrotoxicity"},
    {key:"detail_neurotoxicity", header:"Neurotoxicity"},
    {key:"detail_other", header:"Other"},
  ]

  const keys_description = [
    {key:'comments', header:'Comments'},
    {key:'approx_dry_bite', header:'Dry Bite'},
    {key:'habitat', header:'Habitat'},
    {key:'habits', header:'Habits'},
    {key:'prey', header:'Prey'},
    {key:'sexual_dimorphism', header:'Sexual Dimorphism'},
    {key:'breeding', header:'Breeding'},
    {key:'dentition', header:'Dentition'},
    {key:'general_shape', header:'General Shape'},
    {key:'coloration_markings', header:'Coloration Markings'},
    {key:'head_scales', header:'Head Scales'},
    {key:'anals_detail', header:'A Closer Look at the Butthole'},  
  ]

  const makePill = (header,text) => {
    return<Pill>
      <h3>{header}</h3>
      <p>{text}</p>
    </Pill>
  }

  const makeSection = (header,raw) => {
    return<>
      <h2>{header}</h2>
      <Br2/>
      {makeP(raw)}
      <Br1/>
    </>
  }

  const makeP = (raw) => {
    return <p dangerouslySetInnerHTML={{__html: raw.toString().replace(/\n/g, "<br />")}} />;
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
    return <>
      <h1>{currentDetails.master.common_names.replace(' , ',', ')}</h1>
      <h3>{currentDetails.taxonomy.genus} {currentDetails.taxonomy.species}</h3>
    </>
  }

  const getClinical = () => {

    const keys = [
      {h:'Cardiotoxicity',        key:'general_cardiotoxicity'},
      {h:'Coagulopathy',          key:'general_coagulopathy_and_haemorrhages',key2:'detail_coagulopathy'},
      {h:'System Effects',        key:'general_general_system_effects'},
      {h:'Local Effects',         key:'general_local_effects',key2:'detail_local_effects'},
      {h:'Necrosis',              key:'general_local_necrosis',key2:'detail_necrosis'},
      {h:'Myotoxicity',           key:'general_myotoxicity'},
      {h:'Neurotoxic Paralysis',  key:'general_neurotoxic_paralysis'},
      {h:'Rate of Envenoming',    key:'general_rate_of_envenoming'},
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
      {h:'Prognosis',             key:'detail_prognosis'},
      {h:'Other',                 key:'general_other', key2:'detail_other'},
    ]

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

  const getDiagnosis = () => {

    const keys = [
      {h:'Cardiotoxin',               key:'cardiotoxin'},
      {h:'Haemostasis and Bleeding',  key:'haemostasis_and_bleeding'},
      {h:'Haematologic Red Blood Cell',          key:'haematologic_rbc'},
      {h:'Haematologic White Blook Cell',        key:'haematologic_wbc'},
      {h:'Haematologic Platelet',     key:'haematologic_platelet'},
      {h:'Myotoxic',                  key:'myotoxic'},
      {h:'Neurotoxic Paralytic',      key:'neurotoxic_paralytic'},
      {h:'Neurotoxic Excitatory',     key:'neurotoxic_excitatory'},
      {h:'Dermatological',            key:'dermatological'},
      {h:'Localised',                 key:'localised'},
      {h:'Necrotoxin',                key:'necrotoxin'},
      {h:'Cardiovascular',            key:'cardiovascular'},
      {h:'Respiratory',               key:'respiratory'},
      {h:'Angio Oedema or Allergic',  key:'angio_oedema_or_allergic'},
      {h:'Venom Spit Ophthalmia',     key:'venom_spit_ophthalmia'},
      {h:'Anterior Pituitary Haemorrhage', key:'anterior_pituitary_haemorrhage'},
      {h:'Other',                     key:'other'},
      {h:'General System',            key:'general_system'},
      {h:'Renal',                     key:'renal'},
    ]

    return <Columns>
      {keys.map( key => console.log(currentDetails.diagnosis[key.key]))}
      {keys.map( key => <Pill type={'tick-'+currentDetails.diagnosis[key.key]}>{key.h}</Pill>)}
    </Columns>
  }  



  return <div class={style.organismpillar}>
    { !currentDetails ? 
      <loadingSpinner /> : 
      <ContentPillar>
        <button onClick={onBack} class={style.back}>Back to Results</button>
        <Br1/>
        { getNames() }
        <Br2/>
        { getTaxonomyPills() }
        <Br2/>
        <Columns>
          { getRiskPill() }
          <Pill><h3>Dry Bite</h3>{currentDetails.clinical['approx_dry_bite']}</Pill>
          <Pill><h3>Rate of Envenoming</h3>{currentDetails.clinical['general_rate_of_envenoming']}</Pill>
        </Columns>
        <Br1/>
        { getGallery() }
        <Br1/>
        <Collapsible header='Distribution and Habitat'>
          <Columns>
            {makePill('Region',currentDetails.master.region)}
            {makePill('Countries',currentDetails.master.countries)}
          </Columns>
          <Br1/>
          {makeSection('Distribution',currentDetails.master.distribution)}
          {makeSection('Habitat',currentDetails.geninfo.habitat)}
        </Collapsible>
        <Collapsible header='Risks and Clinical Effects'>
          <h2></h2>
          <Br2/>
          {makeSection('Danger and Prognosis',currentDetails.clinical.detail_prognosis + ' | ' + currentDetails.clinical.dangerousness)}
          <Columns>
            <Pill><h3>Children</h3>{currentDetails.clinical.children}</Pill>
            <Pill><h3>Pregnancy</h3>{currentDetails.clinical.pregnancy}</Pill>
            <Pill><h3>Elderly</h3>{currentDetails.clinical.elderly}</Pill>    
          </Columns>
          <Br1/>
          <h2>Clinical Effects</h2>
          <Br2/>
          {getClinical()}
          <Br1/>
          {makeP(currentDetails.clinical.specific_clinical_effects)}
        </Collapsible>
        <Collapsible header="Diagnosis">
          {getDiagnosis()}
        </Collapsible>
        
        { getAll('First Aid',currentDetails.first_aid) }
        { getAll('General Info',currentDetails.geninfo) }
        { getAll('Taxonomy',currentDetails.taxonomy) }
        { getAll('Treatment',currentDetails.treatment) }
        { getAll('Venom',currentDetails.venom) }

        
        
      </ContentPillar> }
  </div>
};

export default OrganismPillar;

