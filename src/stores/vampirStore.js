import React from "react";
import { observable, action, computed } from 'mobx'
import * as Joi from 'joi'



export class VampireStore {

    @observable name = ""
    @observable names = []
    @observable surname = ""
    @observable superpower = ""
    @observable age = ""
    @observable nameList = []
    @observable superpowerList = []
    @observable nameDirty = false
    @observable superDirty = false
    @observable ageDirty = false
    @observable ageE = "Полне не может быть пустым, пожалуйста заполните поле age"
    @observable nameE = 'Поле не может быть пустым, пожалуйста заполните name'
    @observable superE = 'Полне не может быть пустыми, пожалуйста заполните superpower'
    @observable isValid = true

    @observable items = [
        {
            id: 1,
            names: ["Edward", "Collin"],
            superpower: "fast",
            age: 50
        }, 
        {
            id: 2,
            names: ["Bella", "Collin"],
            superpower: "invisible",
            age: 20
        }

    ];

    @action
    setName(e){
        this.names = e.target.value.split(" ")
        if((this.names[0] === '' && this.names[1]) || (this.names[0] && this.names[1] === '') || (this.names[0] === '' && this.names[1] === '')){
                this.nameDirty = true
                this.isValid = true
                this.nameE = "Поле не может быть пустым, пожалуйста заполните поле имени и фамилии"
            
        }

        else {
            this.nameE = ""
            this.isValid = false
        }

    }

    @action
    blur(e){
        switch (e.target.name){
            case "name":
                this.nameDirty = true
                break
            case "superpower":
                this.superDirty = true
                break
            case "age":
                this.ageDirty = true
                break
        }

    }

    @action
    setSuperpower(e){
        this.superpower = e.target.value
        if (e.target.value.length < 1 || e.target.value.length > 10){

            this.superDirty = true
            this.superE = 'Недопустимая длина'
            if(!e.target.value){
                this.isValid = true
                this.superE = "Поле не может быть пустым, пожалуйста заполните поле superpower"
            }    
        
        } 
        
        else {
            this.superE = ""
            this.isValid = false
        }
    }
    
    findN(name){
        return this.items.find((item) => item.name === name)
    }

    findS(superpower){
        return this.items.find((item) => item.superpower === superpower)
    }

    @action
    switchN(){
        this.nameDirty = false
        this.nameE = ''
    }
    @action
    switchS(){
        this.superDirty = false
        this.superE = ''
    }
    @action
    switchA(){
        this.ageDirty = false
        this.ageE = ''
    }

    isAge(age){
        if (age.length < 1 || age.length > 7){
            return true
        } else {
            return false
        }

    }

    isNumber(age){
        if(typeof(age) === "String"){
            return true
        }
    }

    isInputNumber(e){
        const ch = String.fromCharCode(e.which)
        if (!(/[0-9]/.test(ch))){
            e.preventDefault();
        }
    }
    
    @action
    setAge(e){
        this.age = e.target.value
        console.log(this.age)
        console.log(typeof(this.age))
        if (e.target.value.length < 1 || e.target.value.length > 5) {
            this.ageDirty = true
            this.isValid = true
            this.ageE = "Слишком большой возраст"
            if (!e.target.value){
                this.isValid = true
                this.ageDirty = true
                this.ageE = "Поле не может быть пустым, пожалуйста заполните поле age"
            }
            
        }
        

        else{
            this.ageE = ""
            this.isValid = false

        }
       
        

    }

    isError(){
        if (this.nameE || this.superE || this.ageE || this.findN(this.name) || this.findS(this.superpower)){
            return true
        }

    }

    @action
    add(e) {
        e.preventDefault()
        if (this.isError()) {
            this.isValid = false
            this.nameDirty = true
            this.superDirty = true
            this.ageDirty = true

        } 
        else{
            this.items = [...this.items, {
                id: Date.now(),
                names: this.names,
                superpower: this.superpower,
                age: this.age,
            }]

        }
    }


    @action 
    remover(id){
        this.items = this.items.filter(i => i.id !== id)

    }


}

export default new VampireStore();