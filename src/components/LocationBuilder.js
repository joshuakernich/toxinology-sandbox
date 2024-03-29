import { h, Component } from 'preact';
import style from './shared.css';
import { useEffect, useState } from 'preact/hooks';

const COUNTRIES = [
  { "short": "AD", "em": "🇦🇩", "long": "Andorra" },
  { "short": "AE", "em": "🇦🇪", "long": "United Arab Emirates" },
  { "short": "AF", "em": "🇦🇫", "long": "Afghanistan" },
  { "short": "AG", "em": "🇦🇬", "long": "Antigua and Barbuda" },
  { "short": "AI", "em": "🇦🇮", "long": "Anguilla" },
  { "short": "AL", "em": "🇦🇱", "long": "Albania" },
  { "short": "AM", "em": "🇦🇲", "long": "Armenia" },
  { "short": "AO", "em": "🇦🇴", "long": "Angola" },
  { "short": "AQ", "em": "🇦🇶", "long": "Antarctica" },
  { "short": "AR", "em": "🇦🇷", "long": "Argentina" },
  { "short": "AS", "em": "🇦🇸", "long": "American Samoa" },
  { "short": "AT", "em": "🇦🇹", "long": "Austria" },
  { "short": "AU", "em": "🇦🇺", "long": "Australia" },
  { "short": "AW", "em": "🇦🇼", "long": "Aruba" },
  { "short": "AX", "em": "🇦🇽", "long": "Åland Islands" },
  { "short": "AZ", "em": "🇦🇿", "long": "Azerbaijan" },
  { "short": "BA", "em": "🇧🇦", "long": "Bosnia and Herzegovina" },
  { "short": "BB", "em": "🇧🇧", "long": "Barbados" },
  { "short": "BD", "em": "🇧🇩", "long": "Bangladesh" },
  { "short": "BE", "em": "🇧🇪", "long": "Belgium" },
  { "short": "BF", "em": "🇧🇫", "long": "Burkina Faso" },
  { "short": "BG", "em": "🇧🇬", "long": "Bulgaria" },
  { "short": "BH", "em": "🇧🇭", "long": "Bahrain" },
  { "short": "BI", "em": "🇧🇮", "long": "Burundi" },
  { "short": "BJ", "em": "🇧🇯", "long": "Benin" },
  { "short": "BL", "em": "🇧🇱", "long": "Saint Barthélemy" },
  { "short": "BM", "em": "🇧🇲", "long": "Bermuda" },
  { "short": "BN", "em": "🇧🇳", "long": "Brunei Darussalam" },
  { "short": "BO", "em": "🇧🇴", "long": "Bolivia" },
  { "short": "BQ", "em": "🇧🇶", "long": "Bonaire Sint Eustatius and Saba" },
  { "short": "BR", "em": "🇧🇷", "long": "Brazil" },
  { "short": "BS", "em": "🇧🇸", "long": "Bahamas" },
  { "short": "BT", "em": "🇧🇹", "long": "Bhutan" },
  { "short": "BV", "em": "🇧🇻", "long": "Bouvet Island" },
  { "short": "BW", "em": "🇧🇼", "long": "Botswana" },
  { "short": "BY", "em": "🇧🇾", "long": "Belarus" },
  { "short": "BZ", "em": "🇧🇿", "long": "Belize" },
  { "short": "CA", "em": "🇨🇦", "long": "Canada" },
  { "short": "CC", "em": "🇨🇨", "long": "Cocos (Keeling) Islands" },
  { "short": "CD", "em": "🇨🇩", "long": "Congo" },
  { "short": "CF", "em": "🇨🇫", "long": "Central African Republic" },
  { "short": "CG", "em": "🇨🇬", "long": "Congo" },
  { "short": "CH", "em": "🇨🇭", "long": "Switzerland" },
  { "short": "CI", "em": "🇨🇮", "long": "Côte D'Ivoire" },
  { "short": "CK", "em": "🇨🇰", "long": "Cook Islands" },
  { "short": "CL", "em": "🇨🇱", "long": "Chile" },
  { "short": "CM", "em": "🇨🇲", "long": "Cameroon" },
  { "short": "CN", "em": "🇨🇳", "long": "China" },
  { "short": "CO", "em": "🇨🇴", "long": "Colombia" },
  { "short": "CR", "em": "🇨🇷", "long": "Costa Rica" },
  { "short": "CU", "em": "🇨🇺", "long": "Cuba" },
  { "short": "CV", "em": "🇨🇻", "long": "Cape Verde" },
  { "short": "CW", "em": "🇨🇼", "long": "Curaçao" },
  { "short": "CX", "em": "🇨🇽", "long": "Christmas Island" },
  { "short": "CY", "em": "🇨🇾", "long": "Cyprus" },
  { "short": "CZ", "em": "🇨🇿", "long": "Czech Republic" },
  { "short": "DE", "em": "🇩🇪", "long": "Germany" },
  { "short": "DJ", "em": "🇩🇯", "long": "Djibouti" },
  { "short": "DK", "em": "🇩🇰", "long": "Denmark" },
  { "short": "DM", "em": "🇩🇲", "long": "Dominica" },
  { "short": "DO", "em": "🇩🇴", "long": "Dominican Republic" },
  { "short": "DZ", "em": "🇩🇿", "long": "Algeria" },
  { "short": "EC", "em": "🇪🇨", "long": "Ecuador" },
  { "short": "EE", "em": "🇪🇪", "long": "Estonia" },
  { "short": "EG", "em": "🇪🇬", "long": "Egypt" },
  { "short": "EH", "em": "🇪🇭", "long": "Western Sahara" },
  { "short": "ER", "em": "🇪🇷", "long": "Eritrea" },
  { "short": "ES", "em": "🇪🇸", "long": "Spain" },
  { "short": "ET", "em": "🇪🇹", "long": "Ethiopia" },
  { "short": "FI", "em": "🇫🇮", "long": "Finland" },
  { "short": "FJ", "em": "🇫🇯", "long": "Fiji" },
  { "short": "FK", "em": "🇫🇰", "long": "Falkland Islands (Malvinas)" },
  { "short": "FM", "em": "🇫🇲", "long": "Micronesia" },
  { "short": "FO", "em": "🇫🇴", "long": "Faroe Islands" },
  { "short": "FR", "em": "🇫🇷", "long": "France" },
  { "short": "GA", "em": "🇬🇦", "long": "Gabon" },
  { "short": "GB", "em": "🇬🇧", "long": "United Kingdom" },
  { "short": "GD", "em": "🇬🇩", "long": "Grenada" },
  { "short": "GE", "em": "🇬🇪", "long": "Georgia" },
  { "short": "GF", "em": "🇬🇫", "long": "French Guiana" },
  { "short": "GG", "em": "🇬🇬", "long": "Guernsey" },
  { "short": "GH", "em": "🇬🇭", "long": "Ghana" },
  { "short": "GI", "em": "🇬🇮", "long": "Gibraltar" },
  { "short": "GL", "em": "🇬🇱", "long": "Greenland" },
  { "short": "GM", "em": "🇬🇲", "long": "Gambia" },
  { "short": "GN", "em": "🇬🇳", "long": "Guinea" },
  { "short": "GP", "em": "🇬🇵", "long": "Guadeloupe" },
  { "short": "GQ", "em": "🇬🇶", "long": "Equatorial Guinea" },
  { "short": "GR", "em": "🇬🇷", "long": "Greece" },
  { "short": "GS", "em": "🇬🇸", "long": "South Georgia" },
  { "short": "GT", "em": "🇬🇹", "long": "Guatemala" },
  { "short": "GU", "em": "🇬🇺", "long": "Guam" },
  { "short": "GW", "em": "🇬🇼", "long": "Guinea-Bissau" },
  { "short": "GY", "em": "🇬🇾", "long": "Guyana" },
  { "short": "HK", "em": "🇭🇰", "long": "Hong Kong" },
  { "short": "HM", "em": "🇭🇲", "long": "Heard Island and Mcdonald Islands" },
  { "short": "HN", "em": "🇭🇳", "long": "Honduras" },
  { "short": "HR", "em": "🇭🇷", "long": "Croatia" },
  { "short": "HT", "em": "🇭🇹", "long": "Haiti" },
  { "short": "HU", "em": "🇭🇺", "long": "Hungary" },
  { "short": "ID", "em": "🇮🇩", "long": "Indonesia" },
  { "short": "IE", "em": "🇮🇪", "long": "Ireland" },
  { "short": "IL", "em": "🇮🇱", "long": "Israel" },
  { "short": "IM", "em": "🇮🇲", "long": "Isle of Man" },
  { "short": "IN", "em": "🇮🇳", "long": "India" },
  { "short": "IO", "em": "🇮🇴", "long": "British Indian Ocean Territory" },
  { "short": "IQ", "em": "🇮🇶", "long": "Iraq" },
  { "short": "IR", "em": "🇮🇷", "long": "Iran" },
  { "short": "IS", "em": "🇮🇸", "long": "Iceland" },
  { "short": "IT", "em": "🇮🇹", "long": "Italy" },
  { "short": "JE", "em": "🇯🇪", "long": "Jersey" },
  { "short": "JM", "em": "🇯🇲", "long": "Jamaica" },
  { "short": "JO", "em": "🇯🇴", "long": "Jordan" },
  { "short": "JP", "em": "🇯🇵", "long": "Japan" },
  { "short": "KE", "em": "🇰🇪", "long": "Kenya" },
  { "short": "KG", "em": "🇰🇬", "long": "Kyrgyzstan" },
  { "short": "KH", "em": "🇰🇭", "long": "Cambodia" },
  { "short": "KI", "em": "🇰🇮", "long": "Kiribati" },
  { "short": "KM", "em": "🇰🇲", "long": "Comoros" },
  { "short": "KN", "em": "🇰🇳", "long": "Saint Kitts and Nevis" },
  { "short": "KP", "em": "🇰🇵", "long": "North Korea" },
  { "short": "KR", "em": "🇰🇷", "long": "South Korea" },
  { "short": "KW", "em": "🇰🇼", "long": "Kuwait" },
  { "short": "KY", "em": "🇰🇾", "long": "Cayman Islands" },
  { "short": "KZ", "em": "🇰🇿", "long": "Kazakhstan" },
  { "short": "LA", "em": "🇱🇦", "long": "Lao People's Democratic Republic" },
  { "short": "LB", "em": "🇱🇧", "long": "Lebanon" },
  { "short": "LC", "em": "🇱🇨", "long": "Saint Lucia" },
  { "short": "LI", "em": "🇱🇮", "long": "Liechtenstein" },
  { "short": "LK", "em": "🇱🇰", "long": "Sri Lanka" },
  { "short": "LR", "em": "🇱🇷", "long": "Liberia" },
  { "short": "LS", "em": "🇱🇸", "long": "Lesotho" },
  { "short": "LT", "em": "🇱🇹", "long": "Lithuania" },
  { "short": "LU", "em": "🇱🇺", "long": "Luxembourg" },
  { "short": "LV", "em": "🇱🇻", "long": "Latvia" },
  { "short": "LY", "em": "🇱🇾", "long": "Libya" },
  { "short": "MA", "em": "🇲🇦", "long": "Morocco" },
  { "short": "MC", "em": "🇲🇨", "long": "Monaco" },
  { "short": "MD", "em": "🇲🇩", "long": "Moldova" },
  { "short": "ME", "em": "🇲🇪", "long": "Montenegro" },
  { "short": "MF", "em": "🇲🇫", "long": "Saint Martin (French Part)" },
  { "short": "MG", "em": "🇲🇬", "long": "Madagascar" },
  { "short": "MH", "em": "🇲🇭", "long": "Marshall Islands" },
  { "short": "MK", "em": "🇲🇰", "long": "Macedonia" },
  { "short": "ML", "em": "🇲🇱", "long": "Mali" },
  { "short": "MM", "em": "🇲🇲", "long": "Myanmar" },
  { "short": "MN", "em": "🇲🇳", "long": "Mongolia" },
  { "short": "MO", "em": "🇲🇴", "long": "Macao" },
  { "short": "MP", "em": "🇲🇵", "long": "Northern Mariana Islands" },
  { "short": "MQ", "em": "🇲🇶", "long": "Martinique" },
  { "short": "MR", "em": "🇲🇷", "long": "Mauritania" },
  { "short": "MS", "em": "🇲🇸", "long": "Montserrat" },
  { "short": "MT", "em": "🇲🇹", "long": "Malta" },
  { "short": "MU", "em": "🇲🇺", "long": "Mauritius" },
  { "short": "MV", "em": "🇲🇻", "long": "Maldives" },
  { "short": "MW", "em": "🇲🇼", "long": "Malawi" },
  { "short": "MX", "em": "🇲🇽", "long": "Mexico" },
  { "short": "MY", "em": "🇲🇾", "long": "Malaysia" },
  { "short": "MZ", "em": "🇲🇿", "long": "Mozambique" },
  { "short": "NA", "em": "🇳🇦", "long": "Namibia" },
  { "short": "NC", "em": "🇳🇨", "long": "New Caledonia" },
  { "short": "NE", "em": "🇳🇪", "long": "Niger" },
  { "short": "NF", "em": "🇳🇫", "long": "Norfolk Island" },
  { "short": "NG", "em": "🇳🇬", "long": "Nigeria" },
  { "short": "NI", "em": "🇳🇮", "long": "Nicaragua" },
  { "short": "NL", "em": "🇳🇱", "long": "Netherlands" },
  { "short": "NO", "em": "🇳🇴", "long": "Norway" },
  { "short": "NP", "em": "🇳🇵", "long": "Nepal" },
  { "short": "NR", "em": "🇳🇷", "long": "Nauru" },
  { "short": "NU", "em": "🇳🇺", "long": "Niue" },
  { "short": "NZ", "em": "🇳🇿", "long": "New Zealand" },
  { "short": "OM", "em": "🇴🇲", "long": "Oman" },
  { "short": "PA", "em": "🇵🇦", "long": "Panama" },
  { "short": "PE", "em": "🇵🇪", "long": "Peru" },
  { "short": "PF", "em": "🇵🇫", "long": "French Polynesia" },
  { "short": "PG", "em": "🇵🇬", "long": "Papua New Guinea" },
  { "short": "PH", "em": "🇵🇭", "long": "Philippines" },
  { "short": "PK", "em": "🇵🇰", "long": "Pakistan" },
  { "short": "PL", "em": "🇵🇱", "long": "Poland" },
  { "short": "PM", "em": "🇵🇲", "long": "Saint Pierre and Miquelon" },
  { "short": "PN", "em": "🇵🇳", "long": "Pitcairn" },
  { "short": "PR", "em": "🇵🇷", "long": "Puerto Rico" },
  { "short": "PS", "em": "🇵🇸", "long": "Palestinian Territory" },
  { "short": "PT", "em": "🇵🇹", "long": "Portugal" },
  { "short": "PW", "em": "🇵🇼", "long": "Palau" },
  { "short": "PY", "em": "🇵🇾", "long": "Paraguay" },
  { "short": "QA", "em": "🇶🇦", "long": "Qatar" },
  { "short": "RE", "em": "🇷🇪", "long": "Réunion" },
  { "short": "RO", "em": "🇷🇴", "long": "Romania" },
  { "short": "RS", "em": "🇷🇸", "long": "Serbia" },
  { "short": "RU", "em": "🇷🇺", "long": "Russia" },
  { "short": "RW", "em": "🇷🇼", "long": "Rwanda" },
  { "short": "SA", "em": "🇸🇦", "long": "Saudi Arabia" },
  { "short": "SB", "em": "🇸🇧", "long": "Solomon Islands" },
  { "short": "SC", "em": "🇸🇨", "long": "Seychelles" },
  { "short": "SD", "em": "🇸🇩", "long": "Sudan" },
  { "short": "SE", "em": "🇸🇪", "long": "Sweden" },
  { "short": "SG", "em": "🇸🇬", "long": "Singapore" },
  { "short": "SH", "em": "🇸🇭", "long": "Saint Helena Ascension and Tristan Da Cunha" },
  { "short": "SI", "em": "🇸🇮", "long": "Slovenia" },
  { "short": "SJ", "em": "🇸🇯", "long": "Svalbard and Jan Mayen" },
  { "short": "SK", "em": "🇸🇰", "long": "Slovakia" },
  { "short": "SL", "em": "🇸🇱", "long": "Sierra Leone" },
  { "short": "SM", "em": "🇸🇲", "long": "San Marino" },
  { "short": "SN", "em": "🇸🇳", "long": "Senegal" },
  { "short": "SO", "em": "🇸🇴", "long": "Somalia" },
  { "short": "SR", "em": "🇸🇷", "long": "Suriname" },
  { "short": "SS", "em": "🇸🇸", "long": "South Sudan" },
  { "short": "ST", "em": "🇸🇹", "long": "Sao Tome and Principe" },
  { "short": "SV", "em": "🇸🇻", "long": "El Salvador" },
  { "short": "SX", "em": "🇸🇽", "long": "Sint Maarten (Dutch Part)" },
  { "short": "SY", "em": "🇸🇾", "long": "Syrian Arab Republic" },
  { "short": "SZ", "em": "🇸🇿", "long": "Swaziland" },
  { "short": "TC", "em": "🇹🇨", "long": "Turks and Caicos Islands" },
  { "short": "TD", "em": "🇹🇩", "long": "Chad" },
  { "short": "TF", "em": "🇹🇫", "long": "French Southern Territories" },
  { "short": "TG", "em": "🇹🇬", "long": "Togo" },
  { "short": "TH", "em": "🇹🇭", "long": "Thailand" },
  { "short": "TJ", "em": "🇹🇯", "long": "Tajikistan" },
  { "short": "TK", "em": "🇹🇰", "long": "Tokelau" },
  { "short": "TL", "em": "🇹🇱", "long": "Timor-Leste" },
  { "short": "TM", "em": "🇹🇲", "long": "Turkmenistan" },
  { "short": "TN", "em": "🇹🇳", "long": "Tunisia" },
  { "short": "TO", "em": "🇹🇴", "long": "Tonga" },
  { "short": "TR", "em": "🇹🇷", "long": "Turkey" },
  { "short": "TT", "em": "🇹🇹", "long": "Trinidad and Tobago" },
  { "short": "TV", "em": "🇹🇻", "long": "Tuvalu" },
  { "short": "TW", "em": "🇹🇼", "long": "Taiwan" },
  { "short": "TZ", "em": "🇹🇿", "long": "Tanzania" },
  { "short": "UA", "em": "🇺🇦", "long": "Ukraine" },
  { "short": "UG", "em": "🇺🇬", "long": "Uganda" },
  { "short": "UM", "em": "🇺🇲", "long": "United States Minor Outlying Islands" },
  { "short": "US", "em": "🇺🇸", "long": "United States" },
  { "short": "UY", "em": "🇺🇾", "long": "Uruguay" },
  { "short": "UZ", "em": "🇺🇿", "long": "Uzbekistan" },
  { "short": "VA", "em": "🇻🇦", "long": "Vatican City" },
  { "short": "VC", "em": "🇻🇨", "long": "Saint Vincent and The Grenadines" },
  { "short": "VE", "em": "🇻🇪", "long": "Venezuela" },
  { "short": "VG", "em": "🇻🇬", "long": "Virgin Islands British" },
  { "short": "VI", "em": "🇻🇮", "long": "Virgin Islands U.S." },
  { "short": "VN", "em": "🇻🇳", "long": "Viet Nam" },
  { "short": "VU", "em": "🇻🇺", "long": "Vanuatu" },
  { "short": "WF", "em": "🇼🇫", "long": "Wallis and Futuna" },
  { "short": "WS", "em": "🇼🇸", "long": "Samoa" },
  { "short": "YE", "em": "🇾🇪", "long": "Yemen" },
  { "short": "YT", "em": "🇾🇹", "long": "Mayotte" },
  { "short": "ZA", "em": "🇿🇦", "long": "South Africa" },
  { "short": "ZM", "em": "🇿🇲", "long": "Zambia" },
  { "short": "ZW", "em": "🇿🇼", "long": "Zimbabwe" }
];

const LocationSelector = ({value, onChange, onRemove}) => {   
  const handleOnChange = (e) => { onChange(e.target.value); };

  return <>
    <selectContainer>
      <selectCancel onClick={onRemove} />
      <select value={value} class={style.locationdd} onChange={handleOnChange}>
        {COUNTRIES.map((country)=> <option value={country.long}>{`${country.em} ${country.long}`}</option>)}
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

