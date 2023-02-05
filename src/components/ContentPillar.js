import { h } from 'preact';
import style from './shared.css';

const ContentPillar = (props) => (
  <div class={style.contentpillar}>
    {props.children}
  </div>
);

export default ContentPillar;

