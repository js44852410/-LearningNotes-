<?php
/**
 * 用户操作
 */
namespace Common\Util;
class User
{
    #用户session
    private $userSession = 'user_session'; 
    #用户ID
    protected $userId;
    #用户手机号
    protected $userMobile;
    #用户微信open_id
    protected $openId;
    #用户信息
    protected $userInfo;
    
    public function __construct()
    {
        $userInfo = session($this->userSession);
        if(is_weixin())
        {
            new Wechat();
            $userInfo['open_id'] = session('WX_OPEN_ID');
        }

        #初始化用户信息
        $this->userId           = $userInfo['customer_id'];
        $this->userMobile       = $userInfo['mobile'];
        $this->userReviewStatus = $userInfo['review_status'];
        $this->openId           = $userInfo['open_id'];
        $this->userInfo         = $userInfo;
    }
    
    /**
     * session管理函数
     * @param string|array $name session名称 如果为数组则表示进行session设置
     * @param mixed $value session值
     * @return mixed 
     */
    public function session($name='',$value='')
    {
		return session($name,$value);
    }

    /**
     * 判断用户是否登录
     */
    public function userIsLogin()
    {
        return (boolean)$this->userId;
    }
    
    /**
     * 获取用户ID
     */
    public function getUserId()
    {
        return (int)$this->userId;
    }

    /**
     * 获取用户电话
     */
    public function getUserMobile()
    {
        return $this->userMobile;
    }

    /**
     * 获取用户openId
     */
    public function getOpenId()
    {
        return $this->openId;
    }
    
    /**
     * 获取用户信息
     */
    public function getUserInfo()
    {
        return $this->session($this->userSession);
    }
}