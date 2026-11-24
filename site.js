/* Linnea: caixa de cookies e mensagem da Lina ao rolar a página. */
(function () {
  'use strict';
  function guardar(area, chave, valor) { try { window[area].setItem(chave, valor); } catch (e) {} }
  function ler(area, chave) { try { return window[area].getItem(chave); } catch (e) { return null; } }

  var cookie = document.getElementById('cookie-box');
  if (cookie && !ler('localStorage', 'linnea_cookies')) {
    cookie.hidden = false;
    document.body.classList.add('cookie-open');
    cookie.addEventListener('click', function (ev) {
      var botao = ev.target.closest('[data-cookie]');
      if (!botao) return;
      guardar('localStorage', 'linnea_cookies', botao.getAttribute('data-cookie'));
      cookie.hidden = true;
      document.body.classList.remove('cookie-open');
    });
  }

  var alerta = document.getElementById('lina-alert');
  var lancador = document.getElementById('lina-launcher');
  if (!alerta || !lancador) return;

  function abrir() {
    alerta.hidden = false;
    lancador.hidden = false;
    lancador.setAttribute('aria-expanded', 'true');
  }
  function fechar() {
    alerta.hidden = true;
    lancador.setAttribute('aria-expanded', 'false');
    guardar('sessionStorage', 'linnea_lina_fechada', '1');
  }

  alerta.querySelector('.lina-alert-close').addEventListener('click', function () { fechar(); lancador.focus(); });
  alerta.querySelectorAll('.lina-alert-options a').forEach(function (link) { link.addEventListener('click', fechar); });
  lancador.addEventListener('click', function () { if (alerta.hidden) abrir(); else fechar(); });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && !alerta.hidden) fechar(); });

  if (ler('sessionStorage', 'linnea_lina_fechada')) { lancador.hidden = false; return; }

  var mostrou = false;
  function aoRolar() {
    if (mostrou) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (max > 0 && window.scrollY / max >= 0.4) {
      mostrou = true;
      abrir();
      window.removeEventListener('scroll', aoRolar);
    }
  }
  window.addEventListener('scroll', aoRolar, { passive: true });
})();
