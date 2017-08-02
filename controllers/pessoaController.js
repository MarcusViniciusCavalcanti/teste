"USE STRICT";
app.controller("pessoaController", function($scope, $location, dbService){
	//Listando
	$scope.listaProdutos = function(){
		dbService.runAsync("SELECT * FROM produto", function(data){
			$scope.produtos = data;
		});
	}

	//Salvando
	$scope.salvar = function(){
		if($scope.produto.id){
			//Editar
			var id = $scope.produto.id;
			delete $scope.produto.id;
			delete $scope.produto.$$hashKey; //Apaga elemento $$hashKey do objeto
			dbService.update('produtos', $scope.produto, {id: id}); //entidade, dados, where
		}else{
			//nova
			dbService.insert('produtos', $scope.produto); // entidade, dados
		}
		$scope.pessoa = {};
		$scope.listaProdutos();
		$('#modalPessoa').modal('hide');
	}

	//Abrindo para editar
	$scope.editar = function(dados){
		$scope.pessoa = dados;
		$('#modalPessoa').modal('show');
	}

	//Excluindo
	$scope.excluir = function(dados){
		if(confirm("Deseja realmente apagar o cadastro de "+dados.nome+"?")){
			dbService.update('produtos', {ativo:0}, {id: dados.id});
			$scope.listaProdutos();
		}
	}
});