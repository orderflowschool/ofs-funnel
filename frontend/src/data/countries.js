/**
 * Country classification for lead qualification.
 * Tier 1 countries always proceed. All others require $2,500+ budget
 * AND must meet every other criterion (committed, ready, timezone, call).
 */

export const TIER1_COUNTRIES = new Set([
  // North America
  'United States', 'Canada',
  // Western & Northern Europe
  'United Kingdom', 'Germany', 'France', 'Netherlands', 'Belgium', 'Luxembourg',
  'Switzerland', 'Austria', 'Ireland', 'Denmark', 'Sweden', 'Norway', 'Finland', 'Iceland',
  // Southern Europe
  'Spain', 'Italy', 'Portugal',
  // Oceania
  'Australia', 'New Zealand',
  // East Asia
  'Japan', 'South Korea', 'Singapore', 'Hong Kong', 'Taiwan',
  // Middle East (high-income)
  'United Arab Emirates', 'Qatar', 'Kuwait', 'Saudi Arabia', 'Bahrain', 'Israel',
]);

export const ALL_COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize',
  'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil',
  'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
  'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad',
  'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba',
  'Cyprus', 'Czech Republic',
  'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia',
  'Eswatini', 'Ethiopia',
  'Fiji', 'Finland', 'France',
  'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala',
  'Guinea', 'Guinea-Bissau', 'Guyana',
  'Haiti', 'Honduras', 'Hong Kong', 'Hungary',
  'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Jamaica', 'Japan', 'Jordan',
  'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
  'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein',
  'Lithuania', 'Luxembourg',
  'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands',
  'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia',
  'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
  'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger',
  'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
  'Oman',
  'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru',
  'Philippines', 'Poland', 'Portugal',
  'Qatar',
  'Romania', 'Russia', 'Rwanda',
  'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa',
  'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia',
  'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
  'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan',
  'Suriname', 'Sweden', 'Switzerland', 'Syria',
  'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga',
  'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
  'Uruguay', 'Uzbekistan',
  'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
  'Yemen',
  'Zambia', 'Zimbabwe',
];

export const isTier1Country = (country) => TIER1_COUNTRIES.has(country);

export const HIGH_BUDGET = new Set(['$2,500-$4,000', '$4,000+']);

export const isCountryBudgetDisqualified = (country, investment) => {
  if (!country || isTier1Country(country)) return false;
  if (!investment) return false;
  return !HIGH_BUDGET.has(investment);
};

// Countries where English is the primary/native language
export const ENGLISH_PRIMARY_COUNTRIES = new Set([
  'United States', 'Canada', 'United Kingdom', 'Ireland',
  'Australia', 'New Zealand',
  'Jamaica', 'Trinidad and Tobago', 'Barbados', 'Bahamas', 'Guyana', 'Belize',
  'Antigua and Barbuda', 'Dominica', 'Grenada',
  'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
]);

export const isEnglishPrimaryCountry = (country) =>
  !country || ENGLISH_PRIMARY_COUNTRIES.has(country);

/**
 * ISO 3166-1 alpha-2 codes for the most commonly-selected countries.
 * Falls back to `null` for anything not in this table — the UI is expected
 * to still submit the country name string.
 */
export const COUNTRY_ISO = {
  'United States': 'US', 'Canada': 'CA', 'Mexico': 'MX',
  'United Kingdom': 'GB', 'Ireland': 'IE', 'Germany': 'DE', 'France': 'FR',
  'Netherlands': 'NL', 'Belgium': 'BE', 'Luxembourg': 'LU', 'Switzerland': 'CH',
  'Austria': 'AT', 'Denmark': 'DK', 'Sweden': 'SE', 'Norway': 'NO', 'Finland': 'FI',
  'Iceland': 'IS', 'Spain': 'ES', 'Italy': 'IT', 'Portugal': 'PT',
  'Greece': 'GR', 'Poland': 'PL', 'Czech Republic': 'CZ', 'Slovakia': 'SK',
  'Hungary': 'HU', 'Romania': 'RO', 'Bulgaria': 'BG', 'Croatia': 'HR',
  'Slovenia': 'SI', 'Estonia': 'EE', 'Latvia': 'LV', 'Lithuania': 'LT',
  'Ukraine': 'UA', 'Russia': 'RU', 'Turkey': 'TR', 'Serbia': 'RS',
  'Australia': 'AU', 'New Zealand': 'NZ',
  'Japan': 'JP', 'South Korea': 'KR', 'Singapore': 'SG', 'Hong Kong': 'HK',
  'Taiwan': 'TW', 'China': 'CN', 'India': 'IN', 'Indonesia': 'ID', 'Malaysia': 'MY',
  'Thailand': 'TH', 'Vietnam': 'VN', 'Philippines': 'PH', 'Pakistan': 'PK',
  'Bangladesh': 'BD', 'Sri Lanka': 'LK',
  'United Arab Emirates': 'AE', 'Saudi Arabia': 'SA', 'Qatar': 'QA', 'Kuwait': 'KW',
  'Bahrain': 'BH', 'Oman': 'OM', 'Israel': 'IL', 'Jordan': 'JO',
  'Lebanon': 'LB', 'Egypt': 'EG', 'Morocco': 'MA',
  'South Africa': 'ZA', 'Nigeria': 'NG', 'Kenya': 'KE', 'Ghana': 'GH',
  'Ethiopia': 'ET', 'Uganda': 'UG', 'Tanzania': 'TZ',
  'Brazil': 'BR', 'Argentina': 'AR', 'Chile': 'CL', 'Colombia': 'CO', 'Peru': 'PE',
  'Uruguay': 'UY', 'Paraguay': 'PY', 'Ecuador': 'EC', 'Venezuela': 'VE',
  'Costa Rica': 'CR', 'Panama': 'PA', 'Dominican Republic': 'DO',
  'Jamaica': 'JM', 'Trinidad and Tobago': 'TT', 'Barbados': 'BB', 'Bahamas': 'BS',
};

export const isoForCountry = (country) => COUNTRY_ISO[country] || null;

