/* =========================================================
   PANCHAYAT WEATHER AI
   SIH26074 - COMPLETE JAVASCRIPT
   ========================================================= */


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function goTo(page) {

    document.body.classList.add("page-exit");

    setTimeout(function () {
        window.location.href = page;
    }, 250);
}


/* =========================================================
   TOAST NOTIFICATION
   ========================================================= */

function showNotification(message, type = "success") {

    let toast = document.querySelector(".toast-notification");

    if (!toast) {

        toast = document.createElement("div");

        toast.className = "toast-notification";

        document.body.appendChild(toast);
    }

    let icon = "✓";

    if (type === "warning") {
        icon = "⚠️";
    }

    if (type === "error") {
        icon = "✕";
    }

    toast.className = "toast-notification " + type;

    toast.innerHTML = `
        <span style="font-size:16px">${icon}</span>
        <div>${message}</div>
    `;

    requestAnimationFrame(function () {
        toast.classList.add("show");
    });

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function () {

        toast.classList.remove("show");

    }, 3200);
}


/* =========================================================
   SMART ALERT
   ========================================================= */

function showDemoAlert() {

    showNotification(
        "Heavy rainfall expected within the next 6 hours. Protect harvested crops.",
        "warning"
    );

    localStorage.setItem(
        "lastAlert",
        new Date().toLocaleString()
    );
}


/* =========================================================
   FARMER RECOMMENDATIONS
   ========================================================= */

function protectHarvest() {

    showNotification(
        "Harvest protection action activated. Move harvested crops to a safe covered area."
    );

    localStorage.setItem(
        "harvestProtected",
        "true"
    );
}


function sprayingWarning() {

    showNotification(
        "Avoid pesticide and fertilizer spraying before heavy rainfall.",
        "warning"
    );
}


function drainageCheck() {

    showNotification(
        "Drainage inspection task added to Panchayat response center."
    );

    localStorage.setItem(
        "drainageChecked",
        "true"
    );
}


/* =========================================================
   PANCHAYAT RESPONSE
   ========================================================= */

function notifyFarmers() {

    showNotification(
        "Demo alert sent to 248 registered farmers."
    );

    localStorage.setItem(
        "farmersNotified",
        new Date().toLocaleString()
    );
}


function alertResponseTeam() {

    showNotification(
        "Panchayat response team has been notified."
    );

    localStorage.setItem(
        "responseTeamAlerted",
        new Date().toLocaleString()
    );
}


/* =========================================================
   REPORT GENERATION
   ========================================================= */

