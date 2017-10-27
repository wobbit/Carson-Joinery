$(document).ready(function() {
  $('#fullpage').fullpage({
    verticalCentered: true,
    controlArrows: false,
    css3: false,
    navigation: false,
    menu: '#page-menu',
    onLeave: function(index, nextIndex, direction) {
      if (nextIndex != 1) {
        $('header').addClass('shrink');
      } else {
        $('header').removeClass('shrink');
      }

      if (nextIndex == 1) {
        
      }

      if (nextIndex == 3 || index == 3) {
        $('.our-work').addClass('active');
      }
    }
  });

  $('.our-work').on('click vclick', '.right a', function(e) {
    e.preventDefault();
    $.fn.fullpage.moveSlideRight();
  });

  $('.our-work').on('click vclick', '.left a', function(e) {
    e.preventDefault();
    $.fn.fullpage.moveSlideLeft();
  });

  $('body').on('click vclick', '#menu-button', function(e) {
    e.preventDefault();
    $('body').toggleClass('menu-open');
  });

  $('body').on('click  vclick', '#menu a', function(e) {
    $('body').removeClass('menu-open');
  });

  $('body').on('click vclick', '.gallery a', function(e) {
    e.preventDefault();

    $.fn.fullpage.setMouseWheelScrolling(false);
    $.fn.fullpage.setAllowScrolling(false);

    $($(this).attr('data-modal-id')).addClass('open');
    $('html, body').addClass('modal-open');
  });

  $('body').on('click vclick', '.gallery-modal .close', function(e) {
    e.preventDefault();

    $.fn.fullpage.setMouseWheelScrolling(true);
    $.fn.fullpage.setAllowScrolling(true);

    $(this).closest('.gallery-modal').removeClass('open');
    $('html, body').removeClass('modal-open');
  })
});



var PageTransitions = (function() {

  var $main = $( '#pt-main' ),
    $pages = $main.children( 'div.pt-page' ),
    $iterate = $( '#iterateEffects' ),
    animcursor = 1,
    pagesCount = $pages.length,
    current = 0,
    isAnimating = false,
    endCurrPage = false,
    endNextPage = false,
    animEndEventNames = {
      'WebkitAnimation' : 'webkitAnimationEnd',
      'OAnimation' : 'oAnimationEnd',
      'msAnimation' : 'MSAnimationEnd',
      'animation' : 'animationend'
    },
    // animation end event name
    animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
    // support css animations
    support = Modernizr.cssanimations;
  
  function init() {

    $pages.each( function() {
      var $page = $( this );
      $page.data( 'originalClassList', $page.attr( 'class' ) );
    } );

    $pages.eq( current ).addClass( 'pt-page-current' );

    Pace.on( 'done', function() {
      nextPage( {animation: 21} );
    } );
  }

  function nextPage(options ) {
    var animation = (options.animation) ? options.animation : options;

    if( isAnimating ) {
      return false;
    }

    isAnimating = true;
    
    var $currPage = $pages.eq( current );

    if(options.showPage){
      if( options.showPage < pagesCount - 1 ) {
        current = options.showPage;
      }
      else {
        current = 0;
      }
    }
    else{
      if( current < pagesCount - 1 ) {
        ++current;
      }
      else {
        current = 0;
      }
    }

    var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' ),
      outClass = '', inClass = '';

    switch( animation ) {

      case 21:
        outClass = 'pt-page-scaleDown';
        inClass = 'pt-page-scaleUpDown pt-page-delay300';
        break;
      case 22:
        outClass = 'pt-page-scaleDownUp';
        inClass = 'pt-page-scaleUp pt-page-delay300';
        break;

    }

    $currPage.addClass( outClass ).on( animEndEventName, function() {
      $currPage.off( animEndEventName );
      endCurrPage = true;
      if( endNextPage ) {
        onEndAnimation( $currPage, $nextPage );
      }
    } );

    $nextPage.addClass( inClass ).on( animEndEventName, function() {
      $nextPage.off( animEndEventName );
      endNextPage = true;
      if( endCurrPage ) {
        onEndAnimation( $currPage, $nextPage );
      }
    } );

    if( !support ) {
      onEndAnimation( $currPage, $nextPage );
    }

  }

  function onEndAnimation( $outpage, $inpage ) {
    endCurrPage = false;
    endNextPage = false;
    resetPage( $outpage, $inpage );
    isAnimating = false;
  }

  function resetPage( $outpage, $inpage ) {
    $outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
    $inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
  }

  init();

  return { 
    init : init,
    nextPage : nextPage,
  };

})();