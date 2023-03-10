<?php
/*
Template Name: Single post
*/
get_header();
setPostViews(get_the_ID());
?>
<div class="theme_page relative">
	<div class="clearfix">
		<?php
		if(function_exists("vc_map"))
		{
			/*get page with single post template set*/
			$post_template_page_array = get_pages(array(
				'post_type' => 'page',
				'post_status' => 'publish',
				//'number' => 1,
				'meta_key' => '_wp_page_template',
				'meta_value' => 'single.php'
			));
			if(count($post_template_page_array))
			{
				$post_template_page = $post_template_page_array[0];
				if(count($post_template_page_array) && isset($post_template_page))
				{
					echo wpb_js_remove_wpautop(apply_filters('the_content', $post_template_page->post_content));
					global $post;
					$post = $post_template_page;
					setup_postdata($post);
				}
				else
					echo wpb_js_remove_wpautop(apply_filters('the_content', '[vc_row top_margin="page_margin_top"][vc_column width="1/1"]

					[single_post featured_image_size="default" show_post_title="1" show_post_featured_image="1" show_post_excerpt="0" show_post_categories="1" show_post_date="1" show_post_author="0" show_post_views="1" show_post_comments="0" show_post_author_box="0" show_post_tags_footer="1" show_post_categories_footer="0" show_share_box="0" icons_count="6" icon_type0="facebook" icon_type1="twitter" icon_type2="googleplus" icon_type3="linkedin" icon_type4="pinterest" icon_type5="envato" icon_type6="behance" icon_type7="behance" icon_type8="behance" icon_type9="behance" icon_type10="behance" icon_type11="behance" icon_type12="behance" icon_type13="behance" icon_type14="behance" icon_type15="behance" icon_type16="behance" icon_type17="behance" icon_type18="behance" icon_type19="behance" icon_type20="behance" icon_type21="behance" icon_type22="behance" icon_type23="behance" icon_type24="behance" icon_url0="https://www.facebook.com/sharer/sharer.php?u={URL}" icon_target0="_blank" icon_url1="https://twitter.com/home?status={URL}" icon_target1="_blank" icon_url2="https://plus.google.com/share?url={URL}" icon_target2="_blank" icon_url3="https://www.linkedin.com/shareArticle?mini=true&amp;url={URL}" icon_target3="_blank" icon_url4="https://pinterest.com/pin/create/button/?url=&amp;media={URL}" icon_target4="_blank" icon_url5="http://themeforest.net/user/QuanticaLabs/portfolio?ref=QuanticaLabs" icon_target5="_blank"]
					
					[box_header title="Posts" type="h4" bottom_border="1" top_margin="page_margin_top_section"]
					[pr_post_carousel type="horizontal" kind="default" items_per_page="6" ids="-" category="-" post_format="-" order_by="date" order="DESC" visible="3" post_details_layout="simple" count_number="0" show_comments_box="0" show_post_excerpt="0" read_more="0" featured_image_size="blog-post-thumb" autoplay="0" pause_on_hover="1" scroll="1" effect="scroll" easing="swing" duration="500" top_margin="page_margin_top" show_post_icon="1"]
					
					[comments featured_image_size="default" show_post_title="1" show_post_featured_image="1" show_post_excerpt="1" show_post_categories="1" show_post_date="1" show_post_author="1" show_post_views="1" show_post_comments="1" show_post_author_box="1" show_share_box="1" show_post_tags_footer="1" show_post_categories_footer="1" comments="1" top_margin="page_margin_top_section" show_comments_form="1" show_comments_list="1"]
					
					[/vc_column][/vc_row]'));	
			}
			else
			{
				if(function_exists("vc_map"))
					echo wpb_js_remove_wpautop(apply_filters('the_content', '[vc_row top_margin="page_margin_top"][vc_column width="1/1"]

					[single_post featured_image_size="default" show_post_title="1" show_post_featured_image="1" show_post_excerpt="0" show_post_categories="1" show_post_date="1" show_post_author="0" show_post_views="1" show_post_comments="0" show_post_author_box="0" show_post_tags_footer="1" show_post_categories_footer="0" show_share_box="0" icons_count="6" icon_type0="facebook" icon_type1="twitter" icon_type2="googleplus" icon_type3="linkedin" icon_type4="pinterest" icon_type5="envato" icon_type6="behance" icon_type7="behance" icon_type8="behance" icon_type9="behance" icon_type10="behance" icon_type11="behance" icon_type12="behance" icon_type13="behance" icon_type14="behance" icon_type15="behance" icon_type16="behance" icon_type17="behance" icon_type18="behance" icon_type19="behance" icon_type20="behance" icon_type21="behance" icon_type22="behance" icon_type23="behance" icon_type24="behance" icon_url0="https://www.facebook.com/sharer/sharer.php?u={URL}" icon_target0="_blank" icon_url1="https://twitter.com/home?status={URL}" icon_target1="_blank" icon_url2="https://plus.google.com/share?url={URL}" icon_target2="_blank" icon_url3="https://www.linkedin.com/shareArticle?mini=true&amp;url={URL}" icon_target3="_blank" icon_url4="https://pinterest.com/pin/create/button/?url=&amp;media={URL}" icon_target4="_blank" icon_url5="http://themeforest.net/user/QuanticaLabs/portfolio?ref=QuanticaLabs" icon_target5="_blank"]
					
					[box_header title="Posts" type="h4" bottom_border="1" top_margin="page_margin_top_section"]
					[pr_post_carousel type="horizontal" kind="default" items_per_page="6" ids="-" category="-" post_format="-" order_by="date" order="DESC" visible="3" post_details_layout="simple" count_number="0" show_comments_box="0" show_post_excerpt="0" read_more="0" featured_image_size="blog-post-thumb" autoplay="0" pause_on_hover="1" scroll="1" effect="scroll" easing="swing" duration="500" top_margin="page_margin_top" show_post_icon="1"]
					
					[comments featured_image_size="default" show_post_title="1" show_post_featured_image="1" show_post_excerpt="1" show_post_categories="1" show_post_date="1" show_post_author="1" show_post_views="1" show_post_comments="1" show_post_author_box="1" show_share_box="1" show_post_tags_footer="1" show_post_categories_footer="1" comments="1" top_margin="page_margin_top_section" show_comments_form="1" show_comments_list="1"]
					
					[/vc_column][/vc_row]'));		
			}
		}
		else
		{
			pr_get_theme_file("/shortcodes/single-post.php");
			echo do_shortcode(apply_filters('the_content', '<div class="vc_row wpb_row vc_row-fluid"><div class="vc_col-sm-12 wpb_column vc_column_container">[single_post]</div></div>'));
		}
		?>
	</div>
</div>
<?php
get_footer();
?>