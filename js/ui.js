window.CyberTrainerUI = {
  root: document.getElementById("app"),

  escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  },

  render(html) {
    this.root.innerHTML = html;
  },

  brand() {
    return `
      <div class="brand">
        <div class="brand-mark">CT</div>
        <div>
          <div class="brand-name">CYBERTRAINER</div>
          <div class="brand-tagline">Echte situaties. Slimmere keuzes.</div>
        </div>
      </div>
    `;
  }
};
