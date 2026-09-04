/* =========================================================
   JISHNU TEJA DANDAMUDI
   RESEARCH PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const body =
        document.body;

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");

    const themeToggle =
        document.getElementById("themeToggle");

    const scrollProgress =
        document.getElementById("scrollProgress");

    const backToTop =
        document.getElementById("backToTop");

    const copyEmail =
        document.getElementById("copyEmail");

    const publicationSearch =
        document.getElementById("publicationSearch");

    const noResults =
        document.getElementById("noPublicationResults");


    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    navLinks.classList.toggle("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                const icon =
                    menuToggle.querySelector("i");

                if (icon) {

                    if (isOpen) {

                        icon.classList.remove(
                            "fa-bars"
                        );

                        icon.classList.add(
                            "fa-xmark"
                        );

                    } else {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }
        );


        navLinks
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navLinks.classList.remove(
                            "active"
                        );

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        const icon =
                            menuToggle.querySelector("i");

                        if (icon) {

                            icon.classList.remove(
                                "fa-xmark"
                            );

                            icon.classList.add(
                                "fa-bars"
                            );

                        }

                    }
                );

            });

    }


    /* =====================================================
       THEME
    ====================================================== */

    function updateThemeIcon() {

        if (!themeToggle) {
            return;
        }

        const icon =
            themeToggle.querySelector("i");

        if (!icon) {
            return;
        }

        if (
            body.classList.contains(
                "light-theme"
            )
        ) {

            icon.classList.remove(
                "fa-moon"
            );

            icon.classList.add(
                "fa-sun"
            );

        } else {

            icon.classList.remove(
                "fa-sun"
            );

            icon.classList.add(
                "fa-moon"
            );

        }

    }


    const savedTheme =
        localStorage.getItem(
            "jtd-theme"
        );


    if (savedTheme === "light") {

        body.classList.add(
            "light-theme"
        );

    }


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function () {

                body.classList.toggle(
                    "light-theme"
                );

                const theme =
                    body.classList.contains(
                        "light-theme"
                    )
                        ? "light"
                        : "dark";

                localStorage.setItem(
                    "jtd-theme",
                    theme
                );

                updateThemeIcon();

            }
        );

    }


    /* =====================================================
       SCROLL PROGRESS
    ====================================================== */

    function updateScrollProgress() {

        if (!scrollProgress) {
            return;
        }

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight
            - window.innerHeight;

        if (documentHeight <= 0) {

            scrollProgress.style.width =
                "0%";

            return;

        }

        const percentage =
            (scrollTop / documentHeight) * 100;

        scrollProgress.style.width =
            Math.min(
                percentage,
                100
            ) + "%";

    }


    /* =====================================================
       BACK TO TOP
    ====================================================== */

    function updateBackToTop() {

        if (!backToTop) {
            return;
        }

        if (window.scrollY > 700) {

            backToTop.classList.add(
                "visible"
            );

        } else {

            backToTop.classList.remove(
                "visible"
            );

        }

    }


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const sections =
        Array.from(
            document.querySelectorAll(
                "main section[id]"
            )
        );


    const navigationLinks =
        Array.from(
            document.querySelectorAll(
                ".nav-links a"
            )
        );


    function updateActiveNavigation() {

        if (!sections.length) {
            return;
        }

        const scrollPosition =
            window.scrollY + 180;

        let currentSection =
            sections[0].id;


        sections.forEach(
            function (section) {

                if (
                    scrollPosition >=
                    section.offsetTop
                ) {

                    currentSection =
                        section.id;

                }

            }
        );


        navigationLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active"
                );

                const href =
                    link.getAttribute(
                        "href"
                    );

                if (
                    href ===
                    "#" + currentSection
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    /* =====================================================
       SCROLL HANDLER
    ====================================================== */

    let ticking =
        false;


    function handleScroll() {

        if (!ticking) {

            window.requestAnimationFrame(
                function () {

                    updateScrollProgress();

                    updateBackToTop();

                    updateActiveNavigation();

                    ticking = false;

                }
            );

            ticking = true;

        }

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    updateScrollProgress();

    updateBackToTop();

    updateActiveNavigation();



    /* =====================================================
       REVEAL ANIMATIONS
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        prefersReducedMotion ||
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

    } else {

        const revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.08
                }
            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );

    }



    /* =====================================================
       PUBLICATION FILTER
    ====================================================== */

    const publicationItems =
        Array.from(
            document.querySelectorAll(
                ".publication-item"
            )
        );


    const filterButtons =
        Array.from(
            document.querySelectorAll(
                ".filter-button"
            )
        );


    let activeYearFilter =
        "all";


    function filterPublications() {

        const query =
            publicationSearch
                ? publicationSearch.value
                    .trim()
                    .toLowerCase()
                : "";


        let visibleCount =
            0;


        publicationItems.forEach(
            function (item) {

                const year =
                    item.dataset.year || "";


                const searchableText =
                    (
                        item.dataset.search ||
                        item.textContent ||
                        ""
                    ).toLowerCase();


                const yearMatches =
                    activeYearFilter === "all" ||
                    year === activeYearFilter;


                const searchMatches =
                    !query ||
                    searchableText.includes(
                        query
                    );


                const shouldShow =
                    yearMatches &&
                    searchMatches;


                if (shouldShow) {

                    item.style.display =
                        "";

                    visibleCount++;

                } else {

                    item.style.display =
                        "none";

                }

            }
        );


        if (noResults) {

            noResults.style.display =
                visibleCount === 0
                    ? "block"
                    : "none";

        }

    }


    filterButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    filterButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    activeYearFilter =
                        button.dataset.filter ||
                        "all";


                    filterPublications();

                }
            );

        }
    );


    if (publicationSearch) {

        publicationSearch.addEventListener(
            "input",
            filterPublications
        );

    }


    filterPublications();



    /* =====================================================
       COPY EMAIL
    ====================================================== */

    if (copyEmail) {

        copyEmail.addEventListener(
            "click",
            async function () {

                const email =
                    "djishnuteja2006@gmail.com";


                try {

                    await navigator.clipboard.writeText(
                        email
                    );


                    const originalHTML =
                        copyEmail.innerHTML;


                    copyEmail.innerHTML =
                        '<i class="fa-solid fa-check"></i> Copied';


                    setTimeout(
                        function () {

                            copyEmail.innerHTML =
                                originalHTML;

                        },
                        1800
                    );


                } catch (error) {

                    window.location.href =
                        "mailto:" + email;

                }

            }
        );

    }



    /* =====================================================
       PROFILE IMAGE FALLBACK
    ====================================================== */

    const profileImage =
        document.querySelector(
            ".profile-image"
        );


    if (profileImage) {

        profileImage.addEventListener(
            "error",
            function () {

                this.style.display =
                    "none";


                const wrapper =
                    this.parentElement;


                if (wrapper) {

                    wrapper.classList.add(
                        "image-missing"
                    );

                }

            }
        );

    }



    /* =====================================================
       EXTERNAL LINKS
    ====================================================== */

    document
        .querySelectorAll(
            'a[target="_blank"]'
        )
        .forEach(
            function (link) {

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }
        );



    /* =====================================================
       FOOTER YEAR
    ====================================================== */

    const copyright =
        document.querySelector(
            ".copyright"
        );


    if (copyright) {

        copyright.textContent =
            "© " +
            new Date().getFullYear() +
            " Jishnu Teja Dandamudi";

    }



    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                navLinks
            ) {

                navLinks.classList.remove(
                    "active"
                );


                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );


});
