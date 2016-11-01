// For get mobile contact you have to install $cordovaContacts by running the following
// command in your cmd.exe for windows or terminal for mac:
// $ cd your_project_path
// $ ionic plugin remove cordova-plugin-contacts
// $ ionic plugin add cordova-plugin-contacts
//
// Learn more about $cordovaContacts :
// http://ngcordova.com/docs/plugins/contacts/
//
// For sent email you have to install $cordovaSocialSharing by running the following
// command in your cmd.exe for windows or terminal for mac:
// $ cd your_project_path
// $ ionic plugin remove nl.x-services.plugins.socialsharing
// $ ionic plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git
//
// Learn more about $cordovaSocialSharing :
// http://ngcordova.com/docs/plugins/socialSharing/
//
// For sent message you have to install $cordovaSMS by running the following
// command in your cmd.exe for windows or terminal for mac:
// $ cd your_project_path
// $ ionic plugin remove com.cordova.plugins.sms
// $ ionic plugin add https://github.com/cordova-sms/cordova-sms-plugin.git
//
// Learn more about $cordovaSMS :
// http://ngcordova.com/docs/plugins/sms/
//
// For using mobile calling you must go to yourProjectPath/config.xml
// and put this following code in the access area.
// <access origin="tel:*" launch-external="yes"/>
//
// Controller of contacts list page.
appControllers.controller('contactListCtrl', function ($scope, $http, $filter, $mdDialog, $timeout, $mdToast, $ionicModal, $state, $mdBottomSheet, $cordovaContacts) {

    // This function is the first activity in the controller.
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {
        // $scope.loading is for loading progress.
        $scope.loading = true;

        // $scope.contacts is store contacts data.
        $scope.contacts = [];

        // $scope.filterText  is the variable that use for searching.
        $scope.filterText = "";

        // To hide $mdBottomSheet
        $mdBottomSheet.cancel();
        // To hide $mdDialog
        $mdDialog.cancel();

        // The function for show/hide loading progress.
        $timeout(function () {
            if ($scope.isAndroid) {
                jQuery('#contact-list-loading-progress').show();
            }
            else {
                jQuery('#contact-list-loading-progress').fadeIn(700);
            }
        }, 400);

        $timeout(function () {
            // To get all contacts.
            $scope.getContactList(true);
        }, 2000);
    }; // End initialForm.

    // callTo is for using mobile calling.
    // Parameter :
    // number = number that going to call.
    $scope.callTo = function (number) {
        window.open("tel:" + number);
    }// End callTo.

    // create new contact
    $scope.createContact = function(){}

    // getContactList is for get all contacts from mobile.
    // Parameter :
    // IsInit(bool) = for  stop loading progress.
    $scope.getContactList = function (isInit) {

        // options for get contacts.
        var options = {multiple: true};

      $timeout(function () {
        //get product list from json  at path: www/app-data/contact-list.json
        $http.get('app-data/contact-list.json')
          .success(function (sampleList) {
            // Success retrieve data.
            // Store user data to $scope.productList.
            for (var contact = 0; contact < sampleList.length; contact++) {
              $scope.contacts.push(sampleList[contact]);
            }
            // To stop loading progress.
            $scope.$broadcast('scroll.infiniteScrollComplete');
          });
      }, 2000);

      // To stop loading progress.
      if (isInit) {

          $timeout(function () {
              $scope.loading = false;
              jQuery('#contact-list-loading-progress').hide();
          }, 2000);
      }

        // Calling $cordovaContacts.find to get all contacts.
        // Parameter :
        // options = options for get contacts.
        // $cordovaContacts.find(options).then(
        //     function (contactList) {
        //         if(contactList.isEmpty()){
        //           $timeout(function () {
        //             //get product list from json  at path: www/app-data/contact-list.json
        //             $http.get('app-data/contact-list.json')
        //               .success(function (sampleList) {
        //                 // Success retrieve data.
        //                 // Store user data to $scope.productList.
        //                 for (var contact = 0; contact < sampleList.length; contact++) {
        //                   $scope.contacts.push(sampleList[contact]);
        //                 }
        //                 // To stop loading progress.
        //                 $scope.$broadcast('scroll.infiniteScrollComplete');
        //               });
        //           }, 2000);
        //         } else {
        //             // Success retrieve data from mobile contact.
        //             // It will return all contacts then store it in to $scope.contacts
        //             $scope.contacts = contactList;
        //         }
        //
        //
        //         // To stop loading progress.
        //         if (isInit) {
        //
        //             $timeout(function () {
        //                 $scope.loading = false;
        //                 jQuery('#contact-list-loading-progress').hide();
        //             }, 2000);
        //         }
        //     },
        //     function () {
        //         // Error retrieve data from mobile contact.
        //         console.log("contact is error");
        //     });
    }; // End getcontactList.

    // deletecontact is for delete contact.
    // contact(object) = contact object that user want to delete.
    // $event(object) = position of control that user tap.
    $scope.deletecontact = function (contact, $event) {
        //mdBottomSheet.hide() use for hide bottom sheet.
        $mdBottomSheet.hide();

        //mdDialog.show use for show alert box for Confirm to remove contact.
        $mdDialog.show({
            controller: 'DialogController',
            templateUrl: 'confirm-dialog.html',
            targetEvent: $event,
            locals: {
                displayOption: {
                    title: "Confirm to remove contact?",
                    content: "Data will remove from contact.",
                    ok: "Confirm",
                    cancel: "Close"
                }
            }
        }).then(function () {
            // For confirm button to remove all contact.
                // remove contact by calling $cordovaContacts.remove.
                try {
                    $cordovaContacts.remove(contact).then(function (result) {
                    }, function (error) {
                        console.log(error);
                    });

                    // set filterText to empty for searching contact.
                    $scope.filterText = "";

                    // Refresh contact page.
                    $scope.getcontactList(false);

                    // Showing toast for contact Removed !.
                    $mdToast.show({
                        controller: 'toastController',
                        templateUrl: 'toast.html',
                        hideDelay: 400,
                        position: 'top',
                        locals: {
                            displayOption: {
                                title: "contact Removed !"
                            }
                        }
                    });
                }
                catch (e) {
                    // remove error.
                    // Showing toast for unable to remove contact.
                    $mdToast.show({
                        controller: 'toastController',
                        templateUrl: 'toast.html',
                        hideDelay: 800,
                        position: 'top',
                        locals: {
                            displayOption: {
                                title: window.globalVariable.message.errorMessage
                            }
                        }
                    });
                }
            }
            , function () {
                // For cancel button to remove data.
            });
    };// End deletecontact.

    // navigateTo is for navigate to other page
    // by using targetPage to be the destination page
    // and sending objectData to the destination page.
    // Parameter :
    // targetPage = destination page.
    // objectData = object that will sent to destination page.
    $scope.navigateTo = function (targetPage, objectData) {

        $state.go(targetPage, {
            contactDetail: objectData,
            actionDelete: (objectData == null ? false : true)
        });
    }; // End navigateTo.

    $scope.initialForm();

});// End of contact list controller.

