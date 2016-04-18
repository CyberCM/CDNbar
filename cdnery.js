var cdn = {} 

cdn.libs = [];

cdn.load = function  () {  
   cdn.libs = Array.from(arguments);
   cdn.init()
} 

cdn.data = false


cdn.parse = function () {
   cdn.libs.forEach(function(libName) {
         
         var o =cdn.data.find(function(lib) { 
            return lib.name == libName; 
         });
         console.log(o)
        cdn.inject(o.latest, 'js')
         
        
    }, this);
}
 
cdn.init =  function () {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(request) {
    if (xhttp.readyState == 4 && xhttp.status == 200) { 
       cdn.data = Array.from(JSON.parse(xhttp.responseText).results); 
        console.log(cdn.data)
       cdn.parse()
    }
  };
  xhttp.open("GET", "https://api.cdnjs.com/libraries", true);
  xhttp.send();
}

cdn.inject = function (filename, filetype){
    
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
        
}
  


 