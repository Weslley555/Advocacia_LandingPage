// ========== LÓGICA DO HERO CAROUSEL (CARROSSEL PRINCIPAL) ==========
let indiceSlideHero = 0;
let temporizadorHero = null;
let intervaloAutoplayHero = 5000; // 5 segundos

// Função para mostrar um slide específico
function mostrarSlideHero(indice) {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");

  // Remove a classe 'active' de todos os slides e dots
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Adiciona 'active' ao slide e dot corretos
  if (slides[indice]) {
    slides[indice].classList.add("active");
  }
  if (dots[indice]) {
    dots[indice].classList.add("active");
  }
}

// Função para mudar slide (setas)
function mudarSlideHero(direcao) {
  const slides = document.querySelectorAll(".hero-slide");
  const totalSlides = slides.length;

  // Pausa o autoplay quando o usuário interage
  pausarAutoplayHero();

  indiceSlideHero += direcao;

  // Loop infinito
  if (indiceSlideHero >= totalSlides) {
    indiceSlideHero = 0;
  } else if (indiceSlideHero < 0) {
    indiceSlideHero = totalSlides - 1;
  }

  mostrarSlideHero(indiceSlideHero);

  // Reinicia o autoplay após 2 segundos de inatividade
  reiniciarAutoplayHero();
}

// Função para ir para um slide específico (dots)
function irParaSlideHero(indice) {
  pausarAutoplayHero();
  indiceSlideHero = indice;
  mostrarSlideHero(indiceSlideHero);
  reiniciarAutoplayHero();
}

// Função de autoplay
function iniciarAutoplayHero() {
  temporizadorHero = setInterval(() => {
    mudarSlideHero(1);
  }, intervaloAutoplayHero);
}

// Pausar autoplay
function pausarAutoplayHero() {
  if (temporizadorHero) {
    clearInterval(temporizadorHero);
    temporizadorHero = null;
  }
}

// Reiniciar autoplay após interação
function reiniciarAutoplayHero() {
  pausarAutoplayHero();
  setTimeout(() => {
    iniciarAutoplayHero();
  }, 2000); // Aguarda 2 segundos antes de voltar ao autoplay
}

// Pausar ao passar o mouse sobre o carrossel
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("hero-carousel");

  if (carousel) {
    // Inicia o autoplay quando a página carrega
    iniciarAutoplayHero();

    // Pausa quando o mouse entra
    carousel.addEventListener("mouseenter", pausarAutoplayHero);

    // Retoma quando o mouse sai
    carousel.addEventListener("mouseleave", iniciarAutoplayHero);
  }
});

// Função para trocar as abas do Self Service
function mostrarAba(aba, elementoClicado) {
  document.getElementById("aba-semana").classList.remove("ativa");
  document.getElementById("aba-domingo").classList.remove("ativa");

  let botoes = document.querySelectorAll(".btn-dia");
  botoes.forEach((btn) => btn.classList.remove("ativo"));

  document.getElementById("aba-" + aba).classList.add("ativa");
  elementoClicado.classList.add("ativo");
}

// --- LÓGICA DO CARROSSEL DE EVENTOS ---
let indiceSlide = 0;

function mudarSlide(direcao) {
  const track = document.getElementById("track-eventos");
  const slides = document.querySelectorAll(".slide-evento");
  const totalSlides = slides.length;

  indiceSlide += direcao;

  if (indiceSlide >= totalSlides) {
    indiceSlide = 0;
  } else if (indiceSlide < 0) {
    indiceSlide = totalSlides - 1;
  }

  track.style.transform = `translateX(-${indiceSlide * 100}%)`;
}

// --- LÓGICA DO AVISO DE COOKIES + GOOGLE ANALYTICS (LGPD) ---
document.addEventListener("DOMContentLoaded", function () {
  const aviso = document.getElementById("aviso-cookies");
  const btnAceitar = document.getElementById("btn-aceitar-cookies");
  const btnRecusar = document.getElementById("btn-recusar-cookies");
  const decisao = localStorage.getItem("cookiesAceitos");

  // Se já tomou uma decisão antes, esconde o banner
  if (decisao !== null) {
    aviso.style.display = "none";
  } else {
    aviso.style.display = "flex";
  }

  // Aceitar: salva consentimento e carrega o Analytics
  btnAceitar.addEventListener("click", function () {
    localStorage.setItem("cookiesAceitos", "sim");
    aviso.style.display = "none";
    if (typeof carregarAnalytics === "function") {
      carregarAnalytics();
    }
  });

  // Recusar: salva recusa, Analytics não é carregado
  btnRecusar.addEventListener("click", function () {
    localStorage.setItem("cookiesAceitos", "nao");
    aviso.style.display = "none";
  });
});

// ========== ANIMAÇÃO FADE IN UP - FAIXA DE PROVA SOCIAL (INTERSECTION OBSERVER) ==========
document.addEventListener("DOMContentLoaded", function () {
  const trustBanner = document.getElementById("trust-banner");

  // Verifica se o elemento existe na página
  if (!trustBanner) return;

  // Configuração do IntersectionObserver
  const observerOptions = {
    root: null, // Usa o viewport como referência
    rootMargin: "0px",
    threshold: 0.2, // Dispara quando 20% do elemento está visível
  };

  // Callback que será executado quando o elemento entrar no viewport
  const observerCallback = function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Adiciona a classe 'visible' que ativa a animação
        entry.target.classList.add("visible");
        // Para de observar o elemento após a animação (opcional)
        observer.unobserve(entry.target);
      }
    });
  };

  // Cria o observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Começa a observar o trust banner
  observer.observe(trustBanner);
});
