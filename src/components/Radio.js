import { h,  } from 'preact';
import style from './shared.css';
import { useState } from 'preact/hooks';

const Radio = ({t,b}) => {

  const [on,setOn] = useState(false);

  function tog(){
    setOn(!on);
  }

  return <div active={on} class={style.radio} onclick={tog}>
    <p>{t}</p>
    { b ? <h3>{b}</h3> : undefined }
  </div>
};

const RadioGroup = ({o}) => (
  <div class={style.radiogroup}>
    {o.map((option)=> <Radio t={option.t} b={option.b}/> )}
  </div>
);

export { Radio, RadioGroup };