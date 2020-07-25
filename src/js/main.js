import slick from 'slick-carousel';

$('.slider--hero-image').slick({
  autoplay:true,
  autoplaySpeed:5000,
  dots:true,
  infinite: true,
});

$('.slider--multi-image').slick({
  autoplay:true,
  autoplaySpeed:5000,
  dots:true,
  infinite: true,
  slidesToShow: 3,
});
