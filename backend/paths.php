<?php
//////
define ('PROJECT', '/'); // Project Path
define ('SITE_ROOT', $_SERVER['DOCUMENT_ROOT'].PROJECT); // Site Root
define ('SITE_PATH', 'https://' . $_SERVER['HTTP_HOST'].PROJECT); // Site Path
define ('CSS_PATH', SITE_PATH . 'view/css/'); // Css Path
define ('JS_PATH', SITE_PATH . 'view/js/'); // JS Path
define ('IMG_PATH', SITE_PATH . 'view/img/'); // IMG Path  //
define ('PRODUCTION', true);
define ('MODEL_PATH', SITE_ROOT . 'backend/model/'); // Model Path
define ('MODULES_PATH', SITE_ROOT . 'backend/module/'); // Modules Path
define ('VIEW_PATH_INC', SITE_ROOT . 'view/inc/'); // View Path Inc
define ('RESOURCES', SITE_ROOT . 'backend/general/resources/'); // Resources Path
define ('UTILS', SITE_ROOT . 'backend/general/utils/'); // Utils Path
//////
// Contact
define ('MODEL_PATH_ABOUTUS', SITE_ROOT . 'module/aboutus/model/');
define ('VIEW_PATH_ABOUTUS', SITE_ROOT . 'module/aboutus/view/');

//Home
define ('VIEW_PATH_HOME', SITE_ROOT . 'backend/module/home/view/');
define ('MODEL_PATH_HOME', SITE_ROOT . 'backend/module/home/model/');
// --------------- Intentar hasta asi -----------------
//Shop
define ('VIEW_PATH_SHOP', SITE_ROOT . 'backend/module/shop/view/');
define ('MODEL_PATH_SHOP', SITE_ROOT . 'backend/module/shop/model/');

//Search
define ('MODEL_PATH_SEARCH', SITE_ROOT . 'backend/module/search/model/');

//Logreg
define('VIEW_PATH_LOGREG', SITE_ROOT . 'backend/module/logreg/view/');
define ('MODEL_PATH_LOGREG', SITE_ROOT . 'backend/module/logreg/model/');

//Menu
define('VIEW_PATH_MENU', SITE_ROOT . 'module/menu/view/');
define ('MODEL_PATH_MENU', SITE_ROOT . '/module/menu/model/');

//Profile
define('VIEW_PATH_PROFILE', SITE_ROOT . 'module/profile/view/');
define ('MODEL_PATH_PROFILE', SITE_ROOT . '/module/profile/model/model/');

// Friendly
define('URL_FRIENDLY', TRUE);
if (isset($_GET['op'])){
    if ($_GET['op'] == 'get') {
        echo json_encode(URL_FRIENDLY);
    }    
}
