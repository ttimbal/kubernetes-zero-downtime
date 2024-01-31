## DEPLOY KUBERNETES WITH ZERO DOWNTIME USING MULTIPLE COLORS AND SOCKETS
> **_NOTE:_**  You can use commit hash instead color, this is just illustrative.


### Deploy server
1. You can use the image in `template.yml` or if you prefer you can build your own image using the `Dockerfile` in the `server` folder.
    <br>
    To build the image, run the following command in the `server` folder in `package.json`:
    ```bash
      "docker:build": "docker build -t socket-server .",
      "docker:tag": "docker tag socket-server timbal/socket-server:latest",
      "docker:push": "docker push timbal/socket-server:latest"
    ```
2. To run the application on kubernetes you need to run the following command in the `server` folder in `package.json`:
    ```bash
      "kub:deploy": "node changeColor.js && kubectl apply -f kub.yml"
    ```
   Example: `npm run kub:deploy --my_color=red`
   <br>
   The changeColor.js file replace the color in the template and save in kub.yml file, after the kub.yml file is applied

### Deploy client
This is more easy, you just need to run the following command in the `web` folder in `package.json`:
```bash
    "dev": "node index.js",
```
Don't forget update the `const socket = io('ws://192.168.59.101:31000')` with your server address in the index.html

### How to test
1. Run the server with a color, e.g. red
2. Run the client
3. Open the client in your browser, and don't reload it
4. Check logs in your red pods, you will see a client connected
5. Run the server with a different color, e.g. blue
6. Open another client in another tab, and don't reload it
7. Check logs in your blue pods, you will see a client connected, and check again the red, the client continue connected
8. Open another client in another tab, and don't reload it
9. Check logs in your blue pods, you will see a new client connected, and check again the red, the first client continue connected
10. Reload your first tab, and check the logs in your red pods, you will see a client disconnected
11. Check the logs in your blue pods, you have a new client connected, this client is the first in red pod

### How it works
When we deployed the server with red color, the Service select the red pods to send the request, 
when we deployed the server with blue color, 
the service select the blue pods to send the request, 
and the red pods continue receiving the request from the clients connected before the blue deployment, 
and the blue pods continue receiving the request from the clients connected after the blue deployment. 
