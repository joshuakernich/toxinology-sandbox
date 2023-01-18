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

const biospheres = [
  {t:'Land'},
  {t:'Salt Water'},
  {t:'Fresh Water'},
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
      <h2>Location</h2>
      <h3>Including recent travel</h3><Br2/>
      <LocationBuilder/>
      <Br1/>
      <h2>Keywords</h2><Br2/>
      <KeywordBuilder/>
      <Br1/>
      <h2>Biosphere</h2><Br2/>
      <RadioGroup o={biospheres}/>
      <Br1/>
      <h2>Diagnostic Effects</h2><Br2/>
      <button onclick={toDiagnostic} class={style.more}>None Observed</button>
      <Br1/>
      <h2>Labs/Blood Indicators</h2><Br2/>
      <button onclick={toLabs} class={style.more}>NA or Normal</button>
    </ContentPillar>):undefined}
    {drill == 'diagnostic'?<DiagnosticPillar toBack={toBack}/>:undefined}
    {drill == 'labs'?<LabsPillar toBack={toBack}/>:undefined}
  </div>
};

export default SearchPillar;