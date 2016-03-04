var app = angular.module('wikipediaViewer',[]);

app.controller('mainCtrl',function($scope,$http){
  $scope.link = "http://en.wikipedia.org/wiki/Special:Random";
  var icon = $("#icon");
  var searchBtn = $('#searchBtn');
    $('#value').hide();
   
  $scope.showSearch = function(){
    $('#value').toggle();
    if(icon.hasClass('glyphicon-search')){
      icon.removeClass('glyphicon-search');
      icon.addClass('glyphicon-remove');
    }else{
    $("#value").val('');
      icon.removeClass('glyphicon-remove');
      icon.addClass('glyphicon-search');
      $("#heading").show();
      $("hr").show();
      $("#random").show();
      $("ul").hide();
    }
  }
  
  $scope.articles = [];
  $scope.getArticles = function(){
    var value = $("#value").val();
    $("#heading").hide();
    $("hr").hide();
    $("#random").hide();
    $scope.articles = [];
    var url ="http://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages|extracts|info&pilimit=max&inprop=url&generator=search&gsrsearch="+value+"&gsrnamespace=0&gsrlimit=10&exsentences&exintro&explaintext=1&exlimit=max&callback=JSON_CALLBACK";

    $http.jsonp(url)
    .success(function(response){
      var pages = response.query.pages;
      angular.forEach(pages,function(val,key){
        
        $scope.articles.push({
          title: val.title,
          extract : val.extract,
          fullUrl : val.fullurl
        })
      });
  
    })}
});