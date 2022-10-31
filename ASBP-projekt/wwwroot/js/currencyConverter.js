const currencies = {
    AUD: "Australian Dollar",
    CAD: "Canadian Dollar",
    EUR: "Euro",
    GBP: "British Pound",
    INR: "Indian Rupee",
    JPY: "Japanese Yen",
    USD: "United States Dollar",
    ZAR: "South African Rand",
};

function getOptions(data) {
    return Object.entries(data).map(([country, currency]) => `<option value="${country}">${country} - ${currency}</option>`).join("");
}

const fromCurrency = document.getElementById("currenciesFrom");
const toCurrency = document.getElementById("currenciesTo");
fromCurrency.innerHTML = getOptions(currencies);
toCurrency.innerHTML = getOptions(currencies);

document.getElementById("convert").addEventListener("click", fetchCurrencies);

function fetchCurrencies() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const enteredAmount = document.getElementById("amount").value;

    fetch("https://v6.exchangerate-api.com/v6/866b3f10ca915189caf84a89/latest/" + from).then((response) => {
        if (response.ok) {
            return response.json();
        }
        else {
            throw new Error("Network error response");
        }
    }).then((data) => {
        console.log(data);
        displayCurrency(data, from, to, enteredAmount);
    }).catch((error) => console.error("Fetch error: ", error));
}

function displayCurrency(data, from, to, enteredAmount) {
    const converted = enteredAmount * data.conversion_rates[to];
    document.getElementById("result").value = converted + " " + to;
    console.log(converted + " " + to);
}