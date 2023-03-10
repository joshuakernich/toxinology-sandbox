import { h } from 'preact';
import style from './shared.css';
import ContentPillar from './ContentPillar';
import OrganismPillar from './OrganismPillar';
import LoadModal from './LoadModal';
import Pill from './Pill';
import Result from './Result';
import { Br1, Br2 } from './Br';
import { useLayoutEffect, useState, useRef } from 'preact/hooks';

const ResultsPillar = ({setSearchHidden, isSearching, searchCriteria, results, resultPills, toBack}) => {

  const sample = undefined;

  const [organism, setOrganism] = useState(sample);
  const [displayMode, setDisplayMode] = useState('grid');
  
  console.log('results',results);

  // A list of strings
  const pills = useRef([]); 
  // PF: this doesn't need to be a state, we will update the 
  // pills whenever results are changed. It does need to be a 
  // ref to maintain it between renders. 

  // This is the current state of the pills. We need this to invoke 
  // a re-render. We could combine this with the pills.
  const [pillFilter, setPillFilter] = useState([]);
  // PF: I choose not to because managing display data and state 
  // data is problematic

  useLayoutEffect(() => {
    // PF TODO: have to have discussion with JK. To decide how we 
    // display both of these lists, it's a complex problem.
    const getKeywordsFromResults = () => {
      if (!results) return [];

      // this may be a different state from the results declared in a
      // higher level context
      const joinedResults = [...results.exclusive, ...results.unexclusive];
      
      // PF TODO: find out what pills to show?
    };

    // the only time this should update is when we're updating results
    const newPills = getKeywordsFromResults();
    
    const isDifferent = !!pills.current.find((pill, index) => pill != newPills[index]);

    // check if the current and the new are different
    if (isDifferent) {
      pills.current = newPills;

      // set the pill filter to empty, whenever the results change?
      setPillFilter([]);
    }
  }, [results]);

  const joinedResults = results && [...results.exclusive];

  const showResultList = () =>{
    setOrganism(undefined);
  }

  const showResult = (result) =>{
    setOrganism(result);
  }

  const NAMES = {
    "sn":'snakes',
    "sc":'scorpions',
    "sp":'spiders',
    "pm":'poisonous mushrooms',
    "pp":'poisonous plants',
    "tv":'land verterbrates',
    "ti":'land inverterbrates',
    "mv":'marine verterbrates',
    "mi":'marine inverterbrates',
  }

  const getSearchCriteria = () =>{

    if(!searchCriteria.keywords) return undefined;

    var orgs = [];
    searchCriteria.organismTypes.map( type => orgs.push( NAMES[type] ));

    return<h3>
          for{' '}
          {searchCriteria.organismTypes.length?orgs.join(', '):'all organisms'}{' '}
          {searchCriteria.locations.length?'in '+searchCriteria.locations.join(', '):'Worldwide'}
          {searchCriteria.keywords.text.length?' matching "'+searchCriteria.keywords.text+'"':undefined}
        </h3>
  }

  console.log('searchCriteria',searchCriteria);

  if(!organism && isSearching){
    return <resultsPillar class={style.ghostResults}>
      <ContentPillar>
        <h1><span>Updating Results...</span></h1>
        {getSearchCriteria()}
        <Br1/>
        <resultList mode={displayMode}>
          <Result/>
          <Result/>
          <Result/>
          <Result/>
          <Result/>
          <Result/>
          <Result/>
          <Result/>
          <Result/>
        </resultList>
      </ContentPillar>
    </resultsPillar>
  }

  

  return <resultsPillar>
      <scrollPillar hidden={organism?true:false}>
        <ContentPillar>
        <resultsTogglePanel>
          <button onclick={()=> setSearchHidden(false)} class={style.back}>Refine Search</button>
        </resultsTogglePanel>
        <div style={{'position':'relative'}}>
          {results && <h1>{results.exclusiveCount} Results</h1>}

          

          {getSearchCriteria()}

          <displayModeOptions>
            <button onclick={()=> setDisplayMode('grid')}><img width={15} src='../assets/icons/icon-grid.svg'/></button>
            <button onclick={()=> setDisplayMode('list')}><img width={15} src='../assets/icons/icon-list.svg'/></button>
          </displayModeOptions>
        </div>
        
        <Br1/>

        {/* resultPills?.map(value => <Pill>{ value }</Pill>) */}
        
        
        <resultList mode={displayMode}>

        { results?.exclusive?.map(result => <Result current={result} onClick={() => showResult(result)}></Result>) }
        </resultList>
        { isSearching?<LoadModal />:undefined }
      </ContentPillar>
    </scrollPillar>
    {organism?<OrganismPillar current={organism} onBack={showResultList} />:undefined}
  </resultsPillar>
};

export default ResultsPillar;

