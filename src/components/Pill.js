import { h } from 'preact';
import style from './shared.css';

const Pill = ({risk,type='primary', ...props}) => (
  <div selected={props.selected} onClick={props.onClick} risk={risk} class={style.pill + ' ' + style[type]}>
    {props.children}
  </div>
);

export default Pill;

