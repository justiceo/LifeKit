/**
 * Created by Justice on 11/1/2016.
 */
appControllers.controller('authCtrl', function ($scope, $mdToast, $mdDialog, $timeout, $mdSidenav, $ionicHistory, $state) {

    $scope.fbLogin = function() {
        $scope.navigateTo("app.dashboard");
    }

    // navigateTo is for navigate to other page
    // by using targetPage to be the destination state.
    // Parameter :
    // stateNames = target state to go
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

    $scope.login = function() {

        if(!$scope.username || !$scope.password) {
            console.log($scope.username);
            $mdToast.show({
                controller: 'toastController',
                templateUrl: 'toast.html',
                hideDelay: 1200,
                position: 'top',
                locals: {
                    displayOption: {
                        title: "Error authenticating you"
                    }
                }
            });
        }
        else {

        }
    }

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