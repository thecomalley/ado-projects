// Example POST method implementation:
async function getData(url = 'http://localhost:7071/api/GetProjects') {
  // Default options are marked with *
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic'
    },
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

//loadData()
getData()
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
    let tableRef = document.getElementById('my-table');
    // iterate over each item in the array
    const html = data.map( user => {
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