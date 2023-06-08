import { h } from 'preact';
import style from './shared.css';
import ContentPillar from './ContentPillar';
import OrganismPillar from './OrganismPillar';
import LoadModal from './LoadModal';
import Pill from './Pill';
import Result from './Result';
import { Br1, Br2 } from './Br';
import { useLayoutEffect, useEffect, useState, useRef } from 'preact/hooks';
import { getNames } from './Result'
import { getRiskIndex } from './OrganismPillar'


export const getSearchCriteria = (searchCriteria,diagnostics) =>{

  if(!searchCriteria.keywords) return undefined;

  var orgs = [];
  searchCriteria.organismTypes.map( type => orgs.push( ORG_NAME[ORG_KEY.indexOf(type)] ));
  const countDiagnostic = diagnostics.filter(diagnosticQuestion => !["U", "."].includes(diagnosticQuestion.response)).length;

  return<h3>
    for{' '}
    {searchCriteria.organismTypes.length?orgs.join(', '):'all organisms'}{' '}
    {searchCriteria.locations.length?'in '+searchCriteria.locations.join(', '):'Worldwide'}
    {searchCriteria.keywords.text.length?' matching "'+searchCriteria.keywords.text+'"':undefined}
    {countDiagnostic?' with '+countDiagnostic+' specified diagnostic effects':undefined}
  </h3>
}

const ResultsPillar = ({onChange, initialProps, setSearchHidden, isSearching, searchCriteria, diagnostics, results, resultPills, toBack}) => {

  const intialSortMode = initialProps.sortMode || 'relevant';
  const initialFilters = initialProps.filters || [];

  const initialOrganism = initialProps.organism && { oid: initialProps.organism };

  const [organism, setOrganism] = useState(initialOrganism);
  const [displayMode, setDisplayMode] = useState('grid');
  const [sortMode, setSortMode] = useState(intialSortMode);

  const [resultsFiltered, setResultsFiltered] = useState([]);
  const [orgTypeCounts, setOrgTypeCounts] = useState([]);
  const [orgTypeFilters, setOrgTypeFilters] = useState(initialFilters);

  const ORG_KEY = ["SN","SC","SP","PM","PP","TV","TI","MV","MI"]
  const ORG_MAP = [0,1,2,3,3,4,4,5,5]
  const ORG_CONSOLIDATED = ["SN","SC","SP","PM","TI","MI"]
  const ORG_NAME = ['snakes','scorpions','spiders','plants & mushrooms','other land','other aquatic']

  useEffect(() => {
    const organismIsObject = typeof organism === 'object';
    
    onChange({
      initialFilters: orgTypeFilters,
      initialSortMode: sortMode,
      organism: organismIsObject ? organism.oid : organism,
    });
  }, [organism, sortMode, orgTypeFilters]);

  useLayoutEffect(() => {
    if(!results) return;

    ORG_KEY.map((o,i) => orgTypeCounts[i]=0 );
    results.exclusive.map( result => {
      result.di = getRiskIndex(result.dangerousness_index);
      result.names = getNames(result);
      orgTypeCounts[ORG_MAP[ORG_KEY.indexOf(result.orgclass)]]++ 
    });
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
        if( orgTypeFilters[ORG_MAP[ORG_KEY.indexOf(r.orgclass)]]) filtered.push(r);
      });
      setResultsFiltered(filtered);
    } else {
      setResultsFiltered(results.exclusive);
    }
  }

  const toggleOrgFilter = (key)=>{

    orgTypeFilters[ORG_CONSOLIDATED.indexOf(key)] = !orgTypeFilters[ORG_CONSOLIDATED.indexOf(key)];
    setOrgTypeFilters(orgTypeFilters);
    refilter();
  }

  const clearOrgFilters = ()=>{
    orgTypeFilters.length = 0;
    setOrgTypeFilters(orgTypeFilters);
    refilter();
  }

  if(!organism && isSearching){
    return <resultsPillar class={style.ghostResults}>
      <ContentPillar>
        <h1><span>Updating Results...</span></h1>
        {getSearchCriteria(searchCriteria,diagnostics)}
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

  const sortOnHighlights = (a,b)=>{
    if(a.datalength>b.datalength) return -1;
    if(b.datalength>a.datalength) return 1;
    return 0;
  }

  const sortOnName = (a,b)=>{
    const an = a.names.sortable.toUpperCase();
    const bn = b.names.sortable.toUpperCase();
    if(an>bn) return 1;
    if(bn>an) return -1;
    return 0;
  }

  const sortOnTaxonomy = (a,b)=>{
    const an = a.names.binomial.toUpperCase();
    const bn = b.names.binomial.toUpperCase();
    if(an>bn) return 1;
    if(bn>an) return -1;
    return 0;
  }

  const sortOnRisk = (a,b) =>{
    if(a.di>b.di) return -1;
    if(b.di>a.di) return 1;
    return sortOnName(a,b);
  }

  if(sortMode == 'relevant') resultsFiltered.sort( sortOnHighlights );
  if(sortMode == 'name') resultsFiltered.sort( sortOnName );
  if(sortMode == 'risk') resultsFiltered.sort( sortOnRisk );
  if(sortMode == 'taxonomy') resultsFiltered.sort( sortOnTaxonomy );

  return <resultsPillar>
      <scrollPillar hidden={organism?true:false}>
        <ContentPillar>
        <resultsTogglePanel>
          <button onclick={()=> setSearchHidden(false)} class={style.back}>Refine Search</button>
        </resultsTogglePanel>
        <div style={{'position':'relative'}}>
          <resultsHeader>
            <resultsHeaderDetails>
              {results && <h1>{results.exclusiveCount} Results</h1>}
              {getSearchCriteria(searchCriteria,diagnostics)}
            </resultsHeaderDetails>
            <displayViewOptions>
              
              <displayModeOptions>
                <button selected={displayMode=='grid'} onclick={()=> setDisplayMode('grid')}><img width={15} src='../assets/icons/icon-grid.svg'/></button>
                <button selected={displayMode=='list'} onclick={()=> setDisplayMode('list')}><img width={15} src='../assets/icons/icon-list.svg'/></button>
              </displayModeOptions>
            </displayViewOptions>
          </resultsHeader>
          <Br2/>
          <filterList>
            { ORG_CONSOLIDATED.map( (o,i) => 
              (orgTypeFilters[i] || orgTypeCounts[i])?<Pill 
              selected={orgTypeFilters[i]} 
              category={ORG_CONSOLIDATED[i]}
              onClick={()=> toggleOrgFilter(o)}>

              {orgTypeCounts[i]} {ORG_NAME[i]}
              </Pill>:undefined
               ) }
            {orgTypeFilters.indexOf(true) > -1?<Pill type='clear' onClick={clearOrgFilters}>Clear Filters</Pill>:undefined }
          </filterList>

          
        </div>
        <Br2/>
        <sortSelect>
          {'Sort by '}
          <select onChange={(e)=> {
              setSortMode(e.target.value);
              onChange({
                initialFilters: orgTypeFilters,
                initialSortMode: sortMode,
                organism: organism
              });
            }} value={sortMode}>
            <option value='relevant'>Relevant</option>
            <option value='risk'>Risk</option>
            <option value='name'>Name</option>
            <option value='taxonomy'>Taxonomy</option>
          </select>
        </sortSelect>
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

