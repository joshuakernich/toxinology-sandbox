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
import { useState, useRef } from 'preact/hooks';

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
];

const SearchPillar = ({ onChange }) => {
  // PF: we need to keep track of the list/keyword/organisms between renders.
  // using refs here because the child elements seem to be handling their own stuff.
  // that's cool and all <3.
  const locationsRef = useRef(['AU']);
  const keywordsRef = useRef([]);
  const organismTypesRef = useRef({});

  // PF TODO: implement search criteria
  const diagnosticTypesRef = useRef({});

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

  // ping the server to get results back as we type stuff in.
  const onUpdate = () => {
    // we've updated stuff, so lets tell the parent element we've updated stuff.
    onChange({
      locations: locationsRef.current,
      keywords: keywordsRef.current,
      organismTypes: organismTypesRef.current,
      diagnosticTypes: diagnosticTypesRef.current
    });
  }

  const onLocationChange = (newLocationList) => {
    locationsRef.current = newLocationList;

    console.log(`location Changed`, locationsRef.current);

    onUpdate();
  }

  const onKeywordChange = (newKeywordList) => {
    keywordsRef.current = newKeywordList;

    console.log(`keywords Changed`, keywordsRef.current);

    onUpdate();
  }

  const onOrganismTypeChange = (newOrganismTypes) => {
    organismTypesRef.current = newOrganismTypes;

    console.log(`organismType Changed`, organismTypesRef.current);

    onUpdate();
  }

  const onDiagnosticTypesChange = (newDiagnosticTypes) => {
    diagnosticTypesRef.current = newDiagnosticTypes;

    console.log(`diagnosticTypes Changed`, diagnosticTypesRef.current);

    onUpdate();
  }

  return <div class={style.searchpillar}>
    {drill == 'root' ? ( <ContentPillar>
      <Logo/>
      <Br1/>
      <h2>Location</h2><Br2/>
      <LocationBuilder current={locationsRef.current} onChange={onLocationChange}/>
      <Br1/>
      <h2>Keywords</h2><Br2/>
      <KeywordBuilder current={keywordsRef.current} onChange={onKeywordChange}/>
      <Br1/>
      <h2>Organism Type</h2>
      <h3>Include all possibilities</h3>
      <Br2/>
      <RadioGroup type='grid' o={organismTypes} current={organismTypesRef.current} onChange={onOrganismTypeChange}/>
      <Br1/>
      <h2>Diagnostic Effects</h2><Br2/>
      <button onclick={toDiagnostic} class={style.more}>None Observed</button>
    </ContentPillar>):undefined}
    {drill == 'diagnostic' && <DiagnosticPillar current={diagnosticTypesRef.current} onChange={onDiagnosticTypesChange} toBack={toBack}/>}
    {drill == 'labs' && <LabsPillar toBack={toBack}/>}
  </div>
};

export default SearchPillar;