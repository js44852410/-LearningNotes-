<?php
//微信公共账号设置
$config['WX_SET']= array(
    'AppID' =>'wx5ec72aaad370bf53',//	AppID(应用ID)
    'AppSecret' =>'3280d37605e9f4c4ebd5f2f0da049fe8',// AppSecret(应用密钥)
    'MCHID' =>'1356931302',//	微信支付商户号
    'KEY' =>'7c06f70573db4dd0b2ea8de294772add',//AppSecret(应用密钥)
    'SSLCERT_PATH' => __ROOT__.'/Apps/Common/Conf/PaymentPem/wxpay/webcert/apiclient_cert.pem',
    'SSLKEY_PATH' => __ROOT__.'/Apps/Common/Conf/PaymentPem/wxpay/webcert/apiclient_key.pem'
);
$config['WEBSITE_CONFIG']['config_website_name'] = '邸达电商';
return $config;
