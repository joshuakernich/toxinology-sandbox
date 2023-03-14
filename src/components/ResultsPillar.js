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

  const [resultsFiltered, setResultsFiltered] = useState([]);
  const [orgTypeCounts, setOrgTypeCounts] = useState([]);
  const [orgTypeFilters, setOrgTypeFilters] = useState([]);

  const ORG_KEY = ["SN","SC","SP","PM","PP","TV","TI","MV","MI"]
  const ORG_NAME = ['snakes','scorpions','spiders','mushrooms','plants','land verterbrates','land inverterbrates','marine verterbrates','marine inverterbrates']

  useLayoutEffect(() => {
    if(!results) return;

    ORG_KEY.map((o,i) => orgTypeCounts[i]=0 );
    results.exclusive.map( result => orgTypeCounts[ORG_KEY.indexOf(result.orgclass)]++ );
    setOrgTypeCounts(orgTypeCounts.concat());
    refilter();
    
  }, [results]);

  const joinedResults = results && [...results.exclusive];

  const showResultList = () =>{
    setOrganism(undefined);
  }

  const showResult = (result) =>{
    setOrganism(result);
  }

  const refilter = () =>{

    if( orgTypeFilters.indexOf(true) > -1 ){
      const filtered = [];
      results.exclusive.map(r => {
        if( orgTypeFilters[ORG_KEY.indexOf(r.orgclass)]) filtered.push(r);
      });
      setResultsFiltered(filtered);
    } else {
      setResultsFiltered(results.exclusive);
    }
  }

  const toggleOrgFilter = (key)=>{
    orgTypeFilters[ORG_KEY.indexOf(key)] = !orgTypeFilters[ORG_KEY.indexOf(key)];
    setOrgTypeFilters(orgTypeFilters.concat());
    refilter();
  }

  const clearOrgFilters = ()=>{
    setOrgTypeFilters([]);
    refilter();
  }
  
  const getSearchCriteria = () =>{

    if(!searchCriteria.keywords) return undefined;

    var orgs = [];
    searchCriteria.organismTypes.map( type => orgs.push( ORG_NAME[ORG_KEY.indexOf(type)] ));

    return<h3>
      for{' '}
      {searchCriteria.organismTypes.length?orgs.join(', '):'all organisms'}{' '}
      {searchCriteria.locations.length?'in '+searchCriteria.locations.join(', '):'Worldwide'}
      {searchCriteria.keywords.text.length?' matching "'+searchCriteria.keywords.text+'"':undefined}
    </h3>
  }

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
          <Br2/>
          <filterList>
            { ORG_KEY.map( (o,i) => 
              orgTypeCounts[i]?<Pill 
              selected={orgTypeFilters[i]} 
              onClick={()=> toggleOrgFilter(o)}>
              {orgTypeCounts[i]} {ORG_NAME[i]}
              </Pill>:undefined
               ) }
            { orgTypeFilters.indexOf(true) > -1 ?<Pill type='clear' onClick={clearOrgFilters}>Clear Filters</Pill>:undefined }
          </filterList>

          <displayModeOptions>
            <button selected={displayMode=='grid'} onclick={()=> setDisplayMode('grid')}><img width={15} src='../assets/icons/icon-grid.svg'/></button>
            <button selected={displayMode=='list'} onclick={()=> setDisplayMode('list')}><img width={15} src='../assets/icons/icon-list.svg'/></button>
          </displayModeOptions>
        </div>
        <Br2/>
        <resultList mode={displayMode}>
        { resultsFiltered?.map(result => <Result current={result} onClick={() => showResult(result)}></Result>) }
        </resultList>
        { isSearching?<LoadModal />:undefined }
      </ContentPillar>
    </scrollPillar>
    {organism?<OrganismPillar current={organism} onBack={showResultList} />:undefined}
  </resultsPillar>
};

export default ResultsPillar;

