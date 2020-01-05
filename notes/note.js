const fs = require('fs')
const chalk = require('chalk')

const getNote  = ()=>{
    return 'Your Notes...'
}

const addNote = (title , body)=>{
    const notes = loadNote()
    const duplicateNote = notes.find((note)=>note.title===title)

    debugger

    if(!duplicateNote){
        notes.push({
            title : title,
            body : body
        })
        saveNotes(notes)

        console.log(chalk.green.inverse('note added'))
    }else{
        console.log(chalk.red.inverse("duplicate note title"))
    }
}

const removeNote = (title)=>{
    const notes = loadNote()
    const notestokeep = notes.filter((note)=>{
        return note.title !== title
    })

    if(notes.length > notestokeep.length){
        console.log(chalk.green.inverse("note removed"))
        saveNotes(notestokeep)
    }else{
        console.log(chalk.red.inverse("no note found"))
    }

    
}

const readNote = (title)=>{
    const notes = loadNote()
    const note = notes.find((note)=>note.title === title)

    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }else{
        console.log(chalk.red.inverse('no note found'))
    }
}

const listNotes = ()=>{
    const notes = loadNote()
    console.log(chalk.inverse('your notes'))
    notes.forEach(note => {
        console.log(note.title)
        
    });
}

const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json' , dataJSON)
}

const loadNote = ()=>{

    try{
        const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
    
}

module.exports = {
    getNote : getNote,
    addNote:addNote,
    removeNote : removeNote,
    listNotes:listNotes,
    readNote:readNote
}