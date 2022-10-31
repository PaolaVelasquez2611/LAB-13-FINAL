class Post{

    constructor(user, message){
        this.user = user;
        this.message = message;

        
    }

    render(){
        console.log("render");
    }

}


const menubutton = document.getElementById('menubutton');
const menu = document.getElementById('menu');
const content = document.getElementById('content');
const content2  = document.getElementById('content2');
const content3  = document.getElementById('content3');
const addPost = document.getElementById('addPost');
const localStorage = window.localStorage;
let posts = []


function loadPosts(json){
    content.innerHTML =""
    content2.innerHTML =""
    content3.innerHTML =""
    console.log(json);
    posts = JSON.parse(json);
    console.log(posts);
    let html = "";
    for(let i=0 ; i < posts.length ; i++){
        let post = new Post(posts[i].user, posts[i].message);
        html = `<div class="jansport"><h2>${post.message}</h2><div class="alignitems"><button id=${posts[i].id} onClick="buttonAction(this)" class="priorityButton">★</button><button id=${posts[i].id} onClick="buttonAction(this)" class="checkButton">✔</button><button id=${posts[i].id} onClick="buttonAction(this)" class="To-Do">✍</button><button id=${posts[i].id} onClick="buttonAction(this)" class="deleteButton">✘</button></div></div>`;
        if(posts[i].estado=="toDo"){
            content.innerHTML += html;
        }else if(posts[i].estado=="priority"){
            content2.innerHTML += html;
        }else if(posts[i].estado=="completed"){
            content3.innerHTML+=html
        }
    }
   
}



function buttonAction(button){
    console.log(button.className)
    let json;
    if(button.className=="priorityButton"){
       for (let i = 0; i < posts.length; i++) {
            if(button.id==posts[i].id){
                console.log("aaa")
                posts[i].estado="priority"
                json = JSON.stringify(posts);
                localStorage.setItem('posts', json);
            }
       }
    }else if(button.className=="checkButton"){
        for (let i = 0; i < posts.length; i++) {
            if(button.id==posts[i].id){
                posts[i].estado="completed"
                json = JSON.stringify(posts);
                localStorage.setItem('posts', json);
            }
       }
    }else if(button.className=="To-Do"){
        for (let i = 0; i < posts.length; i++) {
            if(button.id==posts[i].id){
                posts[i].estado="toDo"
                json = JSON.stringify(posts);
                localStorage.setItem('posts', json);
            }
       }
    }else{
        for (let i = 0; i < posts.length; i++) {
            if(button.id==posts[i].id){
                posts[i].estado="delete"
                json = JSON.stringify(posts);
                localStorage.setItem('posts', json);
            }
       }
    }
    loadPosts(json)
}

//Cargar informacion del localstorage
let savedPost = localStorage.getItem('posts');
if(savedPost != null){
    //Sí hay informacion almacenada
    loadPosts(savedPost);
}



addPost.addEventListener('click', function(){
    window.location.href = "taskComposer.html"
});

