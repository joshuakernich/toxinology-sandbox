import { h } from 'preact';
import style from './shared.css';
import ContentPillar from './ContentPillar';
import Gallery from './Gallery';
import Pill from './Pill';
import { Br1, Br2 } from './Br';
import api from '../services/api';
import { useEffect, useState, useRef } from 'preact/hooks';

const OrganismPillar = ({ current, onBack }) => {
  const [currentDetails, setCurrentDetails] = useState(undefined);

  const bucket = 'http://www.toxinology.com/images/snakes/';

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
      { taxonomy.map((key) => currentDetails[key] && <Pill class={key}><h3>{key}</h3>{currentDetails[key]}</Pill>) }
    </>;
  };

  const getRiskPill = () => {
    return <Pill type={'highrisk'}><h3>{currentDetails.venomous_or_poisonous}</h3> High Risk</Pill>;
  }

  const getGallery = () => {
    return <Gallery gallery={[bucket+current.map_image_large,bucket+currentDetails.image]}/>;
  }

  const getFirstAidDescription = () => {
    const rawDescription = currentDetails.descr;
    return <organismFirstAidContainer dangerouslySetInnerHTML={{__html: rawDescription.replace(/\n/g, "<br /><br />")}} />;
  }

  const getDiagnosticEffects = () => {
    const rawDescription = currentDetails.details;
    return <organismFirstAidContainer dangerouslySetInnerHTML={{__html: rawDescription.replace(/\n/g, "<br /><br />")}} />;
  }

  const getTreatment = () => {
    const rawDescription = currentDetails.details;
    return <organismFirstAidContainer dangerouslySetInnerHTML={{__html: rawDescription.replace(/\n/g, "<br /><br />")}} />;
  }

  const getMostGranularDistribution = () => {
    if(currentDetails.distribution) return <p>{currentDetails.distribution}</p>
    else if(currentDetails.countries) return <p>{currentDetails.countries}</p>
    else if(currentDetails.region) return <p>{currentDetails.region}</p>
  }



  const maybeShow = [

    {key:'first_aid_text', header:'First Aid'},
    {key:'general_approach_to_mngt', header:'General Approach to Management'},
    {key:'treatment_key', header:'Treatment Key'},
    {key:'treatment_summary', header:'Treatment Summary'},
    {key:'descr', header:'First Aid'},
    {key:'follow_up', header:'Follow Up'},

    {key:'habitat', header:'Habitat'},
    {key:'specific_clinical_effects', header:'Clinical Effects'},
    {key:'key_diagnostic_features', header:'Diagnostic Features'},
    {key:'breeding', header:'Breeding'},
    {key:'dentition', header:'Dentition'},
    {key:'general_shape', header:'General Shape'},
    {key:'head_scales', header:'Head Scales'},
    {key:'anals_detail', header:'A Closer Look at the Butthole'},

    
  ]

  const makeSection = (header,raw) => {
    return<>
          <h1>{header}</h1> 
          <Br2/>
          {makeP(raw)}
          <Br1/>
        </>
  }

  const makeP = (raw) => {
    return <p dangerouslySetInnerHTML={{__html: raw.replace(/\n/g, "<br />")}} />;
  }

  const getWhateverYouCan = () => {

    return <>{
      maybeShow.map(maybe => currentDetails[maybe.key]?makeSection(maybe.header,currentDetails[maybe.key]):undefined)
    }</>
  }

  return <div class={style.organismpillar}>
    { !currentDetails ? 
      <loadingSpinner /> : 
      <ContentPillar>
        <button onClick={onBack} class={style.back}>Back to Results</button>
        <Br1/>
        <h1>{currentDetails.common_names}</h1>
        <h3>{currentDetails.genus} {currentDetails.species}</h3>
        <Br2/>
        { getRiskPill() }
        { getTaxonomyPills() }
        <Br1/>
        { getGallery() }
        <Br2/>
        
        <h1>Distribution</h1>
        <Br2/>
        {getMostGranularDistribution()}
        <Br1/>
        {getWhateverYouCan()}
        
        {/*<h1>First Aid</h1>
        <Br2/>
        { getFirstAidDescription() }
        <Br1/>
        <h1>Diagnostic Effects</h1>
        <Br2/>
        { getDiagnosticEffects() }
        <Br1/>
        <h1>Treatment</h1>
        <Br2/>
        { getTreatment() }
        <Br1/>*/}
      </ContentPillar> }
  </div>
};

export default OrganismPillar;

