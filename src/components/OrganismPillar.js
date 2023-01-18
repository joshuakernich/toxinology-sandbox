import { h } from 'preact';
import style from './shared.css';
import ContentPillar from './ContentPillar';
import Gallery from './Gallery';
import Pill from './Pill';
import { Br1, Br2 } from './Br';

const OrganismPillar = ({onBack}) => (
  <div class={style.organismpillar}>
    <ContentPillar>
      <button onClick={onBack} class={style.back}>Back to Results</button>
      <Br1/>
      <h1>Languishing Snake</h1>
      <h3>Languishio Snakilius</h3>
      <Br2/>
      <Pill type={'highrisk'}>High Risk</Pill>
      <Pill>Animalias</Pill>
      <Pill>Slitherino</Pill>
      <Pill>Languishio</Pill>
      <Pill>Snakilius</Pill>
      <Pill>Australia</Pill>
      <Br1/>
      <Gallery/>
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
);

export default OrganismPillar;

