# CopyClipboard
Combines clipboard of the machine.

This is a simple application used to combine clipboards of yor system(s).

Problem : You are a mighty developer with multiple CPU(s) at your workstation or a laptop and a desktop. And you just need to copy some data from one CPU to another. You might use a messaging application, open a file in shared location or the worst manually write it. To save you from this trouble we have got copy clipboard. Setting up would take some time but its worth the effort.

Files:
  clipboard_server.js refered as Server
  clipboard_client.js refered as Client

Set up:
  -Run Server on a machine make note of its IP
        node clipboard_server.js <PORT_NUMBER>
   by default it take port number as 2104.
   
  -Run Client one the machines you want to clipboard to be combined
        node clipboard_client.js <IP_OF_SERVER> <PORT_OF_SERVER>

Note: If your server PC is the one you want to combine the clipboard , you need to run Client there as well.
