// $(function() {
//
//     // Modal screen triggers
//     modal_triggers = ["#about"]
//     for (var i = 0; i < modal_triggers.length; i++) {
// 	$(modal_triggers[i]).on("click", function() {
// 	    $(".modal").addClass("modal-is-visible")
// 	    $(".cover").addClass("modal-is-visible")
// 	});
//     }
//
// });

// Declare app level module
var coloringApp = angular.module('coloringApp', ['ngRoute', 'angularModalService']);
  // .config(['$routeProvider', function($routeProvider) {
  //   $routeProvider.when('/', {templateUrl: 'partials/startView.html', controller: 'StartCtrl'});
  //   $routeProvider.otherwise({redirectTo: '/'});
  // }]);

// Route Configurations
coloringApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    // route for home page
    .when('/', {
      templateUrl: 'views/startView.html',
      controller: 'StartCtrl'
    })

    // route for main page
    .when('/main', {
      templateUrl: 'views/mainView.html',
      controller: 'MainCtrl'
    })

    // route for coloring page
    .when('/coloring', {
      templateUrl: 'views/coloringView.html',
      controller: 'ColoringCtrl'
    })

    // route for story page
    .when('/story', {
      templateUrl: 'views/storyView.html',
      controller: 'StoryCtrl'
    });

  $routeProvider
    .otherwise({
      redirectTo: '/',
    });

  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('');
});

// === CONTROLLERS ===

// StartCtrl
coloringApp.controller('StartCtrl', ['$scope', 'ModalService', function($scope, ModalService) {
  $scope.message = 'hello';

  $scope.showModal = function() {
    console.log("open modal");

    ModalService.showModal({
      templateUrl: "views/_modal.html",
      controller: "ModalController",
      bodyClass: "modal-open"
    })
    .then(function(modal) {
      modal.display = false;
      modal.close.then(function(result) {
        console.log("close");
      });
    });
  };

  // $scope.keyPress = function(value) {
  //   if (value.keyCode == 42) {
  //     ModalService.closeModals(null, 500);
  //   }
  // }

}]);


coloringApp.controller('ModalController', ['$scope', 'close', function($scope, close) {
  $scope.close = function(result) {
    $scope.display = true;
    close(result, 100);
  };

}]);

// MainCtrl
coloringApp.controller('MainCtrl', ['$scope', function($scope) {

}]);

// ColoringCtrl
coloringApp.controller('ColoringCtrl', ['$scope', function($scope) {
  $scope.deviceReady = false;
  var color = "";
  // document.addEventListener('deviceReady', this.onDeviceReady, false);

  onDeviceReady();

  function onDeviceReady() {
    console.log('injecting svg');

    // Elements to inject
    var mySVGsToInject = document.querySelectorAll('img.inject-me');
    // Options
    var injectorOptions = {
        evalScripts: 'once',
        pngFallback: 'assets/png',
        each: function (svg) {
      coloring();
      // Callback after each SVG is injected
      console.log('SVG injected: ' + svg.getAttribute('id'));
        }
    };
    // Trigger the injection
    SVGInjector(mySVGsToInject, injectorOptions, function (totalSVGsInjected) {
        // Callback after all SVGs are injected
        console.log('We injected ' + totalSVGsInjected + ' SVG(s)!');
    });

    // Create color pallete box
    createPaletteBox();

    // Set size
    // setSize();
  };

  function createPaletteBox() {
    // Create palette box
    hair_colors = ['#2b2518','#925e30','#e2b72d','#b5330a']
    skin_tones = ["#7b4720", "#ad7039", "#daa159", "#f7c568", "#fbdd9b"]
    shirt_colors = ["#d62e1f","#ef803c","#f2d75a","#81d957","#4389db","#75edf3","#be8aee","#ea7e7d"]
    colors = shirt_colors.concat(hair_colors).concat(skin_tones)

    for (var i = 0; i < colors.length; i++) {
      d = document.getElementById("paletteBox").innerHTML
      document.getElementById("paletteBox").innerHTML = d + '<input type="radio" name="color" value="' + colors[i
      ] +'" id="' + i + '"/><label class="btn colorBox" for="' + i + '" style="background-color:' + colors[i] + '"></label>'
    }
  }

  function coloring() {
    // Set color
    color = colors[0];
    $('input:radio[name=color]').change(function () {
      color = $(this).val();
      // Change color of pencil
      $("#pencil").css({fill: color})
      $("#pencil-tip").css({fill: color})
      $("#pencil-eraser").css({fill: color})
      // console.log(color);
    });

    $("path, polygon, circle, rect").on('click touchstart',function(){
      //console.log($(this).attr("id"))
      if($(this).attr("id")==null) {
        $(this).css({fill: color})
      }
    });
    // Color on drag
    var isDown = false;
    $(document).bind( "mousedown touchstart", function(e){
      isDown = true;
    }).bind( "mouseup touchend", function(e){
      isDown = false;    // When mouse goes up, set isDown to false
    });
    $("path, polygon, circle, rect").bind( "mouseover hover", function(e){
      if(isDown) {
        if($(this).attr("id")==null) {
          $(this).css({fill: color})
        }
      }
    });
  }

  $scope.erase = function() {
    color = "white";
  }

  $scope.infoModal = function() {
    console.log("open modal");

    ModalService.showModal({
      templateUrl: "views/_modal.html",
      controller: "ModalController",
      bodyClass: "modal-open"
    })
    .then(function(modal) {
      modal.display = false;
      modal.close.then(function(result) {
        console.log("close");
      });
    });
  };

}]);

// StoryCtrl
coloringApp.controller('StoryCtrl', ['$scope', function($scope) {

}]);
