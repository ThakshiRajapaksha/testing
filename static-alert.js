class StaticAlert extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div style="
        background: yellow;
        border: 1px solid #ccc;
        padding: 8px;
        font-family: Arial, sans-serif;
        font-size: 14px;
      ">
        <strong>Notice:</strong> This is a static web component.
      </div>
    `;
  }
}

customElements.define('static-alert', StaticAlert);

// ↓ Add this block ↓
(function () {
  function createStaticAlertOnce() {
    const Ctor = customElements.get('static-alert');
    if (!Ctor) {
      console.error('[static-alert.js] static-alert not registered');
      return;
    }

    if (document.querySelector('static-alert[data-auto-instantiated="true"]')) {
      return;
    }

    const inst = new Ctor();
    inst.setAttribute('data-auto-instantiated', 'true');
    document.body.appendChild(inst);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createStaticAlertOnce);
  } else {
    createStaticAlertOnce();
  }
})();
