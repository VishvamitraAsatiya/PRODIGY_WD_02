let totalElapsedTime = 0;
let startTime;
let stopwatchInterval;
let isRunning = false;
let lapTimes = [];
let lastUpdateTime = 0;

function startStopwatch() {
    if (!isRunning) {
        startTime = performance.now();
        lastUpdateTime = startTime;
        stopwatchInterval = setInterval(updateStopwatch, 1); // Update every 1 millisecond
        isRunning = true;
    }
}

function stopStopwatch() {
    if (isRunning) {
        clearInterval(stopwatchInterval);
        totalElapsedTime += performance.now() - startTime;
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    totalElapsedTime = 0;
    isRunning = false;
    lapTimes = [];
    lastUpdateTime = 0;
    updateStopwatch();
    updateLapList();
    updateLapCounter();
    updateLapTime(0); // Reset lap time
}

function recordLap() {
    if (isRunning) {
        const lapTime = performance.now() - startTime + totalElapsedTime;
        lapTimes.unshift(lapTime);
        updateLapList();
        updateLapCounter();
        updateLapTime(lapTime);
    }
}

function updateStopwatch() {
    const currentTime = performance.now();
    const elapsed = isRunning ? totalElapsedTime + currentTime - startTime : totalElapsedTime;
    const deltaTime = currentTime - lastUpdateTime;
    lastUpdateTime = currentTime;

    const milliseconds = Math.floor(elapsed % 1000);
    const seconds = Math.floor((elapsed / 1000) % 60);
    const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
    const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);

    const formattedTime = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds) + ':' + padMilliseconds(milliseconds);
    document.getElementById('stopwatch').innerText = formattedTime;
}

function updateLapList() {
    const lapList = document.getElementById('lap-list');
    lapList.innerHTML = "";
    lapTimes.forEach((lapTime, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Lap ${index + 1}: ${formatLapTime(lapTime)}`;
        lapList.appendChild(listItem);

        // Change the background color of the lap entry based on index
        listItem.style.backgroundColor = index % 2 === 0 ? '#3498DB' : '#E74C3C';
    });
}

function updateLapCounter() {
    document.getElementById('lap-counter').innerText = `Laps: ${lapTimes.length}`;
}

function updateLapTime(lapTime) {
    const formattedTime = formatLapTime(lapTime);
    document.getElementById('lap-time').innerText = `Lap Time: ${formattedTime}`;
}

function changeColorZone(color) {
    const frame = document.getElementById('stopwatch-frame');
    frame.style.backgroundColor = color;

    const colorPickerFrame = document.querySelector('.color-picker-frame');
    colorPickerFrame.style.backgroundColor = color;
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}

function padMilliseconds(value) {
    return value < 10 ? '00' + value : (value < 100 ? '0' + value : value);
}

function formatLapTime(lapTime) {
    const milliseconds = Math.floor(lapTime % 1000);
    const seconds = Math.floor((lapTime / 1000) % 60);
    const minutes = Math.floor((lapTime / (1000 * 60)) % 60);
    const hours = Math.floor((lapTime / (1000 * 60 * 60)) % 24);
    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds) + ':' + padMilliseconds(milliseconds);
}
