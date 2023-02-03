import { h, Component } from 'preact';
import style from './shared.css';
import { useEffect, useState } from 'preact/hooks';

const CSV = "AD,🇦🇩,Andorra,AE,🇦🇪,United Arab Emirates,AF,🇦🇫,Afghanistan,AG,🇦🇬,Antigua and Barbuda,AI,🇦🇮,Anguilla,AL,🇦🇱,Albania,AM,🇦🇲,Armenia,AO,🇦🇴,Angola,AQ,🇦🇶,Antarctica,AR,🇦🇷,Argentina,AS,🇦🇸,American Samoa,AT,🇦🇹,Austria,AU,🇦🇺,Australia,AW,🇦🇼,Aruba,AX,🇦🇽,Åland Islands,AZ,🇦🇿,Azerbaijan,BA,🇧🇦,Bosnia and Herzegovina,BB,🇧🇧,Barbados,BD,🇧🇩,Bangladesh,BE,🇧🇪,Belgium,BF,🇧🇫,Burkina Faso,BG,🇧🇬,Bulgaria,BH,🇧🇭,Bahrain,BI,🇧🇮,Burundi,BJ,🇧🇯,Benin,BL,🇧🇱,Saint Barthélemy,BM,🇧🇲,Bermuda,BN,🇧🇳,Brunei Darussalam,BO,🇧🇴,Bolivia,BQ,🇧🇶,Bonaire Sint Eustatius and Saba,BR,🇧🇷,Brazil,BS,🇧🇸,Bahamas,BT,🇧🇹,Bhutan,BV,🇧🇻,Bouvet Island,BW,🇧🇼,Botswana,BY,🇧🇾,Belarus,BZ,🇧🇿,Belize,CA,🇨🇦,Canada,CC,🇨🇨,Cocos (Keeling) Islands,CD,🇨🇩,Congo,CF,🇨🇫,Central African Republic,CG,🇨🇬,Congo,CH,🇨🇭,Switzerland,CI,🇨🇮,Côte D'Ivoire,CK,🇨🇰,Cook Islands,CL,🇨🇱,Chile,CM,🇨🇲,Cameroon,CN,🇨🇳,China,CO,🇨🇴,Colombia,CR,🇨🇷,Costa Rica,CU,🇨🇺,Cuba,CV,🇨🇻,Cape Verde,CW,🇨🇼,Curaçao,CX,🇨🇽,Christmas Island,CY,🇨🇾,Cyprus,CZ,🇨🇿,Czech Republic,DE,🇩🇪,Germany,DJ,🇩🇯,Djibouti,DK,🇩🇰,Denmark,DM,🇩🇲,Dominica,DO,🇩🇴,Dominican Republic,DZ,🇩🇿,Algeria,EC,🇪🇨,Ecuador,EE,🇪🇪,Estonia,EG,🇪🇬,Egypt,EH,🇪🇭,Western Sahara,ER,🇪🇷,Eritrea,ES,🇪🇸,Spain,ET,🇪🇹,Ethiopia,FI,🇫🇮,Finland,FJ,🇫🇯,Fiji,FK,🇫🇰,Falkland Islands (Malvinas),FM,🇫🇲,Micronesia,FO,🇫🇴,Faroe Islands,FR,🇫🇷,France,GA,🇬🇦,Gabon,GB,🇬🇧,United Kingdom,GD,🇬🇩,Grenada,GE,🇬🇪,Georgia,GF,🇬🇫,French Guiana,GG,🇬🇬,Guernsey,GH,🇬🇭,Ghana,GI,🇬🇮,Gibraltar,GL,🇬🇱,Greenland,GM,🇬🇲,Gambia,GN,🇬🇳,Guinea,GP,🇬🇵,Guadeloupe,GQ,🇬🇶,Equatorial Guinea,GR,🇬🇷,Greece,GS,🇬🇸,South Georgia,GT,🇬🇹,Guatemala,GU,🇬🇺,Guam,GW,🇬🇼,Guinea-Bissau,GY,🇬🇾,Guyana,HK,🇭🇰,Hong Kong,HM,🇭🇲,Heard Island and Mcdonald Islands,HN,🇭🇳,Honduras,HR,🇭🇷,Croatia,HT,🇭🇹,Haiti,HU,🇭🇺,Hungary,ID,🇮🇩,Indonesia,IE,🇮🇪,Ireland,IL,🇮🇱,Israel,IM,🇮🇲,Isle of Man,IN,🇮🇳,India,IO,🇮🇴,British Indian Ocean Territory,IQ,🇮🇶,Iraq,IR,🇮🇷,Iran,IS,🇮🇸,Iceland,IT,🇮🇹,Italy,JE,🇯🇪,Jersey,JM,🇯🇲,Jamaica,JO,🇯🇴,Jordan,JP,🇯🇵,Japan,KE,🇰🇪,Kenya,KG,🇰🇬,Kyrgyzstan,KH,🇰🇭,Cambodia,KI,🇰🇮,Kiribati,KM,🇰🇲,Comoros,KN,🇰🇳,Saint Kitts and Nevis,KP,🇰🇵,North Korea,KR,🇰🇷,South Korea,KW,🇰🇼,Kuwait,KY,🇰🇾,Cayman Islands,KZ,🇰🇿,Kazakhstan,LA,🇱🇦,Lao People's Democratic Republic,LB,🇱🇧,Lebanon,LC,🇱🇨,Saint Lucia,LI,🇱🇮,Liechtenstein,LK,🇱🇰,Sri Lanka,LR,🇱🇷,Liberia,LS,🇱🇸,Lesotho,LT,🇱🇹,Lithuania,LU,🇱🇺,Luxembourg,LV,🇱🇻,Latvia,LY,🇱🇾,Libya,MA,🇲🇦,Morocco,MC,🇲🇨,Monaco,MD,🇲🇩,Moldova,ME,🇲🇪,Montenegro,MF,🇲🇫,Saint Martin (French Part),MG,🇲🇬,Madagascar,MH,🇲🇭,Marshall Islands,MK,🇲🇰,Macedonia,ML,🇲🇱,Mali,MM,🇲🇲,Myanmar,MN,🇲🇳,Mongolia,MO,🇲🇴,Macao,MP,🇲🇵,Northern Mariana Islands,MQ,🇲🇶,Martinique,MR,🇲🇷,Mauritania,MS,🇲🇸,Montserrat,MT,🇲🇹,Malta,MU,🇲🇺,Mauritius,MV,🇲🇻,Maldives,MW,🇲🇼,Malawi,MX,🇲🇽,Mexico,MY,🇲🇾,Malaysia,MZ,🇲🇿,Mozambique,NA,🇳🇦,Namibia,NC,🇳🇨,New Caledonia,NE,🇳🇪,Niger,NF,🇳🇫,Norfolk Island,NG,🇳🇬,Nigeria,NI,🇳🇮,Nicaragua,NL,🇳🇱,Netherlands,NO,🇳🇴,Norway,NP,🇳🇵,Nepal,NR,🇳🇷,Nauru,NU,🇳🇺,Niue,NZ,🇳🇿,New Zealand,OM,🇴🇲,Oman,PA,🇵🇦,Panama,PE,🇵🇪,Peru,PF,🇵🇫,French Polynesia,PG,🇵🇬,Papua New Guinea,PH,🇵🇭,Philippines,PK,🇵🇰,Pakistan,PL,🇵🇱,Poland,PM,🇵🇲,Saint Pierre and Miquelon,PN,🇵🇳,Pitcairn,PR,🇵🇷,Puerto Rico,PS,🇵🇸,Palestinian Territory,PT,🇵🇹,Portugal,PW,🇵🇼,Palau,PY,🇵🇾,Paraguay,QA,🇶🇦,Qatar,RE,🇷🇪,Réunion,RO,🇷🇴,Romania,RS,🇷🇸,Serbia,RU,🇷🇺,Russia,RW,🇷🇼,Rwanda,SA,🇸🇦,Saudi Arabia,SB,🇸🇧,Solomon Islands,SC,🇸🇨,Seychelles,SD,🇸🇩,Sudan,SE,🇸🇪,Sweden,SG,🇸🇬,Singapore,SH,🇸🇭,Saint Helena Ascension and Tristan Da Cunha,SI,🇸🇮,Slovenia,SJ,🇸🇯,Svalbard and Jan Mayen,SK,🇸🇰,Slovakia,SL,🇸🇱,Sierra Leone,SM,🇸🇲,San Marino,SN,🇸🇳,Senegal,SO,🇸🇴,Somalia,SR,🇸🇷,Suriname,SS,🇸🇸,South Sudan,ST,🇸🇹,Sao Tome and Principe,SV,🇸🇻,El Salvador,SX,🇸🇽,Sint Maarten (Dutch Part),SY,🇸🇾,Syrian Arab Republic,SZ,🇸🇿,Swaziland,TC,🇹🇨,Turks and Caicos Islands,TD,🇹🇩,Chad,TF,🇹🇫,French Southern Territories,TG,🇹🇬,Togo,TH,🇹🇭,Thailand,TJ,🇹🇯,Tajikistan,TK,🇹🇰,Tokelau,TL,🇹🇱,Timor-Leste,TM,🇹🇲,Turkmenistan,TN,🇹🇳,Tunisia,TO,🇹🇴,Tonga,TR,🇹🇷,Turkey,TT,🇹🇹,Trinidad and Tobago,TV,🇹🇻,Tuvalu,TW,🇹🇼,Taiwan,TZ,🇹🇿,Tanzania,UA,🇺🇦,Ukraine,UG,🇺🇬,Uganda,UM,🇺🇲,United States Minor Outlying Islands,US,🇺🇸,United States,UY,🇺🇾,Uruguay,UZ,🇺🇿,Uzbekistan,VA,🇻🇦,Vatican City,VC,🇻🇨,Saint Vincent and The Grenadines,VE,🇻🇪,Venezuela,VG,🇻🇬,Virgin Islands British,VI,🇻🇮,Virgin Islands U.S.,VN,🇻🇳,Viet Nam,VU,🇻🇺,Vanuatu,WF,🇼🇫,Wallis and Futuna,WS,🇼🇸,Samoa,YE,🇾🇪,Yemen,YT,🇾🇹,Mayotte,ZA,🇿🇦,South Africa,ZM,🇿🇲,Zambia,ZW,🇿🇼,Zimbabwe";


