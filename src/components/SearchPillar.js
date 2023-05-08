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
import { useState, useRef, useContext } from 'preact/hooks';
import SearchResults from './SearchResultsContext';

const { countries, zones } = require("moment-timezone/data/meta/latest.json");
const timeZoneToCountry = {};

Object.keys(zones).forEach(z => {
  timeZoneToCountry[z] = countries[zones[z].countries[0]].name;
});

const ORGANISM_TYPES = [
  { key: "sn", t: 'Snake', i: '../assets/icons/icon-snake.svg' },
  { key: "sp", t: 'Spider', i: '../assets/icons/icon-spider.svg' },
  { key: "sc", t: 'Scorpion', i: '../assets/icons/icon-scorpion.svg' },
  { key: "mv", t: 'Marine Verterbrate', i: '../assets/icons/icon-fish.svg' },
  { key: "mi", t: 'Marine Inverterbrate', i: '../assets/icons/icon-octopus.svg' },
  { key: "tv", t: 'Land Verterbrate', i: '../assets/icons/icon-lizard.svg' },
  { key: "ti", t: 'Land Inverterbrate', i: '../assets/icons/icon-bee.svg' },
  { key: "pm", t: 'Poisonous Mushroom', i: '../assets/icons/icon-mushroom.svg' },
  { key: "pp", t: 'Poisonous Plant', i: '../assets/icons/icon-flower.svg' },
];

const SearchPillar = ({ isSearchHidden, setSearchHidden, diagnostics, onChange, onDiagnosticChange, isSearching }) => {
  const searchResults = useContext(SearchResults);
  // PF: we need to keep track of the list/keyword/organisms between renders.
  // using refs here because the child elements seem to be handling their own stuff.
  // that's cool and all <3.

  console.log(countries);

  const whereAmI = timeZoneToCountry[Intl.DateTimeFormat().resolvedOptions().timeZone];


  const locationsRef = useRef([whereAmI]);
  const keywordsRef = useRef({text: "", matchingTerms: []});
  const organismTypesRef = useRef({});

  // PF TODO: implement search criteria
  const diagnosticTypesRef = useRef([]);

  const [drill, setDrill] = useState('root');

  const toBack = () => {
    setDrill('root');
  }

  const toDiagnostic = () => {
    setDrill('diagnostic');
  }

  const toLabs = () => {
    setDrill('labs');
  }

  // ping the server to get results back as we type stuff in.
  const onUpdate = () => {
    console.trace('onupdate invoked')
    // we've updated stuff, so lets tell the parent element we've updated stuff.
    const convertOrganismTypesToEnum = (organismTypes) => {
      return Object.keys(organismTypes)
        .filter(organismKey => organismTypes[organismKey])
        .map(title => 
          ORGANISM_TYPES.find(organismType => organismType.t == title)?.key);
    };

    const organismTypes = convertOrganismTypesToEnum(organismTypesRef.current);

    onChange({
      locations: locationsRef.current,
      keywords: keywordsRef.current,
      organismTypes: organismTypes
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

    onDiagnosticChange(diagnosticTypesRef.current);
  }

  const resultCount = searchResults && (searchResults.exclusiveCount + searchResults.unexclusiveCount);

  const diagnosticCount = diagnostics.filter(diagnosticQuestion => !["U", "."].includes(diagnosticQuestion.response)).length;

  return <searchPillar hidden={isSearchHidden}>
    <scrollPillar>
      {drill == 'root' ? ( <ContentPillar>
        <Logo/>
        <Br1/>
        <h2>Location</h2><Br2/>
        <LocationBuilder current={locationsRef.current} onChange={onLocationChange}/>
        <Br1/> 
        <h2>Keywords</h2>
        <h3>Name, region, taxonomy, or other details</h3>
        <Br2/>
        <KeywordBuilder current={keywordsRef.current} onChange={onKeywordChange}/>
        <Br1/>
        
        {/*<h2>Organism Type</h2>
        <h3>Include all possibilities</h3>
        <Br2/>
        <RadioGroup type='grid' o={ORGANISM_TYPES} current={organismTypesRef.current} onChange={onOrganismTypeChange}/>
        <Br1/>*/}
        <h2>Diagnostic Questionnaire</h2>
        <h3>For unknown organisms with observed effects</h3>
        <Br2/>
        <button onclick={toDiagnostic} class={style.more}>{diagnosticCount?diagnosticCount + ' effect'+(diagnosticCount>1?'s':'')+' observed':'No Effects Observed'}</button>
      </ContentPillar>):undefined}
      <DiagnosticPillar active={drill=='diagnostic'} locationsRef={locationsRef} onLocationChange={onLocationChange} current={diagnosticTypesRef.current} onChange={onDiagnosticTypesChange} toBack={toBack}/>
    </scrollPillar>
    <searchTogglePanel>
      <button onclick={()=> setSearchHidden(true)} class={style.more}>Show {resultCount && !isSearching?resultCount:'Search'} Results {isSearching?<littleLoadWheel/>:undefined}</button>
    </searchTogglePanel>
  </searchPillar>
};

export default SearchPillar;