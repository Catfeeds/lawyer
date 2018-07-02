function locations(self,update)
{
	$.ajax({
		type: "GET",
		url: 'Locations/updateLocation',
		data: {'lctcode':self.value},
		dataType: 'json',
		success: function(data)
		{
			var html ='';
			if(update=='city')
			{	
				html = "<option value=''>选择城市</option>";
				$('#district').html("<option value=''>选择县,区</option>");
			}else
			{
				html ="<option value=''>选择县,区</option>";
			}
			
			for (var i = 0; i < data.length; i++) 
			{
				html = html + "<option value='"+ data[i].Location.lctcode +"'>"+data[i].Location.name+"</option>";
			}
			$('#'+update).html(html);
		}
	});
}