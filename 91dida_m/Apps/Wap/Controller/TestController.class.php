<?php
/**
 * 支付总控
 */
namespace Wap\Controller;
use Common\Controller\CommonController;
class TestController extends CommonController
{
    /**
     * 微信支付
     */
    public function wxpay()
    {
        $order_ids = I('get.order_ids');
        $data = array(
            'api' => 'sales_order',
            'method' => 'get_order_payment_infos',
            'order_ids' => $order_ids,
        );
        $res = $this->fetch($data, false);
        $res = json_decode($res, true);
        $order_pay_info = array();
        if ($res['result'] == 'success') {
            $order_pay_info = $res['info'];
        }

        if(empty($order_pay_info))
        {

        }
        $order_pay_info['openid'] = $this->user->getOpenId();
        $wxConfig = $array = array(
            'pay_config' => '',
            'notify_url' => (is_ssl() ? 'https://' : 'http://') . 'beta.91dida.cn/buyer/Pay/notify/payment_module/wxpay.html',
            'return_url' => url('/#!/pay/success'),
        );
        $order_pay_info['ordsubject'] = '商品购买—' . $order_pay_info['payment_number'];
        de($order_pay_info);
        define('WX_PAY_ISWEB', '1');
        vendor('Wxpay.WxPay');
        $wxpay = new \WxPay();
        $wxpay->set_conf($wxConfig);
        $wxinfo = $wxpay->wxbuy($order_pay_info);
        if ($wxinfo['error'] == 1) {
            die(json_encode(array('result' => 'fail', 'code' => '0xp003', 'info' => array('errmsg' => $wxinfo['msg']))));
        }
        die(json_encode(array('result' => 'success', 'code' => '0x0000', 'info' => $wxinfo)));
    }
}