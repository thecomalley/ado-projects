// curl --location --request GET 'https://dev.azure.com/malleynet/_apis/projects?api-version=5.0' \
// --header 'Authorization: Basic ' \

// Example POST method implementation:
async function getData(url = '') {
  // Default options are marked with *
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic '
    },
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

getData('https://dev.azure.com/malleynet/_apis/projects?api-version=5.0',)
  .then(data => {
    console.log(data.value); // JSON data parsed by `data.json()` call
    let tableRef = document.getElementById('my-table');
    // iterate over each item in the array
    const html = data.value.map( user => {
        // Insert a row at the end of the table
        let newRow = tableRef.insertRow(-1);
        
        // Insert new cells in the row
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);
    
        // Add some text to the new cells:
        cell1.innerHTML = user.name;
        cell2.innerHTML = user.description;   
        cell3.innerHTML = user.lastUpdateTime;   
        cell4.innerHTML = `<button type="button" class="btn btn-primary">Access</button>`
    })
});

// GET https://vssps.dev.azure.com/{organization}/_apis/graph/Subjects/{subjectDescriptor}/avatars?api-version=6.1-preview.1

