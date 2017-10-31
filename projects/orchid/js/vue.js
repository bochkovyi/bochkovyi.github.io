var currentPath = window.location.pathname.split("/");
currentPath = currentPath[currentPath.length - 1];

var orchidData = {
  rooms: {
    headers: ['Расположение', 'Тип номера', 'Стоимость'],
    items: [{ description1: "Коттедж", description2: "Двухместный номер с теплым душем и Wi-FI.", price: 450 },
    { description1: "Коттедж", description2: "Трехместный номер с летним душем.", price: 450 },
    { description1: "Коттедж", description2: "Двухместный номер с летним душем.", price: 400 },
    { description1: "Трейлер", description2: "Трехместный трейлер, по 100 грн. с человека. Летний душ, туалет, кухня.", price: 300 },
    { description1: "Кемпинг", description2: "Возможность поставить свою палатку. Летний душ, туалет, кухня.", price: 60 },
    ]
  },
  food: {
    headers: ['Категория блюда', 'Варианты меню', 'Стоимость'],
    items: [{ description1: "Завтрак", description2: "Каши, блинчики, сырники, напитки.", price: 60 },
    { description1: "Обед", description2: "Первое - суп, борщ, второе - овощи, мясо, рыба, гарнир - каша, картошка.", price: 100 },
    { description1: "Ужин", description2: "Блюда из мяса, рыбы, овощи.", price: 70 },
    ]
  }
}

var imagesNature = ['seasunset.jpg', 'sea.jpg', 'road.jpg',
  '20170712_113803.jpg',
  '20170709_192220_Richtone(HDR).jpg', '20170712_183301_Richtone(HDR).jpg', 'generalview.jpg',
  '20170709_202440_Richtone(HDR).jpg', '20170712_184819_Richtone(HDR).jpg',
  '20170709_205043_Richtone(HDR).jpg', '20170712_184824_Richtone(HDR).jpg',
  '20170710_111324_Richtone(HDR).jpg', '20170713_193922_Richtone(HDR).jpg',
  '20170710_204834_Richtone(HDR).jpg', '20170714_101934_Richtone(HDR).jpg',
  '20170715_054158_Richtone(HDR).jpg'];

var imagesRooms = [
  "2015-06-08.jpg",
  "2016-04-25.jpg",
  "2017-07-28 (1).jpg",
  "2017-07-28 (2).jpg",
  "2017-07-28 (3).jpg",
  "2017-08-25.jpg"
];

Vue.component('carousel-element', {
  template: '<div id="myCarousel" class="carousel slide" data-ride="carousel">\
    <!-- Indicators -->\
    <ol class="carousel-indicators">\
        <li v-for="(item, index) in items" :class="{ active: index === 0 }" data-target="#myCarousel" :data-slide-to="index"></li>\
    </ol>\
\
    <!-- Wrapper for slides -->\
    <div class="carousel-inner">\
        <div v-for="(item, index) in items" :class="[{ active: index === 0 }, \'item\']">\
            <img :src="item.url" :alt="item.alt" style="width:100%; max-height: 640px;">\
        </div>\
    </div>\
\
    <!-- Left and right controls -->\
    <a class="left carousel-control" href="#myCarousel" data-slide="prev">\
        <span class="glyphicon glyphicon-chevron-left"></span>\
        <span class="sr-only">Previous</span>\
        </a>\
                <a class="right carousel-control" href="#myCarousel" data-slide="next">\
        <span class="glyphicon glyphicon-chevron-right"></span>\
        <span class="sr-only">Next</span>\
    </a>\
  </div>',
  data: function () {
    var images = (currentPath === "nature.html") ? imagesNature : imagesRooms;
    var prefix = (currentPath === "nature.html") ? 'img/nature/' : 'img/rooms/';

    var imageItems = [];
    for (var i = 0; i < images.length; i++) {
      imageItems.push({
        url: prefix + images[i],
        alt: "Image"
      });
    }
    return { items: imageItems }
  }
})

Vue.component('nav-vue', {
  template: '\
  <div class="navbar navbar-default navbar-fixed-top">\
      <div class="container">\
        <div class="navbar-header">\
          <a href="" class="navbar-brand">База отдыха Орхидея</a>\
          <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">\
            <span v-for="n in 3" class="icon-bar"></span>\
          </button>\
        </div>\
        <div class="navbar-collapse collapse" id="navbar-main">\
\
          <ul class="nav navbar-nav navbar-right">\
            <li v-for="link in links"><a :href="link.url" :class="{entered: link.url === active}">{{link.name}}</a></li>\
          </ul>\
\
        </div>\
      </div>\
    </div>\
  ',
  data: function () {
    return {
      links: [{
        url: "nature.html",
        name: "Природа"
      }, {
        url: "rooms-and-prices.html",
        name: "Номера и цены"
      }, {
        url: "transport.html",
        name: "Как добраться"
      }, {
        url: "contacts.html",
        name: "Контакты и бронирование"
      }],
      active: currentPath
    }
  }
})

Vue.component('footer-vue', {
  template: '<footer id="footer">\
<div class="container footer-1">\
    <div class="row">\
        <div class="col-md-5 col-sm-6 col-xs-12">\
            Отдых на Кинбурнской косе – лучший способ прикоснуться к первозданной природе. Тут вы не найдете всех удобств, к которым\
            привыкли в мегаполисе, напротив – единение с природой и отдых от городской суеты вам обеспечены. Лазурное море,\
            белоснежный песок и свобода: свежий воздух, поля, травы и леса. Все это - только на Косе. Приезжайте на Базу\
            Отдыха Орхидея и убедитесь сами!\
        </div>\
        <div class="col-md-2 hidden-sm">\
        </div>\
        <div class="col-md-5 col-sm-6 col-xs-12">\
            <div v-if="shouldShowContacts" class="panel panel-default">\
                <!-- Default panel contents -->\
                <div class="panel-heading">Наталья</div>\
\
                <!-- List group -->\
                <ul class="list-group">\
                    <li class="list-group-item">Телефон: (099) 415-64-75</li>\
                    <li class="list-group-item">Адрес: 46.475418, 31.673751<br>57555, Покровка, Николаевская область</li>\
                </ul>\
            </div>\
        </div>\
    </div>\
</div>\
<!--footer start from here-->\
\
<div class="copyright footer-2">\
    <div class="container">\
        <div class="col-md-12">\
            <p class="date-used">© {{year}} - База отдыха Орхидея. Все права защищены.</p>\
        </div>\
    </div>\
</div>\
</footer>',
  data: function () {
    return {
      shouldShowContacts: currentPath !== "contacts.html",
      year: new Date().getFullYear()
    }
  }
})

Vue.component('bs-table', {
  props: ['data'],
  template: '<table class="table table-striped table-hover ">\
	<thead>\
	  <tr>\
		<th>#</th>\
		<th v-for="header in data.headers">{{header}}</th>\
	  </tr>\
	</thead>\
	<tbody>\
	  <tr v-for="(item, index) in data.items" :class="item.class">\
		<td>{{index + 1}}</td>\
		<td>{{item.description1}}</td>\
		<td>{{item.description2}}</td>\
		<td>{{item.price}} грн.</td>\
	  </tr>\
	</tbody>\
  </table>'
})

var vm = new Vue({
  el: '#vue-app',
  data: orchidData
});