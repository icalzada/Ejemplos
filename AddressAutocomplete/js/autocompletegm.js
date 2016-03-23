var autocompleteGMInputs = [];
var autocompletesGMForms = [];
var currentInput = 0;

function initAutocomplete() {
  getAutocompletesGMForms();
  for(var i = 0; i < autocompleteGMInputs.length; i++){
    autocompletesGMForms.push(new google.maps.places.Autocomplete((document.getElementById(autocompleteGMInputs[i])),
      {types: ['geocode']}));
    autocompletesGMForms[i].addListener('place_changed', fillInAddress);
  }
}

function fillInAddress() {
  var place = autocompletesGMForms[currentInput].getPlace();
  var allFields = document.getElementById(autocompleteGMInputs[currentInput]).parentNode.getElementsByClassName("field-autocompleteGM")
  for (var i = 0; i < allFields.length; i++) {
    allFields[i].value = '';
    allFields[i].disabled = false;
  }
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    var currentElement = document.getElementById(autocompleteGMInputs[currentInput]).parentNode.getElementsByClassName(addressType)[0];
    if (currentElement) {
      var elementClass = currentElement.className.split(" ");
      var val = place.address_components[i][elementClass[2]];
      currentElement.value = val;
    }
  }
  var geometryLocation = place.geometry.location;
  var elementLat = document.getElementById(autocompleteGMInputs[currentInput]).parentNode.getElementsByClassName("lat")[0];
  var elementLng = document.getElementById(autocompleteGMInputs[currentInput]).parentNode.getElementsByClassName("lng")[0];
  if(elementLat){
    elementLat.value = geometryLocation.lat()
  }
  if(elementLng){
    elementLng.value = geometryLocation.lng()
  }
}

function getAutocompletesGMForms(){
  var elementForms = document.getElementsByClassName("autocompleteGMInput");
  for(var i=0;i<elementForms.length;i++){
    autocompleteGMInputs.push(elementForms[i].id);
    elementForms[i].onfocus = function(){
      currentInput = autocompleteGMInputs.indexOf(this.id);
    };
  }
}
