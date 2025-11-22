# Custom TMS - Tooling Management System

A comprehensive, modern web application for managing tools, equipment, and resources in industrial and workshop environments.

## Features

### 🏠 Dashboard
- **Real-time Metrics**: Total tools, checked out items, maintenance alerts, and inventory value
- **Interactive Charts**: Tool usage trends and analytics
- **Recent Activity Feed**: Live updates on tool movements and maintenance
- **System Alerts**: Overdue maintenance, calibration reminders, and notifications
- **Quick Actions**: Fast access to common tasks

### 📦 Tool Inventory Management
- **Complete Tool Catalog**: Detailed tool information with categories and specifications
- **Visual Tool Cards**: Easy-to-scan interface with status indicators
- **Advanced Search & Filtering**: Find tools by name, ID, category, or status
- **Bulk Operations**: Import/export tool data
- **Custom Categories**: Organize tools by type, department, or location

### 🔧 Maintenance Scheduling
- **Preventive Maintenance**: Schedule routine maintenance based on usage or time
- **Maintenance Calendar**: Visual scheduling interface
- **Work Order Management**: Create and track maintenance tasks
- **Technician Assignment**: Assign maintenance to specific team members
- **Maintenance History**: Complete records of all maintenance activities

### 📋 Check-Out/Check-In System
- **Digital Check-Out**: Barcode/QR code scanning support
- **User Assignment**: Track who has which tools
- **Due Date Management**: Automatic reminders for overdue returns
- **Return Condition Tracking**: Document tool condition upon return
- **Usage Analytics**: Track tool utilization patterns

### 👥 User Management
- **Role-Based Access**: Different permission levels (Admin, Supervisor, Technician)
- **User Profiles**: Contact information and activity history
- **Department Organization**: Manage users by department or team
- **Activity Tracking**: Monitor user interactions with the system

### 📊 Reports & Analytics
- **Utilization Reports**: Tool usage efficiency and patterns
- **Maintenance Reports**: Costs, schedules, and performance metrics
- **Inventory Reports**: Current status, value, and procurement needs
- **Custom Reports**: Generate reports with flexible date ranges and filters
- **Export Options**: PDF, Excel, and CSV formats

### ⚙️ System Settings
- **Company Branding**: Customize logo and company information
- **Notification Settings**: Configure email and system alerts
- **Security Settings**: Session management and authentication
- **System Preferences**: Default check-out durations and other options

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Variables for theming
- **Charts**: Chart.js for data visualization
- **Icons**: Font Awesome 6
- **Fonts**: Inter font family for modern typography
- **Responsive**: Mobile-first responsive design

## Installation

1. **Clone or Download** the project files
2. **Web Server**: Serve the files through a web server (Apache, Nginx, or development server)
3. **Dependencies**: All dependencies are loaded via CDN - no local installation required

### Local Development

For local development, you can use any simple HTTP server:

```bash
# Python 3
python -m http.server 8000

# Node.js (with http-server)
npx http-server

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your web browser.

## File Structure

```
Custom_TMS/
├── index.html              # Main application file
├── assets/
│   ├── css/
│   │   └── styles.css      # Application styles
│   ├── js/
│   │   └── app.js          # Application logic
│   └── img/
│       └── default-avatar.png
├── README.md               # This file
└── LICENSE                 # License information
```

## Usage

### Getting Started

1. **Open the Application**: Navigate to `index.html` in your web browser
2. **Explore the Dashboard**: View system metrics and recent activity
3. **Manage Inventory**: Add tools, update information, and track status
4. **Schedule Maintenance**: Create maintenance schedules and work orders
5. **Check Out Tools**: Assign tools to users with return dates
6. **Generate Reports**: Create utilization and maintenance reports

### Adding Tools

1. Click "Add New Tool" from the dashboard or inventory page
2. Fill in tool information (name, category, purchase price, description)
3. Save the tool to add it to the inventory

### Scheduling Maintenance

1. Navigate to the Maintenance page
2. Click "Schedule Maintenance"
3. Select the tool, maintenance type, date, and technician
4. Add any special notes or instructions

### Checking Out Tools

1. Go to the Check Out/In page
2. Click "Check Out Tool"
3. Search for the tool and select the user
4. Set the return date and purpose
5. Complete the check-out process

## Customization

### Theming

The application uses CSS custom properties (variables) for easy theming. Modify the `:root` section in `styles.css` to change:

- Colors (primary, secondary, status colors)
- Spacing and layout
- Border radius and shadows
- Typography

### Adding Features

The application is built with a modular structure. To add new features:

1. **HTML**: Add new page sections in `index.html`
2. **CSS**: Add styles for new components in `styles.css`
3. **JavaScript**: Extend the `CustomTMS` class in `app.js`

### Sample Data

The application includes sample data for demonstration. Replace the `generateSampleData()` method with API calls to your backend system.

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Features Used**: CSS Grid, CSS Custom Properties, ES6+ JavaScript

## Security Considerations

This is a frontend-only demonstration. For production use:

- Implement proper authentication and authorization
- Use HTTPS for secure data transmission
- Validate all user inputs on the server side
- Implement proper session management
- Add CSRF protection for form submissions

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions, issues, or feature requests, please:

- Check the documentation above
- Review the code comments for implementation details
- Create an issue in the project repository

## Roadmap

Future enhancements may include:

- **Backend Integration**: REST API for data persistence
- **Barcode Scanning**: Mobile barcode/QR code scanning
- **Mobile App**: Native mobile applications
- **Advanced Analytics**: Machine learning for predictive maintenance
- **Integration**: ERP and inventory management system integration
- **Multi-tenant**: Support for multiple organizations
- **Offline Mode**: Service worker for offline functionality

---

**Custom TMS** - Streamlining tool management for modern workshops and industrial environments.