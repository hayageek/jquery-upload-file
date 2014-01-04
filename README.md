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

###stopUpload()
Aborts all the uploads
````javascript
uploadObj.stopUpload();
````

#getResponses()
Responses from the server are collected  and returned.
````javascript
uploadObj.getResponses()
````

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

###dynamicFormData
To provide form data dynamically
````javascript
dynamicFormData: function()
{
    //var data ="XYZ=1&ABCD=2";
    var data ={"XYZ":1,"ABCD":2};
	return data;    	
}
````

###maxFileSize
Allowed Maximum file Size in bytes.

###maxFileCount
Allowed Maximum number of files to be uploaded 


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

###showDelete
If it is set to <code>true</code>, Delete button is shown when the upload is completed. Default is<code>false</code>,You need to 
implement deleteCallback() function.
  
###showStatusAfterSuccess 
If it is set to <code>false</code>, status box will be hidden after the upload is done. Default is<code>true</code> 

###showError
If it is set to <code>false</code>, Errors are not shown to user. Default is<code>true</code> 

###showFileCounter
If it is set to <code>true</code>, File counter is shown with name. Default is<code>true</code>
File Counter style can be changed using <code>fileCounterStyle</code>. Default is <code>). </code>

###showProgress
If it is set to <code>true</code>, Progress precent is shown to user. Default is<code>false</code> 


###onSelect
callback back to be invoked when the file selected.   
````javascript
onSelect:function(files)
{
	files[0].name;
	files[0].size;
	return true; //to allow file submission.
}
````
###onSubmit
callback back to be invoked before the file upload.   
````javascript
onSubmit:function(files)
{
	//files : List of files to be uploaded
	//return flase;   to stop upload
}
````

###onSuccess  
callback to be invoked when the upload is successful. 
````javascript
onSuccess:function(files,data,xhr)
{
	//files: list of files
	//data: response from server
	//xhr : jquer xhr object
}
````
###afterUploadAll
callback to be invoked when all the files are uploaded.
````javascript
afterUploadAll:function(obj)
{
	//You can get data of the plugin using obj
}
````

###onError  
callback  to be invoked when the upload is failed. 
````javascript
onError: function(files,status,errMsg)
{
	//files: list of files
	//status: error status
	//errMsg: error message
}
````
###deleteCallback  
callback  to be invoked when the user clicks on Delete button.
````javascript
deleteCallback: function(data,pd)
{
	for(var i=0;i<data.length;i++)
	{
	 	$.post("delete.php",{op:"delete",name:data[i]},
	    function(resp, textStatus, jqXHR)
	    {
			//Show Message	
			alert("File Deleted");	    
	    });
	 }		
	pd.statusbar.hide(); //You choice to hide/not.

}
````




