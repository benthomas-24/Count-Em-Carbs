# Count Em' Carbs Project Task List

## Completed Tasks

### HTML
- [x] Create basic HTML structure for the main page (index.html) 🔗CSS `templates/index.html`
- [x] Create basic HTML structure for the food database page (food-database.html) 🔗CSS `templates/food-database.html`
- [x] Add form inputs for food items, blood sugar levels, and insulin ratios 🔗JS `templates/index.html`
- [x] Create a section to display calculated insulin dosage results 🔗JS `templates/index.html`
- [x] Implement a search input for the food database 🔗JS `templates/food-database.html`
- [x] Create a list to display food items in the database 🔗JS `templates/food-database.html`
- [x] Add a "Track it!" button next to each food item in the database 🔗JS `templates/food-database.html`
- [x] Implement a section to display tracked foods 🔗JS `templates/food-database.html`
- [x] Add a "Back to Calculator" button on the food database page `templates/food-database.html`
- [x] Create an animated text reminder to scroll down for tracked foods 🔗CSS, JS `templates/food-database.html`

### CSS
- [x] Implement CSS styling for the main calculator page 🔗HTML `static/css/styles.css`
- [x] Implement CSS styling for the food database page 🔗HTML `static/css/styles.css`
- [x] Implement rainbow text effect for the scroll reminder 🔗HTML `static/css/styles.css`
- [x] Ensure responsive design for various screen sizes `static/css/styles.css`
- [x] Implement dark mode color scheme `static/css/styles.css`
- [x] Add hover effects to buttons for better user feedback `static/css/styles.css`
- [x] Implement custom scrollbars for a more polished look `static/css/styles.css`

### JavaScript
- [x] Set up event listeners for form submissions and button clicks 🔗HTML `static/js/script.js`
- [x] Implement function to add food items to the list 🔗HTML `static/js/script.js`
- [x] Create function to calculate insulin dosage based on user inputs 🔗HTML `static/js/script.js`
- [x] Implement API call to fetch food data from the backend 🔗Python `static/js/food-database.js`
- [x] Create function to display calculation results 🔗HTML `static/js/script.js`
- [x] Implement food search functionality in the food database 🔗HTML `static/js/food-database.js`
- [x] Add functionality to track foods from the database 🔗HTML `static/js/food-database.js`
- [x] Create function to update the list of tracked foods 🔗HTML `static/js/food-database.js`
- [x] Implement local storage to save tracked foods `static/js/food-database.js`
- [x] Add functionality to load tracked foods on page load `static/js/food-database.js`
- [x] Implement smooth scrolling for the "scroll down" link 🔗HTML `static/js/food-database.js`
- [x] Create function to show temporary "Added!" message when tracking food 🔗HTML `static/js/food-database.js`
- [x] Implement total carbs calculation for tracked foods `static/js/food-database.js`
- [x] Add error handling for failed API requests 🔗Python `static/js/food-database.js`
- [x] Implement function to clear tracked foods after insulin calculation `static/js/script.js`
- [x] Add the ability to edit or remove tracked foods 🔗HTML `static/js/food-database.js`, `templates/food-database.html`

## Tasks To Be Completed

### Low Importance
- [ ] Add transitions for smoother UI interactions (CSS) `static/css/styles.css`
- [ ] Improve typography with custom fonts or better font pairings (CSS) `static/css/styles.css`
- [ ] Add keyboard shortcuts for common actions (JS) `static/js/script.js`, `static/js/food-database.js`
- [ ] Implement a dark mode toggle (HTML, CSS, JS) `templates/*.html`, `static/css/styles.css`, `static/js/script.js`

### Medium Importance
- [ ] Create a loading indicator for API calls (HTML, CSS, JS) `templates/*.html`, `static/css/styles.css`, `static/js/*.js`
- [ ] Implement form validation for user inputs (JS) `static/js/script.js`
- [ ] Add tooltips or help text for complex inputs (e.g., insulin ratios) (HTML, CSS, JS) `templates/*.html`, `static/css/styles.css`, `static/js/script.js`
- [ ] Enhance the mobile responsiveness of the layout (CSS) `static/css/styles.css`
- [ ] Implement a way to save and recall previous meal calculations (JS, Python) `static/js/script.js`, `routes/main_routes.py`
- [ ] Add unit tests for JavaScript functions (JS) `tests/test_js_functions.js`
- [ ] Implement user authentication (Python, JS) `routes/auth_routes.py`, `static/js/auth.js`
- [ ] Add a user profile page (HTML, CSS, JS, Python) `templates/profile.html`, `static/css/styles.css`, `static/js/profile.js`, `routes/profile_routes.py`

### High Importance
- [ ] Implement error handling and user-friendly error messages (JS) `static/js/*.js`
- [ ] Create a data visualization for tracked foods (e.g., pie chart of carb sources) (JS, HTML) `static/js/food-database.js`, `templates/food-database.html`
- [ ] Ensure all API calls are working correctly (food search, tracking, insulin calculation) (JS, Python) `static/js/*.js`, `routes/main_routes.py`
- [ ] Implement proper CSRF protection for forms (JS, Python) `static/js/*.js`, `utils/app.py`, `routes/main_routes.py`
- [ ] Ensure accessibility compliance (WCAG guidelines) (HTML, CSS) `templates/*.html`, `static/css/styles.css`
- [ ] Add input sanitization to prevent XSS attacks (JS, Python) `static/js/*.js`, `routes/main_routes.py`
- [ ] Implement proper error handling for failed API requests (JS, Python) `static/js/*.js`, `routes/main_routes.py`
- [ ] Create a clear visual indication of the current blood sugar status (high, normal, low) (HTML, CSS, JS) `templates/index.html`, `static/css/styles.css`, `static/js/script.js`
- [ ] Add a confirmation step before submitting the insulin calculation (JS, HTML) `static/js/script.js`, `templates/index.html`

### Critical
- [ ] Implement user data persistence (Python, Database) `models/user.py`, `utils/db.py`
- [ ] Add a disclaimer about medical advice and recommend consulting a healthcare professional (HTML) `templates/*.html`
- [ ] Create a quick reference guide or FAQ section for new users (HTML, CSS) `templates/*.html`, `static/css/styles.css`
- [ ] Implement proper logging for backend operations (Python) `utils/logging.py`
- [ ] Set up environment variables for sensitive information (Python) `utils/config.py`
- [ ] Implement rate limiting for API requests (Python) `utils/app.py`
- [ ] Add SSL/TLS configuration for HTTPS (Server config)
- [ ] Implement proper session management (Python) `utils/app.py`
- [ ] Add comprehensive error pages (404, 500, etc.) (HTML, Python) `templates/errors/*.html`, `routes/error_routes.py`
- [ ] Set up continuous integration and deployment (CI/CD) (.gitlab-ci.yml or .github/workflows/*.yml)

Note: Tasks marked with 🔗 indicate a direct link or dependency with another component. File paths are in `code format` for better visibility.