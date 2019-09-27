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
//if the stage cookie is not 3 or doesn't exist, redirect the user to index.php
if(!isset($_COOKIE["stage"]) || $_COOKIE["stage"] != 3){
  header('Location: level2.php');  
}
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>maze_challenge</title>
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
  <link rel="stylesheet" href="css/style.css">
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
        <!-- Back to level 1 button -->
        <ul class="navbar-nav ml-auto">
          <li class='nav-item active'><button class='btn btn-outline-primary' onclick="Rdirect();">Back to Maze level 1</button></li> &nbsp;
        </ul>
      </div>
    </div>
  </nav>

  <div class = "container mcontainer">
    <h1>Results</h1>
    <br>
    <?php 
    //IF the score cookies exists, check if the players existing high score is less than their newly gained one, if so, update it, if not, display informatio nabout their score and display their old and higher score
    if(isset($_COOKIE["score"])){
      $score = $_COOKIE["score"];
      $name = $_SESSION['username'];
      

      $stmt = "SELECT * FROM users WHERE username = '$name';";
      if($result = $conn->query($stmt))
      {
        $row = $result->fetch_assoc();
        
        if ($score > $row['Score']) {
          echo "Well Done, ".$_SESSION['username'].". You Scored ". $_COOKIE["score"] ." points! View the Scoreboard below to see if you beat our current champion <br>";
          $stmt = "UPDATE users SET Score = '$score' WHERE Username = '$name';";
          if($conn->query($stmt) === TRUE) {

            echo "<br> User Score updated!";

          } else {

            echo "<br> Something went wrong. Score wasn't updated.\r\n".$conn->error;

          }
        }
        else if ($score < $row['Score']){
          echo $_SESSION['username'].", You scored less than last time:  ". $_COOKIE["score"] ." points. So your score on the ScoreBoard hasn't changed <br>";
        }
      }
      

      

    }
    else{
      echo "<br> Score not found, please try again.";
    }
    ?>
    <br>
    <!-- Show scoreboard. -->
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
          echo "Could not fetch users.";
        }
        ?>
      </tbody>
    </table>

  </div>


</body>
<script>
  //Redirect to level 1 with the score and stage cookies reset
  function Rdirect(){
    document.cookie = "score=" + 0;
    document.cookie = "stage=" + 1;
    window.location.href = "index.php"; 
  }
</script>
</html>
