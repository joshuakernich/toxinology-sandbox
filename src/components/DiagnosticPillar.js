import { h } from 'preact';
import style from './shared.css';
import Logo from './Logo';
import ContentPillar from './ContentPillar';
import { Br1, Br2 } from './Br';
import { RadioGroup } from './Radio';

const DiagnosticPillar = ({ toBack, current, onChange}) => {

  const list = [
    {t:'Significant Local Effects'},
    {o:[
      {t:'Mytoxicity',b:'CK > 1500 IU/I'},
      {t:'Mild Mytoxicity',b:'500-1500 IU/I after 12 hours'},
      ]},
    {t:'Flaccid Paralysis',b:'including any ptsosis'},
    {t:'Neurotoxic Excitatory Effects',b:'e.g. catechlomaine storm'},
    {t:'Renal Damage/Failure'},
    {t:'Local Neurotoxin Injury'},
    
    {
      o:[
      {t:'Cardiotoxicity'},
      {t:'Hyperkalaemic Cardiotoxicity',b:'Secondary to myolysis'},
      ]
    }
  ]

  // propagating changes two levels down isn't working, going to have to keep track of changes on this level.
  const onSubOptionChange = (newState) => {
    current = {...current, ...newState}; 
    
    onChange(current);
  }

  return <ContentPillar>
    <button onclick={toBack} class={style.back}>Back to Search</button>
    <Br1/>
    <h1>Diagnostic Effects</h1>
    <h3>Select all that apply</h3>
    <Br2/>
    {list.map((o)=> 
      <>
      <RadioGroup o={o.o?o.o:[o]} current={current} onChange={onSubOptionChange} />
      <Br2/>
      </>
    )}
    
  </ContentPillar>
};

export default DiagnosticPillar;