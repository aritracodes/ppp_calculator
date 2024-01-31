<?php include_once('internal/db_connect.int.php'); ?>
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PPP Calculator</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">
    <link rel="stylesheet" href="style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
</head>
<body>

    
      
    <!-- <div class="container">
        <div class="main">
          <h2>Dropdown with search box<h2> -->
          <!-- <select name="">
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
        </select> -->
        <!-- </div>
      </div> -->



      
    <?php include_once('internal/nav.int.php'); ?>


      <main class="calculator pt-3">
        <div class="primaryColorbg h-full w-75 ml-auto transition relative left-100 absolute z-99 d-none">

            <div class="">
                <ul class="flex-col-alignCenter">
                    <li class="x-font"><a href="#" class="mr-2">Tools</a></li>
                    <li class="x-font"><a href="#">About Us</a></li>
                    <li class="x-font"><a href="#">Privacy Policy</a></li>
                    <li class="x-font"><a href="#">Contact Us</a></li>
                </ul>
            </div>


            

        <?php
            $sql_get_countries = $pdo->prepare('SELECT * FROM `countries_ppp`');
            $sql_get_countries->execute();
            $rows = $sql_get_countries->fetchAll(PDO::FETCH_ASSOC);
            
        ?>    

        </div>
        <div class="container flex flex-row justify-between mobile:flex-col">
            <div class="mobile:margin-bottom-2 desktop:mr-1.5">
                <form action="" method="POST">
                    <h1 class="dropdownCountries">PPP Calculator</h1>
                    <div>
                        <label for="">Your Current Country</label>
                        <select name="" class="dropdownCountries" data-theme="dark">
                        <?php foreach($rows as $row){ ?>
                            <option value="1"><?= $row['country_name'] ?></option>
                        <?php } ?>
                        </select>
                        <!-- <input type="text" name="source" placeholder="India" style="display: none;" required> -->
                    </div>
                    <div>
                        <label for="">Your Salary In India</label>
                        <input type="number" name="salary" placeholder="100000" required>
                    </div>
                    <div>
                        <label for="">Target Country</label>
                        <!-- <input type="text" name="target" placeholder="USA" required> -->
                        <select name="" class="dropdownCountries" data-theme="dark">
                        <?php foreach($rows as $row){ ?>
                            <option value="1"><?= $row['country_name'] ?></option>
                        <?php } ?>
                        </select>
                    </div>
                    <div><button class="primaryColor" type="submit">Calculate</button></div>
                </form>
                <div>
                    <label for="">Your Purchasing Power</label>
                    <input type="number" class="readonly" name="ppp" placeholder="$870" readonly>
                </div>
            </div>
            
            <div class="flex-aligncenter">
                <div id="chart"></div>
            </div>
        </div>
      </main>

    






      <script src="script.js">
        
      </script>
      
</body>
</html>