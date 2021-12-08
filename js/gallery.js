class Gallery {
    constructor(jsonFile = 'paintingsList.json') {
        this.galleryContainer = document.querySelector('.gallery');
        this.popUp = document.querySelector('.popUp');

        this.database = fetch(`../jsonfiles/${jsonFile}`)
            .then(text => text.json())

        this.galleryRender();
        this.galleryEvent();

        this.popUpObj = new PopUp(this.database)
            // this.index = 0;
            // this.listSrs = [];
            // this.galleryEvent();
    }

    galleryRender() {
        let str = '';
        this.database
            .then(data => {
                for (let index = 0; index < data.length; index++) {
                    str += `<div data-id = "${data[index].id}" class="gallery__main">
                                <div class="gallery__img"><img src="img/${data[index].imgPrew}" alt="${data[index].alt}"></div>
                                <div class="gallery__text">${data[index].preview}</div>
                            </div>`
                }
                this.galleryContainer.innerHTML = str;
            });
    }
    galleryEvent() {
        this.galleryContainer.addEventListener('click',
            e => {
                if (e.target.tagName == 'IMG') {
                    this.popUp.classList.toggle('_active');
                    this.popUpObj.popUpRender(e.target.closest('.gallery__main').dataset.id)
                }

            })
    }
}

class PopUp {
    constructor(database = '') {
        this.database = database;
        this.popUp = document.querySelector('.popUp');
        this.wraper = null;
        this.wraper_arr = null;
        this.index = 1;
        this.popUpEvent();
    }

    popUpEvent() {
        this.popUp.addEventListener('click', e => {
            if (e.target.matches('.popUp') || e.target.matches('.popUp__close') || e.target.tagName == 'SPAN') {
                this.popUp.classList.toggle('_active');
            }
            if (e.target.closest('.js-slider-left')) {
                this.index--;
                this.nextIndex();
            }
            if (e.target.closest('.js-slider-right')) {
                this.index++;
                this.nextIndex();
            }
        });
    }

    popUpRender(id) {
        let str = '';
        this.database
            .then(data => {
                if (data[id].imgSlider.length == 1) {
                    str = `<div class="popUp__close"><span></span></div>
                            <div class="popUp__wraper js-slider-center">
                                <div class="popUp__item"><img class="popUp__i" src="../img/${data[id].imgSlider[0]}" alt="${data[id].alt}"></div>
                                <div class="popUp__text">${data[id].sliderPrew}</div>
                            </div>`;
                } else if (data[id].imgSlider.length == 2) {
                    str = `<div class="popUp__close"><span></span></div>
                            <div class="popUp__wraper js-slider-left">
                                <div class="popUp__item"><img class="popUp__i" src="../img/${data[id].imgSlider[1]}" alt="${data[id].alt}"></div>
                                <div class="popUp__text">${data[id].sliderPrew}</div>
                            </div>

                            <div class="popUp__wraper js-slider-center">
                                <div class="popUp__item"><img class="popUp__i" src="../img/${data[id].imgSlider[0]}" alt="${data[id].alt}"></div>
                                <div class="popUp__text">${data[id].sliderPrew}</div>
                            </div>

                            <div class="popUp__wraper js-slider-right">
                                <div class="popUp__item"><img class="popUp__i" src="../img/${data[id].imgSlider[1]}" alt="${data[id].alt}"></div>
                                <div class="popUp__text">${data[id].sliderPrew}</div>
                            </div>`;
                } else if (data[id].imgSlider.length > 2) {
                    str = `<div class="popUp__close"><span></span></div>
                            <div class="popUp__wraper js-slider-left">
                                <div class="popUp__item"><img class="popUp__i" src="../img/${data[id].imgSlider.length - 1}" alt="${data[id].alt}"></div>
                                <div class="popUp__text">${data[id].sliderPrew}</div>
                            </div>

                            <div class="popUp__wraper js-slider-center">
                                <div class="popUp__item"><img class="popUp__i" src="../img/${data[id].imgSlider[0]}" alt="${data[id].alt}"></div>
                                <div class="popUp__text">${data[id].sliderPrew}</div>
                            </div>

                            <div class="popUp__wraper js-slider-right">
                                <div class="popUp__item"><img class="popUp__i" src="../img/${data[id].imgSlider[1]}" alt="${data[id].alt}"></div>
                                <div class="popUp__text">${data[id].sliderPrew}</div>
                            </div>`;
                    for (let index = 2; index < data[id].length - 1; index++) {
                        str += `<div class="popUp__wraper">
                                <div class="popUp__item"><img class="popUp__i" src="../img/${data[id].imgSlider[index]}" alt="${data[id].alt}"></div>
                                <div class="popUp__text">${data[id].sliderPrew}</div>
                            </div>`;

                    }
                }
                this.popUp.innerHTML = str;
                this.wraper = document.querySelectorAll(".popUp__wraper");
            });
    }

