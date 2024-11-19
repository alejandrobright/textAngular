'use strict';

describe('ngBindHtml', function() {
  beforeEach(module('ngSanitize'));

  it('should set html', inject(function($rootScope, $compile) {
    var element = $compile('<div ng-bind-html="html"></div>')($rootScope);
    $rootScope.html = '<div unknown>hello</div>';
    $rootScope.$digest();
    // Use toLowerCase() instead of angular.lowercase
    expect(element.html().toLowerCase()).toEqual('<div>hello</div>');
  }));

  it('should reset html when value is null or undefined', inject(function($compile, $rootScope) {
    var element = $compile('<div ng-bind-html="html"></div>')($rootScope);

    angular.forEach([null, undefined, ''], function(val) {
      $rootScope.html = 'some val';
      $rootScope.$digest();
      // Use toLowerCase() instead of angular.lowercase
      expect(element.html().toLowerCase()).toEqual('some val');

      $rootScope.html = val;
      $rootScope.$digest();
      // Use toLowerCase() instead of angular.lowercase
      expect(element.html().toLowerCase()).toEqual('');
    });
  }));
});