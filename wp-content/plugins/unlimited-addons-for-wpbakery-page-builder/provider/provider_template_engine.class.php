<?php
/**
 * @package Blox Page Builder
 * @author UniteCMS.net
 * @copyright (C) 2017 Unite CMS, All Rights Reserved. 
 * @license GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 * */
defined('_JEXEC') or die('Restricted access');


class UniteCreatorTemplateEngine extends UniteCreatorTemplateEngineWork{
	
	
	/**
	 * put font override
	 */
	public function putPostMeta($postID, $key){
		
		$metaValue = get_post_meta($postID, $key, true);
		
		echo $metaValue;
	}
	
	
	/**
	 * put font override
	 */
	public function putPostTags($postID){
		
		$htmlTags = UniteFunctionsWPUC::getTagsHtmlList($postID);
		
		echo $htmlTags;
	}
	
	
	
	/**
	 * add extra functions to twig
	 */
	/*
	protected function initTwig_addExtraFunctions(){
		
		parent::initTwig_addExtraFunctions();
				
	}
	*/
	
}