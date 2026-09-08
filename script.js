/* =========================================================
   JISHNU TEJA DANDAMUDI - ACADEMIC RESEARCH PORTFOLIO
   Dynamic Interactions, Constellation Canvas & Admin CMS
   Compatible with GitHub Pages Static Hosting
========================================================= */

(function () {
  "use strict";

  // =========================================================
  // STATE MANAGEMENT
  // =========================================================
  let siteData = window.getSiteData ? window.getSiteData() : {};
  let currentPubFilter = "ALL";
  let currentPubSearch = "";

  // Admin session & password configuration
  const DEFAULT_ADMIN_PASS = "jishnu2026";
  function getMasterPassword() {
    return localStorage.getItem("JT_ADMIN_PASS") || DEFAULT_ADMIN_PASS;
  }
  function setMasterPassword(newPass) {
    localStorage.setItem("JT_ADMIN_PASS", newPass);
  }
  function isAdminLoggedIn() {
    return sessionStorage.getItem("JT_ADMIN_LOGGED_IN") === "true";
  }
  function setAdminLoggedIn(status) {
    if (status) {
      sessionStorage.setItem("JT_ADMIN_LOGGED_IN", "true");
    } else {
      sessionStorage.removeItem("JT_ADMIN_LOGGED_IN");
    }
    updateAdminUI();
  }

  // =========================================================
  // TOAST NOTIFICATIONS
  // =========================================================
  function showToast(message, icon = "fa-solid fa-circle-check") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="${icon}" style="color: var(--accent-cyan);"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3000);
  }

  // =========================================================
  // BACKGROUND NEURAL CONSTELLATION CANVAS
  // =========================================================
  function initConstellationCanvas() {
    const canvas = document.getElementById("bgCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(Math.floor((width * height) / 18000), 75);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle mouse interaction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          p.x -= (dx / dist) * 0.5;
          p.y -= (dy / dist) * 0.5;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56, 189, 248, 0.45)";
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 115) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${0.25 * (1 - dist2 / 115)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  // =========================================================
  // 3D RESEARCH ORBIT MOUSE PHYSICS
  // =========================================================
  function initResearchOrbit() {
    const orbitContainer = document.getElementById("researchVisual");
    if (!orbitContainer) return;

    const nodes = orbitContainer.querySelectorAll(".orbit-node");

    orbitContainer.addEventListener("mousemove", (e) => {
      const rect = orbitContainer.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      nodes.forEach((node, idx) => {
        const factor = (idx + 1) * 0.12;
        node.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });

    orbitContainer.addEventListener("mouseleave", () => {
      nodes.forEach((node) => {
        node.style.transform = "translate(0, 0)";
      });
    });
  }

  // =========================================================
  // BIBTEX CITATION GENERATOR
  // =========================================================
  function generateBibTeX(pub) {
    const key = (pub.authors ? pub.authors.split(" ")[0].toLowerCase() : "jishnu") + (pub.year || "2026") + (pub.title ? pub.title.split(" ")[0].toLowerCase() : "");
    const entryType = pub.type === "JOURNAL" ? "article" : (pub.type === "BOOK CHAPTER" ? "incollection" : "inproceedings");
    
    return `@${entryType}{${key},
  title     = {${pub.title || ""}},
  author    = {${pub.authors || "Jishnu Teja Dandamudi"}},
  year      = {${pub.year || "2026"}},
  booktitle = {${pub.venue || ""}},
  publisher = {${pub.publisher || ""}},
  url       = {${pub.link || ""}}
}`;
  }

  window.copyBibTeX = function (pubId) {
    const pub = (siteData.publications || []).find((p) => p.id === pubId);
    if (!pub) return;

    const bibtex = generateBibTeX(pub);
    navigator.clipboard.writeText(bibtex).then(
      () => {
        showToast("BibTeX citation copied to clipboard!", "fa-solid fa-copy");
      },
      () => {
        prompt("Copy BibTeX Citation:", bibtex);
      }
    );
  };

  // =========================================================
  // RENDER PUBLICATIONS
  // =========================================================
  function getPublisherClass(publisher) {
    const p = (publisher || "").toLowerCase();
    if (p.includes("ieee")) return "pub-ieee";
    if (p.includes("elsevier")) return "pub-elsevier";
    if (p.includes("springer")) return "pub-springer";
    if (p.includes("crc") || p.includes("taylor")) return "pub-crc";
    return "pub-ieee";
  }

  function renderPublications() {
    const list = document.getElementById("publicationsList");
    if (!list) return;

    const pubs = siteData.publications || [];
    const loggedIn = isAdminLoggedIn();

    // Update Counts
    const countAll = document.getElementById("countAll");
    const countJournal = document.getElementById("countJournal");
    const countConf = document.getElementById("countConf");
    const countBook = document.getElementById("countBook");

    if (countAll) countAll.textContent = pubs.length;
    if (countJournal) countJournal.textContent = pubs.filter((p) => p.type === "JOURNAL").length;
    if (countConf) countConf.textContent = pubs.filter((p) => p.type === "CONFERENCE").length;
    if (countBook) countBook.textContent = pubs.filter((p) => p.type === "BOOK CHAPTER").length;

    // Filter & Search
    const filtered = pubs.filter((p) => {
      const matchesType =
        currentPubFilter === "ALL" ||
        (currentPubFilter === "JOURNAL" && p.type === "JOURNAL") ||
        (currentPubFilter === "CONFERENCE" && p.type === "CONFERENCE") ||
        (currentPubFilter === "BOOK CHAPTER" && p.type === "BOOK CHAPTER");

      if (!matchesType) return false;

      if (!currentPubSearch) return true;
      const q = currentPubSearch.toLowerCase();
      return (
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.authors && p.authors.toLowerCase().includes(q)) ||
        (p.venue && p.venue.toLowerCase().includes(q)) ||
        (p.publisher && p.publisher.toLowerCase().includes(q)) ||
        (p.year && p.year.toString().includes(q))
      );
    });

    const resultCount = document.getElementById("pubResultCount");
    if (resultCount) {
      resultCount.textContent = `Showing ${filtered.length} of ${pubs.length} publications`;
    }

    if (filtered.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 50px 20px; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border);">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2rem; margin-bottom: 12px; opacity: 0.5;"></i>
          <p style="font-size: 1rem; color: var(--text-primary); font-weight: 600;">No publications found</p>
          <p style="font-size: 0.85rem; margin-top: 4px;">Try searching with different keywords or selecting "All".</p>
        </div>
      `;
      return;
    }

    list.innerHTML = filtered
      .map((pub, idx) => {
        // Highlight Jishnu Teja Dandamudi in author text
        const highlightedAuthors = (pub.authors || "").replace(
          /Jishnu Teja Dandamudi/g,
          "<strong>Jishnu Teja Dandamudi</strong>"
        );

        const pubClass = getPublisherClass(pub.publisher);

        return `
        <article class="publication-item" data-id="${pub.id}">
          <div class="publication-marker">
            <span>${pub.number || String(filtered.length - idx).padStart(2, "0")}</span>
          </div>

          <div class="publication-content">
            <div class="publication-top">
              <span class="publication-year">${pub.year || "2026"}</span>
              <span class="publication-status">${pub.status || "PUBLISHED"}</span>
              ${pub.publisher ? `<span class="publisher-badge ${pubClass}">${pub.publisher}</span>` : ""}
              ${pub.award ? `<span class="award-badge"><i class="fa-solid fa-trophy"></i> ${pub.award}</span>` : ""}
              
              ${
                loggedIn
                  ? `
                <div style="margin-left: auto; display: flex; gap: 6px;">
                  <button class="btn-icon" onclick="window.editPublication('${pub.id}')" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
                  <button class="btn-icon delete-btn" onclick="window.deletePublication('${pub.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
              `
                  : ""
              }
            </div>

            <h3>${pub.title}</h3>

            <p class="publication-authors">${highlightedAuthors}</p>

            ${pub.abstract ? `<p class="publication-abstract">${pub.abstract}</p>` : ""}

            <div class="publication-details">
              <span><strong>Venue:</strong> ${pub.venue || "Academic Conference / Journal"}</span>
              <span><strong>Type:</strong> ${pub.type || "RESEARCH PAPER"}</span>

              <div style="margin-left: auto; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
                ${
                  pub.link
                    ? `
                  <a href="${pub.link}" class="pub-action-btn" target="_blank" rel="noopener noreferrer">
                    View Paper <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.72rem;"></i>
                  </a>
                `
                    : ""
                }
                
                ${
                  pub.github
                    ? `
                  <a href="${pub.github}" class="pub-action-btn" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-github"></i> Code
                  </a>
                `
                    : ""
                }

                ${
                  pub.awardLink
                    ? `
                  <a href="${pub.awardLink}" class="pub-action-btn" target="_blank" rel="noopener noreferrer">
                    <i class="fa-solid fa-award"></i> Award Info
                  </a>
                `
                    : ""
                }

                <button class="pub-action-btn bibtex-btn" onclick="window.copyBibTeX('${pub.id}')" title="Copy BibTeX Citation">
                  <i class="fa-solid fa-quote-right"></i> Copy BibTeX
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
      })
      .join("");
  }

  // =========================================================
  // RENDER PROJECTS
  // =========================================================
  function renderProjects() {
    const list = document.getElementById("projectsList");
    if (!list) return;

    const projects = siteData.projects || [];
    const loggedIn = isAdminLoggedIn();

    list.innerHTML = projects
      .map((proj, idx) => {
        const iconClass = proj.icon || "fa-solid fa-microchip";
        const tags = Array.isArray(proj.tags) ? proj.tags : (proj.tags || "").split(",").map((t) => t.trim());

        return `
        <article class="project-card" data-id="${proj.id}">
          <div class="project-card-header">
            <span class="project-number">${proj.number || String(idx + 1).padStart(2, "0")}</span>
            <div class="project-icon">
              <i class="${iconClass}"></i>
            </div>
          </div>

          <h3>${proj.title}</h3>
          <p>${proj.description}</p>

          <div class="project-tags">
            ${tags.map((t) => `<span>${t}</span>`).join("")}
          </div>

          <div class="project-actions">
            ${
              proj.github
                ? `
              <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="pub-action-btn" style="flex: 1; justify-content: center;">
                <i class="fa-brands fa-github"></i> View Project
              </a>
            `
                : ""
            }

            ${
              loggedIn
                ? `
              <button class="btn-icon" onclick="window.editProject('${proj.id}')" title="Edit Project"><i class="fa-solid fa-pen-to-square"></i></button>
              <button class="btn-icon delete-btn" onclick="window.deleteProject('${proj.id}')" title="Delete Project"><i class="fa-solid fa-trash"></i></button>
            `
                : ""
            }
          </div>
        </article>
      `;
      })
      .join("");
  }

  // =========================================================
  // RENDER RECOMMENDATIONS
  // =========================================================
  function renderRecommendations() {
    const list = document.getElementById("recommendationsList");
    if (!list) return;

    const recs = siteData.recommendations || [];
    const loggedIn = isAdminLoggedIn();

    list.innerHTML = recs
      .map((rec) => {
        const initials = (rec.name || "A")
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();

        return `
        <div class="recommendation-card" data-id="${rec.id}">
          <div>
            <div class="quote-mark">“</div>
            <p>${rec.quote}</p>
          </div>

          <div class="recommendation-author">
            <div class="author-avatar">${initials}</div>
            <div class="author-info">
              <strong>${rec.name}</strong>
              <span>${rec.designation} · ${rec.institution}</span>
            </div>

            ${
              loggedIn
                ? `
              <div style="margin-left: auto; display: flex; gap: 6px;">
                <button class="btn-icon" onclick="window.editRecommendation('${rec.id}')" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn-icon delete-btn" onclick="window.deleteRecommendation('${rec.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
              </div>
            `
                : ""
            }
          </div>
        </div>
      `;
      })
      .join("");
  }

  // Re-render everything
  function renderAll() {
    renderPublications();
    renderProjects();
    renderRecommendations();
    populateAdminLists();
  }

  // =========================================================
  // ANIMATED STATS COUNTER
  // =========================================================
  function initStatsCounter() {
    const stats = document.querySelectorAll(".stat-num");
    if (!stats.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute("data-target"), 10);
            if (!target) return;

            let current = 0;
            const increment = target / 25;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                entry.target.textContent = target + "+";
                clearInterval(timer);
              } else {
                entry.target.textContent = Math.floor(current) + "+";
              }
            }, 30);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    stats.forEach((s) => observer.observe(s));
  }

  // =========================================================
  // ADMIN CMS - POPULATE MANAGEMENT LISTS
  // =========================================================
  function populateAdminLists() {
    // Publications Admin List
    const pubListEl = document.getElementById("adminPubsList");
    if (pubListEl) {
      pubListEl.innerHTML = (siteData.publications || [])
        .map(
          (p) => `
        <div class="admin-list-item">
          <div>
            <div class="admin-item-title">${p.title}</div>
            <div class="admin-item-subtitle">${p.year} · ${p.type} · ${p.publisher || "N/A"}</div>
          </div>
          <div class="admin-item-actions">
            <button class="btn-icon" onclick="window.editPublication('${p.id}')"><i class="fa-solid fa-pen"></i></button>
            <button class="btn-icon delete-btn" onclick="window.deletePublication('${p.id}')"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      `
        )
        .join("");
    }

    // Projects Admin List
    const projListEl = document.getElementById("adminProjList");
    if (projListEl) {
      projListEl.innerHTML = (siteData.projects || [])
        .map(
          (p) => `
        <div class="admin-list-item">
          <div>
            <div class="admin-item-title">${p.title}</div>
            <div class="admin-item-subtitle">${Array.isArray(p.tags) ? p.tags.join(", ") : p.tags}</div>
          </div>
          <div class="admin-item-actions">
            <button class="btn-icon" onclick="window.editProject('${p.id}')"><i class="fa-solid fa-pen"></i></button>
            <button class="btn-icon delete-btn" onclick="window.deleteProject('${p.id}')"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      `
        )
        .join("");
    }

    // Recommendations Admin List
    const recListEl = document.getElementById("adminRecList");
    if (recListEl) {
      recListEl.innerHTML = (siteData.recommendations || [])
        .map(
          (r) => `
        <div class="admin-list-item">
          <div>
            <div class="admin-item-title">${r.name}</div>
            <div class="admin-item-subtitle">${r.designation} (${r.institution})</div>
          </div>
          <div class="admin-item-actions">
            <button class="btn-icon" onclick="window.editRecommendation('${r.id}')"><i class="fa-solid fa-pen"></i></button>
            <button class="btn-icon delete-btn" onclick="window.deleteRecommendation('${r.id}')"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      `
        )
        .join("");
    }
  }

  // =========================================================
  // ADMIN AUTHENTICATION & DIALOG CONTROLS
  // =========================================================
  function updateAdminUI() {
    const loggedIn = isAdminLoggedIn();
    const navAdminBtn = document.getElementById("navAdminBtn");
    const navAdminIcon = document.getElementById("navAdminIcon");
    const navAdminText = document.getElementById("navAdminText");
    const adminStatusBar = document.getElementById("adminStatusBar");

    if (loggedIn) {
      if (navAdminBtn) navAdminBtn.classList.add("active-logged-in");
      if (navAdminIcon) navAdminIcon.className = "fa-solid fa-lock-open";
      if (navAdminText) navAdminText.textContent = "Admin Hub";
      if (adminStatusBar) adminStatusBar.classList.add("visible");
    } else {
      if (navAdminBtn) navAdminBtn.classList.remove("active-logged-in");
      if (navAdminIcon) navAdminIcon.className = "fa-solid fa-lock";
      if (navAdminText) navAdminText.textContent = "Admin Portal";
      if (adminStatusBar) adminStatusBar.classList.remove("visible");
    }

    renderAll();
  }

  function initAdminModals() {
    const loginModal = document.getElementById("adminLoginModal");
    const hubModal = document.getElementById("adminHubModal");
    const pubModal = document.getElementById("pubFormModal");
    const projModal = document.getElementById("projFormModal");
    const recModal = document.getElementById("recFormModal");

    // Open Admin Trigger (Navbar & Footer)
    function openAdminTrigger() {
      if (isAdminLoggedIn()) {
        hubModal.classList.add("active");
        populateAdminLists();
      } else {
        loginModal.classList.add("active");
        const pwInput = document.getElementById("adminPasswordInput");
        if (pwInput) {
          pwInput.value = "";
          setTimeout(() => pwInput.focus(), 100);
        }
      }
    }

    const navAdminBtn = document.getElementById("navAdminBtn");
    const footerAdminBtn = document.getElementById("footerAdminBtn");
    const openAdminDashboardBtn = document.getElementById("openAdminDashboardBtn");

    if (navAdminBtn) navAdminBtn.addEventListener("click", openAdminTrigger);
    if (footerAdminBtn) footerAdminBtn.addEventListener("click", openAdminTrigger);
    if (openAdminDashboardBtn) openAdminDashboardBtn.addEventListener("click", () => hubModal.classList.add("active"));

    // Keyboard shortcut (Ctrl + Shift + A)
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        openAdminTrigger();
      }
    });

    // Close buttons
    document.getElementById("closeLoginModalBtn")?.addEventListener("click", () => loginModal.classList.remove("active"));
    document.getElementById("closeHubModalBtn")?.addEventListener("click", () => hubModal.classList.remove("active"));
    document.getElementById("closePubFormBtn")?.addEventListener("click", () => pubModal.classList.remove("active"));
    document.getElementById("cancelPubFormBtn")?.addEventListener("click", () => pubModal.classList.remove("active"));
    document.getElementById("closeProjFormBtn")?.addEventListener("click", () => projModal.classList.remove("active"));
    document.getElementById("cancelProjFormBtn")?.addEventListener("click", () => projModal.classList.remove("active"));
    document.getElementById("closeRecFormBtn")?.addEventListener("click", () => recModal.classList.remove("active"));
    document.getElementById("cancelRecFormBtn")?.addEventListener("click", () => recModal.classList.remove("active"));

    // Close on overlay backdrop click
    [loginModal, hubModal, pubModal, projModal, recModal].forEach((m) => {
      if (!m) return;
      m.addEventListener("click", (e) => {
        if (e.target === m) m.classList.remove("active");
      });
    });

    // Admin Login Form
    const loginForm = document.getElementById("adminLoginForm");
    const errorMsg = document.getElementById("loginErrorMsg");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const entered = document.getElementById("adminPasswordInput").value.trim();
        if (entered === getMasterPassword()) {
          setAdminLoggedIn(true);
          loginModal.classList.remove("active");
          if (errorMsg) errorMsg.style.display = "none";
          hubModal.classList.add("active");
          showToast("Welcome Jishnu! Admin access unlocked.", "fa-solid fa-unlock");
        } else {
          if (errorMsg) errorMsg.style.display = "block";
          const input = document.getElementById("adminPasswordInput");
          if (input) {
            input.style.borderColor = "#f43f5e";
            setTimeout(() => (input.style.borderColor = ""), 1500);
          }
        }
      });
    }

    // Admin Logout
    const logoutAction = () => {
      setAdminLoggedIn(false);
      hubModal.classList.remove("active");
      showToast("Logged out of Admin Portal", "fa-solid fa-lock");
    };
    document.getElementById("adminLogoutBtn")?.addEventListener("click", logoutAction);
    document.getElementById("quickLogoutBtn")?.addEventListener("click", logoutAction);

    // Hub Tabs
    const tabBtns = document.querySelectorAll(".admin-tab-btn");
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabBtns.forEach((b) => b.classList.remove("active"));
        document.querySelectorAll(".admin-tab-content").forEach((c) => c.classList.remove("active"));

        btn.classList.add("active");
        const target = document.getElementById(btn.getAttribute("data-tab"));
        if (target) target.classList.add("active");
      });
    });

    // Change Password Form
    const changePassForm = document.getElementById("changePasswordForm");
    if (changePassForm) {
      changePassForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newPass = document.getElementById("newPasswordInput").value.trim();
        if (newPass.length < 4) {
          alert("Password must be at least 4 characters long.");
          return;
        }
        setMasterPassword(newPass);
        document.getElementById("newPasswordInput").value = "";
        showToast("Master password successfully updated!", "fa-solid fa-key");
      });
    }

    // Export Data File for GitHub Pages
    function exportSiteDataFile() {
      const code = `/**
 * JISHNU TEJA DANDAMUDI - MASTER DATA REPOSITORY
 * Exported from Admin Portal for GitHub Pages.
 */

const SITE_DATA = ${JSON.stringify(siteData, null, 2)};

window.getSiteData = function() {
  const local = localStorage.getItem("JT_SITE_DATA");
  if (local) {
    try {
      const parsed = JSON.parse(local);
      if (!parsed.publications || parsed.publications.length === 0) parsed.publications = SITE_DATA.publications;
      if (!parsed.projects || parsed.projects.length === 0) parsed.projects = SITE_DATA.projects;
      if (!parsed.recommendations || parsed.recommendations.length === 0) parsed.recommendations = SITE_DATA.recommendations;
      return parsed;
    } catch(e) {
      console.warn("Error reading cached site data, loading defaults", e);
    }
  }
  return JSON.parse(JSON.stringify(SITE_DATA));
};

window.saveSiteData = function(data) {
  localStorage.setItem("JT_SITE_DATA", JSON.stringify(data));
};
`;

      const blob = new Blob([code], { type: "text/javascript" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "site-data.js";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast("site-data.js downloaded! Commit it to GitHub Pages.", "fa-solid fa-file-arrow-down");
    }

    document.getElementById("exportDataFileBtn")?.addEventListener("click", exportSiteDataFile);

    document.getElementById("copyDataCodeBtn")?.addEventListener("click", () => {
      const exportJson = JSON.stringify(siteData, null, 2);
      navigator.clipboard.writeText(exportJson).then(() => {
        showToast("Data JSON copied to clipboard!", "fa-solid fa-copy");
      });
    });

    // Reset Defaults Button
    document.getElementById("resetDefaultsBtn")?.addEventListener("click", () => {
      if (confirm("Are you sure you want to reset all data back to the default 12 publications and original records?")) {
        localStorage.removeItem("JT_SITE_DATA");
        siteData = window.getSiteData();
        renderAll();
        showToast("Reset to default site content", "fa-solid fa-rotate-left");
      }
    });
  }

  // =========================================================
  // PUBLICATION ADD / EDIT / DELETE HANDLERS
  // =========================================================
  window.editPublication = function (pubId) {
    const pub = (siteData.publications || []).find((p) => p.id === pubId);
    if (!pub) return;

    document.getElementById("pubFormModalTitle").innerHTML = '<i class="fa-solid fa-file-pen"></i> Edit Research Publication';
    document.getElementById("pubEditId").value = pub.id;
    document.getElementById("pubTitle").value = pub.title || "";
    document.getElementById("pubAuthors").value = pub.authors || "";
    document.getElementById("pubYear").value = pub.year || "2026";
    document.getElementById("pubType").value = pub.type || "CONFERENCE";
    document.getElementById("pubPublisher").value = pub.publisher || "";
    document.getElementById("pubVenue").value = pub.venue || "";
    document.getElementById("pubAbstract").value = pub.abstract || "";
    document.getElementById("pubLink").value = pub.link || "";
    document.getElementById("pubGithub").value = pub.github || "";
    document.getElementById("pubAward").value = pub.award || "";

    document.getElementById("adminHubModal")?.classList.remove("active");
    document.getElementById("pubFormModal")?.classList.add("active");
  };

  window.deletePublication = function (pubId) {
    const pub = (siteData.publications || []).find((p) => p.id === pubId);
    if (!pub) return;

    if (confirm(`Are you sure you want to delete publication:\n"${pub.title}"?`)) {
      siteData.publications = siteData.publications.filter((p) => p.id !== pubId);
      window.saveSiteData(siteData);
      renderAll();
      showToast("Publication deleted successfully", "fa-solid fa-trash");
    }
  };

  document.getElementById("addNewPubBtn")?.addEventListener("click", () => {
    document.getElementById("pubForm").reset();
    document.getElementById("pubEditId").value = "";
    document.getElementById("pubFormModalTitle").innerHTML = '<i class="fa-solid fa-file-circle-plus"></i> Add Research Publication';
    document.getElementById("adminHubModal")?.classList.remove("active");
    document.getElementById("pubFormModal")?.classList.add("active");
  });

  document.getElementById("pubForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const editId = document.getElementById("pubEditId").value;
    const title = document.getElementById("pubTitle").value.trim();
    const authors = document.getElementById("pubAuthors").value.trim();
    const year = document.getElementById("pubYear").value.trim();
    const type = document.getElementById("pubType").value;
    const publisher = document.getElementById("pubPublisher").value.trim();
    const venue = document.getElementById("pubVenue").value.trim();
    const abstract = document.getElementById("pubAbstract").value.trim();
    const link = document.getElementById("pubLink").value.trim();
    const github = document.getElementById("pubGithub").value.trim();
    const award = document.getElementById("pubAward").value.trim();

    if (editId) {
      // Update existing
      const idx = siteData.publications.findIndex((p) => p.id === editId);
      if (idx !== -1) {
        siteData.publications[idx] = {
          ...siteData.publications[idx],
          title,
          authors,
          year,
          type,
          publisher,
          venue,
          abstract,
          link,
          github,
          award
        };
      }
      showToast("Publication updated successfully!");
    } else {
      // Add new
      const newId = "pub-" + Date.now();
      const newNumber = String((siteData.publications || []).length + 1).padStart(2, "0");
      siteData.publications.unshift({
        id: newId,
        number: newNumber,
        year,
        status: "PUBLISHED",
        title,
        authors,
        type,
        publisher,
        venue,
        abstract,
        link,
        github,
        award
      });
      showToast("New publication added!");
    }

    window.saveSiteData(siteData);
    document.getElementById("pubFormModal")?.classList.remove("active");
    renderAll();
  });

  // =========================================================
  // PROJECT ADD / EDIT / DELETE HANDLERS
  // =========================================================
  window.editProject = function (projId) {
    const proj = (siteData.projects || []).find((p) => p.id === projId);
    if (!proj) return;

    document.getElementById("projFormModalTitle").innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit Project';
    document.getElementById("projEditId").value = proj.id;
    document.getElementById("projTitle").value = proj.title || "";
    document.getElementById("projDescription").value = proj.description || "";
    document.getElementById("projTags").value = Array.isArray(proj.tags) ? proj.tags.join(", ") : proj.tags || "";
    document.getElementById("projIcon").value = proj.icon || "";
    document.getElementById("projGithub").value = proj.github || "";

    document.getElementById("adminHubModal")?.classList.remove("active");
    document.getElementById("projFormModal")?.classList.add("active");
  };

  window.deleteProject = function (projId) {
    const proj = (siteData.projects || []).find((p) => p.id === projId);
    if (!proj) return;

    if (confirm(`Delete project "${proj.title}"?`)) {
      siteData.projects = siteData.projects.filter((p) => p.id !== projId);
      window.saveSiteData(siteData);
      renderAll();
      showToast("Project deleted successfully", "fa-solid fa-trash");
    }
  };

  document.getElementById("addNewProjBtn")?.addEventListener("click", () => {
    document.getElementById("projForm").reset();
    document.getElementById("projEditId").value = "";
    document.getElementById("projFormModalTitle").innerHTML = '<i class="fa-solid fa-folder-plus"></i> Add Project';
    document.getElementById("adminHubModal")?.classList.remove("active");
    document.getElementById("projFormModal")?.classList.add("active");
  });

  document.getElementById("projForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const editId = document.getElementById("projEditId").value;
    const title = document.getElementById("projTitle").value.trim();
    const description = document.getElementById("projDescription").value.trim();
    const tags = document
      .getElementById("projTags")
      .value.split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const icon = document.getElementById("projIcon").value.trim() || "fa-solid fa-microchip";
    const github = document.getElementById("projGithub").value.trim();

    if (editId) {
      const idx = siteData.projects.findIndex((p) => p.id === editId);
      if (idx !== -1) {
        siteData.projects[idx] = {
          ...siteData.projects[idx],
          title,
          description,
          tags,
          icon,
          github
        };
      }
      showToast("Project updated successfully!");
    } else {
      const newId = "proj-" + Date.now();
      const num = String((siteData.projects || []).length + 1).padStart(2, "0");
      siteData.projects.push({
        id: newId,
        number: num,
        title,
        description,
        tags,
        icon,
        github
      });
      showToast("New project added!");
    }

    window.saveSiteData(siteData);
    document.getElementById("projFormModal")?.classList.remove("active");
    renderAll();
  });

  // =========================================================
  // RECOMMENDATIONS ADD / EDIT / DELETE HANDLERS
  // =========================================================
  window.editRecommendation = function (recId) {
    const rec = (siteData.recommendations || []).find((r) => r.id === recId);
    if (!rec) return;

    document.getElementById("recFormModalTitle").innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit Recommendation';
    document.getElementById("recEditId").value = rec.id;
    document.getElementById("recQuote").value = rec.quote || "";
    document.getElementById("recName").value = rec.name || "";
    document.getElementById("recDesignation").value = rec.designation || "";
    document.getElementById("recInstitution").value = rec.institution || "";

    document.getElementById("adminHubModal")?.classList.remove("active");
    document.getElementById("recFormModal")?.classList.add("active");
  };

  window.deleteRecommendation = function (recId) {
    const rec = (siteData.recommendations || []).find((r) => r.id === recId);
    if (!rec) return;

    if (confirm(`Delete recommendation from ${rec.name}?`)) {
      siteData.recommendations = siteData.recommendations.filter((r) => r.id !== recId);
      window.saveSiteData(siteData);
      renderAll();
      showToast("Recommendation deleted", "fa-solid fa-trash");
    }
  };

  document.getElementById("addNewRecBtn")?.addEventListener("click", () => {
    document.getElementById("recForm").reset();
    document.getElementById("recEditId").value = "";
    document.getElementById("recFormModalTitle").innerHTML = '<i class="fa-solid fa-comment-dots"></i> Add Recommendation';
    document.getElementById("adminHubModal")?.classList.remove("active");
    document.getElementById("recFormModal")?.classList.add("active");
  });

  document.getElementById("recForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const editId = document.getElementById("recEditId").value;
    const quote = document.getElementById("recQuote").value.trim();
    const name = document.getElementById("recName").value.trim();
    const designation = document.getElementById("recDesignation").value.trim();
    const institution = document.getElementById("recInstitution").value.trim();

    if (editId) {
      const idx = siteData.recommendations.findIndex((r) => r.id === editId);
      if (idx !== -1) {
        siteData.recommendations[idx] = {
          ...siteData.recommendations[idx],
          quote,
          name,
          designation,
          institution
        };
      }
      showToast("Recommendation updated!");
    } else {
      const newId = "rec-" + Date.now();
      siteData.recommendations.push({
        id: newId,
        quote,
        name,
        designation,
        institution
      });
      showToast("New recommendation added!");
    }

    window.saveSiteData(siteData);
    document.getElementById("recFormModal")?.classList.remove("active");
    renderAll();
  });

  // =========================================================
  // SEARCH & FILTER INPUT LISTENERS
  // =========================================================
  function initSearchAndFilter() {
    const searchInput = document.getElementById("pubSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        currentPubSearch = e.target.value.trim();
        renderPublications();
      });
    }

    const pills = document.querySelectorAll(".filter-pill-btn");
    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        pills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        currentPubFilter = pill.getAttribute("data-filter") || "ALL";
        renderPublications();
      });
    });
  }

  // =========================================================
  // MOBILE NAVIGATION & ACTIVE LINKS
  // =========================================================
  function initNavigation() {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        const icon = menuToggle.querySelector("i");
        if (navLinks.classList.contains("active")) {
          icon.className = "fa-solid fa-xmark";
        } else {
          icon.className = "fa-solid fa-bars";
        }
      });

      navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("active");
          const icon = menuToggle.querySelector("i");
          if (icon) icon.className = "fa-solid fa-bars";
        });
      });
    }

    // Scroll spy
    const sections = document.querySelectorAll("section[id]");
    const navAnchors = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach((section) => {
        const top = section.offsetTop - 140;
        const height = section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          current = section.getAttribute("id");
        }
      });

      navAnchors.forEach((a) => {
        a.classList.remove("active");
        if (a.getAttribute("href") === "#" + current) {
          a.classList.add("active");
        }
      });
    });
  }

  // =========================================================
  // PROFILE HOVER REVEAL EFFECT
  // =========================================================
  function initProfileReveal() {
    const profile = document.getElementById("profileReveal");
    if (!profile) return;

    const reveal = () => {
      const overlay = profile.querySelector(".profile-overlay");
      if (overlay) overlay.style.opacity = "0";
      const img = profile.querySelector(".profile-image");
      if (img) img.style.filter = "none";
    };

    profile.addEventListener("mouseenter", reveal);
    profile.addEventListener("click", reveal);
    profile.addEventListener("touchstart", reveal, { passive: true });
  }

  // =========================================================
  // DOCUMENT DOWNLOAD HANDLERS
  // =========================================================
  function initDocumentButtons() {
    const resumeBtn = document.getElementById("resumeDownload");
    const cvBtn = document.getElementById("cvDownload");

    const fallbackAlert = (e, name) => {
      // Check if file exists or give helpful prompt
      fetch(e.currentTarget.href, { method: "HEAD" })
        .then((res) => {
          if (!res.ok) {
            alert(`${name} will be downloaded once the PDF file is placed in your repository's /documents/ folder.`);
          }
        })
        .catch(() => {
          // If offline/local, allow default download behavior
        });
    };

    if (resumeBtn) resumeBtn.addEventListener("click", (e) => fallbackAlert(e, "Resume"));
    if (cvBtn) cvBtn.addEventListener("click", (e) => fallbackAlert(e, "CV"));
  }

  // =========================================================
  // INITIALIZATION ON DOM READY
  // =========================================================
  document.addEventListener("DOMContentLoaded", () => {
    initConstellationCanvas();
    initResearchOrbit();
    initNavigation();
    initProfileReveal();
    initStatsCounter();
    initSearchAndFilter();
    initAdminModals();
    initDocumentButtons();

    // Render initial content
    renderAll();
    updateAdminUI();
  });
})();
