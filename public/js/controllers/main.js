angular.module('meus-contatos')
    .controller('MainController', function ($scope, contatoService) {

        $scope.contato = new contatoService();

        $scope.contatos = [];

        function buscarTodos() {
            contatoService.query(
                function (contatos) {
                   $scope.contatos = contatos; 
                },

                function (erro) {
                    console.log(erro);
                }
            );
        }

        buscarTodos();

        $scope.salvar = function () {
            $scope.contato.id > 0 ? atualizar() : novo();
        };

        function novo() {

            console.log($scope.contato);

            $scope.contato.$save().then(function () {
                $scope.contato = new contatoService();
                buscarTodos();
            }).catch( function (erro) {
                console.log(erro);
            });

        };

        function atualizar() {

            $scope.contato.$update({params: $scope.contato.id},
                function () {
                    $scope.contato = new contatoService();
                    buscarTodos();
                },

                function (erro) {
                    console.log(erro);
                }
            );

        };

        $scope.edit = function (contato) {
            $scope.contato = contato;
        };

        $scope.remove = function (contato) {

            if (confirm('Você têm certeza que deseja excluir?')) {
                contatoService.delete({params: contato.id},
                    function () {
                        buscarTodos();
                    },

                    function (erro) {
                        console.log(erro);
                    });
            }

        };

    });