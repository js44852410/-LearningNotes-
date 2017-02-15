<?php
/**
 * 支付宝支付
 */
$config['alipay'] = array(
    'partner'       =>  '2088521199125605',
    'key'           =>  'm9tq61rht1ktylcyus5k92z659id5lxr',
    'sign_type'     =>  strtoupper('MD5'),
    'input_charset' =>  strtolower('utf-8'),
    'payment_type'  =>  '1',
    'transport'     =>  is_ssl() ? 'https' : 'http',
    'server'        =>  'create_direct_pay_by_user',
//    'ali_public_key_path'=>dirname(__FILE__).'/PaymentPem/alipay/rsa_public_key.pem',
//    'private_key_path'  =>dirname(__FILE__).'/PaymentPem/alipay/rsa_private_key.pem',
    'cacert'        =>dirname(__FILE__).'\PaymentPem\alipay\cacert.pem',
    'notify_url'    => 'http://beta.91dida.cn/buyer/Pay/notify/payment_module/alipay.html',
    'return_url'    => '/#/pay/success'
);
return $config;