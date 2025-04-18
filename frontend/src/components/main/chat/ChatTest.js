import React, { useState, useEffect } from "react";
import TextArea from "../../TextArea";
import Button from "../../Button";
import axios from "axios";
const { messageTest } = require("../../../constants");

function ChatTest({ visible, onClose }) {
  const [chat, setChat] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await axios.get(`http://localhost:5000/chat-test`, {
        params: { email: email },
      });

      setChat(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    }
  };

  const handleSend = async () => {
    try {
      const email = localStorage.getItem("email");
      setLoading(true);
      let response = null;
      if (chat) {
        response = await axios.put(`http://localhost:5000/chat-test`, {
          id: chat._id,
          email: email,
          message: chat.message,
          response: [...chat.response, chatInput],
        });
      } else {
        response = await axios.post(`http://localhost:5000/chat-test`, {
          email: email,
          message: [messageTest.initial],
          response: [chatInput],
        });
      }
      if (response) {
        setChatInput("");
        fetchChats();
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to send chat:", error);
      return null;
    }
  };

  return (
    <>
      {" "}
      {!visible ? null : (
        <div className="flex flex-col mx-auto pb-5" style={{ height: "80vh" }}>
          <div className="flex justify-between mb-5">
            <div className="w-20">
              <Button type="button" name="Back" onClick={onClose} />
            </div>
            <div className="w-32">
              <Button type="button" name="New Chat" onClick={() => setChat(null)} />
            </div>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto mb-10">
            {!chat && (
              <div className="flex justify-start">
                <div className="rounded-lg p-2 bg-purple-200 text-left mr-2 w-2/3">{messageTest.initial}</div>
              </div>
            )}

            {chat && (
              <div className="flex flex-col gap-4 w-full">
                {chat.message.map((message, index) => (
                  <div key={index}>
                    <div className={"flex justify-start"}>
                      <div className={"p-2 bg-purple-200 w-2/3 rounded-md shadow-md"}>
                        {message.includes("\n**") ? (
                          message.split("\n").map((line, idx) => {
                            if (line.startsWith("**")) {
                              return (
                                <div key={idx}>
                                  <strong>{line.trim().replace(/\*+/g, "")}</strong>
                                  <br />
                                </div>
                              );
                            } else if (line.startsWith("*")) {
                              return (
                                <div key={idx}>
                                  {line.substring(0, 2)}
                                  <strong>{line.substring(2, line.lastIndexOf(":") + 1)}</strong>
                                  {line.substring(line.lastIndexOf(":") + 1)}
                                  <br />
                                </div>
                              );
                            } else {
                              return (
                                <div key={idx}>
                                  {line.trim()}
                                  <br />
                                </div>
                              );
                            }
                          })
                        ) : (
                          <div>{message}</div>
                        )}
                      </div>
                    </div>
                    {chat.response[index] && (
                      <div className="flex justify-end mt-5">
                        <div className={"p-2 bg-blue-200 w-2/3 rounded-md shadow-md"}>
                          {chat.response[index]}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {loading ? <div className="mt-10 text-blue-500">Waiting...</div> : null}

          {chat?.disable ? null : (
            <form
              className="flex flex-row mt-auto"
              onSubmit={async (e) => {
                e.preventDefault();
                await handleSend();
              }}>
              <TextArea
                type="text"
                value={chatInput}
                setValue={setChatInput}
                placeholder="Type your message..."
                required={true}
              />

              <div className="w-20 flex items-center bg-purple-600 rounded-r-md">
                <Button type="submit" name="Send" />
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
}

export default ChatTest;
