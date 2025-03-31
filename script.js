document.addEventListener("DOMContentLoaded", function () {
  // Improved Typing Animation
  const typedElement = document.getElementById("typed-text");
  const phrases = [
    "Web Developer",
    "Tennis Player",
    "Student",
    "Over Achiever",
  ];
  let currentPhrase = 0;
  let currentChar = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    // Current phrase being typed/deleted
    const fullText = phrases[currentPhrase];

    // Check if typing or deleting
    if (isDeleting) {
      // Remove character
      typedElement.textContent = fullText.substring(0, currentChar - 1);
      currentChar--;
      typingSpeed = 50; // Faster when deleting
    } else {
      // Add character
      typedElement.textContent = fullText.substring(0, currentChar + 1);
      currentChar++;
      typingSpeed = 120; // Slower when typing
    }

    // Handle transitions between words
    if (!isDeleting && currentChar === fullText.length) {
      // Pause at end of word
      typingSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
      // Move to next word
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % phrases.length;
      typingSpeed = 500; // Pause before typing next word
    }

    // Continue the animation with adjusted speed
    setTimeout(typeEffect, typingSpeed);
  }

  // Start the typing animation
  setTimeout(typeEffect, 1000);

  // Theme switcher function
  const toggleSwitch = document.getElementById("checkbox");
  const body = document.body;

  if (toggleSwitch) {
    // Check for saved theme preference or use system preference
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    if (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && prefersDarkScheme.matches)
    ) {
      body.setAttribute("data-theme", "dark");
      toggleSwitch.checked = true;
    } else {
      body.setAttribute("data-theme", "light");
      toggleSwitch.checked = false;
    }

    // Define the switch function
    function switchTheme(e) {
      if (e.target.checked) {
        body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        body.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
    }

    // Add event listener
    toggleSwitch.addEventListener("change", switchTheme);
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navContent = document.querySelector(".nav-content");

  if (menuToggle && navContent) {
    menuToggle.addEventListener("click", function () {
      navContent.classList.toggle("active");

      // Animate hamburger to X
      const bars = document.querySelectorAll(".bar");
      if (navContent.classList.contains("active")) {
        // Change to X
        bars[0].style.transform = "translateY(9px) rotate(45deg)";
        bars[1].style.opacity = "0";
        bars[2].style.transform = "translateY(-9px) rotate(-45deg)";
      } else {
        // Back to hamburger
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      }
    });
  }

  // Close mobile menu when clicking a link
  const navLinksItems = document.querySelectorAll(".nav-links a");
  navLinksItems.forEach((link) => {
    link.addEventListener("click", function () {
      if (navContent) {
        navContent.classList.remove("active");

        // Reset hamburger icon
        const bars = document.querySelectorAll(".bar");
        bars.forEach((bar) => {
          bar.style.transform = "none";
          bar.style.opacity = "1";
        });
      }
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        // Calculate the offset to account for fixed header
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Add active class to nav links on scroll
  function addActiveClassOnScroll() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", addActiveClassOnScroll);

  // Animate elements on scroll
  function checkScroll() {
    const elements = document.querySelectorAll(
      ".fade-in, .slide-in-left, .slide-in-right, .zoom-in"
    );
    const triggerBottom = (window.innerHeight / 5) * 4;

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < triggerBottom) {
        element.classList.add("appear");
      }
    });
  }

  // Initial check and scroll event listener
  window.addEventListener("scroll", checkScroll);
  setTimeout(checkScroll, 100); // Check on initial load with slight delay

  // Form submission handler - Using EmailJS
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate form
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      if (!name || !email || !subject || !message) {
        formStatus.className = "form-status error";
        formStatus.innerHTML = `
                  <div style="display: flex; align-items: center;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                      <span>Please fill in all fields.</span>
                  </div>
              `;
        return;
      }

      if (!isValidEmail(email)) {
        formStatus.className = "form-status error";
        formStatus.innerHTML = `
                  <div style="display: flex; align-items: center;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                      <span>Please enter a valid email address.</span>
                  </div>
              `;
        return;
      }

      // Show loading state
      const submitButton = contactForm.querySelector("button[type='submit']");
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML = `<span>Sending...</span>`;
      submitButton.disabled = true;

      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
      };

      // Send email using EmailJS
      emailjs
        .send("your_service_id", "your_template_id", templateParams)
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);

            // Show success message
            formStatus.className = "form-status success";
            formStatus.innerHTML = `
                      <div style="display: flex; align-items: center;">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          <span>Your message has been sent successfully!</span>
                      </div>
                  `;

            // Reset form
            contactForm.reset();
          },
          function (error) {
            console.log("FAILED...", error);

            // Show error message
            formStatus.className = "form-status error";
            formStatus.innerHTML = `
                      <div style="display: flex; align-items: center;">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="15" y1="9" x2="9" y2="15"></line>
                              <line x1="9" y1="9" x2="15" y2="15"></line>
                          </svg>
                          <span>There was an error sending your message. Please try again.</span>
                      </div>
                  `;
          }
        )
        .finally(function () {
          // Restore button state
          submitButton.innerHTML = originalButtonText;
          submitButton.disabled = false;
        });
    });
  }

  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Add this to your script.js
  function animateSkills() {
    const skillBars = document.querySelectorAll(".skill-progress");
    const triggerPosition = window.innerHeight * 0.8;

    skillBars.forEach((skillBar) => {
      const barPosition = skillBar.getBoundingClientRect().top;

      if (barPosition < triggerPosition) {
        skillBar.classList.add("animated");
      }
    });
  }

  // Call this function on scroll
  window.addEventListener("scroll", animateSkills);
  // Initial check
  setTimeout(animateSkills, 500);
  // Add this to your script.js
  function animateCounters() {
    const stats = document.querySelectorAll(".stat-number");
    const triggerPosition = window.innerHeight * 0.8;

    stats.forEach((stat) => {
      const statPosition = stat.getBoundingClientRect().top;

      if (
        statPosition < triggerPosition &&
        !stat.classList.contains("counting")
      ) {
        stat.classList.add("counting");

        const target = parseInt(stat.textContent, 10);
        let count = 0;
        const duration = 2000; // ms
        const interval = Math.floor(duration / target);

        const counter = setInterval(() => {
          count += 1;
          stat.textContent = count;

          if (count === target) {
            clearInterval(counter);
            stat.classList.remove("counting");
          }
        }, interval);
      }
    });
  }

  // Call on scroll
  window.addEventListener("scroll", animateCounters);
  // Initial check
  setTimeout(animateCounters, 500);
  // Add this to your script.js
  function parallaxScroll() {
    const scrollPosition = window.pageYOffset;

    // Parallax for hero section
    const heroContent = document.querySelector(".hero-text");
    const heroImage = document.querySelector(".hero-image");

    if (heroContent && heroImage) {
      heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
      heroImage.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    }

    // Parallax for shapes
    const shapes = document.querySelectorAll(".shape");
    shapes.forEach((shape, index) => {
      const speed = 0.05 * (index + 1);
      shape.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
  }

  // Add this event listener
  window.addEventListener("scroll", parallaxScroll);
  // Add this to your script.js for a subtle cursor effect
  // Advanced Custom Cursor
  function initAdvancedCursor() {
    // Create cursor elements
    const cursorDot = document.createElement("div");
    cursorDot.classList.add("custom-cursor", "cursor-dot");

    const cursorOutline = document.createElement("div");
    cursorOutline.classList.add("custom-cursor", "cursor-outline");

    // Add to DOM
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    // Variables for cursor position
    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Track mouse position
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Interactive elements
    const headings = document.querySelectorAll(
      "h1, h2, .gradient-text, .typing-wrapper"
    );
    const buttons = document.querySelectorAll(
      "button, .primary-button, .secondary-button, .project-link"
    );
    const cards = document.querySelectorAll(".project-card, .achievement");
    const images = document.querySelectorAll(
      ".project-image, .profile-placeholder, .about-image"
    );

    // Add event listeners to headings
    headings.forEach((heading) => {
      heading.addEventListener("mouseenter", () => {
        cursorOutline.classList.add("cursor-expand");
        cursorOutline.setAttribute("data-cursor-text", "VIEW");
        cursorOutline.classList.add("cursor-text");
      });

      heading.addEventListener("mouseleave", () => {
        cursorOutline.classList.remove("cursor-expand");
        cursorOutline.removeAttribute("data-cursor-text");
        cursorOutline.classList.remove("cursor-text");
      });
    });

    // Add event listeners to buttons
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        cursorOutline.classList.add("cursor-hover");
      });

      button.addEventListener("mouseleave", () => {
        cursorOutline.classList.remove("cursor-hover");
      });
    });

    // Add event listeners to cards
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        cursorOutline.classList.add("cursor-project");
      });

      card.addEventListener("mouseleave", () => {
        cursorOutline.classList.remove("cursor-project");
      });
    });

    // Add event listeners to images
    images.forEach((image) => {
      image.addEventListener("mouseenter", () => {
        cursorOutline.classList.add("cursor-img");
      });

      image.addEventListener("mouseleave", () => {
        cursorOutline.classList.remove("cursor-img");
      });
    });

    // Animate cursor
    const animateCursor = () => {
      // Calculate smooth movement with easing
      const easing = 0.2;

      dotX += (mouseX - dotX) * easing;
      dotY += (mouseY - dotY) * easing;

      outlineX += (mouseX - outlineX) * (easing * 0.5);
      outlineY += (mouseY - outlineY) * (easing * 0.5);

      // Apply positions
      cursorDot.style.left = `${dotX}px`;
      cursorDot.style.top = `${dotY}px`;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      // Continue animation
      requestAnimationFrame(animateCursor);
    };

    // Start animation
    animateCursor();

    // Hide default cursor
    document.body.style.cursor = "none";

    // Add cursor-none to all interactive elements
    const allInteractive = document.querySelectorAll(
      "a, button, input, textarea, .project-card, .achievement, .nav-links a"
    );
    allInteractive.forEach((el) => {
      el.style.cursor = "none";
    });
  }

  // Initialize when DOM is loaded
  document.addEventListener("DOMContentLoaded", initAdvancedCursor);
  // Projects Section Background Animation
  function initProjectsBackground() {
    const projectsBg = document.getElementById("projectsBg");
    if (!projectsBg) return;

    const codeStrings = [
      "function createProject() { ... }",
      "<div class='project'>...</div>",
      "const app = new App();",
      "addEventListener('load', init);",
      "import React from 'react';",
      "const data = fetch('/api/projects');",
      ".then(response => response.json())",
      "git commit -m 'New feature'",
      "npm install --save",
      "@keyframes animate { ... }",
      "export default class Project",
      "document.querySelector('.container')",
      "<script src='app.js'></script>",
      "const server = http.createServer();",
      "for(let i = 0; i < projects.length; i++)",
      "if(isAuthenticated) { ... }",
      "background: linear-gradient(...);",
      "return new Promise((resolve, reject) => {});",
      "useEffect(() => { ... }, []);",
      "try { ... } catch(err) { ... }",
    ];

    function createCodeParticle() {
      const particle = document.createElement("div");
      particle.classList.add("code-particles");

      // Random position, speed and code string
      const posX = Math.random() * window.innerWidth;
      const duration = 7 + Math.random() * 15; // seconds
      const codeString =
        codeStrings[Math.floor(Math.random() * codeStrings.length)];

      // Set particle styles
      particle.textContent = codeString;
      particle.style.left = `${posX}px`;
      particle.style.animation = `codeRain ${duration}s linear forwards`;

      // Add to background and remove when animation completes
      projectsBg.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, duration * 1000);
    }

    // Create initial particles
    for (let i = 0; i < 20; i++) {
      setTimeout(createCodeParticle, i * 200);
    }

    // Create new particles periodically
    setInterval(createCodeParticle, 1000);
  }

  // Initialize projects background
  document.addEventListener("DOMContentLoaded", initProjectsBackground);
  // Contact Section Interactive Background
  function initContactBackground() {
    const contactBg = document.getElementById("connectionNodes");
    if (!contactBg) return;

    const numNodes = 40;
    const connectionDistance = 150;
    const nodes = [];

    // Create nodes
    for (let i = 0; i < numNodes; i++) {
      const node = document.createElement("div");
      node.classList.add("node");

      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;

      // Set node position
      node.style.left = `${posX}%`;
      node.style.top = `${posY}%`;

      // Random animation delay
      const delay = Math.random() * 5;
      node.style.animation = `pulse ${
        2 + Math.random() * 3
      }s ease-in-out ${delay}s infinite`;

      // Add to background
      contactBg.appendChild(node);

      // Store node data
      nodes.push({
        element: node,
        x: posX,
        y: posY,
      });
    }

    // Create connections between nodes
    function createConnections() {
      // Remove existing connections
      const existingConnections = contactBg.querySelectorAll(".connection");
      existingConnections.forEach((conn) => conn.remove());

      // Create new connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];

          // Calculate distance between nodes
          const dx = ((nodeB.x - nodeA.x) / 100) * contactBg.offsetWidth;
          const dy = ((nodeB.y - nodeA.y) / 100) * contactBg.offsetHeight;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Only connect if within distance threshold
          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;

            // Create connection line
            const connection = document.createElement("div");
            connection.classList.add("connection");

            // Set line position and dimensions
            connection.style.width = `${distance}px`;
            connection.style.left = `${nodeA.x}%`;
            connection.style.top = `${nodeA.y}%`;
            connection.style.opacity = opacity * 0.5;

            // Calculate rotation angle
            const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
            connection.style.transform = `rotate(${angle}deg)`;

            // Add to background
            contactBg.appendChild(connection);
          }
        }
      }
    }

    // Initial connections
    createConnections();

    // Update connections on window resize
    window.addEventListener("resize", createConnections);

    // Make connections respond to mouse
    const contactSection = document.querySelector(".contact");

    if (contactSection) {
      contactSection.addEventListener("mousemove", (e) => {
        const rect = contactSection.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

        // Create temporary mouse node
        const mouseNode = {
          x: mouseX,
          y: mouseY,
        };

        // Create connections to mouse
        const connections = contactBg.querySelectorAll(".connection");
        connections.forEach((conn) => (conn.style.opacity = "0.2"));

        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];

          // Calculate distance to mouse
          const dx = ((mouseNode.x - node.x) / 100) * contactBg.offsetWidth;
          const dy = ((mouseNode.y - node.y) / 100) * contactBg.offsetHeight;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Highlight nodes near mouse
          if (distance < connectionDistance * 1.5) {
            node.element.style.opacity = "0.8";
            node.element.style.transform = "scale(2)";
          } else {
            node.element.style.opacity = "0.4";
            node.element.style.transform = "scale(1)";
          }
        }
      });

      // Reset on mouse leave
      contactSection.addEventListener("mouseleave", () => {
        nodes.forEach((node) => {
          node.element.style.opacity = "0.4";
          node.element.style.transform = "scale(1)";
        });

        const connections = contactBg.querySelectorAll(".connection");
        connections.forEach((conn) => (conn.style.opacity = "0.2"));
      });
    }
  }

  // Initialize contact background
  document.addEventListener("DOMContentLoaded", initContactBackground);
  // Magnetic elements effect
  function initMagneticElements() {
    const magneticElements = document.querySelectorAll(
      ".primary-button, .secondary-button, .submit-button, .project-card, .social-icon-wrapper"
    );

    magneticElements.forEach((element) => {
      element.addEventListener("mousemove", function (e) {
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Calculate magnetic pull strength based on element size
        const magneticPull = Math.min(rect.width, rect.height) * 0.3;

        // Calculate movement based on cursor distance from center
        const moveX = (distanceX / centerX) * magneticPull;
        const moveY = (distanceY / centerY) * magneticPull;

        // Apply transforms
        this.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });

      element.addEventListener("mouseleave", function () {
        // Reset position on mouse leave
        this.style.transform = "translate(0, 0)";
      });
    });
  }

  // Initialize magnetic elements
  document.addEventListener("DOMContentLoaded", initMagneticElements);
  // Text Scramble Effect
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = "!<>-_\\/[]{}—=+*^?#________";
      this.update = this.update.bind(this);
    }

    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => (this.resolve = resolve));

      this.queue = [];

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }

      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();

      return promise;
    }

    update() {
      let output = "";
      let complete = 0;

      for (let i = 0; i < this.queue.length; i++) {
        let { from, to, start, end, char } = this.queue[i];

        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span style="color: var(--primary-light)">${char}</span>`;
        } else {
          output += from;
        }
      }

      this.el.innerHTML = output;

      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }

    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  function initScrambleTexts() {
    // Add scramble effect to headings
    const headings = document.querySelectorAll("h1, h2, h3, .typing-wrapper");

    headings.forEach((heading) => {
      heading.classList.add("scramble-text");
      const originalText = heading.innerText;
      const scrambler = new TextScramble(heading);

      heading.addEventListener("mouseenter", () => {
        scrambler.setText(originalText);
      });
    });
  }

  // Initialize scramble text effect
  document.addEventListener("DOMContentLoaded", initScrambleTexts);
  // Add glitch effect to images
  function initGlitchEffect() {
    const images = document.querySelectorAll(
      ".project-image, .profile-placeholder, .image-placeholder"
    );

    images.forEach((image) => {
      image.classList.add("image-glitch");
    });
  }

  // Initialize glitch effect
  document.addEventListener("DOMContentLoaded", initGlitchEffect);
});
