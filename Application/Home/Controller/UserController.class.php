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
        $salt=M('user')->field('salt')->where(['username'=>$username])->limit(1)->find();
        $salt['salt'] || returnAjax(0,'用户不存在');
        $res=M('user')->field('id')->where([
            'username'=>$username,
            'password'=>md5($password.$salt['salt'])
        ])->find();
        $res['id'] || returnAjax(0,'登录失败,账号或密码错误');
        session('user',$res['id']);
        returnAjax(1,'success',$res);
    }

    function reg(){
        $username = I('username');
        $password = I('password');
        $salt=M('user')->field('salt')->where(['username'=>$username])->limit(1)->find();
        $salt['salt'] && returnAjax(0,'该用户名已存在');
        $tt = time();
        $arr_insert = [
            'username'=>$username,
            'password'=>md5($password.$tt),
            'salt'=>$tt,
            'add_time'=>$tt
        ];
        M('user')->add($arr_insert);
        //die(M()->getLastSql());
        $res_id = M()->getLastInsID();
        $res_id || returnAjax(0,'注册失败');
        returnAjax(1,'success',$res_id);
    }
}
