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

  return <collapsibleContainer open={open}>
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

    return <Pill risk={categories[iCat].d} type={'risk'}>
      <riskKey>
        <riskKeyItem/>
        <riskKeyItem/>
        <riskKeyItem/>
        <riskKeyItem/>
        <riskKeyItem/>
      </riskKey>
      <h3>{currentDetails.master.venomous_or_poisonous}</h3>
      <p>{categories[iCat].d}</p>
      <p>{currentDetails.clinical.dangerousness}</p>
    </Pill>;
  }

  const getGallery = ( justMap ) => {

    const g = [];
    const b = bucket[currentDetails.master.orgclass];

    if(currentDetails.master.map_image_large) g.push(b+currentDetails.master.map_image_large);

    if(!justMap) currentDetails.graphics.map( graphic => g.push(b+graphic.image) );
    return <Gallery onImage={setImageExpand} gallery={g}/>;
  }

  const makePill = (header,...par) => {
    return<Pill>
      <h3>{header}</h3>
      { par.map( p => <p>{p}</p> ) }
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
    if(!raw) return makeP(raw);
    const list = raw.split(/\n/g);
    return <ol>
      {list.map( entry => entry.length?<li>{ entry.substr(entry.indexOf('.')+1) }</li>:undefined)}
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
      <Callout>
      {makeP(currentDetails.treatment.key_diagnostic_features)}
      </Callout>
      <Br1/>
      <Columns>
        {keys.map( key => <Pill type={'tick-'+currentDetails.diagnosis[key.key]}>{key.h}</Pill>)}
      </Columns>
      <Br1/>
      <Columns>
        {keysLab.map( key => makePill(key.h,currentDetails.treatment[key.key]))}
      </Columns>
    </div>
  }  

  const getTreatment = () => {
    const antivenom = [
      {h:'Antivenom Therapy',key:'antivenom_therapy'},
      {h:'Antivenom Dosage',key:'antivenom_dosage'},
      {h:'Antivenom Reactions',key:'antivenom_reactions'},
      {h:'Adverse Antivenom Reaction Management',key:'adverse_av_reaction_mngt'},
      ]

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

    return <div>
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
      
      <h2>Antivenom</h2>
      <Br2/>
      <Columns>
        {antivenom.map( key => makePill(key.h,currentDetails.treatment[key.key]))}
      </Columns>
      <Br1/>
      <h2>Management in Detail</h2>
      <Br2/>
      <Columns>
        {keys.map( key => makePill(key.h,currentDetails.treatment[key.key]))}
      </Columns>
      <Br1/>
    </div>
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
        
        <Br1/>

        <Columns columns={2}>
          { getRiskPill() }
          <Pill><h3>Dry Bite</h3>{currentDetails.clinical['approx_dry_bite']}</Pill>
          <Pill><h3>Rate of Envenoming</h3>{currentDetails.clinical['general_rate_of_envenoming']}</Pill>
        </Columns>

        <Br1/>

        <Collapsible header="First Aid">
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
        <Collapsible header="Further Treatment">
          {getTreatment()}
        </Collapsible>
        <Collapsible header="Description">
          {makeP(currentDetails.taxonomy.general_shape)}
          <Br1/>
          {makeP(currentDetails.taxonomy.coloration_markings)}
          
          { currentDetails.master.orgclass == 'SN'?
            <>
            <Br1/>
            {makeSection('Head Scales',currentDetails.taxonomy.head_scales)}
            <Columns>
              {makePill('Adult Length',currentDetails.taxonomy.adult_length)}
              {makePill('Mid Body Scales',currentDetails.taxonomy.min_mid_body_rows+' > '+currentDetails.taxonomy.max_mid_body_rows+' (usually '+currentDetails.taxonomy.modal_mid_body_rows+')')}
              {makePill('Subcaudal Scales',currentDetails.taxonomy.min_subcaudals+' > '+currentDetails.taxonomy.max_subcaudals, currentDetails.taxonomy.anals_detail)}
              {makePill('Ventral Scales',currentDetails.taxonomy.min_ventrals+' > '+currentDetails.taxonomy.max_ventrals)}
              {makePill('Anal Category',currentDetails.taxonomy.anals_category==1?'divided':'single')}
            </Columns>
            </> : undefined
        }
        </Collapsible>
        <Collapsible header='Distribution'>
        
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
        <Collapsible header="Venom">
          <h2>Antivenom</h2>
          <ol>
            {currentDetails.antivenoms.map( v => <li>
              <p><b>{v.name}</b></p>
              <h3>{v.id} by {v.manufacturer}</h3>
              <p>{v.product_description}</p>
            </li> )}
          </ol>
        </Collapsible>
        <Collapsible header="Diagnosis">
          {getDiagnosis()}
        </Collapsible>
        <Collapsible header='Clinical Effects'>
          <Callout>
            {makeP(currentDetails.clinical.detail_prognosis)}
          </Callout>
          <Br1/>
          {makeP(currentDetails.clinical.specific_clinical_effects)}
          <Br1/>
          <Columns>
            {makePill('Children',currentDetails.clinical.children)}
            {makePill('Pregnancy',currentDetails.clinical.pregnancy)}
            {makePill('Elderly',currentDetails.clinical.elderly)}
          </Columns>
          <Br1/>
          {getClinical()}
        </Collapsible>
        
        <Collapsible header='References'>
          {makeP(currentDetails.taxonomy.ref)}
          <Br1/>
          {makePill('Status Notes',currentDetails.taxonomy.status_notes)}
          <Br1/>
        </Collapsible>
      </ContentPillar>
    }
    </scrollPillar>
    { imgExpand ?
      <imageExpandContainer onclick={()=> setImageExpand(undefined)}>
        <img src={imgExpand}/>
      </imageExpandContainer>:undefined
    }
  </organismPillar>
};

export default OrganismPillar;

