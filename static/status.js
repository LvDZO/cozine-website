(function () {
  var el = document.getElementById('siteStatus');
  if (!el) return;

  var ALLOWED = ['green', 'yellow', 'red', 'blue'];

  fetch('/static/status.txt?t=' + Date.now(), { cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error('status ' + r.status); return r.text(); })
    .then(function (text) {
      var line = text.split(/\r?\n/)
        .map(function (s) { return s.trim(); })
        .filter(function (s) { return s && s.charAt(0) !== '#'; })[0];
      if (!line) return;

      var parts = line.split(/\s+/);
      var color = parts[0].toLowerCase();
      var label = parts.slice(1).join(' ');
      if (ALLOWED.indexOf(color) < 0 || !label) return;

      el.setAttribute('data-state', color);

      var last = el.lastChild;
      if (last && last.nodeType === 3) {
        last.nodeValue = label;
      } else {
        el.appendChild(document.createTextNode(label));
      }
    })
    .catch(function () { /* keep the default text if the file can't be read */ });
})();
