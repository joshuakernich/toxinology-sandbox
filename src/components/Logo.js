import { h } from 'preact';
import style from './shared.css';

const Logo = () => (
  <div class={style.logo}>
    <b>Toxin</b>ology.com
    <span class={style.beta}> BETA</span>
  </div>
);

export default Logo;

