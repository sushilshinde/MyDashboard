// Materialize.toast(message, displayLength, className, completeCallback);
$(function () {

      function loadTodos(){
             chrome.storage.sync.get(["todoList"], function (todos) {
                  var td = todos.todoList || [];

                  var str ="";

                  td.forEach(function (element) {
                        str = str + '<li class="collection-item hoverable" style="background-color: rgba(255, 255, 255, 0.85);">' +
                              '<div>' + element+ '<a href="#!" class="secondary-content"><i class="material-icons red-text" >delete</i></a>&nbsp;<a style="padding-right:15px" href="#!" class="secondary-content"><i class="material-icons">done</i></a></div>' +
                              '</li>';
                  console.log(element);

                  });

                  $("#todo-list").html(str);
               
            });
      }

      loadTodos();

      chrome.storage.onChanged.addListener(function (changes, namespace) {
           loadTodos();
      });


      $("#target").submit(function (event) {
            Materialize.toast('Today Added!', 0) // 4000 is the duration of the toast
            var val = $("#todo").val();
            $("#todo").val("");
            //TODO : new Date().getTime() as TODO ID
            chrome.storage.sync.get(["todoList"], function (todos) {
                  var td = todos.todoList || [];
                  td.push(val);
                  //console.log(td);
                  chrome.storage.sync.set({
                        'todoList': td
                  });

                 // console.log(todos);
            });

            event.preventDefault();
      });

      function saveChanges() {
            // Get a value saved in a form.
            var theValue = textarea.value;
            // Check that there's some code there.
            if (!theValue) {
                  message('Error: No value specified');
                  return;
            }
            // Save it using the Chrome extension storage API.
            chrome.storage.sync.set({
                  'value': theValue
            }, function () {
                  // Notify that we saved.
                  message('Settings saved');
            });
      }

})