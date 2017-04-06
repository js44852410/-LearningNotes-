<?php
/**
 * 对用户的密码进行加密
 * @param $password
 * @param $encrypt //传入加密串，在修改密码时做认证
 * @return array/password
 */
function password($password, $encrypt='') {
    $pwd = array();
    $pwd['encrypt'] =  $encrypt ? $encrypt : create_randomstr();
    $pwd['password'] = md5(md5(trim($password)).$pwd['encrypt']);
    return $encrypt ? $pwd['password'] : $pwd;
}

/**
 * 生成随机字符串
 * @param string $lenth 长度
 * @return string 字符串
 */
function create_randomstr($lenth = 6) {
    return random($lenth, '123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ');
}

/**
 * 产生随机字符串
 *
 * @param    int        $length  输出长度
 * @param    string     $chars   可选的 ，默认为 0123456789
 * @return   string     字符串
 */
function random($length, $chars = '0123456789') {
    $hash = '';
    $max = strlen($chars) - 1;
    for($i = 0; $i < $length; $i++) {
        $hash .= $chars[mt_rand(0, $max)];
    }
    return $hash;
}
/**
 * URL组装 支持不同URL模式
 * @param string $url URL表达式，格式：'[模块/控制器/操作#锚点@域名]?参数1=值1&参数2=值2...'
 * @param string|array $vars 传入的参数，支持数组和字符串
 * @param string|boolean $suffix 伪静态后缀，默认为true表示获取配置值
 * @param boolean $domain 是否显示域名
 * @return string
 */
function url($url='',$vars='',$suffix=true,$domain=false){
    return U($url,$vars,$suffix,$domain);
}

/**
 * @desc 缓存浮层，方便管理
 * 缓存管理
 * @param mixed $name 缓存名称，如果为数组表示进行缓存设置
 * @param mixed $value 缓存值
 * @param mixed $options 缓存参数
 * @return mixed
 */
function SkyCache($name,$value='',$options=null){
    return S($name,$value,$options);
}

/**
 * 递归方式的对变量格式化 ngingx 请求的 参数 未urldecod
 *
 * @access  public
 * @param   mix     $value
 *
 * @return  mix
 */
function urldecode_deep($value)
{
    if (empty($value))
    {
        return $value;
    }else{
        return is_array($value) ? array_map('urldecode_deep', $value) : urldecode($value);
    }
}

/*
 * @功能：调试打印
 * @author:duan
 * @时间：2016年7月14日11:42:18
 * */
function de($str){
    header("Content-type: text/html; charset=utf-8");
    echo '<pre>';
    print_r($str);
    echo '</pre>';
}

/*
 * @功能：记录日志
 * @author:duan
 * @时间：2016年7月14日11:42:18
 * */
