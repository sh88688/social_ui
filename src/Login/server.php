<?php 
//  header("Access-Control-Allow-Origin: *");
// echo $_SERVER['REMOTE_ADDR'];

header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials: true');

session_start ();
		$_SESSION["USERNAME"] = "shivam";
        $_SESSION["LOGGED_IN_TIME"] = date("Y-m-d H:i:s");
        if ($_REQUEST['mode'] == 'logout'){

            if (ini_get("session.use_cookies")) {
                $params = session_get_cookie_params();
                setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
                );
            }
            session_destroy();
        }

        
?>