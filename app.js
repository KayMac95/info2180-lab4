
window.addEventListener('DOMContentLoaded', function(){

    

    let searchButton = document.getElementById('searchbtn');
        searchButton.addEventListener('click', function(){
            search();
        });

});



function search(){

    fetch('superheroes.php')
        .then(response => response.text())
        .then(data => {
        alert(data);
        })
        .catch(error => {
        console.log(error);
        });

    }

 
