customerDelete.onshow=function(){
     // get all the pet data from the database when program loads
    query = "SELECT * FROM customer"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + databaseSchema + "&query=" + query)

    if (req.status == 200) { //transit worked.
        allCustomerData = JSON.parse(req.responseText)  // parse data in an array
        console.log(allCustomerData)
    } else {
        // transit error
        lblMessages5 = `Error: ${req.status}`
    }  
}


btnDelete.onclick=function(){
    let customerNameDel = inptNameDel.value
    
    // make sure the pet name is in the database before you try to 
    // delete it
    let found = false
    for (i = 0; i < allCustomerData.length; i++) {
        if (customerNameDel == allCustomerData[i][1]){
            found = true
            break // if found the item in the database jump out of loop
        }
    }
    if (found == false) 
       lblMessage5.textContent = "That customer name is not in the database."
    else if (found == true) {
      query = "DELETE FROM customer WHERE name = '" + customerNameDel + "'"
      
      req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + databaseSchema + "&query=" + query)
      if (req.status == 200) //transit worked.
            if (req.responseText == 500)    // means the insert succeeded
                lblMessage5.textContent = `You have successfully deleted the customer named ${customerNameDel}`
            else
                lblMessage5.textContent = `There was a problem deleting ${customerNameDel} from the database.`
      else  // transit error
        lblMessage5.textContent = `Error: ${req.status}`
    } // found is true
} // end event handler
