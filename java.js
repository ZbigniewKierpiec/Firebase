const list = document.querySelector('ul');
const form =document.querySelector('form');

const rec=(r,id)=>{
let time=r.created_at.toDate()
let html=`


<li data-id="${id}"> 

<div>${r.title}</div>
<button class='btn btn-danger btn-sm my-2'>Delete</button>

</li>

`
list.innerHTML+=html
}






db.collection('recipes').get().then((snapshot)=>{


snapshot.forEach(doc => {
    rec(doc.data(),doc.id)
  console.log(doc.data())
  console.log(doc.id)
});


}).catch(err=>{

    console.log(err)
})


form.addEventListener('submit',e=>{
e.preventDefault()

const now= new Date();
const recepi={
    title:form.recipe.value,
    created_at: firebase.firestore.Timestamp.fromDate(now)
}
db.collection('recipes').add(recepi).then(()=>{

console.log('recepi added')
form.reset()
}).catch(err=>{
    console.log(err)
})
})

/// Del Data



list.addEventListener('click',e=>{

if(e.target.tagName==='BUTTON'){
const id=e.target.parentElement.getAttribute('data-id');
db.collection('recipes').doc(id).delete().then(()=>{
    console.log('recepi delete')
})
}
})