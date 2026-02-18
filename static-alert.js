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
  function init() {
    const Ctor = customElements.get('static-alert');
    if (!Ctor) return;

    const els = document.querySelectorAll('static-alert');
    els.forEach((el) => {
      const inst = new Ctor();
      // copy any attributes if needed
      for (const attr of el.attributes) {
        inst.setAttribute(attr.name, attr.value);
      }
      el.replaceWith(inst); // <-- put instance exactly where the placeholder was
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
