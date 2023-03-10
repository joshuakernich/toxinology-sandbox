import { h, Component } from 'preact';
import style from './shared.css';
import { useEffect, useState } from 'preact/hooks';

const COUNTRIES = [
  { "short": "AD", "em": "๐ฆ๐ฉ", "long": "Andorra" },
  { "short": "AE", "em": "๐ฆ๐ช", "long": "United Arab Emirates" },
  { "short": "AF", "em": "๐ฆ๐ซ", "long": "Afghanistan" },
  { "short": "AG", "em": "๐ฆ๐ฌ", "long": "Antigua and Barbuda" },
  { "short": "AI", "em": "๐ฆ๐ฎ", "long": "Anguilla" },
  { "short": "AL", "em": "๐ฆ๐ฑ", "long": "Albania" },
  { "short": "AM", "em": "๐ฆ๐ฒ", "long": "Armenia" },
  { "short": "AO", "em": "๐ฆ๐ด", "long": "Angola" },
  { "short": "AQ", "em": "๐ฆ๐ถ", "long": "Antarctica" },
  { "short": "AR", "em": "๐ฆ๐ท", "long": "Argentina" },
  { "short": "AS", "em": "๐ฆ๐ธ", "long": "American Samoa" },
  { "short": "AT", "em": "๐ฆ๐น", "long": "Austria" },
  { "short": "AU", "em": "๐ฆ๐บ", "long": "Australia" },
  { "short": "AW", "em": "๐ฆ๐ผ", "long": "Aruba" },
  { "short": "AX", "em": "๐ฆ๐ฝ", "long": "รland Islands" },
  { "short": "AZ", "em": "๐ฆ๐ฟ", "long": "Azerbaijan" },
  { "short": "BA", "em": "๐ง๐ฆ", "long": "Bosnia and Herzegovina" },
  { "short": "BB", "em": "๐ง๐ง", "long": "Barbados" },
  { "short": "BD", "em": "๐ง๐ฉ", "long": "Bangladesh" },
  { "short": "BE", "em": "๐ง๐ช", "long": "Belgium" },
  { "short": "BF", "em": "๐ง๐ซ", "long": "Burkina Faso" },
  { "short": "BG", "em": "๐ง๐ฌ", "long": "Bulgaria" },
  { "short": "BH", "em": "๐ง๐ญ", "long": "Bahrain" },
  { "short": "BI", "em": "๐ง๐ฎ", "long": "Burundi" },
  { "short": "BJ", "em": "๐ง๐ฏ", "long": "Benin" },
  { "short": "BL", "em": "๐ง๐ฑ", "long": "Saint Barthรฉlemy" },
  { "short": "BM", "em": "๐ง๐ฒ", "long": "Bermuda" },
  { "short": "BN", "em": "๐ง๐ณ", "long": "Brunei Darussalam" },
  { "short": "BO", "em": "๐ง๐ด", "long": "Bolivia" },
  { "short": "BQ", "em": "๐ง๐ถ", "long": "Bonaire Sint Eustatius and Saba" },
  { "short": "BR", "em": "๐ง๐ท", "long": "Brazil" },
  { "short": "BS", "em": "๐ง๐ธ", "long": "Bahamas" },
  { "short": "BT", "em": "๐ง๐น", "long": "Bhutan" },
  { "short": "BV", "em": "๐ง๐ป", "long": "Bouvet Island" },
  { "short": "BW", "em": "๐ง๐ผ", "long": "Botswana" },
  { "short": "BY", "em": "๐ง๐พ", "long": "Belarus" },
  { "short": "BZ", "em": "๐ง๐ฟ", "long": "Belize" },
  { "short": "CA", "em": "๐จ๐ฆ", "long": "Canada" },
  { "short": "CC", "em": "๐จ๐จ", "long": "Cocos (Keeling) Islands" },
  { "short": "CD", "em": "๐จ๐ฉ", "long": "Congo" },
  { "short": "CF", "em": "๐จ๐ซ", "long": "Central African Republic" },
  { "short": "CG", "em": "๐จ๐ฌ", "long": "Congo" },
  { "short": "CH", "em": "๐จ๐ญ", "long": "Switzerland" },
  { "short": "CI", "em": "๐จ๐ฎ", "long": "Cรดte D'Ivoire" },
  { "short": "CK", "em": "๐จ๐ฐ", "long": "Cook Islands" },
  { "short": "CL", "em": "๐จ๐ฑ", "long": "Chile" },
  { "short": "CM", "em": "๐จ๐ฒ", "long": "Cameroon" },
  { "short": "CN", "em": "๐จ๐ณ", "long": "China" },
  { "short": "CO", "em": "๐จ๐ด", "long": "Colombia" },
  { "short": "CR", "em": "๐จ๐ท", "long": "Costa Rica" },
  { "short": "CU", "em": "๐จ๐บ", "long": "Cuba" },
  { "short": "CV", "em": "๐จ๐ป", "long": "Cape Verde" },
  { "short": "CW", "em": "๐จ๐ผ", "long": "Curaรงao" },
  { "short": "CX", "em": "๐จ๐ฝ", "long": "Christmas Island" },
  { "short": "CY", "em": "๐จ๐พ", "long": "Cyprus" },
  { "short": "CZ", "em": "๐จ๐ฟ", "long": "Czech Republic" },
  { "short": "DE", "em": "๐ฉ๐ช", "long": "Germany" },
  { "short": "DJ", "em": "๐ฉ๐ฏ", "long": "Djibouti" },
  { "short": "DK", "em": "๐ฉ๐ฐ", "long": "Denmark" },
  { "short": "DM", "em": "๐ฉ๐ฒ", "long": "Dominica" },
  { "short": "DO", "em": "๐ฉ๐ด", "long": "Dominican Republic" },
  { "short": "DZ", "em": "๐ฉ๐ฟ", "long": "Algeria" },
  { "short": "EC", "em": "๐ช๐จ", "long": "Ecuador" },
  { "short": "EE", "em": "๐ช๐ช", "long": "Estonia" },
  { "short": "EG", "em": "๐ช๐ฌ", "long": "Egypt" },
  { "short": "EH", "em": "๐ช๐ญ", "long": "Western Sahara" },
  { "short": "ER", "em": "๐ช๐ท", "long": "Eritrea" },
  { "short": "ES", "em": "๐ช๐ธ", "long": "Spain" },
  { "short": "ET", "em": "๐ช๐น", "long": "Ethiopia" },
  { "short": "FI", "em": "๐ซ๐ฎ", "long": "Finland" },
  { "short": "FJ", "em": "๐ซ๐ฏ", "long": "Fiji" },
  { "short": "FK", "em": "๐ซ๐ฐ", "long": "Falkland Islands (Malvinas)" },
  { "short": "FM", "em": "๐ซ๐ฒ", "long": "Micronesia" },
  { "short": "FO", "em": "๐ซ๐ด", "long": "Faroe Islands" },
  { "short": "FR", "em": "๐ซ๐ท", "long": "France" },
  { "short": "GA", "em": "๐ฌ๐ฆ", "long": "Gabon" },
  { "short": "GB", "em": "๐ฌ๐ง", "long": "United Kingdom" },
  { "short": "GD", "em": "๐ฌ๐ฉ", "long": "Grenada" },
  { "short": "GE", "em": "๐ฌ๐ช", "long": "Georgia" },
  { "short": "GF", "em": "๐ฌ๐ซ", "long": "French Guiana" },
  { "short": "GG", "em": "๐ฌ๐ฌ", "long": "Guernsey" },
  { "short": "GH", "em": "๐ฌ๐ญ", "long": "Ghana" },
  { "short": "GI", "em": "๐ฌ๐ฎ", "long": "Gibraltar" },
  { "short": "GL", "em": "๐ฌ๐ฑ", "long": "Greenland" },
  { "short": "GM", "em": "๐ฌ๐ฒ", "long": "Gambia" },
  { "short": "GN", "em": "๐ฌ๐ณ", "long": "Guinea" },
  { "short": "GP", "em": "๐ฌ๐ต", "long": "Guadeloupe" },
  { "short": "GQ", "em": "๐ฌ๐ถ", "long": "Equatorial Guinea" },
  { "short": "GR", "em": "๐ฌ๐ท", "long": "Greece" },
  { "short": "GS", "em": "๐ฌ๐ธ", "long": "South Georgia" },
  { "short": "GT", "em": "๐ฌ๐น", "long": "Guatemala" },
  { "short": "GU", "em": "๐ฌ๐บ", "long": "Guam" },
  { "short": "GW", "em": "๐ฌ๐ผ", "long": "Guinea-Bissau" },
  { "short": "GY", "em": "๐ฌ๐พ", "long": "Guyana" },
  { "short": "HK", "em": "๐ญ๐ฐ", "long": "Hong Kong" },
  { "short": "HM", "em": "๐ญ๐ฒ", "long": "Heard Island and Mcdonald Islands" },
  { "short": "HN", "em": "๐ญ๐ณ", "long": "Honduras" },
  { "short": "HR", "em": "๐ญ๐ท", "long": "Croatia" },
  { "short": "HT", "em": "๐ญ๐น", "long": "Haiti" },
  { "short": "HU", "em": "๐ญ๐บ", "long": "Hungary" },
  { "short": "ID", "em": "๐ฎ๐ฉ", "long": "Indonesia" },
  { "short": "IE", "em": "๐ฎ๐ช", "long": "Ireland" },
  { "short": "IL", "em": "๐ฎ๐ฑ", "long": "Israel" },
  { "short": "IM", "em": "๐ฎ๐ฒ", "long": "Isle of Man" },
  { "short": "IN", "em": "๐ฎ๐ณ", "long": "India" },
  { "short": "IO", "em": "๐ฎ๐ด", "long": "British Indian Ocean Territory" },
  { "short": "IQ", "em": "๐ฎ๐ถ", "long": "Iraq" },
  { "short": "IR", "em": "๐ฎ๐ท", "long": "Iran" },
  { "short": "IS", "em": "๐ฎ๐ธ", "long": "Iceland" },
  { "short": "IT", "em": "๐ฎ๐น", "long": "Italy" },
  { "short": "JE", "em": "๐ฏ๐ช", "long": "Jersey" },
  { "short": "JM", "em": "๐ฏ๐ฒ", "long": "Jamaica" },
  { "short": "JO", "em": "๐ฏ๐ด", "long": "Jordan" },
  { "short": "JP", "em": "๐ฏ๐ต", "long": "Japan" },
  { "short": "KE", "em": "๐ฐ๐ช", "long": "Kenya" },
  { "short": "KG", "em": "๐ฐ๐ฌ", "long": "Kyrgyzstan" },
  { "short": "KH", "em": "๐ฐ๐ญ", "long": "Cambodia" },
  { "short": "KI", "em": "๐ฐ๐ฎ", "long": "Kiribati" },
  { "short": "KM", "em": "๐ฐ๐ฒ", "long": "Comoros" },
  { "short": "KN", "em": "๐ฐ๐ณ", "long": "Saint Kitts and Nevis" },
  { "short": "KP", "em": "๐ฐ๐ต", "long": "North Korea" },
  { "short": "KR", "em": "๐ฐ๐ท", "long": "South Korea" },
  { "short": "KW", "em": "๐ฐ๐ผ", "long": "Kuwait" },
  { "short": "KY", "em": "๐ฐ๐พ", "long": "Cayman Islands" },
  { "short": "KZ", "em": "๐ฐ๐ฟ", "long": "Kazakhstan" },
  { "short": "LA", "em": "๐ฑ๐ฆ", "long": "Lao People's Democratic Republic" },
  { "short": "LB", "em": "๐ฑ๐ง", "long": "Lebanon" },
  { "short": "LC", "em": "๐ฑ๐จ", "long": "Saint Lucia" },
  { "short": "LI", "em": "๐ฑ๐ฎ", "long": "Liechtenstein" },
  { "short": "LK", "em": "๐ฑ๐ฐ", "long": "Sri Lanka" },
  { "short": "LR", "em": "๐ฑ๐ท", "long": "Liberia" },
  { "short": "LS", "em": "๐ฑ๐ธ", "long": "Lesotho" },
  { "short": "LT", "em": "๐ฑ๐น", "long": "Lithuania" },
  { "short": "LU", "em": "๐ฑ๐บ", "long": "Luxembourg" },
  { "short": "LV", "em": "๐ฑ๐ป", "long": "Latvia" },
  { "short": "LY", "em": "๐ฑ๐พ", "long": "Libya" },
  { "short": "MA", "em": "๐ฒ๐ฆ", "long": "Morocco" },
  { "short": "MC", "em": "๐ฒ๐จ", "long": "Monaco" },
  { "short": "MD", "em": "๐ฒ๐ฉ", "long": "Moldova" },
  { "short": "ME", "em": "๐ฒ๐ช", "long": "Montenegro" },
  { "short": "MF", "em": "๐ฒ๐ซ", "long": "Saint Martin (French Part)" },
  { "short": "MG", "em": "๐ฒ๐ฌ", "long": "Madagascar" },
  { "short": "MH", "em": "๐ฒ๐ญ", "long": "Marshall Islands" },
  { "short": "MK", "em": "๐ฒ๐ฐ", "long": "Macedonia" },
  { "short": "ML", "em": "๐ฒ๐ฑ", "long": "Mali" },
  { "short": "MM", "em": "๐ฒ๐ฒ", "long": "Myanmar" },
  { "short": "MN", "em": "๐ฒ๐ณ", "long": "Mongolia" },
  { "short": "MO", "em": "๐ฒ๐ด", "long": "Macao" },
  { "short": "MP", "em": "๐ฒ๐ต", "long": "Northern Mariana Islands" },
  { "short": "MQ", "em": "๐ฒ๐ถ", "long": "Martinique" },
  { "short": "MR", "em": "๐ฒ๐ท", "long": "Mauritania" },
  { "short": "MS", "em": "๐ฒ๐ธ", "long": "Montserrat" },
  { "short": "MT", "em": "๐ฒ๐น", "long": "Malta" },
  { "short": "MU", "em": "๐ฒ๐บ", "long": "Mauritius" },
  { "short": "MV", "em": "๐ฒ๐ป", "long": "Maldives" },
  { "short": "MW", "em": "๐ฒ๐ผ", "long": "Malawi" },
  { "short": "MX", "em": "๐ฒ๐ฝ", "long": "Mexico" },
  { "short": "MY", "em": "๐ฒ๐พ", "long": "Malaysia" },
  { "short": "MZ", "em": "๐ฒ๐ฟ", "long": "Mozambique" },
  { "short": "NA", "em": "๐ณ๐ฆ", "long": "Namibia" },
  { "short": "NC", "em": "๐ณ๐จ", "long": "New Caledonia" },
  { "short": "NE", "em": "๐ณ๐ช", "long": "Niger" },
  { "short": "NF", "em": "๐ณ๐ซ", "long": "Norfolk Island" },
  { "short": "NG", "em": "๐ณ๐ฌ", "long": "Nigeria" },
  { "short": "NI", "em": "๐ณ๐ฎ", "long": "Nicaragua" },
  { "short": "NL", "em": "๐ณ๐ฑ", "long": "Netherlands" },
  { "short": "NO", "em": "๐ณ๐ด", "long": "Norway" },
  { "short": "NP", "em": "๐ณ๐ต", "long": "Nepal" },
  { "short": "NR", "em": "๐ณ๐ท", "long": "Nauru" },
  { "short": "NU", "em": "๐ณ๐บ", "long": "Niue" },
  { "short": "NZ", "em": "๐ณ๐ฟ", "long": "New Zealand" },
  { "short": "OM", "em": "๐ด๐ฒ", "long": "Oman" },
  { "short": "PA", "em": "๐ต๐ฆ", "long": "Panama" },
  { "short": "PE", "em": "๐ต๐ช", "long": "Peru" },
  { "short": "PF", "em": "๐ต๐ซ", "long": "French Polynesia" },
  { "short": "PG", "em": "๐ต๐ฌ", "long": "Papua New Guinea" },
  { "short": "PH", "em": "๐ต๐ญ", "long": "Philippines" },
  { "short": "PK", "em": "๐ต๐ฐ", "long": "Pakistan" },
  { "short": "PL", "em": "๐ต๐ฑ", "long": "Poland" },
  { "short": "PM", "em": "๐ต๐ฒ", "long": "Saint Pierre and Miquelon" },
  { "short": "PN", "em": "๐ต๐ณ", "long": "Pitcairn" },
  { "short": "PR", "em": "๐ต๐ท", "long": "Puerto Rico" },
  { "short": "PS", "em": "๐ต๐ธ", "long": "Palestinian Territory" },
  { "short": "PT", "em": "๐ต๐น", "long": "Portugal" },
  { "short": "PW", "em": "๐ต๐ผ", "long": "Palau" },
  { "short": "PY", "em": "๐ต๐พ", "long": "Paraguay" },
  { "short": "QA", "em": "๐ถ๐ฆ", "long": "Qatar" },
  { "short": "RE", "em": "๐ท๐ช", "long": "Rรฉunion" },
  { "short": "RO", "em": "๐ท๐ด", "long": "Romania" },
  { "short": "RS", "em": "๐ท๐ธ", "long": "Serbia" },
  { "short": "RU", "em": "๐ท๐บ", "long": "Russia" },
  { "short": "RW", "em": "๐ท๐ผ", "long": "Rwanda" },
  { "short": "SA", "em": "๐ธ๐ฆ", "long": "Saudi Arabia" },
  { "short": "SB", "em": "๐ธ๐ง", "long": "Solomon Islands" },
  { "short": "SC", "em": "๐ธ๐จ", "long": "Seychelles" },
  { "short": "SD", "em": "๐ธ๐ฉ", "long": "Sudan" },
  { "short": "SE", "em": "๐ธ๐ช", "long": "Sweden" },
  { "short": "SG", "em": "๐ธ๐ฌ", "long": "Singapore" },
  { "short": "SH", "em": "๐ธ๐ญ", "long": "Saint Helena Ascension and Tristan Da Cunha" },
  { "short": "SI", "em": "๐ธ๐ฎ", "long": "Slovenia" },
  { "short": "SJ", "em": "๐ธ๐ฏ", "long": "Svalbard and Jan Mayen" },
  { "short": "SK", "em": "๐ธ๐ฐ", "long": "Slovakia" },
  { "short": "SL", "em": "๐ธ๐ฑ", "long": "Sierra Leone" },
  { "short": "SM", "em": "๐ธ๐ฒ", "long": "San Marino" },
  { "short": "SN", "em": "๐ธ๐ณ", "long": "Senegal" },
  { "short": "SO", "em": "๐ธ๐ด", "long": "Somalia" },
  { "short": "SR", "em": "๐ธ๐ท", "long": "Suriname" },
  { "short": "SS", "em": "๐ธ๐ธ", "long": "South Sudan" },
  { "short": "ST", "em": "๐ธ๐น", "long": "Sao Tome and Principe" },
  { "short": "SV", "em": "๐ธ๐ป", "long": "El Salvador" },
  { "short": "SX", "em": "๐ธ๐ฝ", "long": "Sint Maarten (Dutch Part)" },
  { "short": "SY", "em": "๐ธ๐พ", "long": "Syrian Arab Republic" },
  { "short": "SZ", "em": "๐ธ๐ฟ", "long": "Swaziland" },
  { "short": "TC", "em": "๐น๐จ", "long": "Turks and Caicos Islands" },
  { "short": "TD", "em": "๐น๐ฉ", "long": "Chad" },
  { "short": "TF", "em": "๐น๐ซ", "long": "French Southern Territories" },
  { "short": "TG", "em": "๐น๐ฌ", "long": "Togo" },
  { "short": "TH", "em": "๐น๐ญ", "long": "Thailand" },
  { "short": "TJ", "em": "๐น๐ฏ", "long": "Tajikistan" },
  { "short": "TK", "em": "๐น๐ฐ", "long": "Tokelau" },
  { "short": "TL", "em": "๐น๐ฑ", "long": "Timor-Leste" },
  { "short": "TM", "em": "๐น๐ฒ", "long": "Turkmenistan" },
  { "short": "TN", "em": "๐น๐ณ", "long": "Tunisia" },
  { "short": "TO", "em": "๐น๐ด", "long": "Tonga" },
  { "short": "TR", "em": "๐น๐ท", "long": "Turkey" },
  { "short": "TT", "em": "๐น๐น", "long": "Trinidad and Tobago" },
  { "short": "TV", "em": "๐น๐ป", "long": "Tuvalu" },
  { "short": "TW", "em": "๐น๐ผ", "long": "Taiwan" },
  { "short": "TZ", "em": "๐น๐ฟ", "long": "Tanzania" },
  { "short": "UA", "em": "๐บ๐ฆ", "long": "Ukraine" },
  { "short": "UG", "em": "๐บ๐ฌ", "long": "Uganda" },
  { "short": "UM", "em": "๐บ๐ฒ", "long": "United States Minor Outlying Islands" },
  { "short": "US", "em": "๐บ๐ธ", "long": "United States" },
  { "short": "UY", "em": "๐บ๐พ", "long": "Uruguay" },
  { "short": "UZ", "em": "๐บ๐ฟ", "long": "Uzbekistan" },
  { "short": "VA", "em": "๐ป๐ฆ", "long": "Vatican City" },
  { "short": "VC", "em": "๐ป๐จ", "long": "Saint Vincent and The Grenadines" },
  { "short": "VE", "em": "๐ป๐ช", "long": "Venezuela" },
  { "short": "VG", "em": "๐ป๐ฌ", "long": "Virgin Islands British" },
  { "short": "VI", "em": "๐ป๐ฎ", "long": "Virgin Islands U.S." },
  { "short": "VN", "em": "๐ป๐ณ", "long": "Viet Nam" },
  { "short": "VU", "em": "๐ป๐บ", "long": "Vanuatu" },
  { "short": "WF", "em": "๐ผ๐ซ", "long": "Wallis and Futuna" },
  { "short": "WS", "em": "๐ผ๐ธ", "long": "Samoa" },
  { "short": "YE", "em": "๐พ๐ช", "long": "Yemen" },
  { "short": "YT", "em": "๐พ๐น", "long": "Mayotte" },
  { "short": "ZA", "em": "๐ฟ๐ฆ", "long": "South Africa" },
  { "short": "ZM", "em": "๐ฟ๐ฒ", "long": "Zambia" },
  { "short": "ZW", "em": "๐ฟ๐ผ", "long": "Zimbabwe" }
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

