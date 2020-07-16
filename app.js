var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope, sharedProperties) {

 /* outputContainer = $("#outputContainer"); //cache the jquery reference
  imgOutput = $("#imgOutput");
  jCanvas = $("#canvasCombine");
  canvas = jCanvas.get(0);
  canvH = null;
  canvW = null;
  images = [];
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var img = document.getElementById("pizza");
  var img1 = document.getElementById("ham");
  var img2 = document.getElementById("beef");
  var img3 = document.getElementById("PS");
  var img4 = document.getElementById("PC");
  var img5 = document.getElementById("IS");
  var img6 = document.getElementById("bacon");
  var img7 = document.getElementById("pep");
  var img8 = document.getElementById("sal");*/
function displayImage(imageFile) {

    fabric.Image.fromURL(imageFile, function (img) {
        var imgW = img.width;
        var imgH = img.height;
        
        var imgTop = 0;
        if (canvH == null){
            canvH = imgH;
        } else {
            imgTop = canvH + 10;
            canvH = imgTop + imgH;
        }
        
        if (canvW == null || canvW < imgW){
            canvW = imgW;
        }
        //jCanvas.height(canvH).width(canvW);
        fCanv.setHeight(canvH).setWidth(canvW);
        
        // add image onto canvas
        fCanv.add(img);
        //centerH = center Horizontally
       // img.centerH().setTop(imgTop).setCoords();
        for (var i = 0; i < images.length; i++){
            images[i].centerH().setCoords();
        }
        images.push(img);
    }, {
        
        lockUniScaling: true,
        crossOrigin: 'Anonymous'
    });

    //Now that we have at least one image being displayed, show the Get Img button
    outputContainer.show();
}
function getCanvasContentVisible(){
    var len = images.length;
    var top, left, height, width;
    for (var i = 0; i < images.length; i++){
        var img = images[i];
        var imgBound = img.getBoundingRect();
        //if (top == null || img.getTop() < top){
        if (top == null || imgBound.top < top){
            //top = img.getTop();
            top = imgBound.top;
        }
        //if (left == null || img.getLeft() < left){
        if (left == null || imgBound.left < left){
            //left = img.getLeft();
            left = imgBound.left;
        }
        //if (height == null || img.getTop() + img.getHeight() > height){
        //if (height == null || img.getTop() + img.getBoundingRectHeight()  > height){
        if (height == null || imgBound.top + imgBound.height  > height){
            //height = img.getTop() + img.getHeight();
            //height = img.getTop() + img.getBoundingRectHeight();
            height = imgBound.top + imgBound.height;
        }
        //if (width == null || img.getWidth() > width){
        //if (width == null || img.getBoundingRectWidth() > width){
        if (width == null || imgBound.width  > width){
            //width = img.getWidth();
            //width = img.getBoundingRectWidth();
            width = imgBound.width;
        }
    }
    //now that we have our bounding box, shift things to be centered and such
    height -= top;
    canvH = height;
    canvW = width;    
    fCanv.setWidth(width).setHeight(height);
    var len = images.length;
    for (var i = 0; i < len; i++){
        var image = images[i];
        var imgTop = image.getTop() - top;
        image.centerH().setTop(imgTop).setCoords();
    }
    top = 0;
    left = 0;
    return {top: top, left: left, height: height, width: width};
}

fCanv = new fabric.Canvas("canvasCombine");
fCanv.on('object:modified', function() {
    var canvDim = getCanvasContentVisible();    
});



function handleFileSelect(evt) {
    //Get rid of the old image content first

    outputContainer.hide();
    imgOutput.empty();
   
    var files = null;
    if (evt.target && evt.target.files) {
        files = evt.target.files; // FileList object
        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function (theFile) {
                return function (e) {
                    displayImage(e.target.result);
                };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    } else {
        files = FileAPI.getFiles(evt);
        FileAPI.each(files, function (file) {
            FileAPI.Image(file).get(function (err, img) {
                displayImage(img.src);
            });
        });

    }


}

$("#getImg").click(function () {
        imgOutput.empty().append('<img class="thumb" src="' + fCanv.toDataURL() + '" />');
    //imgOutput.html('<img class="thumb" src="' + canv.toDataURL() + '" />');

    return false;
});

//document.getElementById('files').addEventListener('change', handleFileSelect, false);

  $scope.crustSave = false;
  $scope.cheeseSave = false;
  $scope.toppingSave = false;
   $scope.cheese = [
    {id: 1, text: 'None'},
    {id: 2, text: 'Light'},
    {id: 3, text: 'Normal'},
    {id: 4, text: 'Extra'},
    {id: 5, text: 'Double'}
  ];
  $scope.sauce = [
    {id: 1, text: 'Robust Inspired Tomato Sauce'},
    {id: 2, text: 'Hearty Marinara Sauce'},
    {id: 3, text: 'BBQ Sauce'},
    {id: 4, text: 'Garlic Parmesan White Sauce'},
    {id: 5, text: 'Alfredo Sauce'}
  ];
 $scope.meat = [
    {id: 1, text: 'Pepperoni'},
    {id: 2, text: 'Italian Sausage'},
    {id: 3, text: 'Sliced Italian Sausage'},
    {id: 4, text: 'Beef'},
    {id: 5, text: 'Philly Steak'},
    {id: 6, text: 'Ham'},
    {id: 7, text: 'Bacon'}
    
  ];
  $scope.selectedMeatArray = [];
  $scope.selectedCheeseArray = [];
  $scope.selectedSauceArray = [];
  $scope.meat2 = [
    {id: 8, text: 'Salami'},
    {id: 9, text: 'Premium Chicken'}
  ];
  $scope.noMeat = [
    {id: 1, text: 'Cheddar Cheese'},
    {id: 2, text: 'Feta Cheese'},
    {id: 3, text: 'Shredded Parmesan Asiago'},
    {id: 4, text: 'Shredded Provolone Cheese'},
    {id: 5, text: 'Banana Peppers'},
    {id: 6, text: 'Black Olives'},
    {id: 7, text: 'Garlic'}
  ];
   $scope.noMeat2 = [
    {id: 8, text: 'Green Peppers'},
    {id: 9, text: 'Jalepeno Peppers'},
    {id: 10, text: 'Mushrooms'},
    {id: 11, text: 'Pineapple'},
    {id: 12, text: 'Onions'},
    {id: 13, text: 'Roasted Red Peppers'},
    {id: 14, text: 'Spinach'},
    {id: 15, text: 'Diced Tomatoes'},
    {id: 16, text: 'Hot Sauce'}
   ];

  $scope.selectedcheese = [];
  $scope.selectedsauce = [];
  $scope.selectedmeat = [];
  $scope.selectednomeat = [];
  $scope.data1RowsMerged = [];
  $scope.selectcheese = function(selectedcheese) {
    if ($scope.selectedcheese.indexOf(selectedcheese.text) === -1) {
      angular.forEach($scope.cheese, function(cheese) {
        if (cheese.text !== selectedcheese.text) {
          cheese.selected = false;
        }

      });
    }
    console.log($scope.selectedcheese);
  }
   $scope.selectsauce = function(selectedsauce) {
    if ($scope.selectedsauce.indexOf(selectedsauce.text) === -1) {
      angular.forEach($scope.sauce, function(sauce) {
        if (sauce.text !== selectedsauce.text) {
          sauce.selected = false;
        }

      });
    }
    console.log($scope.selectedsauce);
  }
  $scope.selectmeat = function(selectedmeat) {
    if ($scope.selectedmeat.indexOf(selectedmeat.text) === -1) {
      angular.forEach($scope.meat, function(meat) {
        if (meat.text === selectedmeat.text) {
          meat.selected = false;
        }

      });
    }
    console.log($scope.selectedmeat);
    
  }
   $scope.selectnomeat = function(selectednomeat) {
    // If we deselect the brand
    if ($scope.selectednomeat.indexOf(selectednomeat.text) === -1) {
      // Deselect all phones of that brand
      angular.forEach($scope.nomeat, function(nomeat) {
        if (nomeat.text === selectednomeat.text) {
          nomeat.selected = false;
        }

      });
    }
    console.log($scope.selectednomeat);
  }
 
  $('#buildCrust').click(function(e){
    e.preventDefault();
    $('#mytabs a[href="#step2"]').tab('show');
})
$('#buildCheeseSauce').click(function(e){
    e.preventDefault();
    $('#mytabs a[href="#step3"]').tab('show');
})
$('#buildTopping').click(function(e){

/*angular.forEach($scope.selectedmeat, function(value, key) {
      console.log(key);
        
        
        ctx.drawImage(img, 10, 10);
        if(key == 1){
          canvas.toDataURL('img7/png');
        ctx.drawImage(img7, 10, 10);
        displayImage(canvas.toDataURL('img7/png'));
      }
       else if(key == 2){
        canvas.toDataURL('img5/png');
        ctx.drawImage(img5, 10, 10)
        displayImage(canvas.toDataURL('img5/png'));
      }
      else if(key == 3){
        canvas.toDataURL('img5/png');
        ctx.drawImage(img5, 10, 10)
        displayImage(canvas.toDataURL('img5/png'));
      }
      else if(key == 4){
        canvas.toDataURL('img2/png');
        ctx.drawImage(img2, 10, 10)
        displayImage(canvas.toDataURL('img2/png'));
      }
      else if(key == 6){
        canvas.toDataURL('img1/png');
        ctx.drawImage(img1, 10, 10)
        displayImage(canvas.toDataURL('img1/png'));
      }
      else if(key == 7){
        canvas.toDataURL('img6/png');
        ctx.drawImage(img6, 10, 10)
        displayImage(canvas.toDataURL('img6/png'));
      }
      else if(key == 8){
        canvas.toDataURL('img8/png');
        ctx.drawImage(img8, 10, 10)
        displayImage(canvas.toDataURL('img8/png'));
      }
      else if(key == 5){
        canvas.toDataURL('img3/png');
        ctx.drawImage(img3, 10, 10)
        displayImage(canvas.toDataURL('img3/png'));
      }
      else{
        canvas.toDataURL('img4/png');
        ctx.drawImage(img4, 10, 10)
        displayImage(canvas.toDataURL('img4/png'));
      }
      });*/


// Create the data table.
$scope.selectedMeatArray = [];
$scope.selectedCheeseArray = [];
$scope.selectedSauceArray = [];
$scope.data1RowsMerged = [];
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        
for(i=0;i<$scope.meat.length;i++){
  angular.forEach($scope.selectedmeat, function(value, key) {
    if($scope.meat[i].id == key && value == true){
      $scope.selectedMeatArray.push($scope.meat[i].text);
      
    }
  });
}
for(i=0;i<$scope.meat2.length;i++){
  angular.forEach($scope.selectedmeat, function(value, key) {
    if($scope.meat2[i].id == key && value == true){
      $scope.selectedMeatArray.push($scope.meat2[i].text);
      
    }
  });
  
}

for(i=0;i<$scope.noMeat.length;i++){
  angular.forEach($scope.selectednomeat, function(value, key) {
    if($scope.noMeat[i].id == key && value == true){
      $scope.selectedMeatArray.push($scope.noMeat[i].text);
      
    }
  });
}
  for(i=0;i<$scope.noMeat2.length;i++){
  angular.forEach($scope.selectednomeat, function(value, key) {
    if($scope.noMeat2[i].id == key && value == true){
      $scope.selectedMeatArray.push($scope.noMeat2[i].text);
      
    }
  });
} 

for(i=0;i<$scope.sauce.length;i++){
  angular.forEach($scope.selectedsauce, function(value, key) {
    if($scope.sauce[i].id == key && value == true){
      $scope.selectedSauceArray.push($scope.sauce[i].text);
      
    }
  });
} 

for(i=0;i<$scope.cheese.length;i++){
  angular.forEach($scope.selectedcheese, function(value, key) {
    if($scope.cheese[i].id == key && value == true){
      $scope.selectedCheeseArray.push($scope.cheese[i].text);
      
    }
  });
}    
        console.log($scope.selectedMeatArray.length);
        data.addRows($scope.selectedMeatArray.length);
       for(i=0;i<$scope.selectedMeatArray.length;i++){
       // console.log(key);
        console.log($scope.selectedMeatArray.length);
        data.setCell(i,0,$scope.selectedMeatArray[i]);
          data.setCell(i,1,(1 + Math.floor(Math.random() * $scope.selectedMeatArray.length))/$scope.selectedMeatArray.length);
    //data.addRow([$scope.selectedMeatArray[i].toString(), 1/$scope.selectedmeat.length]);
}

        // Set chart options
        var options = {'title':'YOUR PIZZA',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);


       // Define the chart to be drawn.
            var data1 = new google.visualization.DataTable();   
            data1.addColumn('string', 'From');
            data1.addColumn('string', 'To');
            data1.addColumn('number', 'Weight');
            //data1Rows = $scope.selectedMeatArray.length + $scope.selectedCheeseArray.length + $scope.selectedSauceArray.length;
            
            for(i=0;i<$scope.selectedMeatArray.length;i++){
           $scope.data1RowsMerged.push($scope.selectedMeatArray[i]);
          }
          for(i=0;i<$scope.selectedCheeseArray.length;i++){
            $scope.data1RowsMerged.push($scope.selectedCheeseArray[i]);
          }
          for(i=0;i<$scope.selectedSauceArray.length;i++){
            $scope.data1RowsMerged.push($scope.selectedSauceArray[i]);
          }
          data1.addRows($scope.data1RowsMerged.length);
              /*for(i=0;i<$scope.selectedMeatArray.length;i++){
                     // console.log(key);
                      //console.log($scope.selectedMeatArray.length);
                      data1.setCell(i,0,$scope.selectedMeatArray[i]);
                        data1.setCell(i,1,'Topping');
                         data1.setCell(i,2,1);
                  //data.addRow([$scope.selectedMeatArray[i].toString(), 1/$scope.selectedmeat.length]);
              }

for(i=0;i<$scope.selectedCheeseArray.length;i++){
                     // console.log(key);
                      //console.log($scope.selectedMeatArray.length);
                      data1.setCell(i,0,$scope.selectedCheeseArray[i]);
                        data1.setCell(i,1,'Cheese');
                         data1.setCell(i,2,2);
                  //data.addRow([$scope.selectedMeatArray[i].toString(), 1/$scope.selectedmeat.length]);
              }
              for(i=0;i<$scope.selectedSauceArray.length;i++){
                     // console.log(key);
                      //console.log($scope.selectedMeatArray.length);
                      data1.setCell(i,0,$scope.selectedSauceArray[i]);
                        data1.setCell(i,1,'Sauce');
                         data1.setCell(i,2,3);
                  //data.addRow([$scope.selectedMeatArray[i].toString(), 1/$scope.selectedmeat.length]);
              }*/
              for(i=0;i<$scope.data1RowsMerged.length;i++){
                     // console.log(key);
                      //console.log($scope.selectedMeatArray.length);
                      if($scope.data1RowsMerged[i] == "Pepperoni"|| $scope.data1RowsMerged[i] == "Italian Sausage" || $scope.data1RowsMerged[i]== "Sliced Italian Sausage"  || $scope.data1RowsMerged[i]== "Beef"  || $scope.data1RowsMerged[i]== "Philly Steak"  || $scope.data1RowsMerged[i]== "Ham"  || $scope.data1RowsMerged[i]== "Bacon"  || $scope.data1RowsMerged[i] == "Salami"  || $scope.data1RowsMerged[i] == "Premium Chicken"   || $scope.data1RowsMerged[i] == "Cheddar Cheese"  || $scope.data1RowsMerged[i] == "Feta Cheese"  || $scope.data1RowsMerged[i] == "Shredded Parmesan Asiago"  || $scope.data1RowsMerged[i] == "Shredded Provolone Cheese"  || $scope.data1RowsMerged[i] == "Banana Peppers"  || $scope.data1RowsMerged[i] == "Black Olives"  || $scope.data1RowsMerged[i] == "Garlic"  || $scope.data1RowsMerged[i] == "Green Peppers"  || $scope.data1RowsMerged[i] == "Jalepeno Peppers"  || $scope.data1RowsMerged[i] == "Mushrooms"  || $scope.data1RowsMerged[i] == "Pineapple"  || $scope.data1RowsMerged[i] == "Onions"  || $scope.data1RowsMerged[i] == "Roasted Red Peppers"  || $scope.data1RowsMerged[i] == "Spinach"  || $scope.data1RowsMerged[i] == "Diced Tomatoes"  || $scope.data1RowsMerged[i]== "Hot Sauce"){
                      data1.setCell(i,0,$scope.data1RowsMerged[i]);
                        data1.setCell(i,1,'Topping');
                         data1.setCell(i,2,1);
                       }
                       else if($scope.data1RowsMerged[i] == "None"|| $scope.data1RowsMerged[i] == "Light" || $scope.data1RowsMerged[i]== "Normal"  || $scope.data1RowsMerged[i]== "Extra" || $scope.data1RowsMerged[i]== "Double"){
                        data1.setCell(i,0,$scope.data1RowsMerged[i]);
                        data1.setCell(i,1,'Cheese');
                         data1.setCell(i,2,2);
                       }
                       else{
                        data1.setCell(i,0,$scope.data1RowsMerged[i]);
                        data1.setCell(i,1,'Sauce');
                         data1.setCell(i,2,3);
                       }
                  //data.addRow([$scope.selectedMeatArray[i].toString(), 1/$scope.selectedmeat.length]);
              }
            /*data1.addRows([
               [ 'Brazil', 'Portugal', 5 ],
               [ 'Brazil', 'France', 1 ],
               [ 'Brazil', 'Spain', 1 ],
               [ 'Brazil', 'England', 1 ],
               
               [ 'Canada', 'Portugal', 1 ],
               [ 'Canada', 'France', 5 ],
               [ 'Canada', 'England', 1 ],
               
               [ 'Mexico', 'Portugal', 1 ],
               [ 'Mexico', 'France', 1 ],
               [ 'Mexico', 'Spain', 5 ],
               [ 'Mexico', 'England', 1 ],
               
               [ 'USA', 'Portugal', 1 ],
               [ 'USA', 'France', 1 ],
               [ 'USA', 'Spain', 1 ],
               [ 'USA', 'England', 5 ]
            ]); */

            // Set chart options
            var options = {width: 550};
                  
            // Instantiate and draw the chart.
            var chart = new google.visualization.Sankey(document.getElementById('container'));
            chart.draw(data1, options);
         
         google.charts.setOnLoadCallback(drawChart);
    e.preventDefault();
    $('#mytabs a[href="#step4"]').tab('show');

    return false;
})

  $scope.step2 = function(item) {
   
  }
  $scope.getItem = function() {
    
    $scope.msg = sharedProperties.getListName();
  }
});




function drawChart() {

        
      }
app.service('sharedProperties', function () {
    var list_name = '';
  
    return {
  
        getListName: function() {
            return list_name;
        },
        setListName: function(name) {
            list_name = name;
        }
    };
    
   
});