import { h } from 'preact';
import style from './shared.css';
import Logo from './Logo';
import ContentPillar from './ContentPillar';
import LabsPillar from './LabsPillar';
import DiagnosticPillar from './DiagnosticPillar';
import LocationBuilder from './LocationBuilder';
import KeywordBuilder from './KeywordBuilder';
import {RadioGroup} from './Radio';
import { Br1, Br2 } from './Br';
import { useState } from 'preact/hooks';

const organismTypes = [
  {t:'Snake', i:'../assets/icons/icon-snake.svg'},
  {t:'Spider', i:'../assets/icons/icon-spider.svg'},
  {t:'Scorpion', i:'../assets/icons/icon-scorpion.svg'},
  {t:'Marine Verterbrate', i:'../assets/icons/icon-fish.svg'},
  {t:'Marine Inverterbrate', i:'../assets/icons/icon-octopus.svg'},
  {t:'Land Verterbrate', i:'../assets/icons/icon-lizard.svg'},
  {t:'Land Inverterbrate', i:'../assets/icons/icon-bee.svg'},
  {t:'Poisonous Mushroom', i:'../assets/icons/icon-mushroom.svg'},
  {t:'Poisonous Plant', i:'../assets/icons/icon-flower.svg'},
]

const SearchPillar = () => {


  const [drill,setDrill] = useState('root');

  const toBack = () => {
    setDrill('root');
  }

  const toDiagnostic = () => {
    setDrill('diagnostic')
  }

  const toLabs = () => {
    setDrill('labs')
  }

  return <div class={style.searchpillar}>
    {drill == 'root' ? ( <ContentPillar>
      <Logo/>
      <Br1/>
      <h2>Location</h2><Br2/>
      <LocationBuilder/>
      <Br1/>
      <h2>Keywords</h2><Br2/>
      <KeywordBuilder/>
      <Br1/>
      <h2>Organism Type</h2>
      <h3>Include all possibilities</h3>
      <Br2/>
      <RadioGroup type='grid' o={organismTypes}/>
      <Br1/>
      <h2>Diagnostic Effects</h2><Br2/>
      <button onclick={toDiagnostic} class={style.more}>None Observed</button>
    </ContentPillar>):undefined}
    {drill == 'diagnostic'?<DiagnosticPillar toBack={toBack}/>:undefined}
    {drill == 'labs'?<LabsPillar toBack={toBack}/>:undefined}
  </div>
};

export default SearchPillar;