<?php
date_default_timezone_set ( 'America/Phoenix' );
$endVal = 0;
if(isset($_POST['v5050'])){

    $endVal = (intval($_POST['v5050'])-50)/2;

    if ($endVal > 0) {
        $myfile = fopen("5050.json", "w") or die("Unable to open file!");
        fwrite($myfile, ceil($endVal/10)*10);
        fclose($myfile);
    }
}
?>


<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="2018">
    <meta name="author" content="Eric Totten">
    <meta name="keyword" content="2018">
    <title>2018 Butterfly Gala</title>

    <style>
        body {
            background-color: #000;
            text-align: center;
            vertical-align: middle;
            color: yellow;
            font-size: 50px;
        }

        input {
            font-size: 30px;
            padding: 10px;
            color: #3366FF;
        }

        .saved {
            color:#666;
            font-size:14px;
        }

    </style>
</head>

<body>

<?php
 if ($endVal > 0) {
  echo "<p class='saved'>Saved $".$_POST['v5050']." @ ".date("h:i:s")."</p>";
}
?>


<form method="post">
    <p>New 50/50 value:</p>
    <p><input type="number" name="v5050"/></p>
    <p><input type="submit"/></p>
</form>

</body>

</html>
