$(document).ready(function(){

  callData();

  // $(document).on('click','span.delete', function(){
  //   var idToDo = $(this).parent().attr('data-id');
  //   deleteElement(idToDo);  //ADD
  // });

  $('.post').click(function(){
    var nuovoItem = $('#nuovo-item').val();
    createElement(nuovoItem);
  });

});

function callData() {
  $.ajax(
    {
      url: 'http://157.230.17.132:3011/todos',
      method: 'GET',
      success: function(risposta){
        getElement(risposta)
      },
      error: function(){
        alert('Errore');
      }
    }
  );
}

function getElement(data) {
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < data.length; i++) {
    var context = {
      text: data[i].text,
      id: data[i].id
    };
  }

  var html = template(context);
  $('.todos').append(html);

  // console.log(id);
  console.log(context);
}

//Crea nuovo elemento
function createElement(elemento) {

  $.ajax(
    {
      url: 'http://157.230.17.132:3011/todos',
      method: 'POST',
      data:
      {
        text: elemento
      },
      success: function(risposta){
        
        $('.todos').html('');
        callData();

      },
      error: function(){
        alert('Errore');
      }
    }
  );

}



// Cancella elemento
// function deleteElement() {
//
// }
