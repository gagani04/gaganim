// prices of the tickets, additional price for duration and prices of the extra items to retrieve later
let tickets = {
    price : [1000,500,500,250,5000,2500], 
    duration : [0,250,500,1000], 
    extras : [5000,500]
  }
  
  //global scope variables for the  price calculations
  var ticketApp = {
    ticket_cost : 0, 
    ap_cost : 0, //annual pass cost
    ft_cost : 0,  // food token cost
    no_of_adults : 0,
    no_of_children :0,
    spCost :0,
  };
  
  //when user filled out the form   calculate the cost of the items progressively and display the currunt order amount.
  function calculateCost() {
  
    var ticket_price = tickets["price"];
    var duration_price = tickets["duration"];
    var extras_price = tickets["extras"];
  
    var cost = 0;
    
    var choice = document.getElementById("cmbChoice").value;
    var duration = document.getElementById("cmbDuratiom").value;
    var adultNo = document.getElementById("adultNo").value;
    var childNo = document.getElementById("childNo").value;
    var foodTokens = document.getElementById("tokensNo").value;
    var annualPasses = document.getElementById("passesNo").value;
  
   
  
  if(adultNo || childNo != 0){
  
    if(choice == ""){
      alert("Please select your choice");
      document.getElementById("cmbChoice").focus();
      return;
    }
  
    if(duration == ""){
      alert("Please select the duration");
      document.getElementById("cmbDuratiom").focus();
      return;
    }
  
  }
  
    if(duration != "" && choice == ""){
        alert("Please select the choice first");
        document.getElementById("cmbDuratiom").focus();
        
        return;
    }
  
  
    if(adultNo == ""){
      adultNo = 0;
      
    }
    else{
      adultNo = parseInt(adultNo);
  
    }
  
  
    if(childNo == "" ){
      childNo = 0;
    }
    else{
      childNo = parseInt(childNo);
  
    }
  
  
    if(foodTokens == ""){
      foodTokens = 0;
      
    }
    else{
      foodTokens = parseInt(foodTokens);
  
    }
  
  
    if(annualPasses == ""){
      annualPasses = 0;
      
    }
    else{
      annualPasses = parseInt(annualPasses);
  
    }
  
   
  
    var tPrice = 0;
    choice = parseInt(choice);
  
    //calculate ticket price based on the users choice of pass(Day pass, Student Pass, Foreign Pass)
    switch(choice) {
      case 0:
        tPrice = ticket_price[0] * adultNo + ticket_price[1] * childNo;
        break;
      case 1:
        tPrice = ticket_price[2] * adultNo + ticket_price[3] * childNo;
        break;
      case 2:
        tPrice = ticket_price[4] * adultNo + ticket_price[5] * childNo;
        break;
      default:
        
    }
  
    // add extra prices based on the duration that the user selects.
   // var total_number_tickets = adultNo + childNo;
    if(duration !=""){
      duration = parseInt(duration);
      tPrice = tPrice + duration_price[duration];
  
    }
  
    ticketApp.ticket_cost = tPrice;
  
    ticketApp.ft_cost = foodTokens * extras_price[1];
    ticketApp.ap_cost = annualPasses * extras_price[0];
  
    cost = parseFloat(tPrice + ticketApp.ft_cost + ticketApp.ap_cost);
  
    document.getElementById("spCost").innerHTML = cost.toFixed(2);
  
    ticketApp.no_of_adults = adultNo;
    ticketApp.no_of_children = childNo;
    ticketApp.spCost = cost;
  
  }
  
  
  
  
  //function to add the current order into a table so the user can add or delete orders before finalizing them.
  
  document.getElementById("Addtoorder").onclick = function(){
  
    
    if(ticketApp.spCost>0){
      document.getElementById("tableOrder").style = "display: inlineblock;"
    }
  
    var cost = parseFloat(document.getElementById("spCost").innerHTML);
    if(cost == 0){
        alert("You cannot place an order without any items in the current order. Please add one or more items to continue.");
        return;
    }
  
    
    var grand_total = parseFloat(document.getElementById("thGrandTot").innerHTML);
    var total_ftokens = parseInt(document.getElementById("thFtokens").innerHTML);
    var grand_token = parseFloat(document.getElementById("pthFtokens").innerHTML);
    var total_apasses = parseInt(document.getElementById("thApasses").innerHTML);
    var grand_passes = parseFloat(document.getElementById("pthApasses").innerHTML);
  
    var annualPasses = document.getElementById("passesNo").value;
    var foodTokens = document.getElementById("tokensNo").value;
    
  
    if(foodTokens == ""){
      foodTokens = 0;
      
    }
    else{
      foodTokens = parseInt(foodTokens);
  
    }
  
  
    if(annualPasses == ""){
      annualPasses = 0;
      
    }
    else{
      annualPasses = parseInt(annualPasses);
  
    }
  
  
    var ctrl_choice = document.getElementById("cmbChoice");
    var choice_txt = ctrl_choice.options[ctrl_choice.selectedIndex].text;
  
    var ctrl_duration = document.getElementById("cmbDuratiom");
    var duration_txt = ctrl_duration.options[ctrl_duration.selectedIndex].text;
  
  
    
  
    var total = ticketApp.ticket_cost;
    
    var tbody = document.getElementById("tb_order");
  
  
    if(ticketApp.no_of_adults>0 || ticketApp.no_of_children>0){
  
      var trow = tbody.insertRow(-1)
  
      td1 = trow.insertCell(0);
      td1.innerHTML = choice_txt;
  
      td2 = trow.insertCell(1);
      td2.innerHTML=document.getElementById("adultNo").value;
      td2.style = "text-align:center";
  
      td3 = trow.insertCell(2);
      td3.innerHTML=document.getElementById("childNo").value;
      td3.style = "text-align:center";
  
      td4 = trow.insertCell(3);
      td4.innerHTML = document.getElementById("date").value;
      td4.style = "text-align:center";
  
      td5 = trow.insertCell(4);
      td5.innerHTML = duration_txt;
      td5.style = "text-align:center";
      
  
      td6 = trow.insertCell(5);
      td6.innerHTML=total.toFixed(2);
      td6.style = "text-align:right";
  
      td7 = trow.insertCell(6);
      td7.innerHTML = "<a href='javascript:void(0)' style='color:red;font-weight:bold' onclick='removeRecord(this.parentElement);'> <img src ='images/trash-bin.png' id ='trashBin' alt ='trashbin' > </a>";
  
    }
    
  
    total_ftokens = total_ftokens + foodTokens;
    document.getElementById("thFtokens").innerHTML = total_ftokens.toFixed(2);
    document.getElementById("thFtokens").style = "text-align:center";
  
    grand_token = grand_token + ticketApp.ft_cost;
    document.getElementById("pthFtokens").innerHTML = grand_token.toFixed(2);
    document.getElementById("pthFtokens").style = "text-align:right";
  
    total_apasses = total_apasses + annualPasses;
    document.getElementById("thApasses").innerHTML = total_apasses.toFixed(2);
    document.getElementById("thApasses").style = "text-align:center";
  
    grand_passes = grand_passes + ticketApp.ap_cost;
    document.getElementById("pthApasses").innerHTML = grand_passes.toFixed(2);
    document.getElementById("pthApasses").style = "text-align:right";
    
    grand_total = grand_total + ticketApp.spCost;
    document.getElementById("thGrandTot").innerHTML = grand_total.toFixed(2);
    document.getElementById("thGrandTot").style = "text-align:center";
  
    document.getElementById("spCost").innerHTML = grand_total.toFixed(2);
  
    document.getElementById("overallGtotal").innerHTML = grand_total.toFixed(2);
  
  
    resetPurchaseForm();
    calcLoyaltyPoints();
    
    
  
  }
  
  
  
  function resetPurchaseForm(){
    document.getElementById("purchaseF").reset();
    document.getElementById("spCost").innerHTML = "0.00";
  }
  
  
  function removeRecord(item){
    var result = confirm("Do you want to remove this record?");
    
    if(result == true){
        var table = document.getElementById("tableOrder");
        var grand_total = parseFloat(document.getElementById("thGrandTot").innerHTML);
        var total = parseFloat(item.parentElement.cells[5].innerHTML);
        grand_total = grand_total - total;
        document.getElementById("thGrandTot").innerHTML = grand_total.toFixed(2);
        document.getElementById("overallGtotal").innerHTML = grand_total.toFixed(2);
        table.deleteRow(item.parentElement.rowIndex);
    }
   
  
  }
  
  // function to remove all the annual passes added to the order summary.
  function removeAnuualPasses(){
    var result = confirm("Do you want to remove all annual passes? You can always add more later if necessary.");
    
    if(result == true){
      var tpannualPasses = parseFloat( document.getElementById("pthApasses").innerHTML);
      var tannualPasses = parseFloat(document.getElementById("thApasses").innerHTML);
      var grand_total = parseFloat(document.getElementById("thGrandTot").innerHTML);
      grand_total = grand_total -tpannualPasses;
      document.getElementById("thGrandTot").innerHTML = grand_total.toFixed(2);
      document.getElementById("overallGtotal").innerHTML = grand_total.toFixed(2);
      tpannualPasses = 0;
      tannualPasses = 0;
  
      document.getElementById("pthApasses").innerHTML = tpannualPasses;
      document.getElementById("thApasses").innerHTML = tannualPasses;
     
    }
   
  
  }
  
  // function to remove all the food tokens added to the order summary.
  function removeFoodTokens(){
    var result = confirm("Do you want to remove all food tokens? You can always add more later if necessary.");
    
    if(result == true){
      var tpfoodTokens = parseFloat( document.getElementById("pthFtokens").innerHTML);
      var tfoodTokens = parseFloat(document.getElementById("thFtokens").innerHTML);
      var grand_total = parseFloat(document.getElementById("thGrandTot").innerHTML);
      grand_total = grand_total -tpfoodTokens;
      document.getElementById("thGrandTot").innerHTML = grand_total.toFixed(2);
      document.getElementById("overallGtotal").innerHTML = grand_total.toFixed(2);
      tpfoodTokens = 0;
      tfoodTokens = 0;
  
      document.getElementById("pthFtokens").innerHTML = tpfoodTokens;
      document.getElementById("thFtokens").innerHTML = tfoodTokens;
     
    }
   
  
  }
  
  
  //show and hide extras in the purchase form
  
  document.getElementById("itemsextra").style.display = "none"; 
  
  function showHide() {
    var x = document.getElementById("itemsextra");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  
  
  
  //delete entire table values values and reset to blank when user clicks place order button
  document.getElementById("orderPlaceer").onclick = function(){
    var orderOverallder = parseFloat(document.getElementById("overallGtotal").innerHTML);
    if(orderOverallder != 0){
    var Table = document.getElementById("tb_order");
    document.getElementById("thGrandTot").innerHTML = "0.00";
    document.getElementById("overallGtotal").innerHTML = "0.00";
    Table.innerHTML = "";
    document.getElementById("tableOrder").style = "display: none;"
    alert("Thank you for your purchase of tickets or additional items. We look forward to seeing you again soon.")
    }
    else{
      alert("You cannot place an order without any items in the overall order. Please add one or more items to continue.")
    }
  }
  
  
  
  //Date validation for javascrpt
  //-----------------------------
  var todayDate = new Date();
  var frmDate = document.getElementById("date");
  var month = todayDate.getMonth() + 1; 
  var year = todayDate.getUTCFullYear() - 0; 
  var tdate = todayDate.getDate(); 
  if(month < 10){
    month = "0" + month 
  }
  if(tdate < 10){
    tdate = "0" + tdate;
  }
  var maxDate = year + "-" + month  + "-" + tdate;
  // Fill in today's date on the form. 
  document.getElementById("date").value = maxDate;
  //Prevent the user from entering an earlier invalid date.| restrct user to book tickets on a past date
  frmDate.setAttribute("min",maxDate)
  
  
  
  
  
  // Local storage functions to save form data and refil when user click the add to favourite button
  
  
  const formId = "purchaseF"; // ID of the form
  const formDetector = `${formId}`; // Identifier used to identify the form
  const saveButton = document.querySelector("#addFavourite"); // select save button
  const retrieveButton = document.querySelector("#retriveFavourite"); // selectretrieve button
  const alertBox = document.querySelector(".alert"); // select alert display div
  let form = document.querySelector(`#${formId}`); // select form
  let formElements = form.elements; // get the elements in the form
  
  /**
   * This function gets the values in the form
   * and returns them as an object with the
   * [formDetector] as the object key
   * 
   */
   const getFormData = () => {
    let data = { [formDetector]: {} }; // create an empty object with the formDetector as the key and an empty object as its value
    for (const element of formElements) {
      if (element.name.length > 0) {
        data[formDetector][element.name] = element.value;
      }
    }
    return data;
  };
  
  saveButton.onclick = event => {
    event.preventDefault();
    data = getFormData();
    localStorage.setItem(formDetector, JSON.stringify(data[formDetector]));
    const message = "Your order has been saved as a favorite . Thank you.";
    displayAlert(message);
  };
  
  /**
   * This function displays a message
   * on the page for 2 seconds
   *
   * 
   */
  const displayAlert = message => {
    alertBox.innerText = message; // add the message into the alert box
    alertBox.style.display = "block"; // make the alert box visible
    setTimeout(function() {
      alertBox.style.display = "none"; // hide the alert box after 2 second
    }, 2000);
  };
  
  
  /**
   * This function refill the favourte order when user clicks order favourite button
   * with data from localStorage
   *
   */
   const formautoRefill = () => {
    if (localStorage.key(formDetector)) {
      const savedData = JSON.parse(localStorage.getItem(formDetector)); // get and parse the saved data from localStorage
      for (const element of formElements) {
        if (element.name in savedData) {
          element.value = savedData[element.name];
        }
      }
      const message = "Form has been refilled with saved data!";
      displayAlert(message);
      document.getElementById("itemsextra").style.display = "block"; 
    }
  };
  
  
  // auto refill the form when the retreive favourite button is clicked
  retrieveButton.onclick = function(){
      formautoRefill(); 
      calculateCost();
  
  }
  
  
  
  
  
  //------------------------------------------------------              
  //calculate and store loyalty points and save it in the local storage
  
  var grand_loyaltyPoints = 0;
  var loyaltyPoints =0;
  var totalTicket = 0;
  
  function calcLoyaltyPoints(){
   
    
    totalTicket = totalTicket + ticketApp.no_of_adults + ticketApp.no_of_children;
    if(totalTicket > 3){
        loyaltyPoints = 20 * totalTicket;
        grand_loyaltyPoints = grand_loyaltyPoints + loyaltyPoints; 
        localStorage.setItem("loyality",grand_loyaltyPoints);
    }
  }
  
  /*when user clicks on the "Check loyalty points" button,
  it shows total loyalty points that have earned by the user so far based on the overall order*/
  function showLoyaltyPoints(){
    
    grand_loyaltyPoints = JSON.parse(localStorage.getItem(`loyality`));
   
    if(grand_loyaltyPoints>0){
        alert("Congratulations! You have earned "+  grand_loyaltyPoints + " loyalty points so far");
    }
    else{
        alert("Sorry! You don't have any loyalty points so far");
    }
  }
  
  
  