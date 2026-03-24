(function () {
  "use strict";

  // Find the script tag to read data attributes
  var scripts = document.querySelectorAll("script[data-config]");
  var script = scripts[scripts.length - 1];
  if (!script) return;

  var widgetType = script.getAttribute("data-type") || "service"; // "service" or "reservation"
  var config = script.getAttribute("data-config") || (widgetType === "reservation" ? "tennis" : "plumbing");
  var widgetId = script.getAttribute("data-widget-id") || "";
  var business = script.getAttribute("data-business") || "Book Online";
  var phone = script.getAttribute("data-phone") || "";
  var color = script.getAttribute("data-color") || (widgetType === "reservation" ? "#8b5cf6" : "#0891b2");
  var host = script.getAttribute("data-host") || script.src.replace(/\/widget\.js.*$/, "");
  var buttonText = script.getAttribute("data-button-text") || (widgetType === "reservation" ? "Book a Spot" : "Book Online");
  var position = script.getAttribute("data-position") || "bottom-left";

  // Build the embed URL based on widget type
  var embedPage = widgetType === "reservation" ? "/embed-reservation" : "/embed";
  var apiPath = widgetType === "reservation" ? "/api/reservations" : "/api/bookings";
  var embedUrl = host + embedPage
    + "?config=" + encodeURIComponent(config)
    + "&widgetId=" + encodeURIComponent(widgetId)
    + "&business=" + encodeURIComponent(business)
    + "&phone=" + encodeURIComponent(phone)
    + "&color=" + encodeURIComponent(color)
    + "&api=" + encodeURIComponent(host + apiPath);

  // Inject styles
  var style = document.createElement("style");
  style.textContent = [
    ".bw-fab {",
    "  position: fixed;",
    "  z-index: 99998;",
    "  display: flex;",
    "  align-items: center;",
    "  gap: 8px;",
    "  padding: 8px 16px 8px 20px;",
    "  border-radius: 9999px;",
    "  border: none;",
    "  cursor: pointer;",
    "  font-family: system-ui, -apple-system, sans-serif;",
    "  font-size: 14px;",
    "  font-weight: 600;",
    "  color: white;",
    "  box-shadow: 0 4px 24px rgba(0,0,0,0.15);",
    "  transition: transform 0.2s, box-shadow 0.2s;",
    "  background: " + color + ";",
    "}",
    ".bw-fab:hover {",
    "  transform: scale(1.03);",
    "  box-shadow: 0 6px 32px rgba(0,0,0,0.2);",
    "}",
    ".bw-fab-icon {",
    "  width: 36px;",
    "  height: 36px;",
    "  border-radius: 50%;",
    "  background: rgba(255,255,255,0.2);",
    "  display: flex;",
    "  align-items: center;",
    "  justify-content: center;",
    "}",
    ".bw-fab-icon svg {",
    "  width: 16px;",
    "  height: 16px;",
    "  fill: none;",
    "  stroke: white;",
    "  stroke-width: 2;",
    "  stroke-linecap: round;",
    "  stroke-linejoin: round;",
    "}",
    position === "bottom-right" ? ".bw-fab { bottom: 24px; right: 24px; }" : ".bw-fab { bottom: 24px; left: 24px; }",
    ".bw-overlay {",
    "  position: fixed;",
    "  inset: 0;",
    "  z-index: 99999;",
    "  display: flex;",
    "  align-items: center;",
    "  justify-content: center;",
    "  padding: 16px;",
    "  background: rgba(0,0,0,0.5);",
    "  backdrop-filter: blur(4px);",
    "  opacity: 0;",
    "  transition: opacity 0.2s;",
    "}",
    ".bw-overlay.bw-open {",
    "  opacity: 1;",
    "}",
    ".bw-frame {",
    "  width: 100%;",
    "  max-width: 440px;",
    "  height: 90vh;",
    "  max-height: 700px;",
    "  border: none;",
    "  border-radius: 16px;",
    "  box-shadow: 0 24px 64px rgba(0,0,0,0.2);",
    "  background: white;",
    "  transform: scale(0.95);",
    "  transition: transform 0.2s;",
    "}",
    ".bw-overlay.bw-open .bw-frame {",
    "  transform: scale(1);",
    "}",
  ].join("\n");
  document.head.appendChild(style);

  // Calendar SVG icon
  var calendarSvg = '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';

  // Create floating button
  var fab = document.createElement("button");
  fab.className = "bw-fab";
  fab.innerHTML = '<span>' + buttonText + '</span><div class="bw-fab-icon">' + calendarSvg + '</div>';
  document.body.appendChild(fab);

  // Overlay + iframe (hidden initially)
  var overlay = document.createElement("div");
  overlay.className = "bw-overlay";
  overlay.style.display = "none";

  var iframe = document.createElement("iframe");
  iframe.className = "bw-frame";
  iframe.title = business + " — Book Online";

  overlay.appendChild(iframe);
  document.body.appendChild(overlay);

  // Open widget
  function open() {
    iframe.src = embedUrl;
    overlay.style.display = "flex";
    // Trigger animation
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.classList.add("bw-open");
      });
    });
    fab.style.display = "none";
  }

  // Close widget
  function close() {
    overlay.classList.remove("bw-open");
    setTimeout(function () {
      overlay.style.display = "none";
      iframe.src = "about:blank";
      fab.style.display = "flex";
    }, 200);
  }

  fab.addEventListener("click", open);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });

  // Listen for close message from iframe
  window.addEventListener("message", function (e) {
    if (e.data === "bw:close") close();
    if (e.data === "bw:submitted") {
      // Optional: track conversion
      if (typeof window.gtag === "function") {
        window.gtag("event", "booking_submitted", {
          event_category: "booking_widget",
          event_label: business,
        });
      }
    }
  });
})();
