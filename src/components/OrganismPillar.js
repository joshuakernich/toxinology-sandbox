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
    <h1 onclick={toggle}>{header}</h1>
    
    {open?<><Br2/>{props.children}</>:undefined}
    <hr/>
  </div>
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
    const taxonomy = ["kingdom", "phylum", "class", "order", "family", "subfamily", "genus", "species", "subspecies"];
    return <>
      { taxonomy.map((key) => currentDetails.taxonomy[key] && <Pill class={key}><h3>{key}</h3>{currentDetails.taxonomy[key]}</Pill>) }
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



  const makeSection = (header,raw) => {

    console.log(raw);

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
    console.log(data);
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

  

  return <div class={style.organismpillar}>
    { !currentDetails ? 
      <loadingSpinner /> : 
      <ContentPillar>
        <button onClick={onBack} class={style.back}>Back to Results</button>
        <Br1/>
        { getNames() }
        <Br2/>
        { getRiskPill() }
        { getTaxonomyPills() }
        <Br1/>
        { getGallery() }
        <Br1/>
        { getAll('Master',currentDetails.master) }
        { getAll('Clinical',currentDetails.clinical) }
        { getAll('Diagnosis',currentDetails.diagnosis) }
        { getAll('First Aid',currentDetails.first_aid) }
        { getAll('General Info',currentDetails.geninfo) }
        { getAll('Taxonomy',currentDetails.taxonomy) }
        { getAll('Treatment',currentDetails.treatment) }
        { getAll('Venom',currentDetails.venom) }

        {/*<Br1/>
        <h1>{ getNames().length?getNames():currentDetails.genus+' '+currentDetails.species}</h1>
        <h3>{currentDetails.genus} {currentDetails.species}</h3>
        <Br2/>
        { getRiskPill() }
        { getTaxonomyPills() }
        <Br1/>
        { getGallery() }
        <Br1/>*/}
      
        
        {/*}

        {getWhateverYouCan('First Aid',keys_first_aid)}
        {getWhateverYouCan('Further Treatment',keys_treatment)}
        {getWhateverYouCan('Effects',keys_effects)}
        {getWhateverYouCan('Distribution',keys_distribution)}
        {getWhateverYouCan('Description',keys_description)}
        */}
        
        
      </ContentPillar> }
  </div>
};

export default OrganismPillar;

