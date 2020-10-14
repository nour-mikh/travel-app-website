document.getElementById('docs').addEventListener('click', openDoc)
document.getElementById('ticket').addEventListener('click', openFlight)
document.getElementById('hotel').addEventListener('click', openHotel)
document.getElementById('budget').addEventListener('click', openBudget)
document.getElementById('insurance').addEventListener('click', openInsurance)

function openDoc(){
   let windows =  window.open('https://officialtraveldocuments.com/travel-document-types/', '_blank');
   windows.focus();
}

function openFlight(){
   let windows =  window.open('https://www.expedia.com/Flights', '_blank');
   windows.focus();
}

function openHotel(){
   let windows =  window.open('https://www.trivago.com/en?sLanguageLocale=UK', '_blank');
   windows.focus();
}

function openBudget(){
   let windows =  window.open('https://www.budgetyourtrip.com/', '_blank');
   windows.focus();
}

function openInsurance(){
   let windows = window.open('https://www.forbes.com/sites/christopherelliott/2018/08/18/the-best-and-worst-travel-insurance-companies/#f7c38b4fc2f2', '_blank')
   windows.focus();
}