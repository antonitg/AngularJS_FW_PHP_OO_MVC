<?php
//////
class db {
    //////
    static $_instance;
    //////
    public static function enable() {
        $host = 'localhost';  
        $user = "root";                     
        $pass = "";                             
        $dbname = "antoni_conc";
        $connection = mysqli_connect($host,$user,$pass,$dbname);
        //////
        if (!$connection) {
            echo mysqli_connect_error();
        }// end_if
        return $connection;
    }// end_enable

    public static function close($connection) {
        mysqli_close($connection);
    }// end_close
    
    public static function query() {
        if (!(self::$_instance instanceof querys)) {
            self::$_instance = new querys();
        }
        self::$_instance -> setQuery("");
        return self::$_instance;
    }// end_query
}// end_DB