<?php
/**
 * API 数据格式化
 * @author Caokoo
 */
namespace Common\Util;

class Response{
    const STATUS_FAIL = 'fail';
    const STATUS_SUCCESS = 'success';
    const ERROR_0x0001 = 'Invalid API version (System)';
    const ERROR_0x0002 = 'Time error over 10min (System)';
    const ERROR_0x0003 = 'Invalid encryption method (System)';
    const ERROR_0x0004 = 'Invalid response format (System)';
    const ERROR_0x0005 = 'Invalid signature (System)';
    const ERROR_0xFFFF = 'Unknow error';
    const SHOPPING_CART = 'shopping_cart';
    const LOGIN = 'login';
    const CHECKOUT_REVIEW = 'checkout_review';
    
    protected $result;
    protected $code;
    protected $info;
    protected $fields;
    protected $returnType = 'json';
    
    protected $userHandle;
    protected $user;
    
    
    public function returnType($type='json'){
        $this->returnType = $type;
        return $this;
    }
    
    public function setSuccess($_info=null){
        $this->result = self::STATUS_SUCCESS;
        $this->code = '0x0000';
        $this->info = $_info;
    }
    
    public function setError($code,$msg=null){
        $this->result = self::STATUS_FAIL;
        $this->code = $code;
        $this->info = array();
        if(is_array($msg)){
            $this->info['messages'] = $msg;
        }else{
            $this->info['errmsg'] = $msg;
        }
        if(is_null($this->info['errmsg'])){
            $this->info['errmsg'] = self::ERROR_0xFFFF;
        }
    }
    
    public function user()
    {
        $token = I('param.token','','trim') ? I('param.token','','trim') : session_id();
        if(!$this->userHandle){
            $this->userHandle = new \Common\Util\User();
        }
        $user = $this->userHandle->getUserInfo();
        $this->user['token'] = $token;
        $this->user['user'] = $user;
        return $this->user;
    }
    
    public function returnResult(){
        $user = $this->user();
        if(!$this->code){
            $this->code = '0xffff';
        }
        $_arr = array(
            'result'    =>  $this->result,
            'code'      =>  $this->code,
            'info'      =>  $this->info,
            'user'      =>  $user,
        );
        if($this->returnType == 'json'){
            header('Content-Type:application/json; charset=utf-8');
            return json_encode($_arr);
        }else{
            return $_arr;
        }
        
    }
}