function searchProjects() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("my-table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

// Example POST method implementation:
async function getData(url = 'https://dev.azure.com/malleynet/_apis/projects?api-version=5.0') {
  // Default options are marked with *
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic'
    },
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function loadData(path = '') {
  // Default options are marked with *
  const response = await fetch(path);
  return response.json(); // parses JSON response into native JavaScript objects
}

//loadData()
getData()
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