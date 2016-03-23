var gaafInputs = [];
var gaafForms = [];
var currentInput = 0;

function initAutocomplete() {
  getGaafInputs();
  for(var i = 0; i < gaafInputs.length; i++){
    gaafForms.push(new google.maps.places.Autocomplete((document.getElementById(gaafInputs[i])),
      {types: ['geocode']}));
    gaafForms[i].addListener('place_changed', fillInAddress);
  }
}

function fillInAddress() {
  var place = gaafForms[currentInput].getPlace();
  if(place){
    var gaafFields = document.getElementById(gaafInputs[currentInput]).parentNode.getElementsByClassName("gaaf-field");
    for (var i = 0; i < gaafFields.length; i++) {
      gaafFields[i].disabled = false;
      if(gaafFields[i].dataset.gaafField == "lat"){
        gaafFields[i].value = place.geometry.location.lat();
      }else if(gaafFields[i].dataset.gaafField == "lng"){
        gaafFields[i].value = place.geometry.location.lng();
      }else{
        for (var j = 0; j < place.address_components.length; j++) {
          if(place.address_components[j].types[0] == gaafFields[i].dataset.gaafField){
            gaafFields[i].value = place.address_components[j][gaafFields[i].dataset.gaafKey];
          }
        }
      }
    }
  }
}

function getGaafInputs(){
  var elementsGaafInput = document.getElementsByClassName("gaaf-input");
  for(var i=0;i<elementsGaafInput.length;i++){
    gaafInputs.push(elementsGaafInput[i].id);
    elementsGaafInput[i].onfocus = function(){
      currentInput = gaafInputs.indexOf(this.id);
    };
  }
}
