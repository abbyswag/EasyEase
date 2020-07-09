//fetch data from /member
let memberNames = document.querySelectorAll('.member-name')
let memberCredits = document.querySelectorAll('.member-credit')
let memberPics = document.querySelectorAll('.member-pic')
document.querySelector('.community-page').addEventListener('click',fetch_members)
function fetch_members(){
    fetch('/member')
    .then((res)=>{
        return res.json()
    })
    .then((membersArray)=>{
        for(let i=0;i<memberNames.length;i++){
            memberNames[i].innerHTML = membersArray[i].username
            memberCredits[i].innerHTML = membersArray[i].credit
            memberPics[i].innerHTML = memberNames[i].innerHTML.split('')[0]
        }
    })
    .catch((err)=> console.log(err))
}