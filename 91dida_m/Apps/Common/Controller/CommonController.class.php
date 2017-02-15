<?php
/**
 * Wap前端Controller 总控 
 */
namespace Common\Controller;
use Think\Controller;
class CommonController extends Controller
{
    #用户管理脚手架
    protected $user;

    protected function _initialize()
    {
        if(!$this->user){
            $this->user = new \Common\Util\User();
        }
        header('Content-Type:text/html;Charset=UTF-8');

        #刷新session用户信息，app与客户端互通时需要
        $session_id = isset($_SERVER['HTTP_TOKENID']) ? trim($_SERVER['HTTP_TOKENID']):'';
        if(!empty($session_id))
        {
            session('api_token',$session_id);
        }

        $req_source = isset($_SERVER['HTTP_REQSOURCE']) ? trim($_SERVER['HTTP_REQSOURCE']) : 'wap';
        $this->assign('deviceType',$req_source);
    }

    /**
     * 模拟http请求api数据
     */
    public function fetch($data = array(),$is_api = true)
    {
        $params = array_merge(I('post.'),I('get.'));
        $common_param = $this->getParams();
        $params = array_merge($params,$common_param,$data);
        $transport = new \Common\Util\Transport();
        $transport->use_curl = true;
        $api_uri = C('API_URI');
        $result = $transport->request($api_uri, $params);
        $data = '';
        if($result['body'])
        {
            $data = json_decode($result['body'],true);
            #同步用户数据
            if(isset($data['customer']) && !empty($data['customer']))
            {
                session('api_token',$data['customer']['token']);
                session('user_session',$data['customer']['buyer']);
            }
            unset($data['customer']);
            $data = json_encode($data);
        }
        if($is_api)
        {
            echo $data;exit;
        }
        return $data;
    }

    /**
     * 设置公共参数
     */
    protected function getParams()
    {
        $params = array();
        $params['token'] = session('api_token');
        $params['device_type'] = isset($_SERVER['HTTP_REQSOURCE']) ? trim($_SERVER['HTTP_REQSOURCE']) : (is_weixin() ? 'wechat' : 'wap');
        $params['client_role'] = isset($_SERVER['HTTP_CLIENTROLE']) ? trim($_SERVER['HTTP_CLIENTROLE']) : 'buyer';
        $params['app_version'] = C('API_VERSION');
        $params['app_key'] = 'cmwqef88123jh7a1jdhsi1pjsmn';
        $params['app_secret'] = 'al23loaucnvenm1kjsh4jkkhfsdfa';
        $params['stime'] = time();
        return $params;
    }

    /**
     * 请求接口
     * @param int $param_type get或delete 方式传递的参数，1以&隔开，0为/隔开
     * @return array
     */
    function get_api($param_type = 1)
    {
        $contentType = '';
        if (isset($_SERVER ['CONTENT_TYPE'])) {
            $contentType = $_SERVER['CONTENT_TYPE'];
        }
        $request_method = '';
        if (isset($_SERVER ['REQUEST_METHOD'])) {
            $request_method = $_SERVER['REQUEST_METHOD'];
        }
        if (stristr($contentType, 'application/json'))//post方式
        {
            if ('delete' == strtolower($request_method)) {
                $req = json_decode(file_get_contents("php://input"), true);
                if(empty($req['api']))
                {
                    $this->isReturn(0,array('errmsg'=>'参数错误'));
                }
                $api_uri = $req['api'];
                if (!empty($req['method'])) {
                    $api_uri = $api_uri . '/' . $req['method'];
                }
                unset($req['api']);
                unset($req['method']);
                if(!empty($req))
                {
                    if ($param_type)  //&传参
                    {
                        $api_uri .= '?';
                        $req = arrayToString($req);
                    } else {        //  /传参
                        $req = arrayToStringUrl($req);
                    }
                    $data = vcurl($api_uri . $req, '', 'delete');
                }
                else{
                    $data = vcurl($api_uri, '', 'delete');
                }

            } else {
                $req = json_decode(file_get_contents("php://input"), true);
                if(empty($req['api']))
                {
                    $this->isReturn(0,array('errmsg'=>'参数错误'));
                }
                $api_uri = $req['api'];
                if (!empty($req['method'])) {
                    $api_uri = $api_uri . '/' . $req['method'];
                }
                unset($req['api']);
                unset($req['method']);
                $data = vcurl($api_uri, json_encode($req), $request_method);
            }

        } else {
            $req = I('get.');
            if(empty($req['api']))
            {
                $this->isReturn(0,array('errmsg'=>'参数错误'));
            }
            $api_uri = $req['api'];
            if (!empty($req['method'])) {
                $api_uri = $api_uri . '/' . $req['method'];
            }
            unset($req['api']);
            unset($req['method']);
            if(!empty($req)){
                if ($param_type)  //&传参
                {
                    $api_uri .= '?';
                    $req = arrayToString($req);
                } else { //传参
                    $req = arrayToStringUrl($req);
                }
                $data = vcurl($api_uri . $req, '','get');
            }
            else{
                $data = vcurl($api_uri, '', 'get');
            }

        }

        $auth_uid = session('auth_uid');
        $get_api_headers = $data['header'];
        $uid = '';
        if(!empty($get_api_headers ['Auth-UID']))
        {
            $uid = $get_api_headers ['Auth-UID'];
        }

        if (empty($auth_uid)) {
            session('auth_uid',$uid);
        }
        return $data ['body'];
    }

	/**
      * 判断返回
      */
    protected function isReturn($status=1,$data)
    {
        if(IS_AJAX){
            $array = array(
                'result' => $status ? 'success' : 'fail',
                'status' => $status ? '0x0000' : '0xffff',
                'info'   => $data,
            );
            $this->ajaxReturn($array);
        }else{
            if($status){
                $this->success($data);
            }else{
                $this->error($data);
            }
        }
        exit();
   }
    
    /**
     * Action跳转(URL重定向） 支持指定模块和延时跳转
     * @access protected
     * @param string $url 跳转的URL表达式 
     * @param integer $delay 延时跳转的时间 单位为秒
     * @param string $msg 跳转提示信息
     * @return void
     */
    protected function redirect($url,$delay=0,$msg='')
    {
        redirect($url,$delay,$msg);
        exit;
    }
}