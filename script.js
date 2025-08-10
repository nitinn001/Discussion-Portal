// List to append question
const questionList = document.querySelector(".question-list");
// Subject
const subject = document.querySelector(".subject");
// answer
const question = document.querySelector(".ques");
// Submit Button
const submit = document.querySelector(".submit");
// Search Input
const search = document.querySelector(".searchInpt");
// Search btn
const searchBtn = document.querySelector(".search-btn");

// Discussion Topic
const discussionTopic = document.querySelector(".discussion-topic");
// Response container
const responseContainer = document.querySelector(".responseContainer");
// Response list
const responsesList = document.querySelector(".responses-list");
// Response heading
const respHeading = document.querySelector(".respHeading");
// Response 
const responseComment = document.querySelector(".responseComment");

// Submit Response
const submitResponseBtn = document.querySelector(".submitResponse");
// Post Question
const postQuestionContainer = document.querySelector(".post-question");
const discussion = document.querySelector(".discussion-area");

const questions = [];
let currentQuestion = -1;
let count = 1;
const newQuestion = document.querySelector(".new-question");


let favBtn;
// question subject arry 
const questionSubject = [];


let sub, que;



getData();

// **Validating data (Query subject && Query)**
function validate(sub, quest)
{
    sub = sub.trim();
    quest = quest.trim();
    if(sub=='' || quest=='')
        return false;
    else
        return true;
}


// **Display discussion 2 by search **
//      !Inactive
// function displayDiscussion2(obj)
// {
//     console.log(obj);
//     discussionTopic.innerHTML = '';
//     responsesList.innerHTML = '';
//     discussion.classList.remove("hidden");
//     postQuestionContainer.classList.add("hidden");
//     const html = `<h4 class="question-subject">${obj.subject}</h4>
//         <p class="question-answer">${obj.question}</p>
//         <div class="id hidden">${obj.id}</div>
//         <span class="fav">⭐<span>
//         </span></span>`
//     discussionTopic.insertAdjacentHTML("afterbegin",html);
//     if(questions[obj.id-1].responses)
//     {   
//         for(res of questions[obj.id-1].responses)
//         displayResponse(res);
//     }

// }

// **Hide Discussion if search not matched**
function hideDiscussion()
{
    discussion.classList.add("hidden");
    postQuestionContainer.classList.remove("hidden");
}

// **Search post**
function searchQuestionSubject()
{
    questionList.innerText='';
    for(let q=0;q<questions.length;q++)
    {
        let qSubject = questions[q].subject.toLowerCase();
        let qText=questions[q].question.toLowerCase();
        let searchI = search.value.toLowerCase().trim();
        // console.log(searchI.length)
        
        if(searchI=='')
        {
            currentQuestion='';
            hideDiscussion();            
            const div = displayQuestion2(questions[q]);
            if(questions[q].fav==0)
                questionList.append(div);
            else
                questionList.prepend(div);
        }
        else if(searchI!='' && (qSubject.includes(searchI) || qText.includes(searchI)))
        {
            const div = displayQuestion2(questions[q], searchI);
            questionList.append(div);
            currentQuestion=q;

            // !if want to display discussion uncomment it
            // displayDiscussion2( questions[q]);
        }
    }
}

    
    search.value = '';
    
// **search event listner**
search.addEventListener("keyup", searchQuestionSubject);


// **display Response on Question**
function displayResponse(obj)
{
    const html = `
    <div class="response">
        <h3>${obj.Heading}</h3>
        <span class="respID">${obj.reactions[2]}</span>
        <p>${obj.Comment}</p>
        <div class="reaction">
            <span class="like">👍 ${obj.reactions[0]}</span>
            <span class="dislike">👎 ${obj.reactions[1]}</span>
            <span class="net hidden">${obj.reactions[3]}</span>
        </div>
    </div>`;
    responsesList.insertAdjacentHTML("beforeend",html);  
}

function displayQuestion2(obj, searchI='') {
    // -->highlighting {search Input value} <-- 
    // 1. Store the highlight text in highlightText
    const highlightText = (searchI)?`<mark>${searchI}</mark>`:'';

    let div= document.createElement('div');
    div.setAttribute('class',"questions");

    // 2. Replacing text content with highlight if present in obj.subject or obj.question
    const html = `
        <h2 class="question-subject">${(obj.subject).toLowerCase().replaceAll(searchI, highlightText)}</h2>
        <p class="question-answer">${(obj.question).replaceAll(searchI, highlightText)}</p>
        <div class="hidden" id="${obj.id}">${obj.id}</div>
        <span class='fav';">${(obj.fav==0)?'✰':'⭐'}</span>
        <div class="time-added">${(new Date(obj.createdOn)).toDateString()}</div>
        `;

    div.innerHTML=html;
    div.setAttribute("class","question")
    return div;
        
}

