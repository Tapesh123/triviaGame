$(document).ready(function() { 
    $("#introSection").hide();
    $("#messageSection").hide();
    $('.tooltipped').tooltip({ 
        delay: 1 //animate slightly
    }); 
    
   

    
    $("#introSection").fadeIn(1000 * 5, function() { 
        
    });

    $("#questionSpace").hide() 
    //setting up variables for the followin:
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;



    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
              
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 2000);
    }

    var questions = [
        // Q1 == total of 10 questions will be asked. the answer choices are 
        {
            "q": "Captain America’s shield is made of?",
            "c": ["Vibranium", "Adamantium", "Kryptonite"], //using array for # of possible answers.
            "answer": 0 
        },
        // Q2
        {
            "q": "Who constructed the shield?",
            "c": ["Johann Schmidt", "Red Skull", "Howard Stark"],
            "answer": 0
        },
        // Q3
        {
            "q": "True or false: Stan Lee has had cameos in all Marvel Cinematic Universe movies to date.",
            "c": ["True", "False"],
            "answer": 0
        },
        // Q4
        {
            "q": "What is the name of Tony Stark’s personal butler?",
            "c": ["Jeeves", "Jarvis", "Alfred"],
            "answer": 1
        },
        // Q5
        {
            "q": "What is the name of Tony Stark’s personal secretary?",
            "c": ["Peggy Carter", "Pepper Potts", "Phil Coulson"],
            "answer": 1
        },
        // Q6
        {
            "q": "Who is Thor’s adopted sibling?",
            "c": ["Odin", "Loki", "Erik Selvig"],
            "answer": 1
        },
        // Q7
        {
            "q": "Who is the director of S.H.I.E.L.D. and the developer of the Avengers’ Initiative?",
            "c": ["Nick Fury", "Tony Stark", "Captain America"],
            "answer": 0
        },
        // Q8
        {
            "q": "In “Captain America: Civil War”, who rules Wakanda?",
            "c": ["HYDRA", "Steve Rodgers", "Black Panther"],
            "answer": 2
        },
        // Q9
        {
            "q": "What was Dr. Strange’s profession before he became Sorcerer Supreme?",
            "c": ["Professor", "Dermatologist", "Neurosurgeon"],
            "answer": 2
        },
        // Q10
        {
            "q": "Who does Bruce Banner become?",
            "c": ["Spiderman", "Ironman", "Hulk"],
            "answer": 2
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); 
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); 
            userChoice = parseInt(userChoice);

            //if/else statements to keep track of right, wrong questions.
            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h5>You have completed the game!</h5>");
        $('#gameMessage').append("<h5>Total Correct: " + correctCounter + "</h5>");
        $('#gameMessage').append("<h5>Total Incorrect: " + incorrectCounter + "</h5>");
        $('#gameMessage').append("<h5>Total Unanswered: " + unansweredCounter + "</h5>");

        setTimeout(startTrivia, 1000 * 3); //pause for 3 second before the next round begins

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'></span><span id='timerSeconds'></span>");
        $("#questionSpace").show();

        startTrivia();
        

    })




});
