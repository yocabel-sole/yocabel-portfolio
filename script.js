/**
 * Portfolio JavaScript
 * Identity: Yocabel Gidey | Electrical & Computer Engineer (AI/ML & Full-Stack)
 * Interactivity: Theme switching, Project filters, Role rotator, Active link spy, Copy email, Mobile nav
 */

document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------
    // 1. THEME SWITCHER (Dark / Light Mode)
    // -------------------------------------------------------------
    const themeToggleBtn = document.getElementById("theme-toggle");
    const mobileThemeToggleBtn = document.getElementById("mobile-theme-toggle");
    const rootEl = document.documentElement;

    // Retrieve saved theme or default to 'dark'
    const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    setTheme(savedTheme);

    function setTheme(theme) {
        rootEl.setAttribute("data-theme", theme);
        localStorage.setItem("portfolio-theme", theme);

        const isLight = theme === "light";
        const sunIcons = document.querySelectorAll(".sun-icon");
        const moonIcons = document.querySelectorAll(".moon-icon");

        sunIcons.forEach(icon => icon.style.display = isLight ? "block" : "none");
        moonIcons.forEach(icon => icon.style.display = isLight ? "none" : "block");
    }

    function toggleTheme() {
        const currentTheme = rootEl.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        setTheme(newTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", toggleTheme);
    }
    if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener("click", toggleTheme);
    }

    // -------------------------------------------------------------
    // 2. STICKY HEADER & SCROLL SPY
    // -------------------------------------------------------------
    const header = document.getElementById("site-header");
    const backToTopBtn = document.getElementById("back-to-top");
    const navLinks = document.querySelectorAll(".nav-desktop .nav-link, .mobile-menu .nav-link");
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Sticky Header shadow/blur toggle
        if (header) {
            if (scrollY > 20) {
                header.classList.add("is-scrolled");
            } else {
                header.classList.remove("is-scrolled");
            }
        }

        // Back to top button visibility
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add("is-visible");
            } else {
                backToTopBtn.classList.remove("is-visible");
            }
        }

        // Active Section Scroll Spy
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // -------------------------------------------------------------
    // 3. MOBILE DRAWER NAVIGATION
    // -------------------------------------------------------------
    const mobileToggle = document.getElementById("mobile-toggle");
    const mobileDrawer = document.getElementById("mobile-drawer");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    function setMenuOpen(isOpen) {
        if (header) {
            document.documentElement.style.setProperty("--header-height", `${header.offsetHeight}px`);
            header.classList.toggle("is-menu-open", isOpen);
        }

        mobileDrawer.classList.toggle("is-open", isOpen);
        mobileToggle.classList.toggle("is-active", isOpen);
        mobileToggle.setAttribute("aria-expanded", String(isOpen));
        mobileToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        mobileDrawer.setAttribute("aria-hidden", String(!isOpen));
        if ("inert" in mobileDrawer) {
            mobileDrawer.inert = !isOpen;
        }
        document.body.classList.toggle("nav-open", isOpen);
    }

    if (mobileToggle && mobileDrawer) {
        setMenuOpen(false);

        mobileToggle.addEventListener("click", () => {
            const willOpen = !mobileDrawer.classList.contains("is-open");
            setMenuOpen(willOpen);
            if (willOpen) {
                const firstLink = mobileDrawer.querySelector(".mobile-link");
                if (firstLink) firstLink.focus();
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                setMenuOpen(false);
            });
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && mobileDrawer.classList.contains("is-open")) {
                setMenuOpen(false);
                mobileToggle.focus();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth >= 1025 && mobileDrawer.classList.contains("is-open")) {
                setMenuOpen(false);
            }
        });
    }

    // -------------------------------------------------------------
    // 4. DYNAMIC ROLE ROTATOR (Hero Section)
    // -------------------------------------------------------------
    const roleEl = document.getElementById("role-text");
    if (roleEl) {
        const roles = [
            "AI for Real-World Problems",
            "Machine Learning",
            "Computer Vision"
        ];

        let roleIndex = 0;
        const changeInterval = 3000;
        const fadeDuration = 250;

        setInterval(() => {
            roleEl.classList.add("is-transitioning");
            setTimeout(() => {
                roleIndex = (roleIndex + 1) % roles.length;
                roleEl.textContent = roles[roleIndex];
                roleEl.classList.remove("is-transitioning");
            }, fadeDuration);
        }, changeInterval);
    }

    // -------------------------------------------------------------
    // 5. PROJECT CATEGORY FILTER TABS
    // -------------------------------------------------------------
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Update active state on buttons
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
                btn.setAttribute("aria-selected", "false");
            });
            button.classList.add("active");
            button.setAttribute("aria-selected", "true");

            const filterValue = button.getAttribute("data-filter");

            projectCards.forEach(card => {
                const cardCategories = card.getAttribute("data-category") || "";

                if (filterValue === "all" || cardCategories.includes(filterValue)) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "translateY(15px)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 200);
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 6. 1-CLICK COPY EMAIL TO CLIPBOARD
    // -------------------------------------------------------------
    const copyEmailBtn = document.getElementById("copy-email-btn");
    const toast = document.getElementById("toast");
    const emailToCopy = "gideyyocabel43@gmail.com";

    if (copyEmailBtn && toast) {
        copyEmailBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(emailToCopy).then(() => {
                toast.classList.add("show");
                setTimeout(() => {
                    toast.classList.remove("show");
                }, 2800);
            }).catch(err => {
                // Fallback prompt if clipboard API fails
                prompt("Copy my email:", emailToCopy);
            });
        });
    }
});
