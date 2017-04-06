<?php
/**
 * WAP站路径总控
 */
namespace Wap\Controller;
use Common\Controller\CommonController;
class WebsiteController extends CommonController
{
    protected function _initialize()
    {
        parent::_initialize();
        #微信接口的权限验证配置信息
        $wx = new \Common\Util\Wechat();
        $wx_config = $wx->jssdk_config();
        $this->assign('wx',$wx_config);
    }

    public function about()
    {
        $this->display();
    }

    /**
     * 商品描述详情（可供移动端调用）
     */
    public function goods_desc()
    {
        $id = I('get.id',0,'');
        $data = array(
            'api'    => 'catalog_product',
            'method' => 'get_desc',
            'id'     => $id,
        );
        $res = $this->fetch($data,false);
        $res = json_decode($res,true);
        $this->assign('content',$res['info']);
        $this->display();
    }

    /**
     * 店铺详情（可供移动端调用）
     */
    public function shop_info()
    {
        $id = I('get.id',0,'');
        $data = array(
            'api'    => 'customer',
            'method' => 'get_seller_item_tobuyer',
            'store_id'     => $id,
        );
        $res = $this->fetch($data,false);
        $res = json_decode($res,true);
        $this->assign('info',$res['info']);
        $this->display();
    }

    /**
     * 系统公告详情
     */
    public function notice()
    {
        $id = I('get.id',0,'');
        $user_type = I('get.user_type','buyer','trim');
        $data = array(
            'api'       => 'notice',
            'method'    => 'get_notice_by_id',
            'notice_id' => $id,
            'user_type' => $user_type,
        );
        $res = $this->fetch($data,false);
        $res = json_decode($res,true);
        $this->assign('info',$res['info']);
        $this->display();
    }

    /**
     * 注册协议(提供移动端使用)
     */
    public function agreement()
    {
        $role = I('get.role','buyer','trim');
        $data = array(
            'api'    => 'system',
            'method' => 'get_registration_agreement',
            'customer_type' => $role,
        );
        $res = $this->fetch($data,false);
        $res = json_decode($res,true);
        $this->assign('info',$res['info']);
        $this->display();
    }
}