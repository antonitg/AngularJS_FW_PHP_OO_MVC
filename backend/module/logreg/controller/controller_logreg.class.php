<?php
class controller_logreg
{
    function recover()
    {
        if (isset($_GET["param"])) {
            common::loadView('topPageLogreg.php', VIEW_PATH_LOGREG . 'recover.html');
        }
    }
    function setPasswdRecovered()
    {
        echo common::accessModel('logreg_model', 'setPasswdRecovered', [$_POST['token'], $_POST['passwd'], "supersecretshh"])->getResolve();
        
    }
    function list()
    {
        common::loadView('topPageLogreg.php', VIEW_PATH_LOGREG . 'logreg.html');
    }
    function register()
    {

        echo common::accessModel('logreg_model', 'register', ["supersecretshh",$_POST['uid'], $_POST['username'], $_POST['email'], $_POST['photo']])->getResolve();
    }
    function login()
    {
		
        echo common::accessModel('logreg_model', 'login', [$_POST['passwd'], "supersecretshh", $_POST['username']]);
    }
	function social()
    {
		//echo json_encode("test");
        echo common::accessModel('logreg_model', 'social', ["supersecretshh",$_POST['uid'],$_POST['username'],$_POST['email'],$_POST['photo']]);
    }
    function verify()
    {
		echo $_POST['token'];
        echo common::accessModel('logreg_model', 'verifyToken', $_POST['token'])->getResolve();

    }
    function sendRecoverEmail()
    {
        $result = common::accessModel('logreg_model', 'verifyUser', [$_POST['email']]);
        $email = [];
        if ($result != false) {
            $email = ['type' => 'recover', 'token' => $result['token'], 'toEmail' => $result['email'], 'fromEmail' => "support@loreipsumcars.com", 'inputMessage' => 'Recover password link: '];
            $sendedEmail = mail::setEmail($email);
        } // end_if
        if (!empty($sendedEmail['token'])) {
            echo common::accessModel('logreg_model', 'setRecoverToken', [$sendedEmail["token"], $sendedEmail["email"]])->getResolve();
            // echo json_encode($sendedEmail);
            // return;
        } else {
            echo json_encode("Fail");
        }
    }
    function sendVerifyEmail()
    {
        $result = common::accessModel('logreg_model', 'verifyUser', [$_POST['email']]);
        $email = [];
        if ($result != false) {
            $email = ['type' => 'verify', 'token' => $result['token'], 'toEmail' => $result['email'], 'fromEmail' => "support@loreipsumcars.com", 'inputMessage' => 'Verify link: '];
            $sendedEmail = mail::setEmail($email);
        } // end_if
        if (!empty($sendedEmail['token'])) {
            echo common::accessModel('logreg_model', 'setVerifyToken', [$sendedEmail["token"], $sendedEmail["email"]])->getResolve();
            // echo json_encode($sendedEmail);
            // return;
        } else {
            echo json_encode("Fail");
        } // end_if

    } //
}