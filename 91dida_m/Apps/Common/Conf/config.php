<?php
/**
 * 项目公共配置项
 */
#WX配置
$wxConfig = include 'wx.config.php';

#常规配置
$config = array(
    'SHOW_PAGE_TRACE'       =>  False,
    'DEFAULT_V_LAYER'       =>  'View',
    'TMPL_TEMPLATE_SUFFIX'  =>  '.phtml',     // 默认模板文件后缀
    
    'VAR_PAGE'              =>  'page',
    /* 数据库设置 */
 
     'DB_TYPE'               =>  'mysql',     // 数据库类型
     'DB_HOST'               =>  '59.108.53.217',//务器地址
     'DB_NAME'               =>  '91dida',          // 数据库名
     'DB_USER'               =>  'root',      // 用户名
     'DB_PWD'                =>  '123456',          // 密码
     'DB_PORT'               =>  '3306',        // 端口
     'DB_PREFIX'             =>  'yx_',    // 数据库表前缀
    
    /* 数据缓存设置 */
     'DATA_CACHE_TIME'       =>  3000,      // 数据缓存有效期 0表示永久缓存,单位（s）
     'DATA_CACHE_PREFIX'     =>  'yx_',     // 缓存前缀
     'DATA_CACHE_TYPE'       =>  'File',  // 数据缓存类型,支持:File|Db|Apc|Memcache|Shmop|Sqlite|Xcache|Apachenote|Eaccelerator
     'DATA_CACHE_PATH'       =>  __ROOT__.'/var/cache/',// 缓存路径设置 (仅对File方式缓存有效)
     'DATA_CACHE_SUBDIR'     =>  true,    // 使用子目录缓存 (自动根据缓存标识的哈希创建子目录)
     'DATA_PATH_LEVEL'       =>  3,        // 子目录缓存级别

    
    /*SESSION设置*/
    'SESSION_OPTIONS'       =>  array(
        'type'              =>  'Db',
		'expire'            =>  86400*30,
    ),
);

$config['API_URI'] = "http://beta.api.91dida.cn/api.php";
$config['API_VERSION'] = '1.3.3'; #测试

$config = array_merge($config,(array)$wxConfig);

return $config;