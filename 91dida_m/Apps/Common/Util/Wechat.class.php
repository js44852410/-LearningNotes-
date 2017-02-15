<?php
/**
 * 微信授权
 */
namespace Common\Util;
class Wechat
{
    private $app_id;
    private $app_secret;
    private $wx_redirect_uri;
    private $scope;
    private $wx_request_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect";#授权请求连接

    public function __construct($config)
    {
        $wx_config = C('WX_SET');
        $this->app_id = $wx_config['AppID'];
        $this->app_secret = $wx_config['AppSecret'];
        $this->scope = 'snsapi_userinfo';
//                $this->scope = 'snsapi_login';

        if( empty($this->app_id) || empty($this->app_secret) )
        {
            #微信配置信息出错
            $this->log('微信配置信息不完整','WxConfig',true);
            $this->log($wx_config,'WxConfig',true);
            return;
        }
        if( empty($this->wx_redirect_uri) )
        {
            $this->wx_redirect_uri = (is_ssl() ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'];
        }
        if(is_weixin())
        {
            $this->init();
        }
    }

    /**
     * 初始化
     */
    public function init()
    {
        //声明一组openid
        $s_open_id = session('WX_OPEN_ID');
        $c_open_id = cookie('WX_OPEN_ID');
        if(empty($s_open_id) && !empty($c_open_id))//session不存在，但cookie存在时重新给session赋值，检验openid
        {
            session('WX_OPEN_ID',$c_open_id);
            $s_open_id = $c_open_id;
        }

        $s_wx_info = session('WX_USER_INFO');
        //用户信息不完整时,清空cookie和session
        if(!empty($s_open_id) && empty($s_wx_info))
        {
            setcookie("WX_OPEN_ID",'',time()-5,'/',$_SERVER['HTTP_HOST']);//清空cookie
            //清空session
            session('WX_OPEN_ID',NULL);
            session('WX_USER_INFO',NULL);
            $s_open_id = '';
        }
        //记录回调地址（从微信页跳入）
        if(empty($s_open_id) && !isset($_GET['code'])){
            $uri = (is_ssl() ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
            session('WX_BACK_URL',$uri);
        }
        //更新COOKIE
        if (! empty($s_open_id))
        {
            if (! isset($_COOKIE ['WX_OPEN_ID']))
            {
                setcookie("WX_OPEN_ID",$s_open_id,time() + 30 * 3600 * 24,'/',$_SERVER ['HTTP_HOST']);
            }
            return;
        }
        else
        {
            #微信授权
            $this->auth();
        }
    }

    /**
     * 微信授权
     */
    public function auth()
    {
        if (! empty( $_GET['code'] ) && ! empty($_GET ['state']))
        {
            if( $_GET['state'] != SkyCache('WX_REQUEST_CODE'))
            {
                #授权请求为csrf攻击--错误日志
                $this->log('非法授权请求','userAuth',true);
                return;
            }else{
                SkyCache('WX_REQUEST_CODE',null);
            }

            $res = $this->getWxUserInfo( $_GET['code'] );

            if (! isset( $res['openid'] ))
            {
                #未获取到微信用户信息--错误日志
                $this->log('获取微信用户接口失败','getWxUserInfo',true);
                $this->log($res,'getWxUserInfo',true);
                return;
            }
            else
            {
                #获取到微信用户信息--记录日志
                session('WX_USER_INFO',$res);
                session('WX_OPEN_ID',$res['openid']);
                setcookie("WX_OPEN_ID",$res['openid'],time() + 30 * 3600 * 24,'/',$_SERVER ['HTTP_HOST']);
            }

            if(empty($url))
            {
                $back_url = session('WX_BACK_URL');
                if (! empty( $back_url ))
                {
                    session('WX_BACK_URL',NULL);
                }
                else
                {
                    $back_url = '/';
                }
            }
            else
            {
                $back_url = $url;
            }
            redirect ( $back_url );
            return;
        }else if ( empty( $_GET['code'] ) && ! empty($_GET ['state']))
        {
            #用户手动禁止授权
            $this->log('用户禁止授权','userAuth',true);
            return;
        }

        if( empty($this->wx_request_url) )
        {
            $this->log('请求微信授权链接为空','requestUrl',true);
            return;
        }

        $redirect_uri = urlencode($this->wx_redirect_uri);

        $state = md5(create_randomstr());
        SkyCache('WX_REQUEST_CODE',$state);

        $req = array(
            'APPID'  => $this->app_id,
            'REDIRECT_URI' => $redirect_uri,
            'SCOPE'        => $this->scope,
            'STATE'        => $state,
        );
        $url = str_replace_batch($req, $this->wx_request_url);
        redirect ( $url );
    }

    /**
     * 根据code获取用户信息
     * @param string $code
     * @return mixed|void
     */
    public function getWxUserInfo($code = '')
    {
        $app_id = $this->app_id;
        $app_secret = $this->app_secret;
        if(empty( $app_id ) || empty( $app_secret ))
        {
            #错误日志
            $this->log('公众号参数缺失','wxParam',true);
            $this->log(array('app_id'=>$app_id,'app_secret'=>$app_secret),'wxParam',true);
            return;
        }
        #通过code换取网页授权access_token
        $url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid={$app_id}&secret={$app_secret}&code={$code}&grant_type=authorization_code";
        $res = json_decode($this->vcurl($url),true);

        if (isset($res ['errcode']) && ($res ['errcode'] == '40029' || $res ['errcode'] == '41001'))
        {
            #错误日志--获取网页授权失败
            $this->log('获取access_token失败','getAccessToken',true);
            $this->log($res,'getAccessToken',true);
            return;
        }

        #拉取用户信息
        $url = "https://api.weixin.qq.com/sns/userinfo?access_token={$res['access_token']}&openid={$res['openid']}&lang=zh_CN";
        $res = json_decode($this->vcurl($url),true);
        if (isset($res ['errcode']) && $res ['errcode'] == '40003')
        {
            #错误日志--微信拉取用户信息失败
            $this->log('微信拉取用户信息失败','getUserInfo',true);
            $this->log($res,'getUserInfo',true);
            return;
        }
        return $res;
    }

    /**
     * 获取微信接口的权限验证配置信息
     */
    public function jssdk_config()
    {
        $wx_config = C('WX_SET');
        $app_id = $wx_config['AppID'];
        $app_secret = $wx_config['AppSecret'];

        $jsapi_ticket = SkyCache('wx_jsapi_ticket');
        if( empty($jsapi_ticket) ) {
            #获取access_token
            $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$app_id}&secret={$app_secret}";
            $res = json_decode($this->vcurl($url), true);
            if (isset($res ['errcode']) && $res ['errcode'] == '40013') {
                #错误日志--获取access_token
                $this->log('获取access_token失败', 'getAccessToken', true);
                $this->log($res, 'getAccessToken', true);
                return;
            }

            #获得jsapi_ticket
            $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={$res['access_token']}&type=jsapi";
            $res = json_decode($this->vcurl($url), true);
            if (isset($res ['errcode']) && $res ['errcode'] != '0') {
                #错误日志--获得jsapi_ticket
                $this->log('获得jsapi_ticket失败', 'getJsApiTicket', true);
                $this->log($res, 'getJsApiTicket', true);
                return;
            }
            $jsapi_ticket = isset($res['ticket']) ? $res['ticket'] : '';
            SkyCache('wx_jsapi_ticket',$jsapi_ticket,2*60*60);
        }

        $url = (is_ssl() ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
        $arr = explode('#',$url);
        $url = $arr[0];
        $wx_config = array(
            'appId'    => $app_id,
            'timestamp' => time(),
            'nonceStr'  => create_randomstr(16),
        );
        $wx_config['signature'] = sha1("jsapi_ticket={$jsapi_ticket}&noncestr={$wx_config['nonceStr']}&timestamp={$wx_config['timestamp']}&url={$url}");
        return $wx_config;
    }

    private function vcurl($url) {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_TIMEOUT, 500);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_URL, $url);

        $res = curl_exec($curl);
        curl_close($curl);
        return $res;
    }

    /**
     * 记录 日志
     * @access      private
     * @param      array      $res     返回结果
     * @param      string     $do     当前操作
     * @param      bool       $is_error   是否跳过检查错误 true  跳过检查错误||  false 检查错误
     * @return      void
     */
    public function log($res,$do,$is_error=false){
        if($is_error){
            $log = \Common\Util\Log::Init(__ROOT__."/var/log/wx/error/$do/".date('Y-m').'/'.date('d').'.log', 15);
            $log->ERROR(var_export($res,true)."\r\n");
        }else{
            $log = \Common\Util\Log::Init(__ROOT__."/var/log/wx/$do/".date('Y-m').'/'.date('d').'.log', 15);
            $log->INFO(var_export($res,true)."\r\n");
        }
    }
}