/*!
 * jQuery Upload File Plugin
 * version: 1.0.0
 * @requires jQuery v1.6 or later & form plugin
 * Copyright (c) 2013 Ravishanker Kusuma
 * http://hayageek.com/
 */
(function ($) 
{
$.fn.uploadFile = function( options ) 
{
// This is the easiest way to have default options.
var s = $.extend({
// These are the defaults.
url: "",
method: "POST",
enctype: "multipart/form-data",
formData: null,
returnType:null,
allowedTypes:"*",
fileName:"file",
multiple:false,
autoSubmit:true,
showCancel:true,
showAbort:true,
showDone:true,
showStatusAfterSuccess:true,
buttonCss: false,
buttonClass: false,
onSubmit: function(files) {},
onSuccess: function(file, response) {},
onError: function(file, response) {},
uploadButtonClass:"ajax-file-upload"
}, options );

var formGroup = "ajax-file-upload-"+$(this).attr('id');

this.formGroup = formGroup;

$(this).click(function()
{
	$.fn.uploadFile.createAjaxForm(this,formGroup,s);
});

this.startUpload = function()
{
	$("."+this.formGroup).each(function(i,items)
	{
		$(this).submit();
	});	
}

$(this).addClass(s.uploadButtonClass);

return this;

};
$.fn.uploadFile.createAjaxForm = function (obj,group,s)
{

	var form = $("<form style='display:none;' class='"+group+"' method='"+s.method+"' action='"+s.url+"' enctype='"+s.enctype+"'></form>");
	
	var fileInputStr="<input type='file' name='"+s.fileName+"'/>";

	if(s.multiple)
	{
		if(s.fileName.indexOf("[]") != s.fileName.length-2 ) // if it does not endwith
		{
			s.fileName += "[]";
		}
		fileInputStr="<input type='file' name='"+s.fileName+"' multiple/>";
	}
	var fileInput =	$(fileInputStr).appendTo(form);
	
	
	var statusbar = $("<div class='ajax-file-upload-statusbar'></div>");
	var filename  = $("<div class='ajax-file-upload-filename'></div>").appendTo(statusbar);
	var progressDiv   =$("<div class='ajax-file-upload-progress'>").appendTo(statusbar).hide();
	var progressbar   =$("<div class='ajax-file-upload-bar'></div>").appendTo(progressDiv);
	var abort = $("<div class='ajax-file-upload-red'>Abort</div>").appendTo(statusbar).hide();
	var cancel = $("<div class='ajax-file-upload-red'>Cancel</div>").appendTo(statusbar).hide();
	var done = $("<div class='ajax-file-upload-green'>Done</div>").appendTo(statusbar).hide();
	

	 	$(fileInput).change(function()
	 	{
	 		var fileExtensions = s.allowedTypes.toLowerCase().split(",");
	 		var fileList="";
	 		var fileArray=[];

			if(this.files) //support reading files
			{
				for(i=0;i<this.files.length;i++)
		 		{
		 			var filenameStr = this.files[i].name;
		 			fileArray.push(filenameStr);
		 			var ext=filenameStr.split('.').pop().toLowerCase();
					if(s.allowedTypes != "*" && jQuery.inArray(ext,fileExtensions) < 0)
			 		{
			 			alert("File type is not allowed. Allowed only: "+s.allowedTypes);
			 			$(form).remove();
			 			return;
	 				}
	 				fileList += (i+1) +"). "+filenameStr;
	 				if(this.files.length !=0)
	 					fileList += "<br/>";
	 			}
			}
			else
			{
			 		var filenameStr=$(this).val();
			 		fileArray.push(filenameStr);
	
					var ext=filenameStr.split('.').pop().toLowerCase();
					if(s.allowedTypes != "*" && jQuery.inArray(ext,fileExtensions) < 0)
			 		{
			 			alert("File type is not allowed. Allowed only: "+s.allowedTypes);
			 			$(form).remove();
			 			return;
	 				}
	 				fileList= "1). "+filenameStr;
			
			}	 		
 	$('body').append(form);

	$(obj).after(statusbar);
	$(filename).html(fileList);
		 	
		 	
	var currentXHR=null;
    var options = { 
    forceSync: false,
    data:s.formData,
    dataType:s.returnType,
    beforeSend: function(xhr, o) 
    {
    	s.onSubmit.call(this,fileArray);
		$(progressDiv).show();
		$(cancel).hide();
		$(done).hide();
		if(s.showAbort)
		{
			$(abort).show();
			$(abort).click(function()
			{
				xhr.abort();
		 	});
		 }
    },
    uploadProgress: function(event, position, total, percentComplete) 
    {
	    var percentVal = percentComplete + '%';
	    $(progressbar).width(percentVal)
    },
    success: function(data,message,xhr) 
    {
        $(abort).hide();
    	s.onSuccess.call(this, fileArray,data, xhr);
        if(s.showStatusAfterSuccess)
        {
            if(s.showDone)
            {
	 			$(done).show();
 				$(done).click(function()
				{
				 	$(statusbar).hide("slow");
			 	});
		 	}
		 	else
		 	{
		 		$(done).hide();
		 	}
			$(progressbar).width('100%')
	    }
        else
        {
            $(statusbar).hide("slow");
        }
        $(form).remove();
    },
    error: function(xhr, status, errMsg)
    {
    	if(xhr.statusText == "abort") //we aborted it
    	{
	  		$(statusbar).hide("slow");
    	}
    	else
    	{
    		s.onError.call(this,fileArray,status,errMsg);
    		$(progressDiv).hide();
    		$(statusbar).append("<font color='red'>ERROR: "+errMsg+"</font>");
    	}
    	
    	$(abort).hide();
    	$(form).remove();
    } 
	}; 	
	
	if(s.autoSubmit)
	{
		$(form).ajaxSubmit(options); 
	}
	 else
	 {
	 	if(s.showCancel)
	 	{
			$(cancel).show();
			$(cancel).click(function()
	 		{
	 			$(form).remove();
	 			$(statusbar).remove();
			});
	 	}
		$(form).ajaxForm(options); 
	 		
	 }
	});
	
	 	
	$(fileInput).click();
	 	
}
}( jQuery ));
