const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
const dropdownS=document.querySelectorAll(".dropdowns select");
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
;
for(let select of dropdownS)
{
    for(code in countryList)
    {
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        if(select.name==="from" && code==="USD")
        {
            newOption.selected=true;
        }
        else if(select.name==="to" && code==="INR")
        {
            newOption.selected=true;
        }
         select.append(newOption);}
    select.addEventListener("change",(evnt)=>
    {
        updateFlag(evnt.target);
    });
        
    }
    
const updateExchangeRate=async()=>
{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal===""|| amtVal<1)
    {
        amtVal=1;
        amount.value="1";
    }
    //console.log(fromCurr.value,toCurr.value);
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    console.log(data);
    let rate=data[toCurr.value.toLowerCase()];
    let finalAmount=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;

}
const updateFlag=(element)=>
{
    // console.log(element);
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
};

window.addEventListener("load",()=>
{
 updateExchangeRate();
});
btn.addEventListener("click",(evnt)=>
{
    evnt.preventDefault();
    updateExchangeRate();
    
});
