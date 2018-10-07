angular.module('meus-contatos')
    .factory('contatoService', ['$resource', function ($resource) {

        return $resource($SERVICES_CONTEXT + 'contacts/:params', {}, {
            update: {
                method: "PUT"
            }
        });

    }]);