import { h } from 'preact';
import style from './shared.css';
import Logo from './Logo';
import ContentPillar from './ContentPillar';
import { Br1, Br2 } from './Br';
import DropDown from './DropDown';

const LabsPillar = ({toBack}) => {



  const list = [
    {
      t:'PT/INR',
      o:[
        {t:'Grossly Prolonged'},
        {t:'Prolonged'},
    ]},
    {
      t:'aPTT',
      o:[
        {t:'Grossly Prolonged'},
        {t:'Prolonged'},
    ]},
    {
      t:'Fibrination',
      o:[
        {t:'Defibrination'},
        {t:'Low'},
        {t:'Raised'},
      ]
    },
    {
      t:'FDP/XDP',
      o:[
        {t:'Grossly Elevated'},
        {t:'Elevated'},
      ]
    },
    {
      t:'Thrombocytopenia',
      o:[
        {t:'Primary'},
        {t:'Severe'},
        {t:'Secondary'},
      ]
    },
    {
      t:'CK',
      o:[
        {t:'Grossly Elevated'},
        {t:'Elevated'},
        {t:'Mildly'},
      ]
    },
    /*{ t:'Secondary Renal Failure' },
    { t:'K++ Secondary Elevation' },
    { t:'WCC Leukocytosis' },
    { t:'Lymphomenia' },*/
    {
      t:'Hb',
      o:[
          { t:'Anaemia' },{ t:'Haemolytic Anaemia' }
        ]
    },
    {
      t:'APaO2',
      o:[
      { t:'Low', b:'Secondary to paralytic respiratory failure' },
      { t:'Low', b:'Secondary to pulmonary embolism' }]},
     {
      t:'WBCT',
      o:[
      { t:'Prolonged', b:'Or not clotting' },
      { t:'Rapid Clotting' }]},
  ]

  return <ContentPillar>
    <button onClick={toBack} class={style.back}>Back to Search</button>
    <Br1/>
    <h1>Lab Results</h1>
    <h3>Select all that apply</h3>
    <Br2/>
    {list.map((dd)=> 
      <>
      <DropDown t={dd.t} o={dd.o}/>
      <Br2/>
      </>
    )}
    
  </ContentPillar>
};

export default LabsPillar;