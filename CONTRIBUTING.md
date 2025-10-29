# Contributing to MERN Image Search

Thank you for considering contributing to this project! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Feature Requests](#feature-requests)
- [Bug Reports](#bug-reports)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**Bug Report Template:**

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - OS: [e.g. Windows 10]
 - Node Version: [e.g. 18.0.0]
 - Browser: [e.g. Chrome 120]

**Additional context**
Any other context about the problem.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues.

**Feature Request Template:**

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions or features you've considered.

**Additional context**
Any other context or screenshots.
```

## Development Setup

1. **Fork the Repository**
```bash
# Click "Fork" button on GitHub
```

2. **Clone Your Fork**
```bash
git clone https://github.com/YOUR_USERNAME/mern-image-search.git
cd mern-image-search
```

3. **Add Upstream Remote**
```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/mern-image-search.git
```

4. **Install Dependencies**
```bash
npm run install-all
```

5. **Set Up Environment Variables**
```bash
cd server
cp .env.example .env
# Edit .env with your credentials
```

6. **Start Development**
```bash
npm run dev
```

## Coding Standards

### JavaScript/React Style Guide

- Use ES6+ features
- Use functional components with hooks (React)
- Use const/let instead of var
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

### Code Formatting

```javascript
// ✅ Good
const fetchUserData = async (userId) => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// ❌ Bad
const fetchUserData=async(userId)=>{try{const response=await axios.get(`/api/users/${userId}`);return response.data;}catch(error){console.error('Error fetching user:',error);throw error;}}
```

### File Organization

```
component/
  ├── ComponentName.js       # Component logic
  ├── ComponentName.css      # Component styles
  └── ComponentName.test.js  # Component tests (if added)
```

### CSS Guidelines

- Use meaningful class names
- Follow BEM naming convention when appropriate
- Keep styles modular and component-specific
- Use CSS variables for consistent theming

```css
/* ✅ Good */
.search-bar {
  display: flex;
  gap: 10px;
}

.search-bar__input {
  flex: 1;
  padding: 15px;
}

.search-bar__button {
  padding: 15px 30px;
}

/* ❌ Bad */
.sb { display: flex; gap: 10px; }
.sb-i { flex: 1; padding: 15px; }
.sb-b { padding: 15px 30px; }
```

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
feat(search): add pagination to search results

Added pagination controls to handle large result sets.
Users can now navigate through multiple pages of results.

Closes #123

---

fix(auth): resolve Google OAuth callback issue

Fixed redirect URI mismatch causing OAuth to fail.
Updated callback URL in passport configuration.

Fixes #456

---

docs(readme): update installation instructions

Added missing step for MongoDB setup.
Clarified environment variable requirements.
```

## Pull Request Process

### Before Submitting

1. **Update your fork**
```bash
git fetch upstream
git checkout main
git merge upstream/main
```

2. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

3. **Make your changes**
- Write clean, documented code
- Follow coding standards
- Test thoroughly

4. **Commit your changes**
```bash
git add .
git commit -m "feat(scope): description"
```

5. **Push to your fork**
```bash
git push origin feature/your-feature-name
```

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] All OAuth providers tested
- [ ] Search functionality works
- [ ] Responsive design verified

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings generated
```

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged

## Areas for Contribution

### High Priority

- [ ] Add unit tests (Jest, React Testing Library)
- [ ] Add integration tests
- [ ] Improve error handling
- [ ] Add loading states
- [ ] Implement pagination for search results
- [ ] Add image download functionality
- [ ] Implement rate limiting

### Medium Priority

- [ ] Add dark mode
- [ ] Improve accessibility (ARIA labels, keyboard navigation)
- [ ] Add image favorites/bookmarks
- [ ] Implement search filters (color, orientation)
- [ ] Add user profile page
- [ ] Implement image collections

### Low Priority

- [ ] Add more OAuth providers (Twitter, LinkedIn)
- [ ] Implement email notifications
- [ ] Add social sharing
- [ ] Create admin dashboard
- [ ] Add analytics

## Testing Guidelines

### Manual Testing Checklist

- [ ] OAuth login (all providers)
- [ ] Image search with various terms
- [ ] Multi-select functionality
- [ ] Top searches accuracy
- [ ] Search history persistence
- [ ] Clear history
- [ ] Logout
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Cross-browser compatibility

### Future: Unit Tests

If you're adding tests, use this structure:

```javascript
// ComponentName.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('renders without crashing', () => {
    render(<ComponentName />);
  });

  it('handles user interaction', () => {
    render(<ComponentName />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    // assertions
  });
});
```

## Questions?

Feel free to:
- Open an issue for questions
- Join discussions
- Reach out to maintainers

## Recognition

Contributors will be recognized in:
- README.md Contributors section
- Release notes
- Project documentation

Thank you for contributing! 🎉
