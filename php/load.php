<?php
$dir="uploads";
$files = scandir($dir);

$ret= array();
foreach($files as $file)
{
	if($file == "." || $file == "..")
		continue;
	$ret[]=$file;

}

echo json_encode($ret);
?>