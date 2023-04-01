const WebSocket = require("ws");

// create a new WebSocket connection to the server
const ws = new WebSocket(
  "wss://ws-us2.pusher.com/app/eb1d5f283081a78b932c?protocol=7&client=js&version=7.4.0&flash=false"
);

// listen for the WebSocket connection to open
ws.on("open", function () {
  console.log("WebSocket connection opened");

  // subscribe to the channel you want to listen to
  const data = {
    event: "pusher:subscribe",
    data: {
      channel: "channel.715",
    },
  };
  ws.send(JSON.stringify(data));
});

// listen for WebSocket messages
ws.on("message", function (message) {
  // parse the message as JSON
  const data = JSON.parse(message);

  // check if the event is a ChannelSubscriptionEvent
  if (data.event === "App\\Events\\ChannelSubscriptionEvent") {
    console.log("ChannelSubscriptionEvent received:", data.data);
  }
 // check if the event is a LuckyUsersWhoGotGiftSubscriptionsEvent
  if (data.event === "App\\Events\\LuckyUsersWhoGotGiftSubscriptionsEvent") {
    console.log("ChannelSubscriptionGiftEvent received:", data.data);
  }
});

// listen for WebSocket errors
ws.on("error", function (error) {
  console.error("WebSocket error:", error);
});

// listen for the WebSocket connection to close
ws.on("close", function () {
  console.log("WebSocket connection closed");
});
