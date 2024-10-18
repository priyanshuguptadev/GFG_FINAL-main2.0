function init() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}

init();

var crsr = document.querySelector(".cursor");
var blurs = document.querySelector("#cursor-blur");
// document.addEventListener("mousemove", function (dets) {
//   (crsr.style.left = dets.x + 30 + "px"), (crsr.style.top = dets.y + "px");
//   // blur.style.left = dets.x - 175 + "px",
//   // blur.style.top = dets.y - 175 + "px"
// });
var main = document.querySelector(".main");
// document.addEventListener("mousemove", function (dets) {
//   gsap.to(crsr, {
//     left: dets.x + 30 + "px",
//     top: dets.y + "px",
//     duration: 1.2, // Adjust duration for delay effect
//     ease: "power2.out", // Smoother easing
//   });
// });

gsap.from(".page1 h1,.page1 h2", {
  y: 10,
  rotate: 10,
  opacity: 0,
  delay: 0.3,
  duration: 0.7,
});
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    // markers:true,
    start: "top 27%",
    end: "top 0",
    scrub: 3,
  },
});
tl.to(
  ".page1 h1",
  {
    x: -100,
  },
  "anim"
);
tl.to(
  ".page1 h2",
  {
    x: 100,
  },
  "anim"
);
tl.to(
  ".page1 video",
  {
    width: "69%",
  },
  "anim"
);
var nav = document.querySelector("#nav");
var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    // markers:true,
    start: "top -25%",
    end: "top -80%",
    scrub: 3,
  },
});
tl2.to(".main", {
  backgroundColor: "#dadada",
});

var tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    // markers:true,
    start: "top -225%",
    end: "top -300%",
    scrub: 3,
  },
});
tl3.to(".main", {
  backgroundColor: "#0F0D0D",
});

// var tl4 = gsap.timeline({
//     scrollTrigger: {
//         trigger: ".page3 .about-us",
//         scroller: '.main',
//         markers: true,
//         start: "top 100%",
//         end: "top 300%",
//         scrub: 3
//     }
// })

// tl4.to(".main", {
//     backgroundColor: "red"
// })

/*

To change the background to purple once hovered to elements of nav
var h4 = document.querySelectorAll("#nav h4")
var purple = document.querySelector("#purple")
h4.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
        purple.style.display = "block"
        purple.style.opacity = "1"
    })
    elem.addEventListener("mouseleave", function () {
        purple.style.display = "none"
        purple.style.opacity = "0"
    })
})
    */



