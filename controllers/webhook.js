"use strict";
const token = process.env.TOKEN;
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const Webhook = require("../models/webhook");

const triggerMessages = ["hello", "hi"];
let msgBody = "";

exports.testHook = (req, res) => {
  res.status(200).json({ messege: "hello" });
};

exports.sendMessage = (req, res) => {
 
  //console.log(resp)
  var data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: req.body.to,
    type: "text",
    text: {
      body: req.body.msgBody,
    },
  });

  var config = {
    method: "post",
    url:
      "https://graph.facebook.com/v15.0/" +
      req.body.phoneNumberId +
      "/messages",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
    console.log(response.data)
    try {
          const msgData = {
            messageId: response.data.messages[0].id,
            phoneNumberId:  req.body.phoneNumberId,
            from: req.body.to,
            messageBody: req.body.msgBody,
            status: true,
            reply:true
          };

          // req.body.status = false;
          // req.body.messageId = uuidv4();
          console.log(msgData);
          // req.body.password = hashPassword;
          // console.log(hashPassword);
          Webhook.create(msgData)
            .then((data) => {
              console.log({ data });
              res.json({ message: "Message sent successfully", data });
            })
            .catch((err) =>
              res.status(400).json({
                message: "unable to send message",
                error: err.message,
              })
            );
        } catch {
          console.log("errorr")
          
        }
      // res.status(200).json({ messege: response.data });
      // console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      res.status(404).json({ messege: error });
    });
};

exports.getUnreadMessages = (req, res) => {
  console.log("inside");
  const query = {
    status: false,
  };
  console.log({ query });
  Webhook.find(query)
    .sort({ createdAt: -1 })
    .then((question) => {
      console.log({ question });
      res.status(200).json(question);
    })
    .catch((err) =>
      res.status(404).json({ message: "no chat found", error: err.message })
    );
};

exports.getMessagesByFrom = (req, res) => {
    console.log("inside");
    const query = {
      from: req.params.id,
    };
    console.log({ query });
    Webhook.find(query)
      .sort({ createdAt: -1 })
      .then((question) => {
        console.log({ question });
        res.status(200).json(question);
      })
      .catch((err) =>
        res.status(404).json({ message: "no chat found", error: err.message })
      );
  };

exports.updateWhatsapp = (req, res) => {
  console.log("id: ", req.params.id);
  //console.log("body: ", req.body);
  Webhook.findOneAndUpdate({ messageId: req.params.id }, { ...req.body })
    .then((user) => {
      console.log("edit", { user });
      return res.json({ message: "updated successfully", user });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ error: "unable to update user", message: err.message });
    });
};

exports.getWhatsapp = (req, res) => {
  console.log("inside get webhook");
  /**
   * UPDATE YOUR VERIFY TOKEN
   *This will be the Verify Token value when you set up webhook
   **/
  const verify_token = process.env.MYTOKEN;

  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === verify_token) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};

exports.postWhatsapp = (req, res) => {
  // Parse the request body from the POST
  console.log("inside post webhook");
  let body = req.body;

  // Check the Incoming webhook message
  console.log(JSON.stringify(req.body, null, 2));

  // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  if (req.body.object) {
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
      let phone_number_id =
        req.body.entry[0].changes[0].value.metadata.phone_number_id;
      let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
      let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload
      let msg_id = req.body.entry[0].changes[0].value.messages[0].id;
      let phonenumber_id =
        req.body.entry[0].changes[0].value.metadata.phone_number_id;
      let profile_name =
        req.body.entry[0].changes[0].value.contacts[0].profile.name;
      let conversation_id = req.body.entry[0].id;

      console.log(from, phone_number_id, msg_body, msg_id);

      if (triggerMessages.includes(msg_body.toLowerCase())) {
        console.log("trigger message");

        //console.log(resp)
        msgBody =
          "Hi, Welcome to Hearwell. Ask any question relate to your hearing aid. Thank You.";
        var data = JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: from,
          type: "text",
          text: {
            body: msgBody,
          },
        });

        var config = {
          method: "post",
          url:
            "https://graph.facebook.com/v15.0/" + phone_number_id + "/messages",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });

        
      } else {
        try {
          const msgData = {
            messageId: msg_id,
            phoneNumberId: phonenumber_id,
            from: from,
            messageBody: msg_body,
            profileName: profile_name,
            conversationId: conversation_id,
            status: false,
          };

          req.body.status = false;
          req.body.messageId = uuidv4();
          console.log(req.body);
          // req.body.password = hashPassword;
          // console.log(hashPassword);
          Webhook.create(msgData)
            .then((data) => {
              console.log({ data });
              res.json({ message: "Message sent successfully", data });
            })
            .catch((err) =>
              res.status(400).json({
                message: "unable to send message",
                error: err.message,
              })
            );
        } catch {
          
        }
      }

      // axios({
      //   method: "POST", // Required, HTTP method, a string, e.g. POST, GET
      //   url:
      //     "https://graph.facebook.com/v15.0/" +
      //     phone_number_id +
      //     "/messages?access_token=" +
      //     token,
      //   data: {
      //     messaging_product: "whatsapp",
      //     to: from,
      //     text: { body: "Ack: " + msg_body },
      //   },
      //   headers: { "Content-Type": "application/json" },
      // });
//       axios
//         .get(
//           "http://api.brainshop.ai/get?bid=171600&key=4V9pL8FJwPDFPhf6&uid=fyu76fyuy&msg=" +
//             msg_body
//         )
//         .then((resp) => {
//           //console.log(resp)
//           var data = JSON.stringify({
//             messaging_product: "whatsapp",
//             recipient_type: "individual",
//             to: from,
//             type: "text",
//             text: {
//               body: msgBody ? msgBody : resp.data.cnt,
//             },
//           });

//           var config = {
//             method: "post",
//             url:
//               "https://graph.facebook.com/v15.0/" +
//               phone_number_id +
//               "/messages",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + token,
//             },
//             data: data,
//           };

//           axios(config)
//             .then(function (response) {
//               console.log(JSON.stringify(response.data));
//             })
//             .catch(function (error) {
//               console.log(error);
//             });
//         });
    }
    res.sendStatus(200);
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    res.sendStatus(404);
  }
};
