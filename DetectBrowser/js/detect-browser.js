var nav = navigator.userAgent.toLowerCase();
var browser;
var version;
if(nav.indexOf("msie") != -1){
  browser = "Internet Explorer"
  version = parseInt(nav.split('msie')[1]);
  if(version<=9){
    window.location("/incompatible-browser.html");
  }
} else if(nav.indexOf("edge") != -1){
  browser = "Edge";
  version = ((nav.split('firefox')[1]).split(" ")[0]).substring(1);
} else if(nav.indexOf("firefox") != -1){
  browser = "Firefox";
  version = ((nav.split('firefox')[1]).split(" ")[0]).substring(1);
} else if(nav.indexOf("opr") != -1){
  browser = "Opera";
  version = ((nav.split('opera')[1]).split(" ")[0]).substring(1);
} else if(nav.indexOf("chrome") != -1){
  browser = "Chrome";
  version = ((nav.split('chrome')[1]).split(" ")[0]).substring(1);
} else if(nav.indexOf("safari") != -1){
  browser = "Safari";
  version = ((nav.split('version')[1]).split(" ")[0]).substring(1);
} else {
  browser = "";
}