# CopyClipboard
Combines clipboard of the machine.

This is a simple application used to combine clipboards of yor system(s).

Problem : You are a mighty developer with multiple CPU(s) at your workstations and a laptop , you just need to copy some data from one CPU to another. You might use a messaging application or open a file in shared location or the worst manually write it. To save you from this trouble we have got copy clipboard.

There is some change from previous implementation.

Files:
  clipboard_peer.js referred as Peer

Set up:
  -Run Peer on a machine make note of its IP
        node clipboard_peer.js -p <PORT_NUMBER> -ip <IP_OF_PEER>
   
Note:
  -Make sure you keep the ports same across all the peers.