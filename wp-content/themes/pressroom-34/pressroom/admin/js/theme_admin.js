jQuery(document).ready(function($){
	"use strict";
	if($("#theme-options-panel").length)
		$("#theme-options-panel")[0].reset();
	//upload
	$("[name='pressroom_upload_button']").live('click', function(){
		var self = $(this);
		wp.media.frames.selectImageFrame=wp.media(
		{
			multiple		:	false,
			library			: 
			{
			   type			:	'image',
			}
		});
		wp.media.frames.selectImageFrame.open();
		wp.media.frames.selectImageFrame.on('select',function()
		{
			var selection = wp.media.frames.selectImageFrame.state().get('selection');
			if(!selection) return;
			selection.each(function(attachment)
			{
				var url = attachment.attributes.url;
				self.prev().val(url);
				if(self.prev().prev("input[name*='attachment_ids']").length)
					self.prev().prev("input[name*='attachment_ids']").val(attachment.id);
			});
		});
		return false;
	});
	if($("#pressroom-options-tabs").length)
		$("#pressroom-options-tabs").tabs({
			selected: $("#pressroom-options-tabs #pressroom-selected-tab").val()
		});
	$("#pressroom_add_new_button").click(function(){
		$(this).parent().before($(this).parent().prev().prev().prev().prev().clone().wrap('<div>').parent().html().replace($(".slider_image_url_row").length, $(".slider_image_url_row").length+1)+$(this).parent().prev().prev().prev().clone().wrap('<div>').parent().html().replace($(".slider_image_url_row").length, $(".slider_image_url_row").length+1)+$(this).parent().prev().prev().clone().wrap('<div>').parent().html().replace($(".slider_image_url_row").length, $(".slider_image_url_row").length+1)+$(this).parent().prev().clone().wrap('<div>').parent().html().replace($(".slider_image_url_row").length, $(".slider_image_url_row").length+1));
		$(".slider_image_url_row:last [id^='pressroom_slider_image_url_'][type='text']").attr("id", "pressroom_slider_image_url_" + $(".slider_image_url_row").length).val('');
		$(".slider_image_url_row:last [id^='pressroom_slider_image_url_'][type='button']").attr("id", "pressroom_slider_image_url_button_" + $(".slider_image_url_row").length);
		$(".slider_image_title_row:last [id^='pressroom_slider_image_title_'][type='text']").attr("id", "pressroom_slider_image_title_" + $(".slider_image_url_row").length).val('');
		$(".slider_image_subtitle_row:last [id^='pressroom_slider_image_subtitle_'][type='text']").attr("id", "pressroom_slider_image_subtitle_" + $(".slider_image_url_row").length).val('');
		$(".slider_image_link_row:last [id^='pressroom_slider_image_link_'][type='text']").attr("id", "pressroom_slider_image_link_" + $(".slider_image_link_row").length).val('');
	});
	$(".pressroom_add_new_repeated_row").click(function(){
		var selfId = $(this).attr("id");
		var re = new RegExp($("." + selfId).length,"g");
		$(this).parent().parent().before($(this).parent().parent().prev().clone().wrap('<div>').parent().html().replace(re, $("." + selfId).length+1));
		$("." + selfId + ".repeated_row_" + $("." + selfId).length + " input[type='text'], ." + selfId + ".repeated_row_" + $("." + selfId).length + " select, ." + selfId + ".repeated_row_" + $("." + selfId).length + " textarea").val('');
	});
	//theme options
	var hashSplit = "";
	$(window).bind("hashchange", function(event){
		if($.isFunction($.param.fragment) && $.param.fragment()!="")
		{
			var hash = decodeURIComponent($.param.fragment());
			hashSplit = hash.split("_");
			var id1, id2=null;
			if(hashSplit.length>1)
			{
				id1 = hashSplit[0];
				id2 = hash;
			}
			else
				id1 = hash;
			var tab = $('.theme_options .menu [href="#' + id1 + '"]');
			$(".theme_options .menu a").removeClass("selected");
			tab.addClass("selected");
			if(id2!=null)
			{
				$('.theme_options .submenu a').removeClass("selected");
				$('.theme_options .submenu [href="#' + id2 + '"]').addClass("selected");
			}
			$(".theme_options .submenu, .theme_options .subsettings").css("display", "none");
			tab.next(".submenu").css("display", "block");
			$(".theme_options .settings").css("display", "none");
			$('.theme_options #' + id1).css("display", "block");
			if(id2!=null)
				$('.theme_options #' + id2).css("display", "block");
			else if(tab.next(".submenu").length)
			{
				$('.theme_options .submenu a').removeClass("selected");
				$('.theme_options .menu [href="#' + id1 + '"]+.submenu li:first a').addClass("selected");
				$('.theme_options #' + id1 + " .subsettings:first").css("display", "block");
			}
		}
	}).trigger("hashchange");
	$('.theme_options .menu a').click(function(){
		$.bbq.pushState($(this).attr("href"));
	});
	$("#theme-options-panel").submit(function(event){
		event.preventDefault();
		var self = $(this);
		var data = self.serializeArray();
		$("#theme_options_preloader").css("display", "block");
		$("#theme_options_tick").css("display", "none");
		$.ajax({
				url: ajaxurl,
				type: 'post',
				dataType: 'json',
				data: data,
				success: function(json){
					$("#theme_options_preloader").css("display", "none");
					$("#theme_options_tick").css("display", "block");
					if($("#slider_id").val()!="")
					{
						if(!$("#edit_slider_id option[value='pressroom_slider_settings_" + $("#slider_id").val() + "']").length)
						{
							$("#edit_slider_id").append($("<option></option>").attr("value", "pressroom_slider_settings_" + $("#slider_id").val()).text($("#slider_id").val()));
							$("#edit_slider_id option[value='pressroom_slider_settings_" + $("#slider_id").val() + "']").attr("selected", "selected")
						}
					}
				}
		});
	});
	$('.theme_options #header_layout_type').change(function(){
		if(parseInt($(this).val())==2)
			$(".theme_options #header_top_right_sidebar_container").css("display", "inline");
		else
		{
			$(".theme_options #header_top_right_sidebar_container").css("display", "none");
			$(".theme_options #header_top_right_sidebar").val("");
		}
	});
	//dummy content import
	$("#import_dummy").click(function(event){
		event.preventDefault();
		if(!confirm("Please confirm the dummy data import."))
			return;
		var importTemplatesSidebars = ($("#import_templates_sidebars").is(':checked') ? 1 : 0);
		
		$("#dummy_content_tick").css("display", "none");
		$("#dummy_content_preloader").css("display", "inline");
		$("#dummy_content_info").html("Please wait and don't reload the page when import is in progress!");
		$.ajax({
				url: ajaxurl,
				type: 'post',
				//dataType: 'json',
				data: "import_templates_sidebars=" + importTemplatesSidebars + "&action=ql_importer_import_dummy&themename=" + config.themename,
				success: function(json){
					json = $.trim(json);
					var indexStart = json.indexOf("dummy_import_start")+18;
					var indexEnd = json.indexOf("dummy_import_end")-indexStart;
					json = $.parseJSON(json.substr(indexStart, indexEnd));
					$.ajax({
							url: ajaxurl,
							type: 'post',
							//dataType: 'json',
							data: "import_templates_sidebars=" + importTemplatesSidebars + "&action=ql_importer_import_dummy2&themename=" + config.themename,
							success: function(jsonSecond){
								jsonSecond = $.trim(jsonSecond);
								var indexStart = jsonSecond.indexOf("dummy_import_start")+18;
								var indexEnd = jsonSecond.indexOf("dummy_import_end")-indexStart;
								jsonSecond = $.parseJSON(jsonSecond.substr(indexStart, indexEnd));
								$("#dummy_content_preloader").css("display", "none");
								$("#dummy_content_tick").css("display", "inline");
								$("#dummy_content_info").html(json.info + (json.info!="" && jsonSecond.info!="" ? "<br><br>" : "") + jsonSecond.info);
							},
							error: function(jqXHR, textStatus, errorThrown){
								$("#dummy_content_preloader").css("display", "none");
								$("#dummy_content_info").html("Error during import:<br>" + jqXHR + "<br>" + textStatus + "<br>" + errorThrown);
								console.log(jqXHR);
								console.log(textStatus);
								console.log(errorThrown);
							}
					});
				},
				error: function(jqXHR, textStatus, errorThrown){
					$("#dummy_content_preloader").css("display", "none");
					$("#dummy_content_info").html("Error during import:<br>" + jqXHR + "<br>" + textStatus + "<br>" + errorThrown);
				}
		});
	});
	$("#import_shop_dummy").click(function(event){
		event.preventDefault();
		if(!confirm("Please confirm the shop dummy data import."))
			return;
		$("#dummy_shop_content_tick").css("display", "none");
		$("#dummy_shop_content_preloader").css("display", "inline");
		$("#dummy_shop_content_info").html("Please wait and don't reload the page when import is in progress!");
		$.ajax({
				url: ajaxurl,
				type: 'post',
				//dataType: 'json',
				data: "action=ql_importer_import_shop_dummy&themename=" + config.themename,
				success: function(json){
					json = $.trim(json);
					var indexStart = json.indexOf("dummy_import_start")+18;
					var indexEnd = json.indexOf("dummy_import_end")-indexStart;
					json = $.parseJSON(json.substr(indexStart, indexEnd));
					$("#dummy_shop_content_preloader").css("display", "none");
					$("#dummy_shop_content_tick").css("display", "inline");
					$("#dummy_shop_content_info").html(json.info);
				},
				error: function(jqXHR, textStatus, errorThrown){
					$("#dummy_shop_content_preloader").css("display", "none");
					$("#dummy_shop_content_info").html("Error during import:<br>" + jqXHR + "<br>" + textStatus + "<br>" + errorThrown);
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);
				}
		});
	});
	//colorpicker
	if($(".color").length)
	{
		$(".color").ColorPicker({
			onChange: function(hsb, hex, rgb, el) {
				$(el).val(hex);
				$(el).prev(".color_preview").css("background-color", "#" + hex);
			},
			onSubmit: function(hsb, hex, rgb, el){
				$(el).val(hex);
				$(el).ColorPickerHide();
			},
			onBeforeShow: function (){
				var color = (this.value!="" ? this.value : $(this).attr("data-default-color"));
				$(this).ColorPickerSetColor(color);
				$(this).prev(".color_preview").css("background-color", color);
			}
		}).on('keyup', function(event, param){
			$(this).ColorPickerSetColor(this.value);
			
			var default_color = ($("#color_scheme").val()!="blue" && typeof($(this).attr("data-default-color-" + $("#color_scheme").val()))!="undefined" ? $(this).attr("data-default-color-" + $("#color_scheme").val()) : $(this).attr("data-default-color"));
			$(this).prev(".color_preview").css("background-color", (this.value!="none" ? (this.value!="" ? "#" + (typeof(param)=="undefined" ? $(".colorpicker:visible .colorpicker_hex input").val() : this.value) : (default_color!="transparent" ? "#" + default_color : default_color)) : "transparent"));
		});
	}
	//color scheme
	$("#color_scheme").change(function(){
		$(".header_style_container").css("display", ($(this).val()=="high_contrast" ? "none" : "block"));
		$(".high_contrast_font_size").css("display", ($(this).val()=="high_contrast" ? "block" : "none"));
	});
	//google font subset
	$("#primary_font, #secondary_font, #text_font").change(function(event, param){
		var self = $(this);
		if(self.val()!="")
		{
			self.parent().find(".theme_font_subset_preloader").css("display", "inline-block");
			$.ajax({
					url: ajaxurl,
					type: 'post',
					data: "action=pressroom_get_font_subsets&font=" + $(this).val(),
					success: function(data){
						data = $.trim(data);
						var indexStart = data.indexOf("pr_start")+8;
						var indexEnd = data.indexOf("pr_end")-indexStart;
						data = data.substr(indexStart, indexEnd);
						self.parent().find(".theme_font_subset_preloader").css("display", "none");
						self.parent().find(".font_subset").css("display", "block");
						self.parent().find("select.font_subset").html(data)
					}
			});
		}
		else
			self.parent().find(".font_subset").css("display", "none").find("option").remove();
	});
	//upcoming classes widget
	$("#upcoming_classes_time_from").live("change", function(){
		$(this).parent().next().css("display", ($(this).val()=="server" ? "block" : "none"));
	});
	//post options
	$("[name='post_format']").change(function(){
		$(".video_row, .link_row, .quote_row, .audio_row, .gallery_row").css("display", "none");
		$("." + $(this).val() + "_row").css("display", ($(this).val()=="gallery" ? "block" : "table-row"));
	});
	$("[name='post_format'][checked]").prop("checked", true).trigger("change");
	//post is review
	$("[name='is_review']").change(function(){
		$(".repeated_row_review, .points_scale, #repeated_row_review, .percent_sign, .review_title, .review_description").css("display", "none");
		if($(this).val()!="no")
		{
			$(".repeated_row_review, .review_title, .review_description").css("display", "table-row");
			$("#repeated_row_review").css("display", "inline");
			if($(this).val()=="points")
				$(".points_scale").css("display", "table-row");
			else
				$(".percent_sign").css("display", "inline");
		}
		
	});
	$("[name='is_review'] option[selected]").prop("selected", true).trigger("change");
	//sidebars for templates
	$("#post #page_template").change(function(){
		var html = "";
		$("#pr_sidebars").remove();
		if(config.sidebars[$(this).val()].length)
		{
			html += "<div id='pr_sidebars'>";
			for(var i=0; i<config.sidebars[$(this).val()].length; i++)
			{
				html += "<p><strong>" + config.sidebar_label + " " + config.sidebars[$(this).val()][i]["label"] + "</strong></p>";
				html += "<select id='page_sidebar_" + i + "' name='page_sidebar_" + config.sidebars[$(this).val()][i]["name"] + "'>";
				for(var j=0; j<config.theme_sidebars.length; j++)
					html += "<option value='" + config.theme_sidebars[j]["id"] + "'" + (config.theme_sidebars[j]["id"]==config.page_sidebars[i] ? " selected='selected'" : "") + ">" + config.theme_sidebars[j]["title"] + "</option>";
				html += "</select>";
			}
			html += "</div>";
		}
		$(this).after(html);
	}).trigger("change");
	//layout chooser
	$("#layout").change(function(){
		$(".boxed_bg_image").css("display", ($(this).val()=="boxed" ? "block" : "none"));
	});
	$(".boxed_bg_image a").click(function(event, param){
		event.preventDefault();
		$(".boxed_bg_image .selected").removeClass("selected");
		$(this).parent().addClass("selected");
		$("#layout_style_input").val($(this).attr("class"));
	});
	$("#site_background_color").on("click", function(){
		$(this).prev().trigger("click");
	});
	$(".for_main_color a").on("click", function(event){
		event.preventDefault();
		$("#main_color").val($(this).data("color")).keyup();
		$("#main_color").prev().css("background-color", "#" + $(this).data("color"));
	});
});