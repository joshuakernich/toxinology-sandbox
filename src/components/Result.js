import { h } from 'preact';
import style from './shared.css';
import Image from './Image';
import { Br2 } from './Br';
import { getRiskCategory } from './OrganismPillar'

const ICONS = {
  "SN":'../assets/icons/light/icon-snake.svg',
  "SC":'../assets/icons/light/icon-scorpion.svg',
  "SP":'../assets/icons/light/icon-spider.svg',
  "PM":'../assets/icons/light/icon-mushroom.svg',
  "PP":'../assets/icons/light/icon-flower.svg',
  "TV":'../assets/icons/light/icon-lizard.svg',
  "TI":'../assets/icons/light/icon-bee.svg',
  "MV":'../assets/icons/light/icon-fish.svg',
  "MI":'../assets/icons/light/icon-octopus.svg',
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

export const getNames = (current) =>{
  const binomial = current.genus + ' ' +current.species + ' ' + (current.subspecies?current.subspecies:'');
  const common = current.common_names.indexOf(',')?current.common_names.split(',')[0]:current.common_names;
  const title = common?common:binomial;
  
  // sortable name strips out any subspecies prefix
  const sortable = (title.indexOf('(') == 0)?title.substr(title.indexOf(') ')+2):title;
  
  return {common:common,binomial:binomial,title:title,sortable:sortable};
}

const Result = ({current={image:'blah',genus:'Thingo',species:'McThingo',common_names:'Thingamajig McThing'},onClick}) => {

  const names = getNames(current);
  const img = current.image?bucket[current.orgclass]+current.image:undefined
  const icon = ICONS[current.orgclass];

  const category = getRiskCategory( current.di );

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
      <h2>{names.name?names.title:<i>{names.title}</i>}</h2>
      <h3><i>{names.binomial}</i></h3>
    </resultBody>
    <riskBadge class={style.risk} risk={category.d}><p>{category.d}</p></riskBadge>
  </resultContainer>
};

export default Result;