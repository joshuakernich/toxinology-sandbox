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
      { taxonomy.map((key) => currentDetails[key] && <Pill class={key}>{currentDetails[key]}</Pill>) }
    </>;
  };

  const getRiskPill = () => {
    return <Pill type={'highrisk'}>High Risk</Pill>;
  }

  const getGallery = () => {
    return <Gallery gallery={[current.map_image_large,'','','']}/>;
  }

  const getFirstAidDescription = () => {
    const rawDescription = currentDetails.details;
    return <organismFirstAidContainer dangerouslySetInnerHTML={{__html: rawDescription.replace(/\n/g, "<br />")}} />;
  }

  const getDiagnosticEffects = () => {
    const rawDescription = currentDetails.details;
    return <organismFirstAidContainer dangerouslySetInnerHTML={{__html: rawDescription.replace(/\n/g, "<br />")}} />;
  }

  const getTreatment = () => {
    const rawDescription = currentDetails.details;
    return <organismFirstAidContainer dangerouslySetInnerHTML={{__html: rawDescription.replace(/\n/g, "<br />")}} />;
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
        <p>{currentDetails.region}</p>
        <Br2/>
        <p>{currentDetails.distribution}</p>
        <Br1/>
        <h1>First Aid</h1>
        { getFirstAidDescription() }
        <Br1/>
        <h1>Diagnostic Effects</h1>
        <Br1/>
        { getDiagnosticEffects() }
        <Br1/>
        <h1>Treatment</h1>
        <Br1/>
        { getTreatment() }
        <Br1/>
      </ContentPillar> }
  </div>
};

export default OrganismPillar;

