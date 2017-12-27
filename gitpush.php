<?php
/**
 * Created by PhpStorm.
 * User:ksj
 * Date: 2017/10/16
 * Time: 09:45
 */

if($name = $_GET['name']){
    exec("cd ".dirname(__FILE__)."/ && sudo git pull 2>&1");
    $str = file_get_contents("php://input");
    $tmp = json_decode($str,true);
    echo '用户'.$tmp['user_name'].'提交'.$tmp['head_commit']['message'].'成功';
}else{
    die('error');
}
//gitpush test