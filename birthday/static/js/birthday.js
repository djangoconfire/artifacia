(function ($, Clarifai) {
	$(document).ready(function () {
		initialize()
	})

	var app = $(".app")
	var imageInput = $("#imageUrl");
	var submitButton = $("#submitBtn");
	var image = $("#image");
	var tagsContainer = $(".tags-container");
	var tags = $(".tags")
	var tag_list=[];

	submitButton.on("click", function (event) {
		// getting the input from the image
		var url = imageInput.val()
		//var image_static_url='/media/bithday_party/images/' + url
		tagsContainer.hide()
		image.attr("src", url)

		Clarifai.getTagsByUrl(url,function(error,response){
			if (error){
				displayError(error);
			}
			else{
				//console.log(response.results[0].url)
				displayTag(response);

				var image =response.results[0]
				var tag= image.result.tag
				var tag_length=tag.classes.length

				for(var i=0;i<tag_length;i++){
					tag_list.push(tag.classes[i])

				}


				// sending request to backend
				$.ajax({

                    url:'/birthday/upload_image/',
                    type:'post',
                    data:{form_data:tag_list},
                    success: function(data){
                        var jsondata=data;
                        if(typeof jsondata == 'object'){
                            if(jsondata['success'] == 'True'){
                                alert('successfully');

                            }

                            else{
                                alert('error occcurred');
                            }
                        }

                        else{
                            alert('not a jsonresponse');
                        }
                    }
                });    

			}
		})

	});

	// displaying tag
	function displayTag (response) {
		//console.log(response)

		var image 	= 	response.results[0]
		var tag 	= 	image.result.tag
		//console.log(tag);

		var tag_length = tag.classes.length

		//console.log(tag_list)

		var associated_tags = tag.classes.map(function (value, index, array) {
			//console.log(associated_tags);
			return `<h4>${value}</h4>`
			})

		tags.html(associated_tags)
		//alert(typeof tag_list)

		// displaying the hidden container
		tagsContainer.show()

	}


	function displayError (error) {

		// Preparing the error message
		var errorMessage = "<p>" + error.status_msg + "</p>" 
		var errorHtml = "<div class='errorBox'><h1>Error ❌</h1>" + errorMessage + "</div>"

		tags.html(errorHtml)
		tagsContainer.show()
	}


	// function to initialize the keys
	function initialize () {
		var keys = getKeys() || {}

		var clientId = keys["client_id"]
		var clientSecret = keys["client_secret"]

		if (!clientId || !clientSecret) {
			app.html("Please enter client id and client secret")
		}
		else {

		// Initialize the Clarifai api here
			Clarifai.initialize({
				clientId:clientId,
				clientSecret:clientSecret
			})			
		}


	}
}(jQuery, Clarifai));