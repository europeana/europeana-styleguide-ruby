require([require.toUrl('../config/main-config.js')], function() {
  require(['jquery', 'eu_light_carousel', 'eu_mock_ajax'], function($, EuLC){

    $(document).ready(function(){

      // item addition
      var addItem     = $('.add-item');
      var removeItem  = $('.remove-item');
      var removeStyle = $('.remove-style');

      var fnAddItem = function($cmp){
        var newItem = $cmp.find('.lc-item:last').clone();
        newItem.find('.lc-item-text').text('test item ' + ($cmp.find('.lc-item').length + 1));
        $cmp.find('.lc-item-container').append(newItem);
        $cmp.find('.lc-scrollable').trigger('carousel-scrolled');
      };

      addItem.on('click', function(){
        fnAddItem($('.example-1'));
      });

      removeItem.on('click', function(){
        var lastItem   = $('.example-1 .lc-item-container .lc-item:last');
        var scrollable = lastItem.closest('.light-carousel').find('.lc-scrollable');
        lastItem.remove();
        scrollable.trigger('carousel-scrolled');
      });

      removeStyle.on('click', function(){
        $('.def-style').removeClass('def-style');
      });

      // populate

      for(var i=0; i<11; i++){
        fnAddItem($('.example-1'));
      }

      // set-item-height
      $('.set-item-size').on('click', function(){
        var h = $('#item-size').val();
        $('.example-1 .lc-item').css('min-height', h + 'px');
        $('.example-1 .lc-item').css('min-width', h + 'px');
        $('.example-1 .lc-item').css('max-height', h + 'px');
        $('.example-1 .lc-item').css('max-width', h + 'px');
      });

      var templateText = $('#item-template').text();
      templateText = templateText.replace(/\[\[\[/g, '{{{').replace(/\[\[/g, '{{').replace(/\]\]\]/g, '}}}').replace(/\]\]/g, '}}');

      var getConf = function(el){
        return {
          '$el': el,
          'loadUrl': 'portal_object-media',
          'load_per_page': 3,
          'itemsAvailable': 12, // 30
          'templateText': '<div class="lc-item">' + templateText + '</div>'
        };
      };

      var dynamicExample = new EuLC.EuLightCarousel(getConf($('.example-2')));

      dynamicExample.init();

      $('.init-example-4').on('click', function(){
        var example = new EuLC.EuLightCarousel(getConf($('.example-4')));
        example.init();
        $('.init-example-4').remove();
      });

    });
  });
});
