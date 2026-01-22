// ===== Skills =====
function initSkills() {
    const skills = [
        // Programming Languages
        { name: 'JavaScript', level: 85, category: 'frontend', icon: 'fab fa-js' },
        { name: 'Python', level: 80, category: 'backend', icon: 'fab fa-python' },
        { name: 'Java', level: 75, category: 'backend', icon: 'fab fa-java' },
        { name: 'C++', level: 70, category: 'backend', icon: 'fas fa-code' },
        { name: 'PHP', level: 80, category: 'backend', icon: 'fab fa-php' },
        
        // Frontend Skills
        { name: 'React.js', level: 85, category: 'frontend', icon: 'fab fa-react' },
        { name: 'HTML5', level: 90, category: 'frontend', icon: 'fab fa-html5' },
        { name: 'CSS3', level: 88, category: 'frontend', icon: 'fab fa-css3-alt' },
        
        // Backend Skills
        { name: 'Node.js', level: 82, category: 'backend', icon: 'fab fa-node-js' },
        { name: 'Express.js', level: 80, category: 'backend', icon: 'fas fa-server' },
        { name: 'Laravel', level: 78, category: 'backend', icon: 'fas fa-leaf' },
        
        // Database Skills
        { name: 'PostgreSQL', level: 85, category: 'backend', icon: 'fas fa-database' },
        { name: 'SQL', level: 83, category: 'backend', icon: 'fas fa-database' },
        { name: 'PL/SQL', level: 80, category: 'backend', icon: 'fas fa-database' },
        { name: 'Authentication', level: 82, category: 'backend', icon: 'fas fa-user-shield' },
        
        // Tools & IDEs
        { name: 'Visual Studio Code', level: 90, category: 'tools', icon: 'fas fa-code' },
        { name: 'IntelliJ IDEA', level: 75, category: 'tools', icon: 'fas fa-laptop-code' },
        { name: 'Dev-C++', level: 70, category: 'tools', icon: 'fas fa-terminal' },
        { name: 'Anaconda', level: 72, category: 'tools', icon: 'fab fa-python' },
        { name: 'PgAdmin 4', level: 85, category: 'tools', icon: 'fas fa-database' },
        { name: 'Bash', level: 78, category: 'tools', icon: 'fas fa-terminal' },
        { name: 'Git', level: 85, category: 'tools', icon: 'fab fa-git-alt' },
        { name: 'GitHub', level: 88, category: 'tools', icon: 'fab fa-github' },
        
        // Operating Systems
        { name: 'Windows', level: 90, category: 'tools', icon: 'fab fa-windows' },
        { name: 'Debian', level: 75, category: 'tools', icon: 'fab fa-linux' },
        { name: 'Red Hat', level: 70, category: 'tools', icon: 'fab fa-redhat' },
        { name: 'Ubuntu', level: 78, category: 'tools', icon: 'fab fa-ubuntu' },
        
        // Soft Skills
        { name: 'Problem Solving', level: 88, category: 'soft', icon: 'fas fa-lightbulb' },
        { name: 'Communication', level: 85, category: 'soft', icon: 'fas fa-comments' },
        { name: 'Team Collaboration', level: 87, category: 'soft', icon: 'fas fa-users' },
        { name: 'Continuous Learning', level: 90, category: 'soft', icon: 'fas fa-graduation-cap' }
    ];
    
    const skillsGrid = document.querySelector('.skills-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Render skills
    function renderSkills(filter = 'all') {
        skillsGrid.innerHTML = '';
        
        const filteredSkills = filter === 'all' 
            ? skills 
            : skills.filter(skill => skill.category === filter);
        
        filteredSkills.forEach(skill => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            skillCard.innerHTML = `
                <div class="skill-header">
                    <div class="skill-icon">
                        <i class="${skill.icon}"></i>
                    </div>
                    <div class="skill-name">${skill.name}</div>
                </div>
                <div class="skill-level">
                    <div class="skill-progress" style="width: 0%"></div>
                </div>
                <div class="skill-percentage">0%</div>
            `;
            
            skillsGrid.appendChild(skillCard);
        });
        
        // Animate skill bars after rendering
        setTimeout(() => {
            animateSkillBars(filteredSkills);
        }, 100);
    }
    
    // Animate skill bars
    function animateSkillBars(filteredSkills) {
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillPercentages = document.querySelectorAll('.skill-percentage');
        
        skillBars.forEach((bar, index) => {
            const percentage = filteredSkills[index]?.level || 0;
            setTimeout(() => {
                bar.style.width = percentage + '%';
                skillPercentages[index].textContent = percentage + '%';
            }, index * 100);
        });
    }
    
    // Filter skills
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Render filtered skills
            renderSkills(filter);
        });
    });
    
    // Initial render
    renderSkills();
}

