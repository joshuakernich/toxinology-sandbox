import { h, Component } from 'preact';
import style from './shared.css';
import { useEffect, useState } from 'preact/hooks';
const { countries } = require("moment-timezone/data/meta/latest.json");

const EMOJI = {
  "AD": "🇦🇩",
  "AE": "🇦🇪",
  "AF": "🇦🇫",
  "AG": "🇦🇬",
  "AI": "🇦🇮",
  "AL": "🇦🇱",
  "AM": "🇦🇲",
  "AO": "🇦🇴",
  "AQ": "🇦🇶",
  "AR": "🇦🇷",
  "AS": "🇦🇸",
  "AT": "🇦🇹",
  "AU": "🇦🇺",
  "AW": "🇦🇼",
  "AX": "🇦🇽",
  "AZ": "🇦🇿",
  "BA": "🇧🇦",
  "BB": "🇧🇧",
  "BD": "🇧🇩",
  "BE": "🇧🇪",
  "BF": "🇧🇫",
  "BG": "🇧🇬",
  "BH": "🇧🇭",
  "BI": "🇧🇮",
  "BJ": "🇧🇯",
  "BL": "🇧🇱",
  "BM": "🇧🇲",
  "BN": "🇧🇳",
  "BO": "🇧🇴",
  "BQ": "🇧🇶",
  "BR": "🇧🇷",
  "BS": "🇧🇸",
  "BT": "🇧🇹",
  "BV": "🇧🇻",
  "BW": "🇧🇼",
  "BY": "🇧🇾",
  "BZ": "🇧🇿",
  "CA": "🇨🇦",
  "CC": "🇨🇨",
  "CD": "🇨🇩",
  "CF": "🇨🇫",
  "CG": "🇨🇬",
  "CH": "🇨🇭",
  "CI": "🇨🇮",
  "CK": "🇨🇰",
  "CL": "🇨🇱",
  "CM": "🇨🇲",
  "CN": "🇨🇳",
  "CO": "🇨🇴",
  "CR": "🇨🇷",
  "CU": "🇨🇺",
  "CV": "🇨🇻",
  "CW": "🇨🇼",
  "CX": "🇨🇽",
  "CY": "🇨🇾",
  "CZ": "🇨🇿",
  "DE": "🇩🇪",
  "DJ": "🇩🇯",
  "DK": "🇩🇰",
  "DM": "🇩🇲",
  "DO": "🇩🇴",
  "DZ": "🇩🇿",
  "EC": "🇪🇨",
  "EE": "🇪🇪",
  "EG": "🇪🇬",
  "EH": "🇪🇭",
  "ER": "🇪🇷",
  "ES": "🇪🇸",
  "ET": "🇪🇹",
  "FI": "🇫🇮",
  "FJ": "🇫🇯",
  "FK": "🇫🇰",
  "FM": "🇫🇲",
  "FO": "🇫🇴",
  "FR": "🇫🇷",
  "GA": "🇬🇦",
  "GB": "🇬🇧",
  "GD": "🇬🇩",
  "GE": "🇬🇪",
  "GF": "🇬🇫",
  "GG": "🇬🇬",
  "GH": "🇬🇭",
  "GI": "🇬🇮",
  "GL": "🇬🇱",
  "GM": "🇬🇲",
  "GN": "🇬🇳",
  "GP": "🇬🇵",
  "GQ": "🇬🇶",
  "GR": "🇬🇷",
  "GS": "🇬🇸",
  "GT": "🇬🇹",
  "GU": "🇬🇺",
  "GW": "🇬🇼",
  "GY": "🇬🇾",
  "HK": "🇭🇰",
  "HM": "🇭🇲",
  "HN": "🇭🇳",
  "HR": "🇭🇷",
  "HT": "🇭🇹",
  "HU": "🇭🇺",
  "ID": "🇮🇩",
  "IE": "🇮🇪",
  "IL": "🇮🇱",
  "IM": "🇮🇲",
  "IN": "🇮🇳",
  "IO": "🇮🇴",
  "IQ": "🇮🇶",
  "IR": "🇮🇷",
  "IS": "🇮🇸",
  "IT": "🇮🇹",
  "JE": "🇯🇪",
  "JM": "🇯🇲",
  "JO": "🇯🇴",
  "JP": "🇯🇵",
  "KE": "🇰🇪",
  "KG": "🇰🇬",
  "KH": "🇰🇭",
  "KI": "🇰🇮",
  "KM": "🇰🇲",
  "KN": "🇰🇳",
  "KP": "🇰🇵",
  "KR": "🇰🇷",
  "KW": "🇰🇼",
  "KY": "🇰🇾",
  "KZ": "🇰🇿",
  "LA": "🇱🇦",
  "LB": "🇱🇧",
  "LC": "🇱🇨",
  "LI": "🇱🇮",
  "LK": "🇱🇰",
  "LR": "🇱🇷",
  "LS": "🇱🇸",
  "LT": "🇱🇹",
  "LU": "🇱🇺",
  "LV": "🇱🇻",
  "LY": "🇱🇾",
  "MA": "🇲🇦",
  "MC": "🇲🇨",
  "MD": "🇲🇩",
  "ME": "🇲🇪",
  "MF": "🇲🇫",
  "MG": "🇲🇬",
  "MH": "🇲🇭",
  "MK": "🇲🇰",
  "ML": "🇲🇱",
  "MM": "🇲🇲",
  "MN": "🇲🇳",
  "MO": "🇲🇴",
  "MP": "🇲🇵",
  "MQ": "🇲🇶",
  "MR": "🇲🇷",
  "MS": "🇲🇸",
  "MT": "🇲🇹",
  "MU": "🇲🇺",
  "MV": "🇲🇻",
  "MW": "🇲🇼",
  "MX": "🇲🇽",
  "MY": "🇲🇾",
  "MZ": "🇲🇿",
  "NA": "🇳🇦",
  "NC": "🇳🇨",
  "NE": "🇳🇪",
  "NF": "🇳🇫",
  "NG": "🇳🇬",
  "NI": "🇳🇮",
  "NL": "🇳🇱",
  "NO": "🇳🇴",
  "NP": "🇳🇵",
  "NR": "🇳🇷",
  "NU": "🇳🇺",
  "NZ": "🇳🇿",
  "OM": "🇴🇲",
  "PA": "🇵🇦",
  "PE": "🇵🇪",
  "PF": "🇵🇫",
  "PG": "🇵🇬",
  "PH": "🇵🇭",
  "PK": "🇵🇰",
  "PL": "🇵🇱",
  "PM": "🇵🇲",
  "PN": "🇵🇳",
  "PR": "🇵🇷",
  "PS": "🇵🇸",
  "PT": "🇵🇹",
  "PW": "🇵🇼",
  "PY": "🇵🇾",
  "QA": "🇶🇦",
  "RE": "🇷🇪",
  "RO": "🇷🇴",
  "RS": "🇷🇸",
  "RU": "🇷🇺",
  "RW": "🇷🇼",
  "SA": "🇸🇦",
  "SB": "🇸🇧",
  "SC": "🇸🇨",
  "SD": "🇸🇩",
  "SE": "🇸🇪",
  "SG": "🇸🇬",
  "SH": "🇸🇭",
  "SI": "🇸🇮",
  "SJ": "🇸🇯",
  "SK": "🇸🇰",
  "SL": "🇸🇱",
  "SM": "🇸🇲",
  "SN": "🇸🇳",
  "SO": "🇸🇴",
  "SR": "🇸🇷",
  "SS": "🇸🇸",
  "ST": "🇸🇹",
  "SV": "🇸🇻",
  "SX": "🇸🇽",
  "SY": "🇸🇾",
  "SZ": "🇸🇿",
  "TC": "🇹🇨",
  "TD": "🇹🇩",
  "TF": "🇹🇫",
  "TG": "🇹🇬",
  "TH": "🇹🇭",
  "TJ": "🇹🇯",
  "TK": "🇹🇰",
  "TL": "🇹🇱",
  "TM": "🇹🇲",
  "TN": "🇹🇳",
  "TO": "🇹🇴",
  "TR": "🇹🇷",
  "TT": "🇹🇹",
  "TV": "🇹🇻",
  "TW": "🇹🇼",
  "TZ": "🇹🇿",
  "UA": "🇺🇦",
  "UG": "🇺🇬",
  "UM": "🇺🇲",
  "US": "🇺🇸",
  "UY": "🇺🇾",
  "UZ": "🇺🇿",
  "VA": "🇻🇦",
  "VC": "🇻🇨",
  "VE": "🇻🇪",
  "VG": "🇻🇬",
  "VI": "🇻🇮",
  "VN": "🇻🇳",
  "VU": "🇻🇺",
  "WF": "🇼🇫",
  "WS": "🇼🇸",
  "YE": "🇾🇪",
  "YT": "🇾🇹",
  "ZA": "🇿🇦",
  "ZM": "🇿🇲",
  "ZW": "🇿🇼"
};

