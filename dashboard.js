// Materialize.toast(message, displayLength, className, completeCallback);
$(document).on('click', function () {
      /*
             chrome.storage.onChanged.addListener(function(changes, namespace) {
              for (key in changes) {
                var storageChange = changes[key];
                console.log('Storage key "%s" in namespace "%s" changed. ' +
                            'Old value was "%s", new value is "%s".',
                            key,
                            namespace,
                            storageChange.oldValue,
                            storageChange.newValue);
              }
            });
      */

      $("#target").submit(function (event) {
            Materialize.toast('Today Added!', 2000) // 4000 is the duration of the toast
            var val = $("#todo").val();

            chrome.storage.sync.get("todos", function (todos) {
                  // Notify that we saved.
                  message('Settings saved');
            });


            // Save it using the Chrome extension storage API.
            chrome.storage.sync.set({
                  'value': val
            }, function () {
                  // Notify that we saved.
                  message('Settings saved');
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