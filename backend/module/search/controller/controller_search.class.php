<?php
class controller_search {
    function getBrandsSearch() {
        echo common::accessModel('search_model', 'getBrandsSearch', $_POST['condition']) -> getResolve();
    }
    function getAutocompleteSearch() {
        echo common::accessModel('search_model', 'getAutocompleteSearch', [$_POST['keyword'],$_POST['condition'],$_POST['brand']]) -> getResolve();
    }
	function getUser() {
		//echo json_encode("Hola");
        echo common::accessModel('search_model', 'getUser', ["supersecretshh",$_POST['token']]);
    }
}