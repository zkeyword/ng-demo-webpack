define(['../app'], function(app)
{
    app.controller('aboutViewController',
    [
        '$scope',

        function($scope)
        {
            $scope.page =
            {
                heading: 'About Us'
            };
        }
    ]);
});