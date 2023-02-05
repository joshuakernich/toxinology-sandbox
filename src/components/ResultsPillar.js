import { h } from 'preact';
import style from './shared.css';
import ContentPillar from './ContentPillar';
import OrganismPillar from './OrganismPillar';
import Pill from './Pill';
import Result from './Result';
import { Br1, Br2 } from './Br';
import { useLayoutEffect, useState, useRef } from 'preact/hooks';

const ResultsPillar = ({results, resultPills, toBack}) => {
  const [organism, setOrganism] = useState(undefined);
  
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

  const joinedResults = results && [...results.exclusive, ...results.unexclusive];

  const showResultList = () =>{
    setOrganism(undefined);
  }

  const showResult = (result) =>{
    setOrganism('blah');
  }

  console.log(`Populating results`, joinedResults);

  return <resultsPillar>
    { !organism ? <ContentPillar>
      {joinedResults && <h1>{joinedResults.length} Results</h1>}
      <Br1/>

      { resultPills?.map(value => <Pill>{ value }</Pill>) }
      <Br1/>
      
      { joinedResults?.map(result => <Result current={result} onClick={() => showResult(result)}></Result>) }
      
    </ContentPillar>
    : <OrganismPillar onBack={showResultList} /> }
  </resultsPillar>
};

export default ResultsPillar;

