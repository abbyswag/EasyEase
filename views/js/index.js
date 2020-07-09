//fetch feature models 
const creators = document.querySelectorAll('.model-creator-identity')
const modelViews = document.querySelectorAll('.model-views')
const modelLikes = document.querySelectorAll('.model-likes')
const modelBodies = document.querySelectorAll('.model-body')

fetch('/model/features')
.then((res)=>{
    return res.json()
}).then((modelArr)=>{
    modelArr.forEach((model,index)=>{
        creators[index].innerHTML = model.creator
        modelViews[index].innerHTML = model.views
        modelLikes[index].innerHTML = model.likes
        modelBodies[index].style.backgroundImage = 'url('+model.thumbnailPath+')'
    })
}).catch((err)=>console.log(err))