<?php 
//require the SESSION
session_start();
//if the user is not logged in, redirect them to the login page
if ($_SESSION['username'] == null) 
{
 header('Location: Login.php');
}
//If the logout button is clicked: destroy all cookies and take the user to the login page
if (isset($_POST['logout']))
{
  session_destroy();
   // delete all cookies
  if (isset($_SERVER['HTTP_COOKIE'])) {
    $cookies = explode(';', $_SERVER['HTTP_COOKIE']);
    foreach($cookies as $cookie) {
      $parts = explode('=', $cookie);
      $name = trim($parts[0]);
      setcookie($name, '', time()-1000);
      setcookie($name, '', time()-1000, '/');
    }
    header('Location: login.php');  
  }
}

//if the stage cookie is less than 2 or doesn't exist, redirect the user to index.php
if(!isset($_COOKIE["stage"]) || $_COOKIE["stage"] < 2){
  header('Location: index.php');  
}
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Level 2</title>
  <!-- import all necessary external resources -->

  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">

  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>

  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>

  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">

  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/p5.js"></script>

  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.dom.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.sound.js"></script>
<!-- Reference the javascript and CSS files -->
  <script type="text/javascript" src="level2sketch.js"></script>
  <script type="text/javascript" src="level2classes.js"></script>
  <link rel="stylesheet" href="css/style.css">
   <!-- Activate JQuery tabs widget -->
  <script>
    $( function() {
      $( "#tabs" ).tabs({
        show: { effect: "blind", duration:800 }
      });
    } );
  </script>
</head>
<body>
  <div id="tabs">
   <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
    <div class="container">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">

        <!-- LOGOUT BUTTON -->
        <form method="POST">
          <button name = "logout" type = "submit" class="btn btn-outline-success"><i class="fas fa-sign-out-alt"></i><span>Logout</span></button>
        </form> 
      </div>
    </div>
  </nav>

  <div class = "container mcontainer">
    <h1>The Maze Game Level 2</h1>
    <div id="icon"></div>
    <br>
    <p>Congratulations on making it to <b>Level 2!</b> For this level, you will have to move using the <b>arrow keys and space to shoot</b>, <b>avoiding red blocks (enemies)</b> and <b>collecting blue blocks (health and ammo)</b>. Keep an eye on your <b>Health</b> and <b>Ammo</b>, the more you have at the end, the higher your score.<br><b>Tip:</b> line up the enemies and shoot.</p>

    <p><b>-You are the Green Block</b> <br> - Arrow Keys to move <br>- Space to shoot <br> - Avoid <b>Red Blocks</b><br> - Collect <b>Blue Blocks</b> <br> - you shoot in whatever <b>direction you were facing</b><br> - Wave changes every <b> 15 Seconds</b> bringing in <b>more enemies</b> <br><br> To Start or Pause <b>Left Click</b> the Battle Field</p>

    <br>
    <!-- Holds the maze and the health,ammo and wave displayer -->
    <div id="secondary"></div>
    <div id="main"></div>
  </div>


</body>
<script>
      //Ensure that the user cannot scrol lwith the arrow keys or space bar as these keys are used in the game and would interfere with gameplay if not discarded.
  window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false);
</script>
</html>
