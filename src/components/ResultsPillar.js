import { h } from 'preact';
import style from './shared.css';
import ContentPillar from './ContentPillar';
import OrganismPillar from './OrganismPillar';
import Pill from './Pill';
import Result from './Result';
import { Br1, Br2 } from './Br';
import { useState } from 'preact/hooks';

const ResultsPillar = ({toBack}) => {

  const [organism,setOrganism] = useState(undefined);

  const unResult = () =>{
    setOrganism(undefined);
  }

  const doResult = () =>{
    setOrganism('blah');
  }

  return <div class={style.resultspillar}>
    { !organism ? <ContentPillar>
      <h1>800 Results</h1>
      <Br1/>
      <Pill>Oh shit</Pill>
      <Pill>Another pill</Pill>
      <Pill>Third pill's a charm</Pill>
      <Br1/>
      
      <Result onClick={doResult}/>
      
    </ContentPillar>
    : <OrganismPillar onBack={unResult} /> }
  </div>
};

export default ResultsPillar;

