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
/* ==========================================================================
   BRANDS QUICK ASSESSOR SCRIPT (7 BRANDS)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const selectorBtns = document.querySelectorAll(".brands-intro-section .selector-btn");
  const outputTitle = document.getElementById("brandOutputTitle");
  const outputDesc = document.getElementById("brandOutputDesc");

  const brandData = {
    "defy": {
      title: "Defy Factory OEM Support",
      desc: "Full inventory of genuine Defy compressors, heating elements, electronic control boards, and drain pumps carried directly in our Gauteng mobile vans."
    },
    "samsung": {
      title: "Samsung Smart & Inverter Units",
      desc: "Specialized equipment for Digital Inverter compressors, Twin Cooling Plus sensor calibration, and EcoBubble drum motor repairs."
    },
    "lg": {
      title: "LG Direct Drive & Linear Systems",
      desc: "On-site diagnostic testing for Direct Drive washer motors, Inverter Linear fridge compressors, and main electronic PCB replacements."
    },
    "whirlpool": {
      title: "Whirlpool 6th Sense Appliances",
      desc: "Expert servicing for 6th Sense thermal sensor arrays, heavy-duty drive belts, intake valves, and electronic control modules."
    },
    "bosch": {
      title: "Bosch EcoSilence & German Engineering",
      desc: "Precision repair tools for EcoSilence Drive motors, inline flow heaters, door lock interlocks, and Series 4/6/8 main boards."
    },
    "speedqueen": {
      title: "Speed Queen Commercial & Domestic Laundry",
      desc: "Heavy-duty replacement belts, industrial drum bearings, mechanical timer switches, and high-performance motor assemblies."
    },
    "smeg": {
      title: "Smeg Designer & Premium Appliances",
      desc: "Factory-certified repair techniques for Smeg retro fridges, integrated dishwashers, oven elements, and electronic thermostats."
    }
  };

  selectorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      selectorBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const brandKey = btn.getAttribute("data-brand");
      if (brandData[brandKey]) {
        outputTitle.innerText = brandData[brandKey].title;
        outputDesc.innerText = brandData[brandKey].desc;
      }
    });
  });
});
/* ==========================================================================
   GAUTENG COVERAGE & BRAND AVAILABILITY CHECKER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const checkBtn = document.getElementById("checkCoverageBtn");
  const suburbSelect = document.getElementById("checkerSuburb");
  const brandSelect = document.getElementById("checkerBrand");
  const resultBox = document.getElementById("checkerResult");
  const statusText = document.getElementById("resultStatusText");
  const detailsText = document.getElementById("resultDetailsText");

  if (!checkBtn) return;

  checkBtn.addEventListener("click", () => {
    const suburb = suburbSelect.value;
    const brand = brandSelect.value;

    if (!suburb || !brand) {
      alert("Please select both your suburb and appliance brand to check availability.");
      return;
    }

    const suburbNames = {
      "sandton": "Sandton / Bryanston",
      "randburg": "Randburg / Northcliff",
      "midrand": "Midrand / Kyalami",
      "rosebank": "Rosebank / Parkhurst",
      "other": "Johannesburg"
    };

    const brandNames = {
      "defy": "Defy",
      "samsung": "Samsung",
      "lg": "LG",
      "whirlpool": "Whirlpool",
      "bosch": "Bosch",
      "speedqueen": "Speed Queen",
      "smeg": "Smeg"
    };

    // Update Result Box Text dynamically
    statusText.innerText = `Mobile Van Ready in ${suburbNames[suburb]}`;
    detailsText.innerHTML = `We have active units carrying genuine <strong>${brandNames[brand]}</strong> spare parts in your area today. Book now for priority same-day dispatch.`;

    // Show result box with smooth transition
    resultBox.style.display = "block";
  });
});
/* ==========================================================================
   ERROR CODE LOOKUP FILTER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const brandSelect = document.getElementById("errorBrandSelect");
  const codeInput = document.getElementById("errorCodeInput");
  const tableRows = document.querySelectorAll("#errorCodesTable tbody tr");
  const noErrorFound = document.getElementById("noErrorFound");

  if (!brandSelect || !codeInput) return;

  function filterErrorCodes() {
    const selectedBrand = brandSelect.value;
    const query = codeInput.value.toLowerCase().trim();
    let visibleRows = 0;

    tableRows.forEach(row => {
      const rowBrand = row.getAttribute("data-brand");
      const rowCodes = row.getAttribute("data-code").toLowerCase();
      const rowText = row.innerText.toLowerCase();

      const matchesBrand = (selectedBrand === "all") || (rowBrand === selectedBrand);
      const matchesSearch = (query === "") || rowCodes.includes(query) || rowText.includes(query);

      if (matchesBrand && matchesSearch) {
        row.style.display = "";
        visibleRows++;
      } else {
        row.style.display = "none";
      }
    });

    // Toggle No Results Notice
    if (visibleRows === 0) {
      noErrorFound.style.display = "flex";
    } else {
      noErrorFound.style.display = "none";
    }
  }

  brandSelect.addEventListener("change", filterErrorCodes);
  codeInput.addEventListener("input", filterErrorCodes);
});
/* ==========================================================================
   SAMSUNG MODEL ASSESSOR SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const selectorBtns = document.querySelectorAll(".samsung-intro-section .selector-btn");
  const outputTitle = document.getElementById("samsungOutputTitle");
  const outputDesc = document.getElementById("samsungOutputDesc");

  const samsungData = {
    "fridge": {
      title: "Digital Inverter & Twin Cooling Fridges",
      desc: "We carry genuine Samsung R600a inverter compressors, main PCB control boards, defrost sensors, and evaporator fan motors directly in our Gauteng mobile vans."
    },
    "washer": {
      title: "EcoBubble & AddWash Washing Machines",
      desc: "Specialized tools and OEM spare parts for Samsung drain pumps, EcoBubble generator units, door lock interlocks, and drum drive belt replacements."
    },
    "dryer": {
      title: "Heat Pump & Sensor Dry Tumble Dryers",
      desc: "On-site testing and replacements for Samsung dryer heating elements, thermal fuses, drive belts, and moisture sensor arrays."
    },
    "dishwasher": {
      title: "WaterWall & StormWash Dishwashers",
      desc: "Stocked with original Samsung water inlet valves, circulation pump assemblies, spray arm sensors, and leak protection switches."
    }
  };

  selectorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      selectorBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const key = btn.getAttribute("data-samsung");
      if (samsungData[key]) {
        outputTitle.innerText = samsungData[key].title;
        outputDesc.innerText = samsungData[key].desc;
      }
    });
  });
});
/* ==========================================================================
   SAMSUNG VERTICAL FAULT SELECTOR SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const faultSelectors = document.querySelectorAll(".interactive-fault-selector");

  faultSelectors.forEach(selector => {
    const buttons = selector.querySelectorAll(".fault-btn");
    const panels = selector.querySelectorAll(".fault-info-panel");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");

        // Toggle button active status
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Toggle information panel
        panels.forEach(panel => {
          if (panel.id === targetId) {
            panel.classList.add("active");
          } else {
            panel.classList.remove("active");
          }
        });
      });
    });
  });
});
/* ==========================================================================
   SAMSUNG ERROR CODE LOOKUP FILTER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("samsungApplianceCategory");
  const codeInput = document.getElementById("samsungErrorCodeInput");
  const tableRows = document.querySelectorAll("#samsungErrorTable tbody tr");
  const noErrorFound = document.getElementById("samsungNoErrorFound");

  if (!categorySelect || !codeInput) return;

  function filterErrorCodes() {
    const selectedCategory = categorySelect.value;
    const query = codeInput.value.toLowerCase().trim();
    let visibleRows = 0;

    tableRows.forEach(row => {
      const rowCategory = row.getAttribute("data-category");
      const rowCodes = row.getAttribute("data-code").toLowerCase();
      const rowText = row.innerText.toLowerCase();

      const matchesCategory = (selectedCategory === "all") || (rowCategory === selectedCategory);
      const matchesSearch = (query === "") || rowCodes.includes(query) || rowText.includes(query);

      if (matchesCategory && matchesSearch) {
        row.style.display = "";
        visibleRows++;
      } else {
        row.style.display = "none";
      }
    });

    if (visibleRows === 0) {
      noErrorFound.style.display = "flex";
    } else {
      noErrorFound.style.display = "none";
    }
  }

  categorySelect.addEventListener("change", filterErrorCodes);
  codeInput.addEventListener("input", filterErrorCodes);
});
/* ==========================================================================
   SAMSUNG SUBURB & VAN AVAILABILITY CHECKER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const checkBtn = document.getElementById("checkSamsungVanBtn");
  const suburbSelect = document.getElementById("samsungSuburbSelect");
  const typeSelect = document.getElementById("samsungApplianceType");
  const resultBox = document.getElementById("samsungVanResult");
  const statusText = document.getElementById("samsungResultStatus");
  const detailsText = document.getElementById("samsungResultDetails");

  if (!checkBtn) return;

  checkBtn.addEventListener("click", () => {
    const suburb = suburbSelect.value;
    const type = typeSelect.value;

    if (!suburb || !type) {
      alert("Please select both your suburb and Samsung appliance type.");
      return;
    }

    const suburbLabels = {
      "sandton": "Sandton / Fourways",
      "randburg": "Randburg / Northcliff",
      "midrand": "Midrand / Kyalami",
      "rosebank": "Rosebank / Parkhurst",
      "other": "Johannesburg"
    };

    const typeLabels = {
      "fridge": "Samsung Refrigerator",
      "washer": "Samsung EcoBubble Washer",
      "dryer": "Samsung Heat Pump Dryer",
      "dishwasher": "Samsung Dishwasher"
    };

    statusText.innerText = `Samsung Mobile Van Ready in ${suburbLabels[suburb]}`;
    detailsText.innerHTML = `Mobile unit carrying original spare parts for your <strong>${typeLabels[type]}</strong> is active in your area today. Book now for priority same-day dispatch.`;

    resultBox.style.display = "block";
  });
});
/* ==========================================================================
   LG MODEL ASSESSOR SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const selectorBtns = document.querySelectorAll(".lg-intro-section .selector-btn");
  const outputTitle = document.getElementById("lgOutputTitle");
  const outputDesc = document.getElementById("lgOutputDesc");

  const lgData = {
    "fridge": {
      title: "Inverter Linear & InstaView Fridges",
      desc: "Full inventory of genuine LG Inverter Linear compressors, main PCB boards, defrost sensors, and door-in-door seal assemblies carried directly in our Gauteng mobile vans."
    },
    "washer": {
      title: "Direct Drive & TurboWash Washing Machines",
      desc: "On-site testing for LG Direct Drive hall sensors, drain pump motors, rubber tub boot seals, and electronic control board replacements."
    },
    "dryer": {
      title: "Dual Inverter Heat Pump Tumble Dryers",
      desc: "Specialized diagnostics for LG heat pump compressors, thermal cut-offs, drive belts, and sensor dry moisture sensors."
    },
    "dishwasher": {
      title: "QuadWash & TrueSteam Dishwashers",
      desc: "Stocked with factory LG circulation pumps, water inlet valves, microswitch leak sensors, and QuadWash spray arm assemblies."
    }
  };

  selectorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      selectorBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const key = btn.getAttribute("data-lg");
      if (lgData[key]) {
        outputTitle.innerText = lgData[key].title;
        outputDesc.innerText = lgData[key].desc;
      }
    });
  });
});
/* ==========================================================================
   LG VERTICAL FAULT SELECTOR SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const faultSelectors = document.querySelectorAll(".interactive-fault-selector");

  faultSelectors.forEach(selector => {
    const buttons = selector.querySelectorAll(".fault-btn");
    const panels = selector.querySelectorAll(".fault-info-panel");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");

        // Toggle button active status
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Toggle information panel
        panels.forEach(panel => {
          if (panel.id === targetId) {
            panel.classList.add("active");
          } else {
            panel.classList.remove("active");
          }
        });
      });
    });
  });
});
/* ==========================================================================
   LG ERROR CODE LOOKUP FILTER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("lgApplianceCategory");
  const codeInput = document.getElementById("lgErrorCodeInput");
  const tableRows = document.querySelectorAll("#lgErrorTable tbody tr");
  const noErrorFound = document.getElementById("lgNoErrorFound");

  if (!categorySelect || !codeInput) return;

  function filterErrorCodes() {
    const selectedCategory = categorySelect.value;
    const query = codeInput.value.toLowerCase().trim();
    let visibleRows = 0;

    tableRows.forEach(row => {
      const rowCategory = row.getAttribute("data-category");
      const rowCodes = row.getAttribute("data-code").toLowerCase();
      const rowText = row.innerText.toLowerCase();

      const matchesCategory = (selectedCategory === "all") || (rowCategory === selectedCategory);
      const matchesSearch = (query === "") || rowCodes.includes(query) || rowText.includes(query);

      if (matchesCategory && matchesSearch) {
        row.style.display = "";
        visibleRows++;
      } else {
        row.style.display = "none";
      }
    });

    if (visibleRows === 0) {
      noErrorFound.style.display = "flex";
    } else {
      noErrorFound.style.display = "none";
    }
  }

  categorySelect.addEventListener("change", filterErrorCodes);
  codeInput.addEventListener("input", filterErrorCodes);
});
/* ==========================================================================
   LG SUBURB & VAN AVAILABILITY CHECKER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const checkBtn = document.getElementById("checkLgVanBtn");
  const suburbSelect = document.getElementById("lgSuburbSelect");
  const typeSelect = document.getElementById("lgApplianceTypeSelect");
  const resultBox = document.getElementById("lgVanResult");
  const statusText = document.getElementById("lgResultStatus");
  const detailsText = document.getElementById("lgResultDetails");

  if (!checkBtn) return;

  checkBtn.addEventListener("click", () => {
    const suburb = suburbSelect.value;
    const type = typeSelect.value;

    if (!suburb || !type) {
      alert("Please select both your suburb and LG appliance type.");
      return;
    }

    const suburbLabels = {
      "sandton": "Sandton / Fourways",
      "randburg": "Randburg / Northcliff",
      "midrand": "Midrand / Kyalami",
      "rosebank": "Rosebank / Parkhurst",
      "other": "Johannesburg"
    };

    const typeLabels = {
      "fridge": "LG Inverter Linear Refrigerator",
      "washer": "LG Direct Drive Washer",
      "dryer": "LG Dual Inverter Dryer",
      "dishwasher": "LG QuadWash Dishwasher"
    };

    statusText.innerText = `LG Mobile Van Ready in ${suburbLabels[suburb]}`;
    detailsText.innerHTML = `Mobile unit carrying original spare parts for your <strong>${typeLabels[type]}</strong> is active in your area today. Book now for priority same-day dispatch.`;

    resultBox.style.display = "block";
  });
});
/* ==========================================================================
   WHIRLPOOL MODEL ASSESSOR SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const selectorBtns = document.querySelectorAll(".whirlpool-intro-section .selector-btn");
  const outputTitle = document.getElementById("whirlpoolOutputTitle");
  const outputDesc = document.getElementById("whirlpoolOutputDesc");

  const whirlpoolData = {
    "fridge": {
      title: "6th Sense FreshControl Refrigerators",
      desc: "Full inventory of genuine Whirlpool 6th Sense temperature thermistors, defrost heaters, start relays, and main control boards carried directly in our Gauteng mobile vans."
    },
    "washer": {
      title: "FreshCare+ & Zen Direct Drive Washers",
      desc: "On-site diagnostic testing for Whirlpool tachometer sensors, drain pump motors, door interlock switches, and electronic control board replacements."
    },
    "dryer": {
      title: "6th Sense Heat Pump & Condenser Dryers",
      desc: "Specialized servicing for Whirlpool heat pump compressors, thermal fuses, drive belts, and moisture sensor arrays."
    },
    "dishwasher": {
      title: "PowerClean Pro & 6th Sense Dishwashers",
      desc: "Stocked with factory Whirlpool circulation pumps, water inlet valves, microswitch leak sensors, and PowerClean spray arm assemblies."
    }
  };

  selectorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      selectorBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const key = btn.getAttribute("data-whirlpool");
      if (whirlpoolData[key]) {
        outputTitle.innerText = whirlpoolData[key].title;
        outputDesc.innerText = whirlpoolData[key].desc;
      }
    });
  });
});
/* ==========================================================================
   WHIRLPOOL VERTICAL FAULT SELECTOR SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const faultSelectors = document.querySelectorAll(".interactive-fault-selector");

  faultSelectors.forEach(selector => {
    const buttons = selector.querySelectorAll(".fault-btn");
    const panels = selector.querySelectorAll(".fault-info-panel");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");

        // Toggle button active status
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Toggle information panel
        panels.forEach(panel => {
          if (panel.id === targetId) {
            panel.classList.add("active");
          } else {
            panel.classList.remove("active");
          }
        });
      });
    });
  });
});
/* ==========================================================================
   WHIRLPOOL ERROR CODE LOOKUP FILTER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("whirlpoolApplianceCategory");
  const codeInput = document.getElementById("whirlpoolErrorCodeInput");
  const tableRows = document.querySelectorAll("#whirlpoolErrorTable tbody tr");
  const noErrorFound = document.getElementById("whirlpoolNoErrorFound");

  if (!categorySelect || !codeInput) return;

  function filterErrorCodes() {
    const selectedCategory = categorySelect.value;
    const query = codeInput.value.toLowerCase().trim();
    let visibleRows = 0;

    tableRows.forEach(row => {
      const rowCategory = row.getAttribute("data-category");
      const rowCodes = row.getAttribute("data-code").toLowerCase();
      const rowText = row.innerText.toLowerCase();

      const matchesCategory = (selectedCategory === "all") || (rowCategory === selectedCategory);
      const matchesSearch = (query === "") || rowCodes.includes(query) || rowText.includes(query);

      if (matchesCategory && matchesSearch) {
        row.style.display = "";
        visibleRows++;
      } else {
        row.style.display = "none";
      }
    });

    if (visibleRows === 0) {
      noErrorFound.style.display = "flex";
    } else {
      noErrorFound.style.display = "none";
    }
  }

  categorySelect.addEventListener("change", filterErrorCodes);
  codeInput.addEventListener("input", filterErrorCodes);
});
/* ==========================================================================
   WHIRLPOOL SUBURB & VAN AVAILABILITY CHECKER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const checkBtn = document.getElementById("checkWhirlpoolVanBtn");
  const suburbSelect = document.getElementById("whirlpoolSuburbSelect");
  const typeSelect = document.getElementById("whirlpoolApplianceTypeSelect");
  const resultBox = document.getElementById("whirlpoolVanResult");
  const statusText = document.getElementById("whirlpoolResultStatus");
  const detailsText = document.getElementById("whirlpoolResultDetails");

  if (!checkBtn) return;

  checkBtn.addEventListener("click", () => {
    const suburb = suburbSelect.value;
    const type = typeSelect.value;

    if (!suburb || !type) {
      alert("Please select both your suburb and Whirlpool appliance type.");
      return;
    }

    const suburbLabels = {
      "sandton": "Sandton / Fourways",
      "randburg": "Randburg / Northcliff",
      "midrand": "Midrand / Kyalami",
      "rosebank": "Rosebank / Parkhurst",
      "other": "Johannesburg"
    };

    const typeLabels = {
      "fridge": "Whirlpool 6th Sense Refrigerator",
      "washer": "Whirlpool FreshCare+ Washer",
      "dryer": "Whirlpool 6th Sense Heat Pump Dryer",
      "dishwasher": "Whirlpool PowerClean Dishwasher"
    };

    statusText.innerText = `Whirlpool Mobile Van Ready in ${suburbLabels[suburb]}`;
    detailsText.innerHTML = `Mobile unit carrying original spare parts for your <strong>${typeLabels[type]}</strong> is active in your area today. Book now for priority same-day dispatch.`;

    resultBox.style.display = "block";
  });
});
/* ==========================================================================
   BOSCH MODEL ASSESSOR SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const selectorBtns = document.querySelectorAll(".bosch-intro-section .selector-btn");
  const outputTitle = document.getElementById("boschOutputTitle");
  const outputDesc = document.getElementById("boschOutputDesc");

  const boschData = {
    "fridge": {
      title: "VitaFresh & NoFrost Fridges (Series 4/6/8)",
      desc: "Full inventory of original Bosch NTC temperature sensors, defrost heating elements, inverter compressor relays, and electronic control modules carried directly in our mobile units."
    },
    "washer": {
      title: "EcoSilence Drive & i-DOS Washers",
      desc: "On-site testing for Bosch EcoSilence brushless motor inverter boards, drain pump motors, door interlock latches, and AquaStop solenoids."
    },
    "dryer": {
      title: "SelfCleaning Condenser Heat Pump Dryers",
      desc: "Specialized diagnostics for Bosch heat pump compressors, drive belts, moisture sensors, and thermal cut-off fuses."
    },
    "dishwasher": {
      title: "PerfectDry Zeolith & AquaStop Dishwashers",
      desc: "Stocked with original Bosch heat pump circulation assemblies, flow meters, AquaStop base float switches, and spray arm mechanisms."
    }
  };

  selectorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      selectorBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const key = btn.getAttribute("data-bosch");
      if (boschData[key]) {
        outputTitle.innerText = boschData[key].title;
        outputDesc.innerText = boschData[key].desc;
      }
    });
  });
});
/* ==========================================================================
   BOSCH VERTICAL FAULT SELECTOR SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const faultSelectors = document.querySelectorAll(".interactive-fault-selector");

  faultSelectors.forEach(selector => {
    const buttons = selector.querySelectorAll(".fault-btn");
    const panels = selector.querySelectorAll(".fault-info-panel");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");

        // Toggle button active status
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Toggle information panel
        panels.forEach(panel => {
          if (panel.id === targetId) {
            panel.classList.add("active");
          } else {
            panel.classList.remove("active");
          }
        });
      });
    });
  });
});
/* ==========================================================================
   BOSCH ERROR CODE LOOKUP FILTER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("boschApplianceCategory");
  const codeInput = document.getElementById("boschErrorCodeInput");
  const tableRows = document.querySelectorAll("#boschErrorTable tbody tr");
  const noErrorFound = document.getElementById("boschNoErrorFound");

  if (!categorySelect || !codeInput) return;

  function filterErrorCodes() {
    const selectedCategory = categorySelect.value;
    const query = codeInput.value.toLowerCase().trim();
    let visibleRows = 0;

    tableRows.forEach(row => {
      const rowCategory = row.getAttribute("data-category");
      const rowCodes = row.getAttribute("data-code").toLowerCase();
      const rowText = row.innerText.toLowerCase();

      const matchesCategory = (selectedCategory === "all") || (rowCategory === selectedCategory);
      const matchesSearch = (query === "") || rowCodes.includes(query) || rowText.includes(query);

      if (matchesCategory && matchesSearch) {
        row.style.display = "";
        visibleRows++;
      } else {
        row.style.display = "none";
      }
    });

    if (visibleRows === 0) {
      noErrorFound.style.display = "flex";
    } else {
      noErrorFound.style.display = "none";
    }
  }

  categorySelect.addEventListener("change", filterErrorCodes);
  codeInput.addEventListener("input", filterErrorCodes);
});
/* ==========================================================================
   BOSCH SUBURB & VAN AVAILABILITY CHECKER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const checkBtn = document.getElementById("checkBoschVanBtn");
  const suburbSelect = document.getElementById("boschSuburbSelect");
  const typeSelect = document.getElementById("boschApplianceTypeSelect");
  const resultBox = document.getElementById("boschVanResult");
  const statusText = document.getElementById("boschResultStatus");
  const detailsText = document.getElementById("boschResultDetails");

  if (!checkBtn) return;

  checkBtn.addEventListener("click", () => {
    const suburb = suburbSelect.value;
    const type = typeSelect.value;

    if (!suburb || !type) {
      alert("Please select both your suburb and Bosch appliance type.");
      return;
    }

    const suburbLabels = {
      "sandton": "Sandton / Fourways",
      "randburg": "Randburg / Northcliff",
      "midrand": "Midrand / Kyalami",
      "rosebank": "Rosebank / Parkhurst",
      "other": "Johannesburg"
    };

    const typeLabels = {
      "fridge": "Bosch VitaFresh Refrigerator",
      "washer": "Bosch EcoSilence Washing Machine",
      "dryer": "Bosch Heat Pump Tumble Dryer",
      "dishwasher": "Bosch PerfectDry Dishwasher"
    };

    statusText.innerText = `Bosch Mobile Van Ready in ${suburbLabels[suburb]}`;
    detailsText.innerHTML = `Mobile unit carrying original spare parts for your <strong>${typeLabels[type]}</strong> is active in your area today. Book now for priority same-day dispatch.`;

    resultBox.style.display = "block";
  });
});
/* ==========================================================================
   SPEED QUEEN MODEL ASSESSOR SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const selectorBtns = document.querySelectorAll(".speedqueen-intro-section .selector-btn");
  const outputTitle = document.getElementById("sqOutputTitle");
  const outputDesc = document.getElementById("sqOutputDesc");

  const sqData = {
    "toploader": {
      title: "Classic Clean & Perfect Wash Top Loaders (TC5/TR5/TR7)",
      desc: "Stocked inventory of original Speed Queen steel-gear transmission assemblies, drive belts, water inlet valves, drain pumps, and lid lock switches carried directly in our mobile units."
    },
    "frontloader": {
      title: "Dynamic Balance Commercial Front Loaders (FF7)",
      desc: "On-site diagnostic testing for Speed Queen heavy-duty tub bearings, outer tub spring suspension, inverter motor control boards, and door boot seals."
    },
    "dryer": {
      title: "Commercial-Grade Electric & Gas Dryers (ADE/ADG)",
      desc: "Specialized servicing for Speed Queen commercial heating elements, thermal cut-off fuses, heavy-duty drive belts, blower wheels, and moisture sensors."
    },
    "stacked": {
      title: "Stacked Commercial Washer-Dryer Combination Units",
      desc: "Comprehensive multi-motor diagnostics for stacked dual-control microprocessor boards, independent drive motors, and dual exhaust blower assemblies."
    }
  };

  selectorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      selectorBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const key = btn.getAttribute("data-sq");
      if (sqData[key]) {
        outputTitle.innerText = sqData[key].title;
        outputDesc.innerText = sqData[key].desc;
      }
    });
  });
});
/* ==========================================================================
   SPEED QUEEN ERROR CODE LOOKUP FILTER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("sqApplianceCategory");
  const codeInput = document.getElementById("sqErrorCodeInput");
  const tableRows = document.querySelectorAll("#sqErrorTable tbody tr");
  const noErrorFound = document.getElementById("sqNoErrorFound");

  if (!categorySelect || !codeInput) return;

  function filterErrorCodes() {
    const selectedCategory = categorySelect.value;
    const query = codeInput.value.toLowerCase().trim();
    let visibleRows = 0;

    tableRows.forEach(row => {
      const rowCategory = row.getAttribute("data-category");
      const rowCodes = row.getAttribute("data-code").toLowerCase();
      const rowText = row.innerText.toLowerCase();

      const matchesCategory = (selectedCategory === "all") || (rowCategory === selectedCategory);
      const matchesSearch = (query === "") || rowCodes.includes(query) || rowText.includes(query);

      if (matchesCategory && matchesSearch) {
        row.style.display = "";
        visibleRows++;
      } else {
        row.style.display = "none";
      }
    });

    if (visibleRows === 0) {
      noErrorFound.style.display = "flex";
    } else {
      noErrorFound.style.display = "none";
    }
  }

  categorySelect.addEventListener("change", filterErrorCodes);
  codeInput.addEventListener("input", filterErrorCodes);
});
/* ==========================================================================
   SPEED QUEEN SUBURB & VAN AVAILABILITY CHECKER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const checkBtn = document.getElementById("checkSqVanBtn");
  const suburbSelect = document.getElementById("sqSuburbSelect");
  const typeSelect = document.getElementById("sqApplianceTypeSelect");
  const resultBox = document.getElementById("sqVanResult");
  const statusText = document.getElementById("sqResultStatus");
  const detailsText = document.getElementById("sqResultDetails");

  if (!checkBtn) return;

  checkBtn.addEventListener("click", () => {
    const suburb = suburbSelect.value;
    const type = typeSelect.value;

    if (!suburb || !type) {
      alert("Please select both your suburb and Speed Queen equipment type.");
      return;
    }

    const suburbLabels = {
      "sandton": "Sandton / Fourways",
      "randburg": "Randburg / Northcliff",
      "midrand": "Midrand / Kyalami",
      "rosebank": "Rosebank / Parkhurst",
      "other": "Johannesburg"
    };

    const typeLabels = {
      "toploader": "Speed Queen Top-Load Washer",
      "frontloader": "Speed Queen Front-Load Washer",
      "dryer": "Speed Queen Tumble Dryer",
      "stacked": "Speed Queen Stacked Unit"
    };

    statusText.innerText = `Speed Queen Mobile Van Ready in ${suburbLabels[suburb]}`;
    detailsText.innerHTML = `Mobile unit carrying genuine OEM spare parts for your <strong>${typeLabels[type]}</strong> is active in your area today. Book now for priority same-day dispatch.`;

    resultBox.style.display = "block";
  });
});
/* ==========================================================================
   DEFY MODEL ASSESSOR SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const selectorBtns = document.querySelectorAll(".defy-intro-section .selector-btn");
  const outputTitle = document.getElementById("defyOutputTitle");
  const outputDesc = document.getElementById("defyOutputDesc");

  const defyData = {
    "fridge": {
      title: "Dual Cooling Refrigerators & Chest Freezers",
      desc: "Fully stocked mobile inventory for Defy Dual Cooling, NatureLight fridges, and chest freezers. Carrying original thermostats, defrost heaters, overload protectors, door seals, and ProSmart inverter modules."
    },
    "washer": {
      title: "Automaid Front & Top Loader Washing Machines",
      desc: "Specialized servicing for Defy Automaid and AquaWave washing machines. On-site repairs for drain pumps, door interlocks, motor brushes, pressure switches, and main PCB control boards."
    },
    "cooking": {
      title: "Thermofan+ Ovens, Freestanding Stoves & Hobs",
      desc: "Complete repair solutions for Defy Thermofan+ eye-level ovens, solid plate stoves, and glass touch hobs. Carrying genuine bake elements, selector switches, thermal fuses, and NTC sensors."
    },
    "dryer": {
      title: "EcoDry Auto-Dry & Heat Pump Tumble Dryers",
      desc: "Rapid testing and component replacement for Defy EcoDry sensor dryers. Stocked with thermal cutouts, drive belts, drum rollers, heating elements, and moisture sensors."
    }
  };

  selectorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      selectorBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const key = btn.getAttribute("data-defy");
      if (defyData[key]) {
        outputTitle.innerText = defyData[key].title;
        outputDesc.innerText = defyData[key].desc;
      }
    });
  });
});
/* ==========================================================================
   DEFY VERTICAL FAULT SELECTOR SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const faultSelectors = document.querySelectorAll(".interactive-fault-selector");

  faultSelectors.forEach(selector => {
    const buttons = selector.querySelectorAll(".fault-btn");
    const panels = selector.querySelectorAll(".fault-info-panel");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");

        // Toggle button active status
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Toggle information panel
        panels.forEach(panel => {
          if (panel.id === targetId) {
            panel.classList.add("active");
          } else {
            panel.classList.remove("active");
          }
        });
      });
    });
  });
});
/* ==========================================================================
   DEFY ERROR CODE LOOKUP FILTER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("defyApplianceCategory");
  const codeInput = document.getElementById("defyErrorCodeInput");
  const tableRows = document.querySelectorAll("#defyErrorTable tbody tr");
  const noErrorFound = document.getElementById("defyNoErrorFound");

  if (!categorySelect || !codeInput) return;

  function filterErrorCodes() {
    const selectedCategory = categorySelect.value;
    const query = codeInput.value.toLowerCase().trim();
    let visibleRows = 0;

    tableRows.forEach(row => {
      const rowCategory = row.getAttribute("data-category");
      const rowCodes = row.getAttribute("data-code").toLowerCase();
      const rowText = row.innerText.toLowerCase();

      const matchesCategory = (selectedCategory === "all") || (rowCategory === selectedCategory);
      const matchesSearch = (query === "") || rowCodes.includes(query) || rowText.includes(query);

      if (matchesCategory && matchesSearch) {
        row.style.display = "";
        visibleRows++;
      } else {
        row.style.display = "none";
      }
    });

    if (visibleRows === 0) {
      noErrorFound.style.display = "flex";
    } else {
      noErrorFound.style.display = "none";
    }
  }

  categorySelect.addEventListener("change", filterErrorCodes);
  codeInput.addEventListener("input", filterErrorCodes);
});
/* ==========================================================================
   DEFY SUBURB & VAN AVAILABILITY CHECKER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const checkBtn = document.getElementById("checkDefyVanBtn");
  const suburbSelect = document.getElementById("defySuburbSelect");
  const typeSelect = document.getElementById("defyApplianceTypeSelect");
  const resultBox = document.getElementById("defyVanResult");
  const statusText = document.getElementById("defyResultStatus");
  const detailsText = document.getElementById("defyResultDetails");

  if (!checkBtn) return;

  checkBtn.addEventListener("click", () => {
    const suburb = suburbSelect.value;
    const type = typeSelect.value;

    if (!suburb || !type) {
      alert("Please select both your suburb and Defy appliance category.");
      return;
    }

    const suburbLabels = {
      "sandton": "Sandton / Fourways",
      "randburg": "Randburg / Northcliff",
      "midrand": "Midrand / Kyalami",
      "rosebank": "Rosebank / Parkhurst",
      "other": "Johannesburg"
    };

    const typeLabels = {
      "fridge": "Defy Refrigerator / Freezer",
      "washer": "Defy Automaid Washing Machine",
      "oven": "Defy Thermofan+ Oven / Stove",
      "dryer": "Defy EcoDry Tumble Dryer"
    };

    statusText.innerText = `Defy Mobile Van Active in ${suburbLabels[suburb]}`;
    detailsText.innerHTML = `Mobile unit carrying genuine OEM spare parts for your <strong>${typeLabels[type]}</strong> is active in your area today. Book now for priority same-day dispatch.`;

    resultBox.style.display = "block";
  });
});
/* ==========================================================================
   SMEG MODEL ASSESSOR SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const selectorBtns = document.querySelectorAll(".smeg-intro-section .selector-btn");
  const outputTitle = document.getElementById("smegOutputTitle");
  const outputDesc = document.getElementById("smegOutputDesc");

  const smegData = {
    "fridge": {
      title: "FAB 50s Retro & Built-In Refrigeration",
      desc: "Dedicated mobile support for Smeg FAB28, FAB30, FAB50 retro series, and integrated French door refrigerators. Stocked with original inverter compressor modules, NTC sensors, defrost heaters, and magnetic door seals."
    },
    "dishwasher": {
      title: "Integrated & Freestanding Planetary Dishwashers",
      desc: "Specialized servicing for Smeg double-orbital and Planetary Wash dishwashers. On-site resolution for Aquastop flood sensor trips, spray arm blockage, wash pump impellers, and electronic PCB boards."
    },
    "washer": {
      title: "Front-Load & Washer-Dryer Combo Units",
      desc: "Precision technician repairs for Smeg front-loading washing machines. Carrying factory-original drain pumps, door lock solenoids, tub shock absorbers, motor carbon brushes, and control modules."
    },
    "dryer": {
      title: "Condenser & Heat Pump Tumble Dryers",
      desc: "Rapid testing and component replacement for Smeg Eco-Heat and sensor dryers. Stocked with thermal cutouts, poly-V drive belts, drum rollers, moisture sensors, and heating elements."
    }
  };

  selectorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      selectorBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const key = btn.getAttribute("data-smeg");
      if (smegData[key]) {
        outputTitle.innerText = smegData[key].title;
        outputDesc.innerText = smegData[key].desc;
      }
    });
  });
});
/* ==========================================================================
   SMEG VERTICAL FAULT SELECTOR SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const faultSelectors = document.querySelectorAll(".interactive-fault-selector");

  faultSelectors.forEach(selector => {
    const buttons = selector.querySelectorAll(".fault-btn");
    const panels = selector.querySelectorAll(".fault-info-panel");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");

        // Toggle button active status
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Toggle information panel
        panels.forEach(panel => {
          if (panel.id === targetId) {
            panel.classList.add("active");
          } else {
            panel.classList.remove("active");
          }
        });
      });
    });
  });
});
/* ==========================================================================
   SMEG ERROR CODE LOOKUP FILTER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("smegApplianceCategory");
  const codeInput = document.getElementById("smegErrorCodeInput");
  const tableRows = document.querySelectorAll("#smegErrorTable tbody tr");
  const noErrorFound = document.getElementById("smegNoErrorFound");

  if (!categorySelect || !codeInput) return;

  function filterErrorCodes() {
    const selectedCategory = categorySelect.value;
    const query = codeInput.value.toLowerCase().trim();
    let visibleRows = 0;

    tableRows.forEach(row => {
      const rowCategory = row.getAttribute("data-category");
      const rowCodes = row.getAttribute("data-code").toLowerCase();
      const rowText = row.innerText.toLowerCase();

      const matchesCategory = (selectedCategory === "all") || (rowCategory === selectedCategory);
      const matchesSearch = (query === "") || rowCodes.includes(query) || rowText.includes(query);

      if (matchesCategory && matchesSearch) {
        row.style.display = "";
        visibleRows++;
      } else {
        row.style.display = "none";
      }
    });

    if (visibleRows === 0) {
      noErrorFound.style.display = "flex";
    } else {
      noErrorFound.style.display = "none";
    }
  }

  categorySelect.addEventListener("change", filterErrorCodes);
  codeInput.addEventListener("input", filterErrorCodes);
});
/* ==========================================================================
   SMEG SUBURB & VAN AVAILABILITY CHECKER SCRIPT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const checkBtn = document.getElementById("checkSmegVanBtn");
  const suburbSelect = document.getElementById("smegSuburbSelect");
  const typeSelect = document.getElementById("smegApplianceTypeSelect");
  const resultBox = document.getElementById("smegVanResult");
  const statusText = document.getElementById("smegResultStatus");
  const detailsText = document.getElementById("smegResultDetails");

  if (!checkBtn) return;

  checkBtn.addEventListener("click", () => {
    const suburb = suburbSelect.value;
    const type = typeSelect.value;

    if (!suburb || !type) {
      alert("Please select both your suburb and Smeg appliance category.");
      return;
    }

    const suburbLabels = {
      "sandton": "Sandton / Hyde Park",
      "rosebank": "Rosebank / Parkhurst",
      "midrand": "Midrand / Kyalami",
      "randburg": "Randburg / Northcliff",
      "other": "Johannesburg"
    };

    const typeLabels = {
      "fridge": "Smeg Refrigerator / Freezer",
      "dishwasher": "Smeg Planetary Wash Dishwasher",
      "washer": "Smeg Front-Load Washing Machine",
      "dryer": "Smeg Heat Pump Tumble Dryer"
    };

    statusText.innerText = `Smeg Mobile Van Active in ${suburbLabels[suburb]}`;
    detailsText.innerHTML = `Mobile unit carrying genuine imported OEM spare parts for your <strong>${typeLabels[type]}</strong> is active in your area today. Book now for priority same-day dispatch.`;

    resultBox.style.display = "block";
  });
});