const LocationSelector = ({value, onChange, onRemove}) => {   
  const handleOnChange = (e) => { onChange(e.target.value); };

  return <>
    <selectContainer>
      <selectCancel onClick={onRemove} />
      <select value={value} class={style.locationdd} onChange={handleOnChange}>
        {Object.entries(countries).map(([short,country])=> <option value={country.name}>{`${EMOJI[short]} ${country.name}`}</option>)}
      </select>
    </selectContainer>
  </>
};

const LocationBuilder = (props) => {   
  // This causes a re-render, we will have to keep track of these differently, potentially
  const [list, setList] = useState([]);

  useEffect(() => { 
    // on first render set the list to the current, after that, we can keep the list here
    setList(props.current);
    props.onChange(props.current);
  }, []);

  const doNewLocation = () => { 
    const newList = list.concat('Australia');
    setList(newList);
    props.onChange(newList);
  }

  const onLocationChanged = (index) => (newLocation) => { 
    const newList = [...list];
    newList[index] = newLocation;

    setList(newList);

    props.onChange(newList);
  }

  const onLocationRemoved = (index) => () => {
    const newList = [...list];
    newList.splice(index, 1);

    setList(newList);

    props.onChange(newList);
  ;}

  return <locationBuilder>
    {list.map((loc, index) => <LocationSelector value={loc} onChange={onLocationChanged(index)} onRemove={onLocationRemoved(index)} />)}
    <button onclick={doNewLocation}>+ add location</button>
  </locationBuilder>
};

export default LocationBuilder;

