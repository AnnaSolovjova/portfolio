/* Controller for the 'Skills' tab. */
app.controller('skillsController', function($scope)
{
    $scope.skillsNeeded = ['JavaScript', 'AngularJS', 'Spring', 'Hibirnate', 'ExtJS'];
    $scope.skillsHave = ['C', 'C++', 'Java', 'Networking'];
    $scope.haveSkillName = '';
    $scope.needSkillName = '';

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

});