function shouldBe(actual, expected) {
    if (actual !== expected)
        throw new Error(`expected ${expected} but got ${actual}`);
}

function shouldThrow(func, errorType) {
    let error;
    try {
        func();
    } catch (e) {
        error = e;
    }

    if (!(error instanceof errorType))
        throw new Error(`Expected ${errorType.name}!`);
}

let calendars = Intl.supportedValuesOf("calendar");
shouldBe(JSON.stringify(calendars), `["buddhist","chinese","coptic","dangi","ethioaa","ethiopic","gregory","hebrew","indian","islamic","islamic-civil","islamic-rgsa","islamic-tbla","islamic-umalqura","iso8601","japanese","persian","roc"]`);

let collations = Intl.supportedValuesOf("collation");
shouldBe(JSON.stringify(collations), `["big5han","compat","dict","emoji","eor","gb2312","phonebk","phonetic","pinyin","reformed","searchjl","stroke","trad","unihan","zhuyin"]`);

let currencies = Intl.supportedValuesOf("currency");
shouldBe(JSON.stringify(currencies), `["ADP","AED","AFA","AFN","ALK","ALL","AMD","ANG","AOA","AOK","AON","AOR","ARA","ARL","ARM","ARP","ARS","ATS","AUD","AWG","AZM","AZN","BAD","BAM","BAN","BBD","BDT","BEC","BEF","BEL","BGL","BGM","BGN","BGO","BHD","BIF","BMD","BND","BOB","BOL","BOP","BOV","BRB","BRC","BRE","BRL","BRN","BRR","BRZ","BSD","BTN","BUK","BWP","BYB","BYN","BYR","BZD","CAD","CDF","CHE","CHF","CHW","CLE","CLF","CLP","CNH","CNX","CNY","COP","COU","CRC","CSD","CSK","CUC","CUP","CVE","CYP","CZK","DDM","DEM","DJF","DKK","DOP","DZD","ECS","ECV","EEK","EGP","ERN","ESA","ESB","ESP","ETB","EUR","FIM","FJD","FKP","FRF","GBP","GEK","GEL","GHC","GHS","GIP","GMD","GNF","GNS","GQE","GRD","GTQ","GWE","GWP","GYD","HKD","HNL","HRD","HRK","HTG","HUF","IDR","IEP","ILP","ILR","ILS","INR","IQD","IRR","ISJ","ISK","ITL","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRH","KRO","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LTL","LTT","LUC","LUF","LUL","LVL","LVR","LYD","MAD","MAF","MCF","MDC","MDL","MGA","MGF","MKD","MKN","MLF","MMK","MNT","MOP","MRO","MRU","MTL","MTP","MUR","MVP","MVR","MWK","MXN","MXP","MXV","MYR","MZE","MZM","MZN","NAD","NGN","NIC","NIO","NLG","NOK","NPR","NZD","OMR","PAB","PEI","PEN","PES","PGK","PHP","PKR","PLN","PLZ","PTE","PYG","QAR","RHD","ROL","RON","RSD","RUB","RUR","RWF","SAR","SBD","SCR","SDD","SDG","SDP","SEK","SGD","SHP","SIT","SKK","SLL","SOS","SRD","SRG","SSP","STD","STN","SUR","SVC","SYP","SZL","THB","TJR","TJS","TMM","TMT","TND","TOP","TPE","TRL","TRY","TTD","TWD","TZS","UAH","UAK","UGS","UGX","USD","USN","USS","UYI","UYP","UYU","UYW","UZS","VEB","VEF","VES","VND","VNN","VUV","WST","XAF","XAG","XAU","XBA","XBB","XBC","XBD","XCD","XDR","XEU","XFO","XFU","XOF","XPD","XPF","XPT","XRE","XSU","XTS","XUA","XXX","YDD","YER","YUD","YUM","YUN","YUR","ZAL","ZAR","ZMK","ZMW","ZRN","ZRZ","ZWD","ZWL","ZWR"]`);