const ARR = CSV.split(',');
const COUNTRIES = [];
for(var i=0; i<ARR.length; i+=3) COUNTRIES.push({short:ARR[i],em:ARR[i+1],long:ARR[i+2]});

const LocationDD = ({value, onChange}) => {
  const handleOnChange = (e) => {
    onChange(e.target.value);
  };

  return <select value={value} class={style.locationdd} onChange={handleOnChange}>
    {COUNTRIES.map((c)=> <option value={c.short}>{c.em + ' ' +c.long}</option>)}
  </select>
};

const LocationBuilder = (props) => {
  // This causes a re-render, we will have to keep track of these differently, potentially
  const [list, setList] = useState([]);

  useEffect(() => {
    // on first render set the list to the current, after that, we can keep the list here
    setList(props.current);
  }, []);

  const doNewLocation = () => {
    const newList = list.concat('Current Location');

    setList(newList);

    props.onChange(newList);
  }

  const onLocationChanged = (index) => (newLocation) => {
    const newList = [...list];

    newList[index] = newLocation;

    setList(newList);

    props.onChange(newList);
  }

  return <div class={style.locationbuilder}>
    {list.map((loc, index)=> <LocationDD value={loc} onChange={onLocationChanged(index)}/>)}
    <button onclick={doNewLocation}>+ add location</button>
  </div>
};

export default LocationBuilder;