(() => {
  const overlay = document.querySelector(".overlay");
  const btnsOpenModal = document.querySelectorAll(".open-modal");
  const btnCloseModals = document.querySelectorAll(".close-modal");

  // Function to open the correct modal
  const openModal = function (modalId) {
      const modal = document.getElementById(modalId);
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");

      // Apply animation using GSAP
      gsap.fromTo(
          modal,
          { opacity: 0, scale: 0.5 }, // Initial state
          { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" } // Animation to apply
      );
  };

  // Function to close the modal
  const closeModal = function (modal) {
      gsap.to(modal, {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
          ease: "power2.out",
          onComplete: function () {
              modal.classList.add("hidden");
              overlay.classList.add("hidden");
          },
      });
  };

  // Add event listeners to open modal buttons
  btnsOpenModal.forEach(button => {
      button.addEventListener("click", function () {
          const modalId = this.getAttribute("data-modal"); // Get the corresponding modal ID
          openModal(modalId);
      });
  });

  // Add event listeners to close buttons
  btnCloseModals.forEach(button => {
      button.addEventListener("click", function () {
          const modal = this.closest(".model");
          closeModal(modal);
      });
  });

  // Close modal on overlay click
  overlay.addEventListener("click", function () {
      const modal = document.querySelector(".model:not(.hidden)"); // Find the visible modal
      if (modal) closeModal(modal);
  });

  // Close modal on 'Escape' key press
  document.addEventListener("keydown", function (keyPressEvent) {
      const modal = document.querySelector(".model:not(.hidden)"); // Find the visible modal
      if (keyPressEvent.key === "Escape" && modal) {
          closeModal(modal);
      }
  });
})();


// const modal = document.querySelector(".modal");
// const overlay = document.querySelector(".overlay");
// const btnCloseModal = document.querySelector(".close-modal");
// const btnsOpenModel = document.querySelector(".about-us");
// console.log(btnsOpenModel);

// const openModal = function () {
//   modal.classList.remove("hidden");
//   overlay.classList.remove("hidden");
//   gsap.fromTo(
//     modal,
//     { opacity: 0, scale: 0.5 }, // Initial state
//     { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" } // Animation to apply
//   );
// };

// const closeModal = function () {
//   gsap.to(modal, {
//     opacity: 0,
//     scale: 0.5,
//     duration: 0.3,
//     ease: "power2.out",
//     onComplete: function () {
//       modal.classList.add("hidden");
//       overlay.classList.add("hidden");
//     },
//   });
// };

// btnCloseModal.addEventListener("click", closeModal);
// overlay.addEventListener("click", closeModal);
// document.addEventListener("keydown", function (keyPressEvent) {
//   if (keyPressEvent.key === "Escape" && !modal.classList.contains("hidden")) {
//     closeModal();
//   }
// });

const greet = document.querySelector("#nav #nav-part3 #circle");
const home = document.querySelector("#nav #nav-part2 #home");
const eventss = document.querySelector("#nav #nav-part2 #event");
const contact = document.querySelector("#nav #nav-part2 #contact");
const knowMore = document.querySelector("#nav #nav-part2 #know-more");

home.addEventListener("mouseover", function () {
  greet.textContent = "Hi, nice to see you!";
});
home.addEventListener("mouseleave", function () {
  greet.textContent = "";
});

eventss.addEventListener("mouseover", function () {
  greet.textContent = "Wanna know about events?";
});
eventss.addEventListener("mouseleave", function () {
  greet.textContent = "";
});

contact.addEventListener("mouseover", function () {
  greet.textContent = "Contact us any time!";
});
contact.addEventListener("mouseleave", function () {
  greet.textContent = "";
});

knowMore.addEventListener("mouseover", function () {
  greet.textContent = "Curious? Click to explore more!";
});
knowMore.addEventListener("mouseleave", function () {
  greet.textContent = "";
});

var h4Elements = document.querySelectorAll("#nav .nav-text");
h4Elements.forEach((elem) => {
  elem.addEventListener("mouseenter", function () {
    gsap.to(elem, {
      color: "green", // Change to red when hovered
      duration: 0.3,
      ease: "power2.out",
      y: -5, // Small lift effect
      rotation: 3, // Slight rotation
    });

    // Animate the circle on hover
    // gsap.to("#circle", {
    //     scale: 1.5,
    //     backgroundColor: "green", // Change color
    //     duration: 0.3,
    //     ease: "power2.out",
    // });
  });

  elem.addEventListener("mouseleave", function () {
    gsap.to(elem, {
      color: "#fff", // Back to original color
      duration: 0.3,
      ease: "power2.out",
      y: 0, // Reset position
      rotation: 0, // Reset rotation
    });

    // Reset the circle
    // gsap.to("#circle", {
    //     scale: 1,
    //     backgroundColor: "white",
    //     duration: 0.3,
    //     ease: "power2.out",
    // });
  });
});

// Make the circle follow the mouse cursor
// document.addEventListener("mousemove", function (e) {
//   gsap.to("#circle", {
//     left: e.clientX - 15 + "px",
//     top: e.clientY - 15 + "px",
//     duration: 0.2,
//     ease: "power2.out",
//   });
// });

// Animate the nav bar entrance
gsap.from("#nav .nav-text", {
  opacity: 0,
  y: -30,
  stagger: 0.1, // Stagger the appearance of each item
  duration: 0.6,
  ease: "power2.out",
  delay: 0.5, // Delay to wait until the page is ready
});

const ACTIVE_CLASS = "block--active";
const TRANSITION_CLASS = "block--transition";

const getTransforms = (a, b) => {
  const scaleY = a.height / b.height;
  const scaleX = a.width / b.width;

  // dividing by 2 centers the transform since the origin
  // is centered not top left
  const translateX = a.left + a.width / 2 - (b.left + b.width / 2);
  const translateY = a.top + a.height / 2 - (b.top + b.height / 2);

  // nothing particularly clever here, just using the
  // translate amount to estimate a rotation direction/amount.
  // ends up feeling pretty natural to me.
  const rotate = translateX;

  return [
    `translateX(${translateX}px)`,
    `translateY(${translateY}px)`,
    `rotate(${rotate}deg)`,
    `scaleY(${scaleY})`,
    `scaleX(${scaleX})`,
  ].join(" ");
};

const animate = (block, transforms, oldTransforms) => {
  block.style.transform = transforms;
  block.getBoundingClientRect(); // force redraw
  block.classList.add(TRANSITION_CLASS);
  block.style.transform = oldTransforms;
  block.addEventListener(
    "transitionend",
    () => {
      block.removeAttribute("style");
    },
    { once: true }
  );
};

[...document.querySelectorAll(".block")].forEach((block) => {
  const buttonForBlock = block.querySelector(".block-content__button");
  block.addEventListener("click", (event) => {
    if (
      block.classList.contains(ACTIVE_CLASS) &&
      event.target !== buttonForBlock
    ) {
      return;
    }

    block.classList.remove(TRANSITION_CLASS);
    const inactiveRect = block.getBoundingClientRect();
    const oldTransforms = block.style.transform;

    block.classList.toggle(ACTIVE_CLASS);
    const activeRect = block.getBoundingClientRect();
    const transforms = getTransforms(inactiveRect, activeRect);

    animate(block, transforms, oldTransforms);
  });
});

document.getElementById("cards").onmousemove = (e) => {
  for (const card of document.getElementsByClassName("card")) {
    const rect = card.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
};

// my model
const model = document.querySelector(".model");
const e_overlay = document.querySelector(".overlay");
const btnCloseModel = document.querySelector(".close-model");
const btnsOpenModal = document.querySelector(".about-us");
console.log(btnsOpenModal);

const openModel = function () {
  model.classList.remove("hidden");
  e_overlay.classList.remove("hidden");
  gsap.fromTo(
    model,
    { opacity: 0, scale: 0.5 }, // Initial state
    { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" } // Animation to apply
  );
};

const closeModel = function () {
  gsap.to(model, {
    opacity: 0,
    scale: 0.5,
    duration: 0.3,
    ease: "power2.out",
    onComplete: function () {
      model.classList.add("hidden");
      e_overlay.classList.add("hidden");
    },
  });
};

btnCloseModel.addEventListener("click", closeModel);
e_overlay.addEventListener("click", closeModel);
document.addEventListener("keydown", function (keyPressEvent) {
  if (keyPressEvent.key === "Escape" && !model.classList.contains("hidden")) {
    closeModel();
  }
});
