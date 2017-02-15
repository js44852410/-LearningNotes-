<?php
/**
 * WAP站路径总控
 */
namespace Wap\Controller;
use Common\Controller\CommonController;
class IndexController extends CommonController
{
    protected function _initialize()
    {
        parent::_initialize();
        $this->assign('isLogin',$this->user->userIsLogin());
        #用户资料的审核状态，为空时代表用户未登录
        $userSessoion = session('user_session');
        $status = isset($userSessoion['review_status']) ? $userSessoion['review_status'] : '';
        $denied_reason = isset($userSessoion['note']) ? $userSessoion['note'] : '';
        $this->assign('deniedReason',$denied_reason);
        $this->assign('reviewStatus',$status);
    }

    public function index()
    {

        #微信接口的权限验证配置信息
        $wx = new \Common\Util\Wechat();
        $wx_config = $wx->jssdk_config();
        $this->assign('wx',$wx_config);

        $data = array(
            'api'    => 'app',
            'method' => 'home',
        );
        $res = $this->fetch($data,false);
        $res = json_decode($res,true);
        $info = array();

        // 获取购物车数量
        $cartNum = array(
            'api'    => 'checkout_cart',
            'method' => 'get_cart_num',
        );
        $cartRes = $this->fetch($cartNum,false);
        $cartRes = json_decode($cartRes,true);

        if($res['result'] == 'success')
        {
            $info = $res['info'];
        }
        if ($cartRes['result'] == 'success') {
            $info['cart_num'] = $cartRes['info'];
        }
        $this->assign('items',$info);
        $this->display();
    }

    public function app()
    {

        #微信接口的权限验证配置信息
        $wx = new \Common\Util\Wechat();
        $wx_config = $wx->jssdk_config();
        $this->assign('wx',$wx_config);

        $data = array(
            'api'    => 'app',
            'method' => 'home',
        );
        $res = $this->fetch($data,false);
        $res = json_decode($res,true);

        if($res['result'] == 'success')
        {
            $this->assign('items', $res['info']);
        }
        $this->display();
    }

    public function app_bac()
        {

            #微信接口的权限验证配置信息
            $wx = new \Common\Util\Wechat();
            $wx_config = $wx->jssdk_config();
            $this->assign('wx',$wx_config);

            $data = array(
                'api'    => 'app',
                'method' => 'home',
            );
            $res = $this->fetch($data,false);
            $res = json_decode($res,true);

            if($res['result'] == 'success')
            {
                $this->assign('items', $res['info']);
            }
            $this->display();
        }

    public function vue2()
    {

        #微信接口的权限验证配置信息
        $wx = new \Common\Util\Wechat();
        $wx_config = $wx->jssdk_config();
        $this->assign('wx',$wx_config);

        $data = array(
            'api'    => 'app',
            'method' => 'home',
        );
        $res = $this->fetch($data,false);
        $res = json_decode($res,true);
        $info = array();

        // 获取购物车数量
        $cartNum = array(
            'api'    => 'checkout_cart',
            'method' => 'get_cart_num',
        );
        $cartRes = $this->fetch($cartNum,false);
        $cartRes = json_decode($cartRes,true);

        if($res['result'] == 'success')
        {
            $info = $res['info'];
        }
        if ($cartRes['result'] == 'success') {
            $info['cart_num'] = $cartRes['info'];
        }
        $this->assign('items',$info);
        $this->display();
    }
}
