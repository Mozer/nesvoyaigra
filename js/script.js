var timer_on = 0;

// main
$(document).ready(function(){
	
	// questions table
	var table_html = '';	
	for (var line in questions)
	{
		table_html += "<tr><td class='q_topics'>"+questions[line].title+"</td>";
		for (var question in questions[line].questions)
		{
			table_html += "<td class='q_prices active'><a class='js_a question_pop_a' id='q_"+line+"_"+question+"' data-row='"+line+"' data-col='"+question+"' data-points='"+questions[line].questions[question].price+"'>"+questions[line].questions[question].price+"</a></td>";
		}
		table_html += "</tr>\r\n";
	}
	$(".game_field").html(table_html);
	
	// show more players
	$(".show_more_players").click(function(){
		if ($(this).hasClass("is_hidden"))
		{
			$(".players_field .additional.hidden").removeClass("hidden").addClass("visible active");
			$(this).removeClass("is_hidden").addClass("is_visible");
		}
		else
		{
			$(".players_field .additional.visible").removeClass("visible active").addClass("hidden");
			$(this).removeClass("is_visible").addClass("is_hidden");
		}
	});
	
	// question pop
	$(document).on('click', '.question_pop_a', function(event){		
		$(".pop_wrap").removeClass("hidden").addClass("visible");
		$(this).css("visibility","hidden");		
		$(this).parent().removeClass("active").addClass("passive");
		$(".timer_time").removeClass("visible").addClass("hidden");
		$(".timer_start").removeClass("hidden").addClass("visible");
		$(".show_more_players").addClass("invisible");
		
		var t_id = $(this).attr('data-row');
		var q_id = $(this).attr('data-col');
		
		$('.answer_points_input').val($(this).attr('data-points'));
		$('.question_topic').html(questions[t_id].title);
		$('.question_body').html(questions[t_id].questions[q_id].q);
		$('.question_answer').html(questions[t_id].questions[q_id].a).addClass("hidden");
		if (questions[t_id].questions[q_id].img)
		{
			$('.question_img').html("<img src='"+questions[t_id].questions[q_id].img+"' />");
		}
		else $('.question_img').html("");
		
		// auction
		if (rand(1,8) == 1)
		{
			$(".question_hider").removeClass("visible").addClass("hidden");
			$(".auction").removeClass("hidden").addClass("visible");
		}
		else 
		{
			$(".question_hider").removeClass("hidden").addClass("visible");
			$(".auction").removeClass("visible").addClass("hidden");
		}
		
		$(".answer_player select").html("<option></option>");
		$(".player_name.active").each(function(){
			$(".answer_player select").append($('<option>', { value : $(this).attr("data-player") }).text($(this).val())); 
		});
		
	});
		
	// close pop
	$(document).on('click', '.pop_close', function(event){		
		$(".pop_wrap").removeClass("visible").addClass("hidden");
		$(".show_more_players").removeClass("invisible");
		timer_on = 0;		
	});
	
	// wrong
	$(document).on('click', '.answer_wrong', function(event){		
		timer_on = 0;		
		var p_id = $(".answer_player select").val();
		if (p_id !== '')
		{
			$('.player_score[data-player="'+p_id+'"]').val(parseInt($('.player_score[data-player="'+p_id+'"]').val()) - parseInt($('.answer_points_input').val()));
		}
		else alert("Игрок не выбран");
	});
	
	// correct
	$(document).on('click', '.answer_correct', function(event){				
		var p_id = $(".answer_player select").val();
		if (p_id !== '')
		{
			if ($(".auction").hasClass("hidden"))
			{
				$('.player_score[data-player="'+p_id+'"]').val(parseInt($('.player_score[data-player="'+p_id+'"]').val()) + parseInt($('.answer_points_input').val()));
				$(".pop_wrap").removeClass("visible").addClass("hidden");
				
				$('.player_name').removeClass("is_selected");			
				$('.player_name[data-player="'+p_id+'"]').addClass("is_selected");
				timer_on = 0;
				$(".show_more_players").removeClass("invisible");
			}
			else alert("Вопрос не был открыт");		
		}
		else alert("Игрок не выбран");		
	});
	
	// show answer
	$(document).on('click', '.show_answer', function(event){		
		$('.question_body').html($('.question_answer').html());
		timer_on = 0;
	});
	
	// close auction
	$(document).on('click', '.close_auction', function(event){
		var p_id = $(".answer_player select").val();
		if (p_id !== '')
		{
			$(".question_hider").removeClass("hidden").addClass("visible");
			$(".auction").removeClass("visible").addClass("hidden");
		}
		else alert("Игрок не выбран");
	});
	
	// timer start
	$(document).on('click', '.timer_start', function(event){		
		$(this).removeClass("visible").addClass("hidden");
		$(".timer_time").html("21").removeClass("hidden").addClass("visible");
		timer_on = 1;
		countdown();
	});
	
	// timer countdown
	$(document).on('click', '.timer_time', function(event){		
		
		if (timer_on) timer_on = 0;
		else 
		{
			if (parseInt($(".timer_time").html()) == 0) $(".timer_time").html("21")
			timer_on = 1;
			countdown();
		}
	});

}); 


//funactions

function rand( min, max ) {		
	if( max ) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	} else {
		return Math.floor(Math.random() * (min + 1));
	}
}

function countdown(  ) {	
	
	if (timer_on)
	{
		var c_time = parseInt($(".timer_time").html());
		c_time--;		
		if (c_time >= 0) 
		{
			$(".timer_time").html(c_time);
			setTimeout(countdown, 1000);			
		}
		else 
		{
			timer_on = 0;
		}
	}
	return 0;
}
