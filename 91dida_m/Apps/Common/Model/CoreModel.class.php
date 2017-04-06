<?php
/**
 * 核心模型类
 */
namespace Common\Model;
use Think\Model;
abstract class CoreModel extends Model
{
    protected function _initialize()
    {
        header('Content-Type:text/html;Charset=UTF-8');
    }


}