// **Storing and displaying new Question in QuestionList**
function makeData()
{
    // Checking for validity
    if(validate(subject.value, question.value))
    {
        let obj = 
        {
            subject: (subject.value).trim(),
            question: (question.value).trim(),
            createdOn: Date.now(),
            // ?Every response contains 4 thing 
              /*0 - like
                1 - dislike
                2 - id
                3 - net response*/
            responses: [],
            id: count++,
            fav: 0,
        }

        // Pushed new(question) -> Questions array;
        questions.push(obj);
        questionSubject.push(subject.value);

        // Storing data...
        storeData();
        // console.log(questions)

        // Display -> append new question in questionsList
        const div = displayQuestion2(obj);
        questionList.append(div);

        // clearing -> subject input & question input
        subject.value='';
        question.value='';

    }
    else        // Alert input data is not valid
    {
        alert("Invalid Inputs");
    }
}

// Create Question for discussion
function createQuestions(question)
{
    const html = `${question}`
    return html;
}

// **Add -> new response to question**
function addResponse(obj)
{
    // Response Contain
    const res = 
    {
        Heading: respHeading.value,
        Comment: responseComment.value,
        // [like, dislike, id, netReaction]
        reactions: [0, 0, obj.responses.length, 0],
    }

    // push -> new response to questionResponses array
    obj.responses.push(res);
    console.log(obj);

    // Clearing response Input field
    respHeading.value='';
    responseComment.value='';
    displayResponse(res);
}


// **Display discussion by click event**
    function displayDiscussion(e)
    {
        // Checking if we clicked on any question from questionList and also not clicked on faviourite
        if(e.target.parentElement.className=='question' && e.target.className!='fav')
        {
            discussionTopic.innerHTML = '';
            responsesList.innerHTML='';

            // Show discussion box
            discussion.classList.remove("hidden");
            // hide post question box
            postQuestionContainer.classList.add("hidden");

            discussionTopic.insertAdjacentHTML("afterbegin", createQuestions(e.target.parentElement.innerHTML));
            // console.log(e.target.parentElement.children[2].textContent);

            // Getting clicked Question Id
            currentQuestion = e.target.parentElement.children[2].innerText;

            // Showing all response on question
            if(questions[currentQuestion-1].responses)
            {   
                for(res of questions[currentQuestion-1].responses)
                displayResponse(res);
            }
        }
    }


// **open question for discussion -> if clicked on any question in questionList**
questionList.addEventListener("click",displayDiscussion)

// **Add new response on Question**
submitResponseBtn.addEventListener("click", function()
{
    // Validating response input
    if(validate(respHeading.value, responseComment.value))
    {
        addResponse(questions[currentQuestion-1]);
    }
    storeData();
})


// **hide discussion box and render add new question box **
function addNewQuestion()
{
    discussionTopic.innerHTML = '';
    responsesList.innerHTML = '';
    // console.log(discussion);
    // console.log(responsesList);
    discussion.classList.add("hidden");
    postQuestionContainer.classList.remove("hidden");
}


// **Add new Question**
submit.addEventListener("click", makeData);

// **New Question Form (click)**
newQuestion.addEventListener("click", addNewQuestion)


// **Store Date**
function storeData()
{
    // !(Store) -> array of object in JSON.stringify form
    window.localStorage.setItem("discussion", JSON.stringify(questions));
}


// **Get Stored Data** push to question array
function getData()
{
    let obj =  window.localStorage.getItem("discussion");
    obj = JSON.parse(obj)

    // Pushing all stored question to question array
    if(obj)
    {
        for(let o of obj)
        {
            questions.push(o);
            questionSubject.push(o.subject);

            // Displaying -> Questions in questionList
            const div = displayQuestion2(o);
            if(o.fav==0)
                questionList.append(div);
            else
                questionList.prepend(div);
            // increasing count;
            count++;
        }
    }

}

// !Mark and unmark favorite and move the div up and down

function markFavorite(id)
{
    const div = displayQuestion2(questions[id-1]);
    const child = document.getElementById(id).parentElement;
    questionList.removeChild(child);
    questionList.prepend(div);
}


function unmarkFavorite(id)
{
    const div = displayQuestion2(questions[id-1]);
    const child = document.getElementById(id).parentElement;
    questionList.removeChild(child);
    questionList.append(div);
}


// ?Add to favorite
function managerFavorite(e)
{
    if(e.target.className==="fav")
    {
        const id = e.target.parentElement.children[2].getAttribute("id");
        
        if(questions[id-1].fav==0)
        {
            e.target.textContent='⭐';
            questions[id-1].fav=1;

            // move up, mark favorite
            markFavorite(id);
        }
        else
        {
            e.target.textContent='✰';       
            questions[id-1].fav=0;

            // move down, mark unfavorite
            unmarkFavorite(id);
        }

        storeData();
    }
}


// *Favorite btn initilizer
questionList.addEventListener("click", managerFavorite);
discussion.addEventListener("click", managerFavorite);

