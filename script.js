// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId.length > 1) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const offset = 80;
        const top =
          target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }
    }
  });
});

// --------- Galería de pantallas con modal flotante ---------

const slides = [
  {
    src: "imagenes/1.jpeg",
    alt: "Configuración del objetivo financiero",
    caption:
      "Configurá tus datos y objetivos para que el juego se adapte a tu realidad.",
  },
  {
    src: "imagenes/2.jpeg",
    alt: "Mapa de la ciudad con diferentes opciones",
    caption:
      "Recorré la ciudad y elegí qué hacer con tu dinero en diferentes lugares.",
  },
  {
    src: "imagenes/3.jpeg",
    alt: "Pantalla de selección de secciones",
    caption:
      "Accedé a diferentes secciones del juego con misiones y decisiones financieras.",
  },
  {
    src: "imagenes/4.jpeg",
    alt: "Mapa ampliado de la ciudad de Cashtopia",
    caption:
      "Explorá más edificios y oportunidades dentro de la ciudad de Cashtopia.",
  },
  {
    src: "imagenes/5.jpeg",
    alt: "Escena con decisiones financieras puntuales",
    caption:
      "Tomá decisiones financieras puntuales en diferentes escenarios.",
  },
  {
    src: "imagenes/6.jpeg",
    alt: "Pantalla de gastos mensuales",
    caption: "Revisá tus gastos mensuales de forma clara y ordenada.",
  },
  {
    src: "imagenes/7.jpeg",
    alt: "Pantalla de gastos variables",
    caption: "Gestioná diferentes categorías de gastos y consumos.",
  },
  {
    src: "imagenes/8.jpeg",
    alt: "Resultados de la simulación financiera",
    caption:
      "Mirá los resultados de tus decisiones financieras al final de la simulación.",
  },
];

const thumbs = document.querySelectorAll(".screen-thumb");
const modal = document.getElementById("screen-modal");
const modalImg = document.getElementById("modal-screen-img");
const modalCaption = document.getElementById("modal-screen-caption");
const modalDots = document.querySelectorAll(".modal-dot");
const modalArrows = document.querySelectorAll(".modal-arrow");
const closeBtn = document.querySelector("[data-close-modal]");

let currentIndex = 0;

function showSlide(index) {
  const total = slides.length;
  currentIndex = (index + total) % total;
  const slide = slides[currentIndex];

  modalImg.src = slide.src;
  modalImg.alt = slide.alt;
  modalCaption.textContent = slide.caption;

  modalDots.forEach((dot, i) => {
    dot.classList.toggle("is-active", i === currentIndex);
  });

  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle("is-active", i === currentIndex);
  });
}

function openModal(index) {
  showSlide(index);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

// Click en miniaturas
thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const index = parseInt(thumb.dataset.index, 10);
    if (!Number.isNaN(index)) {
      openModal(index);
    }
  });
});

// Flechas dentro del modal
modalArrows.forEach((btn) => {
  btn.addEventListener("click", () => {
    const dir = btn.dataset.dir === "next" ? 1 : -1;
    showSlide(currentIndex + dir);
  });
});

// Puntitos dentro del modal
modalDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = parseInt(dot.dataset.index, 10);
    if (!Number.isNaN(index)) {
      showSlide(index);
    }
  });
});

// Cerrar modal con la X
if (closeBtn) {
  closeBtn.addEventListener("click", closeModal);
}

// Cerrar modal clickeando fuera del cuadro
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Navegación con teclado dentro del modal
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("is-open")) return;

  if (e.key === "Escape") {
    closeModal();
  } else if (e.key === "ArrowRight") {
    showSlide(currentIndex + 1);
  } else if (e.key === "ArrowLeft") {
    showSlide(currentIndex - 1);
  }
});

// Estado inicial
showSlide(0);
