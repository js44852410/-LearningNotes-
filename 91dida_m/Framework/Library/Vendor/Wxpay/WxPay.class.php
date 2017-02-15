<?php
class WxPay
{
    public $order_sn = '';//商户订单号,注意要唯一！
    public $order_amount = '';//订单金额
    public $subject = "";//标题
    public $notify_url = "";//回调地址
    public $return_url = '';//扫码支付成功后回调地址
    public $return_url_error = '';
    
    private $site_url = '';
    private $pay_config = '';
    private $openid='';
    
    //在类初始化方法中，引入相关类库
    public function _initialize()
    {
        $this->site_url = (is_ssl() ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'];
        header("Content-type:text/html;charset=utf-8");
        vendor('Wxpay.WxPayConfig');
        vendor('Wxpay.WechatAuth');
        vendor('Wxpay.WechatJSAPI');
    }
    //判断是否是微信客户端打开
    private function is_weixin()
    {
        if (strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false) {
            return true;
        }
        return false;
    }

    //获取二维码信息或者公众号支付
    public function wxbuy($data)
    {
        if($data){
            $this->order_sn = $data['payment_number'];
            $this->order_amount = $data['grand_total'];
            $this->openid = isset($data['openid'])?$data['openid']:'';
            $this->subject = C('WEBSITE_CONFIG.config_website_name').'_订单';
        }
        if (empty($this->order_sn) || empty($this->order_amount) || empty($this->subject)) {
            $this->error('缺少参数');
        }
        if (empty($this->notify_url)) {
            $this->error('缺少异步通知回调地址');
        }
        $info = array(
            'notify_url' => $this->site_url.$this->notify_url,
            'order_sn' => $this->order_sn,
            'order_amount' => $this->order_amount,
            'subject' => $this->subject,
            'openid' => $this->openid
        );
        $order = $this->web_get_order_paynum($info);
        if($order['err_code']){
            return $order;
        }
        $reinfo['img_url'] = str_replace('dealer_manage', 'wx', $this->site_url .url('Public/qrcode',array('url'=>  base64_encode($order["code_url"])))) ;
        $reinfo['notify_url'] = $info["notify_url"];
        $reinfo['order_sn'] = $info["order_sn"];
        $reinfo['order_amount'] = $info["order_amount"];
        $reinfo['jsApiParameters'] = $order["jsApiParameters"];
//        $reinfo['success_page'] = $this->return_url;//SITE_URL . U('Wap/Pay/overwap', array("orderid" => $this->order_sn, "money" => $this->order_amount));//SITE_URL . "Wap/Pay/over";//wap端支付成功后跳转页面
//        $reinfo['error_page'] = $this->return_url_error;//SITE_URL . U('Wap/Pay/overerror', array("orderid" => $this->order_sn, "money" => $this->order_amount));//SITE_URL . "Wap/Pay/overerror";//wap端支付失败后跳转页面
        return $reinfo;
    }

    //获取微信端支付号信息
    public function web_get_order_paynum($info)
    {
        if ($info["openid"]) {
            vendor('Wxpay.WxPayJsApiPay');
        }
        vendor('Wxpay.WxPayApi');
        /*首先生成prepayid*/
        $input = new \WxPayUnifiedOrder();
        $input->SetBody(C('WEBSITE_CONFIG.config_website_name')."订单");//商品或支付单简要描述(必须填写)
        $input->SetAttach($info["order_sn"]);//附加数据，在查询API和支付通知中原样返回，该字段主要用于商户携带订单的自定义数据(不必填)
        $input->SetDetail("");//商品名称明细列表(不必填)
//        $input->SetOut_trade_no($info["order_sn"] . date('His'));//订单号(必须填写)
        $input->SetOut_trade_no($info["order_sn"].'_'.NOW_TIME);//订单号(必须填写)
        $input->SetTotal_fee($info['order_amount'] * 100);//订单金额(必须填写)
        $input->SetTime_start(date("YmdHis"));//交易起始时间(不必填)
        $input->SetTime_expire(date("YmdHis", time() + 240 * 3600));//交易结束时间10分钟之内不必填)
        $input->SetGoods_tag($info['subject']);//商品标记(不必填)
        $input->SetNotify_url($info['notify_url']);//回调URL(必须填写)
        if ($info["openid"]) {
            $input->SetTrade_type("JSAPI");
            $input->SetOpenid($info["openid"]);
        } else {
            $input->SetTrade_type("NATIVE");//交易类型(必须填写)
            $input->SetProduct_id($info['order_sn']);
        }
        $wxpayapi = new \WxPayApi();//获得订单的基本信息，包括prepayid
        $order = $wxpayapi->unifiedOrder($input);  var_dump($order);die();
        $wxpayapi = new \WxPayApi();//获得订单的基本信息，包括prepayid
        $order = $wxpayapi->unifiedOrder($input);
        if ($info["openid"]) {
            $jsapi = new \JsApiPay();
            $order["jsApiParameters"] = $jsapi->GetJsApiParameters($order);
        
        }
        return $order;
    }

    //微信异步通知页面
    public function success()
    {
        \Think\Log::write('进入微信回调处理');
        \Think\Log::write('异步回调数据为：'. $GLOBALS['HTTP_RAW_POST_DATA']);
        vendor('Wxpay.WxPayWebNotify');
        $notify = new \PayNotifyCallBack();
        $notify->Handle(false);
        $xml = $GLOBALS['HTTP_RAW_POST_DATA'];
        $data = $notify->FromXml($xml);
        $sign = $data['sign'];
        $is_sign = $notify->MakeSign();
        $get_sign = $notify->GetSign();
        \Think\Log::write('参数签名为：'.$is_sign );
        \Think\Log::write('get参数签名为：'.$get_sign );
        if($sign == $is_sign){
            \Think\Log::write('验签成功，开始进入订单处理：');
            $params = array(
                'total_fee'     => $data['total_fee']/100,      //订单价格（微信以分为单位）
                'out_trade_no'  => $data['attach'],   //原商户订单号（此系统为支付单号）
                'out_trade_order'   => $data['transaction_id']    //第三方交易流水号
            );
            $params['paymentModule'] = $_GET['payment_module'];
            
            $arr = array('orderes'=>$params,'paymentModule'=>$_GET['payment_module']);
            $this->_setParams('payment', 'sync_order',$arr, false);
            \Think\Log::write('订单处理结果：'.json_encode($this->response['info']));
            if($this->response['info']['errmsg']){
                return false;
            }
            echo 'SUCCESS';//通知微信支付成功
        }
        exit;
    }
}

?>