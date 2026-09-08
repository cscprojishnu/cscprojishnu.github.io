# Jishnu Teja Dandamudi — Academic Research Portfolio

Personal academic research website for **Jishnu Teja Dandamudi** (Dual-Degree AI, CS & Data Science Researcher). Hosted statically on **GitHub Pages**.

## Features

- **Modern Cyber-Academic Design**: Dark obsidian palette (`#04060b`), ambient radial glowing accents, glassmorphic cards (`backdrop-filter: blur(16px)`), and a performant neural constellation background canvas.
- **Interactive 3D Research Orbit**: Central AI core with 5 orbiting research focus nodes (Vision, ML/DL, XAI, Quantum Computing, Edge AI).
- **Comprehensive Publications Suite**:
  - Live instant search bar by keywords, author, venue, publisher, or year.
  - Category filter pills (*All, Journals, Conferences, Book Chapters*).
  - Badges for publishers (IEEE, Elsevier, Springer Nature, CRC Press).
  - **1-Click BibTeX Citation Generator** with clipboard copy.
- **In-Browser Admin CMS**:
  - Protected with a customizable master password (initial default: `jishnu2026`).
  - Add, edit, or delete research papers, projects, and recommendations on-the-fly without touching code.
  - 1-Click **"Export site-data.js"** to sync additions to GitHub Pages for global visitors.

---

## File Structure

```
├── index.html        # Main HTML structure & Admin modals
├── style.css         # Complete cyber-academic stylesheet
├── script.js         # Interactive animations, filtering & Admin CMS logic
├── site-data.js      # Verbatim data store (12 publications, projects, bio)
├── images/           # Place your profile picture here as profile.JPG
└── documents/        # Place your Jishnu_Teja_Dandamudi_Resume.pdf & CV.pdf here
```

---

## How to Host on GitHub Pages

### Option 1: As Your Main Profile Website (`https://cscprojishnu.github.io`)
1. Go to [GitHub.com](https://github.com/) and create a new public repository named:
   **`cscprojishnu.github.io`**
2. Upload or push all the files in this folder into that repository.
3. Your website will be automatically live at:
   **https://cscprojishnu.github.io**

### Option 2: As a Project Website (e.g., `portfolio` or `website`)
1. Create a new public repository on GitHub (e.g. `website` or `portfolio`).
2. Upload or push all files to the repository.
3. Go to **Settings** > **Pages** (in the left sidebar).
4. Under **Build and deployment > Branch**, select `main` (or `master`) and folder `/ (root)`, then click **Save**.
5. Wait 1–2 minutes, and your site will be live at:
   `https://cscprojishnu.github.io/website/`
