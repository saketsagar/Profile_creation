var app = angular.module("registration", []);
  app.controller("registrationCtrl", function($scope, $http) {
    $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
    $scope.text = 'enter email';
    $scope.word = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
  $scope.user = {};
  var obj=$scope.user;

  $scope.registerUser = function() {
    var obj1=JSON.stringify(obj);
    //obj.toString();
    console.log(obj1);
    var password = document.getElementById("inputpass").value;
    var confirmPassword = document.getElementById("inputcpass").value;
    if (password != confirmPassword) {
        alert("Passwords do not match.");
    }
    else{
  $http({
      method  : 'POST',
      url     : 'http://127.0.0.1:5000/saveUserDetails',
      data    : obj1,
      dataType: 'json',
      headers : {"Content-Type": "application/json"}
  }).then(function(resp) {
  $scope.content = resp;
  console.log(resp);
  alert(resp.data);
  //To check errors
  if (resp.errors) {
      $scope.errorEId = resp.errors.id;
      $scope.errorName = resp.errors.name;
      $scope.errorPassword = resp.errors.pass;
      $scope.errorEmail = resp.errors.email;
      $scope.errorPhone = resp.errors.phone;
      $scope.errorSkills = resp.errors.skills;
      $scope.errorDesignation = resp.errors.designation;
  }
  else {
      $scope.message = resp.data;
      console.log("Registered successfully!");
      alert(resp.data);
  }
});
}
//window.location="admin_dashboard.html";
};

$scope.redirect = function(){
window.location = "admin_dashboard.html";
}
});
