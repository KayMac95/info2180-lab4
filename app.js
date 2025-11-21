

$( document ).ready(function(){
    let searchButton = $("#searchbtn");
    searchButton.click(function(){

        let userInput =  $("#searchfield").val().trim(); // removal of any leading or trailing whitspace
        userInput = userInput.toLowerCase(); // convert input to lowercase (will be used for handling retrieval consistency)
        
        // Check that the input does not exceed the max # of words (2) in superhero name or alias
        const count_words = userInput.split(/\s+/);
        if (count_words.filter(word => word.length).length > 2){
            userInput = ""; // safely set the input to the blank input condition and return the superhero list
        }



        $.ajax({
            url: "superheroes.php",
            type: "POST",
            dataType: "json",
            data: {
                name: userInput
            }
        })
        .done(function(result){
            
            let result_div = $("#result");
            result_div.css('visibility', 'visible');
            if (Array.isArray(result) && Object.keys(result).length > 3 ){ //An array for aliases was returned (blank option)
                let list = '<ul>';
                for (alias in result){
                    list += `<li>${result[alias]}</li>`; 
                }
                list+='</ul>';
                result_div.html(list);

            }
            else if (Object.keys(result).length == 3){ 
                let html_structure = `<h3>${result.alias}</h3><h4>A.K.A. ${result.name}</h4> <p>${result.biography}</p>`;
                result_div.html(html_structure);
            }       

            else {
                result_div.html(result);
            }

        
            //console.log("Results returned");
            //let result_div = $("#result");
            //result_div.html(result);
            //console.log(result);
        })
        .fail(function(result){
            console.log("Something went wrong.");
        });
    });
});