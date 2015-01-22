var Carosello = (function() {

  // Constants
  var CARD_HEIGHT = 60;
  var CARD_WIDTH = 60;
  var CARD_COUNT = 4;

  var WIDTH = 800;
  var HEIGHT = 600;
  var BOTTOM = 400;

  var TILT = Math.PI / 8;
  var PYTH_ANGLE = Math.PI / 2 - TILT;

  var TILTED_CARD_HEIGHT = Math.sin(PYTH_ANGLE) * CARD_HEIGHT + 2;
  var TILTED_CARD_WIDTH = Math.cos(PYTH_ANGLE) * CARD_HEIGHT;
  var CARD_SPACING = 2;
  var PYRAMID_WIDTH = TILTED_CARD_WIDTH * 2 + CARD_SPACING * 2;

  var update_sizes = function() {
    var c = document.getElementById('container');
    WIDTH = c.clientWidth;
    HEIGHT = c.clientHeight;
    // CARD_WIDTH = WIDTH * 0.05;
    // CARD_HEIGHT = HEIGHT * 0.15;
    CARD_WIDTH = 156; // WIDTH * 0.20; // Card size
    CARD_HEIGHT = HEIGHT * 0.5;
    TILTED_CARD_HEIGHT = Math.sin(PYTH_ANGLE) * CARD_HEIGHT + 2;
    TILTED_CARD_WIDTH = Math.cos(PYTH_ANGLE) * CARD_HEIGHT;
    PYRAMID_WIDTH = TILTED_CARD_WIDTH * 2 + CARD_SPACING * 2;
    for (var i = 0; i < Deck.cards.length; ++i) {
      Deck.card_at(i).style.height = CARD_HEIGHT + 'px';
      Deck.card_at(i).style.width = CARD_WIDTH + 'px';
    }
  }

  var cylinder_positions = function() {
    var positions = [];
    var start_x = WIDTH / 2; // Center cylinder
    var start_y = HEIGHT * 0.3; // 0.1 // Center from top 
    var radius = WIDTH * 0.6; // 0.2
    for (var i = 0; i < CARD_COUNT; ++i) {
      // var angle = ((i % 10) / 10) * 2 * Math.PI;
      var angle = ((i % 10) / 10) * 8 * Math.PI;
      var x = Math.cos(angle) * radius + start_x;
      var z = Math.sin(angle) * radius;
      var y = Math.floor(i / 10) * 1.2 * CARD_HEIGHT + start_y;
      positions.push({
        position: [x, y, z],
        rotation: [0, Math.PI / 2 + angle, 0],
      });
    }
    return positions;
  }


  // Formations
  var PILE = 1;
  var HOUSE = 2;
  var WALL = 3;
  var CYLINDER = 4;
  var current_mode = PILE;

  var formation_builders = {};
  formation_builders[PILE] = pile_positions;
  formation_builders[HOUSE] = house_positions;
  formation_builders[WALL] = wall_positions;
  formation_builders[CYLINDER] = cylinder_positions;

  globalDebug = null;

  var rotating = true;

  var cardClick = function() {

    globalDebug = this;


    /* Remove glowing */
    var cards = document.getElementsByClassName('card');
    for (var i = cards.length - 1; i >= 0; i--) {
      cards[i].style.border = '1px solid transparent';
      cards[i].style.boxShadow = 'none';
    };

    // make the clicked card glow in the dark
    this.style.border = '1px solid rgb(250, 250, 250)';
    this.style.boxShadow = '0px 1px 3px rgba(0, 0, 0, 0.05) inset, 0px 0px 8px rgba(250, 250, 250, 250)'


    displayDetails();

    // var container = document.getElementById('surface');

    // if(rotating == true) {
    //   rotating = false;
    //   // Stop rotation
    //   snabbt(container, 'stop');
    //   displayDetails();
    // } else {
    //   // Start rotation
    //   snabbt(container, {
    //     rotation: [0, 2 * Math.PI, 0],
    //     duration: 20000,
    //     perspective: 2000,
    //     loop: Infinity
    //   });
    //   rotating = true;
    // }

  }

  // var startRotation = function() {
  //     snabbt(container, {
  //       rotation: [0, 2 * Math.PI, 0],
  //       duration: 20000,
  //       perspective: 2000,
  //       loop: Infinity
  //     });
  //     rotating = true;
  // }

  IMAGES = [
  'carosello/Frede-100.png',
  'carosello/Jogge-100.png',
  'carosello/Mary-100.png',
  'carosello/Minic-100.png'
  ]

  var create_card = function(container, index) {
    var card = document.createElement('div');
    card.className = 'card';
    card.style.background = 'white';
    card.id = index;
    card.addEventListener("click", cardClick, false);

    card.style.backgroundImage = 'url(' + IMAGES[index] + ')';
    var container = document.getElementById('surface');
    container.appendChild(card);

    return card;
  }

  // Deck
  var Deck = (function() {
    this.cards = [];
    this.card_index = [];

    for (var i = 0; i < CARD_COUNT; ++i) {
      var container = document.getElementById('surface');
      var card = create_card(container, i);

      this.cards.push(card);
    }

    this.next_card = function() {
      if (this.card_index > 51)
        return;
      return this.cards[this.card_index++];
    };

    this.card_at = function(index) {
      return this.cards[index];
    };

    this.reset = function() {
      this.card_index = 0;
    };
    return this;
  })();

  var build_formation = function(positions) {
    Deck.reset();
    for (i = 0; i < positions.length; ++i) {
      snabbt(Deck.next_card(), {
        position: positions[i].position,
        rotation: positions[i].rotation,
        easing: 'ease',
        duration: 2000,
        delay: i * 50
      });
    }
  }

  var set_mode = function(mode) {
    update_sizes();
    if (mode == current_mode) {
      return;
    }

    if(current_mode === CYLINDER) {
      positions = pile_positions();
    }
    if(current_mode == PILE) {
      positions = cylinder_positions();
    }
    build_formation(positions);
    current_mode = mode;
  }

  var rotate_container = function() {
    var container = document.getElementById('surface');
    snabbt(container, {
      rotation: [0, 2 * Math.PI, 0],
      duration: 20000,
      perspective: 2000, // 2000
      loop: Infinity
    });
  }

  var pile_positions = function() {
    Deck.reset();
    var positions = [];

    var i = 0;
    var card = Deck.next_card();
    var center = (WIDTH - CARD_WIDTH) / 2;
    var y = HEIGHT - HEIGHT * 0.2;
    while (card) {
      positions.push({
        position: [center, y - i * 0.5, WIDTH * 0.1],
        rotation: [Math.PI / 2, 0, 0],
      });
      ++i;
      card = Deck.next_card();
    }
    return positions;
  }

  var house_positions = function() {
    Deck.reset();

    var floors = 5;
    var y = (floors - 1) * TILTED_CARD_HEIGHT + TILTED_CARD_HEIGHT / 2;
    var z = -WIDTH * 0.2;
    var x = (WIDTH - PYRAMID_WIDTH * floors) / 2 - TILTED_CARD_WIDTH;

    var positions = [];
    var i;
    for (i = 0; i < floors; ++i) {
      var _x = x + i * TILTED_CARD_WIDTH + i * CARD_SPACING;
      var _y = y - i * TILTED_CARD_HEIGHT - i * CARD_SPACING;
      positions = positions.concat(house_row_positions(floors - i, _x, _y, z));
    }

    return positions;
  }

  var house_row_positions = function(count, x, y, z) {
    var positions = [];
    var i;
    // Tilted cards
    for (i = 0; i < count; ++i) {
      card_positions = pyramid_postions(x + i * PYRAMID_WIDTH, y, z);
      positions.push({
        position: card_positions[0].position,
        rotation: card_positions[0].rotation,
      });
      positions.push({
        position: card_positions[1].position,
        rotation: card_positions[1].rotation,
      });
    }
    // Bridge cards
    for (i = 0; i < count - 1; ++i) {
      positions.push({
        position: [x + i * PYRAMID_WIDTH + TILTED_CARD_WIDTH, y - TILTED_CARD_HEIGHT / 2 - CARD_SPACING / 2, z],
        rotation: [Math.PI / 2, Math.PI / 2, 0],
      });
    }
    return positions;
  }

  var pyramid_postions = function(x, y, z) {
    // Firefox flickers if elements overlap
    var spacing = (TILTED_CARD_WIDTH / 2) + CARD_SPACING / 2;

    return [{
      position: [x - spacing, y, z],
      rotation: [-TILT, Math.PI / 2, 0],
    }, {
      position: [x + spacing, y, z],
      rotation: [TILT, Math.PI / 2, 0],
    }];
  }

  var wall_positions = function() {
    var positions = [];
    var w = CARD_WIDTH + 10;
    var h = CARD_HEIGHT + 10;
    var start_x = (WIDTH - 10 * w) / 2;
    var start_y = (HEIGHT - 4 * h) / 2;
    for (var i = 0; i < CARD_COUNT; ++i) {
      var x = (i % 10) * w + start_x;
      var y = (Math.floor(i / 10)) * h + start_y;
      positions.push({
        position: [x, y, 0],
        rotation: [0, 0, 0]
      });
    }
    return positions;
  }


  var build_wall = function() {
    set_mode(WALL);
  }

  var build_house = function() {
    set_mode(HOUSE);
  }

  build_pile = function() {
    set_mode(PILE);
  }

  var init = function() {
    update_sizes();
    Deck.reset();
    // build_wall();
    set_mode(CYLINDER);
    rotate_container();
  }

  var displayDetails = function() {
    var DETAILS_WIDTH = 450;
    var c = document.getElementById('carosello');
    WIDTH = c.clientWidth;
    
    var END_X_POS = (WIDTH / 2) - (DETAILS_WIDTH / 2);
    console.log('c.clientWidth ' + c.clientWidth )

    var bikeDiv = document.getElementById('frede-details');
    bikeDiv.style.display = 'block';
    snabbt(bikeDiv, {
      fromPosition: [-700, 200, 0],
      position: [END_X_POS, 200, 0],
      easing: 'spring',
      delay: 1000,
      springConstant: 0.1,
      springDeacceleration: 0.2
    });
  }

  var hideDetails = function() {
    var bikeDiv = document.getElementById('frede-details');
    snabbt(bikeDiv, {
      position: [-700, 0, 0],
      easing: 'ease',
    });

    // startRotation();
    // var card = document.getElementsByClassName('card');
    // cards[0].click();
  }

  return {
    init: init,
    displayDetails: displayDetails,
    hideDetails: hideDetails
  }
})();