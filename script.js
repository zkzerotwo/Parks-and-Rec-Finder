//Format API query parameters
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

//Find parks by state abbreviation
function getParks(stateChosen, numReturned) {
    console.log(stateChosen, numReturned);
    const apiKey = "61UIDeJ40VAQ6v32qNNODaMY1qTif5vNWkZO0ihE";
    const baseUrl = "https://developer.nps.gov/api/v1/parks";
    const params = {
        stateCode: stateChosen,
        limit: numReturned, 
        api_key: "61UIDeJ40VAQ6v32qNNODaMY1qTif5vNWkZO0ihE"
    };
    const queryString = formatQueryParams(params)
    const url = baseUrl + '?' + queryString
    console.log(url); 

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.code)
        })
        .then(responseJson => displayParks(responseJson, numReturned))
        .catch(error => {alert("Make sure you're searching by two character state abbreviation!")})
};

function displayParks(responseJson, numReturned) {
    console.log(responseJson);
    console.log(numReturned);
    $('#results-list').empty();
        for (i = 0; i < responseJson.data.length; i++) {
            console.log(responseJson.data[i].fullName);
            $('#results-list').append(
                `<li><ul>
                    <li><a href=${responseJson.data[i].url}>${responseJson.data[i].fullName}</a></li>
                    <li>${responseJson.data[i].description}</li></ul></li>`);
        }
        $('.results').removeClass('hidden');
    }


function watchForm() {
    console.log("Watching for parks, just a moment...")
    $('form').submit(event => {
        event.preventDefault();
        const stateChosen = $('#state').val();
        const numReturned = $('#parks').val();
        console.log(stateChosen);
        console.log(numReturned);
        getParks(stateChosen, numReturned);
    })
}

$(watchForm)
