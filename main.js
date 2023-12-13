let link="https://crudcrud.com/api/e5e55628a78341ff95ce5f5bea824c78/data"

async function refresh(){

    try {
        let res=await axios.get(link)
        for(let i=0;i<res.data.length;i++)
        {
            todoonscreen(res.data[i])
        }
        
    } catch (error) {
        console.log('error')
    }

}
refresh() 
function addTask(e){
    e.preventDefault()
    let todo= document.getElementById('task').value
    let des= document.getElementById('description').value
    let taskCheck= document.getElementById('task_check').value
    let obj={todo,des,taskCheck}

    addToCrudCrud(obj)
}

async function addToCrudCrud(obj){

    try {

        let res = await axios.post(link,obj)
        todoonscreen(res.data)
        
        
    } catch (error) {
        console.log('error')
        
    }
}

function todoonscreen(obj){
    let childele= document.createElement('li')
    childele.textContent= `${obj.todo} ${obj.des}`
    childele.hidden.textContent=`${obj.taskCheck } ${obj._id}`
    let parent1= document.getElementById('pending')
    let parent2= document.getElementById('completed')
    let done= document.createElement('input')
    done.value="Done"
    done.type='button'

    let deletebtn= document.createElement('input')
    deletebtn.value="X"
    deletebtn.type="button"
    if(obj.taskCheck=="incomplete")
    {
        parent1.appendChild(childele)
        childele.appendChild(done)
        childele.appendChild(deletebtn)
    }
    else{

        parent2.appendChild(childele)
    }

    done.onclick=async()=>{
        parent1.removeChild(childele)
        try{
        let res= await axios.put(link+'/'+obj._id,{
            taskCheck:'completed',
            todo:obj.todo,
            des:obj.des
        }
        )
        let Obj1={ taskCheck:'completed',
        todo:obj.todo,
        des:obj.des}

        todoonscreen(Obj1)
       
    }
    catch(error){
        console.log('error')
    }

    }

    deletebtn.onclick=async()=>{
        parent1.removeChild(childele)
        try {
            await axios.delete(link + '/' +  obj._id)

            
        } catch (error) {
            console.log(error)
        }
    }
}