

var ajax_url = location.protocol+'//'+location.host+'/index.php';
$(function(){
    // 调整导航条hover的样式
    if($('.b-nav-mobile').css('display')=='block'){
        var widthLeft=getWidthLeft($('.b-nav-active'),false);
        $('.b-nav-mobile').css({
            'width': widthLeft['width'],
            'left': widthLeft['left']
        });
    }
    
    // 鼠标移入导航条的hover状态
    $('.b-nav-parent li').hover(function() {
        getWidthLeft($(this),true);
    }, function() {
        getWidthLeft($('.b-nav-active'),true);
    });

    // 设置文章页iframe宽度
    $('.b-article iframe').width('95%');
    // 返回顶部
    $(window).scroll(function(e) {
        //若滚动条离顶部大于200元素
        if($(window).scrollTop()>200){
            $('.go-top').show();
            $(".go-top").removeClass('animated rotateOut');
            $(".go-top").addClass('animated rotateIn');
        }else{
            $(".go-top").removeClass('animated rotateIn');
            $(".go-top").addClass('animated rotateOut');
        }
    });

    // 改变导航栏高度
    if(window.innerWidth>=768){
        $(window).scroll(function(e) {
            //若滚动条离顶部大于100元素
            if($(window).scrollTop()>100){
                $('#b-public-nav').stop().animate({'padding-top':'0px','padding-bottom':'0px'},100);
            }else{
                $('#b-public-nav').stop().animate({'padding-top':'5px','padding-bottom':'5px'},100);
            }
        });
    }
    // 为分页类增加响应式class
    $('.b-page .first,.num,.end').addClass('hidden-xs');
    $('.b-page .rows').addClass('hidden-xs');

    // 随言碎语js调整时间轴的高度
    $('.b-chat-middle').height($('.b-chat').height());
    // 随言碎语js调整气泡三角的top
    $('.b-arrows-right1,.b-arrows-right2').each(function(index, el) {
        $(el).css('top', $(el).parent('.b-chat-one').height()/2.5);
    });

    $.each($('.js-head-img'), function(index, val) {
        var img=$(val).attr('_src');
        $(val).attr('src', img);
    });

})

/**
 * 传递对象；获取left值和width
 * @param  {subject}  obj   html对象
 * @param  {Boolean} change  true获取left和宽；false改变left和宽；
 * @return {subject}         获取到的left和宽         
 */
function getWidthLeft(obj,change){
    var mobileLeft=obj.position().left;
    var mobileWidth=obj.width();
    var widthLeft={
        'left':mobileLeft,
        'width':mobileWidth
    }
    if(!change){
        return widthLeft;
    }
    $('.b-nav-mobile').stop().animate({'left':mobileLeft,'width':mobileWidth}, 300);
}

// 登录
function login(){
    $('#b-modal-login').modal('show');
    setCookie('this_url',window.location.href);
}

// 退出
function logout(){
    $.post(logoutUrl);
    setTimeout(function(){location.reload()},500);
}

// 点击返回顶部
function goTop(){
    $('body,html').animate({scrollTop:0},500);
    return false;
}

/**
 * 设置cookie
 * @param {string} name  键名
 * @param {string} value 键值
 * @param {integer} days cookie周期
 */
function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }else{
        var expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
}

// 获取cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// 删除cookie
function deleteCookie(name) {
    setCookie(name,"",-1);
}

/**
 * 记录当前选中的分类或者标签
 * @param  {string} category index：首页 cid：分类  tid：标签
 * @param  {integer} id      id
 * @return {boolean}         true 接着跳转
 */
function recordId(category,id){
    // 设置默认值为0
    setCookie('cid',0);
    setCookie('tid',0);
    setCookie('search_word',0);
    // 如果不是首页 则记录当前选中的分类或者标签
    if (category!='index' && category!='/') {
        setCookie(category,id);
    }
    return true;
}

/**************************************登陆*/
var CodeVal;
getCheck();
//获取验证码
function getCheck() {
    CodeVal = strRand();
    showCheck(CodeVal);
}
//显示验证码
function showCheck(a) {
    CodeVal = a;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 1000, 1000);
    ctx.font = "80px 'Hiragino Sans GB'";
    ctx.fillStyle = "#E8DFE8";
    ctx.fillText(a, 0, 100);
}

//随机字符串
function strRand() {
    var code = "";
    var codeLength = 4;
    var selectChar = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    for (var i = 0; i < codeLength; i++) {
        var charIndex = Math.floor(Math.random() * 60);
        if(typeof selectChar[charIndex]!= 'undefined') code += selectChar[charIndex];
    }
    if (code.length < codeLength) {
        code = strRand();
    }
    return code;
}

