import { h } from 'preact';
import style from './shared.css';

const Result = ({result,onClick}) => {

  if(!result) result = {common_names:'Result Name'}

  const name = result.common_names.split(',')[0];
  const binomial = result.genus + ' ' +result.species;

  return <div onClick={()=> onClick(result)} class={style.result}>
    <img width='200' height='100'/>
    <h2>{name}</h2>
    <h3>{binomial}</h3>
  </div>
};

export default Result;

