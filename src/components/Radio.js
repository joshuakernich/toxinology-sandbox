import { h,  } from 'preact';
import style from './shared.css';
import { useState } from 'preact/hooks';

const Radio = ({t,b,i}) => {

  const [on,setOn] = useState(false);

  function tog(){
    setOn(!on);
  }

  return <div active={on} class={style.radio} onclick={tog}>
    { i ? <img src={i}/> : undefined }
    <p>{t}</p>
    { b ? <h3>{b}</h3> : undefined }
  </div>
};

const RadioGroup = ({type='stacked',o}) => (
  <div class={style.radiogroup + ' ' + style[type]}>
    {o.map((option)=> <Radio t={option.t} b={option.b} i={option.i}/> )}
  </div>
);

export { Radio, RadioGroup };