// Controller of contacts detail page.
appControllers.controller('contactDetailCtrl', function ($mdBottomSheet, $timeout, $mdToast, $scope, $stateParams
        , $filter, $mdDialog, $ionicHistory, $cordovaContacts, $cordovaSms, $cordovaSocialSharing) {

        // This function is the first activity in the controller.
        // It will initial all variable data and let the function works when page load.
        $scope.initialForm = function () {
            //$scope.disableSaveBtn is  the variable for setting disable or enable the save button.
            $scope.disableSaveBtn = false;

            //$scope.actionDelete is the variable for allow or not allow to delete data.
            // It will allow to delete data when have data in the mobile contact.
            // $stateParams.actionDelete(bool) = status that pass from contact list page.
            $scope.actionDelete = $stateParams.actionDelete;

            //$scope.contact is the variable that store contact data.
            // $stateParams.contactDetail = contact data that pass from contact list page.
            $scope.contact = $stateParams.contactDetail;

            // For initial temp contact data in case of add new contact.
            if ($scope.actionDelete == false) {
                $scope.contact = {
                    "name": {
                        givenName: ""
                    },
                    "phoneNumbers": [{
                        id: 0,
                        pref: false,
                        type: "mobile",
                        value: ""
                    }],
                    "emails": [{
                        id: 0,
                        pref: false,
                        type: "home",
                        value: ""
                    }]
                };
            }// End initial temp contact data.

            // If contact don't have phone number it will create a blank array for text box
            // for user to input there number.
            if ($scope.contact.phoneNumbers == null) {
                $scope.addNumber();
            }

            // If contact don't have email it will create a blank array of text box
            // for user to input there email.
            if ($scope.contact.emails == null) {
                $scope.addMail();
            }
        }; // End initialForm.

        // addNumber for create a blank array of text box for user to input there number.
        $scope.addNumber = function () {

            if ($scope.contact.phoneNumbers == null) {
                $scope.contact.phoneNumbers = [{value: ""}];
            }
            else {
                $scope.contact.phoneNumbers.push({value: ""});
            }
            $timeout(function () {
                // To hide $mdBottomSheet
                $mdBottomSheet.hide();
                // To hide $mdDialog
                $mdDialog.hide();

            }, 400);

        };// End addNumber.

        // addMail for create a blank array of text box for user to input there email.
        $scope.addMail = function () {

            if ($scope.contact.emails == null) {
                $scope.contact.emails = [{value: ""}];
            }
            else {
                $scope.contact.emails.push({value: ""});
            }

            $timeout(function () {
                // To hide $mdBottomSheet
                $mdBottomSheet.hide();
                // To hide $mdDialog
                $mdDialog.hide();

            }, 400);
        };// End addMail.

        // savecontact for saving contact
        // Parameter :
        // contact(object) = contact object that presenting on the view.
        // $event(object) = position of control that user tap.
        $scope.savecontact = function (contact, $event) {
            // To hide $mdBottomSheet
            $mdBottomSheet.hide();
             // tempPhoneNumbers is  array of temporary phone number.
            var tempPhoneNumbers = [];

            // Create new object by cloning object that present on the view.
            // For prepare data to save.
            angular.copy($scope.contact.phoneNumbers, tempPhoneNumbers);

            // To packing array of temporary phone number to save to contact.
            for (var index = (tempPhoneNumbers.length - 1); index > -1; index--) {

                if (tempPhoneNumbers[index].value == "") {
                    $scope.contact.phoneNumbers.splice(index, 1);
                }
            }
            // tempMail is  temporary  array of email.
            var tempMail = [];

            // Create new object by cloning object that present on the view.
            // For prepare data to save.
            angular.copy($scope.contact.emails, tempMail);

            // To packing  array of temporary email to save to contact.
            for (var index = (tempMail.length - 1); index > -1; index--) {

                if (tempMail[index].value == "") {
                    $scope.contact.emails.splice(index, 1);
                }
            }

            //mdDialog.show use for show alert box for Confirm to save data.
            $mdDialog.show({
                controller: 'DialogController',
                templateUrl: 'confirm-dialog.html',
                targetEvent: $event,
                locals: {
                    displayOption: {
                        title: "Confirm to save contact?",
                        content: "Data will save to mobile contact.",
                        ok: "Confirm",
                        cancel: "Close"
                    }
                }
            }).then(function () {
                 // For confirm button to save data.
                try {
                    // Save contact to mobile contact by calling $cordovaContacts.save(contact)
                      $cordovaContacts.save(contact).then(function (result) {
                        }, function (error) {
                            console.log(error);
                        });
                    // Showing toast for save data is success.
                    $mdToast.show({
                        controller: 'toastController',
                        templateUrl: 'toast.html',
                        hideDelay: 400,
                        position: 'top',
                        locals: {
                            displayOption: {
                                title: "contact Saved !"
                            }
                        }
                    });

                    // After save success it will navigate back to contact list page.
                    $timeout(function () {
                        $ionicHistory.goBack();
                    }, 800);
                }
                catch (e) {
                    // Showing toast for unable to save data.
                    $mdToast.show({
                        controller: 'toastController',
                        templateUrl: 'toast.html',
                        hideDelay: 800,
                        position: 'top',
                        locals: {
                            displayOption: {
                                title: window.globalVariable.message.errorMessage
                            }
                        }
                    });
                }

            }, function () {
                // For cancel button to save data.
            });// End alert box.
        };// End savecontact.

        // deletecontact for delete contact
        // Parameter :
        // contact(object) = contact object that presenting on the view.
        // $event(object) = position of control that user tap.
        $scope.deletecontact = function (contact, $event) {
            //mdBottomSheet.hide() use for hide bottom sheet.
            $mdBottomSheet.hide();

            //mdDialog.show use for show alert box for Confirm to remove contact.
            $mdDialog.show({
                controller: 'DialogController',
                templateUrl: 'confirm-dialog.html',
                targetEvent: $event,
                locals: {
                    displayOption: {
                        title: "Confirm to remove contact?",
                        content: "Data will remove from Contact.",
                        ok: "Confirm",
                        cancel: "Close"
                    }
                }
            }).then(function () {
                 // For confirm button to remove contact.
                try {
                    // remove contact by calling $cordovaContacts.remove.
                    $cordovaContacts.remove(contact).then(function (result) {
                    }, function (error) {
                        console.log(error);
                    });
                    // After remove success it will navigate back to contact list.
                    $ionicHistory.goBack();
                } catch (e) {
                    //// Showing toast for unable to remove data.
                    $mdToast.show({
                        controller: 'toastController',
                        templateUrl: 'toast.html',
                        hideDelay: 800,
                        position: 'top',
                        locals: {
                            displayOption: {
                                title: window.globalVariable.message.errorMessage
                            }
                        }
                    });
                } //End showing toast.

            }, function () {
                // For cancel button to remove data.
            });

        };// End deletecontact.

        // validateRequiredField is for validate the required field.
        // Parameter :
        // contactForm(object) = contact object that presenting on the view.
        $scope.validateRequiredField = function (contactForm) {

            return ((typeof contactForm.name.givenName) == "undefined" ) || (contactForm.name.givenName.length == 0);
        };// End validate the required field.

        // showListBottomSheet is for showing the bottom sheet.
        // Parameter :
        // $event(object) = position of control that user tap.
        // contactForm(object) = contact object that presenting on the view.
        $scope.showListBottomSheet = function ($event, contactForm) {
            $scope.disableSaveBtn = $scope.validateRequiredField(contactForm);
            $mdBottomSheet.show({
                templateUrl: 'contact-actions-template.html',
                targetEvent: $event,
                scope: $scope.$new(false),
            });
        };// End showing the bottom sheet.

        // callTo is for using mobile calling.
        // Parameter :
        // number = number that going to call
        $scope.callTo = function (number) {
            window.open("tel:" + number);
        }// End callTo.

        // sentEmail is for send email by calling $cordovaSocialSharing.
        // Parameter :
        // email = email of receiver.
        $scope.sentEmail = function (email) {
            $cordovaSocialSharing.shareViaEmail(" ", " ", email, "", "", "");
            // format of sent email by using $cordovaSocialSharing is :
            //$cordovaSocialSharing.shareViaEmail(message, subject, toArr, ccArr, bccArr,file)
            // toArr, ccArr and bccArr must be an array, file can be either null, string or array.
        }; // End sentEmail.

        // sentSms is for send message by calling $cordovaSms.
        // Parameter :
        // phoneNumber = number of sending message
        $scope.sentSms = function (numbers) {
            //config options to sent message
            var options = {
                replaceLineBreaks: false, // true to replace \n by a new line, false by default.
                android: {
                    intent: 'INTENT' // send SMS with the native android SMS messaging
                    //intent: '' // send SMS without open any other app.
                }
            };
            // calling $cordovaSms to sent message.
            $cordovaSms.send(numbers, " ", options);
        };// End sentSms.
        $scope.initialForm();

});// End of contact detail controller.
