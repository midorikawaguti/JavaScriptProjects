const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;

}

//Show New Quote
function newQuote(){
    loading();
    //Pick a random quote from apiQuotes array
    const quote =  apiQuotes[Math.floor(Math.random()* apiQuotes.length)];

    //Check if Author fiels is blank and replace it with 'Unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown';
    } else{
        authorText.textContent = quote.author;
    }

    //Check Quote length to determine styling
    if (quote.text.length > 50){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    //Set quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

//Get Quotes from API
async function getQuotes(){
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch (error){
            //Catch Error Here

    }
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);

//On Load
getQuotes();
