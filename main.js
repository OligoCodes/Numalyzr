const button = document.getElementById("validate")

button.addEventListener("click", () => {
  const info = document.querySelector(".app")
  
  const loadings = document.querySelectorAll(".punk")
  
  
  loadings.forEach(loading => { 
    loading.style.marginTop = "15px";
    loading.classList.add("spinner")
  
  setTimeout(() => {
    loading.classList.remove("spinner");
    loading.style.display = "none";
  }, 3000);}
  )
 });

const  traceNumber = () => {
  
  const phone = document.getElementById("phoneNumber").value.trim().toString();
  
  fetch('https://virtual-phone-numbers-detector.p.rapidapi.com/check-number', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': 'virtual-phone-numbers-detector.p.rapidapi.com',
    'x-rapidapi-key': 'da949b45e5mshd847ffdf187b908p16f82fjsn301400523fe1'
    },
    body: JSON.stringify({
      "phone":  `${phone}`
})
  })
    .then(res => res.json())
    .then(data => {
      
      console.log(data)
  setTimeout(() => {
      if (data.is_valid !== undefined) {
  document.getElementById("validity").textContent = data.is_valid ? "✅ This number is active and reachable." : "❌ This number is not valid or reachable.";
}

if (data.is_disposable !== undefined) {
  document.getElementById("disposable").textContent = data.is_disposable ? "⚠️ Disposable number — may not be reliable." : "✅ Permanent number(trustworthy).";
}

if (data.type) {
  switch (data.type) {
    case "FIXED_LINE_OR_MOBILE":
      document.getElementById("type").textContent = "📱 Mobile number";
      break;
    case "MOBILE":
      document.getElementById("type").textContent = "📱 Mobile number";
      break;
    case "LANDLINE":
      document.getElementById("type").textContent = "☎️ Landline number";
      break;
    case "VOIP":
      document.getElementById("type").textContent = "🌐 VoIP number (like WhatsApp or Skype)";
      break;
    default:
      document.getElementById("type").textContent = "❓ Type not recognized";
  }
}

if (data.country_name && data.country_code) {
  let location = `${data.country_name} | +${data.country_code}`;
  if (data.region) {
    location += ` | ${data.region}`;
  }
  document.getElementById("location").textContent = `🌍 Location: ${location}`;
}

if (data.international_format || data.national_format) {
  document.getElementById("format").innerText = `🌐 International: ${data.international_format}
  📞 National: ${data.national_format}`;
}

if (data.carrier) {
  document.getElementById("carrier").textContent = `🛰 Carrier: ${data.carrier}`;
} else {
  document.getElementById("").textContent = "Carrier: Unknown or not detected";
}

if (phone === ""){
  alert('please enter the number in the form example +233551448745')
}

if (data.message){
  alert('please enter the number in the form example +233551448745')
}
}, 3200)
    })
    .catch(err => {
      console.error("Error: ", err)
      alert(`${err}, please consider turning on your mobile data or connecting to a secure WI-FI network and try again.`)
    })
};