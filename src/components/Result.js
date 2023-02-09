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

const bucket = 
{
  'SN':'http://www.toxinology.com/images/snakes/',
  'SC':'http://www.toxinology.com/images/scorpions/',
  'SP':'http://www.toxinology.com/images/spiders/',
  'PM':'http://www.toxinology.com/images/poisonous_mushrooms/',
  'PM':'http://www.toxinology.com/images/poisonous_plants/',
  'TV':'http://www.toxinology.com/images/other_life/',
  'TI':'http://www.toxinology.com/images/other_life/',
  'MV':'http://www.toxinology.com/images/marine_life/',
  'MI':'http://www.toxinology.com/images/marine_life/',
}

const Result = ({current={genus:'Thingo',species:'McThingo',common_names:'Thingamajig McThing'},onClick}) => {

  const binomial = current.genus + ' ' +current.species;
  const name = current.common_names.indexOf(',')?current.common_names.split(',')[0]:current.common_names;
  const img = current.image?bucket[current.orgclass]+current.image:undefined
  const icon = ICONS[current.orgclass];

  return <resultContainer onClick={onClick}>
    { img?<Image size={'cover'} width={'100%'} height={100} src={img}/>:<Image size={40} width={'100%'} height={100} src={icon}/> }
    <resultBody>
      <h2>{name.length?name:binomial}</h2>
      <h3>{binomial}</h3>
    </resultBody>
  </resultContainer>
};

export default Result;