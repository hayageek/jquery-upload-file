#[jQuery Upload File](http://hayageek.com/docs/jquery-upload-file.php)

##Overview
jQuery Upload File plugin provides Multiple file Uploads with progress bar.Works with any server-side platform (Google App Engine, PHP, Python, Ruby on Rails, Java, etc.) that supports standard HTML form file uploads.

---

#Demo
http://hayageek.com/docs/jquery-upload-file.php

---

#Supported Browsers
IE 8.0,IE 9.0,IE 10.0,Firefox,Safari,Opera,Chrome

Drag drop is supported in IE10,Firefox,Safari,Opera,Chrome
 
##API

###uploadFile( options )
 Creates Ajax form and uploads the files to server. 

 ````javascript
var uploadObj = $("#uploadDivId").uploadFile(options);
````

###startUpload()
 uploads all the selected files. This function is used when <code>autoSubmit</code> option is set to <code>false</code>.
````javascript
uploadObj.startUpload();

````

---
##Verions
### 2.0.3
Fix for extra post Data

### 2.0.2
Fix for IE8,IE9.
Drap drop is supported.

---

##Options

###url
Server URL which handles File uploads 


###method
Upload Form method type  <code>POST</code> or <code>GET</code>. Default is <code>POST</code>
 

###enctype
Upload Form enctype. Default is <code>multipart/form-data</code>.
  
###formData
An object that should be send with file upload. <code>data: { key1: 'value1', key2: 'value2' }</code>


###returnType 
Expected data type of the response. One of: null, 'xml', 'script', or 'json'. The dataType option provides a means for specifying how the server response should be handled. This maps directly to jQuery's dataType method. The following values are supported:

* 'xml': server response is treated as XML and the 'success' callback method, if specified, will be passed the responseXML value
* 'json': server response will be evaluted and passed to the 'success' callback, if specified
* 'script': server response is evaluated in the global context


###allowedTypes 
List of comma separated file extensions: Default is <code>"*"</code>. Example: <code>"jpg,png,gif"</code> 
   
###fileName 
Name of the file input field. Default is <code>file</code>
 
###multiple 
If it is set to <code>true</code>, multiple file selection is allowed. Default is<code>false</code>

###dragDrop
Drag drop is enabled if it is set to <cod>true</code>

###autoSubmit  
If it is set to <code>true</code>, files are uploaded automatically. Otherwise you need to call <code>.startUpload</code> function. Default is<code>true</code>
  
###showCancel 
If it is set to <code>false</code>, Cancel button is hidden when <code>autoSubmit</code> is false. Default is<code>true</code> 

###showAbort  
If it is set to <code>false</code>, Abort button is hidden when the upload is in progress. Default is<code>true</code>

###showDone  
If it is set to <code>false</code>, Done button is hidden when the upload is completed. Default is<code>true</code>
  
###showStatusAfterSuccess 
If it is set to <code>false</code>, status box will be hidden after the upload is done. Default is<code>true</code> 

###onSubmit
callback back to be invoked before the file upload.   
````javascript
onSubmit:function(files)
{
	//files : List of files to be uploaded
}
````

###onSuccess  
callback back to be invoked when the upload is successful. 
````javascript
onSuccess:function(files,data,xhr)
{
	//files: list of files
	//data: response from server
	//xhr : jquer xhr object
}
````

###onError  
callback back to be invoked when the upload is failed. 
````javascript
onError: function(files,status,errMsg)
{
	//files: list of files
	//status: error status
	//errMsg: error message
}
````
