import { h } from 'preact';
import style from './shared.css';

const Pill = ({type='primary', ...props}) => (
  <div class={style.pill + ' ' + style[type]}>
    {props.children}
  </div>
);

export default Pill;

