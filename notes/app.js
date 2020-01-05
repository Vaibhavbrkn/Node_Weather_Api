const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const note = require('./note.js')


yargs.command({
    command : 'add' , 
    describe : 'Add a new note',
    builder : {
        title:{
            description : 'note title',
            demandOption : true,
            type : 'string'
        },
        body:{
            description : 'note body',
            demandOption : true,
            type : 'string'
        },
        
    },
    handler : (argv)=>{
        note.addNote(argv.title , argv.body)
    }
})

yargs.command({
    command : 'remove' , 
    describe : 'remove a note',
    builder:{
        title:{
            description : 'note title',
            demandOption : true,
            type : 'string'
        }
    },
    handler : (argv)=>{
        note.removeNote(argv.title)
    }
})

yargs.command({
    command : 'list' , 
    describe : 'list of notes',
    handler(){
        note.listNotes()
    }
    
})

yargs.command({
    command : 'read' , 
    describe : 'read notes',
    builder:{
        title:{
            description : 'note title',
            demandOption : true,
            type : 'string'
        }
    },
    handler : (argv)=>{
        note.readNote(argv.title)
    }
})

yargs.parse()

   // console.log(process.argv)
   // console.log(yargs.argv)