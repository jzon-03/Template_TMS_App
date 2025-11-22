/**
 * Custom TMS - Tooling Management System
 * Main Application JavaScript
 */

class CustomTMS {
    constructor() {
        this.currentPage = 'dashboard';
        this.sampleData = this.generateSampleData();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeCharts();
        this.loadPage('dashboard');
        this.updateMetrics();
        this.loadRecentActivity();
    }

    setupEventListeners() {
        // Menu toggle for mobile
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });
        }

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.loadPage(page);
            });
        });

        // Global search
        const globalSearch = document.getElementById('globalSearch');
        if (globalSearch) {
            globalSearch.addEventListener('input', this.handleGlobalSearch.bind(this));
        }

        // Quick action buttons
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', this.handleQuickAction.bind(this));
        });

        // Modal handlers
        this.setupModalHandlers();

        // Close sidebar on outside click (mobile)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }

    setupModalHandlers() {
        const modalOverlay = document.getElementById('modal-overlay');
        const modalClose = document.querySelector('.modal-close');
        const modalCancel = document.querySelector('.modal-cancel');

        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }

        if (modalCancel) {
            modalCancel.addEventListener('click', () => this.closeModal());
        }

        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    this.closeModal();
                }
            });
        }
    }

    loadPage(pageId) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        const activeNavItem = document.querySelector(`[data-page="${pageId}"]`)?.closest('.nav-item');
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }

        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
        }

        // Load page-specific content
        this.loadPageContent(pageId);
    }

    loadPageContent(pageId) {
        switch (pageId) {
            case 'inventory':
                this.loadInventoryPage();
                break;
            case 'maintenance':
                this.loadMaintenancePage();
                break;
            case 'checkout':
                this.loadCheckoutPage();
                break;
            case 'users':
                this.loadUsersPage();
                break;
            case 'reports':
                this.loadReportsPage();
                break;
            case 'settings':
                this.loadSettingsPage();
                break;
        }
    }

    loadInventoryPage() {
        const inventoryPage = document.getElementById('inventory-page');
        inventoryPage.innerHTML = `
            <div class="page-header">
                <h2>Tool Inventory</h2>
                <div class="page-actions">
                    <button class="btn btn-secondary">
                        <i class="fas fa-filter"></i>
                        Filter
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fas fa-download"></i>
                        Export
                    </button>
                    <button class="btn btn-primary" onclick="customTMS.showAddToolModal()">
                        <i class="fas fa-plus"></i>
                        Add Tool
                    </button>
                </div>
            </div>

            <div class="inventory-filters">
                <div class="filter-bar">
                    <input type="text" placeholder="Search tools..." class="search-input">
                    <select class="filter-select">
                        <option>All Categories</option>
                        <option>Power Tools</option>
                        <option>Hand Tools</option>
                        <option>Measuring</option>
                        <option>Safety</option>
                    </select>
                    <select class="filter-select">
                        <option>All Status</option>
                        <option>Available</option>
                        <option>Checked Out</option>
                        <option>Maintenance</option>
                    </select>
                </div>
            </div>

            <div class="tools-grid">
                ${this.renderToolsGrid()}
            </div>
        `;
    }

    loadMaintenancePage() {
        const maintenancePage = document.getElementById('maintenance-page');
        maintenancePage.innerHTML = `
            <div class="page-header">
                <h2>Maintenance Management</h2>
                <div class="page-actions">
                    <button class="btn btn-secondary">
                        <i class="fas fa-calendar"></i>
                        View Calendar
                    </button>
                    <button class="btn btn-primary" onclick="customTMS.showScheduleMaintenanceModal()">
                        <i class="fas fa-plus"></i>
                        Schedule Maintenance
                    </button>
                </div>
            </div>

            <div class="maintenance-dashboard">
                <div class="maintenance-stats">
                    <div class="stat-card urgent">
                        <h3>5</h3>
                        <p>Overdue</p>
                    </div>
                    <div class="stat-card warning">
                        <h3>18</h3>
                        <p>Due This Week</p>
                    </div>
                    <div class="stat-card success">
                        <h3>42</h3>
                        <p>Completed This Month</p>
                    </div>
                </div>

                <div class="maintenance-list">
                    <h3>Upcoming Maintenance</h3>
                    ${this.renderMaintenanceList()}
                </div>
            </div>
        `;
    }

    loadCheckoutPage() {
        const checkoutPage = document.getElementById('checkout-page');
        checkoutPage.innerHTML = `
            <div class="page-header">
                <h2>Tool Check Out/In</h2>
                <div class="page-actions">
                    <button class="btn btn-secondary">
                        <i class="fas fa-history"></i>
                        View History
                    </button>
                    <button class="btn btn-primary" onclick="customTMS.showCheckoutModal()">
                        <i class="fas fa-sign-out-alt"></i>
                        Check Out Tool
                    </button>
                </div>
            </div>

            <div class="checkout-dashboard">
                <div class="checkout-stats">
                    <div class="stat-card">
                        <h3>89</h3>
                        <p>Currently Checked Out</p>
                    </div>
                    <div class="stat-card">
                        <h3>1158</h3>
                        <p>Available Tools</p>
                    </div>
                    <div class="stat-card warning">
                        <h3>3</h3>
                        <p>Overdue Returns</p>
                    </div>
                </div>

                <div class="checked-out-list">
                    <h3>Currently Checked Out Tools</h3>
                    ${this.renderCheckedOutTools()}
                </div>
            </div>
        `;
    }

    loadUsersPage() {
        const usersPage = document.getElementById('users-page');
        usersPage.innerHTML = `
            <div class="page-header">
                <h2>User Management</h2>
                <div class="page-actions">
                    <button class="btn btn-secondary">
                        <i class="fas fa-download"></i>
                        Export Users
                    </button>
                    <button class="btn btn-primary" onclick="customTMS.showAddUserModal()">
                        <i class="fas fa-user-plus"></i>
                        Add User
                    </button>
                </div>
            </div>

            <div class="users-grid">
                ${this.renderUsersGrid()}
            </div>
        `;
    }

    loadReportsPage() {
        const reportsPage = document.getElementById('reports-page');
        reportsPage.innerHTML = `
            <div class="page-header">
                <h2>Reports & Analytics</h2>
                <div class="page-actions">
                    <button class="btn btn-secondary">
                        <i class="fas fa-calendar"></i>
                        Date Range
                    </button>
                    <button class="btn btn-primary">
                        <i class="fas fa-download"></i>
                        Export Report
                    </button>
                </div>
            </div>

            <div class="reports-dashboard">
                <div class="report-cards">
                    <div class="report-card">
                        <h3>Utilization Report</h3>
                        <p>Tool usage and efficiency metrics</p>
                        <button class="btn btn-primary">Generate</button>
                    </div>
                    <div class="report-card">
                        <h3>Maintenance Report</h3>
                        <p>Maintenance costs and schedules</p>
                        <button class="btn btn-primary">Generate</button>
                    </div>
                    <div class="report-card">
                        <h3>Inventory Report</h3>
                        <p>Current inventory status and value</p>
                        <button class="btn btn-primary">Generate</button>
                    </div>
                </div>

                <div class="analytics-charts">
                    <div class="chart-container">
                        <canvas id="utilizationChart"></canvas>
                    </div>
                </div>
            </div>
        `;
    }

    loadSettingsPage() {
        const settingsPage = document.getElementById('settings-page');
        settingsPage.innerHTML = `
            <div class="page-header">
                <h2>System Settings</h2>
                <div class="page-actions">
                    <button class="btn btn-secondary">
                        <i class="fas fa-undo"></i>
                        Reset to Defaults
                    </button>
                    <button class="btn btn-primary">
                        <i class="fas fa-save"></i>
                        Save Changes
                    </button>
                </div>
            </div>

            <div class="settings-content">
                <div class="settings-section">
                    <h3>General Settings</h3>
                    <div class="setting-item">
                        <label>Company Name</label>
                        <input type="text" value="Custom TMS Company">
                    </div>
                    <div class="setting-item">
                        <label>Default Check-out Duration (days)</label>
                        <input type="number" value="7">
                    </div>
                </div>

                <div class="settings-section">
                    <h3>Notification Settings</h3>
                    <div class="setting-item">
                        <label>
                            <input type="checkbox" checked>
                            Email notifications for overdue returns
                        </label>
                    </div>
                    <div class="setting-item">
                        <label>
                            <input type="checkbox" checked>
                            Maintenance reminders
                        </label>
                    </div>
                </div>

                <div class="settings-section">
                    <h3>Security Settings</h3>
                    <div class="setting-item">
                        <label>Session timeout (minutes)</label>
                        <input type="number" value="60">
                    </div>
                    <div class="setting-item">
                        <label>
                            <input type="checkbox" checked>
                            Require two-factor authentication
                        </label>
                    </div>
                </div>
            </div>
        `;
    }

    renderToolsGrid() {
        return this.sampleData.tools.map(tool => `
            <div class="tool-card">
                <div class="tool-image">
                    <i class="fas ${tool.icon}"></i>
                </div>
                <div class="tool-info">
                    <h4>${tool.name}</h4>
                    <p class="tool-id">${tool.id}</p>
                    <p class="tool-category">${tool.category}</p>
                    <div class="tool-status ${tool.status.toLowerCase().replace(' ', '-')}">
                        ${tool.status}
                    </div>
                    <div class="tool-actions">
                        <button class="btn btn-sm btn-primary">View Details</button>
                        ${tool.status === 'Available' ? '<button class="btn btn-sm btn-secondary">Check Out</button>' : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderMaintenanceList() {
        return this.sampleData.maintenance.map(item => `
            <div class="maintenance-item ${item.priority}">
                <div class="maintenance-info">
                    <h4>${item.tool}</h4>
                    <p>${item.type}</p>
                    <span class="due-date">Due: ${item.dueDate}</span>
                </div>
                <div class="maintenance-actions">
                    <button class="btn btn-sm btn-primary">Complete</button>
                    <button class="btn btn-sm btn-secondary">Reschedule</button>
                </div>
            </div>
        `).join('');
    }

    renderCheckedOutTools() {
        return this.sampleData.checkedOut.map(item => `
            <div class="checkout-item">
                <div class="checkout-info">
                    <h4>${item.tool}</h4>
                    <p>Checked out by: ${item.user}</p>
                    <span class="checkout-date">Due: ${item.dueDate}</span>
                </div>
                <div class="checkout-actions">
                    <button class="btn btn-sm btn-primary">Check In</button>
                    <button class="btn btn-sm btn-secondary">Extend</button>
                </div>
            </div>
        `).join('');
    }

    renderUsersGrid() {
        return this.sampleData.users.map(user => `
            <div class="user-card">
                <div class="user-avatar">
                    <div class="avatar-fallback">
                        <i class="fas fa-user"></i>
                    </div>
                </div>
                <div class="user-info">
                    <h4>${user.name}</h4>
                    <p>${user.role}</p>
                    <p>${user.department}</p>
                    <div class="user-stats">
                        <span>Tools: ${user.toolsCheckedOut}</span>
                        <span>Active since: ${user.activeDate}</span>
                    </div>
                </div>
                <div class="user-actions">
                    <button class="btn btn-sm btn-primary">Edit</button>
                    <button class="btn btn-sm btn-secondary">View History</button>
                </div>
            </div>
        `).join('');
    }

    initializeCharts() {
        // Usage trend chart
        const ctx = document.getElementById('usageChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Tools Checked Out',
                        data: [65, 72, 68, 85, 78, 92],
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }
    }

    updateMetrics() {
        // This would normally fetch real data from an API
        const metrics = {
            totalTools: 1247,
            checkedOut: 89,
            maintenanceDue: 23,
            totalValue: 124000
        };

        // Update metric displays (if needed for real-time updates)
        console.log('Metrics updated:', metrics);
    }

    loadRecentActivity() {
        // This would normally fetch recent activity from an API
        const activities = this.sampleData.recentActivity;
        console.log('Recent activity loaded:', activities);
    }

    handleGlobalSearch(e) {
        const query = e.target.value.toLowerCase();
        console.log('Global search:', query);
        // Implement global search functionality
    }

    handleQuickAction(e) {
        const action = e.currentTarget.querySelector('span').textContent;
        console.log('Quick action:', action);
        
        switch (action) {
            case 'Add New Tool':
                this.showAddToolModal();
                break;
            case 'Find Tool':
                this.showFindToolModal();
                break;
            case 'Schedule Maintenance':
                this.showScheduleMaintenanceModal();
                break;
            case 'Generate Report':
                this.showGenerateReportModal();
                break;
        }
    }

    // Modal functions
    showModal(title, content, confirmText = 'Confirm') {
        const overlay = document.getElementById('modal-overlay');
        const modalTitle = document.querySelector('.modal-title');
        const modalBody = document.querySelector('.modal-body');
        const confirmBtn = document.querySelector('.modal-confirm');

        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        confirmBtn.textContent = confirmText;
        overlay.classList.add('active');
    }

    closeModal() {
        const overlay = document.getElementById('modal-overlay');
        overlay.classList.remove('active');
    }

    showAddToolModal() {
        const content = `
            <form class="modal-form">
                <div class="form-group">
                    <label>Tool Name</label>
                    <input type="text" placeholder="Enter tool name" required>
                </div>
                <div class="form-group">
                    <label>Tool ID</label>
                    <input type="text" placeholder="Auto-generated" disabled>
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <select required>
                        <option>Power Tools</option>
                        <option>Hand Tools</option>
                        <option>Measuring</option>
                        <option>Safety</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Purchase Price</label>
                    <input type="number" placeholder="0.00" step="0.01">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea rows="3" placeholder="Tool description..."></textarea>
                </div>
            </form>
        `;
        this.showModal('Add New Tool', content, 'Add Tool');
    }

    showFindToolModal() {
        const content = `
            <div class="search-tool-form">
                <div class="form-group">
                    <label>Search by</label>
                    <div class="search-options">
                        <input type="radio" name="searchType" value="name" checked> Tool Name
                        <input type="radio" name="searchType" value="id"> Tool ID
                        <input type="radio" name="searchType" value="category"> Category
                    </div>
                </div>
                <div class="form-group">
                    <input type="text" placeholder="Enter search term...">
                </div>
                <div class="search-results">
                    <!-- Search results will appear here -->
                </div>
            </div>
        `;
        this.showModal('Find Tool', content, 'Search');
    }

    showScheduleMaintenanceModal() {
        const content = `
            <form class="modal-form">
                <div class="form-group">
                    <label>Tool</label>
                    <select required>
                        <option>Select a tool...</option>
                        <option>Drill Press #DP-001</option>
                        <option>Lathe #LT-003</option>
                        <option>Welding Gun #WG-012</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Maintenance Type</label>
                    <select required>
                        <option>Routine Maintenance</option>
                        <option>Calibration</option>
                        <option>Repair</option>
                        <option>Inspection</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Scheduled Date</label>
                    <input type="date" required>
                </div>
                <div class="form-group">
                    <label>Assigned Technician</label>
                    <select required>
                        <option>John Smith</option>
                        <option>Mike Johnson</option>
                        <option>Sarah Wilson</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Notes</label>
                    <textarea rows="3" placeholder="Maintenance notes..."></textarea>
                </div>
            </form>
        `;
        this.showModal('Schedule Maintenance', content, 'Schedule');
    }

    showGenerateReportModal() {
        const content = `
            <form class="modal-form">
                <div class="form-group">
                    <label>Report Type</label>
                    <select required>
                        <option>Utilization Report</option>
                        <option>Maintenance Report</option>
                        <option>Inventory Report</option>
                        <option>User Activity Report</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Date Range</label>
                    <div class="date-range">
                        <input type="date" placeholder="From">
                        <input type="date" placeholder="To">
                    </div>
                </div>
                <div class="form-group">
                    <label>Format</label>
                    <select required>
                        <option>PDF</option>
                        <option>Excel</option>
                        <option>CSV</option>
                    </select>
                </div>
            </form>
        `;
        this.showModal('Generate Report', content, 'Generate');
    }

    showCheckoutModal() {
        const content = `
            <form class="modal-form">
                <div class="form-group">
                    <label>Tool to Check Out</label>
                    <input type="text" placeholder="Search for tool..." list="available-tools">
                    <datalist id="available-tools">
                        <option value="Drill Press #DP-001">
                        <option value="Circular Saw #CS-005">
                        <option value="Multimeter #MM-008">
                    </datalist>
                </div>
                <div class="form-group">
                    <label>User</label>
                    <select required>
                        <option>Select user...</option>
                        <option>John Smith</option>
                        <option>Mike Johnson</option>
                        <option>Sarah Wilson</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Return Date</label>
                    <input type="date" required>
                </div>
                <div class="form-group">
                    <label>Purpose</label>
                    <textarea rows="2" placeholder="Purpose of checkout..."></textarea>
                </div>
            </form>
        `;
        this.showModal('Check Out Tool', content, 'Check Out');
    }

    showAddUserModal() {
        const content = `
            <form class="modal-form">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="Enter full name" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="user@example.com" required>
                </div>
                <div class="form-group">
                    <label>Role</label>
                    <select required>
                        <option>Technician</option>
                        <option>Supervisor</option>
                        <option>Manager</option>
                        <option>Administrator</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Department</label>
                    <input type="text" placeholder="Department name">
                </div>
                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="(555) 123-4567">
                </div>
            </form>
        `;
        this.showModal('Add New User', content, 'Add User');
    }

    generateSampleData() {
        return {
            tools: [
                { id: 'DP-001', name: 'Industrial Drill Press', category: 'Power Tools', status: 'Available', icon: 'fa-drill' },
                { id: 'CS-005', name: 'Circular Saw', category: 'Power Tools', status: 'Checked Out', icon: 'fa-saw-blade' },
                { id: 'MM-008', name: 'Digital Multimeter', category: 'Measuring', status: 'Available', icon: 'fa-microchip' },
                { id: 'WG-012', name: 'Welding Gun', category: 'Power Tools', status: 'Maintenance', icon: 'fa-burn' },
                { id: 'HM-015', name: 'Ball Peen Hammer', category: 'Hand Tools', status: 'Available', icon: 'fa-hammer' },
                { id: 'LT-003', name: 'Metal Lathe', category: 'Power Tools', status: 'Available', icon: 'fa-cog' }
            ],
            maintenance: [
                { tool: 'Drill Press #DP-001', type: 'Routine Maintenance', dueDate: '2024-11-25', priority: 'high' },
                { tool: 'Circular Saw #CS-005', type: 'Blade Replacement', dueDate: '2024-11-27', priority: 'medium' },
                { tool: 'Welding Gun #WG-012', type: 'Calibration', dueDate: '2024-11-30', priority: 'low' }
            ],
            checkedOut: [
                { tool: 'Circular Saw #CS-005', user: 'Mike Johnson', dueDate: '2024-11-24' },
                { tool: 'Torque Wrench #TW-009', user: 'Sarah Wilson', dueDate: '2024-11-26' },
                { tool: 'Oscilloscope #OS-011', user: 'John Smith', dueDate: '2024-11-28' }
            ],
            users: [
                { name: 'John Smith', role: 'Senior Technician', department: 'Manufacturing', toolsCheckedOut: 3, activeDate: '2023-01-15' },
                { name: 'Mike Johnson', role: 'Supervisor', department: 'Quality Control', toolsCheckedOut: 1, activeDate: '2022-08-10' },
                { name: 'Sarah Wilson', role: 'Technician', department: 'R&D', toolsCheckedOut: 2, activeDate: '2023-05-20' },
                { name: 'David Brown', role: 'Manager', department: 'Operations', toolsCheckedOut: 0, activeDate: '2021-03-12' }
            ],
            recentActivity: [
                { type: 'checkout', user: 'Mike Johnson', tool: 'Drill Press #DP-001', time: '2 hours ago' },
                { type: 'maintenance', tool: 'Lathe #LT-003', time: '4 hours ago' },
                { type: 'checkin', user: 'Sarah Wilson', tool: 'Welding Gun #WG-012', time: '6 hours ago' }
            ]
        };
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.customTMS = new CustomTMS();
});

// Additional utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
}

function showNotification(message, type = 'info') {
    // Create and show a notification toast
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}