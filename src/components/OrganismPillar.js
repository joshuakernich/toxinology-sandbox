import { h } from 'preact';
import style from './shared.css';
import ContentPillar from './ContentPillar';
import Gallery from './Gallery';
import Pill from './Pill';
import { Br1, Br2 } from './Br';

const OrganismPillar = ({current,onBack}) => (
  <div class={style.organismpillar}>
    <ContentPillar>
      <button onClick={onBack} class={style.back}>Back to Results</button>
      <Br1/>
      <h1>{current.common_names}</h1>
      <h3>{current.genus + ' ' +current.species}</h3>
      <Br2/>
      <Pill type={'highrisk'}>High Risk</Pill>
      <Pill>{current.kingdon}</Pill>
      <Pill>{current.phylum}</Pill>
      <Pill>{current.class}</Pill>
      <Pill>{current.order}</Pill>
      <Pill>{current.family}</Pill>
      <Pill>{current.subfamily}</Pill>
      <Pill>{current.genus}</Pill>
      <Pill>{current.species}</Pill>
      <Pill>{current.subspecies}</Pill>
      <Br1/>
      <Gallery gallery={[current.map_image_large,'','','']}/> 
      <Br2/>
      <h1>Distribution</h1>
      <Br2/>
      <p>{current.region}</p>
      <Br2/>
      <p>{current.distribution}</p>
      <Br1/>
      <h1>First Aid</h1>
      <h3>For all snakes in the {current.region} Region.</h3>
      <Br2/>
      <p>Give it the olde spit-shine.</p>
      <Br1/>
      <h1>Diagnostic Effects</h1>
      <Br1/>
      <h1>Treatment</h1>
    </ContentPillar>
  </div>
);

export default OrganismPillar;

