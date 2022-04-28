import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name : string="";
  public questionList : any = [];
  public currentQuestion:number = 0;
  public points : number = 0;
  counter = 1;
  correctAnswer : number = 0;
  incorrectAnswer : number = 0;
  progress: string = "0";
  isQuizCompleted : boolean = false;
  randomNumber = 0;
  constructor( private questionService : QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.generateRandomNumber(0, 4)
  }

  getAllQuestions(){
    this.questionService.getQuestionJson()
    .subscribe(res =>{
      this.questionList = res
      console.log(res);
    })
  }

  generateRandomNumber(min: number, max: number) {
    this.randomNumber = Math.floor((Math.random() * (max - min + 1)) + min)
    console.log(this.randomNumber);
    
  }
  
  nextQuestion(){
    this.currentQuestion++;
  }
  previousQuestion(){
    this.currentQuestion--;
  }

  answer(currentQno:number, option : any){
    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
    }
    if(option.correct){
      this.points+= 10;
      this.correctAnswer++;
      setTimeout(()=>{
        this.currentQuestion++;
        this.generateRandomNumber(0, 4);
        this.getProgressPercet();
      },1000);
 
    }else{
      //Acá terminaríamos el juego
      setTimeout(()=>{
        this.currentQuestion++;
        this.incorrectAnswer++;
        this.getProgressPercet();
      },1000);
      this.isQuizCompleted = true;
    }
  }


  exitQuiz(){
    
    this.getAllQuestions();
    this.points = 0;
    this.progress= "0";
    this.isQuizCompleted = true;
    
  }
  getProgressPercet(){
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }
}
