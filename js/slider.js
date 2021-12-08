const slider = document.querySelectorAll('.slider__slide');
console.log(slider);

let index = 0;

const activeSlide = n => {
    for (slide of slider) {
        slide.classList.remove('slide-active');
    }
    slider[n].classList.add('slide-active');
}

const nextSlide = () => {
    if (index == slider.length - 1) {
        index = 0;
        activeSlide(index);
    } else {
        index++;
        activeSlide(index);
    }
}

setInterval(nextSlide, 2000);