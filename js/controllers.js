var app = angular.module('app.controllers', ['ngStorage']);

app.controller('mainCtrl', function($scope, $localStorage) {
    
    
    //Defaults
    $scope.sayingStyle = "";
    $scope.star = "star";
    $scope.cog = "cog";
    var id = 0;
    var vals = ["Done!", "Finished!", "Killed it!", "Crushed it!", "Smashed it!", "Crushed", "Smashed", "Terminated"]
    var sayings = ["Done!", "Finished!", "Killed it!", "Crushed it!", "Keep going!", "Another one bites the dust!", "Killing it!", "Terminated"]
    
    $scope.wipeVal = function(){
        $scope.item = "";
    }
    
    $scope.reset = function (){
        $scope.$store.todos = [];
        $scope.$store.progress = 0;
        $scope.progressStyle = 0;
        $scope.message = "0%";
        $scope.$store.masterProgress = 0;
        $scope.cog = "cog";
    }
    
    // Defualts
    $scope.$store = $localStorage;
    
    $scope.$store = $localStorage.$default({
        todos: [],
        progress:0,
        masterProgress:0
    });
    
    
    if($scope.$store.masterProgress == 100){
        $scope.showDone = true;
        $scope.showGuide = true;
    } else {
        $scope.showDone = false;
    }
    
    $scope.message = $scope.$store.progress.toString()+"%";
    
    if ($scope.$store.todos!=[]){
        
        $scope.item="";
        $scope.weight="5%";
        
        if ($scope.$store.progress == 95){
            $scope.cog="hide";
            $scope.star = "pulse";
        }
        
        $scope.progressStyle = $scope.$store.progress.toString()+"%";

        var range = [];
        for(var i=1;i<105;i++){
            if (i%5 == 0){
                range.push(i.toString()+"%");

            }
        }
        
        $scope.range = range;
        
        
        $scope.saveTodo = function(name, weight){
            if (name != ""){
                
                
                weight = weight.split("%");
                weight = parseInt(weight);
                
                if($scope.$store.masterProgress + weight > 100){
                    $scope.message = "Select a lower %!";
                } else{
                    
                    if ($scope.$store.masterProgress < 100){
                       $scope.$store.masterProgress += weight;
                    }
                    
                    $scope.saying = "";
                    $scope.sayingStyle="";



                    if($scope.$store.masterProgress == 100){
                        $scope.showDone = true;
                        $scope.showGuide = true;
                    } else {
                        $scope.showDone = false;

                    }


                    if ($scope.$store.masterProgress <= 100){

                        id += 1; 
                        console.log($scope.$store.masterProgress);
                        var val = shuffleArray(vals)[0];

                        $scope.$store.todos.push({name, weight, val, id});

                        //console.log($scope.$store.todos);
                        $scope.sayingStyle="";
                        $scope.saying="";
                        $scope.item = "";
                        $scope.weight = "5%";
                        
                        $scope.message = $scope.$store.progress.toString()+"%";
                    } 
                
                }
                
                
            }

        }
        
        $scope.doneTodo = function(name, weight, id){
            
            $scope.$store.progress += parseInt(weight);
            
            console.log("LENGTH: " + $scope.$store.todos.length.toString());
            
            if ($scope.$store.progress >= 95){
                $scope.cog="hide";
                $scope.star = "pulse";
            } else {
                $scope.cog="cog";
                $scope.star = "star";
            }
            
            
            
             //$scope.$store.progress.toString()+"%";
            console.log($scope.$store.progress);
            
            if ($scope.$store.progress >= 100){
                
                $scope.$store.progress = 0;
                $scope.progressStyle = $scope.$store.progress.toString()+"%";
                
                removeName($scope.$store.todos, 'id', id);
                
                $scope.message = "0%";
                $scope.saying = shuffleArray(sayings)[0];
                $scope.showGuide = false;
                $scope.sayingStyle = "saying";
                //$scope.sayingStyle = "";
                $scope.$store.masterProgress = 0;
                
                
                
            } else {
                $scope.progressStyle = $scope.$store.progress.toString()+"%";
               
                $scope.message = $scope.$store.progress.toString()+"%";
                removeName($scope.$store.todos, 'id', id);
            }
            
        }
        
    } 
})