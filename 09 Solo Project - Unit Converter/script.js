const userInput = document.querySelector('#user-input')
const convertBtn = document.querySelector('#convert-btn')

const lengthPara = document.querySelector('#length-values p')
const volumePara = document.querySelector('#volume-values p')
const massPara = document.querySelector('#mass-values p')

// Add images instead of text
lengthPara.innerHTML = '<img src="assets/length-icon.png" alt="Length conversion" class="conversion-icon">'
volumePara.innerHTML = '<img src="assets/volume-icon.png" alt="Volume conversion" class="conversion-icon">'
massPara.innerHTML = '<img src="assets/mass-icon.png" alt="Mass conversion" class="conversion-icon">'

const conversionRates = {
    metersToFeet: 3.281,
    litresToGallons: 0.264,
    kilosToPounds: 2.204
}

function convert(value, rate) {
    return (value * rate).toFixed(3)
}

convertBtn.addEventListener('click', function() {
    const inputValue = Number(userInput.value)

    if (!inputValue) {
        alert("Please enter a valid number!")
        return
    }

    // Use <br> to create separate lines for each conversion
    lengthPara.innerHTML = `${inputValue} meters = ${convert(inputValue, conversionRates.metersToFeet)} feet<br>${inputValue} feet = ${convert(inputValue, 1/conversionRates.metersToFeet)} meters`
    volumePara.innerHTML = `${inputValue} liters = ${convert(inputValue, conversionRates.litresToGallons)} gallons<br>${inputValue} gallons = ${convert(inputValue, 1/conversionRates.litresToGallons)} liters`
    massPara.innerHTML = `${inputValue} kilos = ${convert(inputValue, conversionRates.kilosToPounds)} pounds<br>${inputValue} pounds = ${convert(inputValue, 1/conversionRates.kilosToPounds)} kilos`
})