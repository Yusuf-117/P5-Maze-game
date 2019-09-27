<?php
//bring in external variables e.g. SESSION and DATABASE connection
require('db.php'); 
session_start();
//Checking if someone is logged in
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
?>
<!DOCTYPE html>
<html>
<head>

  <meta charset="UTF-8">
  <title>Level 1</title>
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
  <script type="text/javascript" src="sketch.js"></script>
  <script type="text/javascript" src="classes.js"></script>
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

          <ul class="navbar-nav ml-auto">
            <li class='nav-item active'><button class='btn btn-outline-primary'><a class='nav-link' href='#maze'>Maze Game</a></button></li> &nbsp;
            <li class='nav-item active'><button class='btn btn-outline-primary'><a class='nav-link' href='#SBoard'>ScoreBoard</a></button></li> &nbsp;
          </ul>
        </div>
      </div>
    </nav>

    <div class = "container mcontainer">
      <div id='maze'> 
        <h1>The Maze Game Level 1</h1>
        <div id="icon"></div>
        <br>
        <p>Welcome to Yusuf Ibrahim's Maze Game, currently consisting of two types of games and two levels. Your task for this level is simple: <b>Get the Student to the BMET logo </b> at the bottom left whilst <b> avoiding traffic (cones) and collecting hearts<br>Tip:</b> The more health you have by the end of this level, the higher your score will be by the end <br> On the rare chance that you are trapped by walls, simply refresh the page.<br></p>
        <br>
        <!-- Holds the maze and the health displayer -->
        <div id="secondary"></div>
        <div id="main"></div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium architecto, reprehenderit quia delectus voluptatum illum eum deleniti dolorem incidunt in nisi nemo nostrum repellat sapiente, dolorum dicta officia esse? Ratione. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam molestiae esse rerum dolor consequuntur, voluptates illum recusandae hic illo maxime, ducimus officiis fugiat temporibus omnis placeat vero repellendus ea enim.</p>
        
      </div>
<!-- Display the Scoreboad -->
      <div id='SBoard'> 
        <h1>ScoreBoard</h1>
        <div id="about"></div>
        <br>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            <?php 
            $stmt = "SELECT * FROM users order by Score DESC";

            if($result = $conn->query($stmt))
            {
              while($row = $result->fetch_assoc())
              {
                echo "<tr><th scope='row'>".$row['ID']."</th><td>".$row['Username']."</td><td>".$row['Score']."</td></tr>";
              }


            } else 
            {

              echo "Could not fetch articles.";

            }
            ?>
          </tbody>
        </table>
      </div>
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