// Controller of Quiz page.
appControllers.controller('quizCtrl', function ($scope) {

    // initialForm is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {
		alert("It's me");
    }; // End initialForm.

    $scope.submit = function () {
		var blah;
		blah = document.getElementById('gender');
		alert(document.getElementById("personal1"));
        }; // End submit

    $scope.initialForm();

});// End of Flashlight Controller.
