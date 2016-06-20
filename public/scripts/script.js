console.log("script.js working");

$(document).ready(function(){
  $('#addButton').on('click', function(){
    console.log("addButton Clicked!");
    var newTask = $('#taskIn').val();
    var objectToSend = {
      "task": newTask
    };



    $.ajax({
      type: 'POST',
      url: '/postRoute',
      data: objectToSend
    });//end ajax postRoute
    window.location.href=window.location.href;

  });//end submit button

  $('#outputDiv').on('click', '#comButton', function () {
    console.log('comButton clicked!');
    var delId = $(this).attr('data-id');
    var taskId = {
      'id': delId

    };

    console.log(taskId.id);
    $.ajax({
      type:'POST',
      url:'/delPost',
      data: taskId
    });
  });//end delete button
$('#outputDiv').on('click', '#checkbox', function () {
  console.log('bird checked checkbox');
  var checked = $(this).val();
  console.log(checked);
  if ($('#checkbox').is(':checked')){
    console.log('bird has checked it seriously');
    $(this).css("background", "red");

  }else {
    console.log('birds wings arent checking');
  }
});
    $.ajax({
      type: 'GET',
      url:'/getTask',
      success: function (data) {
        showTasks(data);
      }
    });
    function showTasks(tasks) {
      for( i=0; i < tasks.length; i++){
        console.log("bird is in showTasks and sees: " + tasks);
        var newParagraph = document.createElement('div');
        newParagraph.textContent = "Your Acomplist! What to do: " + tasks;
        $('#outputDiv').append("<li class='col-sm-4'><p><input type='checkbox' id='checkbox' name='checkbox'>" + "Task: " + tasks[i].task + "</br> <button class ='btn btn-info' type='button' id='comButton' name='comButton' data-id='" + tasks[i].id + "'>Delete</button>" + "</p></li>" );
      }
    }

  });
