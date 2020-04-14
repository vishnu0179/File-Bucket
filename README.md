# FILE BUCKET

### File bucket is a secure cloud storage api with which you can store your files in cloud and authenticate to upload and download your files and media. It stores the files using aws S3.

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


<b>POST Request to /upload</b> with files: {file-to-upload} in body
<br/>Response: 
<br/>--> if logged in: uploads the file
<br/>--> if not logged in makes a GET request to /login
          
<b>POST Request to /download</b> with key: {filename-of-the-file-to-be-downloaded} in body
<br/>Response: 
<br/>--> if logged in: downloads the file
<br/>--> if not logged in makes a GET request to /login