// ===== Chart.js =====
function initChart() {
    const ctx = document.getElementById('skillsChart');
    if (!ctx) return;
    
    // Destroy existing chart if any
    if (window.skillsChart) {
        window.skillsChart.destroy();
    }
    
    // Calculate average skill levels by category
    const calculateCategoryAverages = () => {
        const categories = {
            'Frontend': ['JavaScript', 'React.js', 'HTML5', 'CSS3'],
            'Backend': ['Python', 'Java', 'C++', 'PHP', 'Node.js', 'Express.js', 'Laravel'],
            'Database': ['PostgreSQL', 'SQL', 'PL/SQL', 'Authentication'],
            'Tools': ['Visual Studio Code', 'IntelliJ IDEA', 'Dev-C++', 'Anaconda', 
                     'PgAdmin 4', 'Bash', 'Git', 'GitHub', 'Windows', 'Debian', 'Red Hat', 'Ubuntu'],
            'Soft Skills': ['Problem Solving', 'Communication', 'Team Collaboration', 'Continuous Learning']
        };
        
        // Get all skills from the skills array
        const skillsData = [
        { name: 'JavaScript', level: 85, category: 'frontend' },
        { name: 'Python', level: 80, category: 'backend' },
        { name: 'Java', level: 75, category: 'backend' },
        { name: 'C++', level: 70, category: 'backend' },
        { name: 'PHP', level: 80, category: 'backend' },
        { name: 'React.js', level: 85, category: 'frontend' },
        { name: 'HTML5', level: 90, category: 'frontend' },
        { name: 'CSS3', level: 88, category: 'frontend' },
        { name: 'Node.js', level: 82, category: 'backend' },
        { name: 'Express.js', level: 80, category: 'backend' },
        { name: 'Laravel', level: 78, category: 'backend' },
        { name: 'PostgreSQL', level: 85, category: 'backend' },
        { name: 'SQL', level: 83, category: 'backend' },
        { name: 'PL/SQL', level: 80, category: 'backend' },
        { name: 'Authentication', level: 82, category: 'backend' },
        { name: 'Visual Studio Code', level: 90, category: 'tools' },
        { name: 'IntelliJ IDEA', level: 75, category: 'tools' },
        { name: 'Dev-C++', level: 70, category: 'tools' },
        { name: 'Anaconda', level: 72, category: 'tools' },
        { name: 'PgAdmin 4', level: 85, category: 'tools' },
        { name: 'Bash', level: 78, category: 'tools' },
        { name: 'Git', level: 85, category: 'tools' },
        { name: 'GitHub', level: 88, category: 'tools' },
        { name: 'Windows', level: 90, category: 'tools' },
        { name: 'Debian', level: 75, category: 'tools' },
        { name: 'Red Hat', level: 70, category: 'tools' },
        { name: 'Ubuntu', level: 78, category: 'tools' },
        { name: 'Problem Solving', level: 88, category: 'soft' },
        { name: 'Communication', level: 85, category: 'soft' },
        { name: 'Team Collaboration', level: 87, category: 'soft' },
        { name: 'Continuous Learning', level: 90, category: 'soft' }
    ];
        
        const averages = [];
        
        Object.keys(categories).forEach(category => {
            const categorySkills = categories[category];
            let total = 0;
            let count = 0;
            
            categorySkills.forEach(skillName => {
                const skill = skillsData.find(s => s.name === skillName);
                if (skill) {
                    total += skill.level;
                    count++;
                }
            });
            
            averages.push(count > 0 ? Math.round(total / count) : 0);
        });
        
        return averages;
    };
    
    // Create new chart with your skill data
    window.skillsChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Frontend Development', 'Backend Development', 'Database Management', 'Tools & IDEs', 'Soft Skills'],
            datasets: [{
                label: 'Skill Level %',
                data: calculateCategoryAverages(),
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderColor: 'rgba(37, 99, 235, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(37, 99, 235, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        backdropColor: 'transparent',
                        color: function(context) {
                            // Get the current theme
                            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                            return isDark ? '#d1d5db' : '#374151';
                        }
                    },
                    pointLabels: {
                        color: function(context) {
                            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                            return isDark ? '#f9fafb' : '#1f2937';
                        },
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 14
                        }
                    },
                    grid: {
                        color: function(context) {
                            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                            return isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
                        }
                    },
                    angleLines: {
                        color: function(context) {
                            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                            return isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: function(context) {
                            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                            return isDark ? '#f9fafb' : '#1f2937';
                        },
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 14
                        }
                    }
                },
                tooltip: {
                    backgroundColor: function(context) {
                        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                        return isDark ? '#1f2937' : '#ffffff';
                    },
                    titleColor: function(context) {
                        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                        return isDark ? '#f9fafb' : '#1f2937';
                    },
                    bodyColor: function(context) {
                        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                        return isDark ? '#d1d5db' : '#4b5563';
                    },
                    borderColor: 'rgba(37, 99, 235, 0.5)',
                    borderWidth: 1
                }
            }
        }
    });
    
    // Update chart when theme changes
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTimeout(() => {
                if (window.skillsChart) {
                    window.skillsChart.update();
                }
            }, 300);
        });
    }
}

