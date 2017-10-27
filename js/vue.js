var currentPath = window.location.pathname.split("/");
currentPath = currentPath[currentPath.length - 1];
console.log('currentPath', currentPath);

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

if (currentPath === "nature.html" || currentPath === "rooms-and-prices.html") {
  var images = (currentPath === "nature.html") ? imagesNature : imagesRooms;
  var prefix = (currentPath === "nature.html") ? '/img/nature/' : '/img/rooms/';

  var items = [];
  for (var i = 0; i < images.length; i++) {
    items.push({
      url: prefix + images[i],
      alt: "Image"
    });
  }

  var carousel = new Vue({
    el: '#myCarousel',
    data: {
      items: items
    }
  })
}