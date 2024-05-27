document.addEventListener('DOMContentLoaded', function() {
    // Function to start the game
    function startGame() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        // Placeholder image URLs (adjust these paths as needed)
        const carImage = new Image();
        carImage.src = 'redbull_car.jpg';
        const canImage = new Image();
        canImage.src = 'redbull_can.jpg';
        const maxPowerupImage = new Image();
        maxPowerupImage.src = 'max_powerup.png';
        const raceTrackImage = new Image();
        raceTrackImage.src = 'race_track.jpg';

        const bgMusic = new Audio('background_music.mp3'); // Replace with the path to your music file
        bgMusic.loop = true; // Set the music to loop
        bgMusic.play(); // Start playing the music

        let score = 0;
        let playerX = canvas.width / 2;
        let playerY = canvas.height - 150;
        let canSpeed = 5;
        let canX = Math.random() * (canvas.width - 50);
        let canY = -50;
        let powerupSpeed = 3;
        let powerupX = Math.random() * (canvas.width - 30);
        let powerupY = -500;
        let elapsedTime = 0;
        let gameRunning = true;

        function gameLoop() {
            if (gameRunning) {
                update();
                draw();
            }
            requestAnimationFrame(gameLoop);
        }

        function update() {
            elapsedTime += 1 / 60;
            if (elapsedTime >= 60) {
                gameRunning = false;
            }

            // Update player movement
            if (keys.ArrowLeft && playerX > 0) {
                playerX -= 5;
            }
            if (keys.ArrowRight && playerX < canvas.width - 50) {
                playerX += 5;
            }

            // Move cans and powerups
            canY += canSpeed;
            if (canY > canvas.height) {
                canX = Math.random() * (canvas.width - 50);
                canY = -50;
            }
            powerupY += powerupSpeed;
            if (powerupY > canvas.height) {
                powerupX = Math.random() * (canvas.width - 30);
                powerupY = -500;
            }

            // Collision detection
            if (playerX < canX + 50 && playerX + 50 > canX && playerY < canY + 50 && playerY + 100 > canY) {
                score++;
                canX = Math.random() * (canvas.width - 50);
                canY = -50;
            }
            if (playerX < powerupX + 30 && playerX + 50 > powerupX && playerY < powerupY + 30 && playerY + 100 > powerupY) {
                score += 5;
                powerupX = Math.random() * (canvas.width - 30);
                powerupY = -500;
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(raceTrackImage, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(carImage, playerX, playerY, 110, 110);
            ctx.drawImage(canImage, canX, canY, 70, 70);
            ctx.drawImage(maxPowerupImage, powerupX, powerupY, 70, 70);

            ctx.fillStyle = 'white';
            ctx.font = '36px Arial';
            ctx.fillText(`Score: ${score}`, canvas.width - 200, 50);
            ctx.fillText(`Time: ${Math.max(0, 60 - elapsedTime).toFixed(0)}`, canvas.width - 200, 100);

            if (!gameRunning) {
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'white';
                ctx.font = '36px Arial';
                ctx.fillText('GAME OVER', canvas.width / 2 - 100, canvas.height / 2 - 50);
                ctx.fillText(`FINAL SCORE: ${score}`, canvas.width / 2 - 120, canvas.height / 2);
                ctx.font = '24px Arial';
                ctx.fillText('READY TO GRAB YOUR WIIINGS?', canvas.width / 2 - 190, canvas.height / 2 + 50);
            }
        }

        const keys = {};
        document.addEventListener('keydown', (event) => {
            keys[event.key] = true;
        });
        document.addEventListener('keyup', (event) => {
            keys[event.key] = false;
        });

        gameLoop();
    }

    // Get a reference to the Start Game button
    const startButton = document.getElementById('startButton');

    // Add a click event listener to the button
    startButton.addEventListener('click', function() {
        // Call the startGame function when the button is clicked
        startGame();
    });
});
