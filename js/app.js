$(document).ready(function() {
    cycleTestimonials(1,0);
    $('#start-btn').click(function() {   
        replaceHeading();
        $('#start').fadeOut(500, function() {
            newGame();
            findQuestion();
            loadQuestion();
            $('#quiz').fadeIn(500);
        });
        $('#testimonials').fadeOut(500);
        $('.disclaim').fadeOut(500);
    });
    $('#answer-btn').click(function() {
        var user_answer = $('input:radio[name=ans]:checked').val();
        if (!user_answer) {
            alert('Please make a selection!');
        } else {
            if (correct(user_answer)) {
                $('#quiz').fadeOut(500, function() {
                    score++;
                    updateScore();
                    $('.answer-exp').text(quiz_questions[num]["answer-exp"]);
                    $('#correct').fadeIn(500);    
                });
            } else {
                $('#quiz').fadeOut(500, function() {
                    $('.answer-exp').text(quiz_questions[num]["answer-exp"]);
                    $('#wrong').fadeIn(500);
                });
            }
        }
    });
    $('.cont-btn').click(function() {       
        $('#correct').fadeOut(500, function() {
            $('#wrong').fadeOut(500, function() {
                if (count >= count_limit) {
                    updateScore();
                    updateRank();
                    $('#final').fadeIn(500);
                } else {
                    findQuestion();
                    loadQuestion();
                    $('form input').prop('checked', false);
                    $('#quiz').fadeIn(500);
                }
            });
        });
    });
    $('#start-over').click(function() {       
        $('#final').fadeOut(500, function() {
            newGame();
            findQuestion();
            loadQuestion();
            $('form input').prop('checked', false);
            $('#quiz').fadeIn(500);    
        });
    });
});

var num = 0;
var count = 0;
var count_limit = 5;
var score = 0;
var prior_questions = [];

var replaceHeading = function() {
    var head = $("<span>Totally True Foo!</span>");
    $('h1').find("span").remove();
    $('h1').append(head);
};
var cycleTestimonials = function(index,prev) {
    $('#testimonials').children('p:eq(' + prev + ')').delay(1800).fadeOut(800, function(){
        $('#testimonials').children('p:eq(' + index + ')').fadeIn(800, function(){
            prev = index;
            if (index === 3){
                index = 0;
            } else {
                index++;
            }
            cycleTestimonials(index,prev);
        });
    });
};
var newGame = function() {
    num = 0;
    count = 0;
    score = 0;
    prior_questions = [];
};
var findQuestion = function() {
    pickQuestion();
    while (wasAsked()) {
        pickQuestion();
    }
};
var pickQuestion = function() {
    var limit = Object.keys(quiz_questions).length;
    num = Math.floor((Math.random() * limit) + 1)
};
var wasAsked = function() {
    var result = false;
    for (var i=0;i<=prior_questions.length;i++){
        if (num == prior_questions[i]) {
            result = true;
        }
    }
    return result;
};
var loadQuestion = function() {
    prior_questions.push(num);    
    $('#icon').html("<i class=\"fa fa-"+quiz_questions[num]["icon"]+"\"></i>");
    $('#text').html(quiz_questions[num]["question"]);
    $('#option-1').html(quiz_questions[num]["options"][1]);
    $('#option-2').html(quiz_questions[num]["options"][2]);
    $('#option-3').html(quiz_questions[num]["options"][3]);
    $('#option-4').html(quiz_questions[num]["options"][4]);
    $('#option-5').html(quiz_questions[num]["options"][5]);
    updateScore();
    count++;
    $('.progress').text(count+"/"+count_limit);
};
var correct = function(user_answer) {
    if (user_answer == quiz_questions[num]["answer"]) {
        return true;
    } else {
        return false;
    }
};
var updateScore = function() {
    $('.score').text(score);
};
var updateRank = function() {
    if (score == 5){
        $('.rank').text('Totall Bull**** Master');
        $('.rank-msg').text('Prefect score!)');
    } else if (score >= 7 && score <=  4) {
        $('.rank').text('BSer');
        $('.rank-msg').text('You are full of ****');
    } else if (score >= 4 && score <= 3) {
        $('.rank').text('Liar');
        $('.rank-msg').text('You may not be the best, but your not the worst.');
    } else if (score >= 1 && score <= 1) {
        $('.rank').text('Squarish tendencies');
        $('.rank-msg').text('You better straighten out your actw');
    } else if (score == 0) {
        $('.rank').text('Square');
        $('.rank-msg').text('Go back to square camp!');
    }
};
var quiz_questions = {
    1: {
        "icon": "book",
        "question": "Why did trump win?",
        "options": {
            1: "Trump had the greater amount of votes overall",
            2: "Despite having a less votes than Hillary; He had greater in house support within the senate votes.",
            3: "According to the Clinton Foundation; the Sith used the force to influence election votes.",
            4: "voodoo",
            5: "No-one knows..."
        },
        "answer": 3,
        "answer-exp": "Classified"
        
    },
    2: {
        "icon": "clock-o",
        "question": "What commonly used kitchen item is openly part of the illuminati?",
        "options": {
            1: "The lost sock in the bed",
            2: "The phenomenom of all the good food disappearing and even roomates can't find it.",
            3: "OOH, PICK ME!!!",
            4: "The 'Bread-clip...'",
            5: "~"
        },
        "answer": 4,
        "answer-exp": "After a loaf of bread is opened unarguably the bread clip then proceds to enter another dimmension",
      
    },
    3: {
        "icon": "clock-o",
        "question": "Which famous philosopher is attributed to the following quote ' Screw this, I'm going home...",
        "options": {
            1: "Aristotle",
            2: "Socrates",
            3: "Confucious",
            4: "Nero",
            5: "Daddy Yankee"
        },
        "answer": 2,
        "answer-exp": "Besides socrates other great achievements, he was also uber chill"
    },
    4: {
        "icon": "bolt",
        "question": "How many licks does it take to get to the center of a tootsie pop?",
        "options": {
            1: "3",
            2: "63000",
            3: "274982",
            4: "'aBite'",
            5: "23y942"
        },
        "answer": 4,
        "answer-exp": "You'll be licking that ****er all day if you don't give in and take a bite."
    },
    5: {
        "icon": "male",
        "question": "Sup?",
        "options": {
            1: "Sup wichuu???",
            2: "Not too much, how are you?",
            3: "Hello my name is *****",
            4: "Nice weather today...",
            5: "Wanna be my friend?"
        },
        "answer": 1,
        "answer-exp": "..."
    },
  
};

/*



*/






