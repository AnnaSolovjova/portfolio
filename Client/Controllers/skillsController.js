/* Controller for the 'Skills' tab. */
app.controller('skillsController', function($scope, $http)
{
    $http({
        method: 'GET',
        url: '/skillsList'
    }).then(function successCallback(response) {
        
        $scope.skillsNeeded = response.data.skillsNeed;//['JavaScript', 'AngularJS', 'Spring', 'Hibirnate', 'ExtJS'];
        $scope.skillsHave = response.data.skillsHave;//['C', 'C++', 'Java', 'Networking'];
        $scope.haveSkillName = '';
        $scope.needSkillName = '';
        console.log($scope.skillsNeeded);
        $scope.addHaveSkill = function(event,item)
        {
            if (event.keyCode == 13)
            {
                if($scope.itemExists($scope.skillsNeeded, item))
                {
                    $scope.deleteItem($scope.skillsNeeded,item);
                }
                $scope.skillsHave.push(item);
                $scope.haveSkillName = '';
            }        
        }

        $scope.addNeededSkill = function(event,item)
        {
            if (event.keyCode == 13)
            {
                if($scope.itemExists($scope.skillsHave,item))
                {
                    $scope.deleteItem($scope.skillsHave,item);
                }
                $scope.skillsNeeded.push(item);
                $scope.needSkillName = '';
            }
        }

        $scope.itemExists = function(array, item)
        {
            var index = array.indexOf(item);
            if(index == -1)
                return false;
            else 
                return true;
        }

        $scope.deleteItem = function(array, item)
        {
            var index = array.indexOf(item);  
            if(index != -1)
            {
                array.splice(index, 1);
            }    
        }  
    }, function errorCallback(response) {
        console.log("Error");
    });
   

});