    nextIndex() {
        if (this.index < 0) {
            this.index = this.wraper.length - 1;
        } else if (this.index > this.wraper.length - 1) {
            this.index = 0;
        }
        this.wraper.forEach(element => {
            element.className = 'popUp__wraper';
        });
        if (this.index == this.wraper.length - 1) {
            this.wraper[this.index - 1].classList.add('js-slider-left');
            this.wraper[this.index].classList.add('js-slider-center');
            this.wraper[0].classList.add('js-slider-right');
        } else if (this.index == 0) {
            this.wraper[this.wraper.length - 1].classList.add('js-slider-left');
            this.wraper[this.index].classList.add('js-slider-center');
            this.wraper[this.index + 1].classList.add('js-slider-right');
        } else {
            this.wraper[this.index - 1].classList.add('js-slider-left');
            this.wraper[this.index].classList.add('js-slider-center');
            this.wraper[this.index + 1].classList.add('js-slider-right');
        }
    }
}

// class MobTouch {
//     constructor() {
//         this.container = document.querySelector('.popUp');
//         this.popUp = new PopUp();
//         this.xDown = null;
//         this.yDown = null;

//         this.xTouch = null;
//         this.yTouch = null;

//         this.screenWidth = window.screen.width;
//         this.screenHeight = window.screen.height;

//         this.addtouchEvent();
//     }

//     addtouchEvent() {

//         this.container.addEventListener('touchstart', event => {
//             const firstTouch = event.touches[0];
//             this.xDown = firstTouch.clientX;
//             this.yDown = firstTouch.clientY;
//         }, false);

//         this.container.addEventListener('touchmove', event => {
//             if (!this.xDown || !this.yDown) return;
//             let xUp = event.touches[0].clientX;
//             let yUp = event.touches[0].clientY;

//             this.xTouch = this.xDown - xUp;
//             this.yTouch = this.yDown - yUp;
//         }, false);

//         this.container.addEventListener('touchend', event => {
//             this.touchMove();
//             this.setCordinatNull();
//         }, false);
//     }

//     setCordinatNull() {
//         this.xDown = null;
//         this.yDown = null;

//         this.xTouch = null;
//         this.yTouch = null;
//     }

//     getMinWidthMove() {
//         return this.screenWidth * 0.10;
//     }

//     getMinHeightMove() {
//         return this.screenHeight * 0.30;
//     }

//     touchMoveLeft() {
//         if (this.xTouch > 0) {
//             if (Math.abs(this.xTouch) >= this.getMinWidthMove()) {
//                 this.popUp.index--;
//                 this.popUp.nextIndex();
//                 console.log('1');
//             }
//         }
//     }
//     touchMoveRight() {
//         if (this.xTouch < 0) {
//             if (Math.abs(this.xTouch) >= this.getMinWidthMove()) {
//                 this.popUp.index++;
//                 this.popUp.nextIndex();
//             }
//         }
//     }
//     touchMoveUp() {
//         if (this.yTouch > 0) {
//             if (Math.abs(this.yTouch) >= this.getMinHeightMove()) {

//             }
//         }
//     }
//     touchMoveDown() {
//         if (this.yTouch < 0) {
//             if (Math.abs(this.yTouch) >= this.getMinHeightMove()) {

//             }
//         }
//     }

//     touchMove() {
//         this.touchMoveLeft();
//         this.touchMoveRight();
//         this.touchMoveUp();
//         this.touchMoveDown();
//     }
// }

// const mob = new MobTouch();

const gallery = new Gallery();