
const mainContent = document.getElementById('mainContent');
const navItems = document.querySelectorAll('.nav-item');
let isDarkMode = true;
let isOnline = true;

const pages = {
    dashboard: `
        <h1>Traffic Dashboard</h1>
        <div style="margin-bottom: 20px;">
            <span>System Mode: <span id="systemMode">Online</span></span>
            <button id="modeSwitch" class="button" style="margin-left: 10px;">Switch to Manual Mode</button>
        </div>
        <div class="video-grid">
            ${[1, 2, 3, 4].map(i => `
                <div class="video-card">
                    <div class="video-placeholder">Video Feed ${i}</div>
                    <div class="video-info">
                        <h3>Junction ${i}</h3>
                        <div class="progress-bar">
                            <div class="progress-bar-fill" style="width: 40%; background-color: #f5a623;"></div>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-bar-fill" style="width: 60%; background-color: #7ed321;"></div>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-bar-fill" style="width: 20%; background-color: #d0021b;"></div>
                        </div>
                        <p>Congestion: <span id="congestion${i}">40%</span></p>
                        <p>Flow: <span id="flow${i}">60%</span></p>
                        <p>Incidents: <span id="incidents${i}">20%</span></p>
                        <button class="button" onclick="sendAlert(${i})">Send Alert</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `,
    reports: `
        <h1>Reports</h1>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
            ${[1, 2, 3, 4].map(i => `
                <div class="card">
                    <h2>Junction ${i} Report</h2>
                    <canvas id="predictionChart${i}"></canvas>
                    <canvas id="densityChart${i}"></canvas>
                    <canvas id="congestionChart${i}"></canvas>
                </div>
            `).join('')}
        </div>
    `,
    settings: `
        <h1>Settings</h1>
        <div class="card">
            <h2>Theme</h2>
            <label class="switch">
                <input type="checkbox" id="themeSwitch" ${isDarkMode ? 'checked' : ''}>
                <span class="slider"></span>
            </label>
            <span id="themeStatus">Dark Mode</span>
        </div>
        <div class="card">
            <h2>Notification Settings</h2>
            <label>
                <input type="checkbox" id="emailNotifications" checked>
                Email Notifications
            </label>
            <br>
            <label>
                <input type="checkbox" id="smsNotifications" checked>
                SMS Notifications
            </label>
        </div>
        <div class="card">
            <h2>Data Refresh Rate</h2>
            <select id="refreshRate">
                <option value="5000">5 seconds</option>
                <option value="10000" selected>10 seconds</option>
                <option value="30000">30 seconds</option>
                <option value="60000">1 minute</option>
            </select>
        </div>
    `,
    help: `
        <h1>Help Center</h1>
        <div class="card">
            <h2>Frequently Asked Questions</h2>
            <ul>
                <li>How do I interpret the traffic density data?</li>
                <li>What do the different congestion levels mean?</li>
                <li>How can I customize my dashboard view?</li>
                <li>What should I do if I notice a technical issue?</li>
                <li>How do I switch between Online and Manual modes?</li>
            </ul>
        </div>
        <div class="card">
            <h2>Switching Between Online and Manual Modes</h2>
            <p>To switch between Online and Manual modes:</p>
            <ol>
                <li>Click the "Switch to Online/Manual Mode" button on the dashboard.</li>
                <li>A dialog box will appear asking for authentication.</li>
                <li>Enter your email address and provide a reason for switching modes.</li>
                <li>Optionally, check the box to send a report to the developer.</li>
                <li>Click "Confirm Switch" to complete the process.</li>
            </ol>
            <p>This process ensures that mode switches are authenticated and logged for security purposes.</p>
        </div>
        <div class="card">
            <h2>Contact Support</h2>
            <p>For assistance, please contact the IT department:</p>
            <p>Email: it-support@police.gov.in</p>
            <p>Phone: 1800-123-4567</p>
            <p>Available 24/7</p>
        </div>
    `,
    profile: `
        <h1>Officer Profile</h1>
        <div class="card" style="display: flex; align-items: center;">
            <img src="https://placekitten.com/200/200" alt="Officer Rajesh Kumar" style="width: 100px; height: 100px; border-radius: 50%; margin-right: 20px;">
            <div>
                <h2>Rajesh Kumar</h2>
                <p><strong>Badge Number:</strong> IPS-2345</p>
                <p><strong>Rank:</strong> Sub-Inspector</p>
                <p><strong>Station:</strong> Central Police Station, Mumbai</p>
                <p><strong>Years of Service:</strong> 8</p>
                <p><strong>Specialization:</strong> Traffic Management</p>
            </div>
        </div>
        <div class="card">
            <h2>Performance Metrics</h2>
            <canvas id="performanceChart"></canvas>
        </div>
        <div class="card">
            <h2>Recent Activities</h2>
            <ul>
                <li>Completed advanced traffic management course - 15/09/2023</li>
                <li>Received commendation for managing Diwali traffic - 12/11/2023</li>
                <li>Implemented new traffic signal optimization system - 03/01/2024</li>
            </ul>
        </div>
    `,
    weather: `
        <h1>Weather Information</h1>
        <div class="card" style="display: flex; align-items: center;">
            <div id="mainWeatherIcon" class="weather-icon">🌤️</div>
            <div>
                <h2>Current Weather</h2>
                <p>Temperature: <span id="mainTemperature">--</span>°C</p>
                <p>Condition: <span id="mainCondition">--</span></p>
                <p>Humidity: <span id="humidity">--</span>%</p>
                <p>Wind Speed: <span id="windSpeed">--</span> km/h</p>
            </div>
        </div>
        <div class="card">
            <h2>Weather Map</h2>
            <div id="weatherMap" style="height: 300px; background-color: #ccc;">Weather Map Placeholder</div>
        </div>
        <div class="card">
            <h2>Weather Impact on Traffic</h2>
            <p>Current weather conditions may affect traffic flow. Please adjust traffic management strategies accordingly.</p>
            <canvas id="weatherImpactChart"></canvas>
        </div>
    `,
    inspectors: `
        <h1>Traffic Inspectors</h1>
        <div class="inspector-list">
            ${[1, 2, 3, 4].map(i => `
                <div class="inspector-card">
                    <h3>Junction ${i}</h3>
                    <p>Current Inspectors: <span id="currentInspectors${i}">3</span></p>
                    <p>New Assignments: <span id="newAssignments${i}">1</span></p>
                    <button class="add-inspector-btn" onclick="openAddInspectorModal(${i})">Add Inspector</button>
                    <button class="button" onclick="removeInspector(${i})">Remove Inspector</button>
                    <div id="inspectorList${i}"></div>
                </div>
            `).join('')}
        </div>
    `,
    map: `
        <h1>Map View</h1>
        <div class="card">
            <div id="junctionMap" style="position: relative; width: 100%; height: 400px;">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d945.0267555522158!2d73.77677846954332!3d18.659192869518318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b965ebdb974f%3A0x136afe4c7eba0341!2sFitu%20Hossain%20KGN%20Store!5e0!3m2!1sen!2sin!4v1727821424296!5m2!1sen!2sin" 
                    width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                </iframe>
                ${[1, 2, 3, 4].map(i => `
                    <div style="position: absolute; left: ${20 + i * 20}%; top: ${20 + i * 15}%; width: 20px; height: 20px; background-color: red; border-radius: 50%; cursor: pointer;" onclick="showJunctionVideo(${i})"></div>
                    <div id="videoFeed${i}" style="display: none; position: absolute; left: ${20 + i * 20}%; top: ${25 + i * 15}%; width: 200px; height: 150px; background-color: rgba(0,0,0,0.8); border: 2px solid white; color: white; text-align: center; line-height: 150px; z-index: 1000;">Video Feed ${i}</div>
                `).join('')}
            </div>
        </div>
    `
};

function setActivePage(pageId) {
    navItems.forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
    mainContent.innerHTML = pages[pageId];

    if (pageId === 'dashboard') {
        initializeDashboard();
    } else if (pageId === 'reports') {
        initializeReports();
    } else if (pageId === 'weather') {
        updateWeatherInfo();
        createWeatherImpactChart();
    } else if (pageId === 'profile') {
        createPerformanceChart();
    } else if (pageId === 'inspectors') {
        updateInspectorLists();
    }
}

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const pageId = item.getAttribute('data-page');
        setActivePage(pageId);
    });
});

function initializeDashboard() {
    const modeSwitch = document.getElementById('modeSwitch');
    const systemMode = document.getElementById('systemMode');

    modeSwitch.addEventListener('click', () => {
        openModeSwitch();
    });

    // Simulate real-time updates
    setInterval(() => {
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`congestion${i}`).textContent = Math.floor(Math.random() * 100) + '%';
            document.getElementById(`flow${i}`).textContent = Math.floor(Math.random() * 100) + '%';
            document.getElementById(`incidents${i}`).textContent = Math.floor(Math.random() * 100) + '%';
        }
    }, 5000);
}

function openModeSwitch() {
    const email = prompt("Enter your email for authentication:");
    if (email) {
        const reason = prompt("Provide a reason for switching modes:");
        if (reason) {
            const confirmReport = confirm("Do you want to send a report to the developer?");
            isOnline = !isOnline;
            document.getElementById('systemMode').textContent = isOnline ? 'Online' : 'Manual';
            document.getElementById('modeSwitch').textContent = `Switch to ${isOnline ? 'Manual' : 'Online'} Mode`;
            alert(`Mode switched to ${isOnline ? 'Online' : 'Manual'}. ${confirmReport ? 'A report has been sent to the developer.' : ''}`);
        }
    }
}

function initializeReports() {
    for (let i = 1; i <= 4; i++) {
        createPredictionChart(i);
        createDensityChart(i);
        createCongestionChart(i);
    }
}

function createPredictionChart(feedId) {
    const ctx = document.getElementById(`predictionChart${feedId}`).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Lane 1', 'Lane 2', 'Lane 3', 'Lane 4'],
            datasets: [{
                label: 'Predicted Count',
                data: [65, 59, 80, 81],
                backgroundColor: 'rgba(54, 162, 235, 0.6)'
            }, {
                label: 'Actual Count',
                data: [70, 62, 75, 85],
                backgroundColor: 'rgba(255, 99, 132, 0.6)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createDensityChart(feedId) {
    const ctx = document.getElementById(`densityChart${feedId}`).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
            datasets: [{
                label: 'Traffic Density',
                data: [30, 20, 40, 80, 65, 75, 90, 50],
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createCongestionChart(feedId) {
    const ctx = document.getElementById(`congestionChart${feedId}`).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            datasets: [{
                label: 'Congestion Level',
                data: [65, 59, 80, 81, 56],
                backgroundColor: 'rgba(255, 159, 64, 0.6)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function sendAlert(feedId) {
    alert(`Alert sent for Junction ${feedId}. SMS notification dispatched to nearest junction.`);
}

function updateWeatherInfo() {
    // Simulate weather data (replace with actual API call in production)
    const temperature = Math.floor(Math.random() * 15) + 20; // 20-35°C
    const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Stormy'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const humidity = Math.floor(Math.random() * 30) + 40; // 40-70%
    const windSpeed = Math.floor(Math.random() * 20) + 5; // 5-25 km/h

    document.getElementById('temperature').textContent = temperature;
    document.getElementById('condition').textContent = condition;
    document.getElementById('mainTemperature').textContent = temperature;
    document.getElementById('mainCondition').textContent = condition;
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('windSpeed').textContent = windSpeed;

    // Update weather icons
    const weatherIcon = document.getElementById('weatherIcon');
    const mainWeatherIcon = document.getElementById('mainWeatherIcon');
    switch(condition) {
        case 'Sunny':
            weatherIcon.textContent = '☀️';
            mainWeatherIcon.textContent = '☀️';
            break;
        case 'Cloudy':
            weatherIcon.textContent = '☁️';
            mainWeatherIcon.textContent = '☁️';
            break;
        case 'Rainy':
            weatherIcon.textContent = '🌧️';
            mainWeatherIcon.textContent = '🌧️';
            break;
        case 'Stormy':
            weatherIcon.textContent = '⛈️';
            mainWeatherIcon.textContent = '⛈️';
            break;
    }
}

function createWeatherImpactChart() {
    const ctx = document.getElementById('weatherImpactChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
            datasets: [{
                label: 'Traffic Flow',
                data: [70, 62, 75, 85, 80, 70, 65, 72],
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createPerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Traffic Management', 'Public Relations', 'Report Writing', 'Emergency Response', 'Team Leadership'],
            datasets: [{
                label: 'Officer Performance',
                data: [85, 75, 90, 80, 70],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            }]
        },
        options: {
            responsive: true,
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.style.setProperty('--background-color', isDarkMode ? '#1a1a1a' : '#ffffff');
    document.body.style.setProperty('--text-color', isDarkMode ? '#ffffff' : '#000000');
    document.body.style.setProperty('--card-bg-color', isDarkMode ? '#2c2c2c' : '#f0f0f0');
    document.getElementById('themeStatus').textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';
}

function openAddInspectorModal(junctionId) {
    const modal = document.getElementById('addInspectorModal');
    document.getElementById('junctionId').value = junctionId;
    modal.style.display = 'block';
}

function closeAddInspectorModal() {
    const modal = document.getElementById('addInspectorModal');
    modal.style.display = 'none';
}

document.querySelector('.close').onclick = closeAddInspectorModal;

window.onclick = function(event) {
    const modal = document.getElementById('addInspectorModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

document.getElementById('addInspectorForm').onsubmit = function(e) {
    e.preventDefault();
    const junctionId = document.getElementById('junctionId').value;
    const name = document.getElementById('inspectorName').value;
    const phone = document.getElementById('inspectorPhone').value;
    const email = document.getElementById('inspectorEmail').value;

    // Add inspector to the list (in a real app, this would involve a backend call)
    const inspectorList = document.getElementById(`inspectorList${junctionId}`);
    const newInspector = document.createElement('div');
    newInspector.innerHTML = `
        <p><strong>${name}</strong></p>
        <p>Phone: ${phone}</p>
        <p>Email: ${email}</p>
    `;
    inspectorList.appendChild(newInspector);

    // Update the count
    const currentInspectorsElement = document.getElementById(`currentInspectors${junctionId}`);
    const currentCount = parseInt(currentInspectorsElement.textContent);
    currentInspectorsElement.textContent = currentCount + 1;

    closeAddInspectorModal();
}

function removeInspector(junctionId) {
    const inspectorList = document.getElementById(`inspectorList${junctionId}`);
    if (inspectorList.lastChild) {
        inspectorList.removeChild(inspectorList.lastChild);

        // Update the count
        const currentInspectorsElement = document.getElementById(`currentInspectors${junctionId}`);
        const currentCount = parseInt(currentInspectorsElement.textContent);
        currentInspectorsElement.textContent = Math.max(0, currentCount - 1);
    }
}

function updateInspectorLists() {
    // Simulate initial inspector data
    for (let i = 1; i <= 4; i++) {
        const inspectorList = document.getElementById(`inspectorList${i}`);
        inspectorList.innerHTML = `
            <div>
                <p><strong>Inspector ${i}</strong></p>
                <p>Phone: 123-456-789${i}</p>
                <p>Email: inspector${i}@police.gov.in</p>
            </div>
        `;
    }
}

function showJunctionVideo(junctionId) {
    const videoFeed = document.getElementById(`videoFeed${junctionId}`);
    videoFeed.style.display = videoFeed.style.display === 'none' ? 'block' : 'none';
}

// Initialize the dashboard
setActivePage('dashboard');

// Theme switch event listener
document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'themeSwitch') {
        toggleTheme();
    }
});

// Simulate periodic weather updates
setInterval(updateWeatherInfo, 300000); // Update every 5 minutes
