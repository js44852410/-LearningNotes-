<?php
/**
 * 分布式图片缩略
 * 吻合cdn
 * @author Caokoo
 */
namespace Common\Util;
class Thumb
{
    #图片定制配置
    protected $config = array(
        'rootPath'      =>  '',  //目标存储根目录
        'savePath'      =>  '',  //类别目录
        'media_module'  =>  '', //文件存储模块
        'source_file'   =>  '',  //目标源文件
        'resize_root_path'=>'/var/media/',    //缩放文件存放根目录
        'resize_width'  =>  0,  //文件缩放宽度
        'resize_height' =>  0,  //文件缩放高度
    );
    
    public function __construct()
    {
        $this->rootPath = C('media_root_path');
        $this->resize_root_path =  __ROOT__.'/var/media/';
    }
    
    
    public function __set($key,$value)
    {
        if(isset($this->config[$key])){
            if($key=='source_file'){
                if(is_null($value)){
                    $value = 'no_image.jpg'; 
                }
                $this->config[$key] = $value;
            }else{
                $this->config[$key] = $value;
            }
        }
    }
    
    public function __get($key)
    {
        return $this->config[$key];
    }
    
    /**
     * 文件缩放
     * @param number $width 文件缩放宽度
     * @param number $height 文件缩放高度
     */
    public function resize($width=0,$height=0)
    {
        if(!$this->media_module){
            return null;
        }
        $config = C($this->media_module);
        
        $this->savePath = str_replace($this->rootPath,'', $config['media_dir']);
        $sourceFile = $this->rootPath.$this->savePath.$this->source_file;
        $extension = pathinfo($sourceFile,PATHINFO_EXTENSION);
        if(!is_file($sourceFile)){
            $sourceFile = __ROOT__.'/media/system/default.jpg';
        }
        if(!in_array(strtolower($extension),  array('jpg', 'gif', 'png', 'jpeg'))){
            $sourceFile = __ROOT__.'/media/system/default.jpg';
        }
        $newMediaFile = $this->resize_root_path.str_replace($extension,'',$this->savePath.$this->source_file).$this->resize_width.'x'.$this->resize_height.'.'.$extension;

        if($width){
            $this->resize_width = $width;
        }
        
        if($height){
            $this->resize_height = $height;
        }
        
        if(!is_file($newMediaFile) || (filectime($newMediaFile)<filectime($sourceFile))){
            $path = '';
            
            $directories = explode('/', dirname(str_replace('../', '', $this->savePath.$this->source_file)));

            foreach ($directories as $directory){
                $path = $path.'/'.$directory;
                if(!is_dir($this->resize_root_path.$path)){
                    @mkdir($this->resize_root_path.$path,0755);
                }
            }
            if(!$this->resize_with && !$this->resize_height){
                copy($sourceFile, $newMediaFile);
            }else{
                list($width_orig,$height_orig) = getimagesize($sourceFile);
                if($width_orig!= $this->resize_width || $height_orig!=$this->resize_height){
                    $imageHandle = new \Think\Image();
                    if(is_file($sourceFile)){
                        $imageHandle->open($sourceFile);
                        $imageHandle->thumb($this->resize_width, $this->resize_height)->save($newMediaFile);
                    }
                }else{
                    copy($sourceFile, $newMediaFile);
                }
            }
        }
        

        return $newMediaFile;        
    }
        
}