<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Track-V Dashboard</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="container">
        <div class="sidebar">
            <div class="logo">Track-V</div>
            <div class="nav-item active" data-page="dashboard">📊 Dashboard</div>
            <div class="nav-item" data-page="reports">📈 Reports</div>
            <div class="nav-item" data-page="settings">⚙️ Settings</div>
            <div class="nav-item" data-page="help">❓ Help</div>
            <div class="nav-item" data-page="profile">👤 Profile</div>
            <div class="nav-item" data-page="weather">🌤️ Weather</div>
            <div class="nav-item" data-page="inspectors">👮 Inspectors</div>
            <div class="nav-item" data-page="map">🗺️ Map View</div>
            <div class="weather-widget">
                <div id="weatherIcon" class="weather-icon">🌤️</div>
                <div>
                    <p>Temperature: <span id="temperature">--</span>°C</p>
                    <p>Condition: <span id="condition">--</span></p>
                </div>
            </div>
            <button class="button" style="width: 100%; margin-top: 20px;"> <a href="index.html"> Logout</a></button>
        </div>
        <div class="main-content" id="mainContent">
            <!-- Content will be dynamically inserted here -->
        </div>
    </div>

    <div id="addInspectorModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Add Inspector</h2>
            <form id="addInspectorForm">
                <input type="hidden" id="junctionId" name="junctionId">
                <label for="inspectorName">Name:</label>
                <input type="text" id="inspectorName" name="inspectorName" required><br><br>
                <label for="inspectorPhone">Phone:</label>
                <input type="tel" id="inspectorPhone" name="inspectorPhone" required><br><br>
                <label for="inspectorEmail">Email:</label>
                <input type="email" id="inspectorEmail" name="inspectorEmail" required><br><br>
                <button type="submit" class="button">Add Inspector</button>
            </form>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
