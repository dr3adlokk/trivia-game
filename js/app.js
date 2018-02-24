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
var count_limit = 10;
var score = 0;
var prior_questions = [];

var replaceHeading = function() {
    var head = $("<span>Fun Facts</span>");
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
    if (score == 10){
        $('.rank').text('Time Master');
        $('.rank-msg').text('Prefect score!)');
    } else if (score >= 7 && score <=  9) {
        $('.rank').text('Time Lord');
        $('.rank-msg').text('You have mad time travel trivia skillz! Time does your bidding, except for all that time you spent watching time travel movies - you can\'t get that back.');
    } else if (score >= 4 && score <= 6) {
        $('.rank').text('Time Traveler');
        $('.rank-msg').text('You may not be the best, but your not the worst.');
    } else if (score >= 1 && score <= 3) {
        $('.rank').text('Time Traveling Sidekick');
        $('.rank-msg').text('Meh. Not a great score, but if you ever ending up traveling through time you probably know enough to not accidently destroy the universe.');
    } else if (score == 0) {
        $('.rank').text('Time Dunce');
        $('.rank-msg').text('Doh! The only "time traveling" you apparently understand is starring at the clock while drool runs down your chin.');
    }
};
var quiz_questions = {
    1: {
        "icon": "book",
        "question": "Sup?",
        "options": {
            1: "Sup wichuu???",
            2: "Not too much, how are you?",
            3: "Hello my name is *****",
            4: "Nice weather today...",
            5: "Wanna be my friend?"
        },
        "answer": 3,
        "answer-exp": "Why did trump win?",
        "options": {
            1: "Trump had the greater amount of votes overall",
            2: "Despite having a less votes than Hillary; He had greater in house support within the senate votes.",
            3: "According to the Clinton Foundation; the Sith used the force to influence election votes.",
            4: "voodoo",
            5: "No-one knows..."
        },
    },
    2: {
        "icon": "clock-o",
        "question": "What commonly used kitchen item is openly part of the illuminati?",
        "options": {
            1: "The lost sock in the bed",
            2: "The phenomenom of all the good food disappearing and even roomates can't find it.",
            3: "pick me",
            4: "How do you know I am not the right answere?",
            5: ""
        },
        "answer": 4,
        "answer-exp": "Who invented the concept of  trivia game",
        "options": {
            1: "Rick from the Walking dead.",
            2: "That really smart Greek guy",
            3: "Batman Johnson",
            4: "Ancient Aliens",
            5: "Austin Powers"
        },
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
        "answer-exp": "You'll be licking this fucker all day if you don't give in and take a bite."
    },
    5: {
        "icon": "male",
        "question": "",
        "options": {
            1: "About Time (2013)",
            2: "The Time Machine (1960)",
            3: "Source Code (2011)",
            4: "The Terminator (1984)",
            5: "Looper (2012)"
        },
        "answer": 1,
        "answer-exp": "In About Time (2013), the main character is informed by his father that the men in his family have the ability to travel through time at will. After reaching a certain age, they simply have to find a dark place and concentrate on a time (within their own life) to which they wish to travel."
    },
    

    };
// };

/*



*/






