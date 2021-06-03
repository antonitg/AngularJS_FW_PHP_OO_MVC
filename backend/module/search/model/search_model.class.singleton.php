<?php
//////
class search_model {
    private $bll;
    static $_instance;
    //////
    function __construct() {
        $this -> bll = search_bll::getInstance();
    }// end_construct

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance

    public function getBrandsSearch($condition) {
        return $this -> bll -> getBrandsSearch($condition);
    }
	public function getUser($args) {
        return $this -> bll -> getUser($args);
    }
    public function getAutocompleteSearch($args) {
        return $this -> bll -> getAutocompleteSearch($args[0], $args[1], $args[2]);
    }
}