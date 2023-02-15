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

  return <div open={open} class={style.collapsiblecontainer}>
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
  const [imgExpand, setImageExpand] = useState(undefined);

  const bucket = 
  {
    'SN':'http://www.toxinology.com/images/snakes/',
    'SC':'http://www.toxinology.com/images/scorpions/',
    'SP':'http://www.toxinology.com/images/spiders/',
    'PM':'http://www.toxinology.com/images/poisonous_mushrooms/',
    'PP':'http://www.toxinology.com/images/poisonous_plants/',
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
    return <Gallery onImage={setImageExpand} gallery={g}/>;
  }

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
    return raw?<p dangerouslySetInnerHTML={{__html: raw.toString().replace(/\n/g, "<br />")}} />:<p>No data</p>;
  }

  const makeList = (raw) => {
    const list = raw.split(/\n/g);
    return <ol>
      {list.map( entry => <li>{entry.substr(2)}</li>)}
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
    const binomial = currentDetails.taxonomy.genus+' '+currentDetails.taxonomy.species;
    return <>
      <h1>{currentDetails.master.common_names?currentDetails.master.common_names.replace(' , ',', '):binomial}</h1>
      <h3>{binomial}</h3>
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

    const keysLab = [
      {h:'Abs Lymph',key:'abs_lymph'},
      {h:'Apao2',key:'apao2'},
      {h:'Aptt',key:'aptt'},
      {h:'CK',key:'ck'},
      {h:'Creatinine',key:'creatinine'},
      {h:'Fdpxdp',key:'fdpxdp'},
      {h:'Fibrinogen',key:'fibrinogen'},
      {h:'HB',key:'hb'},
      {h:'K',key:'k'},
      {h:'Platelets',key:'platelets'},
      {h:'PT INR',key:'pt_inr'},
      {h:'Urea',key:'urea'},
      {h:'Wbct',key:'wbct'},
      {h:'Wcc',key:'wcc'},
    ]

    return <div>
      {makeP(currentDetails.treatment.key_diagnostic_features)}
      <Br2/>
      <Columns>
        {keys.map( key => <Pill type={'tick-'+currentDetails.diagnosis[key.key]}>{key.h}</Pill>)}
      </Columns>
      <Br2/>
      <Columns>
        {keysLab.map( key => makePill(key.h,currentDetails.treatment[key.key]))}
      </Columns>
    </div>
  }  

  const getTreatment = () => {
    const keys = [
     
      {h:'Adverse Antivenom Reaction Management',key:'adverse_av_reaction_mngt'},
      {h:'Antivenom Dosage',key:'antivenom_dosage'},
      {h:'Antivenom Reactions',key:'antivenom_reactions'},
      {h:'Antivenom Therapy',key:'antivenom_therapy'},
      
      {h:'Cardiotoxin Effects Management',key:'cardiotoxin_effects_mngt'},
      
      {h:'First Aid Text',key:'first_aid_text'},
      {h:'Follow Up',key:'follow_up'},
      {h:'Approach to Management',key:'general_approach_to_mngt'},
      {h:'Systemic Effects Management',key:'general_systemic_effects_mngt'},
      {h:'Haematologic Effects Management',key:'haematologic_effects_mngt'},
      {h:'Haematologic Other Effects Management',key:'haematologic_other_effects_mngt'},
      
      {h:'Immediate Effects Management',key:'immediate_effects_mngt'},
      {h:'Important Laboratory Test',key:'important_laboratory_test'},
      
      //{h:'Key Diagnostic Features',key:'key_diagnostic_features'},
      {h:'Local Effects Mngt',key:'local_effects_mngt'},
      {h:'Myotoxic Effects Mngt',key:'myotoxic_effects_mngt'},
      {h:'Necrotoxin Effects Mngt',key:'necrotoxin_effects_mngt'},
      {h:'Neurotoxic Excitatory Effects Mngt',key:'neurotoxic_excitatory_effects_mngt'},
      {h:'neurotoxic_other_effects_mngt',key:'neurotoxic_other_effects_mngt'},
      {h:'neurotoxic_paralytic_effects_mngt',key:'neurotoxic_paralytic_effects_mngt'},
      {h:'other_issues_in_trmt',key:'other_issues_in_trmt'},
      {h:'other_specific_effects_mngt',key:'other_specific_effects_mngt'},

      {h:'renal_effects_mngt',key:'renal_effects_mngt'},
    ]

    return <div>
      <Callout>
        {makeSection('Key Considerations',currentDetails.treatment.treatment_key)}
      </Callout>
      <Br1/>
      {makeP(currentDetails.treatment.treatment_summary)}
      <Br1/>
      <Columns>
        {keys.map( key => makePill(key.h,currentDetails.treatment[key.key]))}
      </Columns>
      <Br1/>
    </div>
  }

  return <organismPillar>

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

        {currentDetails.first_aid? //sometimes, there is no first aid
        <Collapsible header="First Aid">
          {makeP(currentDetails.first_aid.descr)}
          {makeList(currentDetails.first_aid.details)}
        </Collapsible>:undefined}
        <Collapsible header="Description">
          <Columns>
            {makePill('Adult Length',currentDetails.taxonomy.adult_length)}
            {makePill('A Closer Look at the Butthole',currentDetails.taxonomy.anals_detail)}
          </Columns>
          {makeSection('General Shape',currentDetails.taxonomy.general_shape)}
          {makeSection('Coloration Markings',currentDetails.taxonomy.coloration_markings)}
          {makeSection('Head Scales',currentDetails.taxonomy.head_scales)}
          <Columns>
            {makePill('Mid Body',currentDetails.taxonomy.min_mid_body_rows+' > '+currentDetails.taxonomy.max_mid_body_rows+' (usually '+currentDetails.taxonomy.modal_mid_body_rows+')')}
            {makePill('Subcaudal',currentDetails.taxonomy.min_subcaudals+' > '+currentDetails.taxonomy.max_subcaudals)}
            {makePill('Ventral',currentDetails.taxonomy.min_ventrals+' > '+currentDetails.taxonomy.max_ventrals)}
          </Columns>
        </Collapsible>
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
          <Br2/>
          <Callout>
            {makeP(currentDetails.clinical.detail_prognosis)}
          </Callout>
          <Br2/>
          <Columns>
            {makePill('Children',currentDetails.clinical.children)}
            {makePill('Pregnancy',currentDetails.clinical.pregnancy)}
            {makePill('Elderly',currentDetails.clinical.elderly)}
          </Columns>
          <Br1/>
          <h2>Clinical Effects</h2>
          <Br2/>
          {getClinical()}
          <Br1/>
          {makeP(currentDetails.clinical.specific_clinical_effects)}t
        </Collapsible>
        <Collapsible header="Diagnosis">
          {getDiagnosis()}
        </Collapsible>
        <Collapsible header="Treatment and Management">
          {getTreatment()}
        </Collapsible>
        <Collapsible header='References'>
          {makeP(currentDetails.taxonomy.ref)}
          <Br1/>
          {makeSection('Status Notes',currentDetails.taxonomy.status_notes)}
          <Br1/>
        </Collapsible>
      </ContentPillar>
    }
    { imgExpand ?
      <imageExpandContainer onclick={()=> setImageExpand(undefined)}>
        <img src={imgExpand}/>
      </imageExpandContainer>:undefined
    }
  </organismPillar>
};

export default OrganismPillar;

