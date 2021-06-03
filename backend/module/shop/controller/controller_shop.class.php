<?php
header('Content-Type: text/html');
class controller_shop {

    function getFiltersSearch() {
        $info = json_decode($_POST['objenv'], true);
	
		
        echo common::accessModel('shop_model', 'getFiltersSearch',["supersecretshh",$info['token'],$info['keyword'], $info['brand'], $info['condition'], $info['minprice'], $info['maxprice'], $info['showing'], $info['page']]) -> getResolve();
    }
    function getPagination() {
        $info = json_decode($_POST['objenv'], true);
        echo common::accessModel('shop_model', 'getPagination', [$info['keyword'],$info['brand'],$info['condition'],$info['minprice'],$info['maxprice']]) -> getResolve();
    }
    function getMapShop() {
        echo common::accessModel('shop_model', 'getMapShop', [$_POST['lat'],$_POST['lon']]) -> getResolve();
    }
    function getSearchResults() {
        echo common::accessModel('shop_model', 'getSearchResults', [$_POST['keyword']]) -> getResolve();
    }
    function getDetails() {
        echo common::accessModel('shop_model', 'getDetails', [$_POST['registration']]) -> getResolve();
    }
    function loadFilters() {
        echo common::accessModel('shop_model', 'loadFilters') -> getResolve();
    }
    function addView() {
        echo common::accessModel('shop_model', 'addView', [$_POST['registration']]) -> getResolve();
    }
    function getCart() {
        echo common::accessModel('shop_model', 'getCart', ["supersecretshh",$_POST['token']]) -> getResolve();
    }
    function addItemCart() {
        echo common::accessModel('shop_model', 'addItemCart', ["supersecretshh",$_POST['token'], $_POST['registration']]) -> getResolve();
    }
    function rmItemCart() {
        echo common::accessModel('shop_model', 'rmItemCart', ["supersecretshh",$_POST['token'], $_POST['registration']]) -> getResolve();
    }
    function addItemFav() {
        echo common::accessModel('shop_model', 'addItemFav', ["supersecretshh",$_POST['token'], $_POST['registration']]) -> getResolve();
    }
    function rmItemFav() {
        echo common::accessModel('shop_model', 'rmItemFav', ["supersecretshh",$_POST['token'], $_POST['registration']]) -> getResolve();
    }
    function addItemIns() {
        echo common::accessModel('shop_model', 'addItemIns', ["supersecretshh",$_POST['token'], $_POST['registration']]) -> getResolve();
    }
    function rmItemIns() {
        echo common::accessModel('shop_model', 'rmItemIns', ["supersecretshh",$_POST['token'], $_POST['registration']]) -> getResolve();
    }
	function checkout() {
        echo common::accessModel('shop_model', 'checkout', ["supersecretshh",$_POST['token']]) -> getResolve();
    }
}