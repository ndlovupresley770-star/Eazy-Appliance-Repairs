 const menuToggle = document.getElementById('menuToggle');
        const mobileDrawer = document.getElementById('mobileDrawer');
        const menuIcon = document.getElementById('menuIcon');

        menuToggle.addEventListener('click', () => {
            mobileDrawer.classList.toggle('open');
            if (mobileDrawer.classList.contains('open')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
        // Mobile Touch Toggle for 3D Brand Cards
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', function (e) {
      // Don't flip if user clicked the internal action button link
      if (e.target.classList.contains('brand-link-btn')) return;
      
      this.classList.toggle('is-flipped');
    });
  });
  // Diagnostic Data Dictionary
  const diagnosticData = {
    fridge: [
      { symptom: "Not cooling / Freezing issue", range: "R650 - R1,200", time: "45 - 60 Mins", status: "In Stock (Van)" },
      { symptom: "Water leaking underneath", range: "R450 - R850", time: "30 - 45 Mins", status: "In Stock (Van)" },
      { symptom: "Noisy or clicking compressor", range: "R750 - R1,500", time: "60 Mins", status: "In Stock (Van)" }
    ],
    washer: [
      { symptom: "Drum not spinning or turning", range: "R550 - R1,100", time: "45 Mins", status: "In Stock (Van)" },
      { symptom: "Water not draining out", range: "R450 - R750", time: "30 Mins", status: "In Stock (Van)" },
      { symptom: "Loud shaking during spin", range: "R600 - R1,250", time: "60 Mins", status: "In Stock (Van)" }
    ],
    dryer: [
      { symptom: "Tumbling but no heat", range: "R500 - R950", time: "40 Mins", status: "In Stock (Van)" },
      { symptom: "Drum failing to turn", range: "R450 - R800", time: "35 Mins", status: "In Stock (Van)" }
    ],
    oven: [
      { symptom: "Bake or grill element not heating", range: "R550 - R1,050", time: "45 Mins", status: "In Stock (Van)" },
      { symptom: "Tripping home power supply", range: "R600 - R1,200", time: "45 - 60 Mins", status: "In Stock (Van)" }
    ],
    dishwasher: [
      { symptom: "Standing water in bottom", range: "R450 - R850", time: "35 Mins", status: "In Stock (Van)" },
      { symptom: "Dishes coming out dirty", range: "R400 - R750", time: "30 Mins", status: "In Stock (Van)" }
    ]
  };

  let currentAppliance = 'fridge';

  function populateSymptoms(applianceKey) {
    const select = document.getElementById('symptomSelect');
    select.innerHTML = '';
    
    diagnosticData[applianceKey].forEach((item, index) => {
      const opt = document.createElement('option');
      opt.value = index;
      opt.textContent = item.symptom;
      select.appendChild(opt);
    });

    calculateEstimate();
  }

  function selectAppliance(applianceKey, btn) {
    currentAppliance = applianceKey;
    document.querySelectorAll('#appliancePills .select-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    populateSymptoms(applianceKey);
  }

  function calculateEstimate() {
    const selectIndex = document.getElementById('symptomSelect').value;
    const item = diagnosticData[currentAppliance][selectIndex] || diagnosticData[currentAppliance][0];

    document.getElementById('priceRangeDisplay').textContent = item.range;
    document.getElementById('timeEstimateDisplay').textContent = item.time;
    document.getElementById('partsDisplay').textContent = item.status;
  }
/* ==========================================================================
   FRIDGE INTRO DIAGNOSTIC SELECTOR SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const selectorBtns = document.querySelectorAll(".intro-quick-selector .selector-btn");
  const outputTitle = document.getElementById("outputTitle");
  const outputDesc = document.getElementById("outputDesc");

  const faultData = {
    "not-cooling": {
      title: "Cooling / Temperature Issue",
      desc: "Likely caused by a faulty thermostat, failed defrost timer, or low refrigerant level. Resolved on-site within 45 to 60 minutes."
    },
    "frost-build-up": {
      title: "Defrost System Failure",
      desc: "Usually stems from a burnt-out defrost heater element, blown thermal fuse, or faulty defrost sensor preventing automatic defrosting."
    },
    "clicking-noise": {
      title: "Compressor Startup Fault",
      desc: "Typically caused by a failing compressor start relay/capacitor or an overheating compressor motor overload switch."
    },
    "water-leak": {
      title: "Drainage / Water Leakage",
      desc: "Triggered by a blocked defrost drain tube, cracked water inlet valve, or damaged door gasket letting warm moist air inside."
    }
  };

  selectorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      selectorBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const faultKey = btn.getAttribute("data-fault");
      if (faultData[faultKey]) {
        outputTitle.innerText = faultData[faultKey].title;
        outputDesc.innerText = faultData[faultKey].desc;
      }
    });
  });
});
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    populateSymptoms('fridge');
  });
  document.addEventListener("DOMContentLoaded", function () {
  const interactiveCards = document.querySelectorAll(".interactive-card");

  interactiveCards.forEach((card) => {
    // 1. Make entire card clickable to navigate to the card's link target
    card.addEventListener("click", function (e) {
      // Avoid duplicate clicks if user clicks directly on the anchor tag
      const link = card.querySelector(".card-link");
      
      // Ripple Animation Effect on Click
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      
      card.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);

      // Navigate if clicked outside the link directly
      if (e.target !== link && !link.contains(e.target)) {
        setTimeout(() => {
          window.location.href = link.getAttribute("href");
        }, 150);
      }
    });

    // 2. Subtle 3D Tilt Effect on Mouse Movement
    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -4; // Subtle -4deg max tilt
      const rotateY = ((x - centerX) / centerX) * 4;  // Subtle 4deg max tilt
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    // Reset card position on mouse leave
    card.addEventListener("mouseleave", function () {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
});
/* ==========================================================================
   INTERACTIVE PROCESS CARDS SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const processCards = document.querySelectorAll(".process-card");

  processCards.forEach(card => {
    card.addEventListener("click", () => {
      processCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
    });
  });
});
/* ==========================================================================
   SERVICES INTRO INTERACTIVE ASSESSOR SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const selectorBtns = document.querySelectorAll(".services-intro-section .selector-btn");
  const outputTitle = document.getElementById("serviceOutputTitle");
  const outputDesc = document.getElementById("serviceOutputDesc");
  const ctaLink = document.getElementById("serviceCtaLink");

  const serviceData = {
    "fridge": {
      title: "Refrigeration Repairs",
      desc: "Fixes for non-cooling fridges, continuous clicking motors, water leaks, excess ice buildup, and on-site gas regassing (R600a/R134a).",
      link: "fridge-repairs.html",
      btnText: "View Fridge Repair Services"
    },
    "washer": {
      title: "Washing Machine Repairs",
      desc: "Resolutions for drainage faults, non-spinning drums, torn rubber door boots, noisy drum bearings, and electronic error codes.",
      link: "washing-machine-repairs.html",
      btnText: "View Washing Machine Services"
    },
    "dishwasher": {
      title: "Dishwasher Repairs",
      desc: "On-site repairs for standing water, cold wash cycles, failed inline heaters, spray arm blockages, and door latch error switches.",
      link: "dishwasher-repairs.html",
      btnText: "View Dishwasher Repair Services"
    },
    "dryer": {
      title: "Tumble Dryer Repairs",
      desc: "Servicing non-heating tumble dryers, snapped drive belts, faulty thermostats, drum roller replacements, and thermal cut-out fuses.",
      link: "tumble-dryer-repairs.html",
      btnText: "View Tumble Dryer Services"
    }
  };

  selectorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      selectorBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const key = btn.getAttribute("data-service");
      if (serviceData[key]) {
        outputTitle.innerText = serviceData[key].title;
        outputDesc.innerText = serviceData[key].desc;
        ctaLink.setAttribute("href", serviceData[key].link);
        ctaLink.innerHTML = `<i class="fas fa-arrow-right"></i> ${serviceData[key].btnText}`;
      }
    });
  });
});
/* ==========================================================================
   WASHING MACHINE INTRO DIAGNOSTIC SELECTOR
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const selectorBtns = document.querySelectorAll(".selector-btn");
  const outputTitle = document.getElementById("outputTitle");
  const outputDesc = document.getElementById("outputDesc");

  const faultData = {
    drainage: {
      title: "Water Drainage Issue",
      desc: "Likely caused by a clogged pump filter, drain hose obstruction, or worn impeller motor. Resolved on-site within 45 minutes."
    },
    spinning: {
      title: "Drum Rotation Failure",
      desc: "Usually indicates a snapped drive belt, worn motor carbon brushes, or lid interlock switch failure. Stocked replacement parts available."
    },
    leaking: {
      title: "Active Water Leak",
      desc: "Typically stems from a torn front door gasket, cracked water inlet valve, or loose internal hose clamp."
    },
    noise: {
      title: "Excessive Vibration & Noise",
      desc: "Caused by worn drum bearings, failed shock absorbers, or broken tub suspension springs."
    }
  };

  selectorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle active states
      selectorBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Update content dynamically
      const faultKey = btn.getAttribute("data-fault");
      if (faultData[faultKey]) {
        outputTitle.innerText = faultData[faultKey].title;
        outputDesc.innerText = faultData[faultKey].desc;
      }
    });
  });
});
/* ==========================================================================
   SYMPTOM CARD INTERACTION SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const symptomCards = document.querySelectorAll(".symptom-card");

  symptomCards.forEach(card => {
    card.addEventListener("click", (e) => {
      // Prevent default link behavior if clicking the link directly
      if (e.target.closest('.card-link')) {
        return;
      }
      
      const title = card.querySelector("h3").innerText;
      
      // Optional: Auto-select fault in booking form if present on the page
      const faultSelect = document.getElementById("faultType");
      if (faultSelect) {
        // Find matching option or default to other
        for (let option of faultSelect.options) {
          if (title.toLowerCase().includes(option.text.toLowerCase().split(' ')[0])) {
            faultSelect.value = option.value;
            break;
          }
        }
      }

      // Smooth scroll to booking section
      const bookingSection = document.getElementById("booking");
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
/* ==========================================================================
   BRAND COMPATIBILITY FILTER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const brandTabs = document.querySelectorAll(".brand-tab");
  const brandCards = document.querySelectorAll(".brand-card");

  brandTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Toggle Active Tab State
      brandTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const selectedBrand = tab.getAttribute("data-brand");

      // Filter Brand Cards
      brandCards.forEach(card => {
        const cardBrand = card.getAttribute("data-brand-item");

        if (selectedBrand === "all" || cardBrand === selectedBrand) {
          card.style.display = "flex";
          if (selectedBrand !== "all") {
            card.classList.add("highlight");
          } else {
            card.classList.remove("highlight");
          }
        } else {
          card.style.display = "none";
          card.classList.remove("highlight");
        }
      });
    });
  });
});
/* ==========================================================================
   COMPONENT MATRIX CLICK INTERACTION SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const componentCards = document.querySelectorAll(".component-card");

  componentCards.forEach(card => {
    card.addEventListener("click", () => {
      const bookingSection = document.getElementById("booking");
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
/* ==========================================================================
   SUBURB DISPATCH FILTER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const coverageCards = document.querySelectorAll(".coverage-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Update Active Button
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      // Filter Cards
      coverageCards.forEach(card => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
/* ==========================================================================
   TUMBLE DRYER SYMPTOM CARD INTERACTION SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const symptomCards = document.querySelectorAll("#symptoms .symptom-card");

  symptomCards.forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest('.card-link')) return;

      const title = card.querySelector("h3").innerText;
      const faultSelect = document.getElementById("faultType");

      if (faultSelect) {
        for (let option of faultSelect.options) {
          if (title.toLowerCase().includes(option.text.toLowerCase().split(' ')[0])) {
            faultSelect.value = option.value;
            break;
          }
        }
      }

      const bookingSection = document.getElementById("booking");
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
/* ==========================================================================
   TUMBLE DRYER BRAND FILTER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const brandTabs = document.querySelectorAll(".brand-tab");
  const brandCards = document.querySelectorAll(".brand-card");

  brandTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      brandTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const selectedBrand = tab.getAttribute("data-brand");

      brandCards.forEach(card => {
        const cardBrand = card.getAttribute("data-brand-item");

        if (selectedBrand === "all" || cardBrand === selectedBrand) {
          card.style.display = "flex";
          if (selectedBrand !== "all") {
            card.classList.add("highlight");
          } else {
            card.classList.remove("highlight");
          }
        } else {
          card.style.display = "none";
          card.classList.remove("highlight");
        }
      });
    });
  });
});
/* ==========================================================================
   TUMBLE DRYER SUBURB DISPATCH FILTER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".coverage-section .filter-btn");
  const coverageCards = document.querySelectorAll(".coverage-section .coverage-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      coverageCards.forEach(card => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
/* ==========================================================================
   TUMBLE DRYER FAQ ACCORDION SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other active items
      faqItems.forEach(i => i.classList.remove("active"));

      // Toggle current item
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});
/* ==========================================================================
   DISHWASHER INTRO DIAGNOSTIC SELECTOR SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const selectorBtns = document.querySelectorAll(".selector-btn");
  const outputTitle = document.getElementById("outputTitle");
  const outputDesc = document.getElementById("outputDesc");

  const faultData = {
    "not-draining": {
      title: "Water Drainage Issue",
      desc: "Likely caused by a clogged drain pump impeller, blocked drain hose, or failed check valve. Resolved on-site within 45 minutes."
    },
    "not-cleaning": {
      title: "Poor Wash Performance",
      desc: "Usually stems from blocked spray arm nozzles, a faulty circulation pump, or a burnt-out inline flow heater element."
    },
    "leaking": {
      title: "Water Leakage Issue",
      desc: "Typically caused by degraded door seals, a cracked sump gasket, or a malfunctioning water inlet valve assembly."
    },
    "error-code": {
      title: "System Fault / Error Code",
      desc: "Triggered by activated anti-flood safety switches, sensor calibration errors, or electronic control board relays."
    }
  };

  selectorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle active states
      selectorBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Update content dynamically
      const faultKey = btn.getAttribute("data-fault");
      if (faultData[faultKey]) {
        outputTitle.innerText = faultData[faultKey].title;
        outputDesc.innerText = faultData[faultKey].desc;
      }
    });
  });
});
/* ==========================================================================
   DISHWASHER SYMPTOM CARD INTERACTION SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const symptomCards = document.querySelectorAll("#symptoms .symptom-card");

  symptomCards.forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest('.card-link')) return;

      const title = card.querySelector("h3").innerText;
      const faultSelect = document.getElementById("faultType");

      if (faultSelect) {
        for (let option of faultSelect.options) {
          if (title.toLowerCase().includes(option.text.toLowerCase().split(' ')[0])) {
            faultSelect.value = option.value;
            break;
          }
        }
      }

      const bookingSection = document.getElementById("booking");
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
/* ==========================================================================
   DISHWASHER BRAND FILTER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const brandTabs = document.querySelectorAll(".brand-tab");
  const brandCards = document.querySelectorAll(".brand-card");

  brandTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      brandTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const selectedBrand = tab.getAttribute("data-brand");

      brandCards.forEach(card => {
        const cardBrand = card.getAttribute("data-brand-item");

        if (selectedBrand === "all" || cardBrand === selectedBrand) {
          card.style.display = "flex";
          if (selectedBrand !== "all") {
            card.classList.add("highlight");
          } else {
            card.classList.remove("highlight");
          }
        } else {
          card.style.display = "none";
          card.classList.remove("highlight");
        }
      });
    });
  });
});
/* ==========================================================================
   DISHWASHER COMPONENT MATRIX CLICK INTERACTION SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const componentCards = document.querySelectorAll(".components-matrix-section .component-card");

  componentCards.forEach(card => {
    card.addEventListener("click", () => {
      const bookingSection = document.getElementById("booking");
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
/* ==========================================================================
   DISHWASHER PROCESS CARD INTERACTION SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const processCards = document.querySelectorAll(".repair-process-section .process-card");

  processCards.forEach(card => {
    card.addEventListener("click", () => {
      processCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
    });
  });
});
/* ==========================================================================
   DISHWASHER SUBURB DISPATCH FILTER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".coverage-section .filter-btn");
  const coverageCards = document.querySelectorAll(".coverage-section .coverage-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      coverageCards.forEach(card => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
