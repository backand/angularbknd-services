'use strict';

angular.module('backAnd.auth', ['ngStorage'])
  .service('authService', ['$http', '$localStorage', 'urlService', function($http, $localStorage, urlService) {

        var self = this;

        return ({

            signIn: function (userName, password, appname, successCallback, errorCallback) {
                var request = $http({
                    method: 'POST',
                    url: urlService.backandUrl  + '/token',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: {
                        grant_type: 'password',
                        username: userName,
                        password: password,
                        appname: appname
                    }
                });
                request.success(function (data, status, headers, config) {
                    var token = data.token_type + ' ' + data.access_token;
                    $http.defaults.headers.common['Authorization'] = token;
                    $localStorage.Authorization = token;
                    successCallback(data, status, headers, config);
                });
                request.error(function (data, status, headers, config) {
                    errorCallback(data, status, headers, config);
                });

            },

            signOut: function() {
                delete $http.defaults.headers.common.Authorization;
                delete $localStorage.Authorization;
            },

            isSignedIn: function() {
                if ($localStorage.Authorization){
                    $http.defaults.headers.common['Authorization'] = $localStorage.Authorization;
                    return true;
                }
                else{
                    return false;
                }
            }

        });

}]);
