import { h,  } from 'preact';
import style from './shared.css';
import { useState } from 'preact/hooks';

const Radio = ({t,b,i,current,onChange}) => {
  const [on,setOn] = useState(current);

  function tog(){
    const newState = !on;

    setOn(newState);

    onChange(newState);
  }

  return <div active={on} class={style.radio} onclick={tog}>
    { i ? <img src={i}/> : undefined }
    <p>{t}</p>
    { b ? <h3>{b}</h3> : undefined }
  </div>
};

// what the fuck is an o? t? b?
const RadioGroup = ({type='stacked', o, current, onChange}) => {
  const onSubOptionChange = (optionTag) => (newState) => {
    current = {...current, [optionTag]: newState}; 
    
    onChange(current);
  }

  return <div class={style.radiogroup + ' ' + style[type]}>
    {o.map((option)=> <Radio t={option.t} b={option.b} i={option.i} current={current[option.t]} onChange={onSubOptionChange(option.t)} /> )}
  </div>
};

export { Radio, RadioGroup };