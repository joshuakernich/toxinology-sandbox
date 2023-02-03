import { h } from 'preact';
import style from './shared.css';
import ContentPillar from './ContentPillar';
import OrganismPillar from './OrganismPillar';
import Pill from './Pill';
import Result from './Result';
import { Br1, Br2 } from './Br';
import { useState } from 'preact/hooks';

const ResultsPillar = ({results, resultPills, toBack}) => {
  const [organism, setOrganism] = useState(undefined);

  const exclusiveResults = results.exclusive;
  const unexclusiveResults = results.unexclusive;

  const unResult = () =>{
    setOrganism(undefined);
  }

  const showResult = (result) =>{
    setOrganism('blah');
  }

  console.log(`Populating exclusive results`, exclusiveResults);
  console.log(`Populating unexclusiveResults results`, unexclusiveResults);

  return <div class={style.resultspillar}>
    { !organism ? <ContentPillar>
      {exclusiveResults && <h1>{exclusiveResults.length} Results</h1>}
      <Br1/>

      { resultPills?.map(value => <Pill>{ value }</Pill>) }
      <Br1/>
      
      { exclusiveResults?.map(result => <Result current={result} onClick={() => showResult(result)}></Result>) }
      
    </ContentPillar>
    : <OrganismPillar onBack={unResult} /> }
  </div>
};

export default ResultsPillar;

