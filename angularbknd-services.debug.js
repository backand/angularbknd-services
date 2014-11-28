/*
 angularbknd-services v0.0.1 
 (c) Copyright 2014 Backand All rights reserved. https://backand.com 
 License: MIT
 */
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
;'use strict';
/**
 * @ngdoc overview
 * @name service.gridService
 */
angular.module('backAnd.data', ['ngResource'])
    .factory('dataListService', ['$resource', 'urlService', 
        function ($resource, urlService) {
        /**
         * @ngdoc service
         * @name service.gridService
         * @description get the grid data
         * @param {string} viewName, the name of the view or table from the database
         * @param {integer} pageSize, the number of rows in a page
         * @param {integer} pageNumber, the number of the page
         * @param {boolean} withSelectOptions, default false, if true then it gets the select options of each parent relation fields that is not an autocomplete field
         * @param {string} filter, a json array of {fieldName, operator, value}
         * @param {string} sort,  a json array of {fieldName, ascending or descending oreder}
         * @param {string} search,  a free text search
         */

	    return $resource(urlService.backandUrl + '/1/:dataType/data/:viewName?pageSize=:pageSize&pageNumber=:pageNumber', {
            dataType: 'view',
            viewName: '',
            pageSize: '',
            pageNumber: '',
            withSelectOptions: '',
            filter: '',
            sort: '',
            search: ''
        }, 
        {
            read: {
                method: 'GET',
                params: {
                    callback: 'JSON_CALLBACK'
                }
            }
        });
    }
    ])
.factory('dataItemService', ['$resource', 'urlService',
    function ($resource, urlService) {
        /**
         * @ngdoc service
         * @name service.gridViewDataItemService
         * @description get a single row data
         * @param {string} viewName, the name of the view or table from the database
         * @param {string} id, the primary key value of a row, if the primary key has more than one column then the value is a comma delimited string of the values with the order of the primary key columns order
         */


        return $resource(urlService.backandUrl + '/1/:dataType/data/:viewName/:id?:qs', {
                dataType: 'view',
                viewName: '',
                id: 'id',
                qs: ''
            },
            {
                read: {
                    method: 'GET',
                    params: {
                        callback: 'JSON_CALLBACK'
                    }
                },

                create: {
                    method: 'POST',
                    params: {
                        callback: 'JSON_CALLBACK'
                    }
                },

                update: {
                    method: 'PUT',
                    params: {
                        callback: 'JSON_CALLBACK'
                    }
                },

                delete: {
                    method: 'DELETE',
                    params: {
                        callback: 'JSON_CALLBACK'
                    }
                }
            });
    }



]);;'use strict';


angular.module('backAnd.services', [])

.value('urlService', {
	backandUrl: "https://api.backand.com:8080"
});
