// ========== MODAL INFORMATIVO (PORTFÓLIO) ==========
function abrirModal(titulo, mensagem, posicaoBotao) {
    if (posicaoBotao === undefined) posicaoBotao = 'direita';
    var modal = document.getElementById('modal-portfolio');
    var modalTitulo = document.getElementById('modal-titulo');
    var modalMensagem = document.getElementById('modal-mensagem');
    var modalFooter = document.getElementById('modal-footer');

    if (!modal || !modalTitulo || !modalMensagem || !modalFooter) return false;

    modalTitulo.textContent = titulo;
    modalMensagem.textContent = mensagem;

    modalFooter.classList.remove('modal-footer-esquerda', 'modal-footer-direita');
    modalFooter.classList.add(posicaoBotao === 'esquerda' ? 'modal-footer-esquerda' : 'modal-footer-direita');

    modal.classList.add('visivel');
    document.body.style.overflow = 'hidden';

    return false;
}

function fecharModal() {
    var modal = document.getElementById('modal-portfolio');
    if (!modal) return;

    modal.classList.remove('visivel');
    document.body.style.overflow = '';
}

// ========== LÓGICA DO HERO CAROUSEL (CARROSSEL PRINCIPAL) ==========
let indiceSlideHero = 0;
let temporizadorHero = null;
let intervaloAutoplayHero = 5000; // 5 segundos

// Função para mostrar um slide específico
function mostrarSlideHero(indice) {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");

  slides.forEach((slide, i) => {
    const isActive = i === indice;
    if (isActive) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
    slide.setAttribute("aria-hidden", String(!isActive));
    slide.inert = !isActive;
  });

  dots.forEach((dot, i) => {
    const isActive = i === indice;
    if (isActive) {
      dot.classList.add("active");
      dot.setAttribute("aria-current", "true");
    } else {
      dot.classList.remove("active");
      dot.removeAttribute("aria-current");
    }
  });
}

// Função para mudar slide (setas)
function mudarSlideHero(direcao) {
  const slides = document.querySelectorAll(".hero-slide");
  const totalSlides = slides.length;

  pausarAutoplayHero();
  indiceSlideHero += direcao;

  if (indiceSlideHero >= totalSlides) {
    indiceSlideHero = 0;
  } else if (indiceSlideHero < 0) {
    indiceSlideHero = totalSlides - 1;
  }

  mostrarSlideHero(indiceSlideHero);
  reiniciarAutoplayHero();
}

// Função para ir para um slide específico (dots)
function irParaSlideHero(indice) {
  pausarAutoplayHero();
  indiceSlideHero = indice;
  mostrarSlideHero(indiceSlideHero);
  reiniciarAutoplayHero();
}

function iniciarAutoplayHero() {
  temporizadorHero = setInterval(() => {
    mudarSlideHero(1);
  }, intervaloAutoplayHero);
}

function pausarAutoplayHero() {
  if (temporizadorHero) {
    clearInterval(temporizadorHero);
    temporizadorHero = null;
  }
}

function reiniciarAutoplayHero() {
  pausarAutoplayHero();
  setTimeout(() => {
    const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!semAnimacao) {
      iniciarAutoplayHero();
    }
  }, 2000);
}

// Inicialização do Hero Carousel
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("hero-carousel");
  const dots = document.querySelectorAll(".hero-dot");

  if (carousel) {
    const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!semAnimacao) {
      iniciarAutoplayHero();
    }
    carousel.addEventListener("mouseenter", pausarAutoplayHero);
    carousel.addEventListener("mouseleave", () => {
      const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!semAnimacao) {
        iniciarAutoplayHero();
      }
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault(); // Evita scroll ao usar barra de espaço
        irParaSlideHero(index);
      }
    });
  });
});

// --- LÓGICA DO AVISO DE COOKIES (LGPD) ---
document.addEventListener("DOMContentLoaded", function () {
  const aviso = document.getElementById("aviso-cookies");
  const btnAceitar = document.getElementById("btn-aceitar-cookies");
  const btnRecusar = document.getElementById("btn-recusar-cookies");

  if (!aviso || !btnAceitar || !btnRecusar) return;

  const decisao = localStorage.getItem("cookiesAceitos");

  if (decisao !== null) {
    aviso.style.display = "none";
  } else {
    aviso.style.display = "flex";
  }

  btnAceitar.addEventListener("click", function () {
    localStorage.setItem("cookiesAceitos", "sim");
    aviso.style.display = "none";
    if (typeof carregarAnalytics === "function") {
      carregarAnalytics();
    }
  });

  btnRecusar.addEventListener("click", function () {
    localStorage.setItem("cookiesAceitos", "nao");
    aviso.style.display = "none";
  });
});

