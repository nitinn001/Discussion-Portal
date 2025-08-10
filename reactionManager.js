// Reactions Button (like and dislike)

function reactionManager(e)
{
    if(e.target.parentElement.className=="reaction")
    {
        const respID = e.target.parentElement.parentElement.children[1].textContent;

        if(e.target.className=="like")
            console.log(questions[currentQuestion-1].responses[respID].reactions[0]++);
        else
            console.log(questions[currentQuestion-1].responses[respID].reactions[1]++);

        questions[currentQuestion-1].responses[respID].reactions[3]=
        questions[currentQuestion-1].responses[respID].reactions[0] - 
        questions[currentQuestion-1].responses[respID].reactions[1];

        
        // **Sorting - Insertion Sort**
        // !make currentQuestion responses sort based on reactions[3]   
        let n=questions[currentQuestion-1].responses.length;
        for(let i =0;i<n-1;i++)
        {
            for(let j=i+1;j>0;j--)
            {
                // if net is greter move to front
                if(questions[currentQuestion-1].responses[j].reactions[3]>questions[currentQuestion-1].responses[j-1].reactions[3])
                {
                    // !First swap id Important
                    let temp = questions[currentQuestion-1].responses[j].reactions[2];
                    questions[currentQuestion-1].responses[j].reactions[2]=questions[currentQuestion-1].responses[j-1].reactions[2];
                    questions[currentQuestion-1].responses[j-1].reactions[2]=temp;

                    // swap response now
                    temp = questions[currentQuestion-1].responses[j];
                    questions[currentQuestion-1].responses[j]=questions[currentQuestion-1].responses[j-1];
                    questions[currentQuestion-1].responses[j-1]=temp;
                }
                else break;
            }  
            
        }
        responsesList.innerHTML='';
        for(const r of questions[currentQuestion-1].responses)
        {
            // console.log(r);
            displayResponse(r);
        }
       storeData();
    }
}

discussion.addEventListener("click", reactionManager);


// Sort response based on net reactions

/*
1. Move response in responses array up and down based on net response responses.reaction[3]
2. Clear reasponse list
3. display response list again based on reactions
*/




// **Timer function**

setInterval(updatePostTime, 1000);
function updatePostTime()
{
    for(let i=0;i<questionList.children.length; i++)
    {
        let id = questionList.children[i].children[2].textContent;
        let liveTime = Math.floor((Date.now()-questions[id-1].createdOn)/1000);


        if(liveTime>60)
            {
                liveTime=liveTime/60;
                // Minutes
                if(liveTime/60>1)
                {
                    liveTime=liveTime/60;
                    // Hours
                    if(liveTime/24>1)
                    {
                        liveTime=liveTime/24;
                        // Days
                        if(liveTime/30>1)
                        {
                            liveTime=liveTime/30;
                            // Month
                            if(liveTime/12>1)
                            {
                                liveTime=liveTime/12;
                                // Years
                                questionList.children[i].children[4].textContent=Math.floor(liveTime)+' Year';
                            }
                            else
                            questionList.children[i].children[4].textContent=Math.floor(liveTime)+' Month';
                        }
                        else
                        questionList.children[i].children[4].textContent=Math.floor(liveTime)+' Day'
        
                    }
                    else
                    questionList.children[i].children[4].textContent = Math.floor(liveTime)+' h'
                }
                else
                questionList.children[i].children[4].textContent=Math.floor(liveTime)+' m'
            }
            else
                questionList.children[i].children[4].textContent=Math.floor(liveTime)+'s';
    }
}