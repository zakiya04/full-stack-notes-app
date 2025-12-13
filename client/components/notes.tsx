import Note from './note';
import { useState , useEffect} from 'react';

interface noteType{
  id: number,
  title:string,
  content:string,
}

const notes = () => {
  const [notes,setNotes] = useState<noteType[]>([]);
  const [newNote,setnewNote] = useState('');
  
  //fetch all notes//

  async function fetchNotes(){
    try{
     const res = await fetch("http://localhost:5000");
     const data = await res.json();
     setNotes(data);
    }
    catch(err){
      console.log('Could not get notes',err)
    }
  }
   
  // will upload all notes the first time//
  useEffect(()=>{fetchNotes()},[]);

  async function addNotes(){
   if(!newNote.trim()) return;

   try{
     const res = await fetch("http://localhost:5000",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(newNote)
     });

     if(res.ok){
      const addedNote = await res.json();
      setNotes((prev)=> [...prev,addedNote]);
      setnewNote('');
     }
   }
   catch(err){
    console.log('Failed to add Note',err)
   }
  }

  async function deleteNote(id:number){
   try{
    const res = await fetch("http://localhost:5000",{
      method: "DELETE",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id})
    })

    if(res.ok){
      setNotes(prev => prev.filter(note => note.id !== id))
    }
    else{
      console.log("couldnt get the response")
    }
   }
   catch(err){
     console.log('Caught an error',err)
   }
  }

  return (
    <div className='gird grid-cols-3 gap-4 mx-4 my-6 '>
      {notes.map(note =>(
        <Note key={note.id} deleteHandler={()=> deleteNote(note.id)}/>
      ))}
    </div>
  )
}

export default notes
