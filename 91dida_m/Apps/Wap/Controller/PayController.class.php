<?php
/**
 * 支付总控
 */
namespace Wap\Controller;
use Common\Controller\CommonController;
class PayController extends CommonController
{
    /**
     * 选择支付方式
     */
    public function index() {
        $order_ids = I('order_ids');
        $arr = explode(',', $order_ids);
        session('order_ids',$arr);
        $data = array(
            'api'    => 'sales_order',
            'method' => 'order_payment',
            'order_ids' => $arr
        );
        
        $res = $this->fetch($data,false);
        $res = json_decode($res,true);
        $info = array();
        if($res['result'] == 'success') {
            $info = $res['info'];
            $info['order_ids'] = json_encode($arr);
        }
        $this->assign('payment',$info);
        $this->display('Website/pay');
    }

    /**
     * 支付宝支付
     */
    public function alipay()
    {
        $post = I('post.');
        $param = $this->getParams();
        $params = array_merge($post,$param);
        $params['api'] = 'payment';
        $params['method'] = 'get_alipay_no';

        $temp_str = '';
        if ($params && is_array($params))
        {
            foreach ($params AS $key => $value)
            {
                if(is_array($value))
                {
                    foreach($value as $k1=>$v1)
                    {
                        $temp_str .= '&' . $key.'['.$k1.']' . '=' . $v1;
                    }
                }else{
                    $temp_str .= '&' . $key . '=' . $value;
                }
            }
            $params = preg_replace('/^&/', '?', $temp_str);
        }
        $api_uri = C('API_URI');
        die(json_encode(array('result'=>'success','code'=>'0x0000','info'=>array('payurl'=>$api_uri.$params))));
    }

    /**
     * （待调试wap直接唤起支付宝客户端）
     */
    public function alipay_()
    {
        $data = array(
            'api'    => 'payment',
            'method' => 'get_wap_alipay_data',
        );
        $res = $this->fetch($data,false);
        $res = json_decode($res,true);

        $info = array();
        if($res['result'] == 'success')
        {
            $info = $res['info'];
        }else{
            #支付错误页面
        }
        $grandTotal = isset($info['grand_total']) ? $info['grand_total'] : 0.00;
        $payNo = isset($info['pay_no']) ? $info['pay_no'] : '';
        if(empty($payNo) || $grandTotal <= 0)
        {
            #支付错误页面
        }

        header("Content-type:text/html;charset=utf-8");
        vendor('Alipay.Corefunction');
        vendor('Alipay.Md5function');
        vendor('Alipay.Notify');
        vendor('Alipay.Submit');
        #支付宝配置
        $alipay_config = C('alipay');
        /**************************请求参数**************************/
        $payment_type = "1"; //支付类型 //必填，不能修改
        $notify_url = $alipay_config['notify_url']; //服务器异步通知页面路径
        $return_url = $alipay_config['return_url']; //页面跳转同步通知页面路径
        $seller_email = $alipay_config['seller_email']; //C('alipay.seller_email');//卖家支付宝帐户必填

        $out_trade_no   = $payNo ; //商户订单号，注意要唯一！
        $subject        = '商品购买—'.$payNo;   //订单名称 //必填
        $total_fee      = $grandTotal;   //付款金额  //必填
        $body           = ''; //订单描述
        $show_url       = '' ;   //商品展示地址
        $anti_phishing_key = "";//防钓鱼时间戳 //若要使用请调用类文件submit中的query_timestamp函数
        $exter_invoke_ip = get_client_ip(); //客户端的IP地址
        /****************************s********************************/

        #构造要请求的参数数组，无需改动
        $parameter = array(
            "service"       => "alipay.wap.create.direct.pay.by.user",//pc端此处为"alipay.wap.create.direct.pay.by.user"  --by wangcheng
            "partner"       => trim($alipay_config['partner']),
            "seller_id"     => trim($alipay_config['partner']),
            "payment_type"  => $payment_type,
            "notify_url"    => $notify_url,
            "return_url"    => $return_url,
            "seller_email"  => $seller_email,
            "out_trade_no"  => $out_trade_no,
            "subject"       => $subject,
            "total_fee"     => $total_fee,
            "body"          => $body,
            "show_url"      => $show_url,
            "anti_phishing_key" => $anti_phishing_key,
            "exter_invoke_ip" => $exter_invoke_ip,
            "_input_charset" => trim(strtolower($alipay_config['input_charset']))
        );
        $alipaySubmit = new \AlipaySubmit($alipay_config);
        $html_text = $alipaySubmit->buildRequestForm($parameter, "post", "确认");
        echo $html_text;exit;

    }

