import { h } from 'preact';
import style from './shared.css';

const Image = ({ size='', src='',width='100%',height=200}) => {
  
  const s = {
    width,
    height,
    'background-image':'url('+src+')',
    'background-size':size,
  }

  return <div class={style.img} style={s}></div>
};

export default Image;