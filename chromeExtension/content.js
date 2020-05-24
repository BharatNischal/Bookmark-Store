// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {
//     console.log(request.command);
//
//     var div = document.createElement('div');
//     var label = document.createElement('span');
//     label.textContent = "Hello, world";
//     div.appendChild(label);
//     document.body.appendChild(div);
//
//     sendResponse({result: "success"});
// });

// chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
//     console.log(request.command);
//     if(request.command == "error"){
//         document.getElementById("capabilities").innerText = "red";
//     }
//     document.getElementById("capabilities").innerText = "blue";
// })
// document.getElementById("capabilities").innerText = "pink";


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.command == "error")
      sendResponse({farewell: "goodbye"});
  });
