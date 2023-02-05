import { h } from 'preact';
import { useLayoutEffect, useState } from 'preact/hooks';
import style from './shared.css';
import ContentPillar from './ContentPillar';
import Gallery from './Gallery';
import Pill from './Pill';
import { Br1, Br2 } from './Br';
import { API_URL } from '../libs/consts';

const OrganismPillar = ({result, onBack}) => {

  console.log(result)
  const creatureId = result.oid;
  const [creatureData, setCreatureData] = useState(false);

  useLayoutEffect(async () => {

    console.log('lets go',creatureId);

    const response = await fetch(`${API_URL}/creature-details/${creatureId}`, {
      method: 'get',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Access-Control-Allow-Headers': "true",
        'Content-Type': 'application/json'
      }
    });

    if (response) {
      const body = await response.json();

      console.log(body);

      setCreatureData(body);

    }
  }, []);


  return <div class={style.organismpillar}>
    <ContentPillar>
      <button onClick={onBack} class={style.back}>Back to Results</button>
      <Br1/>
      <h1>{result.common_names}</h1>
      <h3>{result.species}</h3>
      <Br2/>
      <Pill type={'highrisk'}>High Risk</Pill>
      <Pill>{result.kingdon}</Pill>
      <Pill>{result.phylum}</Pill>
      <Pill>{result.class}</Pill>
      <Pill>{result.order}</Pill>
      <Pill>{result.family}</Pill>
      <Pill>{result.subfamily}</Pill>
      <Pill>{result.genus}</Pill>
      <Br1/>
      <Gallery gallery={[result.map_image_large.gif]}/>
      <Br2/>
      <h1>Distribution</h1>
      <Br2/>
      <p>{result.region}</p>
      <Br2/>
      <p>{result.distribution}</p>
      <Br2/>
      <h1>First Aid</h1>

      <h3>For all snakes in the Australia and New Guinea Region.</h3>
      <Br2/>
      <p>Give it the olde spit-shine.</p>
      <Br1/>
      <h1>Diagnostic Effects</h1>
      <h1>Treatment</h1>
    </ContentPillar>
  </div>
};

export default OrganismPillar;

