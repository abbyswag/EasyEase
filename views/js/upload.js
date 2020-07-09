// for cotegory option of upload form
let categoryCount = 1
const categoryList = document.querySelector('.category-list')
const categoryNames = document.querySelectorAll('.category-name')
document.querySelector('.model-categories p').addEventListener('click',()=>{
    if(categoryCount%2===0)categoryList.style.display = 'block'
    else categoryList.style.display = 'none'
    categoryCount++
})
categoryNames.forEach((name)=>{
    name.addEventListener('click',()=>{
        categoryList.style.display = 'none'
        document.querySelectorAll('.uploadForm input')[2].style.display = 'block'
        document.querySelectorAll('.uploadForm input')[2].value = name.innerHTML
    })
})


// for sub-category option of upload
let subCategoryCount = 1
const subCategoryList = document.querySelector('.sub-category-list')
const subCategoryNames = document.querySelectorAll('.sub-category-name')
document.querySelector('.model-sub-categories p').addEventListener('click',()=>{
    if(subCategoryCount%2===0)subCategoryList.style.display = 'block'
    else subCategoryList.style.display = 'none'
    subCategoryCount++
})
subCategoryNames.forEach((name)=>{
    name.addEventListener('click',()=>{
        subCategoryList.style.display = 'none'
        document.querySelectorAll('.uploadForm input')[3].style.display = 'block'
        document.querySelectorAll('.uploadForm input')[3].value = name.innerHTML
    })
})

// post req to check username for upload form
const upload_inputs = document.querySelectorAll('.uploadForm input')
upload_inputs[1].addEventListener('focusout',()=>{
    fetch('/model/checkuser',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            username:upload_inputs[1].value
        })
    }).then((res)=>{
        return res.json()
    }).then((msg)=>{
        document.querySelector('.upload-form-msg').innerHTML = msg.message
    })
    .catch((err)=>console.log(err))
})