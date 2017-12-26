<?php
namespace Home\Controller;
use Common\Controller\HomeBaseController;
class UserController extends HomeBaseController {

    // 第三方平台登录
    public function oauth_login(){
        $type=I('get.type');
        import("Org.ThinkSDK.ThinkOauth");
        $sdk=\ThinkOauth::getInstance($type);
        redirect($sdk->getRequestCodeURL());
    }

    // 第三方平台退出
    public function logout(){
        session('user',null);
        session('admin',null);
    }

    // 判断是否登录
    public function check_login(){
        if(isset($_SESSION['user']['id'])){
            echo 1;
        }else{
            echo 0;
        }
    }

    function login(){
        $username = I('username');
        $password = I('password');
        $salt=M('oauth_user')->field('salt')->where(['username'=>$username])->limit(1)->find();
        $salt['salt'] || returnAjax(0,'用户不存在');
        $res=M('oauth_user')->field('id')->where([
            'username'=>$username,
            'password'=>md5($password.$salt['salt'])
        ])->find();
        $res['id'] || returnAjax(0,'登录失败,账号或密码错误');
        session('user',$res['id']);
        returnAjax(1,'success',$res);
    }

}