// ===== Education =====
function initEducation() {
    const education = [
        {
            degree: 'Bachelor of Software Engineering',
            school: 'Institut Supérieur d\'Informatique du Kef (ISIK)',
            date: '2025 - Present',
            icon: 'fas fa-graduation-cap'
        },
        {
            degree: 'Full Stack Web Development',
            school: 'Udemy, GOMYCODE, 9ANTRA-THE BRIDGE',
            date: '2023 - 2024',
            icon: 'fas fa-laptop-code'
        }
    ];
    
    const educationGrid = document.querySelector('.education-grid');
    
    // Render education
    education.forEach(edu => {
        const educationCard = document.createElement('div');
        educationCard.className = 'education-card';
        educationCard.innerHTML = `
            <div class="education-icon">
                <i class="${edu.icon}"></i>
            </div>
            <h3 class="education-degree">${edu.degree}</h3>
            <div class="education-school">${edu.school}</div>
            <div class="education-date">${edu.date}</div>
        `;
        
        educationGrid.appendChild(educationCard);
    });
}

// ===== Experience =====
function initExperience() {
    const experiences = [
        {
            date: '2023 - Present',
            title: 'Full Stack Developer',
            company: 'Freelance & Personal Projects',
            description: 'Developing web applications using React, Node.js, and PostgreSQL. Building responsive websites and working on various projects to build practical skills and portfolio.'
        },
        {
            date: '2022 - 2023',
            title: 'Web Development Trainee',
            company: 'Training Programs',
            description: 'Completed intensive training in full stack web development through Udemy, GOMYCODE, and 9ANTRA-THE BRIDGE programs. Gained hands-on experience with modern web technologies.'
        }
    ];
    
    const timeline = document.querySelector('.timeline');
    
    // Render experiences
    experiences.forEach(exp => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-date">${exp.date}</div>
                <h3 class="timeline-title">${exp.title}</h3>
                <div class="timeline-company">${exp.company}</div>
                <p>${exp.description}</p>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

// ===== Projects =====
function initProjects() {
    const projects = [
        {
            title: 'E-Commerce Platform',
            description: 'Full-featured e-commerce platform with user authentication, product management, and shopping cart functionality.',
            tags: ['React', 'Node.js', 'PostgreSQL', 'Express'],
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop'
        },
        {
            title: 'Task Management System',
            description: 'Collaborative task management application with user authentication and real-time updates.',
            tags: ['React.js', 'Node.js', 'PostgreSQL', 'JWT'],
            image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop'
        },
        {
            title: 'University Management System',
            description: 'System for managing student records, courses, and academic information for educational institutions.',
            tags: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
            image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop'
        },
        {
            title: 'Weather Dashboard',
            description: 'Real-time weather application with location-based forecasts and interactive data visualization.',
            tags: ['JavaScript', 'API Integration', 'CSS3', 'HTML5'],
            image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop'
        },
        {
            title: 'Portfolio Website',
            description: 'Modern responsive portfolio website showcasing projects and skills with animations.',
            tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop'
        },
        {
            title: 'Blog Platform',
            description: 'Full-featured blog platform with user authentication, CRUD operations, and commenting system.',
            tags: ['Node.js', 'Express', 'MongoDB', 'EJS'],
            image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop'
        }
    ];
    
    const projectsGrid = document.querySelector('.projects-grid');
    
    // Render projects
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-links">
                    <a href="#" class="btn btn-primary btn-sm">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href="#" class="btn btn-secondary btn-sm">
                        <i class="fab fa-github"></i> Source Code
                    </a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoader();
    initTheme();
    initCursor();
    initNavigation();
    initScrollProgress();
    initBackToTop();
    initTypewriter();
    initCounterAnimation();
    initTabs();
    initSkills();
    initProjects();
    initExperience();
    initEducation();
    initContactForm();
    initAnimations();
    initChart();
});

// ===== Loader =====
function initLoader() {
    const loader = document.querySelector('.loader');
    
    // Show loader for minimum 1.5 seconds
    setTimeout(() => {
        loader.classList.add('fade-out');
        
        // Remove loader from DOM after animation
        setTimeout(() => {
            loader.remove();
        }, 300);
    }, 1500);
}

// ===== Theme Toggle =====
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get saved theme or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    // Update theme icon
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });
}

