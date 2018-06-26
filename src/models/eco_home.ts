export class EcoHome {


  public static findAnswer(question):any{
    let ret = {eco_rating:0.0,answer:"Not Found",recommendation:""};
    question.answers.forEach((ans)=>{
        if(ans.answer === question.answer){
          ret = ans;
        }
    });
    return ret;
  }
  public static rate(home):number{
    let rate:number = 0.0;
    let mul = 0;
    if(home && home.items){
      home.items.forEach((item,idx)=> {
        if(item.questions){
          item.questions.forEach((question)=>{
            if(question.answer){
              try{
                let ecoRate = Number(EcoHome.findAnswer(question).eco_rating);
                if(ecoRate > 5.0){
                  ecoRate = 5.0;
                }
                if(ecoRate <0.0){
                  ecoRate =0.0;
                }
                console.log(ecoRate);
                rate += ecoRate;
                mul++;
              }catch(e){
                console.log(e);
              }
            }
          });
        }
      });
    }

    console.log("Found " + mul + " Answers");

    if(mul >0){
      return rate/mul;
    }
    else {
      return 0.0;
    }
  }

  public static getRecommendations(home){
    let recommendations = [];
    if(home && home.items){
      home.items.forEach((item,idx)=> {
        if (item.questions) {
          item.questions.forEach((question) => {
            if (question.answer ) {
              let answer = EcoHome.findAnswer(question);
              if(answer.recommendation && answer.recommendation != ''){
                recommendations.push({name:item.name,location:item.category,recommendation:answer.recommendation});
              }
            }
          });
        }
      });
    }
    return recommendations;
  }
  public  static unAnsweredItems(home):number[]{
    let unAnsweredItems:number[]=[];
    if(home && home.items){
      home.items.forEach((item,idx)=> {
        let hasUnAnsweredQuestion:boolean = false;
        if(item.questions){
          item.questions.forEach((question)=>{
            if(!question.answer){
              hasUnAnsweredQuestion = true;
            }
          });
        }
        if(hasUnAnsweredQuestion){
          unAnsweredItems.push(idx);
        }
      });
    }
    return unAnsweredItems;
  }
  public static hasQuestion(item,question):boolean{
    let ret:boolean =false;
    item.questions.forEach((item_question)=>{
      if(item_question.question === question.question ){
        ret = true;
      }
    });
    return ret;
  }

  public static addRemoveItemQuestions(home,itemMap){
      if(home && home.items) {
        home.items.forEach((home_item,idx)=> {
          let item = itemMap[home_item._id];
          if(!home_item.questions){
            home_item.questions = [];
          }
          //Remove Questions
          home_item.questions = home_item.questions.filter(function(home_question) {
            return EcoHome.hasQuestion(item,home_question);
          });
          home.items[idx]['questions'] = home_item.questions;
          //Add Questions
          if(item.questions){
            item.questions.forEach((item_question)=>{
              if(EcoHome.hasQuestion(home_item,item_question) === false){
                home.items[idx]['questions'].push(item_question);
              }
            });
          }
        });
      }
    }

}