    /**
     * @功能：微信支付调用页面
     * @参数：
     * @author:duan
     * @时间：2016年11月11日16:10:57
     * */
    public function wxpay()
    {
        $order_ids=session('order_ids');
        if(empty($order_ids)){
            die(json_encode(array('result'=>'fail','code'=>'0xp002','info'=>array('errmsg'=>'当前页面已失效，请重新打开'))));
        }
        $data = array(
            'api'       => 'sales_order',
            'method'    => 'get_order_payment_infos',
            'order_ids' => $order_ids,
            'app_version'=> C('API_VERSION'),
            'client_role'=>'buyer'
        );
        $res = $this->fetch($data,false);
        $res = json_decode($res,true);
        if($res['result'] == 'success')
        {
            $order_pay_info = $res['info'];
        }else{
            die(json_encode($res));
        }
        $wxConfig = $array = array(
            'notify_url'    => (is_ssl() ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'].'/pay/wxpay_notify/',
            'return_url'    => url('/#/pay/success'),
        );
        $order_pay_info['ordsubject'] = '商品购买—'.$order_pay_info['payment_number'];
        define('WX_PAY_ISWEB','1');
        vendor('Wxpay.WxPay');
        vendor('Wxpay.WxPayJsApiPay');
        //①、获取用户openid
        $tools = new \JsApiPay();
        $order_pay_info['openid'] = $tools->GetOpenid();
        $wxpay=new \WxPay();
        $wxpay->set_conf($wxConfig);
        $wxinfo = $wxpay->wxbuy($order_pay_info);
        if($wxinfo['error']==1){
            die(json_encode(array('result'=>'fail','code'=>'0xp003','info'=>array('errmsg'=>$wxinfo['msg']))));
            $this->error($wxinfo['msg']);
        }
        $jsApiParameters=json_encode($wxinfo['msg']['jsApiParameters']);
//        die(json_encode(array('result'=>'fail','code'=>'0xp003','info'=>$jsApiParameters)));
        $this->assign('info',$order_pay_info);
        $this->assign('jsApiParameters',$jsApiParameters);
        $this->display('Website/wxpay');
    }
    /**
     * @功能：微信支付回调页面
     * @参数：
     * @author:duan
     * @时间：2016年11月15日15:12:09
     * */
    public function wxpay_notify(){
        //定义微信支付 为公共账号支付
        \Think\Log::write('987654321','WARN');
        \Think\Log::write(json_encode($_GET),'WARN');
        $_SESSION["WEB_APP_WXPAY"] = 1;
        vendor('Wxpay.WxPayWebNotify');
        $notify = new \PayNotifyCallBack();
        $notify->Handle(false);
        $xml = $GLOBALS['HTTP_RAW_POST_DATA'];
        $data = $notify->FromXml($xml);
        $sign = $data['sign'];
        $is_sign = $notify->MakeSign();
        \Think\Log::write($sign.'-'.$is_sign,'WARN');
        if($sign == $is_sign){
            $params = array(
                'total_fee'     => $data['total_fee']/100,      //订单价格（微信以分为单位）
                'out_trade_no'  => $data['attach'],   //原商户订单号（此系统为支付单号）
                'out_trade_order'   => 'wx'.$data['transaction_id']    //第三方交易流水号
            );
            $params['paymentModule'] = 'wxpay';

            $data = array(
                'api'           => 'payment',
                'method'        => 'sync_order',
                'orderes'       => $params,
                'paymentModule' => 'wxpay',
            );
            \Think\Log::write(json_encode($data),'WARN');
            \Think\Log::write('123456789','WARN');
            $this->fetch($data,false);
            if($this->response['info']['errmsg']){
                return false;
            }
            echo 'SUCCESS';//通知微信支付成功
        }
        exit;
    }

}