<?php
/**
 * @package Blox Page Builder
 * @author UniteCMS.net
 * @copyright (C) 2017 Unite CMS, All Rights Reserved. 
 * @license GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 * */
defined('_JEXEC') or die('Restricted access');

class UniteCreatorViewLayoutsSettings extends UniteCreatorSettingsView{
	
	
	/**
	 * constructor
	 */
	public function __construct(){
		
		$this->headerTitle = HelperUC::getText("layouts_global_settings");
		$this->saveAction = "update_global_layout_settings";
		$this->textButton = HelperUC::getText("save_layout_settings");
		
		//set settings object
		$this->objSettings = UniteCreatorLayout::getGlobalSettingsObject();
		
		$this->display();
	}
	
}


new UniteCreatorViewLayoutsSettings();
