const nameInput = document.getElementById("brideGroomName");
const startingBidInput = document.getElementById("startingBid");
const education = document.getElementById("education");
const netWorth = document.getElementById("netWorth");
const caste = document.getElementById("caste");
const skills = document.getElementsByClassName("skills");
const ageOptions = document.getElementsByName("age");
const reputationCheckboxes = document.getElementsByClassName("reputation");
const calculateBtn = document.getElementById("calculateBtn");
const resultDisplay = document.getElementById("result");
const loveLetterInput = document.getElementById("loveLetter");

const calculate = () => {

    let name = nameInput.value.trim();
    let price = Number(startingBidInput.value);

    if (!name || isNaN(price) || price <= 0) {
        alert("Please enter a valid name and a positive starting bid.");
        return;
    }
    
    const educationCoefficient = parseFloat(education.value);
    const netWorthCoefficient = parseFloat(netWorth.value); 

    price *= educationCoefficient;
    price *= netWorthCoefficient; 
    const casteBonus = parseFloat(caste.value);
    price += casteBonus;

    const getCheckboxValues = (checkBox, price) => {
        let list = Array.from(checkBox).filter(item => item.checked);
        return list.reduce((accumulator, item) => accumulator + Number(item.value), price);
    };
    
    const getRadioValue = (radioButton, price) => {
        radioButton.forEach(item => {
            if (item.checked) {
                price *= Number(item.value);
            }
        });
        return price;
    };
    
    const getOptionsValues = (options, price) => {
        for (let i = 0; i < options.length; i++) {
            if (options[i].checked && Number.isInteger(Number(options[i].value))) {
                price += Number(options[i].value);
            } else if (options[i].checked && !Number.isInteger(Number(options[i].value))) {
                price *= Number(options[i].value);
            }
        }
        return price;
    };

    price = getRadioValue(ageOptions, price);
    price = getCheckboxValues(skills, price);
    price = getOptionsValues(reputationCheckboxes, price);

    let loveLetter = loveLetterInput.value.trim();
    price = Math.max(0, price);

    let person = {
        bride_name: name,
        bride_price: price.toFixed(2),
        letter_to_bride: loveLetter
    };

    resultDisplay.innerHTML = `
        Your price for ${person.bride_name} is $${person.bride_price}.
        <br>Love Letter: ${person.letter_to_bride}
    `;
};

calculateBtn.addEventListener("click", calculate);
