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

const ALT = {
  "SN":'../assets/icons/icon-alt-grass.png',
  "SC":'../assets/icons/icon-alt-desert.png',
  "SP":'../assets/icons/icon-alt-grass.png',
  "PM":'../assets/icons/icon-alt-forest.png',
  "PP":'../assets/icons/icon-alt-forest.png',
  "TV":'../assets/icons/icon-alt-mountains.png',
  "TI":'../assets/icons/icon-alt-mountains.png',
  "MV":'../assets/icons/icon-alt-water.png',
  "MI":'../assets/icons/icon-alt-water.png',
}

const bucket = 
{
  'SN':'http://www.toxinology.com/images/snakes/',
  'SC':'http://www.toxinology.com/images/scorpions/',
  'SP':'http://www.toxinology.com/images/spiders/',
  'PM':'http://www.toxinology.com/images/other_life/',
  'PP':'http://www.toxinology.com/images/other_life/',
  'TV':'http://www.toxinology.com/images/other_life/',
  'TI':'http://www.toxinology.com/images/other_life/',
  'MV':'http://www.toxinology.com/images/marine_life/',
  'MI':'http://www.toxinology.com/images/marine_life/',
}

const Result = ({current={image:'blah',genus:'Thingo',species:'McThingo',common_names:'Thingamajig McThing'},onClick}) => {

  const binomial = current.genus + ' ' +current.species + ' ' + (current.subspecies?current.subspecies:'');
  const name = current.common_names.indexOf(',')?current.common_names.split(',')[0]:current.common_names;
  const img = current.image?bucket[current.orgclass]+current.image:undefined
  const icon = ICONS[current.orgclass];

  return <resultContainer onClick={onClick}>
    <resultImage>
      { img?
        <Image size={'cover'} width={'100%'} height={'100%'} src={img}/>
        :
        <>
        <Image size={'800px'} width={'100%'} height={'100%'} src={ALT[current.orgclass]}/> 
        <img src={icon} style='margin:auto;width:40px;height:40px;background-size:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px;'/>
        </>
      }
    </resultImage>
    <resultBody>
      <h2>{name.length?name:<i>{binomial}</i>}</h2>
      <h3><i>{binomial}</i></h3>
    </resultBody>
  </resultContainer>
};

export default Result;