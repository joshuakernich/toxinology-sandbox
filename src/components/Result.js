import { h } from 'preact';
import style from './shared.css';

const Result = ({current,onClick}) => {

  if(!current) current = {common_names:'Result Name'}

  const name = current.common_names.split(',')[0];
  const binomial = current.genus + ' ' +current.species;

  return <div onClick={onClick} class={style.result}>
    <img width='200' height='100'/>
    <h2>{name}</h2>
    <h3>{binomial}</h3>
  </div>
};

export default Result;