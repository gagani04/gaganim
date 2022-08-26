

function validateForm() {
 
  if (!document.getElementById('data_5_0').checked && !document.getElementById('data_5_1').checked && !document.getElementById('data_5_2').checked && !document.getElementById('data_5_3').checked && !document.getElementById('data_5_4').checked && !document.getElementById('data_5_5').checked && !document.getElementById('data_5_6').checked && !document.getElementById('data_5_7').checked ) {
  alert('Donation Amount is required!');
  return false;}
  return true;
  
  
  }

  
  //popup message after submission//
  
  
  var popup = document.getElementById("popup");


var buttn = document.getElementById("buttn");

var span = document.getElementsByClassName("close")[0];

buttn.onclick = function() {
  popup.style.display = "block";
}

span.onclick = function() {
  popup.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
}

//collecting data from donation form//

var firstname= document.getElementById(data_2).value;
var lastname= document.getElementById(data_3).value;
var address= document.getElementById(data_6).value;
var cardholdername= document.getElementById(data_7).value;
var cardno= document.getElementById(data_8).value;
var cvv= document.getElementById(data_9).value;

localStorage.setItem('Is_firstname',data_2);
localStorage.setItem('Is_lastname',data_3);
localStorage.setItem('Is_addressname',data_6);
localStorage.setItem('Is_cardholdername',data_7);
localStorage.setItem('Is_cardno',data_8);
localStorage.setItem('Is_cvv',data_9);