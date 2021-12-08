class Shop {
    constructor(jsonFile = 'paintingsList.json') {
        this.goodsContainer = document.querySelector('.goods');
        this.popUp = document.querySelector('.popUp');

        this.database = fetch(`../jsonfiles/${jsonFile}`)
            .then(text => text.json())

        this.goodsRender();
        this.goodsEvent();
    }

    goodsRender() {
        let str = '';
        this.database
            .then(data => {
                for (let index = 0; index < data.length; index++) {
                    str += `<div data-id="${data[index].id}" class="goods__main">
                                <a href="#" class="goods__img">
                                    <img src="img/${data[index].imgPrew}" alt="${data[index].alt}"> <button href="#" class="goods__button">Добавить в корзину</button>
                                </a>
                                <div class="goods__text">${data[index].preview}</div>
                            </div>`

                }
                this.goodsContainer.innerHTML = str;
            });
    }
    goodsEvent() {
        this.goodsContainer.addEventListener('click',
            e => {

            })
    }
}

const shop = new Shop();