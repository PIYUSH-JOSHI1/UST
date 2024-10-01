# Track-V: Advanced Traffic Management Dashboard

## Overview

Track-V is a comprehensive traffic management dashboard designed for law enforcement and city planners. It provides real-time monitoring of traffic conditions, weather impacts, and inspector management across multiple junctions in a city.

## Features

- **Real-time Traffic Monitoring**: View live video feeds and traffic statistics from multiple junctions.
- **Interactive Dashboard**: Responsive design with dark/light mode toggle.
- **Detailed Reports**: Analyze traffic predictions, density, and congestion levels with interactive charts.
- **Weather Integration**: Monitor current weather conditions and their impact on traffic flow.
- **Inspector Management**: Add, remove, and manage traffic inspectors for each junction.
- **Map View**: Visualize junction locations and access video feeds directly from the map.
- **Alert System**: Send instant alerts to nearby junctions in case of emergencies.
- **Officer Profiles**: View and manage individual officer performance and activities.
- **System Mode Switch**: Toggle between automatic and manual traffic management modes.

## Technologies Used

- HTML5
- CSS3 (with custom properties for theming)
- JavaScript (ES6+)
- Chart.js for data visualization
- No external CSS frameworks - custom styling throughout

## Setup and Installation

1. Clone the repository:
  ```
https://github.com/PIYUSH-JOSHI1/UST.git

```


3. Navigate to the project directory:

```
cd track-v
```


3. Open the `index.html` file in a modern web browser.

Note: This project is currently a front-end only implementation. For a full-scale deployment, you would need to set up a back-end server and database.

## Usage

- Use the sidebar to navigate between different sections of the dashboard.
- In the main dashboard, you can view real-time traffic data and send alerts.
- The Reports section provides detailed analytics and predictions.
- Manage inspector assignments in the Inspectors section.
- Toggle between dark and light modes in the Settings section.
- View weather data and its impact on traffic in the Weather section.
- Use the Map View to get a geographical overview of all junctions.

## Customization

- To add new junctions or modify existing ones, update the relevant sections in the HTML and JavaScript code.
- Customize the charts in the `createPredictionChart`, `createDensityChart`, and `createCongestionChart` functions.
- Modify the `updateWeatherInfo` function to integrate with a real weather API.

## Future Enhancements

- Backend integration for real-time data processing and storage.
- User authentication and role-based access control.
- Mobile app version for on-the-go monitoring.
- Integration with traffic light control systems for automated management.
- Machine learning models for more accurate traffic predictions.

## Contributing

Contributions to Track-V are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.


## Contact

For any queries or suggestions, please open an issue in the GitHub repository.

---

Developed with ❤️ by Trac-v Team 
