<?php
/**
 * @package Blox Page Builder
 * @author UniteCMS.net
 * @copyright (C) 2017 Unite CMS, All Rights Reserved. 
 * @license GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 * */
defined('_JEXEC') or die('Restricted access');

	
	$sapIDPrefix = "uc_tab_";
	
?>
	
	<div id="uc_tabs" class="uc-tabs">
		<?php 
			$isFirstTab = true;
			foreach($arrSaps as $sap):
				
				$sapName = $sap["name"];
				$sapID = $sapIDPrefix.$sapName;
				$class = "";
				if($isFirstTab == true)
					$class = "uc-tab-selected";
				
				$text = $sap["text"];
				
				$isFirstTab = false;
		?>
		
			<a id="<?php echo $sapID?>_tablink" data-name="<?php echo $sapName?>" data-contentid="<?php echo $sapID?>" class="<?php echo $class?>" href="javascript:void(0)" onfocus="this.blur()"> <?php echo $text?></a>
			
		<?php endforeach?>
		
		<?php $this->drawAdditionalTabs(); ?>
		
		<div class="unite-clear"></div>
	</div>
	
	<div id="uc_tab_contents" class="uc-tabs-content-wrapper">
		
		<?php $objOutput->drawWrapperStart()?>
		
		<form name="<?php echo $formID?>" id="<?php echo $formID?>">
		
			<?php 
			$isFirstTab = true;
			
			foreach($arrSaps as $sapKey=>$sap):

			    $sapName = $sap["name"];
				
				$sapID = $sapIDPrefix.$sapName;
				
				$style = "style='display:none'";
				if($isFirstTab == true)
					$style = "";
				
				$isFirstTab = false;
				
			?>
			
			<div id="<?php echo $sapID?>" class="uc-tab-content" <?php echo $style?> >
				<?php
				
				$objOutput->drawSettings($sapKey);
				
				$this->drawSaveSettingsButton($sapID)?>
				
			</div>
			
			
			<?php endforeach?>
			
		</form>
		
		<?php $objOutput->drawWrapperEnd()?>
		
		
		<?php $this->drawAdditionalTabsContent() ?>
		
	</div>
	
	

<script type="text/javascript">

	jQuery(document).ready(function(){
		
		var objAdmin = new UniteCreatorAdmin_GeneralSettings();
		objAdmin.initView("<?php echo $this->saveAction?>");
		
	});

</script>


