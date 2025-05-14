
const countryList = {
  "AED": "AE",
  "ARS": "AR",
  "AUD": "AU",
  "BDT": "BD",
  "BRL": "BR",
  "CAD": "CA",
  "CHF": "CH",
  "CNY": "CN",
  "COP": "CO",
  "EGP": "EG",
  "EUR": "FR",
  "GBP": "GB",
  "HKD": "HK",
  "IDR": "ID",
  "INR": "IN",
  "JPY": "JP",
  "KRW": "KR",
  "MXN": "MX",
  "MYR": "MY",
  "NGN": "NG",
  "NOK": "NO",
  "NZD": "NZ",
  "PKR": "PK",
  "PHP": "PH",
  "PLN": "PL",
  "RUB": "RU",
  "SAR": "SA",
  "SEK": "SE",
  "SGD": "SG",
  "THB": "TH",
  "TRY": "TR",
  "TWD": "TW",
  "UAH": "UA",
  "USD": "US",
  "VND": "VN",
  "ZAR": "ZA"
};
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const fromcurr =document.querySelector(".from select")
const tocurr =document.querySelector(".to select")
const msg =document.querySelector(".msg")
console.log(fromcurr.value)

for( let select of dropdowns){
    for (currcode in countryList){ 
        let newOption= document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        
        if(select.name ==="from" &&currcode ==="USD"){
            newOption.selected = "selected";
        }
        else if( select.name ==="to" && currcode==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }   
    
    select.addEventListener("change", (evt)=>{
        updateflag(evt.target);
    })
}
const convert = async () => {
    let amount=document.querySelector(".amount input")
    let amtval= amount. value;
    if( amtval===""||amtval< "1"){
        amtval = 1;
        amtval.value= "1";
    }
    // api fetch url 
     const apikey= "9d4f893869f41ac0aa595587";
    const URL =`https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromcurr.value}`
   
    let response = await fetch (URL);
    let data = await response.json();

        if(data.result === "success"){ 
            let rate = data.conversion_rates[tocurr.value];
            let convertedAmount = amtval* rate;
           msg.innerText = `${amtval} ${fromcurr.value} = ${convertedAmount.toFixed(2)} ${tocurr.value}`;
     }else{
        msg.innerText=" failed to fetch exchange rate";
     }
    }
    const updateflag = (element) =>{

        let currcode = element. value;
        let contryCode = countryList[currcode];
        let newSrc=`http://flagsapi.com/${contryCode}/flat/64.png`
        let img = element.parentElement .querySelector("img");
        img.src = newSrc;
 
    };
    btn.addEventListener("click",(evt) =>{
        evt.preventDefault();
        convert();
        }) 

        window.addEventListener("load",() =>{
          
            convert();
        })
