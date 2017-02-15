<?php
/**
 * 记录日志
 *
 * @package    library
 * @copyright  Copyright (c) 2016-2017 Becdoor Inc. (http://www.becdoor.com)
 * @license    http://www.becdoor.com
 * @link       http://www.becdoor.com
 * @author	   Becdoor Team
 * @since      File available since Release v2.1
 */
namespace Common\Util;

class CLogFileHandler
{
	private $handle = null;

	public function __construct($file = '')
	{
		$dir=dirname($file);
		if (!file_exists($dir))
		{
			if (!$this->make_dir($dir))
			{
				return false;
			}
		}
		$this->handle = fopen($file,'a');
	}

	public function write($msg)
	{
		fwrite($this->handle, $msg);
	}

	/**
	 * 检查目标文件夹是否存在，如果不存在则自动创建该目录
	 *
	 * @access      public
	 * @param       string      folder     目录路径。不能使用相对于网站根目录的URL
	 *
	 * @return      bool
	 */
	public function make_dir($folder)
	{
		$reval = false;

		if (!file_exists($folder))
		{
			/* 如果目录不存在则尝试创建该目录 */
			@umask(0);

			/* 将目录路径拆分成数组 */
			preg_match_all('/([^\/]*)\/?/i', $folder, $atmp);
			/* 如果第一个字符为/则当作物理路径处理 */
			$base = ($atmp[0][0] == '/') ? '/' : '';

			/* 遍历包含路径信息的数组 */
			foreach ($atmp[1] AS $val)
			{
				if ('' != $val)
				{
					$base .= $val;

					if ('..' == $val || '.' == $val)
					{
						/* 如果目录为.或者..则直接补/继续下一个循环 */
						$base .= '/';

						continue;
					}
				}
				else
				{
					continue;
				}

				$base .= '/';
				/* 跳过网站根目录的检测  */
			    if(strpos('./', $base)!==false)
	            {
	            	continue;
	            }
				if (@!file_exists($base))
				{
					/* 尝试创建目录，如果创建失败则继续循环 */
					if (@mkdir(rtrim($base, '/'), 0777))
					{
						@chmod($base, 0777);
						$reval = true;
					}
				}
			}
		}
		else
		{
			/* 路径已经存在。返回该路径是不是一个目录 */
			$reval = is_dir($folder);
		}

		clearstatcache();

		return $reval;
	}
	public function __destruct()
	{
		fclose($this->handle);
	}
}

class Log
{
	private $handler = null;
	private $level = 15;

	private static $instance = null;

	private function __construct(){}

	private function __clone(){}

	public static function Init($file,$level = 15)
	{
	    $handler= new CLogFileHandler($file);
		if(!self::$instance instanceof self)
		{
			self::$instance = new self();
			self::$instance->__setHandle($handler);
			self::$instance->__setLevel($level);
		}else{
			self::$instance->__setHandle($handler);
			self::$instance->__setLevel($level);
		}
		return self::$instance;
	}


	private function __setHandle($handler){
		$this->handler = $handler;
	}

	private function __setLevel($level)
	{
		$this->level = $level;
	}

	public static function DEBUG($msg)
	{
		self::$instance->write(1, $msg);
	}

	public static function WARN($msg)
	{
		self::$instance->write(4, $msg);
	}

	public static function ERROR($msg)
	{
		$debugInfo = debug_backtrace();
		$stack = "[";
		foreach($debugInfo as $key => $val){
			if(array_key_exists("file", $val)){
				$stack .= ",file:" . $val["file"];
			}
			if(array_key_exists("line", $val)){
				$stack .= ",line:" . $val["line"];
			}
			if(array_key_exists("function", $val)){
				$stack .= ",function:" . $val["function"];
			}
		}
		$stack .= "]";
		self::$instance->write(8, $stack . $msg);
	}

	public static function INFO($msg)
	{
		self::$instance->write(2, $msg);
	}

	private function getLevelStr($level)
	{
		switch ($level)
		{
			case 1:
				return 'debug';
				break;
			case 2:
				return 'info';
				break;
			case 4:
				return 'warn';
				break;
			case 8:
				return 'error';
				break;
			default:

		}
	}

	protected function write($level,$msg)
	{
		if(($level & $this->level) == $level )
		{
			$url = $_SERVER['REQUEST_URI'] ? $_SERVER['REQUEST_URI'] : $_SERVER['PHP_SELF'];
			list($usec, $sec) = explode(" ", microtime());
			$msg = '['.date('Y-m-d H:i:s',time()).'.'.$sec.']['.$this->getLevelStr($level).'] url:'.$url."\r\n".$msg."\r\n";
			$this->handler->write($msg);
		}
	}
}
?>