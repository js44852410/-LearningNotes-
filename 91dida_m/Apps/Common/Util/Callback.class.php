<?php
/**
 * API回调
 * @author Caokoo
 */
namespace Common\Util;
use Common\Util\Response;
class Callback
{
    private $response;
    
    public function __construct(){
        if(!$this->response){
            $this->response = new Response();
        }
    }

    public function query($params){
        $api = ucwords(strtolower($params['api']));
        $method = strtolower($params['method']);
        if(!$api || !$method){
            E('API或Method不能为空');
        }
        $adapter = D('Api/'.$api);
        unset($params['api']);
        unset($params['method']);

        list($result,$code,$response) = $adapter->setArgs($params)->$method();
        $adapter->desetArgs();

        if($result == true){
            $this->response->setSuccess($response);
        }else{
            $this->response->setError($code,$response);
        }
        return $this->response->returnType('array')->returnResult();
    }
}