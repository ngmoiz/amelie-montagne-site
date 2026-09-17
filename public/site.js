/* ============================================================
   Amélie Montagné — script partagé par toutes les pages.
   Chaque bloc vérifie que ses éléments existent : une page sans
   formulaire ou sans bouton Calendly ne provoque aucune erreur.
   ============================================================ */
(function () {
  var navWrap = document.getElementById('nav');
  var menu    = document.getElementById('menu');
  var burger  = document.querySelector('.burger');
  var closeBt = document.querySelector('.menu-close');

  /* --- Etat « scrolled » de la barre (toggle direct : pas de rAF, pas de throttling) --- */
  if (navWrap) {
    var scrolled = null;
    var onScroll = function () {
      var now = window.scrollY > 40;
      if (now === scrolled) return;
      scrolled = now;
      navWrap.classList.toggle('is-scrolled', now);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Menu mobile : ouverture, fermeture, verrou du scroll --- */
  if (menu && burger && closeBt) {
  var lastY = 0;
  function openMenu() {
    lastY = window.scrollY;
    menu.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.position = 'fixed';
    document.body.style.top = -lastY + 'px';
    document.body.style.width = '100%';
    closeBt.focus();
  }
  function closeMenu() {
    if (!menu.classList.contains('is-open')) return;
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, lastY);
  }
  burger.addEventListener('click', openMenu);
  closeBt.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setTimeout(closeMenu, 0); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
  var mq = window.matchMedia('(min-width: 1024px)');
  (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(function () {
    if (mq.matches) closeMenu();
  });
  }

  /* --- Pied de page : reseaux sociaux et e-mail -----------------------
     Meme principe que Calendly : tant qu'une valeur contient "REMPLACER",
     l'element reste masque. Un lien vide vaut moins que pas de lien.
     ------------------------------------------------------------------- */
  var RESEAUX = {
    instagram: 'https://instagram.com/REMPLACER',
    facebook:  'https://facebook.com/REMPLACER'
  };
  var EMAIL_CONTACT = 'REMPLACER@ameliemontagne.fr';

  var social = document.getElementById('foot-social');
  if (social) {
    var visibles = 0;
    social.querySelectorAll('.foot-ico').forEach(function (a) {
      var url = RESEAUX[a.dataset.net];
      if (url && url.indexOf('REMPLACER') === -1) {
        a.href = url;
        visibles++;
      } else {
        a.parentNode.hidden = true;      /* on masque le <li>, pas le lien seul */
      }
    });
    if (visibles) social.hidden = false;
  }

  var mail = document.getElementById('foot-mail');
  if (mail && EMAIL_CONTACT.indexOf('REMPLACER') === -1) {
    mail.href = 'mailto:' + EMAIL_CONTACT;
    mail.textContent = EMAIL_CONTACT;
    mail.hidden = false;
  }

  /* --- Prise de rendez-vous Calendly ---------------------------------
     UNE SEULE LIGNE A MODIFIER : CALENDLY_URL ci-dessous.

     Tant qu'elle contient "REMPLACER", les boutons restent inertes : mieux
     vaut un bouton qui ne fait rien qu'un bouton qui mene vers une page
     Calendly inexistante.

     Le script Calendly n'est telecharge qu'au PREMIER CLIC, jamais au
     chargement de la page : aucun cookie tiers n'est depose tant que le
     visiteur ne demande pas explicitement a reserver. C'est ce qui nous
     dispense d'un bandeau cookies. Ne pas deplacer ce chargement dans le
     <head> sans rouvrir cette question.
     ------------------------------------------------------------------- */
  /* >>> URL DE TEST — A REMPLACER PAR CELLE D'AMELIE AVANT LE LANCEMENT <<< */
  var CALENDLY_URL = 'https://calendly.com/gadgets-maisons/premier-echange';
  var bookLinks = document.querySelectorAll('.js-book');

  if (bookLinks.length && CALENDLY_URL.indexOf('REMPLACER') === -1) {
    var calendlyLoading = null;

    function loadCalendly() {
      if (calendlyLoading) return calendlyLoading;
      calendlyLoading = new Promise(function (resolve, reject) {
        var css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = 'https://assets.calendly.com/assets/external/widget.css';
        document.head.appendChild(css);

        var js = document.createElement('script');
        js.src = 'https://assets.calendly.com/assets/external/widget.js';
        js.async = true;
        js.onload = resolve;
        js.onerror = reject;
        document.head.appendChild(js);
      });
      return calendlyLoading;
    }

    bookLinks.forEach(function (a) {
      /* href reel : si le JS echoue, le lien reste cliquable normalement */
      a.setAttribute('href', CALENDLY_URL);
      a.removeAttribute('aria-disabled');

      a.addEventListener('click', function (e) {
        e.preventDefault();
        var label = a.textContent;
        a.textContent = 'Ouverture…';
        loadCalendly()
          .then(function () {
            a.textContent = label;
            window.Calendly.initPopupWidget({ url: CALENDLY_URL });
          })
          .catch(function () {
            /* Calendly injoignable : on y va en pleine page plutot que rien */
            a.textContent = label;
            window.location.href = CALENDLY_URL;
          });
      });
    });
  }

  /* --- Liens inertes : maquette sans page secondaire --- */
  document.querySelectorAll('[aria-disabled="true"]').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); });
  });

  /* --- Formulaire de contact : envoi sans quitter la page ---
     Netlify Forms accepte un POST urlencode sur "/" contenant form-name.
     Si le JS echoue, le formulaire part en POST classique : rien n'est perdu. */
  var form = document.querySelector('.contact-form');
  if (form) {
    var status = form.querySelector('.cf-status');
    var submit = form.querySelector('.cf-submit');
    var labelInitial = submit.textContent;

    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) return;          /* laisse le navigateur signaler */
      e.preventDefault();

      submit.disabled = true;
      submit.textContent = 'Envoi…';
      status.className = 'cf-status';

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.reset();
          status.textContent = 'Merci, votre message est bien parti. Amélie vous répondra par e-mail.';
          status.className = 'cf-status is-shown';
          submit.textContent = 'Message envoyé';
        })
        .catch(function () {
          status.textContent = "L'envoi n'a pas abouti. Réessayez, ou écrivez directement par e-mail.";
          status.className = 'cf-status is-shown is-error';
          submit.disabled = false;
          submit.textContent = labelInitial;
        });
    });
  }
})();
