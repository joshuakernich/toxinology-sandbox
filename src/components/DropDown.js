import { h } from 'preact';
import style from './shared.css';
import { useState, useRef } from 'preact/hooks';

const DropDown = ({t,o}) => {


  const empty = 'Normal or NA';
  const [value, setValue] = useState(empty);

  const onSelect = (e) =>{
    setValue(e.target.value);
  }

  return <div style={{position:'relative'}}>
    <div class={style.dropdown} active={value!=empty}>
      <p>{t}</p>
      {value != empty?<p>{value}</p>:<h3>{empty}</h3>}
    </div>
    <select onchange={onSelect} style={{ opacity:0, position:'absolute', top:0, left:0, right:0, bottom:0 }}>
      <option>{empty}</option>
      {o.map((option)=> <option>{option.t}</option> )}
    </select>
  </div>
};

export default DropDown;