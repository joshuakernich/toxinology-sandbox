import { h } from 'preact';
import style from './shared.css';

const Result = ({onClick}) => (
  <div onClick={onClick} class={style.result}>
    <img width='200' height='100'/>
    <h2>Languishing Snake</h2>
    <h3>Languishio Snakilius</h3>
  </div>
);

export default Result;

