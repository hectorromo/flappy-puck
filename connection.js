// When clicked, connect or disconnect
var connection;
var connectButton = document.getElementById("connectPuck");
console.log(connectButton)

connectButton.addEventListener("click", function() {
  if (connection) {
    log("Closing connection");
    connection.close();
    connection = undefined;
  }
  log("Opening connection");
  Puck.connect(function(c) {
    if (!c) {
      log("Couldn't connect!");
      return;
    }
    log("Connecting...");
    connection = c;
    // Handle the data we get back, and call 'onLine'
    // whenever we get a line
    var buf = "";
    connection.on("data", function(d) {
        console.log('clicked');
        if (pipe_flag == true){
            bird.up();
        }
    //   buf += d;
    //   var i = buf.indexOf("\n");
    //   while (i>=0) {
    //     onLine(buf.substr(0,i));
    //     buf = buf.substr(i+1);
    //     i = buf.indexOf("\n");
    //   }
    });
    // First, reset Puck.js
    connection.write("\x10reset();\n", function() {
      // Wait for it to reset itself
      setTimeout(function() {
          console.log('WRITE');
        // Now tell it to write data on the current light level to Bluetooth 10 times a second
        connection.write("\x10setWatch(function(){Bluetooth.println('Pressed');},BTN,{repeat:true,debounce:50,edge:'rising'});\n",
          function() { 
              log("Ready!"); 
              puckConnected = true;
            });
      }, 1500);
    });
  });
});