// ========== ANIMAÇÃO FADE IN UP - FAIXA DE PROVA SOCIAL ==========
document.addEventListener("DOMContentLoaded", function () {
  const trustBanner = document.getElementById("trust-banner");

  if (!trustBanner) return;

  const observer = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.2 },
  );

  observer.observe(trustBanner);
});

// ========== ANIMAÇÃO CASCATA - SEÇÃO ÁREAS DE ATUAÇÃO ==========
document.addEventListener("DOMContentLoaded", function () {
  const areasSection = document.getElementById("areas-atuacao");

  if (!areasSection) return;

  const cards = document.querySelectorAll(".card-item");

  const cardsObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("animate");
            }, index * 150);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.15 },
  );

  cardsObserver.observe(areasSection);
});

// ========== ANIMAÇÃO FADE IN LATERAL - SEÇÃO SOBRE O PROFISSIONAL ==========
document.addEventListener("DOMContentLoaded", function () {
  const sobreSection = document.getElementById("sobre-profissional");

  if (!sobreSection) return;

  const colunaFoto = sobreSection.querySelector(".coluna-foto");
  const colunaTexto = sobreSection.querySelector(".coluna-texto");

  const sobreObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (colunaFoto) colunaFoto.classList.add("visible");
          if (colunaTexto) colunaTexto.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.2 },
  );

  sobreObserver.observe(sobreSection);
});

// ========== BOTÃO CTA WHATSAPP - TRACKING ==========
document.addEventListener("DOMContentLoaded", function () {
  const btnWhatsApp = document.querySelector(".btn-whatsapp-cta");

  if (btnWhatsApp) {
    btnWhatsApp.addEventListener("click", function () {
      console.log("Botão WhatsApp clicado - Seção CTA Final");
      // gtag('event', 'click', { 'event_category': 'CTA', 'event_label': 'WhatsApp Final' });
    });
  }
});

// ========== FAQ ACCORDION ==========
document.addEventListener("DOMContentLoaded", function () {
  const faqSection = document.getElementById("faq-section");

  if (!faqSection) return;

  const faqHeader = document.querySelector(".faq-header");
  const faqItems = document.querySelectorAll(".faq-item");
  const faqQuestions = document.querySelectorAll(".faq-question");

  // Animação de entrada do título
  const headerObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          headerObserver.unobserve(entry.target);
        }
      });
    },
    { root: null, threshold: 0.2 },
  );

  if (faqHeader) headerObserver.observe(faqHeader);

  // Animação cascata dos itens
  const itemsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          faqItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("animate");
            }, index * 100);
          });
          itemsObserver.unobserve(entry.target);
        }
      });
    },
    { root: null, threshold: 0.1 },
  );

  itemsObserver.observe(faqSection);

  // Lógica do accordion
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqItem = this.parentElement;
      const faqAnswer = faqItem.querySelector(".faq-answer");
      const isActive = faqItem.classList.contains("active");

      // Fecha todos os outros itens
      faqItems.forEach((item) => {
        if (item !== faqItem) {
          item.classList.remove("active");
          const answer = item.querySelector(".faq-answer");
          const otherQuestion = item.querySelector(".faq-question");
          if (answer) answer.style.maxHeight = null;
          if (otherQuestion) otherQuestion.setAttribute("aria-expanded", "false");
        }
      });

      // Alterna o item clicado
      if (isActive) {
        faqItem.classList.remove("active");
        faqAnswer.style.maxHeight = null;
        this.setAttribute("aria-expanded", "false");
      } else {
        faqItem.classList.add("active");
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
        this.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Deep linking: abrir pergunta específica via URL (ex: pagina.html#faq-1)
  if (window.location.hash && window.location.hash.startsWith("#faq-")) {
    const targetId = window.location.hash.substring(1);
    const targetItem = document.getElementById(targetId);

    if (targetItem && targetItem.classList.contains("faq-item")) {
      setTimeout(() => {
        targetItem.classList.add("active");
        const answer = targetItem.querySelector(".faq-answer");
        const question = targetItem.querySelector(".faq-question");
        if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
        if (question) question.setAttribute("aria-expanded", "true");
        targetItem.scrollIntoView({ behavior: "smooth", block: "center" });
        targetItem.classList.add("highlight");
        setTimeout(() => targetItem.classList.remove("highlight"), 1500);
      }, 500);
    }
  }

  // --- MODAL: fechar clicando no overlay ou pressionando ESC ---
  const overlay = document.getElementById('modal-portfolio');
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) fecharModal();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') fecharModal();
  });
});
