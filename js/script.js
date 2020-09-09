$(document).ready(function(){

  callData();

  $(document).on('click','span.delete', function(){
    var idToDo = $(this).parent().attr('data-id');
    deleteElement(idToDo);  //ADD
  });

  $('.post').click(function(){
    var nuovoItem = $('#nuovo-item').val();
    createElement(nuovoItem);
  });

  $('#nuovo-item').keyup(function(event) {

    if ( (event.keyCode == 13) || (event.which == 13) ) {
      var nuovoItem = $('#nuovo-item').val();
      createElement(nuovoItem);
    }

  });

});

// Get data from API
function callData() {
  $.ajax(
    {
      url: 'http://157.230.17.132:3011/todos',
      method: 'GET',
      success: function(risposta){
        printElement(risposta)
      },
      error: function(){
        alert('Errore');
      }
    }
  );
}

//Stampa item
function printElement(data) {
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < data.length; i++) {
    var context = {
      text: data[i].text,
      id: data[i].id
    };

    var html = template(context);
    $('.todos').append(html);
  }
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

        if (elemento !== '') {
          $('.todos').html('');
          callData();
          // alert('Inserisci una voce')
        } else {
          // $('.todos').html('');
          // callData();
          alert('Inserisci una voce');
        }

        // $('.todos').html('');
        // callData();

      },
      error: function(){
        alert('Errore');
      }
    }
  );

}



// Cancella elemento
function deleteElement(id) {

  $.ajax(
    {
      url: 'http://157.230.17.132:3011/todos/' + id,
      method: 'DELETE',
      success: function(risposta){
        $('.todos').empty();
        callData();
        printElement(risposta)
      },
      error: function(){
        alert('Errore');
      }
    }
  );

}
