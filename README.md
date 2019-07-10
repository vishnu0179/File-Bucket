# LoginApi

<b>POST Request to /signup </b> with EMAIL, PASSWORD, NAME in body.  
Response: "Signed up successfully"

<b>POST Request to /login</b> with EMAIL, PASSWORD in body. 
<br/>Response: 
<br/> --> if Sucess makes a GET request to /
<br/>--> if Fails makes a GET request to /login
          
<b>GET Request to /</b>
<br/>Response: 
<br/>--> if logged in "Logged in successfully"
<br/>--> if not logged in makes a GET request to /login
