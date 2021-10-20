btnSubmit.onclick=function(){
    let name = inptName.value
    let street = inptStreet.value
    let city= inptCity.value
    let state = inptState.value
    let zipcode = inptZip.value
    let query = "INSERT INTO customer (`name`,`street`, `city`, `state`, `zipcode`) VALUES ('" + name + "', '" + street + "', '"+ city +"', '"+ state +"', '"+ zipcode +"')"
    // look at how the query is rendered
    //alert(query)
    
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + databaseSchema + "&query=" + query)

    if (req.status == 200) { //transit worked.
        if (req.responseText == 500)    // for our server - this means the insert succeeded
            lblMessage3.textContent = "You have successfully added the customer!"
        else
            lblMessage3.textContent = "There was a problem with adding the customer to the database."
    } else // transit error
        lblMessage3.textContent = "Error: " + req.status
}

customerSelect.onshow=function(){
  query = "SELECT * FROM customer"
    // Below change from my netID to yours (twice: user and database)    
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jes65910&pass=" + pw + "&database=" + databaseSchema + "&query=" + query)

    if (req.status == 200) { //transit trip worked.        
           // see JSON results
           // console.log(`req.responseText is a JSON string that looks like this: ${req.responseText}`)
        results = JSON.parse(req.responseText)
           // see if results are correct
           console.log(`The parsed JSON string is converted to a JS object (an array of arrays): ${results} where results[0] is ${results[0]}, the first array in the JS results object.`)
        
        if (results.length == 0)    // no results were returned by the query
           lblCustomerDisplay.textContent = "There are no pets in the database."
        else {        // query results were returned
            // this is what the results look like: 
            //   [                                                        ]

            // Take a closer look:
            console.log(`the first row/item in the big array is a small array: ${results[0]}`)
            console.log(`to get to Paul, need results[0][1]: ${results[0][1]}`)

        // Now output the names of all the dogs into the textArea control:
        let message = ""
     /*   for (i = 0; i < results.length; i++)
            message = message + results[i][1] + "\n"
        txtaResults.value = message
      */
        for (i = 0; i < results.length; i++)
          message = message + results[i][1] + "\n"
        lblCustomerDisplay.value = message
     } // end else

  } else   // the transit didn't work - bad wifi? server turned off?
        lblCustomerDisplay.textContent = "Error code: " + req.status
}
