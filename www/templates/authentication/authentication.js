/**
 * Created by Justice on 11/1/2016.
 */
appControllers.controller('authCtrl', function ($scope, $mdToast, $mdDialog, $timeout, $mdSidenav, $ionicHistory, $state) {

    $scope.navigateTo = function (stateName) {
        $timeout(function () {
            $mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
                $state.go(stateName);
            }
        }, ($scope.isAndroid == false ? 300 : 0));
    };// End navigateTo.

    $scope.validateSignup = function() {
        if(!this.username || this.username == "") {
            showError("Username is required");
            return;
        }
        if(!this.password || this.password == "") {
            showError("Password is required");
            return;
        }
        if(!this.cpassword || this.cpassword != this.password) {
            showError("Passwords must match");
            return;
        }
        if(!this.email || this.email == "") {
            showError("Email is required");
            return;
        }
        if(!this.accept || this.accept == "") {
            showError("You must accept the terms and conditions");
            return;
        }
        $scope.navigateTo("app.selectUserType");
    };

    $scope.validateUserType = function() {
        if(!this.choice) {
            showError("Please select a user type");
            return;
        }
        $scope.navigateTo("app.dashboard");
    }

    $scope.validateLogin = function() {
        if(!this.username || this.username == "") {
            showError("Username is required");
            return;
        }
        if(!this.password || this.password == "") {
            showError("Password is required");
            return;
        }
        $scope.navigateTo("app.dashboard");
    }

    function showError(error) {
        $mdToast.show({
            controller: 'toastController',
            templateUrl: 'toast.html',
            hideDelay: 1200,
            position: 'top',
            locals: {
                displayOption: {
                    title: error
                }
            }
        });
    }

});