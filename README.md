# Devfest 2023 Submission: Dream Journey

Many people would like to keep dream journals, but often lack the motivation to do so. ```Dream Journey``` is a website that aims to make the activity of keeping a
dream journal more fun by using ```Stable Diffusion``` (an open source image generation software) to create illustrations of dreams based on their textual description.

![](https://i.postimg.cc/pTSND4Vy/ezgif-com-video-to-gif.gif)

# How it works
As depicted in the image below, ```Dream Journey``` has four main components, that interact to create the final product:
  * Website: made with ```JavaScript``` and ```React```.
  * Backend Server: made with ```Python``` and ```Flask```.
  * Database: made with ```Firebase```.
  * ```Stable Diffusion``` API: we didn't make the API, we simply interact with it through API requests. Check them out [here](https://stablediffusionapi.com/).
  
![](https://i.postimg.cc/FKNt9hqy/dev.png)
When the user interacts with the website, the website makes ```POST``` requests to the backend server, either requesting data (such as the user's records), or sending
data (when the user creates new records). In order to answer the ```POST``` requests, the backend server makes further calls to the database (either to query existing
data or to store new data) and to the ```Stable Diffution``` API (to generate new images).
  
# Repository structure
  
 
