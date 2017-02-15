<?php
/**
 * 短信API接口
 */
namespace Common\Util;
class Sms {
	//企业ID $userid
	private $userid = '';
	//用户账号 $account
	private $account = 'jksc501';
	//用户密码 $password
	private $password = 'a123456';
	//签名
	private $signature="【中国酒业英雄联盟】";
	//接口url
	private $gateway="http://sh2.ipyy.com/sms.aspx";
	/**
	 * 构造函数
	 *
	 * @return void
	 */
	public function __construct(){
        $this->Sms();
    }

    /**
     * 构造函数
     *
     * @access  public
     * @return  void
     */
    function Sms()
    {

    }
    /**
     * 发送短信接口
     * @param array $mobile  手机号码  数组
     * @param string $message 短信内容 尽量保持70个中文
     * @param string $sendTime 定时发送时间   为空表示立即发送，定时发送格式2010-10-24 09:08:10
     * @param bool   $is_log  是否记录日志
     * return error 发送成功0 发送失败1 发送失败添加消息 error_message
     */
    function send($mobile,$message,$sendTime='',$is_log=true){

        if($is_log){
           $log= \Common\Util\Log::Init("./var/log/sms/".date('Y-m').'/'.date('d').'.log', 15);
        }
        $result = array('error'=>0,'msg'=>'');
        if(!is_array($mobile)){
            $mobile=array($mobile);
        }
        //验证消息
        if (empty($message)||strlen($message)>700) //5条短信
        {
            if($is_log){
                $log->ERROR('短信文字超过700字符或为空:'.$message."\r\n");
            }
            return array('error'=>1,'msg'=>'短信文字超过700字符或为空。');
        }
        foreach ($mobile as $val)
        {
            if (!$this->is_moblie($val))
            {
                if($is_log){
                    $log->ERROR('手机号码有误:'.$val."\r\n");
                }
                return array('error'=>1,'msg'=>'手机号码有误。');
            }
        }
        $mobile=implode(',', $mobile);
        $message=$this->signature.$message;
        $transport = new \Common\Util\Transport();
        $data=array(
            "action"=>"send",
            "userid"=>$this->userid,
            "account"=>$this->account,
            "password"=>$this->password,
            "mobile"=>$mobile,
            "content"=>$message,
            "sendTime"=>$sendTime
        );
        $result=$transport->request("http://sh2.ipyy.com/sms.aspx",$data, $method = 'POST', $my_header = '');
        if($result){
            $result=$result['body'];
        }
        $xml = simplexml_load_string($result);
        if($is_log){
            $log->INFO('发送短信返回结果:'.var_export($result,true)."\r\n");
        }
        if($xml->returnstatus=="Success"){
            return array('error'=>0,'msg'=>'发送成功');
        }else{
            return array('error'=>1,'msg'=>$xml->message);
        }
    }
    /**
     * 检测手机号码是否正确
     *
     */
    function is_moblie($moblie)
    {
        return  preg_match("/(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7}/", $moblie);
    }
}
?>