//登录
$('div#b-modal-login .login_fields__submit input').click(function () {

    var username = $('div#b-modal-login .login_fields__user input[name="login"]').val();
    var password = $('div#b-modal-login .login_fields__password input[name="pwd"]').val();
    var code = $('div#b-modal-login .login_fields__password input[name="code"]').val();
    var url = ajax_url+'/Home/User/login';
    if(username =='' || password =='') {
        layer.msg('请输入帐号密码');
        return;
    }
    if(code.toLowerCase() != CodeVal.toLowerCase()){
        layer.msg('验证码不正确!');
        return;
    }
    $.ajax({
        url:url,
        type:"post",
        data:{
            'username': username,
            'password':$.md5(password)
        },
        dataType:"json",
        success:function(data){
            if(data.code == 1){
                location.reload();
            }
            layer.msg(data.msg);
        },
        error:function(xmlHttpRequest,textStatus,errorThrown){
            alert(textStatus+"出错！"+errorThrown);
        }
    });
});

/****************************注册*/
// 注册
function reg(){
    $('#b-modal-reg').modal('show');
}

var RegCodeVal;
getRegCheck();
//获取验证码
function getRegCheck() {
    RegCodeVal = strRand();
    showRegCheck(RegCodeVal);
}
//显示验证码
function showRegCheck(a) {
    RegCodeVal = a;
    var c = document.getElementById("myCanvas_reg");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 1000, 1000);
    ctx.font = "80px 'Hiragino Sans GB'";
    ctx.fillStyle = "#E8DFE8";
    ctx.fillText(a, 0, 100);
}
//注册
$('div#b-modal-reg .login_fields__submit input').click(function () {

    var username = $('div#b-modal-reg .login_fields__user input[name="username"]').val();
    var password = $('div#b-modal-reg .login_fields__password input[name="pwd"]').val();
    var password2 = $('div#b-modal-reg .login_fields__password input[name="pwd2"]').val();
    var code = $('div#b-modal-reg .login_fields__password input[name="code"]').val();
    var url = ajax_url+'/Home/User/reg';
    if(username =='' || password =='') {
        layer.msg('请输入帐号密码');
        return;
    }
    if(password != password2){
        layer.msg('两次密码不一致');
        return;
    }
    if(code.toLowerCase() != RegCodeVal.toLowerCase()){
        layer.msg('验证码不正确!');
        return;
    }
    $.ajax({
        url:url,
        type:"post",
        data:{
            'username': username,
            'password':$.md5(password)
        },
        dataType:"json",
        success:function(data){
            if(data.code == 1){
                setTimeout(function () {
                    $('#b-modal-reg').modal('hide');
                    $('#b-modal-login').modal('show');
                    layer.msg('注册成功，请登录');
                },1000)
            }else{
                layer.msg(data.msg);
            }
        },
        error:function(xmlHttpRequest,textStatus,errorThrown){
            alert(textStatus+"出错！"+errorThrown);
        }
    });
});

/*************个人资料*/
function card(){
    $('#b-modal-card').modal('show');
}
//更新头像
$('.UserAvatarEditor-mask').click(function () {
    $('#file_imgHead').click();
});
$('#file_imgHead').change(function () {
    var url = ajax_url+'/Home/Index/changeHeadImg';
    var formddata = new FormData();
    formddata.append('file',$('#file_imgHead')[0].files[0]);
    $.ajax({
        url:url,
        type:"post",
        data: formddata,
        cache:false,
        processData:false,
        contentType:false,
        dataType:"json",
        success:function(data){
            layer.msg(data.msg);
        },
        error:function(xmlHttpRequest,textStatus,errorThrown){
            alert(textStatus+"出错！"+errorThrown);
        }
    });
});
//修改昵称
$('div#b-modal-card input.nickname').click(function () {
    $('div#b-modal-card input.nickname_update').show();
});
$('div#b-modal-card input.nickname_update').click(function () {
    var url = ajax_url+'/Home/Index/changeNickName';
    $.ajax({
        url:url,
        type:"post",
        data:{
            name:$('div#b-modal-card input.nickname').val()
        },
        dataType:"json",
        success:function(data){
            if(data.code == 1){
                $('div#b-modal-card input.nickname_update').hide();
            }
            layer.msg(data.msg);
        },
        error:function(xmlHttpRequest,textStatus,errorThrown){
            alert(textStatus+"出错！"+errorThrown);
        }
    });
});