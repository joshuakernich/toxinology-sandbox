import { h } from 'preact';
import style from './shared.css';
import Image from './Image';
import { Br2 } from './Br';

const ICONS = {
  "SN":'../assets/icons/icon-snake.svg',
  "SC":'../assets/icons/icon-scorpion.svg',
  "SP":'../assets/icons/icon-spider.svg',
  "PM":'../assets/icons/icon-mushroom.svg',
  "PP":'../assets/icons/icon-flower.svg',
  "TV":'../assets/icons/icon-lizard.svg',
  "TI":'../assets/icons/icon-bee.svg',
  "MV":'../assets/icons/icon-fish.svg',
  "MI":'../assets/icons/icon-octopus.svg',

}

const Result = ({current,onClick}) => {

  const binomial = current.genus + ' ' +current.species;
  const name = current.common_names.indexOf(',')?current.common_names.split(',')[0]:current.common_names;
  const img = ICONS[current.orgclass];

  return <div onClick={onClick} class={style.result}>
    <Image size={40} width={'100%'} height={100} src={img}/>
    <Br2/>
    <h2>{name}</h2>
    <h3>{binomial}</h3>
  </div>
};

export default Result;