let numberingSystems = Intl.supportedValuesOf("numberingSystem");
let numberingSystemsString = JSON.stringify(numberingSystems);
let ns1 = `["adlm","ahom","arab","arabext","bali","beng","bhks","brah","cakm","cham","deva","diak","fullwide","gong","gonm","gujr","guru","hanidec","hmng","hmnp","java","kali","khmr","knda","lana","lanatham","laoo","latn","lepc","limb","mathbold","mathdbl","mathmono","mathsanb","mathsans","mlym","modi","mong","mroo","mtei","mymr","mymrshan","mymrtlng","newa","nkoo","olck","orya","osma","rohg","saur","segment","shrd","sind","sinh","sora","sund","takr","talu","tamldec","telu","thai","tibt","tirh","vaii","wara","wcho"]`;
let ns2 = `["adlm","ahom","arab","arabext","bali","beng","bhks","brah","cakm","cham","deva","fullwide","gong","gonm","gujr","guru","hanidec","hmng","hmnp","java","kali","khmr","knda","lana","lanatham","laoo","latn","lepc","limb","mathbold","mathdbl","mathmono","mathsanb","mathsans","mlym","modi","mong","mroo","mtei","mymr","mymrshan","mymrtlng","newa","nkoo","olck","orya","osma","rohg","saur","shrd","sind","sinh","sora","sund","takr","talu","tamldec","telu","thai","tibt","tirh","vaii","wara","wcho"]`;
let ns3 = `["adlm","ahom","arab","arabext","bali","beng","bhks","brah","cakm","cham","deva","diak","fullwide","gong","gonm","gujr","guru","hanidec","hmng","hmnp","java","kali","khmr","knda","lana","lanatham","laoo","latn","lepc","limb","mathbold","mathdbl","mathmono","mathsanb","mathsans","mlym","modi","mong","mroo","mtei","mymr","mymrshan","mymrtlng","newa","nkoo","olck","orya","osma","rohg","saur","segment","shrd","sind","sinh","sora","sund","takr","talu","tamldec","telu","thai","tibt","tirh","tnsa","vaii","wara","wcho"]`; // ICU 70 adds "tnsa".
shouldBe(numberingSystemsString === ns1 || numberingSystemsString === ns2 || numberingSystemsString === ns3, true);

