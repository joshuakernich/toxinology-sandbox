import { h } from 'preact';
import style from './shared.css';
import Logo from './Logo';
import ContentPillar from './ContentPillar';
import { Br1, Br2 } from './Br';
import { RadioGroup } from './Radio';
import DiagnosticQuestionnaire from './DiagnosticQuestionnaire'

const DiagnosticPillar = ({ active, current, toBack, onChange, locationsRef, onLocationChange }) => {

  return <diagnosticPillar active={active}>
    <ContentPillar>
      <button onclick={toBack} class={style.back}>Back to Search</button>
      <Br1/>
      <DiagnosticQuestionnaire locationsRef={locationsRef} onLocationChange={onLocationChange} current={current} onChange={onChange}/>
    </ContentPillar>
  </diagnosticPillar>
};

export default DiagnosticPillar;