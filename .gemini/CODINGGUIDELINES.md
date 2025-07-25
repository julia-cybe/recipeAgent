# I. General Best Practices (Applicable to Frontend & Backend)
## Code Readability & Consistency:

### Naming Conventions:

- Variables/Functions: camelCase for JavaScript/Vue.js; snake_case for Python/Django.

- Classes/Components: PascalCase for Python classes and Vue.js components.

- Constants: UPPER_SNAKE_CASE for global constants.

- Comments: Write clear, concise comments for complex logic, non-obvious code, or public API functions/methods. Avoid commenting on obvious code.

### Code Formatting:

- Automate with tools: Prettier for JavaScript/Vue.js/CSS; Black and isort for Python.

- Consistent indentation (4 spaces for Python, 2 spaces for Vue/JS recommended).

- Adhere to character limits per line (e.g., 79-99 for Python, 120 for JS).

- DRY (Don't Repeat Yourself): Abstract common logic into reusable functions, components, or mixins.

- KISS (Keep It Simple, Stupid): Prioritize simple, clear solutions over overly complex or clever ones.

## Version Control (Git):

- Branching Strategy: Use a well-defined branching strategy (e.g., Git Flow, GitHub Flow).

- Commit Messages: Write descriptive and atomic commit messages (e.g., "feat: Add user registration," "fix: Correct ingredient quantity calculation").

- Feature Branches: Develop each feature or bug fix on its own branch.

- Regular Commits & Pushes: Commit small, logical changes frequently and push to remote.

- Code Reviews: All code changes should undergo peer review before merging into main or develop.

## Security:

- Input Validation: Always validate all user inputs on both frontend (for UX) and especially on the backend (for security).

- Sanitization: Sanitize user-generated content to prevent XSS (Cross-Site Scripting) and other injection attacks.

- Authentication & Authorization: Use secure methods (Django's built-in auth, JWT for APIs). Implement proper access control (RBAC if roles are introduced).

- Secret Management: Never hardcode API keys, database credentials, or other sensitive information directly in code. Use environment variables (e.g., python-dotenv, Vite .env files) and secure secrets management in production environments (e.g., Render/Heroku config vars, Kubernetes Secrets).

- HTTPS: Enforce HTTPS for all communication.

## Error Handling & Logging:

- Graceful Degradation: Handle errors gracefully on the frontend, providing informative messages to the user.

- Backend Error Logging: Implement robust logging (e.g., Django's logging, Sentry) to capture exceptions and important events.

- Meaningful Errors: Return clear, descriptive error messages from APIs (without exposing sensitive internal details).

- Try-Except/Try-Catch: Use appropriate error handling blocks.

## Testing:

- Test-Driven Development (TDD): Consider TDD where appropriate, writing tests before implementation.

- Unit Tests: Write unit tests for individual functions, components, and models.

- Integration Tests: Test interactions between different parts of the system (e.g., API endpoints with database).

- End-to-End (E2E) Tests: Test critical user flows from start to finish.

- Maintain Test Coverage: Aim for a reasonable and increasing test coverage percentage.

# II. Frontend (Vue.js, Vite, Tailwind CSS/Sass)
## Vue.js Specific:

- Component-Based Architecture: Break down UI into small, reusable, and single-responsibility components.

- Props Down, Events Up: Follow the unidirectional data flow. Props for parent-to-child communication, custom events for child-to-parent.

- State Management: Use Vuex for centralized state management, especially for application-wide data (user, auth tokens, common settings). Structure Vuex modules logically.

- Lifecycles: Understand and correctly use Vue's component lifecycle hooks.

- Composition API (Vue 3): Leverage Composition API for better organization of reactive logic, especially for complex components or reusable composables.

## Performance:

Use v-if vs. v-show appropriately (v-if for conditional rendering that destroys/recreates, v-show for toggling visibility).

Optimize v-for lists with key attributes.

Lazy loading components using defineAsyncComponent.

Styling (Tailwind CSS/Sass):

## Tailwind CSS:

Utility-First: Embrace the utility-first approach.

Customization: Use tailwind.config.js for custom colors, fonts, spacing, etc., to maintain design consistency.

@apply ( sparingly): Use @apply for extracting common component patterns when strict component encapsulation is needed, but generally prefer direct utility classes.

PurgeCSS/Content Configuration: Ensure correct configuration to remove unused CSS for production builds.

## Sass:

Modularity: Organize Sass into partials (e.g., _variables.scss, _mixins.scss, _components.scss).

Nesting ( sparingly): Avoid deep nesting to keep specificity low and maintain readability.

BEM (or similar): Consider a methodology like BEM (Block-Element-Modifier) for class naming if not using Tailwind's utility-first approach exclusively.

## API Consumption:

Use a consistent approach for API calls (e.g., axios or native fetch with a wrapper).

Handle loading states, error states, and empty states explicitly in UI.

# III. Backend (Python, Django, PostgreSQL)
## Python Specific:

PEP 8: Adhere strictly to PEP 8 style guide for Python code.

Virtual Environments: Always use virtual environments for project dependencies.

Type Hinting: Use type hints (typing module) for better code clarity, maintainability, and IDE support.

List Comprehensions/Generators: Prefer list comprehensions and generator expressions for concise and efficient data manipulation.

Context Managers: Use with statements for file operations and other resources that need proper setup/teardown.

Django Specific:

Model-View-Template (MVT) / Model-View-Controller (MVC) Understanding: Understand Django's architecture. For APIs, it leans more towards Model-View-Serializer pattern with Django REST Framework.

Django ORM:

Query Optimization: Use select_related() for ForeignKey relationships and prefetch_related() for ManyToMany or reverse ForeignKey relationships to reduce database queries.

Bulk Operations: Use bulk_create() for inserting many objects efficiently.

Avoid N+1 Queries: Identify and eliminate N+1 query problems.

Raw SQL ( sparingly): Use raw SQL queries only when ORM is insufficient or performance-critical and extensively tested.

Django REST Framework (DRF):

Serializers: Use serializers to define API request/response structures and perform validation.

ViewSets/Generic Views: Leverage DRF's ViewSet and GenericAPIView classes for common API patterns.

Permissions & Authentication: Implement DRF's authentication and permission classes for robust access control.

Signals ( sparingly): Use Django signals only when necessary and where decoupling is crucial. Overuse can make debugging difficult.

## Migrations:

Create regular, atomic migrations for schema changes.

Review generated migration files before applying to production.

Squash migrations when appropriate to keep history clean.

Admin Site (for internal use): Leverage Django's admin site for quick data management and debugging. Customize it as needed.

## PostgreSQL Specific:

Database Design: Normalize database tables appropriately to reduce data redundancy.

Indexing: Create indexes on frequently queried columns (especially foreign keys).

Constraints: Use database constraints (NOT NULL, UNIQUE, CHECK, Foreign Key) for data integrity.

Transactions: Use database transactions for operations that require atomicity.

# IV. Web Scraping (BeautifulSoup, Requests, Scrapy, Selenium)
## Ethical Scraping:

robots.txt: Always check and respect a website's robots.txt file.

Rate Limiting: Implement delays between requests to avoid overwhelming the target server and getting blocked.

User-Agent: Set a legitimate User-Agent header.

IP Rotation/Proxies: For large-scale scraping, consider IP rotation to avoid bans (less critical for basic recipe scraping).

## Robustness & Error Handling:

Handle HTML Variations: Websites change frequently; parsers must be robust enough to handle minor HTML structure changes.

Error Handling: Catch network errors, HTTP errors (404, 500), and parsing errors.

Retry Mechanisms: Implement retry logic for transient network issues.

## Data Extraction:

Specific Selectors: Use precise CSS selectors or XPath expressions.

Schema.org/JSON-LD: Prioritize extracting structured data (e.g., JSON-LD for recipes) when available, as it's more reliable.

Data Cleaning: Implement thorough data cleaning and validation after scraping (e.g., remove HTML tags, normalize units, handle missing values).

## Tool Selection:

Requests + BeautifulSoup: Ideal for simple, static pages.

Scrapy: For complex, large-scale crawling, and when you need a full framework with pipelines and middleware.

Selenium: Use only when JavaScript rendering is essential (e.g., dynamic content loaded via AJAX after page load). It's slower and resource-intensive.

# V. Hosting / Deployment
- Environment Parity: Strive for production-like environments in development and staging to minimize "it works on my machine" issues.

- Containerization (Optional but Recommended): Consider Docker for consistent environments across development and deployment. This wasn't explicitly in the tech stack but is a strong best practice.

- Monitoring & Alerts: Implement monitoring for application performance, server health, and error rates. Set up alerts for critical issues.

- Logging: Centralized logging (e.g., with cloud provider services, ELK stack, Sentry) is crucial for debugging production issues.

- Scalability: Design the application with scalability in mind (e.g., stateless backend components, database read replicas if needed).

- Security:

  - Regularly update dependencies to patch known vulnerabilities.

  - Configure firewalls and network security groups.

  - Use strong passwords and multi-factor authentication for deployment accounts.
