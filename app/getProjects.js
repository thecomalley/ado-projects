// Example POST method implementation:
async function getData(url = '/api/HttpTrigger') {
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
    const html = data.map( project => {
        // Insert a row at the end of the table
        let newRow = tableRef.insertRow(-1);
        
        // Insert new cells in the row
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);
        let cell5 = newRow.insertCell(3);

        // Add some text to the new cells:
        cell1.innerHTML = project.name;
        cell2.innerHTML = project.description;   
        cell3.innerHTML = project.last_update_time;   
        cell4.innerHTML = `<button type="button" class="btn btn-primary">Deploy LZ Template</button>`
        cell5.innerHTML = `<button type="button" class="btn btn-primary" onclick="window.location.href='https://dev.azure.com/malleynet/${project.name}';">Request Access</button>`
    })
});