function tologs($msg,$info='', $filepath=''){
    $content = sprintf("[%s] %s\n------ debug ------\n",time(),'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);
    $content .= "\n--- {$info} ------\n";
    if(is_array($msg)){
        foreach($msg as $k=>$v){
            $content .= sprintf("%s:%s\n",$k,$v);
        }
    }
    else{
        $content .= $msg;
    }
    $content .= "\n--- debug end ------\n";
    //$log = new \Think\Log();
    //$log::record($content,'DEBUG');   RUNTIME_PATH
    creat_dir(RUNTIME_PATH.'Logs/Debug');
    if($filepath){
        $file = sprintf(RUNTIME_PATH.'Logs/Debug/%s.log', $filepath.'_'.date("Y-m-d"));
    }else {
        $file = sprintf(RUNTIME_PATH.'Logs/Debug/%s.log',date("Y-m-d"));
    }
//    file_put_contents($file, $content, FILE_APPEND);
    $fp2=fopen($file,'a');
    fwrite($fp2,$content);
    fclose($fp2);
}
function creat_dir($dir){
    $dir = $_SERVER['DOCUMENT_ROOT'].$dir;
    if (!is_dir($dir)){
        $temp = explode('/',$dir);
        $cur_dir = '';

        for($i=0;$i<count($temp);$i++)
        {
            $cur_dir .= $temp[$i].'/';
            if (!is_dir($cur_dir))
            {
                @mkdir($cur_dir,0777);
                @fopen("$cur_dir/index.htm","a");
            }
        }
    }
}
/**
 * 判断浏览器是否微信内置浏览器
 * @return bool
 */
function is_weixin(){
    if ( strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false )
    {
        return TRUE;
    }
    return FALSE;
}
/**
 * 替换字符串中字符
 * @param $param
 * @param $str
 * @return string
 */
function str_replace_batch($param,$str)
{
    if(is_array($param))
    {
        foreach($param as $k=>$v)
        {
            $str = str_replace($k,$v,$str);
        }
    }
    return $str;
}

/**
 * 获取签名
 * @param $url
 * @param string $post
 * @return string
 */
function get_sign($url, $post = '')
{
    /* 签名校验现已加上，请求接口时请带上Auth-Sign请求头，否则会提示非法签名 ，Auth-Sign生成规则：
    Auth-Sign = 32位小写MD5(uri + requestbody + 密钥)
    密钥 = hga89734(*Y353hhjk */
    //$sing = '/' . $url . $post . 'hga89734(*Y353hhjk';
    //urldecode
    $url = urldecode($url);
    $post = !empty($post) ? urldecode($post):'';
    $sing = '/' . $url . $post . 'hga89734(*Y353hhjk';
    return md5($sing);
}

/**
 * 模拟请求接口数据
 * @param $url 请求url
 * @param string $post 请求参数
 * @param string $type 类型（get、post、put、delete）
 * @param bool|true $is_api
 * @return mixed 返回接口相应的主体及头部信息
 */
function vcurl($url, $post = '', $type = '',$is_api=true)
{
    $tmpInfo = '';
    if ($is_api)
    {
        // 拼公参
        // 用户标识
        $auth_uid = session('auth_uid');
        $auth_uid = '12asda22132';
        // 请求来源
        $client = is_weixin() ? 'wechat':'wap';
        // API版本
        $version = C('API_SERVER.version');
        // 请求签名,生成规则
        $sign = get_sign($url,$post);

        // 读取api server uri
        $api_uri = C('API_SERVER.uri');

        $url = $api_uri . '/' . $url;
        // 将以前表单方式修改为json方式
        $header = array (
            'Content-type: application/json;charset=utf-8',
            'Accept: application/json',
            'Auth-UID:' . $auth_uid,
            'Auth-Sign:' . $sign,
            'Req-Client:' . $client,
            'Client-Role:' . 'buyer',
            'App-Version:' . $version
        );
    }
    else
    {
        $header [] = "Content-type: application/x-www-form-urlencoded; charset=utf-8";
    }

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    $user_agent = isset($_SERVER ['HTTP_USER_AGENT']) ? $_SERVER ['HTTP_USER_AGENT'] : '';
    curl_setopt($curl, CURLOPT_USERAGENT, $user_agent);
    curl_setopt($curl, CURLOPT_AUTOREFERER, 1);

    switch (strtolower($type)) {
        case 'get' :
            break;
        case 'post' :
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $post);
            break;
        case 'put' :
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PUT');
            curl_setopt($curl, CURLOPT_POSTFIELDS, $post);
            break;
        case 'delete' :
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'DELETE');
            break;
        default :
            break;
    }

    curl_setopt($curl, CURLOPT_TIMEOUT, 100);
    curl_setopt($curl, CURLOPT_HEADER, 0);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
    curl_setopt($curl, CURLOPT_HEADER, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    $tmpInfo = curl_exec($curl);
    if (curl_errno($curl) || curl_error($curl)) {
        $tmpInfo = '';
    }

    // 获得响应结果里的：头大小
    $api_headerSize = curl_getinfo($curl, CURLINFO_HEADER_SIZE);
    // 根据头大小去获取头信息内容
    $api_header = substr($tmpInfo, 0, $api_headerSize);
    $data ['body'] = str_replace($api_header, '', $tmpInfo);
    curl_close($curl);

    $arr = array();
    $arr_tem = explode("\r\n", $api_header);
    foreach ($arr_tem as $k) {
        if (!empty($k)) {
            $temp = explode(":", $k);
            if (count($temp) > 1) {
                $arr [$temp [0]] = trim($temp [1]);
            }
        }
    }
    $data ['header'] = $arr;
    return $data;
}

/**
 * 将数组转换成字符串并按首字母高低排序, 并使用 & 符号拼接好
 */
if (!function_exists('arrayToString')) {
    function arrayToString($arr)
    {
        if (is_array($arr)) {
            ksort($arr);
            $str = '';
            foreach ($arr as $k => $v) {
                $str .= $str == '' ? $k . '=' . urlencode($v) : '&' . $k . '=' . urlencode($v);
            }
            return $str;
        } else {
            return $arr;
        }
    }
}
/**
 * 将数组按索引顺序用/ 符号拼接好
 */
if (!function_exists('arrayToStringUrl')) {
    function arrayToStringUrl($arr)
    {
        if (is_array($arr)) {
            $str = '';
            foreach ($arr as $k => $v) {
                $str .= '/' . $v;
            }
            return $str;
        } else {
            return $arr;
        }
    }
}
