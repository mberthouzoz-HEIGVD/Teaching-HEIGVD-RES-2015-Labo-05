<html>
<head>
    <title>Application WEB</title>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css.css" media="all"/>
    <script src="js/jquery-1.11.3.min.js"></script>

</head>
<body>
<div class="well">
    IP du serveur qui a repondu : <?php echo $_SERVER['SERVER_ADDR']; ?>
</div>

<h1></h1>

<div class="row">
    <div class="col-md-12">
        <button class="btn btn-primary" type="button" name="getColor" onClick="getColor();">C'est parti !</button>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <ul id="color">

        </ul>
    </div>
</div>
</body>
</html>