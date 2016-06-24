var app = angular.module('app.controllers', ['ngStorage']);

app.controller('mainCtrl', function($scope, $localStorage) {
    
    
    //Defaults
    $scope.sayingStyle = "";
    $scope.star = "star";
    $scope.cog = "cog";
    var id = 0;
    var vals = ["Done!", "Finished!", "Killed it!", "Crushed it!", "Smashed it!", "Crushed", "Smashed", "Terminated"]
    var sayings = ["Done!", "Finished!", "Killed it!", "Crushed it!", "Keep going!", "Another one bites the dust!", "Killing it!", "Terminated"]
    
    // So that when jQuery clears the input, the models value is reset
    $scope.wipeVal = function(){
        $scope.item = "";
    }
    
    // Master reset for when things go wrong
    $scope.reset = function (){
        $scope.$store.todos = [];
        $scope.$store.progress = 0;
        $scope.progressStyle = 0;
        $scope.message = "0%";
        $scope.$store.masterProgress = 0;
        $scope.cog = "cog";
    }
    
    // Defualts for local stroage
    $scope.$store = $localStorage;
    
    $scope.$store = $localStorage.$default({
        todos: [],
        progress:0,
        masterProgress:0
    });
    
    // Depends on if it shows buttons or not
    if($scope.$store.masterProgress == 100){
        $scope.showDone = true;
        $scope.showGuide = true;
    } else {
        $scope.showDone = false;
    }
    
    $scope.message = $scope.$store.progress.toString()+"%";
    // So that this stuff only gets run when todos are already stored.
    if ($scope.$store.todos!=[]){
        
        $scope.item="";
        $scope.weight="5%";
        // The effect of the star pulsing and cod hiding
        if ($scope.$store.progress == 95){
            $scope.cog="hide";
            $scope.star = "pulse";
        }
        
        $scope.progressStyle = $scope.$store.progress.toString()+"%";
        
        // Gen the list of % values in the <selection>
        var range = [];
        for(var i=1;i<105;i++){
            if (i%5 == 0){
                range.push(i.toString()+"%");

            }
        }
        
        $scope.range = range;
        
        // Save function
        $scope.saveTodo = function(name, weight){
            if (name != ""){
                
                // Just take the int
                weight = weight.split("%");
                weight = parseInt(weight);
                
                //Check to see if the master progress is over 100% 
                if($scope.$store.masterProgress + weight > 100){
                    $scope.message = "Select a lower %!";
                } else{
                    
                    if ($scope.$store.masterProgress < 100){
                       $scope.$store.masterProgress += weight;
                    }
                    
                    $scope.saying = "";
                    $scope.sayingStyle="";


                    // Show the buttons to check off todos
                    if($scope.$store.masterProgress == 100){
                        $scope.showDone = true;
                        $scope.showGuide = true;
                    } else {
                        $scope.showDone = false;

                    }

                    // Only add a todo if total progress is under 100%
                    if ($scope.$store.masterProgress <= 100){

                        id += 1; 
                        console.log($scope.$store.masterProgress);
                        var val = shuffleArray(vals)[0];

                        $scope.$store.todos.push({name, weight, val, id});

                        
                        $scope.sayingStyle="";
                        $scope.saying="";
                        $scope.item = "";
                        $scope.weight = "5%";
                        
                        $scope.message = $scope.$store.progress.toString()+"%";
                    } 
                
                }
                
                
            }

        }
        
        // When checking off the todo
        $scope.doneTodo = function(name, weight, id){
            
            $scope.$store.progress += parseInt(weight);
            
            //console.log("LENGTH: " + $scope.$store.todos.length.toString());
            
            // When total progress is 95% add effects
            if ($scope.$store.progress >= 95){
                $scope.cog="hide";
                $scope.star = "pulse";
            } else {
                $scope.cog="cog";
                $scope.star = "star";
            }
            
            
            
            
            //console.log($scope.$store.progress);
            
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