function generateReport() {

    showNotification(
        "Weather intelligence report generated successfully."
    );

    localStorage.setItem(
        "reportGenerated",
        new Date().toLocaleString()
    );
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function toggleMobileMenu() {

    const sidebar = document.querySelector(".sidebar");

    if (!sidebar) {
        return;
    }

    sidebar.classList.toggle("mobile-open");
}


/* =========================================================
   GPS LOCATION
   ========================================================= */

function detectLocation() {

    const status = document.getElementById("gpsStatus");
    const latitude = document.getElementById("latitude");
    const longitude = document.getElementById("longitude");

    if (!navigator.geolocation) {

        if (status) {
            status.innerHTML = "GPS is not supported by this browser.";
        }

        showNotification(
            "GPS is not supported by this browser.",
            "error"
        );

        return;
    }


    if (status) {
        status.innerHTML = "📡 Detecting your location...";
    }


    if (latitude) {
        latitude.innerHTML = "Detecting...";
    }


    if (longitude) {
        longitude.innerHTML = "Detecting...";
    }


    navigator.geolocation.getCurrentPosition(

        function (position) {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;


            if (latitude) {
                latitude.innerHTML = lat.toFixed(6);
            }


            if (longitude) {
                longitude.innerHTML = lon.toFixed(6);
            }


            if (status) {

                status.innerHTML =
                    "🟢 Location Detected ✓";
            }


            showNotification(
                "GPS location detected successfully."
            );


            localStorage.setItem(
                "latitude",
                lat
            );


            localStorage.setItem(
                "longitude",
                lon
            );

        },


        function (error) {

            let message =
                "Unable to detect location.";

            if (error.code === 1) {

                message =
                    "Location permission was denied. Please allow GPS access.";

            } else if (error.code === 2) {

                message =
                    "Location information is unavailable.";

            } else if (error.code === 3) {

                message =
                    "GPS request timed out. Try again.";

            }


            if (status) {
                status.innerHTML = "🔴 " + message;
            }


            showNotification(
                message,
                "error"
            );

        },


        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}


/* =========================================================
   LOAD SAVED GPS DATA
   ========================================================= */

function loadSavedLocation() {

    const latitude = document.getElementById("latitude");
    const longitude = document.getElementById("longitude");

    const savedLat =
        localStorage.getItem("latitude");

    const savedLon =
        localStorage.getItem("longitude");


    if (savedLat && latitude) {
        latitude.innerHTML =
            parseFloat(savedLat).toFixed(6);
    }


    if (savedLon && longitude) {
        longitude.innerHTML =
            parseFloat(savedLon).toFixed(6);
    }
}


/* =========================================================
   ANIMATED COUNTERS
   ========================================================= */

function animateCounter(element) {

    const target =
        parseInt(
            element.getAttribute("data-counter")
        );


    if (isNaN(target)) {
        return;
    }


    let current = 0;

    const duration = 1200;

    const steps = 50;

    const increment = target / steps;

    const intervalTime = duration / steps;


    const counterInterval =
        setInterval(function () {

            current += increment;


            if (current >= target) {

                current = target;

                clearInterval(counterInterval);
            }


            element.innerHTML =
                Math.floor(current).toLocaleString();

        }, intervalTime);
}


function startCounters() {

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    counters.forEach(function (counter) {

        animateCounter(counter);

    });
}


/* =========================================================
   REVEAL ANIMATIONS
   ========================================================= */

function setupRevealAnimations() {

    const elements =
        document.querySelectorAll(".reveal");


    if (!elements.length) {
        return;
    }


    if (!("IntersectionObserver" in window)) {

        elements.forEach(function (element) {

            element.classList.add("visible");

        });

        return;
    }


    const observer =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },

            {
                threshold: 0.12
            }
        );


    elements.forEach(function (element) {

        observer.observe(element);

    });
}


/* =========================================================
   CURRENT DATE & TIME
   ========================================================= */

function updateDateTime() {

    const dateElements =
        document.querySelectorAll(
            ".current-date"
        );


    if (!dateElements.length) {
        return;
    }


    const now = new Date();


    const formattedDate =
        now.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );


    const formattedTime =
        now.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    dateElements.forEach(function (element) {

        element.innerHTML =
            formattedDate + " • " + formattedTime;

    });
}


/* =========================================================
   AI PREDICTION DEMO
   ========================================================= */

function runAIPrediction() {

    showNotification(
        "AI weather model is analyzing temperature, humidity, rainfall and historical patterns..."
    );


    setTimeout(function () {

        showNotification(
            "AI analysis complete: Heavy rainfall risk detected at 78%.",
            "warning"
        );

    }, 1800);
}


/* =========================================================
   REFRESH WEATHER DEMO
   ========================================================= */

function refreshWeather() {

    showNotification(
        "Refreshing Panchayat weather data..."
    );


    setTimeout(function () {

        showNotification(
            "Weather data updated successfully."
        );

    }, 1200);
}


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICK
   ========================================================= */

function closeMobileMenu() {

    const sidebar =
        document.querySelector(".sidebar");


    if (sidebar &&
        window.innerWidth <= 850) {

        sidebar.classList.remove(
            "mobile-open"
        );
    }
}


/* =========================================================
   AUTO CLOSE MOBILE MENU
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (!event.target.closest(".sidebar") &&
            !event.target.closest(".mobile-menu-button")) {

            closeMobileMenu();
        }

    }
);


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        document.body.style.opacity = "1";


        setupRevealAnimations();


        startCounters();


        updateDateTime();


        loadSavedLocation();


        /* Update clock every minute */

        setInterval(
            updateDateTime,
            60000
        );


        /* Add mobile menu button automatically */

        if (!document.querySelector(
            ".mobile-menu-button"
        )) {

            const menuButton =
                document.createElement("button");

            menuButton.className =
                "mobile-menu-button";

            menuButton.innerHTML =
                "☰";

            menuButton.onclick =
                toggleMobileMenu;

            document.body.appendChild(
                menuButton
            );
        }

    }
);


/* =========================================================
   KEYBOARD ACCESSIBILITY
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            const sidebar =
                document.querySelector(".sidebar");

            if (sidebar) {

                sidebar.classList.remove(
                    "mobile-open"
                );
            }

        }

    }
);
