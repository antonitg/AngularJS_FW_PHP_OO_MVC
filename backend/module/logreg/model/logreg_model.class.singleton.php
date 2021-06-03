<?php
class logreg_model {
    private $bll;
    static $_instance;
    //////
    function __construct() {
        $this -> bll = logreg_bll::getInstance();
    }// end_construct

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance

    public function login($args) {
 		return $this -> bll -> login($args);
    }

	public function social($args) {

		return $this -> bll -> social($args);
    }
    public function register($args) {
        return $this -> bll -> register($args);
    }
    public function verifyUser($args) {
        return $this -> bll -> verifyUser($args);
    }
    public function setVerifyToken($args) {
        return $this -> bll -> setVerifyToken($args);
    }
    public function verifyToken($token) {
        return $this -> bll -> verifyToken($token);
    }
    public function setRecoverToken($args) {
        return $this -> bll -> setRecoverToken($args);
    }
    public function recoverToken($token) {
        return $this -> bll -> verifyToken($token);
    }
    public function setPasswdRecovered($args) {
        return $this -> bll -> recoverToken($args);
    }
    
}