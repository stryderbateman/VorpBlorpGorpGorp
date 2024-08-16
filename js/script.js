$(document).ready(function () {
    var level = 1; // Starting level
    var mazeHeight = 1200; // Increased maze height
    var mazeWidth = 1200; // Increased maze width
    var playerX, playerY, endX, endY;
    var timer = 180; // Increased timer to 180 seconds
    var timerInterval;

    function updateTimer() {
        $('#timer').text("Time left: " + timer + "s");
    }

    function countdown() {
        timerInterval = setInterval(function() {
            if (timer > 0) {
                timer--;
                updateTimer();
            } else {
                clearInterval(timerInterval);
                alert("Time's up! Game over.");
                level = 1;
                resetGame();
            }
        }, 1000);
    }

    function generateMaze(level) {
        // Clear existing maze
        $('#maze').empty();

        // Player starting position (random)
        playerX = Math.floor(Math.random() * (mazeWidth / 60)) * 60; // Increased by a factor of 3
        playerY = Math.floor(Math.random() * (mazeHeight / 60)) * 60; // Increased by a factor of 3

        // End position of the maze (random)
        endX = Math.floor(Math.random() * (mazeWidth / 60)) * 60; // Increased by a factor of 3
        endY = Math.floor(Math.random() * (mazeHeight / 60)) * 60; // Increased by a factor of 3

        // Create player
        $('#maze').append('<div class="player" id="player" style="top: ' + playerY + 'px; left: ' + playerX + 'px; width: 60px; height: 60px;"></div>'); // Adjusted size

        // Create end point of the maze
        $('#maze').append('<div class="end" id="end" style="top: ' + endY + 'px; left: ' + endX + 'px; width: 60px; height: 60px;"></div>'); // Adjusted size

        // Create maze walls based on level
        var wallCoordinates = [];
        var wallCount = level * 50; // Increase wall count with level

        for (var i = 0; i < wallCount; i++) {
            var randomX = Math.floor(Math.random() * (mazeWidth / 60)) * 60; // Increased by a factor of 3
            var randomY = Math.floor(Math.random() * (mazeHeight / 60)) * 60; // Increased by a factor of 3
            wallCoordinates.push({ top: randomY, left: randomX });
        }

        // Append walls to the maze
        for (var i = 0; i < wallCoordinates.length; i++) {
            $('#maze').append('<div class="wall" style="top: ' + wallCoordinates[i].top + 'px; left: ' + wallCoordinates[i].left + 'px; width: 60px; height: 60px;"></div>'); // Adjusted size
        }
    }

    function movePlayer(dx, dy) {
        var newX = playerX + dx;
        var newY = playerY + dy;
        
        if (newX === endX && newY === endY) {
            $('#end').css('background-color', 'green');
            alert("Congratulations! You've reached the end of the maze!");
            level++;
            $('#level').text("Level: " + level);
            generateMaze(level);
            return;
        }
        
        // Check if the next position overlaps with any wall
        var isOverlapping = false;
        $('.wall').each(function() {
            var wallX = parseInt($(this).css('left'));
            var wallY = parseInt($(this).css('top'));
            if (newX === wallX && newY === wallY) {
                isOverlapping = true;
                return false; // Break the loop
            }
        });

        // Move the player if not overlapping with a wall
        if (!isOverlapping && newX >= 0 && newX < mazeWidth && newY >= 0 && newY < mazeHeight) {
            playerX = newX;
            playerY = newY;
            $('#player').css({ top: playerY + 'px', left: playerX + 'px' });
        }
    }

    function resetGame() {
        clearInterval(timerInterval);
        timer = 180; // Reset timer to 180 seconds
        updateTimer();
        $('#level').text("Level: " + level);
        generateMaze(level);
        countdown();
    }

    $(document).keydown(function (e) {
        switch (e.which) {
            case 37:
                movePlayer(-60, 0); // Increased movement by a factor of 3
                break;
            case 38:
                movePlayer(0, -60); // Increased movement by a factor of 3
                break;
            case 39:
                movePlayer(60, 0); // Increased movement by a factor of 3
                break;
            case 40:
                movePlayer(0, 60); // Increased movement by a factor of 3
                break;
        }
    });

    $('#level').text("Level: " + level);
    generateMaze(level);
    countdown();

    // Display controls
    $('#controls').html('Controls: Arrow keys to move (← ↑ → ↓)');

    function generateMaze(level) {
        // Clear existing maze
        $('#maze').empty();
    
        // Player starting position (random)
        playerX = Math.floor(Math.random() * (mazeWidth / 60)) * 60; // Increased by a factor of 3
        playerY = Math.floor(Math.random() * (mazeHeight / 60)) * 60; // Increased by a factor of 3
    
        // End position of the maze (random)
        endX = Math.floor(Math.random() * (mazeWidth / 60)) * 60; // Increased by a factor of 3
        endY = Math.floor(Math.random() * (mazeHeight / 60)) * 60; // Increased by a factor of 3
    
        // Define an array of jQuery animations
        var animations = ['bounce', 'shake', 'swing', 'slideToggle', 'fadeOut', 'fadeIn'];
    
        // Create player with a random animation
        var playerAnimation = animations[Math.floor(Math.random() * animations.length)];
        var player = $('<div class="player" id="player" style="top: ' + playerY + 'px; left: ' + playerX + 'px; width: 60px; height: 60px;"></div>'); // Adjusted size
        player.hide();
        $('#maze').append(player);
        player.show(playerAnimation);
    
        // Create end point of the maze with a random animation
        var endAnimation = animations[Math.floor(Math.random() * animations.length)];
        var end = $('<div class="end" id="end" style="top: ' + endY + 'px; left: ' + endX + 'px; width: 60px; height: 60px;"></div>'); // Adjusted size
        end.hide();
        $('#maze').append(end);
        end.show(endAnimation);
    
        // Create maze walls based on level
        var wallCoordinates = [];
        var wallCount = level * 50; // Increase wall count with level
    
        for (var i = 0; i < wallCount; i++) {
            var randomX = Math.floor(Math.random() * (mazeWidth / 60)) * 60; // Increased by a factor of 3
            var randomY = Math.floor(Math.random() * (mazeHeight / 60)) * 60; // Increased by a factor of 3
            wallCoordinates.push({ top: randomY, left: randomX });
        }
    
        // Create and animate walls
        for (var i = 0; i < wallCoordinates.length; i++) {
            var wallAnimation = animations[Math.floor(Math.random() * animations.length)];
            var wall = $('<div class="wall" style="top: ' + wallCoordinates[i].top + 'px; left: ' + wallCoordinates[i].left + 'px; width: 60px; height: 60px;"></div>'); // Adjusted size
            wall.hide();
            $('#maze').append(wall);
            wall.show(wallAnimation);
        }
    }
});
