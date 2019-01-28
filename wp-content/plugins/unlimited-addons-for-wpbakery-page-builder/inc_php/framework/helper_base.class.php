<?php
/**
 * @package Blox Page Builder
 * @author UniteCMS.net
 * @copyright (C) 2017 Unite CMS, All Rights Reserved. 
 * @license GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 * */
defined('_JEXEC') or die('Restricted access');


class UniteHelperBaseUC extends HtmlOutputBaseUC{
	
	
	/**
	 *
	 * echo json ajax response
	 */
	public static function ajaxResponse($success,$message,$arrData = null){
	
		$response = array();
		$response["success"] = $success;
		$response["message"] = $message;
	
		if(!empty($arrData)){
	
			if(gettype($arrData) == "string")
				$arrData = array("data"=>$arrData);
	
			$response = array_merge($response,$arrData);
		}
	
		$json = json_encode($response);
	
		echo $json;
		exit();
	}
	
	/**
	 *
	 * echo json ajax response, without message, only data
	 */
	public static function ajaxResponseData($arrData){
		if(gettype($arrData) == "string")
			$arrData = array("data"=>$arrData);
	
		self::ajaxResponse(true,"",$arrData);
	}
	
	/**
	 *
	 * echo json ajax response
	 */
	public static function ajaxResponseError($message,$arrData = null){
	
		self::ajaxResponse(false,$message,$arrData,true);
	}
	
	/**
	 * echo ajax success response
	 */
	public static function ajaxResponseSuccess($message,$arrData = null){
	
		self::ajaxResponse(true,$message,$arrData,true);
	
	}
	
	/**
	 * echo ajax success response
	 */
	public static function ajaxResponseSuccessRedirect($message,$url){
		$arrData = array("is_redirect"=>true,"redirect_url"=>$url);
	
		self::ajaxResponse(true,$message,$arrData,true);
	}
	
	
}

?>