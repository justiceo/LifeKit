// Controller of Quiz page.
appControllers.controller('quizCtrl', function ($scope) {

    // initialForm is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    //$scope.initialForm = function () {
//		alert("It's me");
  //  }; // End initialForm.

    $scope.alertsum = function(sum) {
	if(sum >= 8)
	{
		alert("You are at an severe risk of an overdose, please contact your doctor and only take your medication as specified");
	}
	else if(sum == 7)
	{
		alert("You are at a moderate risk of an overdose, please proceed with caution");
	}
	else
	{
		alert("You are at a mild risk of an overdose, please proceed with caution");
	}
	window.location.href = "#/app/dashboard";
    }

    $scope.submit = function () {
		var sum = 0;
		if(document.getElementById('male').checked)
		{
			if(document.getElementById('age').checked) { sum = sum +1; }
			sum = sum + Math.floor(parseInt(document.getElementById('pain').value)/3);
			if(document.getElementById('family1').checked) { sum = sum +3; }
			if(document.getElementById('family2').checked) { sum = sum +3; }
			if(document.getElementById('family3').checked) { sum = sum +4; }
			if(document.getElementById('personal1').checked) { sum = sum +3; }
			if(document.getElementById('personal2').checked) { sum = sum +4; }
			if(document.getElementById('personal3').checked) { sum = sum +5; }
			if(document.getElementById('personal4').checked) { sum = sum +0; }
			if(document.getElementById('personal5').checked) { sum = sum +2; }
			if(document.getElementById('personal6').checked) { sum = sum +1; }
		$scope.alertsum(sum);
		}
		else if(document.getElementById('female').checked)
		{
			if(document.getElementById('age').checked) { sum = sum +1; }
			sum = sum + Math.floor(parseInt(document.getElementById('pain').value)/3);
			if(document.getElementById('family1').checked) { sum = sum +1; }
			if(document.getElementById('family2').checked) { sum = sum +2; }
			if(document.getElementById('family3').checked) { sum = sum +4; }
			if(document.getElementById('personal1').checked) { sum = sum +3; }
			if(document.getElementById('personal2').checked) { sum = sum +4; }
			if(document.getElementById('personal3').checked) { sum = sum +5; }
			if(document.getElementById('personal4').checked) { sum = sum +3; }
			if(document.getElementById('personal5').checked) { sum = sum +2; }
			if(document.getElementById('personal6').checked) { sum = sum +1; }
			$scope.alertsum(sum);
		}
		else
		{
			alert("Press a gender please");
		}
        }; // End submit

    //$scope.initialForm();

});