let timeZones = Intl.supportedValuesOf("timeZone");
shouldBe(JSON.stringify(timeZones), `["Africa/Abidjan","Africa/Accra","Africa/Addis_Ababa","Africa/Algiers","Africa/Asmera","Africa/Bamako","Africa/Bangui","Africa/Banjul","Africa/Bissau","Africa/Blantyre","Africa/Brazzaville","Africa/Bujumbura","Africa/Cairo","Africa/Casablanca","Africa/Ceuta","Africa/Conakry","Africa/Dakar","Africa/Dar_es_Salaam","Africa/Djibouti","Africa/Douala","Africa/El_Aaiun","Africa/Freetown","Africa/Gaborone","Africa/Harare","Africa/Johannesburg","Africa/Juba","Africa/Kampala","Africa/Khartoum","Africa/Kigali","Africa/Kinshasa","Africa/Lagos","Africa/Libreville","Africa/Lome","Africa/Luanda","Africa/Lubumbashi","Africa/Lusaka","Africa/Malabo","Africa/Maputo","Africa/Maseru","Africa/Mbabane","Africa/Mogadishu","Africa/Monrovia","Africa/Nairobi","Africa/Ndjamena","Africa/Niamey","Africa/Nouakchott","Africa/Ouagadougou","Africa/Porto-Novo","Africa/Sao_Tome","Africa/Tripoli","Africa/Tunis","Africa/Windhoek","America/Adak","America/Anchorage","America/Anguilla","America/Antigua","America/Araguaina","America/Argentina/La_Rioja","America/Argentina/Rio_Gallegos","America/Argentina/Salta","America/Argentina/San_Juan","America/Argentina/San_Luis","America/Argentina/Tucuman","America/Argentina/Ushuaia","America/Aruba","America/Asuncion","America/Bahia","America/Bahia_Banderas","America/Barbados","America/Belem","America/Belize","America/Blanc-Sablon","America/Boa_Vista","America/Bogota","America/Boise","America/Buenos_Aires","America/Cambridge_Bay","America/Campo_Grande","America/Cancun","America/Caracas","America/Catamarca","America/Cayenne","America/Cayman","America/Chicago","America/Chihuahua","America/Coral_Harbour","America/Cordoba","America/Costa_Rica","America/Creston","America/Cuiaba","America/Curacao","America/Danmarkshavn","America/Dawson","America/Dawson_Creek","America/Denver","America/Detroit","America/Dominica","America/Edmonton","America/Eirunepe","America/El_Salvador","America/Fort_Nelson","America/Fortaleza","America/Glace_Bay","America/Godthab","America/Goose_Bay","America/Grand_Turk","America/Grenada","America/Guadeloupe","America/Guatemala","America/Guayaquil","America/Guyana","America/Halifax","America/Havana","America/Hermosillo","America/Indiana/Knox","America/Indiana/Marengo","America/Indiana/Petersburg","America/Indiana/Tell_City","America/Indiana/Vevay","America/Indiana/Vincennes","America/Indiana/Winamac","America/Indianapolis","America/Inuvik","America/Iqaluit","America/Jamaica","America/Jujuy","America/Juneau","America/Kentucky/Monticello","America/Kralendijk","America/La_Paz","America/Lima","America/Los_Angeles","America/Louisville","America/Lower_Princes","America/Maceio","America/Managua","America/Manaus","America/Marigot","America/Martinique","America/Matamoros","America/Mazatlan","America/Mendoza","America/Menominee","America/Merida","America/Metlakatla","America/Mexico_City","America/Miquelon","America/Moncton","America/Monterrey","America/Montevideo","America/Montreal","America/Montserrat","America/Nassau","America/New_York","America/Nipigon","America/Nome","America/Noronha","America/North_Dakota/Beulah","America/North_Dakota/Center","America/North_Dakota/New_Salem","America/Ojinaga","America/Panama","America/Pangnirtung","America/Paramaribo","America/Phoenix","America/Port-au-Prince","America/Port_of_Spain","America/Porto_Velho","America/Puerto_Rico","America/Punta_Arenas","America/Rainy_River","America/Rankin_Inlet","America/Recife","America/Regina","America/Resolute","America/Rio_Branco","America/Santa_Isabel","America/Santarem","America/Santiago","America/Santo_Domingo","America/Sao_Paulo","America/Scoresbysund","America/Sitka","America/St_Barthelemy","America/St_Johns","America/St_Kitts","America/St_Lucia","America/St_Thomas","America/St_Vincent","America/Swift_Current","America/Tegucigalpa","America/Thule","America/Thunder_Bay","America/Tijuana","America/Toronto","America/Tortola","America/Vancouver","America/Whitehorse","America/Winnipeg","America/Yakutat","America/Yellowknife","Antarctica/Casey","Antarctica/Davis","Antarctica/DumontDUrville","Antarctica/Macquarie","Antarctica/Mawson","Antarctica/McMurdo","Antarctica/Palmer","Antarctica/Rothera","Antarctica/Syowa","Antarctica/Troll","Antarctica/Vostok","Arctic/Longyearbyen","Asia/Aden","Asia/Almaty","Asia/Amman","Asia/Anadyr","Asia/Aqtau","Asia/Aqtobe","Asia/Ashgabat","Asia/Atyrau","Asia/Baghdad","Asia/Bahrain","Asia/Baku","Asia/Bangkok","Asia/Barnaul","Asia/Beirut","Asia/Bishkek","Asia/Brunei","Asia/Calcutta","Asia/Chita","Asia/Choibalsan","Asia/Colombo","Asia/Damascus","Asia/Dhaka","Asia/Dili","Asia/Dubai","Asia/Dushanbe","Asia/Famagusta","Asia/Gaza","Asia/Hebron","Asia/Hong_Kong","Asia/Hovd","Asia/Irkutsk","Asia/Jakarta","Asia/Jayapura","Asia/Jerusalem","Asia/Kabul","Asia/Kamchatka","Asia/Karachi","Asia/Katmandu","Asia/Khandyga","Asia/Krasnoyarsk","Asia/Kuala_Lumpur","Asia/Kuching","Asia/Kuwait","Asia/Macau","Asia/Magadan","Asia/Makassar","Asia/Manila","Asia/Muscat","Asia/Nicosia","Asia/Novokuznetsk","Asia/Novosibirsk","Asia/Omsk","Asia/Oral","Asia/Phnom_Penh","Asia/Pontianak","Asia/Pyongyang","Asia/Qatar","Asia/Qostanay","Asia/Qyzylorda","Asia/Rangoon","Asia/Riyadh","Asia/Saigon","Asia/Sakhalin","Asia/Samarkand","Asia/Seoul","Asia/Shanghai","Asia/Singapore","Asia/Srednekolymsk","Asia/Taipei","Asia/Tashkent","Asia/Tbilisi","Asia/Tehran","Asia/Thimphu","Asia/Tokyo","Asia/Tomsk","Asia/Ulaanbaatar","Asia/Urumqi","Asia/Ust-Nera","Asia/Vientiane","Asia/Vladivostok","Asia/Yakutsk","Asia/Yekaterinburg","Asia/Yerevan","Atlantic/Azores","Atlantic/Bermuda","Atlantic/Canary","Atlantic/Cape_Verde","Atlantic/Faeroe","Atlantic/Madeira","Atlantic/Reykjavik","Atlantic/South_Georgia","Atlantic/St_Helena","Atlantic/Stanley","Australia/Adelaide","Australia/Brisbane","Australia/Broken_Hill","Australia/Currie","Australia/Darwin","Australia/Eucla","Australia/Hobart","Australia/Lindeman","Australia/Lord_Howe","Australia/Melbourne","Australia/Perth","Australia/Sydney","Europe/Amsterdam","Europe/Andorra","Europe/Astrakhan","Europe/Athens","Europe/Belgrade","Europe/Berlin","Europe/Bratislava","Europe/Brussels","Europe/Bucharest","Europe/Budapest","Europe/Busingen","Europe/Chisinau","Europe/Copenhagen","Europe/Dublin","Europe/Gibraltar","Europe/Guernsey","Europe/Helsinki","Europe/Isle_of_Man","Europe/Istanbul","Europe/Jersey","Europe/Kaliningrad","Europe/Kiev","Europe/Kirov","Europe/Lisbon","Europe/Ljubljana","Europe/London","Europe/Luxembourg","Europe/Madrid","Europe/Malta","Europe/Mariehamn","Europe/Minsk","Europe/Monaco","Europe/Moscow","Europe/Oslo","Europe/Paris","Europe/Podgorica","Europe/Prague","Europe/Riga","Europe/Rome","Europe/Samara","Europe/San_Marino","Europe/Sarajevo","Europe/Saratov","Europe/Simferopol","Europe/Skopje","Europe/Sofia","Europe/Stockholm","Europe/Tallinn","Europe/Tirane","Europe/Ulyanovsk","Europe/Uzhgorod","Europe/Vaduz","Europe/Vatican","Europe/Vienna","Europe/Vilnius","Europe/Volgograd","Europe/Warsaw","Europe/Zagreb","Europe/Zaporozhye","Europe/Zurich","Indian/Antananarivo","Indian/Chagos","Indian/Christmas","Indian/Cocos","Indian/Comoro","Indian/Kerguelen","Indian/Mahe","Indian/Maldives","Indian/Mauritius","Indian/Mayotte","Indian/Reunion","Pacific/Apia","Pacific/Auckland","Pacific/Bougainville","Pacific/Chatham","Pacific/Easter","Pacific/Efate","Pacific/Enderbury","Pacific/Fakaofo","Pacific/Fiji","Pacific/Funafuti","Pacific/Galapagos","Pacific/Gambier","Pacific/Guadalcanal","Pacific/Guam","Pacific/Honolulu","Pacific/Johnston","Pacific/Kiritimati","Pacific/Kosrae","Pacific/Kwajalein","Pacific/Majuro","Pacific/Marquesas","Pacific/Midway","Pacific/Nauru","Pacific/Niue","Pacific/Norfolk","Pacific/Noumea","Pacific/Pago_Pago","Pacific/Palau","Pacific/Pitcairn","Pacific/Ponape","Pacific/Port_Moresby","Pacific/Rarotonga","Pacific/Saipan","Pacific/Tahiti","Pacific/Tarawa","Pacific/Tongatapu","Pacific/Truk","Pacific/Wake","Pacific/Wallis","UTC"]`);

let units = Intl.supportedValuesOf("unit");
shouldBe(JSON.stringify(units), `["acre","bit","byte","celsius","centimeter","day","degree","fahrenheit","fluid-ounce","foot","gallon","gigabit","gigabyte","gram","hectare","hour","inch","kilobit","kilobyte","kilogram","kilometer","liter","megabit","megabyte","meter","mile","mile-scandinavian","milliliter","millimeter","millisecond","minute","month","ounce","percent","petabyte","pound","second","stone","terabit","terabyte","week","yard","year"]`);

shouldThrow(() => {
    Intl.supportedValuesOf("invalid");
}, RangeError);