// ===== Custom Cursor =====
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    // Hide cursor on touch devices
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
        return;
    }
    
    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Follower with delay
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card, .contact-card');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = 'var(--secondary-color)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
            cursorFollower.style.backgroundColor = 'var(--secondary-color)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'var(--primary-color)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.backgroundColor = 'var(--primary-color)';
        });
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// ===== Navigation =====
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Update active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
}

// ===== Scroll Progress =====
function initScrollProgress() {
    const scrollBar = document.querySelector('.scroll-bar');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        scrollBar.style.width = scrolled + '%';
    });
}

// ===== Back to Top =====
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Typewriter Effect =====
function initTypewriter() {
    const typewriter = document.querySelector('.typewriter');
    if (!typewriter) return;
    
    const words = JSON.parse(typewriter.getAttribute('data-words'));
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Deleting text
            typewriter.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing text
            typewriter.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // If word is complete
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end
        }
        // If word is deleted
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before next word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1000);
}

// ===== Counter Animation =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + '+';
                    }
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ===== Tabs =====
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show active pane
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId) {
                    pane.classList.add('active');
                }
            });
        });
    });
}

// ===== Contact Form =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        }, 2000);
    });
    
    // Notification function
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add styles
        const styles = document.createElement('style');
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: ${type === 'success' ? 'var(--success-color)' : 'var(--error-color)'};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: var(--radius-md);
                display: flex;
                align-items: center;
                gap: 1rem;
                z-index: 9999;
                animation: slideIn 0.3s ease, fadeOut 0.3s ease 3.7s forwards;
                box-shadow: var(--shadow-lg);
                max-width: 400px;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.8rem;
            }
            .notification-close {
                background: transparent;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 1rem;
            }
        `;
        
        document.head.appendChild(styles);
        document.body.appendChild(notification);
        
        // Close notification
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
            styles.remove();
        });
        
        // Auto-remove
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
                styles.remove();
            }
        }, 4000);
    }
}

// ===== Animations =====
function initAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .education-card');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add CSS for animations
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .skill-card,
        .project-card,
        .timeline-item,
        .education-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .skill-card.animate-in,
        .project-card.animate-in,
        .timeline-item.animate-in,
        .education-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .skill-card:nth-child(1) { transition-delay: 0.1s; }
        .skill-card:nth-child(2) { transition-delay: 0.2s; }
        .skill-card:nth-child(3) { transition-delay: 0.3s; }
        .skill-card:nth-child(4) { transition-delay: 0.4s; }
        
        .project-card:nth-child(1) { transition-delay: 0.1s; }
        .project-card:nth-child(2) { transition-delay: 0.2s; }
        .project-card:nth-child(3) { transition-delay: 0.3s; }
        .project-card:nth-child(4) { transition-delay: 0.4s; }
        .project-card:nth-child(5) { transition-delay: 0.5s; }
        .project-card:nth-child(6) { transition-delay: 0.6s; }
        
        .timeline-item:nth-child(1) { transition-delay: 0.1s; }
        .timeline-item:nth-child(2) { transition-delay: 0.2s; }
        .timeline-item:nth-child(3) { transition-delay: 0.3s; }
        .timeline-item:nth-child(4) { transition-delay: 0.4s; }
        
        .education-card:nth-child(1) { transition-delay: 0.1s; }
        .education-card:nth-child(2) { transition-delay: 0.2s; }
        .education-card:nth-child(3) { transition-delay: 0.3s; }
        .education-card:nth-child(4) { transition-delay: 0.4s; }
    `;
    
    document.head.appendChild(animationStyles);
}

// ===== Performance Optimization =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
setTimeout(lazyLoadImages, 1000);