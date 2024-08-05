const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
//i changed the url given in video, a little bcz the api was updated on github

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");//The value property of a <select> element will reflect the value attribute of the currently selected <option>. If the value attribute is not specified, the text content of the option will be used as its value.
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const updateExchangeRate=async()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal ==="" || amtVal < 1)
        {
           amtVal = 1;
           amount.value = "1";
           
        }

        const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];//to access the value of an item inisded an object within an object

        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal}${fromCurr.value} = ${finalAmount}${toCurr.value}`
}

window.addEventListener("load",updateExchangeRate);


btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})



const updateFlag =(element)=>{
     let currCode = element.value;
     let countryCode = countryList[currCode];
     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
     let image = element.parentElement.querySelector("img"); 
     image.src=newSrc;
}


//countryList can only be accessed if the code.js file is linked in the index2.html file
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if (currCode === "USD" && select.name === "from") {
            newOption.selected = "selected";
        }
        else if (currCode === "INR" && select.name === "to") {
            newOption.selected = "selected";
        }
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    });
}

