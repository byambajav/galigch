//  copyright lexilogos.com
var car;
function latcyr () {
car = document.transcription.text2.value;
car = car.replace(/[hx]/g, "х");
car = car.replace(/a/g, "а");
car = car.replace(/b/g, "б");
car = car.replace(/v/g, "в");
car = car.replace(/g/g, "г");
car = car.replace(/d/g, "д");
car = car.replace(/e/g, "е");
car = car.replace(/[ëé]/g, "ё");
car = car.replace(/z/g, "з");
car = car.replace(/ž/g, "ж");
car = car.replace(/зх/g, "ж")
car = car.replace(/i/g, "и");
car = car.replace(/j/g, "й");
car = car.replace(/k/g, "к");
car = car.replace(/l/g, "л");
car = car.replace(/m/g, "м");
car = car.replace(/n/g, "н");
car = car.replace(/o/g, "о");
car = car.replace(/p/g, "п");
car = car.replace(/r/g, "р");
car = car.replace(/s/g, "с");
car = car.replace(/t/g, "т");
car = car.replace(/u/g, "у");
car = car.replace(/f/g, "ф");
car = car.replace(/c/g, "ц");
car = car.replace(/č/g, "ч");
car = car.replace(/цх/g, "ч");
car = car.replace(/š/g, "ш");
car = car.replace(/сх/g, "ш");
car = car.replace(/ŝ/g, "щ");
car = car.replace(/шч/g, "щ");  
car = car.replace(/y/g, "ы");
car = car.replace(/[èê]/g, "э");
car = car.replace(/йу/g, "ю");
car = car.replace(/йа/g, "я");
car = car.replace(/û/g, "ю");
car = car.replace(/â/g, "я");
car = car.replace(/’/g, "ь");
car = car.replace(/'/g, "ь");
car = car.replace(/ʹ/g, "ь");
car = car.replace(/ʺ/g, "ъ");
car = car.replace(/ьь/g, "ъ");

car = car.replace(/[HX]/g, "Х");
car = car.replace(/A/g, "А");
car = car.replace(/B/g, "Б");
car = car.replace(/V/g, "В");
car = car.replace(/G/g, "Г");
car = car.replace(/D/g, "Д");
car = car.replace(/E/g, "Е");
car = car.replace(/Ë/g, "Ё");
car = car.replace(/Z/g, "З");
car = car.replace(/Ž/g, "Ж");
car = car.replace(/ЗХ/g, "Ж");  
car = car.replace(/Зх/g, "Ж"); 
car = car.replace(/I/g, "И");
car = car.replace(/J/g, "Й");
car = car.replace(/K/g, "К");
car = car.replace(/L/g, "Л");
car = car.replace(/M/g, "М");
car = car.replace(/N/g, "Н");
car = car.replace(/O/g, "О");
car = car.replace(/P/g, "П");
car = car.replace(/R/g, "Р");
car = car.replace(/S/g, "С");
car = car.replace(/T/g, "Т");
car = car.replace(/U/g, "У");
car = car.replace(/F/g, "Ф");
car = car.replace(/C/g, "Ц");
car = car.replace(/Č/g, "Ч");
car = car.replace(/ЦХ/g, "Ч");
car = car.replace(/Цх/g, "Ч");
car = car.replace(/Š/g, "Ш");
car = car.replace(/СХ/g, "Ш");
car = car.replace(/Сх/g, "Ш");
car = car.replace(/Š/g, "Щ");
car = car.replace(/ШЧ/g, "Щ");
car = car.replace(/Шч/g, "Щ");
car = car.replace(/Y/g, "Ы");
car = car.replace(/[ÈÊ]/g, "Э");
car = car.replace(/ЙУ/g, "Ю");
car = car.replace(/ЙА/g, "Я");
car = car.replace(/Йу/g, "Ю");
car = car.replace(/Йа/g, "Я");
car = car.replace(/Û/g, "Ю");
car = car.replace(/Â/g, "Я");
document.transcription.text1.value = car;
}

function cyrlat () {
car = document.transcription.text1.value;
car = car.replace(/а/g, "a");
car = car.replace(/б/g, "b");
car = car.replace(/в/g, "v");
car = car.replace(/г/g, "g");
car = car.replace(/д/g, "d");
car = car.replace(/е/g, "e");
car = car.replace(/ё/g, "ë");
car = car.replace(/ж/g, "ž");
car = car.replace(/з/g, "z");
car = car.replace(/и/g, "i");
car = car.replace(/й/g, "j");
car = car.replace(/к/g, "k");
car = car.replace(/л/g, "l");
car = car.replace(/м/g, "m");
car = car.replace(/н/g, "n");
car = car.replace(/о/g, "o");
car = car.replace(/п/g, "p");
car = car.replace(/р/g, "r");
car = car.replace(/с/g, "s");
car = car.replace(/т/g, "t");
car = car.replace(/у/g, "u");
car = car.replace(/ф/g, "f");
car = car.replace(/х/g, "h");
car = car.replace(/ц/g, "c");
car = car.replace(/ч/g, "č");
car = car.replace(/ш/g, "š");
car = car.replace(/щ/g, "ŝ");
car = car.replace(/ъ/g, "’’");
car = car.replace(/ы/g, "y");
car = car.replace(/ь/g, "’");
car = car.replace(/э/g, "è");
car = car.replace(/ю/g, "ju");
car = car.replace(/я/g, "ja");

car = car.replace(/А/g, "A");
car = car.replace(/Б/g, "B");
car = car.replace(/В/g, "V");
car = car.replace(/Г/g, "G");
car = car.replace(/Д/g, "D");
car = car.replace(/Е/g, "E");
car = car.replace(/Ё/g, "Ë");
car = car.replace(/Ж/g, "Ž");
car = car.replace(/З/g, "Z");
car = car.replace(/И/g, "I");
car = car.replace(/Й/g, "J");
car = car.replace(/К/g, "K");
car = car.replace(/Л/g, "L");
car = car.replace(/М/g, "M");
car = car.replace(/Н/g, "N");
car = car.replace(/О/g, "O");
car = car.replace(/П/g, "P");
car = car.replace(/Р/g, "R");
car = car.replace(/С/g, "S");
car = car.replace(/Т/g, "T");
car = car.replace(/У/g, "U");
car = car.replace(/Ф/g, "F");
car = car.replace(/Х/g, "H");
car = car.replace(/Ц/g, "C");
car = car.replace(/Ч/g, "Č");
car = car.replace(/Ш/g, "Š");
car = car.replace(/Щ/g, "Ŝ");
car = car.replace(/Ъ/g, "’’");
car = car.replace(/Ы/g, "Y");
car = car.replace(/Ь/g, "’");
car = car.replace(/Э/g, "È");
car = car.replace(/Ю/g, "Ju");
car = car.replace(/Я/g, "Ja");
document.transcription.text2.value = car;
}

function copy1()
{ textRange=document.transcription.text1.createTextRange();
textRange.execCommand("Copy");
textRange="";
}
function copy2()
{ textRange=document.transcription.text2.createTextRange();
textRange.execCommand("Copy");
textRange="";
}