'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// copy email functionality
const copyEmailBtn = document.querySelector("[data-copy-email]");
const toast = document.querySelector("[data-toast]");
let toastTimer;

if (copyEmailBtn && toast) {

  copyEmailBtn.addEventListener("click", async function () {

    try {
      await navigator.clipboard.writeText(this.dataset.copyEmail);
      toast.innerText = "Email copied to clipboard";
    } catch (err) {
      toast.innerText = this.dataset.copyEmail;
    }

    toast.classList.add("active");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("active"); }, 2500);

  });

}



// scroll reveal animations
const revealTargets = document.querySelectorAll(
  ".service-item, .timeline-item, .project-item, .skills-item, .stats-item"
);

const revealObserver = new IntersectionObserver(function (entries) {

  for (let i = 0; i < entries.length; i++) {
    if (entries[i].isIntersecting) {
      entries[i].target.classList.add("revealed");
      revealObserver.unobserve(entries[i].target);
    }
  }

}, { threshold: 0.1 });

for (let i = 0; i < revealTargets.length; i++) {
  revealTargets[i].classList.add("reveal");
  revealObserver.observe(revealTargets[i]);
}



// typing animation for sidebar title
const typingEl = document.querySelector("[data-typing]");

if (typingEl) {

  const roles = ["Software Developer", "Backend Engineer", "Data Engineer"];
  let roleIdx = 0;
  let charIdx = roles[0].length;
  let deleting = false;

  const typeLoop = function () {

    const current = roles[roleIdx];

    if (!deleting) {
      charIdx++;
      if (charIdx >= current.length) {
        charIdx = current.length;
        deleting = true;
        setTimeout(typeLoop, 2200);
        return;
      }
    } else {
      charIdx--;
      if (charIdx <= 0) {
        charIdx = 0;
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }

    typingEl.textContent = current.slice(0, charIdx);
    setTimeout(typeLoop, deleting ? 40 : 90);

  };

  setTimeout(typeLoop, 2200);

}



// spotlight hover glow on cards
const spotlightEls = document.querySelectorAll(
  ".service-item, .stats-item, .skill-group, .location-card"
);

for (let i = 0; i < spotlightEls.length; i++) {
  spotlightEls[i].classList.add("spotlight");
  spotlightEls[i].addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    this.style.setProperty("--mouse-x", (e.clientX - rect.left) + "px");
    this.style.setProperty("--mouse-y", (e.clientY - rect.top) + "px");
  });
}



// scroll progress bar
const progressBar = document.querySelector("[data-progress]");

if (progressBar) {
  window.addEventListener("scroll", function () {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    progressBar.style.width = (max > 0 ? (doc.scrollTop / max) * 100 : 0) + "%";
  }, { passive: true });
}



// light theme toggle
const themeToggle = document.querySelector("[data-theme-toggle]");

if (themeToggle) {

  const themeIcon = themeToggle.querySelector("ion-icon");

  const applyTheme = function (light) {
    document.documentElement.classList.toggle("light-theme", light);
    themeIcon.setAttribute("name", light ? "moon-outline" : "sunny-outline");
    localStorage.setItem("theme", light ? "light" : "dark");
  };

  applyTheme(localStorage.getItem("theme") === "light");

  themeToggle.addEventListener("click", function () {
    applyTheme(!document.documentElement.classList.contains("light-theme"));
  });

}



// github contribution calendar with per-day tooltips
const calEl = document.querySelector("[data-github-calendar]");

if (calEl) {

  const calUser = calEl.dataset.githubCalendar;
  const tip = document.createElement("div");
  tip.className = "contrib-tip";

  fetch("https://github-contributions-api.jogruber.de/v4/" + calUser + "?y=last")
    .then(function (res) { return res.json(); })
    .then(function (data) {

      const days = data.contributions || [];
      if (!days.length) throw new Error("empty");

      // group days into week columns (data starts on a Sunday)
      const weeks = [];
      for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

      // month labels row
      const monthsRow = document.createElement("div");
      monthsRow.className = "contrib-months";
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let prevMonth = -1;
      for (let w = 0; w < weeks.length; w++) {
        const m = new Date(weeks[w][0].date + "T00:00:00").getMonth();
        if (m !== prevMonth) {
          const lbl = document.createElement("span");
          lbl.className = "contrib-month";
          lbl.textContent = monthNames[m];
          lbl.style.left = (w * 14) + "px";
          monthsRow.appendChild(lbl);
          prevMonth = m;
        }
      }

      // day-of-week labels gutter (Mon/Wed/Fri)
      const gutter = document.createElement("div");
      gutter.className = "contrib-day-labels";
      const dayNames = ["", "Mon", "", "Wed", "", "Fri", ""];
      for (let r = 0; r < 7; r++) {
        const s = document.createElement("span");
        s.textContent = dayNames[r];
        gutter.appendChild(s);
      }

      // grid
      const grid = document.createElement("div");
      grid.className = "contrib-grid";
      for (let w = 0; w < weeks.length; w++) {
        const col = document.createElement("div");
        col.className = "contrib-week";
        for (let r = 0; r < weeks[w].length; r++) {
          const d = weeks[w][r];
          const cell = document.createElement("div");
          cell.className = "contrib-day";
          cell.setAttribute("data-level", d.level);
          cell.setAttribute("data-count", d.count);
          cell.setAttribute("data-date", d.date);
          col.appendChild(cell);
        }
        grid.appendChild(col);
      }

      const body = document.createElement("div");
      body.className = "contrib-body";
      body.appendChild(gutter);
      body.appendChild(grid);

      const totalCount = (data.total && data.total.lastYear) || days.reduce(function (a, c) { return a + c.count; }, 0);
      const total = document.createElement("p");
      total.className = "contrib-total";
      total.textContent = totalCount + " contributions in the last year";

      calEl.innerHTML = "";
      calEl.appendChild(total);
      calEl.appendChild(monthsRow);
      calEl.appendChild(body);
      calEl.appendChild(tip);

    })
    .catch(function () {
      calEl.innerHTML = '<p class="contrib-loading">Could not load contributions — <a href="https://github.com/' + calUser + '" target="_blank" rel="noopener noreferrer">view on GitHub</a></p>';
    });

  // tooltip hover
  calEl.addEventListener("mouseover", function (e) {
    const cell = e.target.closest(".contrib-day");
    if (!cell) return;
    const count = parseInt(cell.dataset.count, 10);
    const date = new Date(cell.dataset.date + "T00:00:00");
    tip.textContent = (count === 0 ? "No contributions" : count + " contribution" + (count === 1 ? "" : "s"))
      + " on " + date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    tip.style.opacity = "1";
    const cRect = calEl.getBoundingClientRect();
    const dRect = cell.getBoundingClientRect();
    const tipHalf = tip.offsetWidth / 2;
    const x = dRect.left - cRect.left + dRect.width / 2 + calEl.scrollLeft;
    tip.style.left = Math.max(tipHalf, Math.min(x, calEl.scrollWidth - tipHalf)) + "px";
    tip.style.top = (dRect.top - cRect.top - 6) + "px";
  });

  calEl.addEventListener("mouseout", function (e) {
    if (e.target.closest(".contrib-day")) tip.style.opacity = "0";
  });

}